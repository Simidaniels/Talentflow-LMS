"use client";

import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import styles from "../page.module.css";

const rangeTabs = ["7d", "30d", "All"] as const;

const statCards = [
  {
    key: "lessonsComplete",
    icon: "⚑",
    value: 9,
    label: "Lessons Complete",
    sublabel: "+4 this week",
    tone: "blue",
    suffix: ""
  },
  {
    key: "hoursLearned",
    icon: "◔",
    value: 24,
    label: "Hours Learned",
    sublabel: "+3.5 hrs",
    tone: "green",
    suffix: "h"
  },
  {
    key: "assignmentsDone",
    icon: "◉",
    value: 6,
    label: "Assignments Done",
    sublabel: "3 pending",
    tone: "gold",
    suffix: ""
  },
  {
    key: "dayStreak",
    icon: "♨",
    value: 4,
    label: "Day Streak",
    sublabel: "Best: 9 days",
    tone: "green",
    suffix: ""
  }
] as const;

type ProgressStatKey = "lessonsComplete" | "hoursLearned" | "assignmentsDone" | "dayStreak";

const trackSteps = [
  {
    title: "HTML5 Essentials",
    meta: "Completed Mar 3",
    state: "done",
    badge: "Done",
    icon: "✓"
  },
  {
    title: "CSS Fundamentals",
    meta: "Due Apr 12 · 50% done",
    state: "active",
    badge: "Active",
    icon: "◉"
  },
  {
    title: "JavaScript Fundamentals",
    meta: "Starts Apr 14",
    state: "upcoming",
    badge: "Upcoming",
    icon: "🔒"
  },
  {
    title: "Track Certificate",
    meta: "End of Week 12",
    state: "locked",
    badge: "Locked",
    icon: "🔒"
  }
] as const;

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May"];

const activityGrid = [
  1, 0, 1, 2, 0, 1, 1, 3, 0, 2, 1, 1, 2, 3, 0, 0, 0, 2, 0, 1, 1, 3, 0, 1, 1, 0, 0, 1, 2, 3,
  1, 1, 0, 0, 2, 0, 1, 2, 0, 1, 2, 1, 1, 2, 1, 1, 2, 2, 0, 0, 0, 2, 0, 1, 0, 1, 0, 1, 2, 1,
  3, 2, 1, 0, 1, 0, 1, 2, 0, 2, 1, 1, 0, 2, 3, 1, 1, 2, 1, 3, 2, 0, 1, 0, 2, 0, 1, 3, 0, 1
];

const courseProgressRows = [
  {
    title: "HTML5 Essentials",
    meta: "18/18 lessons · Completed Mar 3",
    percent: 100,
    tone: "done",
    badge: "Done"
  },
  {
    title: "CSS Fundamentals",
    meta: "9/18 lessons · Due Apr 12",
    percent: 50,
    tone: "active",
    badge: "Active"
  },
  {
    title: "JavaScript Fundamentals",
    meta: "0/22 lessons · Starts Apr 14",
    percent: 0,
    tone: "upcoming",
    badge: "Upcoming"
  }
] as const;

const learningSeries = [1.4, 2.6, 1.8, 3.1, 2.2, 2.8, 3.6];
const learningDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const streakDaysMini = [
  { label: "M", sub: "MON", tone: "done" },
  { label: "T", sub: "TUE", tone: "done" },
  { label: "W", sub: "WED", tone: "done" },
  { label: "T", sub: "THU", tone: "done" },
  { label: "F", sub: "FRI", tone: "done" },
  { label: "S", sub: "SAT", tone: "off" },
  { label: "S", sub: "NOW", tone: "current" }
] as const;

const skillPoints = [
  { label: "CSS", x: 50, y: 10 },
  { label: "HTML", x: 84, y: 32 },
  { label: "JS", x: 62, y: 72 },
  { label: "Layout", x: 50, y: 88 },
  { label: "Resp.", x: 22, y: 68 },
  { label: "A11y", x: 16, y: 42 }
] as const;

const badges = [
  { label: "First Lesson", icon: "🎯", active: true },
  { label: "Module Master", icon: "🏅", active: true },
  { label: "HTML Expert", icon: "🌐", active: true },
  { label: "7-Day Streak", icon: "🔥", active: true },
  { label: "CSS Wizard", icon: "🧙", active: false },
  { label: "Night Owl", icon: "🦉", active: false },
  { label: "30-Day Streak", icon: "⚡", active: false },
  { label: "JS Starter", icon: "🤍", active: false },
  { label: "Graduate", icon: "🎓", active: false }
] as const;

export default function ProgressPage() {
  const [activeRange, setActiveRange] = useState<(typeof rangeTabs)[number]>("30d");
  const [animatedStats, setAnimatedStats] = useState<Record<ProgressStatKey, number>>({
    lessonsComplete: 1,
    hoursLearned: 1,
    assignmentsDone: 1,
    dayStreak: 1
  });

  useEffect(() => {
    const timers = statCards.map((item) => {
      const target = item.value;
      const stepTime = Math.max(45, Math.floor(600 / Math.max(target - 1, 1)));
      const key = item.key as ProgressStatKey;

      const timer = window.setInterval(() => {
        let shouldClear = false;

        setAnimatedStats((current) => {
          const currentValue = current[key];

          if (currentValue >= target) {
            shouldClear = true;
            return current;
          }

          const nextValue = currentValue + 1;

          if (nextValue >= target) {
            shouldClear = true;
          }

          return {
            ...current,
            [key]: Math.min(nextValue, target)
          };
        });

        if (shouldClear) {
          window.clearInterval(timer);
        }
      }, stepTime);

      return timer;
    });

    return () => {
      timers.forEach((timer) => window.clearInterval(timer));
    };
  }, []);

  return (
    <AppShell title="Progress">
      <main className={styles.progressPage}>
        <section className={styles.progressHero}>
          <div>
            <h1>Your Progress</h1>
            <p>Week 9 of 12 internship · Frontend Development track</p>
          </div>

          <div className={styles.progressRangeTabs}>
            {rangeTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveRange(tab)}
                className={`${styles.progressRangeButton} ${
                  activeRange === tab ? styles.progressRangeButtonActive : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.progressStatsGrid}>
          {statCards.map((card) => (
            <article className={styles.progressStatCard} key={card.label}>
              <span className={`${styles.progressStatIcon} ${styles[`progressStatIcon${card.tone}`]}`}>
                {card.icon}
              </span>
              <strong>{`${animatedStats[card.key]}${card.suffix}`}</strong>
              <h2>{card.label}</h2>
              <div className={styles.progressStatBar}>
                <span className={styles.progressStatHint}>{card.sublabel}</span>
              </div>
            </article>
          ))}
        </section>

        <section className={`${styles.progressGrid} ${styles.progressOverviewGrid}`}>
          <div className={`${styles.progressMainColumn} ${styles.progressOverviewMainColumn}`}>
            <article className={styles.progressPanel}>
              <div className={styles.progressPanelHead}>
                <div>
                  <h2>Learning Activity</h2>
                  <p>Past 15 weeks</p>
                </div>
              </div>

              <div className={styles.progressMonths}>
                {monthLabels.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>

              <div className={styles.progressHeatmap}>
                {activityGrid.map((value, index) => (
                  <span
                    key={`${value}-${index}`}
                    className={`${styles.progressHeatCell} ${styles[`progressHeat${value}`]}`}
                  />
                ))}
              </div>

              <div className={styles.progressHeatLegend}>
                <span>Less</span>
                <div className={styles.progressHeatLegendScale}>
                  <span className={`${styles.progressHeatCell} ${styles.progressHeat0}`} />
                  <span className={`${styles.progressHeatCell} ${styles.progressHeat1}`} />
                  <span className={`${styles.progressHeatCell} ${styles.progressHeat2}`} />
                  <span className={`${styles.progressHeatCell} ${styles.progressHeat3}`} />
                </div>
                <span>More</span>
              </div>
            </article>

            <article className={styles.progressPanel}>
              <div className={styles.progressPanelHead}>
                <div>
                  <h2>Daily Learning Time</h2>
                  <p>Average study hours this week</p>
                </div>
                <button className={styles.linkButton}>View history</button>
              </div>

              <div className={styles.progressChart}>
                {learningSeries.map((value, index) => (
                  <div className={styles.progressChartColumn} key={learningDays[index]}>
                    <div className={styles.progressChartValue}>{value.toFixed(1)}h</div>
                    <span className={styles.progressChartLabel}>{learningDays[index]}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.progressPanel}>
              <div className={styles.progressPanelHead}>
                <div>
                  <h2>Course Progress</h2>
                  <p>3 enrolled · 1 completed</p>
                </div>
                <button className={styles.linkButton}>All courses</button>
              </div>

              <div className={styles.progressCourseList}>
                {courseProgressRows.map((course) => (
                  <div className={styles.progressCourseRow} key={course.title}>
                    <div className={styles.progressCourseTop}>
                      <div className={styles.progressCourseTitleWrap}>
                        <span
                          className={`${styles.progressCourseDot} ${
                            course.tone === "done"
                              ? styles.progressCourseDotDone
                              : course.tone === "active"
                                ? styles.progressCourseDotActive
                                : styles.progressCourseDotUpcoming
                          }`}
                        />
                        <h3>{course.title}</h3>
                      </div>
                      <div className={styles.progressCourseRight}>
                        <strong>{course.percent}%</strong>
                        <span
                          className={`${styles.progressCourseBadge} ${
                            course.tone === "done"
                              ? styles.progressCourseBadgeDone
                              : course.tone === "active"
                                ? styles.progressCourseBadgeActive
                                : styles.progressCourseBadgeUpcoming
                          }`}
                        >
                          {course.badge}
                        </span>
                      </div>
                    </div>
                    <div className={styles.progressCourseBar}>
                      <span style={{ width: `${course.percent}%` }} />
                    </div>
                    <p>{course.meta}</p>
                  </div>
                ))}
              </div>
            </article>

            <section className={styles.progressBottomGrid}>
              <article className={styles.progressPanel}>
                <div className={styles.progressPanelHead}>
                  <h2>Learning Streak</h2>
                </div>

                <div className={styles.progressStreakBlock}>
                  <div className={styles.progressStreakCount}>
                    <span className={styles.progressStreakFlame}>🔥</span>
                    <strong>4</strong>
                    <span>Day Streak</span>
                  </div>

                  <div className={styles.progressStreakWeek}>
                    <p>This Week</p>
                    <div className={styles.progressStreakMiniRow}>
                      {streakDaysMini.map((day) => (
                        <div
                          key={day.label + day.sub}
                          className={`${styles.progressStreakMini} ${
                            day.tone === "done"
                              ? styles.progressStreakMiniDone
                              : day.tone === "current"
                                ? styles.progressStreakMiniCurrent
                                : styles.progressStreakMiniOff
                          }`}
                        >
                          <strong>{day.label}</strong>
                          <span>{day.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <article className={styles.progressPanel}>
                <div className={styles.progressPanelHead}>
                  <h2>Skill Breakdown</h2>
                </div>

                <div className={styles.progressRadarCard}>
                  <svg
                    viewBox="0 0 100 100"
                    className={styles.progressRadarSvg}
                    aria-label="Skill breakdown radar"
                  >
                    <polygon
                      points="50,14 82,32 82,68 50,86 18,68 18,32"
                      className={styles.progressRadarGrid}
                    />
                    <polygon
                      points="50,24 72,36 68,60 50,74 32,58 28,42"
                      className={styles.progressRadarShape}
                    />
                    {skillPoints.map((point) => (
                      <g key={point.label}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="1.8"
                          className={styles.progressRadarNode}
                        />
                        <text
                          x={point.x}
                          y={point.y - 6}
                          textAnchor="middle"
                          className={styles.progressRadarText}
                        >
                          {point.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </article>
            </section>
          </div>

          <aside className={`${styles.progressSideColumn} ${styles.progressOverviewSideColumn}`}>
            <article className={styles.progressPanel}>
              <div className={styles.progressPanelHead}>
                <h2>Track Overview</h2>
                <button className={styles.linkButton}>View all</button>
              </div>

              <div className={styles.progressTrackTop}>
                <div
                  className={styles.progressTrackRing}
                  style={{ ["--progress" as string]: 50 } as React.CSSProperties}
                >
                  <div className={styles.progressTrackRingInner}>
                    <strong>50%</strong>
                    <span>DONE</span>
                  </div>
                </div>

                <div className={styles.progressTrackMeta}>
                  <h3>Frontend Development</h3>
                  <span className={styles.progressTrackId}>TF-2024-0042</span>
                  <p>3 courses · Week 9 of 12</p>
                </div>
              </div>

              <div className={styles.progressTimeline}>
                {trackSteps.map((item, index) => (
                  <div className={styles.progressTimelineItem} key={item.title}>
                    <div className={styles.progressTimelineRail}>
                      <span
                        className={`${styles.progressTimelineDot} ${
                          item.state === "done"
                            ? styles.progressTimelineDone
                            : item.state === "active"
                              ? styles.progressTimelineActive
                              : item.state === "locked"
                                ? styles.progressTimelineLocked
                                : styles.progressTimelineUpcoming
                        }`}
                      >
                        {item.icon}
                      </span>
                      {index !== trackSteps.length - 1 ? (
                        <span className={styles.progressTimelineLine} />
                      ) : null}
                    </div>

                    <div className={styles.progressTimelineBody}>
                      <div className={styles.progressTimelineTitleRow}>
                        <h4>{item.title}</h4>
                        <span
                          className={`${styles.progressTimelineBadge} ${
                            item.state === "done"
                              ? styles.progressTimelineBadgeDone
                              : item.state === "active"
                                ? styles.progressTimelineBadgeActive
                                : item.state === "locked"
                                  ? styles.progressTimelineBadgeLocked
                                  : styles.progressTimelineBadgeUpcoming
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p>{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.progressPanel}>
              <div className={styles.progressPanelHead}>
                <h2>Badges</h2>
                <button className={styles.linkButton}>4/9 earned</button>
              </div>

              <div className={styles.progressBadgesGrid}>
                {badges.map((badge) => (
                  <div
                    key={badge.label}
                    className={`${styles.progressBadgeCard} ${
                      badge.active ? styles.progressBadgeCardActive : styles.progressBadgeCardLocked
                    }`}
                  >
                    <span className={styles.progressBadgeIcon}>{badge.icon}</span>
                    <strong>{badge.label}</strong>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>
      </main>
    </AppShell>
  );
}
