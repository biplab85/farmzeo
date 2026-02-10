import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { productTour } from '../content'

const tabIcons = [
  // Fields
  <svg key="fields" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 21h18M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>,
  // Weather
  <svg key="weather" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" /></svg>,
  // Scouting
  <svg key="scout" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
  // Finance
  <svg key="finance" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 8h-2a3 3 0 100 6h0a3 3 0 010 6H8M12 2v4M12 18v4" /></svg>,
  // Store
  <svg key="store" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l1-4h16l1 4M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9" /><path d="M9 21V13h6v8" /></svg>,
]

const tabImages: Record<string, string> = {
  'Field Management': '/images/appture/Field Management.jpg',
  'Weather Intelligence': '/images/appture/Weather Intelligence.jpg',
  'Scouting and Notes': '/images/appture/Scouting and Notes.png',
  'Expenses and Income': '/images/appture/Expenses and Income.png',
  'Store Front': '/images/appture/Store Front.png',
}

export default function ProductTour() {
  const [activeTab, setActiveTab] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const glowRef = useRef<HTMLDivElement>(null)

  // Auto-advance tabs
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % productTour.modules.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleTabClick = (i: number) => {
    setActiveTab(i)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % productTour.modules.length)
    }, 5000)
  }

  // Cursor glow effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!glowRef.current) return
    const rect = glowRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.setProperty('--glow-x', `${x}px`)
    glowRef.current.style.setProperty('--glow-y', `${y}px`)
  }

  return (
    <section id="product-tour" className="relative overflow-hidden">
      {/* Navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#025080] to-[#021B33]" />

      {/* Grid lines background */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="pt-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0v60H0" fill="none" stroke="#0D9984" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pt-grid)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute left-[30%] top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]" />

      {/* Cursor glow layer */}
      <div
        ref={glowRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background: 'radial-gradient(circle 150px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(13,153,132,0.08), transparent)',
        }}
      />

      <div className="relative z-10 py-20 md:py-28 lg:py-32">
        <Container>
          {/* Header */}
          <div className="text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <div className="h-[2px] w-8 bg-secondary-400" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary-400">{productTour.label}</span>
                <div className="h-[2px] w-8 bg-secondary-400" />
              </div>
            </ScrollReveal>
            <SplitText as="h2" className="mx-auto mt-4 max-w-3xl font-heading text-[32px] font-bold text-white sm:text-[36px] md:text-[40px] lg:text-[48px] lg:leading-[56px]">
              {productTour.headline}
            </SplitText>
          </div>

          {/* Glass tab bar */}
          <ScrollReveal delay={0.2} className="mt-10 lg:mt-14">
            <div className="mx-auto flex max-w-3xl overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm">
              {productTour.modules.map((mod, i) => (
                <button
                  key={mod.tab}
                  onClick={() => handleTabClick(i)}
                  className={`relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                    activeTab === i
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {activeTab === i && (
                    <motion.div
                      layoutId="activeProductTab"
                      className="absolute inset-0 rounded-full bg-secondary shadow-[0_0_20px_rgba(13,153,132,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 hidden sm:inline">{tabIcons[i]}</span>
                  <span className="relative z-10">{mod.tab}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Content area */}
          <div className="mx-auto mt-10 max-w-5xl lg:mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12"
              >
                {/* Text */}
                <div className="lg:w-[42%]">
                  <div className="mb-3 text-secondary-400">
                    {tabIcons[activeTab]}
                  </div>
                  <h3 className="font-heading text-[24px] font-bold text-white sm:text-[28px]">
                    {productTour.modules[activeTab]?.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.75] text-white/50 sm:text-[17px]">
                    {productTour.modules[activeTab]?.description}
                  </p>

                  {/* Dot pagination */}
                  <div className="mt-8 flex gap-2">
                    {productTour.modules.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleTabClick(i)}
                        className={`h-2 rounded-full transition-all duration-400 ${
                          activeTab === i
                            ? 'w-8 bg-secondary'
                            : 'w-2 bg-white/20 hover:bg-white/30'
                        }`}
                        aria-label={`Go to module ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Mockup */}
                <div className="lg:w-[58%]">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-2xl backdrop-blur-sm">
                    <div className="rounded-xl bg-[#021B33]/80 p-3 sm:p-4 md:p-5">
                      {/* Browser chrome */}
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#27CA40]" />
                        <div className="ml-3 h-5 flex-1 rounded-full bg-white/5 px-3 text-[10px] leading-5 text-white/20">
                          {productTour.modules[activeTab]?.title}
                        </div>
                      </div>

                      {/* Product image */}
                      <div className="rounded-lg bg-white/[0.02] p-2">
                        <img
                          src={tabImages[productTour.modules[activeTab]?.title ?? '']}
                          alt={productTour.modules[activeTab]?.title ?? ''}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  )
}
