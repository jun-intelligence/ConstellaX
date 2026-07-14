import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  CircleDollarSign,
  FileSignature,
  MessageSquareText,
  ShieldCheck,
  Users
} from "lucide-react";
import { campaigns, formatMoney, getCampaign } from "@/lib/mockProduct";
import { trustOperations } from "@/lib/intelligence";

export function generateStaticParams() {
  return campaigns.map((campaign) => ({
    id: campaign.id
  }));
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = getCampaign(params.id);

  if (!campaign) {
    notFound();
  }

  const remainingBudget = Math.max(
    campaign.budget - campaign.creatorFees - campaign.agencyServiceFee - campaign.platformFee,
    0
  );
  const budgetBreakdown = [
    {
      label: "Creator fees",
      value: campaign.creatorFees,
      note: "Direct creator compensation",
      className: "creator"
    },
    {
      label: "Agency fee",
      value: campaign.agencyServiceFee,
      note: "Campaign operations and management",
      className: "agency"
    },
    {
      label: "Platform fee",
      value: campaign.platformFee,
      note: "ConstellaX workflow and trust layer",
      className: "platform"
    },
    {
      label: "Remaining budget",
      value: remainingBudget,
      note: "Production, contingency, usage, and unallocated spend",
      className: "remaining"
    }
  ].map((item) => ({
    ...item,
    percentage: Math.round((item.value / campaign.budget) * 100)
  }));

  return (
    <main className="workspacePage">
      <header className="workspaceHeader compact">
        <div>
          <Link className="textLink" href="/campaigns">
            <ArrowLeft size={16} />
            Campaigns
          </Link>
          <p className="eyebrow">{campaign.brand} / {campaign.agency}</p>
          <h1>{campaign.name}</h1>
          <p>{campaign.objective}</p>
        </div>
        <span className={`statusPill ${campaign.status}`}>{campaign.status}</span>
      </header>

      <section className="metricGrid" aria-label="Campaign summary">
        <div className="metricTile">
          <CircleDollarSign size={20} />
          <span>{formatMoney(campaign.budget)}</span>
          <p>Campaign budget</p>
        </div>
        <div className="metricTile">
          <Users size={20} />
          <span>{formatMoney(campaign.creatorFees)}</span>
          <p>Creator fees</p>
        </div>
        <div className="metricTile">
          <BadgeCheck size={20} />
          <span>{formatMoney(campaign.agencyServiceFee)}</span>
          <p>Agency service fee</p>
        </div>
        <div className="metricTile">
          <BarChart3 size={20} />
          <span>{campaign.reporting.reach}</span>
          <p>Reported reach</p>
        </div>
      </section>

      <section className="workspacePanel budgetBreakdownPanel reveal" aria-label="Campaign budget percentage breakdown">
        <div className="panelTitle">
          <div>
            <h2>Campaign budget breakdown</h2>
            <p>Illustrative percentage view of budget allocation, fees, and remaining spend.</p>
          </div>
          <CircleDollarSign size={18} />
        </div>
        <div className="budgetTotalRow">
          <span>Total campaign budget</span>
          <strong>{formatMoney(campaign.budget)}</strong>
        </div>
        <div className="budgetStackedBar" aria-label="Budget allocation graph">
          {budgetBreakdown.map((item) => (
            <span
              className={item.className}
              key={item.label}
              style={{ width: `${item.percentage}%` }}
              title={`${item.label}: ${item.percentage}%`}
            />
          ))}
        </div>
        <div className="budgetBreakdownGrid">
          {budgetBreakdown.map((item) => (
            <article className={item.className} key={item.label}>
              <div>
                <span />
                <h3>{item.label}</h3>
              </div>
              <strong>{item.percentage}%</strong>
              <p>{formatMoney(item.value)} / {item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="campaignStatusRail reveal" aria-label="Campaign status visibility">
        {trustOperations.campaignStatus.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.state}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="splitLayout">
        <div className="workspacePanel">
          <div className="panelTitle">
            <h2>Creator shortlist</h2>
            <Users size={18} />
          </div>
          <div className="dataRows">
            {campaign.creatorShortlist.map((creator) => (
              <div className="dataRow" key={creator.name}>
                <div>
                  <strong>{creator.name}</strong>
                  <p>{creator.category} / {creator.manager}</p>
                </div>
                <span>{formatMoney(creator.quotedFee)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="workspacePanel">
          <div className="panelTitle">
            <h2>Reporting dashboard</h2>
            <BarChart3 size={18} />
          </div>
          <div className="reportGrid">
            <div>
              <span>{campaign.reporting.reach}</span>
              <p>Reach</p>
            </div>
            <div>
              <span>{campaign.reporting.engagementRate}</span>
              <p>Engagement</p>
            </div>
            <div>
              <span>{campaign.reporting.deliverablesApproved}/{campaign.reporting.deliverablesTotal}</span>
              <p>Approved deliverables</p>
            </div>
          </div>
        </div>
      </section>

      <section className="splitLayout">
        <div className="workspacePanel">
          <div className="panelTitle">
            <h2>Manager communications</h2>
            <MessageSquareText size={18} />
          </div>
          <div className="communicationFlowList">
            {campaign.managerCommunications.map((item) => (
              <article key={`${item.manager}-${item.topic}`}>
                <div>
                  <strong>{item.topic}</strong>
                  <p>{item.manager} / Last touch: {item.lastTouch}</p>
                </div>
                <span>Next: {item.nextStep}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="workspacePanel">
          <div className="panelTitle">
            <h2>Approval queue</h2>
            <ShieldCheck size={18} />
          </div>
          <div className="approvalQueueList">
            {campaign.approvalQueue.map((item) => (
              <article className={item.state} key={item.item}>
                <div>
                  <strong>{item.item}</strong>
                  <p>{item.owner} owner / Due {item.due}</p>
                </div>
                <span>{item.state.replace("_", " ")}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workspacePanel">
        <div className="panelTitle">
          <h2>Deliverables tracker</h2>
          <BadgeCheck size={18} />
        </div>
        <div className="deliverableTrackerGrid">
          {trustOperations.deliverables.map((item) => (
            <article key={item.item}>
              <span>{item.status}</span>
              <h3>{item.item}</h3>
              <p>{item.owner} / Due {item.due}</p>
              <small>{item.notes}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="workspacePanel">
        <div className="panelTitle">
          <h2>Deal, rights, and fee records</h2>
          <FileSignature size={18} />
        </div>
        <div className="dealObjectGrid">
          {campaign.deals.map((deal) => (
            <article className="dealObject" key={deal.id}>
              <div>
                <h3>{deal.title}</h3>
                <p>{deal.brand.company} / {deal.agency.name} / {deal.manager.name} / {deal.creator.name}</p>
              </div>
              <div className="moneyGrid">
                <span>Campaign {formatMoney(deal.campaignBudget)}</span>
                <span>Creator {formatMoney(deal.creatorFee)}</span>
                <span>Agency {formatMoney(deal.agencyFee)}</span>
                <span>Platform {formatMoney(deal.platformFee)}</span>
                <span>Usage fee tracked separately</span>
                <span>Kill fee documented</span>
              </div>
              <div className="statusStrip">
                <span><CircleDollarSign size={16} /> {deal.paymentStatus.replace("_", " ")}</span>
                <span><FileSignature size={16} /> {deal.contractStatus}</span>
                <span><ShieldCheck size={16} /> {deal.ndaStatus.replace("_", " ")}</span>
              </div>
              <div className="approvalTimeline">
                {Object.entries(deal.approvalTimestamps).map(([label, value]) => (
                  <div key={label}>
                    <strong>{label.replace(/([A-Z])/g, " $1").replace("At", "")}</strong>
                    <span>{value ? new Date(value).toLocaleDateString() : "Pending"}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
