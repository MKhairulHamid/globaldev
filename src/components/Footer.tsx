const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

export default function Footer() {
  return (
    <footer className="px-6 py-20 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-neutral-600 text-sm mb-4">Global Developer Academy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Masih ada tempat. Mulai 10 Juni.
            </h2>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Daftar Sekarang
            </a>
          </div>

          <div className="text-neutral-600 text-sm space-y-2 md:text-right">
            <p>8 sesi live · 4 minggu · React + Supabase</p>
            <p>Rp 699.000 · Hanya 20 kursi</p>
            <p className="mt-6">© 2026 Global Developer Academy</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
