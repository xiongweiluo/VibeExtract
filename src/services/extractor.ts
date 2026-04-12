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
}

Rules:
- All color values must be exact HEX strings (#RRGGBB).
- Derive border-radius from buttons, cards, inputs — use small/medium/large tiers.
- If a value cannot be reliably inferred, make a reasonable design-system guess rather than omitting the key.
- Output ONLY the raw JSON object. Any character outside the JSON will cause a parse error.`;

const USER_PROMPT = `Analyse this UI screenshot.

Extract:
1. Brand colours — primary (dominant CTA / accent) and secondary (supporting accent). Must be precise HEX.
2. Background colours — page background and card/panel background.
3. Text colours — body text and muted/secondary text.
4. Border colour — most common separator / outline colour.
5. Spacing — identify the base grid unit (4 or 8 px is common) and the CSS scale unit ("rem" or "px").
6. Border-radius — small (inputs/tags), medium (cards/buttons), large (modals/sheets). Provide CSS values.
7. Typography — font-family stack and heading font-weight.

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
    max_tokens: 1024,
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
