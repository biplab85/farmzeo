import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Container from '../components/Container'
import MeshGradient from '../components/MeshGradient'
import SplitText from '../components/SplitText'
import { hero } from '../content'

/* ───────────────────────────────────────────────────
   Premium SVG Cursor Follower — Hero section only
   Rotating dashed ring + glow
   Fixed position, visible only when mouse is in hero
   ─────────────────────────────────────────────────── */
const TRAIL_COUNT = 8

function HeroCursorFollower({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const ringRef = useRef<SVGGElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const trailRefs = useRef<(SVGCircleElement | null)[]>([])
  const wrapperRef = useRef<SVGSVGElement>(null)

  const pos = useRef({ x: -200, y: -200 })
  const smoothPos = useRef({ x: -200, y: -200 })
  const trailPositions = useRef<{ x: number; y: number; age: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200, age: 1 }))
  )
  const rotation = useRef(0)
  const insideHero = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        insideHero.current =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
      }
    }

    let raf: number
    let frame = 0

    const animate = () => {
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.12
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.12
      rotation.current += 0.6
      frame++

      const show = insideHero.current
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = show ? '1' : '0'
      }

      // Update ring
      if (ringRef.current) {
        ringRef.current.setAttribute(
          'transform',
          `translate(${smoothPos.current.x}, ${smoothPos.current.y}) rotate(${rotation.current})`
        )
      }

      // Update glow
      if (glowRef.current) {
        glowRef.current.setAttribute('cx', String(smoothPos.current.x))
        glowRef.current.setAttribute('cy', String(smoothPos.current.y))
      }

      // Shift trail: push new position, age existing ones
      if (frame % 3 === 0 && show) {
        trailPositions.current.pop()
        trailPositions.current.unshift({
          x: smoothPos.current.x,
          y: smoothPos.current.y,
          age: 0,
        })
      }
      for (const t of trailPositions.current) {
        t.age += 0.04
      }

      // Update trail circle elements via refs
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = trailRefs.current[i]
        const t = trailPositions.current[i]
        if (el && t) {
          const fade = Math.max(0, 1 - t.age)
          el.setAttribute('cx', String(t.x))
          el.setAttribute('cy', String(t.y))
          el.setAttribute('r', String(2 + fade * 5))
          el.setAttribute('opacity', String(fade * 0.35))
        }
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [sectionRef])

  return (
    <svg
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-[60] h-screen w-screen"
      style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="heroGlow">
          <stop offset="0%" stopColor="#0D9984" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#0D9984" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0D9984" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Trail circles — pre-rendered, updated via refs */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <circle
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          cx={-200}
          cy={-200}
          r={2}
          fill="#0D9984"
          opacity={0}
        />
      ))}

      {/* Rotating dashed ring */}
      <g ref={ringRef}>
        <circle r="20" fill="none" stroke="rgba(13,153,132,0.45)" strokeWidth="1.5" strokeDasharray="5 7" />
        <circle r="10" fill="none" stroke="rgba(13,153,132,0.2)" strokeWidth="0.8" strokeDasharray="3 5" />
        <circle r="2.5" fill="#0D9984" opacity="0.7" />
      </g>

      {/* Glow */}
      <circle ref={glowRef} cx={-200} cy={-200} r="60" fill="url(#heroGlow)" />
    </svg>
  )
}

/* ───────────────────────────────────────────────────
   Laptop Mockup — hero.jpg ON TOP of laptop frame
   ─────────────────────────────────────────────────── */
function LaptopMockup() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const onMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = ((e.clientY - centerY) / (rect.height / 2)) * -3
      const y = ((e.clientX - centerX) / (rect.width / 2)) * 3
      setTilt({ x, y })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="animate-float relative"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      <div className="relative">
        {/* Laptop frame (behind) */}
        <img
          src="/images/laptop-mocup.png"
          alt=""
          aria-hidden="true"
          className="relative w-full drop-shadow-[0_20px_60px_rgba(2,80,128,0.35)]"
        />

        {/* hero.jpg ON TOP — positioned exactly on the screen area */}
        {/* Laptop is 800x513. Screen: top≈3.5%, left≈11.8%, w≈76.5%, h≈65.5% */}
        <img
          src="/images/hero.jpg"
          alt="Farmzeo Dashboard — Field management with weather, notes, and map view"
          className="absolute object-cover object-left-top"
          style={{
            top: '3.5%',
            left: '11.8%',
            width: '76.5%',
            height: '65.5%',
            borderRadius: '3px 3px 0 0',
          }}
        />
      </div>

      {/* Edge glows */}
      <div className="absolute -left-2 top-[15%] h-[60%] w-1.5 rounded-full bg-secondary-400/20 blur-md" />
      <div className="absolute -right-2 top-[20%] h-[50%] w-1 rounded-full bg-accent/15 blur-md" />
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Hero Section
   ─────────────────────────────────────────────────── */
const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <MeshGradient />

      {/* Premium cursor follower — hero only */}
      <HeroCursorFollower sectionRef={sectionRef} />

      <div className="relative z-10 pt-32 pb-0 lg:pt-40 lg:pb-0">
        <Container>
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              {/* Label with animated line */}
              <motion.div {...fadeUp(0)} className="inline-flex items-center gap-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] w-8 origin-left bg-secondary-400"
                />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary-400">
                  {hero.label}
                </span>
              </motion.div>

              {/* Headline */}
              <div className="mt-6">
                <SplitText
                  as="h1"
                  className="font-heading text-[40px] font-extrabold leading-[1.1] text-white md:text-[52px] lg:text-[68px] lg:tracking-[-1.5px]"
                >
                  Harvest Smarter, Sell Faster.
                </SplitText>
              </div>

              <motion.p
                {...fadeUp(3)}
                className="mt-6 max-w-lg text-[17px] leading-[1.75] text-white/50 lg:text-[19px]"
              >
                {hero.subheadline}
              </motion.p>

              {/* CTAs */}
              <motion.div {...fadeUp(4)} className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href={hero.primaryCta.href}
                  className="group relative overflow-hidden rounded-full bg-accent px-8 py-4 text-[16px] font-semibold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow"
                >
                  <span className="relative z-10">{hero.primaryCta.label}</span>
                  <div
                    className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    style={{ backgroundSize: '200% 100%' }}
                  />
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="group flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><path d="M0 0l10 6-10 6z" /></svg>
                  </span>
                  {hero.secondaryCta.label}
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div {...fadeUp(5)} className="mt-8 flex flex-col items-center gap-6 sm:flex-row lg:justify-start">
                {hero.socialProof.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    {i > 0 && <div className="hidden h-4 w-px bg-white/15 sm:block" />}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-400">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px] text-white/40">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Laptop Mockup */}
            <div className="flex-1">
              <LaptopMockup />
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
