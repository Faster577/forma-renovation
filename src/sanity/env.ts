/**
 * Public Sanity env helpers.
 * Leave NEXT_PUBLIC_SANITY_PROJECT_ID empty until a real project is connected.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}
