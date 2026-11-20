import { routing, type AppLocale } from "@/i18n/routing";
import type { Metadata } from "next";

const ogLocaleMap: Record<AppLocale, string> = {
  cs: "cs_CZ",
  ru: "ru_RU",
  en: "en_US",
};

/**
 * Public site origin for canonical URLs and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in deployment (e.g. https://your-project.vercel.app).
 * Falls back to a relative metadata base when unset — no invented production domain.
 */
export function getSiteUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return undefined;
  }

  try {
    return new URL(raw).origin;
  } catch {
    return undefined;
  }
}

export function localePath(locale: string, path = ""): string {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}

export function buildAlternates(
  path = "",
  locale: AppLocale,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const item of routing.locales) {
    languages[item] = localePath(item, path);
  }
  languages["x-default"] = localePath(routing.defaultLocale, path);

  return {
    canonical: localePath(locale, path),
    languages,
  };
}

export function getOgLocale(locale: AppLocale): string {
  return ogLocaleMap[locale];
}
