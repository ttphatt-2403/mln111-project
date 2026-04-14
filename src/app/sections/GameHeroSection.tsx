import { motion } from 'motion/react'
import { cormorant } from '../lib/fonts'

interface GameHeroSectionProps {
  onStartGame: () => void
}

export default function GameHeroSection({ onStartGame }: GameHeroSectionProps) {
  const scrollToGame = () => {
    document.getElementById('game-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="game-hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    >
      {/* Background: dark felt table texture */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1a120a] via-[#1f1810] to-[#2a1d12]"
        aria-hidden
      />

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,164,92,0.25), transparent)' }}
        aria-hidden
      />

      {/* Corner ornaments */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map(pos => (
        <div key={pos} className={`absolute ${pos} text-amber-600/20 text-3xl pointer-events-none`}>✦</div>
      ))}

      {/* Horizontal rule ornament */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600/60" />
        <span className="text-amber-500/60 text-lg">♠ ♥ ♦ ♣</span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600/60" />
      </div>

      {/* Subtitle label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 text-xs tracking-[0.35em] uppercase text-amber-500/70 mb-4"
      >
        Triết Học Mác – Lênin × Xì Dách Việt Nam
      </motion.p>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold text-amber-100 leading-tight mb-6 max-w-4xl"
        style={cormorant}
      >
        Xì Dách:
        <br />
        <span className="text-amber-400">Hành Trình</span>
        <br />
        Đi Tìm Chân Lý&nbsp;21
      </motion.h1>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 w-24 h-px bg-amber-500/50 mb-6"
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-base md:text-lg text-amber-200/70 italic max-w-xl leading-relaxed mb-4"
        style={{ fontFamily: "'Lora', serif" }}
      >
        "Rút bài như bổ sung thực tiễn, dằn bài như kết luận nhận thức."
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 text-xs text-amber-300/50 max-w-md leading-relaxed mb-12"
      >
        Trải nghiệm game bài Xì Dách kết hợp cùng 42 câu hỏi triết học Mác–Lênin.
        Chưa có đủ thực tiễn thì chưa thể kết luận chân lý.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex flex-col sm:flex-row gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { onStartGame(); scrollToGame() }}
          className="px-8 py-4 rounded-lg font-bold text-base tracking-wider
            bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50
            hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg shadow-amber-900/40"
          style={cormorant}
        >
          ✦ Bắt Đầu Nhận Thức
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => document.getElementById('rules-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 rounded-lg font-semibold text-base tracking-wider
            border border-amber-600/40 text-amber-300/80
            hover:bg-amber-600/10 transition-all"
          style={cormorant}
        >
          Xem Luật Chơi
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-600/40 z-10"
      >
        <span className="text-xs tracking-widest uppercase">Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-lg"
        >↓</motion.div>
      </motion.div>
    </section>
  )
}
