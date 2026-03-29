"use client";

import { useState } from "react";
import AppShell from "../components/AppShell";
import styles from "../page.module.css";

type Channel = {
  label: string;
  count: number;
};

const courseChannels: Channel[] = [
  { label: "css-fundamentals", count: 5 },
  { label: "html5-essentials", count: 0 },
  { label: "js-fundamentals", count: 0 }
];

const communityChannels: Channel[] = [
  { label: "general", count: 2 },
  { label: "intros", count: 0 },
  { label: "resources", count: 0 }
];

const cohortChannels: Channel[] = [{ label: "cohort-2024-q1", count: 0 }];

const threads = [
  {
    initials: "SB",
    name: "Sarah Bright",
    role: "Instructor",
    time: "2h ago",
    title: "How does specificity interact with the cascade?",
    excerpt: "Great question from today's Q&A — let's break down how specificity works.",
    tag: "Q&A",
    replies: 8,
    likes: 14,
    tone: "blue",
    active: true
  },
  {
    initials: "AO",
    name: "Adaobi Okonkwo",
    role: "Intern",
    time: "5h ago",
    title: "Flexbox vs Grid — when to use which?",
    excerpt: "I keep second-guessing myself when picking between flex and grid for layouts...",
    tag: "Q&A",
    replies: 6,
    likes: 9,
    tone: "sky",
    active: false
  },
  {
    initials: "KE",
    name: "Kofi Enyinna",
    role: "Intern",
    time: "Yesterday",
    title: "CSS Grid cheatsheet — super useful resource",
    excerpt: "Found this interactive grid generator that really helped me visualize columns...",
    tag: "Resource",
    replies: 3,
    likes: 21,
    tone: "green",
    active: false
  },
  {
    initials: "AM",
    name: "Amara Mensah",
    role: "Intern",
    time: "2d ago",
    title: "Why does z-index not work on static elements?",
    excerpt: "I spent an hour debugging and finally figured it out — sharing in case it helps.",
    tag: "Q&A",
    replies: 5,
    likes: 7,
    tone: "gold",
    active: false
  },
  {
    initials: "SB",
    name: "Sarah Bright",
    role: "Instructor",
    time: "3d ago",
    title: "Welcome to #css-fundamentals",
    excerpt: "This is your space to ask questions, share findings, and help each other learn.",
    tag: "Pinned",
    replies: 0,
    likes: 12,
    tone: "blue",
    active: false
  }
] as const;

function ChannelButton({
  channel,
  active,
  onClick
}: {
  channel: Channel;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.discussionChannelItem} ${active ? styles.discussionChannelItemActive : ""}`}
    >
      <span className={styles.discussionChannelHash}>#</span>
      <span>{channel.label}</span>
      {channel.count ? <span className={styles.discussionChannelBadge}>{channel.count}</span> : null}
    </button>
  );
}

export default function DiscussionBoardPage() {
  const [activeChannel, setActiveChannel] = useState("css-fundamentals");

  return (
    <AppShell title="Discussion Board">
      <main className={styles.discussionBoardPage}>
        <section className={styles.discussionBoardLayout}>
          <aside className={styles.discussionSidebar}>
            <button className={styles.discussionPrimaryButton}>+ New Thread</button>

            <div className={styles.discussionSection}>
              <p className={styles.discussionSectionLabel}>Courses</p>
              <div className={styles.discussionChannelList}>
                {courseChannels.map((channel) => (
                  <ChannelButton
                    key={channel.label}
                    channel={channel}
                    active={activeChannel === channel.label}
                    onClick={() => setActiveChannel(channel.label)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.discussionSection}>
              <p className={styles.discussionSectionLabel}>Community</p>
              <div className={styles.discussionChannelList}>
                {communityChannels.map((channel) => (
                  <ChannelButton
                    key={channel.label}
                    channel={channel}
                    active={activeChannel === channel.label}
                    onClick={() => setActiveChannel(channel.label)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.discussionSection}>
              <p className={styles.discussionSectionLabel}>Cohort</p>
              <div className={styles.discussionChannelList}>
                {cohortChannels.map((channel) => (
                  <ChannelButton
                    key={channel.label}
                    channel={channel}
                    active={activeChannel === channel.label}
                    onClick={() => setActiveChannel(channel.label)}
                  />
                ))}
              </div>
            </div>
          </aside>

          <section className={styles.discussionThreadColumn}>
            <div className={styles.discussionThreadHeader}>
              <div className={styles.discussionThreadTitleRow}>
                <h1>#{activeChannel}</h1>
                <span className={styles.discussionThreadCount}>12 threads</span>
              </div>

              <label className={styles.discussionSearch}>
                <span className={styles.discussionSearchIcon}>⌕</span>
                <input type="text" placeholder="Search threads..." aria-label="Search threads" />
              </label>
            </div>

            <div className={styles.discussionThreadList}>
              {threads.map((thread) => (
                <article
                  className={`${styles.discussionThreadCard} ${
                    thread.active ? styles.discussionThreadCardActive : ""
                  }`}
                  key={thread.title}
                >
                  <div className={styles.discussionThreadCardTop}>
                    <div className={styles.discussionThreadIdentity}>
                      <span
                        className={`${styles.discussionAvatar} ${
                          thread.tone === "green"
                            ? styles.discussionAvatarGreen
                            : thread.tone === "gold"
                              ? styles.discussionAvatarGold
                              : thread.tone === "sky"
                                ? styles.discussionAvatarSky
                                : styles.discussionAvatarBlue
                        }`}
                      >
                        {thread.initials}
                      </span>
                      <div>
                        <div className={styles.discussionThreadNameRow}>
                          <strong>{thread.name}</strong>
                          <span className={styles.discussionRoleBadge}>{thread.role}</span>
                        </div>
                      </div>
                    </div>
                    <span className={styles.discussionThreadTime}>{thread.time}</span>
                  </div>

                  <h2>{thread.title}</h2>
                  <p>{thread.excerpt}</p>

                  <div className={styles.discussionThreadMeta}>
                    <span
                      className={`${styles.discussionTag} ${
                        thread.tag === "Resource"
                          ? styles.discussionTagGreen
                          : thread.tag === "Pinned"
                            ? styles.discussionTagBlue
                            : styles.discussionTagGold
                      }`}
                    >
                      {thread.tag}
                    </span>
                    <div className={styles.discussionThreadStats}>
                      <span>💬 {thread.replies}</span>
                      <span>👍 {thread.likes}</span>
                      <span>●</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.discussionDetailColumn}>
            <div className={styles.discussionDetailHeader}>
              <div className={styles.discussionDetailMeta}>
                <span className={`${styles.discussionTag} ${styles.discussionTagGold}`}>Q&amp;A</span>
                <span className={styles.discussionDetailChannel}>#css-fundamentals</span>
              </div>
              <h2>How does specificity interact with the cascade?</h2>
              <div className={styles.discussionDetailInfo}>
                <span className={styles.discussionAvatar}>SB</span>
                <strong>Sarah Bright</strong>
                <span className={styles.discussionRoleBadge}>Instructor</span>
                <span>Mar 22 at 10:14 AM</span>
                <span>👁 142 views</span>
              </div>
            </div>

            <article className={styles.discussionReplyCard}>
              <div className={styles.discussionReplyHead}>
                <div className={styles.discussionThreadIdentity}>
                  <span className={styles.discussionAvatar}>SB</span>
                  <div>
                    <div className={styles.discussionThreadNameRow}>
                      <strong>Sarah Bright</strong>
                      <span className={styles.discussionRoleBadge}>Instructor</span>
                    </div>
                    <span className={styles.discussionReplyTime}>Mar 22 · 10:14 AM</span>
                  </div>
                </div>
                <span className={styles.discussionBookmark}>🔖</span>
              </div>

              <div className={styles.discussionReplyBody}>
                <p>Great question that came up during today's live session — let's unpack this properly.</p>
                <p>
                  The <strong>cascade</strong> is the algorithm CSS uses to resolve conflicts between
                  declarations. Specificity is just <strong>one</strong> of its inputs. The full priority
                  order is:
                </p>

                <pre className={styles.discussionCodeBlock}>{`/* Priority (highest → lowest) */
1. !important declarations
2. Inline styles (style="...")
3. ID selectors (#id)
4. Class, attribute, pseudo-class
5. Element & pseudo-element
6. Source order (last wins)`}</pre>

                <p>
                  So if two rules have <strong>equal specificity</strong>, source order breaks the tie. But
                  if one has higher specificity, order doesn't matter — the more specific rule wins every time.
                </p>
              </div>

              <div className={styles.discussionReplyActions}>
                <button type="button" className={styles.discussionReactionButton}>👍 14</button>
                <button type="button" className={styles.discussionReactionButton}>💡 8</button>
                <button type="button" className={styles.discussionReplyButton}>Reply</button>
              </div>
            </article>

            <article className={`${styles.discussionReplyCard} ${styles.discussionReplyCardBest}`}>
              <div className={styles.discussionBestAnswer}>Best Answer</div>
              <div className={styles.discussionReplyHead}>
                <div className={styles.discussionThreadIdentity}>
                  <span className={`${styles.discussionAvatar} ${styles.discussionAvatarBlue}`}>SB</span>
                  <div>
                    <div className={styles.discussionThreadNameRow}>
                      <strong>Sarah Bright</strong>
                      <span className={styles.discussionRoleBadge}>Instructor</span>
                    </div>
                    <span className={styles.discussionReplyTime}>Mar 22 · 10:28 AM</span>
                  </div>
                </div>
              </div>

              <div className={styles.discussionReplyBody}>
                <p>
                  Here's a quick mental model: think of specificity as a <strong>3-digit score</strong> —
                  <code>(IDs, Classes, Elements)</code>.
                </p>

                <pre className={styles.discussionCodeBlock}>{`/* Specificity examples */
div              -> (0, 0, 1)
.card            -> (0, 1, 0)
#header          -> (1, 0, 0)
#header .card p  -> (1, 1, 1)`}</pre>

                <p>
                  Compare left to right: the first non-equal digit wins. A single ID <em>always</em> beats any
                  number of classes. That's why <code>!important</code> exists — it's the escape hatch when you
                  truly can't win via specificity.
                </p>
              </div>

              <div className={styles.discussionReplyActions}>
                <button type="button" className={styles.discussionReactionButton}>👍 22</button>
                <button type="button" className={styles.discussionReactionButton}>🔥 6</button>
              </div>
            </article>

            <div className={styles.discussionRepliesDivider}>8 replies</div>

            <article className={styles.discussionReplyCard}>
              <div className={styles.discussionReplyHead}>
                <div className={styles.discussionThreadIdentity}>
                  <span className={`${styles.discussionAvatar} ${styles.discussionAvatarSky}`}>AO</span>
                  <div>
                    <div className={styles.discussionThreadNameRow}>
                      <strong>Adaobi Okonkwo</strong>
                      <span className={styles.discussionRoleBadge}>Intern</span>
                    </div>
                    <span className={styles.discussionReplyTime}>Mar 22 · 11:02 AM</span>
                  </div>
                </div>
              </div>

              <div className={styles.discussionReplyBody}>
                <p>
                  This helped so much! So even <code>div div div div div</code> (five elements, score 0,0,5)
                  will always lose to one simple class selector with <code>0,1,0</code>, right?
                </p>
              </div>

              <div className={styles.discussionReplyActions}>
                <button type="button" className={styles.discussionReactionButton}>👍 3</button>
                <button type="button" className={styles.discussionReplyButton}>Reply</button>
              </div>
            </article>

            <article className={styles.discussionReplyCard}>
              <div className={styles.discussionReplyHead}>
                <div className={styles.discussionThreadIdentity}>
                  <span className={styles.discussionAvatar}>SB</span>
                  <div>
                    <div className={styles.discussionThreadNameRow}>
                      <strong>Sarah Bright</strong>
                      <span className={styles.discussionRoleBadge}>Instructor</span>
                    </div>
                    <span className={styles.discussionReplyTime}>Mar 22 · 11:15 AM</span>
                  </div>
                </div>
              </div>

              <div className={styles.discussionReplyBody}>
                <p>
                  Exactly right, Adaobi! That's one of the most counterintuitive parts. No matter how many
                  element selectors you chain, they can never beat a single class selector. The scores compare
                  digit by digit from left — it's not additive across columns.
                </p>
              </div>

              <div className={styles.discussionReplyActions}>
                <button type="button" className={styles.discussionReactionButton}>👍 7</button>
                <button type="button" className={styles.discussionReactionButton}>💡 4</button>
                <button type="button" className={styles.discussionReplyButton}>Reply</button>
              </div>
            </article>

            <article className={styles.discussionReplyCard}>
              <div className={styles.discussionReplyHead}>
                <div className={styles.discussionThreadIdentity}>
                  <span className={`${styles.discussionAvatar} ${styles.discussionAvatarGreen}`}>KE</span>
                  <div>
                    <div className={styles.discussionThreadNameRow}>
                      <strong>Kofi Enyinna</strong>
                      <span className={styles.discussionRoleBadge}>Intern</span>
                    </div>
                    <span className={styles.discussionReplyTime}>Mar 22 · 12:44 PM</span>
                  </div>
                </div>
              </div>

              <div className={styles.discussionReplyBody}>
                <p>
                  Just tested this with devtools — you can actually hover over any selector in the styles panel
                  and it shows the specificity score in parentheses. Didn't know that before this thread!
                </p>
              </div>

              <div className={styles.discussionReplyActions}>
                <button type="button" className={styles.discussionReactionButton}>👍 11</button>
                <button type="button" className={styles.discussionReactionButton}>🔥 2</button>
                <button type="button" className={styles.discussionReplyButton}>Reply</button>
              </div>
            </article>

            <div className={styles.discussionComposer}>
              <div className={styles.discussionComposerToolbar}>
                <button type="button">B</button>
                <button type="button">I</button>
                <button type="button">&lt;/&gt;</button>
                <button type="button">🔗</button>
              </div>

              <div className={styles.discussionComposerBody}>
                <span className={`${styles.discussionAvatar} ${styles.discussionAvatarSky}`}>AO</span>
                <input type="text" placeholder="Add a reply to this thread..." aria-label="Add a reply to this thread" />
                <button type="button" className={styles.discussionComposerSend}>▲</button>
              </div>
            </div>
          </section>
        </section>
      </main>
    </AppShell>
  );
}
