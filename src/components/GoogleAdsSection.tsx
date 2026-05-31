// Google Ads — brand awareness image creatives
// ✓ Logo + wordmark prominent   ✓ Program info visible
// ✓ No fake buttons              ✓ Focal point centered
// ✓ No "Cohort" — uses "Batch"

import React, { useState } from 'react'

// ── Brand tokens ─────────────────────────────────────────────────────────────
const SPARK  = '#FF5A1F'
const SIGNAL = '#7B6CFF'
const BG     = '#0a0a0a'
const SURF1  = '#111111'
const BORDER = '#2a2a2a'
const TEXT   = '#e5e5e5'
const SUBTLE = '#666666'

// ── Brand SVG components ─────────────────────────────────────────────────────

function GlobeMark({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="10.5" stroke="white" strokeOpacity="0.18" strokeWidth="1.4"/>
      <ellipse cx="16" cy="16" rx="4.5" ry="10.5" stroke="white" strokeOpacity="0.1" strokeWidth="1.2"/>
      <line x1="5.5" y1="16" x2="26.5" y2="16" stroke="white" strokeOpacity="0.1" strokeWidth="1.2"/>
      <path d="M9.2 22.8 A 13.2 13.2 0 0 1 22.8 9.2" stroke="white" strokeOpacity="0.6" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="9.2" cy="22.8" r="3.4" fill={SPARK}/>
      <circle cx="22.8" cy="9.2" r="3.4" fill={SIGNAL}/>
    </svg>
  )
}

function Wordmark({ width = 260 }: { width?: number }) {
  const h = Math.round((20 / 206) * width)
  return (
    <svg width={width} height={h} viewBox="0 0 206 20" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke="white" strokeWidth="1"/>
      <ellipse cx="10" cy="10" rx="3.2" ry="6.5" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9"/>
      <line x1="3.5" y1="10" x2="16.5" y2="10" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9"/>
      <circle cx="15.5" cy="4.5" r="2" fill={SIGNAL}/>
      <text x="23" y="14" fontFamily="'Inter',system-ui,sans-serif" fontSize="11.5" fontWeight="400" fill="white">Global</text>
      <text x="61" y="14" fontFamily="'Inter',system-ui,sans-serif" fontSize="11.5" fontWeight="700" fill="white">Developer</text>
      <text x="126" y="14" fontFamily="'Inter',system-ui,sans-serif" fontSize="11.5" fontWeight="400" fill="white">Academy</text>
    </svg>
  )
}

// Subtle concentric globe rings — decorative background
function Rings({ size = 600, opacity = 0.05 }: { size?: number; opacity?: number }) {
  const c = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      style={{ position: 'absolute', pointerEvents: 'none' }}>
      {[0.85, 0.65, 0.45, 0.25].map((r, i) => (
        <circle key={i} cx={c} cy={c} r={c * r} stroke="white" strokeOpacity={opacity} strokeWidth="1.5"/>
      ))}
      <line x1={c * 0.1} y1={c} x2={c * 1.9} y2={c} stroke="white" strokeOpacity={opacity * 0.8} strokeWidth="1"/>
      <line x1={c} y1={c * 0.1} x2={c} y2={c * 1.9} stroke="white" strokeOpacity={opacity * 0.5} strokeWidth="1"/>
    </svg>
  )
}

const STACK_TAGS = [
  { name: 'React',      color: '#60a5fa' },
  { name: 'TypeScript', color: '#a78bfa' },
  { name: 'Supabase',   color: '#34d399' },
]

function StackPills({ size = 16, gap = 10 }: { size?: number; gap?: number }) {
  return (
    <div style={{ display: 'flex', gap, flexWrap: 'wrap' }}>
      {STACK_TAGS.map(({ name, color }) => (
        <span key={name} style={{
          background: `${color}18`, border: `1px solid ${color}40`, color,
          borderRadius: 8, padding: `${size * 0.4}px ${size}px`,
          fontSize: size, fontWeight: 700, fontFamily: "'Inter',sans-serif",
          whiteSpace: 'nowrap',
        }}>
          {name}
        </span>
      ))}
    </div>
  )
}

const sg = (sz: number, w: number | string = 800, color = '#fff'): React.CSSProperties => ({
  fontFamily: "'Space Grotesk','Inter',sans-serif",
  fontSize: sz, fontWeight: w as number,
  color, letterSpacing: '-0.03em', lineHeight: 1.1,
})

// ══════════════════════════════════════════════════════════════════════════════
// L1 — 1200 × 628 — Logo Split
// Left: brand mark + wordmark · Right: program info
// ══════════════════════════════════════════════════════════════════════════════
function L1() {
  return (
    <div style={{ width: 1200, height: 628, background: BG, display: 'flex', overflow: 'hidden', fontFamily: "'Inter',sans-serif" }}>
      {/* Background rings on left */}
      <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <Rings size={560} opacity={0.06}/>
      </div>

      {/* Left: brand */}
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, position: 'relative', zIndex: 1 }}>
        <GlobeMark size={180}/>
        <Wordmark width={280}/>
      </div>

      {/* Divider */}
      <div style={{ width: 2, background: `linear-gradient(180deg, transparent 5%, ${SPARK} 40%, ${SPARK} 60%, transparent 95%)`, flexShrink: 0 }}/>

      {/* Right: program info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px', gap: 22, position: 'relative', zIndex: 1 }}>
        <div style={{ color: SIGNAL, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Full Stack Bootcamp
        </div>
        <div style={{ ...sg(58, 800), maxWidth: 520 }}>
          Mulai dari nol.<br/>
          <span style={{ color: SPARK }}>Sampai online.</span>
        </div>
        <StackPills size={15} gap={10}/>
        <div style={{ color: SUBTLE, fontSize: 15, marginTop: 4 }}>
          11 Juni 2026 · 30 kursi · Batch Juni 2026
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// L2 — 1200 × 628 — Stack Banner
// Wordmark top · Three tech names large · Brand info bottom
// ══════════════════════════════════════════════════════════════════════════════
function L2() {
  return (
    <div style={{ width: 1200, height: 628, background: 'linear-gradient(160deg,#080810,#0a0a0a)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Rings size={700} opacity={0.04}/>
      </div>

      {/* Top: wordmark */}
      <div style={{ position: 'absolute', top: 36, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        <GlobeMark size={28}/>
        <Wordmark width={220}/>
      </div>

      {/* Center: tech names */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
        {STACK_TAGS.map(({ name, color }) => (
          <div key={name} style={{ ...sg(96, 800, color), opacity: 0.95 }}>{name}</div>
        ))}
      </div>

      {/* Bottom: program info */}
      <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 24 }}>
        <span style={{ color: SUBTLE, fontSize: 15 }}>10 sesi live</span>
        <span style={{ color: BORDER }}>·</span>
        <span style={{ color: SUBTLE, fontSize: 15 }}>4 minggu</span>
        <span style={{ color: BORDER }}>·</span>
        <span style={{ color: SUBTLE, fontSize: 15 }}>Batch Juni 2026</span>
        <span style={{ color: BORDER }}>·</span>
        <span style={{ color: SUBTLE, fontSize: 15 }}>11 Juni 2026</span>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// L3 — 1200 × 628 — Tagline Hero
// Globe mark large left · Tagline right · Wordmark pinned bottom
// ══════════════════════════════════════════════════════════════════════════════
function L3() {
  return (
    <div style={{ width: 1200, height: 628, background: 'linear-gradient(135deg,#0a0a0a 50%,#0e0a00 100%)', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif" }}>
      {/* Orange glow behind mark */}
      <div style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%)', width: 480, height: 480, background: `radial-gradient(circle, ${SPARK}15 0%, transparent 70%)`, pointerEvents: 'none' }}/>

      {/* Left: globe mark */}
      <div style={{ width: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <GlobeMark size={260}/>
      </div>

      {/* Right: tagline */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px 0 0', gap: 18, position: 'relative', zIndex: 1 }}>
        <div style={{ color: SIGNAL, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Global Developer Academy
        </div>
        <div style={{ ...sg(62, 800), maxWidth: 520 }}>
          Mulai dari nol.
        </div>
        <div style={{ ...sg(52, 700, SPARK), maxWidth: 520 }}>
          Selesai dengan aplikasi yang beneran jalan.
        </div>
        <div style={{ marginTop: 8 }}>
          <Wordmark width={240}/>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// S1 — 1200 × 1200 — Centered Mark (safe for circle crop)
// Globe mark 380px perfectly centered · Wordmark below · Program tagline
// ══════════════════════════════════════════════════════════════════════════════
function Sq1() {
  return (
    <div style={{ width: 1200, height: 1200, background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif" }}>
      {/* Rings centered */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Rings size={800} opacity={0.06}/>
      </div>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-65%)', width: 500, height: 500, background: `radial-gradient(circle, ${SPARK}12 0%, ${SIGNAL}08 40%, transparent 70%)`, pointerEvents: 'none', borderRadius: '50%' }}/>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, position: 'relative', zIndex: 1 }}>
        <GlobeMark size={380}/>
        <Wordmark width={340}/>
        <div style={{ color: TEXT, fontSize: 26, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: "'Inter',sans-serif" }}>
          Full Stack Bootcamp
        </div>
        <StackPills size={18} gap={14}/>
        <div style={{ color: SUBTLE, fontSize: 17 }}>
          Batch Juni 2026 · 11 Juni 2026 · 30 kursi
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// S2 — 1200 × 1200 — Program Card (centered axis)
// ══════════════════════════════════════════════════════════════════════════════
function Sq2() {
  return (
    <div style={{ width: 1200, height: 1200, background: 'linear-gradient(160deg,#080810,#0a0a0a)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Rings size={1000} opacity={0.04}/>
      </div>
      {/* Glow signal */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: `radial-gradient(circle, ${SIGNAL}0c 0%, transparent 70%)`, pointerEvents: 'none', borderRadius: '50%' }}/>

      {/* Center card */}
      <div style={{ background: SURF1, border: `1px solid ${BORDER}`, borderRadius: 32, padding: '72px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, maxWidth: 820, position: 'relative', zIndex: 1 }}>
        {/* Top border accent */}
        <div style={{ position: 'absolute', top: 0, left: 80, right: 80, height: 3, background: `linear-gradient(90deg, transparent, ${SPARK}, ${SIGNAL}, transparent)`, borderRadius: 2 }}/>

        <GlobeMark size={140}/>
        <Wordmark width={320}/>

        <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)` }}/>

        <div style={{ ...sg(38, 700), textAlign: 'center' }}>
          Full Stack Bootcamp
        </div>

        <StackPills size={18} gap={14}/>

        <div style={{ display: 'flex', gap: 32, color: SUBTLE, fontSize: 17, fontFamily: "'Inter',sans-serif" }}>
          <span>10 sesi live</span>
          <span style={{ color: BORDER }}>·</span>
          <span>4 minggu</span>
          <span style={{ color: BORDER }}>·</span>
          <span>30 kursi</span>
        </div>

        <div style={{ color: SPARK, fontSize: 17, fontWeight: 700, letterSpacing: '0.04em' }}>
          11 Juni 2026 · Batch Juni 2026
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// S3 — 1200 × 1200 — Tagline Square
// ══════════════════════════════════════════════════════════════════════════════
function Sq3() {
  return (
    <div style={{ width: 1200, height: 1200, background: 'linear-gradient(160deg,#0a0a0a,#0e0a00)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif", textAlign: 'center', padding: '80px 120px' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: `radial-gradient(circle, ${SPARK}0e 0%, transparent 70%)`, pointerEvents: 'none', borderRadius: '50%' }}/>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Rings size={900} opacity={0.05}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, position: 'relative', zIndex: 1 }}>
        <GlobeMark size={120}/>
        <Wordmark width={300}/>

        <div style={{ height: 2, width: 60, background: SPARK, borderRadius: 2 }}/>

        <div style={{ ...sg(80, 800) }}>Mulai dari nol.</div>

        <div style={{ ...sg(62, 700, SPARK), maxWidth: 800 }}>
          Selesai dengan aplikasi yang beneran jalan.
        </div>

        <StackPills size={18} gap={14}/>

        <div style={{ color: SUBTLE, fontSize: 17 }}>
          Batch Juni 2026 · 11 Juni 2026 · 30 kursi
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// P1 — 960 × 1200 — Brand Portrait
// Globe mark large upper half · Program details lower half
// ══════════════════════════════════════════════════════════════════════════════
function P1() {
  return (
    <div style={{ width: 960, height: 1200, background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)' }}>
        <Rings size={700} opacity={0.06}/>
      </div>
      <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${SPARK}10 0%, ${SIGNAL}08 45%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>

      {/* Upper: brand */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, position: 'relative', zIndex: 1, paddingTop: 40 }}>
        <GlobeMark size={220}/>
        <Wordmark width={300}/>
      </div>

      {/* Divider */}
      <div style={{ width: '80%', height: 1, background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)` }}/>

      {/* Lower: program info */}
      <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 64px 56px', gap: 20, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ color: SIGNAL, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Full Stack Bootcamp
        </div>
        <div style={{ ...sg(52, 800) }}>
          React · TypeScript · Supabase
        </div>
        <StackPills size={16} gap={12}/>
        <div style={{ display: 'flex', gap: 20, color: SUBTLE, fontSize: 16, marginTop: 4 }}>
          <span>10 sesi live</span>
          <span>·</span>
          <span>4 minggu</span>
          <span>·</span>
          <span>30 kursi</span>
        </div>
        <div style={{ color: SPARK, fontSize: 16, fontWeight: 700 }}>
          Batch Juni 2026 · Mulai 11 Juni 2026
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// P2 — 960 × 1200 — Announcement
// Globe watermark large behind · Wordmark · Program announcement center
// ══════════════════════════════════════════════════════════════════════════════
function P2() {
  return (
    <div style={{ width: 960, height: 1200, background: 'linear-gradient(160deg,#08080e,#0a0a0a)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif", textAlign: 'center', padding: '64px' }}>
      {/* Large globe watermark */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.04 }}>
        <GlobeMark size={800}/>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: `radial-gradient(circle, ${SIGNAL}10 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, position: 'relative', zIndex: 1 }}>
        {/* Wordmark top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <GlobeMark size={36}/>
          <Wordmark width={230}/>
        </div>

        <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${SPARK}, ${SIGNAL})`, borderRadius: 1 }}/>

        {/* Batch announcement */}
        <div style={{ ...sg(32, 600, SUBTLE), textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Membuka Pendaftaran
        </div>
        <div style={{ ...sg(80, 800, '#fff') }}>Batch</div>
        <div style={{ ...sg(80, 800, SPARK) }}>Juni 2026</div>

        <div style={{ height: 1, width: 60, background: BORDER, borderRadius: 1 }}/>

        <div style={{ ...sg(36, 700) }}>Full Stack Bootcamp</div>

        <StackPills size={17} gap={12}/>

        <div style={{ color: SUBTLE, fontSize: 16, lineHeight: 1.8 }}>
          10 sesi live via Google Meet<br/>
          Mulai 11 Juni 2026 · 30 kursi tersedia
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// T1 — 1080 × 1920 — Brand Story Flow (3 sections)
// ══════════════════════════════════════════════════════════════════════════════
function T1() {
  return (
    <div style={{ width: 1080, height: 1920, background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Inter',sans-serif" }}>
      {/* Top accent bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${SPARK}, ${SIGNAL})`, flexShrink: 0 }}/>

      {/* Section 1: Brand mark */}
      <div style={{ flex: '0 0 640px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: 36 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <Rings size={560} opacity={0.07}/>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 440, height: 440, background: `radial-gradient(circle, ${SPARK}12 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>
        <GlobeMark size={260}/>
        <Wordmark width={320}/>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 80px', height: 1, background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)`, flexShrink: 0 }}/>

      {/* Section 2: Tagline */}
      <div style={{ flex: '0 0 560px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 20, textAlign: 'center', position: 'relative' }}>
        <div style={{ ...sg(22, 700, SIGNAL), textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Full Stack Bootcamp
        </div>
        <div style={{ ...sg(72, 800) }}>Mulai dari nol.</div>
        <div style={{ ...sg(58, 700, SPARK) }}>
          Selesai dengan aplikasi yang beneran jalan.
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 80px', height: 1, background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)`, flexShrink: 0 }}/>

      {/* Section 3: Program details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px', gap: 24, textAlign: 'center' }}>
        <StackPills size={20} gap={14}/>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px', color: SUBTLE, fontSize: 18 }}>
          <span>10 sesi live</span>
          <span>4 minggu</span>
          <span>30 kursi tersedia</span>
          <span>via Google Meet</span>
        </div>

        <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${SPARK}, ${SIGNAL})`, borderRadius: 1 }}/>

        <div style={{ color: SPARK, fontSize: 22, fontWeight: 800 }}>
          Batch Juni 2026
        </div>
        <div style={{ color: TEXT, fontSize: 20, fontWeight: 600 }}>
          Mulai 11 Juni 2026
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// T2 — 1080 × 1920 — Atmospheric (globe mark dominant)
// ══════════════════════════════════════════════════════════════════════════════
function T2() {
  return (
    <div style={{ width: 1080, height: 1920, background: 'linear-gradient(180deg,#060610 0%,#0a0a0a 55%,#0c0800 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', fontFamily: "'Inter',sans-serif" }}>
      {/* Concentric rings background */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-55%)' }}>
        <Rings size={1100} opacity={0.07}/>
      </div>

      {/* Radial glows */}
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: `radial-gradient(circle, ${SPARK}15 0%, ${SIGNAL}08 45%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>

      {/* Main globe — very large */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 40 }}>
        <GlobeMark size={680}/>
      </div>

      {/* Connection arc */}
      <svg width="640" height="100" viewBox="0 0 640 100" fill="none" style={{ position: 'relative', zIndex: 1, marginBottom: 32 }}>
        <path d="M 80 70 Q 320 10 560 70" stroke="url(#arcGrad)" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.7"/>
        <defs>
          <linearGradient id="arcGrad" x1="80" y1="70" x2="560" y2="70">
            <stop stopColor={SPARK}/><stop offset="1" stopColor={SIGNAL}/>
          </linearGradient>
        </defs>
        <circle cx="80" cy="70" r="10" fill={SPARK} fillOpacity="0.9"/>
        <circle cx="560" cy="70" r="10" fill={SIGNAL} fillOpacity="0.9"/>
        <text x="80" y="92" textAnchor="middle" fill={SPARK} fontSize="16" fontFamily="Inter" fillOpacity="0.75">Indonesia</text>
        <text x="560" y="92" textAnchor="middle" fill={SIGNAL} fontSize="16" fontFamily="Inter" fillOpacity="0.75">Australia</text>
      </svg>

      {/* Wordmark bottom */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Wordmark width={300}/>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── BATCH 2 · 10 more creatives — fresh directions, same brand guidelines ────
// ══════════════════════════════════════════════════════════════════════════════

// L4 — 1200 × 628 — Indigo Split
// Globe bridges a dark/indigo split; signal colour as primary accent
function L4() {
  return (
    <div style={{ width: 1200, height: 628, position: 'relative', overflow: 'hidden', display: 'flex', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', inset: 0, background: BG }}/>
      <div style={{ position: 'absolute', right: 0, top: 0, width: 580, height: 628, background: 'linear-gradient(140deg,#08081e,#0c0c28)' }}/>
      {/* Signal divider */}
      <div style={{ position: 'absolute', left: 620, top: 0, width: 2, height: '100%', background: `linear-gradient(180deg,transparent 5%,${SIGNAL} 40%,${SIGNAL} 60%,transparent 95%)` }}/>
      {/* Globe straddles the split */}
      <div style={{ position: 'absolute', left: 620, top: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
        <GlobeMark size={200}/>
      </div>
      {/* Left */}
      <div style={{ width: 580, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 68px', gap: 22, zIndex: 1 }}>
        <Wordmark width={260}/>
        <div style={{ ...sg(54, 800) }}>Full Stack<br/>Bootcamp</div>
        <div style={{ color: SUBTLE, fontSize: 15 }}>globaldev.sbs</div>
      </div>
      {/* Right */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px 0 110px', gap: 18, zIndex: 1 }}>
        <div style={{ color: SIGNAL, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Batch Juni 2026</div>
        <StackPills size={15} gap={10}/>
        <div style={{ color: TEXT, fontSize: 22, fontWeight: 700 }}>11 Juni 2026</div>
        <div style={{ color: SUBTLE, fontSize: 15 }}>10 sesi live · 30 kursi tersedia</div>
      </div>
    </div>
  )
}

// L5 — 1200 × 628 — Dot Grid
// Subtle dot-grid background; globe right-aligned; editorial left copy
function L5() {
  const cols = 42, rows = 22, g = 30
  return (
    <div style={{ width: 1200, height: 628, background: '#080810', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', fontFamily: "'Inter',sans-serif" }}>
      {/* Dot grid */}
      <svg width="1200" height="628" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={c * g + g / 2} cy={r * g + g / 2} r={1.2} fill="white" fillOpacity={0.05}/>
          ))
        )}
      </svg>
      {/* Signal glow right */}
      <div style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)', width: 520, height: 520, background: `radial-gradient(circle,${SIGNAL}18 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>
      {/* Left: wordmark + tagline */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px', gap: 20, zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <GlobeMark size={32}/>
          <Wordmark width={220}/>
        </div>
        <div style={{ ...sg(64, 800), maxWidth: 480 }}>
          Mulai dari nol.<br/><span style={{ color: SIGNAL }}>Sampai online.</span>
        </div>
        <div style={{ color: SUBTLE, fontSize: 15 }}>Batch Juni 2026 · 11 Juni 2026 · 30 kursi</div>
      </div>
      {/* Right: large globe mark */}
      <div style={{ width: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, paddingRight: 40, zIndex: 1 }}>
        <GlobeMark size={240}/>
      </div>
    </div>
  )
}

// L6 — 1200 × 628 — Centre Stage
// Globe takes the spotlight dead-centre; minimal bottom strip with wordmark
function L6() {
  return (
    <div style={{ width: 1200, height: 628, background: 'linear-gradient(180deg,#060608 0%,#0a0a0a 60%,#0e0a00 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Rings size={560} opacity={0.07}/>
      </div>
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: `radial-gradient(circle,${SPARK}16 0%,${SIGNAL}0a 45%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>
      {/* Globe centre-stage */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <GlobeMark size={280}/>
      </div>
      {/* Bottom strip */}
      <div style={{ height: 120, width: '100%', borderTop: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexShrink: 0, zIndex: 1, padding: '0 64px' }}>
        <Wordmark width={240}/>
        <div style={{ width: 1, height: 40, background: BORDER }}/>
        <div style={{ color: SUBTLE, fontSize: 15 }}>Full Stack Bootcamp · Batch Juni 2026</div>
        <div style={{ width: 1, height: 40, background: BORDER }}/>
        <StackPills size={13} gap={8}/>
      </div>
    </div>
  )
}

// S4 — 1200 × 1200 — Signal Square
// Signal/indigo palette; globe centred with signal rings
function Sq4() {
  const c = 600
  return (
    <div style={{ width: 1200, height: 1200, background: 'linear-gradient(145deg,#07071a,#0a0a1e)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif" }}>
      {/* Signal rings */}
      <svg width="900" height="900" viewBox="0 0 900 900" fill="none" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
        {[420,320,220,120].map(r => <circle key={r} cx={c-150} cy={c-150} r={r} stroke={SIGNAL} strokeOpacity="0.06" strokeWidth="1.5"/>)}
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: `radial-gradient(circle,${SIGNAL}10 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, zIndex: 1 }}>
        <GlobeMark size={320}/>
        <Wordmark width={320}/>
        <div style={{ height: 2, width: 80, background: `linear-gradient(90deg,${SIGNAL},${SPARK})`, borderRadius: 2 }}/>
        <div style={{ ...sg(40, 700), textAlign: 'center', color: TEXT }}>Full Stack Bootcamp</div>
        <StackPills size={18} gap={14}/>
        <div style={{ color: SIGNAL, fontSize: 18, fontWeight: 700 }}>Batch Juni 2026</div>
        <div style={{ color: SUBTLE, fontSize: 16 }}>11 Juni 2026 · 30 kursi · 10 sesi live</div>
      </div>
    </div>
  )
}

// S5 — 1200 × 1200 — Two-Column Square
// Globe + wordmark left; program details right; spark vertical divider
function Sq5() {
  return (
    <div style={{ width: 1200, height: 1200, background: BG, position: 'relative', overflow: 'hidden', display: 'flex', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)' }}>
        <Rings size={700} opacity={0.05}/>
      </div>
      {/* Left column */}
      <div style={{ width: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '60px 40px', zIndex: 1 }}>
        <GlobeMark size={260}/>
        <Wordmark width={280}/>
        <div style={{ color: SUBTLE, fontSize: 15, textAlign: 'center' }}>globaldev.sbs</div>
      </div>
      {/* Spark divider */}
      <div style={{ width: 2, alignSelf: 'stretch', margin: '80px 0', background: `linear-gradient(180deg,transparent,${SPARK},transparent)`, flexShrink: 0 }}/>
      {/* Right column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 56px', gap: 24, zIndex: 1 }}>
        <div style={{ color: SPARK, fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Full Stack Bootcamp</div>
        <div style={{ ...sg(62, 800) }}>Mulai dari nol.</div>
        <div style={{ ...sg(50, 700, SPARK) }}>Selesai dengan aplikasi nyata.</div>
        <StackPills size={17} gap={12}/>
        <div style={{ height: 1, background: `linear-gradient(90deg,${BORDER},transparent)` }}/>
        <div style={{ color: TEXT, fontSize: 20, fontWeight: 700 }}>Batch Juni 2026</div>
        <div style={{ color: SUBTLE, fontSize: 16 }}>11 Juni 2026 · 30 kursi · 10 sesi live</div>
      </div>
    </div>
  )
}

// S6 — 1200 × 1200 — Key Numbers
// Three program stats as hero visuals; globe mark top; brand bottom
function Sq6() {
  const stat = (n: string, label: string, color: string) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '32px 20px', background: SURF1, border: `1px solid ${BORDER}`, borderRadius: 20 }}>
      <div style={{ ...sg(100, 800, color), lineHeight: 1 }}>{n}</div>
      <div style={{ color: SUBTLE, fontSize: 18, fontWeight: 600, fontFamily: "'Inter',sans-serif", textAlign: 'center' }}>{label}</div>
    </div>
  )
  return (
    <div style={{ width: 1200, height: 1200, background: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px', gap: 36, fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 80% at 50% 50%,${SPARK}07 0%,transparent 70%)`, pointerEvents: 'none' }}/>
      {/* Top brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <GlobeMark size={44}/>
        <Wordmark width={280}/>
      </div>
      {/* Three stats */}
      <div style={{ display: 'flex', gap: 20, width: '100%', zIndex: 1 }}>
        {stat('10', 'Sesi Live', SPARK)}
        {stat('4', 'Minggu', SIGNAL)}
        {stat('30', 'Kursi', '#4ade80')}
      </div>
      {/* Bottom info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 1 }}>
        <StackPills size={18} gap={14}/>
        <div style={{ color: SPARK, fontSize: 20, fontWeight: 800 }}>Batch Juni 2026 · Mulai 11 Juni 2026</div>
      </div>
    </div>
  )
}

// P3 — 960 × 1200 — Signal Portrait
// Deep indigo gradient; left orange accent bar; centred content
function P3() {
  return (
    <div style={{ width: 960, height: 1200, background: 'linear-gradient(180deg,#080818,#0a0a16,#0a0a0a)', position: 'relative', overflow: 'hidden', display: 'flex', fontFamily: "'Inter',sans-serif" }}>
      {/* Left accent bar */}
      <div style={{ width: 5, background: `linear-gradient(180deg,transparent 5%,${SPARK} 30%,${SPARK} 70%,transparent 95%)`, flexShrink: 0 }}/>
      {/* Signal glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: `radial-gradient(circle,${SIGNAL}0e 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Rings size={680} opacity={0.05}/>
      </div>
      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '60px 64px', textAlign: 'center', zIndex: 1 }}>
        <GlobeMark size={200}/>
        <Wordmark width={300}/>
        <div style={{ height: 2, width: 60, background: `linear-gradient(90deg,${SIGNAL},${SPARK})`, borderRadius: 2 }}/>
        <div style={{ ...sg(46, 800) }}>Full Stack Bootcamp</div>
        <StackPills size={17} gap={12}/>
        <div style={{ height: 1, width: '70%', background: `linear-gradient(90deg,transparent,${BORDER},transparent)` }}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ color: SIGNAL, fontSize: 18, fontWeight: 700 }}>Batch Juni 2026</div>
          <div style={{ color: TEXT, fontSize: 20, fontWeight: 700 }}>11 Juni 2026</div>
          <div style={{ color: SUBTLE, fontSize: 16 }}>10 sesi live · 4 minggu · 30 kursi</div>
        </div>
      </div>
    </div>
  )
}

// P4 — 960 × 1200 — Key Numbers Portrait
// Large stat numbers as visual anchors; globe top; brand bottom
function P4() {
  return (
    <div style={{ width: 960, height: 1200, background: BG, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
        <Rings size={800} opacity={0.05}/>
      </div>
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: `radial-gradient(circle,${SPARK}0d 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>

      {/* Top: globe + wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 72, zIndex: 1 }}>
        <GlobeMark size={160}/>
        <Wordmark width={280}/>
      </div>

      {/* Middle: stats */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 1, padding: '0 64px' }}>
        {[
          { n: '10', label: 'Sesi Live', color: SPARK },
          { n: '4',  label: 'Minggu',    color: SIGNAL },
          { n: '30', label: 'Kursi',     color: '#4ade80' },
        ].map(({ n, label, color }, i) => (
          <React.Fragment key={n}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ ...sg(110, 800, color), lineHeight: 1 }}>{n}</span>
              <span style={{ color: SUBTLE, fontSize: 26, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{label}</span>
            </div>
            {i < 2 && <div style={{ width: 60, height: 1, background: BORDER }}/>}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom: program info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '0 64px 60px', zIndex: 1 }}>
        <div style={{ height: 2, width: 60, background: `linear-gradient(90deg,${SPARK},${SIGNAL})`, borderRadius: 2 }}/>
        <StackPills size={16} gap={12}/>
        <div style={{ color: SPARK, fontSize: 17, fontWeight: 800 }}>Batch Juni 2026 · 11 Juni 2026</div>
      </div>
    </div>
  )
}

// T3 — 1080 × 1920 — Full Bleed Globe
// Enormous globe bleeds off top+sides; content anchored at bottom
function T3() {
  return (
    <div style={{ width: 1080, height: 1920, background: 'linear-gradient(180deg,#06060e 0%,#0a0a0a 55%,#0c0800 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', fontFamily: "'Inter',sans-serif" }}>
      {/* Massive bleed globe */}
      <div style={{ position: 'absolute', top: -180, left: '50%', transform: 'translateX(-50%)', zIndex: 0, pointerEvents: 'none' }}>
        <GlobeMark size={1200}/>
      </div>
      {/* Gradient fade from globe into content area */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 900, background: 'linear-gradient(0deg,#0a0a0a 40%,transparent 100%)', pointerEvents: 'none', zIndex: 1 }}/>

      {/* Content area */}
      <div style={{ position: 'relative', zIndex: 2, padding: '60px 80px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <Wordmark width={320}/>
        <div style={{ ...sg(52, 800) }}>Full Stack Bootcamp</div>
        <StackPills size={18} gap={14}/>
        <div style={{ height: 1, width: '60%', background: `linear-gradient(90deg,transparent,${BORDER},transparent)` }}/>
        <div style={{ color: SPARK, fontSize: 22, fontWeight: 800 }}>Batch Juni 2026</div>
        <div style={{ color: TEXT, fontSize: 20, fontWeight: 600 }}>11 Juni 2026</div>
        <div style={{ color: SUBTLE, fontSize: 17 }}>10 sesi live · 4 minggu · 30 kursi tersedia</div>
      </div>
    </div>
  )
}

// T4 — 1080 × 1920 — Program Journey (milestone flow)
// Globe top → wordmark → three milestones → batch info
function T4() {
  const milestone = (icon: string, title: string, sub: string, accent: string) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', textAlign: 'left', width: '100%' }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: `${accent}18`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ color: TEXT, fontSize: 22, fontWeight: 700, fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>{title}</div>
        <div style={{ color: SUBTLE, fontSize: 17, fontFamily: "'Inter',sans-serif" }}>{sub}</div>
      </div>
    </div>
  )
  return (
    <div style={{ width: 1080, height: 1920, background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Inter',sans-serif" }}>
      {/* Top bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg,${SIGNAL},${SPARK})`, flexShrink: 0 }}/>

      {/* Brand section */}
      <div style={{ flex: '0 0 500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <Rings size={440} opacity={0.07}/>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 360, height: 360, background: `radial-gradient(circle,${SIGNAL}0e 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}/>
        <GlobeMark size={220}/>
        <Wordmark width={300}/>
        <div style={{ color: SIGNAL, fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Full Stack Bootcamp</div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 80px', height: 1, background: `linear-gradient(90deg,transparent,${BORDER},transparent)`, flexShrink: 0 }}/>

      {/* Milestones */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 80px', gap: 36 }}>
        <div style={{ color: SPARK, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Yang akan kamu jalani</div>
        {milestone('⚡', 'React + TypeScript', 'Bangun UI interaktif dari nol', SPARK)}
        <div style={{ marginLeft: 40, height: 28, width: 2, background: `linear-gradient(180deg,${SPARK}40,${SIGNAL}40)` }}/>
        {milestone('🗄️', 'Supabase + Auth + Database', 'Data nyata, login, dan storage', SIGNAL)}
        <div style={{ marginLeft: 40, height: 28, width: 2, background: `linear-gradient(180deg,${SIGNAL}40,#4ade8040)` }}/>
        {milestone('🚀', 'Deploy + Launch', 'Aplikasimu online dan bisa dibuka siapa saja', '#4ade80')}
      </div>

      {/* Divider */}
      <div style={{ margin: '0 80px', height: 1, background: `linear-gradient(90deg,transparent,${BORDER},transparent)`, flexShrink: 0 }}/>

      {/* Bottom: batch info */}
      <div style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <StackPills size={18} gap={14}/>
        <div style={{ color: SPARK, fontSize: 22, fontWeight: 800 }}>Batch Juni 2026</div>
        <div style={{ color: SUBTLE, fontSize: 17 }}>11 Juni 2026 · 10 sesi live · 30 kursi</div>
      </div>
    </div>
  )
}

// ── Catalog ───────────────────────────────────────────────────────────────────
export type AdDef = { id: string; label: string; format: string; w: number; h: number; El: React.FC }

export const GOOGLE_ADS: AdDef[] = [
  // ── Batch 1 ──
  { id: 'l1', label: 'L1 — Logo Split',        format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L1 },
  { id: 'l2', label: 'L2 — Stack Banner',       format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L2 },
  { id: 'l3', label: 'L3 — Tagline Hero',        format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L3 },
  { id: 's1', label: 'S1 — Centered Mark',       format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq1 },
  { id: 's2', label: 'S2 — Program Card',        format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq2 },
  { id: 's3', label: 'S3 — Tagline Square',      format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq3 },
  { id: 'p1', label: 'P1 — Brand Portrait',      format: 'Portrait 960×1200',       w: 960,  h: 1200, El: P1 },
  { id: 'p2', label: 'P2 — Announcement',        format: 'Portrait 960×1200',       w: 960,  h: 1200, El: P2 },
  { id: 't1', label: 'T1 — Brand Story Flow',    format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T1 },
  { id: 't2', label: 'T2 — Atmospheric',         format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T2 },
  // ── Batch 2 ──
  { id: 'l4', label: 'L4 — Indigo Split',        format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L4 },
  { id: 'l5', label: 'L5 — Dot Grid',            format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L5 },
  { id: 'l6', label: 'L6 — Centre Stage',        format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L6 },
  { id: 's4', label: 'S4 — Signal Square',       format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq4 },
  { id: 's5', label: 'S5 — Two Column',          format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq5 },
  { id: 's6', label: 'S6 — Key Numbers',         format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq6 },
  { id: 'p3', label: 'P3 — Signal Portrait',     format: 'Portrait 960×1200',       w: 960,  h: 1200, El: P3 },
  { id: 'p4', label: 'P4 — Numbers Portrait',    format: 'Portrait 960×1200',       w: 960,  h: 1200, El: P4 },
  { id: 't3', label: 'T3 — Full Bleed Globe',    format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T3 },
  { id: 't4', label: 'T4 — Program Journey',     format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T4 },
]

// ── Standalone section (for standalone page usage) ───────────────────────────
const PREVIEW_W = 280
const FORMAT_LABEL: Record<string, string> = {
  l1:'Landscape',l2:'Landscape',l3:'Landscape',l4:'Landscape',l5:'Landscape',l6:'Landscape',
  s1:'Square',s2:'Square',s3:'Square',s4:'Square',s5:'Square',s6:'Square',
  p1:'Portrait',p2:'Portrait',p3:'Portrait',p4:'Portrait',
  t1:'Tall',t2:'Tall',t3:'Tall',t4:'Tall',
}
const FORMAT_ORDER = ['Landscape','Square','Portrait','Tall']

export default function GoogleAdsSection() {
  const [open, setOpen] = useState<AdDef | null>(null)
  const byFmt = GOOGLE_ADS.reduce<Record<string,AdDef[]>>((a,ad) => { const k=FORMAT_LABEL[ad.id]??'Other'; (a[k]??=(a[k]=[])).push(ad); return a }, {})
  const scaleFor = (ad: AdDef) => Math.min((window.innerHeight*0.9)/ad.h, (window.innerWidth*0.9)/ad.w)

  return (
    <section style={{ marginTop: 56 }}>
      {open && (
        <div onClick={() => setOpen(null)} style={{ position:'fixed',inset:0,zIndex:9999,background:'rgba(0,0,0,0.95)',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <div onClick={e=>e.stopPropagation()} style={{ transform:`scale(${scaleFor(open)})`,transformOrigin:'center',pointerEvents:'none' }}><open.El /></div>
          <button onClick={() => setOpen(null)} style={{ position:'fixed',top:20,right:20,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'50%',width:40,height:40,color:'#fff',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>✕</button>
          <div style={{ position:'fixed',bottom:20,color:'#444',fontSize:12 }}>Klik di mana saja untuk tutup · {open.format}</div>
        </div>
      )}
      <div style={{ marginBottom:28 }}>
        <h2 style={{ color:'#fff',fontSize:20,fontWeight:800,letterSpacing:'-0.02em',marginBottom:4 }}>Google Ads — Static Images</h2>
        <p style={{ color:'#555',fontSize:13 }}>10 image creatives · 4 formats · Brand awareness</p>
      </div>
      <div style={{ display:'flex',flexDirection:'column',gap:40 }}>
        {FORMAT_ORDER.map(fmt => {
          const ads = byFmt[fmt]??[]; if (!ads.length) return null
          return (
            <div key={fmt}>
              <div style={{ color:'var(--signal)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:16,paddingBottom:10,borderBottom:'1px solid #1f1f1f' }}>
                {fmt} · {ads[0].format.split(' ')[1]}
              </div>
              <div style={{ display:'flex',gap:20,flexWrap:'wrap' }}>
                {ads.map(ad => { const s=PREVIEW_W/ad.w; return (
                  <div key={ad.id}>
                    <div onClick={() => setOpen(ad)} style={{ width:PREVIEW_W,height:ad.h*s,overflow:'hidden',borderRadius:8,cursor:'pointer',position:'relative' }}>
                      <div style={{ width:ad.w,height:ad.h,transform:`scale(${s})`,transformOrigin:'top left',position:'absolute' }}><ad.El /></div>
                    </div>
                    <div style={{ marginTop:8,color:'#555',fontSize:11,textAlign:'center' }}>{ad.label.split(' — ')[1]}</div>
                    <button onClick={() => setOpen(ad)} style={{ marginTop:6,width:PREVIEW_W,background:'#161616',border:'1px solid #2a2a2a',borderRadius:8,color:'#aaa',fontSize:12,fontWeight:600,padding:'7px 0',cursor:'pointer' }}>Layar Penuh</button>
                  </div>
                )})}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
