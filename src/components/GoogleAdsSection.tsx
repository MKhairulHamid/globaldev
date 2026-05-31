// Static image creatives for Google Ads — 10 formats
// Render at exact pixel size; parent wraps in a scaled container for preview.

import React, { useState } from 'react'

// ── Shared brand tokens ──────────────────────────────────────────────────────
const SPARK   = '#FF5A1F'
const SIGNAL  = '#7B6CFF'
const BG      = '#0a0a0a'
const SURF1   = '#111111'
const SURF2   = '#161616'
const BORDER  = '#2a2a2a'
const TEXT    = '#e5e5e5'
const MUTED   = '#a3a3a3'
const SUBTLE  = '#666666'

// ── Shared SVG components ────────────────────────────────────────────────────
function GlobeMark({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="10.5" stroke="white" strokeOpacity="0.15" strokeWidth="1.4"/>
      <ellipse cx="16" cy="16" rx="4.5" ry="10.5" stroke="white" strokeOpacity="0.1" strokeWidth="1.2"/>
      <line x1="5.5" y1="16" x2="26.5" y2="16" stroke="white" strokeOpacity="0.1" strokeWidth="1.2"/>
      <path d="M9.2 22.8 A 13.2 13.2 0 0 1 22.8 9.2" stroke="white" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="9.2" cy="22.8" r="3.4" fill={SPARK}/>
      <circle cx="22.8" cy="9.2" r="3.4" fill={SIGNAL}/>
    </svg>
  )
}

function GlobeMarkLarge({ size = 320, opacity = 0.12 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 320 320" fill="none" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <circle cx="160" cy="160" r="130" stroke="white" strokeOpacity={opacity} strokeWidth="2"/>
      <ellipse cx="160" cy="160" rx="52" ry="130" stroke="white" strokeOpacity={opacity * 0.6} strokeWidth="1.5"/>
      <ellipse cx="160" cy="160" rx="104" ry="130" stroke="white" strokeOpacity={opacity * 0.4} strokeWidth="1.2"/>
      <line x1="30" y1="160" x2="290" y2="160" stroke="white" strokeOpacity={opacity * 0.5} strokeWidth="1.5"/>
      <line x1="160" y1="30" x2="160" y2="290" stroke="white" strokeOpacity={opacity * 0.3} strokeWidth="1.2"/>
      <path d="M 92 228 A 132 132 0 0 1 228 92" stroke="white" strokeOpacity={opacity * 3} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="92" cy="228" r="12" fill={SPARK}/>
      <circle cx="228" cy="92" r="12" fill={SIGNAL}/>
    </svg>
  )
}

function Wordmark({ scale = 1 }: { scale?: number }) {
  const h = 20 * scale
  const w = 206 * scale
  return (
    <svg width={w} height={h} viewBox="0 0 206 20" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke="white" strokeWidth="1"/>
      <ellipse cx="10" cy="10" rx="3.2" ry="6.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.9"/>
      <line x1="3.5" y1="10" x2="16.5" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="0.9"/>
      <circle cx="15.5" cy="4.5" r="2" fill={SIGNAL}/>
      <text x="23" y="14" fontFamily="'Inter', system-ui, sans-serif" fontSize="11.5" fontWeight="400" letterSpacing="-0.2" fill="white">Global</text>
      <text x="61" y="14" fontFamily="'Inter', system-ui, sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="-0.2" fill="white">Developer</text>
      <text x="126" y="14" fontFamily="'Inter', system-ui, sans-serif" fontSize="11.5" fontWeight="400" letterSpacing="-0.2" fill="white">Academy</text>
    </svg>
  )
}

// ── Shared helper styles ─────────────────────────────────────────────────────
const sg = (sz: number, w: number | string = 800, color = '#fff', ls = '-0.03em'): React.CSSProperties => ({
  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
  fontSize: sz,
  fontWeight: w as number,
  color,
  letterSpacing: ls,
  lineHeight: 1.1,
})

const inter = (sz: number, w: number | string = 400, color = MUTED): React.CSSProperties => ({
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: sz,
  fontWeight: w as number,
  color,
  lineHeight: 1.6,
})

// ══════════════════════════════════════════════════════════════════════════════
// LANDSCAPE 1 — 1200 × 628 — Awareness · "Tutorial Hell" (text-heavy)
// ══════════════════════════════════════════════════════════════════════════════
function L1() {
  return (
    <div style={{ width: 1200, height: 628, background: 'linear-gradient(135deg,#0d0d0d 40%,#1c0800 100%)', position: 'relative', display: 'flex', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Background globe */}
      <div style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)' }}>
        <GlobeMarkLarge size={480} opacity={0.07}/>
      </div>

      {/* Left content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 72px', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{ ...inter(18, 700, SIGNAL), letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 28 }}>
          Global Developer Academy
        </div>

        {/* Headline */}
        <div style={{ ...sg(72, 800), marginBottom: 24, maxWidth: 620 }}>
          Stuck di<br/>
          <span style={{ color: SPARK }}>Tutorial Hell?</span>
        </div>

        {/* Sub */}
        <div style={{ ...inter(26, 400, MUTED), maxWidth: 540, marginBottom: 48, lineHeight: 1.55 }}>
          4 minggu. Dari nol sampai aplikasi full stack yang beneran online.
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ background: SPARK, borderRadius: 14, padding: '18px 40px', ...inter(22, 800, '#fff'), letterSpacing: '-0.01em' }}>
            Daftar Sekarang →
          </div>
          <div style={{ ...inter(20, 600, SUBTLE) }}>
            Rp 899.000 · 11 Juni 2026
          </div>
        </div>
      </div>

      {/* Right: quote card */}
      <div style={{ width: 340, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px 60px 0', position: 'relative', zIndex: 1, gap: 20 }}>
        {['Nonton tutorial', 'Coba ngoding sendiri', 'Blank.', ''].map((t, i) =>
          i < 3 ? (
            <div key={i} style={{
              background: i === 2 ? `${SPARK}18` : SURF2,
              border: `1px solid ${i === 2 ? `${SPARK}40` : BORDER}`,
              borderRadius: 14, padding: '18px 22px',
              ...inter(18, i === 2 ? 800 : 500, i === 2 ? SPARK : TEXT),
            }}>
              {i < 2 && <span style={{ color: '#4ade80', marginRight: 10 }}>✓</span>}
              {i === 2 && <span style={{ marginRight: 10 }}>💭</span>}
              {t}
            </div>
          ) : null
        )}
        <div style={{ ...inter(15, 500, SUBTLE), paddingTop: 8 }}>
          Cara keluar? Bangun aplikasi nyata.
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <Wordmark scale={1.3} />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${SPARK}, ${SIGNAL})` }}/>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDSCAPE 2 — 1200 × 628 — Education · "Stack" (mixed)
// ══════════════════════════════════════════════════════════════════════════════
function L2() {
  const stack = [
    { name: 'React', color: '#60a5fa', desc: 'UI interaktif yang cepat. Dipakai Gojek, Tokopedia.' },
    { name: 'TypeScript', color: '#a78bfa', desc: 'Bug ketahuan sejak di editor, sebelum ke user.' },
    { name: 'Supabase', color: '#34d399', desc: 'Database, auth, dan storage — siap pakai hari ini.' },
  ]
  return (
    <div style={{ width: 1200, height: 628, background: 'linear-gradient(160deg,#070b14,#0a1222)', position: 'relative', display: 'flex', overflow: 'hidden' }}>
      {/* Dot grid background */}
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.04 }} width="1200" height="628">
        {Array.from({ length: 25 }).map((_, r) =>
          Array.from({ length: 50 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={c * 26 + 13} cy={r * 26 + 13} r="1.5" fill="white"/>
          ))
        )}
      </svg>

      {/* Left: headline */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px', position: 'relative', zIndex: 1 }}>
        <div style={{ ...inter(16, 700, SIGNAL), letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 22 }}>
          Stack Bootcamp
        </div>
        <div style={{ ...sg(60, 800, '#fff'), marginBottom: 18 }}>
          Tiga tools.<br/>
          Satu alur kerja<br/>
          yang rapi.
        </div>
        <div style={{ ...inter(20, 400, MUTED), maxWidth: 380 }}>
          Stack yang dipakai developer profesional Indonesia — mulai dari startup hingga enterprise.
        </div>
        <div style={{ marginTop: 40 }}>
          <Wordmark scale={1.4}/>
        </div>
      </div>

      {/* Right: stack cards */}
      <div style={{ width: 420, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 56px 60px 0', gap: 16, position: 'relative', zIndex: 1 }}>
        {stack.map(({ name, color, desc }) => (
          <div key={name} style={{ background: `${color}0d`, border: `1px solid ${color}30`, borderRadius: 16, padding: '22px 26px' }}>
            <div style={{ ...inter(26, 800, color), marginBottom: 8 }}>{name}</div>
            <div style={{ ...inter(15, 400, '#9ca3af') }}>{desc}</div>
          </div>
        ))}
        <div style={{ marginTop: 8, ...inter(15, 600, SUBTLE) }}>
          globaldev.sbs
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, #60a5fa, #a78bfa, #34d399)` }}/>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDSCAPE 3 — 1200 × 628 — Hard Sell · "Price" (minimal text)
// ══════════════════════════════════════════════════════════════════════════════
function L3() {
  return (
    <div style={{ width: 1200, height: 628, background: BG, position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Orange blob */}
      <div style={{ position: 'absolute', right: -40, top: -40, width: 420, height: 420, background: `radial-gradient(circle at 60% 40%, ${SPARK}30 0%, transparent 70%)`, borderRadius: '50%' }}/>
      <div style={{ position: 'absolute', left: -60, bottom: -60, width: 300, height: 300, background: `radial-gradient(circle, ${SIGNAL}15 0%, transparent 70%)`, borderRadius: '50%' }}/>

      {/* Left: mark + brand */}
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px', position: 'relative', zIndex: 1, gap: 24 }}>
        <GlobeMark size={160}/>
        <Wordmark scale={1.2}/>
        <div style={{ ...inter(15, 500, SUBTLE) }}>globaldev.sbs</div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 300, background: BORDER, flexShrink: 0 }}/>

      {/* Center: price */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, gap: 16 }}>
        <div style={{ ...inter(16, 700, SUBTLE), letterSpacing: '0.1em', textTransform: 'uppercase' }}>Full Stack Bootcamp</div>
        <div style={{ ...sg(96, 800, '#fff'), letterSpacing: '-0.04em', lineHeight: 1 }}>
          Rp 899<span style={{ color: SPARK }}>.000</span>
        </div>
        <div style={{ ...inter(17, 400, SUBTLE), textDecoration: 'line-through' }}>Rp 1.500.000</div>
        <div style={{ ...inter(18, 600, MUTED), textAlign: 'center', lineHeight: 1.7 }}>
          10 sesi live · 4 minggu<br/>React + TypeScript + Supabase
        </div>
      </div>

      {/* Right: CTA */}
      <div style={{ width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px', position: 'relative', zIndex: 1, gap: 16 }}>
        <div style={{ background: SPARK, borderRadius: 16, padding: '20px 32px', textAlign: 'center', ...inter(20, 800, '#fff') }}>
          Daftar<br/>Sekarang →
        </div>
        <div style={{ ...inter(15, 500, SUBTLE), textAlign: 'center' }}>Mulai 11 Juni 2026<br/>Hanya 30 kursi</div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SQUARE 1 — 1200 × 1200 — Brand · "Statement" (text-heavy)
// ══════════════════════════════════════════════════════════════════════════════
function S1() {
  const features = ['10 sesi live', '4 minggu', '30 kursi', 'React + TS + Supabase']
  return (
    <div style={{ width: 1200, height: 1200, background: BG, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 120px', overflow: 'hidden', textAlign: 'center' }}>
      {/* Background radial */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, background: `radial-gradient(ellipse, ${SPARK}0a 0%, transparent 70%)`, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: -100, right: -100 }}>
        <GlobeMarkLarge size={500} opacity={0.06}/>
      </div>

      {/* Top: Globe */}
      <div style={{ marginBottom: 40 }}>
        <GlobeMark size={180}/>
      </div>

      {/* Brand */}
      <div style={{ ...inter(20, 700, SIGNAL), letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 32 }}>
        Global Developer Academy
      </div>

      {/* Headline */}
      <div style={{ ...sg(76, 800, '#fff'), marginBottom: 28, maxWidth: 800 }}>
        Mulai dari nol.
      </div>
      <div style={{ ...sg(66, 700, SPARK), marginBottom: 48, maxWidth: 800 }}>
        Selesai dengan aplikasi yang beneran jalan.
      </div>

      {/* Feature chips */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
        {features.map(f => (
          <span key={f} style={{ background: SURF2, border: `1px solid ${BORDER}`, borderRadius: 99, padding: '10px 24px', ...inter(17, 600, MUTED) }}>
            {f}
          </span>
        ))}
      </div>

      {/* Price + CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ background: SPARK, borderRadius: 18, padding: '22px 60px', ...inter(24, 800, '#fff') }}>
          Daftar · Rp 899.000 →
        </div>
        <div style={{ ...inter(18, 500, SUBTLE) }}>
          Mulai 11 Juni 2026 · globaldev.sbs
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${SPARK}, ${SIGNAL})` }}/>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SQUARE 2 — 1200 × 1200 — Education · "Curriculum" (mixed)
// ══════════════════════════════════════════════════════════════════════════════
function S2Component() {
  const items = [
    { icon: '🔐', title: 'Autentikasi', desc: 'Login, register, dan session management dengan Supabase Auth' },
    { icon: '📋', title: 'Booking System', desc: 'Form booking, manajemen jadwal, dan konfirmasi real-time' },
    { icon: '💳', title: 'Pembayaran', desc: 'Alur transfer manual + admin dashboard verifikasi' },
    { icon: '📊', title: 'Admin Dashboard', desc: 'Kelola pesanan, user, dan data langsung dari web' },
  ]
  return (
    <div style={{ width: 1200, height: 1200, background: '#0d0d12', position: 'relative', display: 'flex', flexDirection: 'column', padding: '80px 100px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: `radial-gradient(circle at top right, ${SIGNAL}12 0%, transparent 70%)` }}/>

      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ ...inter(17, 700, SIGNAL), letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
          Yang Akan Kamu Bangun
        </div>
        <div style={{ ...sg(64, 800, '#fff') }}>
          Satu aplikasi<br/>
          <span style={{ color: SPARK }}>booking bisnis</span><br/>
          yang nyata.
        </div>
      </div>

      {/* 2×2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1 }}>
        {items.map(({ icon, title, desc }) => (
          <div key={title} style={{ background: SURF2, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 40 }}>{icon}</div>
            <div style={{ ...inter(22, 700, TEXT) }}>{title}</div>
            <div style={{ ...inter(16, 400, SUBTLE), lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark scale={1.4}/>
        <div style={{ display: 'flex', gap: 12 }}>
          {['React', 'TypeScript', 'Supabase'].map((t, i) => (
            <span key={t} style={{ background: [SPARK, '#a78bfa', '#34d399'][i] + '18', border: `1px solid ${['#60a5fa', '#a78bfa', '#34d399'][i]}40`, color: ['#60a5fa', '#a78bfa', '#34d399'][i], borderRadius: 8, padding: '6px 16px', ...inter(14, 700) }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SQUARE 3 — 1200 × 1200 — Nurturing · "Instructor" (visual-dominant)
// ══════════════════════════════════════════════════════════════════════════════
function S3() {
  return (
    <div style={{ width: 1200, height: 1200, background: 'linear-gradient(160deg,#0a0a0a,#0e0b18)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '80px 100px' }}>
      {/* Large background globe */}
      <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)' }}>
        <GlobeMarkLarge size={900} opacity={0.06}/>
      </div>

      {/* Centre avatar */}
      <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, zIndex: 1 }}>
        <div style={{ width: 180, height: 180, borderRadius: '50%', background: `linear-gradient(135deg, ${SPARK}30, ${SIGNAL}30)`, border: `2px solid ${SPARK}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...sg(72, 800, '#fff') }}>
          MH
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...inter(22, 700, TEXT) }}>M. Khairul Hamid</div>
          <div style={{ ...inter(17, 500, SUBTLE) }}>Full Stack Developer · Australia-based</div>
        </div>

        {/* Connection arc illustration */}
        <svg width="400" height="100" viewBox="0 0 400 100" fill="none" style={{ marginTop: 16 }}>
          <path d="M 60 80 Q 200 20 340 80" stroke={SIGNAL} strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 4" fill="none"/>
          <circle cx="60" cy="80" r="10" fill={SPARK}/>
          <text x="40" y="100" textAnchor="middle" fill={SPARK} fontSize="13" fontFamily="Inter" fontWeight="600">Indonesia</text>
          <circle cx="340" cy="80" r="10" fill={SIGNAL}/>
          <text x="355" y="100" textAnchor="middle" fill={SIGNAL} fontSize="13" fontFamily="Inter" fontWeight="600">Australia</text>
        </svg>
      </div>

      {/* Bottom quote */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ borderLeft: `3px solid ${SPARK}`, paddingLeft: 28, marginBottom: 40 }}>
          <div style={{ ...sg(40, 700, '#fff'), marginBottom: 12 }}>
            "Nggak ada yang nanya<br/>saya lulusan mana."
          </div>
          <div style={{ ...inter(18, 400, MUTED) }}>
            Mereka cuma lihat aplikasi yang saya bangun.<br/>
            Sekarang giliran saya bantu kamu sampai ke sana.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Wordmark scale={1.4}/>
          <div style={{ ...inter(17, 600, SUBTLE) }}>globaldev.sbs</div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTRAIT 1 — 960 × 1200 — Urgency · "Date & Seats" (text-heavy)
// ══════════════════════════════════════════════════════════════════════════════
function P1() {
  return (
    <div style={{ width: 960, height: 1200, background: 'linear-gradient(170deg,#0d0500,#1a0a00)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 80px', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)' }}>
        <GlobeMarkLarge size={700} opacity={0.07}/>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {/* Badge */}
        <div style={{ background: `${SPARK}18`, border: `1px solid ${SPARK}44`, borderRadius: 99, padding: '10px 28px', ...inter(15, 700, SPARK), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 40 }}>
          Pendaftaran dibuka
        </div>

        {/* Date */}
        <div style={{ ...inter(20, 600, MUTED), marginBottom: 12 }}>Kelas dimulai</div>
        <div style={{ ...sg(80, 800, '#fff'), marginBottom: 32, letterSpacing: '-0.04em' }}>
          11 Juni<br/>2026
        </div>

        {/* Divider */}
        <div style={{ width: 60, height: 3, background: SPARK, borderRadius: 2, marginBottom: 32 }}/>

        {/* Seats */}
        <div style={{ ...sg(52, 800, SPARK), marginBottom: 16 }}>Hanya 30 kursi.</div>
        <div style={{ ...inter(20, 400, MUTED), marginBottom: 56, maxWidth: 560 }}>
          Tiap cohort kami jaga kecil biar mentoring tetap intensif. Yang duluan daftar, yang dapat tempat.
        </div>

        {/* Features */}
        {['10 sesi live via Google Meet', 'Proyek booking app nyata', 'Mentor aktif di Discord'].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, width: '100%', maxWidth: 480 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${SPARK}20`, border: `1px solid ${SPARK}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: SPARK, fontSize: 14 }}>✓</span>
            </div>
            <div style={{ ...inter(18, 500, TEXT) }}>{f}</div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ marginTop: 40, background: SPARK, borderRadius: 16, padding: '22px 56px', ...inter(22, 800, '#fff') }}>
          Amankan Tempatmu →
        </div>

        <div style={{ marginTop: 40 }}>
          <Wordmark scale={1.3}/>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${SPARK}, ${SIGNAL})` }}/>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTRAIT 2 — 960 × 1200 — Pricing · "What you get" (mixed)
// ══════════════════════════════════════════════════════════════════════════════
function P2() {
  const includes = [
    '10 sesi live via Google Meet (~20 jam)',
    'Proyek aplikasi booking bisnis nyata',
    'Komunitas Discord khusus peserta',
    'Code review langsung dari instruktur',
    'Rekaman semua sesi (akses seumur hidup)',
    'Sertifikat digital + LinkedIn credential',
  ]
  return (
    <div style={{ width: 960, height: 1200, background: BG, position: 'relative', display: 'flex', flexDirection: 'column', padding: '80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -80, right: -80 }}>
        <GlobeMarkLarge size={500} opacity={0.05}/>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <Wordmark scale={1.3}/>
        <div style={{ marginTop: 40, ...inter(17, 700, SIGNAL), letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
          Biaya Ikut Bootcamp
        </div>
        <div style={{ ...inter(20, 500, MUTED), textDecoration: 'line-through', marginBottom: 6 }}>Rp 1.500.000</div>
        <div style={{ ...sg(80, 800, '#fff'), letterSpacing: '-0.04em', lineHeight: 1 }}>
          Rp<span style={{ color: SPARK }}> 899</span>.000
        </div>
        <div style={{ ...inter(17, 500, SUBTLE), marginTop: 10 }}>Mulai 11 Juni 2026 · Hanya 30 kursi</div>
      </div>

      {/* Includes */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{ ...inter(18, 700, TEXT), marginBottom: 24 }}>Apa yang kamu dapat:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {includes.map(item => (
            <div key={item} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#4ade8020', border: '1px solid #4ade8040', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: '#4ade80', fontSize: 13 }}>✓</span>
              </div>
              <div style={{ ...inter(17, 500, MUTED), lineHeight: 1.5 }}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 48, position: 'relative', zIndex: 1 }}>
        <div style={{ background: SPARK, borderRadius: 16, padding: '22px 0', textAlign: 'center', ...inter(22, 800, '#fff'), marginBottom: 16 }}>
          Daftar Sekarang →
        </div>
        <div style={{ ...inter(16, 500, SUBTLE), textAlign: 'center' }}>globaldev.sbs</div>
      </div>

      <div style={{ position: 'absolute', top: 0, right: 0, width: 5, height: '100%', background: `linear-gradient(180deg, ${SPARK}, ${SIGNAL})` }}/>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TALL 1 — 1080 × 1920 — Story · "Full Journey" (text-heavy)
// ══════════════════════════════════════════════════════════════════════════════
function T1() {
  const sessions = [
    { n: '01–02', label: 'Fondasi React + TypeScript' },
    { n: '03–04', label: 'Komponen, State & Supabase' },
    { n: '05–06', label: 'Auth, Booking & Database' },
    { n: '07–08', label: 'Pembayaran & Admin Panel' },
    { n: '09–10', label: 'Deploy & Polish' },
  ]
  return (
    <div style={{ width: 1080, height: 1920, background: BG, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${SPARK}, ${SIGNAL})`, flexShrink: 0 }}/>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '72px 80px', gap: 0 }}>

        {/* Logo */}
        <div style={{ marginBottom: 60 }}>
          <Wordmark scale={1.6}/>
        </div>

        {/* Section 1: Problem */}
        <div style={{ background: SURF1, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '44px 48px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ ...inter(15, 700, SUBTLE), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Masalah yang familiar?</div>
          <div style={{ ...sg(46, 800, '#fff'), marginBottom: 16 }}>
            Ratusan jam tutorial.<br/>
            <span style={{ color: SPARK }}>Nggak ada yang jadi.</span>
          </div>
          <div style={{ ...inter(18, 400, MUTED) }}>
            Tutorial mengajari syntax. Tapi bikin aplikasi dari nol butuh sesuatu yang lain — pengalaman nyata, proyek nyata.
          </div>
          <div style={{ position: 'absolute', right: 32, bottom: 24, fontSize: 48, opacity: 0.1 }}>💭</div>
        </div>

        {/* Section 2: Solution */}
        <div style={{ background: `${SPARK}0e`, border: `1px solid ${SPARK}30`, borderRadius: 20, padding: '44px 48px', marginBottom: 28 }}>
          <div style={{ ...inter(15, 700, SPARK), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Solusi</div>
          <div style={{ ...sg(46, 800, '#fff'), marginBottom: 16 }}>
            4 minggu bersama kami.<br/>
            <span style={{ color: SPARK }}>1 aplikasi nyata.</span>
          </div>
          <div style={{ ...inter(18, 400, MUTED) }}>
            Bukan ngikutin kode dari video. Kamu ikut sesi live, tanya langsung, dan bangun project yang kamu kontrol sendiri.
          </div>
        </div>

        {/* Section 3: Curriculum */}
        <div style={{ background: SURF1, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '44px 48px', marginBottom: 28 }}>
          <div style={{ ...inter(15, 700, SIGNAL), letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>Kurikulum · 10 Sesi</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {sessions.map(({ n, label }) => (
              <div key={n} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ background: `${SIGNAL}18`, border: `1px solid ${SIGNAL}40`, borderRadius: 8, padding: '4px 14px', ...inter(14, 700, SIGNAL), fontFamily: 'monospace', flexShrink: 0 }}>
                  {n}
                </div>
                <div style={{ ...inter(18, 600, TEXT) }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ ...inter(16, 500, MUTED), textDecoration: 'line-through', marginBottom: 4 }}>Rp 1.500.000</div>
              <div style={{ ...sg(68, 800, '#fff'), letterSpacing: '-0.04em' }}>Rp <span style={{ color: SPARK }}>899</span>.000</div>
              <div style={{ ...inter(16, 500, SUBTLE), marginTop: 6 }}>Mulai 11 Juni 2026 · 30 kursi</div>
            </div>
            <GlobeMark size={90}/>
          </div>
          <div style={{ background: SPARK, borderRadius: 16, padding: '24px 0', textAlign: 'center', ...inter(24, 800, '#fff') }}>
            Daftar Sekarang →
          </div>
          <div style={{ ...inter(16, 500, SUBTLE), textAlign: 'center' }}>globaldev.sbs</div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TALL 2 — 1080 × 1920 — Brand · "Visual Abstract" (visual-dominant)
// ══════════════════════════════════════════════════════════════════════════════
function T2() {
  return (
    <div style={{ width: 1080, height: 1920, background: 'linear-gradient(180deg,#0a0814 0%,#0d0d0d 50%,#0a0800 100%)', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Large visual: globe + connection */}
      <div style={{ flex: '0 0 960px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Concentric rings */}
        <svg width="1080" height="960" viewBox="0 0 1080 960" fill="none" style={{ position: 'absolute' }}>
          {[300, 220, 140, 60].map((r, i) => (
            <circle key={r} cx="540" cy="480" r={r} stroke="white" strokeOpacity={0.04 + i * 0.02} strokeWidth="1.5"/>
          ))}
          {/* Arc: Indonesia → Australia */}
          <path d="M 300 720 Q 540 240 780 720" stroke={`url(#arcGrad)`} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <defs>
            <linearGradient id="arcGrad" x1="300" y1="720" x2="780" y2="720" gradientUnits="userSpaceOnUse">
              <stop stopColor={SPARK}/>
              <stop offset="1" stopColor={SIGNAL}/>
            </linearGradient>
          </defs>
          {/* Dot nodes */}
          <circle cx="300" cy="720" r="18" fill={SPARK} fillOpacity="0.9"/>
          <circle cx="780" cy="720" r="18" fill={SIGNAL} fillOpacity="0.9"/>
          {/* Node labels */}
          <text x="300" y="760" textAnchor="middle" fill={SPARK} fontSize="20" fontFamily="Inter" fontWeight="600" fillOpacity="0.8">Indonesia</text>
          <text x="780" y="760" textAnchor="middle" fill={SIGNAL} fontSize="20" fontFamily="Inter" fontWeight="600" fillOpacity="0.8">Australia</text>
        </svg>

        {/* Center logo mark */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <GlobeMark size={320}/>
        </div>

        {/* Radial glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${SPARK}12 0%, transparent 70%)`, borderRadius: '50%' }}/>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, background: `radial-gradient(circle, ${SIGNAL}0d 0%, transparent 70%)`, borderRadius: '50%' }}/>
      </div>

      {/* Bottom content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 80px 80px', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...inter(16, 700, SIGNAL), letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>
            Global Developer Academy
          </div>
          <div style={{ ...sg(66, 800, '#fff'), marginBottom: 14 }}>
            Mulai dari nol.
          </div>
          <div style={{ ...sg(56, 700, SPARK) }}>
            Selesai dengan aplikasi nyata.
          </div>
        </div>

        {/* Stack tags */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['React', '#60a5fa'], ['TypeScript', '#a78bfa'], ['Supabase', '#34d399']].map(([t, c]) => (
            <span key={t} style={{ background: `${c}18`, border: `1px solid ${c}40`, color: c, borderRadius: 10, padding: '10px 24px', ...inter(16, 700) }}>
              {t}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ textAlign: 'center', ...sg(60, 800, '#fff'), letterSpacing: '-0.03em' }}>
            Rp <span style={{ color: SPARK }}>899</span>.000
          </div>
          <div style={{ background: SPARK, borderRadius: 16, padding: '26px 0', textAlign: 'center', ...inter(24, 800, '#fff') }}>
            Daftar Sekarang →
          </div>
          <div style={{ ...inter(17, 500, SUBTLE), textAlign: 'center' }}>
            Mulai 11 Juni 2026 · 30 kursi · globaldev.sbs
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${SIGNAL}, ${SPARK})` }}/>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Catalog
// ══════════════════════════════════════════════════════════════════════════════
export type AdDef = {
  id: string
  label: string
  format: string
  w: number
  h: number
  El: React.FC
}

export const GOOGLE_ADS: AdDef[] = [
  { id: 'l1', label: 'L1 — Tutorial Hell',   format: 'Landscape 1200×628',   w: 1200, h: 628,  El: L1 },
  { id: 'l2', label: 'L2 — Stack',           format: 'Landscape 1200×628',   w: 1200, h: 628,  El: L2 },
  { id: 'l3', label: 'L3 — Price',           format: 'Landscape 1200×628',   w: 1200, h: 628,  El: L3 },
  { id: 's1', label: 'S1 — Brand Statement', format: 'Square 1200×1200',     w: 1200, h: 1200, El: S1 },
  { id: 's2', label: 'S2 — Curriculum',      format: 'Square 1200×1200',     w: 1200, h: 1200, El: S2Component },
  { id: 's3', label: 'S3 — Instructor',      format: 'Square 1200×1200',     w: 1200, h: 1200, El: S3 },
  { id: 'p1', label: 'P1 — Urgency',         format: 'Portrait 960×1200',    w: 960,  h: 1200, El: P1 },
  { id: 'p2', label: 'P2 — Pricing',         format: 'Portrait 960×1200',    w: 960,  h: 1200, El: P2 },
  { id: 't1', label: 'T1 — Full Journey',    format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T1 },
  { id: 't2', label: 'T2 — Abstract Brand',  format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T2 },
]

// Preview scale: target preview width ~280px
const PREVIEW_W = 280

function AdPreview({ ad }: { ad: AdDef }) {
  const [fullscreen, setFullscreen] = useState(false)
  const scale = PREVIEW_W / ad.w
  const previewH = ad.h * scale

  const scaleFS = Math.min(
    (window.innerHeight * 0.9) / ad.h,
    (window.innerWidth * 0.9) / ad.w,
  )

  return (
    <div>
      {/* Fullscreen modal */}
      {fullscreen && (
        <div
          onClick={() => setFullscreen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ transform: `scale(${scaleFS})`, transformOrigin: 'center center', pointerEvents: 'none' }}>
            <ad.El />
          </div>
          <button
            onClick={() => setFullscreen(false)}
            style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 44, height: 44, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
          >
            ✕
          </button>
          <div style={{ position: 'fixed', bottom: 24, color: '#444', fontSize: 12 }}>Klik di mana saja untuk tutup · {ad.format}</div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 10, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ color: SPARK, fontSize: 12, fontWeight: 800 }}>{ad.id.toUpperCase()}</span>
        <span style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{ad.label.split(' — ')[1]}</span>
        <span style={{ color: '#444', fontSize: 10, marginLeft: 'auto' }}>{ad.format.split(' ')[1]}</span>
      </div>

      {/* Scaled preview */}
      <div style={{ width: PREVIEW_W, height: previewH, overflow: 'hidden', position: 'relative', borderRadius: 8 }}>
        <div style={{ width: ad.w, height: ad.h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          <ad.El />
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setFullscreen(true)}
        style={{ marginTop: 8, width: PREVIEW_W, background: SURF2, border: `1px solid ${BORDER}`, borderRadius: 8, color: '#aaa', fontSize: 12, fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}
      >
        Layar Penuh
      </button>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function GoogleAdsSection() {
  const groups = [
    { label: 'Landscape · 1200 × 628 (1.91:1)', ids: ['l1', 'l2', 'l3'] },
    { label: 'Square · 1200 × 1200 (1:1)',       ids: ['s1', 's2', 's3'] },
    { label: 'Portrait · 960 × 1200 (4:5)',       ids: ['p1', 'p2'] },
    { label: 'Tall · 1080 × 1920 (9:16)',         ids: ['t1', 't2'] },
  ]

  return (
    <section style={{ marginTop: 56 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Google Ads — Static Images
        </h2>
        <p style={{ color: '#555', fontSize: 13 }}>
          10 image creatives · 4 formats · Klik "Layar Penuh" untuk screenshot / screen record
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {groups.map(({ label, ids }) => {
          const ads = ids.map(id => GOOGLE_ADS.find(a => a.id === id)!)
          return (
            <div key={label}>
              <div style={{ color: SIGNAL, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid #1f1f1f` }}>
                {label}
              </div>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {ads.map(ad => <AdPreview key={ad.id} ad={ad} />)}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
