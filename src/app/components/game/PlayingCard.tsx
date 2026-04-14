import { motion } from 'motion/react'
import type { Card } from '../../data/gameTypes'

interface PlayingCardProps {
  card: Card
  faceDown?: boolean
  index?: number
  className?: string
}

const SUIT_COLORS: Record<string, string> = {
  '♠': 'text-[#1a1c20]',
  '♣': 'text-[#1a1c20]',
  '♥': 'text-[#d32f2f]',
  '♦': 'text-[#d32f2f]',
}

const CARD_BACK_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23722f37'/%3E%3Cpath d='M0 0L20 20M20 0L0 20' stroke='%23a0522d' stroke-width='1' opacity='0.5'/%3E%3Ccircle cx='10' cy='10' r='3' fill='none' stroke='%23c9a45c' stroke-width='0.5'/%3E%3C/svg%3E")`

export default function PlayingCard({ card, faceDown = false, index = 0, className = '' }: PlayingCardProps) {
  const color = faceDown ? '' : SUIT_COLORS[card.suit]

  return (
    <motion.div
      initial={{ opacity: 0, y: -30, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={!faceDown ? { y: -6, scale: 1.04 } : {}}
      className={`relative w-16 h-24 md:w-20 md:h-28 rounded-lg flex-shrink-0 select-none ${className}`}
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)',
      }}
    >
      {faceDown ? (
        /* Card Back */
        <div
          className="w-full h-full rounded-lg border border-amber-700/50 flex items-center justify-center"
          style={{ backgroundImage: CARD_BACK_PATTERN }}
        >
          <div className="w-10 h-14 md:w-12 md:h-18 rounded border border-amber-500/30 flex items-center justify-center">
            <span className="text-amber-400 text-xl opacity-50">✦</span>
          </div>
        </div>
      ) : (
        /* Card Face */
        <div className="w-full h-full rounded-lg bg-[#faf8f5] shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] border border-amber-300/40 flex flex-col p-1.5">
          {/* Top-left rank + suit */}
          <div className={`flex flex-col leading-none ${color}`}>
            <span className="text-sm md:text-base font-bold leading-tight">{card.rank}</span>
            <span className="text-xs md:text-sm leading-tight">{card.suit}</span>
          </div>

          {/* Center suit */}
          <div className={`flex-1 flex items-center justify-center text-2xl md:text-3xl ${color}`}>
            {card.suit}
          </div>

          {/* Bottom-right rank + suit (rotated) */}
          <div className={`flex flex-col items-end leading-none rotate-180 ${color}`}>
            <span className="text-sm md:text-base font-bold leading-tight">{card.rank}</span>
            <span className="text-xs md:text-sm leading-tight">{card.suit}</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
