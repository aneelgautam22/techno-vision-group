import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function Brand({
  light = false,
  onClick,
}: {
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Techno Vision Group home"
    >
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M5 7h38v7H28v28h-8V14H5V7Z" fill="currentColor" />
        <path d="m31 21 7 21h8L35 14z" fill="var(--accent)" />
      </svg>
      <span>
        TECHNO VISION<small>G R O U P</small>
      </span>
    </Link>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-outline" : ""} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children && <div className="section-heading-side">{children}</div>}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  alt = "",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`page-hero ${image ? "page-hero-image" : ""}`}>
      {image && (
        <Image
          src={image}
          alt={alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="cover"
        />
      )}
      <div className="container page-hero-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <span className="eyebrow">TECHNO VISION GROUP</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
export function CTA({
  title = "Every great project starts with a conversation.",
}: {
  title?: string;
}) {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">LET’S BUILD SOMETHING MEANINGFUL</span>
          <h2>{title}</h2>
        </div>
        <Button href="/contact">Discuss Your Project</Button>
      </div>
    </section>
  );
}
export function ServiceIcon({ type }: { type: string }) {
  return (
    <svg
      className="service-icon"
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {type === "plan" ? (
        <>
          <path d="M7 6h26v28H7zM7 18h16v16M23 6v12h10M14 6v8" />
          <path d="M3 6v28M7 38h26" />
        </>
      ) : type === "survey" ? (
        <>
          <circle cx="20" cy="16" r="8" />
          <path d="M20 3v26M7 16h26M20 24 9 37m11-13 11 13M20 26v11" />
        </>
      ) : type === "structure" ? (
        <>
          <path d="M7 35V9l13-5 13 5v26M4 35h32M13 12v17m7-19v19m7-17v17M7 20h26" />
        </>
      ) : (
        <>
          <path d="M5 35h30M10 35V15h20v20M15 15V5h10v10M15 22h3m4 0h3m-10 7h3m4 0h3M20 5V2" />
        </>
      )}
    </svg>
  );
}
export function Process({ steps }: { steps: string[] }) {
  return (
    <ol className="process">
      {steps.map((step, i) => (
        <li key={step}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <h3>{step}</h3>
          <Arrow />
        </li>
      ))}
    </ol>
  );
}
