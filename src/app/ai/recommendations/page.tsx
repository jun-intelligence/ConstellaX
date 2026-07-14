import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { aiRecommendations } from "@/lib/mockAI";

export default function AIRecommendationsPage() {
  return (
    <main className="aiPage narrow">
      <header className="aiSubHeader reveal">
        <Link className="textLink" href="/dashboard/ai-manager">
          <ArrowLeft size={16} />
          AI Manager
        </Link>
        <p className="appleEyebrow">AI Recommendations Feed</p>
        <h1>Suggested next actions for creators.</h1>
      </header>

      <section className="aiFeed large reveal">
        {aiRecommendations.map((item) => (
          <article key={item.id}>
            <span>{item.type} / {item.confidence}% confidence</span>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <small>{item.rationale}</small>
          </article>
        ))}
      </section>

      <section className="aiQuietNote reveal">
        <Sparkles size={18} />
        <p>Placeholder logic only. Future versions can rank opportunities using campaign fit, audience quality, rate history, contract risk, and relationship signals.</p>
      </section>
    </main>
  );
}
