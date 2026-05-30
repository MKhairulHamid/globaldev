import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'

type Mode = 'signin' | 'signup'

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const navigate = useNavigate()

  // Redirect to dashboard if session already exists (handles OAuth callback)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard')
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/dashboard')
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({
          type: 'success',
          text: 'Cek email kamu untuk konfirmasi pendaftaran, lalu login di sini.',
        })
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage({ type: 'error', text: 'Email atau password salah.' })
      } else {
        navigate('/dashboard')
      }
    }
    setLoading(false)
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) {
      setMessage({ type: 'error', text: error.message })
      setGoogleLoading(false)
    }
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

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <a href="/" style={{ marginBottom: '40px', display: 'block' }}>
        <Logo height={24} />
      </a>

      <div style={{ width: '100%', maxWidth: '400px', background: '#111', border: '1px solid #222', borderRadius: '20px', padding: '40px 36px' }}>
        <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.03em', marginBottom: '8px' }}>
          {mode === 'signup' ? 'Daftar bootcamp' : 'Masuk ke akunmu'}
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>
          {mode === 'signup' ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
          <button
            onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setMessage(null) }}
            style={{ background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', fontSize: '14px', padding: 0 }}
          >
            {mode === 'signup' ? 'Masuk di sini' : 'Daftar di sini'}
          </button>
        </p>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          style={{ width: '100%', background: '#fff', border: 'none', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '15px', fontWeight: 600, color: '#111', cursor: 'pointer', marginBottom: '20px', opacity: googleLoading ? 0.7 : 1 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? 'Mengarahkan...' : 'Lanjutkan dengan Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#222' }} />
          <span style={{ color: '#444', fontSize: '12px' }}>atau</span>
          <div style={{ flex: 1, height: '1px', background: '#222' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inp}
          />
          <div>
            <input
              type="password"
              placeholder="Password (min 8 karakter)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              style={inp}
            />
          </div>

          {message && (
            <div style={{ background: message.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${message.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`, borderRadius: '8px', padding: '12px 14px', color: message.type === 'error' ? '#f87171' : '#4ade80', fontSize: '13px', lineHeight: 1.5 }}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Memproses...' : mode === 'signup' ? 'Daftar Sekarang' : 'Masuk'}
          </button>
        </form>
      </div>

      <a href="/" style={{ marginTop: '24px', color: '#555', fontSize: '13px', textDecoration: 'none' }}>
        ← Kembali ke halaman utama
      </a>
    </div>
  )
}
