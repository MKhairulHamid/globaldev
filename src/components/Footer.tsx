import Logo from './Logo'
import { authEntryPath } from '../lib/authEntry'

export default function Footer() {
  const REGISTER_URL = authEntryPath()
  return (
    <footer style={{ padding: '80px 0 48px', borderTop: '1px solid #252525' }}>
      <div className="g2" style={{ gap: '48px', alignItems: 'end', marginBottom: '64px' }}>
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Logo height={22} />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '24px', lineHeight: 1.2 }}>
            Masih ada tempat.<br />Mulai 11 Juni.
          </h2>
          <a
            href={REGISTER_URL}
            style={{ display: 'inline-block', background: 'var(--spark)', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none' }}
          >
            Daftar Sekarang
          </a>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#555', fontSize: '14px', lineHeight: 2.2 }}>
            <p>10 sesi live · 5 minggu · React, Supabase, Claude Code</p>
            <p>Rp 899.000 · Hanya 30 kursi</p>
          </div>
        </div>
      </div>

      <p style={{ color: '#333', fontSize: '13px' }}>© 2026 Global Developer Academy</p>
    </footer>
  )
}
