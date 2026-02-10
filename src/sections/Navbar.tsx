import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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

      const sections = ['problem', 'solution', 'product-tour', 'features', 'about', 'faq']
      let found = ''
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i]!
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          found = id
          break
        }
      }
      setActiveSection(found)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
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
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 lg:hidden"
              style={{
                background: mobileOpen ? 'transparent' : scrolled ? 'rgba(27,50,82,0.05)' : 'rgba(255,255,255,0.05)',
                border: mobileOpen ? '1px solid transparent' : scrolled ? '1px solid rgba(27,50,82,0.08)' : '1px solid rgba(255,255,255,0.08)',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative h-6 w-6">
                <span
                  className="absolute left-0 top-1 h-0.5 w-6 rounded-full transition-all duration-300"
                  style={{
                    background: mobileOpen ? '#00A896' : scrolled ? '#1B3252' : 'rgba(255,255,255,0.8)',
                    transform: mobileOpen ? 'rotate(45deg) translateX(3.5px) translateY(3.5px)' : 'none',
                  }}
                />
                <span
                  className="absolute left-0 top-[11px] h-0.5 w-6 rounded-full transition-all duration-300"
                  style={{
                    background: scrolled ? '#1B3252' : 'rgba(255,255,255,0.8)',
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
                  }}
                />
                <span
                  className="absolute bottom-1 left-0 h-0.5 w-6 rounded-full transition-all duration-300"
                  style={{
                    background: mobileOpen ? '#F5A623' : scrolled ? '#1B3252' : 'rgba(255,255,255,0.8)',
                    transform: mobileOpen ? 'rotate(-45deg) translateX(3.5px) translateY(-3.5px)' : 'none',
                  }}
                />
              </div>
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile menu - outside header to avoid backdrop-filter containing block */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in panel */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col shadow-2xl transition-transform duration-500 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(180deg, #0F2137 0%, #0A1A2E 40%, #071525 100%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Left edge accent line */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-px"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,168,150,0.3) 30%, rgba(245,166,35,0.2) 60%, transparent 100%)',
            }}
          />

          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <img src="/images/logo.png" alt="Farmzeo" className="h-8 brightness-0 invert" />
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 active:scale-90"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.04) 100%)',
                border: '1px solid rgba(239,68,68,0.15)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(239,68,68,0.75)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-6 mt-3 mb-2 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Nav links */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-4">
            {nav.links.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="group relative flex items-center justify-between overflow-hidden rounded-xl p-4 transition-all duration-300"
                  style={{
                    background: isActive ? 'rgba(0,168,150,0.1)' : 'rgba(255,255,255,0.02)',
                    border: isActive ? '1px solid rgba(0,168,150,0.2)' : '1px solid transparent',
                    transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : '0ms',
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(30px)',
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, #00A896, #F5A623)',
                      }}
                    />
                  )}
                  <span
                    className="text-base font-semibold tracking-wide transition-all duration-300"
                    style={{
                      color: isActive ? '#5EEAD4' : 'rgba(255,255,255,0.6)',
                      paddingLeft: isActive ? '8px' : '0',
                    }}
                  >
                    {link.label}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                    style={{
                      color: isActive ? '#00A896' : 'rgba(255,255,255,0.2)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                    }}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              )
            })}
          </nav>

          {/* CTA button */}
          <div
            className="px-6 pb-8 pt-2 transition-all duration-500"
            style={{
              transitionDelay: mobileOpen ? '350ms' : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            <a
              href={nav.cta.href}
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-dark transition-all duration-300 active:scale-[0.98]"
            >
              {nav.cta.label}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}
