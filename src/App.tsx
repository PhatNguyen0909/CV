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
    year: '2024',
    title: 'Ứng dụng giao hàng trên nền tảng web',
    team: 'Vai trò: Trưởng nhóm | Lập trình web',
    points: [
      'Phân tích yêu cầu và thiết kế quy trình đặt hàng cho ứng dụng web với trải nghiệm rõ ràng, dễ sử dụng.',
      'Phối hợp cùng nhóm để xây dựng luồng ứng dụng, giao diện và kế hoạch bàn giao sản phẩm.',
      'Thực hành chuyển yêu cầu sản phẩm thành các màn hình và đầu việc có thể triển khai.',
    ],
  },
  {
    year: '2024',
    title: 'Website thương mại điện tử',
    team: 'Vai trò: Thành viên dự án | Lập trình web',
    points: [
      'Sắp xếp thông tin sản phẩm và nội dung trang cho giao diện e-commerce dễ bảo trì.',
      'Chú trọng tính dễ sử dụng, bố cục responsive và luồng tương tác rõ ràng khi xây dựng website.',
    ],
  },
  {
    year: '2026',
    title: 'Food Hub',
    team: 'Dự án cá nhân | Kiến trúc Microservice',
    points: [
      'Xây dựng dự án cá nhân theo định hướng kiến trúc microservice để tách biệt các thành phần và trách nhiệm của hệ thống.',
      'Thiết kế và kiểm tra luồng giao tiếp thông qua API Gateway, tập trung vào khả năng định tuyến request giữa các service.',
      'Sử dụng Postman để kiểm thử API Gateway và dùng GitHub Copilot hỗ trợ nghiên cứu, viết mã nguồn và xử lý lỗi trong quá trình phát triển.',
    ],
  },
  {
    year: '2026',
    title: 'Web App quản lý tài chính quán Vĩnh Ký',
    team: 'Dự án thực tế | Phát triển web',
    points: [
      'Phân tích nhu cầu thực tế của quán ăn và xây dựng web app hỗ trợ theo dõi hoạt động tài chính hằng ngày.',
      'Thiết kế chức năng ghi nhận, tổng hợp doanh thu và chi phí để dữ liệu kinh doanh được quản lý tập trung.',
      'Xây dựng báo cáo lợi nhuận giúp theo dõi tình hình kinh doanh và hỗ trợ đưa ra quyết định vận hành.',
    ],
  },
];

const skills = [
  'HTML / CSS / JavaScript',
  'React & Vite',
  'Lập trình web responsive',
  'Git & quản lý mã nguồn',
  'Microservice & API Gateway',
  'Kiểm thử API với Postman',
  'Tư duy giải quyết vấn đề',
];

const tools = ['React', 'TypeScript', 'Postman', 'GitHub Copilot', 'Visual Studio Code', 'Git'];

const highlights = [
  { label: '4', value: 'Dự án lập trình' },
  { label: '2026', value: 'Dự kiến tốt nghiệp CNTT' },
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
    <span className="pdf-fix-pill inline-flex min-h-8 items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-center text-xs leading-tight font-semibold tracking-[0.18em] text-sky-700 dark:text-sky-300">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-8 w-2 rounded-full bg-sky-500" />
      <h2 className="pdf-fix-title text-lg font-extrabold uppercase tracking-[0.16em] text-slate-900 dark:text-white">{children}</h2>
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

  const exportPDF = async () => {
    const [{ default: html2canvas }, { default: JsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
    const cvElement = document.getElementById('cv-content');

    if (!cvElement) {
      return;
    }

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const sourceWidth = cvElement.scrollWidth;
    const sourceHeight = cvElement.scrollHeight;

    document.documentElement.classList.add('pdf-export-mode');

    try {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });

      const canvas = await html2canvas(cvElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#0f172a',
        scrollX: 0,
        scrollY: 0,
        width: sourceWidth,
        height: sourceHeight,
        windowWidth: sourceWidth,
        windowHeight: sourceHeight,
        onclone: (clonedDocument) => {
          const style = clonedDocument.createElement('style');
          style.textContent = `
            #cv-content, #cv-content * {
              animation: none !important;
              transition: none !important;
              text-rendering: geometricPrecision !important;
            }

            #cv-content .pdf-fix-pill {
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              line-height: 1.2 !important;
              white-space: nowrap !important;
            }

            #cv-content .pdf-fix-title {
              line-height: 1.2 !important;
            }
          `;

          clonedDocument.head.appendChild(style);
        },
      });

      const pdf = new JsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const printableWidth = pageWidth - margin * 2;
      const printableHeight = pageHeight - margin * 2;
      const widthScale = printableWidth / canvas.width;
      const heightScale = printableHeight / canvas.height;
      const scale = Math.min(widthScale, heightScale);
      const renderWidth = canvas.width * scale;
      const renderHeight = canvas.height * scale;
      const renderX = (pageWidth - renderWidth) / 2;
      const renderY = (pageHeight - renderHeight) / 2;
      const imageData = canvas.toDataURL('image/png');

      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      pdf.addImage(imageData, 'PNG', renderX, renderY, renderWidth, renderHeight, undefined, 'FAST');

      pdf.save('nguyen-huu-vinh-phat-cv.pdf');
    } finally {
      document.documentElement.classList.remove('pdf-export-mode');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 print:min-h-0 print:bg-white print:text-black">
      <div className="pointer-events-none fixed inset-0 overflow-hidden print:hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.1),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.08),_transparent_35%)]" />
      </div>

      <main id="cv" className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8 print:max-w-none print:px-0 print:py-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
              {darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
            </button>
            {/* <button
              type="button"
              onClick={exportPDF}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-sky-700"
            >
              <DownloadIcon />
              Tải CV dạng PDF
            </button> */}
          </div>
        </div>

        <div id="cv-content" className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] print:grid print:grid-cols-[280px_minmax(0,1fr)] print:gap-4">
          <aside className="print-avoid-break overflow-hidden rounded-[2rem] border border-white/40 bg-slate-900 text-white shadow-soft dark:border-slate-800 print:rounded-none print:border-0">
            <div className="relative p-6 sm:p-8 lg:min-h-[1080px] print:min-h-0 print:p-0">
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
                      alt="Nguyen Huu Vinh Phat"
                      className="absolute inset-0 h-full w-full scale-[1] object-cover object-[50%_18%]"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-[0.08em] text-white">Vinh Phat</h1>
                  <p className="pdf-fix-pill mt-2 inline-flex min-h-9 items-center justify-center rounded-full border border-sky-300/25 bg-sky-400/15 px-4 py-1 text-center text-xs leading-tight font-bold uppercase tracking-[0.22em] text-sky-100">
                    THỰC TẬP SINH LẬP TRÌNH
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-slate-200/90">
                    Sinh viên Công nghệ Thông tin định hướng xây dựng các ứng dụng web thực tế, dễ bảo trì và thân thiện với người dùng.
                  </p>
                </motion.div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 print:mx-auto print:max-w-[240px] print:grid-cols-2 print:justify-items-center">
                  {highlights.map((item) => (
                    <div key={item.value} className="print-avoid-break w-full rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
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
                      <ContactItem label="Địa điểm" value="TP. Hồ Chí Minh" />
                      <ContactItem label="GitHub" value="github.com/PhatNguyen0909" href="https://github.com/PhatNguyen0909" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Học vấn</p>
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-slate-100 backdrop-blur-sm">
                      <p className="font-bold">Saigon University</p>
                      <p className="mt-1 text-slate-200">Cử nhân Công nghệ Thông tin</p>
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

          <section className="print-avoid-break space-y-6 rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/85 sm:p-8 print:rounded-none print:border-0 print:bg-white print:p-0">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Badge>THỰC TẬP SINH LẬP TRÌNH | WEB</Badge>
                  <h1 className="mt-4 text-3xl font-black uppercase tracking-[0.06em] sm:text-5xl">Nguyen Huu Vinh Phat</h1>
                </div>
              </div>
            </motion.header>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className="print-avoid-break space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
            >
              <SectionTitle>Mục tiêu nghề nghiệp</SectionTitle>
              <div className="space-y-4 text-[15px] leading-8 text-slate-700 dark:text-slate-200">
                <p>
                  Tôi ứng tuyển vị trí Thực tập sinh Lập trình để phát triển kinh nghiệm phần mềm trong môi trường làm việc chuyên nghiệp. Là sinh viên Công nghệ Thông tin,
                  tôi đã thực hiện các dự án web và xây dựng nền tảng về frontend, giao diện responsive và tư duy giải quyết vấn đề có hệ thống.
                </p>
                <p>
                  Tôi mong muốn học hỏi qua hoạt động review code, đóng góp vào các công việc thực tế của sản phẩm và cải thiện khả năng viết mã nguồn sạch, đáng tin cậy.
                  Tôi có tinh thần trách nhiệm, chú ý đến chi tiết và chủ động phối hợp trong mọi nhiệm vụ.
                </p>
              </div>
            </motion.section>

            <section className="space-y-4">
              <SectionTitle>Dự án lập trình web</SectionTitle>
              <div className="space-y-4">
                {experiences.map((experience, index) => (
                  <motion.article
                    key={`${experience.title}-${experience.year}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="print-avoid-break group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800 dark:bg-slate-950/60 print:shadow-none"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-300" />
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="pdf-fix-pill inline-flex min-h-8 items-center justify-center rounded-full border border-sky-500/15 bg-sky-500/10 px-3 py-1 text-xs leading-tight font-bold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
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
                className="print-avoid-break rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <SectionTitle>Thế mạnh kỹ thuật</SectionTitle>
                <div className="mt-4 space-y-3 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                  <p>Xây dựng giao diện rõ ràng, responsive và chú trọng khả năng sử dụng trên nhiều kích thước màn hình.</p>
                  <p>Biết phân rã yêu cầu thành các đầu việc thực tế, tìm hiểu lỗi có hệ thống và nhanh chóng học công cụ mới.</p>
                  <p>Làm việc cẩn thận với cấu trúc, cách đặt tên và tính nhất quán để mã nguồn dễ bảo trì.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="print-avoid-break rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <SectionTitle>Định hướng phát triển</SectionTitle>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {['Lập trình frontend', 'Triển khai giao diện', 'Debug & kiểm thử', 'Làm việc nhóm'].map((item) => (
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
              className="print-avoid-break rounded-3xl border border-dashed border-sky-500/30 bg-sky-500/5 p-5 text-sm leading-7 text-slate-700 dark:text-slate-300 print:border-slate-300 print:bg-white"
            >
              <p className="font-semibold text-slate-900 dark:text-white">Cam kết phát triển</p>
              <p className="mt-2">
                Tôi cam kết học hỏi từ các lập trình viên giàu kinh nghiệm, hoàn thành công việc đáng tin cậy và liên tục củng cố nền tảng kỹ thuật thông qua thực hành và tiếp nhận phản hồi.
              </p>
            </motion.footer>
          </section>
        </div>
      </main>
    </div>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="print-avoid-break rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{label}</p>
      {href ? (
        <a className="mt-2 block break-words font-semibold text-white transition hover:text-sky-200" href={href} target="_blank" rel="noreferrer">
          {value}
        </a>
      ) : (
        <p className="mt-2 break-words font-semibold text-white">{value}</p>
      )}
    </div>
  );
}