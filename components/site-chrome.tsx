"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { PHONE_DISPLAY, PHONE_E164, PILLAR_SLUG, SITE_NAME } from "@/lib/pages";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Cities" },
  { href: `/${PILLAR_SLUG}`, label: "Overview" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="top-bar">
      <div className="wrap top-bar-inner">
        <Link href="/" className="top-bar-logo" onClick={() => setOpen(false)} aria-label={`${SITE_NAME} home`}>
          <BrandLogo />
        </Link>
        <nav className={`top-bar-nav ${open ? "is-open" : ""}`} aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="top-bar-phone" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
        <button type="button" className="top-bar-menu" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bottom-bar">
      <div className="wrap bottom-bar-grid">
        <div>
          <BrandLogo />
          <p className="bottom-bar-blurb">
            We help Canadian businesses keep offices, shops, and shared spaces feeling fresh—on a schedule that fits yours.
          </p>
        </div>
        <div className="bottom-bar-links">
          <Link href={`/${PILLAR_SLUG}`}>Get started</Link>
          <Link href="/commercial-carpet-cleaning-services">Carpets</Link>
          <Link href="/commercial-floor-cleaning-services">Floors</Link>
          <Link href="/locations">Cities</Link>
        </div>
      </div>
      <div className="wrap bottom-bar-meta">
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
        <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
      </div>
    </footer>
  );
}

export function StickyMobileCta() {
  return (
    <div className="mobile-call-bar">
      <a href={`tel:${PHONE_E164}`}>
        <span>Call us</span>
        <strong>{PHONE_DISPLAY}</strong>
      </a>
    </div>
  );
}
