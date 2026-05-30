import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Profile, Registration } from '../types'
import Logo from '../components/Logo'
import Loader from '../components/Loader'

type StatusFilter = 'all' | Registration['payment_status']

interface Row extends Registration {
  profiles: Profile
}

const STATUS_LABEL: Record<Registration['payment_status'], string> = {
  pending: 'Belum bayar',
  waiting_confirmation: 'Menunggu konfirmasi',
  confirmed: 'Terkonfirmasi',
  rejected: 'Ditolak',
}

const STATUS_COLOR: Record<Registration['payment_status'], string> = {
  pending: '#666',
  waiting_confirmation: '#fbbf24',
  confirmed: '#4ade80',
  rejected: '#f87171',
}

const BG_LABEL: Record<string, string> = {
  it_fresh_grad: 'Fresh grad IT',
  professional_non_it: 'Profesional non-IT',
  other: 'Lainnya',
}

const formatAmount = (n: number) =>
  n.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })

export default function AdminPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [filter, setFilter] = useState<StatusFilter>('waiting_confirmation')
  const [loading, setLoading] = useState(true)
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({})
  const [processing, setProcessing] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/auth'); return }

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (!profile || profile.role !== 'admin') { navigate('/dashboard'); return }

      await fetchRows()
      setLoading(false)
    }
    load()
  }, [navigate])

  async function fetchRows() {
    const { data, error } = await supabase
      .from('registrations')
      .select('*, profiles!registrations_user_id_fkey(*)')
      .order('created_at', { ascending: false })
    if (error) { console.error('Admin fetch error:', error.message); return }
    if (data) setRows(data as Row[])
  }

  async function confirm(id: string) {
    setProcessing(id)
    await supabase.rpc('confirm_payment', { registration_id: id })
    await fetchRows()
    setProcessing(null)
  }

  async function reject(id: string) {
    setProcessing(id)
    await supabase.rpc('reject_payment', { registration_id: id, notes: rejectNotes[id] ?? null })
    await fetchRows()
    setProcessing(null)
  }

  const filtered = filter === 'all' ? rows : rows.filter(r => r.payment_status === filter)

  const counts = {
    all: rows.length,
    pending: rows.filter(r => r.payment_status === 'pending').length,
    waiting_confirmation: rows.filter(r => r.payment_status === 'waiting_confirmation').length,
    confirmed: rows.filter(r => r.payment_status === 'confirmed').length,
    rejected: rows.filter(r => r.payment_status === 'rejected').length,
  }

  if (loading) return <Loader />

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5' }}>
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo height={22} /></a>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: '#f97316', fontSize: '13px', fontWeight: 600 }}>Admin</span>
          <a href="/dashboard" style={{ color: '#666', fontSize: '13px', textDecoration: 'none' }}>Dashboard</a>
          <button onClick={async () => { await supabase.auth.signOut(); navigate('/') }} style={{ background: 'none', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#666', fontSize: '13px', padding: '6px 14px', cursor: 'pointer' }}>Keluar</button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '4px' }}>Pendaftaran Cohort Juni 2026</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>{rows.length} peserta terdaftar</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {(['all', 'waiting_confirmation', 'pending', 'confirmed', 'rejected'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? '#f97316' : '#161616',
                border: `1px solid ${filter === s ? '#f97316' : '#2a2a2a'}`,
                borderRadius: '8px',
                color: filter === s ? '#fff' : '#888',
                fontSize: '13px',
                fontWeight: filter === s ? 700 : 400,
                padding: '6px 14px',
                cursor: 'pointer',
              }}
            >
              {s === 'all' ? 'Semua' : STATUS_LABEL[s]} ({counts[s]})
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: '#555', fontSize: '14px' }}>Tidak ada data.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(row => (
            <div key={row.id} style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>{row.profiles?.full_name ?? '(belum lengkap)'}</h3>
                    <span style={{ fontSize: '12px', color: STATUS_COLOR[row.payment_status], background: `${STATUS_COLOR[row.payment_status]}18`, padding: '2px 10px', borderRadius: '999px', border: `1px solid ${STATUS_COLOR[row.payment_status]}44` }}>
                      {STATUS_LABEL[row.payment_status]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#666', fontSize: '13px' }}>📱 {row.profiles?.phone ?? '-'}</span>
                    <span style={{ color: '#666', fontSize: '13px' }}>👤 {row.profiles?.background ? BG_LABEL[row.profiles.background] : '-'}</span>
                    {row.profiles?.occupation && <span style={{ color: '#666', fontSize: '13px' }}>💼 {row.profiles.occupation}</span>}
                  </div>
                  {row.profiles?.goals && (
                    <p style={{ color: '#555', fontSize: '13px', marginTop: '8px', maxWidth: '500px', lineHeight: 1.5 }}>
                      "{row.profiles.goals}"
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ color: '#f97316', fontWeight: 700, fontSize: '18px' }}>{formatAmount(row.unique_amount)}</p>
                  {row.transfer_submitted_at && (
                    <p style={{ color: '#555', fontSize: '12px' }}>
                      Transfer: {new Date(row.transfer_submitted_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>

              {row.payment_status === 'waiting_confirmation' && (
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => confirm(row.id)}
                      disabled={processing === row.id}
                      style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', opacity: processing === row.id ? 0.6 : 1 }}
                    >
                      ✓ Konfirmasi
                    </button>
                    <input
                      placeholder="Catatan penolakan (opsional)"
                      value={rejectNotes[row.id] ?? ''}
                      onChange={e => setRejectNotes(prev => ({ ...prev, [row.id]: e.target.value }))}
                      style={{ flex: 1, minWidth: '160px', background: '#161616', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '13px', outline: 'none' }}
                    />
                    <button
                      onClick={() => reject(row.id)}
                      disabled={processing === row.id}
                      style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '8px 16px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', opacity: processing === row.id ? 0.6 : 1 }}
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              )}

              {row.admin_notes && (
                <p style={{ color: '#555', fontSize: '12px', marginTop: '12px' }}>Catatan admin: {row.admin_notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
