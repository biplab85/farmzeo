import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import { footer } from '../content'

const socialIcons: Record<string, string> = {
  facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
  instagram: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z',
  linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z',
}

// Twinkling dots
function TwinklingDots() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {[
        { left: '10%', top: '15%', delay: 0, duration: 4 },
        { left: '85%', top: '25%', delay: 1.5, duration: 5 },
        { left: '45%', top: '10%', delay: 0.8, duration: 3.5 },
        { left: '70%', top: '70%', delay: 2, duration: 6 },
        { left: '25%', top: '80%', delay: 1, duration: 4.5 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{ left: dot.left, top: dot.top }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Back to top button
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-lg"
          aria-label="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function Footer() {
  return (
    <>
      <footer className="relative bg-[#021B33] pb-6 pt-12 sm:pb-8 md:pt-16 lg:pt-20">
        <TwinklingDots />

        <Container className="relative z-10">
          {/* Top section */}
          <div className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              <a href="#" className="group inline-block">
                <img
                  src="/images/logo.png"
                  alt={footer.logo}
                  className="h-10 w-auto brightness-0 invert transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(13,153,132,0.4)]"
                />
              </a>
              <p className="mt-4 max-w-xs text-[15px] leading-[1.7] text-gray-400">
                {footer.tagline}
              </p>

              {/* Social icons */}
              <div className="mt-6 flex gap-3">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    aria-label={platform}
                    className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-white hover:shadow-[0_4px_16px_rgba(13,153,132,0.25)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={socialIcons[platform] ?? ''} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link groups */}
            {footer.linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-[13px] font-semibold uppercase tracking-wider text-white/80">
                  {group.title}
                </h4>
                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group relative inline-block text-[15px] text-gray-500 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                        {/* Underline draw animation */}
                        <span className="absolute -bottom-0.5 left-0 h-[1px] w-full origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="mt-12 h-px bg-white/[0.08]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Bottom bar */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[13px] text-gray-600">{footer.copyright}</p>
            <div className="flex gap-6">
              {footer.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-gray-600 transition-colors duration-200 hover:text-gray-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Container>

        {/* Large Background Text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div
            className="font-heading text-[20vw] font-bold whitespace-nowrap leading-none -mb-[5vw] text-center"
            style={{
              WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
              color: 'transparent',
            }}
          >
            FARMZEO
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  )
}
