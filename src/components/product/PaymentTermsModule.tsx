import { AlertCircle, CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { paymentTerms } from "@/lib/intelligence";

export function PaymentTermsModule() {
  return (
    <section className="paymentTermsModule reveal">
      <div className="paymentTermsHero">
        <div>
          <p className="appleEyebrow">Flexible Payment Terms</p>
          <h2>{paymentTerms.deal}</h2>
          <p>{paymentTerms.role}</p>
        </div>
        <div className="paymentPartyStack" aria-label="Payment participants">
          {paymentTerms.parties.map((party) => (
            <span key={party}>{party}</span>
          ))}
        </div>
      </div>

      <div className="paymentTermsGrid">
        {paymentTerms.terms.map((term) => (
          <article className="paymentTermCard" key={term.label}>
            <span>{term.value}</span>
            <h3>{term.label}</h3>
            <p>{term.detail}</p>
          </article>
        ))}
      </div>

      <div className="paymentOpsGrid">
        <article className="paymentOpsPanel">
          <div className="systemPanelTitle">
            <h2>Payment timeline</h2>
            <Clock3 size={18} />
          </div>
          <div className="paymentTimeline">
            {paymentTerms.timeline.map((item) => (
              <div key={item.label}>
                <span>{item.date}</span>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
                <StatusBadge>{item.status}</StatusBadge>
              </div>
            ))}
          </div>
        </article>

        <article className="paymentOpsPanel">
          <div className="systemPanelTitle">
            <h2>Approval timestamps</h2>
            <CheckCircle2 size={18} />
          </div>
          <div className="approvalStampList">
            {paymentTerms.approvals.map((approval) => (
              <div key={`${approval.party}-${approval.timestamp}`}>
                <strong>{approval.party}</strong>
                <span>{approval.timestamp}</span>
                <p>{approval.status}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="paymentOpsGrid compact">
        <article className="paymentOpsPanel">
          <div className="systemPanelTitle">
            <h2>Invoice status and alerts</h2>
            <AlertCircle size={18} />
          </div>
          <div className="invoiceStatusList">
            {paymentTerms.invoiceStatus.map((invoice) => (
              <div key={invoice.label}>
                <FileText size={18} />
                <div>
                  <h3>{invoice.label}</h3>
                  <p>{invoice.detail}</p>
                </div>
                <StatusBadge>{invoice.state}</StatusBadge>
              </div>
            ))}
          </div>
        </article>

        <article className="paymentOpsPanel trust">
          <div className="systemPanelTitle">
            <h2>Optional trust indicators</h2>
            <ShieldCheck size={18} />
          </div>
          <div className="trustIndicatorList">
            {paymentTerms.trustIndicators.map((indicator) => (
              <span key={indicator}>
                <ShieldCheck size={16} />
                {indicator}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
