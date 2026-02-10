import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import { nav } from '../content'

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef<HTMLElement>(null)

  const scrolled = scrollProgress > 0.8

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 80, 1)
      setScrollProgress(progress)

      // Detect active section
      const sections = ['problem', 'solution', 'product-tour', 'features', 'about', 'faq']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      ref={navRef}
      className="fixed left-0 top-0 z-50 w-full transition-all duration-500"
      style={{
        backgroundColor: `rgba(255,255,255,${scrollProgress * 0.9})`,
        backdropFilter: `blur(${scrollProgress * 16}px)`,
        boxShadow: scrollProgress > 0.5 ? `0 1px 3px rgba(2,27,51,${scrollProgress * 0.06})` : 'none',
        borderBottom: `1px solid rgba(2,27,51,${scrollProgress * 0.06})`,
      }}
    >
      <Container>
        <nav className="flex h-[72px] items-center justify-between lg:h-[80px]" aria-label="Main navigation">
          {/* Logo */}
          <a href="#" className="relative z-10 flex items-center">
            <img
              src="/images/logo.png"
              alt="Farmzeo"
              className="h-9 w-auto transition-all duration-500"
              style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            <div className="relative flex items-center rounded-full bg-transparent p-1">
              {nav.links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative rounded-full px-5 py-2 text-[15px] font-medium transition-colors duration-200 ${
                      scrolled
                        ? isActive ? 'text-secondary-600' : 'text-gray-500 hover:text-primary-600'
                        : isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute inset-0 rounded-full ${scrolled ? 'bg-secondary-50' : 'bg-white/10'}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href={nav.cta.href}
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 ${
                scrolled
                  ? 'bg-accent text-dark shadow-sm hover:shadow-amber-glow hover:-translate-y-0.5'
                  : 'border border-white/30 text-white hover:bg-white/10 hover:border-white/50'
              }`}
            >
              <span className="relative z-10">{nav.cta.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              {scrolled && (
                <div
                  className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ backgroundSize: '200% 100%' }}
                />
              )}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden ${
              mobileOpen || !scrolled ? 'text-white' : 'text-primary-600'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 rounded-full bg-current"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block h-0.5 w-6 rounded-full bg-current"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 rounded-full bg-current"
            />
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#021B33] lg:hidden"
          >
            <img src="/images/logo.png" alt="Farmzeo" className="absolute left-6 top-5 h-9 brightness-0 invert" />

            <div className="flex flex-col items-center gap-6">
              {nav.links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl font-bold text-white hover:text-secondary-400 sm:text-3xl"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4"
              >
                <a
                  href={nav.cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-dark sm:px-8 sm:py-3.5 sm:text-lg"
                >
                  {nav.cta.label}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
