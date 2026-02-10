import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { iconMap } from '../components/Icons'
import { benefits } from '../content'

// ─── Constants ──────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const
const ghostNumbers = ['01', '02', '03', '04']

const SHAPE_COUNT = 18
const shapes = Array.from({ length: SHAPE_COUNT }, (_, i) => ({
  x: 3 + Math.random() * 94,
  y: 3 + Math.random() * 94,
  size: 3 + Math.random() * 5,
  kind: (i % 3) as 0 | 1 | 2,
  opacity: 0.03 + Math.random() * 0.06,
  speed: 20 + Math.random() * 20,
  delay: Math.random() * -18,
  anim: i % 4,
}))

// ─── Constellation Background ───────────────────────────────

function ConstellationBg({ inView }: { inView: boolean }) {
  const [prefersReduced, setPrefersReduced] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setIsMobile(window.innerWidth < 768)
  }, [])
  const canAnimate = !prefersReduced && inView
  const visible = isMobile ? shapes.slice(0, 10) : shapes

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 2 }}
    >
      {/* Faint grid */}
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[180, 360, 540, 720].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="1440" y2={y} stroke="rgba(13,153,132,0.02)" strokeWidth="0.5" />
        ))}
        {[288, 576, 864, 1152].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="900" stroke="rgba(13,153,132,0.02)" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Floating geometric shapes */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full" aria-hidden="true">
        {visible.map((s, i) => {
          const style = canAnimate
            ? { animation: `benDrift${s.anim} ${s.speed}s ease-in-out ${s.delay}s infinite` }
            : undefined
          if (s.kind === 0) {
            const h = s.size * 0.12
            const w = s.size * 0.08
            return (
              <polygon key={i}
                points={`${s.x},${s.y - h} ${s.x + w},${s.y} ${s.x},${s.y + h} ${s.x - w},${s.y}`}
                fill={`rgba(13,153,132,${s.opacity})`} stroke={`rgba(13,153,132,${s.opacity * 0.5})`}
                strokeWidth="0.04" style={style} />
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
                fill={`rgba(13,153,132,${s.opacity * 0.6})`} stroke={`rgba(13,153,132,${s.opacity})`}
                strokeWidth="0.04" style={style} />
            )
          }
          const half = s.size * 0.06
          return (
            <rect key={i} x={s.x - half} y={s.y - half} width={half * 2} height={half * 2}
              fill={`rgba(13,153,132,${s.opacity * 0.5})`} stroke={`rgba(13,153,132,${s.opacity})`}
              strokeWidth="0.03" transform={`rotate(45, ${s.x}, ${s.y})`} style={style} />
          )
        })}
      </svg>

      {/* Grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.02]" aria-hidden="true">
        <filter id="benGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#benGrain)" />
      </svg>
    </motion.div>
  )
}

// ─── Floating Orbs ──────────────────────────────────────────

function TealOrbs({ inView }: { inView: boolean }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => { setIsMobile(window.innerWidth < 768) }, [])

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5 }}
      aria-hidden="true"
    >
      <motion.div className="absolute"
        style={{
          left: '5%', top: '8%',
          width: isMobile ? 180 : 420, height: isMobile ? 180 : 420,
          background: 'radial-gradient(circle, rgba(13,153,132,0.08), transparent 70%)',
          filter: `blur(${isMobile ? 50 : 120}px)`,
        }}
        animate={!isMobile ? { x: [0, 20, -12, 0], y: [0, -18, 12, 0] } : {}}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute"
        style={{
          right: '6%', bottom: '12%',
          width: isMobile ? 140 : 320, height: isMobile ? 140 : 320,
          background: 'radial-gradient(circle, rgba(245,166,35,0.04), transparent 70%)',
          filter: `blur(${isMobile ? 40 : 100}px)`,
        }}
        animate={!isMobile ? { x: [0, -15, 10, 0], y: [0, 12, -8, 0] } : {}}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute"
        style={{
          left: '40%', top: '55%',
          width: isMobile ? 120 : 280, height: isMobile ? 120 : 280,
          background: 'radial-gradient(circle, rgba(2,80,128,0.06), transparent 70%)',
          filter: `blur(${isMobile ? 35 : 90}px)`,
        }}
        animate={!isMobile ? { x: [0, -8, 16, 0], y: [0, 8, -6, 0] } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

// ─── Benefit Card (glassmorphic dark variant) ───────────────

function BenefitCard({ item, index }: { item: typeof benefits.items[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = iconMap[item.icon]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--card-glow-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--card-glow-y', `${e.clientY - rect.top}px`)
    cardRef.current.style.setProperty('--card-glow-opacity', '1')
  }

  const handleMouseLeave = () => {
    cardRef.current?.style.setProperty('--card-glow-opacity', '0')
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-[12px] transition-all duration-500 hover:-translate-y-2 hover:border-secondary/20 hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(13,153,132,0.1)] sm:p-8 md:p-10"
    >
      {/* Cursor-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle 200px at var(--card-glow-x, 50%) var(--card-glow-y, 50%), rgba(13,153,132,0.1), transparent 60%)',
          opacity: 'var(--card-glow-opacity, 0)',
        }}
      />

      {/* Ghost number */}
      <span className="absolute right-4 top-2 select-none font-heading text-[64px] font-extrabold leading-none text-white/[0.04]">
        {ghostNumbers[index]}
      </span>

      {/* Hover border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-secondary/20" />

      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.08] text-secondary-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/[0.12]">
          {Icon && <Icon size={28} />}
        </div>
        <h3 className="mt-6 font-heading text-[18px] font-semibold text-white">
          {item.title}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.7] text-white/50">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main Component ─────────────────────────────────────────

export default function Benefits() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <>
      <style>{`
        @keyframes benDrift0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -7px) rotate(3deg); }
        }
        @keyframes benDrift1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, 5px) rotate(-2deg); }
        }
        @keyframes benDrift2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(5px, 9px) rotate(4deg); }
        }
        @keyframes benDrift3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-7px, -10px) rotate(-3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ben-animate * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        ref={ref}
        id="features"
        className="ben-animate relative overflow-hidden py-20 md:py-28 lg:py-32"
        style={{
          background: 'linear-gradient(160deg, #0B2A3F 0%, #0A1E30 35%, #081620 70%, #050E18 100%)',
        }}
      >
        <ConstellationBg inView={inView} />
        <TealOrbs inView={inView} />

        <Container className="relative z-10">
          {/* Header */}
          <div className="text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="h-[2px] w-10 origin-right bg-secondary-400"
                />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary-400">
                  {benefits.label}
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                  className="h-[2px] w-10 origin-left bg-secondary-400"
                />
              </div>
            </ScrollReveal>

            <SplitText
              as="h2"
              className="mx-auto mt-5 max-w-3xl font-heading text-[32px] font-bold leading-[1.15] text-white sm:text-[36px] md:text-[40px] lg:text-[48px] lg:tracking-[-0.5px]"
            >
              {benefits.headline}
            </SplitText>
          </div>

          {/* Cards grid */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:gap-6 sm:grid-cols-2 lg:mt-16">
            {benefits.items.map((item, i) => (
              <BenefitCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
