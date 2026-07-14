import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, Building2, Sparkles, UserRound } from "lucide-react";

const dashboards = [
  {
    title: "Creator dashboard",
    href: "/dashboard/creator",
    icon: UserRound,
    description: "Track briefs, approvals, deliverables, payments, and AI-supported next actions."
  },
  {
    title: "Manager dashboard",
    href: "/dashboard/manager",
    icon: BriefcaseBusiness,
    description: "Coordinate creator approvals, fee records, campaign timelines, and brand communication."
  },
  {
    title: "Agency dashboard",
    href: "/dashboard/agency",
    icon: Building2,
    description: "Manage active brand campaigns, creator shortlists, budgets, invoices, and reporting."
  },
  {
    title: "Brand dashboard",
    href: "/dashboard/brand",
    icon: Sparkles,
    description: "Create campaign briefs, review creator matches, approve content, and monitor payment visibility."
  },
  {
    title: "AI Manager",
    href: "/dashboard/ai-manager",
    icon: Bot,
    description: "Explore mock recommendations, campaign intelligence, and structured advisory workflows."
  }
];

export default function DashboardPage() {
  return (
    <main className="workspacePage">
      <header className="workspaceHeader compact">
        <div>
          <p className="eyebrow">ConstellaX dashboards</p>
          <h1>Choose your operating view</h1>
          <p>
            A mock-only dashboard hub for creators, managers, agencies, and brands. No backend connection is required.
          </p>
        </div>
      </header>

      <section className="workspaceGrid">
        {dashboards.map((dashboard) => {
          const Icon = dashboard.icon;

          return (
            <Link className="workspacePanel dashboardLinkCard" href={dashboard.href} key={dashboard.title}>
              <div className="panelTitle">
                <div>
                  <h2>{dashboard.title}</h2>
                  <p>{dashboard.description}</p>
                </div>
                <Icon size={20} />
              </div>
              <span className="textLink">
                Open view
                <ArrowRight size={16} />
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
