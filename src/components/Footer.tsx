const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

export default function Footer() {
  return (
    <footer style={{ padding: '80px 0 48px', borderTop: '1px solid #252525' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end', marginBottom: '64px' }}>
        <div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <img src="/logo.svg" alt="Global Developer Academy" width={28} height={28} />
            <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>Global Developer Academy</p>
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '24px', lineHeight: 1.2 }}>
            Masih ada tempat.<br />Mulai 10 Juni.
          </h2>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none' }}
          >
            Daftar Sekarang
          </a>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#555', fontSize: '14px', lineHeight: 2.2 }}>
            <p>10 sesi live · 5 minggu · React, Supabase, Claude Code</p>
            <p>Rp 899.000 · Hanya 20 kursi</p>
          </div>
        </div>
      </div>

      <p style={{ color: '#333', fontSize: '13px' }}>© 2026 Global Developer Academy</p>
    </footer>
  )
}
