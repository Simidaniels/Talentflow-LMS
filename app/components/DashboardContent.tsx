import Link from "next/link";
import {
  announcements,
  continueCourses,
  deadlines,
  heroStats,
  learnerProfile,
  learningItems,
  streakDays,
  type LearningStatus
} from "../data";
import styles from "../page.module.css";

type DashboardContentProps = {
  activeTab: "All" | LearningStatus;
  onTabChange: (tab: "All" | LearningStatus) => void;
  displayName: string;
};

const tabs: { key: "All" | LearningStatus; count: number }[] = [
  { key: "All", count: 4 },
  { key: "In Progress", count: 2 },
  { key: "Completed", count: 1 },
  { key: "Not Started", count: 1 }
];

export default function DashboardContent({
  activeTab,
  onTabChange,
  displayName
}: DashboardContentProps) {
  const visibleItems =
    activeTab === "All"
      ? learningItems
      : learningItems.filter((item) => item.status === activeTab);

  return (
    <>
      <section className={styles.heroCard}>
        <div className={styles.heroCopy}>
          <h1>
            Good evening, {displayName} <span>👋</span>
          </h1>
          <p>Saturday, 21 March 2026 - Keep up the momentum!</p>
          <div className={styles.tagRow}>
            <span className={styles.pill}>
              <span className={styles.pillIcon} />
              {learnerProfile.cohort}
            </span>
            <span className={`${styles.pill} ${styles.softPill}`}>ID: {learnerProfile.id}</span>
          </div>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.statBlock}>
            <span className={styles.statValue}>{heroStats.enrolled}</span>
            <span className={styles.statLabel}>Courses Enrolled</span>
          </div>

          <div className={styles.statBlock}>
            <div
              className={styles.progressRing}
              style={{ ["--progress" as string]: heroStats.overall } as React.CSSProperties}
            >
              <div className={styles.progressContent}>
                {heroStats.overall}%
                <span>OVERALL</span>
              </div>
            </div>
          </div>

          <div className={styles.statBlock}>
            <span className={`${styles.statValue} ${styles.warningValue}`}>{heroStats.dueSoon}</span>
            <span className={styles.statLabel}>Due Soon</span>
          </div>

          <div className={styles.statBlock}>
            <span className={`${styles.statValue} ${styles.successValue}`}>{heroStats.completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>
      </section>

      <section className={styles.dashboardGrid}>
        <div className={styles.mainColumn}>
          <div className={styles.sectionHead}>
            <h2>Continue Learning</h2>
            <button className={styles.linkButton}>View all</button>
          </div>

          <div className={styles.continueGrid}>
            {continueCourses.map((course) => (
              <article className={styles.courseCard} key={course.id}>
                <div
                  className={`${styles.courseBanner} ${
                    course.bannerTone === "blue" ? styles.bannerBlue : styles.bannerDark
                  }`}
                >
                  <span className={styles.courseTag}>{course.track}</span>
                  <div className={styles.courseIllustration}>{course.illustration}</div>
                </div>

                <div className={styles.courseBody}>
                  <h3>{course.title}</h3>
                  <div className={styles.courseInstructor}>By {course.instructor}</div>
                  <div className={styles.courseProgressRow}>
                    <span>{course.lesson}</span>
                    <strong className={styles.percent}>{course.progress}%</strong>
                  </div>
                  <div className={styles.bar}>
                    <span style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <div className={styles.courseFooter}>
                  <span>{course.lessonsLeft} lessons left</span>
                  <button className={styles.continueButton}>Continue</button>
                </div>
              </article>
            ))}
          </div>

          <section className={styles.myLearning}>
            <div className={styles.sectionHead}>
              <div className={styles.headingWithMeta}>
                <h2>My Learning</h2>
                <span>{learningItems.length} courses</span>
              </div>
            </div>

            <div className={styles.tabRow}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`${styles.tabButton} ${
                    activeTab === tab.key ? styles.tabButtonActive : ""
                  }`}
                >
                  {tab.key} <span>{tab.count}</span>
                </button>
              ))}
            </div>

            <div className={styles.learningLayout}>
              <div className={styles.learningCards}>
                {visibleItems.map((item) => (
                  <article className={styles.learningCourseCard} key={item.title}>
                    <div
                      className={`${styles.learningBanner} ${
                        item.tone === "green"
                          ? styles.bannerGreen
                          : item.tone === "dark"
                            ? styles.bannerDark
                            : styles.bannerBlue
                      }`}
                    >
                      <span
                        className={`${styles.learningStatusPill} ${
                          item.status === "Completed"
                            ? styles.completedPill
                            : item.status === "Not Started"
                              ? styles.notStartedPill
                              : styles.inProgressPill
                        }`}
                      >
                        {item.status}
                      </span>
                      <div className={styles.courseIllustration}>{item.illustration}</div>
                    </div>

                    <div className={styles.learningBody}>
                      <p className={styles.learningTrack}>FRONTEND DEV</p>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                      <div className={styles.learningBar}>
                        <span style={{ width: `${item.progress}%` }} />
                      </div>
                      <div className={styles.learningProgressRow}>
                        <span>{item.status}</span>
                        <strong>{item.progress}%</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className={styles.sideColumn}>
          <section className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h3>Deadlines</h3>
              <button className={styles.linkButton}>View all</button>
            </div>

            <div className={styles.deadlineList}>
              {deadlines.map((item) => (
                <article className={styles.deadlineItem} key={item.title}>
                  <span className={`${styles.deadlineDot} ${styles[item.tone]}`} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.subtitle}</p>
                  </div>
                  <strong className={styles[`${item.tone}Text`]}>{item.dueIn}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.panelCard}>
            <div className={styles.panelHead}>
              <h3>Weekly Streak</h3>
              <div className={styles.streakMeta}>
                <span>O</span>
                <strong>4 days</strong>
              </div>
            </div>

            <div className={styles.streakDays}>
              {streakDays.map((day) => (
                <div className={styles.streakDay} key={day.label + day.state}>
                  <div
                    className={`${styles.streakCircle} ${
                      day.state === "done"
                        ? styles.streakDone
                        : day.state === "today"
                          ? styles.streakToday
                          : ""
                    }`}
                  >
                    {day.state === "done" ? "OK" : day.state === "today" ? "O" : ""}
                  </div>
                  <span>{day.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.discussionCard}>
            <h3>Join the Discussion</h3>
            <p>
              Connect with 50+ interns across Frontend, Backend, UI/UX, PM, Graphic Design,
              and Social Media tracks.
            </p>
            <div className={styles.activeUsers}>
              <span className={styles.userBubble}>AK</span>
              <span className={styles.userBubble}>SC</span>
              <span className={styles.userBubble}>CF</span>
              <span className={styles.userBubble}>MK</span>
              <span className={styles.userBubble}>PO</span>
              <strong>+45 active now</strong>
            </div>
            <Link href="/discussion-board" className={styles.discussionButton}>
              Open Discussion Board
            </Link>
          </section>

          <section className={styles.announcementsCard}>
            <div className={styles.panelHead}>
              <h3>Announcements</h3>
              <button className={styles.linkButton}>All</button>
            </div>

            <div className={styles.announcementList}>
              {announcements.map((item) => (
                <article className={styles.announcementItem} key={item.author + item.time}>
                  <span
                    className={`${styles.announcementAvatar} ${
                      item.color === "purple"
                        ? styles.avatarPurple
                        : item.color === "green"
                          ? styles.avatarGreen
                          : styles.avatarGold
                    }`}
                  >
                    {item.author.slice(0, 2).toUpperCase()}
                  </span>
                  <div className={styles.announcementBody}>
                    <h4>{item.author}</h4>
                    <p className={styles.announcementTag}>{item.tag}</p>
                    <p>{item.message}</p>
                    <span>{item.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </>
  );
}
