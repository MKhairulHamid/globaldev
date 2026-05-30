import Logo from './Logo'

const REGISTER_URL = '/#/auth'

export default function Hero() {
  return (
    <section style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '72px' }}>
        <span className="logo-full"><Logo height={26} /></span>
        <span className="logo-short" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
          <Logo height={26} />
        </span>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}
        >
          Daftar
        </a>
      </div>

      {/* Badge */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', fontSize: '13px', color: '#b3b3b3', padding: '6px 16px', borderRadius: '999px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
          Mulai 10 Juni 2026 · Hanya 30 kursi
        </span>
      </div>

      {/* Headline */}
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px', maxWidth: '800px' }}>
        Mulai dari nol. Selesai dengan aplikasi yang beneran jalan.
      </h1>

      <p style={{ color: '#a3a3a3', fontSize: '18px', maxWidth: '560px', lineHeight: 1.75, marginBottom: '40px' }}>
        10 sesi live bareng engineer yang sehari-hari kerja remote buat
        perusahaan teknologi di Australia. Kita bangun satu aplikasi full stack
        dari nol sampai online, pakai React, TypeScript, Supabase, dan dibantu Claude Code.
      </p>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none' }}
        >
          Daftar · Rp 899.000
        </a>
        <button
          onClick={() => document.getElementById('kurikulum')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', color: '#a3a3a3', fontSize: '16px', cursor: 'pointer', padding: 0 }}
        >
          Lihat kurikulum →
        </button>
      </div>

      {/* Trust bar */}
      <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid #252525', display: 'flex', flexWrap: 'wrap', gap: '24px', color: '#666', fontSize: '14px' }}>
        <span>10 sesi live via Google Meet</span>
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
