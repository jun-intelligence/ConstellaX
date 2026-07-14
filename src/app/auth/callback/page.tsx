"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Confirming your account...");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function confirmSession() {
      if (!isSupabaseConfigured || !supabase) {
        setHasError(true);
        setMessage("Supabase is not configured yet.");
        return;
      }

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const next = url.searchParams.get("next") || "/dashboard";

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          setHasError(true);
          setMessage(error.message);
          return;
        }

        setMessage("Account confirmed. Redirecting...");
        router.replace(next);
        return;
      }

      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const hashError = hashParams.get("error_description") || hashParams.get("error");

      if (hashError) {
        setHasError(true);
        setMessage(hashError);
        return;
      }

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setHasError(true);
        setMessage(error.message);
        return;
      }

      if (!data.session) {
        setHasError(true);
        setMessage("Confirmation opened, but Supabase did not return a session. Try logging in now.");
        return;
      }

      setMessage("Account confirmed. Redirecting...");
      router.replace(next);
    }

    confirmSession();
  }, [router]);

  return (
    <main className="betaGate">
      <section className="betaGatePanel">
        <div className="betaGateMark">CX</div>
        <p className="appleEyebrow">Supabase Auth</p>
        <h1>{hasError ? "Confirmation issue." : "Securing your session."}</h1>
        <p>{message}</p>

        {!hasError ? (
          <div className="authCallbackSpinner">
            <Loader2 className="spin" size={22} />
          </div>
        ) : (
          <div className="authGateActions">
            <Link className="appleCta" href="/login">
              <ShieldCheck size={18} />
              Back to login
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
