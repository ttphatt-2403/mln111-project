import { motion } from 'motion/react'
import { cormorant } from '../lib/fonts'

const PRINCIPLES = [
  {
    icon: '🌱',
    number: 'I',
    role: 'Nguồn Gốc',
    title: 'Thực Tiễn Là Nguồn Gốc Của Nhận Thức',
    description:
      'Mọi tri thức đều bắt nguồn từ thực tiễn. Con người nhận thức thế giới thông qua tác động trực tiếp vào nó. Không có thực tiễn, không có nhận thức.',
    metaphor: 'Lá bài đầu tiên bạn nhận được = nhận thức sơ khai từ thực tiễn trực quan.',
    quote: '"Không phải ý thức quyết định tồn tại, mà tồn tại quyết định ý thức." — Marx',
    color: 'from-amber-800/40 to-amber-900/20',
    border: 'border-amber-600/30',
    accentText: 'text-amber-400',
  },
  {
    icon: '⚡',
    number: 'II',
    role: 'Động Lực',
    title: 'Thực Tiễn Là Động Lực Của Nhận Thức',
    description:
      'Thực tiễn đề ra nhu cầu, nhiệm vụ, phương hướng phát triển nhận thức. Chính thực tiễn thúc đẩy con người không ngừng tìm tòi và khám phá.',
    metaphor: 'Mỗi lần rút thêm bài = thực tiễn thúc đẩy quá trình nhận thức tiến lên.',
    quote: '"Thực tiễn đề ra nhiệm vụ cho nhận thức giải quyết." — Lênin',
    color: 'from-blue-900/40 to-blue-950/20',
    border: 'border-blue-600/30',
    accentText: 'text-blue-400',
  },
  {
    icon: '🎯',
    number: 'III',
    role: 'Mục Đích',
    title: 'Thực Tiễn Là Mục Đích Của Nhận Thức',
    description:
      'Con người nhận thức không chỉ để biết mà để làm. Mọi tri thức cuối cùng đều phải phục vụ thực tiễn, cải tạo tự nhiên và xã hội.',
    metaphor: 'Dằn bài và so điểm = ứng dụng nhận thức vào thực tiễn, kiểm định kết quả.',
    quote: '"Triết học không chỉ diễn giải thế giới mà còn phải cải tạo nó." — Marx',
    color: 'from-green-900/40 to-green-950/20',
    border: 'border-green-600/30',
    accentText: 'text-green-400',
  },
  {
    icon: '⚖️',
    number: 'IV',
    role: 'Tiêu Chuẩn',
    title: 'Thực Tiễn Là Tiêu Chuẩn Của Chân Lý',
    description:
      'Chỉ có thực tiễn mới kiểm nghiệm được tính đúng đắn của nhận thức. Tri thức được coi là chân lý khi được thực tiễn xác nhận, và bị bác bỏ khi thực tiễn phủ nhận.',
    metaphor: 'Kết quả cuối ván = thực tiễn kiểm nghiệm ai đúng, ai sai, chân lý được xác lập.',
    quote: '"Câu hỏi liệu tư duy con người có thể đạt tới chân lý là một vấn đề thực tiễn." — Marx',
    color: 'from-rose-900/40 to-rose-950/20',
    border: 'border-rose-500/30',
    accentText: 'text-rose-400',
  },
]

export default function PhilosophySection() {
  return (
    <section id="philosophy-section" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Kết Luận Của Nhận Thức</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={cormorant}>
            Bốn Vai Trò Của Thực Tiễn
          </h2>
          <p className="text-sm text-muted-foreground italic max-w-xl mx-auto">
            Toàn bộ ván bài Xì Dách là ẩn dụ cho bốn vai trò của thực tiễn trong triết học Mác–Lênin
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-primary/30" />
            <span className="text-primary/40">✦</span>
            <div className="w-16 h-px bg-primary/30" />
          </div>
        </div>

        {/* Philosophy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`rounded-xl border ${p.border} bg-gradient-to-br ${p.color} overflow-hidden`}
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-0.5">{p.icon}</div>
                  <div>
                    <p className={`text-xs tracking-widest uppercase font-bold mb-1 ${p.accentText}`}>
                      Vai trò {p.number} — {p.role}
                    </p>
                    <h3 className="text-lg font-bold text-foreground leading-tight" style={cormorant}>
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {p.description}
                </p>

                {/* Metaphor */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-background/30 border border-white/5">
                  <span className="text-xs mt-0.5">🎴</span>
                  <p className={`text-xs italic leading-relaxed ${p.accentText} opacity-90`}>
                    {p.metaphor}
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-current/20 pl-3">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    {p.quote}
                  </p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-xl border border-primary/20 bg-primary/5"
        >
          <h3 className="text-xl font-bold text-foreground mb-3" style={cormorant}>
            Con Đường Biện Chứng Của Nhận Thức
          </h3>
          <p className="text-sm text-muted-foreground italic leading-relaxed max-w-2xl mx-auto mb-4">
            "Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn — đó là con đường
            biện chứng của sự nhận thức chân lý, của sự nhận thức thực tại khách quan." — V.I. Lênin
          </p>
          <div className="flex items-center justify-center gap-2 text-primary/60 text-sm" style={cormorant}>
            <span>Thực tiễn</span>
            <span>→</span>
            <span>Nhận thức</span>
            <span>→</span>
            <span>Thực tiễn</span>
            <span>→</span>
            <span className="text-primary font-bold">Chân lý</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
