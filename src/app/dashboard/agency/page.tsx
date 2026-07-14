import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CircleDollarSign,
  FileCheck2,
  MessageSquareText,
  ReceiptText,
  Users
} from "lucide-react";
import { campaigns, formatMoney } from "@/lib/mockProduct";

const activeCampaigns = campaigns.filter((campaign) => campaign.status !== "reporting");
const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
const totalCreatorFees = campaigns.reduce((sum, campaign) => sum + campaign.creatorFees, 0);
const totalAgencyFees = campaigns.reduce((sum, campaign) => sum + campaign.agencyServiceFee, 0);
const totalPlatformFees = campaigns.reduce((sum, campaign) => sum + campaign.platformFee, 0);
const approvalItems = campaigns.flatMap((campaign) =>
  campaign.approvalQueue.map((item) => ({
    ...item,
    campaign: campaign.name
  }))
);
const shortlistedCreators = campaigns.flatMap((campaign) =>
  campaign.creatorShortlist.map((creator) => ({
    ...creator,
    campaign: campaign.name
  }))
);
const managerThreads = campaigns.flatMap((campaign) =>
  campaign.managerCommunications.map((thread) => ({
    ...thread,
    campaign: campaign.name
  }))
);
const deals = campaigns.flatMap((campaign) => campaign.deals.map((deal) => ({ ...deal, campaign: campaign.name })));

export default function AgencyDashboardPage() {
  return (
    <main className="workspacePage">
      <header className="workspaceHeader">
        <div>
          <p className="eyebrow">Agency command center</p>
          <h1>Campaign operating layer</h1>
          <p>
            Agencies stay supported in the MVP because they run much of today&apos;s influencer workflow.
            The same rails also prepare brands, managers, and creators to work directly when appropriate.
          </p>
        </div>
        <Link className="primaryButton" href="/campaigns">
          View campaigns
          <BriefcaseBusiness size={18} />
        </Link>
      </header>

      <section className="metricGrid" aria-label="Agency financial summary">
        <div className="metricTile">
          <BriefcaseBusiness size={20} />
          <span>{activeCampaigns.length}</span>
          <p>Active brand campaigns</p>
        </div>
        <div className="metricTile">
          <CircleDollarSign size={20} />
          <span>{formatMoney(totalBudget)}</span>
          <p>Campaign budgets</p>
        </div>
        <div className="metricTile">
          <Users size={20} />
          <span>{formatMoney(totalCreatorFees)}</span>
          <p>Creator fees</p>
        </div>
        <div className="metricTile">
          <ReceiptText size={20} />
          <span>{formatMoney(totalAgencyFees)}</span>
          <p>Agency service fee</p>
        </div>
        <div className="metricTile">
          <BadgeCheck size={20} />
          <span>{formatMoney(totalPlatformFees)}</span>
          <p>Platform fee</p>
        </div>
        <div className="metricTile">
          <BarChart3 size={20} />
          <span>Live</span>
          <p>Reporting dashboard</p>
        </div>
      </section>

      <section className="splitLayout">
        <div className="workspacePanel">
          <div className="panelTitle">
            <h2>Creator shortlist</h2>
            <Users size={18} />
          </div>
          <div className="dataRows">
            {shortlistedCreators.map((creator) => (
              <div className="dataRow" key={`${creator.campaign}-${creator.name}`}>
                <div>
                  <strong>{creator.name}</strong>
                  <p>{creator.category} for {creator.campaign}</p>
                </div>
                <span>{creator.fitScore}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="workspacePanel">
          <div className="panelTitle">
            <h2>Manager communications</h2>
            <MessageSquareText size={18} />
          </div>
          <div className="dataRows">
            {managerThreads.map((thread) => (
              <div className="dataRow" key={`${thread.campaign}-${thread.manager}`}>
                <div>
                  <strong>{thread.manager}</strong>
                  <p>{thread.topic} / {thread.nextStep}</p>
                </div>
                <span>{thread.lastTouch}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="workspacePanel">
        <div className="panelTitle">
          <h2>Approval queue</h2>
          <FileCheck2 size={18} />
        </div>
        <div className="queueGrid">
          {approvalItems.map((item) => (
            <div className="queueItem" key={`${item.campaign}-${item.item}`}>
              <span className={`statusPill ${item.state}`}>{item.state.replace("_", " ")}</span>
              <h3>{item.item}</h3>
              <p>{item.campaign} / {item.owner} / due {item.due}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="workspacePanel">
        <div className="panelTitle">
          <h2>Contracts, NDAs, invoices, and payments</h2>
          <ReceiptText size={18} />
        </div>
        <div className="dealTable">
          <div className="dealTableHead">
            <span>Deal</span>
            <span>Parties</span>
            <span>Contract</span>
            <span>NDA</span>
            <span>Payment</span>
          </div>
          {deals.map((deal) => (
            <div className="dealTableRow" key={deal.id}>
              <span>{deal.title}</span>
              <span>{deal.brand.company} / {deal.creator.name}</span>
              <span>{deal.contractStatus}</span>
              <span>{deal.ndaStatus.replace("_", " ")}</span>
              <span>{deal.paymentStatus.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
