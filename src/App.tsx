import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../Image/NguyenHuuVinhPhat.jpg';
import './App.css';

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
      'Phân tích yêu cầu và thiết kế quy trình đặt hàng cho ứng dụng web với trải nghiệm rõ ràng.',
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
    team: 'Dự án thực tế cá nhân | Phát triển web',
    points: [
      'Phân tích nhu cầu thực tế và xây dựng web app hỗ trợ theo dõi hoạt động tài chính hằng ngày.',
      'Thiết kế chức năng ghi nhận, tổng hợp doanh thu và chi phí để dữ liệu được quản lý tập trung.',
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
  'Prompt Engineering',
  'GitHub Copilot & AI-assisted coding',
  'Tư duy giải quyết vấn đề',
];

const tools = [
  'React',
  'TypeScript',
  'Postman',
  'GitHub Copilot',
  'ChatGPT',
  'VSCode',
  'Git',
  'Figma',
  'Java',
  'AI Tools',
];

const highlights = [
  { label: '4', value: 'Dự án lập trình' },
  { label: '2026', value: 'Dự kiến tốt nghiệp CNTT' },
];

function SunIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      className='icon-size'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <circle cx='12' cy='12' r='4.5' />
      <path d='M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6' />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      className='icon-size'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path d='M20 14.2A8.3 8.3 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z' />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      className='icon-size'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path d='M12 3v10m0 0 4-4m-4 4-4-4' />
      <path d='M5 17.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5' />
    </svg>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className='badge'>
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className='section-title'>
      <span className='section-title-accent' />
      <h2 className='section-title-text'>
        {children}
      </h2>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
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
    const [{ default: html2canvas }, { default: JsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);
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
      pdf.addImage(
        imageData,
        'PNG',
        renderX,
        renderY,
        renderWidth,
        renderHeight,
        undefined,
        'FAST'
      );

      pdf.save('nguyen-huu-vinh-phat-cv.pdf');
    } finally {
      document.documentElement.classList.remove('pdf-export-mode');
    }
  };

  return (
    <div className='cv-page'>
      <div className='cv-backdrop'>
        <div className='cv-glow-sky' />
        <div className='cv-glow-amber' />
      </div>

      <main
        id='cv'
        className='cv-main'
      >
        <div className='cv-toolbar'>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={toggleTheme}
              className='theme-button'
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

        <div
          id='cv-content'
          className='cv-content-grid'
        >
          <aside className='cv-sidebar'>
            <div className='cv-sidebar-inner'>
              <div className='cv-sidebar-overlay' />
              <div className='cv-sidebar-content'>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className='profile-intro'
                >
                  <div className='profile-avatar'>
                    <img
                      src={profileImage}
                      alt='Nguyen Huu Vinh Phat'
                      className='profile-image'
                    />
                    <div className='profile-glow' />
                  </div>
                  <h1 className='profile-name'>
                    Vinh Phat
                  </h1>
                  <p className='profile-role'>
                    THỰC TẬP SINH LẬP TRÌNH
                  </p>
                  <p className='profile-description'>
                    Sinh viên Công nghệ Thông tin định hướng xây dựng các ứng
                    dụng web thực tế, dễ bảo trì và thân thiện với người dùng.
                  </p>
                </motion.div>

                <div className='highlights-grid'>
                  {highlights.map((item) => (
                    <div
                      key={item.value}
                      className='highlight-item'
                    >
                      <p className='highlight-value'>
                        {item.label}
                      </p>
                      <p className='highlight-label'>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <section className='sidebar-sections'>
                  <div>
                    <p className='sidebar-section-title'>
                      Liên hệ
                    </p>
                    <div className='contact-list'>
                      <ContactItem label='Điện thoại' value='0376122821' />
                      <ContactItem
                        label='Email'
                        value='phatnguyen99204@gmail.com'
                      />
                      <ContactItem label='Địa điểm' value='TP. Hồ Chí Minh' />
                      <ContactItem
                        label='GitHub'
                        value='github.com/PhatNguyen0909'
                        href='https://github.com/PhatNguyen0909'
                      />
                    </div>
                  </div>

                  <div>
                    <p className='sidebar-section-title'>
                      Học vấn
                    </p>
                    <div className='education-card'>
                      <p className='education-name'>Saigon University</p>
                      <p className='education-degree'>
                        Cử nhân Công nghệ Thông tin
                      </p>
                      <p className='education-period'>2022 - 2026</p>
                    </div>
                  </div>

                  <div>
                    <p className='sidebar-section-title'>
                      Kỹ năng
                    </p>
                    <div className='skills-list'>
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className='skill-chip'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className='sidebar-section-title'>
                      Công cụ
                    </p>
                    <div className='tools-grid'>
                      {tools.map((tool) => (
                        <span
                          key={tool}
                          className='tool-item'
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </aside>

          <section className='cv-main-panel'>
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className='cv-header'
            >
              <div className='cv-header-content'>
                <div>
                  <Badge>THỰC TẬP SINH LẬP TRÌNH | WEB</Badge>
                  <h1 className='cv-name'>
                    Nguyen Huu Vinh Phat
                  </h1>
                </div>
              </div>
            </motion.header>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className='objective-panel'
            >
              <SectionTitle>Mục tiêu nghề nghiệp</SectionTitle>
              <div className='objective-content'>
                <p>
                  Tôi ứng tuyển vị trí Thực tập sinh Lập trình để phát triển
                  kinh nghiệm phần mềm trong môi trường làm việc chuyên nghiệp.
                  Là sinh viên Công nghệ Thông tin, tôi đã thực hiện các dự án
                  web và xây dựng nền tảng về react frontend, giao diện
                  responsive hoặc backend và tư duy giải quyết vấn đề có hệ
                  thống.
                </p>
                <p>
                  Tôi mong muốn học hỏi qua hoạt động review code, đóng góp vào
                  các công việc thực tế của sản phẩm và cải thiện khả năng viết
                  mã nguồn sạch, đáng tin cậy. Tôi có tinh thần trách nhiệm, chú
                  ý đến chi tiết và chủ động phối hợp trong mọi nhiệm vụ.
                </p>
              </div>
            </motion.section>

            <section className='section-stack'>
              <SectionTitle>Dự án lập trình web</SectionTitle>
              <div className='project-list'>
                {experiences.map((experience, index) => (
                  <motion.article
                    key={`${experience.title}-${experience.year}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className='project-card'
                  >
                    <div className='project-top-rule' />
                    <div className='project-heading-row'>
                      <div>
                        <div className='project-team'>
                          {experience.team}
                        </div>
                        <h3 className='project-name'>
                          {experience.title}
                        </h3>
                      </div>
                      <span className='project-year'>
                        {experience.year}
                      </span>
                    </div>
                    <ul className='project-points'>
                      {experience.points.map((point) => (
                        <li key={point} className='project-point'>
                          <span className='project-bullet' />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className='feature-grid'>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='feature-panel'
              >
                <SectionTitle>Thế mạnh kỹ thuật</SectionTitle>
                <div className='feature-copy'>
                  <p>
                    Xây dựng giao diện rõ ràng, responsive và chú trọng khả năng
                    sử dụng trên nhiều kích thước màn hình.
                  </p>
                  <p>
                    Biết phân rã yêu cầu thành các đầu việc thực tế, tìm hiểu
                    lỗi có hệ thống và nhanh chóng học công cụ mới.
                  </p>
                  <p>
                    Làm việc cẩn thận với cấu trúc, cách đặt tên và tính nhất
                    quán để mã nguồn dễ bảo trì.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='feature-panel'
              >
                <SectionTitle>Định hướng phát triển</SectionTitle>
                <div className='direction-grid'>
                  {[
                    'Lập trình frontend',
                    'Triển khai giao diện',
                    'Debug & kiểm thử',
                    'Làm việc nhóm',
                  ].map((item) => (
                    <div
                      key={item}
                      className='direction-item'
                    >
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
              className='commitment-panel'
            >
              <p className='commitment-title'>
                Cam kết phát triển
              </p>
              <p className='commitment-copy'>
                Tôi cam kết học hỏi từ các lập trình viên giàu kinh nghiệm, hoàn
                thành công việc đáng tin cậy và liên tục củng cố nền tảng kỹ
                thuật thông qua thực hành và tiếp nhận phản hồi.
              </p>
            </motion.footer>
          </section>
        </div>
      </main>
    </div>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className='contact-item'>
      <p className='contact-label'>
        {label}
      </p>
      {href ? (
        <a
          className='contact-link'
          href={href}
          target='_blank'
          rel='noreferrer'
        >
          {value}
        </a>
      ) : (
        <p className='contact-value'>{value}</p>
      )}
    </div>
  );
}
