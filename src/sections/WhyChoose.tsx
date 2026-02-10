import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { whyChoose } from '../content'

/* ─── floating particles ─── */
const particles = [
  { size: 5, x: '8%', y: '12%', color: '13,153,132', opacity: 0.15, dur: '24s', dx: 25, dy: -30 },
  { size: 3, x: '90%', y: '18%', color: '2,80,128', opacity: 0.12, dur: '28s', dx: -20, dy: 22 },
  { size: 4, x: '12%', y: '80%', color: '245,166,35', opacity: 0.1, dur: '26s', dx: 18, dy: -20 },
  { size: 3, x: '85%', y: '75%', color: '13,153,132', opacity: 0.14, dur: '22s', dx: -22, dy: -25 },
  { size: 6, x: '48%', y: '8%', color: '2,80,128', opacity: 0.08, dur: '32s', dx: 15, dy: 20 },
  { size: 4, x: '35%', y: '88%', color: '13,153,132', opacity: 0.12, dur: '30s', dx: -18, dy: -15 },
  { size: 3, x: '72%', y: '50%', color: '245,166,35', opacity: 0.1, dur: '34s', dx: 20, dy: 18 },
  { size: 5, x: '5%', y: '48%', color: '2,80,128', opacity: 0.08, dur: '27s', dx: 12, dy: -22 },
]

/* ─── hex grid nodes ─── */
const hexNodes = [
  { cx: 0.1, cy: 0.15, r: 2.5, color: '#0D9984' },
  { cx: 0.3, cy: 0.08, r: 2, color: '#025080' },
  { cx: 0.5, cy: 0.12, r: 3, color: '#0D9984' },
  { cx: 0.7, cy: 0.06, r: 2, color: '#2ABFAD' },
  { cx: 0.9, cy: 0.14, r: 2.5, color: '#025080' },
  { cx: 0.05, cy: 0.5, r: 2, color: '#2ABFAD' },
  { cx: 0.2, cy: 0.45, r: 2.5, color: '#0D9984' },
  { cx: 0.4, cy: 0.5, r: 2, color: '#F5A623' },
  { cx: 0.6, cy: 0.48, r: 3, color: '#025080' },
  { cx: 0.8, cy: 0.52, r: 2, color: '#0D9984' },
  { cx: 0.95, cy: 0.46, r: 2.5, color: '#2ABFAD' },
  { cx: 0.12, cy: 0.85, r: 2, color: '#025080' },
  { cx: 0.32, cy: 0.9, r: 2.5, color: '#0D9984' },
  { cx: 0.52, cy: 0.88, r: 2, color: '#2ABFAD' },
  { cx: 0.72, cy: 0.92, r: 3, color: '#F5A623' },
  { cx: 0.88, cy: 0.86, r: 2, color: '#0D9984' },
]

const hexEdges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [11, 12], [12, 13], [13, 14], [14, 15],
  [0, 6], [1, 7], [2, 8], [3, 9],
  [6, 12], [7, 13], [8, 14], [9, 15],
]

/* ─── keyframes ─── */
const animCSS = particles.map((p, i) => `
  .wc-float-${i}{animation:wcF${i} ${p.dur} ease-in-out infinite}
  @keyframes wcF${i}{
    0%,100%{transform:translate(0,0)}
    25%{transform:translate(${p.dx * 0.6}px,${p.dy * 0.4}px)}
    50%{transform:translate(${p.dx}px,${p.dy}px)}
    75%{transform:translate(${p.dx * 0.3}px,${p.dy * 0.7}px)}
  }
`).join('') + `
  .wc-orb-a{animation:wcOrbA 26s ease-in-out infinite}
  .wc-orb-b{animation:wcOrbB 32s ease-in-out infinite}
  @keyframes wcOrbA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,15px) scale(0.95)}}
  @keyframes wcOrbB{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-25px,18px) scale(1.04)}66%{transform:translate(18px,-22px) scale(0.96)}}
`

function AnimatedCheck({ delay }: { delay: number }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-secondary"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M8 12l3 3 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  )
}

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const trailPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  /* constellation refs */
  const svgRef = useRef<SVGSVGElement>(null)
  const nodesRef = useRef<(SVGCircleElement | null)[]>([])
  const linesRef = useRef<(SVGLineElement | null)[]>([])
  const normalizedMouse = useRef({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    normalizedMouse.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const mql = window.matchMedia('(pointer: fine)')
    if (!mql.matches) return

    section.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      /* glow follow */
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.04
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.04
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 300}px, ${posRef.current.y - 300}px)`
      }

      /* trail follow (slower) */
      trailPosRef.current.x += (mouseRef.current.x - trailPosRef.current.x) * 0.02
      trailPosRef.current.y += (mouseRef.current.y - trailPosRef.current.y) * 0.02
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPosRef.current.x - 12}px, ${trailPosRef.current.y - 12}px)`
      }

      /* constellation nodes */
      const svg = svgRef.current
      if (svg) {
        const w = svg.clientWidth
        const h = svg.clientHeight
        const mx = normalizedMouse.current.x
        const my = normalizedMouse.current.y

        hexNodes.forEach((node, i) => {
          const el = nodesRef.current[i]
          if (!el) return
          const offsetX = (mx - 0.5) * 40 * (0.4 + (i % 3) * 0.2)
          const offsetY = (my - 0.5) * 40 * (0.4 + (i % 3) * 0.2)
          const cx = node.cx * w + offsetX
          const cy = node.cy * h + offsetY
          el.setAttribute('cx', String(cx))
          el.setAttribute('cy', String(cy))

          const dist = Math.hypot(mx - node.cx, my - node.cy)
          const opacity = Math.max(0.06, Math.min(0.4, 0.7 - dist * 1.2))
          el.setAttribute('opacity', String(opacity))
        })

        hexEdges.forEach((edge, i) => {
          const line = linesRef.current[i]
          if (!line) return
          const a = nodesRef.current[edge[0]]
          const b = nodesRef.current[edge[1]]
          if (!a || !b) return
          line.setAttribute('x1', a.getAttribute('cx') ?? '0')
          line.setAttribute('y1', a.getAttribute('cy') ?? '0')
          line.setAttribute('x2', b.getAttribute('cx') ?? '0')
          line.setAttribute('y2', b.getAttribute('cy') ?? '0')

          const nodeA = hexNodes[edge[0]]
          const nodeB = hexNodes[edge[1]]
          if (!nodeA || !nodeB) return
          const midDist = Math.hypot(mx - (nodeA.cx + nodeB.cx) / 2, my - (nodeA.cy + nodeB.cy) / 2)
          const lineOpacity = Math.max(0.01, Math.min(0.08, 0.15 - midDist * 0.3))
          line.setAttribute('opacity', String(lineOpacity))
        })
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
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-20 md:py-28 lg:py-32" style={{ background: 'linear-gradient(160deg, #0B2A3F 0%, #0A1E30 35%, #081620 70%, #050E18 100%)' }}>
      <style>{animCSS}</style>

      {/* ── subtle grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(13,153,132,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(13,153,132,0.3) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />

      {/* ── ambient orbs ── */}
      <div
        className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[130px] wc-orb-a pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,153,132,0.5) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[110px] wc-orb-b pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(2,80,128,0.4) 0%, transparent 70%)' }}
      />

      {/* ── constellation SVG ── */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="wcMouseGlow">
            <stop offset="0%" stopColor="#0D9984" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#025080" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#025080" stopOpacity="0" />
          </radialGradient>
        </defs>

        {hexEdges.map((_edge, i) => (
          <line
            key={`wc-edge-${i}`}
            ref={(el) => { linesRef.current[i] = el }}
            stroke="rgba(13,153,132,0.1)"
            strokeWidth="0.5"
            opacity="0.03"
          />
        ))}

        {hexNodes.map((node, i) => (
          <circle
            key={`wc-node-${i}`}
            ref={(el) => { nodesRef.current[i] = el }}
            r={node.r}
            fill={node.color}
            opacity="0.1"
            cx={`${node.cx * 100}%`}
            cy={`${node.cy * 100}%`}
          />
        ))}
      </svg>

      {/* ── floating particles ── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={`wc-p-${i}`}
            className={`absolute wc-float-${i}`}
            style={{ left: p.x, top: p.y }}
          >
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: `rgba(${p.color},${p.opacity})`,
                boxShadow: `0 0 ${p.size * 3}px rgba(${p.color},${p.opacity * 0.5})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── mouse-follow glow ── */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(13,153,132,0.5) 0%, rgba(2,80,128,0.15) 50%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />

      {/* ── mouse-follow dot trail ── */}
      <div
        ref={trailRef}
        className="absolute top-0 left-0 pointer-events-none hidden lg:block"
        style={{ willChange: 'transform', zIndex: 2 }}
      >
        <div
          className="rounded-full"
          style={{
            width: 24,
            height: 24,
            border: '1.5px solid rgba(13,153,132,0.12)',
            background: 'radial-gradient(circle, rgba(13,153,132,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── content ── */}
      <Container className="relative z-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — content */}
          <div className="lg:w-1/2">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <div className="h-[2px] w-8 bg-secondary-400" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary-400">{whyChoose.label}</span>
              </div>
            </ScrollReveal>
            <SplitText as="h2" className="mt-4 font-heading text-[26px] font-bold text-white sm:text-[32px] md:text-[40px] lg:text-[48px] lg:leading-[56px]">
              {whyChoose.headline}
            </SplitText>

            {/* Reason cards */}
            <div className="mt-10 flex flex-col gap-4">
              {whyChoose.reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5 transition-all duration-300 hover:translate-x-1 hover:bg-white/[0.07] hover:border-white/[0.12]"
                >
                  <div className="mt-0.5">
                    <AnimatedCheck delay={0.2 + i * 0.1} />
                  </div>
                  <div>
                    <h4 className="font-heading text-[16px] font-semibold text-white">
                      {reason.title}
                    </h4>
                    <p className="mt-1 text-[14px] leading-[1.7] text-white/50">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vision callout */}
            <ScrollReveal delay={0.3} className="mt-8">
              <div className="rounded-xl border-l-4 border-secondary bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
                <h4 className="font-heading text-[15px] font-semibold text-secondary-400">
                  {whyChoose.vision.headline}
                </h4>
                <ul className="mt-3 space-y-2">
                  {whyChoose.vision.pillars.map((pillar) => (
                    <li key={pillar} className="flex items-start gap-2 text-[14px] leading-[1.6] text-white/50">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-400" />
                      {pillar}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — visual */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Image placeholder with gradient */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.01] shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col items-center gap-5 p-5 text-center sm:p-8 md:p-10 lg:p-16">
                  {/* Animated farming illustration */}
                  <motion.svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    className="text-secondary"
                  >
                    {/* Sun */}
                    <motion.circle
                      cx="85"
                      cy="30"
                      r="15"
                      fill="rgba(245,166,35,0.2)"
                      stroke="rgba(245,166,35,0.4)"
                      strokeWidth="1"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    {/* Field */}
                    <path d="M10 80 Q60 65 110 80 L110 110 Q60 100 10 110 Z" fill="rgba(13,153,132,0.15)" stroke="rgba(13,153,132,0.3)" strokeWidth="1" />
                    {/* Crops */}
                    {[25, 45, 65, 85].map((x, i) => (
                      <motion.line
                        key={i}
                        x1={x}
                        y1={90 - i * 2}
                        x2={x}
                        y2={70 - i * 2}
                        stroke="rgba(13,153,132,0.4)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                        style={{ transformOrigin: `${x}px ${90 - i * 2}px` }}
                      />
                    ))}
                    {/* Leaves */}
                    {[25, 45, 65, 85].map((x, i) => (
                      <motion.circle
                        key={`leaf-${i}`}
                        cx={x + 3}
                        cy={68 - i * 2}
                        r="4"
                        fill="rgba(13,153,132,0.3)"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                      />
                    ))}
                  </motion.svg>

                  <h3 className="font-heading text-xl font-bold text-white">
                    Empowering Farmers
                  </h3>
                  <p className="text-sm text-white/50">
                    Technology meets tradition
                  </p>

                  {/* Stats */}
                  <div className="mt-2 grid w-full grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { num: '500+', label: 'Farmers' },
                      { num: '50+', label: 'Regions' },
                      { num: '99%', label: 'Uptime' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.06] p-3 text-center backdrop-blur-sm"
                      >
                        <div className="text-lg font-bold text-secondary-400">{stat.num}</div>
                        <div className="text-xs text-white/40">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat card — top right */}
              <motion.div
                className="absolute -top-3 right-1 hidden rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 shadow-lg backdrop-blur-md sm:block sm:-right-2 lg:-right-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌾</span>
                  <div>
                    <div className="text-sm font-bold text-white">500+</div>
                    <div className="text-[10px] text-white/40">Active Farmers</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card — bottom left */}
              <motion.div
                className="absolute -bottom-3 left-1 hidden rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 shadow-lg backdrop-blur-md sm:block sm:-left-2 lg:-left-6"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <div>
                    <div className="text-sm font-bold text-white">4.9</div>
                    <div className="text-[10px] text-white/40">User Rating</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
