import { Bell, FileSignature, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { contracts, payments, trustOperations } from "@/lib/intelligence";

export default function TrustCenterPage() {
  return (
    <AppShell
      eyebrow="Trust and transparency center"
      title="A clear record for every relationship."
      subtitle="Contracts, NDAs, approvals, payment timing, reminders, audit trails, and dispute-ready records in one calm operations center."
    >
      <section className="systemMetricGrid reveal">
        <div className="systemMetric">
          <ShieldCheck size={20} />
          <span>92</span>
          <h3>Trust score</h3>
          <p>Reliability, approvals, contracts, and payments.</p>
        </div>
        <div className="systemMetric">
          <span>0</span>
          <h3>Open disputes</h3>
          <p>Audit trail is ready if needed.</p>
        </div>
        <div className="systemMetric">
          <span>97%</span>
          <h3>On-time delivery</h3>
          <p>Creator reliability signal.</p>
        </div>
      </section>
      <section className="systemSplit reveal">
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>Audit trail visibility</h2>
            <ShieldCheck size={18} />
          </div>
          <div className="trustAuditList">
            {trustOperations.auditTrail.map((item) => (
              <article key={item.event}>
                <span>{item.time}</span>
                <h3>{item.event}</h3>
                <p>{item.actor} / {item.evidence}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="systemPanel">
          <div className="systemPanelTitle">
            <h2>Reminders and overdue risk</h2>
            <Bell size={18} />
          </div>
          <div className="reminderList">
            {trustOperations.reminders.map((item) => (
              <article key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <span>{item.severity} / {item.timing}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="systemPanel reveal">
        <div className="systemPanelTitle">
          <h2>Contracts and payment transparency</h2>
          <FileSignature size={18} />
        </div>
        <DataTable
          columns={["Item", "Party", "Status", "Updated"]}
          rows={[
            ...contracts.map((item) => [item.name, item.party, <StatusBadge key={item.name}>{item.status}</StatusBadge>, item.updated]),
            ...payments.map((item) => [item.name, item.amount, <StatusBadge key={item.name}>{item.status}</StatusBadge>, item.due])
          ]}
        />
      </section>
    </AppShell>
  );
}
