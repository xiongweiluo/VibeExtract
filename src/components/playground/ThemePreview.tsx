'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { Check, Copy, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DesignTokens } from '@/types';

// ── Font refs ──────────────────────────────────────────────────────────────
const monoFont = 'var(--font-dm-mono, "DM Mono", monospace)';
const syneFont = 'var(--font-syne, "Syne", sans-serif)';

// ── Colour utility ────────────────────────────────────────────────────────
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
          <div className="group-hover:opacity-100" style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'opacity .15s' }}
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

// ── Export utilities ──────────────────────────────────────────────────────
function buildCSSVars(t: DesignTokens): string {
  const lines = [
    ':root {',
    `  --color-primary:   ${t.colors.brand.primary};`,
    `  --color-secondary: ${t.colors.brand.secondary};`,
    `  --color-bg:        ${t.colors.background.main};`,
    `  --color-card:      ${t.colors.background.card};`,
    `  --color-text:      ${t.colors.text.base};`,
    `  --color-muted:     ${t.colors.text.muted};`,
    `  --color-border:    ${t.colors.border};`,
    `  --radius-sm:       ${t.borderRadius.small};`,
    `  --radius-md:       ${t.borderRadius.medium};`,
    `  --radius-lg:       ${t.borderRadius.large};`,
    `  --font-sans:       ${t.typography.sans};`,
    `  --heading-weight:  ${t.typography.headingWeight};`,
  ];

  // Physical spacing — precise named tokens
  if (t.spacingSystem) {
    lines.push('');
    lines.push('  /* ── Spacing (physical) ─── */');
    for (const [name, val] of Object.entries(t.spacingSystem.named)) {
      lines.push(`  --space-${name}: ${val};`);
    }
  } else {
    lines.push(`  --spacing-base: ${t.spacing.base}${t.spacing.scale};`);
  }

  // Physical typography — named font-size tokens
  if (t.typographyScale) {
    lines.push('');
    lines.push('  /* ── Typography (physical) ─── */');
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
      primary: t.colors.brand.primary, secondary: t.colors.brand.secondary,
      background: t.colors.background.main, card: t.colors.background.card,
      muted: t.colors.text.muted, border: t.colors.border,
    },
    borderRadius: { sm: t.borderRadius.small, md: t.borderRadius.medium, lg: t.borderRadius.large },
    fontFamily: { sans: [t.typography.sans] },
  };

  if (t.spacingSystem) {
    ext.spacing = Object.fromEntries(
      Object.entries(t.spacingSystem.named).map(([k, v]) => [k, v])
    );
  }

  if (t.typographyScale) {
    ext.fontSize = Object.fromEntries(
      t.typographyScale.steps.map(s => [s.role, [s.px, { lineHeight: s.lineHeight }]])
    );
  }

  return JSON.stringify({ theme: { extend: ext } }, null, 2);
}

function downloadJSON(t: DesignTokens, siteUrl: string): void {
  const blob = new Blob([JSON.stringify(t, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  let host = 'tokens';
  try { host = new URL(siteUrl).hostname.replace(/\W+/g, '-'); } catch {}
  a.href = url; a.download = `${host}-design-tokens.json`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

// ── MockPage helpers ───────────────────────────────────────────────────────

/** Parse "72px" / "4.5rem" / "1.2" → numeric px equivalent (rem assumed 16px base) */
function parsePx(value: string): number {
  const v = value.trim();
  if (v.endsWith('rem')) return parseFloat(v) * 16;
  if (v.endsWith('em'))  return parseFloat(v) * 16;
  if (v.endsWith('px'))  return parseFloat(v);
  const n = parseFloat(v);
  return isNaN(n) ? 16 : n;
}

/** Scale a raw extracted px value to fit inside the ~260 px tall mock viewport */
function mockSize(value: string, scale: number): string {
  return `${Math.round(parsePx(value) * scale)}px`;
}

// density → base gap multiplier
const DENSITY_GAP: Record<string, number> = { compact: 0.6, comfortable: 1, spacious: 1.5 };

// ── Layout renderers ───────────────────────────────────────────────────────

function NavBar({ tokens, transparent }: { tokens: DesignTokens; transparent?: boolean }) {
  const { colors: c, typography: t } = tokens;
  const bg = transparent ? 'transparent' : c.brand.primary;
  const fg = transparent ? c.text.base : '#fff';
  return (
    <nav style={{ background: bg, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 16px', borderBottom: transparent ? `1px solid ${c.border}` : 'none', flexShrink:0 }}>
      <span style={{ fontWeight: t.headingWeight, color: fg, fontSize:13, fontFamily: t.sans }}>Brand</span>
      <div style={{ display:'flex', gap:12 }}>
        {['Product','Docs','Pricing'].map(l => (
          <span key={l} style={{ color: transparent ? c.text.muted : 'rgba(255,255,255,.8)', fontSize:10, fontFamily: t.sans }}>{l}</span>
        ))}
      </div>
    </nav>
  );
}

/** hero-centric — oversized centered headline, prominent CTA */
function HeroCentricLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const { colors: c, borderRadius: r, typography: t, components, layoutStructure } = tokens;
  const gap = DENSITY_GAP[layoutStructure.density] ?? 1;
  const btnStyle: React.CSSProperties = {
    background: c.brand.primary, color: '#fff', border: 'none',
    borderRadius: r.small, cursor: 'default', fontFamily: t.sans,
    fontWeight: t.headingWeight,
    padding: `${components.button.paddingY} ${components.button.paddingX}`,
    letterSpacing: components.button.letterSpacing,
    fontSize: mockSize(tokens.typeScale.label, scale),
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.main, fontFamily: t.sans, color: c.text.base }}>
      <NavBar tokens={tokens} transparent={layoutStructure.navStyle === 'transparent'} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:`${8 * gap}px 20px`, textAlign:'center', gap: `${10 * gap}px` }}>
        <h1 style={{ fontWeight: t.headingWeight, fontSize: mockSize(tokens.typeScale.hero, scale), lineHeight: tokens.typeScale.lineHeight, color: c.text.base, margin:0 }}>
          Beautiful<br/>by Default
        </h1>
        <p style={{ color: c.text.muted, fontSize: mockSize(tokens.typeScale.body, scale * 0.9), margin:0, maxWidth:220 }}>
          Extracted straight from the source. Zero guesswork.
        </p>
        <div style={{ display:'flex', gap:8 }}>
          <button style={btnStyle}>Get started</button>
          <button style={{ ...btnStyle, background:'transparent', color: c.brand.primary, border:`1.5px solid ${c.brand.primary}` }}>Learn more</button>
        </div>
      </div>
    </div>
  );
}

/** card-grid — dense card feed, minimal nav (Pinterest / Airbnb feel) */
function CardGridLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const { colors: c, borderRadius: r, typography: t, components, layoutStructure } = tokens;
  const gap = DENSITY_GAP[layoutStructure.density] ?? 1;
  const gapPx = `${Math.round(6 * gap)}px`;
  const cols = layoutStructure.density === 'compact' ? 4 : 3;
  const cards = Array.from({ length: cols * 2 }, (_, i) => i);
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.main, fontFamily: t.sans }}>
      <NavBar tokens={tokens} transparent />
      <div style={{ flex:1, overflow:'hidden', padding:`${gapPx}`, display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap: gapPx, alignContent:'start' }}>
        {cards.map(i => (
          <div key={i} style={{ background: c.background.card, borderRadius: r.medium, boxShadow: components.card.shadow, overflow:'hidden' }}>
            <div style={{ height: i % 3 === 0 ? 42 : 30, background: i % 2 === 0 ? c.brand.primary : c.brand.secondary, opacity: 0.35 + (i % 3) * 0.15 }} />
            <div style={{ padding:'5px 6px' }}>
              <p style={{ margin:0, fontSize: mockSize(tokens.typeScale.label, scale), fontWeight: t.headingWeight, color: c.text.base, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
                {['Card title','Feature','Item name','Product'][i % 4]}
              </p>
              <p style={{ margin:'2px 0 0', fontSize: mockSize(tokens.typeScale.label, scale * 0.82), color: c.text.muted }}>
                {['$29','★ 4.8','New','Free'][i % 4]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** editorial — wide headline + paragraph columns (Medium / Substack feel) */
function EditorialLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const { colors: c, borderRadius: r, typography: t, components, layoutStructure } = tokens;
  const gap = DENSITY_GAP[layoutStructure.density] ?? 1;
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.main, fontFamily: t.sans, color: c.text.base }}>
      <NavBar tokens={tokens} transparent />
      <div style={{ flex:1, overflow:'hidden', padding:`${Math.round(10 * gap)}px 20px`, display:'flex', flexDirection:'column', gap:`${Math.round(8 * gap)}px` }}>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          <div style={{ width:16, height:16, borderRadius:'50%', background: c.brand.primary, opacity:.6, flexShrink:0 }} />
          <span style={{ fontSize: mockSize(tokens.typeScale.label, scale), color: c.text.muted }}>Author · 5 min read</span>
        </div>
        <h1 style={{ margin:0, fontWeight: t.headingWeight, fontSize: mockSize(tokens.typeScale.heading, scale), lineHeight: tokens.typeScale.lineHeight, color: c.text.base }}>
          The new standard for design systems
        </h1>
        <p style={{ margin:0, fontSize: mockSize(tokens.typeScale.body, scale * 0.88), lineHeight: tokens.typeScale.lineHeight, color: c.text.muted }}>
          Every great product starts with a coherent visual language. Extract, iterate, and ship.
        </p>
        <div style={{ width:'100%', height: Math.round(48 * gap), borderRadius: r.medium, background: c.brand.secondary, opacity:.18 }} />
        <p style={{ margin:0, fontSize: mockSize(tokens.typeScale.body, scale * 0.88), color: c.text.muted, lineHeight: tokens.typeScale.lineHeight }}>
          Consistent spacing, intentional colour, and typographic hierarchy form the bedrock of
          <span style={{ color: c.brand.primary, fontWeight: t.headingWeight }}> every memorable interface.</span>
        </p>
        <div style={{ display:'flex', gap:6 }}>
          {['Design','Systems','Tokens'].map(tag => (
            <span key={tag} style={{ padding:`2px 8px`, borderRadius: r.small, border:`1px solid ${c.border}`, fontSize: mockSize(tokens.typeScale.label, scale), color: c.text.muted }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** dashboard — sidebar nav + metric cards (Linear / Vercel dashboard feel) */
function DashboardLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const { colors: c, borderRadius: r, typography: t, components } = tokens;
  const metrics = [['2.4k','Users'],['98%','Uptime'],['14ms','Latency'],['$4.2k','Revenue']];
  return (
    <div style={{ display:'flex', height:'100%', background: c.background.main, fontFamily: t.sans, color: c.text.base }}>
      {/* Sidebar */}
      <div style={{ width:52, background: c.background.card, borderRight:`1px solid ${c.border}`, display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10, gap:8, flexShrink:0 }}>
        <div style={{ width:22, height:22, borderRadius: r.small, background: c.brand.primary, marginBottom:6 }} />
        {['⊞','◈','⇿','⊙'].map((icon, i) => (
          <div key={i} style={{ width:28, height:28, borderRadius: r.small, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color: i===0 ? c.brand.primary : c.text.muted, background: i===0 ? `${c.brand.primary}18` : 'transparent' }}>
            {icon}
          </div>
        ))}
      </div>
      {/* Main */}
      <div style={{ flex:1, overflow:'hidden', padding:'10px 12px', display:'flex', flexDirection:'column', gap:8 }}>
        <h2 style={{ margin:0, fontWeight: t.headingWeight, fontSize: mockSize(tokens.typeScale.heading, scale * 0.8), color: c.text.base }}>Overview</h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {metrics.map(([val, label]) => (
            <div key={label} style={{ background: c.background.card, border:`1px solid ${c.border}`, borderRadius: r.medium, padding: components.card.padding, boxShadow: components.card.shadow }}>
              <p style={{ margin:0, fontWeight: t.headingWeight, fontSize: mockSize(tokens.typeScale.heading, scale * 0.75), color: c.brand.primary }}>{val}</p>
              <p style={{ margin:'2px 0 0', fontSize: mockSize(tokens.typeScale.label, scale), color: c.text.muted }}>{label}</p>
            </div>
          ))}
        </div>
        <div style={{ flex:1, background: c.background.card, border:`1px solid ${c.border}`, borderRadius: r.medium, padding:'8px 10px' }}>
          <p style={{ margin:'0 0 6px', fontSize: mockSize(tokens.typeScale.label, scale), color: c.text.muted, fontWeight: t.headingWeight }}>Activity</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:40 }}>
            {[40,65,45,80,60,90,55,70,85,50,75,95].map((h, i) => (
              <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:'2px 2px 0 0', background: c.brand.primary, opacity: 0.3 + (h / 100) * 0.6 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** landing — split hero (text left / visual right) + feature row */
function LandingLayout({ tokens, scale }: { tokens: DesignTokens; scale: number }) {
  const { colors: c, borderRadius: r, typography: t, components, layoutStructure } = tokens;
  const gap = DENSITY_GAP[layoutStructure.density] ?? 1;
  const btnStyle: React.CSSProperties = {
    background: c.brand.primary, color: '#fff', border: 'none', borderRadius: r.small,
    cursor: 'default', fontFamily: t.sans, fontWeight: t.headingWeight,
    padding: `${components.button.paddingY} ${components.button.paddingX}`,
    letterSpacing: components.button.letterSpacing,
    fontSize: mockSize(tokens.typeScale.label, scale),
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background: c.background.main, fontFamily: t.sans, color: c.text.base }}>
      <NavBar tokens={tokens} transparent={layoutStructure.navStyle === 'transparent'} />
      {/* Split hero */}
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:`${Math.round(10 * gap)}px 16px`, gap:`${Math.round(6 * gap)}px` }}>
          <h1 style={{ margin:0, fontWeight: t.headingWeight, fontSize: mockSize(tokens.typeScale.hero, scale), lineHeight: tokens.typeScale.lineHeight, color: c.text.base }}>
            Ship faster,<br/>look better.
          </h1>
          <p style={{ margin:0, fontSize: mockSize(tokens.typeScale.body, scale * 0.85), color: c.text.muted, lineHeight:1.5 }}>
            AI-extracted design tokens, ready to drop into your codebase.
          </p>
          <div style={{ display:'flex', gap:6 }}>
            <button style={btnStyle}>Start free</button>
            <button style={{ ...btnStyle, background:'transparent', color: c.text.base, border:`1px solid ${c.border}` }}>Watch demo</button>
          </div>
        </div>
        <div style={{ width:90, margin:'10px 10px 10px 0', borderRadius: r.large, background:`linear-gradient(135deg, ${c.brand.primary}40, ${c.brand.secondary}30)`, border:`1px solid ${c.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
          ◈
        </div>
      </div>
      {/* Feature row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6, padding:`6px 10px ${Math.round(8 * gap)}px` }}>
        {[['◈','Tokens'],['⊡','Preview'],['⇿','Compare']].map(([icon, label]) => (
          <div key={label} style={{ background: c.background.card, border:`1px solid ${c.border}`, borderRadius: r.medium, padding: components.card.padding, boxShadow: components.card.shadow, display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:12, color: c.brand.primary }}>{icon}</span>
            <span style={{ fontSize: mockSize(tokens.typeScale.label, scale), fontWeight: t.headingWeight, color: c.text.base }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MockPage — picks renderer based on layoutStructure.pattern ────────────
function MockPage({ tokens }: { tokens: DesignTokens }) {
  const heroPx = parsePx(tokens.typeScale.hero);
  // Scale so that the largest headline fits comfortably in ~50px within the 260px mock
  const scale = Math.min(50 / heroPx, 0.55);

  const pattern = tokens.layoutStructure?.pattern ?? 'landing';
  const props = { tokens, scale };

  return (
    <div style={{ height:'100%', overflow:'hidden' }}>
      {pattern === 'hero-centric' && <HeroCentricLayout {...props} />}
      {pattern === 'card-grid'    && <CardGridLayout    {...props} />}
      {pattern === 'editorial'    && <EditorialLayout   {...props} />}
      {pattern === 'dashboard'    && <DashboardLayout   {...props} />}
      {pattern === 'landing'      && <LandingLayout     {...props} />}
    </div>
  );
}

// ── CellPad wrapper ───────────────────────────────────────────────────────
const cellLabelStyle: React.CSSProperties = {
  fontSize: 10, fontFamily: monoFont, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,.24)', marginBottom: 14,
};

// ── BentoGrid (palette tab) ───────────────────────────────────────────────
function BentoGrid({ tokens, siteUrl }: { tokens: DesignTokens; siteUrl?: string }) {
  const { colors: c, spacing, borderRadius: r, typography: t } = tokens;
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  function doExport(key: string, fn: () => void) {
    fn();
    setExportFeedback(key);
    setTimeout(() => setExportFeedback(null), 2000);
  }

  const swatches = [
    { label: 'Brand / Primary',   value: c.brand.primary },
    { label: 'Brand / Secondary', value: c.brand.secondary },
    { label: 'BG / Main',         value: c.background.main },
    { label: 'BG / Card',         value: c.background.card },
    { label: 'Text / Base',       value: c.text.base },
    { label: 'Text / Muted',      value: c.text.muted },
    { label: 'Border',            value: c.border },
  ];

  return (
    <div className="vi-bento">

      {/* ── Cell 1: Color System (7 cols) ── */}
      <div className="vi-cell-palette vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <p style={cellLabelStyle}>Color System</p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {swatches.map(s => <ColorSwatch key={s.label} {...s} />)}
          </div>
          {tokens.layoutVibe && (
            <div style={{ marginTop:12, display:'flex', gap:5, flexWrap:'wrap' }}>
              {tokens.layoutVibe.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                <span key={tag} style={{ padding:'2px 8px', borderRadius:6, background:'rgba(167,139,250,.08)', border:'1px solid rgba(167,139,250,.2)', fontSize:10, fontFamily:monoFont, color:'#c4b5fd' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Cell 2: Typography (5 cols) ── */}
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
            /* ── Physical type scale specimen ─────────────────────────── */
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:0, overflowY:'auto' }}>
              {[...tokens.typographyScale.steps].reverse().map(step => {
                const rawPx = parseInt(step.px);
                // Cap display size so every row fits the cell
                const displayPx = Math.min(rawPx, 26);
                return (
                  <div key={step.px} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 0', borderBottom:'1px solid rgba(255,255,255,.045)' }}>
                    <span style={{ fontFamily: t.sans, fontSize: displayPx, fontWeight: step.weight, lineHeight: step.lineHeight, color:'rgba(255,255,255,.88)', minWidth:32, flexShrink:0 }}>
                      Aa
                    </span>
                    <div style={{ display:'flex', gap:4, marginLeft:'auto', alignItems:'center', flexShrink:0 }}>
                      <span style={{ fontSize:9, fontFamily:monoFont, color:'#a78bfa', padding:'1px 5px', borderRadius:4, border:'1px solid rgba(167,139,250,.2)', background:'rgba(167,139,250,.05)', whiteSpace:'nowrap' }}>
                        {step.role}
                      </span>
                      <span style={{ fontSize:9, fontFamily:monoFont, color:'rgba(255,255,255,.35)', whiteSpace:'nowrap' }}>
                        {step.rem}
                      </span>
                      <span style={{ fontSize:9, fontFamily:monoFont, color:'rgba(255,255,255,.18)', whiteSpace:'nowrap' }}>
                        /{step.weight}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* Font families */}
              {tokens.typographyScale.families.length > 0 && (
                <div style={{ display:'flex', gap:5, flexWrap:'wrap', paddingTop:8 }}>
                  {tokens.typographyScale.families.map(f => (
                    <span key={f} style={{ padding:'2px 7px', border:'1px solid rgba(124,109,240,.3)', borderRadius:5, fontSize:10, fontFamily:monoFont, color:'#a78bfa' }}>{f}</span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ── Fallback: decorative display ─────────────────────────── */
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ fontFamily: syneFont, fontSize:28, fontWeight:700, lineHeight:1.1, letterSpacing:'-0.02em', color:'rgba(255,255,255,.95)' }}>
                The new<br/>standard.
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.42)', lineHeight:1.65, fontWeight:300 }}>
                Sans-serif stack optimised for high-DPI screens.
              </p>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:'auto', paddingTop:8 }}>
                <span style={{ padding:'3px 9px', border:'1px solid rgba(124,109,240,.3)', borderRadius:6, fontSize:10, fontFamily:monoFont, color:'#a78bfa' }}>{t.sans.split(',')[0].trim()}</span>
                <span style={{ padding:'3px 9px', border:'1px solid rgba(255,255,255,.065)', borderRadius:6, fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.35)' }}>wt: {t.headingWeight}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Cell 3: Border Radius (4 cols) ── */}
      <div className="vi-cell-radius vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <p style={cellLabelStyle}>Border Radius</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:14 }}>
            {[{ size: r.small, label:'sm' }, { size: r.medium, label:'md' }, { size: r.large, label:'lg' }].map(({ size, label }) => (
              <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                <div style={{ background:'linear-gradient(135deg, rgba(99,102,241,.25), rgba(167,139,250,.15))', border:'1px solid rgba(99,102,241,.3)', borderRadius: size, width: label==='sm'?28:label==='md'?40:54, height: label==='sm'?28:label==='md'?40:54 }} />
                <span style={{ fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.35)' }}>{label} · {size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cell 4: Spacing Scale (4 cols) ── */}
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
            /* ── Physical step scale ──────────────────────────────────── */
            (() => {
              const sys = tokens.spacingSystem!;
              // Reverse-map: "8px" → "sm"
              const nameMap: Record<string, string> = {};
              for (const [k, v] of Object.entries(sys.named)) nameMap[v] = k;
              const maxPx = Math.max(...sys.steps.map(s => parseInt(s)), 1);
              return (
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  <div style={{ fontSize:9, fontFamily:monoFont, color:'rgba(52,211,153,.7)', marginBottom:4 }}>
                    base {sys.baseUnit}px grid · {sys.steps.length} steps
                  </div>
                  {sys.steps.map(step => {
                    const px  = parseInt(step);
                    const w   = Math.max(Math.round((px / maxPx) * 112), 4);
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
            /* ── Fallback: computed multiplier bars ───────────────────── */
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[1, 2, 4, 8].map(mult => (
                <div key={mult} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ height:5, borderRadius:3, background:'linear-gradient(90deg, #7c6df0, #a78bfa)', opacity:0.7, width:`${mult * 16}px`, minWidth:16, maxWidth:128, flexShrink:0 }} />
                  <span style={{ fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.35)', whiteSpace:'nowrap' }}>{spacing.base * mult}{spacing.scale} · {mult}×</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Cell 5: Raw Tokens (4 cols) ── */}
      <div className="vi-cell-tokens vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <p style={cellLabelStyle}>Raw Tokens</p>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {[
              ['colors.brand.primary',     c.brand.primary],
              ['spacing.base',             `${spacing.base} ${spacing.scale}`],
              ['radius.medium',            r.medium],
              ['typo.headingWeight',       t.headingWeight],
              ['typeScale.hero',           tokens.typeScale.hero],
              ['layout.pattern',           tokens.layoutStructure.pattern],
              ['layout.density',           tokens.layoutStructure.density],
              ...(tokens.spacingSystem ? [
                ['spacing.baseUnit',       `${tokens.spacingSystem.baseUnit}px`],
                ['spacing.steps',          `${tokens.spacingSystem.steps.length} steps`],
              ] : []),
              ...(tokens.typographyScale ? [
                ['typo.baseSize',          tokens.typographyScale.baseSize],
                ['typo.families',          tokens.typographyScale.families.join(', ') || '—'],
              ] : []),
            ].map(([key, val]) => (
              <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,.065)' }}>
                <span style={{ fontSize:10.5, fontFamily:monoFont, color:'rgba(255,255,255,.35)' }}>{key}</span>
                <span style={{ fontSize:10.5, fontFamily:monoFont, color:'#a78bfa' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cell 6: Mock Page Preview (full width) ── */}
      <div className="vi-cell-mock vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'22px 26px' }}>
          {/* Header row */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <p style={{ ...cellLabelStyle, marginBottom:0 }}>Component Preview</p>
            <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:100, background: tokens.spacingSystem ? 'rgba(52,211,153,.08)' : 'rgba(56,189,248,.1)', border:`1px solid ${tokens.spacingSystem ? 'rgba(52,211,153,.25)' : 'rgba(56,189,248,.2)'}`, fontSize:10, fontFamily:monoFont, color: tokens.spacingSystem ? '#34d399' : '#7dd3fc' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background: tokens.spacingSystem ? '#34d399' : '#38bdf8', animation:'pulse-dot 2s infinite' }} />
              {tokens.spacingSystem ? 'AI + Physical' : 'AI Extracted'}
            </div>
          </div>

          {/* Mock frame */}
          <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,.065)', height:260 }}>
            <MockPage tokens={tokens} />
          </div>

          {/* Export actions */}
          <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
            {[
              { key:'css',  label:'Copy CSS Vars',   doneLabel:'✓ 已复制', color:'rgba(99,91,255,.1)',   border:'rgba(99,91,255,.25)',   text:'#a5a0ff', fn: () => void navigator.clipboard.writeText(buildCSSVars(tokens)) },
              { key:'tw',   label:'Tailwind Config',  doneLabel:'✓ 已复制', color:'rgba(56,189,248,.08)', border:'rgba(56,189,248,.2)',  text:'#7dd3fc', fn: () => void navigator.clipboard.writeText(buildTailwind(tokens)) },
              { key:'json', label:'Export JSON',       doneLabel:'✓ 已下载', color:'rgba(167,139,250,.08)',border:'rgba(167,139,250,.2)', text:'#c4b5fd', fn: () => downloadJSON(tokens, siteUrl ?? '') },
            ].map(({ key, label, doneLabel, color, border, text, fn }) => (
              <button
                key={key}
                onClick={() => doExport(key, fn)}
                style={{ flex:'1 1 120px', height:36, background: color, border:`1px solid ${border}`, borderRadius:9, color: text, fontSize:12, fontFamily:monoFont, cursor:'pointer', transition:'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.filter='brightness(1.3)')}
                onMouseLeave={e => (e.currentTarget.style.filter='brightness(1)')}
              >
                {exportFeedback === key ? doneLabel : label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// ── ComponentPreview tab ──────────────────────────────────────────────────
function ComponentPreview({ tokens }: { tokens: DesignTokens }) {
  const { colors: c, borderRadius: r, typography: t, components } = tokens;
  const btnBase: React.CSSProperties = {
    borderRadius: r.small,
    padding: `${components.button.paddingY} ${components.button.paddingX}`,
    letterSpacing: components.button.letterSpacing,
    fontFamily: t.sans, fontSize:13, cursor:'default', border:'none',
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      {[
        {
          title: 'Buttons',
          content: (
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              <button style={{ ...btnBase, background: c.brand.primary,   color:'#fff',           fontWeight: t.headingWeight }}>Primary</button>
              <button style={{ ...btnBase, background: c.brand.secondary, color:'#fff'                                       }}>Secondary</button>
              <button style={{ ...btnBase, background:'transparent',      color: c.brand.primary,  border:`1.5px solid ${c.brand.primary}` }}>Outline</button>
              <button style={{ ...btnBase, background:'transparent',      color: c.text.muted,     border:`1px solid ${c.border}` }}>Ghost</button>
            </div>
          ),
        },
        {
          title: 'Card',
          content: (
            <div style={{ background: c.background.card, border:`1px solid ${c.border}`, borderRadius: r.medium, padding: tokens.components.card.padding, boxShadow: tokens.components.card.shadow, fontFamily: t.sans, maxWidth:300 }}>
              <div style={{ width:'100%', height:64, borderRadius: r.small, background: c.brand.primary, opacity:.15, marginBottom:12 }} />
              <h3 style={{ fontWeight: t.headingWeight, color: c.text.base, fontSize:14, marginBottom:4 }}>Card Title</h3>
              <p style={{ color: c.text.muted, fontSize:12, lineHeight: tokens.typeScale.lineHeight, marginBottom:12 }}>Body text showing colour, font stack, and line-height rhythm.</p>
              <button style={{ ...btnBase, background: c.brand.primary, color:'#fff', fontWeight: t.headingWeight }}>Action</button>
            </div>
          ),
        },
        {
          title: 'Form Inputs',
          content: (
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              <input readOnly placeholder="Placeholder" style={{ border:`1px solid ${c.border}`, borderRadius: r.small, padding:`${tokens.components.button.paddingY} ${tokens.components.button.paddingX}`, background: c.background.card, color: c.text.muted, fontSize:13, fontFamily: t.sans, outline:'none', width:200 }} />
              <input readOnly defaultValue="Active / focused" style={{ border:`1.5px solid ${c.brand.primary}`, borderRadius: r.small, padding:`${tokens.components.button.paddingY} ${tokens.components.button.paddingX}`, background: c.background.card, color: c.text.base, fontSize:13, fontFamily: t.sans, outline:'none', width:200 }} />
            </div>
          ),
        },
      ].map(({ title, content }) => (
        <div key={title} className="vi-glow-card">
          <div className="vi-glow-card-inner" style={{ padding:'16px 20px' }}>
            <p style={{ ...cellLabelStyle, marginBottom:12 }}>{title}</p>
            {content}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── ComparisonSlider tab ──────────────────────────────────────────────────
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
          {/* Left: original screenshot */}
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

          {/* Right: AI mock revealed from right */}
          <div style={{ position:'absolute', inset:0, overflow:'hidden', clipPath:`inset(0 0 0 ${position}%)` }}>
            <MockPage tokens={tokens} />
            <div style={{ position:'absolute', bottom:12, right:12, borderRadius:100, background:'rgba(124,109,240,.8)', padding:'3px 12px', fontSize:11, fontFamily:monoFont, color:'#fff', backdropFilter:'blur(8px)' }}>
              AI Extracted
            </div>
          </div>

          {/* Labels */}
          <div style={{ position:'absolute', bottom:12, left:12, pointerEvents:'none', borderRadius:100, background:'rgba(0,0,0,.6)', padding:'3px 12px', fontSize:11, fontFamily:monoFont, color:'rgba(255,255,255,.72)', backdropFilter:'blur(8px)' }}>
            Original
          </div>

          {/* Divider line */}
          <div style={{ position:'absolute', inset:'0 auto', top:0, bottom:0, width:1, background:'rgba(255,255,255,.8)', boxShadow:'0 0 10px rgba(255,255,255,.6)', left:`${position}%`, pointerEvents:'none' }} />

          {/* Drag handle */}
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

// ── ThemePreview — top-level export ───────────────────────────────────────

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

      {/* ── Section header ── */}
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

      {/* JSON panel */}
      {showJSON && (
        <div style={{ marginBottom:16, borderRadius:14, border:'1px solid rgba(255,255,255,.065)', background:'#0c0c15', animation:'fade-up .2s ease both' }}>
          <pre style={{ padding:16, fontSize:12, fontFamily:monoFont, color:'rgba(255,255,255,.6)', overflowX:'auto', maxHeight:240, margin:0 }}>
            {JSON.stringify(tokens, null, 2)}
          </pre>
        </div>
      )}

      {/* ── Tab bar ── */}
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

      {/* ── Tab panels ── */}
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
