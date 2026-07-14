export function StatusBadge({ children }: { children: string }) {
  return <span className={`systemBadge ${children.toLowerCase().replaceAll(" ", "-")}`}>{children}</span>;
}
