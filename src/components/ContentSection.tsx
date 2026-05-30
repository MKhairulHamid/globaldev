import { useState } from 'react'

const W = 270
const H = 480
const DUR = '10s'
const EASE = 'cubic-bezier(0.4,0,0.2,1)'
const ITER = 'infinite'

function a(name: string) {
  return `${name} ${DUR} ${EASE} ${ITER} both`
}

const KEYFRAMES = `
/* ── Ad 1 Karir Baru ───────────────────────────────── */
@keyframes a1-brand {
  0%,8%   { opacity:0; transform:translateY(-8px) }
  18%,92% { opacity:1; transform:translateY(0) }
  100%    { opacity:0 }
}
@keyframes a1-h1 {
  0%,23%  { opacity:0; transform:translateX(-24px) }
  35%,90% { opacity:1; transform:translateX(0) }
  97%,100%{ opacity:0 }
}
@keyframes a1-h2 {
  0%,38%  { opacity:0; transform:translateX(24px) }
  50%,90% { opacity:1; transform:translateX(0) }
  97%,100%{ opacity:0 }
}
@keyframes a1-b1 {
  0%,52%  { opacity:0; transform:translateY(12px) }
  62%,88% { opacity:1; transform:translateY(0) }
  95%,100%{ opacity:0 }
}
@keyframes a1-b2 {
  0%,58%  { opacity:0; transform:translateY(12px) }
  68%,88% { opacity:1; transform:translateY(0) }
  95%,100%{ opacity:0 }
}
@keyframes a1-b3 {
  0%,64%  { opacity:0; transform:translateY(12px) }
  74%,88% { opacity:1; transform:translateY(0) }
  95%,100%{ opacity:0 }
}
@keyframes a1-cta {
  0%,80%  { opacity:0; transform:scale(0.9) }
  88%,96% { opacity:1; transform:scale(1) }
  100%    { opacity:0 }
}
@keyframes a1-pulse {
  0%,88%,100% { box-shadow:0 0 0 0 rgba(249,115,22,0) }
  90%         { box-shadow:0 0 24px 4px rgba(249,115,22,0.55) }
  92%         { box-shadow:0 0 0 14px rgba(249,115,22,0) }
}

/* ── Ad 2 Tech Stack ────────────────────────────────── */
@keyframes a2-code-bg {
  0%      { opacity:0 }
  15%,80% { opacity:0.055 }
  100%    { opacity:0 }
}
@keyframes a2-label {
  0%,13%  { opacity:0 }
  23%,85% { opacity:1 }
  93%,100%{ opacity:0 }
}
@keyframes a2-h {
  0%,13%  { opacity:0; letter-spacing:0.4em }
  26%,85% { opacity:1; letter-spacing:-0.02em }
  93%,100%{ opacity:0 }
}
@keyframes a2-b1 {
  0%,28%  { opacity:0; transform:scale(0.65) }
  36%     { opacity:1; transform:scale(1.08) }
  40%,83% { opacity:1; transform:scale(1) }
  90%,100%{ opacity:0 }
}
@keyframes a2-b2 {
  0%,34%  { opacity:0; transform:scale(0.65) }
  42%     { opacity:1; transform:scale(1.08) }
  46%,83% { opacity:1; transform:scale(1) }
  90%,100%{ opacity:0 }
}
@keyframes a2-b3 {
  0%,40%  { opacity:0; transform:scale(0.65) }
  48%     { opacity:1; transform:scale(1.08) }
  52%,83% { opacity:1; transform:scale(1) }
  90%,100%{ opacity:0 }
}
@keyframes a2-b4 {
  0%,46%  { opacity:0; transform:scale(0.65) }
  54%     { opacity:1; transform:scale(1.08) }
  58%,83% { opacity:1; transform:scale(1) }
  90%,100%{ opacity:0 }
}
@keyframes a2-sub {
  0%,55%  { opacity:0; transform:translateY(10px) }
  65%,82% { opacity:1; transform:translateY(0) }
  90%,100%{ opacity:0 }
}
@keyframes a2-cta {
  0%,72%  { opacity:0 }
  80%,96% { opacity:1 }
  100%    { opacity:0 }
}
@keyframes a2-cursor {
  0%,45%,55%,100% { opacity:1 }
  50% { opacity:0 }
}

/* ── Ad 3 Urgency ───────────────────────────────────── */
@keyframes a3-badge {
  0%,7%   { opacity:0; transform:translateY(-28px) }
  16%     { opacity:1; transform:translateY(3px) }
  20%,88% { opacity:1; transform:translateY(0) }
  95%,100%{ opacity:0 }
}
@keyframes a3-heading {
  0%,24%  { opacity:0; transform:scale(0.82) }
  35%,87% { opacity:1; transform:scale(1) }
  94%,100%{ opacity:0 }
}
@keyframes a3-bar {
  0%,35%  { width:0%; opacity:0 }
  38%     { opacity:1 }
  62%,86% { width:78%; opacity:1 }
  93%,100%{ width:78%; opacity:0 }
}
@keyframes a3-seats {
  0%,36%  { opacity:0 }
  46%,85% { opacity:1 }
  92%,100%{ opacity:0 }
}
@keyframes a3-urgency {
  0%,54%  { opacity:0; transform:translateX(-8px) }
  63%,85% { opacity:1; transform:translateX(0) }
  92%,100%{ opacity:0 }
}
@keyframes a3-cta {
  0%,70%  { opacity:0; transform:translateY(14px) }
  79%,94% { opacity:1; transform:translateY(0) }
  100%    { opacity:0 }
}
@keyframes a3-flash {
  0%,79%,100%    { background:#f97316; color:#fff }
  85%            { background:#fb923c }
  90%            { background:#f97316 }
  92%            { background:#fed7aa; color:#9a3412 }
  94%            { background:#f97316; color:#fff }
}
`

// ── Ad 1: Karir Baru ─────────────────────────────────────────────────────────
function Ad1() {
  return (
    <div style={{
      width: W, height: H, borderRadius: 20, overflow: 'hidden',
      background: 'linear-gradient(160deg,#0d0d0d 0%,#1a0a00 100%)',
      position: 'relative', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px', boxSizing: 'border-box',
    }}>
      <div style={{
        position: 'absolute', top: '35%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 220, height: 220,
        background: 'radial-gradient(circle,rgba(249,115,22,0.18) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ animation: a('a1-brand'), color: '#f97316', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
        Global Developer Academy
      </div>
      <div style={{ animation: a('a1-h1'), color: '#fff', fontSize: 34, fontWeight: 900, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 2 }}>
        Skill Tech-mu,
      </div>
      <div style={{ animation: a('a1-h2'), color: '#f97316', fontSize: 44, fontWeight: 900, textAlign: 'center', lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 32 }}>
        Nilai Jualmu.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, width: '100%' }}>
        {[
          { an: a('a1-b1'), text: 'Full Stack Web — dari nol sampai deploy' },
          { an: a('a1-b2'), text: 'Mentorship 1-on-1 dari engineer aktif' },
          { an: a('a1-b3'), text: 'Portofolio nyata, langsung siap apply' },
        ].map(({ an, text }) => (
          <div key={text} style={{ animation: an, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ color: '#d1d5db', fontSize: 14, fontWeight: 500 }}>{text}</span>
          </div>
        ))}
      </div>
      <button style={{
        animation: `${a('a1-cta')}, ${a('a1-pulse')}`,
        background: '#f97316', color: '#fff', border: 'none',
        borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800, cursor: 'default',
        pointerEvents: 'none',
      }}>
        Daftar Cohort Juni →
      </button>
      <div style={{ animation: a('a1-cta'), color: '#555', fontSize: 11, marginTop: 14 }}>
        globaldev.id
      </div>
    </div>
  )
}

// ── Ad 2: Tech Stack ─────────────────────────────────────────────────────────
const CODE_TEXT = `const dev = new Developer()\ndev.learn(['HTML','CSS','JS'])\ndev.master('React + TS')\ndev.build({ realProjects: true })\ndev.getJob() // ✓ hired\n\n`.repeat(7)

function Ad2() {
  const badge = (text: string, color: string, an: string) => (
    <span key={text} style={{
      animation: an,
      background: `${color}1a`, border: `1px solid ${color}44`,
      color, borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 700,
    }}>
      {text}
    </span>
  )
  return (
    <div style={{
      width: W, height: H, borderRadius: 20, overflow: 'hidden',
      background: '#080c10', position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px', boxSizing: 'border-box',
    }}>
      <pre style={{
        animation: a('a2-code-bg'),
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        padding: 20, margin: 0, color: '#fbbf24',
        fontSize: 10, lineHeight: 1.7, fontFamily: 'monospace',
        whiteSpace: 'pre', overflow: 'hidden', pointerEvents: 'none',
      }}>
        {CODE_TEXT}
      </pre>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ animation: a('a2-label'), color: '#fbbf24', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 14 }}>
          Masuk Industri Tech
        </div>
        <div style={{ animation: a('a2-h'), color: '#fff', fontSize: 24, fontWeight: 900, textAlign: 'center', lineHeight: 1.2, marginBottom: 28 }}>
          Bukan Kursus Biasa.{'\n'}Ini Akselerator Karir.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
          {badge('HTML & CSS', '#fbbf24', a('a2-b1'))}
          {badge('JavaScript', '#60a5fa', a('a2-b2'))}
          {badge('React', '#34d399', a('a2-b3'))}
          {badge('TypeScript', '#a78bfa', a('a2-b4'))}
        </div>
        <div style={{ animation: a('a2-sub'), color: '#9ca3af', fontSize: 13, textAlign: 'center', lineHeight: 1.65, marginBottom: 28 }}>
          Diajar langsung engineer aktif di industri.{'\n'}6 minggu serius, langsung bisa ngelamar.
        </div>
        <div style={{ animation: a('a2-cta'), color: '#fbbf24', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          → globaldev.id
          <span style={{
            animation: a('a2-cursor'),
            display: 'inline-block', width: 2, height: 16,
            background: '#fbbf24', marginLeft: 3, verticalAlign: 'middle',
          }} />
        </div>
      </div>
    </div>
  )
}

// ── Ad 3: Urgency ─────────────────────────────────────────────────────────────
function Ad3() {
  return (
    <div style={{
      width: W, height: H, borderRadius: 20, overflow: 'hidden',
      background: 'linear-gradient(170deg,#0f0a00 0%,#1c0600 100%)',
      position: 'relative', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px', boxSizing: 'border-box',
    }}>
      <div style={{
        animation: a('a3-badge'),
        background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)',
        borderRadius: 99, padding: '5px 16px', marginBottom: 24,
        color: '#f97316', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>
        Cohort Juni 2026
      </div>
      <div style={{ animation: a('a3-heading'), color: '#fff', fontSize: 36, fontWeight: 900, textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 6 }}>
        Hampir Penuh.
      </div>
      <div style={{ animation: a('a3-heading'), color: '#f97316', fontSize: 20, fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>
        Daftar Sekarang.
      </div>
      <div style={{
        animation: a('a3-seats'),
        width: '100%', background: '#1f1f1f', borderRadius: 6, height: 8, marginBottom: 10, overflow: 'hidden',
      }}>
        <div style={{
          animation: a('a3-bar'),
          height: '100%', borderRadius: 6,
          background: 'linear-gradient(90deg,#f97316,#ef4444)',
          width: 0,
        }} />
      </div>
      <div style={{ animation: a('a3-seats'), width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        <span style={{ color: '#f87171', fontSize: 12, fontWeight: 700 }}>8 kursi tersisa</span>
        <span style={{ color: '#6b7280', fontSize: 12 }}>22 / 30 terisi</span>
      </div>
      <div style={{ animation: a('a3-urgency'), color: '#fef3c7', fontSize: 14, textAlign: 'center', lineHeight: 1.7, marginBottom: 28 }}>
        Yang duluan daftar,{'\n'}yang dapat tempatnya.{'\n'}Setelah penuh, kami tutup.
      </div>
      <button style={{
        animation: `${a('a3-cta')}, ${a('a3-flash')}`,
        width: '100%', border: 'none', borderRadius: 14,
        padding: '15px', fontSize: 16, fontWeight: 900, cursor: 'default',
        background: '#f97316', color: '#fff', pointerEvents: 'none',
      }}>
        Amankan Kursimu →
      </button>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
const ADS = [
  { id: 'karir-baru', label: 'Karir Baru', El: Ad1 },
  { id: 'tech-stack', label: 'Tech Stack', El: Ad2 },
  { id: 'urgency',    label: 'Urgency',    El: Ad3 },
]

export default function ContentSection() {
  const [open, setOpen] = useState<string | null>(null)
  const active = ADS.find(ad => ad.id === open)

  const scale = active
    ? Math.min(
        (window.innerHeight * 0.9) / H,
        (window.innerWidth * 0.9) / W,
      )
    : 1

  return (
    <section style={{ marginTop: 56 }}>
      <style>{KEYFRAMES}</style>

      {/* ── Full-screen modal ── */}
      {active && (
        <div
          onClick={() => setOpen(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* stop clicks on the ad itself from closing the modal */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ pointerEvents: 'none', transform: `scale(${scale})`, transformOrigin: 'center center' }}
          >
            <active.El />
          </div>

          <button
            onClick={() => setOpen(null)}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: 40, height: 40,
              color: '#fff', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            ✕
          </button>

          <div style={{ position: 'absolute', bottom: 24, color: '#444', fontSize: 12 }}>
            Klik di mana saja untuk tutup
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Content
        </h2>
        <p style={{ color: '#555', fontSize: 13 }}>3 ad creatives · Portrait · 10 detik loop</p>
      </div>

      {/* ── Thumbnail grid ── */}
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        {ADS.map(({ id, label, El }) => (
          <div key={id}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {label}
              </span>
            </div>

            {/* thumbnail — not clickable */}
            <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
              <El />
            </div>

            <button
              onClick={() => setOpen(id)}
              style={{
                marginTop: 10, width: W,
                background: '#161616', border: '1px solid #2a2a2a',
                borderRadius: 8, color: '#aaa', fontSize: 12, fontWeight: 600,
                padding: '8px 0', cursor: 'pointer',
              }}
            >
              Layar Penuh
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
