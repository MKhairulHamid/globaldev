const credentials = [
  { label: 'Pengalaman', value: '8+ tahun' },
  { label: 'Saat ini', value: 'Remote · Australia' },
  { label: 'Stack harian', value: 'React · TypeScript · .NET 8' },
  { label: 'Lulusan', value: 'Universitas Indonesia' },
]

const companies = [
  { name: 'Liven Group', note: 'Australia · 35.000+ venues' },
  { name: 'Bipo Service', note: '150+ negara · HR SaaS' },
  { name: 'Telkom Indonesia', note: 'Fortune Global 500' },
]

export default function Instructor() {
  return (
    <section className="px-6 py-20 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-10">Instruktur</p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              M. Khairul Hamid
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Senior Full Stack Engineer yang sekarang kerja remote di perusahaan berbasis Australia.
              Sudah 8 tahun nulis kode untuk startup sampai perusahaan Fortune 500 —
              dan yang paling relevan buat kamu: aplikasi yang akan kita bangun di bootcamp ini
              persis sama dengan yang saya pakai di pekerjaan sehari-hari.
            </p>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Saya juga sudah build{' '}
              <a
                href="https://cloudexamlab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-orange-400 transition-colors"
              >
                Cloud Exam Lab
              </a>{' '}
              — aplikasi e-learning live yang dibangun pakai React + Supabase. Persis stack yang akan kita pakai.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {credentials.map((c) => (
                <div key={c.label} className="bg-white/5 rounded-xl p-4">
                  <p className="text-neutral-500 text-xs mb-1">{c.label}</p>
                  <p className="text-white font-semibold text-sm">{c.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-neutral-500 text-sm mb-4">Pernah bekerja di</p>
            <div className="space-y-3 mb-10">
              {companies.map((c) => (
                <div key={c.name} className="flex items-center justify-between bg-white/5 rounded-xl px-5 py-4">
                  <span className="text-white font-semibold">{c.name}</span>
                  <span className="text-neutral-500 text-sm">{c.note}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-neutral-500 text-xs mb-3">Project live</p>
              <a
                href="https://cloudexamlab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between hover:opacity-80 transition-opacity"
              >
                <div>
                  <p className="text-white font-semibold">Cloud Exam Lab</p>
                  <p className="text-neutral-500 text-sm">cloudexamlab.com</p>
                </div>
                <span className="text-neutral-500 group-hover:text-white transition-colors">↗</span>
              </a>
              <div className="flex gap-2 mt-3">
                {['React', 'TypeScript', 'Supabase'].map((t) => (
                  <span key={t} className="text-xs bg-orange-500/10 text-orange-400 px-2 py-1 rounded-md">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
