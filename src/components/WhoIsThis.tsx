const forYou = [
  'Fresh graduate IT yang mau masuk industri sebagai web developer',
  'Sudah bisa HTML/CSS dan sedikit JavaScript, tapi belum pernah bangun aplikasi full stack',
  'Mau punya satu project nyata yang bisa masuk portofolio',
  'Siap hadir live 2x seminggu selama 4 minggu',
]

const notForYou = [
  'Sudah bekerja sebagai developer dan familiar dengan React dan TypeScript',
  'Belum pernah sama sekali coding — bootcamp ini butuh dasar HTML/CSS',
]

export default function WhoIsThis() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #1f1f1f' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Untuk siapa</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
          Jujur dulu sebelum daftar.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ border: '1px solid #2a2a2a', borderRadius: '16px', padding: '32px' }}>
          <p style={{ color: '#fff', fontWeight: 600, marginBottom: '24px', fontSize: '15px' }}>Cocok kalau kamu</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {forYou.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '16px', color: '#d4d4d4', fontSize: '14px', lineHeight: 1.6 }}>
                <span style={{ color: '#f97316', fontWeight: 700, flexShrink: 0 }}>+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ border: '1px solid #1a1a1a', borderRadius: '16px', padding: '32px', background: '#0d0d0d' }}>
          <p style={{ color: '#525252', fontWeight: 600, marginBottom: '24px', fontSize: '15px' }}>Kurang cocok kalau</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notForYou.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '16px', color: '#525252', fontSize: '14px', lineHeight: 1.6 }}>
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
