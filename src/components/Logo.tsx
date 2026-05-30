type LogoVariant = 'full' | 'mark'
type LogoTheme = 'dark' | 'light'

interface LogoProps {
  variant?: LogoVariant
  theme?: LogoTheme
  height?: number
}

export default function Logo({ variant = 'full', theme = 'dark', height = 32 }: LogoProps) {
  const textColor = theme === 'dark' ? '#ffffff' : '#0a0a0a'
  const mutedColor = theme === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'

  if (variant === 'mark') {
    const size = height
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill={theme === 'dark' ? '#1a1a1a' : '#f0f0f0'} />
        <circle cx="16" cy="16" r="9" stroke={textColor} strokeWidth="1.2" />
        <ellipse cx="16" cy="16" rx="4.5" ry="9" stroke={mutedColor} strokeWidth="1.2" />
        <line x1="7" y1="16" x2="25" y2="16" stroke={mutedColor} strokeWidth="1.2" />
        <circle cx="23" cy="9" r="3" fill="#f97316" />
      </svg>
    )
  }

  // Full wordmark — horizontal lockup
  const scale = height / 28
  const w = Math.round(170 * scale)
  const h = height

  return (
    <svg width={w} height={h} viewBox="0 0 170 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe mark */}
      <circle cx="14" cy="14" r="9" stroke={textColor} strokeWidth="1.2" />
      <ellipse cx="14" cy="14" rx="4.5" ry="9" stroke={mutedColor} strokeWidth="1.2" />
      <line x1="5" y1="14" x2="23" y2="14" stroke={mutedColor} strokeWidth="1.2" />
      <circle cx="21" cy="7" r="3" fill="#f97316" />

      {/* "Global" — light weight */}
      <text
        x="30"
        y="19"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="15"
        fontWeight="400"
        letterSpacing="-0.3"
        fill={textColor}
      >
        Global
      </text>

      {/* "Dev" — bold */}
      <text
        x="86"
        y="19"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="-0.3"
        fill={textColor}
      >
        Dev
      </text>

      {/* "." — orange accent */}
      <text
        x="112"
        y="19"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#f97316"
      >
        .
      </text>
    </svg>
  )
}
