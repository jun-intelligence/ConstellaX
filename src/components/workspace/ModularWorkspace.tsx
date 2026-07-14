"use client";

import { useEffect, useState } from "react";
import { GripVertical, Maximize2, Save } from "lucide-react";
import { workspaceDefaults } from "@/lib/intelligence";

type Widget = (typeof workspaceDefaults)[number];

const storageKey = "creator-os-workspace";

export function ModularWorkspace() {
  const [widgets, setWidgets] = useState<Widget[]>(workspaceDefaults);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      setWidgets(JSON.parse(stored));
    }
  }, []);

  function moveWidget(from: number, to: number) {
    const next = [...widgets];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setWidgets(next);
  }

  function resizeWidget(id: string) {
    setWidgets((current) =>
      current.map((widget) => {
        if (widget.id !== id) return widget;
        const size = widget.size === "small" ? "medium" : widget.size === "medium" ? "large" : "small";
        return { ...widget, size };
      })
    );
  }

  function saveLayout() {
    window.localStorage.setItem(storageKey, JSON.stringify(widgets));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }

  return (
    <section className="workspaceBuilder reveal">
      <div className="workspaceToolbar">
        <div>
          <p className="appleEyebrow">Modular workspace</p>
          <h2>Drag, resize, rearrange, save.</h2>
        </div>
        <button className="builderButton" type="button" onClick={saveLayout}>
          <Save size={18} />
          {saved ? "Saved" : "Save layout"}
        </button>
      </div>

      <div className="builderGrid">
        {widgets.map((widget, index) => (
          <article
            className={`builderWidget ${widget.size}`}
            draggable
            key={widget.id}
            onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => moveWidget(Number(event.dataTransfer.getData("text/plain")), index)}
          >
            <div className="builderWidgetTop">
              <GripVertical size={18} />
              <button type="button" onClick={() => resizeWidget(widget.id)} title="Resize widget">
                <Maximize2 size={16} />
              </button>
            </div>
            <span>{widget.value}</span>
            <h3>{widget.title}</h3>
            <p>{widget.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
