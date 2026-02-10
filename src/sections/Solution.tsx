import { useState, useRef } from 'react'
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

// ─── Clean Background ───────────────────────────────────────

function CleanBackground({ inView }: { inView: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Soft teal ambient glow — top left */}
      <motion.div
        className="absolute"
        style={{
          left: '-8%', top: '-5%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(13,153,132,0.035) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
      />
      {/* Soft warm glow — bottom right (desktop) */}
      <motion.div
        className="absolute hidden md:block"
        style={{
          right: '-6%', bottom: '-8%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(245,166,35,0.02) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.3 }}
      />

      {/* Minimal decorative SVG */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        {/* Two gentle flowing curves */}
        <path
          d="M-40 380 Q360 320 720 370 T1480 350"
          stroke="rgba(13,153,132,0.04)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-40 520 Q400 470 800 510 T1480 490"
          stroke="rgba(13,153,132,0.025)"
          strokeWidth="1"
          fill="none"
        />
        {/* Soft ring accents */}
        <circle cx="180" cy="180" r="70" stroke="rgba(13,153,132,0.025)" strokeWidth="0.5" fill="none" />
        <circle cx="1260" cy="620" r="50" stroke="rgba(13,153,132,0.02)" strokeWidth="0.5" fill="none" />
        {/* Tiny accent dots */}
        <circle cx="680" cy="140" r="3" fill="rgba(13,153,132,0.04)" />
        <circle cx="1100" cy="320" r="2.5" fill="rgba(13,153,132,0.03)" />
        <circle cx="340" cy="650" r="2" fill="rgba(13,153,132,0.035)" />
      </motion.svg>
    </div>
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
          ? 'border border-secondary/15 bg-white hover:-translate-y-0.5'
          : 'border border-transparent bg-transparent hover:border-gray-200/60 hover:bg-white/80 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
      }`}
      style={{
        boxShadow: isActive
          ? 'inset 0 1px 0 rgba(13,153,132,0.08), 0 4px 24px rgba(13,153,132,0.08), 0 1px 3px rgba(0,0,0,0.04)'
          : undefined,
      }}
    >
      {/* Cursor-tracking glow (active, desktop) */}
      <div
        className="pointer-events-none absolute inset-0 hidden transition-opacity duration-300 md:block"
        style={{
          background: 'radial-gradient(circle 180px at var(--sol-glow-x, 50%) var(--sol-glow-y, 50%), rgba(13,153,132,0.06), transparent 60%)',
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
                ? 'bg-secondary/10 text-secondary'
                : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200/60 group-hover:text-gray-500'
            }`}
          >
            {Icon && <Icon size={20} />}
          </motion.div>

          <div className="min-w-0 flex-1">
            <h3 className={`font-heading text-[16px] font-semibold transition-colors duration-300 md:text-[17px] ${
              isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-600'
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
                  className="mt-2 text-[14px] leading-[1.7] text-gray-500"
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
              isActive ? 'text-secondary/[0.08]' : 'text-gray-300/40'
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
        boxShadow: '0 20px 60px rgba(2,27,51,0.08), 0 4px 16px rgba(2,27,51,0.04), 0 0 0 1px rgba(13,153,132,0.08)',
      }}
    >
      <div className="rounded-2xl bg-white p-1.5">
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
        className="sol-animate relative overflow-hidden py-20 md:py-28 lg:py-32"
        style={{
          background: 'linear-gradient(180deg, #F7FAFA 0%, #FFFFFF 45%, #FFFFFF 65%, #FAFBFB 100%)',
        }}
      >
        {/* Clean background */}
        <CleanBackground inView={inView} />

        <Container className="relative">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.5, ease: EASE }}
                className="h-[2px] w-8 origin-right bg-secondary"
              />
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
                className="text-[13px] font-bold uppercase tracking-[3px] text-secondary"
              >
                {solution.label}
              </motion.span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05, duration: 0.5, ease: EASE }}
                className="h-[2px] w-8 origin-left bg-secondary"
              />
            </div>

            <SplitText
              as="h2"
              className="mx-auto mt-5 max-w-4xl font-heading text-[32px] font-bold leading-[1.12] tracking-[-0.5px] text-primary-600 md:text-[42px] lg:text-[52px]"
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
              <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-gray-500">
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
                      i <= active ? 'bg-secondary' : 'bg-gray-200/60'
                    } ${i === active ? 'h-2 flex-[1.5]' : 'h-1.5 flex-1'}`}
                  />
                ))}
              </div>

              {/* Desktop: vertical progress indicator */}
              <div className="hidden lg:block">
                <div className="absolute left-[7px] top-0 h-full w-[3px] rounded-full bg-gray-200/60" />
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
                    className="h-[14px] w-[14px] rounded-full border-[2.5px] border-white bg-secondary"
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
