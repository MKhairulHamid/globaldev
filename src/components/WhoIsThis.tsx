const forYou = [
  'Fresh graduate IT yang mau mulai karier sebagai web developer',
  'Profesional non-IT yang ingin bangun web untuk bisnis atau bidang kerjanya sendiri',
  'Sudah paham dasar HTML, CSS, dan JavaScript, tapi belum pernah bikin aplikasi utuh',
  'Mau punya satu proyek nyata buat portofolio atau langsung dipakai',
  'Bisa ikut sesi live dua kali seminggu selama lima minggu',
]

const notForYou = [
  'Sudah bekerja sebagai developer dan terbiasa dengan React dan TypeScript',
  'Belum pernah coding sama sekali. Di sini kamu perlu dasar HTML dan CSS dulu.',
]

import {
  GraduationCap, Camera, BookOpen, ShoppingBag, Stethoscope, Ticket,
  type LucideIcon,
} from 'lucide-react'

const profiles: { Icon: LucideIcon; label: string; desc: string }[] = [
  { Icon: GraduationCap, label: 'Fresh grad IT', desc: 'Portofolio siap kerja' },
  { Icon: Camera, label: 'Fotografer', desc: 'Booking sesi foto online' },
  { Icon: BookOpen, label: 'Tutor privat', desc: 'Platform jadwal & bayar' },
  { Icon: ShoppingBag, label: 'Pengusaha Online', desc: 'Katalog & form order' },
  { Icon: Stethoscope, label: 'Tenaga medis / klinik', desc: 'Sistem reservasi pasien' },
  { Icon: Ticket, label: 'Event organizer', desc: 'Pendaftaran & tiket' },
]

export default function WhoIsThis() {
  return (
    <section className="section">
      <div style={{ marginBottom: '56px' }}>
        <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Untuk siapa</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          Pas buat kamu yang...
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '16px', maxWidth: '540px', lineHeight: 1.7 }}>
          Tidak harus punya background IT. Kalau kamu punya kebutuhan nyata untuk dibuatkan web, justru lebih baik karena kamu tahu persis apa yang mau dibangun.
        </p>
      </div>

      {/* Profile chips */}
      <div className="g3" style={{ gap: '10px', marginBottom: '40px' }}>
        {profiles.map((p) => (
          <div key={p.label} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: 36, height: 36, borderRadius: '9px', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(123, 108, 255, 0.14)', border: '1px solid rgba(123, 108, 255, 0.30)', color: '#7B6CFF' }}>
              <p.Icon size={18} strokeWidth={2} />
            </span>
            <div>
              <p style={{ color: '#e5e5e5', fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>{p.label}</p>
              <p style={{ color: '#666', fontSize: '12px' }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="g2" style={{ gap: '16px' }}>
        <div style={{ border: '1px solid #2a2a2a', borderRadius: '16px', padding: '32px' }}>
          <p style={{ color: '#e5e5e5', fontWeight: 600, marginBottom: '24px', fontSize: '15px' }}>Ini buat kamu</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {forYou.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '16px', color: '#c3c3c3', fontSize: '14px', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--spark)', fontWeight: 700, flexShrink: 0 }}>+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ border: '1px solid #222', borderRadius: '16px', padding: '32px', background: '#0d0d0d' }}>
          <p style={{ color: '#555', fontWeight: 600, marginBottom: '24px', fontSize: '15px' }}>Mungkin kurang pas</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notForYou.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '16px', color: '#666', fontSize: '14px', lineHeight: 1.65 }}>
                <span style={{ flexShrink: 0 }}>–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
