interface LogoMarkProps {
  /** Rendered width/height in px (square). */
  size?: number
  /** Colour of the globe + meridian structure. Accent dots stay brand-fixed. */
  color?: string
  title?: string
}

/**
 * The standalone square mark — "the connection".
 * A faint globe with one meridian and two points on it: Spark orange
 * (Indonesia) joined to Signal indigo (Australia / global). Pairs with the
 * <Logo> wordmark; used where the full wordmark won't fit (mobile nav,
 * favicon, avatars). Structure uses currentColor so it inverts on light
 * backgrounds via the `color` prop.
 */
export default function LogoMark({ size = 32, color = '#fff', title = 'Global Developer Academy' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={title}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.4" />
      <path d="M9.2 22.8 A 13.2 13.2 0 0 1 22.8 9.2" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9.2" cy="22.8" r="3.4" fill="#FF5A1F" />
      <circle cx="22.8" cy="9.2" r="3.4" fill="#7B6CFF" />
    </svg>
  )
}
