import { getMessagesCatalog } from "@/lib/messages";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as getRootLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "./routing";

export default getRequestConfig(async ({ locale: overrideLocale }) => {
  if (overrideLocale && hasLocale(routing.locales, overrideLocale)) {
    const locale = overrideLocale as AppLocale;
    return {
      locale,
      messages: getMessagesCatalog(locale),
    };
  }

  const paramValue = await getRootLocale();

  if (!paramValue) {
    // Outside the [locale] tree (e.g. /studio, API): fall back safely.
    return {
      locale: routing.defaultLocale,
      messages: getMessagesCatalog(routing.defaultLocale),
    };
  }

  if (!hasLocale(routing.locales, paramValue)) {
    notFound();
  }

  const locale = paramValue as AppLocale;

  return {
    locale,
    messages: getMessagesCatalog(locale),
  };
});
