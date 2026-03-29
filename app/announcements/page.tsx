import AppShell from "../components/AppShell";
import SimplePage from "../components/SimplePage";

export default function AnnouncementsPage() {
  return (
    <AppShell title="Announcements">
      <SimplePage
        heading="Announcements"
        description="Stay updated on new lessons, schedule changes, and platform notices."
      />
    </AppShell>
  );
}
