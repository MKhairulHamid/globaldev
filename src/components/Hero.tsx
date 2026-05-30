const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

export default function Hero() {
  return (
    <section style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '72px' }}>
        <span style={{ color: '#fff', fontWeight: 600, letterSpacing: '-0.02em' }}>Global Developer Academy</span>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}
        >
          Daftar Sekarang
        </a>
      </div>

      {/* Badge */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', fontSize: '13px', color: '#a3a3a3', padding: '6px 16px', borderRadius: '999px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }} />
          Mulai 10 Juni 2026 · Hanya 20 kursi
        </span>
      </div>

      {/* Headline */}
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px', maxWidth: '800px' }}>
        Dari fresh graduate ke full stack developer — dalam 4 minggu.
      </h1>

      <p style={{ color: '#737373', fontSize: '18px', maxWidth: '560px', lineHeight: 1.7, marginBottom: '40px' }}>
        Belajar langsung dari engineer yang kerja remote di Australia. 8 sesi live,
        project nyata, dan kamu pulang dengan aplikasi yang bisa langsung ditunjukkan ke rekruiter.
      </p>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none' }}
        >
          Daftar — Rp 699.000
        </a>
        <a
          href="#kurikulum"
          style={{ color: '#737373', fontSize: '16px', textDecoration: 'none' }}
        >
          Lihat kurikulum →
        </a>
      </div>

      {/* Trust bar */}
      <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: '24px', color: '#525252', fontSize: '14px' }}>
        <span>8 sesi live via Google Meet</span>
        <span>·</span>
        <span>Komunitas Discord</span>
        <span>·</span>
        <span>Source code lengkap</span>
        <span>·</span>
        <span>Rekaman tersedia</span>
      </div>
    </section>
  )
}
