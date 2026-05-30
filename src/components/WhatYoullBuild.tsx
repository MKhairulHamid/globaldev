const projects = [
  {
    icon: '💸',
    title: 'Expense Tracker',
    desc: 'Catat pengeluaran harian, kelompokkan per kategori, dan lihat ringkasan tiap bulan. Aplikasi yang kamu sendiri bakal pakai, dan enak dipajang di portofolio.',
    tags: ['CRUD', 'Auth', 'Charts'],
  },
  {
    icon: '📁',
    title: 'Portofolio Digital',
    desc: 'Website portofolio pribadi: halaman proyek, profil, dan form kontak yang langsung masuk ke database. Kamu bikin portofolionya sambil belajar, jadi sekali jalan langsung kepakai.',
    tags: ['Landing page', 'Auth', 'Form'],
  },
  {
    icon: '📋',
    title: 'Mini Forum Komunitas',
    desc: 'Forum tanya-jawab sederhana buat komunitas, entah teman kampus, hobi, atau topik apa pun. Lengkap dengan posting, komentar, dan upvote.',
    tags: ['Real-time', 'Auth', 'Social'],
  },
]

export default function WhatYoullBuild() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Yang akan kamu bangun</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
          Pilih proyek yang paling pas buat kamu.
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.75, maxWidth: '600px' }}>
          Di sesi pertama kita tentukan bareng mau bangun yang mana.
          Tiga pilihan ini dirancang supaya bisa selesai dalam 5 minggu dan langsung pas dipajang di portofolio.
          Punya ide sendiri? Boleh, nanti kita obrolin bareng.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {projects.map((p) => (
          <div key={p.title} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>{p.icon}</span>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '17px' }}>{p.title}</h3>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.65, flexGrow: 1 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.06)', color: '#888', padding: '3px 10px', borderRadius: '6px', border: '1px solid #2a2a2a' }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '24px', flexShrink: 0 }}>💡</span>
        <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.65, margin: 0 }}>
          Punya ide proyek sendiri? Selama skalanya masih realistis buat 5 minggu, kita bahas di sesi pertama dan wujudkan bareng.
        </p>
      </div>
    </section>
  )
}
