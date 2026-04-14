import { motion } from 'motion/react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import OrnamentDivider from '../components/layout/OrnamentDivider'
import { cormorant } from '../lib/fonts'

const HERITAGE_ITEMS = [
  { url: 'https://images.unsplash.com/photo-1775422051227-1d229fe032e8?w=600&q=80', title: 'Tư tưởng Cổ điển' },
  { url: 'https://images.unsplash.com/photo-1703604229516-9c4832ed3740?w=600&q=80', title: 'Triết lý Nhân văn' },
  { url: 'https://images.unsplash.com/photo-1761504233640-74d89da55147?w=600&q=80', title: 'Suy tư Biện chứng' },
]

export default function HeritageSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl mb-4 tracking-wide" style={{ ...cormorant, fontWeight: 300 }}>
            Di Sản Triết Học
          </h3>
          <OrnamentDivider lineWidth="md" diamondSize="sm" spin="none" animated />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {HERITAGE_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.18, duration: 0.65 }}
              whileHover={{ y: -14, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border-2 border-primary/30 shadow-xl">
                <ImageWithFallback
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ filter: 'sepia(0.6) contrast(1.2) grayscale(0.3)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <h4 className="text-white text-xl font-light tracking-wider" style={{ ...cormorant, textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
