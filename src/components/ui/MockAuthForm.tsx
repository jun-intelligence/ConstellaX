"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/types";

export function MockAuthForm({
  mode
}: {
  mode: "login" | "signup" | "forgot";
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("creator");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const title =
    mode === "login" ? "Welcome back." : mode === "signup" ? "Create your ConstellaX workspace." : "Reset your password.";
  const subtitle =
    mode === "login"
      ? "Log in to your private creator operating system."
      : mode === "signup"
        ? "Create an account as a creator, manager, agency, or brand."
        : "Enter your email and Supabase will send a reset link.";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isSupabaseConfigured || !supabase) {
      setMessage("Supabase is not connected yet. Add the Supabase URL and anon key in Vercel first.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              company_name: companyName,
              role
            }
          }
        });

        if (error) throw error;

        if (!data.session) {
          setMessage("Account created. Check your email to confirm, then log in.");
          return;
        }

        router.push("/dashboard");
      }

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        router.push("/dashboard");
      }

      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`
        });

        if (error) throw error;
        setMessage("Reset link sent. Check your email.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authMockPage">
      <section className="authMockPanel reveal">
        <p className="appleEyebrow">ConstellaX account</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>

        {!isSupabaseConfigured ? (
          <div className="supabaseNotice">
            <ShieldCheck size={18} />
            <span>Supabase env vars are missing. The form is ready, but login turns on after the keys are added.</span>
          </div>
        ) : null}

        <form className="authMockForm" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <input
                placeholder="Full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
              <input
                placeholder="Company or team"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </>
          )}
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {mode !== "forgot" && (
            <input
              minLength={6}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          )}
          {mode === "signup" && (
            <select value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
              <option value="creator">Creator</option>
              <option value="manager">Manager</option>
              <option value="agency">Agency</option>
              <option value="brand">Brand</option>
            </select>
          )}

          {message ? <p className="formMessage">{message}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
            {mode === "login" ? "Log in" : mode === "signup" ? "Create account" : "Send reset link"}
          </button>
        </form>
        <div className="authMockLinks">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign up</Link>
          <Link href="/forgot-password">Forgot password</Link>
        </div>
      </section>
    </main>
  );
}
