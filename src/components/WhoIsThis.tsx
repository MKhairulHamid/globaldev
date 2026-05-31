import {
  Code2, GraduationCap, Terminal, Zap,
  type LucideIcon,
} from 'lucide-react'

const personas: { Icon: LucideIcon; label: string; desc: string }[] = [
  {
    Icon: Code2,
    label: 'Background IT, belum ada portofolio live',
    desc: 'Fresh grad, junior dev, atau siapa pun yang bisa coding tapi belum punya satu proyek yang beneran online dan bisa ditunjukkan.',
  },
  {
    Icon: GraduationCap,
    label: 'Lulus IT, tapi belum lancar ngoding',
    desc: 'Punya gelar IT tapi materi coding di kuliah belum banyak dipraktikkan. Mau mulai dari awal dengan proyek yang nyata.',
  },
  {
    Icon: Terminal,
    label: 'Belajar coding sendiri',
    desc: 'Tidak punya gelar IT tapi sudah bisa HTML, CSS, dan JavaScript dasar. Atau sudah terbiasa bangun sesuatu dengan bantuan AI.',
  },
  {
    Icon: Zap,
    label: 'Biasa vibe coding, tapi sering pusing sendiri',
    desc: 'Bisa generate kode dengan AI, tapi kalau ada yang error atau hasilnya berantakan, bingung harus mulai debug dari mana.',
  },
]

const forYou = [
  'Punya background IT tapi belum punya satu pun proyek yang live dan bisa ditunjukkan ke employer atau klien',
  'Lulus IT tapi coding belum banyak dipraktikkan dan mau mulai dari awal dengan serius',
  'Belajar coding sendiri dan sudah paham HTML, CSS, JS dasar, tapi belum pernah menyatukan semuanya jadi satu aplikasi utuh',
  'Terbiasa vibe coding dengan AI, tapi masih sering bingung sendiri kalau ada error atau hasilnya berantakan',
  'Mau keluar dari bootcamp ini dengan satu aplikasi nyata yang langsung bisa dipakai atau masuk portofolio',
  'Bisa hadir dua kali seminggu selama lima minggu',
]

const notForYou = [
  'Sudah aktif kerja sebagai developer dan sehari-hari pakai React dan TypeScript',
  'Belum pernah sama sekali menyentuh kode. Kamu perlu minimal familiar dengan HTML dan JavaScript dulu sebelum ikut ini.',
]

export default function WhoIsThis() {
  return (
    <section className="section">
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Untuk siapa</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          Pas buat kamu yang...
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '16px', maxWidth: '540px', lineHeight: 1.7 }}>
          Punya kemampuan coding di level apapun, tapi belum pernah punya aplikasi yang beneran live dan bisa dibanggakan.
        </p>
      </div>

      {/* Persona cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        {personas.map((p) => (
          <div key={p.label} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <span style={{ width: 40, height: 40, borderRadius: '10px', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(123, 108, 255, 0.14)', border: '1px solid rgba(123, 108, 255, 0.30)', color: '#7B6CFF', marginTop: '2px' }}>
              <p.Icon size={19} strokeWidth={2} />
            </span>
            <div>
              <p style={{ color: '#e5e5e5', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{p.label}</p>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.65 }}>{p.desc}</p>
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
                <span style={{ flexShrink: 0, color: '#444' }}>–</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
