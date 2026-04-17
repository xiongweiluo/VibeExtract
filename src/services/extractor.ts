import Anthropic from '@anthropic-ai/sdk';
import type { DesignTokens } from '../types';
import type { SpacingSystem, TypographyScale, ShadowSpec, ZIndexLayer } from './cssExtractor';

// ── Physical context ──────────────────────────────────────────────────────────
// Complete Playwright-measured data passed into the hybrid restoration engine.
// Every field is ground truth — the AI must use these values, not visual guesses.

interface PhysicalContext {
  spacingSystem?:   SpacingSystem;
  typographyScale?: TypographyScale;
  shadowSpecs?:     ShadowSpec[];
  assets?: {
    images:     string[];
    svgs:       string[];
    gradients:  Array<{ element: string; value: string }>;
    inlineSvgs: string[];
  };
  skeleton?: {
    nav:    { brand: string; items: string[] };
    hero:   { present: boolean; headline: string; ctaCount: number };
    cards:  { present: boolean; gridColumns: number; hasShadow: boolean };
    footer: { present: boolean; columns: number };
  };
  zIndexLayers?: ZIndexLayer[];
}

// Serialize all physical data into a compact, clearly-labelled text block
// that is injected directly into the USER message (not the assistant turn).
// This places the data where the model expects authoritative instructions.
function buildPhysicalDataBlock(ctx: PhysicalContext | undefined): string {
  if (!ctx) return '';

  const parts: string[] = [
    '',
    '════════════════════════════════════════════════════════════════',
    '  PHYSICAL DATA  (Playwright / getComputedStyle — AUTHORITATIVE)',
    '  Measured directly from the live DOM. These values are ground',
    '  truth. Any visual estimate that conflicts with this data is',
    '  WRONG — always defer to these measurements.',
    '════════════════════════════════════════════════════════════════',
    '',
  ];

  // ── Spacing ────────────────────────────────────────────────────────────────
  if (ctx.spacingSystem) {
    const s = ctx.spacingSystem;
    parts.push('## SPACING (use exact px values — never round to Tailwind presets)');
    parts.push(`  Base unit : ${s.baseUnit}px`);
    parts.push(`  Scale     : ${s.steps.join(', ')}`);
    parts.push(`  Named     : xs=${s.named.xs}  sm=${s.named.sm}  md=${s.named.md}  lg=${s.named.lg}  xl=${s.named.xl}  2xl=${s.named['2xl']}  3xl=${s.named['3xl']}`);
    parts.push('');
  }

  // ── Typography ──────────────────────────────────────────────────────────────
  if (ctx.typographyScale) {
    const t = ctx.typographyScale;
    parts.push('## TYPOGRAPHY (use exact px step values in Tailwind classes)');
    parts.push(`  Base body  : ${t.baseSize}  (${t.baseSizeRem})`);
    if (t.families.length > 0) {
      parts.push(`  Families   : ${t.families.join(', ')}`);
    }
    parts.push('  Steps  px | rem | lh | weight | letter-spacing | role:');
    for (const step of t.steps) {
      parts.push(`    ${step.px.padEnd(6)} ${step.rem.padEnd(10)} lh:${step.lineHeight.padEnd(5)} w:${step.weight.padEnd(5)} ls:${step.letterSpacing.padEnd(8)} ${step.role}`);
    }
    parts.push('');
  }

  // ── Box Shadows ────────────────────────────────────────────────────────────
  if (ctx.shadowSpecs && ctx.shadowSpecs.length > 0) {
    parts.push('## BOX SHADOWS (exact CSS values from buttons, cards, nav, panels)');
    parts.push('  Map the most-frequent value → shadow.md (card elevation standard).');
    for (const spec of ctx.shadowSpecs.slice(0, 6)) {
      parts.push(`  [×${spec.frequency}] ${spec.value}`);
    }
    parts.push('');
  }

  // ── Assets ─────────────────────────────────────────────────────────────────
  if (ctx.assets) {
    const a = ctx.assets;
    parts.push('## ASSETS (only these URLs exist — never invent or guess asset paths)');
    parts.push('  ⚠ CONSTRAINT: every assetRef in uiBlueprint components must be an');
    parts.push('  exact entry from this list. If nothing matches, omit assetRef entirely.');
    parts.push('');

    if (a.images.length > 0) {
      parts.push(`  IMAGES (${a.images.length} total — first 20 shown):`);
      a.images.slice(0, 20).forEach((url, i) =>
        parts.push(`    [img-${i}] ${url}`),
      );
      parts.push('');
    }

    if (a.svgs.length > 0) {
      parts.push(`  SVG FILES (${a.svgs.length} total):`);
      a.svgs.slice(0, 10).forEach((url, i) =>
        parts.push(`    [svg-${i}] ${url}`),
      );
      parts.push('');
    }

    if (a.gradients.length > 0) {
      parts.push('  CSS GRADIENTS (copy the value verbatim — never paraphrase):');
      a.gradients.slice(0, 8).forEach((g, i) =>
        parts.push(`    [grad-${i}] element="${g.element}"  value="${g.value}"`),
      );
      parts.push('');
    }

    if (a.inlineSvgs.length > 0) {
      parts.push(`  INLINE SVGs: ${a.inlineSvgs.length} inline <svg> element(s) captured.`);
      parts.push('  Reference in assetRef as: inline-svg:0, inline-svg:1, etc.');
      parts.push('');
    }
  }

  // ── Skeleton signals ────────────────────────────────────────────────────────
  if (ctx.skeleton) {
    const sk = ctx.skeleton;
    parts.push('## SKELETON SIGNALS (DOM-derived structural hints)');
    parts.push(`  Nav   : brand="${sk.nav.brand}"  items=[${sk.nav.items.slice(0, 6).map(i => `"${i}"`).join(', ')}]`);
    parts.push(`  Hero  : present=${sk.hero.present}  headline="${sk.hero.headline.slice(0, 60)}"  ctas=${sk.hero.ctaCount}`);
    parts.push(`  Cards : present=${sk.cards.present}  columns=${sk.cards.gridColumns}  hasShadow=${sk.cards.hasShadow}`);
    parts.push(`  Footer: present=${sk.footer.present}  columns=${sk.footer.columns}`);
    parts.push('');
  }

  // ── Z-index layer map ───────────────────────────────────────────────────────
  if (ctx.zIndexLayers && ctx.zIndexLayers.length > 0) {
    parts.push('## Z-INDEX LAYERS (positioned overlay elements — highest z first)');
    for (const layer of ctx.zIndexLayers.slice(0, 15)) {
      parts.push(`  z=${String(layer.zIndex).padEnd(6)} pos=${layer.position.padEnd(10)} <${layer.role}>  "${layer.className}"`);
    }
    parts.push('');
  }

  parts.push('════════════════════════════════════════════════════════════════');

  return parts.join('\n');
}

// ── Model ─────────────────────────────────────────────────────────────────────
// Upgraded from Haiku to Sonnet — critique-first reasoning requires stronger
// visual intelligence. Haiku cannot reliably infer color semantics or
// multi-element sampling patterns.
const MODEL = 'claude-sonnet-4-6';

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — Layout Analysis
//
// The AI receives the screenshot AND Playwright physical data together.
// Its job is to produce a structured spatial analysis — section inventory,
// grid geometry, Z-index layers, asset audit, color semantics — before any JSON.
// Physical Data is declared authoritative in the system prompt.
// ─────────────────────────────────────────────────────────────────────────────

const LAYOUT_ANALYSIS_SYSTEM = `You are a high-fidelity frontend restoration engineer.
Your mission: reconstruct a web page's exact UI structure from two authoritative sources
you will receive in the user message — a Screenshot and Physical Data from Playwright.

INPUT CONTRACT
  • Screenshot    : A pixel-accurate viewport capture of the rendered page.
  • Physical Data : Playwright/getComputedStyle measurements — exact spacing, typography,
                   box-shadows, real asset URLs, skeleton signals, Z-index layer map.

HIERARCHY OF TRUTH
  Physical Data > Screenshot visual estimates.
  If you estimate "16px gap" visually but Physical Data shows "20px", use 20px.
  If an image URL is not in Physical Data assets, it does not exist for our purposes.

Produce a structured Layout Analysis in four labelled sections:

## SECTION INVENTORY
  Identify every top-level page region visible in the screenshot. For each:
    • Name           : semantic identifier (nav | hero | feature-grid | testimonials |
                       pricing | cta-banner | content | footer | sidebar | other)
    • Vertical span  : approximate % of viewport height (e.g. "0–8%")
    • Z-layer        : base (normal flow) | floating (sticky/fixed) | overlay (modal/drawer)
    • Background     : solid-color | gradient | image | transparent
    • Dominant visual: typography | imagery | interactive-controls | data

## SPATIAL GRID ANALYSIS
  For every section containing repeated elements (cards, list rows, feature cells):
    • Layout engine  : CSS Grid | Flexbox | absolute
    • Column count   : from Physical Data skeleton.cards.gridColumns if applicable,
                       otherwise derive from visual column pattern
    • Gap size       : cross-reference Physical Data spacing scale
                       (e.g. "gap ≈ spacing.md = 32px")
    • Item pattern   : fixed-width | fluid | aspect-ratio-locked
    • Masonry note   : flag any waterfall / masonry pattern (unequal row heights)
  For floating/fixed elements (sticky nav, floating CTA, cookie banners):
    • Cross-reference Physical Data Z-index layers
    • State z-index tier and position type (e.g. "nav: z=100, position=fixed")

## ASSET AUDIT
  From the Physical Data asset list, identify which assets appear in the screenshot:
    • Hero bg       : URL or gradient value from Physical Data (or "none detected")
    • Logo/brand    : inline-svg index, img URL, or "text-only brand"
    • Card images   : up to 5 representative img URLs from Physical Data assets.images
    • Icon set      : inline-svg count, or SVG file URL pattern
  RULE: Only reference assets that exist in Physical Data. Never invent URLs.
  Mark as "no asset found" when the Physical Data provides nothing matching.

## COLOR SEMANTICS
  For each distinct color role observable in the screenshot:
    • Observed hex  : your visual estimate (will be validated against screenshot)
    • Semantic role : Brand-Primary | Brand-Secondary | Brand-Accent |
                     Neutral-Base | Neutral-Surface | Neutral-Overlay |
                     Text-Main | Text-Muted | Text-Inverse | Border-Default |
                     Status-Success | Status-Warning | Status-Error
    • Evidence      : which components use this color (buttons, backgrounds, text…)

Be systematic and specific. This analysis drives the final UI blueprint JSON.`;

const LAYOUT_ANALYSIS_USER = `Analyze this web page using the two data sources below.

SOURCE 1 — SCREENSHOT (attached image above)
  A pixel-accurate capture of the rendered page. Use it for visual layout interpretation,
  color observation, and spatial relationship inference.

SOURCE 2 — PHYSICAL DATA (text block below)
  Playwright measurements from the live DOM. This is authoritative ground truth.
  Every value here overrides your visual estimate if there is a conflict.

Produce a complete Layout Analysis following the four-section format in your instructions.
Note any discrepancy between what you see visually and what Physical Data reports.`;

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — Blueprint Generation
//
// The AI receives its own Layout Analysis as context and translates it into
// the final JSON token set + uiBlueprint. Iron-clad constraints prevent it
// from inventing colors, asset URLs, or spacing values not present in
// Physical Data.
// ─────────────────────────────────────────────────────────────────────────────

const BLUEPRINT_SYSTEM = `You are a high-fidelity frontend restoration engineer.
Your task: translate a Layout Analysis + Physical Data into a complete JSON token set
and UI blueprint that the preview rendering engine can use directly.

╔══════════════════════════════════════════════════════════════════╗
║   IRON-CLAD CONSTRAINTS — ZERO EXCEPTIONS PERMITTED             ║
╚══════════════════════════════════════════════════════════════════╝

CONSTRAINT 1 — NO INVENTED COLORS
  All hex values in the "color" block must come from your Color Semantics analysis
  (visually observed and justified). In Tailwind layout/component classes, always
  reference colors via CSS variable tokens — never write raw hex literals:
    bg-[var(--color-bg-page)]          text-[var(--color-text-primary)]
    border-[var(--color-border-default)]  bg-[var(--color-brand-primary)]

CONSTRAINT 2 — NO INVENTED ASSET REFERENCES
  Every "assetRef" field in uiBlueprint components must be one of:
    • An exact URL from Physical Data assets.images or assets.svgs
    • A gradient CSS value verbatim from Physical Data assets.gradients[n].value
    • "inline-svg:<n>" for Physical Data assets.inlineSvgs[n]
  If nothing in Physical Data matches, OMIT the assetRef field entirely.
  Never construct, guess, interpolate, or approximate asset paths.

CONSTRAINT 3 — SPACING FROM PHYSICAL DATA
  All spacing in Tailwind classes must reflect Physical Data measured values.
  Use arbitrary-value syntax: px-[20px]  gap-[32px]  h-[72px]  py-[48px]
  Never snap to a Tailwind preset if Physical Data reports a different value.

CONSTRAINT 4 — TYPOGRAPHY FROM PHYSICAL DATA
  Font sizes in classes use Physical Data step px values: text-[14px]  text-[32px]
  Font families reference detected families: font-['Inter',_sans-serif]
  Weights use measured values: font-[400]  font-[600]

CONSTRAINT 5 — COMPLETE SCHEMA
  The JSON must include ALL standard DesignTokens fields AND uiBlueprint.
  Every section from the Layout Analysis Section Inventory must appear
  in uiBlueprint.sections. No required field may be absent or null.

CONSTRAINT 6 — TOKEN CONSERVATION: COLLAPSE REPEATING STRUCTURES  ← HIGHEST PRIORITY
  This constraint overrides verbosity. Violating it WILL truncate the JSON and
  cause a fatal parse error.

  DETECTION RULE — A "repeating structure" is any parent component that contains
  ≥ 2 children sharing the same layout pattern:
    • grid / flex card lists (search results, listing tiles, product grids)
    • navigation tab rows or pill groups
    • dropdown / menu item lists
    • icon-label row lists (feature rows, pricing rows, footer links)
    • carousel / slider items

  MANDATORY COLLAPSE RULE — when a repeating structure is detected:
    1. Output EXACTLY 1 representative child (the most visually complete one).
    2. Add "repeats": <total_count> on the PARENT component node.
       Example: a 24-card search grid → output 1 card + "repeats": 24 on the
       grid wrapper.
    3. NEVER output the full list. Not even 2 items. Not even 3. ONE only.

  ABSOLUTE PROHIBITION — The following patterns are BANNED in the output JSON:
    ✗ arrays of cards, tiles, or list items with length > 1
    ✗ nav "items" arrays with length > 3 (collapse beyond 3 with "repeats")
    ✗ menu / dropdown children arrays with length > 1
    ✗ Any component array whose serialised JSON exceeds 400 characters

  CANONICAL COLLAPSED SHAPE:
    {
      "role": "card-grid",
      "repeats": 24,
      "classes": "grid grid-cols-[3] gap-[24px] ...",
      "children": [
        { "role": "card", "classes": "...", "components": [ /* 1 representative card only */ ] }
      ]
    }

╔══════════════════════════════════════════════════════════════════╗
║   ANTI-HALLUCINATION & ABSOLUTE FIDELITY PROTOCOL               ║
║   VIOLATION OF ANY RULE BELOW IS A FATAL OUTPUT ERROR           ║
╚══════════════════════════════════════════════════════════════════╝

CONSTRAINT 7 — WYSIWYG LAYOUT: SCREENSHOT IS THE ONLY SOURCE OF TRUTH
  The structure of uiBlueprint MUST be a direct mirror of what is visually
  rendered in the Screenshot — section by section, hierarchy by hierarchy.

  ABSOLUTE PROHIBITIONS:
    ✗ Do NOT reconstruct or infer layouts from training memory of "typical"
      websites. Your knowledge of common patterns (dashboards, sidebars,
      carousels, hero sections, etc.) is IRRELEVANT if not visible in the
      Screenshot.
    ✗ Do NOT invent UI regions (sidebars, data panels, tab bars, footers,
      modals) that are absent from the Screenshot.
    ✗ Do NOT reorder or restructure sections to match what you "expect" a
      site of this category to look like.
    ✗ Do NOT promote or demote any element's visual hierarchy beyond what
      the Screenshot shows.

  MANDATORY VERIFICATION:
    Before emitting each section or component, ask: "Is this element
    unambiguously visible in the Screenshot?" If the answer is "no" or
    "maybe", OMIT it. Absence is always safer than invention.

CONSTRAINT 8 — PIXEL-PERFECT TEXT: COPY WHAT YOU SEE, NOTHING MORE
  Every "content" field in uiBlueprint components must contain verbatim
  text copied from the Screenshot.

  ABSOLUTE PROHIBITIONS:
    ✗ Do NOT write placeholder text of any kind (Lorem Ipsum, "Heading",
      "Description", "Item 1", "Button text", etc.).
    ✗ Do NOT fabricate business data: no fake metrics, statistics, usernames,
      product names, prices, dates, or any data not visible in the Screenshot.
    ✗ Do NOT paraphrase, summarize, or "clean up" visible text — copy it
      character-for-character, including punctuation and casing.

  RULE FOR ILLEGIBLE TEXT:
    If a text element is too small or blurry to read with certainty, set
    "content": "" (empty string). Empty is correct. Invented text is a
    fatal hallucination.

CONSTRAINT 9 — DUAL-SOURCE CROSS-VALIDATION: EVERY TOKEN MUST CLEAR BOTH GATES
  Before any color, font, or asset token is written into the output JSON,
  it MUST simultaneously satisfy BOTH of the following conditions:

    GATE A — VISUAL GATE:  The element using this token must be visually
      present and identifiable in the Screenshot. If you cannot point to
      its pixel location in the Screenshot, it fails Gate A.

    GATE B — DATA GATE:  The token value (hex, font-family string, URL,
      inline-svg index) must be sourced verbatim from the Physical Data
      passed in the first message. If the value is not in Physical Data,
      it fails Gate B.

  ABSOLUTE PROHIBITIONS:
    ✗ Do NOT invent hex color values not present in Physical Data, even if
      you can "see" the color in the Screenshot — use only the closest
      measured value from Physical Data color arrays.
    ✗ Do NOT construct, derive, or guess image/asset URLs. If an image is
      visible in the Screenshot but its URL is absent from Physical Data
      assets, omit the assetRef field entirely.
    ✗ Do NOT reference font families not listed in Physical Data typography,
      even if the Screenshot appears to use a different typeface.

  Any token that fails either gate must be REMOVED from the output. A missing
  token is recoverable. A fabricated token corrupts the entire design system.

╔══════════════════════════════════════════════════════════════════╗
║   OUTPUT JSON SCHEMA (produce every field exactly as shown)     ║
╚══════════════════════════════════════════════════════════════════╝

{
  "color": {
    "brand":      { "primary": "#RRGGBB", "secondary": "#RRGGBB", "accent": "#RRGGBB" },
    "background": { "page": "#RRGGBB", "surface": "#RRGGBB", "overlay": "rgba(0,0,0,0.5)" },
    "text":       { "primary": "#RRGGBB", "secondary": "#RRGGBB", "inverse": "#RRGGBB" },
    "border":     "#RRGGBB",
    "status":     { "success": "#10B981", "warning": "#F59E0B", "error": "#EF4444" }
  },
  "typography": {
    "families": { "body": "...", "heading": "...", "mono": "ui-monospace, monospace" },
    "weights":  { "regular": "400", "medium": "500", "semibold": "600", "bold": "700" },
    "scale": {
      "xs":   { "size": "12px", "lineHeight": "1.4" },
      "sm":   { "size": "14px", "lineHeight": "1.5" },
      "base": { "size": "16px", "lineHeight": "1.5" },
      "lg":   { "size": "18px", "lineHeight": "1.6" },
      "xl":   { "size": "20px", "lineHeight": "1.4" },
      "2xl":  { "size": "24px", "lineHeight": "1.3" },
      "3xl":  { "size": "30px", "lineHeight": "1.2" },
      "4xl":  { "size": "36px", "lineHeight": "1.1" }
    }
  },
  "spacing": {
    "baseUnit": 8,
    "scale": { "xs": "8px", "sm": "16px", "md": "32px", "lg": "48px", "xl": "64px", "2xl": "96px", "3xl": "128px" }
  },
  "radius": { "none": "0", "sm": "4px", "md": "8px", "lg": "12px", "xl": "16px", "full": "9999px" },
  "shadow": { "sm": "0 1px 2px rgba(0,0,0,0.06)", "md": "0 4px 12px rgba(0,0,0,0.08)", "lg": "0 8px 24px rgba(0,0,0,0.12)", "xl": "0 20px 60px rgba(0,0,0,0.20)" },
  "siteArchitecture": {
    "paradigm": "landing|saas-app|e-commerce|content-site|portfolio|docs|social-feed|dashboard",
    "density":  "compact|comfortable|spacious",
    "motif":    "3–5 comma-separated visual descriptors — be specific, not generic",
    "layout":   { "type": "single-column|multi-column|sidebar|grid|masonry", "navPosition": "top-fixed|top-static|side|floating|minimal" },
    "visualWeight": { "dominant": "typography|imagery|data|color", "hierarchy": "editorial|functional|expressive" }
  },
  "skeleton": {
    "hero":   { "present": true, "layout": "centered|split|full-bleed|asymmetric|none", "headline": "...", "ctaCount": 2 },
    "nav":    { "brand": "...", "items": ["...", "..."] },
    "cards":  { "present": true, "gridColumns": 3, "hasShadow": true },
    "footer": { "present": true, "columns": 4 }
  },
  "uiBlueprint": {
    "sections": [
      {
        "id": "nav",
        "semanticType": "nav",
        "layoutClasses": "fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-[48px] h-[72px] bg-[var(--color-bg-page)] border-b border-[var(--color-border-default)]",
        "zLayer": "floating",
        "components": [
          {
            "role": "brand-logo",
            "classes": "h-[32px] w-auto shrink-0",
            "assetRef": "inline-svg:0"
          },
          {
            "role": "nav-links",
            "classes": "hidden md:flex items-center gap-[32px] text-[14px] font-[500] text-[var(--color-text-primary)]"
          },
          {
            "role": "cta-button",
            "classes": "px-[20px] py-[10px] rounded-[8px] bg-[var(--color-brand-primary)] text-[var(--color-text-inverse)] text-[14px] font-[600]",
            "content": "Get Started"
          }
        ]
      }
    ]
  }
}

OUTPUT ONLY the raw JSON object. No markdown fences. No commentary. No trailing text.
Any character outside the outermost JSON braces will cause a parse failure.`;

const BLUEPRINT_USER = `Based on your Layout Analysis above and the Physical Data in the first message,
produce the complete DesignTokens JSON including uiBlueprint.

Translation map:
  COLOR SEMANTICS       → color.*
    (hex values from your observations; CSS var references in blueprint classes)
  SPACING from Physical → spacing.baseUnit + spacing.scale
    (use Physical Data measured values — not your visual estimates)
  TYPOGRAPHY from Phys. → typography.scale
    (use Physical Data step px values — not your visual estimates)
  VISUAL descriptors    → siteArchitecture.motif
    (your precise descriptors from Color Semantics context)
  SECTION INVENTORY     → uiBlueprint.sections
    (one entry per identified region, id = kebab-case region name)
  ASSET AUDIT           → uiBlueprint.sections[].components[].assetRef
    (only Physical Data URLs — omit field if no match exists)
  SPATIAL GRID ANALYSIS → uiBlueprint.sections[].layoutClasses
    (Physical Data spacing values via arbitrary Tailwind syntax)

For shadow.sm / .md / .lg / .xl:
  Use Physical Data box-shadow values. Most-frequent → shadow.md.

Pre-flight checklist — verify before output:
  □ Every assetRef is an exact Physical Data URL or "inline-svg:<n>"
  □ No hex literals in Tailwind classes — only var(--color-*) references
  □ All spacing/sizing values in Tailwind classes match Physical Data measurements
  □ uiBlueprint.sections covers every region from your Section Inventory
  □ skeleton fields use Physical Data skeleton signals where available

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

  // Physical data block — injected into the USER message so the model
  // receives it as authoritative input alongside the screenshot.
  // This is architecturally cleaner than the previous approach of
  // appending it to the assistant's reply.
  const physicalBlock = buildPhysicalDataBlock(physicalData);
  const physicalTextBlock: Anthropic.TextBlockParam | null = physicalBlock
    ? { type: 'text', text: physicalBlock }
    : null;

  // Turn 1 user content: screenshot + analysis request + physical data
  const turn1Content: Anthropic.ContentBlockParam[] = [
    imageBlock,
    { type: 'text', text: LAYOUT_ANALYSIS_USER },
    ...(physicalTextBlock ? [physicalTextBlock] : []),
  ];

  // ── Turn 1 ── Layout Analysis ───────────────────────────────────────────────
  // The AI receives the screenshot AND all Physical Data in a single user message.
  // It produces a structured spatial analysis: section inventory, grid geometry,
  // Z-index layers, asset audit, color semantics. No JSON output yet.

  const layoutResponse = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: LAYOUT_ANALYSIS_SYSTEM,
    messages: [
      { role: 'user', content: turn1Content },
    ],
  });

  const layoutBlock = layoutResponse.content[0];
  if (layoutBlock.type !== 'text') {
    throw new ExtractionError('Unexpected non-text response in layout analysis phase.');
  }
  const layoutAnalysis = layoutBlock.text.trim();

  // ── Turn 2 ── Blueprint Generation ─────────────────────────────────────────
  // The AI receives the full conversation history (image + physical data +
  // its own layout analysis) and translates it into the final JSON token set
  // including uiBlueprint. Iron-clad constraints prevent any invented colors,
  // asset URLs, or spacing values that are not grounded in Physical Data.

  const blueprintResponse = await client.messages.create({
    model: MODEL,
    max_tokens: 5120,  // Increased: uiBlueprint sections add significant output
    system: BLUEPRINT_SYSTEM,
    messages: [
      // Turn 1: screenshot + physical data (AI must keep this context)
      { role: 'user', content: turn1Content },
      // Turn 1 AI response: the layout analysis
      { role: 'assistant', content: layoutAnalysis },
      // Turn 2: translate analysis → JSON
      { role: 'user', content: BLUEPRINT_USER },
    ],
  });

  const blueprintBlock = blueprintResponse.content[0];
  if (blueprintBlock.type !== 'text') {
    throw new ExtractionError('Unexpected non-text response in blueprint generation phase.');
  }

  const raw = blueprintBlock.text.trim();
  const jsonText = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let tokens: DesignTokens;
  try {
    tokens = JSON.parse(jsonText) as DesignTokens;
  } catch {
    throw new ExtractionError('Blueprint generation phase returned non-JSON output.', raw);
  }

  validateTokens(tokens);

  // Apply spacing grid correction as a safety net after validation.
  const corrected = snapSpacing(tokens);

  return { ...corrected, designCritique: layoutAnalysis };
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
