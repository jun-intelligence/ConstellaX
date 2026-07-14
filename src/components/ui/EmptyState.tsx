import type { ReactNode } from "react";

export function EmptyState({
  title = "Nothing here yet",
  body = "Mock data will appear here once this surface has records.",
  action
}: {
  title?: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="emptyState">
      <h3>{title}</h3>
      <p>{body}</p>
      {action}
    </div>
  );
}
