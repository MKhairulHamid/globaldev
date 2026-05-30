const REGISTER_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'

const includes = [
  '8 sesi live via Google Meet (total ±16 jam)',
  'Akses komunitas Discord eksklusif',
  'Source code proyek lengkap',
  'Rekaman sesi (jika ada kendala hadir)',
  'Review proyek portfolio kamu',
  'Sertifikat penyelesaian bootcamp',
]

export default function Pricing() {
  return (
    <section className="px-6 py-20 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Investasi
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">Satu Harga, Semua Akses</h2>
      </div>

      <div className="bg-gradient-to-b from-blue-600/20 to-transparent border border-blue-500/30 rounded-2xl p-8 text-center">
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">Harga Early Bird</p>
          <div className="flex items-end justify-center gap-2">
            <span className="text-5xl font-bold text-white">Rp 699.000</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Mulai 10 Juni 2026 · Hanya 20 kursi</p>
        </div>

        <ul className="text-left space-y-3 mb-8">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
              <span className="text-blue-400 mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-500/30"
        >
          Daftar & Amankan Tempat Sekarang
        </a>

        <p className="text-gray-500 text-xs mt-4">
          Pembayaran via transfer bank · Konfirmasi via WhatsApp
        </p>
      </div>
    </section>
  )
}
