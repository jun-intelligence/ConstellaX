import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  CircleDollarSign,
  FileSignature,
  ListChecks
} from "lucide-react";
import { AIRecommendationCard } from "@/components/ui/AIRecommendationCard";
import { AppShell } from "@/components/ui/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { demoFlow, demoMetrics, demoNarrative } from "@/lib/demoFlow";
import { intelligenceFeed } from "@/lib/intelligence";

const icons = [BriefcaseBusiness, Brain, BadgeCheck, FileSignature, ListChecks, CircleDollarSign, Brain];

export default function DemoPage() {
  return (
    <AppShell
      eyebrow="ConstellaX investor demo"
      title="Everyone deserves a good agent."
      subtitle="A five-minute investor flow showing how ConstellaX becomes trusted infrastructure for creator work: campaign intelligence, AI-supported human management, transparent approvals, flexible payment terms, and final reporting."
      action={
        <Link className="appleCta" href="/campaigns/lumina-spring-launch">
          Open campaign
          <ArrowRight size={18} />
        </Link>
      }
    >
      <section className="systemMetricGrid reveal">
        {demoMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="systemMetricGrid reveal" aria-label="Investor narrative">
        {demoNarrative.map((item) => (
          <article className="systemMetric demoNarrativeCard" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="demoTimeline reveal" aria-label="Five minute investor demo flow">
        {demoFlow.map((item, index) => {
          const Icon = icons[index];

          return (
            <article className="demoStep" key={item.step}>
              <div className="demoStepMarker">
                <Icon size={20} />
                <span>{item.step}</span>
              </div>
              <div>
                <p className="appleEyebrow">{item.owner}</p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <div className="demoStepDetails">
                  {item.details.map((detail) => (
                    <StatusBadge key={detail}>{detail}</StatusBadge>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="systemSplit reveal">
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>AI recommendation snapshot</h2>
            <Brain size={18} />
          </div>
          <div className="systemRows">
            {intelligenceFeed.slice(0, 3).map((item) => (
              <AIRecommendationCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="systemPanel demoScript">
          <h2>Talk track</h2>
          <p>
            The investor story is simple: ConstellaX gives every creator access to the leverage
            of a good agent while helping managers, agencies, and brands operate from the same
            trusted record. The platform does not force deal economics. It makes negotiated work
            transparent, accountable, and easier to renew.
          </p>
          <Link className="osSecondaryLink" href="/trust">
            Show trust center
            <ArrowRight size={18} />
          </Link>
          <Link className="osSecondaryLink" href="/payments">
            Show payments
            <ArrowRight size={18} />
          </Link>
          <Link className="osSecondaryLink" href="/ai/reports">
            Show final report
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
