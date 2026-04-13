import Anthropic from '@anthropic-ai/sdk';
import type { DesignTokens } from '../types';

const MODEL = 'claude-haiku-4-5-20251001';

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a world-class UI architect and design systems engineer.
Given a screenshot of any website, you extract a complete, schema-conformant design token set
and return it as a single JSON object — no markdown fences, no commentary, no trailing text.

The JSON must exactly conform to this TypeScript interface:

interface DesignTokens {
  color: {
    brand:      { primary: string; secondary: string; accent: string };     // exact 6-digit HEX
    background: { page: string; surface: string; overlay: string };          // overlay may use rgba()
    text:       { primary: string; secondary: string; inverse: string };
    border:     string;
    status:     { success: string; warning: string; error: string };
  };
  typography: {
    families: { body: string; heading: string; mono: string };               // font-family stacks
    weights:  { regular: string; medium: string; semibold: string; bold: string }; // e.g. "400"
    scale: {
      xs:    { size: string; lineHeight: string };   // caption / label
      sm:    { size: string; lineHeight: string };   // small body
      base:  { size: string; lineHeight: string };   // default body
      lg:    { size: string; lineHeight: string };   // lead paragraph
      xl:    { size: string; lineHeight: string };   // card title
      "2xl": { size: string; lineHeight: string };   // section heading
      "3xl": { size: string; lineHeight: string };   // page heading
      "4xl": { size: string; lineHeight: string };   // hero / display
    };
  };
  spacing: {
    baseUnit: number;                                                         // 4 or 8 (px)
    scale: { xs: string; sm: string; md: string; lg: string; xl: string; "2xl": string; "3xl": string };
  };
  radius: { none: string; sm: string; md: string; lg: string; xl: string; full: string };
  shadow: { sm: string; md: string; lg: string; xl: string };                // full CSS box-shadow values
  siteArchitecture: {
    paradigm: "landing" | "saas-app" | "e-commerce" | "content-site" | "portfolio" | "docs" | "social-feed" | "dashboard";
    density:  "compact" | "comfortable" | "spacious";
    motif:    string;                                                         // 3–5 comma-separated tags
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

═══════════════════════════════════════════════════════════════════════════
EXTRACTION RULES
═══════════════════════════════════════════════════════════════════════════

COLOR
  • All values must be 6-digit HEX (#RRGGBB) except background.overlay which may use rgba().
  • brand.primary    = dominant interactive / CTA colour.
  • brand.secondary  = supporting accent (may be a tint or complementary hue).
  • brand.accent     = hover / highlight state colour (may equal secondary if unclear).
  • status.success/warning/error = semantic feedback colours; if not visible, use
    the closest on-brand tint or sensible defaults (#10B981 / #F59E0B / #EF4444).
  • text.inverse     = text colour intended for dark/branded backgrounds (usually white or near-white).

TYPOGRAPHY
  • families.body    = primary UI font used for body text.
  • families.heading = heading font (may equal body if one typeface is used throughout).
  • families.mono    = monospace font or "ui-monospace, monospace" if none detected.
  • weights          = derive from visual usage; if only bold/normal visible, set
    regular="400", medium="500", semibold="600", bold="700" as sensible defaults.
  • scale            = measure from the visual hierarchy. Typical values:
      xs   ≈ 11–13px / 1.4   (labels, captions)
      sm   ≈ 13–14px / 1.5
      base ≈ 15–17px / 1.6   (body copy)
      lg   ≈ 18–20px / 1.5
      xl   ≈ 20–24px / 1.4
      2xl  ≈ 24–32px / 1.3
      3xl  ≈ 32–48px / 1.2
      4xl  ≈ 48–80px / 1.1   (hero headline)
    Prefer px values. lineHeight must be a unitless ratio string, e.g. "1.5".

SPACING
  • Identify the base grid unit (almost always 4 or 8 px).
  • Compute scale deterministically from baseUnit:
      xs = 1×, sm = 2×, md = 4×, lg = 6×, xl = 8×, 2xl = 12×, 3xl = 16×
    Examples with base=4: xs="4px" sm="8px" md="16px" lg="24px" xl="32px" 2xl="48px" 3xl="64px"
    Examples with base=8: xs="8px" sm="16px" md="32px" lg="48px" xl="64px" 2xl="96px" 3xl="128px"

RADIUS
  • none = "0"  always.
  • full = "9999px" always.
  • sm   = input/badge radius (e.g. "4px" or "6px").
  • md   = button/card radius (e.g. "8px" or "12px").
  • lg   = panel/modal radius (e.g. "16px" or "20px").
  • xl   = sheet/drawer radius (e.g. "24px" or "28px").
  • A flat design → all small values; a bubbly design → large values.

SHADOW
  • Observe the page's depth / elevation cues. Flat designs use very subtle or no shadows;
    layered designs have distinct elevation levels.
  • sm  = hairline (nearly invisible), md = card standard, lg = elevated panel, xl = modal/overlay.
  • If the site is flat/neumorphic, make all shadows very subtle.
  • If dramatic shadows are visible, use realistic rgba blur values.

SITE ARCHITECTURE
  • paradigm: choose the SINGLE best match:
      landing      — marketing hero + sections + CTA rows
      saas-app     — task-oriented UI, forms, data tables
      e-commerce   — product listings, cart, checkout flow
      content-site — text-dominant, articles, editorial
      portfolio    — showcase, image-heavy
      docs         — structured reference / knowledge base
      social-feed  — repeating user-generated content cards / infinite scroll
      dashboard    — metrics, charts, sidebar nav, dense data
  • density: compact = tight gutters; spacious = generous breathing room.
  • motif: 3–5 concise descriptors specific to THIS site's visual personality.
    Avoid generic terms. Good: "neo-brutalist, saturated palette, heavy borders".
    Bad: "modern, clean, minimal".
  • layout.navPosition: top-fixed = sticky top nav; top-static = non-sticky top;
    side = sidebar; floating = overlaid / transparent; minimal = hidden or very sparse.

SKELETON
  • hero.present    = true if a large above-the-fold hero section is visible.
  • hero.layout     = spatial arrangement (centered / split / full-bleed / asymmetric / none).
  • hero.headline   = extract the EXACT text from the largest visible heading (max 80 chars).
                     If not readable, write a representative paraphrase.
  • hero.ctaCount   = count primary CTA buttons in the hero zone.
  • nav.brand       = extract the exact brand/logo name from the navigation bar.
  • nav.items       = list navigation link labels visible in the top or side nav (max 6).
  • cards.present   = true if a grid or list of repeating card components is visible.
  • cards.gridColumns = 0 if no cards; otherwise count columns in the primary card grid.
  • cards.hasShadow = true if cards carry a visible box-shadow / elevation.
  • footer.present  = true if a footer is visible.
  • footer.columns  = estimate number of footer content columns.

OUTPUT ONLY the raw JSON object. Any character outside the JSON will cause a parse error.`;

// ── User prompt ───────────────────────────────────────────────────────────────

const USER_PROMPT = `Analyse this UI screenshot carefully and extract the full DesignTokens object.

Work through each section in order:

1. COLORS — identify brand primary, secondary, accent; page/surface/overlay backgrounds;
   primary/secondary/inverse text; border colour; status colours.

2. TYPOGRAPHY — identify font families (body, heading, mono); font weights in use;
   measure or estimate all 8 scale steps (xs → 4xl) with sizes and line-heights.

3. SPACING — identify the base grid unit (4 or 8 px) then compute the full named scale.

4. RADIUS — observe corner radii on inputs, buttons, cards, modals; assign none/sm/md/lg/xl/full.

5. SHADOW — observe depth and elevation cues; assign sm/md/lg/xl box-shadow values.

6. SITE ARCHITECTURE — classify the paradigm, density, motif; describe layout type and nav position;
   analyse visual weight (dominant element, design hierarchy philosophy).

7. SKELETON — extract the actual hero headline text, nav brand name and item labels, card grid info,
   footer presence. Be specific — use text you can read in the screenshot.

Return only the JSON object. No other text.`;

// ── Error class ───────────────────────────────────────────────────────────────

export class ExtractionError extends Error {
  constructor(
    message: string,
    public readonly raw?: string,
  ) {
    super(message);
    this.name = 'ExtractionError';
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function extractDesignSystem(
  screenshotBuffer: Buffer,
  mimeType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp' = 'image/png',
): Promise<DesignTokens> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mimeType, data: screenshotBuffer.toString('base64') },
          },
          { type: 'text', text: USER_PROMPT },
        ],
      },
    ],
  });

  const firstBlock = response.content[0];
  if (firstBlock.type !== 'text') {
    throw new ExtractionError('Unexpected response type from Claude API');
  }

  const raw = firstBlock.text.trim();
  const jsonText = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let tokens: DesignTokens;
  try {
    tokens = JSON.parse(jsonText) as DesignTokens;
  } catch {
    throw new ExtractionError('Claude returned non-JSON output.', raw);
  }

  validateTokens(tokens);
  return tokens;
}

// ── Validation ────────────────────────────────────────────────────────────────

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
