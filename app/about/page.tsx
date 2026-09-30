import Image from "next/image";
import { Brand } from "@/components/ui";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About",
  "Meet Techno Vision Group: a shared identity for engineering consultancy and construction, with a considered approach from planning to delivery.",
  "/about",
);
export default function About() {
  const areas = [
    "Drawing & Planning",
    "Architectural / Engineering Design",
    "Estimation & Costing",
    "Valuation",
    "Surveying",
    "Project & Construction Supervision",
    "Engineering Consultancy",
    "Building Construction",
    "Construction Services",
    "Construction Materials",
  ];
  const mission = [
    "Provide professional engineering consultancy shaped around each project’s site, purpose and requirements.",
    "Bring technical accuracy and clear coordination to planning, design, estimation, valuation and survey work.",
    "Support responsible construction through practical supervision and careful execution.",
    "Maintain a quality-focused approach from the first discussion through work completed on site.",
    "Keep communication clear and solutions practical for the client and the project.",
  ];
  const objectives = [
    "Deliver dependable engineering consultancy services.",
    "Maintain quality in project planning, design and execution.",
    "Provide practical building construction and related services.",
    "Support safe and responsible construction practices.",
    "Strengthen project supervision and technical coordination.",
    "Improve professional methods as project needs and technical practices evolve.",
  ];

  return (
    <div className="inner-reference page-about">
      <section className="about-title">
        <h1>About Us</h1>
      </section>

      <section className="about-identity">
        <div className="container">
          <div className="about-identity-brand">
            <Brand />
          </div>
          <p className="about-identity-label">TECHNO VISION GROUP</p>
          <h2>Engineering • Consultancy • Construction</h2>
          <div className="about-business-names">
            <span>Techno Vision Engineering Consultancy</span>
            <span>Techno Vision Nirman Sewa</span>
          </div>
        </div>
      </section>

      <section className="about-introduction">
        <div className="container about-reading-grid">
          <div className="about-who-visual">
            <span className="eyebrow">WHO WE ARE</span>
            <figure>
              <div>
                <Image
                  src="/images/optimized/about.webp"
                  alt="Techno Vision Group office building"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 42vw"
                />
              </div>
              <figcaption>Techno Vision Group</figcaption>
              <p className="about-established">
                ESTABLISHED <span aria-hidden="true">•</span> 2017 A.D.
              </p>
            </figure>
          </div>
          <div className="about-prose">
            <p>
              Established in 2017 A.D., Techno Vision Group provides engineering
              consultancy and construction services, bringing technical planning
              and practical on-site execution together. It is the professional
              identity through which Techno Vision Engineering Consultancy and
              Techno Vision Nirman Sewa are presented together, with each
              business retaining its clear area of responsibility.
            </p>
            <p>
              Techno Vision Engineering Consultancy supports projects through
              drawing and planning, architectural and engineering design,
              estimation and costing, valuation, surveying, project planning,
              technical consultation and construction supervision. This work
              helps establish the information, scope and coordination needed
              before and during construction.
            </p>
            <p>
              Techno Vision Nirman Sewa focuses on building construction,
              construction execution, related civil and finishing works, and
              construction materials. Its role is to translate project
              requirements and technical decisions into coordinated work on
              site.
            </p>
            <p>
              Across both businesses, the approach begins with understanding the
              brief and the site. Planning, technical review and execution are
              considered as connected parts of one project journey, with
              attention to clear communication, practical decisions and
              quality-focused engineering and construction work.
            </p>
          </div>
        </div>
      </section>

      <section className="about-companies">
        <div className="container">
          <div className="about-section-heading">
            <span className="eyebrow">OUR BUSINESSES</span>
            <h2>Our Companies</h2>
          </div>
          <div className="about-company-list">
            <article>
              <span className="about-number">01</span>
              <div>
                <h3>Techno Vision Engineering Consultancy</h3>
                <p>
                  Planning, design, estimation, valuation, survey, supervision
                  and professional engineering consultancy for informed project
                  decisions.
                </p>
              </div>
            </article>
            <article>
              <span className="about-number">02</span>
              <div>
                <h3>Techno Vision Nirman Sewa</h3>
                <p>
                  Building construction, construction execution, related works
                  and construction materials coordinated around project needs.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="about-areas">
        <div className="container about-reading-grid">
          <div className="about-section-heading">
            <span className="eyebrow">WHAT WE DO</span>
            <h2>Our Areas of Work</h2>
          </div>
          <ol className="about-area-list">
            {areas.map((area, index) => (
              <li key={area}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{area}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-vision">
        <div className="container about-reading-grid">
          <div className="about-section-heading">
            <span className="eyebrow">OUR DIRECTION</span>
            <h2>Our Vision</h2>
          </div>
          <div className="about-statement">
            <p>
              To contribute to a built environment in Nepal that responds to
              people, respects its context and supports everyday life.
            </p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container about-reading-grid">
          <div className="about-section-heading">
            <span className="eyebrow">HOW WE WORK</span>
            <h2>Our Mission</h2>
            <p>
              To turn project requirements into thoughtful engineering and
              carefully coordinated construction through practical advice and
              close collaboration.
            </p>
          </div>
          <ol className="about-numbered-list">
            {mission.map((item, index) => (
              <li key={item}>
                <span>{index + 1}.</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-objectives">
        <div className="container about-reading-grid">
          <div className="about-section-heading">
            <span className="eyebrow">PRACTICAL PRIORITIES</span>
            <h2>Our Objectives</h2>
          </div>
          <ol className="about-numbered-list">
            {objectives.map((item, index) => (
              <li key={item}>
                <span>{index + 1}.</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-owner">
        <div className="container about-owner-grid">
          <div className="about-owner-image">
            <Image
              src={site.owner.image}
              alt={site.owner.name}
              fill
              sizes="(max-width: 700px) 100vw, 42vw"
            />
          </div>
          <div>
            <span className="eyebrow">OWNER / MANAGEMENT</span>
            <h2>{site.owner.name}</h2>
            <p className="about-owner-title">{site.owner.title}</p>
            <blockquote>
              “Our aim is to give every client a clear and dependable path from
              an engineering idea to work completed on site. By providing both
              consultancy and construction services, we keep decisions
              practical, coordination direct and responsibility close to the
              project.”
            </blockquote>
            <p className="about-owner-company">Techno Vision Group</p>
          </div>
        </div>
      </section>
    </div>
  );
}
