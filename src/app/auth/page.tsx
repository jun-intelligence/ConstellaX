import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="authPage">
      <section className="authPanel">
        <div>
          <p className="eyebrow">ConstellaX access</p>
          <h1>Mock authentication</h1>
          <p className="mutedText">
            Authentication is intentionally placeholder-only while the product experience is being shaped.
          </p>
        </div>

        <div className="emptyState">
          <ShieldCheck size={22} />
          <strong>Ready for future Supabase Auth</strong>
          <p>Use the clean login and signup screens for the investor demo without connecting real accounts yet.</p>
        </div>

        <div className="authActions">
          <Link className="primaryButton" href="/login">
            Login preview
            <ArrowRight size={18} />
          </Link>
          <Link className="secondaryButton" href="/signup">
            Signup preview
          </Link>
        </div>
      </section>
    </main>
  );
}
