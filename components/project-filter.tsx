"use client";
import { useState } from "react";
import { ProjectGrid } from "@/components/projects";
import { projectFilters, projects } from "@/data/projects";
export function ProjectFilter() {
  const [active, setActive] = useState<string>("All");
  const filtered = projects.filter(
    (project) => active === "All" || project.filterCategory === active,
  );
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter projects">
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="results-caption" role="status">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </div>
      <ProjectGrid key={active} items={filtered} priorityFirst />
    </>
  );
}
