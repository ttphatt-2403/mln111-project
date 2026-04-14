import type { Card, EpistemicStatus, Rank, SpecialResult, Suit } from './gameTypes'

// ─── Deck Creation ────────────────────────────────────────────────────────────

const SUITS: Suit[] = ['♠', '♥', '♦', '♣']
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export function createDeck(): Card[] {
  return SUITS.flatMap(suit =>
    RANKS.map(rank => ({
      suit,
      rank,
      id: `${suit}-${rank}-${Math.random().toString(36).slice(2, 7)}`,
    })),
  )
}

export function shuffleDeck(deck: Card[]): Card[] {
  const arr = [...deck]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// ─── Score Calculation ────────────────────────────────────────────────────────

/**
 * Returns the face value of a single card.
 * Aces are returned as 11 initially; we'll adjust in calculateHandValue.
 */
export function getCardBaseValue(rank: Rank): number {
  if (rank === 'A') return 11
  if (['J', 'Q', 'K'].includes(rank)) return 10
  return parseInt(rank, 10)
}

/**
 * Calculates the optimal total for a hand.
 * Aces start at 11 and are reduced to 1 as needed to avoid busting.
 */
export function calculateHandValue(cards: Card[]): number {
  let total = 0
  let aces = 0

  for (const card of cards) {
    if (card.rank === 'A') {
      aces++
      total += 11
    } else {
      total += getCardBaseValue(card.rank)
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }

  return total
}

// ─── Special Case Detection ───────────────────────────────────────────────────

/** Xì Bàng: exactly 2 Aces */
export function isXiBang(cards: Card[]): boolean {
  return cards.length === 2 && cards.every(c => c.rank === 'A')
}

/** Xì Dách: exactly 1 Ace + one 10/J/Q/K */
export function isXiDach(cards: Card[]): boolean {
  if (cards.length !== 2) return false
  const ranks = cards.map(c => c.rank)
  const hasAce = ranks.includes('A')
  const hasTen = ranks.some(r => ['10', 'J', 'Q', 'K'].includes(r))
  return hasAce && hasTen
}

/** Ngũ Linh: 5 cards and total ≤ 21 */
export function isNguLinh(cards: Card[]): boolean {
  return cards.length === 5 && calculateHandValue(cards) <= 21
}

/** Quắc: total > 21 */
export function isQuac(total: number): boolean {
  return total > 21
}

// ─── Result Detection ─────────────────────────────────────────────────────────

export function detectResult(
  playerCards: Card[],
  dealerCards: Card[],
  playerTotal: number,
  dealerTotal: number,
): SpecialResult {
  // Player bust
  if (isQuac(playerTotal)) return 'quac'

  // Player special hands (checked before dealer)
  if (isXiBang(playerCards)) return 'xi_bang'
  if (isXiDach(playerCards)) return 'xi_dach'
  if (isNguLinh(playerCards)) return 'ngu_linh'

  // Dealer special hands override win
  if (isXiBang(dealerCards) && !isXiBang(playerCards)) return 'lose'
  if (isXiDach(dealerCards) && !isXiDach(playerCards) && !isXiBang(playerCards)) return 'lose'

  // Normal comparison
  if (isQuac(dealerTotal)) return 'win'
  if (playerTotal > dealerTotal) return 'win'
  if (playerTotal < dealerTotal) return 'lose'
  return 'draw'
}

// ─── Epistemic Status ─────────────────────────────────────────────────────────

export function getEpistemicStatus(cards: Card[], total: number): EpistemicStatus {
  if (total > 21) return 'dogmatic'
  if (total === 21) return 'truth'
  if (total >= 18) return 'approaching'
  if (total >= 12) return 'verifying'
  return 'insufficient'
}

// ─── Quiz Unlock Logic ────────────────────────────────────────────────────────

/**
 * Determines if the quiz question should be unlocked.
 * Rules:
 * - After initial 2 cards: LOCKED always
 * - After ≥1 additional card drawn AND total is 12–20: UNLOCKED
 * - After ≥3 cards total AND total ≤ 21: UNLOCKED
 * - If bust: LOCKED forever
 */
export function shouldUnlockQuiz(cards: Card[], total: number): boolean {
  if (total > 21) return false  // Bust: never unlock
  if (cards.length <= 2) return false  // Initial deal: locked
  if (cards.length >= 5 && total <= 21) return true  // Ngũ Linh territory: unlock
  if (cards.length >= 3 && total >= 12 && total <= 20) return true
  return false
}

// ─── Dealer Logic ─────────────────────────────────────────────────────────────

/** Standard dealer logic: draw until 17+ */
export function dealerShouldDraw(total: number): boolean {
  return total < 17
}

// ─── Philosophical Draw Hints ─────────────────────────────────────────────────

const DRAW_HINTS = [
  'Thực tiễn là nguồn gốc của nhận thức — hãy rút thêm.',
  'Mỗi lá bài là một dữ kiện mới từ hiện thực khách quan.',
  'Nhận thức cần được bổ sung qua thực tiễn liên tục.',
  'Lênin: "Từ trực quan sinh động đến tư duy trừu tượng."',
  'Chưa đủ thực tiễn thì chưa thể kết luận chân lý.',
  'Thực tiễn là động lực thúc đẩy nhận thức phát triển.',
  'Mỗi vòng khâu nhận thức đều bắt đầu từ thực tiễn.',
  'Tri thức kinh nghiệm cần được nâng lên thành lý luận.',
  '"Học mà không hành thì vô ích" — Hồ Chí Minh.',
  'Thực tiễn kiểm nghiệm tính đúng đắn của nhận thức.',
]

export function getRandomDrawHint(): string {
  return DRAW_HINTS[Math.floor(Math.random() * DRAW_HINTS.length)]
}
