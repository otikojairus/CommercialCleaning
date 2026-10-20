import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath =
  process.argv[2] ||
  "/Users/jairusotiko/Downloads/pSEO - Commercial Fence Rentals(in).csv";

const raw = readFileSync(csvPath, "utf8");
const lines = raw.split(/\r?\n/).filter(Boolean);
const header = lines[0].split(",");
const rows = lines.slice(1).map((line) => {
  const cols = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      cols.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  cols.push(cur);
  return cols;
});

function classify(slug, area) {
  const national = area.startsWith("Canada");
  if (national) {
    if (slug.includes("rental")) return "rental";
    if (slug.includes("repair") || slug.includes("deck-and-fence")) return "repair";
    return "installation";
  }
  if (slug.startsWith("construction-fence-rental")) return "rental-city";
  if (slug.includes("repair")) return "local-repair";
  return "local-install";
}

function priority(vol) {
  const n = parseInt(vol, 10);
  if (Number.isNaN(n)) return "Medium";
  if (n >= 400) return "Top Priority";
  if (n >= 150) return "High";
  return "Medium";
}

function escape(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const pages = rows.map((cols, i) => {
  const id = parseInt(cols[0], 10);
  const title = cols[1];
  const slug = cols[2].replace(/^\//, "");
  const keyword = cols[3];
  const secondary = cols[4] || "";
  const area = cols[5] || "Canada (National)";
  const vol = cols[8] || "";
  const kind = classify(slug, area);
  const pri = priority(vol);
  const sec = secondary.split(";").map((s) => s.trim()).filter(Boolean).join("|");
  return { id, title, slug, keyword, secondary: sec, area, priority: pri, kind };
});

const out = `export type PageKind = "rental" | "installation" | "repair" | "rental-city" | "local-install" | "local-repair";

export type SeoPage = {
  id: number;
  title: string;
  slug: string;
  keyword: string;
  secondary: string[];
  area: string;
  priority: "Top Priority" | "High" | "Medium";
  kind: PageKind;
};

const row = (
  id: number,
  title: string,
  slug: string,
  keyword: string,
  secondary: string,
  area = "Canada",
  priority: SeoPage["priority"] = "Medium",
  kind: PageKind = "local-install",
): SeoPage => ({ id, title, slug, keyword, secondary: secondary ? secondary.split("|") : [], area, priority, kind });

export const PAGES: SeoPage[] = [
${pages
  .map(
    (p) =>
      `  row(${p.id}, "${escape(p.title)}", "${escape(p.slug)}", "${escape(p.keyword)}", "${escape(p.secondary)}", "${escape(p.area)}", "${p.priority}", "${p.kind}"),`,
  )
  .join("\n")}
];

export const RENTAL_PAGES = PAGES.filter((p) => p.kind === "rental" || p.kind === "rental-city");
export const INSTALLATION_PAGES = PAGES.filter((p) => p.kind === "installation");
export const REPAIR_PAGES = PAGES.filter((p) => p.kind === "repair");
export const LOCAL_PAGES = PAGES.filter((p) => p.kind === "local-install" || p.kind === "local-repair" || p.kind === "rental-city");
export const CITY_RENTAL_PAGES = PAGES.filter((p) => p.kind === "rental-city");
export const CITY_SERVICE_PAGES = PAGES.filter((p) => p.kind === "local-install" || p.kind === "local-repair");

const PHONE_DISPLAY_DEFAULT = "1-888-555-0142";
const PHONE_E164_DEFAULT = "+18885550142";

function isPlaceholderPhone(value?: string) {
  return !value || /x{2,}/i.test(value) || value.includes("XXX");
}

export const PHONE_DISPLAY = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_DISPLAY)
  ? PHONE_DISPLAY_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_DISPLAY!;
export const PHONE_E164 = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_E164)
  ? PHONE_E164_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_E164!;
export const SITE_NAME = "CommercialFenceRentals.com";

export function getPage(slug: string) {
  return PAGES.find((page) => page.slug === slug);
}

export function cleanTitle(title: string) {
  return title.split("|")[0].trim();
}

export function locationName(page: SeoPage) {
  if (page.area.startsWith("Canada")) return "Canada";
  return page.area.split(",")[0].trim();
}

export function uniqueCityPages(pages: SeoPage[] = LOCAL_PAGES): SeoPage[] {
  const kindRank: Record<PageKind, number> = {
    "local-install": 3,
    "local-repair": 2,
    "rental-city": 1,
    rental: 0,
    installation: 0,
    repair: 0,
  };
  const byCity = new Map<string, SeoPage>();
  for (const page of pages) {
    const key = locationName(page).toLowerCase();
    const current = byCity.get(key);
    if (!current || kindRank[page.kind] > kindRank[current.kind]) {
      byCity.set(key, page);
    }
  }
  return [...byCity.values()].sort((a, b) => locationName(a).localeCompare(locationName(b)));
}

export { pageLinkLabel as linkLabelFor } from "./link-labels";

export function blurbFor(page: SeoPage) {
  const place = locationName(page);
  if (page.kind === "rental-city") {
    return \`Temporary construction fencing for sites in \${place}—delivery, setup, and pickup coordinated by phone.\`;
  }
  if (page.kind === "local-install") {
    return \`New fence installs for properties in \${place}, from chain link to privacy panels.\`;
  }
  if (page.kind === "local-repair") {
    return \`Leaning posts, storm damage, and worn sections—repair routing for \${place}.\`;
  }
  const blurbs: Record<string, string> = {
    "construction-fence-rental": "Panel fencing for active job sites, events, and perimeter control.",
    "temporary-fence-rental": "Short-term rentals with gates, bases, and pickup when the project wraps.",
    "fence-installation": "Professional layout, posts, and panels for commercial and residential sites.",
    "fence-repair": "Restore line tension, replace rails, and fix gates without a full tear-out.",
  };
  return blurbs[page.slug] ?? \`Matched to your \${page.keyword} needs across Canada.\`;
}

export function eyebrowFor(page: SeoPage) {
  if (page.kind !== "rental" && page.kind !== "installation" && page.kind !== "repair") return page.area;
  if (page.kind === "rental") return "Rentals & job sites";
  if (page.kind === "repair") return "Repair & restoration";
  return "Installation";
}

export { introFor, faqsFor, faqHeadingFor, h1For } from "./seo-content";
export { internalLinksFor as relatedPages } from "./seo-content";

export function absoluteUrl(path = "") {
  const root = process.env.NEXT_PUBLIC_SITE_URL || "https://commercialfencerentals.com";
  return \`\${root.replace(/\\/$/, "")}/\${path.replace(/^\\//, "")}\`;
}
`;

writeFileSync(join(root, "lib/pages.ts"), out);
console.log(`Wrote ${pages.length} pages to lib/pages.ts`);
