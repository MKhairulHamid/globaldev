import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'

type Background = 'it_fresh_grad' | 'professional_non_it' | 'other'
type Msg = { from: 'bot' | 'user'; text: string; error?: boolean }
type Phase = 'name' | 'phone' | 'background' | 'occupation' | 'goals' | 'email' | 'password' | 'done'

const ORDER: Phase[] = ['name', 'phone', 'background', 'occupation', 'goals', 'email', 'password']

const BG_OPTIONS: { value: Background; label: string }[] = [
  { value: 'it_fresh_grad', label: 'Fresh graduate IT' },
  { value: 'professional_non_it', label: 'Profesional non-IT' },
  { value: 'other', label: 'Lainnya' },
]

export default function RegisterPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [phase, setPhase] = useState<Phase>('name')
  const [botTyping, setBotTyping] = useState(true)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Collected answers
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [background, setBackground] = useState<Background | null>(null)
  const [occupation, setOccupation] = useState('')
  const [goals, setGoals] = useState('')
  const [email, setEmail] = useState('')
  const [leadId, setLeadId] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  const firstName = fullName.trim().split(' ')[0] || 'kamu'

  // ── Conversation driver ─────────────────────────────────────────────────────
  function botSay(texts: string[], next: Phase, delay = 650) {
    setBotTyping(true)
    setTimeout(() => {
      setMessages(m => [...m, ...texts.map(t => ({ from: 'bot' as const, text: t }))])
      setBotTyping(false)
      setPhase(next)
      setInput('')
    }, delay)
  }

  function userSay(text: string) {
    setMessages(m => [...m, { from: 'user', text }])
  }

  // Greeting on mount (guarded against StrictMode double-invoke)
  useEffect(() => {
    if (started.current) return
    started.current = true
    botSay(['Hai 👋 Kenalan dulu, yuk.', 'Siapa nama lengkap kamu?'], 'name', 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-scroll to the newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, botTyping])

  // ── Side effects ────────────────────────────────────────────────────────────
  async function saveLead(goalsVal: string) {
    const { data, error } = await supabase.rpc('save_lead', {
      p_full_name: fullName.trim(),
      p_phone: phone.trim(),
      p_background: background!,
      p_occupation: occupation.trim() || null,
      p_goals: goalsVal.trim(),
    })
    if (error) console.warn('Lead save failed:', error.message)
    else if (data) setLeadId(data as string)
  }

  async function doSignUp(pw: string) {
    setLoading(true)

    if (leadId) await supabase.rpc('link_lead', { p_lead_id: leadId, p_email: email.trim() })

    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email: email.trim(),
      password: pw,
      options: { emailRedirectTo: window.location.origin },
    })

    if (authErr) {
      setLoading(false)
      setMessages(m => [...m, {
        from: 'bot',
        error: true,
        text: authErr.message === 'User already registered'
          ? 'Hmm, email ini sudah terdaftar. Coba pakai email lain, atau masuk lewat halaman login ya.'
          : authErr.message,
      }])
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
    botSay([`Selesai, ${firstName}! 🎉`], 'done', 500)
  }

  async function handleGoogle() {
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

  // ── Submit handlers per phase ────────────────────────────────────────────────
  function submitName(e: React.FormEvent) {
    e.preventDefault()
    const v = input.trim()
    if (v.length < 2) return
    setFullName(v)
    userSay(v)
    const first = v.split(' ')[0]
    botSay([`Salam kenal, ${first}! 👋`, 'Nomor WhatsApp kamu berapa? Kami pakai cuma buat info penting soal kelas.'], 'phone')
  }

  function submitPhone(e: React.FormEvent) {
    e.preventDefault()
    const v = input.trim()
    if (v.replace(/\D/g, '').length < 8) return
    setPhone(v)
    userSay(v)
    botSay(['Oke, dicatat ✍️', 'Sekarang, kamu lagi ada di posisi mana?'], 'background')
  }

  function chooseBackground(opt: { value: Background; label: string }) {
    setBackground(opt.value)
    userSay(opt.label)
    if (opt.value === 'it_fresh_grad') {
      botSay(['Sip, basic teknisnya pasti kepakai.', 'Apa yang pengen kamu bangun atau capai lewat kelas ini?'], 'goals')
    } else {
      botSay(['Menarik!', 'Boleh cerita kamu berkecimpung di bidang apa? (boleh dilewati)'], 'occupation')
    }
  }

  function submitOccupation(skip: boolean) {
    const v = input.trim()
    if (!skip && !v) return
    setOccupation(skip ? '' : v)
    userSay(skip ? '(dilewati)' : v)
    botSay(['Noted 👍', 'Apa yang pengen kamu bangun atau capai lewat kelas ini?'], 'goals')
  }

  async function submitGoals(e: React.FormEvent) {
    e.preventDefault()
    const v = input.trim()
    if (v.length < 3) return
    setGoals(v)
    userSay(v)
    setInput('')
    await saveLead(v)
    botSay(['Keren, semua sudah kecatat. 🙌', 'Tinggal bikin akunmu. Email kamu apa?'], 'email')
  }

  function submitEmail(e: React.FormEvent) {
    e.preventDefault()
    const v = input.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return
    setEmail(v)
    userSay(v)
    botSay(['Terakhir nih, bikin password buat akunmu (min 8 karakter).'], 'password')
  }

  function submitPassword(e: React.FormEvent) {
    e.preventDefault()
    if (input.length < 8) return
    const pw = input
    userSay('••••••••')
    setInput('')
    setBotTyping(true)
    doSignUp(pw)
  }

  // ── Render helpers ───────────────────────────────────────────────────────────
  const stepIdx = ORDER.indexOf(phase)
  const pct = phase === 'done' ? 100 : Math.round(((stepIdx + 1) / ORDER.length) * 100)

  const inp: React.CSSProperties = {
    flex: 1, background: '#161616', border: '1px solid #2a2a2a',
    borderRadius: '12px', padding: '13px 16px', color: '#fff', fontSize: '15px', outline: 'none',
  }
  const sendBtn: React.CSSProperties = {
    background: '#f97316', color: '#fff', border: 'none', borderRadius: '12px',
    width: '46px', height: '46px', fontSize: '18px', cursor: 'pointer', flexShrink: 0,
  }

  function renderInput() {
    if (botTyping || phase === 'done') return null

    if (phase === 'background') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {BG_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => chooseBackground(opt)}
              style={{ textAlign: 'left', background: '#161616', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '13px 16px', color: '#e5e5e5', fontSize: '15px', cursor: 'pointer' }}>
              {opt.label}
            </button>
          ))}
        </div>
      )
    }

    if (phase === 'occupation') {
      return (
        <form onSubmit={e => { e.preventDefault(); submitOccupation(false) }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input key={phase} autoFocus style={inp} value={input} onChange={e => setInput(e.target.value)} placeholder="Fotografer, tutor, dokter, dll." />
            <button type="submit" style={sendBtn}>→</button>
          </div>
          <button type="button" onClick={() => submitOccupation(true)}
            style={{ background: 'none', border: 'none', color: '#666', fontSize: '13px', cursor: 'pointer', alignSelf: 'flex-start', padding: '4px 2px' }}>
            Lewati
          </button>
        </form>
      )
    }

    if (phase === 'goals') {
      return (
        <form onSubmit={submitGoals} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea key={phase} autoFocus value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitGoals(e) } }}
            placeholder="Ceritakan ide atau tujuanmu..."
            style={{ ...inp, minHeight: '54px', maxHeight: '140px', resize: 'vertical', lineHeight: 1.5 }} />
          <button type="submit" style={sendBtn}>→</button>
        </form>
      )
    }

    const map: Record<string, { submit: (e: React.FormEvent) => void; type: string; placeholder: string; auto: string }> = {
      name: { submit: submitName, type: 'text', placeholder: 'Nama lengkap kamu', auto: 'name' },
      phone: { submit: submitPhone, type: 'tel', placeholder: '08xx-xxxx-xxxx', auto: 'tel' },
      email: { submit: submitEmail, type: 'email', placeholder: 'email@kamu.com', auto: 'email' },
      password: { submit: submitPassword, type: 'password', placeholder: 'Min 8 karakter', auto: 'new-password' },
    }
    const cfg = map[phase]
    if (!cfg) return null

    return (
      <div>
        <form onSubmit={cfg.submit} style={{ display: 'flex', gap: '8px' }}>
          <input key={phase} autoFocus style={inp} type={cfg.type} value={input}
            onChange={e => setInput(e.target.value)} placeholder={cfg.placeholder} autoComplete={cfg.auto} />
          <button type="submit" disabled={loading} style={{ ...sendBtn, opacity: loading ? 0.6 : 1 }}>→</button>
        </form>

        {phase === 'email' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#222' }} />
              <span style={{ color: '#444', fontSize: '12px' }}>atau</span>
              <div style={{ flex: 1, height: '1px', background: '#222' }} />
            </div>
            <button onClick={handleGoogle}
              style={{ width: '100%', background: '#fff', border: 'none', borderRadius: '12px', padding: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#111', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Daftar dengan Google
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
      <style>{`
        @keyframes bubbleIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes dot { 0%, 60%, 100% { opacity: .25; transform: translateY(0) } 30% { opacity: 1; transform: translateY(-3px) } }
      `}</style>

      <a href="/" style={{ margin: '16px 0 28px' }}><Logo height={24} /></a>

      <div style={{ width: '100%', maxWidth: '440px', background: '#111', border: '1px solid #222', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px', maxHeight: 'calc(100vh - 140px)' }}>

        {/* Progress */}
        <div style={{ height: '3px', background: '#222', flexShrink: 0 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: '#f97316', transition: 'width 0.4s ease' }} />
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start', animation: 'bubbleIn 0.25s ease both' }}>
              <div style={{
                maxWidth: '80%', padding: '10px 14px', borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: m.error ? 'rgba(239,68,68,0.12)' : m.from === 'user' ? '#f97316' : '#1c1c1c',
                border: m.error ? '1px solid rgba(239,68,68,0.3)' : 'none',
                color: m.error ? '#f87171' : m.from === 'user' ? '#fff' : '#e5e5e5',
                fontSize: '14.5px', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>
                {m.text}
              </div>
            </div>
          ))}

          {botTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ background: '#1c1c1c', borderRadius: '14px 14px 14px 4px', padding: '14px 16px', display: 'flex', gap: '4px' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', display: 'inline-block', animation: `dot 1.2s ${i * 0.15}s infinite ease-in-out` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input dock / done state */}
        <div style={{ borderTop: '1px solid #1c1c1c', padding: '16px', flexShrink: 0 }}>
          {phase === 'done' ? (
            <div style={{ textAlign: 'center', padding: '4px 0' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📬</div>
              <p style={{ color: '#e5e5e5', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                Kami kirim link konfirmasi ke <strong style={{ color: '#fff' }}>{email}</strong>.<br />
                Klik link itu untuk aktifkan akun dan lanjut ke pembayaran.
              </p>
              <a href="/auth" style={{ color: '#f97316', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>
                Sudah konfirmasi? Masuk di sini →
              </a>
            </div>
          ) : (
            renderInput()
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '16px' }}>
        <a href="/" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>← Halaman utama</a>
        {phase !== 'done' && (
          <a href="/auth" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>Sudah punya akun? Masuk</a>
        )}
      </div>
    </div>
  )
}
