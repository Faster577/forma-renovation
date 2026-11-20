import cs from "../../messages/cs.json";
import en from "../../messages/en.json";
import ru from "../../messages/ru.json";
import type { AppLocale } from "@/i18n/routing";

const catalogs = {
  cs,
  en,
  ru,
} as const;

export function getMessagesCatalog(locale: AppLocale) {
  return catalogs[locale] ?? catalogs.cs;
}
