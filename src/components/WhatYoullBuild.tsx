const features = [
  { icon: '🔍', label: 'Browse & filter job listings' },
  { icon: '📝', label: 'Post jobs sebagai employer' },
  { icon: '🔐', label: 'Login & register dengan Supabase Auth' },
  { icon: '💾', label: 'Data real-time dari Supabase database' },
  { icon: '📱', label: 'Responsive di mobile & desktop' },
  { icon: '🚀', label: 'Deploy live di GitHub Pages' },
]

export default function WhatYoullBuild() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Yang Akan Kamu Buat
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Job Listing App — Proyek Portfolio Nyata
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Bukan cuma tutorial. Kamu akan membangun aplikasi yang bisa langsung
          kamu tunjukkan ke recruiter atau klien pertama kamu.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* App Preview Mockup */}
        <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 flex flex-col justify-center">
          <div className="bg-[#0f0f1a] rounded-xl p-4 font-mono text-sm text-gray-400 space-y-2">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="text-blue-400">{'// Job Listing App'}</div>
            <div><span className="text-purple-400">const</span> <span className="text-white">jobs</span> = <span className="text-yellow-400">await</span> supabase</div>
            <div className="pl-4"><span className="text-cyan-400">.from</span>(<span className="text-green-400">'jobs'</span>)</div>
            <div className="pl-4"><span className="text-cyan-400">.select</span>(<span className="text-green-400">'*'</span>)</div>
            <div className="pl-4"><span className="text-cyan-400">.eq</span>(<span className="text-green-400">'status'</span>, <span className="text-green-400">'open'</span>)</div>
            <div className="text-gray-600 mt-2">{'// ✅ 12 jobs found'}</div>
          </div>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 gap-3">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-gray-300 font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
