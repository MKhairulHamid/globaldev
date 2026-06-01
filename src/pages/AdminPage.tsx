import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Profile, Registration } from '../types'
import Loader from '../components/Loader'
import AdminLayout from '../components/AdminLayout'

const WA_MESSAGE = encodeURIComponent(
  'Halo! Ini materi gratis dari Global Developer Academy.\n\n' +
  '📚 Panduan Menilai Kesiapan Belajar Full Stack\n' +
  'https://globaldev.sbs/download\n\n' +
  'Daftar gratis di link itu, langsung bisa download. Kalau ada pertanyaan, balas di sini ya! 🙏'
)

interface WaLead {
  id: string
  phone: string
  created_at: string
}

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
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [loading, setLoading] = useState(true)
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({})
  const [processing, setProcessing] = useState<string | null>(null)
  const [waLeads, setWaLeads] = useState<WaLead[]>([])
  const [activeTab, setActiveTab] = useState<'registrations' | 'wa_leads'>('registrations')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { navigate('/auth'); return }

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (!profile || profile.role !== 'admin') { navigate('/dashboard'); return }

      await fetchRows()
      const { data: wl } = await supabase.from('wa_leads').select('*').order('created_at', { ascending: false })
      if (wl) setWaLeads(wl as WaLead[])
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
    <AdminLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Admin Panel</p>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px' }}>Pendaftaran Batch Juni 2026</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', background: 'rgba(123,108,255,0.1)', color: 'var(--signal)', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(123,108,255,0.25)' }}>{rows.length} terdaftar</span>
            <span style={{ fontSize: '13px', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(251,191,36,0.25)' }}>{counts.waiting_confirmation} menunggu konfirmasi</span>
            <span style={{ fontSize: '13px', background: 'rgba(74,222,128,0.08)', color: '#4ade80', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(74,222,128,0.25)' }}>{counts.confirmed} terkonfirmasi</span>
            <span style={{ fontSize: '13px', background: 'rgba(37,211,102,0.08)', color: '#25d366', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(37,211,102,0.25)' }}>{waLeads.length} WA leads</span>
          </div>
        </div>

        {/* Main tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {(['registrations', 'wa_leads'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'var(--spark)' : '#161616',
                border: `1px solid ${activeTab === tab ? 'var(--spark)' : '#2a2a2a'}`,
                borderRadius: '8px', color: activeTab === tab ? '#fff' : '#888',
                fontSize: '13px', fontWeight: activeTab === tab ? 700 : 400,
                padding: '6px 16px', cursor: 'pointer',
              }}
            >
              {tab === 'registrations' ? `Pendaftaran (${rows.length})` : `WA Leads (${waLeads.length})`}
            </button>
          ))}
        </div>

        {/* WA Leads Tab */}
        {activeTab === 'wa_leads' && (
          <div>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
              Klik "Kirim WA" untuk membuka WhatsApp dengan pesan yang sudah terisi otomatis.
            </p>
            {waLeads.length === 0 && <p style={{ color: '#555', fontSize: '14px' }}>Belum ada WA lead.</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {waLeads.map(lead => (
                <div key={lead.id} style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>📱 {lead.phone}</p>
                    <p style={{ color: '#555', fontSize: '12px' }}>
                      {new Date(lead.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/^0/, '62').replace(/\D/g, '')}?text=${WA_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#25d366', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '13px', padding: '8px 16px', borderRadius: '8px', flexShrink: 0 }}
                  >
                    Kirim WA ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && <>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {(['all', 'waiting_confirmation', 'pending', 'confirmed', 'rejected'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? 'var(--spark)' : '#161616',
                border: `1px solid ${filter === s ? 'var(--spark)' : '#2a2a2a'}`,
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em' }}>{row.profiles?.full_name ?? '(belum lengkap)'}</h3>
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
                  <p style={{ color: 'var(--spark)', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>{formatAmount(row.unique_amount)}</p>
                  <p style={{ color: '#444', fontSize: '12px', marginTop: '4px' }}>
                    Daftar: {new Date(row.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {row.transfer_submitted_at && (
                    <p style={{ color: '#444', fontSize: '12px' }}>
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

        </>}

      </div>
    </AdminLayout>
  )
}
