import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Instructor from './components/Instructor'
import WhatYoullBuild from './components/WhatYoullBuild'
import Curriculum from './components/Curriculum'
import WhoIsThis from './components/WhoIsThis'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import AuthPage from './pages/AuthPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'

function LandingPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <Hero />
        <Instructor />
        <WhatYoullBuild />
        <Curriculum />
        <WhoIsThis />
        <Pricing />
        <FAQ />
        <Footer />
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
