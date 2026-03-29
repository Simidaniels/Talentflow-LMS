"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ACTIVE_SESSION_KEY, getInitials } from "../auth-storage";
import { learnerProfile, navGroups } from "../data";
import styles from "../page.module.css";

type AppShellProps = {
  title: string;
  children: React.ReactNode;
  breadcrumbTrail?: string[];
};

export default function AppShell({ title, children, breadcrumbTrail }: AppShellProps) {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbTrail ?? [title];
  const showSearchField = pathname === "/dashboard";
  const [displayName, setDisplayName] = useState("Learner");
  const [initials, setInitials] = useState("TF");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedSession = window.localStorage.getItem(ACTIVE_SESSION_KEY);

    if (!storedSession) {
      setDisplayName(learnerProfile.name);
      setInitials(getInitials(learnerProfile.name));
      return;
    }

    try {
      const session = JSON.parse(storedSession) as { name?: string };
      const nextName = session.name || learnerProfile.name;
      setDisplayName(nextName);
      setInitials(getInitials(nextName));
    } catch {
      setDisplayName(learnerProfile.name);
      setInitials(getInitials(learnerProfile.name));
    }
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSearchOpen || showSearchField) {
      return;
    }

    searchInputRef.current?.focus();
  }, [isSearchOpen, showSearchField]);

  return (
    <main className={styles.appShell}>
      {isMobileMenuOpen ? (
        <button
          type="button"
          className={styles.mobileSidebarBackdrop}
          aria-label="Close navigation menu"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}

      <aside
        className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarMobileOpen : ""}`}
      >
        <div className={styles.brand}>
          <div className={styles.brandMark}>
            <span className={styles.brandShield} />
          </div>
          <div className={styles.brandText}>
            <span>Talent</span>Flow
          </div>
        </div>

        {navGroups.map((group) => (
          <section className={styles.navGroup} key={group.label}>
            <p className={styles.navLabel}>{group.label}</p>
            <nav className={styles.navList}>
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navItem} ${
                    pathname === item.href ? styles.navItemActive : ""
                  }`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge ? <span className={styles.navBadge}>{item.badge}</span> : null}
                </Link>
              ))}
            </nav>
          </section>
        ))}

        <Link href="/profile" className={styles.profileCard}>
          <div className={styles.profileAvatar}>{initials}</div>
          <div className={styles.profileMeta}>
            <strong>{displayName}</strong>
            <span>{learnerProfile.id}</span>
          </div>
          <span className={styles.profileChevron}>&gt;</span>
        </Link>
      </aside>

      <section className={styles.mainPanel}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumbs}>
            <button
              type="button"
              className={styles.mobileMenuButton}
              aria-label="Open navigation menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
            <span>TalentFlow</span>
            {breadcrumbs.map((crumb) => (
              <span key={crumb}>
                <span className={styles.breadcrumbSep}>&gt;</span>
                <strong>{crumb}</strong>
              </span>
            ))}
          </div>

          <div className={styles.topbarActions}>
            {showSearchField ? (
              <label className={styles.searchField}>
                <span className={styles.searchIcon} />
                <input type="text" placeholder="Search courses..." aria-label="Search courses" />
              </label>
            ) : (
              <label
                className={`${styles.searchField} ${styles.searchFieldCompact} ${
                  isSearchOpen ? styles.searchFieldCompactOpen : ""
                }`}
              >
                <button
                  type="button"
                  className={styles.searchIconButton}
                  aria-label="Search"
                  aria-expanded={isSearchOpen}
                  onClick={() => setIsSearchOpen((current) => !current)}
                >
                  <span className={styles.searchIcon} />
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  onBlur={() => setIsSearchOpen(false)}
                />
              </label>
            )}
            <button className={styles.notificationButton} aria-label="Notifications">
              <span className={styles.notificationBell}>🔔</span>
              <span className={styles.notificationDot} />
            </button>
            <Link href="/profile" className={styles.avatarButton} aria-label="Open profile">
              {initials}
            </Link>
          </div>
        </header>

        <div className={styles.contentArea}>{children}</div>
      </section>
    </main>
  );
}
