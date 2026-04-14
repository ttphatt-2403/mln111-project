import { motion } from 'motion/react'

interface Props {
  readingProgress: number
}

export default function BackToTopButton({ readingProgress }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.12, y: -3, boxShadow: '0 16px 36px rgba(139,107,63,0.5)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="relative w-14 h-14 rounded-sm bg-primary text-primary-foreground shadow-2xl flex items-center justify-center border-2 border-primary/40"
        style={{ boxShadow: '0 10px 30px rgba(139, 107, 63, 0.4)' }}
      >
        {/* Progress ring */}
        <svg className="absolute inset-0 w-14 h-14 -rotate-90">
          <rect x="2" y="2" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-20" />
          <rect
            x="2" y="2" width="52" height="52"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeDasharray={`${52 * 4}`}
            strokeDashoffset={`${52 * 4 * (1 - readingProgress / 100)}`}
            className="transition-all duration-300"
          />
        </svg>
        <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </motion.div>
  )
}
