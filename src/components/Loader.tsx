import { useEffect, useState } from 'react'

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const STEPS = [
  'Menghubungkan ke server',
  'Memverifikasi sesi kamu',
  'Memuat profil',
  'Menyiapkan dashboard',
]

export default function Loader() {
  const [frame, setFrame] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const spin = setInterval(() => setFrame(f => (f + 1) % SPINNER.length), 80)
    const next = setInterval(() => setStep(p => (p + 1) % (STEPS.length + 1)), 650)
    return () => { clearInterval(spin); clearInterval(next) }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#111', border: '1px solid #222', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        {/* Terminal title bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #1f1f1f' }}>
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#2a2a2a' }} />
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#2a2a2a' }} />
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#2a2a2a' }} />
          {/* Globe mark */}
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none" style={{ marginLeft: '6px' }} className="gda-pulse">
            <circle cx="16" cy="16" r="13" stroke="#f97316" strokeWidth="1.5" />
            <ellipse cx="16" cy="16" rx="6.5" ry="13" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" />
            <line x1="3" y1="16" x2="29" y2="16" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" />
          </svg>
          <span style={{ marginLeft: '4px', color: '#444', fontSize: '12px', fontFamily: 'monospace' }}>globaldev — zsh</span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: '20px 22px', fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: '13px', lineHeight: 1.9, minHeight: '170px' }}>
          <div style={{ color: '#666' }}>
            <span style={{ color: '#f97316' }}>➜</span>{' '}
            <span style={{ color: '#67e8f9' }}>globaldev</span>{' '}
            <span style={{ color: '#a3a3a3' }}>npm run start</span>
          </div>

          {STEPS.map((label, i) => {
            const isDone = i < step
            const isActive = i === step
            if (i > step) return null
            return (
              <div key={label} className="gda-line" style={{ color: isDone ? '#4ade80' : '#e5e5e5' }}>
                <span style={{ color: isDone ? '#4ade80' : '#f97316', display: 'inline-block', width: '14px' }}>
                  {isDone ? '✓' : SPINNER[frame]}
                </span>{' '}
                {label}
                {isActive && <span style={{ color: '#555' }}>...</span>}
              </div>
            )
          })}

          {/* Prompt cursor */}
          <div style={{ color: '#666', marginTop: '2px' }}>
            <span style={{ color: '#f97316' }}>➜</span>{' '}
            <span className="gda-blink" style={{ color: '#e5e5e5' }}>▋</span>
          </div>
        </div>
      </div>
    </div>
  )
}
