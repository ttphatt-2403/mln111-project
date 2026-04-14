import { motion, AnimatePresence } from 'motion/react'
import type { AnswerOption, PlayerAnswer, QuizQuestion } from '../../data/gameTypes'
import { cormorant } from '../../lib/fonts'

interface QuizModalProps {
  isOpen: boolean
  question: QuizQuestion | null
  pendingAnswer: PlayerAnswer | null
  onAnswer: (option: AnswerOption) => void
  onCancel: () => void
}

const OPTIONS: AnswerOption[] = ['A', 'B', 'C', 'D']

export default function QuizModal({ isOpen, question, pendingAnswer, onAnswer, onCancel }: QuizModalProps) {
  const hasAnswered = !!pendingAnswer

  return (
    <AnimatePresence>
      {isOpen && question && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={!hasAnswered ? onCancel : undefined}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,164,92,0.2)' }}
            >
              {/* Header */}
              <div
                className="px-6 py-5 text-center relative"
                style={{ background: 'linear-gradient(135deg, #1a120a 0%, #2a1d12 50%, #1a120a 100%)' }}
              >
                {/* Ornament */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-px bg-amber-600/40" />
                  <span className="text-amber-500/70 text-lg">🎴</span>
                  <div className="w-8 h-px bg-amber-600/40" />
                </div>

                <p className="text-xs tracking-[0.3em] uppercase text-amber-500/60 mb-2">
                  Thực Tiễn Kiểm Nghiệm
                </p>
                <h3 className="text-xl font-bold text-amber-100 mb-1" style={cormorant}>
                  Trả lời để bốc bài
                </h3>
                <p className="text-xs text-amber-300/50 italic">
                  Chưa có đủ thực tiễn thì chưa thể hành động
                </p>
              </div>

              {/* Question body */}
              <div className="bg-card px-6 py-5">
                <p
                  className="text-sm leading-relaxed font-medium text-foreground mb-5 text-center"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {question.question}
                </p>

                {/* Options */}
                <div className="flex flex-col gap-2.5">
                  {OPTIONS.map(opt => {
                    const isSelected = pendingAnswer?.selectedOption === opt
                    const isCorrect = question.correctAnswer === opt

                    let cls = 'border-primary/20 hover:border-primary/60 hover:bg-primary/5 cursor-pointer text-foreground'
                    if (hasAnswered) {
                      if (isCorrect) cls = 'border-green-500 bg-[#f0fdf4] text-green-900 cursor-default'
                      else if (isSelected) cls = 'border-red-500 bg-[#fef2f2] text-red-900 cursor-default'
                      else cls = 'border-primary/10 opacity-40 cursor-default text-foreground'
                    }

                    return (
                      <motion.button
                        key={opt}
                        whileHover={!hasAnswered ? { x: 4 } : {}}
                        whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                        onClick={() => !hasAnswered && onAnswer(opt)}
                        disabled={hasAnswered}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${cls}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`text-xs font-bold shrink-0 w-5 mt-0.5 ${hasAnswered && (isCorrect || isSelected) ? '' : 'text-primary'}`}>{opt}.</span>
                          <span className="text-sm leading-relaxed flex-1">
                            {question.options[opt]}
                          </span>
                          {hasAnswered && isCorrect && (
                            <span className="text-green-600 font-bold shrink-0 text-sm">✓</span>
                          )}
                          {hasAnswered && isSelected && !isCorrect && (
                            <span className="text-red-500 font-bold shrink-0 text-sm">✗</span>
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Answer feedback */}
                <AnimatePresence>
                  {pendingAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`mt-4 p-4 rounded-xl border text-center ${
                        pendingAnswer.isCorrect
                          ? 'border-green-500/40 bg-green-50 dark:bg-green-950/30'
                          : 'border-amber-500/40 bg-amber-50 dark:bg-amber-950/30'
                      }`}>
                        <p className={`text-sm font-semibold mb-1 ${
                          pendingAnswer.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'
                        }`} style={cormorant}>
                          {pendingAnswer.isCorrect
                            ? '✓ Nhận thức chính xác!'
                            : '✗ Nhận thức chưa đúng'
                          }
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          {pendingAnswer.isCorrect
                            ? 'Thực tiễn xác nhận tri thức — bài được bốc...'
                            : `Hãy suy nghĩ lại để có thể nhận thức đúng và được rút bài nhé!`
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {!hasAnswered && (
                <div className="bg-muted/30 px-6 py-3 flex justify-end border-t border-primary/10">
                  <button
                    onClick={onCancel}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
                  >
                    Huỷ — không bốc bài
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
