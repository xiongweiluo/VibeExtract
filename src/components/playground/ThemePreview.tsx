'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Check, Copy, ChevronLeft, ChevronRight,
  Palette, Layout, SlidersHorizontal, ImageOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DesignTokens } from '@/types';

// ── Colour utility ────────────────────────────────────────────────────────

/** Perceived luminance 0–1 (ITU-R BT.601) */
function luminance(hex: string): number {
  const c = hex.replace(/^#/, '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  if ([r, g, b].some(isNaN)) return 0.4;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// ── ColorSwatch ───────────────────────────────────────────────────────────

function ColorSwatch({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const light  = luminance(value) > 0.55;
  const fg     = light ? 'rgba(0,0,0,0.72)' : 'rgba(255,255,255,0.88)';
  const scrim  = light ? 'rgba(0,0,0,0.12)'  : 'rgba(255,255,255,0.12)';

  function handleCopy() {
    void navigator.clipboard.writeText(value.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      title={`Copy ${value}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 transition-all duration-200 hover:scale-[1.04] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      style={{ background: value }}
    >
      <div className="h-16 w-full" />
      <div
        className="flex items-center justify-between px-3 py-2 text-xs font-medium"
        style={{ background: scrim, color: fg }}
      >
        <span className="truncate pr-2">{label}</span>
        <span className="font-mono flex-shrink-0">{value.toUpperCase()}</span>
      </div>
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ background: scrim }}
      >
        {copied
          ? <Check className="h-5 w-5" style={{ color: fg }} />
          : <Copy className="h-5 w-5" style={{ color: fg }} />}
      </div>
    </button>
  );
}

// ── ColorPalette tab ──────────────────────────────────────────────────────

function ColorPalette({ tokens }: { tokens: DesignTokens }) {
  const { colors, spacing, borderRadius, typography } = tokens;
  const swatches = [
    { label: 'Brand / Primary',   value: colors.brand.primary },
    { label: 'Brand / Secondary', value: colors.brand.secondary },
    { label: 'BG / Main',         value: colors.background.main },
    { label: 'BG / Card',         value: colors.background.card },
    { label: 'Text / Base',       value: colors.text.base },
    { label: 'Text / Muted',      value: colors.text.muted },
    { label: 'Border',            value: colors.border },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {swatches.map((s) => <ColorSwatch key={s.label} {...s} />)}
      </div>

      {/* Metadata row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetaCard title="Spacing">
          <p className="font-mono text-sm text-foreground/80">
            Base: {spacing.base}{spacing.scale}
          </p>
          <p className="text-xs text-muted-foreground">4× grid rhythm</p>
        </MetaCard>

        <MetaCard title="Border Radius">
          <div className="flex items-end gap-3">
            {[
              { size: borderRadius.small,  label: 'sm' },
              { size: borderRadius.medium, label: 'md' },
              { size: borderRadius.large,  label: 'lg' },
            ].map(({ size, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className="h-8 w-8 bg-primary/40"
                  style={{ borderRadius: size }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">{size}</span>
              </div>
            ))}
          </div>
        </MetaCard>

        <MetaCard title="Typography">
          <p className="truncate text-xs text-muted-foreground" title={typography.sans}>
            {typography.sans}
          </p>
          <p className="font-mono text-sm text-foreground/80">
            Weight: {typography.headingWeight}
          </p>
        </MetaCard>
      </div>
    </div>
  );
}

function MetaCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-xl border border-border/50 bg-muted/20 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

// ── MockPage — mini website rendered with extracted tokens ─────────────────

function MockPage({ tokens }: { tokens: DesignTokens }) {
  const { colors: c, borderRadius: r, typography: t, spacing } = tokens;
  const u = spacing.base;
  const px = (n: number) => `${u * n}px`;

  return (
    <div style={{ fontFamily: t.sans, background: c.background.main, color: c.text.base, fontSize: 13, lineHeight: 1.6, height: '100%' }}>
      {/* Navbar */}
      <nav style={{ background: c.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${px(2)} ${px(4)}` }}>
        <span style={{ fontWeight: t.headingWeight, color: '#fff', fontSize: 15 }}>Brand</span>
        <div style={{ display: 'flex', gap: px(4) }}>
          {['Product', 'Docs', 'Pricing'].map((l) => (
            <span key={l} style={{ color: 'rgba(255,255,255,0.82)', fontSize: 12 }}>{l}</span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: `${px(8)} ${px(6)} ${px(6)}` }}>
        <h1 style={{ fontWeight: t.headingWeight, fontSize: 26, color: c.text.base, marginBottom: px(2) }}>
          Beautiful by Default
        </h1>
        <p style={{ color: c.text.muted, fontSize: 13, marginBottom: px(4) }}>
          Extracted straight from the source. Zero guesswork.
        </p>
        <button style={{ background: c.brand.primary, color: '#fff', border: 'none', borderRadius: r.small, padding: `${px(1.5)} ${px(4)}`, fontWeight: t.headingWeight, fontSize: 12, cursor: 'default', marginRight: px(2) }}>
          Get started
        </button>
        <button style={{ background: 'transparent', color: c.brand.primary, border: `1.5px solid ${c.brand.primary}`, borderRadius: r.small, padding: `${px(1.5)} ${px(4)}`, fontSize: 12, cursor: 'default' }}>
          Learn more
        </button>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: px(3), padding: `0 ${px(6)} ${px(6)}` }}>
        {[
          { title: 'Design System', text: 'Consistent visual language across your product.' },
          { title: 'Token Export',   text: 'One click to Tailwind, CSS Vars, or JSON.' },
          { title: 'AI Powered',     text: 'Claude Vision analyses semantic hierarchy.' },
        ].map(({ title, text }) => (
          <div key={title} style={{ background: c.background.card, border: `1px solid ${c.border}`, borderRadius: r.medium, padding: px(3) }}>
            <div style={{ width: 20, height: 20, borderRadius: r.small, background: c.brand.primary, opacity: 0.7, marginBottom: px(2) }} />
            <p style={{ fontWeight: t.headingWeight, fontSize: 13, color: c.text.base, marginBottom: px(1) }}>{title}</p>
            <p style={{ fontSize: 11, color: c.text.muted }}>{text}</p>
          </div>
        ))}
      </div>

      {/* Form row */}
      <div style={{ display: 'flex', gap: px(2), padding: `0 ${px(6)} ${px(6)}` }}>
        <input
          readOnly
          placeholder="Enter your email"
          style={{ flex: 1, border: `1px solid ${c.border}`, borderRadius: r.small, padding: `${px(1.5)} ${px(3)}`, background: c.background.card, color: c.text.muted, fontSize: 12, outline: 'none' }}
        />
        <button style={{ background: c.brand.primary, color: '#fff', border: 'none', borderRadius: r.small, padding: `${px(1.5)} ${px(3)}`, fontWeight: t.headingWeight, fontSize: 12, cursor: 'default', whiteSpace: 'nowrap' }}>
          Subscribe
        </button>
      </div>
    </div>
  );
}

// ── ComponentPreview tab ──────────────────────────────────────────────────

function ComponentPreview({ tokens }: { tokens: DesignTokens }) {
  const { colors: c, borderRadius: r, typography: t, spacing } = tokens;
  const u = spacing.base;
  const px = (n: number) => `${u * n}px`;

  const btnBase = {
    borderRadius: r.small,
    padding: `${px(1.5)} ${px(4)}`,
    fontFamily: t.sans,
    fontSize: 13,
    cursor: 'default',
  } as React.CSSProperties;

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <PreviewSection title="Buttons">
        <div className="flex flex-wrap gap-3">
          <button style={{ ...btnBase, background: c.brand.primary,   color: '#fff',            border: 'none',                          fontWeight: t.headingWeight }}>Primary</button>
          <button style={{ ...btnBase, background: c.brand.secondary, color: '#fff',            border: 'none'                          }}>Secondary</button>
          <button style={{ ...btnBase, background: 'transparent',     color: c.brand.primary,   border: `1.5px solid ${c.brand.primary}` }}>Outline</button>
          <button style={{ ...btnBase, background: 'transparent',     color: c.text.muted,      border: `1px solid ${c.border}`          }}>Ghost</button>
        </div>
      </PreviewSection>

      {/* Card */}
      <PreviewSection title="Card">
        <div style={{ background: c.background.card, border: `1px solid ${c.border}`, borderRadius: r.medium, padding: px(4), fontFamily: t.sans, maxWidth: 300 }}>
          <div style={{ width: '100%', height: 72, borderRadius: r.small, background: c.brand.primary, opacity: 0.15, marginBottom: px(3) }} />
          <h3 style={{ fontWeight: t.headingWeight, color: c.text.base, fontSize: 14, marginBottom: px(1) }}>Card Title</h3>
          <p style={{ color: c.text.muted, fontSize: 12, lineHeight: 1.6, marginBottom: px(3) }}>
            Body text showing colour, font stack, and line-height.
          </p>
          <button style={{ ...btnBase, background: c.brand.primary, color: '#fff', border: 'none', fontWeight: t.headingWeight }}>
            Action
          </button>
        </div>
      </PreviewSection>

      {/* Inputs */}
      <PreviewSection title="Form Input">
        <div className="flex flex-wrap gap-3">
          <input
            readOnly
            placeholder="Placeholder"
            style={{ border: `1px solid ${c.border}`, borderRadius: r.small, padding: `${px(1.5)} ${px(3)}`, background: c.background.card, color: c.text.muted, fontSize: 13, fontFamily: t.sans, outline: 'none', width: 200 }}
          />
          <input
            readOnly
            defaultValue="Active / focused"
            style={{ border: `1.5px solid ${c.brand.primary}`, borderRadius: r.small, padding: `${px(1.5)} ${px(3)}`, background: c.background.card, color: c.text.base, fontSize: 13, fontFamily: t.sans, outline: 'none', width: 200 }}
          />
        </div>
      </PreviewSection>

      {/* Full mock page */}
      <PreviewSection title="Full Page Preview">
        <div className="overflow-hidden rounded-lg" style={{ height: 300, border: `1px solid ${c.border}` }}>
          <MockPage tokens={tokens} />
        </div>
      </PreviewSection>
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-xl border border-border/50 bg-muted/20 p-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

// ── ComparisonSlider tab ──────────────────────────────────────────────────

function ComparisonSlider({ tokens, siteUrl }: { tokens: DesignTokens; siteUrl: string }) {
  const [position, setPosition]       = useState(50);
  const [imgLoaded, setImgLoaded]     = useState(false);
  const [imgError, setImgError]       = useState(false);
  const containerRef                  = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPosition(Math.max(0, Math.min(((clientX - left) / width) * 100, 100)));
  }, []);

  const screenshotSrc = `/api/screenshot?url=${encodeURIComponent(siteUrl)}`;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        拖动中间的滑块 — 左侧为原始截图，右侧为 AI 还原效果。
      </p>

      <div
        ref={containerRef}
        className="relative touch-none select-none overflow-hidden rounded-xl"
        style={{ height: 480, cursor: 'col-resize' }}
        onPointerMove={(e) => {
          if (e.buttons > 0 || e.pointerType !== 'mouse') updatePosition(e.clientX);
        }}
      >
        {/* ── Left: original screenshot ── */}
        <div className="absolute inset-0 bg-muted/30">
          {imgError ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOff className="h-8 w-8 opacity-40" />
              <span className="text-xs">截图加载失败</span>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={screenshotSrc}
              alt="原始网站截图"
              draggable={false}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={cn(
                'h-full w-full object-cover object-top transition-opacity duration-500',
                imgLoaded ? 'opacity-100' : 'opacity-0',
              )}
            />
          )}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>

        {/* ── Right: AI mock (revealed from right) ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <MockPage tokens={tokens} />
          <div className="absolute bottom-3 right-3 rounded-full bg-primary/80 px-3 py-1 text-xs text-white backdrop-blur-sm">
            AI Extracted
          </div>
        </div>

        {/* Label: Original */}
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
          Original
        </div>

        {/* ── Divider line ── */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          style={{ left: `${position}%` }}
        />

        {/* ── Drag handle ── */}
        <div
          className="absolute top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full bg-white shadow-xl"
          style={{ left: `${position}%` }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            e.stopPropagation();
          }}
          onPointerMove={(e) => {
            if (e.buttons > 0) updatePosition(e.clientX);
          }}
        >
          <ChevronLeft  className="h-3.5 w-3.5 -mr-px text-gray-600" />
          <ChevronRight className="h-3.5 w-3.5 -ml-px text-gray-600" />
        </div>
      </div>
    </div>
  );
}

// ── ThemePreview — top-level export ───────────────────────────────────────

type TabId = 'palette' | 'preview' | 'compare';

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: 'palette', label: '色板',    Icon: Palette },
  { id: 'preview', label: '组件预览', Icon: Layout },
  { id: 'compare', label: '滑块对比', Icon: SlidersHorizontal },
];

export interface ThemePreviewProps {
  tokens: DesignTokens;
  /** Original site URL — required for the comparison slider */
  siteUrl?: string;
}

export function ThemePreview({ tokens, siteUrl }: ThemePreviewProps) {
  const [active, setActive] = useState<TabId>('palette');

  return (
    <div className="w-full animate-fade-in space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground/90">提取结果</h2>

        <details className="group relative z-20">
          <summary className="cursor-pointer list-none text-xs text-muted-foreground transition-colors hover:text-foreground">
            查看 JSON ▾
          </summary>
          <div className="absolute right-0 top-6 w-80 rounded-xl border border-border bg-background shadow-2xl">
            <pre className="max-h-64 overflow-auto rounded-xl p-4 text-xs font-mono text-foreground/70">
              {JSON.stringify(tokens, null, 2)}
            </pre>
          </div>
        </details>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl border border-border/50 bg-muted/20 p-1">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
              active === id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div>
        {active === 'palette' && <ColorPalette tokens={tokens} />}
        {active === 'preview' && <ComponentPreview tokens={tokens} />}
        {active === 'compare' && (
          siteUrl
            ? <ComparisonSlider tokens={tokens} siteUrl={siteUrl} />
            : (
              <div className="flex h-40 items-center justify-center rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground">
                需要提供网站 URL 才能显示对比图
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default ThemePreview;
