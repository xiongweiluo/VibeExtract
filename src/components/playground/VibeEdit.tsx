'use client';

import { useState, useRef, useCallback } from 'react';
import { Sparkles, Send, Loader2, RotateCcw, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { DesignTokens } from '@/types';

// ── Types ─────────────────────────────────────────────────────────────────

export interface VibeEditProps {
  tokens: DesignTokens;
  /** Frozen snapshot from the original extraction — used for reset */
  originalTokens: DesignTokens;
  onUpdate: (tokens: DesignTokens) => void;
}

interface HistoryEntry {
  id: number;
  prompt: string;
}

// ── Quick-prompt suggestions ──────────────────────────────────────────────

const QUICK_PROMPTS = [
  '赛博朋克霓虹风格',
  '温暖奶油色系',
  '极简黑白配色',
  '海洋深蓝主题',
  '樱花粉嫩风格',
  '暗黑金属质感',
];

// ── VibeEdit component ────────────────────────────────────────────────────

export function VibeEdit({ tokens, originalTokens, onUpdate }: VibeEditProps) {
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef              = useRef<HTMLInputElement>(null);
  const idRef                 = useRef(0);

  const apply = useCallback(async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens, prompt: trimmed }),
      });

      const data = await res.json() as { tokens?: DesignTokens; error?: string };

      if (!res.ok || data.error) {
        setError(data.error ?? '调整失败，请重试');
        return;
      }
      if (!data.tokens) {
        setError('服务器返回了空数据');
        return;
      }

      onUpdate(data.tokens);
      setHistory((prev) => [...prev, { id: ++idRef.current, prompt: trimmed }]);
      setInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '网络错误，请检查连接');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [tokens, loading, onUpdate]);

  const handleReset = useCallback(() => {
    onUpdate(originalTokens);
    setHistory([]);
    setError('');
  }, [originalTokens, onUpdate]);

  return (
    <div className="w-full animate-fade-in">
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-xl shadow-black/30 backdrop-blur-sm space-y-4">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
              <Wand2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">Vibe Edit</p>
              <p className="text-xs text-muted-foreground">用自然语言调整设计风格</p>
            </div>
          </div>

          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              重置到原始
            </Button>
          )}
        </div>

        {/* ── Applied history ── */}
        {history.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {history.map((entry) => (
              <span
                key={entry.id}
                className="inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/20 px-3 py-1 text-xs text-primary"
              >
                <Sparkles className="h-2.5 w-2.5 flex-shrink-0" />
                {entry.prompt}
              </span>
            ))}
          </div>
        )}

        {/* ── Quick prompts ── */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            快速风格
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp}
                onClick={() => apply(qp)}
                disabled={loading}
                className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-all duration-150 hover:border-primary/50 hover:bg-primary/10 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-border/40" />

        {/* ── Input row ── */}
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) apply(input);
            }}
            placeholder="描述你想要的风格，例如：让主色更鲜艳，圆角改成圆形…"
            disabled={loading}
            className="h-11 flex-1 bg-background/60 text-sm focus-visible:ring-primary"
          />
          <Button
            onClick={() => apply(input)}
            disabled={loading || !input.trim()}
            size="icon"
            className="h-11 w-11 shrink-0 bg-primary hover:bg-primary/90"
          >
            {loading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Send className="h-4 w-4" />
            }
          </Button>
        </div>

        {/* ── Status line ── */}
        {loading && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground animate-pulse">
            <Sparkles className="h-3 w-3 text-primary" />
            Claude 正在重新配色，稍等一秒…
          </p>
        )}
        {error && !loading && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}

export default VibeEdit;
