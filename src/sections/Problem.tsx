import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { problem } from '../content'

/* ───────────────────────────────────────────────────
   Animated SVG Icons — 72x72 (UNCHANGED)
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
   Severity Tags
   ─────────────────────────────────────────────────── */
const severityTags = [
  { label: 'High Impact', colors: 'bg-red-50 text-red-500 border-red-200' },
  { label: 'Revenue Loss', colors: 'bg-amber-50 text-amber-600 border-amber-200' },
  { label: 'Blind Spot', colors: 'bg-orange-50 text-orange-500 border-orange-200' },
  { label: 'Unpredictable', colors: 'bg-blue-50 text-blue-500 border-blue-200' },
]

/* ───────────────────────────────────────────────────
   Animated SVG Background V3
   Morphing blobs + flowing curves + mixed particles
   ─────────────────────────────────────────────────── */
function AnimatedSVGBackground({ inView }: { inView: boolean }) {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const canAnimate = !prefersReduced && inView
  const particleCount = isMobile ? 5 : 10
  const particles = useMemo(() =>
    Array.from({ length: particleCount }, (_, i) => ({
      cx: 80 + (i * 1300) / particleCount + (i % 3) * 40,
      cy: 80 + (i * 750) / particleCount + (i % 2) * 100,
      r: 2 + (i % 3) * 0.8,
      isDiamond: i % 3 === 0,
      opacity: 0.08 + (i % 4) * 0.02,
      duration: 10 + (i % 5) * 1.5,
      driftY: 60 + (i % 3) * 25,
      swayX: 8 + (i % 3) * 5,
      delay: (i % 7) * 1.2,
      rotation: i % 3 === 0 ? 360 : 0,
    })),
    [particleCount]
  )

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 2 }}
    >
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full" aria-hidden="true">

        {/* Morphing blob A — top-right */}
        <motion.path
          fill="rgba(13,153,132,0.03)"
          initial={{ d: 'M900,120 C1020,80 1160,140 1200,260 S1140,420 1020,400 S840,340 820,240 S780,160 900,120 Z' }}
          animate={canAnimate ? {
            d: [
              'M900,120 C1020,80 1160,140 1200,260 S1140,420 1020,400 S840,340 820,240 S780,160 900,120 Z',
              'M920,100 C1060,120 1180,180 1180,280 S1100,440 980,380 S820,360 840,260 S800,140 920,100 Z',
              'M880,130 C1000,60 1200,120 1220,250 S1160,400 1040,420 S860,320 830,230 S760,180 880,130 Z',
              'M900,120 C1020,80 1160,140 1200,260 S1140,420 1020,400 S840,340 820,240 S780,160 900,120 Z',
            ],
          } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Morphing blob B — bottom-left */}
        <motion.path
          fill="rgba(13,153,132,0.02)"
          initial={{ d: 'M200,500 C320,460 440,520 460,620 S380,760 260,740 S120,680 140,580 S80,540 200,500 Z' }}
          animate={canAnimate ? {
            d: [
              'M200,500 C320,460 440,520 460,620 S380,760 260,740 S120,680 140,580 S80,540 200,500 Z',
              'M220,480 C360,500 460,540 440,640 S340,780 240,720 S100,700 160,600 S100,520 220,480 Z',
              'M180,510 C300,440 480,500 480,610 S400,740 280,760 S140,660 120,570 S60,560 180,510 Z',
              'M200,500 C320,460 440,520 460,620 S380,760 260,740 S120,680 140,580 S80,540 200,500 Z',
            ],
          } : {}}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Flowing curve lines */}
        <motion.path
          d="M-100,250 C200,200 450,320 720,240 S1100,300 1540,220"
          fill="none" stroke="rgba(13,153,132,0.04)" strokeWidth="1.5"
          strokeDasharray="12 24"
          initial={{ strokeDashoffset: 0 }}
          animate={canAnimate ? { strokeDashoffset: -72 } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M-50,480 C280,520 520,440 780,500 S1080,460 1540,510"
          fill="none" stroke="rgba(13,153,132,0.04)" strokeWidth="1.5"
          strokeDasharray="12 24"
          initial={{ strokeDashoffset: 0 }}
          animate={canAnimate ? { strokeDashoffset: -72 } : {}}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M-80,700 C300,680 600,720 900,690 S1200,710 1540,685"
          fill="none" stroke="rgba(13,153,132,0.035)" strokeWidth="1.5"
          strokeDasharray="12 24"
          initial={{ strokeDashoffset: 0 }}
          animate={canAnimate ? { strokeDashoffset: -72 } : {}}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        />

        {/* Horizontal wave divider at ~70% height */}
        <motion.path
          fill="none" stroke="rgba(13,153,132,0.06)" strokeWidth="1"
          initial={{ d: 'M0,630 C180,610 360,650 540,620 S900,640 1080,615 S1320,635 1440,620', pathLength: 0 }}
          animate={inView ? {
            pathLength: 1,
            d: canAnimate ? [
              'M0,630 C180,610 360,650 540,620 S900,640 1080,615 S1320,635 1440,620',
              'M0,625 C180,645 360,615 540,635 S900,615 1080,640 S1320,620 1440,630',
              'M0,630 C180,610 360,650 540,620 S900,640 1080,615 S1320,635 1440,620',
            ] : undefined,
          } : {}}
          transition={{
            pathLength: { duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] },
            d: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        {/* Floating particles — circles + rotating diamonds */}
        {canAnimate && particles.map((p, i) => (
          p.isDiamond ? (
            <motion.rect
              key={i}
              x={p.cx - 2} y={p.cy - 2} width="4" height="4" rx="0.5"
              fill={`rgba(13,153,132,${p.opacity})`}
              initial={{ opacity: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, p.opacity + 0.06, p.opacity + 0.02, 0],
                y: [0, -p.driftY * 0.3, -p.driftY * 0.7, -p.driftY],
                x: [0, p.swayX, -p.swayX * 0.5, p.swayX * 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
              style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
            />
          ) : (
            <motion.circle
              key={i}
              cx={p.cx} cy={p.cy} r={p.r}
              fill={`rgba(13,153,132,${p.opacity})`}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, p.opacity + 0.06, p.opacity + 0.02, 0],
                y: [0, -p.driftY * 0.3, -p.driftY * 0.7, -p.driftY],
                x: [0, p.swayX, -p.swayX * 0.5, p.swayX * 0.3],
              }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
            />
          )
        ))}
      </svg>
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Blur Glow Orbs
   ─────────────────────────────────────────────────── */
function BlurOrbs({ inView }: { inView: boolean }) {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const canAnimate = !prefersReduced && !isMobile

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute"
        style={{
          left: '18%', top: '42%',
          width: isMobile ? 175 : 350, height: isMobile ? 175 : 350,
          background: 'radial-gradient(circle, rgba(13,153,132,0.07), transparent 70%)',
          filter: `blur(${isMobile ? 50 : 100}px)`,
        }}
        animate={canAnimate ? { x: [0, 25, -12, 0], y: [0, -15, 12, 0] } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {!isMobile && (
        <motion.div
          className="absolute"
          style={{
            right: '10%', top: '48%',
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(13,153,132,0.05), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={canAnimate ? { x: [0, -18, 14, 0], y: [0, 22, -12, 0] } : {}}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <motion.div
        className="absolute"
        style={{
          left: '25%', bottom: '6%',
          width: isMobile ? 250 : 500, height: isMobile ? 100 : 200,
          background: 'radial-gradient(ellipse, rgba(13,153,132,0.05), transparent 70%)',
          filter: `blur(${isMobile ? 50 : 70}px)`,
        }}
        animate={canAnimate ? { scaleX: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

/* ───────────────────────────────────────────────────
   Premium Pain Card
   ─────────────────────────────────────────────────── */
function PainCard({
  point, index, inView,
}: {
  point: { title: string; description: string }
  index: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    glowX.set(((e.clientX - rect.left) / rect.width) * 100)
    glowY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [glowX, glowY])

  const IconComponent = iconComponents[index]
  const tag = severityTags[index]
  const ghostNum = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 1.1 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); glowX.set(50); glowY.set(50) }}
      className="group relative overflow-hidden rounded-[28px] p-7 md:p-9
        border border-secondary/[0.06]
        shadow-[0_2px_8px_rgba(2,27,51,0.03),0_0_0_1px_rgba(13,153,132,0.03)]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:-translate-y-1.5 hover:scale-[1.015]
        hover:shadow-[0_8px_24px_rgba(2,27,51,0.06),0_20px_48px_rgba(13,153,132,0.06),0_0_0_1px_rgba(13,153,132,0.08)]
        hover:border-secondary/[0.12]
        active:scale-[0.98] md:active:scale-100"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFFFE 100%)' }}
    >
      {/* Cursor-tracking radial glow (desktop only) */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block"
        style={{
          background: `radial-gradient(circle 250px at ${glowX.get()}% ${glowY.get()}%, rgba(13,153,132,0.06), transparent)`,
        }}
      />

      {/* Hover bg tint */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5FFFE 100%)' }}
      />

      {/* Left accent bar with glow */}
      <div className="absolute left-0 top-[15%] h-[70%] w-[3px] origin-center scale-y-0 rounded-full bg-secondary transition-all duration-500 group-hover:scale-y-100 group-hover:shadow-[3px_0_10px_rgba(13,153,132,0.1)]" />

      {/* Ghost number */}
      <motion.span
        className="absolute right-4 top-3 select-none font-heading text-[60px] font-extrabold leading-none text-secondary/[0.05] transition-all duration-[600ms] group-hover:text-secondary/[0.1] group-hover:-translate-x-[3px] md:right-6 md:top-4 md:text-[80px]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
      >
        {ghostNum}
      </motion.span>

      <div className="relative">
        {/* Icon with idle ring + hover glow */}
        <div className="relative inline-flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-secondary/[0.05] bg-[radial-gradient(circle,rgba(13,153,132,0.03),transparent_70%)] transition-all duration-[400ms] group-hover:border-secondary/[0.1] group-hover:bg-[radial-gradient(circle,rgba(13,153,132,0.07),transparent_70%)] group-hover:shadow-[0_0_16px_rgba(13,153,132,0.08)]" />
          <div className="relative">
            {IconComponent && <IconComponent animate={inView} hovered={hovered} />}
          </div>
        </div>

        <h3 className="mt-6 font-heading text-[18px] font-semibold text-primary-600 md:text-[20px]">
          {point.title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.75] text-gray-500 md:text-[15px]">
          {point.description}
        </p>

        {tag && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
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
   Squiggle Underline with stronger glow
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
   Problem Section — Premium V3
   ─────────────────────────────────────────────────── */

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: sectionInViewRef, inView: sectionInView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.1, triggerOnce: true })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -25])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -12])

  const headline = problem.headline
  const harderIndex = headline.lastIndexOf('Harder')

  const setSectionRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node
      sectionInViewRef(node)
    },
    [sectionInViewRef]
  )

  return (
    <section ref={setSectionRefs} id="features" className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Animated SVG bg with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatedSVGBackground inView={sectionInView} />
      </motion.div>

      {/* Blur orbs with parallax */}
      <motion.div className="absolute inset-0" style={{ y: orbY }}>
        <BlurOrbs inView={sectionInView} />
      </motion.div>

      <Container>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="h-[2px] w-10 origin-right bg-secondary" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary">
                  {problem.label}
                </span>
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="h-[2px] w-10 origin-left bg-secondary" />
              </div>
            </ScrollReveal>

            {harderIndex >= 0 ? (
              <h2 className="mx-auto mt-5 max-w-3xl font-heading text-[32px] font-bold leading-[1.15] text-primary-600 md:text-[40px] lg:text-[48px] lg:tracking-[-0.5px]">
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
                className="mx-auto mt-5 max-w-3xl font-heading text-[32px] font-bold leading-[1.15] text-primary-600 md:text-[40px] lg:text-[48px] lg:tracking-[-0.5px]">
                {headline}
              </SplitText>
            )}

            <ScrollReveal delay={0.3}>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.75] text-gray-500 md:text-[17px]">
                {problem.subheadline}
              </p>
            </ScrollReveal>
          </div>

          {/* Cards */}
          <div ref={cardsRef} className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-16">
            {problem.painPoints.map((point, i) => (
              <PainCard key={point.title} point={point} index={i} inView={cardsInView} />
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
