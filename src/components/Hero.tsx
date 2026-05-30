const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 text-center">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-4">
          Global Developer Academy
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Bangun Aplikasi Full Stack{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            React + Supabase
          </span>{' '}
          dari Nol
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Mini bootcamp 4 minggu dengan 8 sesi live. Kamu akan membangun aplikasi
          full stack nyata yang siap masuk portfolio — mulai dari frontend
          React TypeScript hingga database dan autentikasi dengan Supabase.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40"
          >
            Daftar Sekarang — Rp 699.000
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> 8 Sesi Live via Google Meet
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Mulai 10 Juni 2026
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Komunitas Discord
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Proyek Siap Portfolio
          </span>
        </div>
      </div>
    </section>
  )
}
