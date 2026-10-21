import type { SeoPage } from "./pages";
import { PILLAR_SLUG } from "./pages";
import { heroImageSrc, heroPhotoAlt, heroVisualFor } from "./hero-visual";

/** Shared photo paths for heroes and service listings */
const BY_SLUG: Record<string, string> = {
  [PILLAR_SLUG]: "/images/hero-national.jpg",
  "commercial-carpet-cleaning-services": "/images/hero-carpet.jpg",
  "commercial-floor-cleaning-services": "/images/hero-floor.jpg",
  "commercial-office-cleaning-services": "/images/hero-office.jpg",
  "commercial-building-cleaning-services": "/images/service-building.jpg",
  "commercial-disinfectant-cleaning-services": "/images/service-disinfect.jpg",
  "professional-commercial-cleaning-services": "/images/hero-home.jpg",
  "commercial-cleaning-and-sanitizing-services": "/images/service-sanitize.jpg",
  "commercial-duct-cleaning-services-near-me": "/images/service-duct.jpg",
};

export function serviceImageFor(page: SeoPage | { slug: string; kind?: SeoPage["kind"] }): string {
  if (BY_SLUG[page.slug]) return BY_SLUG[page.slug];
  if (page.kind === "city") return "/images/hero-city.jpg";
  return heroImageSrc(heroVisualFor(page as SeoPage));
}

const ALT_BY_SLUG: Record<string, string> = {
  [PILLAR_SLUG]: "Modern commercial workspace ready for professional cleaning",
  "commercial-carpet-cleaning-services": "Technician deep-cleaning commercial carpet with professional equipment",
  "commercial-floor-cleaning-services": "Cleaner maintaining hard floors in a commercial building",
  "commercial-office-cleaning-services": "Office desk and workspace being cleaned",
  "commercial-building-cleaning-services": "Janitorial team with cart in a commercial hallway",
  "commercial-disinfectant-cleaning-services": "Worker in protective gear disinfecting surfaces",
  "professional-commercial-cleaning-services": "Commercial cleaning crew with vacuums and mop",
  "commercial-cleaning-and-sanitizing-services": "Hands spraying and wiping surfaces during sanitizing",
  "commercial-duct-cleaning-services-near-me": "HVAC technician servicing ventilation equipment",
};

export function servicePhotoAlt(page: SeoPage | { slug: string; kind?: SeoPage["kind"] }): string {
  if (ALT_BY_SLUG[page.slug]) return ALT_BY_SLUG[page.slug];
  if (page.kind === "city") return heroPhotoAlt("city");
  return heroPhotoAlt(heroVisualFor(page as SeoPage));
}
