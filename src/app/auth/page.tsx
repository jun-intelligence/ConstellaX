import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="authPage">
      <section className="authPanel">
        <div>
          <p className="eyebrow">ConstellaX access</p>
          <h1>Secure account access</h1>
          <p className="mutedText">
            Supabase Auth is the account layer for private creator, manager, agency, and brand workspaces.
          </p>
        </div>

        <div className="emptyState">
          <ShieldCheck size={22} />
          <strong>Supabase-ready</strong>
          <p>Add your Supabase URL and anon key in Vercel to activate real account login on the live site.</p>
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
