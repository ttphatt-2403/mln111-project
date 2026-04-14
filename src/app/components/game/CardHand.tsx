import { AnimatePresence } from 'motion/react'
import type { Card } from '../../data/gameTypes'
import PlayingCard from './PlayingCard'

interface CardHandProps {
  cards: Card[]
  hideLast?: boolean // hide the last card (dealer's hole card)
  label?: string
  className?: string
}

export default function CardHand({ cards, hideLast = false, label, className = '' }: CardHandProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {cards.map((card, i) => (
            <PlayingCard
              key={card.id}
              card={card}
              index={i}
              faceDown={hideLast && i === cards.length - 1}
            />
          ))}
        </AnimatePresence>
        {cards.length === 0 && (
          <div className="w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
            <span className="text-primary/30 text-2xl">?</span>
          </div>
        )}
      </div>
    </div>
  )
}
