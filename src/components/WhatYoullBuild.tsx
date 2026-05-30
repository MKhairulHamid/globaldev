const features = [
  'Tampilkan dan filter daftar lowongan kerja',
  'Posting lowongan sebagai employer',
  'Sistem login dan register pakai Supabase Auth',
  'Data tersimpan di database sungguhan',
  'Tampil rapi di HP maupun laptop',
  'Sudah live dan bisa dibuka siapa saja',
]

export default function WhatYoullBuild() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Yang akan kamu bangun</p>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '20px' }}>
            Platform lowongan kerja, dari database sampai tampil di browser.
          </h2>
          <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.75, marginBottom: '32px' }}>
            Proyek ini tetap hidup setelah bootcamp selesai.
            Bisa kamu tunjukkan ke rekruiter, ditambah fitur baru, atau dijadikan fondasi proyek lain.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {features.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#c3c3c3', fontSize: '15px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Code block */}
        <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #252525' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2a2a2a' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2a2a2a' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2a2a2a' }} />
            <span style={{ marginLeft: '8px', color: '#555', fontSize: '12px', fontFamily: 'monospace' }}>JobList.tsx</span>
          </div>
          <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.8 }}>
            <div style={{ color: '#555' }}>{'// Fetch jobs dari Supabase'}</div>
            <div style={{ marginTop: '12px' }}>
              <span style={{ color: '#c084fc' }}>const </span>
              <span style={{ color: '#e5e5e5' }}>{'{ data: jobs } '}</span>
              <span style={{ color: '#666' }}>= </span>
              <span style={{ color: '#fbbf24' }}>await </span>
              <span style={{ color: '#e5e5e5' }}>supabase</span>
            </div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.from<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'jobs'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.select<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'*, company(*)'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.eq<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'status'</span><span style={{ color: '#e5e5e5' }}>, </span><span style={{ color: '#86efac' }}>'open'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.order<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'created_at'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ marginTop: '16px', color: '#555' }}>{'// ✓ 12 lowongan ditemukan'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
