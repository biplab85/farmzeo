import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { faq } from '../content'

/* ─── floating "?" particles ─── */
const floatingMarks = [
  { x: '6%', y: '12%', size: 28, opacity: 0.08, dur: '22s', dx: 20, dy: -25, rotate: 15 },
  { x: '88%', y: '8%', size: 36, opacity: 0.06, dur: '28s', dx: -25, dy: 20, rotate: -20 },
  { x: '14%', y: '78%', size: 22, opacity: 0.1, dur: '24s', dx: 15, dy: -18, rotate: 10 },
  { x: '82%', y: '72%', size: 30, opacity: 0.07, dur: '26s', dx: -20, dy: -22, rotate: -15 },
  { x: '50%', y: '5%', size: 20, opacity: 0.08, dur: '30s', dx: 18, dy: 15, rotate: 25 },
  { x: '92%', y: '45%', size: 24, opacity: 0.06, dur: '32s', dx: -15, dy: 20, rotate: -12 },
  { x: '4%', y: '45%', size: 32, opacity: 0.06, dur: '27s', dx: 22, dy: -15, rotate: 18 },
  { x: '35%', y: '92%', size: 26, opacity: 0.08, dur: '25s', dx: -18, dy: -20, rotate: -22 },
]

/* ─── keyframes for floating marks ─── */
const floatCSS = floatingMarks.map((m, i) => `
  .faq-float-${i}{animation:faqF${i} ${m.dur} ease-in-out infinite}
  @keyframes faqF${i}{
    0%,100%{transform:translate(0,0) rotate(0deg)}
    25%{transform:translate(${m.dx * 0.6}px,${m.dy * 0.4}px) rotate(${m.rotate * 0.5}deg)}
    50%{transform:translate(${m.dx}px,${m.dy}px) rotate(${m.rotate}deg)}
    75%{transform:translate(${m.dx * 0.3}px,${m.dy * 0.7}px) rotate(${m.rotate * 0.3}deg)}
  }
`).join('')

/* ─── accordion item ─── */
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group"
    >
      <div
        className={`rounded-xl border transition-all duration-400 ${
          isOpen
            ? 'border-secondary/20 bg-white/[0.06] shadow-[0_4px_24px_rgba(13,153,132,0.1)] backdrop-blur-sm'
            : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05]'
        }`}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors sm:px-6 sm:py-5"
          aria-expanded={isOpen}
        >
          {/* "?" icon */}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-heading text-[15px] font-bold transition-all duration-300 ${
              isOpen
                ? 'bg-secondary text-white shadow-[0_2px_12px_rgba(13,153,132,0.3)]'
                : 'bg-white/[0.08] text-secondary-400 group-hover:bg-white/[0.12]'
            }`}
          >
            ?
          </span>

          <span
            className={`flex-1 pr-2 font-heading text-[16px] font-semibold transition-colors duration-300 sm:text-[17px] ${
              isOpen ? 'text-secondary-400' : 'text-white'
            }`}
          >
            {question}
          </span>

          {/* chevron */}
          <motion.span
            className="flex h-6 w-6 shrink-0 items-center justify-center"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-colors duration-300 ${isOpen ? 'text-secondary-400' : 'text-white/30'}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 pl-10 sm:px-6 sm:pb-6 sm:pl-[4.5rem]">
                <p className="text-[15px] leading-[1.8] text-white/50">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─── main FAQ component ─── */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  /* ── simple mouse-follow "?" cursor ── */
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mql = window.matchMedia('(pointer: fine)')
    if (!mql.matches) return

    section.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.06
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.06
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove])

  return (
    <section ref={sectionRef} id="faq" className="relative overflow-hidden py-20 md:py-28 lg:py-32" style={{ background: 'linear-gradient(160deg, #0B2A3F 0%, #0A1E30 35%, #081620 70%, #050E18 100%)' }}>
      <style>{floatCSS}</style>

      {/* ── soft radial accent ── */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,153,132,0.6) 0%, transparent 70%)' }}
      />

      {/* ── floating "?" marks ── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {floatingMarks.map((m, i) => (
          <div
            key={`qmark-${i}`}
            className={`absolute faq-float-${i}`}
            style={{ left: m.x, top: m.y }}
          >
            <span
              className="block font-heading font-bold text-secondary select-none"
              style={{ fontSize: m.size, opacity: m.opacity }}
            >
              ?
            </span>
          </div>
        ))}
      </div>

      {/* ── mouse-follow "?" cursor ── */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none hidden lg:flex items-center justify-center"
        style={{ willChange: 'transform', zIndex: 2 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-[0.15]">
          <circle cx="20" cy="20" r="18" stroke="rgba(13,153,132,0.5)" strokeWidth="1" fill="none" />
          <text
            x="20"
            y="26"
            textAnchor="middle"
            fill="rgba(13,153,132,0.6)"
            fontSize="20"
            fontWeight="700"
            fontFamily="Playfair Display, Georgia, serif"
          >
            ?
          </text>
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-16">
          {/* Left — heading + testimonial */}
          <div className="lg:w-[38%]">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <div className="h-[2px] w-8 bg-secondary-400" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary-400">{faq.label}</span>
              </div>
            </ScrollReveal>
            <SplitText as="h2" className="mt-4 font-heading text-[26px] font-bold text-white sm:text-[32px] md:text-[40px] lg:text-[48px] lg:leading-[56px]">
              {faq.headline}
            </SplitText>
            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-[16px] leading-[1.7] text-white/50">
                Can&apos;t find what you&apos;re looking for? Reach out to our support team.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-secondary/60 px-6 py-3 text-[15px] font-semibold text-secondary-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-white hover:border-secondary hover:shadow-teal-glow"
              >
                Contact Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </ScrollReveal>

            {/* Mini testimonial */}
            <ScrollReveal delay={0.5} className="mt-10">
              <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
                {/* Quote mark */}
                <svg className="absolute -top-2 left-4 text-secondary/20" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="mt-4 text-[15px] italic leading-[1.7] text-white/60">
                  &ldquo;Farmzeo changed how I manage my farm. Everything I need is in one place now.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-sm font-bold text-secondary-400">
                    RK
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">Raj Kumar</div>
                    <div className="text-[12px] text-white/40">Farmer, Maharashtra</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col gap-3 lg:w-[62%]">
            {faq.items.map((item, i) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
