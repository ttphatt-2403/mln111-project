import { motion } from 'motion/react'
import { cormorant, garamond } from '../../lib/fonts'

interface BookQuoteProps {
  children: React.ReactNode
  author?: string
}

export default function BookQuote({ children, author }: BookQuoteProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 18 }}
      className="my-12 relative"
    >
      {/* Animated double border */}
      <motion.div
        className="absolute -inset-4 border-2 border-primary/20"
        style={{ borderStyle: 'double' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />

      <motion.div
        className="bg-gradient-to-br from-accent/10 to-transparent p-8 relative"
        animate={{ boxShadow: ['0 0 0px rgba(201,164,92,0)', '0 0 30px rgba(201,164,92,0.12)', '0 0 0px rgba(201,164,92,0)'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute -top-6 -left-4 text-6xl text-primary/20" style={cormorant}>&ldquo;</div>
        <div className="absolute -bottom-6 -right-4 text-6xl text-primary/20" style={cormorant}>&rdquo;</div>

        <p className="text-2xl md:text-3xl italic leading-relaxed text-center relative z-10" style={{ ...garamond, fontWeight: 300 }}>
          {children}
        </p>

        {author && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-16 h-px bg-primary/30 origin-right"
            />
            <cite className="text-primary not-italic font-medium tracking-wider" style={{ ...cormorant, letterSpacing: '0.1em' }}>
              {author}
            </cite>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-16 h-px bg-primary/30 origin-left"
            />
          </div>
        )}
      </motion.div>
    </motion.blockquote>
  )
}
