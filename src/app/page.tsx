'use client';

import { useState, useRef } from 'react';
import { Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { DesignTokens } from '@/types';

// ── Progress messages cycled during extraction ─────────────────────────────
const PROGRESS_STEPS = [
  { step: 'screenshot', label: '正在捕获页面截图…',          sub: 'Launching headless browser' },
  { step: 'extract',    label: 'AI 正在扫描视觉语义…',        sub: 'Claude Vision analysing layout' },
  { step: 'extract',    label: '解析色彩层级与品牌基因…',     sub: 'Mapping colour palette' },
  { step: 'extract',    label: '提取字体栈与间距节奏…',       sub: 'Reading typographic DNA' },
  { step: 'extract',    label: '构建 Design Token 矩阵…',    sub: 'Assembling token schema' },
] as const;

// ── Helpers ─────────────────────────────────────────────────────────────────

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
  code?: string;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function TokenSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-5 w-5 rounded-full border border-white/10 shadow-inner flex-shrink-0"
        style={{ background: value }}
      />
      <span className="text-xs text-muted-foreground font-mono truncate">{label}</span>
      <span className="ml-auto text-xs font-mono text-foreground/80">{value}</span>
    </div>
  );
}

function TokenCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-2 animate-fade-in">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

function TokenRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-mono text-foreground/90">{String(value)}</span>
    </div>
  );
}

function TokenResults({ tokens }: { tokens: DesignTokens }) {
  const { colors, spacing, borderRadius, typography } = tokens;
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-medium text-green-400">
        <CheckCircle2 className="h-4 w-4" />
        提取完成
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Colors */}
        <TokenCard title="Brand">
          <TokenSwatch label="primary"   value={colors.brand.primary} />
          <TokenSwatch label="secondary" value={colors.brand.secondary} />
        </TokenCard>

        <TokenCard title="Background">
          <TokenSwatch label="main" value={colors.background.main} />
          <TokenSwatch label="card" value={colors.background.card} />
        </TokenCard>

        <TokenCard title="Text">
          <TokenSwatch label="base"  value={colors.text.base} />
          <TokenSwatch label="muted" value={colors.text.muted} />
        </TokenCard>

        <TokenCard title="Border">
          <TokenSwatch label="border" value={colors.border} />
        </TokenCard>

        <TokenCard title="Spacing">
          <TokenRow label="base"  value={colors.border} />
          <TokenRow label="base"  value={spacing.base} />
          <TokenRow label="scale" value={spacing.scale} />
        </TokenCard>

        <TokenCard title="Border Radius">
          <TokenRow label="small"  value={borderRadius.small} />
          <TokenRow label="medium" value={borderRadius.medium} />
          <TokenRow label="large"  value={borderRadius.large} />
        </TokenCard>

        <TokenCard title="Typography">
          <TokenRow label="font-family"    value={typography.sans} />
          <TokenRow label="heading-weight" value={typography.headingWeight} />
        </TokenCard>
      </div>

      {/* Raw JSON */}
      <details className="group rounded-xl border border-border/40 overflow-hidden">
        <summary className="cursor-pointer px-4 py-3 text-xs text-muted-foreground hover:text-foreground transition-colors select-none">
          查看原始 JSON
        </summary>
        <pre className="px-4 pb-4 text-xs font-mono text-foreground/70 overflow-auto max-h-60">
          {JSON.stringify(tokens, null, 2)}
        </pre>
      </details>
    </div>
  );
}

// ── Loading overlay ─────────────────────────────────────────────────────────

function LoadingOverlay({ stepIndex }: { stepIndex: number }) {
  const current = PROGRESS_STEPS[Math.min(stepIndex, PROGRESS_STEPS.length - 1)];
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="animate-scan-line h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-5 px-8 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
          <Sparkles className="h-7 w-7 text-primary animate-pulse-slow" />
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold tracking-tight text-foreground animate-pulse-slow">
            {current.label}
          </p>
          <p className="text-xs text-muted-foreground font-mono">{current.sub}</p>
        </div>

        {/* Progress dots */}
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

// ── Main page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [url, setUrl]           = useState('');
  const [urlError, setUrlError] = useState('');
  const [loading, setLoading]   = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [tokens, setTokens]     = useState<DesignTokens | null>(null);
  const [error, setError]       = useState('');
  const stepTimerRef            = useRef<ReturnType<typeof setInterval> | null>(null);

  function validateUrl(value: string): boolean {
    if (!value.trim()) {
      setUrlError('请输入网站 URL');
      return false;
    }
    if (!isValidUrl(value.trim())) {
      setUrlError('请输入有效的 http:// 或 https:// 网址');
      return false;
    }
    setUrlError('');
    return true;
  }

  function startStepTimer() {
    let idx = 0;
    setStepIndex(0);
    stepTimerRef.current = setInterval(() => {
      idx = Math.min(idx + 1, PROGRESS_STEPS.length - 1);
      setStepIndex(idx);
    }, 2200);
  }

  function stopStepTimer() {
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    stepTimerRef.current = null;
  }

  async function handleExtract() {
    if (!validateUrl(url)) return;

    setLoading(true);
    setTokens(null);
    setError('');
    startStepTimer();

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buf = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n\n');
        buf = lines.pop() ?? '';

        for (const line of lines) {
          const dataLine = line.startsWith('data: ') ? line.slice(6) : line;
          if (!dataLine.trim()) continue;

          let event: ExtractEvent;
          try { event = JSON.parse(dataLine); }
          catch { continue; }

          if (event.step === 'screenshot') setStepIndex(0);
          if (event.step === 'extract')    setStepIndex(2);

          if (event.step === 'done' && event.tokens) {
            stopStepTimer();
            setStepIndex(PROGRESS_STEPS.length - 1);
            setTokens(event.tokens);
          }
          if (event.step === 'error') {
            stopStepTimer();
            setError(event.message ?? '提取失败，请稍后重试');
          }
        }
      }
    } catch (err) {
      stopStepTimer();
      setError(err instanceof Error ? err.message : '网络错误，请检查连接');
    } finally {
      stopStepTimer();
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
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

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

          <p className="max-w-md text-base text-muted-foreground leading-relaxed">
            输入任意网站 URL，AI 自动提取完整的&nbsp;
            <span className="text-foreground/80 font-medium">Design Token</span>&nbsp;系统——
            色彩、字体、间距、圆角，一键输出。
          </p>
        </section>

        {/* Input card */}
        <div className="relative z-10 mt-12 w-full max-w-2xl animate-fade-in [animation-delay:120ms]">
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
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (urlError) validateUrl(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && handleExtract()}
                  disabled={loading}
                  className="h-12 text-base bg-background/60 focus-visible:ring-primary"
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
                className="h-12 min-w-[130px] bg-primary hover:bg-primary/90 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    提取中…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    开始提取
                  </>
                )}
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              支持任意公开网站 · 通常需要 8–15 秒
            </p>
          </div>
        </div>

        {/* Error state */}
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
        {tokens && !loading && <TokenResults tokens={tokens} />}
      </main>
    </>
  );
}
