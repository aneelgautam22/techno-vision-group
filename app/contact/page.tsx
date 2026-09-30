import { PageHero, ServiceIcon } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
export const metadata = pageMetadata(
  "Contact",
  "Discuss your engineering or construction project with Techno Vision Group.",
  "/contact",
);
export default function Contact() {
  return (
    <div className="inner-reference page-contact">
      <PageHero
        eyebrow="Contact"
        title="Let’s start a conversation."
        description="A new idea, a site to explore, or a project ready to build. Tell us what you have in mind."
      />
      <section className="section">
        <div className="container contact-layout">
          <aside>
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>
              Good projects begin
              <br />
              with a clear brief.
            </h2>
            <p>Connect with the right expertise for your next step.</p>
            <dl className="contact-details">
              {site.contact.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a
                      href={`tel:${site.contact.phone.replace(/[^+0-9]/g, "")}`}
                    >
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
              )}
              {site.contact.email && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${site.contact.email}`}>
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
              )}
              {site.contact.address && (
                <div>
                  <dt>Office Address</dt>
                  <dd>{site.contact.address}</dd>
                </div>
              )}
              {site.contact.hours && (
                <div>
                  <dt>Business Hours</dt>
                  <dd>{site.contact.hours}</dd>
                </div>
              )}
            </dl>
            <div className="contact-socials">
              <p>Follow Techno Vision Group</p>
              <SocialLinks showLabels />
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
      {site.contact.mapEmbedUrl ? (
        <div className="container contact-map">
          <iframe
            className="office-map"
            title="Techno Vision Group Location"
            src={site.contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {site.contact.mapUrl && (
            <div className="contact-map-action">
              <a
                className="button contact-map-link"
                href={site.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </div>
      ) : (
        <section className="contact-availability-band">
          <ServiceIcon type="survey" />
          <div>
            <span className="eyebrow">DIRECT CONTACT</span>
            <h2>Speak with Techno Vision Group.</h2>
            <p>Call us to discuss your engineering or construction project.</p>
          </div>
          {site.contact.phone && (
            <a
              className="reference-button"
              href={`tel:${site.contact.phone.replace(/[^+0-9]/g, "")}`}
            >
              Call {site.contact.phone}
            </a>
          )}
        </section>
      )}
      <div className="section contact-closing">
        <span className="eyebrow">TECHNO VISION GROUP</span>
        <h2>
          From your first idea.
          <br />
          To your next chapter.
        </h2>
      </div>
    </div>
  );
}
