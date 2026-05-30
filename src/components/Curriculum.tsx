const sessions = [
  {
    week: 'Minggu 1',
    items: [
      { n: '01', title: 'React + TypeScript dari nol', desc: 'Setup Vite, struktur komponen, props, dan TypeScript basics yang dipakai di dunia kerja.' },
      { n: '02', title: 'State, hooks, dan UI interaktif', desc: 'useState, useEffect, dan cara berpikir React yang benar — bukan hafalan, tapi nalar.' },
    ],
  },
  {
    week: 'Minggu 2',
    items: [
      { n: '03', title: 'Supabase setup dan desain database', desc: 'Buat project Supabase, rancang schema tabel jobs dan employers dari kebutuhan bisnis.' },
      { n: '04', title: 'CRUD dari frontend ke database', desc: 'Fetch, insert, update, delete — kamu kontrol semua data dari React ke Supabase.' },
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
      { n: '07', title: 'Row Level Security dan polish UI', desc: 'RLS di Supabase — keamanan di level database, bukan cuma di frontend.' },
      { n: '08', title: 'Deploy dan review portfolio', desc: 'Aplikasi live di internet. Review project bersama, dan roadmap belajar selanjutnya.' },
    ],
  },
]

export default function Curriculum() {
  return (
    <section id="kurikulum" className="px-6 py-20 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Kurikulum</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            8 sesi, 4 minggu, 1 aplikasi yang selesai.
          </h2>
          <p className="text-neutral-400 text-lg">
            Setiap sesi 90–120 menit live via Google Meet, 2x seminggu.
          </p>
        </div>

        <div className="space-y-10">
          {sessions.map((week) => (
            <div key={week.week}>
              <p className="text-neutral-600 text-sm font-medium mb-4">{week.week}</p>
              <div className="grid md:grid-cols-2 gap-3">
                {week.items.map((item) => (
                  <div
                    key={item.n}
                    className="bg-white/[0.03] border border-white/8 hover:border-white/16 rounded-xl p-6 transition-colors"
                  >
                    <p className="text-neutral-600 text-xs font-mono mb-3">Sesi {item.n}</p>
                    <h3 className="text-white font-semibold mb-2 leading-snug">{item.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
