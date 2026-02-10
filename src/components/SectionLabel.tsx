interface SectionLabelProps {
  children: React.ReactNode
  dark?: boolean
  className?: string
}

export default function SectionLabel({ children, dark = false, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] ${
        dark ? 'text-secondary-400' : 'text-secondary'
      } ${className}`}
    >
      <span className={`inline-block h-2 w-2 rounded-full ${dark ? 'bg-secondary-400' : 'bg-secondary'}`} />
      {children}
    </span>
  )
}
