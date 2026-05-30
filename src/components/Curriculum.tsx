const sessions = [
  {
    week: 'Minggu 1',
    items: [
      { n: '01', title: 'React + TypeScript dari nol', desc: 'Setup Vite, struktur komponen, props, dan TypeScript basics yang dipakai di dunia kerja.' },
      { n: '02', title: 'State, hooks, dan UI interaktif', desc: 'useState, useEffect, dan cara berpikir React yang benar. Fokus ke nalar, bukan sekadar hafalan sintaks.' },
    ],
  },
  {
    week: 'Minggu 2',
    items: [
      { n: '03', title: 'Supabase setup dan desain database', desc: 'Buat project Supabase, rancang schema tabel jobs dan employers dari kebutuhan bisnis.' },
      { n: '04', title: 'CRUD dari frontend ke database', desc: 'Fetch, insert, update, delete. Kamu kontrol semua data langsung dari React ke Supabase.' },
    ],
  },
  {
    week: 'Minggu 3',
    items: [
      { n: '05', title: 'Autentikasi dengan Supabase Auth', desc: 'Login, register, protected routes, dan session management yang aman.' },
      { n: '06', title: 'Form, validasi, dan konten user', desc: 'Handle form submission dengan TypeScript, validasi input, dan posting job listing.' },
    ],
  },
  {
    week: 'Minggu 4',
    items: [
      { n: '07', title: 'Row Level Security dan polish UI', desc: 'RLS di Supabase, keamanan di level database yang jarang diajarkan di tutorial biasa.' },
      { n: '08', title: 'Deploy dan review portfolio', desc: 'Aplikasi live di internet. Review project bersama, dan roadmap belajar selanjutnya.' },
    ],
  },
]

export default function Curriculum() {
  return (
    <section id="kurikulum" style={{ padding: '80px 0', borderTop: '1px solid #1f1f1f' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Kurikulum</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          8 sesi, 4 minggu, 1 aplikasi yang selesai.
        </h2>
        <p style={{ color: '#737373', fontSize: '16px' }}>
          Setiap sesi 90–120 menit live via Google Meet, 2x seminggu.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {sessions.map((week) => (
          <div key={week.week}>
            <p style={{ color: '#444', fontSize: '13px', fontWeight: 500, marginBottom: '16px' }}>{week.week}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {week.items.map((item) => (
                <div
                  key={item.n}
                  style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '14px', padding: '24px' }}
                >
                  <p style={{ color: '#444', fontSize: '12px', fontFamily: 'monospace', marginBottom: '12px' }}>Sesi {item.n}</p>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '8px', lineHeight: 1.4 }}>{item.title}</h3>
                  <p style={{ color: '#737373', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
