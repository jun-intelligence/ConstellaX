import { ChartNoAxesCombined, TrendingUp, Users } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { AnalyticsWidget } from "@/components/ui/AnalyticsWidget";
import { ChartPlaceholder } from "@/components/ui/ChartPlaceholder";
import { creatorScores } from "@/lib/intelligence";

export default function CreatorAnalyticsPage() {
  return (
    <AppShell
      eyebrow="Creator analytics"
      title="Performance intelligence without noise."
      subtitle="Mock forecasting, audience quality, engagement quality, and adaptation signals."
    >
      <section className="systemMetricGrid reveal">
        <AnalyticsWidget title="Audience quality" value="93" detail="Repeat engagement and save depth." />
        <AnalyticsWidget title="Engagement quality" value="91" detail="Comment depth beats benchmark." />
        <AnalyticsWidget title="Growth forecast" value="+6.2%" detail="Projected next 30 days." />
      </section>
      <section className="systemSplit reveal">
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>Creator scoring</h2>
            <Users size={18} />
          </div>
          <div className="systemRows">
            {creatorScores.map((score) => (
              <article className="systemRow" key={score.creator}>
                <div>
                  <h3>{score.creator}</h3>
                  <p>{score.trend}</p>
                </div>
                <strong>{score.creatorScore}</strong>
              </article>
            ))}
          </div>
        </div>
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>Forecast placeholder</h2>
            <TrendingUp size={18} />
          </div>
          <ChartPlaceholder label="Creator growth forecast chart placeholder" />
          <p>Future intelligence will forecast content performance and audience growth before campaigns launch.</p>
        </div>
      </section>
      <section className="systemPanel reveal">
        <div className="systemPanelTitle">
          <h2>Algorithm insight placeholders</h2>
          <ChartNoAxesCombined size={18} />
        </div>
        <p>Shorter educational hooks and recurring series formats are forecasted to improve completion.</p>
      </section>
    </AppShell>
  );
}
