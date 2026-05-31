import { useState } from 'react'

const faqs = [
  {
    q: 'Harus bisa apa sebelum daftar?',
    a: 'Minimal sudah pernah bikin halaman HTML dan paham dasar JavaScript: variabel, fungsi, if/else. Tidak harus mahir. Tapi kalau belum pernah coding sama sekali, materi di sesi pertama bisa terasa berat.',
  },
  {
    q: 'Sesinya berapa lama dan jam berapa?',
    a: 'Tiap sesi sekitar 90 sampai 120 menit, dua kali seminggu lewat Google Meet, selama lima minggu. Jadwal pastinya kita kunci setelah peserta terkumpul, menyesuaikan waktu yang paling pas buat mayoritas.',
  },
  {
    q: 'Cara bayarnya gimana?',
    a: 'Transfer bank ke BCA Syariah. Detail rekening dan langkah lengkapnya kita kirim begitu kamu isi form pendaftaran.',
  },
  {
    q: 'Kalau ada sesi yang tidak bisa saya ikuti?',
    a: 'Semua sesi direkam dan dibagikan ke peserta. Tetap lebih enak ikut live karena bisa tanya langsung, tapi rekamannya selalu ada kalau sewaktu-waktu kamu berhalangan.',
  },
  {
    q: 'Perlu nyiapin software apa saja?',
    a: 'Node.js, VS Code, dan browser. Semuanya gratis. Panduan install lengkapnya kita kirim sebelum sesi pertama mulai.',
  },
  {
    q: 'Ada garansi kerja tidak?',
    a: 'Jujur saja, garansi kerja tidak ada, dan tidak ada yang bisa menjanjikan itu dengan jujur. Yang pasti kamu dapat: satu aplikasi full stack yang sudah online dan bisa langsung kamu tunjukkan ke siapa pun.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section">
      <div style={{ maxWidth: '680px' }}>
        <div style={{ marginBottom: '56px' }}>
          <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</p>
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
