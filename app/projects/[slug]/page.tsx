import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { PageHero, CTA, SectionHeading } from "@/components/ui";
import { ProjectGrid } from "@/components/projects";
import { GalleryGrid } from "@/components/gallery";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project
    ? pageMetadata(project.title, project.overview, `/projects/${slug}`)
    : { title: "Project not found" };
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const company =
    project.business === "Consultancy"
      ? "Techno Vision Engineering Consultancy"
      : "Techno Vision Nirman Sewa";
  const related = projects
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.business === project.business) -
        Number(a.business === project.business),
    )
    .slice(0, 2);
  return (
    <div className="inner-reference page-project-detail">
      <PageHero
        eyebrow="Projects"
        title={project.title}
        description={`${project.category} · ${project.business} · ${project.status}`}
        image={project.image}
        alt={project.alt}
      />
      <section className="section">
        <div className="container">
          <dl className="project-facts">
            {[
              ["Category", project.category],
              ["Status", project.status],
              ["Service company", company],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="editorial-grid project-overview">
            <div>
              <span className="eyebrow">THE PROJECT PERSPECTIVE</span>
              <h2>Overview</h2>
            </div>
            <div className="prose">
              <p>{project.overview}</p>
              <h3>Scope of work & services</h3>
              <ul>
                {project.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <h3>The challenge</h3>
              <p>{project.challenge}</p>
              <h3>The approach</h3>
              <p>{project.approach}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section wash">
        <div className="container">
          <SectionHeading eyebrow="A CLOSER LOOK" title="Project Gallery" />
          <GalleryGrid
            items={project.gallery.map((src, i) => ({
              src,
              alt:
                i === 0
                  ? project.alt
                  : `${project.title} construction progress photograph ${i + 1}`,
            }))}
          />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="CONTINUE EXPLORING"
            title="Related Projects"
          />
          <ProjectGrid items={related} />
        </div>
      </section>
      <CTA />
    </div>
  );
}
