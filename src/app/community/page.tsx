import { Network, ShieldCheck, Users } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { communityLayer } from "@/lib/mockOperatingSystem";

export default function CommunityPreviewPage() {
  return (
    <AppShell
      eyebrow="Community preview"
      title="A future social layer built on trust."
      subtitle="This is not an influencer marketplace. The community layer stays future-facing while the MVP focuses on trusted workflow infrastructure."
    >
      <section className="systemMetricGrid reveal">
        <div className="systemMetric">
          <Users size={20} />
          <span>5</span>
          <h3>Participant types</h3>
          <p>Creators, managers, agencies, brands, and audiences.</p>
        </div>
        <div className="systemMetric">
          <ShieldCheck size={20} />
          <span>High</span>
          <h3>Trust requirement</h3>
          <p>Reputation comes from real work and transparent records.</p>
        </div>
        <div className="systemMetric">
          <Network size={20} />
          <span>Later</span>
          <h3>Social layer</h3>
          <p>Community follows infrastructure, not the other way around.</p>
        </div>
      </section>
      <section className="systemPanel reveal">
        <h2>Future signals</h2>
        <div className="systemPills">
          {communityLayer.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
