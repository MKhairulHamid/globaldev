import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Logo from './Logo'

const TABS = [
  { label: 'Registrations', path: '/admin' },
  { label: 'Content',       path: '/admin/content' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5' }}>
      {/* ── Top bar ── */}
      <div style={{ borderBottom: '1px solid #1f1f1f', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none' }}><Logo height={22} /></a>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: 'var(--spark)', fontSize: 13, fontWeight: 600 }}>Admin</span>
          <a href="/dashboard" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>Dashboard</a>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate('/') }}
            style={{ background: 'none', border: '1px solid #2a2a2a', borderRadius: 8, color: '#666', fontSize: 13, padding: '6px 14px', cursor: 'pointer' }}
          >
            Keluar
          </button>
        </div>
      </div>

      {/* ── Tab nav ── */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '0 24px', display: 'flex', gap: 4 }}>
        {TABS.map(tab => {
          const active = pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: active ? '2px solid var(--spark)' : '2px solid transparent',
                color: active ? '#fff' : '#666',
                fontSize: 14,
                fontWeight: active ? 700 : 400,
                padding: '12px 18px',
                cursor: 'pointer',
                marginBottom: -1,
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Page content ── */}
      {children}
    </div>
  )
}
