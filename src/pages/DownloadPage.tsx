import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'
import Loader from '../components/Loader'
import { authEntryPath } from '../lib/authEntry'

const MATERIAL_SLUG = 'free-material'
const MATERIAL_FILE = 'free-material.pdf'
const MATERIAL_TITLE = 'Panduan Menilai Kesiapan Belajar Full Stack'

export default function DownloadPage() {
  const [status, setStatus] = useState<'checking' | 'unauthenticated' | 'downloading' | 'done' | 'error'>('checking')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function run() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setStatus('unauthenticated'); return }

      setStatus('downloading')

      const { data, error } = await supabase.storage
        .from('materials')
        .createSignedUrl(MATERIAL_FILE, 60)

      if (error || !data?.signedUrl) {
        setErrorMsg('Materi belum tersedia. Hubungi kami via WhatsApp.')
        setStatus('error')
        return
      }

      // Record download (fire-and-forget, ignore errors)
      await supabase.from('material_downloads').insert({
        user_id: session.user.id,
        material_slug: MATERIAL_SLUG,
      })

      window.open(data.signedUrl, '_blank')
      setStatus('done')
    }
    run()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5' }}>
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '16px 24px' }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo height={22} /></a>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>

        {status === 'checking' && <Loader />}

        {status === 'unauthenticated' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>📚</div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              {MATERIAL_TITLE}
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
              Materi ini gratis untuk siapa pun yang daftar. Buat akun dulu — gratis, tidak perlu bayar apa-apa — lalu materi langsung bisa diunduh.
            </p>
            <a
              href={authEntryPath()}
              style={{
                display: 'inline-block', background: 'var(--spark)', color: '#fff',
                fontWeight: 700, fontSize: '15px', padding: '14px 32px',
                borderRadius: '12px', textDecoration: 'none', marginBottom: '16px',
              }}
            >
              Daftar Gratis untuk Download →
            </a>
            <p style={{ color: '#444', fontSize: '12px' }}>Gratis · Tidak perlu bayar · Bisa download langsung setelah daftar</p>
          </>
        )}

        {status === 'downloading' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⬇️</div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Menyiapkan file kamu...
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px' }}>Sebentar ya, link download sedang disiapkan.</p>
          </>
        )}

        {status === 'done' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>✅</div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Download dimulai!
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
              File sudah terbuka di tab baru. Kalau belum muncul, cek pengaturan pop-up browser kamu.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block', background: '#161616', color: '#a3a3a3',
                fontWeight: 600, fontSize: '14px', padding: '12px 24px',
                borderRadius: '10px', textDecoration: 'none', border: '1px solid #2a2a2a',
              }}
            >
              ← Kembali ke halaman utama
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⚠️</div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Ups, ada kendala
            </h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
              {errorMsg}
            </p>
            <a
              href="https://wa.me/628111330130"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', background: '#25d366', color: '#fff',
                fontWeight: 700, fontSize: '15px', padding: '14px 28px',
                borderRadius: '12px', textDecoration: 'none',
              }}
            >
              Chat via WhatsApp
            </a>
          </>
        )}

      </div>
    </div>
  )
}
