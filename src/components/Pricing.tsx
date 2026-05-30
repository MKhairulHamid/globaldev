const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

const includes = [
  '10 sesi live via Google Meet, total sekitar 20 jam',
  'Akses komunitas Discord khusus peserta',
  'Source code lengkap dari proyek yang kamu bangun',
  'Rekaman semua sesi, buat jaga-jaga kalau ada yang kelewat',
  'Code review dan feedback langsung dari saya',
  'Sertifikat setelah bootcamp selesai',
]

export default function Pricing() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Harga</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
          Satu harga, semua sudah termasuk.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        <div>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}>Biaya ikut bootcamp</p>
            <p style={{ fontSize: '52px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Rp 899.000</p>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '8px' }}>Mulai 10 Juni 2026 · Hanya 20 kursi</p>
          </div>

          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '16px 32px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', marginBottom: '12px' }}
          >
            Daftar Sekarang
          </a>
          <p style={{ color: '#555', fontSize: '13px', textAlign: 'center' }}>
            Bayar via transfer bank · Konfirmasi lewat WhatsApp
          </p>
        </div>

        <div style={{ border: '1px solid #2a2a2a', borderRadius: '16px', padding: '32px' }}>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>Yang kamu dapat</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {includes.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '12px', color: '#c3c3c3', fontSize: '14px', lineHeight: 1.55 }}>
                <span style={{ color: '#f97316', flexShrink: 0, marginTop: '2px' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
