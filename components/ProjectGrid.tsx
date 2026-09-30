"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";

const FILTERS = ["All", "Blockchain", "Backend", "Mobile", "AI", "DevOps"] as const;

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.tags.includes(filter as Project["tags"][number]));

  return (
    <div>
      <div className="chips" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count =
            f === "All" ? projects.length : projects.filter((p) => p.tags.includes(f as Project["tags"][number])).length;
          if (count === 0) return null;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? "on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f} <span className="mono">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid-projects">
        {shown.map((p) => (
          <article key={p.slug} className="card project">
            <div className="project-top">
              <span className="mono muted small">{p.period}</span>
              <span className="tags">
                {p.tags.map((t) => (
                  <span key={t} className={`tag tag-${t.toLowerCase()}`}>
                    {t}
                  </span>
                ))}
              </span>
            </div>
            <h3>{p.name}</h3>
            <p className="project-tagline">{p.tagline}</p>
            <p className="muted">{p.context}</p>
            <ul className="ticks">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
