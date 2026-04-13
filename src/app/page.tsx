'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { ThemePreview } from '@/components/playground/ThemePreview';
import { VibeEdit } from '@/components/playground/VibeEdit';
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
  } catch { return false; }
}

type ExtractStep = 'screenshot' | 'physical' | 'extract' | 'done' | 'error';
interface ExtractEvent { step: ExtractStep; message?: string; tokens?: DesignTokens; physicalOk?: boolean; }

// ── LoadingOverlay ────────────────────────────────────────────────────────

function LoadingOverlay({ stepIndex }: { stepIndex: number }) {
  const current = PROGRESS_STEPS[Math.min(stepIndex, PROGRESS_STEPS.length - 1)];
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'rgba(7,7,13,0.88)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
      {/* Scan line */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', opacity:0.15, pointerEvents:'none' }}>
        <div style={{ height:1, width:'100%', background:'linear-gradient(90deg, transparent, #a78bfa, transparent)', animation:'scan-line 2.4s linear infinite' }} />
      </div>

      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20, textAlign:'center', padding:'0 32px' }}>
        {/* Icon ring */}
        <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', width:64, height:64 }}>
          <span style={{ position:'absolute', inset:0, border:'1px solid rgba(167,139,250,0.3)', borderRadius:'50%', animation:'pulse-slow 1.5s ease-in-out infinite' }} />
          <Sparkles style={{ width:28, height:28, color:'#a78bfa', animation:'pulse-slow 2s ease-in-out infinite' }} />
        </div>

        <div>
          <p style={{ fontSize:16, fontWeight:600, color:'rgba(255,255,255,0.9)', marginBottom:4, fontFamily:'var(--font-syne, sans-serif)', animation:'pulse-slow 2s ease-in-out infinite' }}>
            {current.label}
          </p>
          <p style={{ fontSize:12, fontFamily:'var(--font-dm-mono, monospace)', color:'rgba(255,255,255,0.35)' }}>
            {current.sub}
          </p>
        </div>

        {/* Progress dots */}
        <div style={{ display:'flex', gap:6 }}>
          {PROGRESS_STEPS.map((_, i) => (
            <span key={i} style={{ width:6, height:6, borderRadius:'50%', background: i <= stepIndex ? '#a78bfa' : 'rgba(255,255,255,0.15)', transition:'background 0.3s' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function Home() {
  const [url, setUrl]                         = useState('');
  const [urlError, setUrlError]               = useState('');
  const [loading, setLoading]                 = useState(false);
  const [stepIndex, setStepIndex]             = useState(0);
  const [tokens, setTokens]                   = useState<DesignTokens | null>(null);
  const [originalTokens, setOriginalTokens]   = useState<DesignTokens | null>(null);
  const [submittedUrl, setSubmittedUrl]       = useState('');
  const [error, setError]                     = useState('');
  const timerRef                              = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputCardRef                          = useRef<HTMLDivElement>(null);

  // Animated conic-gradient border on the input card
  useEffect(() => {
    let raf: number;
    let angle = 0;
    function animate() {
      angle = (angle + 0.35) % 360;
      if (inputCardRef.current) {
        inputCardRef.current.style.background =
          `conic-gradient(from ${angle}deg, rgba(99,102,241,.55), rgba(167,139,250,.35), rgba(240,171,252,.4), rgba(56,189,248,.3), rgba(99,102,241,.55))`;
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  function validateUrl(value: string): boolean {
    if (!value.trim())             { setUrlError('请输入网站 URL'); return false; }
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
    setOriginalTokens(null);
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
          if (event.step === 'physical')   setStepIndex(1);
          if (event.step === 'extract')    setStepIndex(2);
          if (event.step === 'done' && event.tokens) {
            stopTimer();
            setStepIndex(PROGRESS_STEPS.length - 1);
            setTokens(event.tokens);
            setOriginalTokens(event.tokens);
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

  // ── Shared styles ──
  const monoFont   = 'var(--font-dm-mono, "DM Mono", monospace)';
  const syneFont   = 'var(--font-syne, "Syne", sans-serif)';

  return (
    <>
      {loading && <LoadingOverlay stepIndex={stepIndex} />}

      {/* ── Fixed background layers ── */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0 }}>
        {/* Dot grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)', backgroundSize:'36px 36px' }} />
        {/* Radial glow — top centre */}
        <div style={{ position:'absolute', top:'-20%', left:'50%', transform:'translateX(-50%)', width:900, height:700, background:'radial-gradient(ellipse at center, rgba(124,109,240,.13) 0%, rgba(99,102,241,.07) 35%, transparent 70%)', filter:'blur(1px)' }} />
        {/* Radial glow — bottom right */}
        <div style={{ position:'absolute', bottom:'10%', right:'-10%', width:600, height:500, background:'radial-gradient(ellipse at center, rgba(56,189,248,.06) 0%, transparent 65%)' }} />
      </div>

      {/* ── Sticky nav ── */}
      <nav style={{ position:'sticky', top:0, zIndex:100, padding:'0', borderBottom:'1px solid rgba(255,255,255,.065)', background:'rgba(7,7,13,.72)', backdropFilter:'blur(20px) saturate(180%)', WebkitBackdropFilter:'blur(20px) saturate(180%)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'16px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontFamily:syneFont, fontWeight:800, fontSize:17, letterSpacing:'-0.4px' }}>
            Vibe<span style={{ color:'#a78bfa' }}>Extractor</span>
          </div>
          <ul style={{ display:'flex', gap:32, listStyle:'none', margin:0, padding:0 }}>
            {['文档','示例','API'].map(l => (
              <li key={l}><a href="#" style={{ color:'rgba(255,255,255,.42)', textDecoration:'none', fontSize:13, transition:'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='rgba(255,255,255,.72)')}
                onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,.42)')}>
                {l}
              </a></li>
            ))}
          </ul>
          <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', border:'1px solid rgba(124,109,240,.3)', borderRadius:100, background:'rgba(124,109,240,.08)', fontSize:11, fontFamily:monoFont, color:'#a78bfa', letterSpacing:'0.02em' }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#a78bfa', animation:'pulse-dot 2s ease-in-out infinite', flexShrink:0 }} />
            Claude Vision · v2.1
          </div>
        </div>
      </nav>

      <main style={{ position:'relative', zIndex:1 }}>
        {/* ── Hero ── */}
        <section style={{ maxWidth:1100, margin:'0 auto', padding:'100px 24px 72px', textAlign:'center' }}>

          {/* Eyebrow */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', border:'1px solid rgba(255,255,255,.12)', borderRadius:100, background:'rgba(255,255,255,.03)', fontSize:11.5, fontFamily:monoFont, color:'rgba(255,255,255,.42)', letterSpacing:'0.04em', marginBottom:32, animation:'fade-up .6s ease both' }}>
            <span>✦</span>
            Powered by Claude Vision &nbsp;·&nbsp; Design Token Extractor
          </div>

          {/* Title */}
          <h1 style={{ fontFamily:syneFont, fontSize:'clamp(52px, 8vw, 88px)', fontWeight:800, lineHeight:1.0, letterSpacing:'-0.03em', marginBottom:22, animation:'fade-up .6s .08s ease both' }}>
            <span style={{ display:'block', background:'linear-gradient(135deg, #fff 0%, rgba(255,255,255,.65) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              任意网站
            </span>
            <span style={{ display:'block', background:'linear-gradient(135deg, #7c6df0 0%, #a78bfa 50%, #f0abfc 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Design DNA
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ maxWidth:460, margin:'0 auto 52px', color:'rgba(255,255,255,.42)', fontSize:15.5, lineHeight:1.7, fontWeight:300, animation:'fade-up .6s .14s ease both' }}>
            输入 URL，<strong style={{ color:'rgba(255,255,255,.72)', fontWeight:400 }}>AI 自动提取</strong>完整的 Design Token 系统——
            色彩、字体、间距、圆角，一键输出可用于生产的设计语言。
          </p>

          {/* Input card */}
          <div style={{ maxWidth:620, margin:'0 auto', animation:'fade-up .6s .2s ease both' }}>
            {/* Animated gradient border wrapper */}
            <div ref={inputCardRef} style={{ borderRadius:20, padding:'1.5px' }}>
              <div style={{ borderRadius:'18.5px', background:'rgba(10,10,18,.92)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', padding:22 }}>
                <div style={{ fontSize:11, fontFamily:monoFont, letterSpacing:'0.08em', color:'rgba(255,255,255,.24)', textTransform:'uppercase', marginBottom:10 }}>
                  目标网站
                </div>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <input
                    type="url"
                    placeholder="https://stripe.com"
                    value={url}
                    onChange={e => { setUrl(e.target.value); if (urlError) validateUrl(e.target.value); }}
                    onKeyDown={e => e.key === 'Enter' && !loading && handleExtract()}
                    disabled={loading}
                    style={{ flex:1, height:46, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.065)', borderRadius:11, padding:'0 16px', fontFamily:monoFont, fontSize:13, color:'rgba(255,255,255,.72)', outline:'none', transition:'border-color .2s, background .2s' }}
                    onFocus={e => { e.currentTarget.style.borderColor='rgba(124,109,240,.45)'; e.currentTarget.style.background='rgba(124,109,240,.04)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.065)'; e.currentTarget.style.background='rgba(255,255,255,.04)'; }}
                  />
                  <button
                    onClick={handleExtract}
                    disabled={loading}
                    style={{ height:46, padding:'0 20px', background:'linear-gradient(135deg, #7c6df0 0%, #a78bfa 100%)', border:'none', borderRadius:11, fontFamily:syneFont, fontWeight:700, fontSize:13, color:'#fff', cursor: loading ? 'not-allowed' : 'pointer', whiteSpace:'nowrap', transition:'opacity .2s, transform .15s', display:'flex', alignItems:'center', gap:7, opacity: loading ? 0.65 : 1 }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-1px)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.opacity= loading ? '0.65' : '1'; e.currentTarget.style.transform='translateY(0)'; }}
                  >
                    {loading
                      ? <><Loader2 style={{ width:13, height:13, animation:'spin 1s linear infinite' }} />提取中…</>
                      : <><ArrowRight style={{ width:13, height:13 }} />开始提取</>
                    }
                  </button>
                </div>

                {urlError && (
                  <p style={{ display:'flex', alignItems:'center', gap:4, marginTop:8, fontSize:11.5, color:'#f87171', fontFamily:monoFont }}>
                    <AlertCircle style={{ width:12, height:12 }} />{urlError}
                  </p>
                )}

                <div style={{ marginTop:12, fontSize:11.5, color:'rgba(255,255,255,.24)', fontFamily:monoFont, display:'flex', alignItems:'center', gap:8 }}>
                  <span>公开网站即可</span>
                  <span style={{ color:'rgba(255,255,255,.12)' }}>·</span>
                  <span>通常 8–15 秒</span>
                  <span style={{ color:'rgba(255,255,255,.12)' }}>·</span>
                  <span>输出 JSON / CSS Vars / Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Error ── */}
        {error && !loading && (
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px 32px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:12, padding:16, borderRadius:14, border:'1px solid rgba(248,113,113,.25)', background:'rgba(248,113,113,.08)', animation:'fade-up .4s ease both' }}>
              <AlertCircle style={{ width:16, height:16, color:'#f87171', flexShrink:0, marginTop:1 }} />
              <div>
                <p style={{ fontSize:13, fontWeight:600, color:'#f87171', marginBottom:2 }}>提取失败</p>
                <p style={{ fontSize:12, color:'rgba(248,113,113,.7)', fontFamily:'var(--font-dm-mono, monospace)' }}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {tokens && !loading && (
          <section style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px 80px', animation:'fade-up .5s ease both' }}>
            <ThemePreview tokens={tokens} siteUrl={submittedUrl} />
            {originalTokens && (
              <div style={{ marginTop:24 }}>
                <VibeEdit tokens={tokens} originalTokens={originalTokens} onUpdate={setTokens} />
              </div>
            )}
          </section>
        )}
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
