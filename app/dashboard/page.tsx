"use client";

import { useEffect, useState } from "react";
import { ACTIVE_SESSION_KEY } from "../auth-storage";
import AppShell from "../components/AppShell";
import DashboardContent from "../components/DashboardContent";
import { learnerProfile, type LearningStatus } from "../data";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"All" | LearningStatus>("All");
  const [displayName, setDisplayName] = useState("Learner");

  useEffect(() => {
    const storedSession = window.localStorage.getItem(ACTIVE_SESSION_KEY);

    if (!storedSession) {
      setDisplayName(learnerProfile.name);
      return;
    }

    try {
      const session = JSON.parse(storedSession) as { name?: string };
      setDisplayName(session.name || learnerProfile.name);
    } catch {
      setDisplayName(learnerProfile.name);
    }
  }, []);

  return (
    <AppShell title="Dashboard">
      <DashboardContent
        activeTab={activeTab}
        onTabChange={setActiveTab}
        displayName={displayName}
      />
    </AppShell>
  );
}
