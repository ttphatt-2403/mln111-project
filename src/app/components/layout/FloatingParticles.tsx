import { motion } from 'motion/react'
import { PARTICLES } from '../../data/particles'

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: -10,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(201,164,92,0.7) 0%, rgba(139,107,63,0.3) 100%)',
          }}
          animate={{
            y: [0, -1400],
            opacity: [0, 0.7, 0.5, 0.7, 0],
            x: [0, Math.sin(p.id * 1.3) * 60, Math.cos(p.id * 0.8) * 40, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
