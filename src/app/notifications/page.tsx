import { AppShell } from "@/components/ui/AppShell";
import { NotificationPanel } from "@/components/ui/NotificationPanel";
import { smartNotifications } from "@/lib/mockAI";

export default function NotificationsCenterPage() {
  return (
    <AppShell
      eyebrow="Notifications center"
      title="The right nudge at the right moment."
      subtitle="Mock reminders for deadlines, payments, approvals, follow-ups, and reporting."
    >
      <section className="systemRows reveal">
        {smartNotifications.map((item) => (
          <NotificationPanel key={item.id} title={item.title} body={item.body} meta={`${item.channel} / ${item.priority}`} />
        ))}
      </section>
    </AppShell>
  );
}
