import { motion } from 'motion/react'
import { cormorant } from '../../lib/fonts'

interface LabeledHeadingProps {
  label: string
  title: string
  /** 'role' = no fill on badge, from-primary/40; 'example' = with fill, from-primary/30 */
  variant?: 'role' | 'example'
  className?: string
}

export default function LabeledHeading({ label, title, variant = 'role', className = 'mt-2' }: LabeledHeadingProps) {
  const badgeFill = variant === 'example' ? 'bg-primary/10 ' : ''
  const underlineFrom = variant === 'role' ? 'from-primary/40' : 'from-primary/30'

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className={`flex items-center gap-4 mb-4 ${className}`}
      >
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${badgeFill}border-2 border-primary/50 flex-shrink-0`}>
          <span className="text-xs text-primary" style={{ ...cormorant, fontWeight: 600 }}>{label}</span>
        </div>
        <h4
          className={`text-xl tracking-wide ${variant === 'role' ? 'text-primary' : 'text-foreground/85'}`}
          style={{ ...cormorant, fontWeight: 500, letterSpacing: variant === 'role' ? '0.06em' : '0.05em' }}
        >
          {title}
        </h4>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`mb-5 ml-12 h-px bg-gradient-to-r ${underlineFrom} to-transparent origin-left`}
      />
    </>
  )
}
