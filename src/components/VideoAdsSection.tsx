// 30-second animated video ads — Canvas 2D + MediaRecorder → WebM download
// Three ads:  Landscape 1280×720  ·  Square 1080×1080  ·  Vertical 1080×1920

import { useRef, useState, useEffect } from 'react'

// ── Brand colours ──────────────────────────────────────────────────────────
const SPARK   = '#FF5A1F'
const SIGNAL  = '#7B6CFF'
const BG      = '#0a0a0a'

// ── Timing helpers (all t in seconds) ──────────────────────────────────────
const c01  = (v: number) => Math.max(0, Math.min(1, v))
const prog = (t: number, a: number, b: number) => c01((t - a) / (b - a))
const eo3  = (t: number) => 1 - Math.pow(1 - t, 3)   // ease-out cubic
const eo5  = (t: number) => 1 - Math.pow(1 - t, 5)   // ease-out quint  (punchier appear)

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const fi   = (t: number, a: number, b: number) => eo3(prog(t, a, b))   // opacity: 0→1
const fi5  = (t: number, a: number, b: number) => eo5(prog(t, a, b))   // opacity: 0→1 punchy
const fo   = (t: number, a: number, b: number) => 1 - eo3(prog(t, a, b)) // opacity: 1→0
const sc   = (t: number, a: number, b: number, from = 0.5) =>           // scale: from→1
               lerp(from, 1, eo5(prog(t, a, b)))
const sy   = (t: number, a: number, b: number, d = 48) =>               // slide-Y offset
               d * (1 - eo3(prog(t, a, b)))

// ── Globe mark SVG (loaded once as Image) ──────────────────────────────────
const GLOBE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 32 32" fill="none">
<circle cx="16" cy="16" r="10.5" stroke="white" stroke-opacity="0.18" stroke-width="1.4"/>
<ellipse cx="16" cy="16" rx="4.5" ry="10.5" stroke="white" stroke-opacity="0.1" stroke-width="1.2"/>
<line x1="5.5" y1="16" x2="26.5" y2="16" stroke="white" stroke-opacity="0.1" stroke-width="1.2"/>
<path d="M9.2 22.8 A 13.2 13.2 0 0 1 22.8 9.2" stroke="white" stroke-opacity="0.6" stroke-width="1.8" stroke-linecap="round"/>
<circle cx="9.2" cy="22.8" r="3.4" fill="${SPARK}"/>
<circle cx="22.8" cy="9.2" r="3.4" fill="${SIGNAL}"/>
</svg>`
const GLOBE_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(GLOBE_SVG)}`

// ── Canvas drawing utilities ────────────────────────────────────────────────

function drawGlobe(
  ctx: CanvasRenderingContext2D, img: HTMLImageElement,
  cx: number, cy: number, size: number, alpha: number, scale = 1,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = c01(alpha)
  ctx.drawImage(img, cx - size * scale / 2, cy - size * scale / 2, size * scale, size * scale)
  ctx.restore()
}

function drawGlow(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, r: number, hexColor: string, alpha: number,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = c01(alpha)
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  // parse hex into rgba
  const hr = parseInt(hexColor.slice(1, 3), 16)
  const hg = parseInt(hexColor.slice(3, 5), 16)
  const hb = parseInt(hexColor.slice(5, 7), 16)
  g.addColorStop(0,   `rgba(${hr},${hg},${hb},0.35)`)
  g.addColorStop(0.5, `rgba(${hr},${hg},${hb},0.1)`)
  g.addColorStop(1,   `rgba(${hr},${hg},${hb},0)`)
  ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawRings(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, maxR: number, alpha: number,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = c01(alpha) * 0.08
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 1.5
  for (const r of [0.85, 0.65, 0.45, 0.25]) {
    ctx.beginPath(); ctx.arc(cx, cy, maxR * r, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.globalAlpha = c01(alpha) * 0.06
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke()
  ctx.restore()
}

function drawWordmarkText(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, scale: number, alpha: number,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = c01(alpha)
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  const fs = 11.5 * scale
  const left = cx - 103 * scale  // wordmark is ~206 units wide, center at 103

  ctx.font = `400 ${fs}px "Inter", system-ui, sans-serif`
  ctx.fillStyle = 'white'
  ctx.fillText('Global', left + 23 * scale, cy)

  ctx.font = `700 ${fs}px "Inter", system-ui, sans-serif`
  ctx.fillText('Developer', left + 61 * scale, cy)

  ctx.font = `400 ${fs}px "Inter", system-ui, sans-serif`
  ctx.fillText('Academy', left + 126 * scale, cy)
  ctx.restore()
}

function drawWordmark(
  ctx: CanvasRenderingContext2D, img: HTMLImageElement,
  cx: number, cy: number, scale: number, alpha: number,
) {
  if (alpha <= 0) return
  const gSize = 20 * scale
  const left  = cx - 103 * scale
  drawGlobe(ctx, img, left + gSize / 2, cy, gSize, alpha)
  drawWordmarkText(ctx, cx, cy, scale, alpha)
}

function drawText(
  ctx: CanvasRenderingContext2D, text: string,
  cx: number, cy: number, font: string, color: string,
  alpha: number, offsetY = 0,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = c01(alpha)
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, cx, cy + offsetY)
  ctx.restore()
}

function drawHLine(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, maxW: number, progress: number, color: string, alpha: number,
) {
  if (alpha <= 0 || progress <= 0) return
  ctx.save()
  ctx.globalAlpha = c01(alpha)
  ctx.strokeStyle = color
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  const w = maxW * progress
  ctx.beginPath(); ctx.moveTo(cx - w / 2, cy); ctx.lineTo(cx + w / 2, cy); ctx.stroke()
  ctx.restore()
}

function drawPill(
  ctx: CanvasRenderingContext2D, label: string,
  cx: number, cy: number, color: string, alpha: number, fontSize = 18, scale = 1,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.font = `700 ${fontSize * scale}px "Inter", system-ui, sans-serif`
  const tw = ctx.measureText(label).width
  const px = 20 * scale, py = 10 * scale
  const w = tw + px * 2, h = fontSize * scale + py * 2
  ctx.globalAlpha = c01(alpha)

  const r = parseInt(color.slice(1,3), 16)
  const g = parseInt(color.slice(3,5), 16)
  const b = parseInt(color.slice(5,7), 16)

  ctx.fillStyle = `rgba(${r},${g},${b},0.09)`
  ctx.beginPath()
  if (ctx.roundRect) ctx.roundRect(cx - w/2, cy - h/2, w, h, 8 * scale)
  else ctx.rect(cx - w/2, cy - h/2, w, h)
  ctx.fill()

  ctx.strokeStyle = `rgba(${r},${g},${b},0.28)`
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, cx, cy)
  ctx.restore()
}

// Helper: build the landscape layout within a W×H canvas
// canvas so that text is visible even in landscape.
// Actually re-centering for landscape — use full height properly:
function drawAd1Proper(
  ctx: CanvasRenderingContext2D, W: number, H: number,
  t: number, globe: HTMLImageElement,
) {
  const cx = W / 2, cy = H / 2

  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H)

  const pulse = 0.5 + 0.5 * Math.sin(t * 1.8)
  drawGlow(ctx, cx, cy - 60, 280, SPARK,  fi(t, 1, 4) * (0.5 + 0.4 * pulse))
  drawGlow(ctx, cx, cy - 60, 340, SIGNAL, fi(t, 1, 4) * 0.3)
  drawRings(ctx, cx, cy - 60, 220, fi(t, 0.5, 3))

  // Globe
  drawGlobe(ctx, globe, cx, cy - 110, 150, fi(t, 0.5, 3.5), sc(t, 0.5, 3.5, 0.3))

  // Wordmark
  drawWordmark(ctx, globe, cx, cy + 20, 2.4, fi(t, 3, 5.5))

  // Eyebrow
  drawText(ctx, 'FULL STACK BOOTCAMP', cx, cy + 60,
    `700 12px "Inter",sans-serif`, SIGNAL, fi(t, 4.5, 7))

  // Headline
  drawText(ctx, 'Mulai dari nol.', cx, cy + 110 + sy(t, 6, 9, 24),
    `800 52px "Space Grotesk","Inter",sans-serif`, 'white', fi(t, 6, 9))

  // Sub
  drawText(ctx, 'Selesai dengan aplikasi yang beneran jalan.', cx, cy + 158 + sy(t, 8.5, 11.5, 18),
    `500 20px "Inter",sans-serif`, '#a3a3a3', fi(t, 8.5, 11.5))

  // Line
  drawHLine(ctx, cx, cy + 195, 180, prog(t, 10.5, 13), SPARK, fi(t, 10.5, 12))

  // Pills row
  const pillFi = [fi5(t, 12, 14.5), fi5(t, 13.5, 16), fi5(t, 15, 17.5)]
  ;['React','TypeScript','Supabase'].forEach((lbl, i) => {
    const offsets = [-130, 0, 130]
    drawPill(ctx, lbl, cx + offsets[i], cy + 240,
      ['#60a5fa','#a78bfa','#34d399'][i], pillFi[i], 15)
  })

  // Batch info
  drawText(ctx, 'Batch Juni 2026', cx, cy + 290,
    `800 18px "Inter",sans-serif`, SPARK, fi(t, 17, 20))
  drawText(ctx, '11 Juni 2026  ·  30 kursi  ·  10 sesi live', cx, cy + 315,
    `400 14px "Inter",sans-serif`, '#555', fi(t, 19, 22))
}

// ── AD 2 — Stack Showcase · Square 1080 × 1080 ──────────────────────────────
function drawAd2(
  ctx: CanvasRenderingContext2D, W: number, H: number,
  t: number, globe: HTMLImageElement,
) {
  const cx = W / 2, cy = H / 2

  // Tinted background that shifts by section
  const bgSignal = fi(t, 3.5, 7) * fo(t, 7, 9.5)
  const bgPurple = fi(t, 9.5, 13) * fo(t, 13, 15.5)
  const bgGreen  = fi(t, 15.5, 19) * fo(t, 19, 21.5)
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H)
  if (bgSignal  > 0) { ctx.fillStyle = `rgba(60,165,250,${bgSignal * 0.04})`; ctx.fillRect(0,0,W,H) }
  if (bgPurple  > 0) { ctx.fillStyle = `rgba(167,139,250,${bgPurple * 0.04})`; ctx.fillRect(0,0,W,H) }
  if (bgGreen   > 0) { ctx.fillStyle = `rgba(52,211,153,${bgGreen  * 0.04})`; ctx.fillRect(0,0,W,H) }

  // === INTRO (0–6s): Globe + wordmark ===
  const introAlpha = fo(t, 5, 7)
  drawGlow(ctx, cx, cy - 80, 280, SPARK,  fi(t, 0, 3) * (0.5 + 0.3 * Math.sin(t*2)) * introAlpha)
  drawRings(ctx, cx, cy - 80, 220, fi(t, 0, 2.5) * introAlpha)
  drawGlobe(ctx, globe, cx, cy - 80, 200, fi(t, 0, 3) * introAlpha, sc(t, 0, 3, 0.2))
  drawWordmark(ctx, globe, cx, cy + 70, 3.2, fi(t, 2.5, 5) * introAlpha)
  drawText(ctx, 'Full Stack Bootcamp', cx, cy + 120,
    `700 20px "Inter",sans-serif`, SIGNAL, fi(t, 3.5, 5.5) * introAlpha)

  // === REACT (4–10s) ===
  const reactA = fi(t, 5, 7.5) * fo(t, 9, 11)
  drawGlow(ctx, cx, cy, 350, '#60a5fa', reactA * 0.2)
  drawText(ctx, 'React', cx, cy - 30 + sy(t, 5, 7.5, 60),
    `800 130px "Space Grotesk","Inter",sans-serif`, '#60a5fa', reactA)
  drawText(ctx, 'UI interaktif · dipakai Gojek & Tokopedia', cx, cy + 80,
    `400 22px "Inter",sans-serif`, '#a3a3a3', fi(t, 6.5, 9) * fo(t, 9, 11))

  // === TYPESCRIPT (10–16s) ===
  const tsA = fi(t, 11, 13.5) * fo(t, 15, 17)
  drawGlow(ctx, cx, cy, 350, '#a78bfa', tsA * 0.2)
  drawText(ctx, 'TypeScript', cx, cy - 30 + sy(t, 11, 13.5, 60),
    `800 100px "Space Grotesk","Inter",sans-serif`, '#a78bfa', tsA)
  drawText(ctx, 'Bug ketahuan sejak di editor — bukan di user', cx, cy + 80,
    `400 22px "Inter",sans-serif`, '#a3a3a3', fi(t, 12.5, 15) * fo(t, 15, 17))

  // === SUPABASE (16–22s) ===
  const sbA = fi(t, 17, 19.5) * fo(t, 21, 23)
  drawGlow(ctx, cx, cy, 350, '#34d399', sbA * 0.2)
  drawText(ctx, 'Supabase', cx, cy - 30 + sy(t, 17, 19.5, 60),
    `800 110px "Space Grotesk","Inter",sans-serif`, '#34d399', sbA)
  drawText(ctx, 'Database, auth & storage — siap pakai hari ini', cx, cy + 80,
    `400 22px "Inter",sans-serif`, '#a3a3a3', fi(t, 18.5, 21) * fo(t, 21, 23))

  // === FINALE (22–30s): All three + brand ===
  const finAlpha = fi(t, 22, 25)
  drawRings(ctx, cx, cy - 80, 180, finAlpha * 0.6)
  drawGlobe(ctx, globe, cx, cy - 120, 140, finAlpha, sc(t, 22, 25, 0.3))
  drawWordmark(ctx, globe, cx, cy - 10, 2.8, finAlpha)
  // Pills row
  ;['React','TypeScript','Supabase'].forEach((lbl, i) => {
    drawPill(ctx, lbl, cx + (i - 1) * 150, cy + 70,
      ['#60a5fa','#a78bfa','#34d399'][i], fi5(t, 23 + i * 0.8, 24.5 + i * 0.8), 18)
  })
  drawText(ctx, 'Batch Juni 2026  ·  11 Juni 2026', cx, cy + 140,
    `700 20px "Inter",sans-serif`, SPARK, fi(t, 25, 27))
  drawText(ctx, '30 kursi  ·  10 sesi live  ·  via Google Meet', cx, cy + 170,
    `400 16px "Inter",sans-serif`, '#555', fi(t, 26, 28))
}

// ── AD 3 — Vertical Story · 1080 × 1920 ────────────────────────────────────
function drawAd3(
  ctx: CanvasRenderingContext2D, W: number, H: number,
  t: number, globe: HTMLImageElement,
) {
  const cx = W / 2

  ctx.fillStyle = `linear-gradient(180deg,#060610,${BG})` // canvas doesn't support CSS gradient
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H)
  // manual gradient top
  const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.4)
  topGrad.addColorStop(0, '#060610')
  topGrad.addColorStop(1, BG)
  ctx.fillStyle = topGrad; ctx.fillRect(0, 0, W, H * 0.4)

  // Top bar
  ctx.save()
  ctx.globalAlpha = fi(t, 0, 1)
  const barG = ctx.createLinearGradient(0, 0, W, 0)
  barG.addColorStop(0, SPARK); barG.addColorStop(1, SIGNAL)
  ctx.fillStyle = barG; ctx.fillRect(0, 0, W, 5)
  ctx.restore()

  // Pulse glow
  const pulse = 0.5 + 0.5 * Math.sin(t * 1.6)
  drawGlow(ctx, cx, H * 0.27, 400, SPARK,  fi(t, 0.5, 4) * (0.5 + 0.3 * pulse))
  drawGlow(ctx, cx, H * 0.27, 480, SIGNAL, fi(t, 0.5, 4) * 0.2)
  drawRings(ctx, cx, H * 0.27, 320, fi(t, 0.5, 3.5))

  // Globe — grows dramatically
  const gScale = sc(t, 0.5, 4.5, 0.15)
  drawGlobe(ctx, globe, cx, H * 0.27, 280, fi(t, 0.5, 4.5), gScale)

  // Wordmark
  drawWordmark(ctx, globe, cx, H * 0.42, 3.8, fi(t, 4, 6.5))

  // Section divider 1
  drawHLine(ctx, cx, H * 0.49, W * 0.6, prog(t, 6.5, 8.5), BORDER_LINE, fi(t, 6.5, 8))

  // Eyebrow
  drawText(ctx, 'FULL STACK BOOTCAMP', cx, H * 0.52,
    `700 14px "Inter",sans-serif`, SIGNAL, fi(t, 7.5, 10))

  // Headline "Mulai dari nol."
  drawText(ctx, 'Mulai dari nol.', cx, H * 0.565 + sy(t, 8.5, 12, 40),
    `800 72px "Space Grotesk","Inter",sans-serif`, 'white', fi(t, 8.5, 12))

  // Orange sub
  drawText(ctx, 'Selesai dengan', cx, H * 0.63 + sy(t, 11, 14, 30),
    `700 46px "Space Grotesk","Inter",sans-serif`, SPARK, fi(t, 11, 14))
  drawText(ctx, 'aplikasi nyata.', cx, H * 0.676 + sy(t, 11.5, 14.5, 30),
    `700 46px "Space Grotesk","Inter",sans-serif`, SPARK, fi(t, 11.5, 14.5))

  // Section divider 2
  drawHLine(ctx, cx, H * 0.725, W * 0.6, prog(t, 15, 17), BORDER_LINE, fi(t, 15, 16.5))

  // Stack pills — three stacked vertically
  const stacks = [
    { lbl: 'React',      color: '#60a5fa', ta: 16, tb: 18.5 },
    { lbl: 'TypeScript', color: '#a78bfa', ta: 18, tb: 20.5 },
    { lbl: 'Supabase',   color: '#34d399', ta: 20, tb: 22.5 },
  ]
  stacks.forEach(({ lbl, color, ta, tb }, i) => {
    drawPill(ctx, lbl, cx, H * (0.76 + i * 0.055), color, fi5(t, ta, tb), 22, 1.3)
  })

  // Section divider 3
  drawHLine(ctx, cx, H * 0.9, W * 0.6, prog(t, 22, 24), BORDER_LINE, fi(t, 22, 23.5))

  // Batch + date
  drawText(ctx, 'Batch Juni 2026', cx, H * 0.928,
    `800 36px "Inter",sans-serif`, SPARK, fi(t, 22.5, 25.5))
  drawText(ctx, 'Mulai 11 Juni 2026', cx, H * 0.955,
    `600 26px "Inter",sans-serif`, '#e5e5e5', fi(t, 24, 26))
  drawText(ctx, '30 kursi tersedia  ·  10 sesi live', cx, H * 0.975,
    `400 20px "Inter",sans-serif`, '#666', fi(t, 25, 27))
}

const BORDER_LINE = '#2a2a2a'

// ── Video ad config ─────────────────────────────────────────────────────────
export type VideoAdDef = {
  id: string
  label: string
  format: string
  w: number
  h: number
  duration: number
  draw: (ctx: CanvasRenderingContext2D, W: number, H: number, t: number, globe: HTMLImageElement) => void
}

export const VIDEO_ADS: VideoAdDef[] = [
  {
    id: 'v1', label: 'V1 — Brand Intro',
    format: 'Landscape 1280×720', w: 1280, h: 720, duration: 30,
    draw: drawAd1Proper,
  },
  {
    id: 'v2', label: 'V2 — Stack Showcase',
    format: 'Square 1080×1080', w: 1080, h: 1080, duration: 30,
    draw: drawAd2,
  },
  {
    id: 'v3', label: 'V3 — Vertical Story',
    format: 'Vertical 1080×1920', w: 1080, h: 1920, duration: 30,
    draw: drawAd3,
  },
]

// ── VideoAdCard component ───────────────────────────────────────────────────
const PREFERRED_MIME = (() => {
  if (typeof MediaRecorder === 'undefined') return ''
  for (const mt of ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']) {
    try { if (MediaRecorder.isTypeSupported(mt)) return mt } catch { /* noop */ }
  }
  return ''
})()

function VideoAdCard({ ad }: { ad: VideoAdDef }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const rafRef      = useRef<number | null>(null)
  const startTsRef  = useRef<number | null>(null)
  const globeRef    = useRef<HTMLImageElement | null>(null)

  const [isRecording, setIsRecording]   = useState(false)
  const [recProgress, setRecProgress]   = useState(0)  // 0–1
  const [fontsReady,  setFontsReady]    = useState(false)

  // Load fonts + globe image
  useEffect(() => {
    const img = new Image()
    img.onload = () => { globeRef.current = img }
    img.src = GLOBE_URL

    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  // Preview animation loop
  useEffect(() => {
    if (!fontsReady) return
    function frame(ts: number) {
      if (isRecording) return
      if (!startTsRef.current) startTsRef.current = ts
      const elapsed = (ts - startTsRef.current) / 1000
      const t = elapsed % ad.duration   // loop

      const canvas = canvasRef.current
      const globe  = globeRef.current
      if (!canvas || !globe) { rafRef.current = requestAnimationFrame(frame); return }
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ad.draw(ctx, canvas.width, canvas.height, t, globe)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [fontsReady, isRecording, ad])

  // Record & download
  async function handleRecord() {
    const canvas = canvasRef.current
    const globe  = globeRef.current
    if (!canvas || !globe || isRecording || !PREFERRED_MIME) return

    setIsRecording(true)
    setRecProgress(0)

    // Stop preview loop
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startTsRef.current = null

    const stream   = (canvas as HTMLCanvasElement & { captureStream(fps?: number): MediaStream }).captureStream(30)
    const recorder = new MediaRecorder(stream, {
      mimeType: PREFERRED_MIME,
      videoBitsPerSecond: 8_000_000,
    })
    const chunks: Blob[] = []
    recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }
    recorder.onstop = () => {
      const ext  = PREFERRED_MIME.startsWith('video/webm') ? 'webm' : 'mp4'
      const blob = new Blob(chunks, { type: PREFERRED_MIME.split(';')[0] })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = `gda-${ad.id}-${ad.w}x${ad.h}-30s.${ext}`; a.click()
      URL.revokeObjectURL(url)
      setIsRecording(false)
      startTsRef.current = null  // restart preview from t=0
    }

    recorder.start(200)

    const recCanvas = canvas   // already non-null (checked above)
    const recGlobe  = globe    // already non-null (checked above)
    const recStart  = performance.now()
    function recordFrame(ts: number) {
      const elapsed = (ts - recStart) / 1000
      if (elapsed >= ad.duration) { recorder.stop(); return }
      setRecProgress(elapsed / ad.duration)
      const ctx = recCanvas.getContext('2d')
      if (ctx) ad.draw(ctx, recCanvas.width, recCanvas.height, elapsed, recGlobe)
      requestAnimationFrame(recordFrame)
    }
    requestAnimationFrame(recordFrame)
  }

  const PREV_W = 320
  const scale  = PREV_W / ad.w
  const prevH  = Math.round(ad.h * scale)

  return (
    <div>
      {/* Preview */}
      <div style={{ width: PREV_W, height: prevH, overflow: 'hidden', borderRadius: 10, background: '#0a0a0a', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={ad.w}
          height={ad.h}
          style={{ display: 'block', transform: `scale(${scale})`, transformOrigin: 'top left' }}
        />
        {!fontsReady && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 12 }}>
            Loading…
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{ marginTop: 8, color: '#666', fontSize: 11, textAlign: 'center' }}>
        {ad.format} · 30 detik
      </div>

      {/* Record button */}
      <div style={{ marginTop: 8 }}>
        {isRecording ? (
          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: 3, background: `linear-gradient(90deg,${SPARK},${SIGNAL})`, width: `${recProgress * 100}%`, transition: 'width 0.2s linear' }}/>
            <div style={{ padding: '6px 0', color: '#888', fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
              Recording… {Math.round(recProgress * 30)}s / 30s
            </div>
          </div>
        ) : (
          <button
            onClick={handleRecord}
            disabled={!PREFERRED_MIME}
            style={{
              width: PREV_W,
              background: PREFERRED_MIME ? 'rgba(255,90,31,0.12)' : '#111',
              border: `1px solid ${PREFERRED_MIME ? 'rgba(255,90,31,0.35)' : '#222'}`,
              borderRadius: 8,
              color: PREFERRED_MIME ? 'var(--spark)' : '#444',
              fontSize: 12, fontWeight: 700,
              padding: '8px 0',
              cursor: PREFERRED_MIME ? 'pointer' : 'default',
            }}
          >
            {PREFERRED_MIME ? '⬇ Record & Download WebM' : 'MediaRecorder not supported'}
          </button>
        )}
        <div style={{ marginTop: 4, color: '#333', fontSize: 10, textAlign: 'center' }}>
          {ad.w} × {ad.h} · {PREFERRED_MIME ? PREFERRED_MIME.split(';')[0] : '—'}
        </div>
      </div>
    </div>
  )
}

// ── Main section export ─────────────────────────────────────────────────────
export default function VideoAdsSection() {
  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
          Video Ads
        </h2>
        <p style={{ color: '#555', fontSize: 13 }}>
          3 × 30-second animated ads · Canvas 2D · Record plays the animation in real-time then downloads as WebM
        </p>
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        {VIDEO_ADS.map(ad => <VideoAdCard key={ad.id} ad={ad} />)}
      </div>
    </section>
  )
}
