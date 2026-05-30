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
    <section className="px-6 py-20 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-6">Yang akan kamu bangun</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Job Listing App — bukan toy project, tapi aplikasi yang fungsi.
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Di akhir bootcamp, kamu punya satu aplikasi full stack yang live di internet.
              Database nyata, autentikasi nyata, bisa kamu tunjukkan ke rekruiter atau
              masukkan ke CV.
            </p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Code block */}
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="ml-2 text-neutral-600 text-xs">JobList.tsx</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-neutral-600">{'// Fetch jobs dari Supabase'}</div>
              <div className="mt-3">
                <span className="text-purple-400">const</span>
                <span className="text-white"> {'{ data: jobs }'} </span>
                <span className="text-neutral-400">= </span>
                <span className="text-yellow-400">await </span>
                <span className="text-white">supabase</span>
              </div>
              <div className="pl-4 text-cyan-400">.from<span className="text-white">(</span><span className="text-green-400">'jobs'</span><span className="text-white">)</span></div>
              <div className="pl-4 text-cyan-400">.select<span className="text-white">(</span><span className="text-green-400">'*, company(*)'</span><span className="text-white">)</span></div>
              <div className="pl-4 text-cyan-400">.eq<span className="text-white">(</span><span className="text-green-400">'status'</span><span className="text-white">, </span><span className="text-green-400">'open'</span><span className="text-white">)</span></div>
              <div className="pl-4 text-cyan-400">.order<span className="text-white">(</span><span className="text-green-400">'created_at'</span><span className="text-white">, {'{ '}</span><span className="text-orange-400">ascending</span><span className="text-white">{': false })'}</span></div>
              <div className="mt-4 text-neutral-600">{'// ✓ 12 lowongan ditemukan'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
