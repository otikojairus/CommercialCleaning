export const DEFAULT_SITE_ORIGIN = "https://canadacommercialcleaners.com";

export function siteOriginFromEnv(): string {
  const root = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_ORIGIN;
  return root.replace(/\/$/, "");
}

export function urlOnOrigin(origin: string, path = ""): string {
  const base = origin.replace(/\/$/, "");
  const segment = path.replace(/^\//, "");
  return segment ? `${base}/${segment}` : `${base}/`;
}
