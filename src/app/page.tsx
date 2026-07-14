import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CircleDollarSign,
  FileSignature,
  ListChecks,
  MessageSquareText,
  ShieldCheck
} from "lucide-react";
import { trustOperations } from "@/lib/intelligence";

const operatingPillars = [
  {
    title: "Trust",
    detail: "Contracts, NDAs, approvals, invoices, and usage rights stay tied to the campaign record.",
    icon: ShieldCheck
  },
  {
    title: "Transparency",
    detail: "Every party sees status, timestamps, payment timing, document state, and open responsibilities.",
    icon: ListChecks
  },
  {
    title: "Campaign Workflow",
    detail: "Briefs, creator-manager communication, deliverables, approvals, and reporting move in one calm flow.",
    icon: BriefcaseBusiness
  }
];

const workflowCards = [
  { label: "Payment timeline", value: "4 events", note: "Deposit, invoice, milestone, balance", icon: CircleDollarSign },
  { label: "Approvals", value: "6 records", note: "Brand, agency, manager, creator", icon: ShieldCheck },
  { label: "Contracts and NDAs", value: "Clear", note: "Rights and document status visible", icon: FileSignature },
  { label: "Reminders", value: "3 active", note: "Due dates and overdue risk alerts", icon: Bell }
];

export default function Home() {
  return (
    <main className="trustHome">
      <section className="trustHero reveal">
        <div>
          <p className="appleEyebrow">ConstellaX</p>
          <h1>Trusted infrastructure for the business of influence.</h1>
          <p>
            A calming operating layer for campaigns, approvals, contracts, usage rights,
            invoices, payments, reminders, and audit trails. Not a flashy influencer app.
          </p>
          <div className="trustHeroActions">
            <Link className="appleCta" href="/demo">
              Run investor workflow
              <ArrowRight size={18} />
            </Link>
            <Link className="brandSecondaryLink" href="/campaigns/lumina-spring-launch">
              View campaign record
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="trustCommandPanel" aria-label="Campaign operations summary">
          <div className="trustCommandHeader">
            <span>Lumina Spring Launch</span>
            <strong>Operational record healthy</strong>
          </div>
          <div className="trustStatusStack">
            {trustOperations.campaignStatus.map((item) => (
              <article key={item.label}>
                <div>
                  <span>{item.label}</span>
                  <p>{item.detail}</p>
                </div>
                <strong>{item.state}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trustPillarGrid reveal">
        {operatingPillars.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <article className="trustPillar" key={pillar.title}>
              <Icon size={22} />
              <h2>{pillar.title}</h2>
              <p>{pillar.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="trustWorkflowBand reveal">
        <div>
          <p className="appleEyebrow">Workflow Visibility</p>
          <h2>Everyone knows what is approved, what is owed, and what happens next.</h2>
          <p>
            ConstellaX is designed to lower anxiety in high-value creator work. It makes
            obligations visible, records decisions, separates fee components, and keeps
            reminders attached to the campaign instead of buried in messages.
          </p>
        </div>
        <div className="trustWorkflowGrid">
          {workflowCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.label}>
                <Icon size={18} />
                <span>{card.value}</span>
                <h3>{card.label}</h3>
                <p>{card.note}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="trustOpsSplit reveal">
        <div className="trustOpsPanel">
          <div className="systemPanelTitle">
            <h2>Creator-manager communication</h2>
            <MessageSquareText size={18} />
          </div>
          <div className="trustCommunicationList">
            {trustOperations.communications.map((item) => (
              <article key={`${item.from}-${item.topic}`}>
                <span>{item.role}</span>
                <h3>{item.topic}</h3>
                <p>{item.detail}</p>
                <small>{item.from} / {item.lastTouch} / Next: {item.nextStep}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="trustOpsPanel">
          <div className="systemPanelTitle">
            <h2>Audit trail</h2>
            <ShieldCheck size={18} />
          </div>
          <div className="trustAuditList">
            {trustOperations.auditTrail.slice(0, 4).map((item) => (
              <article key={item.event}>
                <span>{item.time}</span>
                <h3>{item.event}</h3>
                <p>{item.actor} / {item.evidence}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trustFinalCta reveal">
        <h2>Enterprise-ready does not need to feel cold.</h2>
        <p>
          The product should feel steady: structured enough for brands and agencies,
          transparent enough for managers, and reassuring enough for creators.
        </p>
        <Link className="appleCta" href="/payments">
          Review payment transparency
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
