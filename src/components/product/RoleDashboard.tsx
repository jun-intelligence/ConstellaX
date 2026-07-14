import Link from "next/link";
import { ArrowRight, CircleDollarSign, Sparkles, Users } from "lucide-react";
import { intelligenceFeed, roleDashboards, type Role } from "@/lib/intelligence";
import { AIRecommendationCard } from "@/components/ui/AIRecommendationCard";
import { AppShell } from "@/components/ui/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function RoleDashboard({ role }: { role: Role }) {
  const dashboard = roleDashboards[role];

  return (
    <AppShell
      eyebrow={`${role} operating room`}
      title={dashboard.title}
      subtitle={dashboard.subtitle}
      action={
        <Link className="appleCta" href="/workspace">
          Customize workspace
          <ArrowRight size={18} />
        </Link>
      }
    >
      <section className="systemMetricGrid reveal">
        {dashboard.metrics.map((metric, index) => (
          <MetricCard
            icon={index === 0 ? <CircleDollarSign size={20} /> : index === 1 ? <Users size={20} /> : <Sparkles size={20} />}
            key={metric.label}
            {...metric}
          />
        ))}
      </section>

      <section className="systemSplit reveal">
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>Priority queue</h2>
          </div>
          <div className="systemRows">
            {dashboard.priorities.length === 0 ? (
              <EmptyState title="No priorities" body="AI and workflow recommendations will appear here." />
            ) : (
              dashboard.priorities.map((item) => (
                <article className="systemRow" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <StatusBadge>{item.status}</StatusBadge>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>AI intelligence feed</h2>
          </div>
          <div className="systemRows">
            {intelligenceFeed.slice(0, 3).map((item) => (
              <AIRecommendationCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
