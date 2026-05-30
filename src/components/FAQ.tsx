import { useState } from 'react'

const faqs = [
  {
    q: 'Harus bisa apa sebelum daftar?',
    a: 'Minimal sudah pernah buat halaman HTML dan tahu sedikit JavaScript — variabel, fungsi, if/else. Tidak harus expert, tapi kalau belum pernah coding sama sekali, bootcamp ini akan terasa berat.',
  },
  {
    q: 'Berapa lama per sesi dan jam berapa?',
    a: 'Setiap sesi 90–120 menit live via Google Meet, 2x seminggu. Jadwal pasti dikonfirmasi ke peserta yang sudah daftar — disesuaikan dengan mayoritas.',
  },
  {
    q: 'Bagaimana cara bayar?',
    a: 'Transfer bank (BCA/Mandiri/GoPay/OVO). Detail akan dikirim setelah kamu mengisi form pendaftaran.',
  },
  {
    q: 'Kalau tidak bisa hadir live gimana?',
    a: 'Sesi direkam dan dibagikan ke semua peserta. Tapi sangat disarankan hadir live — satu-satunya yang tidak bisa diganti dari rekaman adalah kesempatan tanya langsung.',
  },
  {
    q: 'Software apa yang perlu disiapkan?',
    a: 'Node.js, VS Code, dan browser. Semua gratis. Panduan lengkap setup akan dibagikan seminggu sebelum sesi pertama.',
  },
  {
    q: 'Apakah ada garansi?',
    a: 'Tidak ada garansi kerja — tidak ada bootcamp yang jujur yang bisa menjanjikan itu. Yang bisa saya jamin: kamu keluar dengan satu aplikasi full stack yang live dan bisa kamu tunjukkan.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #1f1f1f' }}>
      <div style={{ maxWidth: '680px' }}>
        <div style={{ marginBottom: '56px' }}>
          <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</p>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Pertanyaan yang sering muncul.</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: '1px solid #1f1f1f', borderRadius: '12px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff' }}
              >
                <span style={{ fontWeight: 500, fontSize: '15px' }}>{faq.q}</span>
                <span style={{ color: '#525252', fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px', color: '#737373', fontSize: '14px', lineHeight: 1.7, borderTop: '1px solid #1a1a1a', paddingTop: '16px' }}>
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
