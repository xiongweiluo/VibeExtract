import Anthropic from '@anthropic-ai/sdk';
import type { DesignTokens } from '../types';

const MODEL = 'claude-haiku-4-5-20251001';

const SYSTEM_PROMPT = `You are a world-class UI architect specialising in design systems.
When given a screenshot, you extract a precise design token set and return it as a
single JSON object — no markdown fences, no commentary, no trailing text.

The JSON must conform exactly to this TypeScript interface:

interface DesignTokens {
  colors: {
    brand: { primary: string; secondary: string };   // exact HEX, e.g. "#6366F1"
    background: { main: string; card: string };
    text: { base: string; muted: string };
    border: string;
  };
  spacing: { base: number; scale: string };          // base unit in px as number, scale unit as string e.g. 4 / "rem"
  borderRadius: { small: string; medium: string; large: string }; // CSS values e.g. "4px"
  typography: {
    sans: string;      // font-family stack
    headingWeight: string; // e.g. "700"
  };
  layoutVibe: string;  // 3–5 comma-separated layout personality tags, e.g. "high-density grid, generous whitespace, oversized headings, sticky nav"
  typeScale: {
    hero: string;       // largest headline, e.g. "72px"
    heading: string;    // section heading, e.g. "32px"
    body: string;       // body copy, e.g. "16px"
    label: string;      // captions/labels, e.g. "12px"
    lineHeight: string; // dominant line-height, e.g. "1.2" or "1.6"
  };
  layoutStructure: {
    pattern: 'hero-centric' | 'card-grid' | 'editorial' | 'dashboard' | 'landing';
    density: 'compact' | 'comfortable' | 'spacious';
    heroStyle: 'full-bleed' | 'split' | 'centered' | 'none';
    navStyle: 'sticky' | 'transparent' | 'sidebar' | 'minimal';
    sectionGap: string;    // e.g. "80px"
    contentPadding: string; // e.g. "5%" or "48px"
  };
  components: {
    card: {
      shadow: string;        // full CSS box-shadow value, e.g. "0 2px 8px rgba(0,0,0,0.12)"
      padding: string;       // CSS shorthand observed on cards/panels, e.g. "16px 20px"
    };
    button: {
      paddingX: string;      // horizontal padding, e.g. "24px"
      paddingY: string;      // vertical padding, e.g. "10px"
      letterSpacing: string; // e.g. "0.04em" or "normal"
    };
  };
}

Rules:
- All color values must be exact HEX strings (#RRGGBB).
- Derive border-radius from buttons, cards, inputs — use small/medium/large tiers.
- layoutVibe: observe the page's spatial rhythm. Tag things like: "high-density grid",
  "card-heavy layout", "editorial / magazine", "generous whitespace", "oversized headings",
  "full-bleed hero", "sidebar navigation", "sticky header", "infinite scroll feed", etc.
  Use 3–5 tags that best describe what makes this site feel unique.
- typeScale: read the actual pixel sizes from the visual hierarchy.
  hero = the largest text block visible (often above the fold); heading = section-level titles;
  body = paragraph text; label = small UI labels/captions.
  lineHeight: tight (1.1–1.3) is common in editorial/hero-heavy sites; relaxed (1.5–1.7) in docs/landing pages.
- layoutStructure.pattern: choose the ONE that best matches the dominant page structure:
    hero-centric — large above-the-fold hero consumes most of the viewport
    card-grid    — primary content is a repeating grid/masonry of cards (Pinterest, Airbnb, Product Hunt)
    editorial    — text-dominant, long-form, magazine-style columns (Medium, NYT, Substack)
    dashboard    — data-heavy, sidebar nav, metric widgets (Notion, Linear, Vercel dashboard)
    landing      — marketing page with hero + feature sections + CTA rows
- layoutStructure.density: compact = tight gutters / high content density; spacious = lots of breathing room.
- layoutStructure.heroStyle: how the above-the-fold hero is treated spatially.
- layoutStructure.sectionGap: vertical distance between major content sections.
- layoutStructure.contentPadding: horizontal page padding / max-width inset.
- components.card: look at actual card/panel elements — estimate shadow depth (none / soft / dramatic)
  and the internal padding from visual alignment of content edges.
- components.button: examine primary CTA buttons — estimate horizontal and vertical padding,
  and whether text appears tracked/spaced (letter-spacing > 0) or normal.
- If a value cannot be reliably inferred, make a reasonable design-system guess rather than omitting the key.
- Output ONLY the raw JSON object. Any character outside the JSON will cause a parse error.`;

const USER_PROMPT = `Analyse this UI screenshot carefully.

Extract the following and return a single DesignTokens JSON:

1. Brand colours — primary (dominant CTA / accent) and secondary (supporting accent). Must be precise HEX.
2. Background colours — page background and card/panel background.
3. Text colours — body text and muted/secondary text.
4. Border colour — most common separator / outline colour.
5. Spacing — identify the base grid unit (4 or 8 px is common) and the CSS scale unit ("rem" or "px").
6. Border-radius — small (inputs/tags), medium (cards/buttons), large (modals/sheets). Provide CSS values.
7. Typography — font-family stack and heading font-weight.
8. Layout vibe — 3–5 comma-separated tags. Be precise and site-specific.
9. Type scale — measure or estimate the actual pixel sizes for hero headline, section heading,
   body copy, and label text. Note whether line-height is tight (<1.3) or relaxed (>1.5).
10. Layout structure — identify the dominant pattern (hero-centric / card-grid / editorial / dashboard / landing),
    spatial density, hero style, nav style, section gap, and content padding.
11. Component semantics:
   - Card: estimate the box-shadow (be specific with blur/spread/alpha) and the internal padding
     from how content sits inside panels. Even subtle shadows count.
   - Button: measure horizontal and vertical padding from the primary CTA. Note if text is
     letter-spaced (tracking) — many brands use 0.05–0.1 em on uppercase buttons.

Return only the JSON object conforming to DesignTokens. No other text.`;

export class ExtractionError extends Error {
  constructor(
    message: string,
    public readonly raw?: string,
  ) {
    super(message);
    this.name = 'ExtractionError';
  }
}

export async function extractDesignSystem(
  screenshotBuffer: Buffer,
  mimeType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp' = 'image/png',
): Promise<DesignTokens> {
  const client = new Anthropic();

  const base64Image = screenshotBuffer.toString('base64');

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
            source: {
              type: 'base64',
              media_type: mimeType,
              data: base64Image,
            },
          },
          {
            type: 'text',
            text: USER_PROMPT,
          },
        ],
      },
    ],
  });

  const firstBlock = response.content[0];
  if (firstBlock.type !== 'text') {
    throw new ExtractionError('Unexpected response type from Claude API');
  }

  const raw = firstBlock.text.trim();

  // Strip accidental markdown fences the model may still emit
  const jsonText = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let tokens: DesignTokens;
  try {
    tokens = JSON.parse(jsonText) as DesignTokens;
  } catch {
    throw new ExtractionError(
      `Claude returned non-JSON output. Raw response saved for inspection.`,
      raw,
    );
  }

  validateTokens(tokens);

  return tokens;
}

/** Lightweight structural guard — catches missing top-level keys early. */
function validateTokens(t: unknown): asserts t is DesignTokens {
  const required: string[] = [
    'colors',
    'colors.brand',
    'colors.brand.primary',
    'colors.brand.secondary',
    'colors.background',
    'colors.background.main',
    'colors.background.card',
    'colors.text',
    'colors.text.base',
    'colors.text.muted',
    'colors.border',
    'spacing',
    'spacing.base',
    'spacing.scale',
    'borderRadius',
    'borderRadius.small',
    'borderRadius.medium',
    'borderRadius.large',
    'typography',
    'typography.sans',
    'typography.headingWeight',
    'layoutVibe',
    'typeScale',
    'typeScale.hero',
    'typeScale.heading',
    'typeScale.body',
    'typeScale.label',
    'typeScale.lineHeight',
    'layoutStructure',
    'layoutStructure.pattern',
    'layoutStructure.density',
    'layoutStructure.heroStyle',
    'layoutStructure.navStyle',
    'layoutStructure.sectionGap',
    'layoutStructure.contentPadding',
    'components',
    'components.card',
    'components.card.shadow',
    'components.card.padding',
    'components.button',
    'components.button.paddingX',
    'components.button.paddingY',
    'components.button.letterSpacing',
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
