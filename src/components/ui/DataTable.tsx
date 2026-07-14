import type { ReactNode } from "react";
import { EmptyState } from "./EmptyState";

export function DataTable({
  columns,
  rows
}: {
  columns: string[];
  rows: Array<Array<ReactNode>>;
}) {
  if (rows.length === 0) {
    return <EmptyState title="No records yet" body="This table is ready for data once the workflow has activity." />;
  }

  return (
    <div className="systemTable">
      <div className="systemTableHead" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      {rows.map((row, index) => (
        <div className="systemTableRow" key={index} style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
          {row.map((cell, cellIndex) => (
            <span key={cellIndex}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
