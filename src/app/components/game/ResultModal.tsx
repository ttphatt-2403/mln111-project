import { motion, AnimatePresence } from 'motion/react'
import type { SpecialResult } from '../../data/gameTypes'
import { RESULT_MESSAGES } from '../../data/gameTypes'

interface ResultModalProps {
  result: SpecialResult | null
  playerTotal: number
  dealerTotal: number
  correctAnswers: number
  totalQuestions: number
  onNewGame: () => void
}

export default function ResultModal({ result, playerTotal, dealerTotal, correctAnswers, totalQuestions, onNewGame }: ResultModalProps) {
  if (!result) return null

  const msg = RESULT_MESSAGES[result]
  const isVictory = ['win', 'xi_bang', 'xi_dach', 'ngu_linh'].includes(result)
  const isSpecial = ['xi_bang', 'xi_dach', 'ngu_linh'].includes(result)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="rounded-xl border-2 overflow-hidden"
        style={{
          borderColor: isVictory ? 'rgba(201,164,92,0.6)' : result === 'quac' ? 'rgba(160,82,45,0.6)' : 'rgba(139,107,63,0.4)',
          boxShadow: isSpecial ? '0 0 30px rgba(201,164,92,0.3)' : '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div className={`px-6 py-5 text-center ${
          isSpecial ? 'bg-gradient-to-b from-amber-900/80 to-amber-800/60' :
          isVictory ? 'bg-gradient-to-b from-stone-800/80 to-stone-700/60' :
          result === 'quac' ? 'bg-gradient-to-b from-red-950/80 to-red-900/60' :
          'bg-gradient-to-b from-stone-900/80 to-stone-800/60'
        }`}>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-4xl mb-2"
          >
            {msg.emoji}
          </motion.p>
          <h3
            className="text-2xl font-bold text-amber-200 mb-1"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            {msg.title}
          </h3>
          <p className="text-sm text-amber-300/80 italic leading-relaxed max-w-xs mx-auto">
            {msg.subtitle}
          </p>
        </div>

        {/* Score comparison */}
        <div className="bg-card px-6 py-4">
          <div className="flex justify-around items-center mb-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bạn</p>
              <p className={`text-3xl font-bold ${result === 'quac' ? 'text-red-500' : 'text-foreground'}`}
                style={{ fontFamily: "'Cormorant', serif" }}>
                {playerTotal > 21 ? 'Quắc' : playerTotal}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-muted-foreground/50">—</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Nhà Cái</p>
              <p className="text-3xl font-bold text-foreground"
                style={{ fontFamily: "'Cormorant', serif" }}>
                {dealerTotal > 21 ? 'Quắc' : dealerTotal}
              </p>
            </div>
          </div>

          {/* Philosophy score */}
          {totalQuestions > 0 && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-xs text-muted-foreground italic">Điểm triết học ván này</p>
              <p className="text-sm font-semibold text-primary">
                {correctAnswers}/{totalQuestions} câu đúng
              </p>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="px-6 py-4 bg-muted/30 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNewGame}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wider
              hover:bg-primary/90 transition-colors shadow-md"
            style={{ fontFamily: "'Cormorant', serif", letterSpacing: '0.08em' }}
          >
            ↺ Ván Mới — Nhận Thức Mới
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
