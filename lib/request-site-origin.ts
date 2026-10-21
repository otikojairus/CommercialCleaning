import "server-only";

import { headers } from "next/headers";
import { siteOriginFromEnv } from "./site-url";

/** Prefer the incoming host (fixes sitemap/robots when build-time URL is stale). */
export async function requestSiteOrigin(): Promise<string> {
  const h = await headers();
  const host = (h.get("x-forwarded-host") ?? h.get("host") ?? "").split(",")[0]?.trim();
  if (host && !/^localhost(:\d+)?$/i.test(host) && !/^127\.0\.0\.1(:\d+)?$/i.test(host)) {
    const proto = (h.get("x-forwarded-proto") ?? "https").split(",")[0]?.trim() || "https";
    return `${proto}://${host}`;
  }
  return siteOriginFromEnv();
}
