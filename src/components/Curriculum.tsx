const sessions = [
  {
    week: 'Minggu 1',
    items: [
      { session: 'Sesi 1', title: 'Setup & React + TypeScript Fundamentals', desc: 'Vite setup, component structure, props, dan TypeScript basics' },
      { session: 'Sesi 2', title: 'Hooks & State Management', desc: 'useState, useEffect, dan membangun UI interaktif' },
    ],
  },
  {
    week: 'Minggu 2',
    items: [
      { session: 'Sesi 3', title: 'Intro Supabase & Database Design', desc: 'Setup project Supabase, buat tabel jobs dan employers' },
      { session: 'Sesi 4', title: 'Connecting React ke Supabase', desc: 'Fetch data, insert, update — CRUD lengkap dari frontend' },
    ],
  },
  {
    week: 'Minggu 3',
    items: [
      { session: 'Sesi 5', title: 'Authentication dengan Supabase Auth', desc: 'Login, register, protected routes, dan user session' },
      { session: 'Sesi 6', title: 'Forms, Validasi & User Content', desc: 'Handle form submission, validasi TypeScript, dan post job listing' },
    ],
  },
  {
    week: 'Minggu 4',
    items: [
      { session: 'Sesi 7', title: 'Row Level Security & Polish UI', desc: 'RLS di Supabase, responsive design, dan UX improvements' },
      { session: 'Sesi 8', title: 'Deploy & Portfolio Presentation', desc: 'GitHub Pages deployment, review proyek, dan langkah selanjutnya' },
    ],
  },
]

export default function Curriculum() {
  return (
    <section className="px-6 py-20 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Kurikulum
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            8 Sesi, 4 Minggu, 1 Aplikasi Nyata
          </h2>
          <p className="text-gray-400 text-lg">
            Setiap sesi live 90–120 menit, 2x seminggu via Google Meet.
          </p>
        </div>

        <div className="space-y-8">
          {sessions.map((week) => (
            <div key={week.week}>
              <p className="text-blue-400 font-semibold text-sm mb-3">{week.week}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {week.items.map((item) => (
                  <div
                    key={item.session}
                    className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 hover:border-blue-500/50 transition-colors"
                  >
                    <p className="text-xs text-gray-500 mb-1">{item.session}</p>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
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
