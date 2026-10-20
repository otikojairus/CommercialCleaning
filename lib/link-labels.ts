import type { SeoPage } from "./pages";
import { cleanTitle, locationName } from "./pages";

const PILLAR = "commercial-cleaning-services-near-me";

export function pageLinkLabel(page: SeoPage) {
  if (page.kind === "city") return locationName(page);

  const labels: Record<string, string> = {
    [PILLAR]: "Overview",
    "commercial-carpet-cleaning-services": "Carpets",
    "commercial-floor-cleaning-services": "Hard floors",
    "commercial-office-cleaning-services": "Offices",
    "commercial-building-cleaning-services": "Whole buildings",
    "commercial-disinfectant-cleaning-services": "Disinfecting",
    "professional-commercial-cleaning-services": "Pro teams",
    "commercial-cleaning-and-sanitizing-services": "Sanitizing",
    "commercial-duct-cleaning-services-near-me": "Air ducts",
  };
  return labels[page.slug] ?? cleanTitle(page.title);
}

export function serviceTableTitle(page: SeoPage) {
  return pageLinkLabel(page);
}
