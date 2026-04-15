import { useState } from 'react'
import { motion } from 'motion/react'
import { cormorant, lora } from '../../lib/fonts'

interface AiTool {
  name: string
  role: string
  /** URL ảnh logo từ Simple Icons CDN hoặc nguồn khác */
  logoUrl: string
  /** Màu brand hex (không có #) – dùng cho Simple Icons CDN */
  brandColor?: string
}

const AI_TOOLS: AiTool[] = [
  {
    name: 'Claude AI',
    role: 'Lập trình & kiến trúc',
    logoUrl: 'https://cdn.simpleicons.org/anthropic/D4A574',
  },
  {
    name: 'Figma AI',
    role: 'Thiết kế giao diện',
    logoUrl: 'https://cdn.simpleicons.org/figma/D4A574',
  },
  {
    name: 'NotebookLM',
    role: 'Nghiên cứu & tổng hợp',
    logoUrl: 'https://cdn.simpleicons.org/google/D4A574',
  },
  {
    name: 'ChatGPT',
    role: 'Biên soạn nội dung',
    logoUrl: 'https://cdn.simpleicons.org/openai/D4A574',
  },
  {
    name: 'Gemini',
    role: 'Tra cứu & đối chiếu',
    logoUrl: 'https://cdn.simpleicons.org/googlegemini/D4A574',
  },
  {
    name: 'Antigravity',
    role: 'Hỗ trợ sáng tạo',
    // Không có trên Simple Icons – dùng letter avatar
    logoUrl: '',
  },
  {
    name: 'Complexity AI',
    role: 'Phân tích & xử lý dữ liệu',
    // Không có trên Simple Icons – dùng letter avatar
    logoUrl: '',
  },
  {
    name: 'GitHub Copilot',
    role: 'Gợi ý code',
    logoUrl: 'https://cdn.simpleicons.org/githubcopilot/D4A574',
  },
]

/** Fallback khi logo không tải được hoặc không có URL */
function LetterAvatar({ name }: { name: string }) {
  return (
    <span
      className="flex items-center justify-center w-5 h-5 rounded-full
        bg-primary/20 text-primary text-[10px] font-semibold leading-none"
      style={cormorant}
    >
      {name.charAt(0)}
    </span>
  )
}

function ToolLogo({ tool }: { tool: AiTool }) {
  const [failed, setFailed] = useState(false)

  if (!tool.logoUrl || failed) return <LetterAvatar name={tool.name} />

  return (
    <img
      src={tool.logoUrl}
      alt={`${tool.name} logo`}
      width={20}
      height={20}
      className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
      onError={() => setFailed(true)}
    />
  )
}

export default function AiCredits() {
  return (
    <section className="py-10 border-t border-primary/15 bg-background/80">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-xs text-primary/50 uppercase tracking-[0.3em] mb-1" style={cormorant}>
            Được hỗ trợ bởi
          </p>
          <p className="text-sm text-muted-foreground italic" style={lora}>
            Dự án này được thực hiện với sự hỗ trợ của các công cụ AI
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {AI_TOOLS.map((tool, i) => (
            <motion.li
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              whileHover={{ y: -2, scale: 1.04 }}
              className="group relative flex items-center gap-2 px-4 py-2
                border border-primary/20 rounded-sm
                bg-primary/5 hover:bg-primary/10 hover:border-primary/35
                transition-colors duration-200 cursor-default"
              title={tool.role}
            >
              <ToolLogo tool={tool} />

              <span
                className="text-sm text-foreground/70 group-hover:text-primary transition-colors duration-200 tracking-wide"
                style={cormorant}
              >
                {tool.name}
              </span>

              {/* Tooltip */}
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs text-primary/80 bg-background border border-primary/20
                  px-2 py-0.5 rounded-sm opacity-0 group-hover:opacity-100
                  transition-opacity duration-200 pointer-events-none z-10"
                style={lora}
              >
                {tool.role}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
