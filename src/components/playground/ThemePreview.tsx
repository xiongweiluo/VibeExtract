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

/** Returns true when the page background is perceived as dark. */
function isDarkSite(tokens: DesignTokens): boolean {
  return luminance(tokens.color.background.page) < 0.35;
}

// ─────────────────────────────────────────────────────────────────────────────
// § 3  Size helpers
// ─────────────────────────────────────────────────────────────────────────────
function parsePx(value: string): number {
  const v = value.trim();
  if (v.endsWith('rem')) return parseFloat(v) * 16;
  if (v.endsWith('em'))  return parseFloat(v) * 16;
  if (v.endsWith('px'))  return parseFloat(v);
  const n = parseFloat(v);
  return isNaN(n) ? 16 : n;
}

/** Scale a CSS size string down into a preview-appropriate px string. */
function mockSize(value: string, scale: number): string {
  return `${Math.max(Math.round(parsePx(value) * scale), 7)}px`;
}

// ─────────────────────────────────────────────────────────────────────────────
// § 4  Physical-first token resolver  ★ core upgrade
// ─────────────────────────────────────────────────────────────────────────────
type ScaleKey = keyof DesignTokens['spacing']['scale'];

/**
 * Maps semantic scale keys → possible Puppeteer-extracted role names.
 * Lets tok().fontSize() match physical measurements regardless of role naming.
 */
const ROLE_ALIASES: Record<string, string[]> = {
  '4xl': ['display', 'hero', 'h1', '4xl', 'jumbo'],
  '3xl': ['title', 'h2', 'headline', '3xl'],
  '2xl': ['subtitle', 'h3', 'subheading', '2xl'],
  'xl':  ['h4', 'xl', 'section-title'],
  'lg':  ['lead', 'lg', 'intro'],
  'base':['body', 'base', 'p', 'paragraph'],
  'sm':  ['small', 'sm', 'secondary'],
  'xs':  ['caption', 'label', 'xs', 'meta', 'overline'],
};

/**
 * tok() returns a small resolver that always prefers Puppeteer-measured
 * physical values and falls back to the AI-semantic scale when absent.
 *
 * Usage inside a layout component:
 *   const t = tok(tokens);
 *   fontSize: mockSize(t.fs('4xl'), scale)
 *   paddingTop: Math.round(t.spN('md') * gap)
 */
function tok(tokens: DesignTokens) {
  const sp = tokens.spacingSystem;
  const ts = tokens.typographyScale;

  /** Physical-first spacing → CSS px string */
  function sp_(key: ScaleKey): string {
    return sp ? sp.named[key] : tokens.spacing.scale[key];
  }

  /** Numeric px value of a spacing token (for arithmetic) */
  function spN(key: ScaleKey): number {
    return parsePx(sp_(key));
  }

  /** Physical-first font-size → CSS px string */
  function fs(key: string): string {
    if (ts) {
      const aliases = ROLE_ALIASES[key] ?? [key];
      const step = ts.steps.find(s => aliases.includes(s.role));
      if (step) return step.px;
    }
    const map: Record<string, string | undefined> = {
      xs:    tokens.typography.scale.xs.size,
      sm:    tokens.typography.scale.sm.size,
      base:  tokens.typography.scale.base.size,
      lg:    tokens.typography.scale.lg.size,
      xl:    tokens.typography.scale.xl.size,
      '2xl': tokens.typography.scale['2xl'].size,
      '3xl': tokens.typography.scale['3xl'].size,
      '4xl': tokens.typography.scale['4xl'].size,
    };
    return map[key] ?? tokens.typography.scale.base.size;
  }

  /** Physical-first line-height → unitless string */
  function lh(key: string): string {
    if (ts) {
      const aliases = ROLE_ALIASES[key] ?? [key];
      const step = ts.steps.find(s => aliases.includes(s.role));
      if (step) return step.lineHeight;
    }
    const map: Record<string, string | undefined> = {
      xs:    tokens.typography.scale.xs.lineHeight,
      sm:    tokens.typography.scale.sm.lineHeight,
      base:  tokens.typography.scale.base.lineHeight,
      lg:    tokens.typography.scale.lg.lineHeight,
      xl:    tokens.typography.scale.xl.lineHeight,
      '2xl': tokens.typography.scale['2xl'].lineHeight,
      '3xl': tokens.typography.scale['3xl'].lineHeight,
      '4xl': tokens.typography.scale['4xl'].lineHeight,
    };
    return map[key] ?? '1.5';
  }

  return { sp: sp_, spN, fs, lh };
}

/** Density → gap multiplier for the mini preview. */
const D: Record<string, number> = { compact: 0.6, comfortable: 1, spacious: 1.45 };

// ─────────────────────────────────────────────────────────────────────────────
// § 5  Export utilities  (CSS vars · Tailwind · JSON)
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
// § 6  Shared interactive primitives
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
  const c = tokens.color;
  const r = tokens.radius;
  const base: React.CSSProperties = outlined
    ? { background: 'transparent', color: c.brand.primary, border: `1.5px solid ${c.brand.primary}`, borderRadius: r.md }
    : { background: c.brand.primary, color: c.text.inverse, border: 'none', borderRadius: r.md };
  return (
    <button
      style={{
        ...base, ...style,
        boxShadow: st === 'press' ? 'none' : st === 'hover' ? tokens.shadow.md : tokens.shadow.sm,
        transform: st === 'press' ? 'translateY(0.5px) scale(0.97)' : st === 'hover' ? 'translateY(-1px)' : 'none',
        transition: 'box-shadow 0.15s ease, transform 0.12s ease, opacity 0.12s',
        opacity: st === 'press' ? 0.82 : 1, cursor: 'pointer',
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
  return (
    <div
      style={{
        ...style,
        boxShadow: hovered && !disabled ? tokens.shadow.lg : style?.boxShadow ?? tokens.shadow.sm,
        transform: hovered && !disabled ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow 0.2s ease, transform 0.18s ease',
        cursor: disabled ? 'default' : 'pointer',
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
// § 7  Layout building blocks  (NavBar · FooterBlock · NavItem · SidebarItem)
// ─────────────────────────────────────────────────────────────────────────────

function NavItem({ label, color, hoverColor, radius }: { label: string; color: string; hoverColor: string; radius: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{
        color: hovered ? hoverColor : color, fontSize: 9, fontFamily: monoFont,
        padding: '2px 5px', borderRadius: radius,
        background: hovered ? 'rgba(255,255,255,.1)' : 'transparent',
        transition: 'color 0.15s, background 0.15s', cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  );
}

function NavBar({ tokens, transparent }: { tokens: DesignTokens; transparent?: boolean }) {
  const c = tokens.color;
  const ty = tokens.typography;
  const r  = tokens.radius;
  const brand = tokens.skeleton.nav.brand || 'Brand';
  const items = tokens.skeleton.nav.items.length > 0
    ? tokens.skeleton.nav.items.slice(0, 4)
    : ['Product', 'Docs', 'Pricing'];

  // Visual-weight-aware nav background
  const dark  = isDarkSite(tokens);
  const bg    = transparent ? 'transparent' : c.brand.primary;
  const fgBrand = transparent ? c.text.primary : c.text.inverse;
  const fgItem  = transparent ? c.text.secondary : `${c.text.inverse}bb`;
  const hoverFg = transparent ? c.text.primary : c.text.inverse;

  return (
    <nav style={{
      background: bg, display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'7px 14px', flexShrink:0,
      borderBottom: transparent ? `1px solid ${c.border}` : 'none',
      boxShadow: transparent ? 'none' : tokens.shadow.sm,
    }}>
      <span style={{ fontWeight: ty.weights.bold, color: fgBrand, fontSize:11, fontFamily: ty.families.body, letterSpacing:'-0.01em' }}>
        {brand}
      </span>
      <div style={{ display:'flex', gap:10 }}>
        {items.map(l => (
          <NavItem key={l} label={l} color={fgItem} hoverColor={hoverFg} radius={r.sm} />
        ))}
      </div>
      {/* CTA pill */}
      <div style={{ padding:'3px 8px', borderRadius: r.full, background: transparent ? c.brand.primary : `${c.text.inverse}22`, fontSize:8, fontFamily: monoFont, color: transparent ? c.text.inverse : c.text.inverse, cursor:'pointer', display: dark && !transparent ? 'none' : 'block' }}>
        {tokens.skeleton.hero.ctaCount > 0 ? 'Get started' : ''}
      </div>
    </nav>
  );
}

function FooterBlock({ tokens }: { tokens: DesignTokens }) {
  if (!tokens.skeleton.footer.present) return null;
  const c  = tokens.color;
  const ty = tokens.typography;
  const cols = Math.min(Math.max(tokens.skeleton.footer.columns, 1), 4);
  const colLabels = ['Product', 'Company', 'Resources', 'Legal'];

  return (
    <div style={{ background: c.background.surface, borderTop: `1px solid ${c.border}`, padding: '6px 14px 8px', flexShrink: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
        {Array.from({ length: cols }, (_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 8, fontWeight: ty.weights.bold, color: c.text.primary, fontFamily: ty.families.body }}>
              {colLabels[i] ?? 'Links'}
            </span>
            {['Overview','About','Blog','Terms'].slice(0, 3).map(link => (
              <span key={link} style={{ fontSize: 7, color: c.text.secondary, fontFamily: ty.families.body }}>— {link}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 8  VisualAccent — adapts to visualWeight.dominant  ★ new
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The decorative visual panel shown alongside hero text.
 * Shape and content driven by siteArchitecture.visualWeight.dominant.
 */
function VisualAccent({ tokens, width, height }: { tokens: DesignTokens; width: number | string; height: number | string }) {
  const c   = tokens.color;
  const r   = tokens.radius;
  const dom = tokens.siteArchitecture.visualWeight.dominant;
  const exp = tokens.siteArchitecture.visualWeight.hierarchy === 'expressive';

  if (dom === 'imagery') {
    return (
      <div style={{ width, height, borderRadius: r.lg, overflow:'hidden', border:`1px solid ${c.border}`, position:'relative', flexShrink:0 }}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg, ${c.brand.primary}30, ${c.brand.secondary}18, ${c.brand.accent}22)` }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', gap:4, padding:6 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex:1, borderRadius: r.sm, background:`${c.brand.primary}${i * 8 + 10}` }} />
          ))}
        </div>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:c.brand.primary, opacity:0.35 }}>▣</div>
      </div>
    );
  }

  if (dom === 'color') {
    const bg = exp
      ? `linear-gradient(140deg, ${c.brand.primary}, ${c.brand.accent})`
      : c.brand.primary;
    return (
      <div style={{ width, height, borderRadius: r.xl, background: bg, flexShrink:0, boxShadow: tokens.shadow.lg, display:'flex', alignItems:'center', justifyContent:'center' }}>
        {exp && <span style={{ fontSize:20, color:`${c.text.inverse}55` }}>◈</span>}
      </div>
    );
  }

  if (dom === 'data') {
    const bars = [40,65,45,80,55,90,70,48];
    return (
      <div style={{ width, height, borderRadius: r.md, background: c.background.surface, border:`1px solid ${c.border}`, padding:'6px 8px', display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:2, flexShrink:0, boxShadow: tokens.shadow.sm }}>
        <span style={{ fontSize:7, fontFamily:monoFont, color:c.text.secondary, marginBottom:2 }}>Activity</span>
        <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:2 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:'2px 2px 0 0', background:c.brand.primary, opacity: 0.25 + (h/100)*0.65 }} />
          ))}
        </div>
      </div>
    );
  }

  // typography-dominant: typographic specimen block
  return (
    <div style={{ width, height, borderRadius: r.xl, background:`${c.brand.primary}08`, border:`1px solid ${c.border}`, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', padding:'10px 12px', flexShrink:0, gap:4 }}>
      <span style={{ fontSize:18, fontWeight:700, fontFamily: tokens.typography.families.heading, color:c.brand.primary, lineHeight:1.1, opacity:0.7 }}>Aa</span>
      <div style={{ display:'flex', flexDirection:'column', gap:2, width:'100%' }}>
        {[1,0.7,0.5].map((op,i) => (
          <div key={i} style={{ height:3, borderRadius:2, background:c.text.primary, opacity:op * 0.25, width:`${[90,70,55][i]}%` }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 9  HeroSection — 4 skeleton layout variants × visual weight  ★ upgraded
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection({ tokens, scale, gap }: { tokens: DesignTokens; scale: number; gap: number }) {
  const c   = tokens.color;
  const ty  = tokens.typography;
  const r   = tokens.radius;
  const sk  = tokens.skeleton.hero;
  const t   = tok(tokens);
  const exp = tokens.siteArchitecture.visualWeight.hierarchy === 'expressive';
  const dom = tokens.siteArchitecture.visualWeight.dominant;

  const headline  = sk.headline || 'Welcome';
  const ctaCount  = Math.max(sk.ctaCount, 1);
  const layout    = sk.layout;

  const headlineFontSize = mockSize(t.fs('4xl'), scale);
  const bodyFontSize     = mockSize(t.fs('sm'), scale * 0.88);
  const ctaFontSize      = mockSize(t.fs('xs'), scale);
  const gapPx            = Math.round(7 * gap);
  const padV             = Math.round(8 * gap);
  const padH             = 14;

  const ctas = (
    <div style={{ display:'flex', gap: Math.round(5 * gap), flexWrap:'wrap' }}>
      <HoverBtn tokens={tokens} style={{ padding:`${Math.round(5*gap)}px ${Math.round(10*gap)}px`, fontFamily: ty.families.body, fontWeight: ty.weights.bold, fontSize: ctaFontSize, borderRadius: r.md }}>
        {ctaCount >= 1 ? (tokens.skeleton.nav.items[0] ? 'Get started' : 'Get started') : ''}
      </HoverBtn>
      {ctaCount >= 2 && (
        <HoverBtn tokens={tokens} outlined style={{ padding:`${Math.round(5*gap)}px ${Math.round(10*gap)}px`, fontFamily: ty.families.body, fontWeight: ty.weights.medium, fontSize: ctaFontSize, borderRadius: r.md }}>
          Learn more
        </HoverBtn>
      )}
    </div>
  );

  // ── full-bleed ────────────────────────────────────────────────────────────
  if (layout === 'full-bleed') {
    const heroBg = exp
      ? `linear-gradient(135deg, ${c.brand.primary}, ${c.brand.secondary})`
      : c.brand.primary;
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background: heroBg, padding:`${padV}px ${padH}px`, textAlign:'center', gap:`${gapPx}px` }}>
        {dom === 'typography' && <span style={{ fontSize:7, fontFamily:monoFont, color:`${c.text.inverse}80`, letterSpacing:'0.15em', textTransform:'uppercase' }}>— NEW —</span>}
        <h1 style={{ margin:0, fontFamily: ty.families.heading, fontWeight: ty.weights.bold, fontSize: headlineFontSize, lineHeight: t.lh('4xl'), color: c.text.inverse }}>{headline}</h1>
        <p style={{ margin:0, fontSize: bodyFontSize, color:`${c.text.inverse}aa`, maxWidth:220 }}>Extracted straight from the source.</p>
        {ctas}
      </div>
    );
  }

  // ── centered ──────────────────────────────────────────────────────────────
  if (layout === 'centered') {
    const pageBg = dom === 'color'
      ? `linear-gradient(180deg, ${c.brand.primary}14, ${c.background.page})`
      : c.background.page;
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', background: pageBg, padding:`${padV}px 20px`, gap:`${gapPx}px` }}>
        {dom === 'imagery' && (
          <div style={{ width:60, height:36, borderRadius: r.lg, background:`linear-gradient(135deg, ${c.brand.primary}22, ${c.brand.accent}16)`, border:`1px solid ${c.border}`, marginBottom:2 }} />
        )}
        <h1 style={{ margin:0, fontFamily: ty.families.heading, fontWeight: ty.weights.bold, fontSize: headlineFontSize, lineHeight: t.lh('4xl'), color: c.text.primary }}>{headline}</h1>
        <p style={{ margin:0, fontSize: bodyFontSize, color: c.text.secondary, maxWidth:240 }}>Zero guesswork. Extracted design DNA.</p>
        {ctas}
      </div>
    );
  }

  // ── asymmetric (2/3 text + 1/3 accent) ───────────────────────────────────
  if (layout === 'asymmetric') {
    return (
      <div style={{ flex:1, display:'flex', overflow:'hidden', background: c.background.page }}>
        <div style={{ flex:2, display:'flex', flexDirection:'column', justifyContent:'center', padding:`${padV}px ${padH}px`, gap:`${Math.round(6*gap)}px` }}>
          <h1 style={{ margin:0, fontFamily: ty.families.heading, fontWeight: ty.weights.bold, fontSize: headlineFontSize, lineHeight: t.lh('4xl'), color: c.text.primary }}>{headline}</h1>
          <p style={{ margin:0, fontSize: bodyFontSize, color: c.text.secondary }}>Design token extraction, precision-first.</p>
          {ctas}
        </div>
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'8px 10px 8px 0' }}>
          <VisualAccent tokens={tokens} width="100%" height={80} />
        </div>
      </div>
    );
  }

  // ── split — equal halves (default) ───────────────────────────────────────
  return (
    <div style={{ flex:1, display:'flex', overflow:'hidden', background: c.background.page }}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:`${padV}px ${padH}px`, gap:`${Math.round(5*gap)}px` }}>
        <h1 style={{ margin:0, fontFamily: ty.families.heading, fontWeight: ty.weights.bold, fontSize: headlineFontSize, lineHeight: t.lh('4xl'), color: c.text.primary }}>{headline}</h1>
        <p style={{ margin:0, fontSize: bodyFontSize, color: c.text.secondary, lineHeight: t.lh('sm') }}>AI-extracted design tokens, ready for production.</p>
        {ctas}
      </div>
      <div style={{ width:82, margin:'8px 8px 8px 0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <VisualAccent tokens={tokens} width="100%" height="100%" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 10  FeatureGrid — adapts to visualWeight and layout.type  ★ new
// ─────────────────────────────────────────────────────────────────────────────

function FeatureGrid({ tokens, scale, gap }: { tokens: DesignTokens; scale: number; gap: number }) {
  const c   = tokens.color;
  const ty  = tokens.typography;
  const r   = tokens.radius;
  const t   = tok(tokens);
  const dom = tokens.siteArchitecture.visualWeight.dominant;
  const hier = tokens.siteArchitecture.visualWeight.hierarchy;
  const isMulti = tokens.siteArchitecture.layout.type === 'multi-column';
  const cols = isMulti ? 4 : 3;

  const gapPx = Math.round(5 * gap);
  const padH  = Math.round(8 * gap);
  const padB  = Math.round(6 * gap);

  // Data-dominant: show metric cards instead of feature cards
  if (dom === 'data') {
    const metrics = [['2.4k','Users'], ['98%','Uptime'], ['14ms','Latency']].slice(0, cols === 4 ? 4 : 3);
    return (
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap: gapPx, padding:`0 ${padH}px ${padB}px`, flexShrink:0 }}>
        {metrics.map(([val, label]) => (
          <HoverCard key={label} tokens={tokens} style={{ background: c.background.surface, border:`1px solid ${c.border}`, borderRadius: r.md, padding:`${gapPx}px`, boxShadow: tokens.shadow.sm }}>
            <p style={{ margin:0, fontWeight: ty.weights.bold, fontSize: mockSize(t.fs('xl'), scale * 0.7), color: c.brand.primary, fontFamily: ty.families.body }}>{val}</p>
            <p style={{ margin:'2px 0 0', fontSize: mockSize(t.fs('xs'), scale * 0.88), color: c.text.secondary, fontFamily: ty.families.body }}>{label}</p>
          </HoverCard>
        ))}
      </div>
    );
  }

  const features = [
    { icon:'◈', label:'Tokens',  desc:'Extracted from source' },
    { icon:'⊡', label:'Preview', desc:'Instant visual feedback' },
    { icon:'⇿', label:'Compare', desc:'Side-by-side accuracy' },
    { icon:'✦', label:'Export',  desc:'CSS · Tailwind · JSON' },
  ].slice(0, cols);

  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap: gapPx, padding:`0 ${padH}px ${padB}px`, flexShrink:0 }}>
      {features.map(({ icon, label, desc }) => (
        <HoverCard key={label} tokens={tokens} style={{ background: c.background.surface, border:`1px solid ${c.border}`, borderRadius: r.md, padding:`${gapPx}px`, display:'flex', flexDirection: hier === 'expressive' ? 'column' : 'row', alignItems: hier !== 'expressive' ? 'center' : 'flex-start', gap:5, boxShadow: tokens.shadow.sm }}>
          {hier === 'expressive' ? (
            <div style={{ width:22, height:22, borderRadius: r.sm, background:`${c.brand.primary}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:2, flexShrink:0 }}>
              <span style={{ fontSize:10, color: c.brand.primary }}>{icon}</span>
            </div>
          ) : (
            <span style={{ fontSize:10, color: c.brand.primary, flexShrink:0 }}>{icon}</span>
          )}
          <div>
            <span style={{ display:'block', fontSize: mockSize(t.fs('xs'), scale * 0.88), fontWeight: ty.weights.semibold, color: c.text.primary, fontFamily: ty.families.body }}>{label}</span>
            {hier !== 'functional' && (
              <span style={{ display:'block', fontSize: mockSize(t.fs('xs'), scale * 0.75), color: c.text.secondary, fontFamily: ty.families.body, marginTop:1 }}>{desc}</span>
            )}
          </div>
        </HoverCard>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 11  SidebarItem (shared by DashboardLayout)
// ─────────────────────────────────────────────────────────────────────────────

function SidebarItem({ label, active, tokens }: { label: string; active: boolean; tokens: DesignTokens }) {
  const [hovered, setHovered] = useState(false);
  const c = tokens.color;
  const r = tokens.radius;
  const isOn = active || hovered;
  return (
    <div
      title={label}
      style={{
        width:36, height:28, borderRadius: r.sm,
        display:'flex', alignItems:'center', justifyContent:'center',
        background: isOn ? `${c.brand.primary}1a` : 'transparent',
        color: isOn ? c.brand.primary : c.text.secondary,
        fontSize:9, cursor:'pointer',
        transition:'background 0.15s, color 0.15s',
        boxShadow: active ? tokens.shadow.sm : 'none',
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      {label[0]}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 12  Layout engines
// ─────────────────────────────────────────────────────────────────────────────

// ── 12a  LandingLayout  (paradigm: landing | portfolio) ───────────────────

function LandingLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const c   = tokens.color;
  const ty  = tokens.typography;
  const sa  = tokens.siteArchitecture;
  const gap = D[sa.density] ?? 1;
  const navTransparent = sa.layout.navPosition === 'floating'
    || tokens.skeleton.hero.layout === 'full-bleed';

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.page, fontFamily: ty.families.body, color: c.text.primary }}>
      <NavBar tokens={tokens} transparent={navTransparent} />
      <HeroSection tokens={tokens} scale={scale} gap={gap} />
      <FeatureGrid tokens={tokens} scale={scale} gap={gap} />
      <FooterBlock tokens={tokens} />
    </div>
  );
}

// ── 12b  GridLayout  (paradigm: e-commerce | social-feed; or layout.type: grid | masonry) ★ upgraded

function GridLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const c   = tokens.color;
  const ty  = tokens.typography;
  const r   = tokens.radius;
  const sa  = tokens.siteArchitecture;
  const sk  = tokens.skeleton;
  const t   = tok(tokens);
  const gap = D[sa.density] ?? 1;
  const gapPx = Math.round(5 * gap);

  const isMasonry = sa.layout.type === 'masonry';
  const isEcom    = sa.paradigm === 'e-commerce';
  const cols = sk.cards.gridColumns > 0
    ? Math.min(sk.cards.gridColumns, 5)
    : sa.density === 'compact' ? 4 : isMasonry ? 3 : 3;

  // Masonry: each column is an independent flow with staggered heights
  const masonryHeights = [
    [60, 38, 54, 42],
    [44, 68, 36, 58],
    [52, 40, 70, 44],
    [36, 56, 48, 66],
    [62, 34, 52, 40],
  ];

  const cardNames = isEcom
    ? ['Minimal Tee','Classic Mug','Poster Set','Canvas Bag','Linen Shirt','Craft Mug']
    : ['Just posted','Trending now','For you','Popular','Following','Suggested'];
  const cardSubs = isEcom
    ? ['$29','$18','$42','$12','$38','$22']
    : ['♥ 142','↺ 38','● 4.8','★ top','● new','↺ 12'];

  const accentColors = [c.brand.primary, c.brand.secondary, c.brand.accent];

  if (isMasonry) {
    return (
      <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.page, fontFamily: ty.families.body }}>
        <NavBar tokens={tokens} transparent />
        <div style={{ flex:1, overflow:'hidden', padding: gapPx, display:'flex', gap: gapPx }}>
          {Array.from({ length: Math.min(cols, 5) }, (_, col) => (
            <div key={col} style={{ flex:1, display:'flex', flexDirection:'column', gap: gapPx }}>
              {(masonryHeights[col] ?? masonryHeights[0]).map((h, row) => {
                const idx = col * 4 + row;
                const bg  = accentColors[idx % 3];
                return (
                  <HoverCard key={row} tokens={tokens} disabled={!sk.cards.hasShadow}
                    style={{ background: c.background.surface, borderRadius: r.md, overflow:'hidden', boxShadow: sk.cards.hasShadow ? tokens.shadow.md : 'none', border: sk.cards.hasShadow ? 'none' : `1px solid ${c.border}` }}>
                    <div style={{ height: h, background: bg, opacity: 0.22 + (row % 3) * 0.1 }} />
                    <div style={{ padding:'4px 6px' }}>
                      <p style={{ margin:0, fontSize: mockSize(t.fs('xs'), scale), fontWeight: ty.weights.semibold, color: c.text.primary, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
                        {cardNames[idx % cardNames.length]}
                      </p>
                      <p style={{ margin:'1px 0 0', fontSize: mockSize(t.fs('xs'), scale * 0.8), color: c.text.secondary }}>
                        {cardSubs[idx % cardSubs.length]}
                      </p>
                    </div>
                  </HoverCard>
                );
              })}
            </div>
          ))}
        </div>
        <FooterBlock tokens={tokens} />
      </div>
    );
  }

  // Uniform grid
  const cardCount = cols * 2;
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.page, fontFamily: ty.families.body }}>
      <NavBar tokens={tokens} transparent />
      <div style={{ flex:1, overflow:'hidden', padding: gapPx, display:'grid', gridTemplateColumns:`repeat(${cols},1fr)`, gap: gapPx, alignContent:'start' }}>
        {Array.from({ length: cardCount }, (_, i) => {
          const heights = [38, 28, 44, 32, 50, 24];
          const h = heights[i % heights.length];
          const bg = accentColors[i % 3];
          return (
            <HoverCard key={i} tokens={tokens} disabled={!sk.cards.hasShadow}
              style={{ background: c.background.surface, borderRadius: r.md, overflow:'hidden', boxShadow: sk.cards.hasShadow ? tokens.shadow.md : 'none', border: sk.cards.hasShadow ? 'none' : `1px solid ${c.border}` }}>
              <div style={{ height: h, background: bg, opacity: 0.28 + (i % 3) * 0.12 }} />
              <div style={{ padding:'4px 6px' }}>
                <p style={{ margin:0, fontSize: mockSize(t.fs('xs'), scale), fontWeight: ty.weights.semibold, color: c.text.primary, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
                  {cardNames[i % cardNames.length]}
                </p>
                <p style={{ margin:'1px 0 0', fontSize: mockSize(t.fs('xs'), scale * 0.8), color: c.text.secondary }}>
                  {cardSubs[i % cardSubs.length]}
                </p>
              </div>
            </HoverCard>
          );
        })}
      </div>
      <FooterBlock tokens={tokens} />
    </div>
  );
}

// ── 12c  EditorialLayout  (paradigm: content-site | docs) ★ upgraded ─────

function EditorialLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const c   = tokens.color;
  const ty  = tokens.typography;
  const r   = tokens.radius;
  const sa  = tokens.siteArchitecture;
  const t   = tok(tokens);
  const gap = D[sa.density] ?? 1;
  const isDocs    = sa.paradigm === 'docs';
  const hasSidebar = isDocs || sa.layout.type === 'sidebar';
  const headline  = tokens.skeleton.hero.headline || 'The new standard';

  const article = (
    <div style={{ display:'flex', flexDirection:'column', gap: Math.round(6 * gap) }}>
      {/* Byline */}
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        <div style={{ width:14, height:14, borderRadius:'50%', background: c.brand.primary, opacity:0.55, flexShrink:0 }} />
        <span style={{ fontSize: mockSize(t.fs('xs'), scale * 0.88), color: c.text.secondary, fontFamily: ty.families.body }}>Author · 5 min read</span>
      </div>
      {/* Headline */}
      <h1 style={{ margin:0, fontWeight: ty.weights.bold, fontFamily: ty.families.heading, fontSize: mockSize(t.fs('3xl'), scale), lineHeight: t.lh('3xl'), color: c.text.primary }}>
        {headline}
      </h1>
      {/* Lead paragraph */}
      <p style={{ margin:0, fontSize: mockSize(t.fs('base'), scale * 0.85), lineHeight: t.lh('base'), color: c.text.secondary, fontFamily: ty.families.body }}>
        Consistent spacing, intentional colour, and typographic hierarchy form the bedrock of every memorable interface.
      </p>
      {/* Pull quote / image strip */}
      <div style={{ width:'100%', height: Math.round(32 * gap), borderRadius: r.md, background:`linear-gradient(90deg, ${c.brand.primary}22, ${c.brand.secondary}14)`, border:`1px solid ${c.border}` }} />
      {/* Tag row */}
      <div style={{ display:'flex', gap:5 }}>
        {['Design', 'Systems', 'Tokens'].map(tag => (
          <span key={tag} style={{ padding:'2px 7px', borderRadius: r.sm, border:`1px solid ${c.border}`, fontSize: mockSize(t.fs('xs'), scale * 0.85), color: c.text.secondary, fontFamily: ty.families.body }}>{tag}</span>
        ))}
      </div>
      {/* Secondary paragraph blocks */}
      {[1, 2].map(i => (
        <div key={i} style={{ display:'flex', flexDirection:'column', gap:3 }}>
          <div style={{ height:3, borderRadius:2, background: c.text.primary, opacity:0.1, width:'100%' }} />
          <div style={{ height:3, borderRadius:2, background: c.text.primary, opacity:0.08, width:'85%' }} />
          <div style={{ height:3, borderRadius:2, background: c.text.primary, opacity:0.06, width:'92%' }} />
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.page, fontFamily: ty.families.body, color: c.text.primary }}>
      <NavBar tokens={tokens} transparent />
      <div style={{ flex:1, overflow:'hidden', display:'flex', gap:0 }}>
        {hasSidebar && (
          <div style={{ width:56, background: c.background.surface, borderRight:`1px solid ${c.border}`, padding:'8px 6px', flexShrink:0 }}>
            <p style={{ margin:'0 0 6px', fontSize:8, fontWeight: ty.weights.bold, color: c.text.secondary, fontFamily:monoFont, letterSpacing:'0.08em', textTransform:'uppercase' }}>Contents</p>
            {['Introduction','Installation','Usage','API Reference','Examples'].map((item, i) => (
              <div key={item} style={{ padding:'3px 5px', marginBottom:1, borderRadius: r.sm, fontSize:7.5, color: i === 0 ? c.brand.primary : c.text.secondary, background: i === 0 ? `${c.brand.primary}14` : 'transparent', cursor:'pointer' }}>
                {item}
              </div>
            ))}
          </div>
        )}
        <div style={{ flex:1, padding:`${Math.round(10*gap)}px ${Math.round(12*gap)}px`, overflow:'hidden' }}>
          {article}
        </div>
      </div>
      <FooterBlock tokens={tokens} />
    </div>
  );
}

// ── 12d  DashboardLayout  (paradigm: dashboard | saas-app; or layout.type: sidebar) ★ upgraded

function DashboardLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const c   = tokens.color;
  const ty  = tokens.typography;
  const r   = tokens.radius;
  const t   = tok(tokens);
  const dom = tokens.siteArchitecture.visualWeight.dominant;

  const navItems = tokens.skeleton.nav.items.length > 0
    ? tokens.skeleton.nav.items.slice(0, 5)
    : ['Dashboard', 'Analytics', 'Users', 'Settings'];

  const metrics: [string, string, string][] = dom === 'data'
    ? [['2.4k','Users','↑12%'], ['98%','Uptime','→'], ['14ms','Latency','↓5%'], ['$4.2k','Revenue','↑8%']]
    : [['2.4k','Users','↑12%'], ['98%','Uptime','→'], ['14ms','Latency','↓5%'], ['$4.2k','Revenue','↑8%']];

  return (
    <div style={{ display:'flex', height:'100%', background: c.background.page, fontFamily: ty.families.body, color: c.text.primary }}>
      {/* Sidebar */}
      <div style={{ width:54, background: c.background.surface, borderRight:`1px solid ${c.border}`, display:'flex', flexDirection:'column', alignItems:'center', paddingTop:8, gap:4, flexShrink:0, boxShadow: tokens.shadow.sm }}>
        <div style={{ width:22, height:22, borderRadius: r.sm, background: c.brand.primary, marginBottom:6, boxShadow: tokens.shadow.md }} />
        {navItems.map((item, i) => (
          <SidebarItem key={item} label={item} active={i === 0} tokens={tokens} />
        ))}
      </div>
      {/* Main */}
      <div style={{ flex:1, overflow:'hidden', padding:'8px 10px', display:'flex', flexDirection:'column', gap:6 }}>
        <h2 style={{ margin:0, fontWeight: ty.weights.bold, fontSize: mockSize(t.fs('2xl'), scale * 0.75), color: c.text.primary, fontFamily: ty.families.heading }}>
          {tokens.skeleton.hero.headline || 'Overview'}
        </h2>
        {/* Metric grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
          {metrics.map(([val, label, delta]) => (
            <HoverCard key={label} tokens={tokens} style={{ background: c.background.surface, border:`1px solid ${c.border}`, borderRadius: r.md, padding:'7px 9px', boxShadow: tokens.shadow.sm }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <p style={{ margin:0, fontWeight: ty.weights.bold, fontSize: mockSize(t.fs('2xl'), scale * 0.7), color: c.brand.primary, fontFamily: ty.families.heading }}>{val}</p>
                <span style={{ fontSize:7, color: delta.startsWith('↑') ? c.status.success : c.text.secondary, fontFamily:monoFont }}>{delta}</span>
              </div>
              <p style={{ margin:'1px 0 0', fontSize: mockSize(t.fs('xs'), scale * 0.88), color: c.text.secondary, fontFamily: ty.families.body }}>{label}</p>
            </HoverCard>
          ))}
        </div>
        {/* Sparkline */}
        <div style={{ flex:1, background: c.background.surface, border:`1px solid ${c.border}`, borderRadius: r.md, padding:'6px 8px', minHeight:0 }}>
          <p style={{ margin:'0 0 4px', fontSize: mockSize(t.fs('xs'), scale * 0.9), color: c.text.secondary, fontWeight: ty.weights.semibold, fontFamily: ty.families.body }}>Activity</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:32 }}>
            {[40,65,45,80,60,90,55,70,85,50,75,95,60,72].map((h, i) => (
              <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:'2px 2px 0 0', background: c.brand.primary, opacity: 0.25 + (h/100) * 0.65 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// § 13  MockPage — dispatch engine  ★ upgraded with paradigm × layout.type matrix
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Dispatch matrix:
 *
 *  paradigm         | layout.type      → Layout
 *  ─────────────────┼──────────────────────────
 *  dashboard        | any              → DashboardLayout
 *  saas-app         | any              → DashboardLayout
 *  any              | sidebar          → DashboardLayout
 *  e-commerce       | any              → GridLayout
 *  social-feed      | any              → GridLayout
 *  any              | grid | masonry   → GridLayout
 *  content-site     | any              → EditorialLayout
 *  docs             | any              → EditorialLayout
 *  landing/portfolio| any              → LandingLayout  (default)
 */
function MockPage({ tokens }: { tokens: DesignTokens }) {
  const t = tok(tokens);
  const heroPx = parsePx(t.fs('4xl'));
  const scale  = Math.min(50 / Math.max(heroPx, 32), 0.55);

  const { paradigm, layout } = tokens.siteArchitecture;

  if (paradigm === 'dashboard' || paradigm === 'saas-app' || layout.type === 'sidebar') {
    return <DashboardLayout tokens={tokens} scale={scale} />;
  }
  if (paradigm === 'e-commerce' || paradigm === 'social-feed' || layout.type === 'grid' || layout.type === 'masonry') {
    return <GridLayout tokens={tokens} scale={scale} />;
  }
  if (paradigm === 'content-site' || paradigm === 'docs') {
    return <EditorialLayout tokens={tokens} scale={scale} />;
  }
  return <LandingLayout tokens={tokens} scale={scale} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// § 14  BentoGrid (palette tab)
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
            ] as [string, string][]).map(([key, val]) => (
              <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,.055)' }}>
                <span style={{ fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.3)' }}>{key}</span>
                <span style={{ fontSize:10, fontFamily:monoFont, color:'#a78bfa', maxWidth:120, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cell 6: Mock Page Preview ── */}
      <div className="vi-cell-mock vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'22px 26px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <p style={{ ...cellLabelStyle, marginBottom:0 }}>Component Preview</p>
            <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:100, background: tokens.spacingSystem ? 'rgba(52,211,153,.08)' : 'rgba(56,189,248,.1)', border:`1px solid ${tokens.spacingSystem ? 'rgba(52,211,153,.25)' : 'rgba(56,189,248,.2)'}`, fontSize:10, fontFamily:monoFont, color: tokens.spacingSystem ? '#34d399' : '#7dd3fc' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background: tokens.spacingSystem ? '#34d399' : '#38bdf8', animation:'pulse-dot 2s infinite' }} />
              {tokens.spacingSystem ? 'AI + Physical' : 'AI Extracted'}
            </div>
          </div>

          <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,.065)', height:260 }}>
            <MockPage tokens={tokens} />
          </div>

          <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
            {[
              { key:'css',  label:'Copy CSS Vars',  doneLabel:'✓ 已复制', color:'rgba(99,91,255,.1)',    border:'rgba(99,91,255,.25)',  text:'#a5a0ff', fn: () => void navigator.clipboard.writeText(buildCSSVars(tokens)) },
              { key:'tw',   label:'Tailwind Config', doneLabel:'✓ 已复制', color:'rgba(56,189,248,.08)', border:'rgba(56,189,248,.2)',  text:'#7dd3fc', fn: () => void navigator.clipboard.writeText(buildTailwind(tokens)) },
              { key:'json', label:'Export JSON',      doneLabel:'✓ 已下载', color:'rgba(167,139,250,.08)',border:'rgba(167,139,250,.2)', text:'#c4b5fd', fn: () => downloadJSON(tokens, siteUrl ?? '') },
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
// § 15  ComponentPreview tab
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
// § 16  ComparisonSlider tab
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
            <MockPage tokens={tokens} />
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
// § 17  ThemePreview — top-level export
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
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default ThemePreview;
