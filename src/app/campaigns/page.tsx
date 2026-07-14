import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, CircleDollarSign, ShieldCheck } from "lucide-react";
import { campaigns, formatMoney } from "@/lib/mockProduct";
import { trustOperations } from "@/lib/intelligence";

export default function CampaignsPage() {
  return (
    <main className="workspacePage">
      <header className="workspaceHeader">
        <div>
          <p className="eyebrow">Campaigns</p>
          <h1>Brand campaigns with agency support</h1>
          <p>
            Campaign records show budgets, fees, approval ownership, contracts, invoices,
            payments, deliverables, reminders, and audit trails in one reliable view.
          </p>
        </div>
      </header>

      <section className="campaignOpsStrip reveal" aria-label="Campaign workflow status">
        {trustOperations.campaignStatus.map((item) => (
          <article key={item.label}>
            <ShieldCheck size={18} />
            <span>{item.state}</span>
            <h2>{item.label}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="campaignList">
        {campaigns.map((campaign) => (
          <Link className="campaignRow" href={`/campaigns/${campaign.id}`} key={campaign.id}>
            <div className="cardIcon">
              <BriefcaseBusiness size={22} />
            </div>
            <div>
              <h2>{campaign.name}</h2>
              <p>{campaign.brand} / {campaign.agency} / {campaign.timeline}</p>
            </div>
            <div className="campaignNumbers">
              <span>
                <CircleDollarSign size={16} />
                {formatMoney(campaign.budget)}
              </span>
              <span>
                <BarChart3 size={16} />
                {campaign.reporting.engagementRate}
              </span>
            </div>
            <span className={`statusPill ${campaign.status}`}>{campaign.status}</span>
            <ArrowRight size={18} />
          </Link>
        ))}
      </section>
    </main>
  );
}
