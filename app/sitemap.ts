import type { MetadataRoute } from "next";
import { PAGES, absoluteUrl } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl(), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("services"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("locations"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...PAGES.map((page) => ({
      url: absoluteUrl(page.slug),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.priority === "Top Priority" ? 0.9 : page.priority === "High" ? 0.8 : 0.7,
    })),
  ];
}
