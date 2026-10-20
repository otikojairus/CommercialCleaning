export type PageKind = "national" | "city";

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
  kind: PageKind = "city",
): SeoPage => ({ id, title, slug, keyword, secondary: secondary ? secondary.split("|") : [], area, priority, kind });

export const PAGES: SeoPage[] = [
  row(1, "Commercial Cleaning Services Near Me | Call Now", "commercial-cleaning-services-near-me", "commercial cleaning services near me", "cleaning services commercial|commercial cleaning company|commercial cleaning", "Canada (National)", "Top Priority", "national"),
  row(2, "Commercial Carpet Cleaning Services | Call Now", "commercial-carpet-cleaning-services", "commercial carpet cleaning services", "", "Canada (National)", "Top Priority", "national"),
  row(3, "Commercial Floor Cleaning Services | Call Now", "commercial-floor-cleaning-services", "commercial floor cleaning services", "commercial floor cleaning services near me|professional floor cleaning", "Canada (National)", "Top Priority", "national"),
  row(4, "Commercial Office Cleaning Services | Call Now", "commercial-office-cleaning-services", "commercial office cleaning services", "commercial office cleaning services near me|business cleaning services", "Canada (National)", "High", "national"),
  row(5, "Commercial Building Cleaning Services | Call Now", "commercial-building-cleaning-services", "commercial building cleaning services", "cleaning services for commercial buildings", "Canada (National)", "High", "national"),
  row(6, "Commercial Disinfectant Cleaning Services | Call Now", "commercial-disinfectant-cleaning-services", "commercial disinfectant cleaning services", "", "Canada (National)", "Medium", "national"),
  row(7, "Professional Commercial Cleaning Services | Call Now", "professional-commercial-cleaning-services", "professional commercial cleaning services", "", "Canada (National)", "Medium", "national"),
  row(8, "Commercial Cleaning And Sanitizing Services | Call Now", "commercial-cleaning-and-sanitizing-services", "commercial cleaning and sanitizing services", "", "Canada (National)", "Medium", "national"),
  row(9, "Commercial Duct Cleaning Services Near Me | Call Now", "commercial-duct-cleaning-services-near-me", "commercial duct cleaning services near me", "commercial duct cleaning", "Canada (National)", "Medium", "national"),
  row(10, "Commercial Cleaning Services Calgary | Call Now", "commercial-cleaning-services-calgary", "commercial cleaning services calgary", "cleaning business calgary", "Calgary", "Top Priority", "city"),
  row(11, "Commercial Cleaning Services Winnipeg | Call Now", "commercial-cleaning-services-winnipeg", "commercial cleaning services winnipeg", "commercial cleaning winnipeg", "Winnipeg", "High", "city"),
  row(12, "Commercial Cleaning Services Edmonton | Call Now", "commercial-cleaning-services-edmonton", "commercial cleaning services edmonton", "office cleaning edmonton", "Edmonton", "High", "city"),
  row(13, "Commercial Cleaning Services Ottawa | Call Now", "commercial-cleaning-services-ottawa", "commercial cleaning services ottawa", "janitorial services ottawa", "Ottawa", "High", "city"),
  row(14, "Commercial Cleaning Services Montreal | Call Now", "commercial-cleaning-services-montreal", "commercial cleaning services montreal", "", "Montreal", "High", "city"),
  row(15, "Commercial Cleaning Services Laval | Call Now", "commercial-cleaning-services-laval", "commercial cleaning services laval", "", "Laval", "High", "city"),
  row(16, "Commercial Cleaning Services Hamilton | Call Now", "commercial-cleaning-services-hamilton", "commercial cleaning services hamilton", "commercial cleaning services in hamilton|janitorial services hamilton", "Hamilton", "High", "city"),
  row(17, "Commercial Cleaning Services St Catharines | Call Now", "commercial-cleaning-services-st-catharines", "commercial cleaning services st catharines", "", "St Catharines", "High", "city"),
  row(18, "Commercial Cleaning Services Markham | Call Now", "commercial-cleaning-services-markham", "commercial cleaning services markham", "commercial cleaning markham", "Markham", "High", "city"),
  row(19, "Commercial Cleaning Services North York | Call Now", "commercial-cleaning-services-north-york", "commercial cleaning services north york", "", "North York", "High", "city"),
  row(20, "Commercial Cleaning Services London Ontario | Call Now", "commercial-cleaning-services-london-ontario", "commercial cleaning services london ontario", "commercial cleaning services london", "London, Ontario", "High", "city"),
  row(21, "Commercial Cleaning Services Surrey | Call Now", "commercial-cleaning-services-surrey", "commercial cleaning services surrey", "commercial cleaning services surrey bc|janitorial services surrey", "Surrey, BC", "Medium", "city"),
  row(22, "Commercial Cleaning Services Mississauga | Call Now", "commercial-cleaning-services-mississauga", "commercial cleaning services mississauga", "commercial cleaning services in mississauga|commercial cleaning mississauga", "Mississauga", "Medium", "city"),
  row(23, "Commercial Cleaning Services Toronto | Call Now", "commercial-cleaning-services-toronto", "toronto commercial cleaning services", "", "Toronto", "Medium", "city"),
  row(24, "Commercial Cleaning Services Halifax | Call Now", "commercial-cleaning-services-halifax", "commercial cleaning services halifax", "", "Halifax", "Medium", "city"),
  row(25, "Commercial Cleaning Services Regina | Call Now", "commercial-cleaning-services-regina", "commercial cleaning services regina", "", "Regina", "Medium", "city"),
  row(26, "Commercial Cleaning Services Vancouver | Call Now", "commercial-cleaning-services-vancouver", "commercial cleaning services vancouver", "vancouver commercial cleaning services|commercial cleaning vancouver", "Vancouver", "Medium", "city"),
  row(27, "Commercial Cleaning Services Vaughan | Call Now", "commercial-cleaning-services-vaughan", "commercial cleaning services vaughan", "commercial cleaning vaughan", "Vaughan", "Medium", "city"),
  row(28, "Commercial Cleaning Services Etobicoke | Call Now", "commercial-cleaning-services-etobicoke", "commercial cleaning services etobicoke", "", "Etobicoke", "Medium", "city"),
  row(29, "Commercial Cleaning Services Barrie | Call Now", "commercial-cleaning-services-barrie", "commercial cleaning services barrie", "", "Barrie", "Medium", "city"),
  row(30, "Commercial Cleaning Services Woodbridge | Call Now", "commercial-cleaning-services-woodbridge", "commercial cleaning services woodbridge", "woodbridge cleaning services", "Woodbridge", "Medium", "city"),
  row(31, "Commercial Cleaning Services Thornhill | Call Now", "commercial-cleaning-services-thornhill", "commercial cleaning services thornhill", "", "Thornhill", "Medium", "city"),
  row(32, "Commercial Cleaning Services Abbotsford | Call Now", "commercial-cleaning-services-abbotsford", "commercial cleaning services abbotsford", "janitorial services abbotsford", "Abbotsford", "Medium", "city"),
];

export const NATIONAL_PAGES = PAGES.filter((p) => p.kind === "national");
export const CITY_PAGES = PAGES.filter((p) => p.kind === "city");

export const PILLAR_SLUG = "commercial-cleaning-services-near-me";

const PHONE_DISPLAY_DEFAULT = "1-888-555-0198";
const PHONE_E164_DEFAULT = "+18885550198";

function isPlaceholderPhone(value?: string) {
  return !value || /x{2,}/i.test(value) || value.includes("XXX");
}

export const PHONE_DISPLAY = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_DISPLAY)
  ? PHONE_DISPLAY_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_DISPLAY!;
export const PHONE_E164 = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_E164)
  ? PHONE_E164_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_E164!;
export const SITE_NAME = "CommercialCleaning.com";

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

export function uniqueCityPages(pages: SeoPage[] = CITY_PAGES): SeoPage[] {
  const byCity = new Map<string, SeoPage>();
  for (const page of pages) {
    const key = locationName(page).toLowerCase();
    if (!byCity.has(key)) byCity.set(key, page);
  }
  return [...byCity.values()].sort((a, b) => locationName(a).localeCompare(locationName(b)));
}

export { pageLinkLabel as linkLabelFor } from "./link-labels";

export function blurbFor(page: SeoPage) {
  const place = locationName(page);
  if (page.kind === "city") {
    return `Local help for ${place} businesses—call and tell us what should look better by Monday.`;
  }
  const blurbs: Record<string, string> = {
    [PILLAR_SLUG]: "The usual starting point: offices, shops, and shared spaces that need regular care.",
    "commercial-carpet-cleaning-services": "Spills, traffic lanes, and that flat look—carpet refresh without the guesswork.",
    "commercial-floor-cleaning-services": "Lobby shine and safer footing on tile, vinyl, or sealed concrete.",
    "commercial-office-cleaning-services": "Desks, kitchens, and washrooms on a rhythm that matches your team.",
    "commercial-building-cleaning-services": "Multiple floors or tenants? We help you sort what gets cleaned when.",
    "commercial-disinfectant-cleaning-services": "Extra attention on touchpoints when your team wants added reassurance.",
    "professional-commercial-cleaning-services": "Trained crews when presentation really matters.",
    "commercial-cleaning-and-sanitizing-services": "Sanitizing passes for busy shared spaces.",
    "commercial-duct-cleaning-services-near-me": "When the air feels dusty or vents look neglected.",
  };
  return blurbs[page.slug] ?? `Help with ${page.keyword}—we will talk it through on the phone.`;
}

export function eyebrowFor(page: SeoPage) {
  if (page.kind === "city") return page.area;
  return "Canada-wide";
}

export function absoluteUrl(path = "") {
  const root = process.env.NEXT_PUBLIC_SITE_URL || "https://commercialcleaning.com";
  return `${root.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
