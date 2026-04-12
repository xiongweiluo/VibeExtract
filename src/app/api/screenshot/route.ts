import { NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';

export const runtime = 'nodejs';

/**
 * GET /api/screenshot?url=<encoded-url>
 *
 * Server-side proxy to ScreenshotOne — keeps the API key off the client.
 * Response is cached for 1 hour so repeated slider drags don't cost quota.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const rawUrl = req.nextUrl.searchParams.get('url');

  if (!rawUrl) {
    return new Response('Missing "url" query parameter.', { status: 400 });
  }

  let targetUrl: string;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return new Response('Only http:// and https:// URLs are supported.', { status: 400 });
    }
    targetUrl = parsed.toString();
  } catch {
    return new Response(`Invalid URL: "${rawUrl}"`, { status: 400 });
  }

  const accessKey = process.env.SCREENSHOTONE_API_KEY;
  if (!accessKey) {
    return new Response('Screenshot service is not configured.', { status: 503 });
  }

  try {
    const response = await axios.get<ArrayBuffer>('https://api.screenshotone.com/take', {
      params: {
        access_key: accessKey,
        url: targetUrl,
        viewport_width: 1280,
        viewport_height: 900,
        image_quality: 85,
        format: 'png',
      },
      responseType: 'arraybuffer',
      timeout: 30_000,
    });

    return new Response(response.data as ArrayBuffer, {
      headers: {
        'Content-Type': 'image/png',
        // Cache for 1 h, serve stale for up to 24 h while revalidating
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    const msg =
      err instanceof AxiosError
        ? `Screenshot API error ${err.response?.status ?? 'network'}: ${err.message}`
        : String(err);
    return new Response(msg, { status: 502 });
  }
}
