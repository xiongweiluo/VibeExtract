import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { DesignTokens } from '@/types';

export const runtime = 'nodejs';

const client = new Anthropic();
const MODEL  = 'claude-haiku-4-5-20251001';

const SYSTEM_PROMPT = `You are an expert UI/UX designer and design systems engineer.
You receive a DesignTokens JSON object and a natural-language style request.
Modify the tokens to match the request, then return ONLY the updated JSON — no prose, no markdown fences, no explanations.

Schema contract (never change structure, only values):
{
  "colors": {
    "brand":      { "primary": "#hex", "secondary": "#hex" },
    "background": { "main": "#hex",    "card": "#hex" },
    "text":       { "base": "#hex",    "muted": "#hex" },
    "border":     "#hex"
  },
  "spacing":      { "base": <number>, "scale": "<rem|px>" },
  "borderRadius": { "small": "<css>", "medium": "<css>", "large": "<css>" },
  "typography":   { "sans": "<font-family>", "headingWeight": "<css-weight>" }
}

Rules:
- All colour values must be 6-digit HEX strings starting with #
- Do not add new keys; do not remove existing keys
- Ensure legible contrast between background and text colours
- Honour the spirit of the style request while keeping the token schema valid`;

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
      max_tokens: 1024,
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
