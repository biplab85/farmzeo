import { useEffect, useState, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

interface StatCounterProps {
  value: string
  label: string
  description?: string
  className?: string
}

/**
 * Animated stat counter.
 * - Simple numeric values like '12%', '3x', '5+' → count-up animation
 * - Range values like '20-30%' → displayed statically (no animation)
 * - Uses rAF instead of setInterval for smooth animation + auto-cleanup
 * - Clamps to prevent overshoot / stale state
 */
export default function StatCounter({ value, label, description, className = '' }: StatCounterProps) {
  // Detect range value (e.g. '20-30%') — display statically
  const isRange = /\d+\s*[-–]\s*\d+/.test(value)
  const [displayValue, setDisplayValue] = useState(isRange ? value : '0')
  const hasAnimated = useRef(false)
  const rafId = useRef(0)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const animate = useCallback(() => {
    if (isRange) return

    const numMatch = value.match(/(\d+)/)
    if (!numMatch) {
      setDisplayValue(value)
      return
    }

    const matched = numMatch[1] ?? ''
    const target = parseInt(matched, 10)
    const prefix = value.substring(0, value.indexOf(matched))
    const suffix = value.substring(value.indexOf(matched) + matched.length)

    const duration = 2000
    let startTime: number | null = null

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.min(Math.round(eased * target), target)

      setDisplayValue(`${prefix}${current}${suffix}`)

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step)
      }
    }

    rafId.current = requestAnimationFrame(step)
  }, [value, isRange])

  useEffect(() => {
    if (!inView || hasAnimated.current || isRange) return
    hasAnimated.current = true
    animate()

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [inView, animate, isRange])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="font-heading text-5xl font-extrabold text-secondary">{displayValue}</div>
      <div className="mt-2 text-lg font-semibold text-primary">{label}</div>
      {description && <p className="mx-auto mt-2 max-w-xs text-sm text-body">{description}</p>}
    </div>
  )
}
