import { motion } from 'framer-motion'
import Container from '../components/Container'
import MeshGradient from '../components/MeshGradient'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { finalCta } from '../content'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <MeshGradient />

      {/* Radial glow behind heading */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 blur-[100px]" />

      {/* Floating sparkle elements */}
      {[
        { x: '15%', y: '20%', size: 4, delay: 0 },
        { x: '80%', y: '30%', size: 3, delay: 1.5 },
        { x: '25%', y: '75%', size: 5, delay: 0.8 },
        { x: '70%', y: '65%', size: 3, delay: 2 },
        { x: '50%', y: '15%', size: 4, delay: 1 },
        { x: '90%', y: '80%', size: 3, delay: 0.5 },
      ].map((spark, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{ left: spark.x, top: spark.y, width: spark.size, height: spark.size }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            delay: spark.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 py-20 md:py-28 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SplitText as="h2" className="font-heading text-[32px] font-bold text-white md:text-[40px] lg:text-[52px] lg:leading-[60px]">
              {finalCta.headline}
            </SplitText>

            <ScrollReveal delay={0.3}>
              <p className="mx-auto mt-5 max-w-xl text-[18px] leading-[1.75] text-white/50">
                {finalCta.subheadline}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={0.4}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={finalCta.primaryCta.href}
                  className="group relative overflow-hidden rounded-full bg-accent px-10 py-4 text-[16px] font-semibold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow"
                >
                  <span className="relative z-10">{finalCta.primaryCta.label}</span>
                  <div
                    className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    style={{ backgroundSize: '200% 100%' }}
                  />
                </a>
                <a
                  href={finalCta.secondaryCta.href}
                  className="rounded-full border border-white/20 px-10 py-4 text-[16px] font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  {finalCta.secondaryCta.label}
                </a>
              </div>
            </ScrollReveal>

            {/* Trust badge */}
            <ScrollReveal delay={0.5}>
              <p className="mt-8 flex items-center justify-center gap-2 text-[14px] text-white/30">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                {finalCta.trustBadge}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </div>
    </section>
  )
}
