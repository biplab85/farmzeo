interface WaveTransitionProps {
  fillColor?: string
  className?: string
  flip?: boolean
}

export default function WaveTransition({ fillColor = '#FFFFFF', className = '', flip = false }: WaveTransitionProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative block h-[60px] w-full md:h-[80px] lg:h-[120px]"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={fillColor}
          fillOpacity="0.15"
          className="animate-wave"
        />
        <path
          d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,50 1440,80 L1440,120 L0,120 Z"
          fill={fillColor}
          fillOpacity="0.4"
          style={{ animation: 'wave 10s ease-in-out infinite reverse' }}
        />
        <path
          d="M0,90 C180,60 420,110 720,70 C1020,30 1260,100 1440,90 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}
