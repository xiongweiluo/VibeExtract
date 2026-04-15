/**
 * Design Spec Writer
 *
 * Generates a human-readable spec.md file under docs/research/ for each
 * extraction run. The spec serves as the "archaeology report" — it records
 * what we physically measured, how the site's visual weight is distributed,
 * and what the AI's critique concluded.
 *
 * Spec files are written to:
 *   docs/research/{hostname}_{YYYYMMDD-HHmmss}_spec.md
 */

import fs from 'fs';
import path from 'path';
import type { DesignTokens } from '../types';

// ── Visual weight analysis ────────────────────────────────────────────────────

type VisualWeightVerdict =
  | 'image-dominant'   // Big hero images / photography carry the mood
  | 'grid-dominant'    // Card grids / data tables structure the experience
  | 'type-dominant'    // Editorial typography drives the narrative
  | 'color-dominant'   // Bold brand palette or color blocks define the space
  | 'balanced';        // No single force dominates

interface WeightAnalysis {
  verdict:     VisualWeightVerdict;
  headline:    string;   // One-sentence conclusion
  evidence:    string[]; // Bullet-point evidence list
}

function analyseVisualWeight(tokens: DesignTokens): WeightAnalysis {
  const { siteArchitecture: sa, skeleton: sk, assets } = tokens;
  const dominant = sa.visualWeight.dominant;
  const imageCount = assets?.images.length ?? 0;

  const evidence: string[] = [];
  let verdict: VisualWeightVerdict = 'balanced';
  let headline = '';

  // — Imagery signals
  const imagerySignals = [
    dominant === 'imagery',
    imageCount >= 15,
    sk.hero.layout === 'full-bleed',
    sa.paradigm === 'portfolio' || sa.paradigm === 'e-commerce',
  ].filter(Boolean).length;

  // — Grid / data signals
  const gridSignals = [
    dominant === 'data',
    sk.cards.present && sk.cards.gridColumns >= 3,
    sa.layout.type === 'grid' || sa.layout.type === 'masonry',
    sa.paradigm === 'dashboard' || sa.paradigm === 'social-feed',
  ].filter(Boolean).length;

  // — Typography signals
  const typeSignals = [
    dominant === 'typography',
    sa.visualWeight.hierarchy === 'editorial',
    sa.paradigm === 'content-site' || sa.paradigm === 'docs',
    sa.density === 'spacious',
  ].filter(Boolean).length;

  // — Color signals
  const colorSignals = [
    dominant === 'color',
    sa.visualWeight.hierarchy === 'expressive',
  ].filter(Boolean).length;

  // Determine verdict by majority signal count
  const max = Math.max(imagerySignals, gridSignals, typeSignals, colorSignals);

  if (max === 0 || (imagerySignals === max && gridSignals === max)) {
    verdict = 'balanced';
  } else if (imagerySignals === max) {
    verdict = 'image-dominant';
  } else if (gridSignals === max) {
    verdict = 'grid-dominant';
  } else if (typeSignals === max) {
    verdict = 'type-dominant';
  } else if (colorSignals === max) {
    verdict = 'color-dominant';
  }

  // Collect evidence bullets
  if (imageCount > 0) {
    evidence.push(`${imageCount} image asset${imageCount !== 1 ? 's' : ''} detected (${imageCount >= 20 ? 'heavy' : imageCount >= 8 ? 'moderate' : 'light'} image density)`);
  }
  if (assets?.svgs && assets.svgs.length > 0) {
    evidence.push(`${assets.svgs.length} SVG asset${assets.svgs.length !== 1 ? 's' : ''} detected`);
  }
  if (sk.hero.present) {
    evidence.push(`Hero section: ${sk.hero.layout} layout — "${sk.hero.headline.slice(0, 60)}${sk.hero.headline.length > 60 ? '…' : ''}"`);
  }
  if (sk.cards.present) {
    evidence.push(`Card grid: ${sk.cards.gridColumns}-column${sk.cards.hasShadow ? ', elevated (has shadow)' : ', flat'}`);
  }
  evidence.push(`Layout: ${sa.layout.type} / nav ${sa.layout.navPosition}`);
  evidence.push(`Density: ${sa.density} (${tokens.spacing.baseUnit}px base grid)`);
  evidence.push(`Visual hierarchy: ${sa.visualWeight.hierarchy}`);

  // Build headline
  const paradigmLabel: Record<string, string> = {
    landing: 'marketing landing page',
    'saas-app': 'SaaS application',
    'e-commerce': 'e-commerce storefront',
    'content-site': 'content / editorial site',
    portfolio: 'portfolio showcase',
    docs: 'documentation site',
    'social-feed': 'social feed',
    dashboard: 'data dashboard',
  };
  const paradigmStr = paradigmLabel[sa.paradigm] ?? sa.paradigm;

  const verdictDescriptions: Record<VisualWeightVerdict, string> = {
    'image-dominant': 'large-format photography and imagery',
    'grid-dominant':  'a structured card grid and data density',
    'type-dominant':  'editorial typography and text hierarchy',
    'color-dominant': 'a bold brand color palette',
    'balanced':       'a balanced composition of multiple forces',
  };

  headline = `This ${paradigmStr} is sustained by **${verdictDescriptions[verdict]}**.`;

  return { verdict, headline, evidence };
}

// ── Colour palette table ──────────────────────────────────────────────────────

function colorSwatch(hex: string): string {
  // Inline HTML color block for terminal-compatible markdown
  return `\`${hex}\``;
}

function buildColorTable(tokens: DesignTokens): string {
  const { color: c } = tokens;
  const rows = [
    ['Brand Primary',        c.brand.primary,        colorSwatch(c.brand.primary)],
    ['Brand Secondary',      c.brand.secondary,      colorSwatch(c.brand.secondary)],
    ['Brand Accent',         c.brand.accent,         colorSwatch(c.brand.accent)],
    ['Background Page',      c.background.page,      colorSwatch(c.background.page)],
    ['Background Surface',   c.background.surface,   colorSwatch(c.background.surface)],
    ['Background Overlay',   c.background.overlay,   c.background.overlay],
    ['Text Primary',         c.text.primary,         colorSwatch(c.text.primary)],
    ['Text Secondary',       c.text.secondary,       colorSwatch(c.text.secondary)],
    ['Text Inverse',         c.text.inverse,         colorSwatch(c.text.inverse)],
    ['Border',               c.border,               colorSwatch(c.border)],
    ['Status Success',       c.status.success,       colorSwatch(c.status.success)],
    ['Status Warning',       c.status.warning,       colorSwatch(c.status.warning)],
    ['Status Error',         c.status.error,         colorSwatch(c.status.error)],
  ];
  const header = '| Role | Value | Token |\n|---|---|---|';
  const body   = rows.map(([role, value, token]) => `| ${role} | ${value} | ${token} |`).join('\n');
  return `${header}\n${body}`;
}

// ── Typography table ──────────────────────────────────────────────────────────

function buildTypographyTable(tokens: DesignTokens): string {
  const scale = tokens.typography.scale;
  const entries: Array<[string, string, string]> = [
    ['xs',   scale.xs.size,    scale.xs.lineHeight],
    ['sm',   scale.sm.size,    scale.sm.lineHeight],
    ['base', scale.base.size,  scale.base.lineHeight],
    ['lg',   scale.lg.size,    scale.lg.lineHeight],
    ['xl',   scale.xl.size,    scale.xl.lineHeight],
    ['2xl',  scale['2xl'].size, scale['2xl'].lineHeight],
    ['3xl',  scale['3xl'].size, scale['3xl'].lineHeight],
    ['4xl',  scale['4xl'].size, scale['4xl'].lineHeight],
  ];
  const header = '| Level | Size | Line Height |\n|---|---|---|';
  const body   = entries.map(([l, s, lh]) => `| \`${l}\` | ${s} | ${lh} |`).join('\n');
  return `${header}\n${body}`;
}

// ── Physical measurements section ─────────────────────────────────────────────

function buildPhysicalSection(tokens: DesignTokens): string {
  const parts: string[] = [];

  if (tokens.spacingSystem) {
    const s = tokens.spacingSystem;
    parts.push('### Spacing (computed CSS)');
    parts.push(`- **Base unit:** ${s.baseUnit}px`);
    parts.push(`- **Measured steps:** ${s.steps.join(' · ')}`);
    parts.push(`- **Named scale:** xs=${s.named.xs} sm=${s.named.sm} md=${s.named.md} lg=${s.named.lg} xl=${s.named.xl} 2xl=${s.named['2xl']} 3xl=${s.named['3xl']}`);
  }

  if (tokens.typographyScale) {
    const t = tokens.typographyScale;
    parts.push('');
    parts.push('### Typography (computed CSS)');
    parts.push(`- **Root body size:** ${t.baseSize} / ${t.baseSizeRem}`);
    if (t.families.length > 0) {
      parts.push(`- **Detected families:** ${t.families.join(', ')}`);
    }
    parts.push('');
    parts.push('| px | rem | Line Height | Weight | Letter Spacing | Role |');
    parts.push('|---|---|---|---|---|---|');
    for (const step of t.steps) {
      const ls = step.letterSpacing ?? '—';
      parts.push(`| ${step.px} | ${step.rem} | ${step.lineHeight} | ${step.weight} | ${ls} | ${step.role} |`);
    }
  }

  if (tokens.shadowSpecs && tokens.shadowSpecs.length > 0) {
    parts.push('');
    parts.push('### Box Shadows (measured from UI components)');
    parts.push('');
    parts.push('| Frequency | CSS Value |');
    parts.push('|---|---|');
    for (const spec of tokens.shadowSpecs) {
      parts.push(`| ×${spec.frequency} | \`${spec.value}\` |`);
    }
  }

  return parts.length > 0 ? parts.join('\n') : '_Physical extraction was not available for this run._';
}

// ── Asset inventory section ───────────────────────────────────────────────────

function buildAssetSection(tokens: DesignTokens): string {
  const assets = tokens.assets;
  const hasAny =
    assets &&
    (assets.images.length > 0 ||
      assets.svgs.length > 0 ||
      (assets.gradients?.length ?? 0) > 0 ||
      (assets.inlineSvgs?.length ?? 0) > 0);

  if (!hasAny) return '_No external assets detected._';

  const parts: string[] = [];

  if (assets!.images.length > 0) {
    parts.push(`### Images (${assets!.images.length})`);
    assets!.images.slice(0, 20).forEach(url => parts.push(`- ${url}`));
    if (assets!.images.length > 20) {
      parts.push(`_…and ${assets!.images.length - 20} more_`);
    }
  }

  if (assets!.svgs.length > 0) {
    parts.push('');
    parts.push(`### External SVGs (${assets!.svgs.length})`);
    assets!.svgs.forEach(url => parts.push(`- ${url}`));
  }

  if (assets!.gradients && assets!.gradients.length > 0) {
    parts.push('');
    parts.push(`### CSS Gradients (${assets!.gradients.length})`);
    parts.push('_Real background-image gradient values — use as-is in CSS._');
    parts.push('');
    parts.push('| Element | Gradient |');
    parts.push('|---|---|');
    for (const g of assets!.gradients) {
      parts.push(`| \`${g.element}\` | \`${g.value.slice(0, 120)}${g.value.length > 120 ? '…' : ''}\` |`);
    }
  }

  if (assets!.inlineSvgs && assets!.inlineSvgs.length > 0) {
    parts.push('');
    parts.push(`### Inline SVGs (${assets!.inlineSvgs.length} captured)`);
    parts.push('_Raw <svg> source — icons, logos, illustrations. Embed directly in generated HTML._');
    parts.push('');
    assets!.inlineSvgs.forEach((src, i) => {
      const preview = src.slice(0, 200).replace(/\n/g, ' ');
      parts.push(`<details><summary>SVG #${i + 1} (${src.length} chars)</summary>\n\n\`\`\`html\n${src}\n\`\`\`\n\n</details>`);
    });
  }

  return parts.join('\n');
}

// ── Main export ───────────────────────────────────────────────────────────────

export interface SpecResult {
  /** Absolute path to the written spec file */
  filePath: string;
  /** VisualWeight verdict for downstream use */
  verdict:  VisualWeightVerdict;
}

export async function writeDesignSpec(
  targetUrl:     string,
  tokens:        DesignTokens,
  designCritique: string,
): Promise<SpecResult> {
  const now      = new Date();
  const ts       = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const hostname = (() => {
    try { return new URL(targetUrl).hostname.replace(/^www\./, ''); }
    catch { return 'unknown'; }
  })();

  const weight  = analyseVisualWeight(tokens);
  const sa      = tokens.siteArchitecture;
  const sk      = tokens.skeleton;
  const typo    = tokens.typography;

  const content = `# Design Spec — ${hostname}

> **Extracted:** ${now.toUTCString()}
> **URL:** ${targetUrl}
> **Paradigm:** ${sa.paradigm} · **Density:** ${sa.density} · **Motif:** ${sa.motif}

---

## Visual Weight Verdict

**${weight.verdict.toUpperCase().replace('-', ' ')}**

${weight.headline}

### Evidence
${weight.evidence.map(e => `- ${e}`).join('\n')}

---

## Color Architecture

${buildColorTable(tokens)}

---

## Typography System

**Families:** body — \`${typo.families.body}\` · heading — \`${typo.families.heading}\`${typo.families.mono ? ` · mono — \`${typo.families.mono}\`` : ''}

${buildTypographyTable(tokens)}

---

## Spacing

- **Base unit:** ${tokens.spacing.baseUnit}px
- **Scale:** ${Object.entries(tokens.spacing.scale).map(([k, v]) => `${k}=${v}`).join(' · ')}

---

## Site Architecture

| Property | Value |
|---|---|
| Paradigm | ${sa.paradigm} |
| Layout | ${sa.layout.type} |
| Nav position | ${sa.layout.navPosition} |
| Density | ${sa.density} |
| Dominant element | ${sa.visualWeight.dominant} |
| Visual hierarchy | ${sa.visualWeight.hierarchy} |

---

## Skeleton

| Component | Details |
|---|---|
| Hero | ${sk.hero.present ? `present · ${sk.hero.layout} · "${sk.hero.headline.slice(0, 60)}" · ${sk.hero.ctaCount} CTA${sk.hero.ctaCount !== 1 ? 's' : ''}` : 'not detected'} |
| Nav | brand: "${sk.nav.brand}" · items: ${sk.nav.items.length > 0 ? sk.nav.items.join(', ') : '—'} |
| Cards | ${sk.cards.present ? `${sk.cards.gridColumns}-column grid · ${sk.cards.hasShadow ? 'elevated' : 'flat'}` : 'not detected'} |
| Footer | ${sk.footer.present ? `${sk.footer.columns} column${sk.footer.columns !== 1 ? 's' : ''}` : 'not detected'} |

---

## Physical Measurements

${buildPhysicalSection(tokens)}

---

## Asset Inventory

${buildAssetSection(tokens)}

---

## Design Critique (AI Phase 1)

<details>
<summary>Expand raw critique</summary>

${designCritique}

</details>
`;

  // Write to docs/research/
  const outDir  = path.join(process.cwd(), 'docs', 'research');
  const outFile = path.join(outDir, `${hostname}_${ts}_spec.md`);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, content, 'utf-8');

  return { filePath: outFile, verdict: weight.verdict };
}
