import Hero from './components/Hero'
import WhatYoullBuild from './components/WhatYoullBuild'
import Curriculum from './components/Curriculum'
import WhoIsThis from './components/WhoIsThis'
import Instructor from './components/Instructor'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Hero />
      <WhatYoullBuild />
      <Curriculum />
      <WhoIsThis />
      <Instructor />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}
