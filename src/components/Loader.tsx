import { useEffect, useState } from 'react'

const MESSAGES = [
  'Menghubungkan ke server',
  'Memverifikasi sesi kamu',
  'Memuat profil',
  'Menyiapkan dashboard',
  'Sebentar lagi...',
]

export default function Loader() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setMsgIndex(i => (i + 1) % MESSAGES.length)
        setVisible(true)
      }, 300)
    }, 2000)
    return () => clearInterval(cycle)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
    }}>
      {/* Logo */}
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" className="gda-pulse">
        <circle cx="16" cy="16" r="13" stroke="#FF5A1F" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="6.5" ry="13" stroke="rgba(255,90,31,0.5)" strokeWidth="1.5" />
        <line x1="3" y1="16" x2="29" y2="16" stroke="rgba(255,90,31,0.5)" strokeWidth="1.5" />
      </svg>

      {/* Moving dots */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FF5A1F',
              display: 'inline-block',
              animation: `gdaDot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Fading text */}
      <p style={{
        color: '#888',
        fontSize: '14px',
        fontFamily: 'inherit',
        margin: 0,
        transition: 'opacity 0.3s ease',
        opacity: visible ? 1 : 0,
        minHeight: '20px',
      }}>
        {MESSAGES[msgIndex]}
      </p>

      <style>{`
        @keyframes gdaDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
