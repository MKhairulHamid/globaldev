import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function FreeContentSection() {
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const cleaned = phone.trim().replace(/\s|-/g, '')
    if (cleaned.replace(/\D/g, '').length < 8) {
      setError('Nomor WhatsApp tidak valid')
      return
    }
    setLoading(true)
    setError(null)
    const { error: err } = await supabase.from('wa_leads').insert({ phone: cleaned })
    if (err) { setError('Gagal menyimpan. Coba lagi.'); setLoading(false); return }
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="section">
      <div style={{
        border: '1px solid #2a2a2a',
        borderRadius: '20px',
        padding: '48px 40px',
        background: '#111',
        maxWidth: '560px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)',
          borderRadius: '999px', padding: '6px 16px', fontSize: '13px',
          color: '#25d366', fontWeight: 600, marginBottom: '24px',
        }}>
          <MessageCircle size={14} />
          Gratis via WhatsApp
        </div>

        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.03em', marginBottom: '12px', lineHeight: 1.25 }}>
          Belum yakin? Lihat dulu.
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
          Kami kirim satu materi ke WhatsApp kamu — panduan untuk menilai sendiri
          apakah bootcamp ini cocok untukmu. Gratis, tanpa harus daftar dulu.
        </p>

        {submitted ? (
          <div style={{
            background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)',
            borderRadius: '14px', padding: '20px 24px',
          }}>
            <p style={{ color: '#25d366', fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>
              Nomor kamu sudah kami catat.
            </p>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.65 }}>
              Materi akan dikirim via WhatsApp dalam 1×24 jam. Pantau pesan masuk ya!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Nomor WhatsApp kamu (contoh: 08xxxxxxxxxx)"
              required
              style={{
                background: '#161616', border: '1px solid #2a2a2a', borderRadius: '10px',
                padding: '13px 16px', color: '#fff', fontSize: '15px', outline: 'none', width: '100%',
              }}
            />
            {error && <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'left' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#25d366', color: '#fff', border: 'none', borderRadius: '10px',
                padding: '13px', fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Menyimpan...' : 'Kirim ke WhatsApp Saya →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
