import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui";
import { type Project } from "@/data/projects";
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} className="project-image">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 40vw"
        />
        <span className="image-arrow">
          <Arrow diagonal />
        </span>
      </Link>
      <div className="project-meta">
        <span>
          {project.category} / {project.business}
        </span>
        <span>{project.status}</span>
      </div>
      <h3>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="project-company">
        {project.business === "Consultancy"
          ? "Techno Vision Engineering Consultancy"
          : "Techno Vision Nirman Sewa"}
      </p>
      <Link href={`/projects/${project.slug}`} className="project-detail-link">
        More Details
      </Link>
    </article>
  );
}
export function ProjectGrid({
  items,
  priorityFirst = false,
}: {
  items: Project[];
  priorityFirst?: boolean;
}) {
  return (
    <div className="project-grid">
      {items.map((p, index) => (
        <ProjectCard
          key={p.slug}
          project={p}
          priority={priorityFirst && index < 3}
        />
      ))}
    </div>
  );
}
