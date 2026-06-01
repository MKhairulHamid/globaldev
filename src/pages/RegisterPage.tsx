import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'

type Background = 'it_fresh_grad' | 'professional_non_it' | 'other'
type Step = 1 | 2 | 'done'

function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  const normalized = digits.startsWith('62') ? '0' + digits.slice(2) : digits
  if (!normalized.startsWith('08')) return 'Nomor WhatsApp harus diawali 08 atau +62'
  if (normalized.length < 10 || normalized.length > 13) return 'Nomor WhatsApp harus 10–13 digit'
  return null
}

function validateEmail(value: string): string | null {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
    ? null
    : 'Format email tidak valid'
}

const BG_OPTIONS: { value: Background; label: string }[] = [
  { value: 'it_fresh_grad', label: 'Fresh grad IT' },
  { value: 'professional_non_it', label: 'Profesional non-IT' },
  { value: 'other', label: 'Lainnya' },
]

const BENEFITS = [
  '10 sesi live via Google Meet',
  'Komunitas Discord eksklusif',
  'Source code proyek lengkap',
  'Rekaman semua sesi tersedia',
  'Proyek full stack dari nol sampai online',
]

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [background, setBackground] = useState<Background | null>(null)
  const [occupation, setOccupation] = useState('')
  const [goals, setGoals] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [leadId, setLeadId] = useState<string | null>(null)

  const firstName = fullName.trim().split(' ')[0] || ''
  const stepNum = step === 'done' ? 3 : step

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!fullName.trim()) { setError('Nama wajib diisi'); return }
    const phoneErr = validatePhone(phone)
    setPhoneError(phoneErr)
    if (phoneErr) return
    if (!background) { setError('Pilih latar belakangmu'); return }
    if (goals.trim().length < 3) { setError('Ceritakan tujuanmu (min. 3 karakter)'); return }

    setLoading(true)
    const { data } = await supabase.rpc('save_lead', {
      p_full_name: fullName.trim(),
      p_phone: phone.trim(),
      p_background: background,
      p_occupation: occupation.trim() || null,
      p_goals: goals.trim(),
    })
    if (data) setLeadId(data as string)
    setLoading(false)
    setStep(2)
  }

  async function handleGoogle() {
    let id = leadId
    if (!id) {
      const { data } = await supabase.rpc('save_lead', {
        p_full_name: fullName.trim(),
        p_phone: phone.trim(),
        p_background: background!,
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

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const emailErr = validateEmail(email)
    setEmailError(emailErr)
    if (emailErr) return
    if (password.length < 8) { setError('Password minimal 8 karakter'); return }

    setLoading(true)
    if (leadId) await supabase.rpc('link_lead', { p_lead_id: leadId, p_email: email.trim() })

    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin },
    })

    if (authErr) {
      setLoading(false)
      setError(
        authErr.message === 'User already registered'
          ? 'Email ini sudah terdaftar. Masuk lewat halaman login.'
          : authErr.message
      )
      return
    }

    if (authData.user) {
      await supabase.from('profiles').upsert({
        id: authData.user.id,
        full_name: fullName.trim(),
        phone: phone.trim(),
        background,
        occupation: occupation.trim() || null,
        goals: goals.trim(),
      })
      if (leadId) await supabase.rpc('link_lead', { p_lead_id: leadId, p_user_id: authData.user.id })
    }

    setLoading(false)
    setStep('done')
  }

  const inp: React.CSSProperties = {
    width: '100%',
    background: '#161616',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '12px 14px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s ease',
  }
  const lbl: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#888',
    marginBottom: '7px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .reg-left { width: 400px; flex-shrink: 0; background: #0d0d0d; border-right: 1px solid #1a1a1a; padding: 48px 40px; display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
        .reg-mobile-header { display: none; }
        @media (max-width: 800px) {
          .reg-left { display: none !important; }
          .reg-mobile-header { display: block; }
        }
        .reg-inp:focus { border-color: rgba(255,90,31,0.45) !important; box-shadow: 0 0 0 3px rgba(255,90,31,0.07); }
        .reg-bg-btn:hover { border-color: rgba(255,90,31,0.3) !important; color: #ccc !important; }
        .reg-back:hover { color: #aaa !important; }
        .reg-submit:hover:not(:disabled) { opacity: 0.88 !important; }
        .reg-google:hover { background: #f5f5f5 !important; }
        .reg-link:hover { color: #888 !important; }
      `}</style>

      {/* ── Mobile header: logo + compact value summary ─────── */}
      <div className="reg-mobile-header" style={{ borderBottom: '1px solid #1a1a1a', padding: '20px 24px 0' }}>
        <a href="/" style={{ display: 'block', marginBottom: '20px' }}><Logo height={22} /></a>
        <div style={{ paddingBottom: '20px' }}>
          <div style={{ marginBottom: '12px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,90,31,0.08)', border: '1px solid rgba(255,90,31,0.18)',
              borderRadius: '999px', padding: '4px 12px', fontSize: '11px',
              color: 'var(--spark)', fontWeight: 600,
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--spark)', flexShrink: 0 }} />
              30 kursi tersisa · Batch 1 · Mulai 11 Juni 2026
            </span>
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.25 }}>
            Mulai dari nol. Selesai dengan aplikasi nyata.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {BENEFITS.slice(0, 3).map(b => (
              <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#161616', border: '1px solid #252525', borderRadius: '999px', padding: '4px 10px', fontSize: '11px', color: '#888' }}>
                <svg width="8" height="7" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L3.8 6.5L8.5 1.5" stroke="#FF5A1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop two-column layout ─────────────────────── */}
      <div style={{ flex: 1, display: 'flex' }}>

        {/* ── Left: value prop panel ─────────────────────────── */}
        <div className="reg-left">
          <a href="/" style={{ marginBottom: '52px', display: 'block' }}>
            <Logo height={24} />
          </a>

          <div style={{ marginBottom: '18px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              background: 'rgba(255,90,31,0.08)', border: '1px solid rgba(255,90,31,0.18)',
              borderRadius: '999px', padding: '5px 14px', fontSize: '12px',
              color: 'var(--spark)', fontWeight: 600, letterSpacing: '0.02em',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--spark)', flexShrink: 0 }} />
              30 kursi tersisa · Batch 1
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 800,
            color: '#fff', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '12px',
          }}>
            Mulai dari nol.<br />Selesai dengan<br />aplikasi nyata.
          </h2>

          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.65, marginBottom: '32px' }}>
            10 sesi live bersama Software Engineer dari Australia. Kita bangun satu aplikasi full stack dari nol sampai online, pakai React, TypeScript, dan Supabase.
          </p>

          <div style={{
            background: '#161616', border: '1px solid #232323',
            borderRadius: '14px', padding: '20px 22px', marginBottom: '28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px' }}>🔒</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--signal)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Harga early bird</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.55 }}>
              Harga khusus untuk 30 peserta pertama.<br />
              Diungkap setelah kamu masuk ke dashboard.
            </p>
            <div style={{ marginTop: '12px', height: '1px', background: '#232323' }} />
            <p style={{ fontSize: '12px', color: '#3a3a3a', marginTop: '12px' }}>Mulai 11 Juni 2026 · 10 pertemuan</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {BENEFITS.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,90,31,0.12)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', marginTop: '1px',
                }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1.5 4L3.8 6.5L8.5 1.5" stroke="#FF5A1F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontSize: '13.5px', color: '#999', lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '28px' }}>
            <p style={{ fontSize: '12px', color: '#3a3a3a', lineHeight: 1.6 }}>
              Dengan mendaftar, kamu menyetujui syarat dan ketentuan yang berlaku.
            </p>
          </div>
        </div>

        {/* ── Right: form area ───────────────────────────────── */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '48px 24px', overflowY: 'auto',
        }}>
          <div style={{ width: '100%', maxWidth: '420px', paddingTop: '8px' }}>

          {/* Step indicator */}
          {step !== 'done' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '36px' }}>
              {([1, 2] as const).map((s, idx) => {
                const isActive = stepNum === s
                const isDone = stepNum > s
                return (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {idx > 0 && (
                      <div style={{ width: '28px', height: '1px', background: isDone ? 'rgba(255,90,31,0.3)' : '#1e1e1e', marginRight: '2px' }} />
                    )}
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isActive ? 'var(--spark)' : isDone ? 'rgba(255,90,31,0.15)' : '#181818',
                      border: isActive ? 'none' : isDone ? '1px solid rgba(255,90,31,0.25)' : '1px solid #252525',
                      fontSize: '11px', fontWeight: 700,
                      color: isActive ? '#fff' : isDone ? 'var(--spark)' : '#444',
                    }}>
                      {isDone
                        ? <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1.5 4.5L4 7L9.5 1.5" stroke="#FF5A1F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        : s}
                    </div>
                    <span style={{ fontSize: '13px', color: isActive ? '#e0e0e0' : '#484848', fontWeight: isActive ? 600 : 400 }}>
                      {s === 1 ? 'Tentang kamu' : 'Buat akun'}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── Step 1: personal info ── */}
          {step === 1 && (
            <form onSubmit={handleStep1}>
              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px',
                fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '6px',
              }}>Ceritakan tentang dirimu</h1>
              <p style={{ color: '#555', fontSize: '14px', marginBottom: '28px', lineHeight: 1.5 }}>
                Bantu kami mengenalmu lebih baik sebelum sesi pertama.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={lbl}>Nama lengkap</label>
                  <input className="reg-inp" style={inp} type="text"
                    placeholder="Budi Santoso" value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    autoComplete="name" autoFocus />
                </div>

                <div>
                  <label style={lbl}>Nomor WhatsApp</label>
                  <input className="reg-inp"
                    style={{ ...inp, borderColor: phoneError ? 'rgba(239,68,68,0.5)' : undefined }}
                    type="tel"
                    placeholder="08xx-xxxx-xxxx" value={phone}
                    onChange={e => { setPhone(e.target.value); if (phoneError) setPhoneError(validatePhone(e.target.value)) }}
                    onBlur={e => setPhoneError(validatePhone(e.target.value))}
                    autoComplete="tel" />
                  {phoneError
                    ? <p style={{ fontSize: '12px', color: '#f87171', marginTop: '6px' }}>{phoneError}</p>
                    : <p style={{ fontSize: '12px', color: '#444', marginTop: '6px' }}>Hanya untuk informasi penting tentang kelas.</p>}
                </div>

                <div>
                  <label style={lbl}>Latar belakang</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {BG_OPTIONS.map(opt => (
                      <button key={opt.value} type="button"
                        className="reg-bg-btn"
                        onClick={() => setBackground(opt.value)}
                        style={{
                          flex: 1, padding: '10px 6px', borderRadius: '10px',
                          fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                          transition: 'all 0.15s ease', textAlign: 'center',
                          background: background === opt.value ? 'rgba(255,90,31,0.12)' : '#161616',
                          border: background === opt.value ? '1px solid rgba(255,90,31,0.4)' : '1px solid #252525',
                          color: background === opt.value ? 'var(--spark)' : '#666',
                        }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {background && background !== 'it_fresh_grad' && (
                  <div>
                    <label style={lbl}>
                      Bidang pekerjaan{' '}
                      <span style={{ color: '#3a3a3a', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opsional)</span>
                    </label>
                    <input className="reg-inp" style={inp} type="text"
                      placeholder="Fotografer, dokter, akuntan..."
                      value={occupation}
                      onChange={e => setOccupation(e.target.value)} />
                  </div>
                )}

                <div>
                  <label style={lbl}>Apa yang ingin kamu bangun atau capai?</label>
                  <textarea className="reg-inp" style={{ ...inp, minHeight: '88px', resize: 'vertical', lineHeight: 1.55 }}
                    placeholder="Ceritakan ide, tujuan, atau masalah yang ingin kamu selesaikan..."
                    value={goals}
                    onChange={e => setGoals(e.target.value)} />
                </div>
              </div>

              {error && <ErrorBox message={error} />}

              <button type="submit" disabled={loading} className="reg-submit"
                style={{
                  width: '100%', marginTop: '22px', background: 'var(--spark)',
                  color: '#fff', border: 'none', borderRadius: '12px', padding: '14px',
                  fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.65 : 1, transition: 'opacity 0.15s ease', fontFamily: 'inherit',
                }}>
                {loading ? 'Menyimpan...' : 'Lanjut ke pembuatan akun →'}
              </button>
            </form>
          )}

          {/* ── Step 2: account creation ── */}
          {step === 2 && (
            <div>
              <button onClick={() => { setStep(1); setError(null) }}
                className="reg-back"
                style={{
                  background: 'none', border: 'none', color: '#555', fontSize: '13px',
                  cursor: 'pointer', padding: 0, marginBottom: '24px',
                  display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.15s ease',
                  fontFamily: 'inherit',
                }}>
                ← Kembali
              </button>

              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px',
                fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '6px',
              }}>
                Buat akunmu{firstName ? `, ${firstName}` : ''}
              </h1>
              <p style={{ color: '#555', fontSize: '14px', marginBottom: '28px', lineHeight: 1.5 }}>
                Satu langkah lagi menuju kelas pertamamu.
              </p>

              <button onClick={handleGoogle} className="reg-google"
                style={{
                  width: '100%', background: '#fff', border: 'none', borderRadius: '12px',
                  padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', fontSize: '14.5px', fontWeight: 700, color: '#111', cursor: 'pointer',
                  marginBottom: '20px', transition: 'background 0.15s ease', fontFamily: 'inherit',
                }}>
                <GoogleIcon />
                Daftar dengan Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: '#1c1c1c' }} />
                <span style={{ color: '#383838', fontSize: '12px', fontWeight: 500 }}>atau dengan email</span>
                <div style={{ flex: 1, height: '1px', background: '#1c1c1c' }} />
              </div>

              <form onSubmit={handleEmailSignup}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={lbl}>Email</label>
                    <input className="reg-inp"
                      style={{ ...inp, borderColor: emailError ? 'rgba(239,68,68,0.5)' : undefined }}
                      type="email"
                      placeholder="kamu@email.com" value={email}
                      onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(validateEmail(e.target.value)) }}
                      onBlur={e => setEmailError(validateEmail(e.target.value))}
                      autoComplete="email" autoFocus />
                    {emailError && <p style={{ fontSize: '12px', color: '#f87171', marginTop: '6px' }}>{emailError}</p>}
                  </div>
                  <div>
                    <label style={lbl}>Password</label>
                    <input className="reg-inp" style={inp} type="password"
                      placeholder="Minimal 8 karakter" value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="new-password" />
                  </div>
                </div>

                {error && <ErrorBox message={error} />}

                <button type="submit" disabled={loading} className="reg-submit"
                  style={{
                    width: '100%', marginTop: '20px', background: 'var(--spark)',
                    color: '#fff', border: 'none', borderRadius: '12px', padding: '14px',
                    fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.65 : 1, transition: 'opacity 0.15s ease', fontFamily: 'inherit',
                  }}>
                  {loading ? 'Membuat akun...' : 'Daftar sekarang'}
                </button>
              </form>
            </div>
          )}

          {/* ── Done ── */}
          {step === 'done' && (
            <div style={{ paddingTop: '20px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(255,90,31,0.1)', border: '1px solid rgba(255,90,31,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '24px', fontSize: '24px',
              }}>📬</div>
              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px',
                fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '12px',
              }}>
                Hampir selesai{firstName ? `, ${firstName}` : ''}!
              </h1>
              <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
                Kami kirim link konfirmasi ke{' '}
                <strong style={{ color: '#e0e0e0' }}>{email}</strong>.<br />
                Klik link itu untuk mengaktifkan akunmu dan lanjut ke pembayaran.
              </p>
              <a href="/auth" style={{
                display: 'inline-block', background: 'var(--spark)', color: '#fff',
                fontWeight: 700, fontSize: '14px', padding: '12px 24px',
                borderRadius: '10px', textDecoration: 'none',
              }}>
                Sudah konfirmasi? Masuk →
              </a>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: '36px', display: 'flex', gap: '20px' }}>
            <a href="/" className="reg-link" style={{ color: '#3a3a3a', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s ease' }}>
              ← Halaman utama
            </a>
            {step !== 'done' && (
              <a href="/auth" className="reg-link" style={{ color: '#3a3a3a', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s ease' }}>
                Sudah punya akun? Masuk
              </a>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{
      marginTop: '14px', padding: '11px 14px',
      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
      borderRadius: '10px', color: '#f87171', fontSize: '13.5px', lineHeight: 1.5,
    }}>
      {message}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}
