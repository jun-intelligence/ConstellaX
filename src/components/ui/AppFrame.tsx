"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Bell, Brain, LayoutDashboard, Search, Settings, ShieldCheck, UserCircle, WalletCards } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { SupabaseSignOutButton } from "./SupabaseAuthGate";

const storageKey = "constellax-sidebar-collapsed";

export function AppFrame({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem(storageKey) === "true");
  }, []);

  function toggleSidebar() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(storageKey, String(next));
      return next;
    });
  }

  return (
    <>
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`appContent ${collapsed ? "sidebarCollapsed" : ""}`}>
        <header className="appTopBar">
          <label className="topSearch">
            <Search size={16} />
            <input placeholder="Search campaigns, creators, contracts..." />
          </label>
          <nav className="topActions" aria-label="Account actions">
            <Link className="topIconLink dashboard" href="/dashboard" title="My Dashboard">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link className="topIconLink ai" href="/dashboard/ai-manager/chat-studio" title="AI Manager Chat Studio">
              <Brain size={18} />
            </Link>
            <Link className="topIconLink" href="/notifications" title="Notifications">
              <Bell size={18} />
            </Link>
            <div className="accountMenu">
              <button type="button">
                <UserCircle size={18} />
                <span>Maya</span>
              </button>
              <div className="accountDropdown">
                <Link href="/settings/profile"><UserCircle size={16} /> Profile</Link>
                <Link href="/settings/workspace"><ShieldCheck size={16} /> Workspace</Link>
                <Link href="/settings/billing"><WalletCards size={16} /> Billing</Link>
                <Link href="/settings/security"><Settings size={16} /> Security</Link>
                <SupabaseSignOutButton />
              </div>
            </div>
          </nav>
        </header>
        {children}
      </div>
    </>
  );
}
