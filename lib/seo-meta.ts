import type { SeoPage } from "./pages";
import { cleanTitle, locationName, PILLAR_SLUG, SITE_NAME } from "./pages";

const BRAND = "CommercialCleaning.com";

export function trimTitle(title: string, max = 60) {
  if (title.length <= max) return title;
  const cut = title.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

export function trimDescription(text: string, min = 150, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max && clean.length >= min) return clean;
  if (clean.length < min) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > min ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

export function metaTitleFor(page: SeoPage) {
  const place = locationName(page);
  let title: string;
  if (page.slug === PILLAR_SLUG) {
    title = `Commercial Cleaning Canada | ${BRAND}`;
  } else if (page.kind === "city") {
    title = `Commercial Cleaning ${place} | ${BRAND}`;
  } else {
    title = `${cleanTitle(page.title)} | ${BRAND}`;
  }
  return trimTitle(title);
}

export function metaDescriptionFor(page: SeoPage, introLead: string, phone: string) {
  const place = locationName(page);
  const cta = `Call ${phone} to schedule.`;
  let base: string;
  if (page.slug === PILLAR_SLUG) {
    base = `Offices and shops across Canada—tell us what needs attention and we will help you book a visit. ${cta}`;
  } else if (page.kind === "city") {
    base = `Commercial cleaning in ${place} for busy teams. Call and describe your space—we will suggest next steps. ${cta}`;
  } else {
    base = `${page.keyword} help nationwide. ${introLead.slice(0, 65)}… ${cta}`;
  }
  return trimDescription(base);
}

export { BRAND, SITE_NAME };
