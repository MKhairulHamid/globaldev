const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

const includes = [
  '8 sesi live via Google Meet (±16 jam total)',
  'Akses komunitas Discord eksklusif peserta',
  'Full source code project Job Listing App',
  'Rekaman sesi untuk yang tidak bisa hadir',
  'Code review dan feedback langsung dari instruktur',
  'Sertifikat penyelesaian bootcamp',
]

export default function Pricing() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #1f1f1f' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Harga</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
          Satu harga, semua akses.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        <div>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ color: '#525252', fontSize: '13px', marginBottom: '8px' }}>Investasi</p>
            <p style={{ fontSize: '52px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>Rp 699.000</p>
            <p style={{ color: '#525252', fontSize: '13px', marginTop: '8px' }}>Mulai 10 Juni 2026 · Hanya 20 kursi</p>
          </div>

          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '16px 32px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', marginBottom: '12px' }}
          >
            Daftar Sekarang
          </a>
          <p style={{ color: '#444', fontSize: '13px', textAlign: 'center' }}>
            Pembayaran via transfer bank · Konfirmasi via WhatsApp
          </p>
        </div>

        <div style={{ border: '1px solid #1f1f1f', borderRadius: '16px', padding: '32px' }}>
          <p style={{ color: '#525252', fontSize: '13px', marginBottom: '20px' }}>Yang kamu dapat</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {includes.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '12px', color: '#d4d4d4', fontSize: '14px', lineHeight: 1.5 }}>
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
