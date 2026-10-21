import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/pages";
import { requestSiteOrigin } from "@/lib/request-site-origin";
import { urlOnOrigin } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await requestSiteOrigin();
  const lastModified = new Date();
  const url = (path = "") => urlOnOrigin(origin, path);

  return [
    { url: url(), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: url("services"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: url("locations"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...PAGES.map((page) => ({
      url: url(page.slug),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.priority === "Top Priority" ? 0.9 : page.priority === "High" ? 0.8 : 0.7,
    })),
  ];
}
