"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand, Arrow } from "@/components/ui";
import { companies, navigation } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [services, setServices] = useState(false);
  const [mobile, setMobile] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const desktop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobile) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 1000px)");
    const close = () => setMobile(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };
    query.addEventListener("change", close);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = old;
      query.removeEventListener("change", close);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobile]);
  useEffect(() => {
    if (!services) return;
    const outside = (e: PointerEvent) => {
      if (!desktop.current?.contains(e.target as Node)) setServices(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [services]);
  function closeMobile() {
    setMobile(false);
    toggle.current?.focus();
  }
  const active = (href: string) =>
    pathname === href ? ("page" as const) : undefined;
  return (
    <header className={`site-header ${pathname === "/" ? "home-header" : ""}`}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.slice(0, 2).map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href)}>
              {n.label}
            </Link>
          ))}
          <div
            className="nav-dropdown"
            ref={desktop}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setServices(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setServices(false);
                desktop.current?.querySelector("button")?.focus();
              }
            }}
          >
            <button
              type="button"
              onClick={() => setServices(!services)}
              aria-expanded={services}
              aria-controls="services-menu"
              className={pathname.startsWith("/services") ? "active" : ""}
            >
              Services{" "}
              <span className={`chevron ${services ? "up" : ""}`}>⌄</span>
            </button>
            {services && (
              <div id="services-menu" className="dropdown-panel">
                {companies.map((c) => (
                  <Link
                    href={c.href}
                    key={c.id}
                    onClick={() => setServices(false)}
                  >
                    <span>
                      {c.short}
                      <small>{c.name}</small>
                    </span>
                    <Arrow diagonal />
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navigation.slice(2).map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact">
          Let’s Talk <Arrow diagonal />
        </Link>
        <button
          ref={toggle}
          type="button"
          className={`menu-toggle ${mobile ? "is-open" : ""}`}
          onClick={() => setMobile((open) => !open)}
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={mobile}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </div>
      {mobile && (
        <div className="mobile-menu-layer">
          <button
            type="button"
            className="mobile-menu-backdrop"
            onClick={closeMobile}
            aria-label="Close navigation"
          />
          <aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mobile-dialog"
          >
            <nav>
              {navigation.slice(0, 2).map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={closeMobile}
                  aria-current={active(n.href)}
                >
                  {n.label}
                  <Arrow />
                </Link>
              ))}
              <details>
                <summary>
                  Services <span aria-hidden="true">+</span>
                </summary>
                {companies.map((c) => (
                  <Link key={c.id} href={c.href} onClick={closeMobile}>
                    {c.short}
                    <small>{c.name}</small>
                  </Link>
                ))}
              </details>
              {navigation.slice(2).map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={closeMobile}
                  aria-current={active(n.href)}
                >
                  {n.label}
                  <Arrow />
                </Link>
              ))}
            </nav>
            <p className="mobile-signoff">
              Engineering • Consultancy • Construction
            </p>
          </aside>
        </div>
      )}
    </header>
  );
}
