import type { ReactNode } from "react";

export function MetricCard({
  label,
  value,
  note,
  icon
}: {
  label: string;
  value: string;
  note: string;
  icon?: ReactNode;
}) {
  return (
    <article className="systemMetric">
      {icon}
      <span>{value}</span>
      <h3>{label}</h3>
      <p>{note}</p>
    </article>
  );
}
