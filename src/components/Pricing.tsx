const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

const includes = [
  '8 sesi live via Google Meet (±16 jam total)',
  'Akses komunitas Discord eksklusif peserta',
  'Full source code project Job Listing App',
  'Rekaman sesi untuk yang tidak bisa hadir',
  'Code review dan feedback langsung dari instruktur',
  'Sertifikat penyelesaian bootcamp',
]

export default function Pricing() {
  return (
    <section className="px-6 py-20 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Harga</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Satu harga, semua akses.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="mb-8">
              <p className="text-neutral-500 text-sm mb-2">Investasi</p>
              <p className="text-5xl font-bold text-white tracking-tight">Rp 699.000</p>
              <p className="text-neutral-500 text-sm mt-2">Mulai 10 Juni 2026 · Hanya 20 kursi</p>
            </div>

            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-center text-lg transition-colors mb-4"
            >
              Daftar Sekarang
            </a>
            <p className="text-neutral-600 text-sm text-center">
              Pembayaran via transfer bank · Konfirmasi via WhatsApp
            </p>
          </div>

          <div className="border border-white/10 rounded-2xl p-8">
            <p className="text-neutral-500 text-sm mb-5">Yang kamu dapat</p>
            <ul className="space-y-4">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-orange-500 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
