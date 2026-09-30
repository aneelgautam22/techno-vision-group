import Link from "next/link";
import { Brand } from "@/components/ui";
import { SocialLinks } from "@/components/social-links";
import { companies, navigation, site } from "@/data/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand light />
            <p>{site.description}</p>
            <span className="footer-tagline">
              Engineering • Consultancy • Construction
            </span>
          </div>
          <div>
            <h2>Explore</h2>
            {navigation.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </div>
          <div>
            <h2>Our Companies</h2>
            {companies.map((c) => (
              <Link key={c.id} href={c.href}>
                {c.name}
              </Link>
            ))}
            <h2 className="footer-subheading">Services</h2>
            <Link href="/services/engineering-consultancy#services">
              Planning & Design
            </Link>
            <Link href="/services/construction#services">
              Construction & Civil Works
            </Link>
          </div>
          <div>
            <h2>Get in Touch</h2>
            {site.contact.address && <p>{site.contact.address}</p>}
            {site.contact.phone && (
              <a href={`tel:${site.contact.phone.replace(/[^+0-9]/g, "")}`}>
                {site.contact.phone}
              </a>
            )}
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            )}
            <Link href="/contact" className="footer-contact">
              Make an enquiry ↗
            </Link>
            {Object.values(site.social).some(Boolean) ? (
              Object.entries(site.social).map(
                ([name, url]) =>
                  url && (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)} ↗
                    </a>
                  ),
              )
            ) : (
              <p className="footer-social">Social profiles coming soon</p>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Techno Vision Group. All rights
            reserved.{" "}
            <span className="footer-developer-credit">
              <span aria-hidden="true">•</span> Website by{" "}
              <strong>Agnex Technology</strong>
            </span>
          </span>
          <span>Engineering • Consultancy • Construction</span>
          {site.contact.email && (
            <a className="footer-email" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          )}
          <SocialLinks className="footer-social-links" />
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
