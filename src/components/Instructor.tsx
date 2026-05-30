export default function Instructor() {
  return (
    <section className="px-6 py-20 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Instruktur
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Belajar dari Praktisi, Bukan Teori
        </h2>

        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
            MH
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">M. Khairul Hamid</h3>
            <p className="text-blue-400 text-sm mb-4">
              Full Stack Developer · Australia-Based
            </p>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Software developer yang bekerja di perusahaan berbasis Australia
              menggunakan .NET, TypeScript, dan React setiap hari. Membangun
              aplikasi production-grade dan ingin berbagi pengalaman nyata
              kepada developer Indonesia yang baru memulai.
            </p>
          </div>

          <div className="flex gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-white">React</p>
              <p className="text-gray-500 text-sm">TypeScript</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">Supabase</p>
              <p className="text-gray-500 text-sm">PostgreSQL</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">.NET 8</p>
              <p className="text-gray-500 text-sm">Backend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
