"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { STORED_ACCOUNT_KEY, type StoredAccount } from "../auth-storage";
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

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword || !role) {
      setError("Please complete all fields before creating your account.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const account: StoredAccount = {
      name: name.trim(),
      email: email.trim(),
      password,
      role
    };

    window.localStorage.setItem(STORED_ACCOUNT_KEY, JSON.stringify(account));
    router.push("/login?created=1");
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authShowcase} data-aos="fade-right">
        <div data-aos="fade-up" data-aos-delay="60">
          <Brand />
          <div className={styles.authHero}>
            <p className={styles.authEyebrow}>Create Your Account</p>
            <h1>Create your TalentFlow account and begin a structured learning journey.</h1>
            <p>
              Set up your learner account to unlock a personalized LMS experience built around
              your role, your cohort, and your training track. From onboarding to assignment
              delivery, TalentFlow gives you a clear, professional workspace for every stage of
              your learning experience.
            </p>

            <div className={styles.authFeatureGrid} data-aos="fade-up" data-aos-delay="140">
              <div className={styles.authFeatureCard}>
                <strong>Choose your path</strong>
                <span>
                  Frontend, backend, UI, and admin learners each receive a tailored experience
                  aligned to their responsibilities and training goals.
                </span>
              </div>
              <div className={styles.authFeatureCard}>
                <strong>Faster onboarding</strong>
                <span>
                  Set up your profile, complete your sign-in flow, and move directly into your
                  dashboard with the essentials already organized.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.authMetaRow} data-aos="fade-up" data-aos-delay="200">
          <span className={styles.authMetaPill}>Live field validation</span>
          <span className={styles.authMetaPill}>Team tag and learner ID assignment</span>
        </div>
      </section>

      <section className={styles.authPanel} data-aos="fade-left">
        <div className={styles.authCard} data-aos="zoom-in" data-aos-delay="80">
          <h2>Sign Up</h2>
          <p>
            Create your TalentFlow learner account to continue onboarding, join your selected
            track, and access your personalized dashboard.
          </p>

          {error ? <div className={styles.authError}>{error}</div> : null}

          <form className={styles.authForm} onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="140">
            <div className={styles.authSplitFields} data-aos="fade-up" data-aos-delay="180">
              <div className={styles.authField}>
                <label htmlFor="signup-name">Full name</label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className={styles.authField}>
                <label htmlFor="signup-email">Email address</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.authSplitFields} data-aos="fade-up" data-aos-delay="220">
              <div className={styles.authField}>
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className={styles.authField}>
                <label htmlFor="signup-confirm-password">Confirm password</label>
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.authField} data-aos="fade-up" data-aos-delay="260">
              <label htmlFor="signup-role">Role / team</label>
              <select
                id="signup-role"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="" disabled>
                  Select your track
                </option>
                <option value="frontend">Frontend Engineering</option>
                <option value="backend">Backend Engineering</option>
                <option value="uiux">UI / UX Design</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className={styles.authActions} data-aos="fade-up" data-aos-delay="300">
              <button type="submit" className={styles.authPrimaryButton}>
                Create account
              </button>
              <Link href="/login" className={styles.authSecondaryButton}>
                Back to login
              </Link>
            </div>
          </form>

          <p className={styles.authFootNote} data-aos="fade-up" data-aos-delay="340">
            Next steps in the full onboarding flow can include email verification, optional
            profile setup, and redirection into your personalized learner dashboard.
          </p>
        </div>
      </section>
    </main>
  );
}
