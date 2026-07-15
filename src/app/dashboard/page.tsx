"use client";

import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, Building2, Sparkles, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useUserProfile } from "@/components/ui/useUserProfile";
import type { UserRole } from "@/lib/types";

const dashboards: Record<UserRole, {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
}> = {
  creator: {
    title: "Creator dashboard",
    href: "/dashboard/creator",
    icon: UserRound,
    description: "Track briefs, approvals, deliverables, payments, and AI-supported next actions."
  },
  manager: {
    title: "Manager dashboard",
    href: "/dashboard/manager",
    icon: BriefcaseBusiness,
    description: "Coordinate creator approvals, fee records, campaign timelines, and brand communication."
  },
  agency: {
    title: "Agency dashboard",
    href: "/dashboard/agency",
    icon: Building2,
    description: "Manage active brand campaigns, creator shortlists, budgets, invoices, and reporting."
  },
  brand: {
    title: "Brand dashboard",
    href: "/dashboard/brand",
    icon: Sparkles,
    description: "Create campaign briefs, review creator matches, approve content, and monitor payment visibility."
  }
};

const sharedDashboard = {
  title: "AI Manager",
  href: "/dashboard/ai-manager",
  icon: Bot,
  description: "Explore mock recommendations, campaign intelligence, and structured advisory workflows."
};

export default function DashboardPage() {
  const { profile, loading } = useUserProfile();
  const visibleDashboards = profile ? [dashboards[profile.role], sharedDashboard] : [sharedDashboard];

  return (
    <main className="workspacePage">
      <header className="workspaceHeader compact">
        <div>
          <p className="eyebrow">ConstellaX dashboard</p>
          <h1>{loading ? "Loading your operating view" : "Your operating view"}</h1>
          <p>
            ConstellaX now keeps role-specific dashboards private. You only see the workspace assigned to your account.
          </p>
        </div>
      </header>

      <section className="workspaceGrid">
        {visibleDashboards.map((dashboard) => {
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
