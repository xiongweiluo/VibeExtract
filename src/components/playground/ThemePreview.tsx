'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { Check, Copy, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import type { DesignTokens } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// § 1  Font refs
// ─────────────────────────────────────────────────────────────────────────────
const monoFont = 'var(--font-dm-mono, "DM Mono", monospace)';
const syneFont = 'var(--font-syne, "Syne", sans-serif)';

// ─────────────────────────────────────────────────────────────────────────────
// § 2  Colour maths
// ─────────────────────────────────────────────────────────────────────────────
function luminance(hex: string): number {
  const c = hex.replace(/^#/, '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  if ([r, g, b].some(isNaN)) return 0.4;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function isDarkSite(tokens: DesignTokens): boolean {
  return luminance(tokens.color.background.page) < 0.35;
}

// ─────────────────────────────────────────────────────────────────────────────
// § 3  Smooth layered shadows
// ─────────────────────────────────────────────────────────────────────────────
type ShadowDepth = 'flat' | 'subtle' | 'medium' | 'deep' | 'dramatic';

function layeredShadow(depth: ShadowDepth, colorHex = '#000000'): string {
  const h = colorHex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) || 0;
  const g = parseInt(h.substring(2, 4), 16) || 0;
  const b = parseInt(h.substring(4, 6), 16) || 0;
  const c = (a: number) => `rgba(${r},${g},${b},${a})`;
  switch (depth) {
    case 'flat':     return 'none';
    case 'subtle':   return `0 1px 2px ${c(0.05)}, 0 2px 4px ${c(0.04)}`;
    case 'medium':   return `0 1px 2px ${c(0.07)}, 0 2px 4px ${c(0.07)}, 0 4px 8px ${c(0.05)}`;
    case 'deep':     return `0 1px 2px ${c(0.08)}, 0 2px 4px ${c(0.08)}, 0 4px 8px ${c(0.07)}, 0 8px 16px ${c(0.05)}, 0 16px 32px ${c(0.03)}`;
    case 'dramatic': return `0 1px 2px ${c(0.09)}, 0 4px 8px ${c(0.09)}, 0 8px 24px ${c(0.08)}, 0 16px 48px ${c(0.06)}, 0 32px 64px ${c(0.04)}`;
  }
}

function archShadowDepth(tokens: DesignTokens, role: 'card' | 'btn' | 'hover' = 'card'): ShadowDepth {
  const { density, visualWeight: { hierarchy } } = tokens.siteArchitecture;
  if (hierarchy === 'functional' || density === 'compact') return role === 'btn' ? 'flat' : 'subtle';
  if (hierarchy === 'expressive') return role === 'hover' ? 'dramatic' : density === 'spacious' ? 'deep' : 'medium';
  return role === 'btn' ? 'subtle' : 'medium';
}

function shadowTint(tokens: DesignTokens): string {
  return isDarkSite(tokens) ? tokens.color.brand.primary : '#000000';
}

// ─────────────────────────────────────────────────────────────────────────────
// § 4  Export utilities  (CSS vars · Tailwind · JSON)
// ─────────────────────────────────────────────────────────────────────────────
function buildCSSVars(t: DesignTokens): string {
  const lines = [':root {',
    `  --color-primary:   ${t.color.brand.primary};`,
    `  --color-secondary: ${t.color.brand.secondary};`,
    `  --color-accent:    ${t.color.brand.accent};`,
    `  --color-bg:        ${t.color.background.page};`,
    `  --color-surface:   ${t.color.background.surface};`,
    `  --color-text:      ${t.color.text.primary};`,
    `  --color-muted:     ${t.color.text.secondary};`,
    `  --color-inverse:   ${t.color.text.inverse};`,
    `  --color-border:    ${t.color.border};`,
    `  --color-success:   ${t.color.status.success};`,
    `  --color-warning:   ${t.color.status.warning};`,
    `  --color-error:     ${t.color.status.error};`,
    `  --radius-none: ${t.radius.none};`,
    `  --radius-sm:   ${t.radius.sm};`,
    `  --radius-md:   ${t.radius.md};`,
    `  --radius-lg:   ${t.radius.lg};`,
    `  --radius-xl:   ${t.radius.xl};`,
    `  --radius-full: ${t.radius.full};`,
    `  --shadow-sm: ${t.shadow.sm};`,
    `  --shadow-md: ${t.shadow.md};`,
    `  --shadow-lg: ${t.shadow.lg};`,
    `  --shadow-xl: ${t.shadow.xl};`,
    `  --font-body:    ${t.typography.families.body};`,
    `  --font-heading: ${t.typography.families.heading};`,
    `  --font-mono:    ${t.typography.families.mono};`,
    `  --font-size-xs:   ${t.typography.scale.xs.size};`,
    `  --font-size-sm:   ${t.typography.scale.sm.size};`,
    `  --font-size-base: ${t.typography.scale.base.size};`,
    `  --font-size-lg:   ${t.typography.scale.lg.size};`,
    `  --font-size-xl:   ${t.typography.scale.xl.size};`,
    `  --font-size-2xl:  ${t.typography.scale['2xl'].size};`,
    `  --font-size-3xl:  ${t.typography.scale['3xl'].size};`,
    `  --font-size-4xl:  ${t.typography.scale['4xl'].size};`,
  ];

  if (t.spacingSystem) {
    lines.push('', '  /* ── Spacing (physical) ─── */');
    for (const [k, v] of Object.entries(t.spacingSystem.named)) lines.push(`  --space-${k}: ${v};`);
  } else {
    lines.push(
      `  --space-xs:  ${t.spacing.scale.xs};`,
      `  --space-sm:  ${t.spacing.scale.sm};`,
      `  --space-md:  ${t.spacing.scale.md};`,
      `  --space-lg:  ${t.spacing.scale.lg};`,
      `  --space-xl:  ${t.spacing.scale.xl};`,
      `  --space-2xl: ${t.spacing.scale['2xl']};`,
      `  --space-3xl: ${t.spacing.scale['3xl']};`,
    );
  }
  if (t.typographyScale) {
    lines.push('', '  /* ── Typography (physical) ─── */');
    lines.push(`  --font-size-base: ${t.typographyScale.baseSize};`);
    for (const step of t.typographyScale.steps) {
      lines.push(`  --font-size-${step.role}: ${step.px};`);
      lines.push(`  --line-height-${step.role}: ${step.lineHeight};`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

function buildTailwind(t: DesignTokens): string {
  const ext: Record<string, unknown> = {
    colors: {
      primary: t.color.brand.primary, secondary: t.color.brand.secondary,
      accent: t.color.brand.accent, background: t.color.background.page,
      surface: t.color.background.surface, text: t.color.text.primary,
      muted: t.color.text.secondary, border: t.color.border,
      success: t.color.status.success, warning: t.color.status.warning, error: t.color.status.error,
    },
    borderRadius: { none: t.radius.none, sm: t.radius.sm, DEFAULT: t.radius.md, lg: t.radius.lg, xl: t.radius.xl, full: t.radius.full },
    boxShadow: { sm: t.shadow.sm, DEFAULT: t.shadow.md, lg: t.shadow.lg, xl: t.shadow.xl },
    fontFamily: { sans: [t.typography.families.body], heading: [t.typography.families.heading], mono: [t.typography.families.mono] },
    spacing: Object.fromEntries(Object.entries(t.spacing.scale)),
    fontSize: Object.fromEntries(Object.entries(t.typography.scale).map(([k, v]) => [k, [v.size, { lineHeight: v.lineHeight }]])),
  };
  if (t.spacingSystem) ext.spacing = Object.fromEntries(Object.entries(t.spacingSystem.named));
  if (t.typographyScale) ext.fontSize = Object.fromEntries(t.typographyScale.steps.map(s => [s.role, [s.px, { lineHeight: s.lineHeight }]]));
  return JSON.stringify({ theme: { extend: ext } }, null, 2);
}

function downloadJSON(t: DesignTokens, siteUrl: string): void {
  const blob = new Blob([JSON.stringify(t, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  let host   = 'tokens';
  try { host = new URL(siteUrl).hostname.replace(/\W+/g, '-'); } catch {}
  a.href = url; a.download = `${host}-design-tokens.json`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// § 5  Shared interactive primitives
// ─────────────────────────────────────────────────────────────────────────────

function ColorSwatch({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const light  = luminance(value) > 0.55;
  const textFg = light ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.78)';
  const scrim  = light ? 'rgba(0,0,0,0.10)' : 'rgba(0,0,0,0.40)';

  function handleCopy() {
    void navigator.clipboard.writeText(value.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      onClick={handleCopy}
      title={`Copy ${value}`}
      style={{ flex:'1 1 72px', minWidth:72, borderRadius:10, overflow:'hidden', cursor:'pointer', transition:'transform .18s', position:'relative' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1) translateY(0)')}
    >
      <div style={{ height:52, background:value, position:'relative' }}>
        {copied && (
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.35)' }}>
            <Check style={{ width:16, height:16, color:'#fff' }} />
          </div>
        )}
        {!copied && (
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'opacity .15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity='1')} onMouseLeave={e => (e.currentTarget.style.opacity='0')}>
            <Copy style={{ width:14, height:14, color:'rgba(255,255,255,.8)' }} />
          </div>
        )}
      </div>
      <div style={{ padding:'6px 8px', background:scrim }}>
        <span style={{ display:'block', fontSize:9, fontFamily:monoFont, color: light ? 'rgba(0,0,0,.4)' : 'rgba(255,255,255,.42)', marginBottom:1 }}>{label}</span>
        <span style={{ fontSize:10.5, fontFamily:monoFont, color:textFg, fontWeight:500 }}>{value.toUpperCase()}</span>
      </div>
    </div>
  );
}

function HoverBtn({
  tokens, style, children, outlined,
}: {
  tokens: DesignTokens; style?: React.CSSProperties; children: React.ReactNode; outlined?: boolean;
}) {
  const [st, setSt] = useState<'idle' | 'hover' | 'press'>('idle');
  const c    = tokens.color;
  const r    = tokens.radius;
  const tint = shadowTint(tokens);
  const base: React.CSSProperties = outlined
    ? { background: 'transparent', color: c.brand.primary, border: `1.5px solid ${c.brand.primary}`, borderRadius: r.md }
    : { background: c.brand.primary, color: c.text.inverse, border: 'none', borderRadius: r.md };
  const shadow = st === 'press'
    ? 'none'
    : st === 'hover'
      ? layeredShadow(archShadowDepth(tokens, 'hover'), tint)
      : layeredShadow(archShadowDepth(tokens, 'btn'), tint);
  return (
    <button
      style={{
        ...base, ...style,
        boxShadow: shadow,
        transform: st === 'press'
          ? 'translateY(1px) scale(0.96)'
          : st === 'hover'
            ? 'translateY(-2px) scale(1.02)'
            : 'translateY(0) scale(1)',
        transition: 'box-shadow 0.18s cubic-bezier(.22,.68,0,1.2), transform 0.15s cubic-bezier(.22,.68,0,1.2), opacity 0.12s',
        opacity: st === 'press' ? 0.78 : 1,
        cursor: 'pointer',
        WebkitFontSmoothing: 'antialiased',
      }}
      onMouseEnter={() => setSt('hover')} onMouseLeave={() => setSt('idle')}
      onMouseDown={() => setSt('press')} onMouseUp={() => setSt('hover')}
    >
      {children}
    </button>
  );
}

function HoverCard({
  tokens, style, children, disabled,
}: {
  tokens: DesignTokens; style?: React.CSSProperties; children: React.ReactNode; disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const dark = isDarkSite(tokens);
  const tint = shadowTint(tokens);
  const idleDepth  = archShadowDepth(tokens, 'card');
  const hoverDepth = archShadowDepth(tokens, 'hover');

  return (
    <div
      style={{
        ...style,
        boxShadow: hovered && !disabled
          ? layeredShadow(hoverDepth, tint)
          : layeredShadow(idleDepth, tint),
        transform: hovered && !disabled
          ? 'translateY(-3px) scale(1.012)'
          : 'translateY(0) scale(1)',
        backdropFilter: hovered && !disabled && dark ? 'blur(6px) saturate(140%)' : 'none',
        WebkitBackdropFilter: hovered && !disabled && dark ? 'blur(6px) saturate(140%)' : 'none',
        transition: [
          'box-shadow 0.22s cubic-bezier(.22,.68,0,1.1)',
          'transform 0.2s cubic-bezier(.22,.68,0,1.1)',
          'backdrop-filter 0.2s ease',
          '-webkit-backdrop-filter 0.2s ease',
        ].join(', '),
        cursor: disabled ? 'default' : 'pointer',
        willChange: 'transform, box-shadow',
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

function FocusInput({
  tokens, placeholder, defaultValue, focused, error,
}: { tokens: DesignTokens; placeholder?: string; defaultValue?: string; focused?: boolean; error?: boolean }) {
  const [isFocused, setIsFocused] = useState(focused ?? false);
  const c = tokens.color;
  const r = tokens.radius;
  const ty = tokens.typography;
  const borderColor = error ? c.status.error : isFocused ? c.brand.primary : c.border;
  const boxShadow   = isFocused ? `0 0 0 3px ${error ? c.status.error : c.brand.primary}28` : 'none';
  return (
    <input
      readOnly placeholder={placeholder} defaultValue={defaultValue}
      style={{
        border:`${isFocused ? 1.5 : 1}px solid ${borderColor}`, borderRadius: r.sm,
        padding:'8px 13px', background: c.background.surface, color: c.text.primary,
        fontSize: 13, fontFamily: ty.families.body, outline: 'none', width: 200,
        boxShadow, transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => !focused && setIsFocused(false)}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 6  Blueprint CSS variable map
//
//  Maps DesignTokens hex values onto the CSS variable names that the AI
//  extractor writes into uiBlueprint Tailwind classes (e.g. bg-[var(--color-bg-page)]).
//  Injected as an inline style object on the root wrapper so that all
//  arbitrary-value classes referencing var(--color-*) resolve correctly.
// ─────────────────────────────────────────────────────────────────────────────
function blueprintCSSVars(tokens: DesignTokens): React.CSSProperties {
  return {
    '--color-bg-page':        tokens.color.background.page,
    '--color-bg-surface':     tokens.color.background.surface,
    '--color-text-primary':   tokens.color.text.primary,
    '--color-text-secondary': tokens.color.text.secondary,
    '--color-text-inverse':   tokens.color.text.inverse,
    '--color-brand-primary':  tokens.color.brand.primary,
    '--color-brand-secondary':tokens.color.brand.secondary,
    '--color-brand-accent':   tokens.color.brand.accent,
    '--color-border-default': tokens.color.border,
    '--color-status-success': tokens.color.status.success,
    '--color-status-warning': tokens.color.status.warning,
    '--color-status-error':   tokens.color.status.error,
  } as React.CSSProperties;
}

// ─────────────────────────────────────────────────────────────────────────────
// § 7  Tailwind arbitrary-value → React.CSSProperties converter
//
//  Converts the Tailwind utility strings emitted by the AI extractor into
//  inline React styles so the preview renders correctly without a JIT pass.
//
//  Handles:
//   • Arbitrary values:  px-[48px]  gap-[32px]  text-[14px]  z-[100]
//   • CSS-var references: bg-[var(--color-bg-page)]  text-[var(--color-text-primary)]
//   • Standard scale utilities: flex, grid-cols-3, items-center, etc.
//   • Responsive / pseudo prefixes (md:, hover:, …) are stripped — only base
//     styles are applied, which is sufficient for the static mini-preview.
// ─────────────────────────────────────────────────────────────────────────────
function twToStyle(
  classes: string,
  opts: { sanitizePosition?: boolean } = {},
): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (!classes) return style;

  for (const cls of classes.trim().split(/\s+/)) {
    if (!cls) continue;
    // Strip responsive / state prefixes (md:, hover:, focus:, dark:, …)
    const base = cls.replace(/^[a-z-]+:/, '');

    // ── Helpers ────────────────────────────────────────────────────────────
    /** Extract arbitrary value from `prefix-[value]`, decode underscores. */
    const arb = (prefix: string): string | null => {
      if (!base.startsWith(prefix + '[') || !base.endsWith(']')) return null;
      return base.slice(prefix.length + 1, -1).replace(/_/g, ' ');
    };
    /** Tailwind default scale: gap-4 → 16px */
    const scale = (prefix: string): string | null => {
      if (!base.startsWith(prefix)) return null;
      const n = parseFloat(base.slice(prefix.length));
      return isNaN(n) ? null : `${n * 4}px`;
    };

    // ── Display ────────────────────────────────────────────────────────────
    if (base === 'flex')         { style.display = 'flex';         continue; }
    if (base === 'inline-flex')  { style.display = 'inline-flex';  continue; }
    if (base === 'grid')         { style.display = 'grid';         continue; }
    if (base === 'block')        { style.display = 'block';        continue; }
    if (base === 'inline-block') { style.display = 'inline-block'; continue; }
    if (base === 'inline')       { style.display = 'inline';       continue; }
    if (base === 'hidden')       { style.display = 'none';         continue; }

    // ── Flex direction / wrap / grow / shrink ──────────────────────────────
    if (base === 'flex-col')         { style.flexDirection = 'column';         continue; }
    if (base === 'flex-row')         { style.flexDirection = 'row';            continue; }
    if (base === 'flex-col-reverse') { style.flexDirection = 'column-reverse'; continue; }
    if (base === 'flex-row-reverse') { style.flexDirection = 'row-reverse';    continue; }
    if (base === 'flex-wrap')        { style.flexWrap = 'wrap';                continue; }
    if (base === 'flex-nowrap')      { style.flexWrap = 'nowrap';              continue; }
    if (base === 'flex-1')           { style.flex = '1 1 0%';                  continue; }
    if (base === 'flex-auto')        { style.flex = '1 1 auto';                continue; }
    if (base === 'flex-none')        { style.flex = 'none';                    continue; }
    if (base === 'flex-shrink-0' || base === 'shrink-0') { style.flexShrink = 0; continue; }
    if (base === 'shrink')           { style.flexShrink = 1;                   continue; }
    if (base === 'grow')             { style.flexGrow = 1;                     continue; }
    if (base === 'grow-0')           { style.flexGrow = 0;                     continue; }

    // ── Alignment ──────────────────────────────────────────────────────────
    if (base === 'items-center')   { style.alignItems = 'center';        continue; }
    if (base === 'items-start')    { style.alignItems = 'flex-start';    continue; }
    if (base === 'items-end')      { style.alignItems = 'flex-end';      continue; }
    if (base === 'items-stretch')  { style.alignItems = 'stretch';       continue; }
    if (base === 'items-baseline') { style.alignItems = 'baseline';      continue; }
    if (base === 'justify-center')  { style.justifyContent = 'center';        continue; }
    if (base === 'justify-between') { style.justifyContent = 'space-between'; continue; }
    if (base === 'justify-start')   { style.justifyContent = 'flex-start';    continue; }
    if (base === 'justify-end')     { style.justifyContent = 'flex-end';      continue; }
    if (base === 'justify-around')  { style.justifyContent = 'space-around';  continue; }
    if (base === 'justify-evenly')  { style.justifyContent = 'space-evenly';  continue; }
    if (base === 'self-center')  { style.alignSelf = 'center';     continue; }
    if (base === 'self-start')   { style.alignSelf = 'flex-start'; continue; }
    if (base === 'self-end')     { style.alignSelf = 'flex-end';   continue; }
    if (base === 'self-stretch') { style.alignSelf = 'stretch';    continue; }

    // ── Grid ───────────────────────────────────────────────────────────────
    {
      const a = arb('grid-cols-');
      if (a !== null) {
        // grid-cols-[3] → repeat(3, minmax(0,1fr))  or  grid-cols-[repeat(3,1fr)] passthrough
        const n = parseInt(a);
        style.gridTemplateColumns = !isNaN(n) && String(n) === a
          ? `repeat(${n}, minmax(0, 1fr))`
          : a;
        continue;
      }
      const m = base.match(/^grid-cols-(\d+)$/);
      if (m) { style.gridTemplateColumns = `repeat(${m[1]}, minmax(0, 1fr))`; continue; }
      const cs = base.match(/^col-span-(\d+)$/); if (cs) { style.gridColumn = `span ${cs[1]} / span ${cs[1]}`; continue; }
      const rs = base.match(/^row-span-(\d+)$/); if (rs) { style.gridRow    = `span ${rs[1]} / span ${rs[1]}`; continue; }
      const gr = arb('grid-rows-');
      if (gr !== null) { style.gridTemplateRows = gr; continue; }
    }

    // ── Gap ────────────────────────────────────────────────────────────────
    { const a = arb('gap-');   if (a !== null) { style.gap      = a; continue; } }
    { const a = arb('gap-x-'); if (a !== null) { style.columnGap = a; continue; } }
    { const a = arb('gap-y-'); if (a !== null) { style.rowGap    = a; continue; } }
    { const s = scale('gap-'); if (s !== null) { style.gap      = s; continue; } }

    // ── Width / Height ─────────────────────────────────────────────────────
    if (base === 'w-full')   { style.width  = '100%';  continue; }
    if (base === 'w-screen') { style.width  = '100vw'; continue; }
    if (base === 'h-full')   { style.height = '100%';  continue; }
    if (base === 'h-screen') { style.height = '100vh'; continue; }
    if (base === 'w-auto')   { style.width  = 'auto';  continue; }
    if (base === 'h-auto')   { style.height = 'auto';  continue; }
    { const a = arb('w-');     if (a !== null) { style.width     = a; continue; } }
    { const a = arb('h-');     if (a !== null) { style.height    = a; continue; } }
    { const a = arb('min-w-'); if (a !== null) { style.minWidth  = a; continue; } }
    { const a = arb('min-h-'); if (a !== null) { style.minHeight = a; continue; } }
    { const a = arb('max-w-'); if (a !== null) { style.maxWidth  = a; continue; } }
    { const a = arb('max-h-'); if (a !== null) { style.maxHeight = a; continue; } }

    // ── Padding ────────────────────────────────────────────────────────────
    { const a = arb('p-');  if (a !== null) { style.padding       = a; continue; } }
    { const a = arb('px-'); if (a !== null) { style.paddingLeft   = a; style.paddingRight  = a; continue; } }
    { const a = arb('py-'); if (a !== null) { style.paddingTop    = a; style.paddingBottom = a; continue; } }
    { const a = arb('pt-'); if (a !== null) { style.paddingTop    = a; continue; } }
    { const a = arb('pb-'); if (a !== null) { style.paddingBottom = a; continue; } }
    { const a = arb('pl-'); if (a !== null) { style.paddingLeft   = a; continue; } }
    { const a = arb('pr-'); if (a !== null) { style.paddingRight  = a; continue; } }
    { const s = scale('p-');  if (s !== null) { style.padding       = s; continue; } }
    { const s = scale('px-'); if (s !== null) { style.paddingLeft   = s; style.paddingRight  = s; continue; } }
    { const s = scale('py-'); if (s !== null) { style.paddingTop    = s; style.paddingBottom = s; continue; } }
    { const s = scale('pt-'); if (s !== null) { style.paddingTop    = s; continue; } }
    { const s = scale('pb-'); if (s !== null) { style.paddingBottom = s; continue; } }
    { const s = scale('pl-'); if (s !== null) { style.paddingLeft   = s; continue; } }
    { const s = scale('pr-'); if (s !== null) { style.paddingRight  = s; continue; } }

    // ── Margin ─────────────────────────────────────────────────────────────
    if (base === 'mx-auto') { style.marginLeft = 'auto'; style.marginRight = 'auto'; continue; }
    if (base === 'my-auto') { style.marginTop  = 'auto'; style.marginBottom = 'auto'; continue; }
    { const a = arb('m-');  if (a !== null) { style.margin        = a; continue; } }
    { const a = arb('mx-'); if (a !== null) { style.marginLeft    = a; style.marginRight  = a; continue; } }
    { const a = arb('my-'); if (a !== null) { style.marginTop     = a; style.marginBottom = a; continue; } }
    { const a = arb('mt-'); if (a !== null) { style.marginTop     = a; continue; } }
    { const a = arb('mb-'); if (a !== null) { style.marginBottom  = a; continue; } }
    { const a = arb('ml-'); if (a !== null) { style.marginLeft    = a; continue; } }
    { const a = arb('mr-'); if (a !== null) { style.marginRight   = a; continue; } }
    { const s = scale('m-');  if (s !== null) { style.margin        = s; continue; } }
    { const s = scale('mt-'); if (s !== null) { style.marginTop     = s; continue; } }
    { const s = scale('mb-'); if (s !== null) { style.marginBottom  = s; continue; } }

    // ── Background ─────────────────────────────────────────────────────────
    {
      const a = arb('bg-');
      if (a !== null) {
        if (a.startsWith('linear-gradient') || a.startsWith('radial-gradient') || a.startsWith('conic-gradient')) {
          style.background = a;
        } else {
          style.backgroundColor = a;
        }
        continue;
      }
    }
    if (base === 'bg-transparent') { style.backgroundColor = 'transparent'; continue; }
    if (base === 'bg-white')       { style.backgroundColor = '#fff';         continue; }
    if (base === 'bg-black')       { style.backgroundColor = '#000';         continue; }

    // ── Text colour & size ─────────────────────────────────────────────────
    {
      const a = arb('text-');
      if (a !== null) {
        if (a.startsWith('var(') || a.startsWith('#') || a.startsWith('rgb') || a.startsWith('hsl')) {
          style.color = a;
        } else if (/^\d/.test(a)) {
          style.fontSize = a;
        } else {
          // Named Tailwind colour like "gray-500" — skip gracefully
        }
        continue;
      }
    }
    if (base === 'text-center')      { style.textAlign = 'center'; continue; }
    if (base === 'text-left')        { style.textAlign = 'left';   continue; }
    if (base === 'text-right')       { style.textAlign = 'right';  continue; }
    if (base === 'text-white')       { style.color = '#fff';        continue; }
    if (base === 'text-black')       { style.color = '#000';        continue; }
    // Standard text-size tokens
    if (base === 'text-xs')   { style.fontSize = '0.75rem'; continue; }
    if (base === 'text-sm')   { style.fontSize = '0.875rem'; continue; }
    if (base === 'text-base') { style.fontSize = '1rem';    continue; }
    if (base === 'text-lg')   { style.fontSize = '1.125rem'; continue; }
    if (base === 'text-xl')   { style.fontSize = '1.25rem'; continue; }
    if (base === 'text-2xl')  { style.fontSize = '1.5rem';  continue; }
    if (base === 'text-3xl')  { style.fontSize = '1.875rem'; continue; }
    if (base === 'text-4xl')  { style.fontSize = '2.25rem'; continue; }

    // ── Font weight / family ───────────────────────────────────────────────
    {
      const a = arb('font-');
      if (a !== null) {
        const n = parseFloat(a);
        if (!isNaN(n) && String(n) === a) {
          style.fontWeight = n as React.CSSProperties['fontWeight'];
        } else {
          style.fontFamily = a;
        }
        continue;
      }
    }
    if (base === 'font-thin')      { style.fontWeight = 100; continue; }
    if (base === 'font-light')     { style.fontWeight = 300; continue; }
    if (base === 'font-normal')    { style.fontWeight = 400; continue; }
    if (base === 'font-medium')    { style.fontWeight = 500; continue; }
    if (base === 'font-semibold')  { style.fontWeight = 600; continue; }
    if (base === 'font-bold')      { style.fontWeight = 700; continue; }
    if (base === 'font-extrabold') { style.fontWeight = 800; continue; }
    if (base === 'font-black')     { style.fontWeight = 900; continue; }

    // ── Line height ────────────────────────────────────────────────────────
    { const a = arb('leading-'); if (a !== null) { style.lineHeight = a; continue; } }
    if (base === 'leading-none')   { style.lineHeight = '1';     continue; }
    if (base === 'leading-tight')  { style.lineHeight = '1.25';  continue; }
    if (base === 'leading-snug')   { style.lineHeight = '1.375'; continue; }
    if (base === 'leading-normal') { style.lineHeight = '1.5';   continue; }
    if (base === 'leading-relaxed'){ style.lineHeight = '1.625'; continue; }
    if (base === 'leading-loose')  { style.lineHeight = '2';     continue; }

    // ── Letter spacing ─────────────────────────────────────────────────────
    { const a = arb('tracking-'); if (a !== null) { style.letterSpacing = a; continue; } }
    if (base === 'tracking-tighter') { style.letterSpacing = '-0.05em';  continue; }
    if (base === 'tracking-tight')   { style.letterSpacing = '-0.025em'; continue; }
    if (base === 'tracking-normal')  { style.letterSpacing = '0';        continue; }
    if (base === 'tracking-wide')    { style.letterSpacing = '0.025em';  continue; }
    if (base === 'tracking-wider')   { style.letterSpacing = '0.05em';   continue; }
    if (base === 'tracking-widest')  { style.letterSpacing = '0.1em';    continue; }

    // ── Text transform / whitespace ────────────────────────────────────────
    if (base === 'uppercase')        { style.textTransform = 'uppercase'; continue; }
    if (base === 'lowercase')        { style.textTransform = 'lowercase'; continue; }
    if (base === 'capitalize')       { style.textTransform = 'capitalize'; continue; }
    if (base === 'truncate')         { style.overflow = 'hidden'; style.textOverflow = 'ellipsis'; style.whiteSpace = 'nowrap'; continue; }
    if (base === 'whitespace-nowrap'){ style.whiteSpace = 'nowrap';  continue; }
    if (base === 'whitespace-normal'){ style.whiteSpace = 'normal';  continue; }
    if (base === 'whitespace-pre')   { style.whiteSpace = 'pre';     continue; }
    if (base === 'break-words')      { style.wordBreak  = 'break-word'; continue; }

    // ── Border ─────────────────────────────────────────────────────────────
    if (base === 'border')   { style.borderWidth = '1px'; style.borderStyle = 'solid'; continue; }
    if (base === 'border-0') { style.border = 'none'; continue; }
    if (base === 'border-t') { style.borderTopWidth    = '1px'; style.borderTopStyle    = 'solid'; continue; }
    if (base === 'border-b') { style.borderBottomWidth = '1px'; style.borderBottomStyle = 'solid'; continue; }
    if (base === 'border-l') { style.borderLeftWidth   = '1px'; style.borderLeftStyle   = 'solid'; continue; }
    if (base === 'border-r') { style.borderRightWidth  = '1px'; style.borderRightStyle  = 'solid'; continue; }
    {
      // border-[var(--color-border-default)] sets borderColor
      const a = arb('border-');
      if (a !== null) {
        if (a.startsWith('var(') || a.startsWith('#') || a.startsWith('rgb') || a.startsWith('hsl')) {
          style.borderColor = a;
        }
        // Numeric border-[2px] sets width
        else if (/^\d/.test(a)) {
          style.borderWidth = a;
        }
        continue;
      }
    }

    // ── Border radius ──────────────────────────────────────────────────────
    { const a = arb('rounded-'); if (a !== null) { style.borderRadius = a; continue; } }
    if (base === 'rounded-none') { style.borderRadius = '0';        continue; }
    if (base === 'rounded-sm')   { style.borderRadius = '0.125rem'; continue; }
    if (base === 'rounded')      { style.borderRadius = '0.25rem';  continue; }
    if (base === 'rounded-md')   { style.borderRadius = '0.375rem'; continue; }
    if (base === 'rounded-lg')   { style.borderRadius = '0.5rem';   continue; }
    if (base === 'rounded-xl')   { style.borderRadius = '0.75rem';  continue; }
    if (base === 'rounded-2xl')  { style.borderRadius = '1rem';     continue; }
    if (base === 'rounded-3xl')  { style.borderRadius = '1.5rem';   continue; }
    if (base === 'rounded-full') { style.borderRadius = '9999px';   continue; }

    // ── Shadow ─────────────────────────────────────────────────────────────
    { const a = arb('shadow-'); if (a !== null) { style.boxShadow = a; continue; } }
    if (base === 'shadow-none') { style.boxShadow = 'none'; continue; }
    if (base === 'shadow-sm')   { style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)'; continue; }
    if (base === 'shadow')      { style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'; continue; }
    if (base === 'shadow-md')   { style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'; continue; }
    if (base === 'shadow-lg')   { style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'; continue; }

    // ── Position ───────────────────────────────────────────────────────────
    if (base === 'relative') { style.position = 'relative'; continue; }
    if (base === 'absolute') { style.position = 'absolute'; continue; }
    if (base === 'static')   { style.position = 'static';   continue; }
    if (base === 'sticky')   { style.position = 'sticky';   continue; }
    if (base === 'fixed') {
      // In preview context, fixed breaks out of the container — use sticky instead
      style.position = opts.sanitizePosition ? 'sticky' : 'fixed';
      continue;
    }
    if (base === 'inset-0')   { style.inset  = '0';  continue; }
    if (base === 'inset-x-0') { style.left   = '0';  style.right  = '0'; continue; }
    if (base === 'inset-y-0') { style.top    = '0';  style.bottom = '0'; continue; }
    if (base === 'top-0')     { style.top    = '0';  continue; }
    if (base === 'bottom-0')  { style.bottom = '0';  continue; }
    if (base === 'left-0')    { style.left   = '0';  continue; }
    if (base === 'right-0')   { style.right  = '0';  continue; }
    { const a = arb('top-');    if (a !== null) { style.top    = a; continue; } }
    { const a = arb('bottom-'); if (a !== null) { style.bottom = a; continue; } }
    { const a = arb('left-');   if (a !== null) { style.left   = a; continue; } }
    { const a = arb('right-');  if (a !== null) { style.right  = a; continue; } }
    { const a = arb('inset-');  if (a !== null) { style.inset  = a; continue; } }

    // ── Z-index ────────────────────────────────────────────────────────────
    { const a = arb('z-'); if (a !== null) { style.zIndex = parseInt(a); continue; } }
    { const m = base.match(/^z-(\d+)$/); if (m) { style.zIndex = parseInt(m[1]); continue; } }

    // ── Overflow ───────────────────────────────────────────────────────────
    if (base === 'overflow-hidden')   { style.overflow  = 'hidden';   continue; }
    if (base === 'overflow-auto')     { style.overflow  = 'auto';     continue; }
    if (base === 'overflow-scroll')   { style.overflow  = 'scroll';   continue; }
    if (base === 'overflow-visible')  { style.overflow  = 'visible';  continue; }
    if (base === 'overflow-x-hidden') { style.overflowX = 'hidden';   continue; }
    if (base === 'overflow-y-auto')   { style.overflowY = 'auto';     continue; }
    if (base === 'overflow-y-hidden') { style.overflowY = 'hidden';   continue; }

    // ── Opacity ────────────────────────────────────────────────────────────
    { const a = arb('opacity-'); if (a !== null) { style.opacity = parseFloat(a) / 100; continue; } }
    { const m = base.match(/^opacity-(\d+)$/); if (m) { style.opacity = parseInt(m[1]) / 100; continue; } }

    // ── Object fit / position ──────────────────────────────────────────────
    if (base === 'object-cover')    { style.objectFit      = 'cover';   continue; }
    if (base === 'object-contain')  { style.objectFit      = 'contain'; continue; }
    if (base === 'object-fill')     { style.objectFit      = 'fill';    continue; }
    if (base === 'object-top')      { style.objectPosition = 'top';     continue; }
    if (base === 'object-center')   { style.objectPosition = 'center';  continue; }

    // ── Aspect ratio ───────────────────────────────────────────────────────
    { const a = arb('aspect-'); if (a !== null) { (style as Record<string,unknown>).aspectRatio = a; continue; } }
    if (base === 'aspect-square') { (style as Record<string,unknown>).aspectRatio = '1 / 1'; continue; }
    if (base === 'aspect-video')  { (style as Record<string,unknown>).aspectRatio = '16 / 9'; continue; }

    // ── Cursor / pointer / select ──────────────────────────────────────────
    if (base === 'cursor-pointer')       { style.cursor        = 'pointer'; continue; }
    if (base === 'cursor-default')       { style.cursor        = 'default'; continue; }
    if (base === 'select-none')          { style.userSelect    = 'none';    continue; }
    if (base === 'pointer-events-none')  { style.pointerEvents = 'none';    continue; }

    // ── Misc ───────────────────────────────────────────────────────────────
    if (base === 'transition')     { style.transition = 'all 0.15s ease'; continue; }
    if (base === 'transition-all') { style.transition = 'all 0.15s ease'; continue; }
    if (base === 'mx-auto')        { style.marginLeft = 'auto'; style.marginRight = 'auto'; continue; }

    // Unknown classes are silently skipped — they cause no harm.
  }

  return style;
}

// ─────────────────────────────────────────────────────────────────────────────
// § 8  Blueprint renderer
//
//  Three-level hierarchy:
//   BlueprintRenderer  → root wrapper (CSS vars + flex-col layout)
//     BlueprintSection → one uiBlueprint.sections[] entry (semantic tag + Tailwind layout)
//       BlueprintNode  → one component / sub-component (element selection + Tailwind classes)
//
//  Recursive: BlueprintNode renders its own `components` / `children` children,
//  enabling any DOM depth the AI extractor might emit.
// ─────────────────────────────────────────────────────────────────────────────

/** Local recursive type — extends the flat DesignTokens schema with optional nesting. */
type BPComponent = {
  role: string;
  classes?: string;
  content?: string;
  assetRef?: string;
  repeats?: number;
  /** Nested children — emitted by the AI when repeating-structure collapse is used */
  components?: BPComponent[];
  children?: BPComponent[];
};

/** Picks the right HTML tag for a component's semantic role. */
function roleTag(role: string): string {
  const r = role.toLowerCase();
  if (r === 'h1' || r === 'headline' || r.includes('heading-1')) return 'h1';
  if (r === 'h2' || r === 'heading' || r.includes('heading-2') || r === 'title') return 'h2';
  if (r === 'h3' || r.includes('heading-3') || r === 'subheading') return 'h3';
  if (r === 'h4' || r.includes('heading-4')) return 'h4';
  if (r === 'paragraph' || r === 'body-text' || r === 'description' || r === 'lead' || r === 'subtitle') return 'p';
  if (r === 'button' || r === 'cta' || r === 'cta-button' || r.includes('btn')) return 'button';
  if (r === 'link' || r === 'anchor') return 'a';
  if (r === 'nav' || r === 'navigation') return 'nav';
  if (r === 'ul' || r === 'list') return 'ul';
  if (r === 'li' || r === 'list-item') return 'li';
  if (r === 'hr' || r === 'divider' || r === 'separator') return 'hr';
  if (r === 'img' || r === 'image' || r === 'photo') return 'img';
  if (r === 'span' || r === 'label' || r === 'badge' || r === 'tag' || r === 'chip'
      || r === 'nav-item' || r === 'nav-link' || r === 'menu-item') return 'span';
  return 'div';
}

function BlueprintNode({ node }: { node: BPComponent }) {
  const style = twToStyle(node.classes ?? '', { sanitizePosition: true });
  const childNodes = node.components ?? node.children ?? [];
  const tag = roleTag(node.role);

  // ── Image: has assetRef that looks like a URL ──────────────────────────
  if (node.assetRef && (node.assetRef.startsWith('http') || node.assetRef.startsWith('/'))) {
    if (tag === 'img' || node.role.toLowerCase().includes('image') || node.role.toLowerCase().includes('logo') || node.role.toLowerCase().includes('photo')) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={node.assetRef} alt={node.content ?? ''} style={{ maxWidth: '100%', ...style }} />;
    }
    // background-image container
    return (
      <div style={{ backgroundImage: `url(${node.assetRef})`, backgroundSize: 'cover', backgroundPosition: 'center', ...style }}>
        {childNodes.map((c, i) => <BlueprintNode key={i} node={c} />)}
      </div>
    );
  }

  // ── SVG placeholder: inline-svg:<n> ────────────────────────────────────
  if (node.assetRef?.startsWith('inline-svg:')) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
        <span style={{ fontSize: 10, opacity: 0.4 }}>◈</span>
      </div>
    );
  }

  // ── Gradient background via assetRef ───────────────────────────────────
  if (node.assetRef && (node.assetRef.includes('gradient') || node.assetRef.startsWith('linear') || node.assetRef.startsWith('radial'))) {
    return (
      <div style={{ background: node.assetRef, ...style }}>
        {childNodes.map((c, i) => <BlueprintNode key={i} node={c} />)}
      </div>
    );
  }

  // ── Divider ────────────────────────────────────────────────────────────
  if (tag === 'hr') {
    return <hr style={{ border: 'none', borderTopWidth: '1px', borderTopStyle: 'solid', ...style }} />;
  }

  // ── Leaf text node ─────────────────────────────────────────────────────
  const content = node.content
    ? <>{node.content}</>
    : childNodes.length > 0
      ? <>{childNodes.map((c, i) => <BlueprintNode key={i} node={c} />)}</>
      : null;

  const baseStyle: React.CSSProperties = tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4'
    ? { margin: 0, ...style }
    : tag === 'button'
      ? { cursor: 'pointer', border: 'none', background: 'none', ...style }
      : tag === 'a'
        ? { textDecoration: 'none', ...style }
        : tag === 'ul'
          ? { listStyle: 'none', margin: 0, padding: 0, ...style }
          : tag === 'li'
            ? { ...style }
            : style;

  const Tag = tag as React.ElementType;
  return <Tag style={baseStyle}>{content}</Tag>;
}

/** Section-level type from the DesignTokens schema (with components typed locally). */
type BPSection = {
  id: string;
  semanticType: string;
  layoutClasses: string;
  zLayer: 'base' | 'floating' | 'overlay';
  components: BPComponent[];
};

function BlueprintSection({ section }: { section: BPSection }) {
  const style = twToStyle(section.layoutClasses ?? '', { sanitizePosition: true });

  // Map semanticType to semantic HTML tag
  const tagName =
    section.semanticType === 'nav'    ? 'nav'     :
    section.semanticType === 'footer' ? 'footer'  :
    section.semanticType === 'hero'   ? 'header'  :
    'section';
  const Tag = tagName as React.ElementType;

  return (
    <Tag style={style}>
      {section.components.map((comp, i) => (
        <BlueprintNode key={i} node={comp} />
      ))}
    </Tag>
  );
}

/**
 * BlueprintRenderer — data-driven, template-free page renderer.
 *
 * Reads exclusively from `tokens.uiBlueprint.sections`. Every section and
 * every component within it is rendered via the Tailwind → inline-style
 * converter, ensuring 1-to-1 fidelity with the extracted JSON.
 *
 * Fallback: if uiBlueprint is missing or empty a clear empty-state is shown —
 * no fake/placeholder layout is ever substituted.
 */
function BlueprintRenderer({ tokens }: { tokens: DesignTokens }) {
  const blueprint = tokens.uiBlueprint;

  // ── Empty state ─────────────────────────────────────────────────────────
  if (!blueprint || !blueprint.sections || blueprint.sections.length === 0) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: tokens.color.background.page,
        color: tokens.color.text.secondary,
        fontFamily: tokens.typography.families.body,
      }}>
        <span style={{ fontSize: 22, opacity: 0.2 }}>◫</span>
        <span style={{ fontSize: 10, opacity: 0.45, fontFamily: monoFont }}>uiBlueprint 数据缺失</span>
        <span style={{
          fontSize: 9, opacity: 0.3, fontFamily: monoFont,
          textAlign: 'center', maxWidth: 150, lineHeight: 1.55,
        }}>
          重新提取以生成{'\n'}uiBlueprint.sections
        </span>
      </div>
    );
  }

  // CSS variables let arbitrary Tailwind classes like bg-[var(--color-bg-page)] resolve
  const cssVars = blueprintCSSVars(tokens);

  // floating sections (nav / sticky bars) render first to sit at the visual top
  const sorted = [...blueprint.sections].sort((a, b) => {
    const order: Record<string, number> = { floating: 0, base: 1, overlay: 2 };
    return (order[a.zLayer] ?? 1) - (order[b.zLayer] ?? 1);
  });

  return (
    <div style={{
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: tokens.color.background.page,
      fontFamily: tokens.typography.families.body,
      color: tokens.color.text.primary,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      ...cssVars,
    }}>
      {sorted.map(section => (
        <BlueprintSection key={section.id} section={section as BPSection} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 9  BentoGrid (palette tab)
// ─────────────────────────────────────────────────────────────────────────────

const cellLabelStyle: React.CSSProperties = {
  fontSize:10, fontFamily:monoFont, letterSpacing:'0.12em',
  textTransform:'uppercase', color:'rgba(255,255,255,.24)', marginBottom:14,
};

function BentoGrid({ tokens, siteUrl }: { tokens: DesignTokens; siteUrl?: string }) {
  const c  = tokens.color;
  const ty = tokens.typography;
  const r  = tokens.radius;
  const sp = tokens.spacing;
  const sa = tokens.siteArchitecture;
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  function doExport(key: string, fn: () => void) {
    fn();
    setExportFeedback(key);
    setTimeout(() => setExportFeedback(null), 2000);
  }

  const swatches = [
    { label:'Brand / Primary',   value: c.brand.primary },
    { label:'Brand / Secondary', value: c.brand.secondary },
    { label:'Brand / Accent',    value: c.brand.accent },
    { label:'BG / Page',         value: c.background.page },
    { label:'BG / Surface',      value: c.background.surface },
    { label:'Text / Primary',    value: c.text.primary },
    { label:'Text / Secondary',  value: c.text.secondary },
    { label:'Border',            value: c.border },
  ];

  return (
    <div className="vi-bento">

      {/* ── Cell 1: Color System ── */}
      <div className="vi-cell-palette vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <p style={cellLabelStyle}>Color System</p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {swatches.map(s => <ColorSwatch key={s.label} {...s} />)}
          </div>
          <div style={{ display:'flex', gap:6, marginTop:10 }}>
            {([['Success', c.status.success], ['Warning', c.status.warning], ['Error', c.status.error]] as [string,string][]).map(([label, val]) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background: val }} />
                <span style={{ fontSize:9, fontFamily:monoFont, color:'rgba(255,255,255,.35)' }}>{label}</span>
              </div>
            ))}
          </div>
          {sa.motif && (
            <div style={{ marginTop:10, display:'flex', gap:5, flexWrap:'wrap' }}>
              {sa.motif.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                <span key={tag} style={{ padding:'2px 8px', borderRadius:6, background:'rgba(167,139,250,.08)', border:'1px solid rgba(167,139,250,.2)', fontSize:10, fontFamily:monoFont, color:'#c4b5fd' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Cell 2: Typography ── */}
      <div className="vi-cell-typo vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <p style={{ ...cellLabelStyle, marginBottom:0 }}>Typography</p>
            {tokens.typographyScale && (
              <span style={{ fontSize:9, fontFamily:monoFont, color:'#34d399', padding:'1px 6px', borderRadius:4, border:'1px solid rgba(52,211,153,.25)', background:'rgba(52,211,153,.06)' }}>
                ⬡ physical
              </span>
            )}
          </div>
          {tokens.typographyScale ? (
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:0, overflowY:'auto' }}>
              {[...tokens.typographyScale.steps].reverse().map(step => {
                const rawPx  = parseInt(step.px);
                const dispPx = Math.min(rawPx, 26);
                return (
                  <div key={step.px} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 0', borderBottom:'1px solid rgba(255,255,255,.045)' }}>
                    <span style={{ fontFamily: ty.families.body, fontSize: dispPx, fontWeight: step.weight, lineHeight: step.lineHeight, color:'rgba(255,255,255,.88)', minWidth:32, flexShrink:0 }}>Aa</span>
                    <div style={{ display:'flex', gap:4, marginLeft:'auto', alignItems:'center', flexShrink:0 }}>
                      <span style={{ fontSize:9, fontFamily:monoFont, color:'#a78bfa', padding:'1px 5px', borderRadius:4, border:'1px solid rgba(167,139,250,.2)', background:'rgba(167,139,250,.05)', whiteSpace:'nowrap' }}>{step.role}</span>
                      <span style={{ fontSize:9, fontFamily:monoFont, color:'rgba(255,255,255,.35)', whiteSpace:'nowrap' }}>{step.rem}</span>
                      <span style={{ fontSize:9, fontFamily:monoFont, color:'rgba(255,255,255,.18)', whiteSpace:'nowrap' }}>/{step.weight}</span>
                    </div>
                  </div>
                );
              })}
              {tokens.typographyScale.families.length > 0 && (
                <div style={{ display:'flex', gap:5, flexWrap:'wrap', paddingTop:8 }}>
                  {tokens.typographyScale.families.map(f => (
                    <span key={f} style={{ padding:'2px 7px', border:'1px solid rgba(124,109,240,.3)', borderRadius:5, fontSize:10, fontFamily:monoFont, color:'#a78bfa' }}>{f}</span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ fontFamily:syneFont, fontSize:28, fontWeight:700, lineHeight:1.1, letterSpacing:'-0.02em', color:'rgba(255,255,255,.95)' }}>
                The new<br/>standard.
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.42)', lineHeight:1.65, fontWeight:300 }}>
                Sans-serif stack optimised for high-DPI screens.
              </p>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:'auto', paddingTop:8 }}>
                <span style={{ padding:'3px 9px', border:'1px solid rgba(124,109,240,.3)', borderRadius:6, fontSize:10, fontFamily:monoFont, color:'#a78bfa' }}>{ty.families.body.split(',')[0].trim()}</span>
                <span style={{ padding:'3px 9px', border:'1px solid rgba(255,255,255,.065)', borderRadius:6, fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.35)' }}>wt: {ty.weights.bold}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Cell 3: Border Radius + Shadow ── */}
      <div className="vi-cell-radius vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <p style={cellLabelStyle}>Radius · Shadow</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:14, marginBottom:16 }}>
            {([{ size: r.sm, label:'sm' }, { size: r.md, label:'md' }, { size: r.lg, label:'lg' }, { size: r.xl, label:'xl' }] as { size: string; label: string }[]).map(({ size, label }) => (
              <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{ background:'linear-gradient(135deg, rgba(99,102,241,.25), rgba(167,139,250,.15))', border:'1px solid rgba(99,102,241,.3)', borderRadius: size, width: label==='sm'?22:label==='md'?32:label==='lg'?44:52, height: label==='sm'?22:label==='md'?32:label==='lg'?44:52 }} />
                <span style={{ fontSize:9, fontFamily:monoFont, color:'rgba(255,255,255,.3)' }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {([['sm', tokens.shadow.sm], ['md', tokens.shadow.md], ['lg', tokens.shadow.lg]] as [string,string][]).map(([key, val]) => (
              <div key={key} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:28, height:16, borderRadius: r.sm, background:'#fff', boxShadow: val, flexShrink:0 }} />
                <span style={{ fontSize:9, fontFamily:monoFont, color:'rgba(255,255,255,.28)', flex:1, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>shadow.{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cell 4: Spacing Scale ── */}
      <div className="vi-cell-spacing vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <p style={{ ...cellLabelStyle, marginBottom:0 }}>Spacing Scale</p>
            {tokens.spacingSystem && (
              <span style={{ fontSize:9, fontFamily:monoFont, color:'#34d399', padding:'1px 6px', borderRadius:4, border:'1px solid rgba(52,211,153,.25)', background:'rgba(52,211,153,.06)' }}>
                ⬡ physical
              </span>
            )}
          </div>
          {tokens.spacingSystem ? (
            (() => {
              const sys = tokens.spacingSystem!;
              const nameMap: Record<string, string> = {};
              for (const [k, v] of Object.entries(sys.named)) nameMap[v] = k;
              const maxPx = Math.max(...sys.steps.map(s => parseInt(s)), 1);
              return (
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  <div style={{ fontSize:9, fontFamily:monoFont, color:'rgba(52,211,153,.7)', marginBottom:4 }}>
                    base {sys.baseUnit}px grid · {sys.steps.length} steps
                  </div>
                  {sys.steps.map(step => {
                    const px   = parseInt(step);
                    const w    = Math.max(Math.round((px / maxPx) * 112), 4);
                    const name = nameMap[step];
                    return (
                      <div key={step} style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ height:4, borderRadius:2, background:'linear-gradient(90deg, #34d399, #6ee7b7)', opacity:0.75, width:`${w}px`, flexShrink:0 }} />
                        <span style={{ fontSize:9.5, fontFamily:monoFont, color:'rgba(255,255,255,.4)', whiteSpace:'nowrap' }}>
                          {step}{name ? ` · ${name}` : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })()
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {(['xs','sm','md','lg'] as const).map(key => (
                <div key={key} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ height:5, borderRadius:3, background:'linear-gradient(90deg, #7c6df0, #a78bfa)', opacity:0.7, width: parseInt(sp.scale[key]) * 1.2, minWidth:6, maxWidth:128, flexShrink:0 }} />
                  <span style={{ fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.35)', whiteSpace:'nowrap' }}>{sp.scale[key]} · {key}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Cell 5: Raw Tokens ── */}
      <div className="vi-cell-tokens vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <p style={cellLabelStyle}>Raw Tokens</p>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {([
              ['color.brand.primary',     c.brand.primary],
              ['spacing.baseUnit',         `${sp.baseUnit}px`],
              ['radius.md',                r.md],
              ['shadow.md',                tokens.shadow.md.slice(0, 28) + '…'],
              ['typography.4xl',           ty.scale['4xl'].size],
              ['architecture.paradigm',    sa.paradigm],
              ['architecture.density',     sa.density],
              ['layout.type',              sa.layout.type],
              ['visualWeight.dominant',    sa.visualWeight.dominant],
              ['visualWeight.hierarchy',   sa.visualWeight.hierarchy],
              ['skeleton.nav.brand',       tokens.skeleton.nav.brand || '—'],
              ['skeleton.hero.layout',     tokens.skeleton.hero.layout],
              ['skeleton.cards.columns',   `${tokens.skeleton.cards.gridColumns}`],
              ...(tokens.spacingSystem   ? [['spacing.steps', `${tokens.spacingSystem.steps.length} steps`]] : []),
              ...(tokens.typographyScale ? [['typo.baseSize', tokens.typographyScale.baseSize]] : []),
              ...(tokens.uiBlueprint     ? [['uiBlueprint.sections', `${tokens.uiBlueprint.sections.length} sections`]] : [['uiBlueprint', '—']]),
            ] as [string, string][]).map(([key, val]) => (
              <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,.055)' }}>
                <span style={{ fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.3)' }}>{key}</span>
                <span style={{ fontSize:10, fontFamily:monoFont, color:'#a78bfa', maxWidth:120, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cell 6: Blueprint Preview ── */}
      <div className="vi-cell-mock vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'22px 26px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <p style={{ ...cellLabelStyle, marginBottom:0 }}>Blueprint Preview</p>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:5,
              padding:'3px 10px', borderRadius:100,
              background: tokens.uiBlueprint ? 'rgba(52,211,153,.08)' : 'rgba(255,255,255,.04)',
              border: `1px solid ${tokens.uiBlueprint ? 'rgba(52,211,153,.25)' : 'rgba(255,255,255,.08)'}`,
              fontSize:10, fontFamily:monoFont,
              color: tokens.uiBlueprint ? '#34d399' : 'rgba(255,255,255,.35)',
            }}>
              <span style={{
                width:5, height:5, borderRadius:'50%',
                background: tokens.uiBlueprint ? '#34d399' : 'rgba(255,255,255,.25)',
                animation: tokens.uiBlueprint ? 'pulse-dot 2s infinite' : 'none',
              }} />
              {tokens.uiBlueprint
                ? `${tokens.uiBlueprint.sections.length} sections`
                : 'No blueprint'}
            </div>
          </div>

          <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,.065)', height:260 }}>
            <BlueprintRenderer tokens={tokens} />
          </div>

          <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
            {[
              { key:'css',  label:'Copy CSS Vars',   doneLabel:'✓ 已复制', color:'rgba(99,91,255,.1)',    border:'rgba(99,91,255,.25)',  text:'#a5a0ff', fn: () => void navigator.clipboard.writeText(buildCSSVars(tokens)) },
              { key:'tw',   label:'Tailwind Config',  doneLabel:'✓ 已复制', color:'rgba(56,189,248,.08)', border:'rgba(56,189,248,.2)',  text:'#7dd3fc', fn: () => void navigator.clipboard.writeText(buildTailwind(tokens)) },
              { key:'json', label:'Export JSON',       doneLabel:'✓ 已下载', color:'rgba(167,139,250,.08)',border:'rgba(167,139,250,.2)', text:'#c4b5fd', fn: () => downloadJSON(tokens, siteUrl ?? '') },
            ].map(({ key, label, doneLabel, color, border, text, fn }) => (
              <button key={key} onClick={() => doExport(key, fn)}
                style={{ flex:'1 1 120px', height:36, background: color, border:`1px solid ${border}`, borderRadius:9, color: text, fontSize:12, fontFamily:monoFont, cursor:'pointer', transition:'filter .2s' }}
                onMouseEnter={e => (e.currentTarget.style.filter='brightness(1.3)')}
                onMouseLeave={e => (e.currentTarget.style.filter='brightness(1)')}>
                {exportFeedback === key ? doneLabel : label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 10  ComponentPreview tab
// ─────────────────────────────────────────────────────────────────────────────

function ComponentPreview({ tokens }: { tokens: DesignTokens }) {
  const c  = tokens.color;
  const r  = tokens.radius;
  const ty = tokens.typography;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

      <div className="vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'16px 20px' }}>
          <p style={{ ...cellLabelStyle, marginBottom:12 }}>Buttons — hover &amp; press states</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            <HoverBtn tokens={tokens} style={{ padding:'8px 18px', fontFamily: ty.families.body, fontSize:13, fontWeight: ty.weights.bold, borderRadius: r.md }}>
              Primary
            </HoverBtn>
            <HoverBtn tokens={tokens} style={{ padding:'8px 18px', fontFamily: ty.families.body, fontSize:13, fontWeight: ty.weights.medium, borderRadius: r.md, background: c.brand.secondary, color: c.text.inverse, border:'none' }}>
              Secondary
            </HoverBtn>
            <HoverBtn tokens={tokens} outlined style={{ padding:'8px 18px', fontFamily: ty.families.body, fontSize:13, fontWeight: ty.weights.medium, borderRadius: r.md }}>
              Outline
            </HoverBtn>
            <HoverBtn tokens={tokens} style={{ padding:'8px 18px', fontFamily: ty.families.body, fontSize:13, background:'transparent', color: c.text.secondary, border:`1px solid ${c.border}`, borderRadius: r.md }}>
              Ghost
            </HoverBtn>
          </div>
        </div>
      </div>

      <div className="vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'16px 20px' }}>
          <p style={{ ...cellLabelStyle, marginBottom:12 }}>Card — elevation on hover</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {['Standard', 'Featured'].map((type, i) => (
              <HoverCard key={type} tokens={tokens} style={{ background: c.background.surface, border:`1px solid ${c.border}`, borderRadius: r.lg, padding:'14px 18px', boxShadow: tokens.shadow.sm, flex:'1 1 180px', minWidth:180 }}>
                <div style={{ width:'100%', height:52, borderRadius: r.md, background: i === 0 ? `${c.brand.primary}20` : `linear-gradient(135deg, ${c.brand.primary}35, ${c.brand.secondary}25)`, marginBottom:12 }} />
                <h3 style={{ fontWeight: ty.weights.bold, color: c.text.primary, fontSize:14, marginBottom:5, fontFamily: ty.families.heading }}>{type} Card</h3>
                <p style={{ color: c.text.secondary, fontSize:12, lineHeight: ty.scale.base.lineHeight, marginBottom:14, fontFamily: ty.families.body }}>
                  Body text with proper line-height and color hierarchy.
                </p>
                <HoverBtn tokens={tokens} style={{ width:'100%', padding:'7px', fontFamily: ty.families.body, fontSize:12, fontWeight: ty.weights.semibold, borderRadius: r.sm, textAlign:'center' as const }}>
                  {i === 0 ? 'Learn more' : 'Get started →'}
                </HoverBtn>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>

      <div className="vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'16px 20px' }}>
          <p style={{ ...cellLabelStyle, marginBottom:12 }}>Form Inputs — focus state</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            <FocusInput tokens={tokens} placeholder="Default placeholder" />
            <FocusInput tokens={tokens} defaultValue="Active / focused" focused />
            <FocusInput tokens={tokens} placeholder="Error state" error />
          </div>
        </div>
      </div>

      <div className="vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'16px 20px' }}>
          <p style={{ ...cellLabelStyle, marginBottom:12 }}>Status · Shadow Scale</p>
          <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
            {([['Success', c.status.success], ['Warning', c.status.warning], ['Error', c.status.error]] as [string,string][]).map(([label, bg]) => (
              <span key={label} style={{ padding:'3px 10px', borderRadius: r.full, background:`${bg}20`, border:`1px solid ${bg}60`, fontSize:11, fontFamily: ty.families.body, fontWeight: ty.weights.medium, color: bg }}>
                ● {label}
              </span>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {([['sm', tokens.shadow.sm], ['md', tokens.shadow.md], ['lg', tokens.shadow.lg], ['xl', tokens.shadow.xl]] as [string,string][]).map(([key, val]) => (
              <div key={key} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:20, borderRadius: r.sm, background: c.background.surface, boxShadow: val, flexShrink:0 }} />
                <span style={{ fontSize:10.5, fontFamily:monoFont, color:'rgba(255,255,255,.35)' }}>shadow.{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 11  ComparisonSlider tab
// ─────────────────────────────────────────────────────────────────────────────

function ComparisonSlider({ tokens, siteUrl }: { tokens: DesignTokens; siteUrl: string }) {
  const [position, setPosition] = useState(50);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError]   = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPosition(Math.max(0, Math.min(((clientX - left) / width) * 100, 100)));
  }, []);

  const screenshotSrc = `/api/screenshot?url=${encodeURIComponent(siteUrl)}`;

  return (
    <div>
      <p style={{ fontSize:12, fontFamily:monoFont, color:'rgba(255,255,255,.35)', marginBottom:12 }}>
        拖动中间的滑块 — 左侧为原始截图，右侧为 AI 还原效果。
      </p>
      <div
        ref={containerRef}
        className="vi-glow-card"
        style={{ cursor:'col-resize', touchAction:'none', userSelect:'none' }}
        onPointerMove={e => { if (e.buttons > 0 || e.pointerType !== 'mouse') updatePosition(e.clientX); }}
      >
        <div className="vi-glow-card-inner" style={{ position:'relative', height:480 }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,.02)' }}>
            {imgError ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8, color:'rgba(255,255,255,.35)' }}>
                <ImageOff style={{ width:32, height:32, opacity:.4 }} />
                <span style={{ fontSize:12, fontFamily:monoFont }}>截图加载失败</span>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={screenshotSrc} alt="原始网站截图" draggable={false}
                onLoad={() => setImgLoaded(true)} onError={() => setImgError(true)}
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', transition:'opacity .5s', opacity: imgLoaded ? 1 : 0 }}
              />
            )}
            {!imgLoaded && !imgError && (
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:24, height:24, borderRadius:'50%', border:'2px solid #a78bfa', borderTopColor:'transparent', animation:'spin 1s linear infinite' }} />
              </div>
            )}
          </div>

          <div style={{ position:'absolute', inset:0, overflow:'hidden', clipPath:`inset(0 0 0 ${position}%)` }}>
            <BlueprintRenderer tokens={tokens} />
            <div style={{ position:'absolute', bottom:12, right:12, borderRadius:100, background:'rgba(124,109,240,.8)', padding:'3px 12px', fontSize:11, fontFamily:monoFont, color:'#fff', backdropFilter:'blur(8px)' }}>
              AI Extracted
            </div>
          </div>

          <div style={{ position:'absolute', bottom:12, left:12, pointerEvents:'none', borderRadius:100, background:'rgba(0,0,0,.6)', padding:'3px 12px', fontSize:11, fontFamily:monoFont, color:'rgba(255,255,255,.72)', backdropFilter:'blur(8px)' }}>
            Original
          </div>
          <div style={{ position:'absolute', inset:'0 auto', top:0, bottom:0, width:1, background:'rgba(255,255,255,.8)', boxShadow:'0 0 10px rgba(255,255,255,.6)', left:`${position}%`, pointerEvents:'none' }} />
          <div
            style={{ position:'absolute', top:'50%', left:`${position}%`, transform:'translate(-50%,-50%)', zIndex:10, display:'flex', alignItems:'center', justifyContent:'center', width:36, height:36, borderRadius:'50%', background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,.4)', cursor:'col-resize' }}
            onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); e.stopPropagation(); }}
            onPointerMove={e => { if (e.buttons > 0) updatePosition(e.clientX); }}
          >
            <ChevronLeft style={{ width:14, height:14, color:'#374151', marginRight:-2 }} />
            <ChevronRight style={{ width:14, height:14, color:'#374151', marginLeft:-2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 12  ThemePreview — top-level export
// ─────────────────────────────────────────────────────────────────────────────

type TabId = 'palette' | 'preview' | 'compare';
const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: 'palette', icon: '◈', label: '色板' },
  { id: 'preview', icon: '⊡', label: '组件预览' },
  { id: 'compare', icon: '⇿', label: '滑块对比' },
];

export interface ThemePreviewProps {
  tokens: DesignTokens;
  siteUrl?: string;
}

export function ThemePreview({ tokens, siteUrl }: ThemePreviewProps) {
  const [active, setActive] = useState<TabId>('palette');
  const [showJSON, setShowJSON] = useState(false);

  const domain = useMemo(() => {
    try { return new URL(siteUrl ?? '').hostname; } catch { return null; }
  }, [siteUrl]);

  return (
    <div style={{ animation:'fade-up .5s ease both' }}>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, fontFamily:monoFont, letterSpacing:'0.1em', color:'rgba(255,255,255,.24)', textTransform:'uppercase' }}>
          <span style={{ width:3, height:3, borderRadius:'50%', background:'#a78bfa', display:'inline-block' }} />
          提取结果
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {domain && (
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.065)', borderRadius:8, fontSize:11, fontFamily:monoFont, color:'rgba(255,255,255,.72)' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#635bff' }} />
              {domain}
            </div>
          )}
          <button
            onClick={() => setShowJSON(v => !v)}
            style={{ fontSize:11.5, fontFamily:monoFont, color:'rgba(255,255,255,.35)', background:'none', border:'none', cursor:'pointer', transition:'color .2s', padding:0 }}
            onMouseEnter={e => (e.currentTarget.style.color='rgba(255,255,255,.65)')}
            onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,.35)')}
          >
            查看 JSON ▾
          </button>
        </div>
      </div>

      {showJSON && (
        <div style={{ marginBottom:16, borderRadius:14, border:'1px solid rgba(255,255,255,.065)', background:'#0c0c15', animation:'fade-up .2s ease both' }}>
          <pre style={{ padding:16, fontSize:12, fontFamily:monoFont, color:'rgba(255,255,255,.6)', overflowX:'auto', maxHeight:240, margin:0 }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ display:'flex', gap:3, background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.065)', borderRadius:13, padding:4, marginBottom:24 }}>
        {TABS.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              flex:1, height:34, border:'none', borderRadius:9,
              fontFamily:'var(--font-dm-sans, sans-serif)', fontSize:12.5, fontWeight: active===id ? 500 : 400,
              color: active===id ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.42)',
              background: active===id ? 'rgba(255,255,255,.07)' : 'transparent',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
              transition:'color .2s, background .2s',
            }}
          >
            <span style={{ fontSize:12, opacity:.7 }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {active === 'palette' && <BentoGrid tokens={tokens} siteUrl={siteUrl} />}
      {active === 'preview' && <ComponentPreview tokens={tokens} />}
      {active === 'compare' && (
        siteUrl
          ? <ComparisonSlider tokens={tokens} siteUrl={siteUrl} />
          : (
            <div style={{ display:'flex', height:160, alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,.065)', borderRadius:16, fontSize:13, color:'rgba(255,255,255,.35)', fontFamily:monoFont }}>
              需要提供网站 URL 才能显示对比图
            </div>
          )
      )}

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fade-up { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
}

export default ThemePreview;
