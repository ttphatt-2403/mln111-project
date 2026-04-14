import { motion } from 'motion/react'

const LINE_WIDTHS = {
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-20',
  xl: 'w-24',
} as const

type LineWidth = keyof typeof LINE_WIDTHS
type DiamondSize = 'sm' | 'md' | 'lg'
type Spin = 'full' | 'rock' | 'rock-slow' | 'none'

const diamondClass: Record<DiamondSize, string> = {
  sm: 'w-2 h-2 border border-primary/40',
  md: 'w-3 h-3 border-2 border-primary/40',
  lg: 'w-4 h-4 border-2 border-primary/40',
}

const spinVariants: Record<Spin, object> = {
  full:      { rotate: [0, 90, 180, 270, 360] },
  rock:      { rotate: [45, 135, 45] },
  'rock-slow': { rotate: [45, 225, 45] },
  none:      {},
}

const spinTransitions: Record<Spin, object> = {
  full:      { duration: 8,  repeat: Infinity, ease: 'linear' },
  rock:      { duration: 6,  repeat: Infinity, ease: 'easeInOut' },
  'rock-slow': { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  none:      {},
}

interface OrnamentDividerProps {
  lineWidth?: LineWidth
  diamondSize?: DiamondSize
  spin?: Spin
  /** Replace diamond with a custom icon */
  icon?: React.ReactNode
  /** Animate lines in via scaleX (default true) */
  animated?: boolean
  className?: string
}

export default function OrnamentDivider({
  lineWidth = 'xl',
  diamondSize = 'md',
  spin = 'none',
  icon,
  animated = true,
  className = 'flex items-center justify-center gap-4',
}: OrnamentDividerProps) {
  const lw = LINE_WIDTHS[lineWidth]

  const Line = ({ origin }: { origin: 'left' | 'right' }) =>
    animated ? (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`${lw} h-px bg-primary/40 origin-${origin}`}
      />
    ) : (
      <div className={`${lw} h-px bg-primary/40`} />
    )

  const center = icon ?? (
    <motion.div
      animate={spinVariants[spin]}
      transition={spinTransitions[spin]}
      className={`rotate-45 ${diamondClass[diamondSize]}`}
    />
  )

  return (
    <div className={className}>
      <Line origin="right" />
      {center}
      <Line origin="left" />
    </div>
  )
}
