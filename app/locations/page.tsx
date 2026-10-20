import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/visuals";
import { PHONE_DISPLAY, PHONE_E164, PILLAR_SLUG, locationName, uniqueCityPages } from "@/lib/pages";
import { trimDescription, trimTitle } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: trimTitle("Cities We Serve | CommercialCleaning.com"),
  description: trimDescription(`Find your city, then call ${PHONE_DISPLAY} to book a visit.`),
  alternates: { canonical: "/locations" },
};

const cities = uniqueCityPages();

export default function LocationsPage() {
  return (
    <main className="inner-page">
      <header className="inner-hero wrap">
        <p className="welcome-tag">Near you</p>
        <h1>Your city</h1>
        <p className="inner-hero-lead">
          Tap your town below. Each page shares local notes; the phone number is always {PHONE_DISPLAY}.
        </p>
        <a className="call-pill call-pill-compact" href={`tel:${PHONE_E164}`}>
          <span className="call-pill-top">Call us</span>
          <span className="call-pill-number">{PHONE_DISPLAY}</span>
        </a>
        <p className="inner-hero-links">
          <Link href={`/${PILLAR_SLUG}`}>Canada overview</Link>
          {" · "}
          <Link href="/services">All topics</Link>
        </p>
      </header>
      <div className="wrap city-chips city-chips--page">
        {cities.map((page) => (
          <Link href={`/${page.slug}`} key={page.slug}>{locationName(page)}</Link>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "My city is not listed—can I still call?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We may still be able to help—share your address when you call " + PHONE_DISPLAY + ".",
              },
            },
          ],
        }}
      />
    </main>
  );
}
