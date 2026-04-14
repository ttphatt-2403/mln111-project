import { motion } from 'motion/react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1476081718509-d5d0b661a376?w=600&q=80',
  'https://images.unsplash.com/photo-1755675672834-05f6d0580634?w=600&q=80',
  'https://images.unsplash.com/photo-1756993263826-9b4bae15e2b2?w=600&q=80',
]

export default function GallerySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background/95 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {GALLERY_IMAGES.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
              className="relative aspect-square overflow-hidden rounded-sm border-2 border-primary/30 shadow-lg cursor-pointer"
            >
              <ImageWithFallback
                src={url}
                alt={`Philosophy imagery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                style={{ filter: 'sepia(0.4) contrast(1.1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
