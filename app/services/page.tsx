import type { Metadata } from "next";
import Link from "next/link";
import { ServicePhoto } from "@/components/service-photo";
import { JsonLd } from "@/components/visuals";
import { NATIONAL_PAGES, PHONE_DISPLAY, PHONE_E164, PILLAR_SLUG, blurbFor, getPage } from "@/lib/pages";
import { pageLinkLabel } from "@/lib/link-labels";
import { introFor } from "@/lib/seo-content";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle("Cleaning Topics | CommercialCleaning.com"),
  description: trimDescription(`Not sure which page fits? Call ${PHONE_DISPLAY} and we will point you in the right direction.`),
  alternates: { canonical: "/services" },
};

const pillar = getPage(PILLAR_SLUG)!;

const indexFaqs = [
  {
    q: "Do I need to read every page?",
    a: "No. Skim the list, or skip straight to a call—we can figure it out together.",
  },
  {
    q: "Are city pages different companies?",
    a: "Same team, same number. Cities are just here so you know we work near you.",
  },
];

export default function ServicesPage() {
  return (
    <main className="inner-page">
      <header className="inner-hero wrap">
        <p className="welcome-tag">Topics</p>
        <h1>What we help with</h1>
        <p className="inner-hero-lead">{introFor(pillar).slice(0, 280)}…</p>
        <a className="call-pill call-pill-compact" href={`tel:${PHONE_E164}`}>
          <span className="call-pill-top">Questions?</span>
          <span className="call-pill-number">{PHONE_DISPLAY}</span>
        </a>
      </header>
      <div className="wrap">
        <ul className="topic-list">
          {NATIONAL_PAGES.map((page) => (
            <li key={page.slug}>
              <Link href={`/${page.slug}`} className="topic-list-link">
                <ServicePhoto page={page} thumbLayout="compact" />
                <span className="topic-list-body">
                  <span className="topic-list-title">{pageLinkLabel(page)}</span>
                  <span className="topic-list-desc">{blurbFor(page)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <section className="faq-panel">
          {indexFaqs.map((faq) => (
            <details className="faq-fold" key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: indexFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
    </main>
  );
}
