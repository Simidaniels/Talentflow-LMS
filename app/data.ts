export type NavItem = {
  label: string;
  icon: string;
  badge?: number;
  href: string;
};

export type ContinueCourse = {
  id: string;
  track: string;
  title: string;
  instructor: string;
  lesson: string;
  progress: number;
  lessonsLeft: number;
  bannerTone: "blue" | "dark";
  illustration: string;
};

export type Deadline = {
  title: string;
  subtitle: string;
  dueIn: string;
  tone: "danger" | "warning" | "success";
};

export type LearningStatus = "In Progress" | "Completed" | "Not Started";

export type LearningItem = {
  title: string;
  subtitle: string;
  status: LearningStatus;
  action: string;
  progress: number;
  tone: "blue" | "green" | "dark";
  illustration: string;
};

export type Announcement = {
  author: string;
  tag: string;
  message: string;
  time: string;
  color: "purple" | "green" | "gold";
};

export const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: "◫", href: "/dashboard" },
      { label: "My Learning", icon: "📘", href: "/my-learning" },
      { label: "Assignments", icon: "🗒", badge: 3, href: "/assignments" },
      { label: "Progress", icon: "📈", href: "/progress" }
    ]
  },
  {
    label: "Activity",
    items: [
      { label: "Discussion Board", icon: "💬", href: "/discussion-board" },
      { label: "Announcements", icon: "🔔", badge: 2, href: "/announcements" },
      { label: "Resources", icon: "📁", href: "/resources" }
    ]
  },
  {
    label: "Account",
    items: [
      { label: "Profile", icon: "👤", href: "/profile" },
      { label: "Settings", icon: "⚙", href: "/settings" }
    ]
  }
];

export const learnerProfile = {
  initials: "AK",
  name: "Akangbe Patience",
  id: "TF-2024-0042",
  cohort: "Frontend Development"
};

export const heroStats = {
  enrolled: 4,
  overall: 50,
  dueSoon: 2,
  completed: 1
};

export const continueCourses: ContinueCourse[] = [
  {
    id: "html-css",
    track: "Frontend Dev",
    title: "Introduction to HTML & CSS Fundamentals",
    instructor: "Bejide Mofiyinfoluwa",
    lesson: "Lesson 6 of 12",
    progress: 67,
    lessonsLeft: 6,
    bannerTone: "blue",
    illustration: "UI"
  },
  {
    id: "javascript",
    track: "Frontend Dev",
    title: "JavaScript Essentials for the Modern Web",
    instructor: "Bejide Mofiyinfoluwa",
    lesson: "Lesson 2 of 16",
    progress: 18,
    lessonsLeft: 14,
    bannerTone: "dark",
    illustration: "JS"
  }
];

export const deadlines: Deadline[] = [
  {
    title: "CSS Layouts Assignment",
    subtitle: "HTML & CSS Fundamentals",
    dueIn: "Tomorrow",
    tone: "danger"
  },
  {
    title: "JS Functions Quiz",
    subtitle: "JavaScript Essentials",
    dueIn: "3 days",
    tone: "warning"
  },
  {
    title: "Git Workflow Report",
    subtitle: "Git & Version Control",
    dueIn: "8 days",
    tone: "success"
  }
];

export const learningItems: LearningItem[] = [
  {
    title: "Introduction to HTML & CSS Fundamentals",
    subtitle: "Bejide Mofiyinfoluwa",
    status: "In Progress",
    action: "Resume",
    progress: 67,
    tone: "blue",
    illustration: "UI"
  },
  {
    title: "Git & Version Control for Developers",
    subtitle: "Bejide Mofiyinfoluwa",
    status: "Completed",
    action: "Review",
    progress: 100,
    tone: "green",
    illustration: "GT"
  },
  {
    title: "JavaScript Essentials for the Modern Web",
    subtitle: "Bejide Mofiyinfoluwa",
    status: "In Progress",
    action: "Continue",
    progress: 18,
    tone: "dark",
    illustration: "JS"
  },
  {
    title: "Responsive Web Design with Flexbox & Grid",
    subtitle: "Bejide Mofiyinfoluwa",
    status: "Not Started",
    action: "Start",
    progress: 0,
    tone: "blue",
    illustration: "WD"
  }
];

export const announcements: Announcement[] = [
  {
    author: "Instructor Note",
    tag: "CSS Fundamentals",
    message: "New lesson on CSS Grid has been published. Check it out in Module 3.",
    time: "2 hours ago",
    color: "purple"
  },
  {
    author: "Admin",
    tag: "Platform Update",
    message: "Submission deadline for Sprint 1 has been extended by 48 hours.",
    time: "Yesterday",
    color: "green"
  },
  {
    author: "TalentFlow",
    tag: "Achievement",
    message: "You completed Git & Version Control. Your certificate is ready to download.",
    time: "2 days ago",
    color: "gold"
  }
];

export const streakDays = [
  { label: "Mon", state: "done" },
  { label: "Tue", state: "done" },
  { label: "Wed", state: "done" },
  { label: "Thu", state: "done" },
  { label: "Today", state: "today" },
  { label: "Sun", state: "upcoming" },
  { label: "Mon", state: "upcoming" }
] as const;
