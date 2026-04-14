import { motion } from 'motion/react'
import type { EpistemicStatus } from '../../data/gameTypes'
import { EPISTEMIC_LABELS } from '../../data/gameTypes'

interface ScoreDisplayProps {
  total: number
  status: EpistemicStatus
  cardCount: number
  label?: string
}

export default function ScoreDisplay({ total, status, cardCount, label = 'Điểm của bạn' }: ScoreDisplayProps) {
  const info = EPISTEMIC_LABELS[status]

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">{label}</p>

      <div className="flex items-center gap-4">
        {/* Score circle */}
        <motion.div
          key={total}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-2xl
            ${status === 'dogmatic'
              ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
              : status === 'truth'
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-300'
                : 'border-primary/50 bg-primary/5 text-foreground'
            }`}
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          {total}
        </motion.div>

        {/* Status info */}
        <div className="flex flex-col gap-1">
          <motion.span
            key={status}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-sm font-semibold ${info.color}`}
          >
            {info.label}
          </motion.span>
          <p className="text-xs text-muted-foreground italic max-w-[200px] leading-relaxed">
            {info.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {cardCount} lá bài • {5 - cardCount > 0 ? `Còn ${5 - cardCount} lượt tối đa` : 'Ngũ Linh!'}
          </p>
        </div>
      </div>
    </div>
  )
}
