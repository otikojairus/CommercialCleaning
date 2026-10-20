import { pageLinkLabel } from "./link-labels";
import { metaDescriptionFor, metaTitleFor } from "./seo-meta";
import {
  CITY_PAGES,
  NATIONAL_PAGES,
  type SeoPage,
  PAGES,
  PHONE_DISPLAY,
  PILLAR_SLUG,
  locationName,
  getPage,
  cleanTitle,
} from "./pages";

export type FaqItem = { q: string; a: string };
export type ContentSection = { h2: string; paragraphs: string[] };
export type InternalLink = { href: string; anchor: string };

export const PILLAR = PILLAR_SLUG;

export function h1For(page: SeoPage) {
  const place = locationName(page);
  if (page.slug === PILLAR) return "A cleaner workplace starts with a phone call";
  if (page.kind === "city") return `Commercial cleaning in ${place}`;
  if (page.slug.includes("carpet")) return "Carpets that look and smell fresh again";
  if (page.slug.includes("floor")) return "Floors you are not embarrassed to show clients";
  if (page.slug.includes("office")) return "Office cleaning that fits your workday";
  if (page.slug.includes("duct")) return "Cleaner air starts with cleaner ducts";
  if (page.slug.includes("disinfect") || page.slug.includes("sanitiz")) return "Extra peace of mind when germs are a worry";
  return cleanTitle(page.title).replace(" | Call Now", "");
}

export function internalLinksFor(page: SeoPage): InternalLink[] {
  const pillar = getPage(PILLAR)!;
  const links: InternalLink[] = [];
  const seen = new Set<string>();

  const add = (target: SeoPage, anchor?: string) => {
    const href = `/${target.slug}`;
    if (href === `/${page.slug}` || seen.has(href)) return;
    seen.add(href);
    links.push({ href, anchor: anchor ?? pageLinkLabel(target) });
  };

  if (page.slug === PILLAR) {
    for (const p of NATIONAL_PAGES.filter((x) => x.slug !== PILLAR)) add(p);
    for (const c of CITY_PAGES) add(c);
    return links;
  }

  if (page.kind === "national") {
    add(pillar, "Big picture");
    for (const p of NATIONAL_PAGES.filter((x) => x.slug !== page.slug && x.slug !== PILLAR).slice(0, 5)) add(p);
    for (const c of CITY_PAGES.slice(0, 8)) add(c);
    return links;
  }

  add(pillar, "Across Canada");
  for (const p of NATIONAL_PAGES.filter((x) => x.slug !== PILLAR).slice(0, 4)) add(p);
  for (const n of CITY_PAGES.filter((c) => c.slug !== page.slug).slice(0, 4)) add(n);
  return links;
}

function pillarIntro(): string {
  return `You should not need a spreadsheet to get your office cleaned. Whether you run a small professional suite or a whole building, we are here to listen first and clean second. Tell us what is bothering you—dingy washrooms, dusty desks, carpets that have seen better days—and we will suggest a plan that matches how you actually use the space. Some clients want us every night; others call before a big visit or after a renovation. We work across Canada, and the same friendly number reaches a real person who can book a walkthrough or put you on the calendar. When you are ready, call ${PHONE_DISPLAY}. We will ask simple questions (where you are, how big the space is, when we can get in) and take it from there.`;
}

function nationalIntro(page: SeoPage): string {
  const youSearched = page.keyword;
  let angle = "We tailor the visit to what you describe—no one-size-fits-all checklist.";
  if (page.slug.includes("carpet")) {
    angle = "We focus on stains, traffic paths, and that tired look high-traffic carpet gets. You will know what drying time to expect before we start.";
  } else if (page.slug.includes("floor")) {
    angle = "Tile, vinyl, or sealed concrete—we match the method to your floor so it is clean without being harsh.";
  } else if (page.slug.includes("office")) {
    angle = "Desks, kitchens, meeting rooms, and the washrooms everyone talks about—we hit the spots your team notices.";
  } else if (page.slug.includes("duct")) {
    angle = "Dusty vents and musty air are common complaints. We talk through access and timing so we are not in the way of your workday.";
  } else if (page.slug.includes("disinfect") || page.slug.includes("sanitiz")) {
    angle = "When someone was ill or you simply want extra attention on handles and shared surfaces, we can add a focused disinfecting pass.";
  }
  return `If you were looking for ${youSearched}, you are in the right place. ${angle} There is no quiz on this site—just a conversation. Share your address, roughly how much space you have, and whether this is a one-time refresh or something you want on repeat. We are happy to explain what is included so the first invoice feels fair and clear. Questions? Call ${PHONE_DISPLAY} anytime.`;
}

function cityIntro(page: SeoPage): string {
  const place = locationName(page);
  return `Running a business in ${place} means you already juggle enough. When cleaning slips down the list, things show—fingerprints on glass, bins that overflow, floors that look dull by Friday. We help local owners and office managers get back on track with ${page.keyword} that respects your hours and your keys. Let us know if staff are on site, if you need green products, or if weekends work better. Many ${place} clients start with a walkthrough so we both agree on priorities. Pick up the phone: ${PHONE_DISPLAY}. Tell us your address and what you would like to see different after our first visit.`;
}

export function introFor(page: SeoPage): string {
  if (page.slug === PILLAR) return pillarIntro();
  if (page.kind === "city") return cityIntro(page);
  return nationalIntro(page);
}

function sectionsForPillar(): ContentSection[] {
  return [
    {
      h2: "Places we often help",
      paragraphs: [
        "Professional offices, medical waiting areas, retail floors, and shared lobbies. If people walk through it, we probably clean it.",
        "You can add carpet shampooing, floor scrubbing, or an extra disinfecting round when you need it—not every week unless you want that.",
      ],
    },
    {
      h2: "What happens after you call",
      paragraphs: [
        "We ask about your space and timing, then suggest either a quick visit to look around or a start date if the job is straightforward.",
        "When possible, the same team comes back so they learn where supplies live and which doors stay locked.",
      ],
    },
    {
      h2: "A note on supplies",
      paragraphs: [
        "We can bring standard cleaners and paper goods, or use yours if you prefer a particular brand. Say so up front and we will plan for it.",
      ],
    },
  ];
}

function sectionsNational(page: SeoPage): ContentSection[] {
  return [
    {
      h2: "Is this the right fit?",
      paragraphs: [
        `This page is for ${page.keyword}. If you are unsure, call ${PHONE_DISPLAY} and describe the room—we will point you in the right direction.`,
        "Photos of problem areas (spills, worn carpet, scuffed tile) help us quote fairly before we arrive.",
      ],
    },
    {
      h2: "Your time matters",
      paragraphs: [
        "We work around your open hours when we can. If you need evenings or weekends, say so—we will look for a slot that does not interrupt customers or staff.",
      ],
    },
    {
      h2: "After the first clean",
      paragraphs: [
        "If something was missed, tell us while it is fresh. We would rather fix it once than have you live with it.",
      ],
    },
  ];
}

function sectionsCity(page: SeoPage): ContentSection[] {
  const place = locationName(page);
  return [
    {
      h2: `Why ${place} businesses call us`,
      paragraphs: [
        "Seasonal slush on entry floors, busy lunch rushes in break rooms, and washrooms that get heavy use—we have seen it all nearby.",
        "Parking, buzzers, and elevator bookings vary by building. Share anything quirky about access so we are not stuck downstairs.",
      ],
    },
    {
      h2: "First visit",
      paragraphs: [
        "We confirm what matters most to you—client-facing areas, staff kitchen, or everything top to bottom.",
        `Ready to book? ${PHONE_DISPLAY} is the fastest way to get on the calendar.`,
      ],
    },
  ];
}

export function sectionsFor(page: SeoPage): ContentSection[] {
  if (page.slug === PILLAR) return sectionsForPillar();
  if (page.kind === "city") return sectionsCity(page);
  return sectionsNational(page);
}

function faqsPillar(): FaqItem[] {
  return [
    {
      q: "Do I have to sign a long contract?",
      a: "Not necessarily. Many people start with a few visits or a monthly plan. We will explain options on the phone—no pressure.",
    },
    {
      q: "Can you clean while my team is working?",
      a: "Often yes, if we can move room by room. Tell us about noise, clients on site, or allergy concerns and we will plan around them.",
    },
    {
      q: "What will you ask when I call?",
      a: "Your address, type of business, rough size, and when the space is empty or quiet. That is enough to get started.",
    },
    {
      q: "Is every city on this site a different company?",
      a: `No—it is one team and one number (${PHONE_DISPLAY}). City pages just add local context so you know we serve your area.`,
    },
  ];
}

function faqsNational(page: SeoPage): FaqItem[] {
  return [
    {
      q: "How is this different from your main cleaning page?",
      a: "This page goes deeper on one type of job—like carpets or floors. The overview page is better if you want general office cleaning.",
    },
    {
      q: "Do you move furniture?",
      a: "Light chairs and mats, yes. Heavy filing cabinets or built-ins need a quick chat first so we bring enough hands.",
    },
    {
      q: "Can I book just once?",
      a: "Absolutely. Move-in, move-out, and pre-inspection cleans are common one-offs.",
    },
    {
      q: "What if I am not sure of the square footage?",
      a: "A ballpark is fine. We can refine after a walkthrough.",
    },
  ];
}

function faqsCity(page: SeoPage): FaqItem[] {
  const place = locationName(page);
  return [
    {
      q: `Do you actually serve ${place}?`,
      a: "Yes—this page exists because we take calls from your area. Share your postal code on the phone so we confirm drive time.",
    },
    {
      q: "How soon can you come?",
      a: "It depends on the week. Urgent messes get priority when we can; regular service usually books a little ahead.",
    },
    {
      q: "Can my property manager call on my behalf?",
      a: "Of course. Just make sure they can grant access and approve the checklist.",
    },
    {
      q: "Same phone number as the rest of the site?",
      a: `Yes—always ${PHONE_DISPLAY}.`,
    },
  ];
}

export function faqsFor(page: SeoPage): FaqItem[] {
  if (page.slug === PILLAR) return faqsPillar();
  if (page.kind === "city") return faqsCity(page);
  return faqsNational(page);
}

export function faqHeadingFor(page: SeoPage) {
  const place = locationName(page);
  if (page.slug === PILLAR) return "Questions people ask us";
  if (page.kind === "city") return `Good to know in ${place}`;
  return "Quick answers";
}

export function heroLeadFor(page: SeoPage, maxWords = 36) {
  const words = introFor(page).split(/\s+/);
  const slice = words.slice(0, maxWords).join(" ");
  return words.length > maxWords ? `${slice}…` : slice;
}

export function pageSeoMeta(page: SeoPage) {
  const intro = introFor(page);
  return {
    title: metaTitleFor(page),
    description: metaDescriptionFor(page, intro, PHONE_DISPLAY),
  };
}

export function isPillarPage(page: SeoPage) {
  return page.slug === PILLAR;
}

export function allSlugsLinkedFromPillar() {
  return PAGES.map((p) => p.slug);
}
