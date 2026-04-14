import { motion, AnimatePresence } from 'motion/react'
import { useXiDachGame } from '../hooks/useXiDachGame'
import CardHand from '../components/game/CardHand'
import ScoreDisplay from '../components/game/ScoreDisplay'
import GameControls from '../components/game/GameControls'
import ResultModal from '../components/game/ResultModal'
import QuizModal from '../components/game/QuizModal'
import { cormorant } from '../lib/fonts'

export default function GameSection() {
  const { state, quizModal, startGame, requestHit, confirmHit, cancelHit, stand, newGame } = useXiDachGame()

  const isDealerTurnOrResult = state.phase === 'dealerTurn' || state.phase === 'result'

  return (
    <section id="game-section" className="relative py-16 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1d12] via-[#1f1810] to-background pointer-events-none" />

      {/* Quiz Modal (teleported to top of z-stack) */}
      <QuizModal
        isOpen={quizModal.isOpen}
        question={quizModal.question}
        pendingAnswer={quizModal.pendingAnswer}
        onAnswer={confirmHit}
        onCancel={cancelHit}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-500/60 mb-3">Thực Tiễn Kiểm Nghiệm</p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-100 mb-3" style={cormorant}>
            Bàn Cờ Nhận Thức
          </h2>
          <p className="text-sm text-amber-300/50 italic">
            "Mỗi lần rút bài, bạn phải trả lời câu hỏi triết học trước"
          </p>
        </div>

        {/* Main game area — single column centered */}
        <div className="max-w-2xl mx-auto">

          {/* Card Table */}
          <div
            className="rounded-2xl border border-amber-700/30 overflow-hidden mb-4"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,164,92,0.1)' }}
          >
            {/* Felt surface */}
            <div
              className="p-6 space-y-8"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a3d2a 0%, #0f2a1a 60%, #0a1f14 100%)' }}
            >
              {/* Dealer area */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                  <p className="text-xs text-amber-300/60 tracking-widest uppercase">Nhà Cái</p>
                </div>
                <CardHand
                  cards={state.dealerHand}
                  hideLast={!isDealerTurnOrResult && state.phase !== 'idle'}
                />
                {isDealerTurnOrResult && state.dealerHand.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <span className="text-xs text-amber-300/50">Điểm nhà cái:</span>
                    <span
                      className={`text-sm font-bold ${state.dealerTotal > 21 ? 'text-red-400' : 'text-amber-300'}`}
                      style={cormorant}
                    >
                      {state.dealerTotal > 21 ? 'Quắc!' : state.dealerTotal}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-amber-700/20" />
                <span className="text-amber-600/30 text-xs tracking-widest">——— ĐỐI ĐẦU ———</span>
                <div className="flex-1 h-px bg-amber-700/20" />
              </div>

              {/* Player area */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  <p className="text-xs text-amber-300/60 tracking-widest uppercase">Người Chơi</p>
                </div>
                <CardHand cards={state.playerHand} />
                {state.playerHand.length > 0 && (
                  <ScoreDisplay
                    total={state.playerTotal}
                    status={state.epistemicStatus}
                    cardCount={state.playerHand.length}
                  />
                )}
              </div>
            </div>

            {/* Controls bar */}
            <div className="p-4 bg-[#1a120a]/80 border-t border-amber-700/20">
              <GameControls
                phase={state.phase}
                playerTotal={state.playerTotal}
                onRequestHit={requestHit}
                onStand={stand}
                onNewGame={newGame}
                onStartGame={startGame}
              />
            </div>
          </div>

          {/* Result (shown below table) */}
          <AnimatePresence>
            {state.phase === 'result' && state.specialResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                <ResultModal
                  result={state.specialResult}
                  playerTotal={state.playerTotal}
                  dealerTotal={state.dealerTotal}
                  correctAnswers={state.correctAnswers}
                  totalQuestions={state.totalQuestions}
                  onNewGame={newGame}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle prompt */}
          {state.phase === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-primary/20 bg-card/50 p-6 text-center space-y-3"
            >
              <p className="text-2xl">🎴</p>
              <p className="text-sm font-semibold text-foreground" style={cormorant}>
                Sẵn sàng bắt đầu hành trình?
              </p>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                Mỗi lần rút bài, bạn sẽ phải trả lời một câu hỏi triết học trước.
                Đây là cách thực tiễn kiểm nghiệm tri thức — bạn cần hiểu trước khi hành động.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
