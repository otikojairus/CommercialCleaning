#!/usr/bin/env python3
"""Generate lib/pages.ts from pSEO Commercial Cleaning xlsx."""
import json
import re
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
XLSX = Path("/Users/jairusotiko/Downloads/pSEO - CommercialCleaning.xlsx")
OUT = ROOT / "lib" / "pages.ts"


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def priority(vol) -> str:
    try:
        n = int(float(vol))
    except (TypeError, ValueError):
        return "Medium"
    if n >= 400:
        return "Top Priority"
    if n >= 150:
        return "High"
    return "Medium"


def kind(area: str) -> str:
    return "national" if str(area).startswith("Canada") else "city"


rows = []
wb = openpyxl.load_workbook(XLSX, read_only=True)
ws = wb.active
for row in ws.iter_rows(min_row=2, values_only=True):
    if not row or row[0] is None:
        continue
    try:
        id_ = int(float(row[0]))
    except (TypeError, ValueError):
        continue
    slug = row[2]
    if not slug or not str(slug).startswith("/"):
        continue
    secondary = row[4] or ""
    sec = "|".join(s.strip() for s in str(secondary).split(";") if s.strip())
    rows.append(
        {
            "id": id_,
            "title": row[1] or "",
            "slug": str(slug).strip("/"),
            "keyword": row[3] or "",
            "secondary": sec,
            "area": row[5] or "Canada (National)",
            "priority": priority(row[8]),
            "kind": kind(row[5] or ""),
        }
    )

page_lines = []
for p in rows:
    page_lines.append(
        f'  row({p["id"]}, "{esc(str(p["title"]))}", "{esc(p["slug"])}", '
        f'"{esc(str(p["keyword"]))}", "{esc(p["secondary"])}", "{esc(str(p["area"]))}", '
        f'"{p["priority"]}", "{p["kind"]}"),'
    )

content = f'''export type PageKind = "national" | "city";

export type SeoPage = {{
  id: number;
  title: string;
  slug: string;
  keyword: string;
  secondary: string[];
  area: string;
  priority: "Top Priority" | "High" | "Medium";
  kind: PageKind;
}};

const row = (
  id: number,
  title: string,
  slug: string,
  keyword: string,
  secondary: string,
  area = "Canada",
  priority: SeoPage["priority"] = "Medium",
  kind: PageKind = "city",
): SeoPage => ({{ id, title, slug, keyword, secondary: secondary ? secondary.split("|") : [], area, priority, kind }});

export const PAGES: SeoPage[] = [
{chr(10).join(page_lines)}
];

export const NATIONAL_PAGES = PAGES.filter((p) => p.kind === "national");
export const CITY_PAGES = PAGES.filter((p) => p.kind === "city");

export const PILLAR_SLUG = "commercial-cleaning-services-near-me";

const PHONE_DISPLAY_DEFAULT = "1-888-555-0198";
const PHONE_E164_DEFAULT = "+18885550198";

function isPlaceholderPhone(value?: string) {{
  return !value || /x{{2,}}/i.test(value) || value.includes("XXX");
}}

export const PHONE_DISPLAY = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_DISPLAY)
  ? PHONE_DISPLAY_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_DISPLAY!;
export const PHONE_E164 = isPlaceholderPhone(process.env.NEXT_PUBLIC_PHONE_E164)
  ? PHONE_E164_DEFAULT
  : process.env.NEXT_PUBLIC_PHONE_E164!;
export const SITE_NAME = "CommercialCleaning.com";

export function getPage(slug: string) {{
  return PAGES.find((page) => page.slug === slug);
}}

export function cleanTitle(title: string) {{
  return title.split("|")[0].trim();
}}

export function locationName(page: SeoPage) {{
  if (page.area.startsWith("Canada")) return "Canada";
  return page.area.split(",")[0].trim();
}}

export function uniqueCityPages(pages: SeoPage[] = CITY_PAGES): SeoPage[] {{
  const byCity = new Map<string, SeoPage>();
  for (const page of pages) {{
    const key = locationName(page).toLowerCase();
    if (!byCity.has(key)) byCity.set(key, page);
  }}
  return [...byCity.values()].sort((a, b) => locationName(a).localeCompare(locationName(b)));
}}

export {{ pageLinkLabel as linkLabelFor }} from "./link-labels";

export function blurbFor(page: SeoPage) {{
  const place = locationName(page);
  if (page.kind === "city") {{
    return `Janitorial and commercial cleaning routed for ${{place}} offices, retail, and facilities.`;
  }}
  const blurbs: Record<string, string> = {{
    [PILLAR_SLUG]: "One line for offices, retail, and facilities that need a scheduled crew or a fast reset.",
    "commercial-carpet-cleaning-services": "Deep extraction and maintenance plans for high-traffic carpet.",
    "commercial-floor-cleaning-services": "Hard-floor scrub, strip, and finish for lobbies and warehouses.",
    "commercial-office-cleaning-services": "Nightly or weekly office cleaning with supply restock options.",
  }};
  return blurbs[page.slug] ?? `Matched to your ${{page.keyword}} needs across Canada.`;
}}

export function eyebrowFor(page: SeoPage) {{
  if (page.kind === "city") return page.area;
  return "Canada-wide";
}}

export function absoluteUrl(path = "") {{
  const root = process.env.NEXT_PUBLIC_SITE_URL || "https://canadacommercialcleaners.com";
  return `${{root.replace(/\\/$/, "")}}/${{path.replace(/^\\//, "")}}`;
}}
'''

OUT.write_text(content)
print(f"Wrote {len(rows)} pages to {OUT}")
