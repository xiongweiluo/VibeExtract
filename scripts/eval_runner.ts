/**
 * VibeExtract — EDD Eval Runner
 *
 * Automated evaluation pipeline for the 10 test sites defined in evals.json.
 * Uses Playwright (Chromium) for browser automation and optionally calls the
 * Claude AI pipeline for full DesignTokens extraction and validation.
 *
 * Usage:
 *   ts-node --project tsconfig.scripts.json scripts/eval_runner.ts
 *   ts-node --project tsconfig.scripts.json scripts/eval_runner.ts --ai          # enable Claude AI pass
 *   ts-node --project tsconfig.scripts.json scripts/eval_runner.ts --physical-only  # skip AI pass
 *   ts-node --project tsconfig.scripts.json scripts/eval_runner.ts --site stripe    # single site
 *
 * Output:
 *   docs/eval_reports/latest_eval.md  — Markdown scoreboard
 *   docs/eval_reports/latest_eval.json — machine-readable results
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import { chromium, Browser, Page } from 'playwright';

import {
  buildSpacingSystem,
  buildTypographyScale,
  SpacingSystem,
  TypographyScale,
  SkeletonHints,
  AssetCollection,
  ShadowSpec,
  RawBrowserData,
} from '../src/services/cssExtractor';

import type { DesignTokens } from '../src/types';

// ─── CLI flags ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const AI_ENABLED =
  args.includes('--ai') && !args.includes('--physical-only');
const PHYSICAL_ONLY = args.includes('--physical-only');
const SINGLE_SITE = args.includes('--site')
  ? args[args.indexOf('--site') + 1]
  : null;

// ─── Types ────────────────────────────────────────────────────────────────────

interface RunConfig {
  viewportWidth: number;
  viewportHeight: number;
  navigationTimeout: number;
  settleDelayMs: number;
  screenshotType: 'png' | 'jpeg';
}

interface Assertion {
  id: string;
  description: string;
  source: 'physical' | 'tokens';
  field: string;
  op: string;
  expected: unknown;
  weight: number;
}

interface EvalSite {
  id: string;
  name: string;
  url: string;
  intent: string;
  category: string;
  notes?: string;
  assertions: Assertion[];
}

interface EvalConfig {
  version: string;
  generated: string;
  description: string;
  runConfig: RunConfig;
  sites: EvalSite[];
}

interface PhysicalData {
  spacingSystem: SpacingSystem;
  typographyScale: TypographyScale;
  skeleton: SkeletonHints;
  assets: AssetCollection;
  shadowSpecs: ShadowSpec[];
}

interface AssertionResult {
  id: string;
  description: string;
  source: 'physical' | 'tokens';
  field: string;
  op: string;
  expected: unknown;
  actual: unknown;
  passed: boolean;
  skipped: boolean;
  skipReason?: string;
  weight: number;
  error?: string;
}

interface SiteResult {
  site: EvalSite;
  durationMs: number;
  crashed: boolean;
  crashReason?: string;
  physicalData?: PhysicalData;
  tokens?: DesignTokens & { designCritique?: string };
  assertions: AssertionResult[];
  score: number;
  maxScore: number;
  pct: number;
  status: 'PASS' | 'PARTIAL' | 'FAIL' | 'CRASH';
}

// ─── Browser extraction script ────────────────────────────────────────────────
// Written as a JS IIFE string to avoid ts-node fn.toString() transpilation
// issues. This runs in the browser context via page.evaluate(BROWSER_SCRIPT).

const BROWSER_EXTRACT_SCRIPT = `
(function browserExtract() {
  var spacingSet = new Set();
  var fontMap    = new Map();
  var familySet  = new Set();

  var sample = Array.from(
    document.querySelectorAll(
      'h1,h2,h3,h4,h5,h6,p,a,button,label,li,span,div,section,article,header,nav,main,footer'
    )
  ).slice(0, 600);

  for (var i = 0; i < sample.length; i++) {
    var el = sample[i];
    var s = window.getComputedStyle(el);

    // Spacing
    var sVals = [
      s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft,
      s.marginTop,  s.marginBottom
    ];
    var disp = s.display;
    if (disp === 'flex' || disp === 'grid') {
      sVals.push(s.rowGap, s.columnGap);
    }
    for (var si = 0; si < sVals.length; si++) {
      var n = parseFloat(sVals[si]);
      if (n > 0 && n < 200 && isFinite(n)) spacingSet.add(Math.round(n));
    }

    // Typography
    var fs = parseFloat(s.fontSize);
    if (fs >= 10 && fs <= 96) {
      var lhRaw = s.lineHeight;
      var lhPx  = parseFloat(lhRaw);
      var lh = lhRaw === 'normal'
        ? 1.2
        : isFinite(lhPx)
          ? Math.round((lhPx / fs) * 10) / 10
          : 1.5;
      var fw = s.fontWeight;
      var ff = s.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
      var ls = s.letterSpacing === 'normal' ? '0px' : s.letterSpacing;
      var key = Math.round(fs) + '|' + lh + '|' + fw + '|' + ls;
      fontMap.set(key, (fontMap.get(key) || 0) + 1);
      if (ff && ff.length < 50) familySet.add(ff);
    }
  }

  var rootFs = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  ) || 16;

  // ── Skeleton ──────────────────────────────────────────────────────────────

  var navBrand = '';
  var navItemTexts = [];
  var navEl = document.querySelector('nav, header nav, [role="navigation"]');
  if (navEl) {
    var brandCandidates = navEl.querySelectorAll('a, [class*="logo"], [class*="brand"]');
    for (var bi = 0; bi < Math.min(brandCandidates.length, 5); bi++) {
      var bText = (brandCandidates[bi].textContent || '').trim().replace(/\\s+/g, ' ');
      if (bText.length > 1 && bText.length < 40) { navBrand = bText; break; }
    }
    var linkEls = navEl.querySelectorAll('a, button');
    for (var li2 = 0; li2 < linkEls.length; li2++) {
      var lText = (linkEls[li2].textContent || '').trim().replace(/\\s+/g, ' ');
      if (lText.length > 1 && lText.length < 30 && lText !== navBrand) {
        navItemTexts.push(lText);
        if (navItemTexts.length >= 6) break;
      }
    }
  }

  var h1El = document.querySelector('h1');
  var heroHeadline = h1El
    ? (h1El.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 80)
    : '';
  var heroPresent = !!h1El;

  var heroSection = document.querySelector(
    '[class*="hero"], section:first-of-type, main > *:first-child, header + *'
  );
  var heroCTACount = 0;
  if (heroSection) {
    var ctaEls = heroSection.querySelectorAll(
      'a[class*="btn"], a[class*="button"], a[class*="cta"], button:not([type="submit"])'
    );
    heroCTACount = Math.min(ctaEls.length, 5);
  }

  var cardsPresent  = false;
  var gridColumns   = 0;
  var hasShadow     = false;
  var cardEls = document.querySelectorAll('[class*="card"], [class*="Card"], article, [class*="item"]');
  if (cardEls.length >= 2) {
    cardsPresent = true;
    var cardParent = cardEls[0].parentElement;
    if (cardParent) {
      var ps = window.getComputedStyle(cardParent);
      if (ps.display === 'grid') {
        gridColumns = ps.gridTemplateColumns.split(' ').filter(Boolean).length;
      } else if (ps.display === 'flex' && ps.flexWrap !== 'nowrap') {
        var cardW   = cardEls[0].offsetWidth || 0;
        var parentW = cardParent.offsetWidth || 0;
        if (cardW > 0) gridColumns = Math.min(Math.floor(parentW / cardW), 6);
      }
      if (gridColumns === 0) gridColumns = Math.min(cardEls.length, 4);
    }
    var cardStyle = window.getComputedStyle(cardEls[0]);
    hasShadow = cardStyle.boxShadow !== 'none' && cardStyle.boxShadow !== '';
  }

  var footerEl      = document.querySelector('footer, [role="contentinfo"]');
  var footerPresent = !!footerEl;
  var footerColumns = 0;
  if (footerEl) {
    var fs2 = window.getComputedStyle(footerEl);
    if (fs2.display === 'grid') {
      footerColumns = fs2.gridTemplateColumns.split(' ').filter(Boolean).length;
    } else if (fs2.display === 'flex') {
      footerColumns = Math.min(Array.from(footerEl.children).length, 6);
    } else {
      var colCandidates = footerEl.querySelectorAll(':scope > div, :scope > ul, :scope > section, :scope > nav');
      footerColumns = Math.min(colCandidates.length, 6);
    }
    if (footerColumns === 0) footerColumns = 3;
  }

  // ── Assets ────────────────────────────────────────────────────────────────

  var imageUrlSet = new Set();
  var svgUrlSet   = new Set();
  var gradients   = [];

  document.querySelectorAll('img').forEach(function(img) {
    var src = img.src;
    if (src && !src.startsWith('data:') && src.startsWith('http')) {
      if (src.includes('.svg')) svgUrlSet.add(src);
      else imageUrlSet.add(src);
    }
    var srcset = img.getAttribute('srcset') || '';
    if (srcset) {
      srcset.split(',').forEach(function(entry) {
        var url = entry.trim().split(/\\s+/)[0];
        if (url && url.startsWith('http') && !url.startsWith('data:')) imageUrlSet.add(url);
      });
    }
  });

  document.querySelectorAll('source[srcset]').forEach(function(src) {
    var srcset = src.getAttribute('srcset') || '';
    srcset.split(',').forEach(function(entry) {
      var url = entry.trim().split(/\\s+/)[0];
      if (url && url.startsWith('http')) imageUrlSet.add(url);
    });
  });

  var bgTargets = Array.from(
    document.querySelectorAll('[class*="hero"],[class*="banner"],[class*="cover"],[class*="bg"],section,header,main')
  ).slice(0, 20);

  for (var bgi = 0; bgi < bgTargets.length; bgi++) {
    var bg = window.getComputedStyle(bgTargets[bgi]).backgroundImage;
    if (bg && bg !== 'none') {
      if (bg.includes('gradient')) {
        var cls = String(bgTargets[bgi].className || bgTargets[bgi].tagName).trim().slice(0, 60);
        if (!gradients.some(function(g) { return g.value === bg; })) {
          gradients.push({ element: cls, value: bg });
        }
      }
      var bgMatches = bg.matchAll(/url\\(["']?([^"')]+)["']?\\)/g);
      for (var bm of bgMatches) {
        var bgUrl = bm[1];
        if (bgUrl && !bgUrl.startsWith('data:') && bgUrl.startsWith('http')) imageUrlSet.add(bgUrl);
      }
    }
  }

  document.querySelectorAll('use').forEach(function(useEl) {
    var href = useEl.getAttribute('href') || useEl.getAttribute('xlink:href') || '';
    if (href && !href.startsWith('#') && href.includes('.svg')) {
      svgUrlSet.add(href.startsWith('http') ? href : location.origin + href);
    }
  });

  var inlineSvgSrcs = [];
  var svgEls = Array.from(document.querySelectorAll('svg'));
  for (var svi = 0; svi < Math.min(svgEls.length, 25); svi++) {
    var svgEl = svgEls[svi];
    var hasContent = svgEl.querySelector('path,rect,circle,ellipse,polygon,polyline,line');
    if (hasContent) {
      var svgSrc = svgEl.outerHTML;
      if (svgSrc.length > 0 && svgSrc.length < 8000) {
        inlineSvgSrcs.push(svgSrc);
        if (inlineSvgSrcs.length >= 10) break;
      }
    }
  }

  // ── Box-shadows ───────────────────────────────────────────────────────────

  var shadowMap = new Map();
  var shadowTargets = Array.from(
    document.querySelectorAll(
      'button,[class*="btn"],[class*="card"],[class*="modal"],[class*="panel"],' +
      '[class*="dialog"],[class*="dropdown"],[class*="popup"],[class*="toast"],' +
      '[class*="alert"],nav,header,[class*="sidebar"],[class*="drawer"]'
    )
  ).slice(0, 120);

  for (var shi = 0; shi < shadowTargets.length; shi++) {
    var bs = window.getComputedStyle(shadowTargets[shi]).boxShadow;
    if (bs && bs !== 'none' && bs !== '') {
      shadowMap.set(bs, (shadowMap.get(bs) || 0) + 1);
    }
  }

  return {
    spacing:      Array.from(spacingSet).sort(function(a, b) { return a - b; }),
    fonts:        Array.from(fontMap.entries())
                    .sort(function(a, b) { return b[1] - a[1]; })
                    .slice(0, 16),
    families:     Array.from(familySet).slice(0, 5),
    rootFontSize: rootFs,
    skeleton: {
      nav:    { brand: navBrand, items: navItemTexts },
      hero:   { present: heroPresent, headline: heroHeadline, ctaCount: heroCTACount },
      cards:  { present: cardsPresent, gridColumns: gridColumns, hasShadow: hasShadow },
      footer: { present: footerPresent, columns: footerColumns }
    },
    assets: {
      images:     Array.from(imageUrlSet).slice(0, 50),
      svgs:       Array.from(svgUrlSet).slice(0, 20),
      gradients:  gradients.slice(0, 10),
      inlineSvgs: inlineSvgSrcs
    },
    shadows: Array.from(shadowMap.entries())
               .sort(function(a, b) { return b[1] - a[1]; })
               .slice(0, 12)
  };
})()
`;

// ─── Physical data processing ─────────────────────────────────────────────────

function processRawBrowserData(raw: RawBrowserData): PhysicalData {
  return {
    spacingSystem:   buildSpacingSystem(raw.spacing),
    typographyScale: buildTypographyScale(raw.fonts, raw.families, raw.rootFontSize),
    skeleton:        raw.skeleton,
    assets:          raw.assets,
    shadowSpecs:     raw.shadows.map(([value, frequency]) => ({ value, frequency })),
  };
}

// ─── Assertion evaluation engine ──────────────────────────────────────────────

function getNestedValue(obj: unknown, dotPath: string): unknown {
  return dotPath.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/** Parse "16px" → 16. Returns NaN on failure. */
function parsePx(v: unknown): number {
  if (typeof v === 'number') return v;
  if (typeof v !== 'string') return NaN;
  return parseFloat(v);
}

/** Check if a hex color is dark (perceived luminance < 0.3). */
function isDarkHex(hex: string): boolean {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  // sRGB luminance (ITU-R BT.709)
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.3;
}

/** Check if a hex color is light (perceived luminance ≥ 0.7). */
function isLightHex(hex: string): boolean {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum >= 0.7;
}

function evaluateAssertion(
  physicalData: PhysicalData | undefined,
  tokens: (DesignTokens & { designCritique?: string }) | undefined,
  assertion: Assertion,
): AssertionResult {
  const base: Omit<AssertionResult, 'actual' | 'passed' | 'skipped'> = {
    id:          assertion.id,
    description: assertion.description,
    source:      assertion.source,
    field:       assertion.field,
    op:          assertion.op,
    expected:    assertion.expected,
    weight:      assertion.weight,
  };

  // Resolve data source
  const dataSource: unknown =
    assertion.source === 'physical' ? physicalData : tokens;

  if (dataSource === undefined) {
    const reason =
      assertion.source === 'physical'
        ? 'Physical extraction failed or was skipped'
        : 'AI token extraction was not run (omit --physical-only or add --ai to enable)';
    return { ...base, actual: undefined, passed: false, skipped: true, skipReason: reason };
  }

  const actual = getNestedValue(dataSource, assertion.field);

  try {
    let passed: boolean;
    switch (assertion.op) {
      case 'eq':
        passed = actual === assertion.expected;
        break;
      case 'notEq':
        passed = actual !== assertion.expected;
        break;
      case 'gt':
        passed = typeof actual === 'number' && actual > (assertion.expected as number);
        break;
      case 'gte':
        passed = typeof actual === 'number' && actual >= (assertion.expected as number);
        break;
      case 'lt':
        passed = typeof actual === 'number' && actual < (assertion.expected as number);
        break;
      case 'lte':
        passed = typeof actual === 'number' && actual <= (assertion.expected as number);
        break;
      case 'pxGte':
        passed = parsePx(actual) >= (assertion.expected as number);
        break;
      case 'pxLte':
        passed = parsePx(actual) <= (assertion.expected as number);
        break;
      case 'isTrue':
        passed = actual === true;
        break;
      case 'isFalse':
        passed = actual === false;
        break;
      case 'notEmpty':
        passed =
          actual !== undefined &&
          actual !== null &&
          actual !== '' &&
          !(Array.isArray(actual) && actual.length === 0);
        break;
      case 'isHexColor':
        passed = typeof actual === 'string' && /^#[0-9a-fA-F]{6}$/.test(actual);
        break;
      case 'isDarkColor':
        passed = typeof actual === 'string' && isDarkHex(actual);
        break;
      case 'isLightColor':
        passed = typeof actual === 'string' && isLightHex(actual);
        break;
      case 'hasLargeStep': {
        // actual is TypographyStep[] — check if any step has px >= expected
        if (!Array.isArray(actual)) { passed = false; break; }
        const threshold = assertion.expected as number;
        passed = actual.some(
          (step: unknown) =>
            typeof step === 'object' &&
            step !== null &&
            parsePx((step as Record<string, unknown>)['px']) >= threshold,
        );
        break;
      }
      case 'includes':
        if (typeof actual === 'string') {
          passed = actual.includes(assertion.expected as string);
        } else if (Array.isArray(actual)) {
          passed = actual.includes(assertion.expected);
        } else {
          passed = false;
        }
        break;
      case 'regex':
        passed =
          typeof actual === 'string' &&
          new RegExp(assertion.expected as string).test(actual);
        break;
      default:
        return { ...base, actual, passed: false, skipped: true, skipReason: `Unknown operator: ${assertion.op}` };
    }
    return { ...base, actual, passed, skipped: false };
  } catch (err) {
    return {
      ...base,
      actual,
      passed: false,
      skipped: false,
      error: String(err),
    };
  }
}

// ─── Score calculation ────────────────────────────────────────────────────────

function computeStatus(
  crashed: boolean,
  score: number,
  maxScore: number,
): SiteResult['status'] {
  if (crashed) return 'CRASH';
  if (maxScore === 0) return 'PASS';
  const pct = score / maxScore;
  if (pct >= 1.0) return 'PASS';
  if (pct >= 0.5) return 'PARTIAL';
  return 'FAIL';
}

// ─── Browser automation ───────────────────────────────────────────────────────

async function runPhysicalExtraction(page: Page): Promise<PhysicalData | null> {
  try {
    const raw = await page.evaluate(BROWSER_EXTRACT_SCRIPT) as RawBrowserData;
    return processRawBrowserData(raw);
  } catch (err) {
    console.error('    [physical] evaluate error:', err);
    return null;
  }
}

async function runAIExtraction(
  screenshotBuffer: Buffer,
  physicalData: PhysicalData | null,
): Promise<(DesignTokens & { designCritique: string }) | null> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('    [ai] ANTHROPIC_API_KEY not set — skipping AI pass');
    return null;
  }
  try {
    // Dynamic import to avoid requiring the Anthropic SDK when AI is disabled
    const { extractDesignSystem } = await import('../src/services/extractor');
    const physCtx = physicalData
      ? {
          spacingSystem:   physicalData.spacingSystem,
          typographyScale: physicalData.typographyScale,
          shadowSpecs:     physicalData.shadowSpecs,
        }
      : undefined;
    return await extractDesignSystem(screenshotBuffer, 'image/png', physCtx);
  } catch (err) {
    console.error('    [ai] extraction error:', err);
    return null;
  }
}

async function evalSite(
  browser: Browser,
  site: EvalSite,
  config: RunConfig,
  aiEnabled: boolean,
): Promise<SiteResult> {
  const startMs = Date.now();
  let crashed = false;
  let crashReason: string | undefined;
  let physicalData: PhysicalData | undefined;
  let tokens: (DesignTokens & { designCritique?: string }) | undefined;

  console.log(`\n  → ${site.name} (${site.url})`);

  const page = await browser.newPage();

  // Capture browser-side crashes
  page.on('crash', () => {
    crashed = true;
    crashReason = 'Playwright page crash event';
    console.error('    [crash] Page crashed!');
  });

  // Log page JS errors without failing the eval
  const jsErrors: string[] = [];
  page.on('pageerror', (err: Error) => {
    jsErrors.push(err.message);
  });

  try {
    await page.setViewportSize({
      width:  config.viewportWidth,
      height: config.viewportHeight,
    });

    // Block fonts/images for faster load — we only need DOM + CSS
    await page.route('**/*', (route) => {
      const type = route.request().resourceType();
      if (type === 'font' || type === 'media') {
        route.abort();
      } else {
        route.continue();
      }
    });

    console.log('    [nav] navigating…');
    try {
      await page.goto(site.url, {
        timeout:   config.navigationTimeout,
        waitUntil: 'domcontentloaded',
      });
    } catch (navErr) {
      // Partial load is still useful — continue
      console.warn(`    [nav] timeout/partial: ${navErr}`);
    }

    // Let CSS-in-JS / deferred stylesheets settle
    await page.waitForTimeout(config.settleDelayMs);

    // Screenshot (needed even for physical-only: AI might be added later)
    console.log('    [screenshot] capturing…');
    const screenshotBuffer = await page.screenshot({ type: 'png', fullPage: false });

    // Physical extraction
    console.log('    [physical] extracting DOM metrics…');
    const raw = await runPhysicalExtraction(page);
    if (raw) {
      physicalData = raw;
      console.log(
        `    [physical] done — ${raw.typographyScale.steps.length} type steps, ` +
        `${raw.assets.images.length} images, ` +
        `${raw.assets.gradients.length} gradients, ` +
        `${raw.shadowSpecs.length} shadow variants`,
      );
    } else {
      console.error('    [physical] returned null — possible crash or timeout');
    }

    // AI token extraction (optional)
    if (aiEnabled) {
      console.log('    [ai] calling Claude extraction pipeline…');
      const aiResult = await runAIExtraction(Buffer.from(screenshotBuffer), physicalData ?? null);
      if (aiResult) {
        tokens = aiResult;
        console.log(`    [ai] done — paradigm=${tokens.siteArchitecture?.paradigm ?? '?'}`);
      } else {
        console.error('    [ai] returned null — assertions using tokens will be skipped');
      }
    }
  } catch (err) {
    crashed = true;
    crashReason = String(err);
    console.error(`    [eval] unexpected error: ${err}`);
  } finally {
    await page.close();
  }

  // Run assertions
  const assertionResults = site.assertions.map((a) =>
    evaluateAssertion(physicalData, tokens, a),
  );

  // Scoring — skipped assertions contribute 0 to both score and maxScore
  const activeResults = assertionResults.filter((r) => !r.skipped);
  const score    = activeResults.filter((r) => r.passed).reduce((s, r) => s + r.weight, 0);
  const maxScore = activeResults.reduce((s, r) => s + r.weight, 0);
  const pct      = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;

  const durationMs = Date.now() - startMs;
  console.log(
    `    [result] ${score}/${maxScore} pts (${pct}%) — ${durationMs}ms` +
    (crashed ? ' — CRASHED' : ''),
  );

  return {
    site,
    durationMs,
    crashed,
    crashReason,
    physicalData,
    tokens,
    assertions: assertionResults,
    score,
    maxScore,
    pct,
    status: computeStatus(crashed, score, maxScore),
  };
}

// ─── Report generation ────────────────────────────────────────────────────────

function statusEmoji(status: SiteResult['status']): string {
  switch (status) {
    case 'PASS':    return '✅';
    case 'PARTIAL': return '⚠️';
    case 'FAIL':    return '❌';
    case 'CRASH':   return '💥';
  }
}

function assertionEmoji(r: AssertionResult): string {
  if (r.skipped) return '⏭';
  return r.passed ? '✅' : '❌';
}

function formatDuration(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

function formatActual(actual: unknown): string {
  if (actual === undefined) return '—';
  if (actual === null)      return 'null';
  if (Array.isArray(actual))  return `Array(${actual.length})`;
  if (typeof actual === 'object') return JSON.stringify(actual).slice(0, 60);
  return String(actual);
}

function generateMarkdownReport(
  results: SiteResult[],
  runDateMs: number,
  aiEnabled: boolean,
): string {
  const totalScore    = results.reduce((s, r) => s + r.score, 0);
  const totalMax      = results.reduce((s, r) => s + r.maxScore, 0);
  const totalPct      = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const passCount     = results.filter((r) => r.status === 'PASS').length;
  const partialCount  = results.filter((r) => r.status === 'PARTIAL').length;
  const failCount     = results.filter((r) => r.status === 'FAIL').length;
  const crashCount    = results.filter((r) => r.status === 'CRASH').length;
  const runDate       = new Date(runDateMs).toISOString();
  const totalDuration = results.reduce((s, r) => s + r.durationMs, 0);

  const lines: string[] = [];

  lines.push('# VibeExtract EDD Eval Report');
  lines.push('');
  lines.push(`**Generated**: ${runDate}`);
  lines.push(`**Mode**: ${aiEnabled ? 'Physical extraction + Claude AI tokens' : 'Physical extraction only'}`);
  lines.push(`**Browser**: Chromium (Playwright)`);
  lines.push(`**Total runtime**: ${formatDuration(totalDuration)}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`**Overall score**: ${totalScore}/${totalMax} (${totalPct}%)`);
  lines.push('');
  lines.push(
    `✅ Pass: **${passCount}** &nbsp; ⚠️ Partial: **${partialCount}** &nbsp; ❌ Fail: **${failCount}** &nbsp; 💥 Crash: **${crashCount}**`,
  );
  lines.push('');
  lines.push('| # | Site | Intent | Score | Pct | Duration | Status |');
  lines.push('|---|------|--------|-------|-----|----------|--------|');

  results.forEach((r, i) => {
    const em = statusEmoji(r.status);
    lines.push(
      `| ${i + 1} | **${r.site.name}** | ${r.site.intent} | ${r.score}/${r.maxScore} | ${r.pct}% | ${formatDuration(r.durationMs)} | ${em} ${r.status} |`,
    );
  });

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Detailed Results');

  for (const r of results) {
    lines.push('');
    lines.push(`### ${statusEmoji(r.status)} ${r.site.name}`);
    lines.push('');
    lines.push(`**URL**: ${r.site.url}`);
    lines.push(`**Intent**: ${r.site.intent}`);
    lines.push(`**Category**: ${r.site.category}`);
    lines.push(`**Duration**: ${formatDuration(r.durationMs)}`);
    lines.push(`**Crash**: ${r.crashed ? `YES — ${r.crashReason ?? ''}` : 'No'}`);
    lines.push(`**Score**: ${r.score}/${r.maxScore} (${r.pct}%)`);

    if (r.physicalData) {
      const p = r.physicalData;
      lines.push('');
      lines.push('**Physical extraction summary**:');
      lines.push(
        `- Spacing base unit: \`${p.spacingSystem.baseUnit}px\` — scale: ${p.spacingSystem.steps.join(', ')}`,
      );
      lines.push(
        `- Typography: ${p.typographyScale.steps.length} steps, base=${p.typographyScale.baseSize}, families: ${p.typographyScale.families.join(', ') || '(none detected)'}`,
      );
      lines.push(
        `- Assets: ${p.assets.images.length} images, ${p.assets.svgs.length} SVGs, ${p.assets.gradients.length} gradients, ${p.assets.inlineSvgs.length} inline SVGs`,
      );
      lines.push(
        `- Shadows: ${p.shadowSpecs.length} variant(s)${p.shadowSpecs.length > 0 ? ' — top: `' + p.shadowSpecs[0].value.slice(0, 80) + '`' : ''}`,
      );
      lines.push(
        `- Skeleton: nav="${p.skeleton.nav.brand}", hero=${p.skeleton.hero.present}, ` +
        `cards=${p.skeleton.cards.present} (${p.skeleton.cards.gridColumns} col), footer=${p.skeleton.footer.present}`,
      );
    }

    if (r.tokens) {
      lines.push('');
      lines.push('**AI token summary**:');
      const t = r.tokens;
      lines.push(`- Paradigm: \`${t.siteArchitecture?.paradigm}\` / Density: \`${t.siteArchitecture?.density}\``);
      lines.push(`- Layout: \`${t.siteArchitecture?.layout?.type}\` / Nav: \`${t.siteArchitecture?.layout?.navPosition}\``);
      lines.push(`- Colors — page: \`${t.color?.background?.page}\` surface: \`${t.color?.background?.surface}\` brand: \`${t.color?.brand?.primary}\``);
      lines.push(`- Body font: \`${t.typography?.families?.body}\``);
      lines.push(`- Base type: \`${t.typography?.scale?.base?.size}\` / lh: \`${t.typography?.scale?.base?.lineHeight}\``);
      lines.push(`- Spacing unit: \`${t.spacing?.baseUnit}px\``);
      lines.push(`- Motif: _${t.siteArchitecture?.motif}_`);
    }

    lines.push('');
    lines.push('**Assertions**:');
    lines.push('');
    lines.push('| # | ID | Description | Expected | Actual | Result |');
    lines.push('|---|----|-------------|----------|--------|--------|');

    r.assertions.forEach((a, ai) => {
      const em     = assertionEmoji(a);
      const exp    = a.expected === null ? '—' : String(a.expected);
      const act    = formatActual(a.actual);
      const result = a.skipped
        ? `⏭ SKIP${a.skipReason ? ' — ' + a.skipReason : ''}`
        : `${em} ${a.passed ? 'PASS' : 'FAIL'}${a.error ? ' (err: ' + a.error + ')' : ''}`;
      lines.push(`| ${ai + 1} | \`${a.id}\` | ${a.description} | \`${exp}\` | \`${act}\` | ${result} |`);
    });

    if (r.site.notes) {
      lines.push('');
      lines.push(`> **Note**: ${r.site.notes}`);
    }

    lines.push('');
    lines.push('---');
  }

  lines.push('');
  lines.push(`*Generated by VibeExtract EDD eval_runner.ts — ${runDate}*`);

  return lines.join('\n');
}

// ─── Entry point ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // Load eval config
  const evalsPath = path.join(__dirname, '..', 'evals.json');
  if (!fs.existsSync(evalsPath)) {
    console.error(`evals.json not found at ${evalsPath}`);
    process.exit(1);
  }
  const evalConfig: EvalConfig = JSON.parse(fs.readFileSync(evalsPath, 'utf-8'));

  // Filter sites if --site flag is provided
  let sites = evalConfig.sites;
  if (SINGLE_SITE) {
    sites = sites.filter((s) => s.id === SINGLE_SITE || s.name.toLowerCase().includes(SINGLE_SITE.toLowerCase()));
    if (sites.length === 0) {
      console.error(`No site found matching: ${SINGLE_SITE}`);
      console.error(`Available IDs: ${evalConfig.sites.map((s) => s.id).join(', ')}`);
      process.exit(1);
    }
  }

  const aiEnabled = AI_ENABLED && !PHYSICAL_ONLY;

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   VibeExtract — EDD Eval Runner                  ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`  Sites  : ${sites.length}`);
  console.log(`  Mode   : ${aiEnabled ? 'Physical + AI (Claude)' : 'Physical only'}`);
  console.log(`  Browser: Chromium (Playwright)`);
  if (aiEnabled && !process.env.ANTHROPIC_API_KEY) {
    console.warn('  ⚠️  ANTHROPIC_API_KEY not set — AI assertions will be skipped');
  }
  console.log('');

  const runDateMs = Date.now();
  const results: SiteResult[] = [];

  // Launch a single browser; open a new page per site for isolation
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  try {
    for (const site of sites) {
      const result = await evalSite(browser, site, evalConfig.runConfig, aiEnabled);
      results.push(result);
    }
  } finally {
    await browser.close();
  }

  // Generate reports
  const reportDir = path.join(__dirname, '..', 'docs', 'eval_reports');
  fs.mkdirSync(reportDir, { recursive: true });

  const mdReport   = generateMarkdownReport(results, runDateMs, aiEnabled);
  const mdPath     = path.join(reportDir, 'latest_eval.md');
  const jsonPath   = path.join(reportDir, 'latest_eval.json');

  fs.writeFileSync(mdPath, mdReport, 'utf-8');
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      results.map((r) => ({
        site:       { id: r.site.id, name: r.site.name, url: r.site.url, intent: r.site.intent },
        durationMs: r.durationMs,
        crashed:    r.crashed,
        crashReason:r.crashReason,
        score:      r.score,
        maxScore:   r.maxScore,
        pct:        r.pct,
        status:     r.status,
        assertions: r.assertions,
        // Omit raw physical/token blobs from JSON report to keep it readable
      })),
      null,
      2,
    ),
    'utf-8',
  );

  // Print final summary to console
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const totalMax   = results.reduce((s, r) => s + r.maxScore, 0);
  const totalPct   = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  console.log('');
  console.log('══════════════════════════════════════════════════');
  console.log(`  FINAL SCORE: ${totalScore}/${totalMax} (${totalPct}%)`);
  console.log('');
  for (const r of results) {
    console.log(
      `  ${statusEmoji(r.status)} ${r.site.name.padEnd(22)} ${String(r.score + '/' + r.maxScore).padEnd(6)} ${r.pct}%  ${formatDuration(r.durationMs)}`,
    );
  }
  console.log('══════════════════════════════════════════════════');
  console.log('');
  console.log(`  Markdown report: ${mdPath}`);
  console.log(`  JSON report    : ${jsonPath}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
