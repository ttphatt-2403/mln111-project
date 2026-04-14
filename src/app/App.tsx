import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, AnimatePresence } from 'motion/react'
import { Moon, Sun, BookOpen } from 'lucide-react'

import FloatingParticles from './components/layout/FloatingParticles'
import SideChapterNav from './components/layout/SideChapterNav'
import MarqueeBand from './components/layout/MarqueeBand'
import BackToTopButton from './components/layout/BackToTopButton'

import HeroSection from './sections/HeroSection'
import IntroSection from './sections/IntroSection'
import GallerySection from './sections/GallerySection'
import ContentSection from './sections/ContentSection'
import HeritageSection from './sections/HeritageSection'
import AuthorSection from './sections/AuthorSection'

import { cormorant, lora } from './lib/fonts'

// SVG paper texture as data URI – kept inline since it's a one-off background overlay
const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
const DOT_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b6b3f' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3Ccircle cx='0' cy='0' r='1.5'/%3E%3Ccircle cx='60' cy='0' r='1.5'/%3E%3Ccircle cx='0' cy='60' r='1.5'/%3E%3Ccircle cx='60' cy='60' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => setReadingProgress(Math.round(v * 100)))
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative" style={lora}>

      <FloatingParticles />

      {/* Paper texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply" style={{ backgroundImage: PAPER_TEXTURE, backgroundRepeat: 'repeat' }} />

      {/* Vintage dot pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: DOT_PATTERN, backgroundSize: '60px 60px' }} />

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #8b6b3f 0%, #c9a45c 40%, #f5e6c8 50%, #c9a45c 60%, #8b6b3f 100%)',
          boxShadow: '0 0 12px rgba(201,164,92,0.5)',
        }}
      />

      <AnimatePresence>
        {readingProgress > 8 && readingProgress < 96 && (
          <SideChapterNav progress={readingProgress} />
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b-2 border-primary/30 z-40"
        style={{ boxShadow: '0 2px 15px rgba(139, 107, 63, 0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center"
                >
                  <BookOpen className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-xl tracking-[0.15em] uppercase" style={{ ...cormorant, fontWeight: 600, letterSpacing: '0.15em' }}>
                    Triết Học
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wider">Mác-Lênin</p>
                </div>
              </div>

              {/* Game button */}
              <Link to="/game">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-sm
                    bg-gradient-to-r from-amber-800/80 to-amber-700/80
                    border border-amber-600/40 text-amber-100 text-sm font-semibold
                    hover:from-amber-700/90 hover:to-amber-600/90 transition-all shadow-sm"
                  style={cormorant}
                >
                  <span>🎴</span>
                  <span className="tracking-wider">Chơi Game Xì Dách</span>
                </motion.div>
              </Link>

              {/* Reading progress pill */}
              <AnimatePresence>
                {readingProgress > 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="hidden md:flex items-center gap-3 px-4 py-2 rounded-sm bg-primary/10 border border-primary/20"
                  >
                    <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div className="h-full bg-primary" style={{ width: `${readingProgress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-primary tracking-wider" style={cormorant}>
                      {readingProgress}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

      <main>
        <HeroSection scrollYProgress={scrollYProgress} onScrollTo={scrollToSection} />
        <MarqueeBand />
        <IntroSection />
        <GallerySection />
        <ContentSection />
        <HeritageSection />
        <AuthorSection />
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {readingProgress > 10 && readingProgress < 95 && (
          <BackToTopButton readingProgress={readingProgress} />
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="py-12 border-t-2 border-primary/30 bg-background/95">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary/40" />
            <BookOpen className="w-5 h-5 text-primary" />
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <p className="text-sm text-muted-foreground tracking-wider mb-2" style={cormorant}>
            Triết Học Mác-Lênin
          </p>
          <p className="text-xs text-muted-foreground italic">
            &ldquo;Thực tiễn là tiêu chuẩn của chân lý&rdquo;
          </p>
        </div>
      </footer>
    </div>
  )
}

