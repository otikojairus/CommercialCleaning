import type { SeoPage } from "./pages";
import { PILLAR_SLUG } from "./pages";

export type HeroVisual = "home" | "national" | "carpet" | "floor" | "office" | "city";

const IMAGE: Record<HeroVisual, string> = {
  home: "/images/hero-home.jpg",
  national: "/images/hero-national.jpg",
  carpet: "/images/hero-carpet.jpg",
  floor: "/images/hero-floor.jpg",
  office: "/images/hero-office.jpg",
  city: "/images/hero-city.jpg",
};

export function heroVisualFor(page?: SeoPage): HeroVisual {
  if (!page) return "home";
  if (page.kind === "city") return "city";
  if (page.slug.includes("carpet")) return "carpet";
  if (page.slug.includes("floor")) return "floor";
  if (page.slug.includes("office") || page.slug.includes("building")) return "office";
  if (page.slug.includes("professional")) return "home";
  if (page.slug === PILLAR_SLUG) return "national";
  return "national";
}

export function heroImageSrc(visual: HeroVisual) {
  return IMAGE[visual];
}

export function heroPhotoAlt(visual: HeroVisual): string {
  switch (visual) {
    case "carpet":
      return "Professional carpet cleaning in a commercial space";
    case "floor":
      return "Cleaner mopping a commercial hard floor";
    case "office":
      return "Bright modern office workspace";
    case "city":
      return "Downtown buildings in a Canadian city";
    case "home":
      return "Cleaning team working in a commercial building";
    default:
      return "Commercial cleaning team at work";
  }
}

export function heroVisualCaption(visual: HeroVisual) {
  switch (visual) {
    case "carpet":
      return "Deep clean for tired carpets";
    case "floor":
      return "Shine back on your floors";
    case "office":
      return "Desks, kitchens & washrooms";
    case "city":
      return "Local teams, same phone number";
    case "home":
      return "Offices & shops across Canada";
    default:
      return "We show up when we say we will";
  }
}
