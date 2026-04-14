import { motion } from 'motion/react'
import { cormorant, lora } from '../../lib/fonts'

interface BookChapterProps {
  number: string
  title: string
  subtitle: string
  children: React.ReactNode
  direction?: 'left' | 'right'
}

const CORNER_CLASSES = [
  'top-0 left-0 border-l-[3px] border-t-[3px]',
  'top-0 right-0 border-r-[3px] border-t-[3px]',
  'bottom-0 left-0 border-l-[3px] border-b-[3px]',
  'bottom-0 right-0 border-r-[3px] border-b-[3px]',
]

export default function BookChapter({ number, title, subtitle, children, direction = 'left' }: BookChapterProps) {
  const xInitial = direction === 'left' ? -50 : 50

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, x: xInitial, rotate: direction === 'left' ? -0.8 : 0.8, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-card/60 backdrop-blur-sm rounded-sm p-8 md:p-12 border-2 border-primary/30 shadow-lg relative group"
      style={{ boxShadow: '0 4px 20px rgba(139, 107, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)' }}
    >
      {/* Vintage corner decorations */}
      {CORNER_CLASSES.map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-16 ${cls}`}
          style={{ borderColor: 'var(--primary)', borderStyle: 'double', opacity: 0.35 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          initial={{ opacity: 0, scale: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
        />
      ))}

      {number && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-6 py-2 border-t-2 border-b-2 border-primary/40">
            <span className="text-sm text-primary/60 uppercase tracking-[0.3em] font-light" style={cormorant}>
              Chương {number}
            </span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h3 className="text-4xl md:text-5xl mb-4 tracking-wide" style={{ ...cormorant, fontWeight: 400, letterSpacing: '0.05em' }}>
          {title}
        </h3>
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="w-12 h-px bg-primary/40 origin-right"
          />
          <div className="w-2 h-2 rotate-45 border border-primary/40" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="w-12 h-px bg-primary/40 origin-left"
          />
        </div>
        <p className="text-lg text-muted-foreground italic tracking-wide" style={lora}>{subtitle}</p>
      </motion.div>

      <div className="space-y-6 text-foreground/90">
        {children}
      </div>
    </motion.article>
  )
}
