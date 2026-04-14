import { useState } from 'react'
import { motion } from 'motion/react'
import { lora } from '../../lib/fonts'

interface Props {
  children: React.ReactNode
}

export default function BookParagraph({ children }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative mb-6 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left golden bar */}
      <motion.div
        className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #c9a45c 30%, #8b6b3f 70%, transparent)',
          transformOrigin: 'top',
        }}
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      />

      {/* Warm radial glow */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(201,164,92,0.1) 0%, rgba(201,164,92,0.04) 40%, transparent 70%)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.32 }}
      />

      {/* Top shimmer line */}
      <motion.div
        className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,164,92,0.4), transparent)' }}
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Right ornamental diamond */}
      <motion.div
        className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 pointer-events-none"
        style={{ border: '1px solid rgba(139,107,63,0.55)' }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />

      {/* Shine dot inside diamond */}
      <motion.div
        className="absolute right-[14px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full pointer-events-none"
        style={{ background: 'rgba(201,164,92,0.7)' }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.06 }}
      />

      <motion.p
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px' }}
        animate={{ x: hovered ? 14 : 0 }}
        transition={{
          x: { duration: 0.28, ease: 'easeOut' },
          opacity: { duration: 0.65, ease: 'easeOut' },
          y: { duration: 0.65, ease: 'easeOut' },
          filter: { duration: 0.65, ease: 'easeOut' },
        }}
        className="book-paragraph text-lg leading-[1.9] text-justify hyphens-auto relative z-10"
        style={{
          ...lora,
          textShadow: hovered ? '0 0 24px rgba(201,164,92,0.1)' : 'none',
          transition: 'text-shadow 0.3s ease',
        }}
      >
        {children}
      </motion.p>
    </div>
  )
}
