import {
  AppWindow, ShieldCheck, Users, CalendarCheck, CreditCard,
  LayoutDashboard, Globe, Sparkles, Lightbulb, type LucideIcon,
} from 'lucide-react'

type Feature = { Icon: LucideIcon; title: string; desc: string; accent?: boolean }

const features: Feature[] = [
  { Icon: AppWindow, title: 'Landing page bisnis', desc: 'Halaman publik berisi profil, daftar layanan, harga, dan kontak.' },
  { Icon: ShieldCheck, title: 'Autentikasi', desc: 'Owner login, customer register dan login dengan Supabase Auth.' },
  { Icon: Users, title: 'Roles', desc: 'Owner punya akses penuh ke dashboard. Customer bisa booking dan lihat riwayat.' },
  { Icon: CalendarCheck, title: 'Booking & order', desc: 'Customer pilih layanan, isi form, dan pilih jadwal. Semua tersimpan langsung ke database.' },
  { Icon: CreditCard, title: 'Pembayaran transfer', desc: 'Customer dapat instruksi bayar. Owner konfirmasi manual lewat dashboard.' },
  { Icon: LayoutDashboard, title: 'Owner dashboard', desc: 'Lihat semua booking masuk, konfirmasi atau tolak, kelola layanan.' },
  { Icon: Globe, title: 'Custom domain', desc: 'Belajar setting domain sendiri. Kamu yang beli, kita yang ajarin cara pasangnya.' },
  // The AI feature is the product's signature angle — flagged with the Spark accent.
  { Icon: Sparkles, title: 'Dibantu Claude Code', desc: 'Mulai sesi 6, kita pakai AI untuk mempercepat tanpa kehilangan pemahaman.', accent: true },
]

// Identity icon container: Signal (indigo) by default, Spark (orange) for the AI accent.
function IconBox({ Icon, accent, size = 40 }: { Icon: LucideIcon; accent?: boolean; size?: number }) {
  const color = accent ? '255, 90, 31' : '123, 108, 255'
  return (
    <span style={{
      width: size, height: size, borderRadius: '10px', flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: `rgba(${color}, 0.14)`,
      border: `1px solid rgba(${color}, 0.30)`,
      color: accent ? '#FF5A1F' : '#7B6CFF',
    }}>
      <Icon size={Math.round(size * 0.5)} strokeWidth={2} />
    </span>
  )
}

export default function WhatYoullBuild() {
  return (
    <section className="section">
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: 'var(--signal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Yang akan kamu bangun</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
          Platform bisnis pribadi yang langsung bisa dipakai.
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.75, maxWidth: '600px' }}>
          Bukan latihan yang dibuang setelah bootcamp selesai.
          Kamu keluar dengan satu aplikasi web yang beneran live,
          lengkap dari halaman publik sampai sistem pembayaran dan dashboard owner.
        </p>
      </div>

      <div className="g2" style={{ gap: '12px', marginBottom: '32px' }}>
        {features.map((f) => (
          <div key={f.title} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '22px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <IconBox Icon={f.Icon} accent={f.accent} />
            <div>
              <p style={{ color: '#e5e5e5', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{f.title}</p>
              <p style={{ color: '#777', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <IconBox Icon={Lightbulb} size={44} />
        <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.65, margin: 0 }}>
          Punya ide spesifik untuk bidang kamu? Selama skalanya realistis untuk 5 minggu, kita bahas di sesi pertama dan wujudkan bareng.
        </p>
      </div>
    </section>
  )
}
