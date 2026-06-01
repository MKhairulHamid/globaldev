import { authEntryPath } from '../lib/authEntry'

const includes = [
  '10 sesi live via Google Meet, total sekitar 20 jam',
  'Akses komunitas Discord khusus peserta',
  'Source code lengkap dari proyek yang kamu bangun',
  'Rekaman semua sesi, buat jaga-jaga kalau ada yang kelewat',
  'Code review dan feedback langsung dari saya',
  'Sertifikat digital dengan link verifikasi untuk LinkedIn — pelengkap dari aplikasi yang sudah kamu bangun dan bisa langsung dicek siapapun',
]

export default function Pricing() {
  const REGISTER_URL = authEntryPath()
  return (
    <section className="section">
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Harga</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
          Satu harga, semua sudah termasuk.
        </h2>
      </div>

      <div className="g2" style={{ gap: '40px', alignItems: 'start' }}>
        <div>
          <div style={{ marginBottom: '32px', background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '28px' }}>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>Biaya ikut bootcamp</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '42px', fontWeight: 800,
                letterSpacing: '-0.03em', lineHeight: 1,
                color: 'transparent', textShadow: '0 0 16px rgba(255,255,255,0.15)',
                filter: 'blur(10px)', userSelect: 'none', pointerEvents: 'none',
              }}>
                Rp 999.000
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                background: 'rgba(123,108,255,0.1)', border: '1px solid rgba(123,108,255,0.2)',
                borderRadius: '999px', padding: '4px 12px', fontSize: '12px',
                color: 'var(--signal)', fontWeight: 600,
              }}>
                🔒 Early bird
              </span>
            </div>
            <p style={{ color: '#555', fontSize: '13px', marginBottom: '24px' }}>
              Daftar dulu untuk lihat harga khusus Batch 1.
            </p>
            <a
              href={REGISTER_URL}
              style={{ display: 'block', background: 'var(--spark)', color: '#fff', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: '10px' }}
            >
              Daftar untuk lihat harga →
            </a>
            <p style={{ color: '#444', fontSize: '12px', textAlign: 'center' }}>
              Gratis daftar · Harga diungkap setelah masuk
            </p>
          </div>
        </div>

        <div style={{ border: '1px solid #2a2a2a', borderRadius: '16px', padding: '32px' }}>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>Yang kamu dapat</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {includes.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '12px', color: '#c3c3c3', fontSize: '14px', lineHeight: 1.55 }}>
                <span style={{ color: 'var(--spark)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
