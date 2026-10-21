import type { MetadataRoute } from "next";
import { requestSiteOrigin } from "@/lib/request-site-origin";
import { urlOnOrigin } from "@/lib/site-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await requestSiteOrigin();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: urlOnOrigin(origin, "sitemap.xml"),
  };
}
