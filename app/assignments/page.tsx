"use client";

import { useState } from "react";
import AppShell from "../components/AppShell";
import styles from "../page.module.css";

type AssignmentStatus = "Pending" | "Submitted" | "Graded" | "Overdue";

type AssignmentItem = {
  track: string;
  title: string;
  description: string;
  status: AssignmentStatus;
  dueText: string;
  dueIcon: string;
  metaOne: string;
  metaOneIcon: string;
  metaTwo: string;
  metaTwoIcon: string;
  action: string;
  icon: string;
  tone: "red" | "gold" | "green" | "blue";
};

const tabs = [
  { key: "All", count: 6 },
  { key: "Pending", count: 3 },
  { key: "Submitted", count: 1 },
  { key: "Graded", count: 2 }
] as const;

const assignments: AssignmentItem[] = [
  {
    track: "CSS Fundamentals",
    title: "CSS Grid Layout — Build a Responsive Portfolio Grid",
    description:
      "Create a 3-column responsive portfolio grid using CSS Grid with named areas, spanning elements, and a mobile-first media query breakpoint.",
    status: "Overdue",
    dueText: "Was due Mar 20",
    dueIcon: "◔",
    metaOne: "Code submission",
    metaOneIcon: "</>",
    metaTwo: "Worth 20 pts",
    metaTwoIcon: "✓",
    action: "Start Now",
    icon: "</>",
    tone: "red"
  },
  {
    track: "JavaScript Basics",
    title: "Functions & Scope — Mid-Module Quiz",
    description:
      "15-question quiz covering function declarations, expressions, arrow functions, hoisting, and lexical scope concepts from Module 2.",
    status: "Pending",
    dueText: "Due in 3 days",
    dueIcon: "◔",
    metaOne: "15 questions · ~20 min",
    metaOneIcon: "?",
    metaTwo: "Worth 15 pts",
    metaTwoIcon: "✓",
    action: "Take Quiz",
    icon: "?",
    tone: "gold"
  },
  {
    track: "CSS Fundamentals",
    title: "Flexbox Layout Project — Navigation & Card System",
    description:
      "Build a complete navigation bar and a responsive card system entirely with Flexbox, matching the provided design mockup at all 3 breakpoints.",
    status: "Pending",
    dueText: "Due in 8 days",
    dueIcon: "◔",
    metaOne: "Project + file upload",
    metaOneIcon: "📂",
    metaTwo: "Worth 30 pts",
    metaTwoIcon: "✓",
    action: "Start Project",
    icon: "📂",
    tone: "green"
  },
  {
    track: "CSS Fundamentals",
    title: "CSS Selectors & Specificity — Practice Exercise",
    description:
      "Predict and explain the output of a series of CSS specificity conflicts. Submitted and awaiting instructor review.",
    status: "Submitted",
    dueText: "Submitted Mar 18",
    dueIcon: "✓",
    metaOne: "Awaiting review",
    metaOneIcon: "◌",
    metaTwo: "Worth 15 pts",
    metaTwoIcon: "✓",
    action: "View Submission",
    icon: "</>",
    tone: "blue"
  },
  {
    track: "CSS Fundamentals",
    title: "Box Model & Spacing — Hands-On Exercise",
    description:
      "Recreate 4 layout scenarios using only margin, padding, and border-box sizing. Includes inspector screenshot submission.",
    status: "Graded",
    dueText: "Graded Mar 12",
    dueIcon: "✓",
    metaOne: "90% · Excellent",
    metaOneIcon: "★",
    metaTwo: "Worth 20 pts",
    metaTwoIcon: "✓",
    action: "View Feedback",
    icon: "</>",
    tone: "green"
  },
  {
    track: "HTML Foundations",
    title: "HTML Document Structure — Final Quiz",
    description:
      "Comprehensive 15-question quiz on semantic HTML, document structure, accessibility attributes, and form elements.",
    status: "Graded",
    dueText: "Graded Feb 28",
    dueIcon: "✓",
    metaOne: "93% · Excellent",
    metaOneIcon: "★",
    metaTwo: "Worth 15 pts",
    metaTwoIcon: "✓",
    action: "View Answer",
    icon: "?",
    tone: "blue"
  }
];

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["key"]>("All");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isClosingDetail, setIsClosingDetail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  function openDetail(title: string) {
    setSelectedAssignment(title);
    setIsClosingDetail(false);
    setIsDetailOpen(true);
  }

  function closeDetail() {
    setIsClosingDetail(true);
    window.setTimeout(() => {
      setIsDetailOpen(false);
      setIsClosingDetail(false);
      setSelectedAssignment(null);
    }, 220);
  }

  function submitAssignment() {
    closeDetail();
    window.setTimeout(() => {
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 2600);
    }, 240);
  }

  const visibleAssignments =
    activeTab === "All"
      ? assignments
      : assignments.filter((item) =>
          activeTab === "Pending"
            ? item.status === "Pending" || item.status === "Overdue"
            : item.status === activeTab
        );

  return (
    <AppShell title="Assignments">
      <main className={styles.assignmentsPage}>
        <section className={styles.assignmentsHero}>
          <h1>Assignments</h1>
          <p>3 pending · 1 submitted · 2 graded</p>
        </section>

        <section className={styles.assignmentsTabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`${styles.assignmentTab} ${
                activeTab === tab.key ? styles.assignmentTabActive : ""
              }`}
            >
              {tab.key} <span>{tab.count}</span>
            </button>
          ))}
        </section>

        <section className={styles.assignmentList}>
          {visibleAssignments.map((item) => (
            <article
              className={`${styles.assignmentCard} ${styles[`assignment${item.tone}`]} ${
                item.title.includes("CSS Grid Layout") ||
                item.title.includes("Functions & Scope") ||
                item.title.includes("Flexbox Layout Project") ||
                item.title.includes("CSS Selectors & Specificity") ||
                item.title.includes("Box Model & Spacing") ||
                item.title.includes("HTML Document Structure")
                  ? styles.assignmentCardInteractive
                  : ""
              }`}
              key={item.title}
              onClick={
                item.title.includes("CSS Grid Layout") ||
                item.title.includes("Functions & Scope") ||
                item.title.includes("Flexbox Layout Project") ||
                item.title.includes("CSS Selectors & Specificity") ||
                item.title.includes("Box Model & Spacing") ||
                item.title.includes("HTML Document Structure")
                  ? () => openDetail(item.title)
                  : undefined
              }
            >
              <div className={`${styles.assignmentIcon} ${styles[`assignmentIcon${item.tone}`]}`}>{item.icon}</div>

              <div className={styles.assignmentBody}>
                <p className={styles.assignmentTrack}>{item.track}</p>
                <h2>{item.title}</h2>
                <p className={styles.assignmentDescription}>{item.description}</p>

                <div className={styles.assignmentMetaRow}>
                  <span className={`${styles.assignmentMetaPill} ${styles[`assignmentPill${item.tone}`]}`}>
                    <span className={styles.assignmentMetaIcon}>{item.dueIcon}</span>
                    {item.dueText}
                  </span>
                  <span
                    className={`${styles.assignmentMetaPill} ${
                      item.status === "Graded" ? styles.assignmentMetaSuccess : ""
                    }`}
                  >
                    <span className={styles.assignmentMetaIcon}>{item.metaOneIcon}</span>
                    {item.metaOne}
                  </span>
                  <span
                    className={`${styles.assignmentMetaPill} ${
                      item.status === "Graded" && item.metaTwo.includes("Excellent")
                        ? styles.assignmentMetaSuccess
                        : ""
                    }`}
                  >
                    <span className={styles.assignmentMetaIcon}>{item.metaTwoIcon}</span>
                    {item.metaTwo}
                  </span>
                </div>
              </div>

              <div
                className={`${styles.assignmentSide} ${
                  item.status === "Pending"
                    ? styles.assignmentSidePending
                    : item.status === "Overdue"
                      ? styles.assignmentSideOverdue
                      : ""
                }`}
              >
                <span className={`${styles.assignmentStatus} ${styles[`status${item.status.replace(/\s+/g, "")}`]}`}>
                  {item.status}
                </span>
                <button
                  className={`${styles.assignmentAction} ${
                    item.action.startsWith("View") ? styles.assignmentActionGhost : ""
                  }`}
                  onClick={
                    item.title.includes("CSS Grid Layout") ||
                    item.title.includes("Functions & Scope") ||
                    item.title.includes("Flexbox Layout Project") ||
                    item.title.includes("CSS Selectors & Specificity") ||
                    item.title.includes("Box Model & Spacing") ||
                    item.title.includes("HTML Document Structure")
                      ? (event) => {
                          event.stopPropagation();
                          openDetail(item.title);
                        }
                      : undefined
                  }
                >
                  {item.action}
                </button>
              </div>
            </article>
          ))}
        </section>

        {isDetailOpen ? (
          <>
            <button
              type="button"
              className={styles.assignmentDrawerBackdrop}
              onClick={closeDetail}
              aria-label="Close assignment details"
            />
            <aside
              className={`${styles.assignmentDrawer} ${
                isClosingDetail ? styles.assignmentDrawerClosing : styles.assignmentDrawerOpen
              } ${
                selectedAssignment?.includes("Functions & Scope")
                  ? styles.assignmentDrawerNarrow
                  : selectedAssignment?.includes("Flexbox Layout Project")
                    ? styles.assignmentDrawerProject
                    : selectedAssignment?.includes("CSS Selectors & Specificity")
                      ? styles.assignmentDrawerSubmission
                      : selectedAssignment?.includes("Box Model & Spacing")
                        ? styles.assignmentDrawerFeedback
                        : selectedAssignment?.includes("HTML Document Structure")
                          ? styles.assignmentDrawerQuizResult
                  : styles.assignmentDrawerWide
              }`}
            >
              <div className={styles.assignmentDrawerHeader}>
                <button
                  type="button"
                  className={styles.assignmentDrawerClose}
                  onClick={closeDetail}
                >
                  ×
                </button>
                <h2>{selectedAssignment}</h2>
              </div>

              {selectedAssignment?.includes("Functions & Scope") ? (
                <div className={styles.assignmentDrawerBody}>
                  <section className={styles.assignmentDrawerSection}>
                    <h3>Quiz Details</h3>
                    <div className={styles.assignmentDetailRows}>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◷</span>
                        <span>Due Date</span>
                        <strong className={styles.assignmentDetailWarn}>Mar 25, 2025 · 3 days left</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>?</span>
                        <span>Questions</span>
                        <strong>15 multiple choice</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◔</span>
                        <span>Time Limit</span>
                        <strong>20 minutes</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>✓</span>
                        <span>Points</span>
                        <strong>15 pts (1 pt per question)</strong>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Topics Covered</h3>
                    <div className={styles.assignmentChecklist}>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Function declarations vs expressions</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Arrow function syntax and behaviour</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Hoisting and temporal dead zone</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Lexical scope and closures</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>First-class functions and callbacks</span>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Rules</h3>
                    <div className={styles.assignmentDescriptionBox}>
                      Once you begin the quiz, the 20-minute timer starts and cannot be paused.
                      Answers are auto-submitted when time runs out. You can flag questions to revisit
                      before submitting. Only one attempt is allowed.
                    </div>
                  </section>
                </div>
              ) : selectedAssignment?.includes("Flexbox Layout Project") ? (
                <div className={styles.assignmentDrawerBody}>
                  <section className={styles.assignmentDrawerSection}>
                    <h3>Project Details</h3>
                    <div className={styles.assignmentDetailRows}>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◷</span>
                        <span>Due Date</span>
                        <strong className={styles.assignmentDetailSuccess}>Mar 30, 2025 · 8 days left</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>✓</span>
                        <span>Points</span>
                        <strong>30 pts (largest assignment)</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>▤</span>
                        <span>Submission</span>
                        <strong>ZIP with HTML + CSS files</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◉</span>
                        <span>Graded by</span>
                        <strong>Sarah Bright</strong>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Deliverables Checklist</h3>
                    <div className={styles.assignmentChecklist}>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={`${styles.assignmentChecklistBox} ${styles.assignmentChecklistDone}`}>✓</span>
                        <span>Responsive navbar with Flexbox (desktop + mobile)</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>3-card layout using Flexbox — equal height, equal width</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Breakpoint at 768px switching to stacked column</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Hover states on nav links and card CTAs</span>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Upload Files</h3>
                    <div className={styles.assignmentUploadBox}>
                      <span className={styles.assignmentUploadIcon}>
                        <span>↑</span>
                        <span>—</span>
                      </span>
                      <strong>Drop your ZIP file here</strong>
                      <span>Max 10 MB · HTML + CSS required</span>
                    </div>
                  </section>
                </div>
              ) : selectedAssignment?.includes("CSS Selectors & Specificity") ? (
                <div className={styles.assignmentDrawerBody}>
                  <section className={styles.assignmentDrawerSection}>
                    <h3>Submission Status</h3>
                    <div className={styles.assignmentDetailRows}>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◷</span>
                        <span>Submitted</span>
                        <strong>March 18, 2025 at 11:42 AM</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◉</span>
                        <span>Reviewer</span>
                        <strong>Sarah Bright · not yet reviewed</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>✓</span>
                        <span>Points</span>
                        <strong>15 pts · awaiting grade</strong>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Your Submitted File</h3>
                    <div className={styles.assignmentFileCard}>
                      <span className={styles.assignmentFileBadge}>ZIP</span>
                      <div className={styles.assignmentFileMeta}>
                        <strong>selectors-exercise.zip</strong>
                        <span>4.2 KB · Submitted Mar 18</span>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>What Happens Next</h3>
                    <div className={styles.assignmentDescriptionBox}>
                      Your instructor Sarah Bright will typically review submissions within
                      2–3 business days. You&apos;ll receive a notification when feedback is
                      available. You can resubmit before the review if needed.
                    </div>
                  </section>
                </div>
              ) : selectedAssignment?.includes("Box Model & Spacing") ? (
                <div className={styles.assignmentDrawerBody}>
                  <section className={styles.assignmentDrawerSection}>
                    <div className={styles.assignmentGradeBanner}>
                      <div className={styles.assignmentGradeScore}>
                        <strong>18</strong>
                        <span>/20</span>
                      </div>
                      <div className={styles.assignmentGradeMeta}>
                        <strong>Excellent Work! 🎉</strong>
                        <span>Graded by Sarah Bright · Mar 12, 2025</span>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Instructor Feedback</h3>
                    <div className={styles.assignmentFeedbackCard}>
                      <div className={styles.assignmentFeedbackHead}>
                        <span className={styles.assignmentFeedbackAvatar}>SB</span>
                        <div className={styles.assignmentFeedbackMeta}>
                          <strong>Sarah Bright</strong>
                          <span>Senior UI Engineer</span>
                        </div>
                      </div>
                      <p>
                        Really solid work on scenarios 1–3, Adaobi! Your use of box-sizing:
                        border-box across the board was exactly right and showed strong
                        understanding of the model. The only point deducted was on scenario 4
                        — the nested element&apos;s margin collapsed into the parent as
                        expected, but your comment suggested that wasn&apos;t intentional. Next
                        time, add overflow: hidden or a border to the parent to see how margin
                        collapse works in context.
                      </p>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Breakdown</h3>
                    <div className={styles.assignmentBreakdownList}>
                      <div className={styles.assignmentBreakdownRow}>
                        <span>Scenario 1 — Basic padding/margin</span>
                        <strong className={styles.assignmentBreakdownGood}>5/5</strong>
                      </div>
                      <div className={styles.assignmentBreakdownRow}>
                        <span>Scenario 2 — border-box sizing</span>
                        <strong className={styles.assignmentBreakdownGood}>5/5</strong>
                      </div>
                      <div className={styles.assignmentBreakdownRow}>
                        <span>Scenario 3 — Inline vs block spacing</span>
                        <strong className={styles.assignmentBreakdownGood}>5/5</strong>
                      </div>
                      <div className={styles.assignmentBreakdownRow}>
                        <span>Scenario 4 — Margin collapse</span>
                        <strong className={styles.assignmentBreakdownWarn}>3/5</strong>
                      </div>
                    </div>
                  </section>
                </div>
              ) : selectedAssignment?.includes("HTML Document Structure") ? (
                <div className={styles.assignmentDrawerBody}>
                  <section className={styles.assignmentDrawerSection}>
                    <div className={styles.assignmentGradeBanner}>
                      <div className={styles.assignmentGradeScore}>
                        <strong>14</strong>
                        <span>/15</span>
                      </div>
                      <div className={styles.assignmentGradeMeta}>
                        <strong>Outstanding! 🏆</strong>
                        <span>Auto-graded · Feb 28, 2025</span>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Result Summary</h3>
                    <div className={styles.assignmentDetailRows}>
                      <div className={`${styles.assignmentDetailRow} ${styles.assignmentDetailRowSimple}`}>
                        <span>Score</span>
                        <strong className={styles.assignmentDetailSuccess}>93% · 14 of 15 correct</strong>
                      </div>
                      <div className={`${styles.assignmentDetailRow} ${styles.assignmentDetailRowSimple}`}>
                        <span>Time taken</span>
                        <strong>14m 32s of 20 minutes</strong>
                      </div>
                      <div className={`${styles.assignmentDetailRow} ${styles.assignmentDetailRowSimple}`}>
                        <span>Class average</span>
                        <strong>78% (you're in the top 10%)</strong>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Missed Question</h3>
                    <div className={styles.assignmentDescriptionBox}>
                      <p className={styles.assignmentMissedQuestion}>
                        <strong>Q11:</strong> Which element is the correct container for page
                        navigation landmarks?
                      </p>
                      <p className={styles.assignmentMissedAnswer}>
                        Your answer: <span className={styles.assignmentMissedWrong}>&lt;div role="nav"&gt;</span>
                      </p>
                      <p className={styles.assignmentMissedAnswer}>
                        Correct answer: <span className={styles.assignmentMissedRight}>&lt;nav&gt;</span>
                      </p>
                      <p className={styles.assignmentMissedNote}>
                        Using semantic HTML elements is preferred over ARIA roles when a native
                        element already conveys the correct role.
                      </p>
                    </div>
                  </section>
                </div>
              ) : (
                <div className={styles.assignmentDrawerBody}>
                  <section className={styles.assignmentDrawerSection}>
                    <h3>Assignment Details</h3>
                    <div className={styles.assignmentDetailRows}>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◷</span>
                        <span>Due Date</span>
                        <strong className={styles.assignmentDetailAlert}>Was due Mar 20 · Overdue</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>▤</span>
                        <span>Course</span>
                        <strong>CSS Fundamentals</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>✓</span>
                        <span>Points</span>
                        <strong>20 pts</strong>
                      </div>
                      <div className={styles.assignmentDetailRow}>
                        <span className={styles.assignmentDetailIcon}>◉</span>
                        <span>Instructor</span>
                        <strong>Sarah Bright</strong>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Description</h3>
                    <div className={styles.assignmentDescriptionBox}>
                      Create a 3-column responsive portfolio grid using CSS Grid. Your solution must
                      use named grid areas, at least one element that spans multiple columns, and a
                      mobile-first media query that switches to a single-column layout below 600px.
                      Match the provided wireframe exactly.
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Checklist</h3>
                    <div className={styles.assignmentChecklist}>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>3-column CSS Grid using grid-template-areas</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>At least 1 element spanning 2+ columns</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Mobile-first responsive breakpoint at 600px</span>
                      </div>
                      <div className={styles.assignmentChecklistItem}>
                        <span className={styles.assignmentChecklistBox} />
                        <span>Valid, well-commented HTML and CSS files</span>
                      </div>
                    </div>
                  </section>

                  <section className={styles.assignmentDrawerSection}>
                    <h3>Submit Your Work</h3>
                    <div className={styles.assignmentUploadBox}>
                      <span className={styles.assignmentUploadIcon}>
                        <span>↑</span>
                        <span>—</span>
                      </span>
                      <strong>Drop your files here or click to browse</strong>
                      <span>Accepts .zip, .html, .css · Max 10 MB</span>
                      <em className={styles.assignmentUploadLate}>Late submission accepted</em>
                    </div>
                  </section>
                </div>
              )}

              <div className={styles.assignmentDrawerFooter}>
                {selectedAssignment?.includes("Box Model & Spacing") ||
                selectedAssignment?.includes("HTML Document Structure") ? null : (
                  <button
                    type="button"
                    className={styles.assignmentDrawerSecondary}
                    onClick={closeDetail}
                  >
                    {selectedAssignment?.includes("Functions & Scope")
                      ? "Not Yet"
                      : selectedAssignment?.includes("Flexbox Layout Project")
                        ? "Save Draft"
                        : selectedAssignment?.includes("CSS Selectors & Specificity")
                          ? "Resubmit"
                          : "Cancel"}
                  </button>
                )}
                <button
                  type="button"
                  className={`${styles.assignmentDrawerPrimary} ${
                    selectedAssignment?.includes("Flexbox Layout Project")
                      ? styles.assignmentDrawerPrimaryProject
                      : ""
                  } ${
                    selectedAssignment?.includes("Box Model & Spacing")
                    || selectedAssignment?.includes("HTML Document Structure")
                      ? styles.assignmentDrawerPrimaryFull
                      : ""
                  }`}
                  onClick={
                    selectedAssignment?.includes("Box Model & Spacing")
                    || selectedAssignment?.includes("HTML Document Structure")
                      ? closeDetail
                      : submitAssignment
                  }
                >
                  {selectedAssignment?.includes("Functions & Scope")
                    ? "Begin Quiz →"
                    : selectedAssignment?.includes("Flexbox Layout Project")
                      ? "Submit Project"
                      : selectedAssignment?.includes("CSS Selectors & Specificity")
                        ? "Done"
                        : selectedAssignment?.includes("Box Model & Spacing")
                          ? "Got It, Thanks!"
                          : selectedAssignment?.includes("HTML Document Structure")
                            ? "Close"
                          : "Submit Assignment"}
                </button>
              </div>
            </aside>
          </>
        ) : null}

        {showToast ? (
          <div className={styles.assignmentToast}>Submitted successfully!</div>
        ) : null}
      </main>
    </AppShell>
  );
}
