import Link from "next/link";
import { Bell, CreditCard, LockKeyhole, UserCircle, Users, Workflow } from "lucide-react";
import { AppShell } from "./AppShell";
import { connectedAccounts, mockUser, roles, settingsCards } from "@/lib/accountSettings";

const icons = {
  profile: UserCircle,
  billing: CreditCard,
  notifications: Bell,
  security: LockKeyhole,
  workspace: Workflow
};

export function SettingsIndexPage() {
  return (
    <AppShell
      eyebrow="Settings"
      title="Account and workspace controls."
      subtitle="Mock settings ready for future Supabase Auth, billing, connected accounts, and workspace preferences."
    >
      <section className="settingsGrid reveal">
        {settingsCards.map((card) => (
          <Link className="settingsCard" href={card.href} key={card.href}>
            <h2>{card.title}</h2>
            <p>{card.detail}</p>
          </Link>
        ))}
      </section>
    </AppShell>
  );
}

export function SettingsDetailPage({ section }: { section: keyof typeof icons }) {
  const Icon = icons[section];
  const title = section[0].toUpperCase() + section.slice(1);

  return (
    <AppShell
      eyebrow="Settings"
      title={`${title} settings.`}
      subtitle="Clean mock controls only. No real authentication, billing, or connected-account APIs are active yet."
    >
      <section className="settingsDetailPanel reveal">
        <div className="systemPanelTitle">
          <h2>{title}</h2>
          <Icon size={20} />
        </div>
        {section === "profile" && (
          <div className="settingsFormGrid">
            <label>Name<input defaultValue={mockUser.name} /></label>
            <label>Email<input defaultValue={mockUser.email} /></label>
            <label>Role<select defaultValue={mockUser.role}>{roles.map((role) => <option key={role}>{role}</option>)}</select></label>
            <label>Workspace<input defaultValue={mockUser.workspace} /></label>
          </div>
        )}
        {section === "billing" && (
          <div className="settingsRows">
            <div><strong>Payment method</strong><span>Visa ending 4242 placeholder</span></div>
            <div><strong>Plan</strong><span>Team workspace mock plan</span></div>
            <div><strong>Finance contact</strong><span>finance@lumina.example</span></div>
          </div>
        )}
        {section === "notifications" && (
          <div className="settingsRows">
            <div><strong>Approval reminders</strong><span>On</span></div>
            <div><strong>Payment alerts</strong><span>On</span></div>
            <div><strong>Live post tracking</strong><span>Daily summary</span></div>
          </div>
        )}
        {section === "security" && (
          <div className="settingsRows">
            <div><strong>Password</strong><span>Change password placeholder</span></div>
            <div><strong>Two-factor auth</strong><span>Not connected</span></div>
            <div><strong>Sessions</strong><span>Current browser mock session</span></div>
          </div>
        )}
        {section === "workspace" && (
          <div className="settingsRows">
            <div><strong>Connected accounts</strong><span>{connectedAccounts.join(" / ")}</span></div>
            <div><strong>Default dashboard</strong><span>Creator operations</span></div>
            <div><strong>Layout preference</strong><span>Calm workspace, compact tables</span></div>
          </div>
        )}
        <div className="humanControlNotice">
          <Users size={18} />
          Settings are placeholders. Real account changes should require authenticated user confirmation.
        </div>
      </section>
    </AppShell>
  );
}
