import { useState } from 'react'

// Single portrait poster, phone aspect (9:16). Everything fits one screen.
const W = 360
const H = 640
const ORANGE = '#f97316'

const FACTS = [
  { k: 'Mulai', v: '11 Juni 2026' },
  { k: 'Durasi', v: '10 sesi · 5 minggu' },
  { k: 'Biaya', v: 'Rp 899.000' },
  { k: 'Kuota', v: 'Hanya 30 kursi' },
]

const STACK = ['React', 'TypeScript', 'Supabase', 'Claude Code']

const WEEKS = [
  ['M1', 'Fondasi', 'React & TypeScript dari nol'],
  ['M2', 'Backend', 'Database & query di Supabase'],
  ['M3', 'Auth & AI', 'Login aman, mulai Claude Code'],
  ['M4', 'Fitur lengkap', 'Booking, pembayaran, RLS'],
  ['M5', 'Deploy', 'Go live, custom domain, polish'],
]

const BUILD = [
  ['🌐', 'Landing page'], ['🔐', 'Autentikasi'],
  ['👥', 'Owner & customer'], ['📅', 'Booking & order'],
  ['💳', 'Pembayaran'], ['📊', 'Owner dashboard'],
  ['🌍', 'Custom domain'], ['🤖', 'Dibantu AI'],
]

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ color: ORANGE, fontSize: 8, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 5 }}>{children}</div>
}
function Divider() {
  return <div style={{ height: 1, background: '#222', margin: '9px 0' }} />
}

function Poster() {
  return (
    <div style={{
      width: W, height: H, boxSizing: 'border-box',
      background: 'linear-gradient(165deg,#0c0c0c 0%,#140a02 100%)',
      borderRadius: 18, overflow: 'hidden', padding: '16px 16px 0',
      display: 'flex', flexDirection: 'column', position: 'relative',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 170, height: 170, background: `radial-gradient(circle,${ORANGE}22,transparent 70%)`, pointerEvents: 'none' }} />

      {/* Brand + headline */}
      <div style={{ color: ORANGE, fontSize: 8.5, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        Global Developer Academy
      </div>
      <div style={{ color: '#fff', fontSize: 21, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginTop: 7 }}>
        Dari Nol ke Aplikasi Web <span style={{ color: ORANGE }}>Online</span>
      </div>
      <div style={{ color: '#b0b0b0', fontSize: 10, lineHeight: 1.4, marginTop: 5 }}>
        Bootcamp full stack: belajar React, TypeScript & Supabase sambil bangun satu aplikasi nyata dalam 5 minggu.
      </div>

      {/* Facts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 10 }}>
        {FACTS.map(f => (
          <div key={f.k} style={{ background: '#15110b', border: '1px solid #2a2118', borderRadius: 8, padding: '5px 8px' }}>
            <div style={{ color: '#777', fontSize: 7.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.k}</div>
            <div style={{ color: '#fff', fontSize: 11.5, fontWeight: 800 }}>{f.v}</div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 9 }}>
        {STACK.map(s => (
          <span key={s} style={{ background: `${ORANGE}1a`, border: `1px solid ${ORANGE}3d`, color: '#fcae73', borderRadius: 6, padding: '3px 8px', fontSize: 9.5, fontWeight: 700 }}>{s}</span>
        ))}
      </div>

      <Divider />

      {/* Curriculum */}
      <Label>Kurikulum 5 Minggu</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        {WEEKS.map(([w, t, d]) => (
          <div key={w} style={{ display: 'flex', gap: 7, alignItems: 'baseline', fontSize: 9.5 }}>
            <span style={{ color: ORANGE, fontWeight: 800, minWidth: 18 }}>{w}</span>
            <span style={{ color: '#fff', fontWeight: 700 }}>{t}</span>
            <span style={{ color: '#888' }}>· {d}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Build */}
      <Label>Yang Kamu Bangun</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px' }}>
        {BUILD.map(([i, t]) => (
          <div key={t} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11 }}>{i}</span>
            <span style={{ color: '#d0d0d0', fontSize: 9.5 }}>{t}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Compact info rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div>
          <Label>Fasilitas</Label>
          <div style={{ color: '#cfcfcf', fontSize: 9.5, lineHeight: 1.45 }}>
            10 sesi live (~20 jam) · Komunitas Discord · Source code lengkap · Rekaman sesi · Code review langsung · Sertifikat
          </div>
        </div>
        <div>
          <Label>Untuk Siapa</Label>
          <div style={{ color: '#cfcfcf', fontSize: 9.5, lineHeight: 1.45 }}>
            Fresh graduate IT · Profesional non-IT · Siapa pun yang punya kebutuhan web nyata
          </div>
        </div>
        <div>
          <Label>Jadwal & Instruktur</Label>
          <div style={{ color: '#cfcfcf', fontSize: 9.5, lineHeight: 1.45 }}>
            Selasa & Kamis, 19.30 WIB via Google Meet. Diajar <span style={{ color: '#fff', fontWeight: 700 }}>Khairul Hamid</span>, 8+ tahun engineer yang kerja remote untuk perusahaan teknologi di Australia.
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ marginTop: 'auto', marginLeft: -16, marginRight: -16, background: ORANGE, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 900 }}>Daftar sekarang</div>
          <div style={{ color: '#ffe6d2', fontSize: 8.5 }}>Transfer bank · konfirmasi via WhatsApp</div>
        </div>
        <div style={{ color: '#fff', fontSize: 11.5, fontWeight: 800, background: 'rgba(0,0,0,0.18)', borderRadius: 7, padding: '6px 10px' }}>
          globaldev.sbs
        </div>
      </div>
    </div>
  )
}

export default function PosterSection() {
  const [open, setOpen] = useState(false)
  const scale = open ? Math.min((window.innerHeight * 0.94) / H, (window.innerWidth * 0.94) / W) : 1

  return (
    <section style={{ marginTop: 56 }}>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ pointerEvents: 'none', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <Poster />
          </div>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', pointerEvents: 'auto' }}>✕</button>
          <div style={{ position: 'absolute', bottom: 24, color: '#444', fontSize: 12 }}>Klik di mana saja untuk tutup · screenshot untuk simpan</div>
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Poster</h2>
        <p style={{ color: '#555', fontSize: 13 }}>Rangkuman program dalam satu poster portrait 9:16 · muat satu layar · screenshot untuk pakai</p>
      </div>

      <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <Poster />
      </div>

      <button
        onClick={() => setOpen(true)}
        style={{ marginTop: 12, width: W, background: '#161616', border: '1px solid #2a2a2a', borderRadius: 8, color: '#aaa', fontSize: 12, fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}
      >
        Layar Penuh
      </button>
    </section>
  )
}
