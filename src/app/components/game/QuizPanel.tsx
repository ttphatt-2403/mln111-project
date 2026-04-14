import { motion, AnimatePresence } from 'motion/react'
import { Lock } from 'lucide-react'
import type { AnswerOption, PlayerAnswer, QuizQuestion } from '../../data/gameTypes'

interface QuizPanelProps {
  question: QuizQuestion | null
  canAnswer: boolean
  playerAnswer: PlayerAnswer | null
  onAnswer: (option: AnswerOption) => void
  drawHint: string
}

const OPTION_LABELS: AnswerOption[] = ['A', 'B', 'C', 'D']

export default function QuizPanel({ question, canAnswer, playerAnswer, onAnswer, drawHint }: QuizPanelProps) {
  if (!question) return null

  return (
    <div className="relative flex flex-col gap-4">
      {/* Section label */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-px bg-primary/40" />
        <p className="text-xs tracking-widest uppercase text-muted-foreground font-medium">
          Câu Hỏi Triết Học
        </p>
        <div className="flex-1 h-px bg-primary/40" />
      </div>

      {/* Quiz card */}
      <div className="relative rounded-lg border border-primary/20 bg-card overflow-hidden"
        style={{ boxShadow: '0 2px 12px rgba(139,107,63,0.08)' }}
      >
        {/* Question */}
        <div className="p-4 border-b border-primary/10">
          <p className="text-sm leading-relaxed font-medium text-foreground" style={{ fontFamily: "'Lora', serif" }}>
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="p-4 flex flex-col gap-2">
          {OPTION_LABELS.map(opt => {
            const isSelected = playerAnswer?.selectedOption === opt
            const isCorrect = question.correctAnswer === opt
            const showResult = !!playerAnswer

            let optClass = 'border-primary/20 hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
            if (showResult && isCorrect) optClass = 'border-green-500 bg-green-50 dark:bg-green-950/30 cursor-default'
            else if (showResult && isSelected && !isCorrect) optClass = 'border-red-500 bg-red-50 dark:bg-red-950/30 cursor-default'
            else if (showResult) optClass = 'border-primary/10 opacity-50 cursor-default'
            else if (!canAnswer) optClass = 'border-primary/10 opacity-40 cursor-not-allowed'

            return (
              <motion.button
                key={opt}
                whileHover={canAnswer && !playerAnswer ? { x: 3 } : {}}
                whileTap={canAnswer && !playerAnswer ? { scale: 0.98 } : {}}
                onClick={() => canAnswer && !playerAnswer && onAnswer(opt)}
                className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${optClass}`}
                disabled={!canAnswer || !!playerAnswer}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-primary shrink-0 w-4 mt-0.5">{opt}.</span>
                  <span className="text-xs leading-relaxed text-foreground">
                    {question.options[opt]}
                  </span>
                  {showResult && isCorrect && (
                    <span className="ml-auto text-green-600 text-xs font-bold shrink-0">✓</span>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <span className="ml-auto text-red-500 text-xs font-bold shrink-0">✗</span>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Result message */}
        <AnimatePresence>
          {playerAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`px-4 pb-4 text-xs italic leading-relaxed
                ${playerAnswer.isCorrect
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-red-700 dark:text-red-400'
                }`}
            >
              {playerAnswer.isCorrect
                ? '✓ Nhận thức đúng đắn! Thực tiễn kiểm nghiệm — chân lý được xác lập.'
                : `✗ Nhận thức chưa chính xác. Đáp án đúng: ${question.correctAnswer}. Thực tiễn phủ nhận tri thức sai.`
              }
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lock overlay */}
        <AnimatePresence>
          {!canAnswer && !playerAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-[2px] bg-background/70 rounded-lg flex flex-col items-center justify-center gap-3 p-4"
            >
              <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground mb-1" style={{ fontFamily: "'Cormorant', serif" }}>
                  Chưa đủ thực tiễn
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed italic max-w-[200px]">
                  {drawHint}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
