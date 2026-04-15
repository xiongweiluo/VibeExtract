import Anthropic from '@anthropic-ai/sdk';
import type { DesignTokens } from '../types';
import type { SpacingSystem, TypographyScale, ShadowSpec } from './cssExtractor';

// ── Physical calibration context ─────────────────────────────────────────────
// When Puppeteer measurements are available, we serialize them into a compact
// text block that the AI must treat as authoritative ground truth. This prevents
// the AI from guessing sizes it can only estimate visually.

interface PhysicalContext {
  spacingSystem?:   SpacingSystem;
  typographyScale?: TypographyScale;
  shadowSpecs?:     ShadowSpec[];
}

function buildPhysicalCalibrationBlock(ctx: PhysicalContext | undefined): string {
  if (!ctx || (!ctx.spacingSystem && !ctx.typographyScale)) return '';

  const lines: string[] = [
    '',
    '## PHYSICAL MEASUREMENTS (computed CSS — treat as authoritative ground truth)',
    'These values were measured directly from the live DOM via getComputedStyle().',
    'They override any visual estimates in the sections above. Calibrate all tokens to match.',
    '',
  ];

  if (ctx.spacingSystem) {
    const s = ctx.spacingSystem;
    lines.push(`### Spacing`);
    lines.push(`  Base unit: ${s.baseUnit}px`);
    lines.push(`  Snapped scale: ${s.steps.join(', ')}`);
    lines.push(`  Named tokens: xs=${s.named.xs} sm=${s.named.sm} md=${s.named.md} lg=${s.named.lg} xl=${s.named.xl} 2xl=${s.named['2xl']} 3xl=${s.named['3xl']}`);
    lines.push('');
  }

  if (ctx.typographyScale) {
    const t = ctx.typographyScale;
    lines.push(`### Typography`);
    lines.push(`  Base body size: ${t.baseSize} (${t.baseSizeRem})`);
    if (t.families.length > 0) {
      lines.push(`  Detected font families: ${t.families.join(', ')}`);
    }
    lines.push(`  Measured type steps (px | rem | lineHeight | weight | letter-spacing | role):`);
    for (const step of t.steps) {
      lines.push(`    ${step.px} | ${step.rem} | lh:${step.lineHeight} | w:${step.weight} | ls:${step.letterSpacing} | ${step.role}`);
    }
    lines.push('');
  }

  if (ctx.shadowSpecs && ctx.shadowSpecs.length > 0) {
    lines.push(`### Box Shadows (measured from UI components)`);
    lines.push(`  These are exact multi-layer CSS values from buttons, cards, nav, and panels.`);
    lines.push(`  Use the most frequent value as shadow.md (card elevation standard).`);
    for (const spec of ctx.shadowSpecs.slice(0, 6)) {
      lines.push(`    [×${spec.frequency}] ${spec.value}`);
    }
    lines.push('');
  }

  lines.push('Use these exact px/rem values when populating typography.scale and spacing fields.');
  lines.push('Use the measured box-shadow values when populating shadow.sm / shadow.md / shadow.lg / shadow.xl.');
  lines.push('If a measured step maps to a scale level, use its measured value, not a visual estimate.');

  return lines.join('\n');
}

// ── Model ─────────────────────────────────────────────────────────────────────
// Upgraded from Haiku to Sonnet — critique-first reasoning requires stronger
// visual intelligence. Haiku cannot reliably infer color semantics or
// multi-element sampling patterns.
const MODEL = 'claude-sonnet-4-6';

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — Design Critique
//
// Force the AI to think before it outputs. The critique is a chain-of-thought
// that anchors all subsequent token decisions.
// ─────────────────────────────────────────────────────────────────────────────

const CRITIQUE_SYSTEM = `You are a senior design systems architect reviewing a UI screenshot.
Your task is to produce a rigorous Design Critique — a structured analysis that will guide
precise design-token extraction. This is NOT the final output; it is your thinking tool.

Write the critique in four labelled sections:

## COLOR SEMANTICS
Identify every distinct color used in the UI. For each, assign a semantic role:
  Brand-Primary    — dominant CTA / interactive color
  Brand-Secondary  — supporting accent or complementary hue
  Brand-Accent     — hover / highlight state
  Neutral-Surface  — card / panel background (not the page itself)
  Neutral-Base     — main page/body background
  Neutral-Overlay  — modal scrim / tooltip backdrop
  Text-Main        — primary body text
  Text-Muted       — secondary / helper / metadata text
  Text-Inverse     — text on dark or branded backgrounds
  Border-Default   — separator / outline color
  Status-Success / Status-Warning / Status-Error — feedback indicators

For each role, state:
  - The approximate HEX or rgba value you observe
  - WHY you classify it in this role (dominant area, interaction pattern, contrast ratio intent)
  - Whether it appears in multiple unrelated components (cross-context consistency check)

## SPACING MATHEMATICS
Sample at least FIVE distinct spacing measurements (gaps between cards, padding inside buttons,
section margins, nav height, list row height). Write them as raw pixel estimates.
Then:
  1. List the raw values in ascending order.
  2. Find the base unit: is the GCD of all values 4px or 8px?
  3. For each raw value, show the SNAPPED value: nearest multiple of the base unit.
  4. State the detected baseUnit explicitly.

Example:
  raw values: 7px, 16px, 23px, 32px, 47px
  GCD analysis → base unit = 8px
  snapped: 8px, 16px, 24px, 32px, 48px

## TYPOGRAPHY HIERARCHY
Sample at least THREE instances each of: hero/display text, section headings, body text, and labels.
For each group:
  - Estimated pixel size (from visual comparison)
  - Apparent font weight
  - Line-height ratio
  - Role in the hierarchy (H1, H2, body, caption…)

Then derive a consistent 8-step scale (xs → 4xl) from these samples.

## VISUAL LANGUAGE
In 3–5 precise descriptors, characterise this design's personality.
Avoid generic words ("modern", "clean", "minimal").
Prefer specific terms: "neo-brutalist", "soft-glassmorphic", "data-dense monochrome",
"editorial swiss-grid", "saturated consumer-brand", "system-UI enterprise", etc.

Be specific. Be opinionated. Your critique will be passed directly to the extraction step.`;

const CRITIQUE_USER = `Study this UI screenshot carefully.
Produce a Design Critique following the four-section format in your instructions.
Be analytical and specific — raw measurements, named color roles, snapped spacing values.`;

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — Token Extraction
//
// The AI receives its own critique as context and must now produce exact JSON.
// The critique has already done the heavy thinking; this step is translation.
// ─────────────────────────────────────────────────────────────────────────────

const EXTRACTION_SYSTEM = `You are a design systems engineer converting a Design Critique into a
precise JSON token set. You have already performed the analysis. Now translate it faithfully.

Rules you must follow WITHOUT EXCEPTION:

COLOR RULES
  • Never copy a raw screen-captured value blindly. Use the semantic roles from your critique.
  • All color values must be 6-digit HEX (#RRGGBB), except background.overlay which may use rgba().
  • Map roles: Brand-Primary → color.brand.primary, Neutral-Base → color.background.page, etc.
  • If a status color was not visible, use the nearest on-brand tint or these defaults:
    success=#10B981, warning=#F59E0B, error=#EF4444.

SPACING RULES
  • Use ONLY the snapped values from your spacing analysis — never raw measured values.
  • If baseUnit=4, the scale multipliers are: xs=1×, sm=2×, md=4×, lg=6×, xl=8×, 2xl=12×, 3xl=16×
  • If baseUnit=8, the scale multipliers are: xs=1×, sm=2×, md=4×, lg=6×, xl=8×, 2xl=12×, 3xl=16×
  • Compute the scale arithmetically. Do not invent arbitrary values.

TYPOGRAPHY RULES
  • Derive font sizes from your sampled hierarchy — use the closest clean pixel value.
  • lineHeight must be a unitless ratio string (e.g. "1.5", not "24px").
  • If only one typeface is visible, set families.body = families.heading.
  • families.mono = "ui-monospace, monospace" if no monospace font is detected.

SCHEMA
The JSON must exactly conform to this TypeScript interface — no extra keys, no missing keys:

interface DesignTokens {
  color: {
    brand:      { primary: string; secondary: string; accent: string };
    background: { page: string; surface: string; overlay: string };
    text:       { primary: string; secondary: string; inverse: string };
    border:     string;
    status:     { success: string; warning: string; error: string };
  };
  typography: {
    families: { body: string; heading: string; mono: string };
    weights:  { regular: string; medium: string; semibold: string; bold: string };
    scale: {
      xs:    { size: string; lineHeight: string };
      sm:    { size: string; lineHeight: string };
      base:  { size: string; lineHeight: string };
      lg:    { size: string; lineHeight: string };
      xl:    { size: string; lineHeight: string };
      "2xl": { size: string; lineHeight: string };
      "3xl": { size: string; lineHeight: string };
      "4xl": { size: string; lineHeight: string };
    };
  };
  spacing: {
    baseUnit: number;
    scale: { xs: string; sm: string; md: string; lg: string; xl: string; "2xl": string; "3xl": string };
  };
  radius: { none: string; sm: string; md: string; lg: string; xl: string; full: string };
  shadow: { sm: string; md: string; lg: string; xl: string };
  siteArchitecture: {
    paradigm: "landing"|"saas-app"|"e-commerce"|"content-site"|"portfolio"|"docs"|"social-feed"|"dashboard";
    density:  "compact"|"comfortable"|"spacious";
    motif:    string;
    layout:   { type: "single-column"|"multi-column"|"sidebar"|"grid"|"masonry"; navPosition: "top-fixed"|"top-static"|"side"|"floating"|"minimal" };
    visualWeight: { dominant: "typography"|"imagery"|"data"|"color"; hierarchy: "editorial"|"functional"|"expressive" };
  };
  skeleton: {
    hero:   { present: boolean; layout: "centered"|"split"|"full-bleed"|"asymmetric"|"none"; headline: string; ctaCount: number };
    nav:    { brand: string; items: string[] };
    cards:  { present: boolean; gridColumns: number; hasShadow: boolean };
    footer: { present: boolean; columns: number };
  };
}

OUTPUT ONLY the raw JSON object. No markdown fences, no commentary, no trailing text.
Any character outside the JSON braces will cause a parse failure.`;

const EXTRACTION_USER = `Based on your Design Critique above, produce the DesignTokens JSON.

Translate each section of your critique directly:
  • COLOR SEMANTICS → color.*  (use semantic roles, never raw screen values)
  • SPACING MATHEMATICS → spacing.baseUnit + spacing.scale  (use snapped values only)
  • TYPOGRAPHY HIERARCHY → typography.scale  (use sampled step values)
  • VISUAL LANGUAGE → siteArchitecture.motif  (use your precise descriptors)

For the remaining fields (radius, shadow, siteArchitecture.*, skeleton.*):
  re-examine the screenshot with fresh eyes and fill them precisely.

Return only the JSON object.`;

// ─────────────────────────────────────────────────────────────────────────────
// Error class
// ─────────────────────────────────────────────────────────────────────────────

export class ExtractionError extends Error {
  constructor(
    message: string,
    public readonly raw?: string,
  ) {
    super(message);
    this.name = 'ExtractionError';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Post-processing: snap spacing values to the 4 / 8 px grid
//
// Even with strong prompting, the AI occasionally drifts (e.g. outputs "12px"
// when baseUnit=8 — which should be "16px"). This guard layer corrects it.
// ─────────────────────────────────────────────────────────────────────────────

const SCALE_MULTIPLIERS: Record<string, number> = {
  xs: 1, sm: 2, md: 4, lg: 6, xl: 8, '2xl': 12, '3xl': 16,
};

function snapSpacing(tokens: DesignTokens): DesignTokens {
  const base = tokens.spacing.baseUnit;
  // Accept only 4 or 8; snap to nearest otherwise.
  const unit = base <= 6 ? 4 : 8;

  const snapped: Record<string, string> = {};
  for (const [key, mult] of Object.entries(SCALE_MULTIPLIERS)) {
    snapped[key] = `${unit * mult}px`;
  }

  return {
    ...tokens,
    spacing: {
      baseUnit: unit,
      scale: snapped as DesignTokens['spacing']['scale'],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

export async function extractDesignSystem(
  screenshotBuffer: Buffer,
  mimeType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp' = 'image/png',
  physicalData?: PhysicalContext,
): Promise<DesignTokens & { designCritique: string }> {
  const client = new Anthropic();

  const imageBlock: Anthropic.ImageBlockParam = {
    type: 'image',
    source: {
      type: 'base64',
      media_type: mimeType,
      data: screenshotBuffer.toString('base64'),
    },
  };

  // ── Turn 1 ── Design Critique ───────────────────────────────────────────────
  // The AI analyses the image holistically: color semantics, spacing math,
  // typography sampling, visual language. No JSON yet.

  const critiqueResponse = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: CRITIQUE_SYSTEM,
    messages: [
      {
        role: 'user',
        content: [imageBlock, { type: 'text', text: CRITIQUE_USER }],
      },
    ],
  });

  const critiqueBlock = critiqueResponse.content[0];
  if (critiqueBlock.type !== 'text') {
    throw new ExtractionError('Unexpected non-text response in critique phase.');
  }
  const designCritique = critiqueBlock.text.trim();

  // Build physical calibration block — appended to the critique so the AI
  // "owns" the measured data before it starts generating JSON.
  const physicalBlock = buildPhysicalCalibrationBlock(physicalData);
  const calibratedCritique = physicalBlock
    ? `${designCritique}\n${physicalBlock}`
    : designCritique;

  // ── Turn 2 ── Token Extraction ──────────────────────────────────────────────
  // The AI receives the image + its own critique (augmented with physical
  // measurements if available) and translates the analysis into final JSON.
  // The calibration block binds visual estimates to real computed values.

  const extractionResponse = await client.messages.create({
    model: MODEL,
    max_tokens: 3072,
    system: EXTRACTION_SYSTEM,
    messages: [
      // Original user message (image + critique request)
      {
        role: 'user',
        content: [imageBlock, { type: 'text', text: CRITIQUE_USER }],
      },
      // AI's own critique, augmented with measured physical values.
      // The model "owns" this combined text — it will use measured px/rem as ground truth.
      {
        role: 'assistant',
        content: calibratedCritique,
      },
      // Extraction request: translate critique → JSON
      {
        role: 'user',
        content: EXTRACTION_USER,
      },
    ],
  });

  const extractionBlock = extractionResponse.content[0];
  if (extractionBlock.type !== 'text') {
    throw new ExtractionError('Unexpected non-text response in extraction phase.');
  }

  const raw = extractionBlock.text.trim();
  const jsonText = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let tokens: DesignTokens;
  try {
    tokens = JSON.parse(jsonText) as DesignTokens;
  } catch {
    throw new ExtractionError('Extraction phase returned non-JSON output.', raw);
  }

  validateTokens(tokens);

  // Apply spacing grid correction as a safety net after validation.
  const corrected = snapSpacing(tokens);

  return { ...corrected, designCritique };
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

function validateTokens(t: unknown): asserts t is DesignTokens {
  const required: string[] = [
    // color
    'color', 'color.brand', 'color.brand.primary', 'color.brand.secondary', 'color.brand.accent',
    'color.background', 'color.background.page', 'color.background.surface', 'color.background.overlay',
    'color.text', 'color.text.primary', 'color.text.secondary', 'color.text.inverse',
    'color.border',
    'color.status', 'color.status.success', 'color.status.warning', 'color.status.error',
    // typography
    'typography', 'typography.families', 'typography.families.body', 'typography.families.heading', 'typography.families.mono',
    'typography.weights', 'typography.weights.regular', 'typography.weights.medium', 'typography.weights.semibold', 'typography.weights.bold',
    'typography.scale', 'typography.scale.xs', 'typography.scale.xs.size', 'typography.scale.xs.lineHeight',
    'typography.scale.sm', 'typography.scale.sm.size',
    'typography.scale.base', 'typography.scale.base.size',
    'typography.scale.lg', 'typography.scale.lg.size',
    'typography.scale.xl', 'typography.scale.xl.size',
    'typography.scale.2xl', 'typography.scale.2xl.size',
    'typography.scale.3xl', 'typography.scale.3xl.size',
    'typography.scale.4xl', 'typography.scale.4xl.size',
    // spacing
    'spacing', 'spacing.baseUnit',
    'spacing.scale', 'spacing.scale.xs', 'spacing.scale.sm', 'spacing.scale.md',
    'spacing.scale.lg', 'spacing.scale.xl', 'spacing.scale.2xl', 'spacing.scale.3xl',
    // radius
    'radius', 'radius.none', 'radius.sm', 'radius.md', 'radius.lg', 'radius.xl', 'radius.full',
    // shadow
    'shadow', 'shadow.sm', 'shadow.md', 'shadow.lg', 'shadow.xl',
    // siteArchitecture
    'siteArchitecture', 'siteArchitecture.paradigm', 'siteArchitecture.density',
    'siteArchitecture.motif', 'siteArchitecture.layout', 'siteArchitecture.layout.type',
    'siteArchitecture.layout.navPosition', 'siteArchitecture.visualWeight',
    'siteArchitecture.visualWeight.dominant', 'siteArchitecture.visualWeight.hierarchy',
    // skeleton
    'skeleton', 'skeleton.hero', 'skeleton.hero.present', 'skeleton.hero.layout',
    'skeleton.hero.headline', 'skeleton.hero.ctaCount',
    'skeleton.nav', 'skeleton.nav.brand', 'skeleton.nav.items',
    'skeleton.cards', 'skeleton.cards.present', 'skeleton.cards.gridColumns', 'skeleton.cards.hasShadow',
    'skeleton.footer', 'skeleton.footer.present', 'skeleton.footer.columns',
  ];

  for (const path of required) {
    const value = path.split('.').reduce<unknown>((obj, key) => {
      if (obj !== null && typeof obj === 'object') {
        return (obj as Record<string, unknown>)[key];
      }
      return undefined;
    }, t);

    if (value === undefined || value === null) {
      throw new ExtractionError(`Missing required token field: "${path}"`);
    }
  }
}
