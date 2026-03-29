"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ACTIVE_SESSION_KEY, STORED_ACCOUNT_KEY, type StoredAccount } from "../auth-storage";
import styles from "../page.module.css";

function Brand() {
  return (
    <div className={styles.authBrand}>
      <span className={styles.authBrandMark}>
        <span className={styles.brandShield} />
      </span>
      <span>Talent</span>
      <span>Flow</span>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSuccessMessage(
      params.get("created") === "1" ? "Account created successfully. Login to continue." : ""
    );
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const storedAccount = window.localStorage.getItem(STORED_ACCOUNT_KEY);

    if (!storedAccount) {
      setError("No account found yet. Create an account first.");
      return;
    }

    try {
      const account = JSON.parse(storedAccount) as StoredAccount;

      if (account.email !== email || account.password !== password) {
        setError("Incorrect email or password.");
        return;
      }

      window.localStorage.setItem(
        ACTIVE_SESSION_KEY,
        JSON.stringify({
          name: account.name,
          email: account.email,
          role: account.role
        })
      );

      router.push("/dashboard");
    } catch {
      setError("We couldn't read your saved account. Please sign up again.");
    }
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authShowcase} data-aos="fade-right">
        <div data-aos="fade-up" data-aos-delay="60">
          <Brand />
          <div className={styles.authHero}>
            <p className={styles.authEyebrow}>Welcome Back</p>
            <h1>Return to your personalized TalentFlow learning workspace.</h1>
            <p>
              Sign in to continue your internship journey with a focused view of your courses,
              assignments, discussion activity, progress milestones, and weekly learning rhythm.
              TalentFlow keeps your learning environment organized so you can move from one task
              to the next with clarity and momentum.
            </p>

            <div className={styles.authFeatureGrid} data-aos="fade-up" data-aos-delay="140">
              <div className={styles.authFeatureCard}>
                <strong>Personal dashboard</strong>
                <span>
                  Access your role-based courses, approaching deadlines, streaks, and recent
                  announcements from a single dashboard.
                </span>
              </div>
              <div className={styles.authFeatureCard}>
                <strong>Team alignment</strong>
                <span>
                  Stay connected to your frontend, backend, UI, or admin track with updates that
                  match your current cohort workflow.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.authMetaRow} data-aos="fade-up" data-aos-delay="200">
          <span className={styles.authMetaPill}>Real-time progress tracking</span>
          <span className={styles.authMetaPill}>Assignment and quiz management</span>
        </div>
      </section>

      <section className={styles.authPanel} data-aos="fade-left">
        <div className={styles.authCard} data-aos="zoom-in" data-aos-delay="80">
          <h2>Login</h2>
          <p>
            Enter your TalentFlow account details to securely access your dashboard, learner
            progress, assignments, and community updates.
          </p>

          {successMessage ? <div className={styles.authSuccess}>{successMessage}</div> : null}
          {error ? <div className={styles.authError}>{error}</div> : null}

          <form className={styles.authForm} onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="140">
            <div className={styles.authField} data-aos="fade-up" data-aos-delay="180">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className={styles.authField} data-aos="fade-up" data-aos-delay="220">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className={styles.authInlineRow} data-aos="fade-up" data-aos-delay="260">
              <Link href="/sign-up">Create an account</Link>
              <Link href="/login">Forgot Password?</Link>
            </div>

            <div className={styles.authActions} data-aos="fade-up" data-aos-delay="300">
              <button type="submit" className={styles.authPrimaryButton}>
                Login
              </button>
              <Link href="/sign-up" className={styles.authSecondaryButton}>
                Create an account
              </Link>
            </div>
          </form>

          <p className={styles.authFootNote} data-aos="fade-up" data-aos-delay="340">
            By continuing, you agree to TalentFlow&apos;s learner access policies, security
            practices, and platform usage terms designed to keep your account and progress data
            protected.
          </p>
        </div>
      </section>
    </main>
  );
}
