import { motion, AnimatePresence } from 'motion/react'
import type { GamePhase } from '../../data/gameTypes'

interface GameControlsProps {
  phase: GamePhase
  playerTotal: number
  onRequestHit: () => void   // Opens quiz modal
  onStand: () => void
  onNewGame: () => void
  onStartGame: () => void
}

export default function GameControls({
  phase,
  playerTotal,
  onRequestHit,
  onStand,
  onNewGame,
  onStartGame,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.button
            key="start"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStartGame}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wider
              hover:bg-primary/90 transition-colors shadow-md"
            style={{ fontFamily: "'Cormorant', serif", letterSpacing: '0.08em' }}
          >
            ✦ Bắt Đầu Nhận Thức
          </motion.button>
        )}

        {phase === 'playerTurn' && (
          <motion.div
            key="player-actions"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-wrap gap-3 w-full"
          >
            {/* Hit button → triggers quiz modal */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRequestHit}
              disabled={playerTotal >= 21}
              className="flex-1 min-w-[150px] px-4 py-3 rounded-lg border-2 border-primary bg-primary/10 text-primary
                font-semibold text-sm tracking-wide hover:bg-primary/20 transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="mr-1.5">🃏</span> Rút Thêm Thực Tiễn
              <span className="block text-[10px] font-normal mt-0.5 opacity-60">
                (Cần trả lời câu hỏi trước)
              </span>
            </motion.button>

            {/* Stand button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStand}
              className="flex-1 min-w-[150px] px-4 py-3 rounded-lg border-2 border-accent/60 bg-accent/10 text-accent-foreground
                font-semibold text-sm tracking-wide hover:bg-accent/20 transition-colors"
            >
              <span className="mr-1.5">✋</span> Dằn Bài / Kết Luận
            </motion.button>
          </motion.div>
        )}

        {phase === 'dealerTurn' && (
          <motion.div
            key="dealer-thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 py-3 rounded-lg border border-primary/20 bg-muted/30 text-muted-foreground text-sm italic"
          >
            ⏳ Nhà cái đang kiểm nghiệm chân lý…
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.button
            key="new-game"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNewGame}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wider
              hover:bg-primary/90 transition-colors shadow-md"
            style={{ fontFamily: "'Cormorant', serif", letterSpacing: '0.08em' }}
          >
            ↺ Ván Mới — Nhận Thức Mới
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
