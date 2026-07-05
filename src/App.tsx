import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../Image/NguyenHuuVinhPhat.jpg';

type Experience = {
  year: string;
  title: string;
  team: string;
  points: string[];
};

const experiences: Experience[] = [
  {
    year: '2025',
    title: 'Đồ án Công nghệ xây dựng ứng dụng web delivery',
    team: 'Vai trò: Trưởng nhóm',
    points: [
      'Khảo sát nhu cầu người dùng, phân tích nghiệp vụ và xây dựng luồng đặt món tối ưu cho web app.',
      'Thiết kế UX/UI theo hướng rõ ràng, tốc độ thao tác nhanh, phù hợp cho trải nghiệm real-time.',
      'Phối hợp nhóm để chuẩn hóa quy trình và bàn giao sản phẩm đúng tiến độ.',
    ],
  },
  {
    year: '2024',
    title: 'Đồ án thiết kế web bán hàng chuyên nghiệp',
    team: 'Vai trò: Thành viên dự án',
    points: [
      'Nghiên cứu hành vi mua sắm online để đề xuất bố cục sản phẩm và các điểm chạm chuyển đổi.',
      'Tổ chức dữ liệu hợp lý, hỗ trợ quản lý nội dung và quy trình cập nhật sản phẩm.',
    ],
  },
  {
    year: '2024',
    title: 'Khu vui chơi giải trí phức hợp MiaTown',
    team: 'Vai trò: Trưởng nhóm văn hành',
    points: [
      'Phân tích quy trình dịch vụ và thực tế vận hành để đề xuất cải tiến trải nghiệm khách hàng.',
      'Chốt nội dung chuẩn hóa, hỗ trợ thuyết trình và đàm phán theo ngữ cảnh thực tế.',
    ],
  },
  {
    year: '2026',
    title: 'Nhà hàng Vĩnh Ký',
    team: 'Vai trò: Cửa hàng trưởng',
    points: [
      'Điều phối nhân sự, lập kế hoạch ngân sách và duy trì hoạt động thường nhật của cửa hàng.',
      'Ứng dụng công cụ số để theo dõi vận hành, quản lý đơn và hỗ trợ chăm sóc khách hàng.',
      'Chuẩn hóa hóa đơn và phản hồi khách hàng nhằm nâng chất lượng dịch vụ.',
    ],
  },
];

const skills = [
  'Tư duy hệ thống',
  'Phân tích & giải quyết vấn đề',
  'Tiếng Anh giao tiếp',
  'Thuyết trình & Demo sản phẩm',
  'Quản lý dự án & quy trình',
];

const tools = ['Figma', 'Visual Studio', 'Office / Excel', 'Canva', 'AI Tools'];

const highlights = [
  { label: '4', value: 'Thành tựu nổi bật' },
  { label: '100%', value: 'Tinh thần theo đuổi chất lượng' },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 14.2A8.3 8.3 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v10m0 0 4-4m-4 4-4-4" />
      <path d="M5 17.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5" />
    </svg>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-sky-700 dark:text-sky-300">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-8 w-2 rounded-full bg-sky-500" />
      <h2 className="text-lg font-extrabold uppercase tracking-[0.16em] text-slate-900 dark:text-white">{children}</h2>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;

    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme);
    window.localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 print:bg-white print:text-black">
      <div className="pointer-events-none fixed inset-0 overflow-hidden print:hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.1),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.08),_transparent_35%)]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8 print:max-w-none print:px-0 print:py-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-sky-700"
            >
              <DownloadIcon />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] print:block print:gap-0">
          <aside className="overflow-hidden rounded-[2rem] border border-white/40 bg-slate-900 text-white shadow-soft dark:border-slate-800 print:rounded-none print:border-0 print:bg-white print:text-black">
            <div className="relative p-6 sm:p-8 lg:min-h-[1080px]">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(14,165,233,0.35),rgba(15,23,42,0.96))] print:hidden" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_40%)] print:hidden" />
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto flex w-full flex-col items-center text-center"
                >
                  <div className="relative mb-6 h-36 w-36 overflow-hidden rounded-full border-4 border-white/20 bg-gradient-to-br from-sky-300 via-slate-200 to-slate-500 shadow-soft">
                    <img
                      src={profileImage}
                      alt="Nguyễn Hữu Vĩnh Phát"
                      className="absolute inset-0 h-full w-full scale-[1] object-cover object-[50%_18%]"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-[0.08em] text-white">Vĩnh Phát</h1>
                  <p className="mt-2 rounded-full border border-sky-300/25 bg-sky-400/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-sky-100">
                    Customer Success Executive
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-slate-200/90">
                    Em định hướng kết hợp công nghệ, tư duy dịch vụ và vận hành để tạo trải nghiệm khách hàng rõ ràng, mạch lạc và có thể đo lường.
                  </p>
                </motion.div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {highlights.map((item) => (
                    <div key={item.value} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                      <p className="text-2xl font-black text-white">{item.label}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-200">{item.value}</p>
                    </div>
                  ))}
                </div>

                <section className="mt-8 space-y-8">
                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Liên hệ</p>
                    <div className="space-y-4 text-sm text-slate-100/95">
                      <ContactItem label="Điện thoại" value="0908012821" />
                      <ContactItem label="Email" value="nhiknh112233@gmail.com" />
                      <ContactItem label="Địa điểm" value="Hồ Chí Minh" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Học vấn</p>
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-slate-100 backdrop-blur-sm">
                      <p className="font-bold">Đại học Sài Gòn</p>
                      <p className="mt-1 text-slate-200">Cử nhân Công nghệ thông tin</p>
                      <p className="mt-2 text-sky-200">2022 - 2026</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Kỹ năng</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-2 text-xs font-semibold text-slate-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Công cụ</p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-100">
                      {tools.map((tool) => (
                        <span key={tool} className="rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-center backdrop-blur-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </aside>

          <section className="space-y-6 rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/85 sm:p-8 print:rounded-none print:border-0 print:bg-white print:p-0">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge>Customer Success Executive</Badge>
                  <h1 className="mt-4 text-3xl font-black uppercase tracking-[0.06em] sm:text-5xl">Nguyễn Hữu Vĩnh Phát</h1>
                </div>
              </div>
            </motion.header>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
            >
              <SectionTitle>Mục tiêu nghề nghiệp</SectionTitle>
              <div className="space-y-4 text-[15px] leading-8 text-slate-700 dark:text-slate-200">
                <p>
                  Mong muốn ứng tuyển vị trí Customer Success Executive tại Filum.ai. Với nền tảng vừa đủ về công nghệ thông tin cùng tư duy hệ thống,
                  Em hướng đến việc làm cầu nối giữa sản phẩm và khách hàng, tối ưu trải nghiệm sử dụng và hỗ trợ giải quyết vấn đề nhanh, rõ ràng.
                </p>
                <p>
                  Em là người chủ động, cẩn thận và có xu hướng cải tiến quy trình để giảm ma sát trong vận hành. Mục tiêu dài hạn là trở thành một
                  nhân sự có khả năng đồng hành khách hàng bằng dữ liệu, quy trình và sự thấu hiểu.
                </p>
              </div>
            </motion.section>

            <section className="space-y-4">
              <SectionTitle>Dự án & Kinh nghiệm tiêu biểu</SectionTitle>
              <div className="space-y-4">
                {experiences.map((experience, index) => (
                  <motion.article
                    key={`${experience.title}-${experience.year}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-950/60 print:shadow-none"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-300" />
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex rounded-full border border-sky-500/15 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
                          {experience.team}
                        </div>
                        <h3 className="mt-3 text-lg font-extrabold text-slate-900 dark:text-white">{experience.title}</h3>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                        {experience.year}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-3 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                      {experience.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <SectionTitle>Điểm mạnh nổi bật</SectionTitle>
                <div className="mt-4 space-y-3 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                  <p>Ưu tiên sự rõ ràng trong giao tiếp, chủ động bám mục tiêu và dễ thích nghi với môi trường nhiều đầu việc.</p>
                  <p>Có nền tảng công nghệ để hiểu sản phẩm nhanh, từ đó phối hợp tốt với các team kỹ thuật, vận hành và khách hàng.</p>
                  <p>Thích làm việc dựa trên quy trình và dữ liệu, nhưng vẫn giữ sự linh hoạt để xử lý tình huống thực tế.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <SectionTitle>Phù hợp với vai trò</SectionTitle>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {['Onboarding khách hàng', 'Hỗ trợ & chăm sóc', 'Theo dõi quy trình', 'Tối ưu trải nghiệm'].map((item) => (
                    <div key={item} className="flex min-h-14 items-center justify-center rounded-2xl border border-slate-300 bg-white px-3 py-3 text-center text-xs font-semibold tracking-[-0.01em] whitespace-nowrap text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:px-4 ">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-dashed border-sky-500/30 bg-sky-500/5 p-5 text-sm leading-7 text-slate-700 dark:text-slate-300 print:border-slate-300 print:bg-white"
            >
              <p className="font-semibold text-slate-900 dark:text-white">Cam kết cá nhân</p>
              <p className="mt-2">
               Em cam kết luôn đặt khách hàng làm trung tâm trong mọi hoạt động, chủ động lắng nghe, thấu hiểu nhu cầu và mang đến những giải pháp phù hợp nhằm tạo ra trải nghiệm tích cực. Tôi mong muốn xây dựng mối quan hệ hợp tác lâu dài với khách hàng thông qua sự tận tâm, trách nhiệm và tinh thần không ngừng học hỏi để nâng cao chất lượng dịch vụ.
              </p>
            </motion.footer>
          </section>
        </div>
      </main>
    </div>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{label}</p>
      <p className="mt-2 break-words font-semibold text-white">{value}</p>
    </div>
  );
}