// Marks this device as "has logged in before" so returning visitors
// land on the login page instead of the signup flow.
const KEY = 'gda_returning'

export function markReturning() {
  try { localStorage.setItem(KEY, '1') } catch { /* ignore */ }
}

export function isReturning(): boolean {
  try { return localStorage.getItem(KEY) === '1' } catch { return false }
}

// CTA target: returning users → login, new users → signup flow
export function authEntryPath(): string {
  const base = import.meta.env.BASE_URL.slice(0, -1)
  return `${base}${isReturning() ? '/auth' : '/register'}`
}
