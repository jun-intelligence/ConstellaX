"use client";

import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/types";
import { useUserProfile } from "./useUserProfile";

const dashboardByRole: Record<UserRole, string> = {
  creator: "/dashboard/creator",
  manager: "/dashboard/manager",
  brand: "/dashboard/brand",
  agency: "/dashboard/agency"
};

const labelByRole: Record<UserRole, string> = {
  creator: "Creator",
  manager: "Manager",
  brand: "Brand",
  agency: "Agency"
};

export function RoleAccessGuard({
  allowedRole,
  children
}: {
  allowedRole: UserRole;
  children: React.ReactNode;
}) {
  const { profile, loading } = useUserProfile();

  if (!isSupabaseConfigured) {
    return <>{children}</>;
  }

  if (loading) {
    return <main className="betaGate loading" aria-label="Checking dashboard access" />;
  }

  if (profile?.role === allowedRole) {
    return <>{children}</>;
  }

  return (
    <main className="workspacePage">
      <section className="workspacePanel roleLockedPanel">
        <div className="betaGateMark">CX</div>
        <p className="eyebrow">Role protected dashboard</p>
        <h1>This workspace is not assigned to your account.</h1>
        <p>
          You are signed in as {profile ? `a ${labelByRole[profile.role]} account` : "an account"}.
          The {labelByRole[allowedRole]} dashboard is hidden to keep each workspace focused and private.
        </p>
        <div className="authGateActions">
          {profile ? (
            <Link className="appleCta" href={dashboardByRole[profile.role]}>
              <ShieldCheck size={18} />
              Open my dashboard
            </Link>
          ) : null}
          <Link className="brandSecondaryLink" href="/settings/profile">
            <LockKeyhole size={18} />
            Account settings
          </Link>
        </div>
      </section>
    </main>
  );
}
