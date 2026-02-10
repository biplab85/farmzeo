import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { iconMap } from '../components/Icons'
import { contact } from '../content'

/* ─── social icon paths ─── */
const socialIcons: Record<string, { path: string; color: string }> = {
  facebook: {
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
    color: '#1877F2',
  },
  twitter: {
    path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
    color: '#000000',
  },
  instagram: {
    path: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z',
    color: '#E4405F',
  },
  linkedin: {
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z',
    color: '#0A66C2',
  },
}

/* ─── abstract world map dots (simplified continent shapes as dot clusters) ─── */
/* viewBox: 1200x600, Mercator-ish layout */
const mapDots: { cx: number; cy: number; r: number }[] = [
  /* ── North America ── */
  {cx:180,cy:140,r:2.5},{cx:195,cy:135,r:2},{cx:210,cy:130,r:2.5},{cx:225,cy:132,r:2},
  {cx:190,cy:155,r:2},{cx:205,cy:150,r:2.5},{cx:220,cy:148,r:2},{cx:235,cy:145,r:2},
  {cx:200,cy:170,r:2.5},{cx:215,cy:165,r:2},{cx:230,cy:160,r:2},{cx:245,cy:155,r:2.5},
  {cx:210,cy:185,r:2},{cx:225,cy:180,r:2.5},{cx:240,cy:175,r:2},{cx:255,cy:170,r:2},
  {cx:220,cy:200,r:2},{cx:235,cy:195,r:2},{cx:250,cy:190,r:2.5},
  /* ── South America ── */
  {cx:280,cy:310,r:2.5},{cx:290,cy:325,r:2},{cx:285,cy:340,r:2.5},{cx:295,cy:355,r:2},
  {cx:290,cy:370,r:2},{cx:285,cy:385,r:2.5},{cx:280,cy:400,r:2},{cx:275,cy:415,r:2},
  {cx:300,cy:330,r:2},{cx:305,cy:345,r:2.5},{cx:300,cy:360,r:2},{cx:295,cy:380,r:2},
  /* ── Europe ── */
  {cx:520,cy:120,r:2.5},{cx:535,cy:115,r:2},{cx:550,cy:118,r:2},{cx:565,cy:122,r:2.5},
  {cx:525,cy:135,r:2},{cx:540,cy:130,r:2.5},{cx:555,cy:133,r:2},{cx:570,cy:138,r:2},
  {cx:530,cy:150,r:2},{cx:545,cy:148,r:2.5},{cx:560,cy:145,r:2},{cx:580,cy:150,r:2},
  {cx:535,cy:165,r:2.5},{cx:550,cy:162,r:2},{cx:565,cy:158,r:2},
  /* ── Africa ── */
  {cx:555,cy:240,r:2.5},{cx:570,cy:235,r:2},{cx:585,cy:238,r:2},{cx:565,cy:255,r:2},
  {cx:580,cy:252,r:2.5},{cx:595,cy:250,r:2},{cx:570,cy:270,r:2},{cx:585,cy:268,r:2.5},
  {cx:575,cy:285,r:2},{cx:590,cy:282,r:2},{cx:580,cy:300,r:2.5},{cx:575,cy:315,r:2},
  {cx:585,cy:330,r:2},{cx:580,cy:345,r:2},{cx:570,cy:355,r:2},
  /* ── Asia ── */
  {cx:650,cy:120,r:2},{cx:670,cy:115,r:2.5},{cx:690,cy:118,r:2},{cx:710,cy:122,r:2.5},
  {cx:730,cy:125,r:2},{cx:660,cy:140,r:2.5},{cx:680,cy:135,r:2},{cx:700,cy:138,r:2},
  {cx:720,cy:140,r:2.5},{cx:740,cy:142,r:2},{cx:670,cy:160,r:2},{cx:690,cy:155,r:2.5},
  {cx:710,cy:158,r:2},{cx:730,cy:160,r:2},{cx:750,cy:155,r:2.5},
  {cx:680,cy:175,r:2},{cx:700,cy:172,r:2.5},{cx:720,cy:175,r:2},{cx:740,cy:178,r:2},
  /* ── India (highlighted) ── */
  {cx:720,cy:220,r:3},{cx:735,cy:215,r:2.5},{cx:730,cy:235,r:3},{cx:725,cy:250,r:2.5},
  {cx:740,cy:230,r:2.5},{cx:735,cy:248,r:2},{cx:728,cy:265,r:2},
  /* ── SE Asia + Australia ── */
  {cx:800,cy:195,r:2},{cx:820,cy:200,r:2.5},{cx:840,cy:205,r:2},{cx:815,cy:215,r:2},
  {cx:835,cy:220,r:2.5},{cx:855,cy:210,r:2},
  {cx:870,cy:360,r:2.5},{cx:890,cy:355,r:2},{cx:910,cy:358,r:2},{cx:880,cy:375,r:2.5},
  {cx:900,cy:370,r:2},{cx:920,cy:368,r:2},{cx:890,cy:390,r:2},{cx:905,cy:385,r:2.5},
]

/* ─── connection nodes with pulse ─── */
const mapNodes = [
  { cx: 720, cy: 235, r: 4, primary: true },  // India
  { cx: 550, cy: 140, r: 2.5, primary: false }, // Europe
  { cx: 215, cy: 165, r: 2.5, primary: false }, // N. America
  { cx: 580, cy: 270, r: 2.5, primary: false }, // Africa
  { cx: 830, cy: 210, r: 2.5, primary: false }, // SE Asia
  { cx: 890, cy: 370, r: 2.5, primary: false }, // Australia
  { cx: 290, cy: 350, r: 2.5, primary: false }, // S. America
]

const mapArcs: [number, number][] = [
  [0, 1], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [2, 6], [4, 5],
]

/* ─── animated map keyframes ─── */
const mapCSS = `
  .map-pulse-a{animation:mPulseA 4s ease-in-out infinite}
  .map-pulse-b{animation:mPulseB 5s ease-in-out infinite}
  @keyframes mPulseA{0%,100%{opacity:0.06}50%{opacity:0.12}}
  @keyframes mPulseB{0%,100%{opacity:0.04}50%{opacity:0.1}}
  .map-ring{animation:mRing 3s ease-out infinite}
  @keyframes mRing{0%{r:6;opacity:0.5;stroke-width:1.5}100%{r:22;opacity:0;stroke-width:0.3}}
  .map-arc{animation:mArc 4s linear infinite}
  @keyframes mArc{0%{stroke-dashoffset:300}100%{stroke-dashoffset:0}}
  .map-node-a{animation:mNodeA 3.5s ease-in-out infinite}
  .map-node-b{animation:mNodeB 4.5s ease-in-out infinite}
  @keyframes mNodeA{0%,100%{opacity:0.3}50%{opacity:0.7}}
  @keyframes mNodeB{0%,100%{opacity:0.25}50%{opacity:0.6}}
  .map-drift{animation:mDrift 30s ease-in-out infinite}
  @keyframes mDrift{0%,100%{transform:translate(0,0)}50%{transform:translate(-8px,4px)}}
`

/* ─── main Contact component ─── */
export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  /* ── simple cursor glow ── */
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
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
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.05
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.05
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 250}px, ${posRef.current.y - 250}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-20 md:py-28 lg:py-32" style={{ background: 'linear-gradient(180deg, #F7FAFA 0%, #EEF5F4 50%, #F7FAFA 100%)' }}>
      <style>{mapCSS}</style>

      {/* ── abstract world map background ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 1200 600" fill="none" className="w-full h-full max-h-full map-drift" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="mapNodeGlow">
              <stop offset="0%" stopColor="#0D9984" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0D9984" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mapArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9984" stopOpacity="0" />
              <stop offset="50%" stopColor="#0D9984" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0D9984" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* continent dot clusters */}
          {mapDots.map((dot, i) => (
            <circle
              key={`dot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="rgba(13,153,132,0.08)"
              className={i % 2 === 0 ? 'map-pulse-a' : 'map-pulse-b'}
            />
          ))}

          {/* connection arcs */}
          {mapArcs.map((arc, i) => {
            const a = mapNodes[arc[0]]
            const b = mapNodes[arc[1]]
            if (!a || !b) return null
            const midX = (a.cx + b.cx) / 2
            const midY = Math.min(a.cy, b.cy) - 40 - (i % 3) * 15
            return (
              <path
                key={`arc-${i}`}
                d={`M${a.cx},${a.cy} Q${midX},${midY} ${b.cx},${b.cy}`}
                stroke="url(#mapArcGrad)"
                strokeWidth="0.8"
                fill="none"
                strokeDasharray="10 15"
                className="map-arc"
                style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${3 + i * 0.4}s` }}
              />
            )
          })}

          {/* connection nodes */}
          {mapNodes.map((node, i) => (
            <g key={`mnode-${i}`}>
              {node.primary && (
                <>
                  <circle cx={node.cx} cy={node.cy} r="6" stroke="#0D9984" strokeWidth="1.5" fill="none" className="map-ring" />
                  <circle cx={node.cx} cy={node.cy} r="6" stroke="#0D9984" strokeWidth="1" fill="none" className="map-ring" style={{ animationDelay: '1s' }} />
                  <circle cx={node.cx} cy={node.cy} r="14" fill="url(#mapNodeGlow)" />
                </>
              )}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.primary ? 3.5 : 2}
                fill={node.primary ? '#0D9984' : 'rgba(13,153,132,0.4)'}
                className={i % 2 === 0 ? 'map-node-a' : 'map-node-b'}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* ── cursor follow glow ── */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(13,153,132,0.5) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* ── soft ambient orbs ── */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(13,153,132,0.5) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.03] blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(2,80,128,0.4) 0%, transparent 70%)' }} />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3">
              <div className="h-[2px] w-8 bg-secondary" />
              <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary">{contact.label}</span>
              <div className="h-[2px] w-8 bg-secondary" />
            </div>
          </ScrollReveal>
          <SplitText as="h2" className="mx-auto mt-4 max-w-3xl font-heading text-[26px] font-bold text-primary-600 sm:text-[32px] md:text-[40px] lg:text-[48px] lg:leading-[56px]">
            {contact.headline}
          </SplitText>
          <ScrollReveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.75] text-gray-500 sm:text-[17px]">
              {contact.subheadline}
            </p>
          </ScrollReveal>
        </div>

        {/* Globe + contact info + form */}
        <div className="mx-auto mt-14 max-w-5xl lg:mt-16">

          <div className="flex flex-col gap-6 sm:gap-10 lg:flex-row lg:gap-12">
            {/* Left — contact options */}
            <ScrollReveal direction="left" className="lg:w-[38%]">
              <div className="flex flex-col gap-4">
                {contact.options.map((option, i) => {
                  const Icon = iconMap[option.icon]
                  return (
                    <motion.div
                      key={option.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group flex items-start gap-4 rounded-xl border border-gray-200/60 bg-white/80 p-4 backdrop-blur-sm shadow-sm sm:p-5 transition-all duration-300 hover:translate-x-1 hover:shadow-md hover:border-secondary/20"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(13,153,132,0.25)]">
                        {Icon && <Icon size={20} />}
                      </div>
                      <div>
                        <h4 className="font-heading text-[15px] font-semibold text-primary-600">
                          {option.title}
                        </h4>
                        <p className="mt-0.5 text-[14px] text-gray-500">{option.value}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Social icons */}
              <div className="mt-6 flex gap-3">
                {contact.socials.map((social) => {
                  const iconData = socialIcons[social.platform]
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      aria-label={social.platform}
                      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white border border-gray-200/60 text-gray-400 transition-all duration-300"
                    >
                      <div className="absolute inset-0 scale-0 rounded-xl transition-transform duration-300 group-hover:scale-100" style={{ backgroundColor: iconData?.color ?? '#0D9984' }} />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        <path d={iconData?.path ?? ''} />
                      </svg>
                    </a>
                  )
                })}
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal direction="right" className="lg:w-[62%]">
              <div className="rounded-2xl border border-gray-200/60 bg-white/90 p-5 shadow-lg backdrop-blur-sm sm:p-6 md:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                      >
                        <motion.svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#22C55E"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.path
                            d="M20 6L9 17l-5-5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          />
                        </motion.svg>
                      </motion.div>
                      <h3 className="mt-4 font-heading text-xl font-bold text-primary-600">
                        Thank you!
                      </h3>
                      <p className="mt-2 text-gray-500">
                        We&apos;ve received your message and will get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Honeypot */}
                      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                      {/* Name */}
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className={`absolute left-4 transition-all duration-200 ${
                            focusedField === 'name' || formState.name
                              ? '-top-2.5 bg-white px-1 text-[12px] text-secondary'
                              : 'top-3.5 text-[15px] text-gray-400'
                          }`}
                        >
                          Your full name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full rounded-xl border-[1.5px] border-gray-200 bg-white px-4 py-3.5 text-[15px] text-primary-600 outline-none transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(13,153,132,0.1)]"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label
                          htmlFor="email"
                          className={`absolute left-4 transition-all duration-200 ${
                            focusedField === 'email' || formState.email
                              ? '-top-2.5 bg-white px-1 text-[12px] text-secondary'
                              : 'top-3.5 text-[15px] text-gray-400'
                          }`}
                        >
                          you@example.com
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full rounded-xl border-[1.5px] border-gray-200 bg-white px-4 py-3.5 text-[15px] text-primary-600 outline-none transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(13,153,132,0.1)]"
                        />
                      </div>

                      {/* Interest */}
                      <div className="relative">
                        <label htmlFor="interest" className="mb-1.5 block text-[13px] font-medium text-gray-500">
                          I am a...
                        </label>
                        <select
                          id="interest"
                          required
                          value={formState.interest}
                          onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                          className="w-full rounded-xl border-[1.5px] border-gray-200 bg-white px-4 py-3.5 text-[15px] text-primary-600 outline-none transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(13,153,132,0.1)]"
                        >
                          <option value="">Select an option</option>
                          <option value="farmer">Farmer</option>
                          <option value="investor">Investor</option>
                          <option value="partner">Partner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <label
                          htmlFor="message"
                          className={`absolute left-4 transition-all duration-200 ${
                            focusedField === 'message' || formState.message
                              ? '-top-2.5 bg-white px-1 text-[12px] text-secondary'
                              : 'top-3.5 text-[15px] text-gray-400'
                          }`}
                        >
                          Tell us how we can help...
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full resize-none rounded-xl border-[1.5px] border-gray-200 bg-white px-4 py-3.5 text-[15px] text-primary-600 outline-none transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(13,153,132,0.1)]"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-xl bg-accent py-3.5 text-[15px] font-semibold sm:py-4 sm:text-[16px] text-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Send Message
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                        <div
                          className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{ backgroundSize: '200% 100%' }}
                        />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
