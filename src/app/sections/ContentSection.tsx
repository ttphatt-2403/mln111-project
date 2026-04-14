import { motion } from 'motion/react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import BookChapter from '../components/book/BookChapter'
import BookParagraph from '../components/book/BookParagraph'
import BookQuote from '../components/book/BookQuote'
import LabeledHeading from '../components/book/LabeledHeading'
import OrnamentDivider from '../components/layout/OrnamentDivider'
import { cormorant, lora, garamond } from '../lib/fonts'

const CLOSING_IMAGES = [
  'https://images.unsplash.com/photo-1632038585992-fecf8a0cf59d?w=500&q=80',
  'https://images.unsplash.com/photo-1648996757972-918f03837d0d?w=500&q=80',
  'https://images.unsplash.com/photo-1765969934422-077ccae29246?w=500&q=80',
]

export default function ContentSection() {
  return (
    <section id="content" className="py-24 bg-gradient-to-b from-background via-background/98 to-background relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <OrnamentDivider lineWidth="lg" diamondSize="md" spin="rock" className="flex items-center justify-center gap-4 mb-6" />
          <motion.h2
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="text-5xl md:text-6xl mb-6 tracking-wide"
            style={{ ...cormorant, fontWeight: 300, letterSpacing: '0.05em' }}
          >
            Nội Dung Nghiên Cứu
          </motion.h2>
          <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto" style={garamond}>
            Khám phá sáu chương nghiên cứu sâu sắc về mối quan hệ giữa thực tiễn và chân lý
          </p>
        </motion.div>

        <div className="space-y-20">

          {/* ── Chapter 1: Mở đầu ── */}
          <BookChapter number="" title="Mở đầu" subtitle='Bản chất "thực tiễn" của chân lý' direction="left">
            <BookParagraph>
              Trong lịch sử triết học, vấn đề con người có thể nhận thức được chân lý khách quan hay không luôn là một câu hỏi trung tâm. Karl Marx đã đưa ra một nhận định mang tính bước ngoặt:
            </BookParagraph>

            <BookQuote author="Karl Marx">
              Vấn đề tìm hiểu xem tư duy của con người có thể đạt tới chân lý khách quan không, hoàn toàn không phải là một vấn đề lý luận mà là một vấn đề thực tiễn.
            </BookQuote>

            <BookParagraph>
              Nhận định này khẳng định rằng tính đúng đắn của tư duy không thể được quyết định bởi những tranh luận lý thuyết thuần túy, mà chỉ có thể được kiểm chứng trong hoạt động thực tiễn của con người. Để thấy rõ giá trị của quan điểm này, cần đặt nó trong sự đối lập với các lập trường triết học trước đó.
            </BookParagraph>

            <BookParagraph>
              Chủ nghĩa duy tâm cho rằng nhận thức bắt nguồn từ ý thức chủ quan hoặc các "ý niệm" trừu tượng, tách rời khỏi thế giới vật chất. Trong khi đó, chủ nghĩa hoài nghi và thuyết không thể biết lại nghi ngờ hoặc phủ nhận khả năng con người nhận thức được bản chất của thế giới.
            </BookParagraph>

            <BookParagraph>
              Vượt qua những hạn chế này, Marx đã đưa thực tiễn trở thành tiêu chuẩn khách quan duy nhất để kiểm nghiệm chân lý, biến vấn đề nhận thức từ phạm vi tư duy trừu tượng thành vấn đề của hoạt động hiện thực.
            </BookParagraph>
          </BookChapter>

          {/* ── Chapter 2: Cơ sở lý thuyết ── */}
          <BookChapter number="2" title="Cơ sở lý thuyết" subtitle="Chân lý là một quá trình mang tính lịch sử – cụ thể" direction="right">
            {/* Grid layout: text left, image right – no whitespace regardless of text length */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-start">
              <div className="space-y-0">
                <BookParagraph>
                  Theo triết học Mác – Lênin, thực tiễn được hiểu là toàn bộ hoạt động vật chất – cảm tính, mang tính lịch sử – xã hội của con người nhằm cải tạo tự nhiên và xã hội. Chính từ hoạt động này mà nhận thức của con người được hình thành và phát triển.
                </BookParagraph>

                <BookParagraph>
                  Một trong những luận điểm quan trọng là chân lý không phải là một thực thể bất biến, mà mang tính lịch sử – cụ thể. Điều đó có nghĩa là không tồn tại chân lý trừu tượng chung chung, mà mọi tri thức chỉ trở thành chân lý khi nó phản ánh đúng sự vật trong những điều kiện và hoàn cảnh lịch sử xác định.
                </BookParagraph>
              </div>

              {/* Decorative image – full height of text column */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="hidden md:block self-stretch"
              >
                <div className="relative h-full min-h-[240px]">
                  <div className="absolute -inset-2 border border-primary/20" style={{ borderStyle: 'double' }} />
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }} className="h-full">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1765850258689-8e300b680b0f?w=400&q=80"
                      alt="Vintage writing"
                      className="w-full h-full object-cover rounded-sm shadow-lg relative z-10"
                      style={{ filter: 'sepia(0.5) contrast(1.1)' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <BookParagraph>
              Ví dụ, định luật vạn vật hấp dẫn của Isaac Newton là một chân lý khoa học trong phạm vi thế giới vĩ mô. Tuy nhiên, khi nghiên cứu ở cấp độ vi mô hoặc trong điều kiện vận tốc gần bằng vận tốc ánh sáng, lý thuyết này cần được bổ sung và phát triển bởi thuyết tương đối của Albert Einstein. Điều này cho thấy chân lý luôn vận động và phát triển cùng với thực tiễn.
            </BookParagraph>
          </BookChapter>

          {/* ── Visual Divider: Classical Statue ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="my-16 relative"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm border-2 border-primary/30 shadow-2xl group">
                <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1761504233640-74d89da55147?w=1200&q=80"
                    alt="Classical thinking statue"
                    className="w-full h-full object-cover"
                    style={{ filter: 'sepia(0.6) contrast(1.15) brightness(0.95)' }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-sm italic opacity-90" style={{ ...garamond, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                    Tư duy triết học - Từ lý thuyết đến thực tiễn
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Chapter 3: Vòng lặp biện chứng ── */}
          <BookChapter number="3" title="Vòng lặp biện chứng của nhận thức" subtitle="Quá trình nhận thức vận động theo vòng xoáy ốc" direction="left">
            <BookParagraph>
              Nhận thức trong triết học Mác – Lênin không diễn ra theo đường thẳng, mà vận động theo một quá trình biện chứng mang tính vòng xoáy ốc:
            </BookParagraph>

            <BookQuote>
              Thực tiễn → Nhận thức (cảm tính và lý tính) → Thực tiễn (kiểm nghiệm) → Nhận thức mới (sâu sắc hơn)
            </BookQuote>

            <BookParagraph>
              Thực tiễn cung cấp những dữ liệu cảm tính ban đầu, từ đó con người tiến hành trừu tượng hóa để hình thành nhận thức lý tính. Tuy nhiên, nhận thức lý tính luôn tiềm ẩn nguy cơ xa rời hiện thực. Vì vậy, nó phải quay trở lại thực tiễn để được kiểm nghiệm.
            </BookParagraph>

            <BookParagraph>
              Mỗi chu kỳ lặp lại là một quá trình giải quyết mâu thuẫn giữa cái đã biết và cái chưa biết, giữa sai lầm và chân lý, giúp nhận thức ngày càng tiến gần hơn đến chân lý khách quan. Đây chính là "linh hồn" của lý luận nhận thức Mác-xít.
            </BookParagraph>
          </BookChapter>

          {/* ── Chapter 4: Vai trò của thực tiễn ── */}
          <BookChapter number="4" title="Vai trò của thực tiễn" subtitle="Ba vai trò căn bản trong mối quan hệ với nhận thức" direction="right">
            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {[
                { url: 'https://images.unsplash.com/photo-1775129667669-9afc72c0fe02?w=600&q=80', alt: 'Study desk with candle' },
                { url: 'https://images.unsplash.com/photo-1773606517379-098687ee08b2?w=600&q=80', alt: 'Vintage inkwell' },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="relative aspect-square overflow-hidden rounded-sm border border-primary/30 shadow-md"
                >
                  <ImageWithFallback
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    style={{ filter: 'sepia(0.5) contrast(1.1)' }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Role I */}
            <LabeledHeading label="I" title="Thực tiễn là cơ sở, động lực của nhận thức" variant="role" />
            <BookParagraph>
              Thực tiễn cung cấp những tài liệu, "vật liệu" ban đầu cho nhận thức của con người. Thông qua hoạt động thực tiễn, các sự vật và hiện tượng buộc phải bộc lộ những thuộc tính, mối liên hệ và quy luật của chúng để con người có thể tìm hiểu và nhận thức. Thực tiễn đồng thời luôn đặt ra những nhu cầu, nhiệm vụ và phương hướng phát triển cho nhận thức, thúc đẩy các ngành khoa học ra đời và không ngừng phát triển. Chính trong quá trình đó, thực tiễn rèn luyện các giác quan của con người trở nên tinh tế, hoàn thiện hơn, đồng thời là cơ sở để chế tạo ra các công cụ, máy móc hỗ trợ nhận thức như kính hiển vi, kính thiên văn, máy vi tính,...
            </BookParagraph>

            {/* Role II */}
            <LabeledHeading label="II" title="Thực tiễn là mục đích của nhận thức" variant="role" className="mt-8" />
            <BookParagraph>
              Con người nhận thức thế giới không phải chỉ để "biết cho vui", mà nhằm mục đích cuối cùng là phục vụ thực tiễn, soi đường, dẫn dắt và chỉ đạo các hoạt động cải tạo tự nhiên và xã hội. Mọi tri thức khoa học chỉ thực sự có ý nghĩa khi được áp dụng vào đời sống thực tiễn, góp phần nâng cao hiệu quả hoạt động và phục vụ lợi ích của con người.
            </BookParagraph>

            {/* Role III */}
            <LabeledHeading label="III" title="Thực tiễn là tiêu chuẩn để kiểm tra chân lý" variant="role" className="mt-8" />
            <BookParagraph>
              Thực tiễn là tiêu chuẩn khách quan duy nhất để kiểm tra tính đúng hay sai của tri thức, qua đó khẳng định chân lý và bác bỏ sai lầm. Chỉ thông qua thực tiễn, con người mới có thể "vật chất hóa" tri thức và "hiện thực hóa" tư tưởng, từ đó xác định xem chúng có phù hợp với hiện thực khách quan hay không. Tiêu chuẩn thực tiễn vừa mang tính tuyệt đối, vì ở mọi giai đoạn lịch sử chỉ thực tiễn mới có thể kiểm nghiệm chân lý, vừa mang tính tương đối, vì bản thân thực tiễn luôn vận động và biến đổi nên việc kiểm nghiệm cũng gắn với những điều kiện lịch sử – cụ thể nhất định.
            </BookParagraph>

            {/* Examples divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="my-10 flex items-center gap-4 origin-left"
            >
              <div className="w-6 h-px bg-primary/30" />
              <div className="w-2 h-2 rotate-45 border border-primary/40" />
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
            </motion.div>

            {/* Examples header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-8 text-center"
            >
              <p className="text-xs text-primary/50 uppercase tracking-[0.3em] mb-3" style={cormorant}>
                Minh họa ứng dụng
              </p>
              <h4 className="text-2xl md:text-3xl text-foreground/90 mb-3" style={{ ...cormorant, fontWeight: 400, letterSpacing: '0.04em' }}>
                Ví dụ thực tiễn minh họa
              </h4>
              <p className="text-base text-muted-foreground italic" style={lora}>
                Trong bối cảnh hiện nay, vai trò của thực tiễn đối với nhận thức thể hiện rất rõ qua các lĩnh vực như y học và trí tuệ nhân tạo.
              </p>
            </motion.div>

            {/* Example 1: COVID-19 Vaccine */}
            <LabeledHeading label="1" title="Ví dụ về nghiên cứu vaccine COVID-19" variant="example" />
            <BookParagraph>
              Trong nghiên cứu vaccine COVID-19, đại dịch và nhu cầu bảo vệ sức khỏe cộng đồng chính là xuất phát điểm thực tiễn đặt ra yêu cầu phải tìm ra biện pháp phòng bệnh hiệu quả. Từ đó, các nhà khoa học tiến hành nghiên cứu, xây dựng các giả thuyết lý thuyết về cơ chế miễn dịch, công nghệ mRNA, vector virus,… Tuy nhiên, những giả thuyết này chỉ thực sự được kiểm chứng thông qua các thử nghiệm lâm sàng trên người, với nhiều giai đoạn khác nhau. Các kết quả về tỷ lệ sinh kháng thể, tỷ lệ nhiễm bệnh, tỷ lệ nhập viện và tử vong sau tiêm cho phép đánh giá xem lý thuyết ban đầu có đúng hay không.
            </BookParagraph>
            <BookParagraph>
              Nếu kết quả thực nghiệm cho thấy vaccine an toàn, hiệu quả cao trong việc giảm nguy cơ mắc bệnh và biến chứng nặng, thì lý thuyết y học đứng sau nó được thực tiễn xác nhận và trở thành tri thức khoa học có giá trị ứng dụng. Ngược lại, nếu xuất hiện các tác dụng phụ nghiêm trọng hoặc hiệu quả thấp, mô hình lý thuyết phải được điều chỉnh. Như vậy, thực tiễn ở đây vừa là cơ sở và động lực nảy sinh nhu cầu nhận thức, vừa là mục đích (bảo vệ sức khỏe cộng đồng), đồng thời là tiêu chuẩn duy nhất để kiểm tra và khẳng định tính chân lý của các tri thức y học.
            </BookParagraph>

            {/* Example 2: AI */}
            <LabeledHeading label="2" title="Ví dụ về trí tuệ nhân tạo (AI)" variant="example" className="mt-8" />
            <BookParagraph>
              Trong lĩnh vực trí tuệ nhân tạo, các hệ thống AI không chỉ được xây dựng từ những mô hình lý thuyết về mạng nơ-ron hay học sâu, mà còn phải được huấn luyện trên khối lượng dữ liệu khổng lồ thu thập từ thực tiễn: văn bản, hình ảnh, âm thanh, hành vi người dùng,… Đây chính là "tài liệu thực tiễn" làm cơ sở ban đầu cho "nhận thức" của hệ thống.
            </BookParagraph>
            <BookParagraph>
              Khi được đưa vào ứng dụng trong đời sống (tư vấn khách hàng, dịch thuật, hỗ trợ lái xe, hỗ trợ học tập…), AI liên tục nhận về phản hồi thực tế của người dùng: những câu trả lời sai, những gợi ý không phù hợp, các lỗi vận hành,… Những sai sót này buộc các nhà phát triển phải cập nhật mô hình, tinh chỉnh thuật toán, mở rộng và làm sạch dữ liệu, qua đó làm cho tri thức mà AI thể hiện ngày càng chính xác và toàn diện hơn. Mục đích cuối cùng của quá trình phát triển AI cũng không dừng ở lý thuyết, mà nhằm phục vụ các nhu cầu thực tiễn như tăng năng suất lao động, hỗ trợ ra quyết định, cải thiện chất lượng dịch vụ. Thông qua đó có thể thấy, trong trường hợp của AI, thực tiễn vừa là nguồn gốc và động lực thúc đẩy tri thức phát triển (dữ liệu, nhu cầu sử dụng, phản hồi), vừa là mục đích (giải quyết các vấn đề thực tế), đồng thời là tiêu chuẩn kiểm nghiệm: một hệ thống AI chỉ được coi là "tốt" khi chứng tỏ được hiệu quả và độ tin cậy trong vận hành thực tế.
            </BookParagraph>

            {/* Example 3: Nhận xét chung */}
            <LabeledHeading label="3" title="Nhận xét chung" variant="example" className="mt-8" />
            <BookParagraph>
              Từ hai ví dụ trên, có thể khẳng định rằng thực tiễn không chỉ là điểm xuất phát của quá trình nhận thức mà còn là môi trường thường xuyên đặt ra yêu cầu, là điểm đến cuối cùng và là thước đo khách quan để kiểm tra, khẳng định hoặc bác bỏ mọi tri thức. Chính nhờ sự vận động không ngừng của thực tiễn mà nhận thức khoa học của con người luôn được bổ sung, sửa chữa và phát triển ngày càng tiến gần hơn đến chân lý khách quan.
            </BookParagraph>
          </BookChapter>

          {/* ── Classical Architecture Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="my-16 relative"
          >
            <div className="relative h-64 overflow-hidden rounded-sm border-2 border-primary/30 group">
              <motion.div className="w-full h-full" whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1767031978532-0ef227936b8b?w=1600&q=80"
                  alt="Greek columns"
                  className="w-full h-full object-cover"
                  style={{ filter: 'sepia(0.5) contrast(1.2)' }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl mb-2"
                    style={{ ...cormorant, fontWeight: 300, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
                  >
                    Triết Học Cổ Điển
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="text-lg italic"
                    style={{ ...garamond, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                  >
                    Từ Hy Lạp cổ đại đến tư tưởng Mác-Lênin
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Chapter 5: Bài học phương pháp luận ── */}
          <BookChapter number="5" title="Bài học phương pháp luận" subtitle="Chống giáo điều và liên hệ bản thân" direction="left">
            <BookParagraph>
              Từ quan điểm của Marx, có thể rút ra bài học quan trọng là phải chống lại bệnh giáo điều – tức là tuyệt đối hóa lý luận mà coi nhẹ thực tiễn. Lý luận nếu không gắn với thực tiễn sẽ trở nên xa rời cuộc sống và dẫn đến sai lầm duy ý chí.
            </BookParagraph>

            <BookParagraph>
              Trong học tập, điều này thể hiện ở việc không thể chỉ dừng lại ở việc đọc và ghi nhớ lý thuyết. Ví dụ, trong lĩnh vực lập trình, tri thức chỉ thực sự trở thành của bản thân khi người học trực tiếp viết code và giải quyết các vấn đề thực tế.
            </BookParagraph>

            <BookParagraph>
              Trong đời sống, mỗi trải nghiệm cá nhân chính là quá trình con người kiểm nghiệm các quan niệm của mình, từ đó điều chỉnh nhận thức cho phù hợp với hiện thực khách quan.
            </BookParagraph>
          </BookChapter>

          {/* ── Chapter 6: Kết luận ── */}
          <BookChapter number="" title="Kết luận" subtitle="Tổng kết và khẳng định" direction="right">
            {/* Decorative banner image */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-8 relative group"
            >
              <div className="relative aspect-[21/9] overflow-hidden rounded-sm border-2 border-primary/30 shadow-xl">
                <motion.div className="w-full h-full" whileHover={{ scale: 1.04 }} transition={{ duration: 0.55 }}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1563118270-0863a38a4e1b?w=1200&q=80"
                    alt="Library books"
                    className="w-full h-full object-cover"
                    style={{ filter: 'sepia(0.6) contrast(1.15) saturate(0.9)' }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-2xl italic text-center" style={{ ...garamond, textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
                    &ldquo;Tri thức không chỉ nằm trong sách vở, mà trong hành động&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>

            <BookParagraph>
              Nhận định của Karl Marx không chỉ là một luận điểm triết học sâu sắc mà còn là một phương châm hành động. Thực tiễn vừa là cơ sở, vừa là động lực, đồng thời là tiêu chuẩn kiểm nghiệm chân lý của nhận thức. Chỉ thông qua thực tiễn, tư duy con người mới chứng minh được tính đúng đắn và giá trị của mình, đồng thời có khả năng cải tạo thế giới.
            </BookParagraph>

            <BookQuote author="Karl Marx">
              Chân lý không phải là sản phẩm của tư duy thuần túy, mà chỉ được xác lập và phát triển trong chính hoạt động thực tiễn của con người.
            </BookQuote>
          </BookChapter>

          {/* Closing image gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-16 grid grid-cols-3 gap-4"
          >
            {CLOSING_IMAGES.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.65 }}
                whileHover={{ scale: 1.06, y: -8, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
                className="relative aspect-[3/4] overflow-hidden rounded-sm border border-primary/30 shadow-lg"
              >
                <ImageWithFallback
                  src={url}
                  alt={`Philosophy books ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  style={{ filter: 'sepia(0.5) contrast(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* End ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <OrnamentDivider lineWidth="xl" diamondSize="lg" spin="rock-slow" className="flex items-center justify-center gap-4 mb-6" />
            <p className="text-2xl italic text-muted-foreground mb-2" style={garamond}>Hết</p>
            <p className="text-sm text-muted-foreground tracking-widest uppercase" style={{ ...cormorant, letterSpacing: '0.2em' }}>
              Triết Học Mác-Lênin
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
