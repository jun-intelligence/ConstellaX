import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MockAuthForm({
  mode
}: {
  mode: "login" | "signup" | "forgot";
}) {
  const title =
    mode === "login" ? "Welcome back." : mode === "signup" ? "Create your ConstellaX workspace." : "Reset your password.";
  const subtitle =
    mode === "login"
      ? "Mock login only. Supabase Auth can replace this later."
      : mode === "signup"
        ? "Start with a mock account for creator, manager, agency, or brand workflows."
        : "Enter an email to preview the reset flow placeholder.";

  return (
    <main className="authMockPage">
      <section className="authMockPanel reveal">
        <p className="appleEyebrow">ConstellaX account</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <form className="authMockForm">
          {mode === "signup" && <input placeholder="Full name" />}
          <input placeholder="Email" type="email" />
          {mode !== "forgot" && <input placeholder="Password" type="password" />}
          {mode === "signup" && (
            <select defaultValue="creator">
              <option value="creator">Creator</option>
              <option value="manager">Manager</option>
              <option value="agency">Agency</option>
              <option value="brand">Brand</option>
            </select>
          )}
          <button type="button">
            {mode === "login" ? "Log in placeholder" : mode === "signup" ? "Create account placeholder" : "Send reset link placeholder"}
            <ArrowRight size={18} />
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
