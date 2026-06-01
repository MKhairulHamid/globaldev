import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Profile, Registration } from '../types'
import Logo from '../components/Logo'
import Loader from '../components/Loader'
import WhatsAppButton from '../components/WhatsAppButton'
import { markReturning } from '../lib/authEntry'

const WA_URL = 'https://wa.me/628111330130'

const SCHEDULE = [
  { n: '01', date: 'Kamis, 11 Juni 2026' },
  { n: '02', date: 'Selasa, 16 Juni 2026' },
  { n: '03', date: 'Kamis, 18 Juni 2026' },
  { n: '04', date: 'Selasa, 23 Juni 2026' },
  { n: '05', date: 'Kamis, 25 Juni 2026' },
  { n: '06', date: 'Selasa, 30 Juni 2026' },
  { n: '07', date: 'Kamis, 2 Juli 2026' },
  { n: '08', date: 'Selasa, 7 Juli 2026' },
  { n: '09', date: 'Jumat, 10 Juli 2026' },
  { n: '10', date: 'Selasa, 14 Juli 2026' },
]

const SESSION_DATES: Record<string, string> = {
  '2026-06-11': '01', '2026-06-16': '02', '2026-06-18': '03',
  '2026-06-23': '04', '2026-06-25': '05', '2026-06-30': '06',
  '2026-07-02': '07', '2026-07-07': '08', '2026-07-10': '09', '2026-07-14': '10',
}

const DAY_LABELS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

const SKILLS = [
  { key: 'react', label: 'React & komponen UI' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'css', label: 'CSS & tampilan responsif' },
  { key: 'database', label: 'Database & SQL' },
  { key: 'api', label: 'Ambil data dari API' },
  { key: 'auth', label: 'Sistem login & register' },
  { key: 'git', label: 'Git & version control' },
  { key: 'deploy', label: 'Deploy ke internet' },
  { key: 'fullapp', label: 'Bangun app dari nol' },
  { key: 'ai', label: 'Coding dibantu AI' },
] as const

const LEVEL_LABELS = ['Belum tahu', 'Pernah dengar', 'Sudah coba', 'Bisa pakai']

function generateSnapshot(answers: Record<string, number>): string {
  const familiarCount = Object.values(answers).filter(v => v >= 2).length
  const gap = SKILLS.length - familiarCount
  if (familiarCount <= 2) {
    return 'Kamu ada di titik awal — dan itu wajar. Bootcamp ini dimulai dari fondasi, jadi kamu tidak akan tertinggal. Semua skill yang dicari employer di daftar ini akan kita cover dalam 10 sesi.'
  }
  if (familiarCount <= 5) {
    return `Kamu sudah punya beberapa fondasi. Ada ${gap} skill di daftar ini yang belum familiar — dan itu tepat yang akan kita bangun bersama. Kamu akan keluar dengan semua skill ini terpraktikkan dalam satu aplikasi nyata.`
  }
  if (familiarCount <= 8) {
    return 'Kamu sudah cukup kenal sebagian besar skill ini. Yang kemungkinan belum pernah kamu lakukan adalah menyatukannya jadi satu aplikasi yang selesai dan live. Itu yang akan kita selesaikan bersama.'
  }
  return 'Stack ini sudah familiar buatmu. Bootcamp ini bisa membantu kamu menghasilkan satu portofolio yang terstruktur — bukan cuma "pernah pakai", tapi "ini aplikasinya, bisa langsung dibuka siapapun".'
}

function MiniCalendar({ year, month, label }: { year: number; month: number; label: string }) {
  const daysInMonth = new Date(year, month, 0).getDate()
  // getDay() returns 0=Sun..6=Sat; convert to Mon-first (Mon=0..Sun=6)
  const rawFirst = new Date(year, month - 1, 1).getDay()
  const startOffset = (rawFirst + 6) % 7

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div>
      <p style={{ color: '#888', fontSize: '11px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
        {DAY_LABELS.map(d => (
          <div key={d} style={{ textAlign: 'center', color: '#444', fontSize: '10px', fontWeight: 600, padding: '2px 0 6px', letterSpacing: '0.04em' }}>{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const sesi = SESSION_DATES[key]
          return (
            <div
              key={key}
              style={{
                textAlign: 'center',
                borderRadius: '7px',
                padding: '5px 2px 4px',
                background: sesi ? 'rgba(255,90,31,0.14)' : 'transparent',
                border: sesi ? '1px solid rgba(255,90,31,0.35)' : '1px solid transparent',
              }}
            >
              <span style={{ color: sesi ? 'var(--spark)' : '#4a4a4a', fontSize: '12px', fontWeight: sesi ? 700 : 400, display: 'block', lineHeight: 1 }}>{day}</span>
              {sesi && (
                <span style={{ color: 'rgba(255,90,31,0.7)', fontSize: '9px', fontWeight: 700, display: 'block', marginTop: '2px', lineHeight: 1 }}>{sesi}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ScheduleList() {
  return (
    <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '20px 24px', textAlign: 'left', marginBottom: '24px' }}>
      <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>Jadwal 10 sesi</p>
      <p style={{ color: '#666', fontSize: '12px', marginBottom: '20px' }}>Setiap Selasa &amp; Kamis, 19.30 WIB via Google Meet</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <MiniCalendar year={2026} month={6} label="Juni 2026" />
        <MiniCalendar year={2026} month={7} label="Juli 2026" />
      </div>

      <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {SCHEDULE.map(s => (
          <div key={s.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#555', fontSize: '12px', fontFamily: 'monospace' }}>Sesi {s.n}</span>
            <span style={{ color: '#c3c3c3', fontSize: '13px' }}>{s.date} · 19.30 WIB</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PaymentDetails({ amount }: { amount: number }) {
  return (
    <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '28px', marginBottom: '24px', textAlign: 'left' }}>
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
          <p style={{ color: 'var(--spark)', fontWeight: 800, fontSize: '28px', letterSpacing: '-0.02em' }}>
            {formatAmount(amount)}
          </p>
          <p style={{ color: '#555', fontSize: '12px', marginTop: '6px' }}>Transfer jumlah persis ini agar transaksi kamu bisa dikonfirmasi dengan cepat.</p>
        </div>
      </div>
    </div>
  )
}

const formatAmount = (n: number) =>
  n.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [skillAnswers, setSkillAnswers] = useState<Record<string, number>>({})
  const [savingSkills, setSavingSkills] = useState(false)
  const navigate = useNavigate()

  // Form state
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [background, setBackground] = useState<Profile['background']>(null)
  const [occupation, setOccupation] = useState('')
  const [goals, setGoals] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      if (!user) { navigate('/auth'); return }

      // Remember this device has authenticated → returning visitors get login first
      markReturning()

      // Link lead saved before Google OAuth
      const storedLeadId = sessionStorage.getItem('lead_id')
      if (storedLeadId) {
        await supabase.rpc('link_lead', { p_lead_id: storedLeadId, p_user_id: user.id })
        sessionStorage.removeItem('lead_id')
      }

      // Ensure profile row exists (fallback if trigger failed)
      await supabase.from('profiles').upsert({ id: user.id, email: user.email }, { onConflict: 'id', ignoreDuplicates: true })

      // Recover form data from the user's lead into the profile (fills empty fields only)
      await supabase.rpc('sync_profile_from_lead')

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

  useEffect(() => {
    if (registration?.payment_status !== 'confirmed') return
    const key = `conversion_fired_${registration.id}`
    if (localStorage.getItem(key)) return
    const w = window as unknown as Record<string, unknown>
    if (typeof w['gtag'] === 'function') {
      (w['gtag'] as (...args: unknown[]) => void)('event', 'conversion', {
        send_to: 'AW-18199825981/QG_bCIv8u7YcEL2creZD',
        value: registration.unique_amount,
        currency: 'IDR',
        transaction_id: registration.id,
      })
    }
    localStorage.setItem(key, '1')
  }, [registration?.payment_status, registration?.id])

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

  const saveSkillMap = useCallback(async () => {
    if (SKILLS.some(s => skillAnswers[s.key] === undefined)) return
    setSavingSkills(true)
    const snapshot_text = generateSnapshot(skillAnswers)
    const familiar_count = Object.values(skillAnswers).filter(v => v >= 2).length
    const payload = { skills: skillAnswers, snapshot_text, familiar_count }
    const { error: err } = await supabase.from('profiles').update({ learning_snapshot: payload }).eq('id', profile!.id)
    if (!err) setProfile(prev => prev ? { ...prev, learning_snapshot: payload } : prev)
    setSavingSkills(false)
  }, [skillAnswers, profile])

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

  if (loading) return <Loader />

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5' }}>
      {/* Nav */}
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo height={22} /></a>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {profile?.role === 'admin' && (
            <a href="/admin" style={{ color: 'var(--spark)', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>Admin</a>
          )}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>WhatsApp ↗</a>
          <button onClick={signOut} style={{ background: 'none', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#666', fontSize: '13px', padding: '6px 14px', cursor: 'pointer' }}>Keluar</button>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px' }}>

        {/* ── Step 1: Complete Profile ── */}
        {!profileComplete && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Langkah 1 dari 2</p>
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
                      style={{ accentColor: 'var(--spark)' }}
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
              <button type="submit" disabled={saving || !background} style={{ background: 'var(--spark)', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : 'Simpan dan Lanjutkan →'}
              </button>
            </form>
          </>
        )}

        {/* ── Step 2: Skill Map + Payment ── */}
        {profileComplete && !registration && (
          <>
            <div style={{ marginBottom: '28px' }}>
              <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Langkah 2 dari 2</p>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>Halo, {profile?.full_name?.split(' ')[0]} 👋</h1>
              <p style={{ color: '#666', fontSize: '14px' }}>Profil sudah lengkap. Lanjutkan ke pembayaran, atau cek dulu kesiapan skill kamu.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

              {/* Skill Map Card */}
              <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                {profile?.learning_snapshot ? (
                  <>
                    <p style={{ color: 'var(--signal)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Skill readiness kamu</p>
                    <p style={{ color: '#e5e5e5', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>
                      {(profile.learning_snapshot as { snapshot_text: string }).snapshot_text}
                    </p>
                    <p style={{ color: '#555', fontSize: '12px' }}>
                      {(profile.learning_snapshot as { familiar_count: number }).familiar_count} dari {SKILLS.length} skill sudah familiar
                    </p>
                  </>
                ) : (
                  <>
                    <p style={{ color: 'var(--signal)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Cek skill readiness kamu</p>
                    <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>Pilih level kamu untuk tiap skill di bawah. Kita lihat kamu sudah sejauh mana.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', flex: 1 }}>
                      {SKILLS.map(skill => (
                        <div key={skill.key}>
                          <p style={{ color: '#c3c3c3', fontSize: '12px', marginBottom: '6px' }}>{skill.label}</p>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {LEVEL_LABELS.map((label, level) => (
                              <button
                                key={level}
                                onClick={() => setSkillAnswers(prev => ({ ...prev, [skill.key]: level }))}
                                style={{
                                  padding: '4px 10px', fontSize: '11px', borderRadius: '6px', cursor: 'pointer', border: '1px solid',
                                  background: skillAnswers[skill.key] === level ? 'rgba(123,108,255,0.2)' : 'transparent',
                                  borderColor: skillAnswers[skill.key] === level ? 'rgba(123,108,255,0.6)' : '#2a2a2a',
                                  color: skillAnswers[skill.key] === level ? '#a89fff' : '#666',
                                  fontWeight: skillAnswers[skill.key] === level ? 600 : 400,
                                }}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={saveSkillMap}
                      disabled={savingSkills || SKILLS.some(s => skillAnswers[s.key] === undefined)}
                      style={{
                        background: 'rgba(123,108,255,0.15)', color: '#a89fff', border: '1px solid rgba(123,108,255,0.3)',
                        borderRadius: '8px', padding: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                        opacity: (savingSkills || SKILLS.some(s => skillAnswers[s.key] === undefined)) ? 0.5 : 1,
                      }}
                    >
                      {savingSkills ? 'Menyimpan...' : 'Lihat hasilnya →'}
                    </button>
                  </>
                )}
              </div>

              {/* Payment Card */}
              <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: 'var(--spark)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Amankan tempat kamu</p>
                <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.6, marginBottom: '8px', flex: 1 }}>
                  Hanya 30 kursi tersedia. Tempat dikonfirmasi setelah pembayaran diterima.
                </p>
                <div style={{ background: 'rgba(255,90,31,0.08)', border: '1px solid rgba(255,90,31,0.2)', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px' }}>
                  <p style={{ color: '#666', fontSize: '11px', marginBottom: '4px' }}>Mulai</p>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>Kamis, 11 Juni 2026</p>
                  <p style={{ color: '#666', fontSize: '12px' }}>10 sesi · 5 minggu · 19.30 WIB</p>
                </div>
                {error && <p style={{ color: '#f87171', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}
                <button
                  onClick={proceedToPayment}
                  disabled={saving}
                  style={{ background: 'var(--spark)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? 'Memproses...' : 'Lihat Detail Pembayaran →'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Payment Instructions ── */}
        {profileComplete && registration?.payment_status === 'pending' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Pembayaran</p>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>Halo, {profile?.full_name?.split(' ')[0]} 👋</h1>
              <p style={{ color: '#666', fontSize: '14px' }}>Transfer ke rekening berikut, lalu konfirmasi di bawah.</p>
            </div>

            <PaymentDetails amount={registration.unique_amount} />

            {error && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

            <button
              onClick={confirmTransfer}
              disabled={confirming}
              style={{ width: '100%', background: 'var(--spark)', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginBottom: '12px', opacity: confirming ? 0.7 : 1 }}
            >
              {confirming ? 'Memproses...' : '✓ Saya Sudah Transfer'}
            </button>
            <p style={{ color: '#555', fontSize: '12px', textAlign: 'center', marginBottom: '32px' }}>
              Ada pertanyaan?{' '}
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', textDecoration: 'none' }}>Chat via WhatsApp</a>
            </p>

            <ScheduleList />
          </>
        )}

        {/* ── Waiting Confirmation ── */}
        {registration?.payment_status === 'waiting_confirmation' && (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⏳</div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>Menunggu kami cek pembayaranmu</h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
              Terima kasih sudah konfirmasi. Kami akan cek mutasi rekening dan memverifikasi pembayaranmu dalam 1×24 jam kerja.
            </p>
            <div style={{ background: 'rgba(255,90,31,0.08)', border: '1px solid rgba(255,90,31,0.25)', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', textAlign: 'left' }}>
              <p style={{ color: 'var(--spark)', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>⚠️ Simpan bukti transfermu</p>
              <p style={{ color: '#a3a3a3', fontSize: '13px', lineHeight: 1.6 }}>
                Jangan hapus dulu bukti transfernya sampai pembayaranmu kami konfirmasi. Kalau ada yang perlu dicek, kami mungkin meminta buktinya lewat WhatsApp.
              </p>
            </div>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>
              Jumlah yang kamu transfer: <strong style={{ color: 'var(--spark)' }}>{registration?.unique_amount ? formatAmount(registration.unique_amount) : ''}</strong>
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '14px 28px', borderRadius: '12px', fontSize: '15px', marginBottom: '32px' }}
            >
              Chat via WhatsApp
            </a>
            <ScheduleList />
          </div>
        )}

        {/* ── Confirmed ── */}
        {registration?.payment_status === 'confirmed' && (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉</div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>Pembayaran dikonfirmasi!</h1>
            <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, marginBottom: '8px' }}>
              Selamat, <strong style={{ color: '#fff' }}>{profile?.full_name?.split(' ')[0]}</strong>. Kamu resmi terdaftar di Batch Juni 2026.
            </p>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>Kelas mulai Kamis, 11 Juni 2026. Simpan jadwal di bawah ini.</p>
            <ScheduleList />
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
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '24px' }}>❌</div>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>Transfer belum bisa kami konfirmasi</h1>
              {registration.admin_notes && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', padding: '14px 18px', marginBottom: '16px', textAlign: 'left' }}>
                  <p style={{ color: '#f87171', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Catatan dari kami</p>
                  <p style={{ color: '#a3a3a3', fontSize: '14px', lineHeight: 1.6 }}>{registration.admin_notes}</p>
                </div>
              )}
              <p style={{ color: '#a3a3a3', fontSize: '14px', lineHeight: 1.7 }}>
                Silakan cek kembali, transfer ulang sesuai detail di bawah, lalu konfirmasi lagi. Pastikan jumlahnya persis.
              </p>
            </div>

            <PaymentDetails amount={registration.unique_amount} />

            {error && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

            <button
              onClick={confirmTransfer}
              disabled={confirming}
              style={{ width: '100%', background: 'var(--spark)', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginBottom: '12px', opacity: confirming ? 0.7 : 1 }}
            >
              {confirming ? 'Memproses...' : '✓ Saya Sudah Transfer Ulang'}
            </button>
            <p style={{ color: '#555', fontSize: '12px', textAlign: 'center' }}>
              Butuh bantuan?{' '}
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', textDecoration: 'none' }}>Chat via WhatsApp</a>
            </p>
          </>
        )}
      </div>
      <WhatsAppButton />
    </div>
  )
}
