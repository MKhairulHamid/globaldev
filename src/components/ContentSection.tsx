import { useState } from 'react'

const W = 270
const H = 480
const EASE = 'cubic-bezier(0.4,0,0.2,1)'

// ── Animation engine ─────────────────────────────────────────────────────────
// rv() builds a percentage-based reveal keyframe that loops with the ad. It is
// called at module load so the rules are collected once, then injected via the
// shared <style> tag below.
let _id = 0
const _rules: string[] = []

function rv(dur: number, inP: number, outP: number, o: { dy?: number; dx?: number; sc?: number } = {}) {
  const dy = o.dy ?? 12
  const dx = o.dx ?? 0
  const sc = o.sc ?? 1
  const name = `r${_id++}`
  const enter = Math.min(inP + 7, outP)
  const fade = Math.min(outP + 4, 100)
  _rules.push(
    `@keyframes ${name}{` +
    `0%,${inP}%{opacity:0;transform:translate(${dx}px,${dy}px) scale(${sc})}` +
    `${enter}%,${outP}%{opacity:1;transform:translate(0,0) scale(1)}` +
    `${fade}%,100%{opacity:0}}`,
  )
  return `${name} ${dur}s ${EASE} infinite both`
}

const STATIC = `
@keyframes blink{0%,49%{opacity:1}50%,99%{opacity:0}}
@keyframes ring{0%,70%,100%{box-shadow:0 0 0 0 rgba(255,90,31,0)}80%{box-shadow:0 0 26px 4px rgba(255,90,31,.55)}90%{box-shadow:0 0 0 14px rgba(255,90,31,0)}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
`

// ── Shared layout pieces ─────────────────────────────────────────────────────
function Card({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: W, height: H, borderRadius: 20, overflow: 'hidden',
      background: bg, position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '56px 28px', boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}

function TopBadge({ a, color, children }: { a: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ position: 'absolute', top: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', animation: a }}>
      <span style={{ background: `${color}1f`, border: `1px solid ${color}55`, color, borderRadius: 99, padding: '5px 14px', fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  )
}

function Url({ a, color = '#5a5a5a' }: { a: string; color?: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center', color, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', animation: a }}>
      globaldev.sbs
    </div>
  )
}

// Scene = absolutely centered block, for story ads where lines swap one by one.
function Scene({ a, children }: { a: string; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '60px 30px',
      textAlign: 'center', gap: 10, animation: a,
    }}>
      {children}
    </div>
  )
}

const big = (size: number, color = '#fff'): React.CSSProperties => ({ color, fontSize: size, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' })
const body = (color = '#cbd5e1'): React.CSSProperties => ({ color, fontSize: 14, fontWeight: 500, lineHeight: 1.6 })

// ── 1. Awareness — Tutorial Hell ─────────────────────────────────────────── 20s
const A1 = {
  dur: 20, accent: 'var(--spark)',
  badge: rv(20, 2, 95, { dy: -6 }),
  s1: rv(20, 7, 29), s2: rv(20, 32, 55), s3: rv(20, 58, 74), s4: rv(20, 77, 93),
  url: rv(20, 80, 95),
}
function Ad1() {
  return (
    <Card bg="linear-gradient(160deg,#0d0d0d,#1a0a00)">
      <TopBadge a={A1.badge} color={A1.accent}>Awareness</TopBadge>
      <Scene a={A1.s1}>
        <div style={big(30)}>Ratusan jam<br />nonton tutorial.</div>
        <div style={body('#8a8a8a')}>Sertifikat numpuk di laptop.</div>
      </Scene>
      <Scene a={A1.s2}>
        <div style={big(26)}>Giliran bikin aplikasi<br />sendiri,</div>
        <div style={{ ...big(40, A1.accent), marginTop: 6 }}>blank.</div>
      </Scene>
      <Scene a={A1.s3}>
        <div style={big(34, A1.accent)}>Itu Tutorial Hell.</div>
        <div style={body('#9a9a9a')}>Muter di teori, nggak pernah jadi karya.</div>
      </Scene>
      <Scene a={A1.s4}>
        <div style={body('#9a9a9a')}>Cara keluarnya cuma satu:</div>
        <div style={{ ...big(30), marginTop: 4 }}>Bikin aplikasi<br /><span style={{ color: A1.accent }}>yang beneran jalan.</span></div>
      </Scene>
      <Url a={A1.url} />
    </Card>
  )
}

// ── 2. Education — React + TypeScript + Supabase ─────────────────────────── 28s
const A2 = {
  dur: 28, accent: '#60a5fa',
  badge: rv(28, 2, 95, { dy: -6 }),
  title: rv(28, 6, 94),
  r1: rv(28, 16, 92, { dx: -18 }), r2: rv(28, 24, 92, { dx: -18 }), r3: rv(28, 32, 92, { dx: -18 }),
  close: rv(28, 62, 93),
  url: rv(28, 70, 95),
}
function Ad2() {
  const row = (a: string, name: string, color: string, desc: string) => (
    <div style={{ animation: a, display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left', width: '100%' }}>
      <span style={{ color, fontSize: 15, fontWeight: 800, minWidth: 78 }}>{name}</span>
      <span style={{ color: '#9ca3af', fontSize: 12.5, lineHeight: 1.5 }}>{desc}</span>
    </div>
  )
  return (
    <Card bg="linear-gradient(160deg,#070b14,#0a1424)">
      <TopBadge a={A2.badge} color={A2.accent}>Education</TopBadge>
      <div style={{ animation: A2.title, ...big(22), textAlign: 'center', marginBottom: 26 }}>
        Kenapa stack ini<br />pas buat bisnis?
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', marginBottom: 24 }}>
        {row(A2.r1, 'React', '#60a5fa', 'UI cepat & mulus. Dipakai Gojek, Tokopedia, ribuan startup.')}
        {row(A2.r2, 'TypeScript', '#a78bfa', 'Bug ketahuan sejak di editor, sebelum sampai ke user.')}
        {row(A2.r3, 'Supabase', '#34d399', 'Database, login, dan storage langsung siap pakai.')}
      </div>
      <div style={{ animation: A2.close, color: A2.accent, fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
        Tiga tools, satu alur kerja yang rapi.
      </div>
      <Url a={A2.url} />
    </Card>
  )
}

// ── 3. Engagement — polling question ─────────────────────────────────────── 16s
const A3 = {
  dur: 16, accent: '#a78bfa',
  badge: rv(16, 2, 95, { dy: -6 }),
  q: rv(16, 6, 92),
  o1: rv(16, 30, 90, { sc: 0.7 }), o2: rv(16, 38, 90, { sc: 0.7 }),
  o3: rv(16, 46, 90, { sc: 0.7 }), o4: rv(16, 54, 90, { sc: 0.7 }),
  cta: rv(16, 72, 95),
}
function Ad3() {
  const chip = (a: string, t: string) => (
    <span style={{ animation: a, background: '#a78bfa1a', border: '1px solid #a78bfa44', color: '#c4b5fd', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700 }}>{t}</span>
  )
  return (
    <Card bg="linear-gradient(160deg,#0c0814,#160a24)">
      <TopBadge a={A3.badge} color={A3.accent}>Pertanyaan buat kamu</TopBadge>
      <div style={{ animation: A3.q, ...big(23), textAlign: 'center', marginBottom: 28 }}>
        Kalau bisa bikin web sendiri, fitur apa yang paling kamu butuhin buat bisnismu?
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'center', marginBottom: 26 }}>
        {chip(A3.o1, 'Booking online')}
        {chip(A3.o2, 'Katalog produk')}
        {chip(A3.o3, 'Pembayaran')}
        {chip(A3.o4, 'Dashboard admin')}
      </div>
      <div style={{ animation: A3.cta, color: A3.accent, fontSize: 14, fontWeight: 800 }}>
        Tulis jawabanmu di komentar 👇
      </div>
    </Card>
  )
}

// ── 4. Lead Magnet — free PDF checklist ──────────────────────────────────── 20s
const A4 = {
  dur: 20, accent: '#34d399',
  badge: rv(20, 2, 95, { dy: -6 }),
  icon: rv(20, 8, 92, { sc: 0.6 }),
  title: rv(20, 18, 92),
  sub: rv(20, 42, 92),
  cta: rv(20, 70, 95),
}
function Ad4() {
  return (
    <Card bg="linear-gradient(160deg,#06120d,#0a2018)">
      <TopBadge a={A4.badge} color={A4.accent}>Gratis</TopBadge>
      <div style={{ animation: `${A4.icon}, floatY 3s ease-in-out infinite`, fontSize: 52, marginBottom: 20 }}>📋</div>
      <div style={{ animation: A4.title, ...big(23), textAlign: 'center', marginBottom: 16 }}>
        Checklist Persiapan<br />Bikin Web Booking<br />dari Nol
      </div>
      <div style={{ animation: A4.sub, ...body('#9ca3af'), textAlign: 'center', marginBottom: 24 }}>
        Langkah demi langkah, format PDF.<br />Tinggal ikutin dari atas ke bawah.
      </div>
      <div style={{ animation: A4.cta, background: '#34d399', color: '#06120d', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 900 }}>
        Komen "CHECKLIST" 👇
      </div>
    </Card>
  )
}

// ── 5. Nurturing — remote Australia story ────────────────────────────────── 38s
const A5 = {
  dur: 38, accent: '#fbbf24',
  badge: rv(38, 2, 96, { dy: -6 }),
  s1: rv(38, 6, 26), s2: rv(38, 29, 50), s3: rv(38, 53, 76), s4: rv(38, 79, 93),
  url: rv(38, 82, 96),
}
function Ad5() {
  return (
    <Card bg="linear-gradient(160deg,#100b00,#1c1400)">
      <TopBadge a={A5.badge} color={A5.accent}>Cerita</TopBadge>
      <Scene a={A5.s1}>
        <div style={big(26)}>Dulu saya ngoding dari kamar kecil di Indonesia.</div>
      </Scene>
      <Scene a={A5.s2}>
        <div style={big(26)}>Klien saya satu tim engineer di <span style={{ color: A5.accent }}>Australia.</span></div>
      </Scene>
      <Scene a={A5.s3}>
        <div style={big(24)}>Nggak ada yang nanya saya lulusan mana.</div>
        <div style={{ ...body('#cbb27a'), marginTop: 6 }}>Mereka cuma lihat aplikasi yang saya bangun.</div>
      </Scene>
      <Scene a={A5.s4}>
        <div style={big(28, A5.accent)}>Sekarang giliran saya bantu kamu sampai ke sana.</div>
      </Scene>
      <Url a={A5.url} color="#7a6a3a" />
    </Card>
  )
}

// ── 6. Problem Agitation — fresh grad & UMKM ─────────────────────────────── 30s
const A6 = {
  dur: 30, accent: '#f87171',
  badge: rv(30, 2, 96, { dy: -6 }),
  s1: rv(30, 6, 30), s2: rv(30, 33, 58), s3: rv(30, 61, 80), s4: rv(30, 82, 93),
  url: rv(30, 85, 96),
}
function Ad6() {
  return (
    <Card bg="linear-gradient(160deg,#140707,#220a0a)">
      <TopBadge a={A6.badge} color={A6.accent}>Realita</TopBadge>
      <Scene a={A6.s1}>
        <div style={big(40, A6.accent)}>100 lamaran.<br />2 panggilan.</div>
        <div style={{ ...body('#b08a8a'), marginTop: 8 }}>Cerita banyak fresh graduate.</div>
      </Scene>
      <Scene a={A6.s2}>
        <div style={big(24)}>Masalahnya, nggak ada karya yang bisa diklik dan dicoba HRD.</div>
      </Scene>
      <Scene a={A6.s3}>
        <div style={big(24)}>Di sisi lain, UMKM bayar jutaan cuma buat satu web booking.</div>
      </Scene>
      <Scene a={A6.s4}>
        <div style={big(28, A6.accent)}>Skill yang sama, dua peluang besar.</div>
      </Scene>
      <Url a={A6.url} color="#8a5a5a" />
    </Card>
  )
}

// ── 7. Soft Selling — coding with AI (Claude Code) ───────────────────────── 28s
const A7 = {
  dur: 28, accent: '#22d3ee',
  badge: rv(28, 2, 96, { dy: -6 }),
  s1: rv(28, 6, 28), s2: rv(28, 31, 54), s3: rv(28, 57, 78), s4: rv(28, 81, 93),
  url: rv(28, 84, 96),
}
function Ad7() {
  return (
    <Card bg="linear-gradient(160deg,#04121a,#06181c)">
      <TopBadge a={A7.badge} color={A7.accent}>Cara kerja baru</TopBadge>
      <Scene a={A7.s1}>
        <div style={big(26)}>Developer hari ini ngoding bareng <span style={{ color: A7.accent }}>AI.</span></div>
      </Scene>
      <Scene a={A7.s2}>
        <div style={big(24)}>Claude Code bantu nulis, benerin, dan jelasin kode.</div>
      </Scene>
      <Scene a={A7.s3}>
        <div style={big(28)}>Kerjaan yang dulu seminggu, sekarang bisa sehari.</div>
      </Scene>
      <Scene a={A7.s4}>
        <div style={big(24, A7.accent)}>Di kelas kami, kamu praktik langsung pakai tools ini.</div>
      </Scene>
      <Url a={A7.url} color="#3a7a82" />
    </Card>
  )
}

// ── 8. Social Proof — Cloud Exam Lab showcase ────────────────────────────── 24s
const A8 = {
  dur: 24, accent: '#10b981',
  badge: rv(24, 2, 95, { dy: -6 }),
  title: rv(24, 8, 92, { sc: 0.85 }),
  sub: rv(24, 18, 92),
  chips: [rv(24, 30, 90, { sc: 0.7 }), rv(24, 38, 90, { sc: 0.7 }), rv(24, 46, 90, { sc: 0.7 })],
  close: rv(24, 62, 93),
  url: rv(24, 70, 95),
}
function Ad8() {
  const chip = (a: string, t: string, c: string) => (
    <span style={{ animation: a, background: `${c}1a`, border: `1px solid ${c}44`, color: c, borderRadius: 8, padding: '6px 13px', fontSize: 12.5, fontWeight: 700 }}>{t}</span>
  )
  return (
    <Card bg="linear-gradient(160deg,#04140e,#06201a)">
      <TopBadge a={A8.badge} color={A8.accent}>Bukti nyata</TopBadge>
      <div style={{ animation: A8.title, ...big(30, A8.accent), textAlign: 'center', marginBottom: 12 }}>
        Cloud Exam Lab
      </div>
      <div style={{ animation: A8.sub, ...body('#9ca3af'), textAlign: 'center', marginBottom: 24 }}>
        Platform ujian online yang<br />beneran dipakai, bukan sekadar demo.
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {chip(A8.chips[0], 'React', '#60a5fa')}
        {chip(A8.chips[1], 'TypeScript', '#a78bfa')}
        {chip(A8.chips[2], 'Supabase', '#34d399')}
      </div>
      <div style={{ animation: A8.close, color: A8.accent, fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
        Stack yang sama yang bakal kamu kuasai.
      </div>
      <Url a={A8.url} color="#3a7a62" />
    </Card>
  )
}

// ── 9. Urgency & Scarcity ────────────────────────────────────────────────── 16s
const A9 = {
  dur: 16, accent: '#fb923c',
  badge: rv(16, 2, 95, { dy: -6 }),
  date: rv(16, 6, 92, { sc: 0.85 }),
  seats: rv(16, 22, 92),
  note: rv(16, 40, 92),
  cta: rv(16, 70, 95),
}
function Ad9() {
  return (
    <Card bg="linear-gradient(170deg,#140a00,#240c00)">
      <TopBadge a={A9.badge} color={A9.accent}>Tanggal penting</TopBadge>
      <div style={{ animation: A9.date, textAlign: 'center', marginBottom: 18 }}>
        <div style={body('#cbb27a')}>Kelas dimulai</div>
        <div style={big(36)}>11 Juni 2026</div>
      </div>
      <div style={{ animation: A9.seats, ...big(22, A9.accent), marginBottom: 18 }}>Kuota terbatas.</div>
      <div style={{ animation: A9.note, ...body('#cbb27a'), textAlign: 'center', marginBottom: 26 }}>
        Tiap cohort kami jaga kecil biar mentoring tetap intensif. Yang duluan daftar, yang dapat tempat.
      </div>
      <div style={{ animation: A9.cta, color: '#fff', background: A9.accent, borderRadius: 11, padding: '11px 22px', fontSize: 14, fontWeight: 900 }}>
        Amankan tempatmu →
      </div>
    </Card>
  )
}

// ── 10. Hard Selling — direct promo ──────────────────────────────────────── 22s
const A10 = {
  dur: 22, accent: 'var(--spark)',
  badge: rv(22, 2, 95, { dy: -6 }),
  brand: rv(22, 6, 93),
  price: rv(22, 16, 93, { sc: 0.7 }),
  l1: rv(22, 38, 93),
  l2: rv(22, 50, 93),
  cta: rv(22, 70, 96),
  url: rv(22, 78, 96),
}
function Ad10() {
  return (
    <Card bg="linear-gradient(160deg,#1a0a00,#2a0e00)">
      <TopBadge a={A10.badge} color={A10.accent}>Daftar sekarang</TopBadge>
      <div style={{ animation: A10.brand, color: A10.accent, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>
        Global Developer Academy
      </div>
      <div style={{ animation: A10.price, ...big(48), marginBottom: 16 }}>Rp 899.000</div>
      <div style={{ animation: A10.l1, ...body('#e2c9a0'), textAlign: 'center', marginBottom: 8 }}>
        5 minggu, dari nol sampai<br />aplikasi webmu online.
      </div>
      <div style={{ animation: A10.l2, color: '#f87171', fontSize: 14, fontWeight: 800, marginBottom: 22 }}>
        Kuota cohort terbatas.
      </div>
      <div style={{ animation: `${A10.cta}, ring 2.5s ease-in-out infinite`, color: '#fff', background: A10.accent, borderRadius: 12, padding: '13px 26px', fontSize: 15, fontWeight: 900 }}>
        Daftar Sekarang →
      </div>
      <Url a={A10.url} color="#8a5a30" />
    </Card>
  )
}

// ── Catalog ──────────────────────────────────────────────────────────────────
export type VideoDef = { id: string; n: number; cat: string; dur: number; El: React.FC }
export const ADS: VideoDef[] = [
  { id: 'awareness',  n: 1,  cat: 'Awareness',          dur: A1.dur,  El: Ad1 },
  { id: 'education',  n: 2,  cat: 'Education',           dur: A2.dur,  El: Ad2 },
  { id: 'engagement', n: 3,  cat: 'Engagement',          dur: A3.dur,  El: Ad3 },
  { id: 'leadmagnet', n: 4,  cat: 'Lead Magnet',         dur: A4.dur,  El: Ad4 },
  { id: 'nurturing',  n: 5,  cat: 'Nurturing',           dur: A5.dur,  El: Ad5 },
  { id: 'agitation',  n: 6,  cat: 'Problem Agitation',   dur: A6.dur,  El: Ad6 },
  { id: 'softsell',   n: 7,  cat: 'Soft Selling',        dur: A7.dur,  El: Ad7 },
  { id: 'proof',      n: 8,  cat: 'Social Proof',        dur: A8.dur,  El: Ad8 },
  { id: 'urgency',    n: 9,  cat: 'Urgency & Scarcity',  dur: A9.dur,  El: Ad9 },
  { id: 'hardsell',   n: 10, cat: 'Hard Selling',        dur: A10.dur, El: Ad10 },
]

export default function ContentSection() {
  const [open, setOpen] = useState<string | null>(null)
  const active = ADS.find(ad => ad.id === open)

  const scale = active
    ? Math.min((window.innerHeight * 0.9) / H, (window.innerWidth * 0.9) / W)
    : 1

  return (
    <section style={{ marginTop: 56 }}>
      <style>{STATIC + _rules.join('')}</style>

      {/* ── Full-screen modal ── */}
      {active && (
        <div
          onClick={() => setOpen(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ pointerEvents: 'none', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <active.El />
          </div>
          <button
            onClick={() => setOpen(null)}
            style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: 40, height: 40, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto' }}
          >
            ✕
          </button>
          <div style={{ position: 'absolute', bottom: 24, color: '#444', fontSize: 12 }}>Klik di mana saja untuk tutup</div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Content</h2>
        <p style={{ color: '#555', fontSize: 13 }}>10 ad creatives · Portrait · Durasi 15 sampai 60 detik · Klik "Layar Penuh" untuk screen record</p>
      </div>

      {/* ── Thumbnail grid ── */}
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        {ADS.map(({ id, n, cat, dur, El }) => (
          <div key={id}>
            <div style={{ marginBottom: 10, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: 'var(--spark)', fontSize: 12, fontWeight: 800 }}>{n}</span>
              <span style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cat}</span>
              <span style={{ color: '#444', fontSize: 11, marginLeft: 'auto' }}>{dur} detik</span>
            </div>

            {/* thumbnail — not clickable */}
            <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
              <El />
            </div>

            <button
              onClick={() => setOpen(id)}
              style={{ marginTop: 10, width: W, background: '#161616', border: '1px solid #2a2a2a', borderRadius: 8, color: '#aaa', fontSize: 12, fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}
            >
              Layar Penuh
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
