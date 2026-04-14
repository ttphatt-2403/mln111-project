import { motion } from 'motion/react'
import { User } from 'lucide-react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { cormorant, lora } from '../lib/fonts'

const SMALL_GALLERY = [
  'https://images.unsplash.com/photo-1715471437304-e1c36f849b90?w=400&q=80',
  'https://images.unsplash.com/photo-1768767390094-d462d3148d28?w=400&q=80',
  'https://images.unsplash.com/photo-1757624813590-7debccf0094a?w=400&q=80',
]

const BIO_TRAITS = [
  'Nhà triết học vĩ đại',
  'Người sáng lập chủ nghĩa Mác-xít',
  'Tác giả của nhiều tác phẩm quan trọng',
]

export default function AuthorSection() {
  return (
    <section id="author" className="py-24 bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-px bg-primary/40" />
            <User className="w-6 h-6 text-primary/60" />
            <div className="w-20 h-px bg-primary/40" />
          </div>
          <h2 className="text-5xl mb-4 tracking-wide" style={{ ...cormorant, fontWeight: 300 }}>
            Về Tác Giả
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Portrait gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -1 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute -inset-6 border-2 border-primary/20" style={{ borderStyle: 'double' }} />
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1597238683341-26931c8d9a34?w=800&q=80"
                  alt="Karl Marx statue"
                  className="relative w-full aspect-[3/4] object-cover rounded-sm shadow-2xl border-4 border-background"
                  style={{ filter: 'sepia(0.5) contrast(1.2)', boxShadow: '0 10px 40px rgba(139, 107, 63, 0.4)' }}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {SMALL_GALLERY.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.12, duration: 0.5 }}
                  whileHover={{ scale: 1.12, y: -5, rotate: index % 2 === 0 ? 2 : -2 }}
                  className="relative aspect-square overflow-hidden rounded-sm border-2 border-primary/30 shadow-md"
                >
                  <ImageWithFallback
                    src={url}
                    alt={`Scholar ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ filter: 'sepia(0.5) contrast(1.15)' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-4xl mb-3 tracking-wide" style={{ ...cormorant, fontWeight: 400 }}>Karl Marx</h3>
              <p className="text-xl text-primary tracking-wider" style={cormorant}>1818 – 1883</p>
            </div>

            <div className="h-px bg-gradient-to-r from-primary/40 to-transparent" />

            {['Karl Marx là một triết gia, nhà kinh tế chính trị học, nhà sử học, lý luận chính trị, nhà xã hội học và nhà báo chí người Đức. Ông là người sáng lập chủ nghĩa duy vật biện chứng và chủ nghĩa xã hội khoa học.',
              'Tư tưởng của Marx đã có ảnh hưởng sâu rộng đến triết học, kinh tế học, chính trị học và nhiều lĩnh vực khác. Tác phẩm nổi tiếng nhất của ông bao gồm "Tuyên ngôn của Đảng Cộng sản" và "Tư bản".',
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                className="text-lg leading-relaxed text-foreground/90"
                style={lora}
              >
                {text}
              </motion.p>
            ))}

            <ul className="pt-4 space-y-3">
              {BIO_TRAITS.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.12, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: [45, 135, 45] }}
                    transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-2 h-2 border border-primary/40 flex-shrink-0"
                  />
                  <span className="text-base" style={lora}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
