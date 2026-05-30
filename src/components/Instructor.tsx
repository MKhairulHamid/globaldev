import hamidPhoto from '../assets/hamid.png'

const credentials = [
  { label: 'Pengalaman', value: '8+ tahun' },
  { label: 'Kerja di', value: 'Remote · Australia' },
  { label: 'Stack harian', value: 'React · TypeScript · .NET 8' },
  { label: 'Pendidikan', value: 'Universitas Indonesia' },
]

export default function Instructor() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid #252525' }}>
      <p style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>Instruktur</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
        {/* Left */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <img
              src={hamidPhoto}
              alt="M. Khairul Hamid"
              style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2a2a2a' }}
            />
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                M. Khairul Hamid
              </h2>
              <a
                href="https://www.linkedin.com/in/mkhairulhamid/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#666', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.75, marginBottom: '16px' }}>
            Saya Hamid, engineer yang kerja remote dari Indonesia buat perusahaan teknologi di Australia.
            Delapan tahun nulis kode, dari startup lokal sampai sistem enterprise yang dipakai jutaan pengguna di puluhan negara.
          </p>
          <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.75, marginBottom: '32px' }}>
            Stack yang kita pakai di bootcamp ini persis sama dengan yang saya pakai setiap hari di kerjaan.
            Saya juga udah bangun{' '}
            <a href="https://cloudexamlab.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
              Cloud Exam Lab
            </a>
            , platform e-learning live pakai React dan Supabase yang sekarang sudah ada penggunanya.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {credentials.map((c) => (
              <div key={c.label} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px' }}>
                <p style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>{c.label}</p>
                <p style={{ color: '#e5e5e5', fontWeight: 600, fontSize: '14px' }}>{c.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>Pengalaman industri</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {[
              { label: 'Hospitality tech global', note: 'Australia · 3 benua' },
              { label: 'Enterprise HR SaaS', note: '150+ negara' },
              { label: 'Telekomunikasi Fortune 500', note: 'Indonesia' },
            ].map((c) => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#161616', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px 20px' }}>
                <span style={{ color: '#e5e5e5', fontWeight: 600, fontSize: '14px' }}>{c.label}</span>
                <span style={{ color: '#666', fontSize: '13px' }}>{c.note}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: '#666', fontSize: '12px', marginBottom: '12px' }}>Project live, dibangun pakai stack yang sama</p>
            <a href="https://cloudexamlab.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', marginBottom: '12px' }}>
              <div>
                <p style={{ color: '#fff', fontWeight: 600 }}>Cloud Exam Lab</p>
                <p style={{ color: '#666', fontSize: '13px' }}>cloudexamlab.com</p>
              </div>
              <span style={{ color: '#666', fontSize: '18px' }}>↗</span>
            </a>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['React', 'TypeScript', 'Supabase'].map((t) => (
                <span key={t} style={{ fontSize: '12px', background: 'rgba(249,115,22,0.12)', color: '#f97316', padding: '4px 10px', borderRadius: '6px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
