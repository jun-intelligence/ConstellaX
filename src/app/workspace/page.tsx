import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CircleDollarSign,
  FileSignature,
  MessageSquareText,
  PackageCheck,
  Send
} from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { ModularWorkspace } from "@/components/workspace/ModularWorkspace";

const workflowStages = [
  {
    title: "Client outreach",
    owner: "Brand partnerships",
    status: "Complete",
    detail: "Lumina brief request captured with decision owners, target audience, budget range, and launch window.",
    icon: Send
  },
  {
    title: "Campaign brief",
    owner: "Agency operations",
    status: "Complete",
    detail: "Objective, deliverables, usage rights, creator criteria, and payment assumptions moved into one campaign record.",
    icon: BriefcaseBusiness
  },
  {
    title: "Creator selection",
    owner: "AI + manager review",
    status: "In progress",
    detail: "Maya Chen selected; Sofia Lane fee revision awaiting manager response.",
    icon: BadgeCheck
  },
  {
    title: "Contract and NDA",
    owner: "Legal workflow",
    status: "Clear",
    detail: "Primary creator agreement and NDA signed; usage rights rider under review.",
    icon: FileSignature
  },
  {
    title: "Content production",
    owner: "Creator and manager",
    status: "In progress",
    detail: "Concept approved, first cut due, usage asset pack queued after final approval.",
    icon: PackageCheck
  },
  {
    title: "Invoice and payment",
    owner: "Finance",
    status: "Scheduled",
    detail: "Deposit invoice issued, milestone invoice drafted, usage rights balance alert prepared.",
    icon: CircleDollarSign
  }
];

const reportStats = [
  { label: "Reach", value: "8.4M", note: "+18% vs plan" },
  { label: "ER", value: "4.8%", note: "Engagement rate" },
  { label: "Likes", value: "286K", note: "Organic and paid" },
  { label: "Comments", value: "18.2K", note: "Quality discussion" },
  { label: "Saves", value: "42.7K", note: "High purchase intent" },
  { label: "CTR", value: "1.9%", note: "Retail traffic" }
];

const campaignImages = [
  {
    title: "Serum education reel",
    format: "9:16 video",
    status: "First cut",
    palette: "sage"
  },
  {
    title: "Routine carousel",
    format: "5 slides",
    status: "Approved",
    palette: "sky"
  },
  {
    title: "Usage asset pack",
    format: "Paid social",
    status: "Queued",
    palette: "lavender"
  }
];

export default function WorkspaceBuilderPage() {
  return (
    <AppShell
      eyebrow="Campaign workspace"
      title="From outreach to delivery, payment, and report."
      subtitle="A realistic campaign operating room for client outreach, creator selection, contracts, production, approvals, content delivery, invoice tracking, and performance reporting."
    >
      <section className="workspaceFlow reveal">
        {workflowStages.map((stage) => {
          const Icon = stage.icon;

          return (
            <article key={stage.title}>
              <div className="workspaceFlowIcon">
                <Icon size={18} />
              </div>
              <span>{stage.status}</span>
              <h2>{stage.title}</h2>
              <p>{stage.detail}</p>
              <small>{stage.owner}</small>
            </article>
          );
        })}
      </section>

      <section className="workspaceReportGrid reveal">
        <div className="workspaceReportPanel">
          <div className="systemPanelTitle">
            <h2>Campaign report preview</h2>
            <BarChart3 size={18} />
          </div>
          <div className="reportStatGrid">
            {reportStats.map((stat) => (
              <article key={stat.label}>
                <span>{stat.value}</span>
                <h3>{stat.label}</h3>
                <p>{stat.note}</p>
              </article>
            ))}
          </div>
          <div className="reportNarrative">
            <MessageSquareText size={18} />
            <p>
              Report narrative: Maya Chen outperformed on saves and comment quality. Usage
              rights renewal is recommended before the paid social window closes.
            </p>
          </div>
        </div>

        <div className="workspaceReportPanel">
          <div className="systemPanelTitle">
            <h2>Content product mockups</h2>
            <PackageCheck size={18} />
          </div>
          <div className="campaignImageGrid">
            {campaignImages.map((image) => (
              <article className={image.palette} key={image.title}>
                <div>
                  <span>{image.format}</span>
                  <strong>{image.status}</strong>
                </div>
                <h3>{image.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ModularWorkspace />
    </AppShell>
  );
}
