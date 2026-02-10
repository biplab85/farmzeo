import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import { faq } from '../content'

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`border-t border-gray-200 transition-colors ${isOpen ? 'border-l-[3px] border-l-secondary pl-5' : 'border-l-[3px] border-l-transparent pl-5'}`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className={`pr-4 font-heading text-[17px] font-semibold transition-colors duration-300 ${isOpen ? 'text-secondary-600' : 'text-primary-600'}`}>
          {question}
        </span>
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
          <motion.span
            className="absolute h-[2px] w-3.5 rounded-full bg-secondary"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute h-[2px] w-3.5 rounded-full bg-secondary"
            animate={{ rotate: isOpen ? -45 : 90 }}
            transition={{ duration: 0.2 }}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] leading-[1.75] text-gray-500">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 md:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left — heading + testimonial */}
          <div className="lg:w-[38%]">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3">
                <div className="h-[2px] w-8 bg-secondary" />
                <span className="text-[13px] font-bold uppercase tracking-[3px] text-secondary">{faq.label}</span>
              </div>
            </ScrollReveal>
            <SplitText as="h2" className="mt-4 font-heading text-[32px] font-bold text-primary-600 md:text-[40px] lg:text-[48px] lg:leading-[56px]">
              {faq.headline}
            </SplitText>
            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-[16px] leading-[1.7] text-gray-500">
                Can&apos;t find what you&apos;re looking for? Reach out to our support team.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-secondary px-6 py-3 text-[15px] font-semibold text-secondary transition-all duration-300 hover:bg-secondary hover:text-white"
              >
                Contact Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </ScrollReveal>

            {/* Mini testimonial */}
            <ScrollReveal delay={0.5} className="mt-10">
              <div className="relative rounded-xl border border-gray-200/50 bg-gray-50/80 p-6 backdrop-blur-sm">
                {/* Quote mark */}
                <svg className="absolute -top-2 left-4 text-secondary/10" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="mt-4 text-[15px] italic leading-[1.7] text-gray-600">
                  &ldquo;Farmzeo changed how I manage my farm. Everything I need is in one place now.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-sm font-bold text-secondary">
                    RK
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-primary-600">Raj Kumar</div>
                    <div className="text-[12px] text-gray-400">Farmer, Maharashtra</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — accordion */}
          <div className="lg:w-[62%]">
            {faq.items.map((item, i) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            ))}
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </Container>
    </section>
  )
}
