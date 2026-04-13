/**
 * Physical CSS extractor — uses Puppeteer to read actual computed styles
 * from a live page rather than inferring values from a screenshot.
 *
 * Runs in parallel with the Claude Vision pass and augments the token set
 * with 100 % measured px / rem values.
 */

import puppeteer from 'puppeteer';

// ── Public types ─────────────────────────────────────────────────────────────

export interface SpacingSystem {
  /** Detected grid base unit in px (typically 4 or 8) */
  baseUnit: number;
  /** Deduplicated, grid-snapped step scale as CSS strings */
  steps: string[];
  /** Semantic named tokens mapped from the scale */
  named: {
    xs:   string;  // 1× base
    sm:   string;  // 2× base
    md:   string;  // 4× base
    lg:   string;  // 6× base
    xl:   string;  // 8× base
    '2xl': string; // 12× base
    '3xl': string; // 16× base
  };
}

export interface TypographyStep {
  /** Exact computed pixel size, e.g. "14px" */
  px: string;
  /** Rem equivalent relative to page root font size, e.g. "0.875rem" */
  rem: string;
  /** Computed line-height ratio, e.g. "1.5" */
  lineHeight: string;
  /** Computed font-weight, e.g. "400" or "700" */
  weight: string;
  /** Inferred semantic role: label | body-sm | body | body-lg | h5 | h4 | h3 | h2 | h1 | display */
  role: string;
}

export interface TypographyScale {
  /** Most common body text size, e.g. "16px" */
  baseSize: string;
  /** Root-relative rem value for baseSize */
  baseSizeRem: string;
  /** Unique font-family names found on the page */
  families: string[];
  /** Full type scale, sorted smallest → largest */
  steps: TypographyStep[];
}

// ── Internal helpers ─────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Snap a raw GCD to the nearest "standard" grid base (4 or 8).
 * Most design systems use one of these; avoid exotic bases like 3 or 7.
 */
function snapToStandardBase(raw: number): number {
  if (raw <= 0) return 4;
  if (raw <= 5) return 4;
  if (raw <= 10) return 8;
  // If larger (12, 16, …) honour it — some dense UIs use 6-pt grids
  return raw;
}

function deriveBaseUnit(values: number[]): number {
  const candidates = values.filter(v => v >= 4 && v <= 32);
  if (candidates.length < 2) return 4;
  const rawGcd = candidates.reduce(gcd);
  return snapToStandardBase(rawGcd);
}

function buildSpacingSystem(rawValues: number[]): SpacingSystem {
  const base = deriveBaseUnit(rawValues);

  // Snap every observed value to the nearest grid multiple, deduplicate
  const snapped = [
    ...new Set(
      rawValues
        .filter(v => v > 0 && v <= 128)
        .map(v => Math.round(v / base) * base),
    ),
  ]
    .filter(v => v > 0)
    .sort((a, b) => a - b)
    .slice(0, 14); // cap at 14 steps — beyond that the scale is noise

  const px = (n: number) => `${n}px`;

  // If extraction yielded nothing useful, build a clean mathematical scale
  const steps =
    snapped.length >= 3
      ? snapped.map(px)
      : [1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32]
          .map(m => Math.round((base * m) / 4))
          .filter((v, i, arr) => arr.indexOf(v) === i && v > 0)
          .map(px);

  return {
    baseUnit: base,
    steps,
    named: {
      xs:   px(base * 1),
      sm:   px(base * 2),
      md:   px(base * 4),
      lg:   px(base * 6),
      xl:   px(base * 8),
      '2xl': px(base * 12),
      '3xl': px(base * 16),
    },
  };
}

function assignRole(pxSize: number, baseBodyPx: number): string {
  const r = pxSize / baseBodyPx;
  if (r <= 0.75) return 'label';
  if (r <= 0.92) return 'body-sm';
  if (r <= 1.15) return 'body';
  if (r <= 1.45) return 'body-lg';
  if (r <= 1.85) return 'h5';
  if (r <= 2.40) return 'h4';
  if (r <= 3.10) return 'h3';
  if (r <= 4.20) return 'h2';
  if (r <= 5.80) return 'h1';
  return 'display';
}

function toRem(px: number, rootPx: number): string {
  const val = px / rootPx;
  // Format: trim trailing zeros, e.g. 1.000 → "1", 0.875000 → "0.875"
  return `${parseFloat(val.toFixed(4))}rem`;
}

function buildTypographyScale(
  fontEntries: Array<[string, number]>,
  families: string[],
  rootFontSize: number,
): TypographyScale {
  // Parse entries: key = "roundedPx|lineHeightRatio|fontWeight"
  const parsed = fontEntries.map(([key, count]) => {
    const parts = key.split('|');
    return {
      px:     Number(parts[0]),
      lh:     Number(parts[1]),
      weight: parts[2] ?? '400',
      count,
    };
  });

  // Identify base body size: most frequent size in the 12–20px range
  const bodyCandidate = [...parsed]
    .filter(f => f.px >= 12 && f.px <= 20)
    .sort((a, b) => b.count - a.count)[0];
  const basePx = bodyCandidate?.px ?? 16;

  // Deduplicate by px size — keep highest-count entry per size
  const bySize = new Map<number, typeof parsed[0]>();
  for (const f of parsed) {
    const existing = bySize.get(f.px);
    if (!existing || f.count > existing.count) bySize.set(f.px, f);
  }

  const steps: TypographyStep[] = [...bySize.values()]
    .sort((a, b) => a.px - b.px)
    .map(({ px, lh, weight }) => ({
      px:         `${px}px`,
      rem:        toRem(px, rootFontSize),
      lineHeight: `${lh}`,
      weight,
      role:       assignRole(px, basePx),
    }));

  return {
    baseSize:    `${basePx}px`,
    baseSizeRem: toRem(basePx, rootFontSize),
    families:    families.slice(0, 4),
    steps,
  };
}

// ── Browser evaluation script ────────────────────────────────────────────────

interface RawBrowserData {
  spacing:      number[];
  fonts:        Array<[string, number]>;
  families:     string[];
  rootFontSize: number;
}

/**
 * Serialisable function that runs inside the Puppeteer page context.
 * Must use only browser-native APIs (no Node imports).
 */
function browserExtract(): RawBrowserData {
  const spacingSet  = new Set<number>();
  const fontMap     = new Map<string, number>();
  const familySet   = new Set<string>();

  // Sample a representative set of semantic elements (cap at 600)
  const sample = Array.from(
    document.querySelectorAll<Element>(
      'h1,h2,h3,h4,h5,h6,p,a,button,label,li,span,div,section,article,header,nav,main,footer',
    ),
  ).slice(0, 600);

  for (const el of sample) {
    const s = window.getComputedStyle(el);

    // ── Spacing: padding + margin + flex/grid gap ────────────────────────
    const sVals = [
      s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft,
      s.marginTop,  s.marginBottom,
    ];
    const display = s.display;
    if (display === 'flex' || display === 'grid') {
      sVals.push(s.rowGap, s.columnGap);
    }
    for (const v of sVals) {
      const n = parseFloat(v);
      if (n > 0 && n < 200 && isFinite(n)) spacingSet.add(Math.round(n));
    }

    // ── Typography ────────────────────────────────────────────────────────
    const fs = parseFloat(s.fontSize);
    if (fs >= 10 && fs <= 96) {
      const lhRaw = s.lineHeight;
      const lhPx  = parseFloat(lhRaw);
      const lh =
        lhRaw === 'normal'   ? 1.2
        : isFinite(lhPx)     ? Math.round((lhPx / fs) * 10) / 10
        : 1.5;
      const fw = s.fontWeight;
      const ff = s.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
      const key = `${Math.round(fs)}|${lh}|${fw}`;
      fontMap.set(key, (fontMap.get(key) ?? 0) + 1);
      if (ff && ff.length < 50) familySet.add(ff);
    }
  }

  const rootFs = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize,
  ) || 16;

  return {
    spacing:      Array.from(spacingSet).sort((a, b) => a - b),
    fonts:        Array.from(fontMap.entries())
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 16),
    families:     Array.from(familySet).slice(0, 5),
    rootFontSize: rootFs,
  };
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function extractPhysicalTokens(url: string): Promise<{
  spacingSystem:   SpacingSystem;
  typographyScale: TypographyScale;
}> {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  try {
    const page = await browser.newPage();

    // Block heavy resources — we only need CSS and initial JS
    await page.setRequestInterception(true);
    page.on('request', req => {
      const t = req.resourceType();
      if (t === 'image' || t === 'media' || t === 'font') {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.setViewport({ width: 1440, height: 900 });

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15_000 });
    } catch {
      // Timeout — partial load is still useful; continue extraction
    }

    // Let any CSS-in-JS / deferred stylesheets settle
    await new Promise<void>(resolve => setTimeout(resolve, 1_200));

    const raw: RawBrowserData = await page.evaluate(browserExtract);

    return {
      spacingSystem:   buildSpacingSystem(raw.spacing),
      typographyScale: buildTypographyScale(raw.fonts, raw.families, raw.rootFontSize),
    };
  } finally {
    await browser.close();
  }
}
