const features = [
  'Browse dan filter job listing',
  'Post lowongan kerja sebagai employer',
  'Login dan register pakai Supabase Auth',
  'Data real-time dari database',
  'Tampil bagus di HP dan laptop',
  'Deploy live dan bisa diakses siapa saja',
]

export default function WhatYoullBuild() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #1f1f1f' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Yang akan kamu bangun</p>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '20px' }}>
            Job Listing App: aplikasi full stack yang benar-benar fungsi.
          </h2>
          <p style={{ color: '#737373', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
            Di akhir bootcamp, kamu punya satu aplikasi full stack yang live di internet.
            Database nyata, autentikasi nyata, bisa kamu tunjukkan ke rekruiter atau masukkan ke CV.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {features.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d4d4d4', fontSize: '15px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Code block */}
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #1f1f1f' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#333' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#333' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#333' }} />
            <span style={{ marginLeft: '8px', color: '#444', fontSize: '12px', fontFamily: 'monospace' }}>JobList.tsx</span>
          </div>
          <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.8 }}>
            <div style={{ color: '#555' }}>{'// Fetch jobs dari Supabase'}</div>
            <div style={{ marginTop: '12px' }}>
              <span style={{ color: '#c084fc' }}>const </span>
              <span style={{ color: '#e5e5e5' }}>{'{ data: jobs } '}</span>
              <span style={{ color: '#737373' }}>= </span>
              <span style={{ color: '#fbbf24' }}>await </span>
              <span style={{ color: '#e5e5e5' }}>supabase</span>
            </div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.from<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'jobs'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.select<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'*, company(*)'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.eq<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'status'</span><span style={{ color: '#e5e5e5' }}>, </span><span style={{ color: '#86efac' }}>'open'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ paddingLeft: '16px', color: '#67e8f9' }}>.order<span style={{ color: '#e5e5e5' }}>(</span><span style={{ color: '#86efac' }}>'created_at'</span><span style={{ color: '#e5e5e5' }}>)</span></div>
            <div style={{ marginTop: '16px', color: '#444' }}>{'// ✓ 12 lowongan ditemukan'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
