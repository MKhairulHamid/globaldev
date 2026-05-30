import { useState } from 'react'

const faqs = [
  {
    q: 'Harus bisa apa sebelum daftar?',
    a: 'Minimal sudah pernah buat halaman HTML dan tahu sedikit JavaScript — variabel, fungsi, if/else. Tidak harus expert, tapi kalau belum pernah coding sama sekali, bootcamp ini akan terasa berat.',
  },
  {
    q: 'Berapa lama per sesi dan jam berapa?',
    a: 'Setiap sesi 90–120 menit live via Google Meet, 2x seminggu. Jadwal pasti akan dikonfirmasi ke peserta yang sudah daftar — disesuaikan dengan mayoritas peserta.',
  },
  {
    q: 'Bagaimana cara bayar?',
    a: 'Transfer bank (BCA/Mandiri/GoPay/OVO). Detail akan dikirim setelah kamu mengisi form pendaftaran.',
  },
  {
    q: 'Kalau tidak bisa hadir live gimana?',
    a: 'Sesi direkam dan dibagikan ke semua peserta. Tapi sangat disarankan hadir live karena bisa tanya langsung dan satu-satunya yang tidak bisa kamu ganti dari rekaman adalah kesempatan nanya.',
  },
  {
    q: 'Software apa yang perlu disiapkan?',
    a: 'Node.js, VS Code, dan browser. Semua gratis. Panduan lengkap setup akan dibagikan seminggu sebelum sesi pertama.',
  },
  {
    q: 'Apakah ada garansi?',
    a: 'Tidak ada garansi kerja — tidak ada bootcamp yang jujur yang bisa menjanjikan itu. Yang bisa saya jamin: kamu akan keluar dengan satu aplikasi full stack yang live dan bisa kamu tunjukkan.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="px-6 py-20 border-t border-white/8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Pertanyaan yang sering muncul.</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
              >
                <span className="text-white font-medium">{faq.q}</span>
                <span className="text-neutral-500 text-xl shrink-0 leading-none">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
