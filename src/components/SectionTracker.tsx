import { useEffect, useRef } from 'react'
import { trackSectionView } from '../lib/analytics'

// Wraps a landing-page section and reports to GA4 the first time it scrolls
// into view. Disconnects after firing so each section is counted once per load.
export default function SectionTracker({
  name,
  index,
  children,
}: {
  name: string
  index: number
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting && !fired.current) {
            fired.current = true
            trackSectionView(name, index)
            obs.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [name, index])

  return (
    <div ref={ref} data-section={name}>
      {children}
    </div>
  )
}
