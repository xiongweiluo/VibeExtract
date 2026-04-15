import { NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';
import { extractDesignSystem, ExtractionError } from '../../../services/extractor';
import { extractPhysicalTokens } from '../../../services/cssExtractor';
import { writeDesignSpec } from '../../../services/specWriter';
import type { DesignTokens } from '../../../types';

export const runtime = 'nodejs'; // Buffer + axios — not compatible with Edge runtime

// ---------------------------------------------------------------------------
// SSE helpers
// ---------------------------------------------------------------------------

type ExtractEvent =
  | { step: 'screenshot'; message: string }
  | { step: 'physical';   message: string }
  | { step: 'critique';   message: string }
  | { step: 'extract';    message: string }
  | { step: 'spec';       message: string; specPath: string }
  | { step: 'done';       tokens: DesignTokens; physicalOk: boolean; designCritique?: string }
  | { step: 'error';      code: ErrorCode; message: string };

type ErrorCode =
  | 'INVALID_URL'
  | 'SCREENSHOT_FAILED'
  | 'EXTRACTION_FAILED'
  | 'INTERNAL_ERROR';

function sseChunk(event: ExtractEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

// ---------------------------------------------------------------------------
// URL validation
// ---------------------------------------------------------------------------

function parseTargetUrl(raw: unknown): { ok: true; url: string } | { ok: false; message: string } {
  if (typeof raw !== 'string' || raw.trim() === '') {
    return { ok: false, message: '"url" field is required and must be a non-empty string.' };
  }

  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return { ok: false, message: `"${raw}" is not a valid URL.` };
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { ok: false, message: 'Only http:// and https:// URLs are supported.' };
  }

  return { ok: true, url: parsed.toString() };
}

// ---------------------------------------------------------------------------
// Screenshot helper
// ---------------------------------------------------------------------------

async function captureScreenshot(targetUrl: string): Promise<Buffer> {
  const accessKey = process.env.SCREENSHOTONE_API_KEY;
  if (!accessKey) {
    throw new Error('SCREENSHOTONE_API_KEY is not configured.');
  }

  const response = await axios.get<ArrayBuffer>('https://api.screenshotone.com/take', {
    params: {
      access_key: accessKey,
      url: targetUrl,
      viewport_width: 1280,
      viewport_height: 900,
      image_quality: 85,
      format: 'png',
    },
    responseType: 'arraybuffer',
    timeout: 30_000,
  });

  return Buffer.from(response.data);
}

// ---------------------------------------------------------------------------
// POST /api/extract
// Body: { url: string }
// Response: text/event-stream  (SSE)
//
// Event sequence (happy path):
//   data: {"step":"screenshot","message":"..."}
//   data: {"step":"extract","message":"..."}
//   data: {"step":"done","tokens":{...}}
//
// On any error:
//   data: {"step":"error","code":"...","message":"..."}
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest): Promise<Response> {
  // --- parse body -----------------------------------------------------------
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return new Response(
      sseChunk({ step: 'error', code: 'INVALID_URL', message: 'Request body must be valid JSON.' }),
      { status: 400, headers: sseHeaders() },
    );
  }

  const urlResult = parseTargetUrl(body.url);
  if (!urlResult.ok) {
    return new Response(
      sseChunk({ step: 'error', code: 'INVALID_URL', message: urlResult.message }),
      { status: 400, headers: sseHeaders() },
    );
  }

  const targetUrl = urlResult.url;

  // --- stream ---------------------------------------------------------------
  const stream = new TransformStream<string, string>();
  const writer = stream.writable.getWriter();

  const send = async (event: ExtractEvent) => {
    await writer.write(sseChunk(event));
  };

  // Run the pipeline in the background; stream closes when done/errored.
  (async () => {
    try {
      // ── Step 1 ── Kick off physical extraction + screenshot capture in parallel.
      // Puppeteer and the screenshot API both start immediately and race each other.
      // We then pass physical measurements into Claude before it starts reasoning —
      // this is the "physical calibration" that anchors AI inference to real data.
      const physicalPromise = extractPhysicalTokens(targetUrl).catch(() => null);

      await send({ step: 'screenshot', message: `Capturing screenshot of ${targetUrl} …` });
      await send({ step: 'physical',   message: 'Puppeteer reading computed CSS styles in parallel …' });

      // ── Step 2 ── Capture screenshot (physical extraction races alongside)
      let screenshotBuffer: Buffer;
      try {
        screenshotBuffer = await captureScreenshot(targetUrl);
      } catch (err) {
        const msg =
          err instanceof AxiosError
            ? `ScreenshotOne returned ${err.response?.status ?? 'network error'}: ${err.message}`
            : String(err);
        await send({ step: 'error', code: 'SCREENSHOT_FAILED', message: msg });
        return;
      }

      // ── Step 2b ── Try to collect physical data before handing off to Claude.
      // Screenshot took ~2–4 s; Puppeteer typically finishes in the same window.
      // Give it up to 2 additional seconds before proceeding without it.
      // (We will still await the full result later for the merge step.)
      const physicalForClaude = await Promise.race([
        physicalPromise,
        new Promise<null>(resolve => setTimeout(() => resolve(null), 2_000)),
      ]);

      // ── Step 3 ── Claude Vision: Phase 1 (Design Critique) + Phase 2 (Token Extraction)
      // Physical measurements, if available, are injected directly into the
      // critique context so the AI uses real px/rem values instead of visual guesses.
      await send({
        step:    'critique',
        message: physicalForClaude
          ? 'Physical data ready. Running Design Critique calibrated with computed CSS measurements …'
          : 'Running Design Critique — analysing color semantics, spacing math & typography …',
      });
      await send({ step: 'extract', message: 'Translating calibrated critique into design tokens …' });

      let tokens: DesignTokens;
      let designCritique: string | undefined;
      try {
        const result = await extractDesignSystem(
          screenshotBuffer,
          'image/png',
          physicalForClaude
            ? {
                spacingSystem:   physicalForClaude.spacingSystem,
                typographyScale: physicalForClaude.typographyScale,
                shadowSpecs:     physicalForClaude.shadowSpecs,
              }
            : undefined,
        );
        designCritique = result.designCritique;
        const { designCritique: _dc, ...rest } = result;
        tokens = rest as DesignTokens;
      } catch (err) {
        const msg = err instanceof ExtractionError ? err.message : String(err);
        await send({ step: 'error', code: 'EXTRACTION_FAILED', message: msg });
        return;
      }

      // ── Step 4 ── Merge full physical data (always settled by now)
      const physical = physicalForClaude ?? await physicalPromise;
      if (physical) {
        const sk = physical.skeleton;
        tokens = {
          ...tokens,
          spacingSystem:   physical.spacingSystem,
          typographyScale: physical.typographyScale,
          // Physical DOM extraction: exact shadow inventory from real UI components
          shadowSpecs:     physical.shadowSpecs,
          // Physical DOM extraction can read exact text — prefer it over AI inference
          assets: physical.assets,
          skeleton: {
            ...tokens.skeleton,
            nav: {
              brand: sk.nav.brand || tokens.skeleton.nav.brand,
              items: sk.nav.items.length > 0 ? sk.nav.items : tokens.skeleton.nav.items,
            },
            hero: {
              ...tokens.skeleton.hero,
              headline: sk.hero.headline || tokens.skeleton.hero.headline,
              present:  sk.hero.present  || tokens.skeleton.hero.present,
              ctaCount: sk.hero.ctaCount  > 0 ? sk.hero.ctaCount : tokens.skeleton.hero.ctaCount,
            },
            cards: {
              present:     sk.cards.present     || tokens.skeleton.cards.present,
              gridColumns: sk.cards.gridColumns  > 0 ? sk.cards.gridColumns : tokens.skeleton.cards.gridColumns,
              hasShadow:   sk.cards.present ? sk.cards.hasShadow : tokens.skeleton.cards.hasShadow,
            },
            footer: {
              present: sk.footer.present || tokens.skeleton.footer.present,
              columns: sk.footer.columns  > 0 ? sk.footer.columns : tokens.skeleton.footer.columns,
            },
          },
        };
      }

      // ── Step 5 ── Write design spec to docs/research/
      // Non-fatal: a spec write failure must not block the client from receiving tokens.
      try {
        const spec = await writeDesignSpec(targetUrl, tokens, designCritique ?? '');
        await send({
          step:     'spec',
          message:  `Design spec written (visual weight: ${spec.verdict})`,
          specPath: spec.filePath,
        });
      } catch {
        // Spec write failed silently — tokens are still complete
      }

      // ── Step 6 ── Done
      await send({ step: 'done', tokens, physicalOk: physical !== null, designCritique });
    } catch (err) {
      await send({
        step: 'error',
        code: 'INTERNAL_ERROR',
        message: err instanceof Error ? err.message : 'An unexpected error occurred.',
      });
    } finally {
      await writer.close();
    }
  })();

  return new Response(stream.readable, { headers: sseHeaders() });
}

function sseHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no', // disable nginx proxy buffering
  };
}
