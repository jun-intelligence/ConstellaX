import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { smartNotifications } from "@/lib/mockAI";

export default function AINotificationsPage() {
  return (
    <main className="aiPage narrow">
      <header className="aiSubHeader reveal">
        <Link className="textLink" href="/dashboard/ai-manager">
          <ArrowLeft size={16} />
          AI Manager
        </Link>
        <p className="appleEyebrow">Smart Notifications Center</p>
        <h1>Reminders that protect the relationship.</h1>
      </header>

      <section className="aiNotifications reveal">
        {smartNotifications.map((item) => (
          <article className={`aiNotification ${item.priority}`} key={item.id}>
            <Bell size={18} />
            <div>
              <span>{item.channel} / {item.priority}</span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
