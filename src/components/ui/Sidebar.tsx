"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Brain,
  BriefcaseBusiness,
  CircleDollarSign,
  FileSignature,
  LayoutDashboard,
  LayoutGrid,
  LineChart,
  MessageSquareText,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/lib/types";
import { useUserProfile } from "./useUserProfile";

const roleDashboardItems: Record<UserRole, {
  label: string;
  href: string;
  icon: LucideIcon;
  tone: string;
}> = {
  creator: { label: "Creator", href: "/dashboard/creator", icon: Users, tone: "people" },
  manager: { label: "Manager", href: "/dashboard/manager", icon: LayoutDashboard, tone: "grid" },
  brand: { label: "Brand", href: "/dashboard/brand", icon: BriefcaseBusiness, tone: "briefcase" },
  agency: { label: "Agency", href: "/dashboard/agency", icon: BriefcaseBusiness, tone: "briefcase" }
};

const baseGroups = [
  {
    label: "System",
    items: [
      { label: "Home", href: "/", icon: Sparkles, tone: "spark" },
      { label: "Investor Demo", href: "/demo", icon: Sparkles, tone: "spark" },
      { label: "AI Chat Studio", href: "/dashboard/ai-manager/chat-studio", icon: MessageSquareText, tone: "brain" },
      { label: "Operating OS", href: "/operating-system", icon: Brain, tone: "brain" },
      { label: "Workspace", href: "/workspace", icon: LayoutGrid, tone: "grid" },
      { label: "Community", href: "/community", icon: Network, tone: "network" }
    ]
  },
  {
    label: "Dashboards",
    items: [
      { label: "AI Manager", href: "/dashboard/ai-manager", icon: Brain, tone: "brain" }
    ]
  },
  {
    label: "Operations",
    items: [
      { label: "Campaigns", href: "/campaigns", icon: BriefcaseBusiness, tone: "briefcase" },
      { label: "Live Campaigns", href: "/campaigns/live", icon: ShieldCheck, tone: "trust" },
      { label: "Analytics", href: "/analytics/creator", icon: LineChart, tone: "analytics" },
      { label: "Trust", href: "/trust", icon: ShieldCheck, tone: "trust" },
      { label: "Contracts", href: "/contracts", icon: FileSignature, tone: "document" },
      { label: "Payments", href: "/payments", icon: CircleDollarSign, tone: "money" },
      { label: "Notifications", href: "/notifications", icon: Bell, tone: "alert" },
      { label: "Settings", href: "/settings", icon: Settings, tone: "grid" }
    ]
  }
];

export function Sidebar({
  collapsed,
  onToggle
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const { profile } = useUserProfile();
  const groups = baseGroups.map((group) => {
    if (group.label !== "Dashboards") return group;
    return {
      ...group,
      items: profile ? [roleDashboardItems[profile.role], ...group.items] : group.items
    };
  });

  return (
    <aside className={`globalSidebar ${collapsed ? "collapsed" : ""}`} aria-label="Main navigation">
      <Link className="sidebarBrand" href="/demo">
        <span>CX</span>
        <div>
          <strong>ConstellaX</strong>
          <small>Mock demo</small>
        </div>
      </Link>
      <button className="sidebarToggle" type="button" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
        {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        <span>{collapsed ? "Expand" : "Collapse"}</span>
      </button>
      <div className="sidebarGroups">
        {groups.map((group) => (
          <section key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <Link className={active ? "active" : ""} href={item.href} key={item.href}>
                  <Icon className={`sidebarIcon ${item.tone}`} size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </section>
        ))}
      </div>
    </aside>
  );
}
