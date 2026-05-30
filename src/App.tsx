import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Loader from './components/Loader'
import Hero from './components/Hero'
import Instructor from './components/Instructor'
import WhatYoullBuild from './components/WhatYoullBuild'
import Curriculum from './components/Curriculum'
import WhoIsThis from './components/WhoIsThis'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import SectionTracker from './components/SectionTracker'
import AuthPage from './pages/AuthPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'

function LandingPage() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  // Any logged-in visitor (or auth callback) is forwarded to the dashboard.
  // Show the loader until we know there is no session (then reveal landing).
  useEffect(() => {
    let done = false
    const go = (session: unknown) => {
      if (session && !done) { done = true; navigate('/dashboard', { replace: true }) }
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) go(session)
      else setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => go(session))
    return () => subscription.unsubscribe()
  }, [navigate])

  if (checking) return <Loader />

  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <SectionTracker name="hero" index={1}><Hero /></SectionTracker>
        <SectionTracker name="instructor" index={2}><Instructor /></SectionTracker>
        <SectionTracker name="what_youll_build" index={3}><WhatYoullBuild /></SectionTracker>
        <SectionTracker name="curriculum" index={4}><Curriculum /></SectionTracker>
        <SectionTracker name="who_is_this" index={5}><WhoIsThis /></SectionTracker>
        <SectionTracker name="pricing" index={6}><Pricing /></SectionTracker>
        <SectionTracker name="faq" index={7}><FAQ /></SectionTracker>
        <SectionTracker name="footer" index={8}><Footer /></SectionTracker>
      </div>
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
