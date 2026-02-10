import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect, useState } from 'react'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { opportunity } from '../content'

/* ───────────────────────────────────────────────────
   SVG Mini Icons (32x32) for stat cards
   ─────────────────────────────────────────────────── */

function GrowthIcon({ animate, hovered }: { animate: boolean; hovered: boolean }) {
  const draw = animate ? 1 : 0
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <motion.rect x="4" y="20" width="6" height="8" rx="1.5"
        stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
        initial={{ pathLength: 0, height: 0, y: 28 }}
        animate={{ pathLength: draw, height: animate ? 8 : 0, y: animate ? 20 : 28 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.rect x="13" y="14" width="6" height="14" rx="1.5"
        stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
        initial={{ pathLength: 0, height: 0, y: 28 }}
        animate={{
          pathLength: draw, height: animate ? 14 : 0, y: animate ? 14 : 28,
          ...(hovered ? { height: [14, 16, 14], y: [14, 12, 14] } : {}),
        }}
        transition={{ duration: 0.4, delay: 0.35 }}
      />
      <motion.rect x="22" y="6" width="6" height="22" rx="1.5"
        stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
        initial={{ pathLength: 0, height: 0, y: 28 }}
        animate={{
          pathLength: draw, height: animate ? 22 : 0, y: animate ? 6 : 28,
          ...(hovered ? { height: [22, 24, 22], y: [6, 4, 6] } : {}),
        }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.path d="M7 18l9-8 9 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw }}
        transition={{ duration: 0.5, delay: 0.6 }} />
    </svg>
  )
}

function EfficiencyIcon({ animate, hovered }: { animate: boolean; hovered: boolean }) {
  const draw = animate ? 1 : 0
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <motion.circle cx="16" cy="16" r="11" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, rotate: hovered ? 30 : 0 }}
        transition={{ duration: 0.6 }} style={{ transformOrigin: '16px 16px' }} />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.line key={i}
          x1={16 + 11 * Math.cos((angle * Math.PI) / 180)}
          y1={16 + 11 * Math.sin((angle * Math.PI) / 180)}
          x2={16 + 13.5 * Math.cos((angle * Math.PI) / 180)}
          y2={16 + 13.5 * Math.sin((angle * Math.PI) / 180)}
          stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: draw, rotate: hovered ? 30 : 0 }}
          transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
          style={{ transformOrigin: '16px 16px' }}
        />
      ))}
      <motion.path d="M11 16l3 3 7-7" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw }}
        transition={{ duration: 0.3, delay: 0.7 }} />
    </svg>
  )
}

function RocketIcon({ animate, hovered }: { animate: boolean; hovered: boolean }) {
  const draw = animate ? 1 : 0
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <motion.path
        d="M16 4c0 0-8 6-8 16h16c0-10-8-16-8-16z"
        stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw, y: hovered ? -3 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle cx="16" cy="14" r="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, y: hovered ? -3 : 0 }}
        transition={{ duration: 0.3, delay: 0.4 }} />
      <motion.line x1="12" y1="22" x2="12" y2="26" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 0.6, 0], y: [0, 4] } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.6, repeat: Infinity, repeatDelay: 0.4 }} />
      <motion.line x1="16" y1="22" x2="16" y2="28" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 0.7, 0], y: [0, 5] } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.7, repeat: Infinity, repeatDelay: 0.3 }} />
      <motion.line x1="20" y1="22" x2="20" y2="26" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0, 0.6, 0], y: [0, 4] } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8, repeat: Infinity, repeatDelay: 0.5 }} />
    </svg>
  )
}

const statIcons: Record<string, React.FC<{ animate: boolean; hovered: boolean }>> = {
  growth: GrowthIcon,
  efficiency: EfficiencyIcon,
  rocket: RocketIcon,
}

/* ───────────────────────────────────────────────────
   Progress Arc SVG
   ─────────────────────────────────────────────────── */
const ARC_RADIUS = 52
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS

function ProgressArc({ percent, inView, delay, hovered }: { percent: number; inView: boolean; delay: number; hovered: boolean }) {
  const target = ARC_CIRCUMFERENCE * (1 - percent / 100)
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="block">
      <defs>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9984" />
          <stop offset="100%" stopColor="#00C9A7" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r={ARC_RADIUS} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <motion.circle cx="60" cy="60" r={ARC_RADIUS} fill="none"
        stroke="url(#arcGradient)" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={ARC_CIRCUMFERENCE}
        initial={{ strokeDashoffset: ARC_CIRCUMFERENCE }}
        animate={inView ? { strokeDashoffset: target } : {}}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '60px 60px',
          filter: hovered ? 'drop-shadow(0 0 6px rgba(13,153,132,0.3))' : 'none',
          transition: 'filter 0.3s ease',
        }}
      />
    </svg>
  )
}

/* ───────────────────────────────────────────────────
   Constellation Network Background
   Deep emerald gradient with floating geometric shapes
   (diamonds, hexagons, squares) + faint grid overlay.
   Completely different from navy MeshGradient used elsewhere.
   ─────────────────────────────────────────────────── */
const SHAPE_COUNT = 24

const shapes = Array.from({ length: SHAPE_COUNT }, (_, i) => ({
  x: 3 + Math.random() * 94,
  y: 3 + Math.random() * 94,
  size: 3 + Math.random() * 5,
  kind: i % 3 as 0 | 1 | 2, // diamond, hexagon, square
  opacity: 0.04 + Math.random() * 0.08,
  speed: 18 + Math.random() * 22,
  delay: Math.random() * -20,
  anim: i % 4,
}))

function ConstellationBg({ inView }: { inView: boolean }) {
  const [prefersReduced, setPrefersReduced] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setIsMobile(window.innerWidth < 768)
  }, [])
  const canAnimate = !prefersReduced && inView
  const visible = isMobile ? shapes.slice(0, 12) : shapes

  return (
    <motion.div className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 2 }}>

      {/* Faint grid overlay */}
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[150, 300, 450, 600, 750].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="1440" y2={y}
            stroke="rgba(16,185,129,0.025)" strokeWidth="0.5" />
        ))}
        {[240, 480, 720, 960, 1200].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="900"
            stroke="rgba(16,185,129,0.025)" strokeWidth="0.5" />
        ))}
        <line x1="0" y1="0" x2="1440" y2="900" stroke="rgba(16,185,129,0.015)" strokeWidth="0.5" />
        <line x1="1440" y1="0" x2="0" y2="900" stroke="rgba(16,185,129,0.015)" strokeWidth="0.5" />
      </svg>

      {/* Floating geometric shapes */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full" aria-hidden="true">
        {visible.map((s, i) => {
          const style = canAnimate
            ? { animation: `oppDrift${s.anim} ${s.speed}s ease-in-out ${s.delay}s infinite` }
            : undefined

          if (s.kind === 0) {
            const h = s.size * 0.12
            const w = s.size * 0.08
            return (
              <polygon key={i}
                points={`${s.x},${s.y - h} ${s.x + w},${s.y} ${s.x},${s.y + h} ${s.x - w},${s.y}`}
                fill={`rgba(16,185,129,${s.opacity})`}
                stroke={`rgba(16,185,129,${s.opacity * 0.5})`}
                strokeWidth="0.04"
                style={style}
              />
            )
          }
          if (s.kind === 1) {
            const r = s.size * 0.08
            const pts = Array.from({ length: 6 }, (_, j) => {
              const a = (Math.PI / 3) * j - Math.PI / 2
              return `${s.x + r * Math.cos(a)},${s.y + r * Math.sin(a)}`
            }).join(' ')
            return (
              <polygon key={i} points={pts}
                fill={`rgba(16,185,129,${s.opacity * 0.6})`}
                stroke={`rgba(16,185,129,${s.opacity})`}
                strokeWidth="0.04"
                style={style}
              />
            )
          }
          const half = s.size * 0.06
          return (
            <rect key={i}
              x={s.x - half} y={s.y - half}
              width={half * 2} height={half * 2}
              fill={`rgba(16,185,129,${s.opacity * 0.5})`}
              stroke={`rgba(16,185,129,${s.opacity})`}
              strokeWidth="0.03"
              transform={`rotate(45, ${s.x}, ${s.y})`}
              style={style}
            />
          )
        })}
      </svg>

      {/* Grain texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
        <filter id="oppGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#oppGrain)" />
      </svg>

      <style>{`
        @keyframes oppDrift0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(12px, -8px) rotate(3deg); }
        }
        @keyframes oppDrift1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, 6px) rotate(-2deg); }
        }
        @keyframes oppDrift2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(6px, 10px) rotate(4deg); }
        }
        @keyframes oppDrift3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, -12px) rotate(-3deg); }
        }
      `}</style>
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Emerald Glow Orbs (green tones, not teal/navy)
   ─────────────────────────────────────────────────── */
function EmeraldOrbs({ inView }: { inView: boolean }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => { setIsMobile(window.innerWidth < 768) }, [])

  return (
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }} aria-hidden="true">
      <motion.div className="absolute"
        style={{
          left: '5%', top: '10%',
          width: isMobile ? 200 : 450, height: isMobile ? 200 : 450,
          background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)',
          filter: `blur(${isMobile ? 60 : 130}px)`,
        }}
        animate={!isMobile ? { x: [0, 25, -15, 0], y: [0, -20, 15, 0] } : {}}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute"
        style={{
          right: '8%', bottom: '15%',
          width: isMobile ? 160 : 350, height: isMobile ? 160 : 350,
          background: 'radial-gradient(circle, rgba(245,166,35,0.05), transparent 70%)',
          filter: `blur(${isMobile ? 50 : 110}px)`,
        }}
        animate={!isMobile ? { x: [0, -18, 14, 0], y: [0, 14, -10, 0] } : {}}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute"
        style={{
          left: '45%', top: '50%',
          width: isMobile ? 150 : 300, height: isMobile ? 150 : 300,
          background: 'radial-gradient(circle, rgba(6,78,59,0.15), transparent 70%)',
          filter: `blur(${isMobile ? 40 : 100}px)`,
        }}
        animate={!isMobile ? { x: [0, -10, 20, 0], y: [0, 10, -8, 0] } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}


/* ───────────────────────────────────────────────────
   Stat Card
   ─────────────────────────────────────────────────── */
const arcPercents = [40, 75, 100]

function StatCard({
  stat, index, inView,
}: {
  stat: { value: string; label: string; icon: string }
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const isRange = /\d+\s*[-–]\s*\d+/.test(stat.value)
  const [display, setDisplay] = useState(isRange ? stat.value : '0')
  const rafRef = useRef(0)
  const animated = useRef(false)

  useEffect(() => {
    if (!inView || animated.current || isRange) return
    animated.current = true
    const numMatch = stat.value.match(/(\d+)/)
    if (!numMatch) { setDisplay(stat.value); return }
    const matched = numMatch[1] ?? ''
    const target = parseInt(matched, 10)
    const prefix = stat.value.substring(0, stat.value.indexOf(matched))
    const suffix = stat.value.substring(stat.value.indexOf(matched) + matched.length)
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / 2000, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(`${prefix}${Math.min(Math.round(eased * target), target)}${suffix}`)
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, stat.value, isRange])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const IconComp = statIcons[stat.icon]
  const arcPct = arcPercents[index] ?? 50

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5 text-center backdrop-blur-[12px] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-emerald-400/20 hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_0_1px_rgba(16,185,129,0.1)] sm:p-7 md:p-10"
    >
      <div className="relative">
        <ProgressArc percent={arcPct} inView={inView} delay={1.0 + index * 0.2} hovered={hovered} />
        <div className="absolute inset-0 flex items-center justify-center">
          {IconComp && <IconComp animate={inView} hovered={hovered} />}
        </div>
      </div>

      <div className="mt-5 font-heading text-[36px] font-extrabold text-white sm:text-[40px] md:text-[48px]"
        style={{ textShadow: '0 0 24px rgba(16,185,129,0.2)' }}>
        {display}
      </div>

      <p className="mt-2 max-w-[200px] text-[13px] font-medium leading-[1.6] text-white/50 md:text-[14px]">
        {stat.label}
      </p>
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Opportunity Section
   Background: deep emerald → dark (unique, not navy)
   ─────────────────────────────────────────────────── */
export default function Opportunity() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #064E3B 0%, #0D2818 35%, #0B1120 70%, #080D14 100%)' }}
    >

      <ConstellationBg inView={inView} />
      <EmeraldOrbs inView={inView} />

      <div ref={ref} className="relative z-10 pb-16 pt-20 md:pb-28 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          {/* Header */}
          <div className="text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] w-10 origin-right bg-emerald-400" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-emerald-400">
                  {opportunity.label}
                </span>
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] w-10 origin-left bg-emerald-400" />
              </div>
            </ScrollReveal>

            <SplitText as="h2"
              className="mx-auto mt-5 max-w-3xl font-heading text-[30px] font-bold leading-[1.15] text-white md:text-[38px] lg:text-[44px] lg:tracking-[-0.5px]">
              {opportunity.headline}
            </SplitText>

            <ScrollReveal delay={0.3}>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/50 md:text-[17px]">
                {opportunity.subheadline}
              </p>
            </ScrollReveal>
          </div>

          {/* Stat Cards */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3 lg:mt-16">
            {opportunity.stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.6} className="mt-12 text-center lg:mt-14">
            <a href={opportunity.cta.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-6 py-3 text-[15px] font-semibold text-white sm:px-8 sm:py-4 sm:text-[16px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)]">
              <span className="relative z-10">{opportunity.cta.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ backgroundSize: '200% 100%' }} />
            </a>
          </ScrollReveal>
        </Container>

      </div>
    </section>
  )
}
