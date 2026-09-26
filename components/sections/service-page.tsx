import {
  PageHero,
  SectionHeading,
  ServiceIcon,
  Process,
  CTA,
} from "@/components/ui";
import { ProjectGrid } from "@/components/projects";
import { companies } from "@/data/site";
import { consultancyServices, constructionServices } from "@/data/services";
import { projects } from "@/data/projects";
export function ServicePage({
  kind,
}: {
  kind: "consultancy" | "construction";
}) {
  const isConsultancy = kind === "consultancy";
  const company = companies[isConsultancy ? 0 : 1];
  const services = isConsultancy ? consultancyServices : constructionServices;
  const relatedProjects = projects.filter(
    (project) =>
      project.business === (isConsultancy ? "Consultancy" : "Construction"),
  );
  return (
    <div className={`inner-reference page-service page-service-${kind}`}>
      <PageHero
        eyebrow={company.short}
        title={company.name}
        description={
          isConsultancy
            ? "From the first question to a coordinated design. Practical engineering guidance for confident project decisions."
            : "Turning considered plans into carefully executed spaces. Construction services that connect the whole project."
        }
        image={company.image}
        alt={company.alt}
      />
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <span className="eyebrow">
              {isConsultancy
                ? "THE THINKING BEFORE THE BUILD"
                : "BRINGING THE PLAN TO LIFE"}
            </span>
            <h2>
              {isConsultancy
                ? "Clarity at the drawing board."
                : "Care at every stage on site."}
            </h2>
          </div>
          <div className="prose">
            <p>
              {isConsultancy
                ? "Every good project begins with a clear understanding of its purpose, site and constraints. Techno Vision Engineering Consultancy brings planning, design, technical analysis and supervision into a coordinated process."
                : "Construction is where design decisions meet materials, people and the realities of a site. Techno Vision Nirman Sewa focuses on buildings, civil works and project execution, with attention to coordination and the finished result."}
            </p>
            <p>
              {isConsultancy
                ? "Whether you are exploring a new idea or preparing for construction, we help define the scope and develop the technical information your project needs."
                : "From new residential and commercial spaces to renovation and infrastructure works, the approach begins with understanding the brief and planning the work around it."}
            </p>
          </div>
        </div>
      </section>
      <section className="section wash" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="OUR CAPABILITIES"
            title={
              isConsultancy
                ? "Engineering Consultancy Services"
                : "Construction Services"
            }
          />
          <div className="services-grid">
            {services.map((s, i) => (
              <article className="service-card" key={s.title}>
                <div>
                  <ServiceIcon type={s.icon} />
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="A COORDINATED PROCESS"
            title={
              isConsultancy
                ? "From insight to oversight."
                : "From preparation to handover."
            }
          />
          <Process
            steps={
              isConsultancy
                ? ["Consult", "Survey", "Plan", "Design", "Review", "Supervise"]
                : [
                    "Planning",
                    "Preparation",
                    "Construction",
                    "Quality Review",
                    "Handover",
                  ]
            }
          />
        </div>
      </section>
      {relatedProjects.length > 0 && (
        <section className="section wash">
          <div className="container">
            <SectionHeading
              eyebrow="RELATED PROJECT PERSPECTIVES"
              title="Possibilities in practice."
            />
            <p className="demo-note">
              Explore ongoing and completed work delivered by Techno Vision.
            </p>
            <ProjectGrid items={relatedProjects} />
          </div>
        </section>
      )}
      <CTA
        title={
          isConsultancy
            ? "Planning a project? Let’s discuss it."
            : "Ready to take your project forward?"
        }
      />
    </div>
  );
}
