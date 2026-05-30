const sessions = [
  {
    week: 'Minggu 1',
    items: [
      { n: '01', title: 'React dan TypeScript dari awal', desc: 'Setup Vite, cara berpikir komponen, props, dan TypeScript yang dipakai sehari-hari di dunia kerja.' },
      { n: '02', title: 'State, hooks, dan tampilan interaktif', desc: 'useState, useEffect, dan cara React merespons perubahan data. Fokus ke nalar, bukan hafalan sintaks.' },
    ],
  },
  {
    week: 'Minggu 2',
    items: [
      { n: '03', title: 'Setup Supabase dan rancang database', desc: 'Buat project Supabase, rancang tabel jobs dan employers dari kebutuhan nyata aplikasi.' },
      { n: '04', title: 'Sambungkan React ke database', desc: 'Fetch, insert, update, delete. Kamu kontrol semua data dari React langsung ke Supabase.' },
    ],
  },
  {
    week: 'Minggu 3',
    items: [
      { n: '05', title: 'Login dan register pakai Supabase Auth', desc: 'Sistem autentikasi yang beneran aman, protected routes, dan manajemen sesi pengguna.' },
      { n: '06', title: 'Form, validasi, dan konten pengguna', desc: 'Tangani input dari user, validasi pakai TypeScript, dan biarkan employer posting lowongan sendiri.' },
    ],
  },
  {
    week: 'Minggu 4',
    items: [
      { n: '07', title: 'Keamanan di level database', desc: 'Row Level Security di Supabase. Keamanan yang diatur langsung di database, bukan cuma di tampilan.' },
      { n: '08', title: 'Deploy dan presentasi proyek', desc: 'Aplikasi live di internet. Kita review bareng, dan saya kasih tahu langkah belajar yang logis setelah ini.' },
    ],
  },
]

export default function Curriculum() {
  return (
    <section id="kurikulum" style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Kurikulum</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          8 sesi, 4 minggu, 1 aplikasi yang selesai.
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '16px' }}>
          Setiap sesi 90 sampai 120 menit live via Google Meet, dua kali seminggu.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {sessions.map((week) => (
          <div key={week.week}>
            <p style={{ color: '#555', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>{week.week}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {week.items.map((item) => (
                <div key={item.n} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '24px' }}>
                  <p style={{ color: '#555', fontSize: '12px', fontFamily: 'monospace', marginBottom: '12px' }}>Sesi {item.n}</p>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '8px', lineHeight: 1.4 }}>{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
