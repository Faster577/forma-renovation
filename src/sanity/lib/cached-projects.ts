import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "@/sanity/lib/client";
import {
  featuredProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
} from "@/sanity/lib/queries";
import type { SanityProject } from "@/sanity/types";

/**
 * Cached Sanity reads for Cache Components.
 * Localization stays outside this boundary (translate fn is not cacheable).
 * Tagged for webhook revalidation; hours profile refreshes in the background.
 */
export async function getCachedSanityProjects() {
  "use cache";
  cacheTag("project");
  cacheLife("hours");

  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<SanityProject[]>(projectsQuery);
  } catch (error) {
    console.error("[sanity] projects fetch failed", error);
    return null;
  }
}

export async function getCachedFeaturedSanityProjects() {
  "use cache";
  cacheTag("project");
  cacheLife("hours");

  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<SanityProject[]>(featuredProjectsQuery);
  } catch (error) {
    console.error("[sanity] featured projects fetch failed", error);
    return null;
  }
}

export async function getCachedSanityProjectBySlug(slug: string) {
  "use cache";
  cacheTag("project");
  cacheTag(`project:${slug}`);
  cacheLife("hours");

  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<SanityProject | null>(projectBySlugQuery, {
      slug,
    });
  } catch (error) {
    console.error("[sanity] project-by-slug fetch failed", error);
    return null;
  }
}

export async function getCachedSanityProjectSlugs() {
  "use cache";
  cacheTag("project");
  cacheLife("hours");

  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<string[]>(projectSlugsQuery);
  } catch (error) {
    console.error("[sanity] project slugs fetch failed", error);
    return null;
  }
}
