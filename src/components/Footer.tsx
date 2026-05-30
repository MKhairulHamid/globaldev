const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

export default function Footer() {
  return (
    <footer className="px-6 py-16 text-center border-t border-white/10">
      <div className="max-w-2xl mx-auto">
        <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-4">
          Global Developer Academy
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Siap mulai perjalanan kamu sebagai Full Stack Developer?
        </h2>
        <p className="text-gray-400 mb-8">
          Hanya 20 kursi tersedia. Bootcamp mulai 10 Juni 2026.
        </p>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-500/30"
        >
          Daftar Sekarang
        </a>
        <p className="text-gray-600 text-xs mt-10">
          © 2026 Global Developer Academy · Dibuat dengan ❤️ untuk developer Indonesia
        </p>
      </div>
    </footer>
  )
}
