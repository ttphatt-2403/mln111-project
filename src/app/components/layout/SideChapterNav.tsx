import { motion } from 'motion/react'
import { cormorant } from '../../lib/fonts'

const CHAPTER_LABELS = ['Mở đầu', 'Cơ sở', 'Biện chứng', 'Vai trò', 'Phương pháp', 'Kết luận']

interface Props {
  progress: number
}

export default function SideChapterNav({ progress }: Props) {
  const active = Math.min(5, Math.max(0, Math.floor((progress - 8) / 15)))

  if (progress < 8 || progress > 96) return null

  return (
    <motion.nav
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      aria-label="Chapter navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4"
    >
      {CHAPTER_LABELS.map((label, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 cursor-default group"
          whileHover={{ x: -6 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span
            className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap text-primary"
            style={{ ...cormorant, letterSpacing: '0.08em' }}
          >
            {label}
          </span>
          <motion.div
            animate={{
              width: active === i ? 14 : 6,
              height: active === i ? 14 : 6,
              backgroundColor: active === i ? 'var(--primary)' : 'rgba(139,107,63,0.25)',
              boxShadow: active === i ? '0 0 10px rgba(201,164,92,0.6)' : '0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full flex-shrink-0"
          />
        </motion.div>
      ))}
    </motion.nav>
  )
}
