import { routing } from "@/i18n/routing";
import { getSiteUrl, localePath } from "@/lib/seo";
import { getProjectSlugs } from "@/sanity/lib/projects";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  // Absolute URLs are required; skip until NEXT_PUBLIC_SITE_URL is set for deploy.
  if (!siteUrl) {
    return [];
  }

  const projectSlugs = await getProjectSlugs();
  const staticPaths = ["", "/realizace", "/poptavka"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}${localePath(locale, path)}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    for (const slug of projectSlugs) {
      entries.push({
        url: `${siteUrl}${localePath(locale, `/realizace/${slug}`)}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
