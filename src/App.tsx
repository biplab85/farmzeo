import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Opportunity from './sections/Opportunity'
import Solution from './sections/Solution'
import ProductTour from './sections/ProductTour'
import Benefits from './sections/Benefits'
import Impact from './sections/Impact'
import WhyChoose from './sections/WhyChoose'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Opportunity />
        <Solution />
        <ProductTour />
        <Benefits />
        <Impact />
        <WhyChoose />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
