import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../Image/NguyenHuuVinhPhat.jpg';
import './App.css';

type Experience = {
  period: string;
  title: string;
  team: string;
  points: string[];
};

const projects: Experience[] = [
  {
    period: '2026',
    title: 'Web App quản lý tài chính quán Vĩnh Ký',
    team: 'Dự án cá nhân | Phát triển web',
    points: [
      'Phân tích nhu cầu thực tế và xây dựng web app hỗ trợ theo dõi hoạt động tài chính hằng ngày.',
      'Thiết kế chức năng ghi nhận, tổng hợp doanh thu và chi phí để dữ liệu được quản lý tập trung.',
      'Xây dựng báo cáo lợi nhuận, tập trung trình bày dữ liệu dễ theo dõi để hỗ trợ quyết định vận hành.',
    ],
  },
  {
    period: '2024',
    title: 'Website thương mại điện tử',
    team: 'Thành viên dự án | Lập trình web',
    points: [
      'Sắp xếp thông tin sản phẩm và nội dung trang cho giao diện e-commerce dễ bảo trì.',
      'Chú trọng bố cục responsive, khả năng sử dụng và luồng tương tác rõ ràng khi xây dựng website.',
    ],
  },
  {
    period: '2024',
    title: 'Ứng dụng giao hàng trên nền tảng web',
    team: 'Trưởng nhóm | Lập trình web',
    points: [
      'Phân tích yêu cầu và thiết kế quy trình đặt hàng với trải nghiệm rõ ràng.',
      'Phối hợp cùng nhóm xây dựng luồng ứng dụng, giao diện và kế hoạch bàn giao sản phẩm.',
    ],
  },
  {
    period: '2026',
    title: 'Food Hub',
    team: 'Dự án cá nhân | Kiến trúc Microservice',
    points: [
      'Tách các thành phần hệ thống theo định hướng microservice và thiết kế luồng giao tiếp qua API Gateway.',
      'Dùng Postman kiểm thử API Gateway; chủ động nghiên cứu và xử lý lỗi trong quá trình phát triển.',
    ],
  },
];

const skills = [
  'HTML5 / CSS3 / JavaScript ES6+',
  'React & Vite',
  'TypeScript',
  'Responsive Web UI',
  'Git & GitHub',
  'REST API & Postman',
];

const tools = [
  'React',
  'Vite',
  'TypeScript',
  'Git / GitHub',
  'Postman',
  'Figma',
  'VS Code',
];

const highlights = [
  { label: '4', value: 'Dự án web' },
  { label: 'React', value: 'Frontend chính' },
  { label: 'CNTT', value: 'Đại học Sài Gòn' },
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

function Badge({ children }: { children: string }) {
  return <span className='badge'>{children}</span>;
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className='section-title'>
      <span className='section-title-accent' />
      <h2 className='section-title-text'>{children}</h2>
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

  return (
    <div className='cv-page'>
      <div className='cv-backdrop'>
        <div className='cv-glow-sky' />
        <div className='cv-glow-amber' />
      </div>

      <main id='cv' className='cv-main'>
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
          </div>
        </div>

        <div id='cv-content' className='cv-content-grid'>
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
                      alt='Nguyễn Hữu Vĩnh Phát'
                      className='profile-image'
                    />
                    <div className='profile-glow' />
                  </div>
                  <h1 className='profile-name'>Vĩnh Phát</h1>
                  <p className='profile-role'>FRONTEND ENGINEER INTERN</p>
                  <p className='profile-description'>
                    Sinh viên Công nghệ Thông tin định hướng Frontend, có nền
                    tảng React, TypeScript và phát triển giao diện responsive.
                    Mong muốn tham gia xây dựng sản phẩm web doanh nghiệp tại
                    Trustline.
                  </p>
                </motion.div>

                <div className='highlights-grid'>
                  {highlights.map((item) => (
                    <div key={item.value} className='highlight-item'>
                      <p className='highlight-value'>{item.label}</p>
                      <p className='highlight-label'>{item.value}</p>
                    </div>
                  ))}
                </div>

                <section className='sidebar-sections'>
                  <div>
                    <p className='sidebar-section-title'>Liên hệ</p>
                    <div className='contact-list'>
                      <ContactItem label='Điện thoại' value='0376122821' />
                      <ContactItem label='Năm sinh' value='2004' />
                      <ContactItem
                        label='Email'
                        value='phatnguyen99204@gmail.com'
                        href='mailto:phatnguyen99204@gmail.com'
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
                    <p className='sidebar-section-title'>Học vấn</p>
                    <div className='education-card'>
                      <p className='education-name'>
                        Saigon University – Đại học Sài Gòn
                      </p>
                      <p className='education-degree'>
                        Cử nhân Công nghệ Thông tin
                      </p>
                      <p className='education-period'>
                        2022–2026 · Ngành Công nghệ Thông tin
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className='sidebar-section-title'>Kỹ năng</p>
                    <div className='skills-list'>
                      {skills.map((skill) => (
                        <span key={skill} className='skill-chip'>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className='sidebar-section-title'>Công cụ</p>
                    <div className='tools-grid'>
                      {tools.map((tool) => (
                        <span key={tool} className='tool-item'>
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
                  <Badge>TRUSTLINE · TL-INT-02 | FRONTEND ENGINEER INTERN</Badge>
                  <h1 className='cv-name'>Nguyễn Hữu Vĩnh Phát</h1>
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
                  Tôi ứng tuyển vị trí Frontend Engineer Intern (TL-INT-02) tại
                  Trustline. Là sinh viên Công nghệ Thông tin, tôi đã thực hiện
                  các dự án web với React/Vite, xây dựng giao diện responsive
                  và chuyển yêu cầu thành các luồng chức năng cụ thể.
                </p>
                <p>
                  Tôi mong muốn phát triển giao diện dashboard doanh nghiệp,
                  rèn luyện cách xây dựng component có thể tái sử dụng, hoàn
                  thiện trải nghiệm trên nhiều thiết bị và học hỏi quy trình
                  review, tối ưu hiệu năng, accessibility từ Senior Frontend
                  Engineer.
                </p>
              </div>
            </motion.section>

            <section className='section-stack'>
              <SectionTitle>Dự án Frontend & Web</SectionTitle>
              <div className='project-list'>
                {projects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className='project-card'
                  >
                    <div className='project-top-rule' />
                    <div className='project-heading-row'>
                      <div>
                        <div className='project-team'>{project.team}</div>
                        <h3 className='project-name'>{project.title}</h3>
                      </div>
                      <span className='project-year'>{project.period}</span>
                    </div>
                    <ul className='project-points'>
                      {project.points.map((point) => (
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
                <SectionTitle>Điểm phù hợp với vị trí</SectionTitle>
                <div className='feature-copy'>
                  <p>
                    Có nền tảng HTML, CSS, JavaScript, React, TypeScript và
                    kinh nghiệm làm các dự án web; quan tâm đến giao diện rõ
                    ràng, responsive và cách trình bày dữ liệu dễ hiểu.
                  </p>
                  <p>
                    Kinh nghiệm làm việc dịch vụ giúp tôi chú ý đến nhu cầu
                    người dùng, giao tiếp chủ động và phối hợp có trách nhiệm.
                    Tôi đang định hướng học sâu Next.js và Tailwind CSS.
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
                <SectionTitle>Trọng tâm học hỏi tại Trustline</SectionTitle>
                <div className='direction-grid'>
                  {[
                    'Component UI dùng chung trên React / Next.js',
                    'Dashboard, bảng dữ liệu và luồng tìm kiếm / lọc',
                    'Responsive UI, Dark / Light mode và chi tiết giao diện',
                    'Core Web Vitals, accessibility và chất lượng mã nguồn',
                  ].map((item) => (
                    <div key={item} className='direction-item'>
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
              <p className='commitment-title'>Đóng góp tại Trustline</p>
              <p className='commitment-copy'>
                Sẵn sàng học hỏi từ Senior Frontend Engineer, chủ động tiếp
                nhận góp ý và cùng đội ngũ xây dựng giao diện dashboard chính
                xác, dễ sử dụng, ổn định trên nhiều kích thước màn hình.
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
      <p className='contact-label'>{label}</p>
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
