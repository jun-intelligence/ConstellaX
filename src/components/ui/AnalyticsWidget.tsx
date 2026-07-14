export function AnalyticsWidget({
  title,
  value,
  detail
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="analyticsWidget">
      <span>{value}</span>
      <h3>{title}</h3>
      <p>{detail}</p>
      <div className="chartLine" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    </article>
  );
}
