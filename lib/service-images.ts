import type { SeoPage } from "./pages";
import { PILLAR_SLUG } from "./pages";
import { heroImageSrc, heroVisualFor } from "./hero-visual";

/** Shared photo paths for heroes and service listings */
const BY_SLUG: Record<string, string> = {
  [PILLAR_SLUG]: "/images/hero-national.jpg",
  "commercial-carpet-cleaning-services": "/images/hero-carpet.jpg",
  "commercial-floor-cleaning-services": "/images/hero-floor.jpg",
  "commercial-office-cleaning-services": "/images/hero-office.jpg",
  "commercial-building-cleaning-services": "/images/service-building.jpg",
  "commercial-disinfectant-cleaning-services": "/images/service-disinfect.jpg",
  "professional-commercial-cleaning-services": "/images/hero-home.jpg",
  "commercial-cleaning-and-sanitizing-services": "/images/service-disinfect.jpg",
  "commercial-duct-cleaning-services-near-me": "/images/service-duct.jpg",
};

export function serviceImageFor(page: SeoPage | { slug: string; kind?: SeoPage["kind"] }): string {
  if (BY_SLUG[page.slug]) return BY_SLUG[page.slug];
  if (page.kind === "city") return "/images/hero-city.jpg";
  return heroImageSrc(heroVisualFor(page as SeoPage));
}
