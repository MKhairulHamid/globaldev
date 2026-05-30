const forYou = [
  'Fresh graduate IT yang mau masuk dunia kerja sebagai web developer',
  'Kamu sudah belajar coding sendiri tapi belum pernah bangun proyek lengkap',
  'Mau punya portofolio yang bisa ditunjukkan ke rekruiter',
  'Ingin memahami full stack development dari frontend sampai database',
]

const notForYou = [
  'Yang sudah bekerja sebagai developer dan familiar dengan React + TypeScript',
  'Yang mencari bootcamp intensif full-time (ini part-time, 2x seminggu)',
]

export default function WhoIsThis() {
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Untuk Siapa
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Bootcamp Ini Cocok Untukmu Jika...
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
          <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
            <span>✅</span> Ini untukmu
          </h3>
          <ul className="space-y-3">
            {forYou.map((item) => (
              <li key={item} className="flex gap-3 text-gray-300 text-sm">
                <span className="text-green-400 mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
            <span>❌</span> Mungkin bukan untukmu
          </h3>
          <ul className="space-y-3">
            {notForYou.map((item) => (
              <li key={item} className="flex gap-3 text-gray-300 text-sm">
                <span className="text-red-400 mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
