import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Brain,
  FileText,
  Handshake,
  LineChart,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import {
  aiManagerProfile,
  aiRecommendations,
  aiTimelines,
  relationshipSignals,
  smartNotifications
} from "@/lib/mockAI";

const capabilities = [
  "Brand outreach assistant",
  "Campaign recommendations",
  "Smart rate suggestions",
  "Contract and usage rights guidance",
  "Deliverable tracking",
  "Automated follow-ups",
  "Campaign reporting",
  "Audience insights",
  "Renewal detection",
  "Relationship intelligence"
];

export default function AIManagerDashboardPage() {
  return (
    <main className="aiPage">
      <header className="aiHero reveal">
        <div>
          <p className="appleEyebrow">AI Manager Dashboard</p>
          <h1>Everyone deserves a good agent.</h1>
          <p>
            A placeholder command center for AI-supported human management: outreach,
            recommendations, deadlines, payment nudges, and next actions. No real AI is connected yet.
          </p>
        </div>
        <Link className="appleCta" href="/ai/recommendations">
          Recommendations
          <ArrowRight size={18} />
        </Link>
      </header>

      <section className="aiMetricGrid reveal">
        <div className="aiMetric">
          <Brain size={20} />
          <span>{aiManagerProfile.trustScore}</span>
          <p>Trust and reputation score</p>
        </div>
        <div className="aiMetric">
          <Sparkles size={20} />
          <span>{aiRecommendations.length}</span>
          <p>Recommended next moves</p>
        </div>
        <div className="aiMetric">
          <Bell size={20} />
          <span>{smartNotifications.length}</span>
          <p>Smart notifications</p>
        </div>
      </section>

      <section className="aiSplit reveal">
        <div className="aiPanel calm">
          <div className="aiPanelTitle">
            <h2>{aiManagerProfile.creatorName}</h2>
            <Sparkles size={18} />
          </div>
          <p>{aiManagerProfile.positioning}</p>
          <div className="aiActionList">
            {aiManagerProfile.nextActions.map((action) => (
              <span key={action}>{action}</span>
            ))}
          </div>
        </div>

        <div className="aiPanel">
          <div className="aiPanelTitle">
            <h2>AI functions</h2>
            <Brain size={18} />
          </div>
          <div className="aiCapabilityGrid">
            {capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="aiPanel reveal">
        <div className="aiPanelTitle">
          <h2>Recommendations feed</h2>
          <LineChart size={18} />
        </div>
        <div className="aiFeed">
          {aiRecommendations.slice(0, 3).map((item) => (
            <article key={item.id}>
              <span>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aiDashboardGrid reveal">
        <Link className="aiNavCard" href="/ai/reports">
          <FileText size={22} />
          <h3>Campaign insights reports</h3>
          <p>Generate closeout summaries, performance metrics, and renewal-ready narratives.</p>
        </Link>
        <Link className="aiNavCard" href="/ai/reputation">
          <ShieldCheck size={22} />
          <h3>Trust and reputation</h3>
          <p>Track contracts, payment timelines, approvals, audit trails, and dispute readiness.</p>
        </Link>
        <Link className="aiNavCard" href="/ai/notifications">
          <Bell size={22} />
          <h3>Smart notifications</h3>
          <p>Surface deadlines, payment nudges, approval reminders, and follow-up timing.</p>
        </Link>
      </section>

      <section className="aiSplit reveal">
        <div className="aiPanel">
          <div className="aiPanelTitle">
            <h2>Payment and approval timeline</h2>
            <FileText size={18} />
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
        <div className="aiPanel">
          <div className="aiPanelTitle">
            <h2>Relationship intelligence</h2>
            <Handshake size={18} />
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
        </div>
      </section>
    </main>
  );
}
