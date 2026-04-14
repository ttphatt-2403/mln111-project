import { motion } from 'motion/react'
import { cormorant } from '../../lib/fonts'

const MARQUEE_TEXT = 'THỰC TIỄN  •  CHÂN LÝ  •  BIỆN CHỨNG  •  MÁC-LÊNIN  •  TRI THỨC  •  TRIẾT HỌC  •  '

export default function MarqueeBand() {
  return (
    <div className="py-4 overflow-hidden border-y border-primary/20 bg-primary/5 relative">
      <div className="flex">
        {[0, 1].map(i => (
          <motion.div
            key={i}
            animate={{ x: [0, '-100%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear', delay: i === 1 ? -14 : 0 }}
            className="flex-shrink-0 flex items-center"
            style={{
              ...cormorant,
              letterSpacing: '0.3em',
              fontSize: '0.7rem',
              color: 'var(--primary)',
              opacity: 0.6,
              whiteSpace: 'nowrap',
            }}
          >
            {MARQUEE_TEXT.repeat(4)}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
