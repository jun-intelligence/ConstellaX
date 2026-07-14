import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { aiManagerProfile, aiTimelines, relationshipSignals } from "@/lib/mockAI";

export default function AIReputationPage() {
  return (
    <main className="aiPage narrow">
      <header className="aiSubHeader reveal">
        <Link className="textLink" href="/dashboard/ai-manager">
          <ArrowLeft size={16} />
          AI Manager
        </Link>
        <p className="appleEyebrow">Trust & Reputation Score</p>
        <h1>Trust signals for better deals.</h1>
      </header>

      <section className="aiScorePanel reveal">
        <ShieldCheck size={28} />
        <span>{aiManagerProfile.trustScore}</span>
        <p>Composite placeholder score based on delivery reliability, approvals, payments, contract hygiene, and relationship quality.</p>
      </section>

      <section className="aiSplit reveal">
        <div className="aiPanel">
          <div className="aiPanelTitle">
            <h2>Reputation signals</h2>
          </div>
          <div className="aiActionList">
            {aiManagerProfile.reputationSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
        <div className="aiPanel">
          <div className="aiPanelTitle">
            <h2>Audit trail</h2>
          </div>
          <div className="aiTimeline">
            {aiTimelines.map((item) => (
              <div key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.date}</span>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aiPanel reveal">
        <div className="aiPanelTitle">
          <h2>Relationship intelligence</h2>
        </div>
        <div className="aiFeed compact">
          {relationshipSignals.map((signal) => (
            <article key={signal.entity}>
              <span>{signal.entity}</span>
              <h3>{signal.signal}</h3>
              <p>{signal.note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
