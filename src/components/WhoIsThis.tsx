const forYou = [
  'Fresh graduate IT yang mau masuk industri sebagai web developer',
  'Sudah bisa HTML/CSS dan sedikit JavaScript, tapi belum pernah bangun aplikasi full stack',
  'Mau punya satu project nyata yang bisa masuk portofolio',
  'Siap hadir live 2x seminggu selama 4 minggu',
]

const notForYou = [
  'Sudah bekerja sebagai developer dan familiar dengan React dan TypeScript',
  'Belum pernah sama sekali coding — bootcamp ini butuh dasar HTML/CSS',
]

export default function WhoIsThis() {
  return (
    <section className="px-6 py-20 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4">Untuk siapa</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Jujur dulu sebelum daftar.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-white/10 rounded-2xl p-8">
            <p className="text-white font-semibold mb-6">Cocok kalau kamu</p>
            <ul className="space-y-4">
              {forYou.map((item) => (
                <li key={item} className="flex gap-4 text-neutral-300 text-sm leading-relaxed">
                  <span className="text-orange-500 mt-0.5 shrink-0 font-bold">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-white/8 rounded-2xl p-8 bg-white/[0.02]">
            <p className="text-neutral-500 font-semibold mb-6">Kurang cocok kalau</p>
            <ul className="space-y-4">
              {notForYou.map((item) => (
                <li key={item} className="flex gap-4 text-neutral-500 text-sm leading-relaxed">
                  <span className="mt-0.5 shrink-0">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
