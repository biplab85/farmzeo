import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (hidden) setHidden(false)

      // Move inner dot instantly
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px) scale(${clicking ? 0 : 1})`
      }
    }

    const onMouseDown = () => setClicking(true)
    const onMouseUp = () => setClicking(false)
    const onMouseLeave = () => setHidden(true)
    const onMouseEnter = () => setHidden(false)

    // Detect interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor]')
      setHovering(!!interactive)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })

    // Lerp animation for outer ring
    let raf: number
    const animate = () => {
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.12
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.12

      if (outerRef.current) {
        const size = hovering ? 56 : 36
        const offset = size / 2
        outerRef.current.style.transform = `translate(${outerPos.current.x - offset}px, ${outerPos.current.y - offset}px)`
        outerRef.current.style.width = `${size}px`
        outerRef.current.style.height = `${size}px`
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [hovering, clicking, hidden])

  if (isTouch) return null

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          borderColor: hovering ? 'rgba(13,153,132,0.6)' : 'rgba(13,153,132,0.3)',
          backgroundColor: hovering ? 'rgba(13,153,132,0.06)' : 'transparent',
          opacity: hidden ? 0 : 1,
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-secondary transition-transform duration-100"
        style={{
          opacity: hidden ? 0 : 1,
        }}
      />
      {/* Hide default cursor */}
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        @media (pointer: coarse) {
          *, *::before, *::after { cursor: auto !important; }
        }
      `}</style>
    </>
  )
}
