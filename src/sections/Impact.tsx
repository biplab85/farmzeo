import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import StatCounter from '../components/StatCounter'
import { impact } from '../content'

/* ─── cursor trail config ─── */
const cursorTrails = [
  { size: 5, color: '13,153,132', opacity: 0.35, speed: 0.045, ox: 25, oy: 20 },
  { size: 4, color: '2,80,128', opacity: 0.3, speed: 0.03, ox: -30, oy: -15 },
  { size: 3, color: '245,166,35', opacity: 0.25, speed: 0.02, ox: 15, oy: -30 },
  { size: 6, color: '13,153,132', opacity: 0.2, speed: 0.012, ox: -20, oy: 25 },
]

/* ─── floating particles config ─── */
const particles = [
  { size: 5, x: '7%', y: '15%', color: '13,153,132', opacity: 0.2, dur: '24s', dx: 30, dy: -35 },
  { size: 3, x: '92%', y: '22%', color: '2,80,128', opacity: 0.25, dur: '20s', dx: -20, dy: 25 },
  { size: 4, x: '15%', y: '75%', color: '245,166,35', opacity: 0.15, dur: '28s', dx: 25, dy: -20 },
  { size: 3, x: '85%', y: '80%', color: '13,153,132', opacity: 0.2, dur: '22s', dx: -15, dy: -30 },
  { size: 6, x: '50%', y: '10%', color: '2,80,128', opacity: 0.12, dur: '30s', dx: 20, dy: 25 },
  { size: 4, x: '30%', y: '90%', color: '245,166,35', opacity: 0.18, dur: '26s', dx: -25, dy: -15 },
  { size: 3, x: '70%', y: '50%', color: '13,153,132', opacity: 0.15, dur: '32s', dx: 30, dy: 20 },
  { size: 5, x: '5%', y: '50%', color: '2,80,128', opacity: 0.1, dur: '36s', dx: 15, dy: -25 },
  { size: 4, x: '95%', y: '55%', color: '245,166,35', opacity: 0.14, dur: '34s', dx: -20, dy: 15 },
  { size: 3, x: '40%', y: '30%', color: '13,153,132', opacity: 0.16, dur: '25s', dx: -15, dy: 20 },
]

/* ─── constellation nodes for SVG mouse-follow ─── */
const constellationNodes = [
  { baseX: 0.08, baseY: 0.12, r: 2.5, color: '#0D9984', drift: 0.6 },
  { baseX: 0.25, baseY: 0.08, r: 2, color: '#2ABFAD', drift: 0.8 },
  { baseX: 0.42, baseY: 0.15, r: 3, color: '#025080', drift: 0.5 },
  { baseX: 0.58, baseY: 0.06, r: 2, color: '#0D9984', drift: 0.7 },
  { baseX: 0.75, baseY: 0.13, r: 2.5, color: '#F5A623', drift: 0.65 },
  { baseX: 0.92, baseY: 0.1, r: 2, color: '#025080', drift: 0.55 },
  { baseX: 0.05, baseY: 0.45, r: 2, color: '#2ABFAD', drift: 0.75 },
  { baseX: 0.18, baseY: 0.55, r: 3, color: '#0D9984', drift: 0.5 },
  { baseX: 0.35, baseY: 0.48, r: 2, color: '#F5A623', drift: 0.85 },
  { baseX: 0.52, baseY: 0.52, r: 2.5, color: '#025080', drift: 0.6 },
  { baseX: 0.68, baseY: 0.45, r: 2, color: '#0D9984', drift: 0.7 },
  { baseX: 0.85, baseY: 0.5, r: 3, color: '#2ABFAD', drift: 0.55 },
  { baseX: 0.95, baseY: 0.42, r: 2, color: '#F5A623', drift: 0.65 },
  { baseX: 0.1, baseY: 0.85, r: 2.5, color: '#025080', drift: 0.6 },
  { baseX: 0.28, baseY: 0.9, r: 2, color: '#0D9984', drift: 0.8 },
  { baseX: 0.48, baseY: 0.88, r: 3, color: '#2ABFAD', drift: 0.5 },
  { baseX: 0.65, baseY: 0.92, r: 2, color: '#F5A623', drift: 0.7 },
  { baseX: 0.82, baseY: 0.85, r: 2.5, color: '#0D9984', drift: 0.55 },
  { baseX: 0.96, baseY: 0.9, r: 2, color: '#025080', drift: 0.75 },
]

const constellationEdges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
  [1, 8], [3, 10], [8, 15], [10, 16],
  [2, 9], [9, 15], [4, 11], [11, 17],
]

const progressWidths = ['30%', '50%', '100%']

/* ─── dynamic keyframes for particles + orbs ─── */
const particleCSS = particles.map((p, i) => `
  .impact-float-${i}{animation:impF${i} ${p.dur} ease-in-out infinite}
  @keyframes impF${i}{
    0%,100%{transform:translate(0,0)}
    25%{transform:translate(${p.dx * 0.6}px,${p.dy * 0.4}px)}
    50%{transform:translate(${p.dx}px,${p.dy}px)}
    75%{transform:translate(${p.dx * 0.3}px,${p.dy * 0.7}px)}
  }
`).join('')

const orbCSS = `
  .impact-orb-a{animation:impOrbA 26s ease-in-out infinite}
  .impact-orb-b{animation:impOrbB 32s ease-in-out infinite}
  .impact-orb-c{animation:impOrbC 28s ease-in-out infinite}
  @keyframes impOrbA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.06)}66%{transform:translate(-30px,25px) scale(0.94)}}
  @keyframes impOrbB{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-35px,20px) scale(1.05)}66%{transform:translate(25px,-25px) scale(0.95)}}
  @keyframes impOrbC{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,30px) scale(1.04)}66%{transform:translate(-25px,-20px) scale(0.96)}}
`

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const trailPos = useRef(cursorTrails.map((t) => ({ x: 0, y: 0, speed: t.speed, ox: t.ox, oy: t.oy })))
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  /* constellation refs */
  const svgRef = useRef<SVGSVGElement>(null)
  const nodesRef = useRef<(SVGCircleElement | null)[]>([])
  const linesRef = useRef<(SVGLineElement | null)[]>([])
  const svgGlowRef = useRef<SVGCircleElement>(null)
  const normalizedMouse = useRef({ x: 0.5, y: 0.5 })

  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

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

    /* skip mouse tracking on touch devices */
    const mql = window.matchMedia('(pointer: fine)')
    if (!mql.matches) return

    section.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      /* ── main glow follow ── */
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.05
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.05
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 350}px, ${posRef.current.y - 350}px)`
      }

      /* ── cursor trail particles ── */
      trailPos.current.forEach((tp, i) => {
        const tx = mouseRef.current.x + tp.ox
        const ty = mouseRef.current.y + tp.oy
        tp.x += (tx - tp.x) * tp.speed
        tp.y += (ty - tp.y) * tp.speed
        const el = trailRefs.current[i]
        if (el) el.style.transform = `translate(${tp.x}px, ${tp.y}px)`
      })

      /* ── constellation SVG follow ── */
      const svg = svgRef.current
      if (svg) {
        const w = svg.clientWidth
        const h = svg.clientHeight
        const mx = normalizedMouse.current.x
        const my = normalizedMouse.current.y

        constellationNodes.forEach((node, i) => {
          const el = nodesRef.current[i]
          if (!el) return
          const offsetX = (mx - 0.5) * node.drift * 60
          const offsetY = (my - 0.5) * node.drift * 60
          const cx = node.baseX * w + offsetX
          const cy = node.baseY * h + offsetY
          el.setAttribute('cx', String(cx))
          el.setAttribute('cy', String(cy))

          const dist = Math.hypot(mx - node.baseX, my - node.baseY)
          const opacity = Math.max(0.1, Math.min(0.6, 1 - dist * 1.5))
          el.setAttribute('opacity', String(opacity))
        })

        constellationEdges.forEach((edge, i) => {
          const line = linesRef.current[i]
          if (!line) return
          const a = nodesRef.current[edge[0]]
          const b = nodesRef.current[edge[1]]
          if (!a || !b) return
          line.setAttribute('x1', a.getAttribute('cx') ?? '0')
          line.setAttribute('y1', a.getAttribute('cy') ?? '0')
          line.setAttribute('x2', b.getAttribute('cx') ?? '0')
          line.setAttribute('y2', b.getAttribute('cy') ?? '0')

          const nodeA = constellationNodes[edge[0]]
          const nodeB = constellationNodes[edge[1]]
          if (!nodeA || !nodeB) return
          const midX = (nodeA.baseX + nodeB.baseX) / 2
          const midY = (nodeA.baseY + nodeB.baseY) / 2
          const midDist = Math.hypot(mx - midX, my - midY)
          const lineOpacity = Math.max(0.02, Math.min(0.12, 0.25 - midDist * 0.4))
          line.setAttribute('opacity', String(lineOpacity))
        })

        if (svgGlowRef.current) {
          svgGlowRef.current.setAttribute('cx', String(mx * w))
          svgGlowRef.current.setAttribute('cy', String(my * h))
        }
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      {/* ── injected keyframe styles ── */}
      <style>{particleCSS + orbCSS}</style>

      {/* ══════════════ PREMIUM BACKGROUND LAYERS ══════════════ */}

      {/* Layer 1: Deep dark gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, #021B33 0%, #03253F 20%, #025050 40%, #023A4A 65%, #021B33 100%)',
        }}
      />

      {/* Layer 2: Aurora gradient mesh */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(13,153,132,0.45) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(2,80,128,0.4) 0%, transparent 55%)',
            'radial-gradient(ellipse 50% 40% at 50% 80%, rgba(245,166,35,0.25) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Layer 3: Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(13,153,132,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(13,153,132,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Layer 4: Horizon glow line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 5%, rgba(13,153,132,0.2) 25%, rgba(2,80,128,0.25) 50%, rgba(245,166,35,0.15) 75%, transparent 95%)',
        }}
      />

      {/* Layer 5: Animated ambient orbs */}
      <div
        className="absolute -top-48 -left-24 w-[700px] h-[700px] rounded-full opacity-[0.07] blur-[140px] impact-orb-a"
        style={{
          background: 'radial-gradient(circle, rgba(13,153,132,0.6) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px] impact-orb-b"
        style={{
          background: 'radial-gradient(circle, rgba(2,80,128,0.5) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] impact-orb-c"
        style={{
          background: 'radial-gradient(circle, rgba(245,166,35,0.4) 0%, transparent 70%)',
        }}
      />

      {/* ══════════════ CONSTELLATION SVG ══════════════ */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="impMouseGlow">
            <stop offset="0%" stopColor="#0D9984" stopOpacity="0.10" />
            <stop offset="60%" stopColor="#025080" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#025080" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* cursor-follow SVG glow */}
        <circle ref={svgGlowRef} r="200" fill="url(#impMouseGlow)" cx="50%" cy="50%" />

        {/* constellation edges */}
        {constellationEdges.map((_edge, i) => (
          <line
            key={`edge-${i}`}
            ref={(el) => { linesRef.current[i] = el }}
            stroke="rgba(13,153,132,0.15)"
            strokeWidth="0.5"
            opacity="0.05"
          />
        ))}

        {/* constellation nodes */}
        {constellationNodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            ref={(el) => { nodesRef.current[i] = el }}
            r={node.r}
            fill={node.color}
            opacity="0.15"
            cx={`${node.baseX * 100}%`}
            cy={`${node.baseY * 100}%`}
          />
        ))}
      </svg>

      {/* ══════════════ FLOATING PARTICLES ══════════════ */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute impact-float-${i}`}
            style={{ left: p.x, top: p.y }}
          >
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: `rgba(${p.color},${p.opacity})`,
                boxShadow: `0 0 ${p.size * 3}px rgba(${p.color},${p.opacity * 0.6})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* ══════════════ MOUSE-FOLLOW GLOW ══════════════ */}
      <div
        ref={glowRef}
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.06] pointer-events-none hidden lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(13,153,132,0.5) 0%, rgba(2,80,128,0.2) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* ══════════════ CURSOR TRAIL PARTICLES ══════════════ */}
      {cursorTrails.map((t, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => { trailRefs.current[i] = el }}
          className="absolute top-0 left-0 pointer-events-none hidden lg:block"
          style={{
            opacity: isLoaded ? t.opacity : 0,
            transition: 'opacity 0.8s ease',
            willChange: 'transform',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: t.size,
              height: t.size,
              borderRadius: '50%',
              background: `rgba(${t.color},0.9)`,
              boxShadow: `0 0 ${t.size * 4}px rgba(${t.color},0.4)`,
            }}
          />
        </div>
      ))}

      {/* ══════════════ CONTENT ══════════════ */}
      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3">
              <div className="h-[2px] w-8 bg-white/40" />
              <span className="text-[13px] font-bold uppercase tracking-[3px] text-white/70">{impact.label}</span>
              <div className="h-[2px] w-8 bg-white/40" />
            </div>
          </ScrollReveal>
          <SplitText as="h2" className="mx-auto mt-4 max-w-3xl font-heading text-[26px] font-bold text-white sm:text-[32px] md:text-[40px] lg:text-[48px] lg:leading-[56px]">
            {impact.headline}
          </SplitText>
        </div>

        {/* Stats card */}
        <div className="mx-auto mt-14 max-w-4xl lg:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/[0.08] p-5 backdrop-blur-md sm:p-8 lg:p-12"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(13,153,132,0.03) 50%, rgba(255,255,255,0.02) 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">
              {impact.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`relative text-center ${i < impact.metrics.length - 1 ? 'sm:border-r sm:border-white/[0.06]' : ''}`}
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  {/* hover spotlight */}
                  <div
                    className="absolute inset-0 rounded-xl transition-opacity duration-500"
                    style={{
                      opacity: hoveredStat === i ? 1 : 0,
                      background:
                        'radial-gradient(ellipse at center, rgba(13,153,132,0.06) 0%, transparent 70%)',
                    }}
                  />

                  <div className="relative">
                    <StatCounter
                      value={metric.value}
                      label={metric.label}
                      className="[&>div:first-child]:text-[40px] sm:[&>div:first-child]:text-[48px] [&>div:first-child]:font-extrabold [&>div:first-child]:text-white lg:[&>div:first-child]:text-[64px] [&>div:nth-child(2)]:mt-2 [&>div:nth-child(2)]:text-[14px] [&>div:nth-child(2)]:font-medium [&>div:nth-child(2)]:text-white/70"
                    />

                    {/* Progress bar */}
                    <div className="mx-auto mt-4 h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, rgba(13,153,132,0.8), rgba(42,191,173,0.9))',
                          boxShadow: '0 0 12px rgba(13,153,132,0.4)',
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: progressWidths[i] ?? '50%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>

                    <p className="mx-auto mt-4 max-w-[200px] text-[14px] leading-[1.6] text-white/50">
                      {metric.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
