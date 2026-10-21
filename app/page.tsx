import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ServicePhoto } from "@/components/service-photo";
import { JsonLd } from "@/components/visuals";
import {
  NATIONAL_PAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  PILLAR_SLUG,
  SITE_NAME,
  absoluteUrl,
  blurbFor,
  getPage,
  locationName,
  uniqueCityPages,
} from "@/lib/pages";
import { pageLinkLabel } from "@/lib/link-labels";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle("Commercial Cleaning Canada | CommercialCleaning.com"),
  description: trimDescription(
    `Offices and shops across Canada—call ${PHONE_DISPLAY} and tell us what needs attention. We will help you plan the first visit.`,
  ),
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "I am not sure what to ask for—is that okay?",
    a: "Yes. Describe what looks or smells off, and we will suggest a visit type. You do not need the perfect keyword.",
  },
  {
    q: "Do you come to my city?",
    a: "Check the city list below. If yours is missing, still call—we often stretch beyond the towns listed here.",
  },
  {
    q: "What should I have handy when I dial?",
    a: "Address, type of business, and whether you prefer mornings, evenings, or weekends. Square footage helps but estimates are fine.",
  },
];

const specialties = NATIONAL_PAGES.filter((p) => p.slug !== PILLAR_SLUG);
const pillar = getPage(PILLAR_SLUG)!;

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: absoluteUrl(),
            telephone: PHONE_E164,
            areaServed: "Canada",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />

      <PageHero
        variant="home"
        kicker="Serving businesses across Canada"
        title="Tell us what needs cleaning—we will take it from there"
        lead={
          <p>
            No online quote maze. Call, describe your space, and we will help you book a walkthrough or a first clean that fits your hours.
          </p>
        }
        ctaLabel="Talk to us"
        secondaryHref={`/${PILLAR_SLUG}`}
        secondaryLabel="See how it works"
        visual="home"
      />

      <section className="pick-section">
        <div className="wrap">
          <h2 className="section-title">What needs attention?</h2>
          <p className="section-sub">Tap a topic, then call if you would rather talk it through.</p>
          <div className="pick-grid">
            <Link href={`/${PILLAR_SLUG}`} className="pick-card pick-card-featured">
              <ServicePhoto page={pillar} thumbLayout="featured" priority />
              <span className="pick-card-label">Most calls start here</span>
              <span className="pick-card-title">General commercial cleaning</span>
              <p>{blurbFor(pillar)}</p>
            </Link>
            {specialties.map((page) => (
              <Link href={`/${page.slug}`} key={page.slug} className="pick-card">
                <ServicePhoto page={page} />
                <span className="pick-card-title">{pageLinkLabel(page)}</span>
                <p>{blurbFor(page)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="city-chips-section">
        <div className="wrap">
          <h2 className="section-title">Find your city</h2>
          <p className="section-sub">Local pages with the same number on every one.</p>
          <div className="city-chips">
            {uniqueCityPages().map((page) => (
              <Link href={`/${page.slug}`} key={page.slug}>{locationName(page)}</Link>
            ))}
          </div>
          <p className="city-chips-more">
            <Link href="/locations">Browse the full list</Link>
            {" · "}
            <Link href="/services">All topics</Link>
          </p>
        </div>
      </section>

      <section className="faq-panel wrap">
        <h2 className="section-title">Still wondering?</h2>
        {homeFaqs.map((faq) => (
          <details className="faq-fold" key={faq.q}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
