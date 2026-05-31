import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import html2canvas from 'html2canvas'
import Loader from '../components/Loader'
import AdminLayout from '../components/AdminLayout'
import { GOOGLE_ADS, type AdDef } from '../components/GoogleAdsSection'

const FORMAT_LABEL: Record<string, string> = {
  l1:'Landscape',l2:'Landscape',l3:'Landscape',l4:'Landscape',l5:'Landscape',l6:'Landscape',
  s1:'Square',s2:'Square',s3:'Square',s4:'Square',s5:'Square',s6:'Square',
  p1:'Portrait',p2:'Portrait',p3:'Portrait',p4:'Portrait',
  t1:'Tall',t2:'Tall',t3:'Tall',t4:'Tall',
}
const FORMAT_ORDER = ['Landscape', 'Square', 'Portrait', 'Tall']
const PREVIEW_W = 280

export default function AdminContentPage() {
  const [loading, setLoading]           = useState(true)
  const [openAd, setOpenAd]             = useState<AdDef | null>(null)
  const [capturing, setCapturing]       = useState<AdDef | null>(null)
  const [captureReady, setCaptureReady] = useState(false)
  const captureRef                      = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // ── Auth ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { navigate('/auth'); return }
      const { data: p } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (!p || p.role !== 'admin') { navigate('/dashboard'); return }
      setLoading(false)
    })
  }, [navigate])

  // ── Capture: fire html2canvas once the hidden element is rendered ────────────
  useEffect(() => {
    if (!captureReady || !capturing || !captureRef.current) return
    setCaptureReady(false)

    html2canvas(captureRef.current, {
      width: capturing.w,
      height: capturing.h,
      scale: 1,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    }).then(canvas => {
      canvas.toBlob(blob => {
        if (!blob) { setCapturing(null); return }
        const url = URL.createObjectURL(blob)
        const a   = document.createElement('a')
        a.href     = url
        a.download = `gda-${capturing.id}-${capturing.w}x${capturing.h}.png`
        a.click()
        URL.revokeObjectURL(url)
        setCapturing(null)
      }, 'image/png')
    }).catch(() => setCapturing(null))
  }, [captureReady, capturing])

  // When `capturing` is set, wait one frame for React to paint the hidden div,
  // then signal that it's ready.
  useEffect(() => {
    if (!capturing) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setCaptureReady(true)))
    return () => cancelAnimationFrame(id)
  }, [capturing])

  if (loading) return <Loader />

  const byFmt = GOOGLE_ADS.reduce<Record<string, AdDef[]>>((acc, ad) => {
    const key = FORMAT_LABEL[ad.id] ?? 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(ad)
    return acc
  }, {})

  const fsScale = openAd
    ? Math.min((window.innerHeight * 0.9) / openAd.h, (window.innerWidth * 0.9) / openAd.w)
    : 1

  return (
    <AdminLayout>

      {/* ── Hidden full-size render target for html2canvas ── */}
      <div style={{ position: 'fixed', left: '-200vw', top: 0, zIndex: -1, pointerEvents: 'none' }}>
        {capturing && (
          <div ref={captureRef} style={{ width: capturing.w, height: capturing.h, overflow: 'hidden' }}>
            <capturing.El />
          </div>
        )}
      </div>

      {/* ── Fullscreen modal ── */}
      {openAd && (
        <div onClick={() => setOpenAd(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ transform: `scale(${fsScale})`, transformOrigin: 'center', pointerEvents: 'none' }}>
            <openAd.El />
          </div>
          <button onClick={() => setOpenAd(null)} style={{ position: 'fixed', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 44, height: 44, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ position: 'fixed', bottom: 20, color: '#444', fontSize: 12 }}>Klik di mana saja untuk tutup · {openAd.format}</div>
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: 'var(--signal)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Admin Panel</p>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>Content</h1>
          <p style={{ color: '#555', fontSize: 13 }}>{GOOGLE_ADS.length} Google Ads images · Brand awareness · Download PNG per image</p>
        </div>

        {/* Ads grouped by format */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {FORMAT_ORDER.map(fmt => {
            const ads = byFmt[fmt] ?? []
            if (!ads.length) return null
            const sizeLabel = ads[0].format.split(' ').slice(1).join(' ')

            return (
              <div key={fmt}>
                {/* Format header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #1f1f1f' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)', flexShrink: 0 }}/>
                  <span style={{ color: 'var(--signal)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{fmt}</span>
                  <span style={{ color: '#444', fontSize: 12 }}>{sizeLabel}</span>
                </div>

                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {ads.map(ad => {
                    const scale    = PREVIEW_W / ad.w
                    const previewH = ad.h * scale
                    const isDownloading = capturing?.id === ad.id

                    return (
                      <div key={ad.id} style={{ display: 'flex', flexDirection: 'column' }}>

                        {/* Thumbnail */}
                        <div
                          onClick={() => setOpenAd(ad)}
                          style={{ width: PREVIEW_W, height: previewH, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', flexShrink: 0 }}
                        >
                          <div style={{ width: ad.w, height: ad.h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                            <ad.El />
                          </div>
                        </div>

                        {/* Label */}
                        <div style={{ marginTop: 8, color: '#666', fontSize: 11, textAlign: 'center' }}>
                          {ad.label.split(' — ')[1]}
                        </div>

                        {/* Action buttons */}
                        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => setOpenAd(ad)}
                            style={{ flex: 1, background: '#161616', border: '1px solid #2a2a2a', borderRadius: 8, color: '#888', fontSize: 11, fontWeight: 600, padding: '7px 0', cursor: 'pointer' }}
                          >
                            Fullscreen
                          </button>
                          <button
                            onClick={() => !isDownloading && setCapturing(ad)}
                            disabled={isDownloading}
                            style={{
                              flex: 1,
                              background: isDownloading ? '#161616' : 'rgba(255,90,31,0.12)',
                              border: `1px solid ${isDownloading ? '#2a2a2a' : 'rgba(255,90,31,0.35)'}`,
                              borderRadius: 8,
                              color: isDownloading ? '#555' : 'var(--spark)',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '7px 0',
                              cursor: isDownloading ? 'default' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 4,
                            }}
                          >
                            {isDownloading ? (
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
                          {ad.w} × {ad.h}
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

      <style>{`@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
    </AdminLayout>
  )
}
