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
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

  const variants = {
    primary:
      'bg-accent text-dark rounded-md px-8 py-3.5 text-base hover:bg-accent-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md',
    secondary:
      'border-2 border-secondary text-secondary rounded-md px-7 py-3 text-base hover:bg-secondary hover:text-white',
    ghost:
      'border-2 border-white/30 text-white rounded-md px-7 py-3 text-base hover:bg-white/10 hover:border-white/60',
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
