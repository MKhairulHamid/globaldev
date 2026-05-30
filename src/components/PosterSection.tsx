import { useState, useRef, useLayoutEffect } from 'react'

// Single portrait poster (phone size) summarising the whole program.
const W = 360
const H_FALLBACK = 900
const ORANGE = '#f97316'

const FACTS = [
  { icon: '📅', k: 'Mulai', v: '11 Juni 2026' },
  { icon: '⏱️', k: 'Durasi', v: '10 sesi · 5 minggu' },
  { icon: '💰', k: 'Biaya', v: 'Rp 899.000' },
  { icon: '🎟️', k: 'Kuota', v: 'Hanya 30 kursi' },
]

const STACK = ['React', 'TypeScript', 'Supabase', 'Claude Code']

const WEEKS = [
  { w: 'Minggu 1', t: 'Fondasi', d: 'React & TypeScript dari nol, cara berpikir komponen.' },
  { w: 'Minggu 2', t: 'Backend Supabase', d: 'Rancang database, sambungkan React ke data.' },
  { w: 'Minggu 3', t: 'Auth & AI masuk', d: 'Login aman, lalu mulai ngoding bareng Claude Code.' },
  { w: 'Minggu 4', t: 'Fitur lengkap', d: 'Booking, alur pembayaran, keamanan database (RLS).' },
  { w: 'Minggu 5', t: 'Deploy & polish', d: 'Aplikasi live, custom domain sendiri, review proyek.' },
]

const BUILD = [
  { i: '🌐', t: 'Landing page bisnis' },
  { i: '🔐', t: 'Autentikasi' },
  { i: '👥', t: 'Owner & customer roles' },
  { i: '📅', t: 'Booking & order' },
  { i: '💳', t: 'Pembayaran transfer' },
  { i: '📊', t: 'Owner dashboard' },
  { i: '🌍', t: 'Custom domain' },
  { i: '🤖', t: 'Dibantu Claude Code' },
]

const PERKS = [
  '10 sesi live (~20 jam) via Google Meet',
  'Komunitas Discord khusus peserta',
  'Source code lengkap proyekmu',
  'Rekaman semua sesi',
  'Code review & feedback langsung',
  'Sertifikat setelah lulus',
]

const FOR = ['Fresh graduate IT', 'Profesional non-IT', 'Punya kebutuhan web nyata']

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: ORANGE, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: '#222', margin: '14px 0' }} />
}

function Poster() {
  return (
    <div style={{
      width: W, boxSizing: 'border-box',
      background: 'linear-gradient(165deg,#0c0c0c 0%,#140a02 100%)',
      borderRadius: 20, overflow: 'hidden', padding: '22px 22px 0',
      display: 'flex', flexDirection: 'column', position: 'relative',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* ambient glow */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle,${ORANGE}22,transparent 70%)`, pointerEvents: 'none' }} />

      {/* Brand */}
      <div style={{ color: ORANGE, fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        Global Developer Academy
      </div>
      <div style={{ color: '#777', fontSize: 10.5, marginTop: 2 }}>Bootcamp Full Stack Web Development</div>

      {/* Headline */}
      <div style={{ color: '#fff', fontSize: 27, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', marginTop: 14 }}>
        Dari Nol ke Aplikasi<br />Web <span style={{ color: ORANGE }}>Online</span>
      </div>
      <div style={{ color: '#bdbdbd', fontSize: 12, lineHeight: 1.5, marginTop: 8 }}>
        Belajar React, TypeScript & Supabase sambil membangun satu aplikasi nyata dalam 5 minggu.
      </div>

      {/* Fact grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
        {FACTS.map(f => (
          <div key={f.k} style={{ background: '#15110b', border: '1px solid #2a2118', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ color: '#777', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.icon} {f.k}</div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 800, marginTop: 2 }}>{f.v}</div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
        {STACK.map(s => (
          <span key={s} style={{ background: `${ORANGE}1a`, border: `1px solid ${ORANGE}3d`, color: '#fcae73', borderRadius: 7, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>{s}</span>
        ))}
      </div>

      <Divider />

      {/* Curriculum */}
      <Label>Kurikulum 5 Minggu</Label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {WEEKS.map(wk => (
          <div key={wk.w} style={{ display: 'flex', gap: 9, alignItems: 'baseline' }}>
            <span style={{ color: ORANGE, fontSize: 9.5, fontWeight: 800, minWidth: 50 }}>{wk.w}</span>
            <span style={{ flex: 1 }}>
              <span style={{ color: '#fff', fontSize: 11.5, fontWeight: 700 }}>{wk.t}. </span>
              <span style={{ color: '#9a9a9a', fontSize: 11, lineHeight: 1.35 }}>{wk.d}</span>
            </span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Build */}
      <Label>Yang Kamu Bangun</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 10px' }}>
        {BUILD.map(b => (
          <div key={b.t} style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <span style={{ fontSize: 13 }}>{b.i}</span>
            <span style={{ color: '#d6d6d6', fontSize: 11 }}>{b.t}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Perks + For (two columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div>
          <Label>Fasilitas</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {PERKS.map(p => (
              <div key={p} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                <span style={{ color: ORANGE, fontSize: 11, lineHeight: 1.3 }}>✓</span>
                <span style={{ color: '#cfcfcf', fontSize: 10.5, lineHeight: 1.35 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label>Untuk Siapa</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
            {FOR.map(p => (
              <div key={p} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                <span style={{ color: ORANGE, fontSize: 11 }}>•</span>
                <span style={{ color: '#cfcfcf', fontSize: 10.5, lineHeight: 1.35 }}>{p}</span>
              </div>
            ))}
          </div>
          <Label>Jadwal</Label>
          <div style={{ color: '#cfcfcf', fontSize: 10.5, lineHeight: 1.4 }}>
            Selasa & Kamis<br />19.30 WIB · Google Meet
          </div>
        </div>
      </div>

      <Divider />

      {/* Instructor */}
      <Label>Instruktur</Label>
      <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 800 }}>Khairul Hamid</div>
      <div style={{ color: '#9a9a9a', fontSize: 10.5, lineHeight: 1.4, marginTop: 2 }}>
        8+ tahun jadi engineer, kerja remote dari Indonesia untuk perusahaan teknologi di Australia. Stack harian React · TypeScript · .NET 8.
      </div>

      {/* Footer CTA */}
      <div style={{ marginTop: 18, marginLeft: -22, marginRight: -22, background: ORANGE, padding: '13px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 900 }}>Daftar sekarang</div>
          <div style={{ color: '#ffe6d2', fontSize: 10 }}>Transfer bank · konfirmasi via WhatsApp</div>
        </div>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 800, background: 'rgba(0,0,0,0.18)', borderRadius: 8, padding: '7px 12px' }}>
          globaldev.sbs
        </div>
      </div>
    </div>
  )
}

export default function PosterSection() {
  const [open, setOpen] = useState(false)
  const [posterH, setPosterH] = useState(H_FALLBACK)
  const measureRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (measureRef.current) setPosterH(measureRef.current.offsetHeight)
  }, [])

  const scale = open ? Math.min((window.innerHeight * 0.94) / posterH, (window.innerWidth * 0.94) / W) : 1

  return (
    <section style={{ marginTop: 56 }}>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ pointerEvents: 'none', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <Poster />
          </div>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', pointerEvents: 'auto' }}>✕</button>
          <div style={{ position: 'absolute', bottom: 24, color: '#444', fontSize: 12 }}>Klik di mana saja untuk tutup · screenshot untuk simpan</div>
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Poster</h2>
        <p style={{ color: '#555', fontSize: 13 }}>Rangkuman lengkap program dalam satu poster portrait (ukuran HP) · screenshot untuk pakai</p>
      </div>

      <div ref={measureRef} style={{ pointerEvents: 'none', userSelect: 'none', width: W }}>
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
