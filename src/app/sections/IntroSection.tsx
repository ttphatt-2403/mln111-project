import { motion } from 'motion/react'
import { Quote } from 'lucide-react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { cormorant, lora } from '../lib/fonts'

export default function IntroSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background via-background/98 to-background/95 relative overflow-hidden border-b-2 border-primary/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Manuscript image */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -1.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-primary/30 shadow-2xl">
              <motion.div whileHover={{ scale: 1.07 }} transition={{ duration: 0.5 }} className="w-full h-full">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1643377525032-0fb68a40f237?w=800&q=80"
                  alt="Vintage manuscript"
                  className="w-full h-full object-cover"
                  style={{ filter: 'sepia(0.7) contrast(1.2)' }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/30" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 border border-primary/30 rounded-sm"
            >
              <p className="text-sm text-primary tracking-widest uppercase" style={{ ...cormorant, letterSpacing: '0.2em' }}>
                Nghiên Cứu Triết Học
              </p>
            </motion.div>

            <h2 className="text-4xl md:text-5xl leading-tight" style={{ ...cormorant, fontWeight: 300 }}>
              {['Từ Những Trang Sách', 'Đến Thực Tiễn'].map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  style={i === 1 ? { color: 'var(--primary)' } : {}}
                >
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg leading-relaxed text-muted-foreground"
              style={lora}
            >
              Mỗi trang sách triết học không chỉ là những dòng chữ khô khan, mà là kết tinh của hàng nghìn năm tư duy nhân loại. Từ những bản thảo cổ xưa đến tư tưởng Mác-Lênin hiện đại, tri thức luôn gắn liền với thực tiễn.
            </motion.p>

            <div className="flex items-center gap-3 pt-4">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="w-16 h-px bg-primary/40 origin-left"
              />
              <Quote className="w-5 h-5 text-primary/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
