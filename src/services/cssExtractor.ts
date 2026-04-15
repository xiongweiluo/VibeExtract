/**
 * Physical CSS extractor — uses Puppeteer to read actual computed styles
 * from a live page rather than inferring values from a screenshot.
 *
 * Runs in parallel with the Claude Vision pass and augments the token set
 * with 100 % measured px / rem values plus DOM-extracted skeleton hints.
 *
 * Physical scouting pass captures:
 *   • letter-spacing (per typography step)
 *   • line-height ratio (per typography step)
 *   • font-weight (per typography step)
 *   • padding / margin / gap (spacing system derivation)
 *   • multi-layer box-shadow (per UI component type)
 *   • CSS gradient backgrounds (linear / radial / conic)
 *   • raw inline SVG source (icons, logos, illustrations)
 *   • external image and SVG URLs
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
    xs:    string;  // 1× base
    sm:    string;  // 2× base
    md:    string;  // 4× base
    lg:    string;  // 6× base
    xl:    string;  // 8× base
    '2xl': string;  // 12× base
    '3xl': string;  // 16× base
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
  /** Computed letter-spacing, e.g. "0px", "0.05em", "1.5px" */
  letterSpacing: string;
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

export interface SkeletonHints {
  nav:    { brand: string; items: string[] };
  hero:   { present: boolean; headline: string; ctaCount: number };
  cards:  { present: boolean; gridColumns: number; hasShadow: boolean };
  footer: { present: boolean; columns: number };
}

export interface AssetCollection {
  /** External image URLs (excluding data: URIs), capped at 50 entries */
  images: string[];
  /** SVG file URLs and detected sprite sheet references */
  svgs: string[];
  /** CSS gradient backgrounds found on structural elements (bg-image, not url()) */
  gradients: Array<{ element: string; value: string }>;
  /** Raw outerHTML of inline <svg> elements — icons, logos, illustrations */
  inlineSvgs: string[];
}

export interface ShadowSpec {
  /** Full multi-layer CSS box-shadow value, e.g. "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)" */
  value: string;
  /** Number of matched UI component elements using this exact shadow */
  frequency: number;
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
  if (raw <= 0)  return 4;
  if (raw <= 5)  return 4;
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
      xs:    px(base * 1),
      sm:    px(base * 2),
      md:    px(base * 4),
      lg:    px(base * 6),
      xl:    px(base * 8),
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
  // Parse entries: key = "roundedPx|lineHeightRatio|fontWeight|letterSpacing"
  const parsed = fontEntries.map(([key, count]) => {
    const parts = key.split('|');
    return {
      px:            Number(parts[0]),
      lh:            Number(parts[1]),
      weight:        parts[2] ?? '400',
      letterSpacing: parts[3] ?? '0px',
      count,
    };
  });

  // Identify base body size: most frequent size in the 12–20px range
  const bodyCandidate = [...parsed]
    .filter(f => f.px >= 12 && f.px <= 20)
    .sort((a, b) => b.count - a.count)[0];
  const basePx = bodyCandidate?.px ?? 16;

  // Deduplicate by px size — keep highest-count entry per size
  // (naturally picks the most common letter-spacing for that size)
  const bySize = new Map<number, typeof parsed[0]>();
  for (const f of parsed) {
    const existing = bySize.get(f.px);
    if (!existing || f.count > existing.count) bySize.set(f.px, f);
  }

  const steps: TypographyStep[] = [...bySize.values()]
    .sort((a, b) => a.px - b.px)
    .map(({ px, lh, weight, letterSpacing }) => ({
      px:            `${px}px`,
      rem:           toRem(px, rootFontSize),
      lineHeight:    `${lh}`,
      weight,
      letterSpacing,
      role:          assignRole(px, basePx),
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
  skeleton:     SkeletonHints;
  assets: {
    images:     string[];
    svgs:       string[];
    gradients:  Array<{ element: string; value: string }>;
    inlineSvgs: string[];
  };
  /** Top box-shadow values sorted by frequency: [cssValue, elementCount] */
  shadows: Array<[string, number]>;
}

/**
 * Serialisable function that runs inside the Puppeteer page context.
 * Must use only browser-native APIs (no Node imports).
 *
 * Physical recon pass — everything measured via getComputedStyle():
 *   • Spacing: padding, margin, flex/grid gap
 *   • Typography: font-size, line-height, font-weight, letter-spacing
 *   • Box-shadow: sampled from buttons, cards, nav, panels (multi-layer)
 *   • Assets: img URLs, srcset, CSS background-image URLs + gradients
 *   • Inline SVGs: raw outerHTML of icon / logo SVGs
 */
function browserExtract(): RawBrowserData {
  const spacingSet = new Set<number>();
  const fontMap    = new Map<string, number>();
  const familySet  = new Set<string>();

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
    const disp = s.display;
    if (disp === 'flex' || disp === 'grid') {
      sVals.push(s.rowGap, s.columnGap);
    }
    for (const v of sVals) {
      const n = parseFloat(v);
      if (n > 0 && n < 200 && isFinite(n)) spacingSet.add(Math.round(n));
    }

    // ── Typography — font-size, line-height, font-weight, letter-spacing ─
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
      // Normalise letter-spacing: browser returns "normal" for default, "Npx" for explicit
      const ls = s.letterSpacing === 'normal' ? '0px' : s.letterSpacing;
      // Composite key captures all four physical dimensions
      const key = `${Math.round(fs)}|${lh}|${fw}|${ls}`;
      fontMap.set(key, (fontMap.get(key) ?? 0) + 1);
      if (ff && ff.length < 50) familySet.add(ff);
    }
  }

  const rootFs = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize,
  ) || 16;

  // ── Skeleton extraction ──────────────────────────────────────────────────

  // — Nav brand + items
  let navBrand = '';
  const navItemTexts: string[] = [];
  const navEl = document.querySelector('nav, header nav, [role="navigation"]');
  if (navEl) {
    // Brand: first short-text anchor/element at the start of nav
    const brandCandidates = navEl.querySelectorAll('a, [class*="logo"], [class*="brand"]');
    for (const el of Array.from(brandCandidates).slice(0, 5)) {
      const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ');
      if (text.length > 1 && text.length < 40) { navBrand = text; break; }
    }
    // Nav links (exclude brand-like element text already captured)
    const linkEls = navEl.querySelectorAll('a, button');
    for (const el of Array.from(linkEls)) {
      const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ');
      if (text.length > 1 && text.length < 30 && text !== navBrand) {
        navItemTexts.push(text);
        if (navItemTexts.length >= 6) break;
      }
    }
  }

  // — Hero: look for the dominant h1 near the top
  const h1El = document.querySelector('h1');
  const heroHeadline = h1El
    ? (h1El.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 80)
    : '';
  const heroPresent = !!h1El;

  // Count primary CTA buttons in the top section
  const heroSection = document.querySelector(
    '[class*="hero"], section:first-of-type, main > *:first-child, header + *',
  );
  let heroCTACount = 0;
  if (heroSection) {
    const ctaEls = heroSection.querySelectorAll(
      'a[class*="btn"], a[class*="button"], a[class*="cta"], button:not([type="submit"])',
    );
    heroCTACount = Math.min(ctaEls.length, 5);
  }

  // — Cards
  let cardsPresent = false;
  let gridColumns  = 0;
  let hasShadow    = false;
  const cardEls = document.querySelectorAll(
    '[class*="card"], [class*="Card"], article, [class*="item"]',
  );
  if (cardEls.length >= 2) {
    cardsPresent = true;
    const parent = cardEls[0].parentElement;
    if (parent) {
      const ps = window.getComputedStyle(parent);
      if (ps.display === 'grid') {
        gridColumns = ps.gridTemplateColumns.split(' ').filter(Boolean).length;
      } else if (ps.display === 'flex' && ps.flexWrap !== 'nowrap') {
        const cardW  = (cardEls[0] as HTMLElement).offsetWidth || 0;
        const parentW = (parent as HTMLElement).offsetWidth || 0;
        if (cardW > 0) gridColumns = Math.min(Math.floor(parentW / cardW), 6);
      }
      if (gridColumns === 0) gridColumns = Math.min(cardEls.length, 4);
    }
    const cardStyle = window.getComputedStyle(cardEls[0]);
    hasShadow = cardStyle.boxShadow !== 'none' && cardStyle.boxShadow !== '';
  }

  // — Footer
  const footerEl = document.querySelector('footer, [role="contentinfo"]');
  const footerPresent = !!footerEl;
  let footerColumns = 0;
  if (footerEl) {
    const fs2 = window.getComputedStyle(footerEl);
    if (fs2.display === 'grid') {
      footerColumns = fs2.gridTemplateColumns.split(' ').filter(Boolean).length;
    } else if (fs2.display === 'flex') {
      footerColumns = Math.min(Array.from(footerEl.children).length, 6);
    } else {
      const colCandidates = footerEl.querySelectorAll(':scope > div, :scope > ul, :scope > section, :scope > nav');
      footerColumns = Math.min(colCandidates.length, 6);
    }
    if (footerColumns === 0) footerColumns = 3;
  }

  // ── Asset detection ──────────────────────────────────────────────────────────
  // Collect real image URLs, SVG URLs, gradient definitions, and inline SVG source.

  const imageUrlSet = new Set<string>();
  const svgUrlSet   = new Set<string>();
  const gradients: Array<{ element: string; value: string }> = [];

  // 1. <img src> and <img srcset>
  document.querySelectorAll('img').forEach(img => {
    const src = (img as HTMLImageElement).src;
    if (src && !src.startsWith('data:') && src.startsWith('http')) {
      if (src.includes('.svg')) {
        svgUrlSet.add(src);
      } else {
        imageUrlSet.add(src);
      }
    }
    // srcset="url1 1x, url2 2x"
    const srcset = img.getAttribute('srcset') ?? '';
    if (srcset) {
      srcset.split(',').forEach(entry => {
        const url = entry.trim().split(/\s+/)[0];
        if (url && url.startsWith('http') && !url.startsWith('data:')) {
          imageUrlSet.add(url);
        }
      });
    }
  });

  // 2. <picture><source srcset>
  document.querySelectorAll('source[srcset]').forEach(src => {
    const srcset = src.getAttribute('srcset') ?? '';
    srcset.split(',').forEach(entry => {
      const url = entry.trim().split(/\s+/)[0];
      if (url && url.startsWith('http')) imageUrlSet.add(url);
    });
  });

  // 3. CSS background-image on prominent structural elements —
  //    capture BOTH external image URLs and CSS gradient definitions.
  const bgTargets = Array.from(
    document.querySelectorAll<Element>(
      '[class*="hero"], [class*="banner"], [class*="cover"], [class*="bg"], section, header, main',
    ),
  ).slice(0, 20);

  for (const el of bgTargets) {
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') {
      // Capture CSS gradients (linear-gradient, radial-gradient, conic-gradient…)
      // These are real design decisions — not placeholder data.
      if (bg.includes('gradient')) {
        const className = String(el.className || el.tagName).trim().slice(0, 60);
        // Avoid duplicate gradient values
        if (!gradients.some(g => g.value === bg)) {
          gradients.push({ element: className, value: bg });
        }
      }
      // Also extract any image URLs embedded in background-image
      const matches = bg.matchAll(/url\(["']?([^"')]+)["']?\)/g);
      for (const m of matches) {
        const url = m[1];
        if (url && !url.startsWith('data:') && url.startsWith('http')) {
          imageUrlSet.add(url);
        }
      }
    }
  }

  // 4. SVG <use href> sprite references
  document.querySelectorAll('use').forEach(useEl => {
    const href =
      useEl.getAttribute('href') ??
      useEl.getAttribute('xlink:href') ?? '';
    // External sprite sheet (not an in-page anchor)
    if (href && !href.startsWith('#') && href.includes('.svg')) {
      const abs = href.startsWith('http') ? href : location.origin + href;
      svgUrlSet.add(abs);
    }
  });

  // 5. <object type="image/svg+xml"> and <embed>
  document.querySelectorAll('object[data], embed[src]').forEach(el => {
    const src =
      el.getAttribute('data') ?? el.getAttribute('src') ?? '';
    if (src && src.includes('.svg') && src.startsWith('http')) {
      svgUrlSet.add(src);
    }
  });

  // 6. Inline SVG source — raw outerHTML for icons, logos, illustrations.
  //    Capped at 10 SVGs × 8 KB each to avoid serialisation bloat.
  const inlineSvgSrcs: string[] = [];
  const svgEls = Array.from(document.querySelectorAll('svg'));
  for (const svg of svgEls.slice(0, 25)) {
    // Only capture SVGs with actual renderable content (not empty defs/filters)
    const hasContent = svg.querySelector(
      'path, rect, circle, ellipse, polygon, polyline, line',
    );
    if (hasContent) {
      const src = svg.outerHTML;
      if (src.length > 0 && src.length < 8000) {
        inlineSvgSrcs.push(src);
        if (inlineSvgSrcs.length >= 10) break;
      }
    }
  }

  // 7. Box-shadow inventory — targeted at UI components that typically carry elevation.
  //    Records the exact multi-layer CSS value and how many elements share it.
  const shadowMap = new Map<string, number>();
  const shadowTargets = Array.from(
    document.querySelectorAll(
      [
        'button',
        '[class*="btn"]',
        '[class*="card"]',
        '[class*="modal"]',
        '[class*="panel"]',
        '[class*="dialog"]',
        '[class*="dropdown"]',
        '[class*="popup"]',
        '[class*="toast"]',
        '[class*="alert"]',
        'nav',
        'header',
        '[class*="sidebar"]',
        '[class*="drawer"]',
      ].join(', '),
    ),
  ).slice(0, 120);

  for (const el of shadowTargets) {
    const bs = window.getComputedStyle(el).boxShadow;
    if (bs && bs !== 'none' && bs !== '') {
      shadowMap.set(bs, (shadowMap.get(bs) ?? 0) + 1);
    }
  }

  return {
    spacing:      Array.from(spacingSet).sort((a, b) => a - b),
    fonts:        Array.from(fontMap.entries())
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 16),
    families:     Array.from(familySet).slice(0, 5),
    rootFontSize: rootFs,
    skeleton: {
      nav:    { brand: navBrand, items: navItemTexts },
      hero:   { present: heroPresent, headline: heroHeadline, ctaCount: heroCTACount },
      cards:  { present: cardsPresent, gridColumns, hasShadow },
      footer: { present: footerPresent, columns: footerColumns },
    },
    assets: {
      images:     Array.from(imageUrlSet).slice(0, 50),
      svgs:       Array.from(svgUrlSet).slice(0, 20),
      gradients:  gradients.slice(0, 10),
      inlineSvgs: inlineSvgSrcs,
    },
    // Top 12 most-used shadows, sorted by frequency descending
    shadows: Array.from(shadowMap.entries())
               .sort((a, b) => b[1] - a[1])
               .slice(0, 12),
  };
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function extractPhysicalTokens(url: string): Promise<{
  spacingSystem:   SpacingSystem;
  typographyScale: TypographyScale;
  skeleton:        SkeletonHints;
  assets:          AssetCollection;
  shadowSpecs:     ShadowSpec[];
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
      skeleton:        raw.skeleton,
      assets:          raw.assets,
      shadowSpecs:     raw.shadows.map(([value, frequency]) => ({ value, frequency })),
    };
  } finally {
    await browser.close();
  }
}
