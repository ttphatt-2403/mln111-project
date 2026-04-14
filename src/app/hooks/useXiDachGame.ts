import { useCallback, useEffect, useState } from 'react'
import type {
  AnswerOption,
  Card,
  GameState,
  PlayerAnswer,
  QuizQuestion,
} from '../data/gameTypes'
import {
  calculateHandValue,
  createDeck,
  dealerShouldDraw,
  detectResult,
  getEpistemicStatus,
  getRandomDrawHint,
  shuffleDeck,
} from '../data/deckUtils'
import quizData from '../../data/quiz-questions.json'

// ─── Quiz Pool ─────────────────────────────────────────────────────────────────

const questions = quizData.questions as QuizQuestion[]

function pickRandomQuestion(exclude: number[] = []): QuizQuestion {
  const available = questions.filter(q => !exclude.includes(q.id))
  const pool = available.length > 0 ? available : questions
  return pool[Math.floor(Math.random() * pool.length)]
}

// ─── Initial State ─────────────────────────────────────────────────────────────

function makeInitialState(): GameState {
  return {
    phase: 'idle',
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerTotal: 0,
    dealerTotal: 0,
    currentQuestion: null,
    canAnswer: false,
    playerAnswer: null,
    answers: [],
    specialResult: null,
    epistemicStatus: 'insufficient',
    wins: 0,
    losses: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  }
}

// ─── Hook API ──────────────────────────────────────────────────────────────────

export interface XiDachGameAPI {
  state: GameState
  drawHint: string
  // Quiz modal state
  quizModal: {
    isOpen: boolean
    question: QuizQuestion | null
    pendingAnswer: PlayerAnswer | null
  }
  startGame: () => void
  /** Open the quiz modal before hitting. Returns false if not in playerTurn. */
  requestHit: () => boolean
  /** Called after the player answers in the modal. Draws the card. */
  confirmHit: (option: AnswerOption) => void
  /** Dismiss quiz modal without drawing (cancel) */
  cancelHit: () => void
  stand: () => void
  newGame: () => void
}

export function useXiDachGame(): XiDachGameAPI {
  const [state, setState] = useState<GameState>(makeInitialState())
  const [drawHint, setDrawHint] = useState<string>(getRandomDrawHint())
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([])

  // ── Quiz modal state ──
  const [modalOpen, setModalOpen] = useState(false)
  const [modalQuestion, setModalQuestion] = useState<QuizQuestion | null>(null)
  const [modalAnswer, setModalAnswer] = useState<PlayerAnswer | null>(null)

  // ── Start Game ──────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    const deck = shuffleDeck(createDeck())
    const playerHand: Card[] = [deck[0], deck[2]]
    const dealerHand: Card[] = [deck[1], deck[3]]
    const restDeck = deck.slice(4)

    const playerTotal = calculateHandValue(playerHand)
    const dealerTotal = calculateHandValue(dealerHand)
    const epistemicStatus = getEpistemicStatus(playerHand, playerTotal)

    setDrawHint(getRandomDrawHint())
    setModalOpen(false)
    setModalQuestion(null)
    setModalAnswer(null)

    setState(prev => ({
      ...prev,
      phase: 'playerTurn',
      deck: restDeck,
      playerHand,
      dealerHand,
      playerTotal,
      dealerTotal,
      currentQuestion: null,
      canAnswer: false,
      playerAnswer: null,
      specialResult: null,
      epistemicStatus,
    }))
  }, [])

  // ── Request Hit → open quiz modal ──────────────────────────────────────────
  const requestHit = useCallback((): boolean => {
    if (state.phase !== 'playerTurn') return false
    if (state.playerTotal >= 21) return false

    const question = pickRandomQuestion(usedQuestionIds)
    setUsedQuestionIds(prev => {
      const next = [...prev, question.id]
      return next.length >= questions.length ? [] : next
    })
    setModalQuestion(question)
    setModalAnswer(null)
    setModalOpen(true)
    setDrawHint(getRandomDrawHint())
    return true
  }, [state.phase, state.playerTotal, usedQuestionIds])

  // ── Confirm Hit → player answered, now draw the card ───────────────────────
  const confirmHit = useCallback((option: AnswerOption) => {
    if (!modalQuestion || modalAnswer) return

    const isCorrect = option === modalQuestion.correctAnswer
    const answer: PlayerAnswer = {
      questionId: modalQuestion.id,
      selectedOption: option,
      isCorrect,
    }
    setModalAnswer(answer)

    // Update state with answer record immediately
    setState(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      answers: [...prev.answers, answer],
    }))

    if (!isCorrect) {
      // Wrong answer: show feedback briefly, then let them try again
      setTimeout(() => {
        setModalAnswer(null)
      }, 1500)
      return
    }

    // Correct answer: show feedback, then close modal and draw card
    setTimeout(() => {
      setModalOpen(false)
      setModalAnswer(null)
      setModalQuestion(null)

      setState(prev => {
        if (prev.phase !== 'playerTurn' || prev.deck.length === 0) return prev

        const [newCard, ...restDeck] = prev.deck
        const newHand = [...prev.playerHand, newCard]
        const newTotal = calculateHandValue(newHand)
        const epistemicStatus = getEpistemicStatus(newHand, newTotal)

        // Bust
        if (newTotal > 21) {
          return {
            ...prev,
            deck: restDeck,
            playerHand: newHand,
            playerTotal: newTotal,
            epistemicStatus,
            canAnswer: false,
            phase: 'result',
            specialResult: 'quac',
            losses: prev.losses + 1,
          }
        }

        // Ngũ Linh
        if (newHand.length === 5 && newTotal <= 21) {
          return {
            ...prev,
            deck: restDeck,
            playerHand: newHand,
            playerTotal: newTotal,
            epistemicStatus: 'truth',
            canAnswer: false,
            phase: 'result',
            specialResult: 'ngu_linh',
            wins: prev.wins + 1,
          }
        }

        return {
          ...prev,
          deck: restDeck,
          playerHand: newHand,
          playerTotal: newTotal,
          epistemicStatus,
          canAnswer: false,
        }
      })
    }, 1400)
  }, [modalQuestion, modalAnswer])

  // ── Cancel Hit ──────────────────────────────────────────────────────────────
  const cancelHit = useCallback(() => {
    setModalOpen(false)
    setModalQuestion(null)
    setModalAnswer(null)
  }, [])

  // ── Stand ────────────────────────────────────────────────────────────────────
  const stand = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playerTurn') return prev
      return { ...prev, phase: 'dealerTurn' }
    })
  }, [])

  // ── Dealer Turn ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (state.phase !== 'dealerTurn') return

    let timeoutId: ReturnType<typeof setTimeout>

    function dealerDraw(currentState: GameState) {
      const { dealerHand, deck, playerHand, playerTotal } = currentState
      const dealerTotal = calculateHandValue(dealerHand)

      if (dealerShouldDraw(dealerTotal) && deck.length > 0) {
        const [newCard, ...restDeck] = deck
        const newDealerHand = [...dealerHand, newCard]
        const newDealerTotal = calculateHandValue(newDealerHand)

        const nextState: GameState = {
          ...currentState,
          deck: restDeck,
          dealerHand: newDealerHand,
          dealerTotal: newDealerTotal,
        }

        timeoutId = setTimeout(() => {
          setState(nextState)
          dealerDraw(nextState)
        }, 600)
      } else {
        const result = detectResult(playerHand, dealerHand, playerTotal, dealerTotal)
        const isWin = ['win', 'xi_bang', 'xi_dach', 'ngu_linh'].includes(result)
        const isLoss = ['lose', 'quac'].includes(result)

        setState({
          ...currentState,
          dealerTotal,
          phase: 'result',
          specialResult: result,
          wins: isWin ? currentState.wins + 1 : currentState.wins,
          losses: isLoss ? currentState.losses + 1 : currentState.losses,
        })
      }
    }

    timeoutId = setTimeout(() => dealerDraw(state), 400)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase])

  // ── New Game ─────────────────────────────────────────────────────────────────
  const newGame = useCallback(() => {
    setModalOpen(false)
    setModalQuestion(null)
    setModalAnswer(null)
    setState(prev => ({
      ...makeInitialState(),
      wins: prev.wins,
      losses: prev.losses,
      totalQuestions: prev.totalQuestions,
      correctAnswers: prev.correctAnswers,
      answers: prev.answers,
    }))
  }, [])

  return {
    state,
    drawHint,
    quizModal: {
      isOpen: modalOpen,
      question: modalQuestion,
      pendingAnswer: modalAnswer,
    },
    startGame,
    requestHit,
    confirmHit,
    cancelHit,
    stand,
    newGame,
  }
}
