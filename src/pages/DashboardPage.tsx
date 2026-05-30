import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Profile, Registration } from '../types'
import Logo from '../components/Logo'
import WhatsAppButton from '../components/WhatsAppButton'

const WA_URL = 'https://wa.me/628111330130'

const formatAmount = (n: number) =>
  n.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Form state
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [background, setBackground] = useState<Profile['background']>(null)
  const [occupation, setOccupation] = useState('')
  const [goals, setGoals] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/auth'); return }

      // Link lead saved before Google OAuth
      const storedLeadId = sessionStorage.getItem('lead_id')
      if (storedLeadId) {
        await supabase.from('leads').update({ user_id: user.id }).eq('id', storedLeadId)
        sessionStorage.removeItem('lead_id')
      }

      // Ensure profile row exists (fallback if trigger failed)
      await supabase.from('profiles').upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true })

      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (p) {
        setProfile(p)
        setFullName(p.full_name ?? '')
        setPhone(p.phone ?? '')
        setBackground(p.background)
        setOccupation(p.occupation ?? '')
        setGoals(p.goals ?? '')
      }

      const { data: r } = await supabase.from('registrations').select('*').eq('user_id', user.id).single()
      if (r) setRegistration(r)

      setLoading(false)
    }
    load()
  }, [navigate])

  const profileComplete = !!(profile?.full_name && profile?.phone && profile?.background && profile?.goals)

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const { error: err } = await supabase.from('profiles').update({
      full_name: fullName.trim(),
      phone: phone.trim(),
      background,
      occupation: occupation.trim() || null,
      goals: goals.trim(),
    }).eq('id', profile!.id)
    if (err) { setError(err.message); setSaving(false); return }
    setProfile(prev => prev ? { ...prev, full_name: fullName, phone, background, occupation, goals } : prev)
    setSaving(false)
  }

  async function proceedToPayment() {
    setSaving(true)
    setError(null)
    const { data, error: err } = await supabase.rpc('assign_registration')
    if (err) { setError(err.message); setSaving(false); return }
    setRegistration(data as Registration)
    setSaving(false)
  }

  async function confirmTransfer() {
    setConfirming(true)
    setError(null)
    const { error: err } = await supabase.rpc('submit_transfer')
    if (err) { setError(err.message); setConfirming(false); return }
    setRegistration(prev => prev ? { ...prev, payment_status: 'waiting_confirmation' } : prev)
    setConfirming(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const inp: React.CSSProperties = {
    width: '100%',
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#555', fontSize: '14px' }}>Memuat...</span>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5' }}>
      {/* Nav */}
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo height={22} /></a>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>WhatsApp ↗</a>
          <button onClick={signOut} style={{ background: 'none', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#666', fontSize: '13px', padding: '6px 14px', cursor: 'pointer' }}>Keluar</button>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px' }}>

        {/* ── Step 1: Complete Profile ── */}
        {!profileComplete && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Langkah 1 dari 2</p>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>Lengkapi profilmu dulu</h1>
              <p style={{ color: '#666', fontSize: '14px' }}>Kami perlu beberapa info sebelum kamu lanjut ke pembayaran.</p>
            </div>

            <form onSubmit={saveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ color: '#a3a3a3', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Nama lengkap *</label>
                <input style={inp} value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="Nama kamu" />
              </div>
              <div>
                <label style={{ color: '#a3a3a3', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Nomor WhatsApp *</label>
                <input style={inp} value={phone} onChange={e => setPhone(e.target.value)} required placeholder="08xx-xxxx-xxxx" type="tel" />
              </div>
              <div>
                <label style={{ color: '#a3a3a3', fontSize: '13px', display: 'block', marginBottom: '10px' }}>Latar belakang *</label>
                {[
                  { value: 'it_fresh_grad', label: 'Fresh graduate IT' },
                  { value: 'professional_non_it', label: 'Profesional non-IT' },
                  { value: 'other', label: 'Lainnya' },
                ].map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="background"
                      value={opt.value}
                      checked={background === opt.value}
                      onChange={() => setBackground(opt.value as Profile['background'])}
                      style={{ accentColor: '#f97316' }}
                    />
                    <span style={{ color: '#c3c3c3', fontSize: '14px' }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {background !== 'it_fresh_grad' && (
                <div>
                  <label style={{ color: '#a3a3a3', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Profesi / bidang kerja</label>
                  <input style={inp} value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="Fotografer, tutor, dokter, dll." />
                </div>
              )}
              <div>
                <label style={{ color: '#a3a3a3', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Apa yang ingin kamu bangun? *</label>
                <textarea
                  style={{ ...inp, minHeight: '100px', resize: 'vertical' }}
                  value={goals}
                  onChange={e => setGoals(e.target.value)}
                  required
                  placeholder="Ceritakan ide atau tujuanmu..."
                />
              </div>
              {error && <p style={{ color: '#f87171', fontSize: '13px' }}>{error}</p>}
              <button type="submit" disabled={saving || !background} style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : 'Simpan dan Lanjutkan →'}
              </button>
            </form>
          </>
        )}

        {/* ── Step 2: Payment ── */}
        {profileComplete && !registration && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Langkah 2 dari 2</p>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>Halo, {profile?.full_name?.split(' ')[0]} 👋</h1>
              <p style={{ color: '#666', fontSize: '14px' }}>Profil sudah lengkap. Lanjutkan ke pembayaran untuk mengamankan tempat kamu.</p>
            </div>
            {error && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
            <button onClick={proceedToPayment} disabled={saving} style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 32px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Memproses...' : 'Lihat Detail Pembayaran →'}
            </button>
          </>
        )}

        {/* ── Payment Instructions ── */}
        {profileComplete && registration?.payment_status === 'pending' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Pembayaran</p>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>Halo, {profile?.full_name?.split(' ')[0]} 👋</h1>
              <p style={{ color: '#666', fontSize: '14px' }}>Transfer ke rekening berikut, lalu konfirmasi di bawah.</p>
            </div>

            <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>Bank</p>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>BCA Syariah</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>Nomor Rekening</p>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '22px', letterSpacing: '0.05em' }}>8880862811</p>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>Atas Nama</p>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>M Khairul Hamid</p>
                </div>
                <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '20px' }}>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>Jumlah transfer (unik untuk kamu)</p>
                  <p style={{ color: '#f97316', fontWeight: 800, fontSize: '28px', letterSpacing: '-0.02em' }}>
                    {formatAmount(registration.unique_amount)}
                  </p>
                  <p style={{ color: '#555', fontSize: '12px', marginTop: '6px' }}>Transfer jumlah persis ini agar transaksi kamu bisa dikonfirmasi dengan cepat.</p>
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

            <button
              onClick={confirmTransfer}
              disabled={confirming}
              style={{ width: '100%', background: '#f97316', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginBottom: '12px', opacity: confirming ? 0.7 : 1 }}
            >
              {confirming ? 'Memproses...' : '✓ Saya Sudah Transfer'}
            </button>
            <p style={{ color: '#555', fontSize: '12px', textAlign: 'center' }}>
              Ada pertanyaan?{' '}
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', textDecoration: 'none' }}>Chat via WhatsApp</a>
            </p>
          </>
        )}

        {/* ── Waiting Confirmation ── */}
        {registration?.payment_status === 'waiting_confirmation' && (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⏳</div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>Transfer diterima, menunggu konfirmasi</h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '8px' }}>
              Kami akan konfirmasi pembayaran kamu dalam 1×24 jam kerja.
            </p>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>
              Jumlah transfer: <strong style={{ color: '#f97316' }}>{registration?.unique_amount ? formatAmount(registration.unique_amount) : ''}</strong>
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '14px 28px', borderRadius: '12px', fontSize: '15px' }}
            >
              Chat via WhatsApp
            </a>
          </div>
        )}

        {/* ── Confirmed ── */}
        {registration?.payment_status === 'confirmed' && (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉</div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>Pembayaran dikonfirmasi!</h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '8px' }}>
              Selamat, <strong style={{ color: '#fff' }}>{profile?.full_name?.split(' ')[0]}</strong>. Kamu resmi terdaftar di Cohort Juni 2026.
            </p>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>Kelas mulai 10 Juni 2026. Kami akan kirim detail via WhatsApp.</p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '14px 28px', borderRadius: '12px', fontSize: '15px' }}
            >
              Chat WhatsApp untuk info Discord
            </a>
          </div>
        )}

        {/* ── Rejected ── */}
        {registration?.payment_status === 'rejected' && (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>❌</div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>Transfer tidak terkonfirmasi</h1>
            {registration.admin_notes && (
              <p style={{ color: '#a3a3a3', fontSize: '14px', marginBottom: '16px' }}>Catatan: {registration.admin_notes}</p>
            )}
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>Hubungi kami via WhatsApp untuk informasi lebih lanjut.</p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '14px 28px', borderRadius: '12px', fontSize: '15px' }}
            >
              Hubungi via WhatsApp
            </a>
          </div>
        )}
      </div>
      <WhatsAppButton />
    </div>
  )
}
