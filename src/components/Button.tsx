interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'text'
  href?: string
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon,
  fullWidth = false,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

  const variants = {
    primary:
      'bg-accent text-dark rounded-xl px-8 py-3.5 text-base hover:bg-accent-600 hover:-translate-y-1 hover:shadow-amber-glow hover:scale-[1.02] active:translate-y-0 active:scale-100 active:shadow-md',
    secondary:
      'border-2 border-secondary text-secondary rounded-xl px-7 py-3 text-base hover:bg-secondary hover:text-white hover:-translate-y-0.5 hover:shadow-teal-glow',
    ghost:
      'border-2 border-white/30 text-white rounded-xl px-7 py-3 text-base hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5',
    text: 'text-secondary text-base hover:text-secondary-600 gap-1',
  }

  const classes = `${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  )
}
