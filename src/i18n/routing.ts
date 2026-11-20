import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["cs", "ru", "en"],
  defaultLocale: "cs",
  localePrefix: "always",
  localeDetection: true,
});

export type AppLocale = (typeof routing.locales)[number];
