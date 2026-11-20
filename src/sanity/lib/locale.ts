import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export function pickLocalized<T>(
  value: Partial<Record<AppLocale, T>> | null | undefined,
  locale: AppLocale,
  fallback?: T,
): T | undefined {
  if (!value) {
    return fallback;
  }

  return (
    value[locale] ??
    value[routing.defaultLocale] ??
    value.en ??
    value.cs ??
    value.ru ??
    fallback
  );
}
