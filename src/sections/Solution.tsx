import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { iconMap } from '../components/Icons'
import { solution } from '../content'

// ─── Constants ──────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

const mockupLabels = ['Fields Overview', 'Financial Tracker', 'Weather Intelligence', 'Marketplace']
const mockupRoutes = ['app.farmzeo.com/fields', 'app.farmzeo.com/finance', 'app.farmzeo.com/weather', 'app.farmzeo.com/store']
const ghostNumbers = ['01', '02', '03', '04']

// ─── SVG Scenes ─────────────────────────────────────────────

function FieldsScene() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="h-full w-full">
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
        <rect x="16" y="24" width="100" height="56" rx="6" fill="rgba(13,153,132,0.12)" stroke="rgba(13,153,132,0.2)" strokeWidth="1" />
        <rect x="128" y="24" width="72" height="56" rx="6" fill="rgba(13,153,132,0.08)" stroke="rgba(13,153,132,0.15)" strokeWidth="1" />
        <rect x="212" y="24" width="52" height="56" rx="6" fill="rgba(245,166,35,0.1)" stroke="rgba(245,166,35,0.18)" strokeWidth="1" />
        <circle cx="42" cy="48" r="4" fill="rgba(13,153,132,0.3)" />
        <circle cx="66" cy="42" r="3" fill="rgba(13,153,132,0.25)" />
        <circle cx="88" cy="56" r="3.5" fill="rgba(13,153,132,0.2)" />
        <circle cx="152" cy="52" r="3" fill="rgba(13,153,132,0.2)" />
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4, ease: EASE }}>
        <rect x="16" y="96" width="120" height="68" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="28" y="112" width="60" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="28" y="124" width="40" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="28" y="140" width="96" height="12" rx="3" fill="rgba(13,153,132,0.15)" />
        <rect x="152" y="96" width="112" height="28" rx="6" fill="rgba(255,255,255,0.06)" />
        <rect x="152" y="132" width="112" height="28" rx="6" fill="rgba(255,255,255,0.04)" />
      </motion.g>
    </svg>
  )
}

function FinanceScene() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="h-full w-full">
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
        <line x1="32" y1="148" x2="260" y2="148" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="32" y1="24" x2="32" y2="148" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {[40, 55, 35, 70, 60, 85, 75, 95].map((h, i) => (
          <rect key={i} x={48 + i * 27} y={148 - h} width="16" rx="3" height={h}
            fill={i >= 6 ? 'rgba(13,153,132,0.35)' : 'rgba(13,153,132,0.15)'} />
        ))}
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4, ease: EASE }}>
        <path d="M56 108 L83 93 L110 113 L137 78 L164 88 L191 63 L218 73 L245 53"
          stroke="rgba(245,166,35,0.5)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="200" y="24" width="68" height="28" rx="14" fill="rgba(13,153,132,0.25)" />
        <text x="218" y="43" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="600">+12.5%</text>
      </motion.g>
    </svg>
  )
}

function WeatherScene() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="h-full w-full">
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
        <circle cx="56" cy="48" r="18" fill="rgba(245,166,35,0.25)" />
        <circle cx="56" cy="48" r="12" fill="rgba(245,166,35,0.35)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return <line key={i} x1={56 + Math.cos(rad) * 22} y1={48 + Math.sin(rad) * 22}
            x2={56 + Math.cos(rad) * 28} y2={48 + Math.sin(rad) * 28}
            stroke="rgba(245,166,35,0.3)" strokeWidth="2" strokeLinecap="round" />
        })}
        <rect x="100" y="24" width="88" height="52" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="116" y="48" fill="rgba(255,255,255,0.6)" fontSize="22" fontWeight="700">28°C</text>
        <rect x="116" y="56" width="48" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
        <rect x="204" y="24" width="60" height="52" rx="8" fill="rgba(255,255,255,0.06)" />
        <rect x="220" y="40" width="8" height="24" rx="4" fill="rgba(255,255,255,0.1)" />
        <rect x="220" y="52" width="8" height="12" rx="4" fill="rgba(13,153,132,0.3)" />
        <text x="234" y="56" fill="rgba(255,255,255,0.4)" fontSize="9">65%</text>
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4, ease: EASE }}>
        <rect x="16" y="96" width="248" height="68" rx="8" fill="rgba(255,255,255,0.05)" />
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <g key={i}>
            <text x={40 + i * 34} y="120" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle">{d}</text>
            <circle cx={40 + i * 34} cy="136" r="4" fill={`rgba(13,153,132,${0.15 + (i % 3) * 0.08})`} />
            <text x={40 + i * 34} y="152" fill="rgba(255,255,255,0.25)" fontSize="8" textAnchor="middle">{24 + (i % 4)}°</text>
          </g>
        ))}
      </motion.g>
    </svg>
  )
}

function MarketplaceScene() {
  return (
    <svg viewBox="0 0 280 180" fill="none" className="h-full w-full">
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={16 + i * 90} y="16" width="78" height="112" rx="8"
              fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x={22 + i * 90} y="22" width="66" height="44" rx="4"
              fill={i === 0 ? 'rgba(13,153,132,0.12)' : i === 1 ? 'rgba(245,166,35,0.1)' : 'rgba(13,153,132,0.08)'} />
            <rect x={22 + i * 90} y="76" width="48" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x={22 + i * 90} y="88" width="32" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x={22 + i * 90} y="100" width="36" height="18" rx="9"
              fill={i === 1 ? 'rgba(245,166,35,0.2)' : 'rgba(13,153,132,0.15)'} />
            <text x={32 + i * 90} y="113" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="600">
              {i === 0 ? '₹120' : i === 1 ? '₹85' : '₹200'}
            </text>
          </g>
        ))}
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4, ease: EASE }}>
        <rect x="16" y="144" width="248" height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="32" cy="156" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" />
        <rect x="44" y="154" width="60" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      </motion.g>
    </svg>
  )
}

const mockupScenes = [FieldsScene, FinanceScene, WeatherScene, MarketplaceScene]

// ─── Premium Background — Topographic Flow ─────────────────

const TOPO_PATHS = [
  { d: 'M-40 140 Q200 100 440 135 T880 110 T1320 140 T1520 120', opacity: 0.08, w: 1.2 },
  { d: 'M-40 260 Q240 220 480 255 T920 230 T1360 260 T1520 240', opacity: 0.06, w: 1 },
  { d: 'M-40 380 Q180 340 420 375 T860 350 T1300 380 T1520 360', opacity: 0.07, w: 1.2 },
  { d: 'M-40 500 Q260 460 500 495 T940 470 T1380 500 T1520 480', opacity: 0.05, w: 0.8 },
  { d: 'M-40 620 Q220 580 460 615 T900 590 T1340 620 T1520 600', opacity: 0.06, w: 1 },
  { d: 'M-40 740 Q200 700 440 735 T880 710 T1320 740 T1520 720', opacity: 0.04, w: 0.8 },
]

const ACCENT_RINGS = [
  { cx: 0.1, cy: 0.18, r1: 2, r2: 3.2, color: '#0D9984' },
  { cx: 0.88, cy: 0.22, r1: 1.5, r2: 2.5, color: '#025080' },
  { cx: 0.25, cy: 0.8, r1: 1.8, r2: 2.8, color: '#0D9984' },
  { cx: 0.75, cy: 0.68, r1: 1.4, r2: 2.4, color: '#025080' },
  { cx: 0.5, cy: 0.08, r1: 1.2, r2: 2.1, color: '#F5A623' },
]

const SOL_PARTICLES = [
  { x: '8%', y: '12%', size: 4, opacity: 0.12, dur: '24s', dx: 20, dy: -25 },
  { x: '90%', y: '18%', size: 3, opacity: 0.1, dur: '28s', dx: -18, dy: 22 },
  { x: '12%', y: '80%', size: 5, opacity: 0.08, dur: '26s', dx: 15, dy: -20 },
  { x: '85%', y: '72%', size: 3, opacity: 0.12, dur: '22s', dx: -22, dy: -18 },
  { x: '48%', y: '6%', size: 4, opacity: 0.1, dur: '30s', dx: 12, dy: 15 },
  { x: '35%', y: '90%', size: 3, opacity: 0.08, dur: '34s', dx: -15, dy: -12 },
  { x: '68%', y: '45%', size: 4, opacity: 0.1, dur: '27s', dx: 18, dy: -16 },
  { x: '5%', y: '50%', size: 3, opacity: 0.08, dur: '32s', dx: 14, dy: 20 },
]

const solBgCSS = SOL_PARTICLES.map((p, i) => `
  .sol-dot-${i}{animation:solDot${i} ${p.dur} ease-in-out infinite}
  @keyframes solDot${i}{
    0%,100%{transform:translate(0,0)}
    25%{transform:translate(${p.dx * 0.6}px,${p.dy * 0.4}px)}
    50%{transform:translate(${p.dx}px,${p.dy}px)}
    75%{transform:translate(${p.dx * 0.3}px,${p.dy * 0.7}px)}
  }
`).join('') + `
  @keyframes solTopoDrift{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
  .sol-topo-0{animation:solTopoDrift 20s ease-in-out infinite}
  .sol-topo-1{animation:solTopoDrift 24s ease-in-out infinite;animation-delay:-4s}
  .sol-topo-2{animation:solTopoDrift 22s ease-in-out infinite;animation-delay:-8s}
  .sol-topo-3{animation:solTopoDrift 26s ease-in-out infinite;animation-delay:-12s}
  .sol-topo-4{animation:solTopoDrift 21s ease-in-out infinite;animation-delay:-6s}
  .sol-topo-5{animation:solTopoDrift 25s ease-in-out infinite;animation-delay:-10s}
  @keyframes solRingPulse{0%,100%{opacity:1}50%{opacity:0.5}}
  .sol-ring-a{animation:solRingPulse 8s ease-in-out infinite}
  .sol-ring-b{animation:solRingPulse 10s ease-in-out infinite;animation-delay:-4s}
  @keyframes solOrbA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(25px,-18px) scale(1.04)}66%{transform:translate(-18px,12px) scale(0.96)}}
  @keyframes solOrbB{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-20px,15px) scale(1.03)}66%{transform:translate(15px,-20px) scale(0.97)}}
  .sol-orb-a{animation:solOrbA 22s ease-in-out infinite}
  .sol-orb-b{animation:solOrbB 28s ease-in-out infinite}
`

function PremiumBg({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 2 }}
      aria-hidden="true"
    >
      <style>{solBgCSS}</style>

      {/* Dot grid pattern */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="solDotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.8" fill="rgba(13,153,132,0.12)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#solDotGrid)" />
      </svg>

      {/* Topographic flow lines */}
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {TOPO_PATHS.map((path, i) => (
          <path
            key={`topo-${i}`}
            d={path.d}
            stroke="#0D9984"
            strokeWidth={path.w}
            fill="none"
            opacity={path.opacity}
            className={`sol-topo-${i}`}
          />
        ))}
      </svg>

      {/* Accent ring clusters */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {ACCENT_RINGS.map((ring, i) => (
          <g key={`ring-${i}`} className={i % 2 === 0 ? 'sol-ring-a' : 'sol-ring-b'}>
            <circle cx={ring.cx * 100} cy={ring.cy * 100} r={ring.r1} fill="none" stroke={ring.color} strokeWidth="0.06" opacity="0.08" />
            <circle cx={ring.cx * 100} cy={ring.cy * 100} r={ring.r2} fill="none" stroke={ring.color} strokeWidth="0.04" opacity="0.05" strokeDasharray="0.5 1" />
          </g>
        ))}
      </svg>

      {/* Floating micro particles */}
      <div className="absolute inset-0 hidden lg:block">
        {SOL_PARTICLES.map((p, i) => (
          <div key={`sol-p-${i}`} className={`absolute sol-dot-${i}`} style={{ left: p.x, top: p.y }}>
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: `rgba(13,153,132,${p.opacity})`,
                boxShadow: `0 0 ${p.size * 3}px rgba(13,153,132,${p.opacity * 0.4})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Grain texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
        <filter id="solGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#solGrain)" />
      </svg>
    </motion.div>
  )
}

function SolOrbs({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5 }}
      aria-hidden="true"
    >
      <div
        className="absolute sol-orb-a"
        style={{
          left: '-5%', top: '-8%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(13,153,132,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute sol-orb-b"
        style={{
          right: '-4%', bottom: '-6%', width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute sol-orb-a"
        style={{
          left: '40%', top: '50%', width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(2,80,128,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '-8s',
        }}
      />
    </motion.div>
  )
}

function SolCursorSVG() {
  const wrapperRef = useRef<SVGSVGElement>(null)
  const ringRef = useRef<SVGGElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const smooth = useRef({ x: -200, y: -200 })
  const rotation = useRef(0)
  const inside = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const section = wrapperRef.current?.closest('section')
    if (!section) return

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      inside.current =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
    }
    section.addEventListener('mousemove', onMove, { passive: true })

    let raf: number
    const animate = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.1
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.1
      rotation.current += 0.5

      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = inside.current ? '1' : '0'
      }
      if (ringRef.current) {
        ringRef.current.setAttribute('transform', `translate(${smooth.current.x}, ${smooth.current.y}) rotate(${rotation.current})`)
      }
      if (glowRef.current) {
        glowRef.current.setAttribute('cx', String(smooth.current.x))
        glowRef.current.setAttribute('cy', String(smooth.current.y))
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <svg
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-[5] hidden h-full w-full lg:block"
      style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="solCursorGlow">
          <stop offset="0%" stopColor="#0D9984" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#0D9984" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0D9984" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Glow */}
      <circle ref={glowRef} cx={-200} cy={-200} r="70" fill="url(#solCursorGlow)" />
      {/* Rotating rings */}
      <g ref={ringRef}>
        <circle r="22" fill="none" stroke="rgba(13,153,132,0.35)" strokeWidth="1.2" strokeDasharray="5 8" />
        <circle r="12" fill="none" stroke="rgba(13,153,132,0.15)" strokeWidth="0.8" strokeDasharray="3 6" />
        <circle r="2.5" fill="#0D9984" opacity="0.6" />
      </g>
    </svg>
  )
}

// ─── Feature Card ───────────────────────────────────────────

function FeatureCard({
  feature, index, isActive, onClick,
}: {
  feature: typeof solution.features[number]; index: number; isActive: boolean; onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = iconMap[feature.icon]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isActive) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--sol-glow-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--sol-glow-y', `${e.clientY - rect.top}px`)
    cardRef.current.style.setProperty('--sol-glow-opacity', '1')
  }

  const handleMouseLeave = () => {
    cardRef.current?.style.setProperty('--sol-glow-opacity', '0')
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 + index * 0.08, duration: 0.5, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-400 active:scale-[0.98] md:active:scale-100 ${
        isActive
          ? 'border border-secondary/20 bg-white/[0.07] backdrop-blur-[12px] hover:-translate-y-0.5'
          : 'border border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.06]'
      }`}
      style={{
        boxShadow: isActive
          ? 'inset 0 1px 0 rgba(13,153,132,0.12), 0 4px 24px rgba(13,153,132,0.15), 0 1px 3px rgba(0,0,0,0.2)'
          : undefined,
      }}
    >
      {/* Cursor-tracking glow (active, desktop) */}
      <div
        className="pointer-events-none absolute inset-0 hidden transition-opacity duration-300 md:block"
        style={{
          background: 'radial-gradient(circle 180px at var(--sol-glow-x, 50%) var(--sol-glow-y, 50%), rgba(13,153,132,0.12), transparent 60%)',
          opacity: 'var(--sol-glow-opacity, 0)',
        }}
      />

      <div className="relative py-4 pl-5 pr-4 md:py-5 md:pl-6 md:pr-5">
        <div className="flex items-start gap-4">
          {/* Icon badge with spring */}
          <motion.div
            key={`badge-${isActive}`}
            initial={isActive ? { scale: 0.8 } : false}
            animate={{ scale: 1 }}
            transition={isActive ? { type: 'spring', stiffness: 500, damping: 15 } : { duration: 0.2 }}
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 md:h-11 md:w-11 ${
              isActive
                ? 'bg-secondary/15 text-secondary-400'
                : 'bg-white/[0.08] text-white/40 group-hover:bg-white/[0.12] group-hover:text-white/50'
            }`}
          >
            {Icon && <Icon size={20} />}
          </motion.div>

          <div className="min-w-0 flex-1">
            <h3 className={`font-heading text-[16px] font-semibold transition-colors duration-300 md:text-[17px] ${
              isActive ? 'text-white' : 'text-white/50 group-hover:text-white/60'
            }`}>
              {feature.title}
            </h3>
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
                  exit={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-2 text-[14px] leading-[1.7] text-white/50"
                >
                  {feature.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Ghost number with parallax */}
          <motion.span
            animate={{ y: isActive ? -4 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className={`absolute right-3 top-2 select-none font-heading text-[40px] font-extrabold leading-none transition-opacity duration-300 ${
              isActive ? 'text-secondary/[0.12]' : 'text-white/[0.04]'
            }`}
          >
            {ghostNumbers[index]}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Mockup Display ─────────────────────────────────────────

function MockupDisplay({ active, onTabClick }: { active: number; onTabClick: (i: number) => void }) {
  const Scene = mockupScenes[active] ?? mockupScenes[0]!

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(13,153,132,0.15)',
      }}
    >
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-1.5 backdrop-blur-sm">
        <div className="rounded-xl p-4 md:p-5" style={{ background: 'linear-gradient(145deg, #021B33 0%, #0A2A45 100%)' }}>
          {/* Browser chrome */}
          <div className="mb-3 flex items-center gap-2 md:mb-4">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27CA40]" />
            <div className="ml-3 flex h-5 flex-1 items-center gap-1.5 overflow-hidden rounded-full bg-white/5 px-3">
              <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="flex-shrink-0">
                <rect x="0.5" y="4" width="7" height="5.5" rx="1.5" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                <path d="M2 4V2.5C2 1.4 2.9 0.5 4 0.5s2 0.9 2 2V4" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
              <motion.span
                key={active}
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="truncate text-[10px] leading-5 text-white/20"
              >
                {mockupRoutes[active] ?? mockupRoutes[0]}
              </motion.span>
            </div>
          </div>

          {/* Tab bar with sliding pill */}
          <div className="relative mb-3 flex gap-1 rounded-lg bg-white/5 p-1 md:mb-4">
            {mockupLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => onTabClick(i)}
                className="relative z-10 flex-1 rounded-md px-1 py-1.5 text-[9px] font-medium transition-colors duration-300 md:px-2 md:text-[10px]"
                style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.3)' }}
              >
                {label}
              </button>
            ))}
            <motion.div
              layout
              className="absolute top-1 bottom-1 rounded-md"
              style={{
                left: `calc(${active} * 25% + 4px)`,
                width: 'calc(25% - 4px)',
                background: '#0D9984',
                boxShadow: '0 0 16px rgba(13,153,132,0.3)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          </div>

          {/* Content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="min-h-[220px] rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 md:min-h-[260px] md:p-5"
            >
              <Scene />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────

export default function Solution() {
  const [active, setActive] = useState(0)
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const mockupRef = useRef<HTMLDivElement>(null)

  const handleMockupMove = (e: React.MouseEvent) => {
    if (!mockupRef.current) return
    const rect = mockupRef.current.getBoundingClientRect()
    const halfW = rect.width / 2
    const halfH = rect.height / 2
    const rx = Math.max(-3, Math.min(3, ((rect.top + halfH - e.clientY) / halfH) * 3))
    const ry = Math.max(-3, Math.min(3, ((e.clientX - rect.left - halfW) / halfW) * 3))
    mockupRef.current.style.setProperty('--mock-rx', `${rx}deg`)
    mockupRef.current.style.setProperty('--mock-ry', `${ry}deg`)
  }

  const handleMockupLeave = () => {
    mockupRef.current?.style.setProperty('--mock-rx', '0deg')
    mockupRef.current?.style.setProperty('--mock-ry', '0deg')
  }

  return (
    <>
      <style>{`
        @keyframes solPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(13,153,132,0.15); }
          50% { box-shadow: 0 0 0 6px rgba(13,153,132,0.08); }
        }
        @keyframes solRipple {
          0% { transform: scale(1); opacity: 0.25; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes solPulseWave {
          0% { bottom: -8px; opacity: 0; }
          10% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { bottom: calc(100% + 8px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sol-animate * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="solution"
        className="sol-animate relative overflow-hidden py-20 md:py-28 lg:py-32"
        style={{
          background: 'linear-gradient(160deg, #0B2A3F 0%, #0A1E30 35%, #081620 70%, #050E18 100%)',
        }}
      >
        {/* Premium background */}
        <PremiumBg inView={inView} />
        <SolOrbs inView={inView} />
        <SolCursorSVG />

        <Container className="relative z-10">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.5, ease: EASE }}
                className="h-[2px] w-8 origin-right bg-secondary-400"
              />
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
                className="text-[13px] font-bold uppercase tracking-[3px] text-secondary-400"
              >
                {solution.label}
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05, duration: 0.5, ease: EASE }}
                className="h-[2px] w-8 origin-left bg-secondary-400"
              />
            </div>

            <SplitText
              as="h2"
              className="mx-auto mt-5 max-w-4xl font-heading text-[26px] font-bold leading-[1.12] tracking-[-0.5px] text-white sm:text-[32px] md:text-[42px] lg:text-[52px]"
            >
              {solution.headline}
            </SplitText>

            {/* Accent bar */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
              className="mx-auto mt-6 h-1 w-16 origin-center rounded-full bg-gradient-to-r from-secondary to-accent"
            />

            <ScrollReveal delay={0.65}>
              <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.8] text-white/50 sm:text-[17px]">
                {solution.subheadline}
              </p>
            </ScrollReveal>
          </div>

          {/* Main content */}
          <div className="mt-16 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:items-start lg:gap-16">
            {/* Left: Feature stepper */}
            <div className="relative lg:w-[45%]">
              {/* Mobile: horizontal step pills */}
              <div className="mb-5 flex gap-2 lg:hidden">
                {solution.features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-400 ${
                      i <= active ? 'bg-secondary' : 'bg-white/[0.1]'
                    } ${i === active ? 'h-2 flex-[1.5]' : 'h-1.5 flex-1'}`}
                  />
                ))}
              </div>

              {/* Desktop: vertical progress indicator */}
              <div className="hidden lg:block">
                <div className="absolute left-[7px] top-0 h-full w-[3px] rounded-full bg-white/[0.08]" />
                {/* Fill with pulse wave */}
                <motion.div
                  className="absolute left-[7px] top-0 w-[3px] overflow-hidden rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #0D9984 0%, #3DBDA8 100%)',
                    boxShadow: '0 0 12px rgba(13,153,132,0.3)',
                  }}
                  animate={{ height: `${((active + 1) / solution.features.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div
                    className="absolute inset-x-0 h-2 rounded-full"
                    style={{
                      background: 'linear-gradient(transparent, rgba(255,255,255,0.6), transparent)',
                      animation: 'solPulseWave 3s ease-in-out infinite',
                    }}
                  />
                </motion.div>
                {/* Active dot with ripple */}
                <div
                  className="absolute left-0 z-10"
                  style={{ top: `${active * (100 / solution.features.length) + (50 / solution.features.length)}%`, transform: 'translateY(-50%)' }}
                >
                  <motion.div
                    layout
                    className="h-[14px] w-[14px] rounded-full border-[2.5px] border-[#0A1E30] bg-secondary"
                    style={{
                      boxShadow: '0 0 0 4px rgba(13,153,132,0.15), 0 0 12px rgba(13,153,132,0.2)',
                      animation: 'solPulse 2s ease-in-out infinite',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-secondary/30"
                    style={{ animation: 'solRipple 2.5s ease-out infinite' }}
                  />
                </div>
              </div>

              {/* Feature cards */}
              <div className="flex flex-col gap-3 lg:gap-4 lg:pl-8">
                {solution.features.map((feature, i) => (
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    index={i}
                    isActive={active === i}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Mockup with 3D tilt + float */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              className="lg:sticky lg:top-24 lg:w-[55%]"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <div
                  ref={mockupRef}
                  onMouseMove={handleMockupMove}
                  onMouseLeave={handleMockupLeave}
                  className="relative"
                  style={{
                    transform: 'perspective(1200px) rotateX(var(--mock-rx, 0deg)) rotateY(var(--mock-ry, 0deg))',
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  <div className="pointer-events-none absolute -left-px top-[20%] hidden h-[60%] w-[1.5px] rounded-full bg-gradient-to-b from-transparent via-secondary/15 to-transparent blur-sm lg:block" aria-hidden="true" />
                  <div className="pointer-events-none absolute -right-px top-[30%] hidden h-[40%] w-px rounded-full bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-sm lg:block" aria-hidden="true" />
                  <MockupDisplay active={active} onTabClick={setActive} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
