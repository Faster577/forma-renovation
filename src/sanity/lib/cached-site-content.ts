import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "@/sanity/lib/client";
import { siteContentQuery } from "@/sanity/lib/queries";
import type { SanitySiteContent } from "@/sanity/types";

/**
 * Cached Sanity read for the Website content singleton.
 * Tagged for on-demand revalidation via POST /api/revalidate.
 * `minutes` profile background-refreshes about once a minute so CMS edits
 * become visible without deleting `.next` even if the webhook is not set up.
 */
export async function getCachedSanitySiteContent() {
  "use cache";
  cacheTag("siteContent");
  cacheLife("minutes");

  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<SanitySiteContent | null>(siteContentQuery);
  } catch (error) {
    console.error("[sanity] site content fetch failed", error);
    return null;
  }
}
