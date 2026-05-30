const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

export default function Hero() {
  return (
    <section className="px-6 pt-20 pb-16 max-w-5xl mx-auto">
      {/* Nav */}
      <div className="flex items-center justify-between mb-20">
        <span className="text-white font-semibold tracking-tight">Global Developer Academy</span>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Daftar Sekarang
        </a>
      </div>

      {/* Badge */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-sm text-neutral-400 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Mulai 10 Juni 2026 · Hanya 20 kursi
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
        Dari fresh graduate ke full stack developer — dalam 4 minggu.
      </h1>

      <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
        Belajar langsung dari engineer yang kerja remote di Australia. 8 sesi live,
        project nyata, dan kamu pulang dengan aplikasi yang bisa langsung ditunjukkan ke rekruiter.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          Daftar — Rp 699.000
        </a>
        <a
          href="#kurikulum"
          className="text-neutral-400 hover:text-white px-8 py-4 rounded-xl text-lg transition-colors flex items-center gap-2"
        >
          Lihat kurikulum →
        </a>
      </div>

      {/* Trust bar */}
      <div className="mt-16 pt-10 border-t border-white/8 flex flex-wrap gap-8 text-sm text-neutral-500">
        <span>8 sesi live via Google Meet</span>
        <span>·</span>
        <span>Komunitas Discord</span>
        <span>·</span>
        <span>Source code lengkap</span>
        <span>·</span>
        <span>Rekaman tersedia</span>
      </div>
    </section>
  )
}
