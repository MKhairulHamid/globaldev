const features = [
  { icon: '🌐', title: 'Landing page bisnis', desc: 'Halaman publik berisi profil, daftar layanan, harga, dan kontak.' },
  { icon: '🔐', title: 'Autentikasi', desc: 'Owner login, customer register dan login dengan Supabase Auth.' },
  { icon: '👥', title: 'Roles', desc: 'Owner punya akses penuh ke dashboard. Customer bisa booking dan lihat riwayat.' },
  { icon: '📅', title: 'Booking & order', desc: 'Customer pilih layanan, isi form, pilih jadwal — tersimpan ke database.' },
  { icon: '💳', title: 'Pembayaran transfer', desc: 'Customer dapat instruksi bayar. Owner konfirmasi manual lewat dashboard.' },
  { icon: '📊', title: 'Owner dashboard', desc: 'Lihat semua booking masuk, konfirmasi atau tolak, kelola layanan.' },
  { icon: '🌍', title: 'Custom domain', desc: 'Belajar setting domain sendiri — kamu yang beli, kita yang ajarin cara pasangnya.' },
  { icon: '🤖', title: 'Dibantu Claude Code', desc: 'Mulai sesi 6, kita pakai AI untuk mempercepat tanpa kehilangan pemahaman.' },
]

export default function WhatYoullBuild() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Yang akan kamu bangun</p>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
          Platform bisnis pribadi yang langsung bisa dipakai.
        </h2>
        <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.75, maxWidth: '600px' }}>
          Bukan latihan yang dibuang setelah bootcamp selesai.
          Kamu keluar dengan satu aplikasi web yang beneran live,
          lengkap dari halaman publik sampai sistem pembayaran dan dashboard owner.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
        {features.map((f) => (
          <div key={f.title} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '22px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '22px', flexShrink: 0, marginTop: '2px' }}>{f.icon}</span>
            <div>
              <p style={{ color: '#e5e5e5', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{f.title}</p>
              <p style={{ color: '#777', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '24px', flexShrink: 0 }}>💡</span>
        <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.65, margin: 0 }}>
          Punya ide spesifik untuk bidang kamu? Selama skalanya realistis untuk 5 minggu, kita bahas di sesi pertama dan wujudkan bareng.
        </p>
      </div>
    </section>
  )
}
