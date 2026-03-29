"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACTIVE_SESSION_KEY } from "../auth-storage";
import AppShell from "../components/AppShell";
import styles from "../page.module.css";

const notificationSettings = [
  ["Assignment reminders", "Receive reminders before upcoming assignment and project deadlines.", true],
  ["Discussion replies", "Get notified when someone responds to your discussion posts or questions.", true],
  ["New announcements", "Stay updated on important cohort, instructor, and platform announcements.", true],
  ["Streak reminders", "Receive a daily reminder to maintain your learning streak.", false],
  ["Weekly summary email", "Get a weekly summary of your learning progress, assignments, and activity.", false]
] as const;

const preferenceSettings = [
  ["Language", "Select your preferred display language for the platform.", "English (UK)"],
  ["Timezone", "Set your local timezone for accurate deadlines, reminders, and activity logs.", "Africa/Lagos (WAT, UTC+1)"],
  ["Autoplay next lesson", "Automatically begin the next lesson after completing the current one.", true],
  ["Show closed captions", "Display captions on lesson videos by default for improved accessibility.", false]
] as const;

const accountActions = [
  ["Change password", "Update your password to keep your TalentFlow account secure."],
  ["Download my data", "Request a copy of your account, learning, and activity data."]
] as const;

export default function SettingsPage() {
  const router = useRouter();
  const [notificationValues, setNotificationValues] = useState(
    Object.fromEntries(notificationSettings.map(([title, , enabled]) => [title, enabled]))
  );
  const [preferenceToggleValues, setPreferenceToggleValues] = useState({
    "Autoplay next lesson": true,
    "Show closed captions": false
  });

  function toggleNotification(title: string) {
    setNotificationValues((current) => ({
      ...current,
      [title]: !current[title]
    }));
  }

  function togglePreference(title: "Autoplay next lesson" | "Show closed captions") {
    setPreferenceToggleValues((current) => ({
      ...current,
      [title]: !current[title]
    }));
  }

  function handleSignOut() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ACTIVE_SESSION_KEY);
    }

    router.push("/login");
  }

  return (
    <AppShell title="Settings">
      <main className={styles.profilePage}>
        <section className={styles.profileContentGrid}>
          <div className={styles.profileMainColumn}>
            <article className={styles.profileCardMain}>
              <div className={styles.profileCardHead}>
                <h2>Notifications</h2>
              </div>

              <div className={styles.profileSettingsList}>
                {notificationSettings.map(([title, detail, enabled]) => {
                  const isEnabled = notificationValues[title] ?? enabled;

                  return (
                    <div className={styles.profileSettingRow} key={title}>
                      <div className={styles.profileSettingCopy}>
                        <strong>{title}</strong>
                        <p>{detail}</p>
                      </div>
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
                    </div>
                  );
                })}
              </div>
            </article>

            <article className={styles.profileCardMain}>
              <div className={styles.profileCardHead}>
                <h2>Preferences</h2>
              </div>

              <div className={styles.profileSettingsList}>
                {preferenceSettings.map(([title, detail, value]) => (
                  <div className={styles.profileSettingRow} key={title}>
                    <div className={styles.profileSettingCopy}>
                      <strong>{title}</strong>
                      <p>{detail}</p>
                    </div>
                    {typeof value === "boolean" ? (
                      <button
                        type="button"
                        className={`${styles.profileToggle} ${
                          preferenceToggleValues[title as keyof typeof preferenceToggleValues]
                            ? styles.profileToggleOn
                            : ""
                        }`}
                        aria-pressed={
                          preferenceToggleValues[title as keyof typeof preferenceToggleValues]
                        }
                        onClick={() =>
                          togglePreference(title as "Autoplay next lesson" | "Show closed captions")
                        }
                      >
                        <span />
                      </button>
                    ) : (
                      <div className={styles.settingsValueWrap}>
                        <span className={styles.settingsValueText}>{value}</span>
                        <button type="button" className={styles.profileArrowButton}>
                          &#8250;
                        </button>
                      </div>
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
                {accountActions.map(([title, detail]) => (
                  <button type="button" className={styles.settingsAccountCard} key={title}>
                    <div className={styles.settingsAccountCopy}>
                      <strong>{title}</strong>
                      <p>{detail}</p>
                    </div>
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
      </main>
    </AppShell>
  );
}
