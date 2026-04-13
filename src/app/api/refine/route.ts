import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { DesignTokens } from '@/types';

export const runtime = 'nodejs';

const client = new Anthropic();
const MODEL  = 'claude-haiku-4-5-20251001';

const SYSTEM_PROMPT = `You are an expert UI/UX designer and design systems engineer.
You receive a DesignTokens JSON object and a natural-language style request.
Modify ONLY the mutable visual tokens to match the request, then return ONLY the updated JSON — no prose, no markdown fences, no explanations.

Schema contract — never change the structure, only values within these paths:
  color.brand.{primary,secondary,accent}       — 6-digit HEX
  color.background.{page,surface,overlay}      — HEX or rgba() for overlay
  color.text.{primary,secondary,inverse}       — 6-digit HEX
  color.border                                  — 6-digit HEX
  color.status.{success,warning,error}         — 6-digit HEX
  typography.families.{body,heading,mono}      — font-family stack strings
  typography.weights.{regular,medium,semibold,bold} — CSS weight strings e.g. "400"
  typography.scale.*.{size,lineHeight}         — px size strings and unitless ratio strings
  spacing.baseUnit                             — number (4 or 8)
  spacing.scale.{xs,sm,md,lg,xl,2xl,3xl}      — CSS px strings derived from baseUnit
  radius.{none,sm,md,lg,xl,full}              — CSS strings; none is always "0", full is always "9999px"
  shadow.{sm,md,lg,xl}                        — full CSS box-shadow strings

Rules:
- All colour values must be 6-digit HEX strings starting with # (except overlay which may be rgba())
- Do not add new keys; do not remove existing keys; preserve the complete token structure
- Ensure legible contrast between background and text colours
- Honour the spirit of the style request while keeping the token schema valid
- Do not modify siteArchitecture, skeleton, spacingSystem, or typographyScale fields`;

export async function POST(req: NextRequest): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { tokens, prompt } = body as { tokens?: DesignTokens; prompt?: string };

  if (!tokens || typeof tokens !== 'object') {
    return Response.json({ error: 'Missing or invalid tokens' }, { status: 400 });
  }
  if (!prompt?.trim()) {
    return Response.json({ error: 'Missing prompt' }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Current design tokens:\n${JSON.stringify(tokens, null, 2)}\n\nStyle request: ${prompt.trim()}`,
        },
      ],
    });

    const raw     = message.content[0]?.type === 'text' ? message.content[0].text : '';
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    let updatedTokens: DesignTokens;
    try {
      updatedTokens = JSON.parse(cleaned);
    } catch {
      return Response.json({ error: 'AI returned malformed JSON', raw }, { status: 502 });
    }

    return Response.json({ tokens: updatedTokens });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json({ error: msg }, { status: 500 });
  }
}
