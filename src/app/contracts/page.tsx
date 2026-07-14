import { FileSignature } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { contracts, trustOperations } from "@/lib/intelligence";

export default function ContractsVaultPage() {
  return (
    <AppShell
      eyebrow="Contracts vault"
      title="Contracts and NDAs, organized for trust."
      subtitle="Mock document vault for usage rights, contract status, NDA status, and approval history."
    >
      <section className="documentClarityGrid reveal">
        {trustOperations.documents.map((item) => (
          <article key={item.document}>
            <span>{item.status}</span>
            <h2>{item.document}</h2>
            <p>{item.clarity}</p>
            <small>Owner: {item.owner}</small>
          </article>
        ))}
      </section>

      <section className="systemPanel reveal">
        <div className="systemPanelTitle">
          <h2>Vault records</h2>
          <FileSignature size={18} />
        </div>
        <DataTable
          columns={["Document", "Party", "Status", "Updated"]}
          rows={contracts.map((item) => [item.name, item.party, <StatusBadge key={item.name}>{item.status}</StatusBadge>, item.updated])}
        />
      </section>
    </AppShell>
  );
}
