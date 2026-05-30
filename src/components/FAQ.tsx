import { useState } from 'react'

const faqs = [
  {
    q: 'Harus bisa apa sebelum daftar?',
    a: 'Minimal sudah pernah buat halaman HTML dan kenal sedikit JavaScript: variabel, fungsi, if/else. Tidak harus expert. Tapi kalau belum pernah coding sama sekali, materi sesi pertama akan terasa berat.',
  },
  {
    q: 'Berapa lama tiap sesi dan jam berapa mulainya?',
    a: 'Setiap sesi sekitar 90 sampai 120 menit, dua kali seminggu via Google Meet. Jadwal pastinya akan dikonfirmasi ke peserta yang sudah mendaftar, disesuaikan dengan mayoritas.',
  },
  {
    q: 'Bagaimana cara bayarnya?',
    a: 'Transfer bank ke BCA, Mandiri, GoPay, atau OVO. Detail rekening dan instruksi lengkap dikirim setelah kamu mengisi form pendaftaran.',
  },
  {
    q: 'Kalau ada sesi yang tidak bisa saya hadiri?',
    a: 'Semua sesi direkam dan dibagikan ke peserta. Sangat disarankan hadir live karena kamu bisa tanya langsung. Tapi rekaman tetap ada kalau ada keperluan mendadak.',
  },
  {
    q: 'Software apa yang perlu disiapkan sebelum mulai?',
    a: 'Node.js, VS Code, dan browser modern. Semuanya gratis. Panduan instalasi lengkap akan dikirim seminggu sebelum sesi pertama dimulai.',
  },
  {
    q: 'Ada garansi apa dari bootcamp ini?',
    a: 'Tidak ada garansi kerja. Tidak ada yang bisa menjanjikan itu dengan jujur. Yang saya jamin: kamu keluar dengan satu aplikasi full stack yang sudah live dan bisa langsung kamu tunjukkan.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <div style={{ maxWidth: '680px' }}>
        <div style={{ marginBottom: '56px' }}>
          <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</p>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Pertanyaan yang sering masuk.</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: '1px solid #252525', borderRadius: '12px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#e5e5e5' }}
              >
                <span style={{ fontWeight: 500, fontSize: '15px' }}>{faq.q}</span>
                <span style={{ color: '#666', fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px', paddingTop: '16px', color: '#a3a3a3', fontSize: '14px', lineHeight: 1.75, borderTop: '1px solid #1e1e1e' }}>
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
