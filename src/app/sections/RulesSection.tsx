import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cormorant } from '../lib/fonts'

interface RuleItem {
  title: string
  content: string
  metaphor: string
  icon: string
}

const RULES: RuleItem[] = [
  {
    icon: '🎴',
    title: 'Bộ Bài & Chia Bài',
    content: 'Dùng bộ bài Tây 52 lá. Mỗi người chơi và nhà cái được chia 2 lá bài ban đầu. Mục tiêu là có tổng điểm gần 21 nhất mà không vượt quá 21.',
    metaphor: 'Ẩn dụ triết học: Hai lá bài đầu tiên là nhận thức ban đầu — cơ sở dữ liệu từ thực tiễn trực quan đầu tiên.',
  },
  {
    icon: '🔢',
    title: 'Quy Tắc Tính Điểm',
    content: 'Lá 2–10 tính theo mặt số. J, Q, K tính 10 điểm. Át (A) có thể tính 1 hoặc 11 điểm tùy tình huống có lợi nhất cho người cầm bài.',
    metaphor: 'Ẩn dụ triết học: Lá Át linh hoạt như tư duy biện chứng — ý nghĩa thay đổi tùy ngữ cảnh thực tiễn.',
  },
  {
    icon: '⚡',
    title: 'Xì Bàng & Xì Dách',
    content: 'Xì Bàng: 2 lá Át (điểm tối thượng, thắng tất cả). Xì Dách: 1 lá Át + 1 lá 10/J/Q/K (tổng tức thì 21, thắng mọi bài bình thường).',
    metaphor: 'Ẩn dụ triết học: Xì Bàng như trực quan sinh động đỉnh cao. Xì Dách như nhận thức tổng hợp tức thì, không cần kiểm nghiệm dài.',
  },
  {
    icon: '🌟',
    title: 'Ngũ Linh',
    content: 'Khi người chơi có tổng cộng 5 lá bài nhưng tổng điểm không vượt quá 21, đây gọi là Ngũ Linh và được thắng tự động.',
    metaphor: 'Ẩn dụ triết học: Ngũ Linh thể hiện thực tiễn phong phú — nhiều lần kiểm nghiệm dẫn đến nhận thức chân lý bền vững.',
  },
  {
    icon: '💥',
    title: 'Quắc / Bù',
    content: 'Nếu tổng điểm vượt quá 21, người chơi bị "Quắc" và thua ngay lập tức, không cần đợi đến lượt nhà cái.',
    metaphor: 'Ẩn dụ triết học: Quắc là duy ý chí — kết luận nóng vội khi chưa đủ thực tiễn dẫn đến sai lầm không thể sửa chữa.',
  },
  {
    icon: '🃏',
    title: 'Rút Bài & Dằn Bài',
    content: 'Người chơi có thể rút thêm bài để tăng điểm, hoặc dằn bài khi thấy đủ. Nhà cái phải rút bài khi tổng điểm dưới 17 và dừng khi đạt 17 trở lên.',
    metaphor: 'Ẩn dụ triết học: Rút bài = bổ sung thực tiễn. Dằn bài = kết luận nhận thức. Nhà cái tuân theo quy luật khách quan.',
  },
  {
    icon: '⚖️',
    title: 'So Điểm & Kết Quả',
    content: 'Sau khi cả hai dằn bài, so sánh tổng điểm. Điểm cao hơn (≤21) thắng. Nếu bằng nhau là hòa. Các trường hợp đặc biệt (Xì Bàng, Xì Dách) có ưu tiên riêng.',
    metaphor: 'Ẩn dụ triết học: So điểm cuối ván = thực tiễn kiểm nghiệm chân lý — ai nhận thức đúng, người đó được xác nhận.',
  },
  {
    icon: '🔒',
    title: 'Cơ Chế Khóa Câu Hỏi',
    content: 'Sau 2 lá ban đầu, câu hỏi triết học bị khóa. Chỉ sau khi rút thêm ≥1 lá và đạt tổng 12–20, hoặc có từ 3 lá trở lên, câu hỏi mới được mở khóa để trả lời.',
    metaphor: 'Ẩn dụ triết học: Cần đủ thực tiễn mới được phép kết luận — đây là nguyên tắc cốt lõi của lý luận nhận thức Mác–Lênin.',
  },
]

export default function RulesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="rules-section" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">Cơ Sở Lý Luận</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={cormorant}>
            Quy Luật Của Ván Bài
          </h2>
          <p className="text-sm text-muted-foreground italic">
            Mỗi luật chơi đều mang ẩn dụ về lý luận nhận thức Mác–Lênin
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-primary/30" />
            <span className="text-primary/40">✦</span>
            <div className="w-16 h-px bg-primary/30" />
          </div>
        </div>

        {/* Accordion Rules */}
        <div className="space-y-3">
          {RULES.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-primary/20 bg-card overflow-hidden"
              style={{ boxShadow: '0 2px 8px rgba(139,107,63,0.05)' }}
            >
              <button
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-primary/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{rule.icon}</span>
                  <span className="font-semibold text-foreground text-sm" style={cormorant}>
                    {rule.title}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground text-sm shrink-0"
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3 border-t border-primary/10 pt-4">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {rule.content}
                      </p>
                      <div className="flex items-start gap-3 p-3 rounded-md bg-primary/5 border border-primary/10">
                        <span className="text-primary text-xs mt-0.5 shrink-0">⬡</span>
                        <p className="text-xs text-primary/80 italic leading-relaxed">
                          {rule.metaphor}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
