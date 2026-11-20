import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Bypass the Sanity API CDN so publish → site reads are not delayed by CDN TTL.
      useCdn: false,
    })
  : null;

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: tags ? { tags } : undefined,
    });
  } catch (error) {
    console.error("[sanity] fetch failed, falling back to static content", error);
    return null;
  }
}
