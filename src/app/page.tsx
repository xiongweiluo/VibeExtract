'use client';

import { useState, useRef } from 'react';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemePreview } from '@/components/playground/ThemePreview';
import type { DesignTokens } from '@/types';

// ── Progress steps ────────────────────────────────────────────────────────

const PROGRESS_STEPS = [
  { label: '正在捕获页面截图…',       sub: 'Launching headless browser' },
  { label: 'AI 正在扫描视觉语义…',     sub: 'Claude Vision analysing layout' },
  { label: '解析色彩层级与品牌基因…',  sub: 'Mapping colour palette' },
  { label: '提取字体栈与间距节奏…',    sub: 'Reading typographic DNA' },
  { label: '构建 Design Token 矩阵…', sub: 'Assembling token schema' },
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────

function isValidUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

type ExtractStep = 'screenshot' | 'extract' | 'done' | 'error';

interface ExtractEvent {
  step: ExtractStep;
  message?: string;
  tokens?: DesignTokens;
}

// ── LoadingOverlay ────────────────────────────────────────────────────────

function LoadingOverlay({ stepIndex }: { stepIndex: number }) {
  const current = PROGRESS_STEPS[Math.min(stepIndex, PROGRESS_STEPS.length - 1)];
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="animate-scan-line h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="relative flex flex-col items-center gap-5 px-8 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-primary/30" />
          <Sparkles className="animate-pulse-slow h-7 w-7 text-primary" />
        </div>

        <div className="space-y-1">
          <p className="animate-pulse-slow text-lg font-semibold tracking-tight text-foreground">
            {current.label}
          </p>
          <p className="font-mono text-xs text-muted-foreground">{current.sub}</p>
        </div>

        <div className="flex gap-1.5">
          {PROGRESS_STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i <= stepIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function Home() {
  const [url, setUrl]               = useState('');
  const [urlError, setUrlError]     = useState('');
  const [loading, setLoading]       = useState(false);
  const [stepIndex, setStepIndex]   = useState(0);
  const [tokens, setTokens]         = useState<DesignTokens | null>(null);
  /** URL captured at the moment of extraction — stable for ThemePreview */
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [error, setError]           = useState('');
  const timerRef                    = useRef<ReturnType<typeof setInterval> | null>(null);

  function validateUrl(value: string): boolean {
    if (!value.trim())          { setUrlError('请输入网站 URL'); return false; }
    if (!isValidUrl(value.trim())) { setUrlError('请输入有效的 http:// 或 https:// 网址'); return false; }
    setUrlError('');
    return true;
  }

  function startTimer() {
    let idx = 0;
    setStepIndex(0);
    timerRef.current = setInterval(() => {
      idx = Math.min(idx + 1, PROGRESS_STEPS.length - 1);
      setStepIndex(idx);
    }, 2200);
  }

  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }

  async function handleExtract() {
    if (!validateUrl(url)) return;

    const target = url.trim();
    setLoading(true);
    setTokens(null);
    setError('');
    setSubmittedUrl(target);
    startTimer();

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buf += decoder.decode(value, { stream: true });
        const chunks = buf.split('\n\n');
        buf = chunks.pop() ?? '';

        for (const chunk of chunks) {
          const data = chunk.startsWith('data: ') ? chunk.slice(6) : chunk;
          if (!data.trim()) continue;

          let event: ExtractEvent;
          try { event = JSON.parse(data); } catch { continue; }

          if (event.step === 'screenshot') setStepIndex(0);
          if (event.step === 'extract')    setStepIndex(2);

          if (event.step === 'done' && event.tokens) {
            stopTimer();
            setStepIndex(PROGRESS_STEPS.length - 1);
            setTokens(event.tokens);
          }
          if (event.step === 'error') {
            stopTimer();
            setError(event.message ?? '提取失败，请稍后重试');
          }
        }
      }
    } catch (err) {
      stopTimer();
      setError(err instanceof Error ? err.message : '网络错误，请检查连接');
    } finally {
      stopTimer();
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingOverlay stepIndex={stepIndex} />}

      <main className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-4 pt-24 pb-16">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow blob */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        {/* Hero */}
        <section className="relative z-10 flex flex-col items-center gap-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            Powered by Claude Vision
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
              Vibe
            </span>
            <span className="bg-gradient-to-br from-primary via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Extractor
            </span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            输入任意网站 URL，AI 自动提取完整的&nbsp;
            <span className="font-medium text-foreground/80">Design Token</span>&nbsp;系统——
            色彩、字体、间距、圆角，一键输出。
          </p>
        </section>

        {/* Input card */}
        <div className="relative z-10 mt-12 w-full max-w-2xl [animation-delay:120ms] animate-fade-in">
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <label className="mb-2 block text-sm font-medium text-foreground/80">
              网站地址
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 space-y-1">
                <Input
                  type="url"
                  placeholder="https://stripe.com"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); if (urlError) validateUrl(e.target.value); }}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && handleExtract()}
                  disabled={loading}
                  className="h-12 bg-background/60 text-base focus-visible:ring-primary"
                />
                {urlError && (
                  <p className="flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {urlError}
                  </p>
                )}
              </div>

              <Button
                size="lg"
                onClick={handleExtract}
                disabled={loading}
                className="h-12 min-w-[130px] bg-primary font-semibold hover:bg-primary/90"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />提取中…</>
                ) : (
                  <><Sparkles className="h-4 w-4" />开始提取</>
                )}
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              支持任意公开网站 · 通常需要 8–15 秒
            </p>
          </div>
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="relative z-10 mt-6 flex w-full max-w-2xl items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 animate-fade-in">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-medium">提取失败</p>
              <p className="mt-0.5 text-xs text-red-400/80">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {tokens && !loading && (
          <div className="relative z-10 mt-10 w-full max-w-4xl">
            <ThemePreview tokens={tokens} siteUrl={submittedUrl} />
          </div>
        )}
      </main>
    </>
  );
}
