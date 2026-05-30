// Thin wrapper around the GA4 gtag installed in index.html (G-HZ76VSTHJW).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Fires once per section the first time a visitor scrolls it into view, so we
// can see how far down the landing page people actually get.
export function trackSectionView(name: string, index: number) {
  window.gtag?.('event', 'view_section', {
    section_name: name,
    section_index: index,
  })
}

export {}
