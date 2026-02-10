import { motion } from 'framer-motion'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function SplitText({ children, className = '', delay = 0, as: Tag = 'h2' }: SplitTextProps) {
  const words = children.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i + delay * 25}
          variants={wordVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
