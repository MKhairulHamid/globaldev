import { useState } from 'react'
import Logo from './Logo'
import hamid from '../assets/hamid.jpg'

// Single IG-ready poster, 4:5 portrait, in Global Developer Academy branding.
const W = 480
const H = 600
const ORANGE = 'var(--spark)'

const BENEFITS = [
  'Belajar berbasis proyek & study case nyata',
  'Mentoring langsung dari engineer aktif',
  'Source code lengkap + sertifikat kelulusan',
  'Komunitas Discord & rekaman semua sesi',
]

const CREDS = [
  '8+ tahun engineer profesional',
  'Remote untuk perusahaan teknologi di Australia',
  'Stack harian React · TypeScript · .NET 8',
  'Founder Global Developer Academy',
]

const KOMPETENSI = [
  'Menyusun komponen React & TypeScript',
  'State, hooks & tampilan interaktif',
  'Merancang database di Supabase',
  'Autentikasi & Row Level Security',
  'Booking, order & alur pembayaran',
  'Ngoding bareng Claude Code (AI)',
  'Deploy & setting custom domain',
  'Problem solving ala developer',
]

function Check() {
  return (
    <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: '50%', background: ORANGE, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 900, marginTop: 1 }}>✓</span>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ color: ORANGE, fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>{children}</div>
}

function Poster() {
  return (
    <div style={{
      width: W, height: H, boxSizing: 'border-box',
      background: 'radial-gradient(120% 80% at 0% 0%, #1c1206 0%, #0a0a0a 55%)',
      borderRadius: 18, overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', padding: '22px 22px 0',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ position: 'absolute', top: -70, left: -40, width: 240, height: 240, background: `radial-gradient(circle,${ORANGE}26,transparent 70%)`, pointerEvents: 'none' }} />

      {/* ── Header ── */}
      <div style={{ position: 'absolute', top: 20, right: 22 }}><Logo height={18} /></div>

      <div style={{ color: '#fff', fontSize: 30, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.035em' }}>
        Web Developer<br />Bootcamp
      </div>
      <div style={{ color: ORANGE, fontSize: 12.5, fontWeight: 700, marginTop: 8, letterSpacing: '0.01em' }}>
        Full Stack · React · TypeScript · Supabase
      </div>
      <div style={{ color: '#cfcfcf', fontSize: 12.5, fontWeight: 600, lineHeight: 1.35, marginTop: 6 }}>
        Dari nol sampai aplikasi webmu online,<br />dalam 5 minggu berbasis proyek nyata.
      </div>

      {/* ── Mid panel: benefits + delivery + instructor ── */}
      <div style={{ marginTop: 16, background: '#101010', border: '1px solid #242424', borderRadius: 14, padding: 14, display: 'grid', gridTemplateColumns: '1.12fr 0.95fr', gap: 14 }}>
        {/* left: benefits */}
        <div>
          <Label>Yang Kamu Dapat</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {BENEFITS.map(b => (
              <div key={b} style={{ display: 'flex', gap: 8 }}>
                <Check />
                <span style={{ color: '#e2e2e2', fontSize: 11, lineHeight: 1.3 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right: delivery + instructor */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 7, marginBottom: 10 }}>
            <span style={{ color: '#fff', fontSize: 9.5, fontWeight: 800, letterSpacing: '0.1em' }}>GOOGLE MEET</span>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#16a34a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>📹</span>
          </div>
          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 10, display: 'flex', gap: 10 }}>
            <img src={hamid} alt="Khairul Hamid" style={{ width: 56, height: 64, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
            <div>
              <div style={{ color: '#fff', fontSize: 12.5, fontWeight: 800, marginBottom: 4 }}>Khairul Hamid</div>
              {CREDS.map(c => (
                <div key={c} style={{ color: '#9a9a9a', fontSize: 8, lineHeight: 1.35, marginBottom: 1.5 }}>• {c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower: kompetensi + price ── */}
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 14, flex: 1 }}>
        {/* left: kompetensi */}
        <div>
          <Label>Kompetensi</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {KOMPETENSI.map(k => (
              <div key={k} style={{ display: 'flex', gap: 7, alignItems: 'baseline' }}>
                <span style={{ color: ORANGE, fontSize: 9 }}>●</span>
                <span style={{ color: '#d4d4d4', fontSize: 10.5, lineHeight: 1.3 }}>{k}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right: price + schedule */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#cfcfcf', fontSize: 13, fontStyle: 'italic', fontWeight: 600 }}>Harga Spesial!</div>
          <div style={{ color: '#fff', fontSize: 33, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05 }}>Rp 899.000</div>
          <div style={{ color: '#8a8a8a', fontSize: 9, marginTop: 2 }}>*sudah termasuk 10 sesi live + sertifikat</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12 }}>
            <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 999, padding: '7px 14px', color: '#fff', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>
              Mulai: 11 Juni 2026
            </div>
            <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 999, padding: '7px 14px', color: '#fff', fontSize: 11, fontWeight: 700, textAlign: 'center' }}>
              Selasa & Kamis · 19.30 WIB
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ marginLeft: -22, marginRight: -22, background: ORANGE, padding: '11px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#1a1a1a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>📞</span>
          <span style={{ color: '#1a1a1a', fontSize: 12, fontWeight: 800 }}>0811-1330-130</span>
        </div>
        <span style={{ color: '#1a1a1a', fontSize: 12, fontWeight: 800 }}>globaldev.sbs</span>
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
        <p style={{ color: '#555', fontSize: 13 }}>Rangkuman program dalam satu poster IG (4:5) · muat satu layar · screenshot untuk pakai</p>
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
