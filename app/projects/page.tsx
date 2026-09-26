import { PageHero, CTA } from "@/components/ui";
import { ProjectFilter } from "@/components/project-filter";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Projects",
  "Explore ongoing and completed residential construction and renovation work by Techno Vision Nirman Sewa.",
  "/projects",
);
export default function Projects() {
  return (
    <div className="inner-reference page-projects">
      <PageHero
        eyebrow="Projects"
        title="Where ideas take shape."
        description="A closer look at the possibilities across engineering, design and construction."
      />
      <section className="section">
        <div className="container">
          <p className="demo-note">
            Ongoing construction, completed residences and renovation work from
            the Techno Vision portfolio.
          </p>
          <ProjectFilter />
        </div>
      </section>
      <CTA />
    </div>
  );
}
