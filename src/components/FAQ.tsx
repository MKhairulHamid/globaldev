import { useState } from 'react'

const faqs = [
  {
    q: 'Apakah saya perlu pengalaman coding sebelumnya?',
    a: 'Kamu perlu dasar HTML, CSS, dan sedikit JavaScript. Tidak harus ahli, tapi setidaknya pernah membuat halaman web sederhana.',
  },
  {
    q: 'Bagaimana format sesi live-nya?',
    a: 'Sesi live via Google Meet, 90–120 menit per sesi, 2x seminggu selama 4 minggu. Kamu bisa langsung tanya jawab selama sesi berlangsung.',
  },
  {
    q: 'Bagaimana cara pembayarannya?',
    a: 'Pembayaran via transfer bank (BCA/Mandiri/GoPay/OVO). Detail pembayaran akan dikirim setelah kamu mendaftar.',
  },
  {
    q: 'Apakah ada rekaman jika saya tidak bisa hadir?',
    a: 'Ya, sesi akan direkam dan dibagikan ke peserta yang terdaftar. Namun sangat disarankan hadir live agar bisa bertanya langsung.',
  },
  {
    q: 'Software apa yang perlu saya siapkan?',
    a: 'Node.js, VS Code, dan browser modern. Semua gratis. Panduan setup akan dibagikan sebelum sesi pertama.',
  },
  {
    q: 'Apakah ada dukungan setelah bootcamp selesai?',
    a: 'Kamu akan tetap bisa akses komunitas Discord untuk diskusi dan networking dengan alumni dan instruktur.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="px-6 py-20 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold">Pertanyaan yang Sering Ditanya</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <span className="text-blue-400 text-xl shrink-0">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
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
