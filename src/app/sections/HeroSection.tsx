import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { Quote, ArrowRight } from 'lucide-react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import OrnamentDivider from '../components/layout/OrnamentDivider'
import { cormorant, garamond } from '../lib/fonts'

interface Props {
  scrollYProgress: MotionValue<number>
  onScrollTo: (id: string) => void
}

const HERO_LINES = ['Thực Tiễn Là', 'Tiêu Chuẩn', 'Của Chân Lý']

export default function HeroSection({ onScrollTo }: Props) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(heroScroll, [0, 1], ['0%', '45%'])
  const contentY = useTransform(heroScroll, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1775144657294-8b170edbb526?w=1920&q=80"
          alt="Classical architecture"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(0.6) contrast(1.1)', opacity: 0.08 }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
        style={{ y: contentY, opacity: heroOpacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Top ornament */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-12"
          >
            <OrnamentDivider lineWidth="xl" diamondSize="md" spin="full" className="flex items-center justify-center gap-4 mb-8" />
            <p className="text-sm text-primary/70 tracking-[0.3em] uppercase mb-2" style={cormorant}>
              Triết Học Mác-Lênin
            </p>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl mb-8 tracking-wide leading-tight" style={{ ...cormorant, fontWeight: 300, letterSpacing: '0.05em' }}>
              {HERO_LINES.map((line, li) => (
                <motion.span
                  key={li}
                  className="block"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.3 + li * 0.2 }}
                  style={li === 1 ? { color: 'var(--primary)', fontWeight: 400 } : {}}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-primary/40" />
              <Quote className="w-6 h-6 text-primary/40" />
              <div className="w-16 h-px bg-primary/40" />
            </div>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="text-2xl text-muted-foreground italic leading-relaxed max-w-2xl mx-auto"
              style={garamond}
            >
              Khám phá tư tưởng triết học vĩ đại về mối quan hệ biện chứng giữa lý thuyết và thực tiễn
            </motion.p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.06, y: -3, boxShadow: '0 12px 30px rgba(139,107,63,0.35)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onScrollTo('content')}
              className="px-10 py-4 bg-primary text-primary-foreground rounded-sm border-2 border-primary shadow-lg transition-all flex items-center gap-3"
              style={{ ...cormorant, fontWeight: 500, letterSpacing: '0.1em' }}
            >
              Khám Phá Ngay
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onScrollTo('author')}
              className="px-10 py-4 border-2 border-primary text-primary rounded-sm hover:bg-primary/5 transition-all"
              style={{ ...cormorant, fontWeight: 500, letterSpacing: '0.1em' }}
            >
              Về Tác Giả
            </motion.button>
          </motion.div>

          {/* Bottom ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <OrnamentDivider lineWidth="xl" diamondSize="md" spin="none" animated={false} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <p className="text-xs tracking-wider uppercase" style={cormorant}>Cuộn xuống</p>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
