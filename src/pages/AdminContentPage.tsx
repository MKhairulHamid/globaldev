import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'
import AdminLayout from '../components/AdminLayout'
import { GOOGLE_ADS, type AdDef } from '../components/GoogleAdsSection'

// ── Google Ad fullscreen modal ─────────────────────────────────────────────
function GoogleModal({ ad, onClose }: { ad: AdDef; onClose: () => void }) {
  const scale = Math.min((window.innerHeight * 0.9) / ad.h, (window.innerWidth * 0.9) / ad.w)
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ transform: `scale(${scale})`, transformOrigin: 'center', pointerEvents: 'none' }}>
        <ad.El />
      </div>
      <button onClick={onClose} style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      <div style={{ position: 'fixed', bottom: 20, color: '#555', fontSize: 12 }}>Klik di mana saja untuk tutup · {ad.format}</div>
    </div>
  )
}

const GOOGLE_FORMAT_LABEL: Record<string, string> = {
  l1: 'Landscape', l2: 'Landscape', l3: 'Landscape',
  s1: 'Square',    s2: 'Square',    s3: 'Square',
  p1: 'Portrait',  p2: 'Portrait',
  t1: 'Tall',      t2: 'Tall',
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true)
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

  const googleByFormat = GOOGLE_ADS.reduce<Record<string, AdDef[]>>((acc, ad) => {
    const key = GOOGLE_FORMAT_LABEL[ad.id] ?? 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(ad)
    return acc
  }, {})

  const googleFormats = ['Landscape', 'Square', 'Portrait', 'Tall']

  return (
    <AdminLayout>
      {openGoogle && <GoogleModal ad={openGoogle} onClose={() => setOpenGoogle(null)} />}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: 'var(--signal)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Admin Panel</p>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>Content</h1>
          <p style={{ color: '#555', fontSize: 13 }}>{GOOGLE_ADS.length} Google Ads images · Click any to preview full size</p>
        </div>

        {/* Google Ads grouped by format */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {googleFormats.map(fmt => {
            const ads = googleByFormat[fmt] ?? []
            if (!ads.length) return null
            const sizeLabel = ads[0].format.split(' ').slice(1).join(' ')
            const PREVIEW_W = 280
            return (
              <div key={fmt}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid #1f1f1f' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)', flexShrink: 0 }}/>
                  <span style={{ color: 'var(--signal)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{fmt}</span>
                  <span style={{ color: '#444', fontSize: 12 }}>{sizeLabel}</span>
                </div>

                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
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
                        <div style={{ marginTop: 8, color: '#555', fontSize: 12, textAlign: 'center' }}>
                          {ad.label.split(' — ')[1]}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
