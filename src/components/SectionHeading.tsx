interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  dark?: boolean
  className?: string
}

import SectionLabel from './SectionLabel'

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  dark = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {label && (
        <SectionLabel dark={dark} className="mb-4">
          {label}
        </SectionLabel>
      )}
      <h2
        className={`font-heading text-3xl font-bold md:text-4xl lg:text-[40px] lg:leading-[48px] ${
          dark ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-lg ${
            dark ? 'text-gray-300' : 'text-body'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
