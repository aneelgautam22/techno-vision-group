import Image from "next/image";
import Link from "next/link";
import { companies } from "@/data/site";
import { Arrow, SectionHeading } from "@/components/ui";
export function Companies() {
  return (
    <section className="section companies-section" id="companies">
      <div className="container">
        <SectionHeading
          eyebrow="ONE VISION. COMPLEMENTARY EXPERTISE."
          title="Our Companies"
        >
          <p>
            From the first line on a drawing
            <br />
            to the final detail on site.
          </p>
        </SectionHeading>
        <div className="company-grid">
          {companies.map((c) => (
            <article className={`company-card company-${c.id}`} key={c.id}>
              <div className="company-photo">
                <Image
                  src={
                    c.id === "consultancy"
                      ? "/images/optimized/engineering-consultancy.webp"
                      : "/images/optimized/engineering-construction.webp"
                  }
                  alt={
                    c.id === "consultancy"
                      ? "Engineering consultancy planning and design workspace"
                      : "Engineer supervising an active construction site"
                  }
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
                <span className="company-number">{c.number}</span>
              </div>
              <div className="company-body">
                <span className="eyebrow">
                  {c.id === "consultancy"
                    ? "THINK. PLAN. DESIGN."
                    : "PREPARE. BUILD. DELIVER."}
                </span>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <div className="company-tags">
                  {c.capabilities.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
                <Link className="text-link" href={c.href}>
                  <span>
                    Explore{" "}
                    {c.id === "consultancy" ? "Consultancy" : "Construction"}
                  </span>
                  <Arrow diagonal />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
