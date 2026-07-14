import Link from "next/link";
import { ArrowRight, Building2, CircleDollarSign } from "lucide-react";
import { agencies, formatMoney } from "@/lib/mockProduct";

export default function AgenciesPage() {
  return (
    <main className="workspacePage">
      <header className="workspaceHeader">
        <div>
          <p className="eyebrow">Agency layer</p>
          <h1>Agencies are supported in the MVP</h1>
          <p>
            Most brand campaigns still move through agencies. This directory keeps that workflow visible
            while the product builds direct collaboration infrastructure for brands, managers, and creators.
          </p>
        </div>
        <Link className="secondaryButton" href="/dashboard/agency">
          Agency dashboard
          <ArrowRight size={18} />
        </Link>
      </header>

      <section className="agencyGrid">
        {agencies.map((agency) => (
          <article className="agencyCard" key={agency.id}>
            <div className="cardIcon">
              <Building2 size={22} />
            </div>
            <div>
              <h2>{agency.name}</h2>
              <p>{agency.location}</p>
            </div>
            <p>{agency.specialty}</p>
            <div className="agencyStats">
              <span>{agency.activeCampaigns} active campaigns</span>
              <span>{formatMoney(agency.managedBudget)} managed</span>
              <span>{agency.serviceFeeRate} service fee</span>
            </div>
            <div className="agencyPosition">
              <CircleDollarSign size={18} />
              <span>{agency.positioning}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
