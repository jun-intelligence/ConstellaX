import { Bell, CircleDollarSign } from "lucide-react";
import { PaymentTermsModule } from "@/components/product/PaymentTermsModule";
import { AppShell } from "@/components/ui/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { payments, paymentTerms, trustOperations } from "@/lib/intelligence";

export default function PaymentsCenterPage() {
  return (
    <AppShell
      eyebrow="Payments center"
      title="Flexible terms. Clear records. Protected relationships."
      subtitle="ConstellaX supports negotiated payment structures between creators, managers, agencies, and brands. The platform documents terms, approvals, invoices, alerts, and timelines without rigid financial enforcement."
    >
      <section className="systemMetricGrid reveal">
        {paymentTerms.metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <PaymentTermsModule />

      <section className="systemPanel reveal">
        <div className="systemPanelTitle">
          <h2>Overdue alerts and reminders</h2>
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
      </section>

      <section className="systemPanel reveal">
        <div className="systemPanelTitle">
          <h2>Payment records</h2>
          <CircleDollarSign size={18} />
        </div>
        <DataTable
          columns={["Payment", "Amount", "Status", "Due"]}
          rows={payments.map((item) => [item.name, item.amount, <StatusBadge key={item.name}>{item.status}</StatusBadge>, item.due])}
        />
      </section>
    </AppShell>
  );
}
