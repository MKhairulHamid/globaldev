const forYou = [
  'Fresh graduate IT yang mau kerja sebagai web developer',
  'Sudah kenal HTML, CSS, dan sedikit JavaScript tapi belum pernah bangun aplikasi lengkap',
  'Mau punya satu proyek nyata yang bisa masuk portofolio',
  'Bisa hadir live dua kali seminggu selama empat minggu',
]

const notForYou = [
  'Sudah kerja sebagai developer dan familiar dengan React dan TypeScript',
  'Belum pernah coding sama sekali. Bootcamp ini butuh dasar HTML dan CSS.',
]

export default function WhoIsThis() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Untuk siapa</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
          Pas buat kamu yang...
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ border: '1px solid #2a2a2a', borderRadius: '16px', padding: '32px' }}>
          <p style={{ color: '#e5e5e5', fontWeight: 600, marginBottom: '24px', fontSize: '15px' }}>Ini buat kamu</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {forYou.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '16px', color: '#c3c3c3', fontSize: '14px', lineHeight: 1.65 }}>
                <span style={{ color: '#f97316', fontWeight: 700, flexShrink: 0 }}>+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ border: '1px solid #222', borderRadius: '16px', padding: '32px', background: '#0d0d0d' }}>
          <p style={{ color: '#555', fontWeight: 600, marginBottom: '24px', fontSize: '15px' }}>Mungkin kurang pas</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notForYou.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '16px', color: '#666', fontSize: '14px', lineHeight: 1.65 }}>
                <span style={{ flexShrink: 0 }}>–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
