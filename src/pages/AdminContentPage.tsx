import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'
import AdminLayout from '../components/AdminLayout'
import { ADS, type VideoDef } from '../components/ContentSection'
import { GOOGLE_ADS, type AdDef } from '../components/GoogleAdsSection'

// ── Video ad fullscreen modal ──────────────────────────────────────────────
const W = 270
const H = 480

function VideoModal({ ad, onClose }: { ad: VideoDef; onClose: () => void }) {
  const scale = Math.min((window.innerHeight * 0.9) / H, (window.innerWidth * 0.9) / W)
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div onClick={e => e.stopPropagation()} style={{ transform: `scale(${scale})`, transformOrigin: 'center', pointerEvents: 'none' }}>
        <ad.El />
      </div>
      <button onClick={onClose} style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      <div style={{ position: 'fixed', bottom: 20, color: '#555', fontSize: 12 }}>Klik di mana saja untuk tutup</div>
    </div>
  )
}

// ── Google Ad fullscreen modal ─────────────────────────────────────────────
function GoogleModal({ ad, onClose }: { ad: AdDef; onClose: () => void }) {
  const scale = Math.min((window.innerHeight * 0.9) / ad.h, (window.innerWidth * 0.9) / ad.w)
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div onClick={e => e.stopPropagation()} style={{ transform: `scale(${scale})`, transformOrigin: 'center', pointerEvents: 'none' }}>
        <ad.El />
      </div>
      <button onClick={onClose} style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      <div style={{ position: 'fixed', bottom: 20, color: '#555', fontSize: 12 }}>Klik di mana saja untuk tutup · {ad.format}</div>
    </div>
  )
}

// ── Type color map ─────────────────────────────────────────────────────────
const TYPE_COLOR: Record<string, string> = {
  'Awareness':          '#fb923c',
  'Education':          '#60a5fa',
  'Engagement':         '#a78bfa',
  'Lead Magnet':        '#34d399',
  'Nurturing':          '#fbbf24',
  'Problem Agitation':  '#f87171',
  'Soft Selling':       '#22d3ee',
  'Social Proof':       '#10b981',
  'Urgency & Scarcity': '#f97316',
  'Hard Selling':       '#FF5A1F',
}

const GOOGLE_FORMAT_LABEL: Record<string, string> = {
  l1: 'Landscape', l2: 'Landscape', l3: 'Landscape',
  s1: 'Square',    s2: 'Square',    s3: 'Square',
  p1: 'Portrait',  p2: 'Portrait',
  t1: 'Tall',      t2: 'Tall',
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function AdminContentPage() {
  const [loading, setLoading] = useState(true)
  const [openVideo, setOpenVideo] = useState<VideoDef | null>(null)
  const [openGoogle, setOpenGoogle] = useState<AdDef | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { navigate('/auth'); return }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (!profile || profile.role !== 'admin') { navigate('/dashboard'); return }
      setLoading(false)
    })
  }, [navigate])

  if (loading) return <Loader />

  // Group video ads by type
  const videoByType = ADS.reduce<Record<string, VideoDef[]>>((acc, ad) => {
    const key = ad.cat
    if (!acc[key]) acc[key] = []
    acc[key].push(ad)
    return acc
  }, {})

  // Group google ads by format label
  const googleByFormat = GOOGLE_ADS.reduce<Record<string, AdDef[]>>((acc, ad) => {
    const key = GOOGLE_FORMAT_LABEL[ad.id] ?? 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(ad)
    return acc
  }, {})

  const videoTypes = Object.keys(videoByType)
  const googleFormats = ['Landscape', 'Square', 'Portrait', 'Tall']

  return (
    <AdminLayout>
      {openVideo && <VideoModal ad={openVideo} onClose={() => setOpenVideo(null)} />}
      {openGoogle && <GoogleModal ad={openGoogle} onClose={() => setOpenGoogle(null)} />}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: 'var(--signal)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Admin Panel</p>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>Content</h1>
          <p style={{ color: '#555', fontSize: 13 }}>{ADS.length} video ads · {GOOGLE_ADS.length} Google Ads images</p>
        </div>

        {/* ══ SECTION 1: Video Ads ══════════════════════════════════════════ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid #1f1f1f' }}>
            <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em' }}>Video Ads</h2>
            <span style={{ color: '#444', fontSize: 13 }}>Portrait · 270 × 480 · Animated</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {videoTypes.map(type => {
              const color = TYPE_COLOR[type] ?? '#888'
              const ads = videoByType[type]
              return (
                <div key={type}>
                  {/* Type header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ color, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{type}</span>
                  </div>

                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {ads.map(ad => (
                      <div key={ad.id}>
                        {/* Thumbnail */}
                        <div
                          onClick={() => setOpenVideo(ad)}
                          style={{ width: W, height: H, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                        >
                          <div style={{ pointerEvents: 'none' }}>
                            <ad.El />
                          </div>
                          {/* Hover overlay */}
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
                          >
                            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, opacity: 0, transition: 'opacity 0.2s', pointerEvents: 'none' }}
                              ref={el => {
                                const parent = el?.parentElement
                                if (parent) {
                                  parent.onmouseenter = (ev) => { (ev.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.45)'; if (el) el.style.opacity = '1' }
                                  parent.onmouseleave = (ev) => { (ev.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0)'; if (el) el.style.opacity = '0' }
                                }
                              }}
                            >
                              Layar Penuh ↗
                            </span>
                          </div>
                        </div>
                        {/* Duration */}
                        <div style={{ marginTop: 8, color: '#555', fontSize: 12, textAlign: 'center' }}>{ad.dur} detik</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ══ SECTION 2: Google Ads Images ═════════════════════════════════ */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid #1f1f1f' }}>
            <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em' }}>Google Ads — Static Images</h2>
            <span style={{ color: '#444', fontSize: 13 }}>10 formats · Click to preview full size</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {googleFormats.map(fmt => {
              const ads = googleByFormat[fmt] ?? []
              if (ads.length === 0) return null
              const sizeLabel = ads[0].format.split(' ').slice(1).join(' ')
              const PREVIEW_W = 280
              return (
                <div key={fmt}>
                  {/* Format header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--signal)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{fmt}</span>
                    <span style={{ color: '#444', fontSize: 12 }}>{sizeLabel}</span>
                  </div>

                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {ads.map(ad => {
                      const scale = PREVIEW_W / ad.w
                      const previewH = ad.h * scale
                      return (
                        <div key={ad.id}>
                          <div
                            onClick={() => setOpenGoogle(ad)}
                            style={{ width: PREVIEW_W, height: previewH, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                          >
                            <div style={{ width: ad.w, height: ad.h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                              <ad.El />
                            </div>
                          </div>
                          <div style={{ marginTop: 8, color: '#555', fontSize: 12, textAlign: 'center' }}>{ad.label.split(' — ')[1]}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
