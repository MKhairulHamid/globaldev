interface LogoProps {
  height?: number
}

export default function Logo({ height = 28 }: LogoProps) {
  const scale = height / 24
  const w = Math.round(248 * scale)
  const h = height

  return (
    <svg width={w} height={h} viewBox="0 0 248 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe mark */}
      <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="4" ry="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <circle cx="19" cy="5" r="2.5" fill="#f97316" />

      {/* Global — light */}
      <text x="28" y="17" fontFamily="'Inter', system-ui, sans-serif" fontSize="14" fontWeight="400" letterSpacing="-0.2" fill="#ffffff">Global</text>
      {/* Developer — bold */}
      <text x="74" y="17" fontFamily="'Inter', system-ui, sans-serif" fontSize="14" fontWeight="700" letterSpacing="-0.2" fill="#ffffff">Developer</text>
      {/* Academy — light */}
      <text x="152" y="17" fontFamily="'Inter', system-ui, sans-serif" fontSize="14" fontWeight="400" letterSpacing="-0.2" fill="#ffffff">Academy</text>
    </svg>
  )
}
