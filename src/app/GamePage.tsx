import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, AnimatePresence } from 'motion/react'
import { Moon, Sun, BookOpen, ArrowLeft } from 'lucide-react'

import GameHeroSection from './sections/GameHeroSection'
import GameSection from './sections/GameSection'
import RulesSection from './sections/RulesSection'
import PhilosophySection from './sections/PhilosophySection'
import BackToTopButton from './components/layout/BackToTopButton'

import { cormorant, lora } from './lib/fonts'

const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`

export default function GamePage() {
  const [isDark, setIsDark] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    return () => document.documentElement.classList.remove('dark')
  }, [isDark])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setReadingProgress(Math.round(v * 100)))
    return () => unsub()
  }, [scrollYProgress])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative" style={lora}>
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: PAPER_TEXTURE, backgroundRepeat: 'repeat' }}
      />

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #722f37 0%, #c9a45c 40%, #f5e6c8 50%, #c9a45c 60%, #722f37 100%)',
          boxShadow: '0 0 12px rgba(201,164,92,0.5)',
        }}
      />

      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b-2 border-primary/30 z-40"
        style={{ boxShadow: '0 2px 15px rgba(139, 107, 63, 0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: back button + logo */}
            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.div
                  whileHover={{ x: -3 }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline tracking-wider" style={cormorant}>Trang Chủ</span>
                </motion.div>
              </Link>

              <div className="w-px h-5 bg-primary/20" />

              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-8 h-8 rounded-full border-2 border-primary/40 flex items-center justify-center"
                >
                  <span className="text-primary text-base">🎴</span>
                </motion.div>
                <div>
                  <p className="text-base tracking-[0.12em] uppercase" style={{ ...cormorant, fontWeight: 600 }}>
                    Xì Dách Triết Học
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wider">Hành trình đi tìm Chân Lý 21</p>
                </div>
              </div>
            </div>

            {/* Right: dark mode */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 10 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-sm border border-primary/30 hover:bg-primary/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </header>

      {/* ── Content ── */}
      <main className="pt-[69px]">
        <GameHeroSection onStartGame={() => {}} />
        <GameSection />
        <RulesSection />
        <PhilosophySection />
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {readingProgress > 10 && readingProgress < 95 && (
          <BackToTopButton readingProgress={readingProgress} />
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="py-10 border-t-2 border-primary/30 bg-background/95">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary/60">🃏</span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <p className="text-sm text-muted-foreground tracking-wider mb-1" style={cormorant}>
            Xì Dách Triết Học — Mác–Lênin
          </p>
          <p className="text-xs text-muted-foreground italic">
            &ldquo;Thực tiễn là tiêu chuẩn của chân lý&rdquo;
          </p>
          <Link to="/" className="inline-block mt-4">
            <motion.span
              whileHover={{ opacity: 0.8 }}
              className="text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1 justify-center"
              style={cormorant}
            >
              <ArrowLeft className="w-3 h-3" />
              Quay về Trang Chủ
            </motion.span>
          </Link>
        </div>
      </footer>
    </div>
  )
}
