import Image from "next/image";
import Link from "next/link";
import { Companies } from "@/components/sections/companies";
import { ServiceIcon } from "@/components/ui";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const services = [
  {
    title: "Engineering & Design",
    icon: "plan",
    href: "/services/engineering-consultancy",
  },
  {
    title: "Survey & Estimation",
    icon: "survey",
    href: "/services/engineering-consultancy",
  },
  {
    title: "Project Supervision",
    icon: "structure",
    href: "/services/engineering-consultancy",
  },
  {
    title: "Residential Construction",
    icon: "home",
    href: "/services/construction",
  },
  {
    title: "Construction & Civil Works",
    icon: "build",
    href: "/services/construction",
  },
  {
    title: "Renovation & Finishing",
    icon: "finish",
    href: "/services/construction",
  },
];

export function HomeContent() {
  return (
    <div className="home-reference">
      <section className="reference-page-title" aria-labelledby="home-title">
        <h1 id="home-title">Home</h1>
      </section>

      <section className="reference-hero" aria-labelledby="home-hero-title">
        <Image
          src="/images/optimized/complete-3.webp"
          alt="Completed residence by Techno Vision Nirman Sewa"
          fill
          priority
          sizes="(max-width: 1160px) 100vw, 1120px"
        />
        <div className="reference-hero-shade" />
        <div className="reference-hero-copy">
          <p className="reference-kicker">TECHNO VISION GROUP</p>
          <h2 id="home-hero-title">
            Engineering Ideas.
            <br />
            Building Reality.
          </h2>
          <p>
            Thoughtful engineering. Purposeful construction. Bringing your
            vision to life, from concept to completion.
          </p>
          <div className="reference-hero-actions">
            <Link href="#services" className="reference-button">
              Learn More
            </Link>
            <Link href="/projects" className="reference-button is-ghost">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="reference-story" id="introduction">
        <div className="reference-shell reference-story-grid">
          <div className="reference-story-image">
            <Image
              src="/images/optimized/project-3.webp"
              alt="Reinforcement preparation during residential construction"
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
            />
          </div>
          <div className="reference-story-copy">
            <p className="reference-kicker is-blue">A CONNECTED APPROACH</p>
            <h2>Our Story</h2>
            <p>
              Techno Vision Group brings together engineering consultancy and
              construction under one professional identity. Two complementary
              businesses. One considered journey from your first idea to the
              spaces you build.
            </p>
            <p>
              A successful project connects people, ideas and expertise. We
              bring the design conversation and construction process closer
              together, with clear priorities and attention to detail.
            </p>
            <Link href="/about" className="reference-outline-link">
              More About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="reference-services" id="services">
        <div className="reference-shell">
          <p className="reference-kicker">WHAT WE DO</p>
          <h2>Our Services</h2>
          <p className="reference-section-intro">
            Technical understanding and practical execution, connected from the
            outset.
          </p>
          <div className="reference-service-grid">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="reference-service"
              >
                <span className="reference-service-icon" aria-hidden="true">
                  <ServiceIcon type={service.icon} />
                </span>
                <span>{service.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="reference-projects">
        <div className="reference-shell">
          <p className="reference-kicker is-blue">OUR WORK</p>
          <h2>Project Highlights</h2>
          <div className="reference-project-grid">
            {projects.slice(0, 3).map((project) => (
              <article className="reference-project-card" key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="reference-project-image"
                  aria-label={`View ${project.title}`}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1024px) 33vw, 350px"
                  />
                </Link>
                <div>
                  <h3>{project.title}</h3>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="reference-outline-link"
                  >
                    More Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/projects"
            className="reference-button reference-view-all"
          >
            View More
          </Link>
        </div>
      </section>

      <Companies />

      <section className="reference-why">
        <div className="reference-shell">
          <p className="reference-kicker is-blue">WHY TECHNO VISION GROUP</p>
          <h2>Considered at Every Step</h2>
          <div className="reference-why-grid">
            {[
              [
                "Connected expertise",
                "Consultancy and construction capabilities brought into one conversation.",
              ],
              [
                "Clarity throughout",
                "Practical guidance, clear scope and open communication.",
              ],
              [
                "Attention to context",
                "Solutions shaped around your site, purpose and project priorities.",
              ],
            ].map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reference-contact">
        <div className="reference-shell">
          <p className="reference-kicker is-blue">START A CONVERSATION</p>
          <h2>Contact Us</h2>
          <p>Techno Vision Group</p>
          <p>Engineering • Consultancy • Construction</p>
          <a
            className="reference-phone"
            href={`tel:${site.contact.phone ?? ""}`}
          >
            {site.contact.phone}
          </a>
          <Link href="/contact" className="reference-button">
            Discuss Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
