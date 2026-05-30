import Hero from './components/Hero'
import Instructor from './components/Instructor'
import WhatYoullBuild from './components/WhatYoullBuild'
import Curriculum from './components/Curriculum'
import WhoIsThis from './components/WhoIsThis'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <Instructor />
      <WhatYoullBuild />
      <Curriculum />
      <WhoIsThis />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}
