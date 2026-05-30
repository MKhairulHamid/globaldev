const sessions = [
  {
    week: 'Minggu 1 — Fondasi',
    items: [
      { n: '01', date: 'Kamis, 11 Juni 2026', title: 'React dan TypeScript dari awal', desc: 'Setup Vite, cara berpikir komponen, props, dan TypeScript yang dipakai sehari-hari di dunia kerja.' },
      { n: '02', date: 'Selasa, 16 Juni 2026', title: 'State, hooks, dan tampilan interaktif', desc: 'useState, useEffect, dan cara React merespons perubahan data. Fokus ke nalar, bukan hafalan sintaks.' },
    ],
  },
  {
    week: 'Minggu 2 — Backend dengan Supabase',
    items: [
      { n: '03', date: 'Kamis, 18 Juni 2026', title: 'Setup Supabase dan rancang database', desc: 'Buat project Supabase, rancang schema tabel sesuai kebutuhan proyek yang kamu pilih.' },
      { n: '04', date: 'Selasa, 23 Juni 2026', title: 'Sambungkan React ke database', desc: 'Fetch, insert, update, delete. Kamu kontrol semua data dari React langsung ke Supabase.' },
    ],
  },
  {
    week: 'Minggu 3 — Auth dan AI masuk',
    items: [
      { n: '05', date: 'Kamis, 25 Juni 2026', title: 'Login dan register pakai Supabase Auth', desc: 'Sistem autentikasi yang aman, protected routes, dan manajemen sesi pengguna.' },
      { n: '06', date: 'Selasa, 30 Juni 2026', title: 'Kenalan dengan Claude Code', desc: 'Setelah paham fondasi, kita mulai pakai AI sebagai pair programmer. Cara kerja, cara prompt yang efektif, dan cara review kode yang digenerate AI.' },
    ],
  },
  {
    week: 'Minggu 4 — Fitur lengkap',
    items: [
      { n: '07', date: 'Kamis, 2 Juli 2026', title: 'Form, booking, dan alur pembayaran', desc: 'Tangani form booking, validasi TypeScript, dan alur pembayaran transfer dengan halaman konfirmasi untuk owner.' },
      { n: '08', date: 'Selasa, 7 Juli 2026', title: 'Keamanan di level database', desc: 'Row Level Security di Supabase. Kita tulis dulu secara manual, lalu lihat bagaimana AI bisa bantu debug dan iterasi lebih cepat.' },
    ],
  },
  {
    week: 'Minggu 5 — Deploy dan polish',
    items: [
      { n: '09', date: 'Kamis, 9 Juli 2026', title: 'Polish UI dan problem solving dengan AI', desc: 'Perbaiki tampilan, tangani edge case, dan pelajari cara pakai AI untuk problem solving bukan cuma generate kode.' },
      { n: '10', date: 'Selasa, 14 Juli 2026', title: 'Deploy, custom domain, dan review', desc: 'Aplikasi live. Setting custom domain sendiri. Review proyek bersama dan roadmap belajar selanjutnya sebagai developer di era AI.' },
    ],
  },
]

export default function Curriculum() {
  return (
    <section id="kurikulum" className="section">
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Kurikulum</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          10 sesi, 5 minggu, 1 aplikasi yang selesai.
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '16px' }}>
          Setiap Selasa dan Kamis, 19.30 WIB via Google Meet. Mulai 11 Juni 2026.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {sessions.map((week) => (
          <div key={week.week}>
            <p style={{ color: '#555', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>{week.week}</p>
            <div className="g2" style={{ gap: '12px' }}>
              {week.items.map((item) => (
                <div key={item.n} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                    <p style={{ color: '#555', fontSize: '12px', fontFamily: 'monospace' }}>Sesi {item.n}</p>
                    <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 600 }}>{item.date} · 19.30</p>
                  </div>
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
