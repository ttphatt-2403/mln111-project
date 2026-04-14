// ─── Card Types ───────────────────────────────────────────────────────────────

export type Suit = '♠' | '♥' | '♦' | '♣'
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'

export interface Card {
  suit: Suit
  rank: Rank
  id: string // unique identifier for animation keys
}

// ─── Game Phases ──────────────────────────────────────────────────────────────

export type GamePhase =
  | 'idle'         // Before game starts
  | 'dealing'      // Initial deal animation
  | 'playerTurn'   // Player is drawing/standing
  | 'dealerTurn'   // Dealer reveals and draws
  | 'result'       // Show final result

// ─── Special Results ──────────────────────────────────────────────────────────

export type SpecialResult =
  | 'xi_bang'    // Xì Bàng: 2 Aces
  | 'xi_dach'    // Xì Dách: A + 10/J/Q/K
  | 'ngu_linh'   // Ngũ Linh: 5 cards ≤ 21
  | 'quac'       // Quắc: total > 21
  | 'win'        // Normal win
  | 'lose'       // Normal loss
  | 'draw'       // Tie

// ─── Epistemic Status (Philosophical State) ───────────────────────────────────

export type EpistemicStatus =
  | 'insufficient'   // ≤ 11 points
  | 'verifying'      // 12–17 points
  | 'approaching'    // 18–20 points
  | 'truth'          // Exactly 21
  | 'dogmatic'       // > 21 (bust)

// ─── Quiz Types ────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: number
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: 'A' | 'B' | 'C' | 'D'
}

export type AnswerOption = 'A' | 'B' | 'C' | 'D'

export interface PlayerAnswer {
  questionId: number
  selectedOption: AnswerOption
  isCorrect: boolean
}

// ─── Game State ────────────────────────────────────────────────────────────────

export interface GameState {
  phase: GamePhase
  deck: Card[]
  playerHand: Card[]
  dealerHand: Card[]
  playerTotal: number
  dealerTotal: number

  // Quiz-related
  currentQuestion: QuizQuestion | null
  canAnswer: boolean           // Locked until enough cards drawn
  playerAnswer: PlayerAnswer | null
  answers: PlayerAnswer[]      // All answers this session

  // Result
  specialResult: SpecialResult | null
  epistemicStatus: EpistemicStatus

  // Session stats
  wins: number
  losses: number
  totalQuestions: number
  correctAnswers: number
}

// ─── Philosophical Status Labels ──────────────────────────────────────────────

export const EPISTEMIC_LABELS: Record<EpistemicStatus, { label: string; color: string; description: string }> = {
  insufficient: {
    label: 'Nhận thức sơ khai',
    color: 'text-amber-600 dark:text-amber-400',
    description: 'Chưa đủ thực tiễn — cần rút thêm bài để nhận thức',
  },
  verifying: {
    label: 'Đang kiểm nghiệm',
    color: 'text-blue-600 dark:text-blue-400',
    description: 'Thực tiễn đang diễn ra — tiếp tục hay kết luận?',
  },
  approaching: {
    label: 'Gần đến chân lý',
    color: 'text-green-600 dark:text-green-400',
    description: 'Nhận thức gần hoàn thiện — thận trọng kết luận',
  },
  truth: {
    label: 'Chân lý tuyệt đối',
    color: 'text-yellow-500 dark:text-yellow-300',
    description: 'Đạt đỉnh cao của nhận thức — Chân lý 21!',
  },
  dogmatic: {
    label: 'Duy ý chí!',
    color: 'text-red-600 dark:text-red-400',
    description: 'Kết luận nóng vội khi thiếu thực tiễn — Quắc!',
  },
}

export const RESULT_MESSAGES: Record<SpecialResult, { title: string; subtitle: string; emoji: string }> = {
  xi_bang: {
    title: 'Xì Bàng!',
    subtitle: 'Đỉnh cao của trực quan sinh động — Hai lá Át, nhận thức tức thì!',
    emoji: '⚡',
  },
  xi_dach: {
    title: 'Xì Dách!',
    subtitle: 'Chân lý tức thì — Nhận thức tổng hợp hoàn hảo ngay từ đầu!',
    emoji: '🏆',
  },
  ngu_linh: {
    title: 'Ngũ Linh!',
    subtitle: 'Thực tiễn phong phú tạo nên chân lý — Năm lá bài, một nhận thức!',
    emoji: '🌟',
  },
  quac: {
    title: 'Quắc! Duy ý chí!',
    subtitle: 'Rút bài nóng vội khi thiếu thực tiễn dẫn đến kết luận sai lầm.',
    emoji: '💥',
  },
  win: {
    title: 'Thắng ván!',
    subtitle: 'Nhận thức đã được thực tiễn kiểm nghiệm — Chân lý được xác lập.',
    emoji: '✅',
  },
  lose: {
    title: 'Thua ván.',
    subtitle: 'Chân lý chưa đạt — Tiếp tục hành trình nhận thức.',
    emoji: '📖',
  },
  draw: {
    title: 'Hòa!',
    subtitle: 'Nhận thức tương đương — Chân lý còn đang tranh luận.',
    emoji: '⚖️',
  },
}
