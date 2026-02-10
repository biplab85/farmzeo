import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { iconMap } from '../components/Icons'
import { contact } from '../content'

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

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-light py-20 md:py-28 lg:py-32">
      <Container>
        {/* Header */}
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3">
              <div className="h-[2px] w-8 bg-secondary" />
              <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary">{contact.label}</span>
              <div className="h-[2px] w-8 bg-secondary" />
            </div>
          </ScrollReveal>
          <SplitText as="h2" className="mx-auto mt-4 max-w-3xl font-heading text-[32px] font-bold text-primary-600 md:text-[40px] lg:text-[48px] lg:leading-[56px]">
            {contact.headline}
          </SplitText>
          <ScrollReveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.75] text-gray-500">
              {contact.subheadline}
            </p>
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-10 lg:mt-16 lg:flex-row lg:gap-12">
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
                    className="group flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
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
                    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-gray-400 transition-all duration-300"
                    style={{ '--brand-color': iconData?.color ?? '#0D9984' } as React.CSSProperties}
                  >
                    {/* Brand color fill on hover */}
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
            <div className="rounded-2xl bg-white p-8 shadow-lg lg:p-10">
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
                      className="group relative w-full overflow-hidden rounded-xl bg-accent py-4 text-[16px] font-semibold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-glow"
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
      </Container>
    </section>
  )
}
