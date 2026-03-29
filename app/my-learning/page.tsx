import Link from "next/link";
import AppShell from "../components/AppShell";
import styles from "../page.module.css";

type Lesson = {
  title: string;
  type: string;
  time: string;
  status?: string;
};

type Module = {
  title: string;
  summary: string;
  done?: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "Introduction to CSS",
    summary: "4 lessons - 1h 0m",
    done: "4/4 done",
    lessons: [
      { title: "What is CSS?", type: "VIDEO", time: "8m" },
      { title: "CSS Syntax and Selectors", type: "VIDEO", time: "12m" },
      { title: "Colors and Typography", type: "VIDEO", time: "18m" },
      { title: "The Box Model", type: "VIDEO", time: "22m" }
    ]
  },
  {
    title: "Layouts",
    summary: "5 lessons - 2h 30m",
    done: "3/5 done",
    lessons: [
      { title: "CSS Display Property", type: "VIDEO", time: "15m" },
      { title: "Flexbox Fundamentals", type: "VIDEO", time: "28m" },
      { title: "Flexbox in Practice", type: "VIDEO", time: "32m" },
      { title: "CSS Grid Layout", type: "VIDEO", time: "35m", status: "In Progress" },
      { title: "Grid Advanced Patterns", type: "LOCKED", time: "" }
    ]
  },
  {
    title: "Advanced CSS",
    summary: "5 lessons - 2h 50m",
    lessons: [
      { title: "CSS Variables and Custom Properties", type: "VIDEO", time: "22m" },
      { title: "Animations and Transitions", type: "VIDEO", time: "38m" },
      { title: "CSS Preprocessors (Sass)", type: "VIDEO", time: "42m" },
      { title: "Responsive Design with Media Queries", type: "VIDEO", time: "35m" },
      { title: "CSS Architecture & BEM Methodology", type: "VIDEO", time: "33m" }
    ]
  },
  {
    title: "Real-World Projects",
    summary: "4 lessons - 2h 50m",
    lessons: [
      { title: "Building a Navigation Component", type: "PROJECT", time: "42m" },
      { title: "Card Component System", type: "PROJECT", time: "38m" },
      { title: "Form Design & Accessibility", type: "PROJECT", time: "35m" },
      { title: "Capstone: Full Landing Page", type: "PROJECT", time: "55m" }
    ]
  }
];

const glanceItems = [
  ["⚑", "Level", "Beginner to Intermediate"],
  ["▤", "Lessons", "18 total"],
  ["◔", "Duration", "8h 55m"],
  ["✓", "Certificate", "Included"],
  ["✦", "Track", "Frontend Dev"],
  ["◷", "Updated", "March 2025"]
];

const learningPoints = [
  "CSS selectors, specificity, and the cascade",
  "Flexbox and CSS Grid for modern layouts",
  "Animations, transitions, and transforms",
  "BEM naming and CSS architecture patterns",
  "The full box model and layout flow",
  "CSS custom properties (variables)",
  "Responsive design with media queries",
  "Build 4 real-world UI components"
];

const prerequisites = [
  "Basic HTML understanding (elements, attributes, structure)",
  "A code editor (VS Code recommended)",
  "No CSS experience necessary - we start from scratch"
];

type PageProps = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function MyLearningPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawTab = params.tab;
  const activeTab =
    rawTab === "overview" || rawTab === "reviews" || rawTab === "curriculum"
      ? rawTab
      : "curriculum";

  return (
    <AppShell title="My Learning" breadcrumbTrail={["My Learning", "CSS Fundamentals"]}>
      <main className={styles.learningPage}>
        <section className={styles.courseHero}>
          <div className={styles.courseHeroContent}>
            <div className={styles.courseMetaRow}>
              <span className={styles.enrolledPill}>Enrolled</span>
              <span className={styles.trackBadgeHero}>Frontend Development</span>
            </div>

            <h1>CSS Fundamentals</h1>
            <p>
              Master modern CSS from the ground up - selectors, the box model, Flexbox, Grid,
              animations, and real-world project patterns.
            </p>

            <div className={styles.instructorRow}>
              <span className={styles.instructorAvatar}>SB</span>
              <div>
                <strong>Sarah Bright</strong>
                <span> - Senior UI Engineer</span>
              </div>
            </div>

            <div className={styles.ratingRow}>★★★★☆ 4.8 <span>(127 ratings)</span></div>

            <div className={styles.heroInfoChips}>
              <span><strong>▤</strong> 18 Lessons</span>
              <span><strong>◔</strong> 8h 55m total</span>
              <span><strong>⚑</strong> Beginner to Intermediate</span>
              <span><strong>✓</strong> Certificate Included</span>
            </div>
          </div>

          <div className={styles.codePreviewCard}>
            <div className={styles.codePreviewDots}>
              <span />
              <span />
              <span />
            </div>
            <pre>{`/* CSS Grid Layout */

.container {
  display: grid;
  grid-template-cols:
    repeat(3, 1fr);
  gap: 24px;
  padding: 32px;
}

.card {
  border-radius: 12px;
  background: #ffffff;
}`}</pre>
          </div>
        </section>

        <section className={styles.courseTabs} role="tablist" aria-label="Course sections">
          <Link
            href={{ pathname: "/my-learning", query: { tab: "overview" } }}
            className={`${styles.courseTab} ${activeTab === "overview" ? styles.courseTabActive : ""}`}
          >
            Overview
          </Link>
          <Link
            href={{ pathname: "/my-learning", query: { tab: "curriculum" } }}
            className={`${styles.courseTab} ${activeTab === "curriculum" ? styles.courseTabActive : ""}`}
          >
            Curriculum <span>18</span>
          </Link>
          <Link
            href={{ pathname: "/my-learning", query: { tab: "reviews" } }}
            className={`${styles.courseTab} ${activeTab === "reviews" ? styles.courseTabActive : ""}`}
          >
            Reviews <span>127</span>
          </Link>
        </section>

        {activeTab === "overview" ? (
          <section className={styles.tabContentLayout}>
            <div className={styles.overviewCard}>
              <section>
                <h2 className={styles.overviewHeading}>What you'll learn</h2>
                <div className={styles.learnGrid}>
                  {learningPoints.map((point) => (
                    <div className={styles.learnItem} key={point}>
                      <span className={styles.learnCheck}>✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.overviewSection}>
                <h2 className={styles.overviewHeading}>Prerequisites</h2>
                <div className={styles.prereqList}>
                  {prerequisites.map((item) => (
                    <div className={styles.prereqItem} key={item}>
                      <span className={styles.prereqArrow}>&gt;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.overviewSection}>
                <h2 className={styles.overviewHeading}>Your Instructor</h2>
                <div className={styles.instructorCardLarge}>
                  <span className={styles.instructorAvatarLarge}>SB</span>
                  <div className={styles.instructorLargeBody}>
                    <h3>Sarah Bright</h3>
                    <p className={styles.instructorRole}>
                      Senior UI Engineer - Previously at Figma & Stripe
                    </p>
                    <p className={styles.instructorBio}>
                      Sarah has 9 years of experience building design systems and component
                      libraries. She's passionate about making CSS concepts accessible to all skill
                      levels and has trained over 2,000 students.
                    </p>
                    <div className={styles.instructorStats}>
                      <span>4.9 avg rating</span>
                      <span>2,140 students</span>
                      <span>4 courses</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className={styles.curriculumSide}>
              <section className={styles.resumeCard}>
                <div className={styles.resumeRing}>
                  <div className={styles.resumeRingInner}>
                    <strong>50%</strong>
                    <span>DONE</span>
                  </div>
                </div>
                <h3>Resume Learning</h3>
                <p>9 of 18 lessons complete</p>
                <button className={styles.primaryCourseButton}>Continue Where I Left Off</button>
                <button className={styles.secondaryCourseButton}>Preview Certificate</button>
              </section>

              <section className={styles.glanceCard}>
                <h3>At a Glance</h3>
                <div className={styles.glanceList}>
                  {glanceItems.map(([icon, label, value]) => (
                    <div className={styles.glanceRow} key={label}>
                      <div className={styles.glanceLabelWrap}>
                        <span className={styles.glanceIcon}>{icon}</span>
                        <span>{label}</span>
                      </div>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </section>
        ) : null}

        {activeTab === "curriculum" ? (
          <section className={styles.curriculumArea}>
            <div className={styles.curriculumMain}>
              <p className={styles.curriculumSummary}>
                <strong>4 modules</strong> - <strong>18 lessons</strong> - <strong>8h 55m</strong>{" "}
                total length
              </p>

              <div className={styles.moduleList}>
                {modules.map((module, moduleIndex) => (
                  <details className={styles.moduleCard} key={module.title}>
                    <summary className={styles.moduleHeader}>
                      <div className={styles.moduleTitleWrap}>
                        <span className={styles.moduleIndex}>{moduleIndex + 1}</span>
                        <div>
                          <h3>{module.title}</h3>
                          <p>{module.summary}</p>
                        </div>
                      </div>
                      <div className={styles.moduleDoneWrap}>
                        {module.done ? <span className={styles.moduleDone}>{module.done}</span> : null}
                        <span className={styles.moduleChevron}>
                          <span className={styles.chevronClosed}>▼</span>
                          <span className={styles.chevronOpen}>▲</span>
                        </span>
                      </div>
                    </summary>

                    <div className={styles.lessonList}>
                      {module.lessons.map((lesson) => (
                        <div className={styles.lessonRow} key={lesson.title}>
                          <span
                            className={`${styles.lessonCheck} ${
                              moduleIndex >= 2 || lesson.type === "LOCKED" ? styles.lessonLocked : ""
                            }`}
                          >
                            {moduleIndex >= 2 || lesson.type === "LOCKED" ? "🔒" : "✓"}
                          </span>
                          <div className={styles.lessonBody}>
                            <h4>{lesson.title}</h4>
                            <p>
                              <span className={styles.lessonType}>{lesson.type}</span> {lesson.time}
                            </p>
                          </div>
                          {lesson.status ? (
                            <span className={styles.lessonStatus}>{lesson.status}</span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <aside className={styles.curriculumSide}>
              <section className={styles.resumeCard}>
                <div className={styles.resumeRing}>
                  <div className={styles.resumeRingInner}>
                    <strong>50%</strong>
                    <span>DONE</span>
                  </div>
                </div>
                <h3>Resume Learning</h3>
                <p>9 of 18 lessons complete</p>
                <button className={styles.primaryCourseButton}>
                  <span className={styles.buttonIcon}>▶</span>
                  Continue Where I Left Off
                </button>
                <button className={styles.secondaryCourseButton}>
                  <span className={styles.buttonIcon}>✓</span>
                  Preview Certificate
                </button>
              </section>

              <section className={styles.glanceCard}>
                <h3>At a Glance</h3>
                <div className={styles.glanceList}>
                  {glanceItems.map(([icon, label, value]) => (
                    <div className={styles.glanceRow} key={label}>
                      <div className={styles.glanceLabelWrap}>
                        <span className={styles.glanceIcon}>{icon}</span>
                        <span>{label}</span>
                      </div>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </section>
        ) : null}

        {activeTab === "reviews" ? (
          <section className={styles.tabContentLayout}>
            <div className={`${styles.simplePageCard} ${styles.centeredPlaceholder}`}>
              <p className={styles.simplePageText}>Reviews panel coming soon.</p>
            </div>

            <aside className={styles.curriculumSide}>
              <section className={styles.resumeCard}>
                <div className={styles.resumeRing}>
                  <div className={styles.resumeRingInner}>
                    <strong>50%</strong>
                    <span>DONE</span>
                  </div>
                </div>
                <h3>Resume Learning</h3>
                <p>9 of 18 lessons complete</p>
                <button className={styles.primaryCourseButton}>
                  <span className={styles.buttonIcon}>▶</span>
                  Continue Where I Left Off
                </button>
                <button className={styles.secondaryCourseButton}>
                  <span className={styles.buttonIcon}>✓</span>
                  Preview Certificate
                </button>
              </section>

              <section className={styles.glanceCard}>
                <h3>At a Glance</h3>
                <div className={styles.glanceList}>
                  {glanceItems.map(([icon, label, value]) => (
                    <div className={styles.glanceRow} key={label}>
                      <div className={styles.glanceLabelWrap}>
                        <span className={styles.glanceIcon}>{icon}</span>
                        <span>{label}</span>
                      </div>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </section>
        ) : null}
      </main>
    </AppShell>
  );
}
