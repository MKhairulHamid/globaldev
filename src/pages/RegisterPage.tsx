import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'

type Background = 'it_fresh_grad' | 'professional_non_it' | 'other'

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  // Step 1 fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [background, setBackground] = useState<Background | null>(null)
  const [occupation, setOccupation] = useState('')
  const [goals, setGoals] = useState('')

  // Step 2 fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submitStep1(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Save lead before auth — ensures data is captured even if signup fails
    const { data, error: err } = await supabase.rpc('save_lead', {
      p_full_name: fullName.trim(),
      p_phone: phone.trim(),
      p_background: background!,
      p_occupation: occupation.trim() || null,
      p_goals: goals.trim(),
    })

    if (err) {
      // Don't block — just log and continue
      console.warn('Lead save failed:', err.message)
    } else {
      setLeadId(data as string)
    }

    setLoading(false)
    setStep(2)
  }

  async function submitStep2(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Update lead with email first (before auth attempt)
    if (leadId) {
      await supabase.rpc('link_lead', { p_lead_id: leadId, p_email: email.trim() })
    }

    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin },
    })

    if (authErr) {
      setError(authErr.message === 'User already registered' ? 'Email ini sudah terdaftar. Coba masuk.' : authErr.message)
      setLoading(false)
      return
    }

    // Fill profile with form data
    if (authData.user) {
      await supabase.from('profiles').upsert({
        id: authData.user.id,
        full_name: fullName.trim(),
        phone: phone.trim(),
        background,
        occupation: occupation.trim() || null,
        goals: goals.trim(),
      })

      // Link lead to user
      if (leadId) {
        await supabase.rpc('link_lead', { p_lead_id: leadId, p_user_id: authData.user.id })
      }
    }

    setLoading(false)
    setDone(true)
  }

  async function handleGoogle() {
    // Save lead before OAuth (no email yet) — reuse leadId from step 1 if present
    let id = leadId
    if (!id && fullName && phone && background && goals) {
      const { data } = await supabase.rpc('save_lead', {
        p_full_name: fullName.trim(),
        p_phone: phone.trim(),
        p_background: background,
        p_occupation: occupation.trim() || null,
        p_goals: goals.trim(),
      })
      if (data) id = data as string
    }
    if (id) sessionStorage.setItem('lead_id', id)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  const inp: React.CSSProperties = {
    width: '100%', background: '#161616', border: '1px solid #2a2a2a',
    borderRadius: '10px', padding: '12px 16px', color: '#fff', fontSize: '15px', outline: 'none',
  }
  const label: React.CSSProperties = { color: '#a3a3a3', fontSize: '13px', display: 'block', marginBottom: '6px' }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <a href="/" style={{ marginBottom: '40px' }}><Logo height={24} /></a>

      <div style={{ width: '100%', maxWidth: '420px', background: '#111', border: '1px solid #222', borderRadius: '20px', padding: '36px' }}>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
          {[1, 2].map(n => (
            <div key={n} style={{ flex: 1, height: '3px', borderRadius: '2px', background: step >= n ? '#f97316' : '#222' }} />
          ))}
        </div>

        {/* ── Step 1: Personal Info ── */}
        {step === 1 && !done && (
          <>
            <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', marginBottom: '6px' }}>Cerita sedikit tentang kamu</h1>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '28px' }}>Langkah 1 dari 2 · Belum daftar akun</p>

            <form onSubmit={submitStep1} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={label}>Nama lengkap *</label>
                <input style={inp} value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="Nama kamu" autoComplete="name" />
              </div>
              <div>
                <label style={label}>Nomor WhatsApp *</label>
                <input style={inp} value={phone} onChange={e => setPhone(e.target.value)} required placeholder="08xx-xxxx-xxxx" type="tel" autoComplete="tel" />
              </div>
              <div>
                <label style={{ ...label, marginBottom: '10px' }}>Latar belakang *</label>
                {[
                  { value: 'it_fresh_grad', label: 'Fresh graduate IT' },
                  { value: 'professional_non_it', label: 'Profesional non-IT' },
                  { value: 'other', label: 'Lainnya' },
                ].map(opt => (
                  <label key={opt.value} style={{ display: 'flex', gap: '10px', marginBottom: '10px', cursor: 'pointer', alignItems: 'center' }}>
                    <input type="radio" name="bg" value={opt.value} checked={background === opt.value}
                      onChange={() => setBackground(opt.value as Background)} style={{ accentColor: '#f97316' }} />
                    <span style={{ color: '#c3c3c3', fontSize: '14px' }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {background && background !== 'it_fresh_grad' && (
                <div>
                  <label style={label}>Profesi / bidang kerja</label>
                  <input style={inp} value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="Fotografer, tutor, dokter, dll." autoComplete="organization-title" />
                </div>
              )}
              <div>
                <label style={label}>Apa yang ingin kamu bangun? *</label>
                <textarea style={{ ...inp, minHeight: '90px', resize: 'vertical' }} value={goals}
                  onChange={e => setGoals(e.target.value)} required placeholder="Ceritakan ide atau tujuanmu..." />
              </div>

              <button type="submit" disabled={loading || !background}
                style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: loading || !background ? 0.6 : 1 }}>
                {loading ? 'Menyimpan...' : 'Lanjutkan →'}
              </button>
            </form>

            <p style={{ color: '#444', fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
              Sudah punya akun? <a href="/auth" style={{ color: '#f97316', textDecoration: 'none' }}>Masuk di sini</a>
            </p>
          </>
        )}

        {/* ── Step 2: Account ── */}
        {step === 2 && !done && (
          <>
            <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', marginBottom: '6px' }}>Buat akun kamu</h1>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '28px' }}>Langkah 2 dari 2 · Data kamu sudah tersimpan</p>

            {/* Google */}
            <button onClick={handleGoogle}
              style={{ width: '100%', background: '#fff', border: 'none', borderRadius: '10px', padding: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#111', cursor: 'pointer', marginBottom: '16px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Daftar dengan Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ flex: 1, height: '1px', background: '#222' }} />
              <span style={{ color: '#444', fontSize: '12px' }}>atau</span>
              <div style={{ flex: 1, height: '1px', background: '#222' }} />
            </div>

            <form onSubmit={submitStep2} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={label}>Email *</label>
                <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="email@kamu.com" autoComplete="email" />
              </div>
              <div>
                <label style={label}>Password (min 8 karakter) *</label>
                <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="••••••••" autoComplete="new-password" />
              </div>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#f87171', fontSize: '13px' }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Mendaftar...' : 'Selesai Daftar'}
              </button>
            </form>

            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#555', fontSize: '13px', cursor: 'pointer', marginTop: '12px', width: '100%' }}>
              ← Kembali
            </button>
          </>
        )}

        {/* ── Done: Check Email ── */}
        {done && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📬</div>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', marginBottom: '10px' }}>Cek email kamu</h2>
            <p style={{ color: '#a3a3a3', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              Kami kirim link konfirmasi ke <strong style={{ color: '#fff' }}>{email}</strong>.<br />
              Klik link itu untuk mengaktifkan akun dan lanjut ke pembayaran.
            </p>
            <p style={{ color: '#555', fontSize: '13px' }}>
              Sudah konfirmasi?{' '}
              <a href="/auth" style={{ color: '#f97316', textDecoration: 'none' }}>Masuk di sini</a>
            </p>
          </div>
        )}
      </div>

      <a href="/" style={{ marginTop: '24px', color: '#555', fontSize: '13px', textDecoration: 'none' }}>← Kembali ke halaman utama</a>
    </div>
  )
}
