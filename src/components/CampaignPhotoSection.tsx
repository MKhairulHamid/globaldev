// Foto Campaign — static image assets untuk UGC influencer (ice.id)
// Tersedia: Square 1080×1080, Portrait 1080×1350, Story 1080×1920
// Download via html2canvas → PNG

import React, { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const SPARK   = '#FF5A1F'
const SIGNAL  = '#7B6CFF'
const BG      = '#0a0a0a'
const BORDER  = '#2a2a2a'
const TEXT    = '#e5e5e5'
const SUBTLE  = '#666666'

// ── Shared micro-components ───────────────────────────────────────────────────

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

function Wordmark({ width = 220 }: { width?: number }) {
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

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      background: `${color}18`, border: `1px solid ${color}40`, color,
      borderRadius: 12, padding: '8px 20px',
      fontSize: 18, fontWeight: 700, fontFamily: "'Inter',sans-serif",
      whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

function Check({ color = SPARK }: { color?: string }) {
  return (
    <span style={{
      flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
      background: color, display: 'inline-flex', alignItems: 'center',
      justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 900, marginTop: 2,
    }}>✓</span>
  )
}

// ── C1 — Square 1080 × 1080 — Hero Promo ─────────────────────────────────────
function C1() {
  return (
    <div style={{
      width: 1080, height: 1080, background: BG,
      fontFamily: "'Inter',system-ui,sans-serif",
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top gradient bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg,${SPARK},${SIGNAL})` }}/>

      {/* BG glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${SPARK}18 0%,transparent 70%)`, pointerEvents: 'none' }}/>

      {/* Rings */}
      <svg width={800} height={800} viewBox="0 0 800 800" fill="none" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0.04 }}>
        {[0.85,0.65,0.45,0.25].map((r,i) => <circle key={i} cx={400} cy={400} r={400*r} stroke="white" strokeWidth="1.5"/>)}
      </svg>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, zIndex: 1, padding: '0 80px', width: '100%', boxSizing: 'border-box' }}>

        {/* Wordmark top */}
        <div style={{ marginBottom: 48 }}>
          <Wordmark width={280}/>
        </div>

        {/* Globe */}
        <GlobeMark size={160}/>

        {/* Eyebrow */}
        <div style={{ marginTop: 36, color: SIGNAL, fontSize: 18, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Full Stack Bootcamp
        </div>

        {/* Headline */}
        <div style={{ marginTop: 20, textAlign: 'center', fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: 80, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.0 }}>
          Dari 0<br/>Jadi Web<br/>Developer
        </div>

        {/* Sub */}
        <div style={{ marginTop: 24, color: '#a3a3a3', fontSize: 26, fontWeight: 500, textAlign: 'center', lineHeight: 1.4 }}>
          10 sesi live · 5 minggu · proyek nyata
        </div>

        {/* Divider */}
        <div style={{ marginTop: 40, width: 160, height: 2, background: `linear-gradient(90deg,transparent,${SPARK},transparent)` }}/>

        {/* Stack pills */}
        <div style={{ marginTop: 36, display: 'flex', gap: 16 }}>
          <Pill label="React" color="#60a5fa"/>
          <Pill label="TypeScript" color="#a78bfa"/>
          <Pill label="Supabase" color="#34d399"/>
        </div>

        {/* Price + Date */}
        <div style={{ marginTop: 48, display: 'flex', gap: 32, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: SUBTLE, fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Investasi</div>
            <div style={{ color: '#fff', fontSize: 42, fontWeight: 900, letterSpacing: '-0.02em' }}>Rp 899.000</div>
          </div>
          <div style={{ width: 1, height: 60, background: BORDER }}/>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: SUBTLE, fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Mulai</div>
            <div style={{ color: SPARK, fontSize: 30, fontWeight: 800 }}>11 Juni 2026</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#111', borderTop: `1px solid ${BORDER}`, padding: '20px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#aaa', fontSize: 22, fontWeight: 600 }}>🌐 globaldev.sbs</div>
        <div style={{ color: '#aaa', fontSize: 22, fontWeight: 600 }}>📞 0811-1330-130</div>
      </div>
    </div>
  )
}

// ── C2 — Portrait 1080 × 1350 — Kurikulum ────────────────────────────────────
const KOMPETENSI = [
  'Menyusun komponen React & TypeScript',
  'State, hooks & tampilan interaktif',
  'Merancang database di Supabase',
  'Autentikasi & Row Level Security',
  'Booking, order & alur pembayaran',
  'Ngoding bareng Claude Code (AI)',
  'Deploy & setting custom domain',
  'Problem solving ala developer profesional',
]

function C2() {
  return (
    <div style={{
      width: 1080, height: 1350, background: BG,
      fontFamily: "'Inter',system-ui,sans-serif",
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      padding: '60px 80px',
      boxSizing: 'border-box',
    }}>
      {/* Top gradient bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg,${SPARK},${SIGNAL})` }}/>

      {/* BG glow top-right */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${SIGNAL}15 0%,transparent 70%)`, pointerEvents: 'none' }}/>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 52 }}>
        <div>
          <div style={{ color: SIGNAL, fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Full Stack Bootcamp</div>
          <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: 56, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            Yang Akan<br/>Kamu Kuasai
          </div>
        </div>
        <GlobeMark size={100}/>
      </div>

      {/* Kompetensi list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {KOMPETENSI.map((k, i) => (
          <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: '#111', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '22px 28px' }}>
            <Check/>
            <span style={{ color: TEXT, fontSize: 24, lineHeight: 1.35, fontWeight: 500 }}>{k}</span>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ marginTop: 44, background: `linear-gradient(135deg,${SPARK}22,${SIGNAL}11)`, border: `1px solid ${SPARK}40`, borderRadius: 20, padding: '32px 44px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#fff', fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em' }}>Rp 899.000</div>
          <div style={{ color: SUBTLE, fontSize: 18, marginTop: 4 }}>10 sesi live · sertifikat · Discord</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: SPARK, fontSize: 22, fontWeight: 800 }}>Mulai 11 Juni 2026</div>
          <div style={{ color: '#aaa', fontSize: 18, marginTop: 4 }}>globaldev.sbs</div>
        </div>
      </div>

      {/* Wordmark bottom */}
      <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
        <Wordmark width={220}/>
      </div>
    </div>
  )
}

// ── C3 — Story 1080 × 1920 — Full Story ──────────────────────────────────────
function C3() {
  return (
    <div style={{
      width: 1080, height: 1920, background: BG,
      fontFamily: "'Inter',system-ui,sans-serif",
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Top gradient bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg,${SPARK},${SIGNAL})` }}/>

      {/* BG glow center-top */}
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${SPARK}1a 0%,transparent 70%)`, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: '48%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${SIGNAL}12 0%,transparent 70%)`, pointerEvents: 'none' }}/>

      {/* Rings */}
      <svg width={900} height={900} viewBox="0 0 900 900" fill="none" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', opacity: 0.04 }}>
        {[0.85,0.65,0.45,0.25].map((r,i) => <circle key={i} cx={450} cy={450} r={450*r} stroke="white" strokeWidth="1.5"/>)}
      </svg>

      <div style={{ width: '100%', padding: '80px 100px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flex: 1 }}>

        {/* Wordmark + Eyebrow */}
        <Wordmark width={300}/>
        <div style={{ marginTop: 16, color: SIGNAL, fontSize: 18, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Full Stack Bootcamp</div>

        {/* Globe */}
        <div style={{ marginTop: 56 }}>
          <GlobeMark size={200}/>
        </div>

        {/* Main headline */}
        <div style={{ marginTop: 52, textAlign: 'center', fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: 96, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
          Kerja<br/>jadi Dev
        </div>
        <div style={{ marginTop: 16, textAlign: 'center', fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: 60, fontWeight: 700, color: SPARK, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          dimulai<br/>dari sini.
        </div>

        {/* Sub */}
        <div style={{ marginTop: 36, color: '#a3a3a3', fontSize: 28, fontWeight: 500, textAlign: 'center', lineHeight: 1.45 }}>
          Belajar bareng, proyek nyata,<br/>dibimbing engineer aktif.
        </div>

        {/* Divider */}
        <div style={{ marginTop: 56, width: 200, height: 2, background: `linear-gradient(90deg,transparent,${SPARK},transparent)` }}/>

        {/* Stack */}
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, width: '100%', alignItems: 'center' }}>
          {[['React','#60a5fa'],['TypeScript','#a78bfa'],['Supabase','#34d399']].map(([name, color]) => (
            <div key={name} style={{
              background: `${color}10`, border: `1px solid ${color}35`,
              borderRadius: 16, padding: '20px 0', width: '100%', textAlign: 'center',
              color, fontSize: 32, fontWeight: 700,
            }}>{name}</div>
          ))}
        </div>

        {/* Info cards */}
        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%' }}>
          {[
            { label: 'Mulai', value: '11 Juni 2026', color: SPARK },
            { label: 'Waktu', value: 'Sel & Kam 19.30', color: '#a3a3a3' },
            { label: 'Durasi', value: '10 sesi live', color: '#a3a3a3' },
            { label: 'Kursi', value: '30 peserta', color: '#a3a3a3' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: '#111', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '28px 24px' }}>
              <div style={{ color: SUBTLE, fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
              <div style={{ color, fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{ marginTop: 44, width: '100%', background: `linear-gradient(135deg,${SPARK}22,${SIGNAL}11)`, border: `1px solid ${SPARK}40`, borderRadius: 20, padding: '36px 44px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#888', fontSize: 20, marginBottom: 6 }}>Investasi Program</div>
            <div style={{ color: '#fff', fontSize: 52, fontWeight: 900, letterSpacing: '-0.03em' }}>Rp 899.000</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#aaa', fontSize: 18, marginBottom: 8 }}>Termasuk</div>
            {['10 sesi live','Source code','Sertifikat','Discord'].map(t => (
              <div key={t} style={{ color: '#888', fontSize: 17, lineHeight: 1.5 }}>✓ {t}</div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ width: '100%', background: '#111', borderTop: `1px solid ${BORDER}`, padding: '28px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ color: '#aaa', fontSize: 26, fontWeight: 600 }}>🌐 globaldev.sbs</div>
        <div style={{ color: '#aaa', fontSize: 26, fontWeight: 600 }}>📞 0811-1330-130</div>
      </div>
    </div>
  )
}

// ── Type & config ─────────────────────────────────────────────────────────────
export type CampaignPhotoDef = {
  id: string
  label: string
  format: string
  w: number
  h: number
  El: () => React.ReactElement
}

export const CAMPAIGN_PHOTOS: CampaignPhotoDef[] = [
  { id: 'c1', label: 'C1 — Hero Promo',    format: 'Square 1080×1080',   w: 1080, h: 1080, El: C1 },
  { id: 'c2', label: 'C2 — Kurikulum',     format: 'Portrait 1080×1350', w: 1080, h: 1350, El: C2 },
  { id: 'c3', label: 'C3 — Story Lengkap', format: 'Story 1080×1920',    w: 1080, h: 1920, El: C3 },
]

// ── Card component ────────────────────────────────────────────────────────────
const PREV_W = 280

function CampaignPhotoCard({ photo }: { photo: CampaignPhotoDef }) {
  const scale    = PREV_W / photo.w
  const previewH = Math.round(photo.h * scale)

  const [isCapturing, setIsCapturing] = useState(false)
  const [captureReady, setCaptureReady] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!captureReady || !captureRef.current) return
    setCaptureReady(false)
    html2canvas(captureRef.current, {
      width: photo.w, height: photo.h, scale: 1,
      useCORS: true, logging: false, backgroundColor: null,
    }).then(canvas => {
      canvas.toBlob(blob => {
        if (!blob) { setIsCapturing(false); return }
        const url = URL.createObjectURL(blob)
        const a   = document.createElement('a')
        a.href = url; a.download = `gda-campaign-${photo.id}-${photo.w}x${photo.h}.png`; a.click()
        URL.revokeObjectURL(url)
        setIsCapturing(false)
      }, 'image/png')
    }).catch(() => setIsCapturing(false))
  }, [captureReady, photo])

  useEffect(() => {
    if (!isCapturing) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setCaptureReady(true)))
    return () => cancelAnimationFrame(id)
  }, [isCapturing])

  const fsScale = isFullscreen
    ? Math.min((window.innerHeight * 0.9) / photo.h, (window.innerWidth * 0.9) / photo.w)
    : 1

  return (
    <>
      {/* Hidden full-size render for html2canvas */}
      <div style={{ position: 'fixed', left: '-200vw', top: 0, zIndex: -1, pointerEvents: 'none' }}>
        {isCapturing && (
          <div ref={captureRef} style={{ width: photo.w, height: photo.h, overflow: 'hidden' }}>
            <photo.El />
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div onClick={() => setIsFullscreen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ transform: `scale(${fsScale})`, transformOrigin: 'center', pointerEvents: 'none' }}>
            <photo.El />
          </div>
          <button onClick={() => setIsFullscreen(false)} style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 44, height: 44, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ position: 'fixed', bottom: 20, color: '#444', fontSize: 12 }}>Klik di mana saja untuk tutup · {photo.format}</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Thumbnail */}
        <div
          onClick={() => setIsFullscreen(true)}
          style={{ width: PREV_W, height: previewH, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', flexShrink: 0, background: '#0a0a0a' }}
        >
          <div style={{ width: photo.w, height: photo.h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <photo.El />
          </div>
        </div>

        {/* Label */}
        <div style={{ marginTop: 8, color: '#666', fontSize: 11, textAlign: 'center' }}>
          {photo.label.split(' — ')[1]}
        </div>

        {/* Buttons */}
        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
          <button
            onClick={() => setIsFullscreen(true)}
            style={{ flex: 1, background: '#161616', border: '1px solid #2a2a2a', borderRadius: 8, color: '#888', fontSize: 11, fontWeight: 600, padding: '7px 0', cursor: 'pointer' }}
          >
            Fullscreen
          </button>
          <button
            onClick={() => !isCapturing && setIsCapturing(true)}
            disabled={isCapturing}
            style={{
              flex: 1,
              background: isCapturing ? '#161616' : 'rgba(255,90,31,0.12)',
              border: `1px solid ${isCapturing ? '#2a2a2a' : 'rgba(255,90,31,0.35)'}`,
              borderRadius: 8,
              color: isCapturing ? '#555' : 'var(--spark)',
              fontSize: 11, fontWeight: 700, padding: '7px 0',
              cursor: isCapturing ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}
          >
            {isCapturing ? (
              <>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#555', animation: 'pulse 1s infinite' }}/>
                Rendering…
              </>
            ) : (
              <>↓ PNG</>
            )}
          </button>
        </div>

        {/* Size hint */}
        <div style={{ marginTop: 4, color: '#333', fontSize: 10, textAlign: 'center' }}>
          {photo.w} × {photo.h}
        </div>
      </div>
    </>
  )
}

// ── Main section export ────────────────────────────────────────────────────────
export default function CampaignPhotoSection() {
  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Foto Campaign
        </h2>
        <p style={{ color: '#555', fontSize: 13 }}>
          {CAMPAIGN_PHOTOS.length} aset untuk UGC influencer (ice.id) · Square, Portrait, Story · Download PNG
        </p>
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {CAMPAIGN_PHOTOS.map(photo => <CampaignPhotoCard key={photo.id} photo={photo}/>)}
      </div>
    </section>
  )
}
