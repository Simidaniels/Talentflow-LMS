"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "../components/AppShell";
import {
  ACTIVE_SESSION_KEY,
  STORED_ACCOUNT_KEY,
  getInitials,
  type StoredAccount
} from "../auth-storage";
import { learnerProfile } from "../data";
import styles from "../page.module.css";

const profileStats = [
  { key: "lessonsDone", value: 9, label: "Lessons Done", suffix: "" },
  { key: "learningTime", value: 24, label: "Learning Time", suffix: "h" },
  { key: "assignments", value: 6, label: "Assignments", suffix: "" },
  { key: "dayStreak", value: 4, label: "Day Streak", prefix: "\ud83d\udd25 ", suffix: "" },
  { key: "badgesEarned", display: "4/9", label: "Badges Earned" },
  { key: "cohortRank", display: "#3", label: "Cohort Rank" }
] as const;

type AnimatedStatKey = "lessonsDone" | "learningTime" | "assignments" | "dayStreak";

const profileTabs = ["Overview", "Activity", "Badges", "Settings"] as const;

const skillTags = ["CSS", "HTML", "JavaScript", "Accessibility", "React (upcoming)"];

const aboutItems = [
  ["Intern ID", "TF-2024-0042"],
  ["Email", "[email protected]"],
  ["University", "University of Lagos"],
  ["Course of Study", "Computer Science, B.Sc."],
  ["Graduation Year", "2024"],
  [
    "Bio",
    "Computer Science graduate passionate about building accessible, performant web interfaces. Based in Lagos. Avid open-source contributor on weekends."
  ]
] as const;

const skillProgress = [
  { label: "HTML5", value: 100, tone: "green" },
  { label: "CSS Layout", value: 68, tone: "green" },
  { label: "CSS Selectors", value: 75, tone: "green" },
  { label: "Responsive", value: 45, tone: "gold" },
  { label: "Accessibility", value: 55, tone: "gold" },
  { label: "JavaScript", value: null, tone: "muted" }
] as const;

const cohortPeople = ["AO", "KE", "AM", "TN", "FI", "+7"] as const;

const cohortStats = [
  ["Cohort size", "12 interns"],
  ["Your rank", "#3 of 12 \ud83c\udfc6"],
  ["Avg. progress", "43%"],
  ["Internship end", "May 30, 2025"],
  ["Mentor", "Sarah Bright"]
] as const;

const allProfileBadges = [
  { label: "First Lesson", icon: "\ud83c\udfaf", active: true, meta: "Jan 15" },
  { label: "Module Master", icon: "\ud83c\udfc5", active: true, meta: "Mar 3" },
  { label: "HTML Expert", icon: "\ud83c\udf10", active: true, meta: "Mar 3" },
  { label: "7-Day Streak", icon: "\ud83d\udd25", active: true, meta: "Feb 28" },
  { label: "CSS Wizard", icon: "\ud83e\uddd9", active: false, meta: "Complete CSS" },
  { label: "Night Owl", icon: "\ud83e\udd89", active: false, meta: "Study after 10pm" },
  { label: "30-Day Streak", icon: "\u26a1", active: false, meta: "30 days straight" },
  { label: "JS Starter", icon: "\ud83d\udc9b", active: false, meta: "Start JS course" },
  { label: "Graduate", icon: "\ud83c\udf93", active: false, meta: "Complete track" }
] as const;

const recentActivity = [
  ["Watched lesson: CSS Grid Layout", "CSS Fundamentals \u00b7 Module 2, Lesson 4", "Today", "\u2302", "blue"],
  ["Completed lesson: CSS Positioning", "CSS Fundamentals \u00b7 Module 2, Lesson 3", "Yesterday", "\u2713", "green"],
  ["Started assignment: Box Model Practice", "Due Mar 25 \u00b7 30 pts", "Mar 20", "\u270e", "gold"],
  ["Completed lesson: Flexbox Basics", "CSS Fundamentals \u00b7 Module 2, Lesson 2", "Mar 19", "\u2713", "green"],
  ["Earned badge: Module Master", "Completed all lessons in HTML5 Module 4", "Mar 18", "\u2605", "green"],
  ["Submitted assignment: HTML Document Structure", "HTML5 Essentials \u00b7 25 pts \u00b7 Awaiting grade", "Mar 18", "\u21e1", "green"],
  ["Completed course: HTML5 Essentials", "18/18 lessons \u00b7 100% score", "Mar 3", "\u2713", "green"],
  ["Earned badge: HTML Expert", "Completed HTML5 Essentials with full score", "Mar 3", "\u2605", "green"],
  ["Reached 7-day learning streak!", "Earned the 7-Day Streak badge", "Feb 28", "\ud83d\udd25", "green"]
] as const;

const discussionContributions = [
  ["Threads started", "3"],
  ["Replies posted", "14"],
  ["Likes received", "41"],
  ["Best answer given", "\u2014"]
] as const;

const notificationSettings = [
  ["Assignment reminders", "Receive reminders before upcoming assignment and project deadlines.", true],
  ["Discussion replies", "Get notified when someone responds to your discussion posts or questions.", true],
  ["New announcements", "Stay updated on important cohort, instructor, and platform announcements.", true],
  ["Streak reminders", "Receive a daily reminder to maintain your learning streak.", false],
  ["Weekly summary email", "Get a weekly summary of your learning progress, assignments, and activity.", false]
] as const;

const preferenceSettings = [
  ["Language", "Select your preferred display language for the platform.", "link"],
  ["Timezone", "Set your local timezone for accurate deadlines, reminders, and activity logs.", "link"],
  ["Autoplay next lesson", "Automatically begin the next lesson after completing the current one.", "toggle"],
  ["Show closed captions", "Display captions on lesson videos by default for improved accessibility.", "toggleOff"]
] as const;

const accountSettings = [
  "Change password",
  "Download my data"
] as const;

type AboutForm = {
  fullName: string;
  internId: string;
  email: string;
  university: string;
  courseOfStudy: string;
  graduationYear: string;
  bio: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof profileTabs)[number]>("Overview");
  const [displayName, setDisplayName] = useState("Learner");
  const [initials, setInitials] = useState("TF");
  const [animatedStats, setAnimatedStats] = useState({
    lessonsDone: 1,
    learningTime: 1,
    assignments: 1,
    dayStreak: 1
  });
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [notificationValues, setNotificationValues] = useState(
    Object.fromEntries(notificationSettings.map(([title, , enabled]) => [title, enabled]))
  );
  const [preferenceToggleValues, setPreferenceToggleValues] = useState(
    Object.fromEntries(
      preferenceSettings
        .filter(([, , type]) => type === "toggle" || type === "toggleOff")
        .map(([title, , type]) => [title, type === "toggle"])
    )
  );
  const [aboutForm, setAboutForm] = useState<AboutForm>({
    fullName: "Learner",
    internId: "TF-2024-0042",
    email: "[email protected]",
    university: "University of Lagos",
    courseOfStudy: "Computer Science, B.Sc.",
    graduationYear: "2024",
    bio: "Computer Science graduate passionate about building accessible, performant web interfaces. Based in Lagos. Avid open-source contributor on weekends."
  });
  const profileAboutItems = useMemo(
    () =>
      [
        ["Full Name", aboutForm.fullName],
        ["Intern ID", aboutForm.internId],
        ["Email", aboutForm.email],
        ["University", aboutForm.university],
        ["Course of Study", aboutForm.courseOfStudy],
        ["Graduation Year", aboutForm.graduationYear],
        ["Bio", aboutForm.bio]
      ] as const,
    [aboutForm]
  );

  useEffect(() => {
    const storedSession = window.localStorage.getItem(ACTIVE_SESSION_KEY);

    if (!storedSession) {
      setDisplayName(learnerProfile.name);
      setInitials(getInitials(learnerProfile.name));
      setAboutForm((current) => ({ ...current, fullName: learnerProfile.name }));
      return;
    }

    try {
      const session = JSON.parse(storedSession) as { name?: string };
      const nextName = session.name || learnerProfile.name;
      setDisplayName(nextName);
      setInitials(getInitials(nextName));
      setAboutForm((current) => ({ ...current, fullName: nextName }));
    } catch {
      setDisplayName(learnerProfile.name);
      setInitials(getInitials(learnerProfile.name));
      setAboutForm((current) => ({ ...current, fullName: learnerProfile.name }));
    }
  }, []);

  useEffect(() => {
    const timers = profileStats
      .filter((item): item is Extract<(typeof profileStats)[number], { value: number }> => "value" in item)
      .map((item) => {
        const target = item.value;
        const stepTime = Math.max(45, Math.floor(600 / Math.max(target - 1, 1)));
        const key = item.key as AnimatedStatKey;

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

  function handleSignOut() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ACTIVE_SESSION_KEY);
    }

    router.push("/login");
  }

  function toggleNotification(title: string) {
    setNotificationValues((current) => ({
      ...current,
      [title]: !current[title]
    }));
  }

  function togglePreference(title: string) {
    setPreferenceToggleValues((current) => ({
      ...current,
      [title]: !current[title]
    }));
  }

  function handleAboutChange(field: keyof AboutForm, value: string) {
    setAboutForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleAboutEditToggle() {
    if (!isEditingAbout) {
      setIsEditingAbout(true);
      return;
    }

    const nextName = aboutForm.fullName.trim() || learnerProfile.name;
    const normalizedAbout = {
      ...aboutForm,
      fullName: nextName
    };

    setAboutForm(normalizedAbout);
    setDisplayName(nextName);
    setInitials(getInitials(nextName));

    if (typeof window !== "undefined") {
      const currentSession = window.localStorage.getItem(ACTIVE_SESSION_KEY);
      if (currentSession) {
        try {
          const parsedSession = JSON.parse(currentSession) as {
            name?: string;
            email?: string;
            role?: string;
          };
          window.localStorage.setItem(
            ACTIVE_SESSION_KEY,
            JSON.stringify({
              ...parsedSession,
              name: nextName
            })
          );
        } catch {
          window.localStorage.setItem(
            ACTIVE_SESSION_KEY,
            JSON.stringify({
              name: nextName
            })
          );
        }
      }

      const storedAccount = window.localStorage.getItem(STORED_ACCOUNT_KEY);
      if (storedAccount) {
        try {
          const parsedAccount = JSON.parse(storedAccount) as StoredAccount;
          window.localStorage.setItem(
            STORED_ACCOUNT_KEY,
            JSON.stringify({
              ...parsedAccount,
              name: nextName
            })
          );
        } catch {
          // Keep the current edit even if stored account parsing fails.
        }
      }
    }

    setIsEditingAbout(false);
  }

  return (
    <AppShell title="Profile">
      <main className={styles.profilePage}>
        <section className={styles.profileHero}>
          <div className={styles.profileHeroTop}>
            <div className={styles.profileIdentity}>
              <div className={styles.profileHeroAvatarWrap}>
                <span className={styles.profileHeroAvatar}>{initials}</span>
                <span className={styles.profileHeroEdit}>&#8599;</span>
              </div>

              <div className={styles.profileHeroText}>
                <h1>{displayName}</h1>
                <div className={styles.profileHeroMeta}>
                  <span>Frontend Development Intern</span>
                  <span className={styles.profileHeroId}>TF-2024-0042</span>
                </div>
                <p>
                  Computer Science graduate passionate about building accessible, performant web
                  interfaces. Based in Lagos. Avid open-source contributor on weekends.
                </p>

                <div className={styles.profileSkillTags}>
                  {skillTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <button type="button" className={styles.profileEditButton}>
              &#9998; Edit Profile
            </button>
          </div>

          <div className={styles.profileStatsRow}>
            {profileStats.map((item) => (
              <div className={styles.profileStatItem} key={item.label}>
                <strong>
                  {"value" in item
                    ? `${"prefix" in item ? item.prefix : ""}${animatedStats[item.key as AnimatedStatKey]}${"suffix" in item ? item.suffix : ""}`
                    : item.display}
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.profileTabs}>
          {profileTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`${styles.profileTabButton} ${
                activeTab === tab ? styles.profileTabButtonActive : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </section>

        {activeTab === "Overview" ? (
          <section className={`${styles.profileContentGrid} ${styles.profileOverviewGrid}`}>
            <div className={`${styles.profileMainColumn} ${styles.profileOverviewMainColumn}`}>
              <article className={styles.profileCardMain}>
                <div className={styles.profileCardHead}>
                  <h2>About</h2>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={handleAboutEditToggle}
                  >
                    {isEditingAbout ? "Save" : "Edit"}
                  </button>
                </div>

                <div className={styles.profileAboutGrid}>
                  {isEditingAbout ? (
                    <>
                      <label className={styles.profileAboutItem} htmlFor="profile-full-name">
                        <span>Full Name</span>
                        <input
                          id="profile-full-name"
                          className={styles.profileAboutInput}
                          value={aboutForm.fullName}
                          onChange={(event) => handleAboutChange("fullName", event.target.value)}
                        />
                      </label>
                      <label className={styles.profileAboutItem} htmlFor="profile-intern-id">
                        <span>Intern ID</span>
                        <input
                          id="profile-intern-id"
                          className={styles.profileAboutInput}
                          value={aboutForm.internId}
                          onChange={(event) => handleAboutChange("internId", event.target.value)}
                        />
                      </label>
                      <label className={styles.profileAboutItem} htmlFor="profile-email">
                        <span>Email</span>
                        <input
                          id="profile-email"
                          className={styles.profileAboutInput}
                          value={aboutForm.email}
                          onChange={(event) => handleAboutChange("email", event.target.value)}
                        />
                      </label>
                      <label className={styles.profileAboutItem} htmlFor="profile-university">
                        <span>University</span>
                        <input
                          id="profile-university"
                          className={styles.profileAboutInput}
                          value={aboutForm.university}
                          onChange={(event) => handleAboutChange("university", event.target.value)}
                        />
                      </label>
                      <label className={styles.profileAboutItem} htmlFor="profile-course-of-study">
                        <span>Course of Study</span>
                        <input
                          id="profile-course-of-study"
                          className={styles.profileAboutInput}
                          value={aboutForm.courseOfStudy}
                          onChange={(event) =>
                            handleAboutChange("courseOfStudy", event.target.value)
                          }
                        />
                      </label>
                      <label className={styles.profileAboutItem} htmlFor="profile-graduation-year">
                        <span>Graduation Year</span>
                        <input
                          id="profile-graduation-year"
                          className={styles.profileAboutInput}
                          value={aboutForm.graduationYear}
                          onChange={(event) =>
                            handleAboutChange("graduationYear", event.target.value)
                          }
                        />
                      </label>
                      <label className={styles.profileAboutItem} htmlFor="profile-bio">
                        <span>Bio</span>
                        <textarea
                          id="profile-bio"
                          className={styles.profileAboutTextarea}
                          value={aboutForm.bio}
                          onChange={(event) => handleAboutChange("bio", event.target.value)}
                        />
                      </label>
                    </>
                  ) : (
                    profileAboutItems.map(([label, value]) => (
                      <div className={styles.profileAboutItem} key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))
                  )}
                </div>
              </article>

              <article className={styles.profileCardMain}>
                <div className={styles.profileCardHead}>
                  <h2>Skills Progress</h2>
                  <button type="button" className={styles.linkButton}>
                    Based on completed lessons &amp; quizzes
                  </button>
                </div>

                <div className={styles.profileSkillsList}>
                  {skillProgress.map((item) => (
                    <div className={styles.profileSkillRow} key={item.label}>
                      <div className={styles.profileSkillHead}>
                        <strong>{item.label}</strong>
                        <span>{item.value === null ? "\u2014" : `${item.value}%`}</span>
                      </div>
                      <div className={styles.profileSkillBar}>
                        <span
                          className={`${styles.profileSkillBarFill} ${
                            item.tone === "gold"
                              ? styles.profileSkillBarGold
                              : item.tone === "muted"
                                ? styles.profileSkillBarMuted
                                : styles.profileSkillBarGreen
                          }`}
                          style={{ width: `${item.value ?? 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.profileCardMain}>
                <div className={styles.profileCardHead}>
                  <h2>Badges Earned</h2>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => setActiveTab("Badges")}
                  >
                    See all 9
                  </button>
                </div>

                <div className={styles.profileBadgesGrid}>
                  {allProfileBadges.slice(0, 8).map((badge) => (
                    <div
                      key={badge.label}
                      className={`${styles.profileBadgeCard} ${
                        badge.active ? styles.profileBadgeCardActive : styles.profileBadgeCardLocked
                      }`}
                    >
                      <span className={styles.profileBadgeIcon}>{badge.icon}</span>
                      <strong>{badge.label}</strong>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <aside className={`${styles.profileSideColumn} ${styles.profileOverviewSideColumn}`}>
              <article className={styles.profileTrackCard}>
                <h2>Current Track</h2>
                <div className={styles.profileTrackTop}>
                  <div
                    className={styles.profileTrackRing}
                    style={{ ["--progress" as string]: 50 } as React.CSSProperties}
                  >
                    <div className={styles.profileTrackRingInner}>
                      <strong>50%</strong>
                    </div>
                  </div>

                  <div>
                    <h3>Frontend Development</h3>
                    <p>3 courses · Week 9 of 12</p>
                  </div>
                </div>

                <div className={styles.profileTrackCertificate}>
                  <div className={styles.profileTrackIllustration}>{allProfileBadges[8].icon}</div>
                  <h3>Track Certificate</h3>
                  <p>Complete all 3 courses to earn your Frontend Development certificate.</p>
                  <div className={styles.profileTrackCertificateBar}>
                    <span />
                  </div>
                  <strong>50% complete · Est. May 30</strong>
                </div>
              </article>

              <article className={styles.profileTrackCard}>
                <div className={styles.profileCardHead}>
                  <h2>Cohort 2024-Q1</h2>
                  <button type="button" className={styles.linkButton}>
                    View all
                  </button>
                </div>

                <div className={styles.profileCohortPeople}>
                  {cohortPeople.map((person, index) => (
                    <span
                      key={person}
                      className={`${styles.profileCohortBubble} ${
                        styles[`profileCohortBubble${index}`] ?? ""
                      }`}
                    >
                      {person}
                    </span>
                  ))}
                </div>

                <div className={styles.profileCohortStats}>
                  {cohortStats.map(([label, value]) => (
                    <div className={styles.profileCohortRow} key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </section>
        ) : null}

        {activeTab === "Activity" ? (
          <section className={styles.profileContentGrid}>
            <div className={styles.profileMainColumn}>
              <article className={styles.profileCardMain}>
                <div className={styles.profileCardHead}>
                  <h2>Recent Activity</h2>
                  <span className={styles.profileBadgeSummary}>Last 30 days</span>
                </div>

                <div className={styles.profileActivityList}>
                  {recentActivity.map(([title, detail, date, icon, tone], index) => (
                    <div className={styles.profileActivityItem} key={`${title}-${date}`}>
                      <div className={styles.profileActivityRail}>
                        <span
                          className={`${styles.profileActivityIcon} ${
                            tone === "gold"
                              ? styles.profileActivityIconGold
                              : tone === "blue"
                                ? styles.profileActivityIconBlue
                                : styles.profileActivityIconGreen
                          }`}
                        >
                          {icon}
                        </span>
                        {index < recentActivity.length - 1 ? (
                          <span className={styles.profileActivityLine} />
                        ) : null}
                      </div>

                      <div className={styles.profileActivityBody}>
                        <strong>{title}</strong>
                        <p>{detail}</p>
                      </div>

                      <span className={styles.profileActivityDate}>{date}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <aside className={styles.profileSideColumn}>
              <article className={styles.profileTrackCard}>
                <h2>Discussion Contributions</h2>

                <div className={styles.profileContributionList}>
                  {discussionContributions.map(([label, value]) => (
                    <div className={styles.profileContributionRow} key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </section>
        ) : null}

        {activeTab === "Badges" ? (
          <section className={styles.profileBadgesPage}>
            <article className={styles.profileCardMain}>
              <div className={styles.profileCardHead}>
                <h2>All Badges</h2>
                <span className={styles.profileBadgeSummary}>4 earned · 5 locked</span>
              </div>

              <div className={styles.profileAllBadgesGrid}>
                {allProfileBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className={`${styles.profileBadgeCardLarge} ${
                      badge.active ? styles.profileBadgeCardActive : styles.profileBadgeCardLocked
                    }`}
                  >
                    <span className={styles.profileBadgeIconLarge}>{badge.icon}</span>
                    <strong>{badge.label}</strong>
                    <span
                      className={
                        badge.active ? styles.profileBadgeMetaEarned : styles.profileBadgeMetaLocked
                      }
                    >
                      {badge.meta}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        ) : null}

        {activeTab === "Settings" ? (
          <section className={styles.profileContentGrid}>
            <div className={styles.profileMainColumn}>
              <article className={styles.profileCardMain}>
                <div className={styles.profileCardHead}>
                  <h2>Notifications</h2>
                </div>

                <div className={styles.profileSettingsList}>
                  {notificationSettings.map(([title, detail, enabled]) => (
                    <div className={styles.profileSettingRow} key={title}>
                      <div className={styles.profileSettingCopy}>
                        <strong>{title}</strong>
                        <p>{detail}</p>
                      </div>
                      {(() => {
                        const isEnabled = notificationValues[title] ?? enabled;

                        return (
                      <button
                        type="button"
                        className={`${styles.profileToggle} ${
                          isEnabled ? styles.profileToggleOn : ""
                        }`}
                        aria-pressed={isEnabled}
                        onClick={() => toggleNotification(title)}
                      >
                        <span />
                      </button>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.profileCardMain}>
                <div className={styles.profileCardHead}>
                  <h2>Preferences</h2>
                </div>

                <div className={styles.profileSettingsList}>
                  {preferenceSettings.map(([title, detail, type]) => (
                    <div className={styles.profileSettingRow} key={title}>
                      <div className={styles.profileSettingCopy}>
                        <strong>{title}</strong>
                        <p>{detail}</p>
                      </div>
                      {type === "toggle" || type === "toggleOff" ? (
                        <button
                          type="button"
                          className={`${styles.profileToggle} ${
                            preferenceToggleValues[title] ? styles.profileToggleOn : ""
                          }`}
                          aria-pressed={preferenceToggleValues[title]}
                          onClick={() => togglePreference(title)}
                        >
                          <span />
                        </button>
                      ) : (
                        <button type="button" className={styles.profileArrowButton}>
                          &#8250;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <aside className={styles.profileSideColumn}>
              <article className={styles.profileTrackCard}>
                <h2>Account</h2>

                <div className={styles.profileAccountList}>
                  {accountSettings.map((item) => (
                    <button type="button" className={styles.profileAccountButton} key={item}>
                      <span>{item}</span>
                      <span className={styles.profileAccountChevron}>&#8250;</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.profileSignOutButton}
                  onClick={handleSignOut}
                >
                  &#10230; Sign Out
                </button>
              </article>
            </aside>
          </section>
        ) : null}
      </main>
    </AppShell>
  );
}
