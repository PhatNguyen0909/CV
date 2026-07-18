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
    title: 'Web Delivery Application Development Project',
    team: 'Role: Team Lead',
    points: [
      'Researched user needs, analyzed business requirements, and built an optimized ordering flow for the web app.',
      'Designed the UX/UI to be clear and fast, suitable for a real-time experience.',
      'Worked with the team to standardize the process and deliver the product on schedule.',
    ],
  },
  {
    year: '2024',
    title: 'Professional E-commerce Website Design Project',
    team: 'Role: Project Member',
    points: [
      'Studied online shopping behavior to propose product layouts and conversion touchpoints.',
      'Structured data logically to support content management and product update workflows.',
    ],
  },
  {
    year: '2025',
    title: 'MiaTown Entertainment Complex',
    team: 'Role: Operations Team Lead',
    points: [
      'Analyzed service processes and real-world operations to propose customer experience improvements.',
      'Finalized standardized content and supported presentations and negotiation in a practical context.',
    ],
  },
  {
    year: '2026',
    title: 'Vinh Ky Restaurant',
    team: 'Role: Store Manager',
    points: [
      'Coordinated staff, planned budgets, and maintained the store’s daily operations.',
      'Used digital tools to track operations, manage orders, and support customer care.',
      'Standardized invoices and customer feedback to improve service quality.',
    ],
  },
];

const skills = [
  'Systems thinking',
  'Analysis & problem solving',
  'Conversational English',
  'Presentation & product demos',
  'Project & process management',
];

const tools = ['Figma', 'Visual Studio', 'Office / Excel', 'Canva', 'AI Tools'];

const highlights = [
  { label: '4', value: 'Notable achievements' },
  { label: '100%', value: 'Commitment to quality' },
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
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
            <button
              type="button"
              onClick={exportPDF}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-sky-700"
            >
              <DownloadIcon />
              Download PDF
            </button>
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
                    AI Operator & Enablement Intern 
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-slate-200/90">
                    I aim to combine technology, service mindset, and operations to create a clear, structured, and measurable customer experience.
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
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Contact</p>
                    <div className="space-y-4 text-sm text-slate-100/95">
                      <ContactItem label="Phone" value="0908012821" />
                      <ContactItem label="Email" value="nhiknh112233@gmail.com" />
                      <ContactItem label="Location" value="Ho Chi Minh City" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Education</p>
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-slate-100 backdrop-blur-sm">
                      <p className="font-bold">Saigon University</p>
                      <p className="mt-1 text-slate-200">Bachelor of Information Technology</p>
                      <p className="mt-2 text-sky-200">2022 - 2026</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-2 text-xs font-semibold text-slate-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Tools</p>
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
                  <Badge>AI Operator & Enablement Intern </Badge>
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
              <SectionTitle>Professional Objective</SectionTitle>
              <div className="space-y-4 text-[15px] leading-8 text-slate-700 dark:text-slate-200">
                <p>
                  I am applying for the AI Operator & Enablement Intern  position at Filum.ai. With a solid foundation in information technology and systems thinking,
                  I aim to act as a bridge between the product and customers, optimize the user experience, and help resolve issues quickly and clearly.
                </p>
                <p>
                  I am proactive, detail-oriented, and inclined to improve processes to reduce operational friction. My long-term goal is to become a professional
                  who can support customers through data, process, and empathy.
                </p>
              </div>
            </motion.section>

            <section className="space-y-4">
              <SectionTitle>Featured Projects & Experience</SectionTitle>
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
                <SectionTitle>Key Strengths</SectionTitle>
                <div className="mt-4 space-y-3 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                  <p>Prioritizes clear communication, stays focused on goals, and adapts easily to fast-paced environments.</p>
                  <p>Has a technology background that helps me understand products quickly and collaborate well with technical, operations, and customer-facing teams.</p>
                  <p>Enjoys working with processes and data while remaining flexible enough to handle real-world situations.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="print-avoid-break rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <SectionTitle>Fit for the Role</SectionTitle>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {['Customer onboarding', 'Support & care', 'Process tracking', 'Experience optimization'].map((item) => (
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
              <p className="font-semibold text-slate-900 dark:text-white">Personal Commitment</p>
              <p className="mt-2">
                I am committed to keeping customers at the center of every activity, listening proactively, understanding their needs, and delivering suitable solutions that create positive experiences. I hope to build long-term partnerships with customers through dedication, responsibility, and a continuous learning mindset to improve service quality.
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
    <div className="print-avoid-break rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{label}</p>
      <p className="mt-2 break-words font-semibold text-white">{value}</p>
    </div>
  );
}