import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  LayoutGrid,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import {
  demoAgencies,
  demoBrands,
  demoCreators,
  intelligenceFeed
} from "@/lib/intelligence";
import {
  aiAgentSystem,
  brandIntelligence,
  communityLayer,
  creatorIntelligence,
  workspaceWidgets
} from "@/lib/mockOperatingSystem";

const systems = [
  {
    title: "Brand Intelligence Engine",
    description: "Creator ranking, audience fit, ROI potential, and trust scoring for campaigns.",
    icon: Radar
  },
  {
    title: "Creator Intelligence Layer",
    description: "Trend monitoring, algorithm awareness, forecasting, growth prediction, and adaptation guidance.",
    icon: Brain
  },
  {
    title: "AI Agent System",
    description: "A virtual talent manager for outreach, follow-ups, reporting, campaign insights, and negotiation.",
    icon: Sparkles
  },
  {
    title: "Modular Workspace System",
    description: "Dashboard blocks inspired by Notion and iPhone widgets, ready for user customization.",
    icon: LayoutGrid
  },
  {
    title: "Future Community Layer",
    description: "A high-trust ecosystem for creators, brands, managers, agencies, and audiences.",
    icon: Network
  }
];

export default function OperatingSystemPage() {
  return (
    <main className="osPage">
      <header className="osHero reveal">
        <p className="appleEyebrow">Intelligent Creator Operating System</p>
        <h1>Everyone deserves a good agent.</h1>
        <p>
          A mock architecture for trusted creator infrastructure: campaign intelligence,
          AI-supported human management, negotiated workflows, payment clarity, and calm
          operating rooms for creators, managers, agencies, and brands.
        </p>
        <Link className="appleCta" href="/dashboard/ai-manager">
          Open AI manager
          <ArrowRight size={18} />
        </Link>
      </header>

      <section className="osSystemGrid reveal" aria-label="Operating system architecture">
        {systems.map((system) => {
          const Icon = system.icon;

          return (
            <article className="osSystemCard" key={system.title}>
              <Icon size={22} />
              <h2>{system.title}</h2>
              <p>{system.description}</p>
            </article>
          );
        })}
      </section>

      <section className="osFeatureSplit reveal">
        <div className="osFeatureCopy">
          <p className="appleEyebrow">Brand Intelligence Engine</p>
          <h2>Recommend the right creator before the brief goes live.</h2>
          <p>
            Analyze audience demographics, engagement quality, creator-brand compatibility,
            ROI potential, and reliability signals.
          </p>
        </div>
        <div className="osRankList">
          {brandIntelligence.rankedCreators.map((creator, index) => (
            <article key={creator.name}>
              <span>{index + 1}</span>
              <div>
                <h3>{creator.name}</h3>
                <p>{creator.category} / {creator.engagementQuality}</p>
              </div>
              <strong>{creator.compatibility}</strong>
              <small>{creator.roiPotential} ROI / trust {creator.trustScore}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="osFeatureSplit reverse reveal">
        <div className="osSignalPanel">
          <div>
            <ChartNoAxesCombined size={22} />
            <h3>{creatorIntelligence.trend}</h3>
          </div>
          <p>{creatorIntelligence.algorithmUpdate}</p>
          <p>{creatorIntelligence.forecast}</p>
          <p>{creatorIntelligence.growthPrediction}</p>
        </div>
        <div className="osFeatureCopy">
          <p className="appleEyebrow">Creator Intelligence Layer</p>
          <h2>Help creators adapt before performance shifts.</h2>
          <div className="osPillList">
            {creatorIntelligence.recommendations.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="osFeatureBand reveal">
        <div>
          <p className="appleEyebrow">AI Agent System</p>
          <h2>A calm agent layer that supports people, not replaces them.</h2>
        </div>
        <div className="osAgentGrid">
          {aiAgentSystem.map((item) => (
            <span key={item}>
              <Sparkles size={16} />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="systemSplit reveal">
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>Mock creator network</h2>
          </div>
          <div className="systemRows">
            {demoCreators.map((creator) => (
              <article className="systemRow" key={creator.name}>
                <div>
                  <h3>{creator.name}</h3>
                  <p>{creator.niche} / {creator.audience} audience / {creator.manager}</p>
                </div>
                <strong>{creator.trustScore}</strong>
              </article>
            ))}
          </div>
        </div>
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>Mock brand and agency graph</h2>
          </div>
          <div className="systemRows">
            {demoBrands.map((brand) => (
              <article className="systemRow" key={brand.name}>
                <div>
                  <h3>{brand.name}</h3>
                  <p>{brand.category} / {brand.activeCampaigns} active campaigns / {brand.approvalSpeed} approvals</p>
                </div>
                <strong>{brand.paymentReliability}</strong>
              </article>
            ))}
            {demoAgencies.map((agency) => (
              <article className="systemRow" key={agency.name}>
                <div>
                  <h3>{agency.name}</h3>
                  <p>{agency.focus} / {agency.managedBudget} managed</p>
                </div>
                <strong>{agency.approvalSla}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="systemPanel reveal">
        <div className="systemPanelTitle">
          <h2>Intelligence feed</h2>
        </div>
        <div className="systemRows">
          {intelligenceFeed.map((item) => (
            <article className="systemRow" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <strong>{item.score}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="osWorkspace reveal">
        <div className="osFeatureCopy centered">
          <p className="appleEyebrow">Modular Workspace System</p>
          <h2>Dashboards become personal operating rooms.</h2>
          <p>
            Drag-and-drop customization comes later. For now, these mock widgets define the block architecture.
          </p>
        </div>
        <div className="osWidgetGrid">
          {workspaceWidgets.map((widget) => (
            <article className="osWidget" key={widget.title}>
              <Boxes size={18} />
              <span>{widget.value}</span>
              <h3>{widget.title}</h3>
              <p>{widget.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="osCommunity reveal">
        <div>
          <p className="appleEyebrow">Future Community Layer</p>
          <h2>A high-trust social ecosystem, built on business truth.</h2>
          <p>
            Community arrives after the operating layer. The MVP stays focused on verified
            workflows, trusted relationships, and audience signals around real creator work.
          </p>
        </div>
        <div className="osCommunitySignals">
          {communityLayer.map((item) => (
            <span key={item}>
              <ShieldCheck size={16} />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="osFinal reveal">
        <Users size={24} />
        <h2>From deal management to intelligent infrastructure.</h2>
        <p>Creators, managers, brands, agencies, and audiences eventually share one trusted system.</p>
        <div className="osFinalActions">
          <Link className="appleCta" href="/campaigns">
            Campaigns
            <CircleDollarSign size={18} />
          </Link>
          <Link className="osSecondaryLink" href="/workspace">
            Workspace builder
            <ArrowRight size={18} />
          </Link>
          <Link className="osSecondaryLink" href="/trust">
            Trust center
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
