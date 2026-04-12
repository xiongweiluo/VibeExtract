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
  return [
    ':root {',
    `  --color-primary:   ${t.colors.brand.primary};`,
    `  --color-secondary: ${t.colors.brand.secondary};`,
    `  --color-bg:        ${t.colors.background.main};`,
    `  --color-card:      ${t.colors.background.card};`,
    `  --color-text:      ${t.colors.text.base};`,
    `  --color-muted:     ${t.colors.text.muted};`,
    `  --color-border:    ${t.colors.border};`,
    `  --spacing-base:    ${t.spacing.base}${t.spacing.scale};`,
    `  --radius-sm:       ${t.borderRadius.small};`,
    `  --radius-md:       ${t.borderRadius.medium};`,
    `  --radius-lg:       ${t.borderRadius.large};`,
    `  --font-sans:       ${t.typography.sans};`,
    `  --heading-weight:  ${t.typography.headingWeight};`,
    '}',
  ].join('\n');
}

function buildTailwind(t: DesignTokens): string {
  return JSON.stringify({
    theme: {
      extend: {
        colors: { primary: t.colors.brand.primary, secondary: t.colors.brand.secondary, background: t.colors.background.main, card: t.colors.background.card, muted: t.colors.text.muted, border: t.colors.border },
        borderRadius: { sm: t.borderRadius.small, md: t.borderRadius.medium, lg: t.borderRadius.large },
        fontFamily: { sans: [t.typography.sans] },
      },
    },
  }, null, 2);
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

// ── MockPage ──────────────────────────────────────────────────────────────
function MockPage({ tokens }: { tokens: DesignTokens }) {
  const { colors: c, borderRadius: r, typography: t, spacing } = tokens;
  const u  = spacing.base;
  const px = (n: number) => `${u * n}px`;

  return (
    <div style={{ fontFamily: t.sans, background: c.background.main, color: c.text.base, fontSize:13, lineHeight:1.6, height:'100%' }}>
      <nav style={{ background: c.brand.primary, display:'flex', alignItems:'center', justifyContent:'space-between', padding:`${px(2)} ${px(4)}` }}>
        <span style={{ fontWeight: t.headingWeight, color:'#fff', fontSize:15 }}>Brand</span>
        <div style={{ display:'flex', gap: px(4) }}>
          {['Product','Docs','Pricing'].map(l => <span key={l} style={{ color:'rgba(255,255,255,.82)', fontSize:12 }}>{l}</span>)}
        </div>
      </nav>
      <div style={{ textAlign:'center', padding:`${px(8)} ${px(6)} ${px(6)}` }}>
        <h1 style={{ fontWeight: t.headingWeight, fontSize:26, color: c.text.base, marginBottom: px(2) }}>Beautiful by Default</h1>
        <p style={{ color: c.text.muted, fontSize:13, marginBottom: px(4) }}>Extracted straight from the source. Zero guesswork.</p>
        <button style={{ background: c.brand.primary, color:'#fff', border:'none', borderRadius: r.small, padding:`${px(1.5)} ${px(4)}`, fontWeight: t.headingWeight, fontSize:12, cursor:'default', marginRight: px(2) }}>Get started</button>
        <button style={{ background:'transparent', color: c.brand.primary, border:`1.5px solid ${c.brand.primary}`, borderRadius: r.small, padding:`${px(1.5)} ${px(4)}`, fontSize:12, cursor:'default' }}>Learn more</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: px(3), padding:`0 ${px(6)} ${px(6)}` }}>
        {[['Design System','Consistent visual language.'],['Token Export','One-click to Tailwind / CSS.'],['AI Powered','Claude Vision semantic scan.']].map(([title, text]) => (
          <div key={title} style={{ background: c.background.card, border:`1px solid ${c.border}`, borderRadius: r.medium, padding: px(3) }}>
            <div style={{ width:20, height:20, borderRadius: r.small, background: c.brand.primary, opacity:0.7, marginBottom: px(2) }} />
            <p style={{ fontWeight: t.headingWeight, fontSize:13, color: c.text.base, marginBottom: px(1) }}>{title}</p>
            <p style={{ fontSize:11, color: c.text.muted }}>{text}</p>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap: px(2), padding:`0 ${px(6)} ${px(6)}` }}>
        <input readOnly placeholder="Enter your email" style={{ flex:1, border:`1px solid ${c.border}`, borderRadius: r.small, padding:`${px(1.5)} ${px(3)}`, background: c.background.card, color: c.text.muted, fontSize:12, outline:'none' }} />
        <button style={{ background: c.brand.primary, color:'#fff', border:'none', borderRadius: r.small, padding:`${px(1.5)} ${px(3)}`, fontWeight: t.headingWeight, fontSize:12, cursor:'default', whiteSpace:'nowrap' }}>Subscribe</button>
      </div>
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
        </div>
      </div>

      {/* ── Cell 2: Typography (5 cols) ── */}
      <div className="vi-cell-typo vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px', display:'flex', flexDirection:'column' }}>
          <p style={cellLabelStyle}>Typography</p>
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
          <p style={cellLabelStyle}>Spacing Scale</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[1, 2, 4, 8].map(mult => (
              <div key={mult} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ height:5, borderRadius:3, background:'linear-gradient(90deg, #7c6df0, #a78bfa)', opacity:0.7, width: `${mult * 16}px`, minWidth:16, maxWidth:128, flexShrink:0 }} />
                <span style={{ fontSize:10, fontFamily:monoFont, color:'rgba(255,255,255,.35)', whiteSpace:'nowrap' }}>{spacing.base * mult}{spacing.scale} · {mult}×</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cell 5: Raw Tokens (4 cols) ── */}
      <div className="vi-cell-tokens vi-glow-card">
        <div className="vi-glow-card-inner" style={{ padding:'20px 22px' }}>
          <p style={cellLabelStyle}>Raw Tokens</p>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {[
              ['colors.brand.primary',  c.brand.primary],
              ['spacing.base',          `${spacing.base} ${spacing.scale}`],
              ['radius.medium',         r.medium],
              ['typo.headingWeight',    t.headingWeight],
              ['colors.border',         c.border],
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
            <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:100, background:'rgba(56,189,248,.1)', border:'1px solid rgba(56,189,248,.2)', fontSize:10, fontFamily:monoFont, color:'#7dd3fc' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#38bdf8', animation:'pulse-dot 2s infinite' }} />
              AI Extracted
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
  const { colors: c, borderRadius: r, typography: t, spacing } = tokens;
  const u  = spacing.base;
  const px = (n: number) => `${u * n}px`;
  const btnBase: React.CSSProperties = { borderRadius: r.small, padding:`${px(1.5)} ${px(4)}`, fontFamily: t.sans, fontSize:13, cursor:'default', border:'none' };

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
            <div style={{ background: c.background.card, border:`1px solid ${c.border}`, borderRadius: r.medium, padding: px(4), fontFamily: t.sans, maxWidth:300 }}>
              <div style={{ width:'100%', height:64, borderRadius: r.small, background: c.brand.primary, opacity:.15, marginBottom: px(3) }} />
              <h3 style={{ fontWeight: t.headingWeight, color: c.text.base, fontSize:14, marginBottom: px(1) }}>Card Title</h3>
              <p style={{ color: c.text.muted, fontSize:12, lineHeight:1.6, marginBottom: px(3) }}>Body text showing colour, font stack, and line-height rhythm.</p>
              <button style={{ ...btnBase, background: c.brand.primary, color:'#fff', fontWeight: t.headingWeight }}>Action</button>
            </div>
          ),
        },
        {
          title: 'Form Inputs',
          content: (
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              <input readOnly placeholder="Placeholder" style={{ border:`1px solid ${c.border}`, borderRadius: r.small, padding:`${px(1.5)} ${px(3)}`, background: c.background.card, color: c.text.muted, fontSize:13, fontFamily: t.sans, outline:'none', width:200 }} />
              <input readOnly defaultValue="Active / focused" style={{ border:`1.5px solid ${c.brand.primary}`, borderRadius: r.small, padding:`${px(1.5)} ${px(3)}`, background: c.background.card, color: c.text.base, fontSize:13, fontFamily: t.sans, outline:'none', width:200 }} />
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
