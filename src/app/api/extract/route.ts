import { NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';
import { extractDesignSystem, ExtractionError } from '../../../services/extractor';
import { extractPhysicalTokens } from '../../../services/cssExtractor';
import type { DesignTokens } from '../../../types';

export const runtime = 'nodejs'; // Buffer + axios — not compatible with Edge runtime

// ---------------------------------------------------------------------------
// SSE helpers
// ---------------------------------------------------------------------------

type ExtractEvent =
  | { step: 'screenshot'; message: string }
  | { step: 'physical';   message: string }
  | { step: 'extract';    message: string }
  | { step: 'done';       tokens: DesignTokens; physicalOk: boolean }
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
      // ── Step 1 ── Kick off physical extraction immediately (runs in parallel)
      // It uses Puppeteer so it's independent of the screenshot API.
      // By the time Claude Vision finishes (~4 s), it should already be done.
      const physicalPromise = extractPhysicalTokens(targetUrl).catch(() => null);

      await send({ step: 'screenshot', message: `Capturing screenshot of ${targetUrl} …` });
      await send({ step: 'physical',   message: 'Reading computed CSS styles in parallel …' });

      // ── Step 2 ── Screenshot
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

      // ── Step 3 ── Claude Vision extraction
      await send({ step: 'extract', message: 'Screenshot captured. Analysing design system with Claude Vision …' });

      let tokens: DesignTokens;
      try {
        tokens = await extractDesignSystem(screenshotBuffer, 'image/png');
      } catch (err) {
        const msg = err instanceof ExtractionError ? err.message : String(err);
        await send({ step: 'error', code: 'EXTRACTION_FAILED', message: msg });
        return;
      }

      // ── Step 4 ── Merge physical data (Claude took ~4 s; physical is likely done)
      const physical = await physicalPromise;
      if (physical) {
        const sk = physical.skeleton;
        tokens = {
          ...tokens,
          spacingSystem:   physical.spacingSystem,
          typographyScale: physical.typographyScale,
          // Physical DOM extraction can read exact text — prefer it over AI inference
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

      // ── Step 5 ── Done
      await send({ step: 'done', tokens, physicalOk: physical !== null });
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
