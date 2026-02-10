import { motion } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { whyChoose } from '../content'

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
  return (
    <section id="about" className="bg-light py-20 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — content */}
          <div className="lg:w-1/2">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <div className="h-[2px] w-8 bg-secondary" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary">{whyChoose.label}</span>
              </div>
            </ScrollReveal>
            <SplitText as="h2" className="mt-4 font-heading text-[32px] font-bold text-primary-600 md:text-[40px] lg:text-[48px] lg:leading-[56px]">
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
                  className="group flex gap-4 rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                >
                  <div className="mt-0.5">
                    <AnimatedCheck delay={0.2 + i * 0.1} />
                  </div>
                  <div>
                    <h4 className="font-heading text-[16px] font-semibold text-primary-600">
                      {reason.title}
                    </h4>
                    <p className="mt-1 text-[14px] leading-[1.7] text-gray-500">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vision callout */}
            <ScrollReveal delay={0.3} className="mt-8">
              <div className="rounded-xl border-l-4 border-secondary bg-secondary-50 p-6">
                <h4 className="font-heading text-[15px] font-semibold text-secondary-600">
                  {whyChoose.vision.headline}
                </h4>
                <ul className="mt-3 space-y-2">
                  {whyChoose.vision.pillars.map((pillar) => (
                    <li key={pillar} className="flex items-start gap-2 text-[14px] leading-[1.6] text-gray-500">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
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
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 shadow-xl">
                <div className="flex flex-col items-center gap-5 p-12 text-center lg:p-16">
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

                  <h3 className="font-heading text-xl font-bold text-primary-600">
                    Empowering Farmers
                  </h3>
                  <p className="text-sm text-gray-500">
                    Technology meets tradition
                  </p>

                  {/* Stats */}
                  <div className="mt-2 grid w-full grid-cols-3 gap-3">
                    {[
                      { num: '500+', label: 'Farmers' },
                      { num: '50+', label: 'Regions' },
                      { num: '99%', label: 'Uptime' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl bg-white/70 p-3 text-center backdrop-blur-sm shadow-sm"
                      >
                        <div className="text-lg font-bold text-secondary">{stat.num}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat card — top right */}
              <motion.div
                className="absolute -right-2 -top-3 rounded-xl border border-gray-200/50 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm lg:-right-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌾</span>
                  <div>
                    <div className="text-sm font-bold text-primary-600">500+</div>
                    <div className="text-[10px] text-gray-400">Active Farmers</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card — bottom left */}
              <motion.div
                className="absolute -bottom-3 -left-2 rounded-xl border border-gray-200/50 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm lg:-left-6"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <div>
                    <div className="text-sm font-bold text-primary-600">4.9</div>
                    <div className="text-[10px] text-gray-400">User Rating</div>
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
