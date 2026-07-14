"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

const publicPaths = new Set(["/login", "/signup", "/forgot-password", "/auth"]);

export function SupabaseAuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const isPublicPath = publicPaths.has(pathname);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setReady(true);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setReady(true);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (ready && session && isPublicPath) {
      router.push("/dashboard");
    }
  }, [isPublicPath, ready, router, session]);

  if (!isSupabaseConfigured) {
    return <>{children}</>;
  }

  if (isPublicPath) {
    return <>{children}</>;
  }

  if (!ready) {
    return <main className="betaGate loading" aria-label="Checking account access" />;
  }

  if (!session) {
    return (
      <main className="betaGate">
        <section className="betaGatePanel">
          <div className="betaGateMark">CX</div>
          <p className="appleEyebrow">Secure workspace</p>
          <h1>Sign in to continue.</h1>
          <p>
            ConstellaX is now connected to Supabase Auth. Use an approved account to access
            campaign workflow, contracts, payments, and AI manager tools.
          </p>
          <div className="authGateActions">
            <Link className="appleCta" href="/login">
              <LockKeyhole size={18} />
              Log in
            </Link>
            <Link className="brandSecondaryLink" href="/signup">
              Request access
              <ArrowRight size={18} />
            </Link>
          </div>
          <small>
            Real account security is active when Supabase URL and anon key are configured in Vercel.
          </small>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}

export function SupabaseSignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    if (!isSupabaseConfigured || !supabase) {
      router.push("/login");
      return;
    }

    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    router.push("/login");
  }

  return (
    <button className="accountDropdownButton" type="button" onClick={signOut} disabled={loading}>
      <ShieldCheck size={16} />
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
