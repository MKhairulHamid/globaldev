// Google Ads static image creatives — redesigned per Google guidelines
// ✓ Visual-first (authentic app mockups)   ✓ No fake buttons
// ✓ Focal point centered                   ✓ No text overload
// ✓ Brand colours                          ✓ No CTAs in image

import React, { useState } from 'react'

// ── Brand tokens ─────────────────────────────────────────────────────────────
const SPARK  = '#FF5A1F'
const SIGNAL = '#7B6CFF'
const BG     = '#0a0a0a'
const SURF1  = '#111111'
const SURF2  = '#161616'
const SURF3  = '#1c1c1c'
const BORDER = '#2a2a2a'
const TEXT   = '#e5e5e5'
const SUBTLE = '#666666'

// ── Shared micro-components ──────────────────────────────────────────────────

function GlobeMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="10.5" stroke="white" strokeOpacity="0.15" strokeWidth="1.4"/>
      <ellipse cx="16" cy="16" rx="4.5" ry="10.5" stroke="white" strokeOpacity="0.08" strokeWidth="1.2"/>
      <line x1="5.5" y1="16" x2="26.5" y2="16" stroke="white" strokeOpacity="0.08" strokeWidth="1.2"/>
      <path d="M9.2 22.8 A 13.2 13.2 0 0 1 22.8 9.2" stroke="white" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="9.2" cy="22.8" r="3.4" fill={SPARK}/>
      <circle cx="22.8" cy="9.2" r="3.4" fill={SIGNAL}/>
    </svg>
  )
}

function BrandMark({ size = 40 }: { size?: number }) {
  const h = size
  const w = (206 / 20) * h
  return (
    <svg width={w} height={h} viewBox="0 0 206 20" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke="white" strokeWidth="1"/>
      <ellipse cx="10" cy="10" rx="3.2" ry="6.5" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9"/>
      <line x1="3.5" y1="10" x2="16.5" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9"/>
      <circle cx="15.5" cy="4.5" r="2" fill={SIGNAL}/>
      <text x="23" y="14" fontFamily="'Inter',system-ui,sans-serif" fontSize="11.5" fontWeight="400" fill="white">Global</text>
      <text x="61" y="14" fontFamily="'Inter',system-ui,sans-serif" fontSize="11.5" fontWeight="700" fill="white">Developer</text>
      <text x="126" y="14" fontFamily="'Inter',system-ui,sans-serif" fontSize="11.5" fontWeight="400" fill="white">Academy</text>
    </svg>
  )
}

type BookingStatus = 'confirmed' | 'waiting' | 'pending'
function StatusBadge({ status }: { status: BookingStatus }) {
  const m = {
    confirmed: { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.3)', label: 'Terkonfirmasi' },
    waiting:   { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)', label: 'Menunggu' },
    pending:   { color: SUBTLE,    bg: 'rgba(255,255,255,0.05)', border: BORDER,                 label: 'Belum bayar' },
  }[status]
  return (
    <span style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}`, borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: "'Inter',sans-serif" }}>
      {m.label}
    </span>
  )
}

// Browser chrome frame
function BrowserFrame({ width, height, url = 'globaldev.sbs/dashboard', children }: {
  width: number; height: number; url?: string; children: React.ReactNode
}) {
  return (
    <div style={{ width, height, background: SURF2, borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 38, background: SURF3, borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }}/>)}
        </div>
        <div style={{ flex: 1, background: '#252525', borderRadius: 5, height: 22, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
          <span style={{ color: SUBTLE, fontSize: 11, fontFamily: "'Inter',sans-serif" }}>🔒 {url}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

// Phone frame
function PhoneFrame({ width, children }: { width: number; children: React.ReactNode }) {
  const height = width * 2.1
  return (
    <div style={{ width, height, background: '#1a1a1a', borderRadius: width * 0.12, border: `${width * 0.025}px solid #333`, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: width * 0.28, height: width * 0.06, background: '#0a0a0a', borderRadius: '0 0 10px 10px', zIndex: 10 }}/>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: BG }}>
        {children}
      </div>
    </div>
  )
}

// Booking rows data
const BOOKINGS: { name: string; init: string; color: string; status: BookingStatus; date: string }[] = [
  { name: 'Andi Pratama',   init: 'AP', color: '#60a5fa', status: 'confirmed', date: '11 Jun 2026' },
  { name: 'Siti Rahayu',    init: 'SR', color: '#f472b6', status: 'waiting',   date: '11 Jun 2026' },
  { name: 'Budi Santoso',   init: 'BS', color: '#34d399', status: 'confirmed', date: '11 Jun 2026' },
  { name: 'Diana Kusuma',   init: 'DK', color: '#a78bfa', status: 'pending',   date: '12 Jun 2026' },
  { name: 'Rizki Putra',    init: 'RP', color: '#fb923c', status: 'waiting',   date: '12 Jun 2026' },
  { name: 'Lena Wulandari', init: 'LW', color: '#22d3ee', status: 'confirmed', date: '12 Jun 2026' },
]

// Meet participants
const PARTICIPANTS = [
  { init: 'AP', color: '#60a5fa', name: 'Andi P.' },
  { init: 'SR', color: '#f472b6', name: 'Siti R.' },
  { init: 'BS', color: '#34d399', name: 'Budi S.' },
  { init: 'DK', color: '#a78bfa', name: 'Diana K.' },
  { init: 'RP', color: '#fb923c', name: 'Rizki P.' },
  { init: 'MH', color: SPARK,     name: 'MH (host)' },
]

// ── Syntax-coloured code lines ────────────────────────────────────────────────
const kw  = (t: string) => <span style={{ color: '#c792ea' }}>{t}</span>
const str = (t: string) => <span style={{ color: '#c3e88d' }}>{t}</span>
const typ = (t: string) => <span style={{ color: '#82aaff' }}>{t}</span>
const fn  = (t: string) => <span style={{ color: '#82aaff' }}>{t}</span>
const cm  = (t: string) => <span style={{ color: '#546e7a' }}>{t}</span>
const op  = (t: string) => <span style={{ color: '#89ddff' }}>{t}</span>
const df  = (t: string) => <span style={{ color: '#d6deeb' }}>{t}</span>

// Full booking dashboard UI (reused across multiple ads)
function DashboardUI({ scale = 1 }: { scale?: number }) {
  const fs = (n: number) => n * scale
  return (
    <div style={{ background: BG, width: '100%', height: '100%', fontFamily: "'Inter',sans-serif", display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: fs(200), background: SURF1, borderRight: `1px solid ${BORDER}`, flexShrink: 0, padding: fs(20) }}>
        <div style={{ marginBottom: fs(24) }}>
          <GlobeMark size={fs(28)} />
        </div>
        {[
          { label: 'Dashboard', active: false },
          { label: 'Pendaftaran', active: true },
          { label: 'Pembayaran', active: false },
          { label: 'Peserta', active: false },
          { label: 'Pengaturan', active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{ padding: `${fs(8)}px ${fs(12)}px`, borderRadius: fs(8), marginBottom: fs(4), background: active ? `${SPARK}18` : 'none', color: active ? SPARK : SUBTLE, fontSize: fs(13), fontWeight: active ? 700 : 400 }}>
            {label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: fs(24), overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ marginBottom: fs(20) }}>
          <div style={{ color: TEXT, fontSize: fs(18), fontWeight: 800, letterSpacing: '-0.02em', marginBottom: fs(4) }}>Pendaftaran</div>
          <div style={{ color: SUBTLE, fontSize: fs(12) }}>Cohort Juni 2026</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: fs(12), marginBottom: fs(20) }}>
          {[
            { label: 'Terdaftar', value: '23', color: TEXT },
            { label: 'Terkonfirmasi', value: '15', color: '#4ade80' },
            { label: 'Menunggu', value: '5', color: '#fbbf24' },
            { label: 'Kursi sisa', value: '7', color: SPARK },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: SURF2, border: `1px solid ${BORDER}`, borderRadius: fs(10), padding: fs(14) }}>
              <div style={{ color, fontSize: fs(22), fontWeight: 800 }}>{value}</div>
              <div style={{ color: SUBTLE, fontSize: fs(11), marginTop: fs(2) }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: SURF1, border: `1px solid ${BORDER}`, borderRadius: fs(12), overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: `${fs(10)}px ${fs(16)}px`, borderBottom: `1px solid ${BORDER}`, color: SUBTLE, fontSize: fs(11), fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <span>Peserta</span><span>Tanggal</span><span>Status</span>
          </div>
          {BOOKINGS.map(({ name, init, color, status, date }) => (
            <div key={name} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: `${fs(11)}px ${fs(16)}px`, borderBottom: `1px solid ${BORDER}`, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: fs(10) }}>
                <div style={{ width: fs(28), height: fs(28), borderRadius: '50%', background: `${color}25`, border: `1px solid ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: fs(10), fontWeight: 800, flexShrink: 0 }}>{init}</div>
                <span style={{ color: TEXT, fontSize: fs(13), fontWeight: 500 }}>{name}</span>
              </div>
              <span style={{ color: SUBTLE, fontSize: fs(12) }}>{date}</span>
              <StatusBadge status={status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Code editor UI (reused)
function CodeEditorUI({ scale = 1 }: { scale?: number }) {
  const fs = (n: number) => n * scale
  const LINE_H = fs(22)
  const lines: React.ReactNode[] = [
    <>{cm('// src/lib/bookings.ts')}</>,
    <>{kw('import')} {op('{')} {df('supabase')} {op('}')} {kw('from')} {str("'./supabase'")}</>,
    <></>,
    <>{kw('interface')} {typ('Booking')} {op('{')}</>,
    <>&nbsp;&nbsp;{df('id')}{op(':')} {typ('string')}</>,
    <>&nbsp;&nbsp;{df('user_id')}{op(':')} {typ('string')}</>,
    <>&nbsp;&nbsp;{df('service')}{op(':')} {typ('string')}</>,
    <>&nbsp;&nbsp;{df('status')}{op(':')} {str("'pending'")} {op('|')} {str("'confirmed'")}</>,
    <>&nbsp;&nbsp;{df('amount')}{op(':')} {typ('number')}</>,
    <>{op('}')}</>,
    <></>,
    <>{kw('export async function')} {fn('getBookings')}{op('()')} {op('{')} </>,
    <>&nbsp;&nbsp;{kw('const')} {op('{')} {df('data')} {op('}')} {op('=')} {kw('await')} {df('supabase')}</>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;{op('.')} {fn('from')}{op('(')}{str("'bookings'")}{op(')')}</>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;{op('.')} {fn('select')}{op('(')}{str("'*, profiles(full_name)'")} {op(')')}</>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;{op('.')} {fn('order')}{op('(')}{str("'created_at'")} {op(',,')} {op('{')}{df(' ascending')}{op(':')} {kw('false')}{op('})')}</>,
    <></>,
    <>&nbsp;&nbsp;{kw('return')} {df('data')} {kw('as')} {typ('Booking[]')}</>,
    <>{op('}')}</>,
    <></>,
    <>{kw('export async function')} {fn('confirmPayment')}{op('(')}{df('id')}{op(': ')}{typ('string')}{op(')')} {op('{')}</>,
    <>&nbsp;&nbsp;{kw('await')} {df('supabase')}{op('.')}{fn('rpc')}{op('(')}{str("'confirm_payment'")}{op(', {')} {df('registration_id')}{op(': ')}{df('id')}{op(' })')}</>,
    <>{op('}')}</>,
  ]
  return (
    <div style={{ background: '#011627', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'Fira Code','SF Mono','Consolas',monospace" }}>
      {/* Tab bar */}
      <div style={{ height: fs(36), background: '#01111d', borderBottom: '1px solid #0d2137', display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
        {['bookings.ts', 'supabase.ts', 'BookingForm.tsx'].map((tab, i) => (
          <div key={tab} style={{ padding: `${fs(6)}px ${fs(16)}px`, fontSize: fs(12), color: i === 0 ? '#d6deeb' : '#546e7a', borderTop: i === 0 ? `1px solid ${SPARK}` : 'none', background: i === 0 ? '#011627' : 'transparent', borderRight: '1px solid #0d2137' }}>
            {tab}
          </div>
        ))}
      </div>
      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Line numbers */}
        <div style={{ width: fs(44), background: '#01111d', borderRight: '1px solid #0d2137', paddingTop: fs(12), flexShrink: 0, textAlign: 'right', paddingRight: fs(8) }}>
          {lines.map((_, i) => (
            <div key={i} style={{ height: LINE_H, lineHeight: `${LINE_H}px`, color: '#1d3b53', fontSize: fs(12) }}>{i + 1}</div>
          ))}
        </div>
        {/* Code */}
        <div style={{ flex: 1, paddingTop: fs(12), paddingLeft: fs(16), overflow: 'hidden' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ height: LINE_H, lineHeight: `${LINE_H}px`, fontSize: fs(13), whiteSpace: 'nowrap' }}>{line}</div>
          ))}
        </div>
        {/* Minimap */}
        <div style={{ width: fs(48), background: '#011627', borderLeft: '1px solid #0d2137', opacity: 0.4, flexShrink: 0, paddingTop: fs(12) }}>
          {lines.map((_, i) => (
            <div key={i} style={{ height: LINE_H * 0.35, margin: `${LINE_H * 0.1}px ${fs(4)}px`, background: '#1d3b53', borderRadius: 1 }}/>
          ))}
        </div>
      </div>
    </div>
  )
}

// Google Meet-style grid UI
function MeetUI({ scale = 1 }: { scale?: number }) {
  const fs = (n: number) => n * scale
  return (
    <div style={{ background: '#202124', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header bar */}
      <div style={{ height: fs(44), background: '#202124', borderBottom: '1px solid #3c4043', display: 'flex', alignItems: 'center', padding: `0 ${fs(16)}px`, gap: fs(12), flexShrink: 0 }}>
        <div style={{ width: fs(22), height: fs(22) }}><GlobeMark size={fs(22)} /></div>
        <span style={{ color: '#e8eaed', fontSize: fs(14), fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>Global Developer Academy — Sesi 03</span>
        <div style={{ marginLeft: 'auto', color: '#9aa0a6', fontSize: fs(12), fontFamily: "'Inter',sans-serif" }}>19.30 WIB</div>
      </div>

      {/* Video grid — 3×2 */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: fs(4), padding: fs(8) }}>
        {PARTICIPANTS.map(({ init, color, name }, i) => (
          <div key={init} style={{ background: '#3c4043', borderRadius: fs(8), position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: i === 5 ? `2px solid ${SPARK}` : 'none' }}>
            {i === 2
              ? /* screen share tile */
                <div style={{ width: '100%', height: '100%', background: '#011627', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: fs(10) }}>
                  <div style={{ color: '#82aaff', fontSize: fs(9), fontFamily: "monospace", lineHeight: 1.6, opacity: 0.85 }}>
                    {['.select(\'*\')', '.eq(\'status\',', '  \'confirmed\')', '.order(\'created_at\')', '  { ascending: false })'].map((l, j) => <div key={j}>{l}</div>)}
                  </div>
                </div>
              : <div style={{ width: fs(48), height: fs(48), borderRadius: '50%', background: `${color}25`, border: `2px solid ${color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: fs(16), fontWeight: 800, fontFamily: "'Inter',sans-serif" }}>{init}</div>
            }
            <div style={{ position: 'absolute', bottom: fs(6), left: fs(8), color: '#e8eaed', fontSize: fs(10), fontWeight: 500, fontFamily: "'Inter',sans-serif", background: 'rgba(0,0,0,0.5)', padding: `${fs(2)}px ${fs(6)}px`, borderRadius: fs(4) }}>{name}</div>
          </div>
        ))}
      </div>

      {/* Control bar */}
      <div style={{ height: fs(52), background: '#202124', borderTop: '1px solid #3c4043', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: fs(16), flexShrink: 0 }}>
        {['🎤', '📹', '💬', '👥', '⋯'].map(icon => (
          <div key={icon} style={{ width: fs(36), height: fs(36), borderRadius: '50%', background: '#3c4043', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fs(14) }}>{icon}</div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDSCAPE 1 — 1200 × 628 — Admin Dashboard
// ══════════════════════════════════════════════════════════════════════════════
function L1() {
  return (
    <div style={{ width: 1200, height: 628, background: BG, overflow: 'hidden', position: 'relative' }}>
      <DashboardUI scale={1.1}/>
      {/* Brand mark overlay — bottom-right corner, small */}
      <div style={{ position: 'absolute', bottom: 20, right: 24, opacity: 0.6 }}>
        <GlobeMark size={28}/>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDSCAPE 2 — 1200 × 628 — Code Editor
// ══════════════════════════════════════════════════════════════════════════════
function L2() {
  return (
    <div style={{ width: 1200, height: 628, overflow: 'hidden', position: 'relative' }}>
      <CodeEditorUI scale={1.15}/>
      <div style={{ position: 'absolute', bottom: 20, right: 24, opacity: 0.5 }}>
        <GlobeMark size={28}/>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// LANDSCAPE 3 — 1200 × 628 — Google Meet Live Session
// ══════════════════════════════════════════════════════════════════════════════
function L3() {
  return (
    <div style={{ width: 1200, height: 628, overflow: 'hidden' }}>
      <MeetUI scale={1.1}/>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SQUARE 1 — 1200 × 1200 — Dashboard in Browser Frame (centered)
// Google crops squares to circles — keep focal point well inside safe zone
// ══════════════════════════════════════════════════════════════════════════════
function Sq1() {
  return (
    <div style={{ width: 1200, height: 1200, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${SPARK}08 0%, transparent 70%)` }}/>
      <BrowserFrame width={960} height={860} url="globaldev.sbs/admin">
        <DashboardUI scale={0.96}/>
      </BrowserFrame>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SQUARE 2 — 1200 × 1200 — Code Editor centered
// ══════════════════════════════════════════════════════════════════════════════
function Sq2() {
  return (
    <div style={{ width: 1200, height: 1200, background: '#01111d', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${SIGNAL}0a 0%, transparent 70%)` }}/>
      <BrowserFrame width={960} height={860} url="code — bookings.ts">
        <CodeEditorUI scale={0.96}/>
      </BrowserFrame>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SQUARE 3 — 1200 × 1200 — Live Session centered
// ══════════════════════════════════════════════════════════════════════════════
function Sq3() {
  return (
    <div style={{ width: 1200, height: 1200, background: '#202124', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ width: 980, height: 900 }}>
        <MeetUI scale={1.05}/>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTRAIT 1 — 960 × 1200 — Phone mockup: app dashboard
// ══════════════════════════════════════════════════════════════════════════════
function P1() {
  return (
    <div style={{ width: 960, height: 1200, background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${SPARK}0a 0%, transparent 70%)` }}/>
      <PhoneFrame width={340}>
        <DashboardUI scale={0.58}/>
      </PhoneFrame>
      <div style={{ opacity: 0.5 }}><BrandMark size={18}/></div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTRAIT 2 — 960 × 1200 — Phone mockup: code editor
// ══════════════════════════════════════════════════════════════════════════════
function P2() {
  return (
    <div style={{ width: 960, height: 1200, background: '#01111d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${SIGNAL}0a 0%, transparent 70%)` }}/>
      <PhoneFrame width={340}>
        <CodeEditorUI scale={0.56}/>
      </PhoneFrame>
      <div style={{ opacity: 0.5 }}><BrandMark size={18}/></div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TALL 1 — 1080 × 1920 — Three-device showcase
// ══════════════════════════════════════════════════════════════════════════════
function T1() {
  return (
    <div style={{ width: 1080, height: 1920, background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, overflow: 'hidden', position: 'relative', padding: '60px 40px' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 100% 70% at 50% 50%, ${SPARK}08 0%, transparent 65%)` }}/>

      {/* Desktop browser */}
      <BrowserFrame width={940} height={480} url="globaldev.sbs/admin">
        <DashboardUI scale={0.88}/>
      </BrowserFrame>

      {/* Tablet + phone side by side */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {/* Tablet */}
        <div style={{ width: 420, height: 560, background: '#1a1a1a', borderRadius: 24, border: `${8}px solid #2a2a2a`, overflow: 'hidden', flexShrink: 0 }}>
          <MeetUI scale={0.7}/>
        </div>
        {/* Phone */}
        <PhoneFrame width={220}>
          <DashboardUI scale={0.38}/>
        </PhoneFrame>
      </div>

      <div style={{ opacity: 0.4 }}><BrandMark size={18}/></div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TALL 2 — 1080 × 1920 — Large globe mark (brand / abstract)
// ══════════════════════════════════════════════════════════════════════════════
function T2() {
  return (
    <div style={{ width: 1080, height: 1920, background: 'linear-gradient(180deg,#080810 0%,#0a0a0a 60%,#0a0500 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      {/* Concentric rings */}
      <svg width="900" height="900" viewBox="0 0 900 900" fill="none" style={{ position: 'absolute', opacity: 0.08 }}>
        {[420, 320, 220, 130].map(r => <circle key={r} cx="450" cy="450" r={r} stroke="white" strokeWidth="1.5"/>)}
        <line x1="30" y1="450" x2="870" y2="450" stroke="white" strokeWidth="1"/>
        <line x1="450" y1="30" x2="450" y2="870" stroke="white" strokeWidth="1"/>
      </svg>

      {/* Radial glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: `radial-gradient(circle, ${SPARK}18 0%, ${SIGNAL}0a 40%, transparent 70%)`, borderRadius: '50%' }}/>

      {/* Central mark */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <svg width="480" height="480" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10.5" stroke="white" strokeOpacity="0.2" strokeWidth="0.7"/>
          <ellipse cx="16" cy="16" rx="4.5" ry="10.5" stroke="white" strokeOpacity="0.1" strokeWidth="0.6"/>
          <line x1="5.5" y1="16" x2="26.5" y2="16" stroke="white" strokeOpacity="0.1" strokeWidth="0.6"/>
          <path d="M9.2 22.8 A 13.2 13.2 0 0 1 22.8 9.2" stroke="white" strokeOpacity="0.6" strokeWidth="0.9" strokeLinecap="round"/>
          <circle cx="9.2" cy="22.8" r="3.4" fill={SPARK}/>
          <circle cx="22.8" cy="9.2" r="3.4" fill={SIGNAL}/>
        </svg>
      </div>

      {/* Connection arc */}
      <svg width="600" height="120" viewBox="0 0 600 120" fill="none" style={{ position: 'relative', zIndex: 1, marginTop: -20 }}>
        <path d="M 80 90 Q 300 20 520 90" stroke={`url(#arcG)`} strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.6"/>
        <defs>
          <linearGradient id="arcG" x1="80" y1="90" x2="520" y2="90">
            <stop stopColor={SPARK}/><stop offset="1" stopColor={SIGNAL}/>
          </linearGradient>
        </defs>
        <circle cx="80" cy="90" r="8" fill={SPARK} fillOpacity="0.9"/>
        <circle cx="520" cy="90" r="8" fill={SIGNAL} fillOpacity="0.9"/>
        <text x="80" y="112" textAnchor="middle" fill={SPARK} fontSize="14" fontFamily="Inter" fillOpacity="0.7">Indonesia</text>
        <text x="520" y="112" textAnchor="middle" fill={SIGNAL} fontSize="14" fontFamily="Inter" fillOpacity="0.7">Australia</text>
      </svg>

      {/* Tiny brand name only */}
      <div style={{ position: 'absolute', bottom: 60, opacity: 0.4 }}>
        <BrandMark size={16}/>
      </div>
    </div>
  )
}

// ── Catalog ───────────────────────────────────────────────────────────────────
export type AdDef = { id: string; label: string; format: string; w: number; h: number; El: React.FC }

export const GOOGLE_ADS: AdDef[] = [
  { id: 'l1', label: 'L1 — Admin Dashboard',    format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L1 },
  { id: 'l2', label: 'L2 — Code Editor',         format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L2 },
  { id: 'l3', label: 'L3 — Live Session',         format: 'Landscape 1200×628',      w: 1200, h: 628,  El: L3 },
  { id: 's1', label: 'S1 — Dashboard in Browser', format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq1 },
  { id: 's2', label: 'S2 — Code in Browser',      format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq2 },
  { id: 's3', label: 'S3 — Meet Session',          format: 'Square 1200×1200',        w: 1200, h: 1200, El: Sq3 },
  { id: 'p1', label: 'P1 — Phone: Dashboard',     format: 'Portrait 960×1200',       w: 960,  h: 1200, El: P1 },
  { id: 'p2', label: 'P2 — Phone: Code',           format: 'Portrait 960×1200',       w: 960,  h: 1200, El: P2 },
  { id: 't1', label: 'T1 — Three Devices',         format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T1 },
  { id: 't2', label: 'T2 — Globe Mark',            format: 'Tall Portrait 1080×1920', w: 1080, h: 1920, El: T2 },
]

// ── Standalone section (used when rendering as a full page section) ──────────
const PREVIEW_W = 280
const GOOGLE_FORMAT_LABEL: Record<string, string> = {
  l1: 'Landscape', l2: 'Landscape', l3: 'Landscape',
  s1: 'Square', s2: 'Square', s3: 'Square',
  p1: 'Portrait', p2: 'Portrait',
  t1: 'Tall', t2: 'Tall',
}
const FORMAT_GROUPS = ['Landscape', 'Square', 'Portrait', 'Tall']

export default function GoogleAdsSection() {
  const [open, setOpen] = useState<AdDef | null>(null)

  const byFormat = GOOGLE_ADS.reduce<Record<string, AdDef[]>>((acc, ad) => {
    const k = GOOGLE_FORMAT_LABEL[ad.id] ?? 'Other'
    if (!acc[k]) acc[k] = []
    acc[k].push(ad)
    return acc
  }, {})

  const scaleFor = (ad: AdDef) =>
    Math.min((window.innerHeight * 0.9) / ad.h, (window.innerWidth * 0.9) / ad.w)

  return (
    <section style={{ marginTop: 56 }}>
      {open && (
        <div onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ transform: `scale(${scaleFor(open)})`, transformOrigin: 'center', pointerEvents: 'none' }}>
            <open.El />
          </div>
          <button onClick={() => setOpen(null)} style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ position: 'fixed', bottom: 20, color: '#444', fontSize: 12 }}>Klik di mana saja untuk tutup · {open.format}</div>
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Google Ads — Static Images</h2>
        <p style={{ color: '#555', fontSize: 13 }}>10 image creatives · 4 formats</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {FORMAT_GROUPS.map(fmt => {
          const ads = byFormat[fmt] ?? []
          if (!ads.length) return null
          return (
            <div key={fmt}>
              <div style={{ color: 'var(--signal)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #1f1f1f' }}>
                {fmt} · {ads[0].format.split(' ')[1]}
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {ads.map(ad => {
                  const scale = PREVIEW_W / ad.w
                  const ph = ad.h * scale
                  return (
                    <div key={ad.id}>
                      <div style={{ width: PREVIEW_W, height: ph, overflow: 'hidden', borderRadius: 8, position: 'relative', cursor: 'pointer' }} onClick={() => setOpen(ad)}>
                        <div style={{ width: ad.w, height: ad.h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute' }}>
                          <ad.El />
                        </div>
                      </div>
                      <div style={{ marginTop: 8, color: '#555', fontSize: 11, textAlign: 'center' }}>{ad.label.split(' — ')[1]}</div>
                      <button onClick={() => setOpen(ad)} style={{ marginTop: 6, width: PREVIEW_W, background: SURF2, border: `1px solid ${BORDER}`, borderRadius: 8, color: '#aaa', fontSize: 12, fontWeight: 600, padding: '7px 0', cursor: 'pointer' }}>
                        Layar Penuh
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
