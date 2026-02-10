import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect, useState, useCallback } from 'react'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { problem } from '../content'

/* ───────────────────────────────────────────────────
   Animated SVG Icons — 72×72
   ─────────────────────────────────────────────────── */

function ScatteredIcon({ animate, hovered }: { animate: boolean; hovered: boolean }) {
  const draw = animate ? 1 : 0
  const spread = hovered ? 12 : animate ? 8 : 0
  const dur = 0.6
  const spring = { type: 'spring' as const, stiffness: 200, damping: 20 }
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.path d="M26 26L46 26M26 26L26 46M46 26L46 46M26 46L46 46"
        stroke={hovered ? 'rgba(239,68,68,0.3)' : 'rgba(13,153,132,0.15)'} strokeWidth="1"
        strokeDasharray={hovered ? '3 8' : '3 5'} initial={{ pathLength: 0 }}
        animate={{ pathLength: draw, opacity: animate ? 0.4 : 0 }} transition={{ duration: 0.8 }} />
      <motion.rect x="14" y="14" width="16" height="20" rx="3" stroke="#0D9984" strokeWidth="1.5" fill="rgba(13,153,132,0.04)"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, x: 14 - spread * 0.7, y: 14 - spread * 0.7, rotate: hovered ? -5 : animate ? -3 : 0 }}
        transition={{ duration: dur, ...spring }} />
      <motion.path d="M18 20h8M18 24h5" stroke="#0D9984" strokeWidth="1" opacity={0.4}
        animate={{ x: -spread * 0.7, y: -spread * 0.7 }} transition={spring} />
      <motion.rect x="42" y="14" width="16" height="20" rx="3" stroke="#0D9984" strokeWidth="1.5" fill="rgba(13,153,132,0.04)"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, x: 42 + spread * 0.7, y: 14 - spread * 0.7, rotate: hovered ? 4 : animate ? 2 : 0 }}
        transition={{ duration: dur, delay: 0.1, ...spring }} />
      <motion.path d="M46 20h8M46 24h5" stroke="#0D9984" strokeWidth="1" opacity={0.4}
        animate={{ x: spread * 0.7, y: -spread * 0.7 }} transition={spring} />
      <motion.rect x="14" y="38" width="16" height="20" rx="3" stroke="#0D9984" strokeWidth="1.5" fill="rgba(13,153,132,0.04)"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, x: 14 - spread * 0.7, y: 38 + spread * 0.7, rotate: hovered ? 3 : animate ? 1 : 0 }}
        transition={{ duration: dur, delay: 0.2, ...spring }} />
      <motion.path d="M18 44h8M18 48h5" stroke="#0D9984" strokeWidth="1" opacity={0.4}
        animate={{ x: -spread * 0.7, y: spread * 0.7 }} transition={spring} />
      <motion.rect x="42" y="38" width="16" height="20" rx="3" stroke="#0D9984" strokeWidth="1.5" fill="rgba(13,153,132,0.04)"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, x: 42 + spread * 0.7, y: 38 + spread * 0.7, rotate: hovered ? [0, 3, -3, 2, 0] : animate ? -2 : 0 }}
        transition={{ duration: hovered ? 0.4 : dur, delay: 0.3, ...spring }} />
      <motion.path d="M46 44h8M46 48h5" stroke="#0D9984" strokeWidth="1" opacity={0.4}
        animate={{ x: spread * 0.7, y: spread * 0.7 }} transition={spring} />
    </svg>
  )
}

function MoneyIcon({ animate, hovered }: { animate: boolean; hovered: boolean }) {
  const draw = animate ? 1 : 0
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {hovered && (
        <motion.circle cx="36" cy="36" r="24" fill="rgba(239,68,68,0.05)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
      )}
      <motion.circle cx="36" cy="36" r="22" stroke="#0D9984" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, scale: hovered ? 0.95 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: '36px 36px' }} />
      <motion.circle cx="36" cy="36" r="18" stroke="#0D9984" strokeWidth="0.8" opacity={0.3}
        initial={{ pathLength: 0 }} animate={{ pathLength: draw }} transition={{ duration: 0.6, delay: 0.3 }} />
      <motion.path d="M36 22v4M36 46v4M42 30c-1-3-3-4-6-4s-5 1.5-5 4 2.5 3.5 6 4.5 6 2 6 4.5-2.5 4-6 4-5-1.5-6-4"
        stroke="#0D9984" strokeWidth="1.8" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: draw }} transition={{ duration: 0.4, delay: 0.6 }} />
      {[
        { d: 'M14 36L8 36M11 33l-3 3 3 3', delay: 0.8 },
        { d: 'M36 14L36 8M33 11l3-3 3 3', delay: 1.0 },
        { d: 'M58 36L64 36M61 33l3 3-3 3', delay: 1.2 },
      ].map((arrow, i) => (
        <motion.path key={i} d={arrow.d} stroke="#0D9984" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: draw, pathLength: draw, ...(hovered ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}) }}
          transition={{ duration: 0.4, delay: arrow.delay }} />
      ))}
      {hovered && (
        <motion.text x="52" y="20" fill="rgba(239,68,68,0.6)" fontSize="11" fontWeight="700"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: [0, 1, 0], y: [24, 14] }}
          transition={{ duration: 1.2, ease: 'easeOut' }}>-$</motion.text>
      )}
    </svg>
  )
}

function BlindIcon({ animate, hovered }: { animate: boolean; hovered: boolean }) {
  const draw = animate ? 1 : 0
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.path d="M12 50L24 42L36 46L48 34L60 38" stroke="rgba(13,153,132,0.2)" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: draw, d: hovered ? 'M12 48L24 48L36 48L48 48L60 48' : 'M12 50L24 42L36 46L48 34L60 38' }}
        transition={{ duration: 0.6, delay: 0.2 }} />
      <motion.path d="M8 36s8-16 28-16 28 16 28 16-8 16-28 16S8 36 8 36z" stroke="#0D9984" strokeWidth="1.5" fill="rgba(13,153,132,0.03)"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
      <motion.circle cx="36" cy="36" r="8" stroke="#0D9984" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw }} transition={{ duration: 0.5, delay: 0.4 }} />
      <motion.circle cx="36" cy="36" fill="#0D9984"
        initial={{ r: 0 }} animate={{ r: hovered ? 4.5 : animate ? 3.5 : 0 }} transition={{ duration: 0.3, delay: 0.6 }} />
      {hovered && (
        <motion.path d="M8 36s8-16 28-16 28 16 28 16" stroke="#0D9984" strokeWidth="2" fill="rgba(255,255,255,0.9)"
          initial={{ d: 'M8 36s8-16 28-16 28 16 28 16' }} animate={{ d: 'M8 36s8-4 28-4 28 4 28 4' }}
          transition={{ duration: 0.4 }} />
      )}
      <motion.path d="M14 54L58 18" stroke="rgba(239,68,68,0.4)" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: draw, opacity: hovered ? [1, 0.4, 1] : 1 }}
        transition={{ duration: 0.4, delay: 0.9 }} />
    </svg>
  )
}

function WeatherIcon({ animate, hovered }: { animate: boolean; hovered: boolean }) {
  const draw = animate ? 1 : 0
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.circle cx="54" cy="20" r="8" stroke="#F5A623" strokeWidth="1.5" fill="rgba(245,166,35,0.08)"
        initial={{ opacity: 0 }} animate={{ opacity: hovered ? 0.1 : animate ? 0.2 : 0 }} transition={{ duration: 0.8, delay: 0.5 }} />
      <motion.path d="M54 10v3M62 14l-2 2M66 22h-3M62 30l-2-2" stroke="#F5A623" strokeWidth="1" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: hovered ? 0.1 : animate ? 0.2 : 0 }} transition={{ duration: 0.5, delay: 0.7 }} />
      <motion.path d="M20 48a12 12 0 01-2-24 16 16 0 0128 6 10 10 0 01-2 18H20z" stroke="#0D9984" strokeWidth="1.5"
        fill={hovered ? 'rgba(13,153,132,0.08)' : 'rgba(13,153,132,0.03)'}
        initial={{ pathLength: 0 }} animate={{ pathLength: draw }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
      {[{ x1: 22, delay: 0 }, { x1: 32, delay: 0.15 }, { x1: 42, delay: 0.3 }].map((drop, i) => (
        <motion.line key={i} x1={drop.x1} y1="52" x2={drop.x1} y2="58" stroke="#0D9984" strokeWidth="1.5" strokeLinecap="round"
          initial={{ opacity: 0, y: -4 }}
          animate={animate ? { opacity: [0, 0.7, 0], y: [-4, 8] } : { opacity: 0 }}
          transition={{ duration: hovered ? 0.5 : 0.8, delay: 0.8 + drop.delay, repeat: Infinity, repeatDelay: hovered ? 0.2 : 0.5 }} />
      ))}
      {hovered && [27, 37].map((x, i) => (
        <motion.line key={`extra-${i}`} x1={x} y1="52" x2={x} y2="57" stroke="#0D9984" strokeWidth="1" strokeLinecap="round"
          initial={{ opacity: 0, y: -2 }} animate={{ opacity: [0, 0.5, 0], y: [-2, 6] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 0.3, delay: i * 0.1 }} />
      ))}
      {hovered && (
        <motion.path d="M34 30l-4 10h8l-4 10" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 1, 0.8] }} transition={{ duration: 0.3 }} />
      )}
    </svg>
  )
}

const iconComponents = [ScatteredIcon, MoneyIcon, BlindIcon, WeatherIcon]

/* ───────────────────────────────────────────────────
   Constants & Data
   ─────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const
const ghostNumbers = ['01', '02', '03', '04']

const severityTags = [
  { label: 'High Impact', colors: 'bg-red-500/10 text-red-400 border-red-500/20' },
  { label: 'Revenue Loss', colors: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { label: 'Blind Spot', colors: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  { label: 'Unpredictable', colors: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
]

// Constellation nodes (normalized 0–1 coordinates)
const CONSTELLATION_NODES = [
  { bx: 0.08, by: 0.15, drift: 0.7 },
  { bx: 0.22, by: 0.08, drift: 0.9 },
  { bx: 0.38, by: 0.12, drift: 0.5 },
  { bx: 0.52, by: 0.06, drift: 0.8 },
  { bx: 0.68, by: 0.10, drift: 0.6 },
  { bx: 0.82, by: 0.18, drift: 0.7 },
  { bx: 0.92, by: 0.08, drift: 0.9 },
  { bx: 0.15, by: 0.45, drift: 0.6 },
  { bx: 0.30, by: 0.38, drift: 0.8 },
  { bx: 0.48, by: 0.42, drift: 0.5 },
  { bx: 0.65, by: 0.35, drift: 0.7 },
  { bx: 0.80, by: 0.48, drift: 0.6 },
  { bx: 0.10, by: 0.75, drift: 0.8 },
  { bx: 0.28, by: 0.70, drift: 0.5 },
  { bx: 0.50, by: 0.78, drift: 0.9 },
  { bx: 0.72, by: 0.72, drift: 0.6 },
  { bx: 0.88, by: 0.80, drift: 0.7 },
  { bx: 0.42, by: 0.55, drift: 0.8 },
  { bx: 0.95, by: 0.55, drift: 0.5 },
]

const CONSTELLATION_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
  [0, 7], [1, 8], [2, 9], [3, 10], [4, 10], [5, 11], [6, 11],
  [7, 8], [8, 9], [9, 10], [10, 11],
  [7, 12], [8, 13], [9, 17], [10, 15], [11, 16], [11, 18],
  [12, 13], [13, 14], [14, 15], [15, 16],
  [17, 14], [17, 9], [17, 13],
]

/* ───────────────────────────────────────────────────
   Constellation Background with Mouse-Reactive Nodes
   ─────────────────────────────────────────────────── */
function ConstellationBg({ inView }: { inView: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const nodesRef = useRef<(SVGCircleElement | null)[]>([])
  const edgesRef = useRef<(SVGLineElement | null)[]>([])
  const rafRef = useRef(0)

  useEffect(() => {
    if (!inView || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const svg = svgRef.current
    if (!svg) return

    const section = svg.closest('section')
    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = (e.clientY - rect.top) / rect.height
    }
    section?.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      CONSTELLATION_NODES.forEach((node, i) => {
        const circle = nodesRef.current[i]
        if (!circle) return
        const dx = mx - node.bx
        const dy = my - node.by
        const dist = Math.sqrt(dx * dx + dy * dy)
        const offsetX = dx * node.drift * 60
        const offsetY = dy * node.drift * 60
        const brightness = Math.max(0.15, Math.min(0.7, 1 - dist * 1.5))

        circle.setAttribute('cx', String(node.bx * 100 + offsetX * 0.1))
        circle.setAttribute('cy', String(node.by * 100 + offsetY * 0.1))
        circle.setAttribute('opacity', String(brightness))
        circle.setAttribute('r', String(0.3 + brightness * 0.3))
      })

      CONSTELLATION_EDGES.forEach((edge, i) => {
        const line = edgesRef.current[i]
        if (!line) return
        const a = CONSTELLATION_NODES[edge[0]]
        const b = CONSTELLATION_NODES[edge[1]]
        if (!a || !b) return

        const dxA = mx - a.bx, dyA = my - a.by
        const dxB = mx - b.bx, dyB = my - b.by
        const ax = a.bx * 100 + dxA * a.drift * 6
        const ay = a.by * 100 + dyA * a.drift * 6
        const bx = b.bx * 100 + dxB * b.drift * 6
        const by = b.by * 100 + dyB * b.drift * 6

        const midX = (a.bx + b.bx) / 2
        const midY = (a.by + b.by) / 2
        const midDist = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2)
        const lineOpacity = Math.max(0.02, Math.min(0.15, 0.3 - midDist * 0.5))

        line.setAttribute('x1', String(ax))
        line.setAttribute('y1', String(ay))
        line.setAttribute('x2', String(bx))
        line.setAttribute('y2', String(by))
        line.setAttribute('opacity', String(lineOpacity))
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      section?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [inView])

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 2 }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {CONSTELLATION_EDGES.map((_edge, i) => (
          <line
            key={i}
            ref={el => { nodesRef.current; edgesRef.current[i] = el }}
            stroke="rgba(13,153,132,0.5)"
            strokeWidth="0.08"
            opacity="0.05"
          />
        ))}
        {CONSTELLATION_NODES.map((node, i) => (
          <circle
            key={i}
            ref={el => { nodesRef.current[i] = el }}
            cx={node.bx * 100}
            cy={node.by * 100}
            r="0.4"
            fill="#0D9984"
            opacity="0.2"
          />
        ))}
      </svg>
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Ambient Orbs
   ─────────────────────────────────────────────────── */
function AmbientOrbs({ inView }: { inView: boolean }) {
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
          left: '5%', top: '10%',
          width: isMobile ? 180 : 420, height: isMobile ? 180 : 420,
          background: 'radial-gradient(circle, rgba(13,153,132,0.08), transparent 70%)',
          filter: `blur(${isMobile ? 50 : 120}px)`,
        }}
        animate={!isMobile ? { x: [0, 20, -12, 0], y: [0, -18, 12, 0] } : {}}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute"
        style={{
          right: '8%', bottom: '15%',
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

/* ───────────────────────────────────────────────────
   Cursor Glow (desktop only)
   ─────────────────────────────────────────────────── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const section = glowRef.current?.closest('section')
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      pos.current.x = e.clientX - rect.left
      pos.current.y = e.clientY - rect.top
    }
    section.addEventListener('mousemove', handleMouseMove)

    let raf: number
    const animate = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.05
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.05
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${smooth.current.x - 350}px, ${smooth.current.y - 350}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none absolute hidden h-[700px] w-[700px] rounded-full lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(13,153,132,0.07), transparent 60%)',
        filter: 'blur(30px)',
        willChange: 'transform',
      }}
    />
  )
}

/* ───────────────────────────────────────────────────
   Pain Card (dark glassmorphism)
   ─────────────────────────────────────────────────── */
function PainCard({
  point, index, inView,
}: {
  point: { title: string; description: string }
  index: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--card-glow-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--card-glow-y', `${e.clientY - rect.top}px`)
    cardRef.current.style.setProperty('--card-glow-opacity', '1')
  }, [])

  const handleMouseLeave = () => {
    setHovered(false)
    cardRef.current?.style.setProperty('--card-glow-opacity', '0')
  }

  const IconComponent = iconComponents[index]
  const tag = severityTags[index]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
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
          {IconComponent && <IconComponent animate={inView} hovered={hovered} />}
        </div>
        <h3 className="mt-6 font-heading text-[18px] font-semibold text-white">
          {point.title}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.7] text-white/50">
          {point.description}
        </p>
        {tag && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
            className="mt-5"
          >
            <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.5px] ${tag.colors}`}>
              {tag.label}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Squiggle Underline
   ─────────────────────────────────────────────────── */
function SquiggleUnderline() {
  return (
    <motion.svg viewBox="0 0 120 14" className="absolute -bottom-2 left-0 w-full" fill="none" preserveAspectRatio="none">
      <defs>
        <filter id="squiggleGlow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(239,68,68,0.2)" />
        </filter>
      </defs>
      <motion.path
        d="M2 8c10-6 20 6 30 0s20-6 30 0 20 6 30 0 20-6 28 0"
        stroke="rgba(239,68,68,0.4)" strokeWidth="2.5" strokeLinecap="round"
        filter="url(#squiggleGlow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  )
}

/* ───────────────────────────────────────────────────
   Floating Particles
   ─────────────────────────────────────────────────── */
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

function FloatingShapes({ inView }: { inView: boolean }) {
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
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full" aria-hidden="true">
        {visible.map((s, i) => {
          const style = canAnimate
            ? { animation: `probDrift${s.anim} ${s.speed}s ease-in-out ${s.delay}s infinite` }
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
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Problem Section — Dark Premium
   ─────────────────────────────────────────────────── */
export default function Problem() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const headline = problem.headline
  const harderIndex = headline.lastIndexOf('Harder')

  return (
    <>
      <style>{`
        @keyframes probDrift0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -7px) rotate(3deg); }
        }
        @keyframes probDrift1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, 5px) rotate(-2deg); }
        }
        @keyframes probDrift2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(5px, 9px) rotate(4deg); }
        }
        @keyframes probDrift3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-7px, -10px) rotate(-3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .prob-animate * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        ref={ref}
        id="features"
        className="prob-animate relative overflow-hidden py-20 md:py-28 lg:py-32"
        style={{
          background: 'linear-gradient(160deg, #0B2A3F 0%, #0A1E30 35%, #081620 70%, #050E18 100%)',
        }}
      >
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.03 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="probGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0D9984" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#probGrid)" />
          </svg>
        </div>

        <FloatingShapes inView={inView} />
        <ConstellationBg inView={inView} />
        <AmbientOrbs inView={inView} />
        <CursorGlow />

        {/* Grain */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02]" aria-hidden="true">
          <filter id="probGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#probGrain)" />
        </svg>

        <Container className="relative z-10">
          {/* Header */}
          <div className="text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }} className="h-[2px] w-10 origin-right bg-secondary-400" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary-400">
                  {problem.label}
                </span>
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }} className="h-[2px] w-10 origin-left bg-secondary-400" />
              </div>
            </ScrollReveal>

            {harderIndex >= 0 ? (
              <h2 className="mx-auto mt-5 max-w-3xl font-heading text-[32px] font-bold leading-[1.15] text-white sm:text-[36px] md:text-[40px] lg:text-[48px] lg:tracking-[-0.5px]">
                {headline.substring(0, harderIndex).split(' ').map((word, i) => (
                  <motion.span key={`${word}-${i}`}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mr-[0.3em] inline-block">{word}</motion.span>
                ))}
                <motion.span className="relative inline-block"
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: headline.substring(0, harderIndex).split(' ').length * 0.04, duration: 0.5 }}>
                  {headline.substring(harderIndex)}
                  <SquiggleUnderline />
                </motion.span>
              </h2>
            ) : (
              <SplitText as="h2"
                className="mx-auto mt-5 max-w-3xl font-heading text-[32px] font-bold leading-[1.15] text-white sm:text-[36px] md:text-[40px] lg:text-[48px] lg:tracking-[-0.5px]">
                {headline}
              </SplitText>
            )}

            <ScrollReveal delay={0.3}>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/50 md:text-[17px]">
                {problem.subheadline}
              </p>
            </ScrollReveal>
          </div>

          {/* Cards */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:gap-6 sm:grid-cols-2 lg:mt-16">
            {problem.painPoints.map((point, i) => (
              <PainCard key={point.title} point={point} index={i} inView={inView} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
