"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

type LanguageSwitcherProps = {
  className?: string;
  onNavigate?: () => void;
  light?: boolean;
};

export function LanguageSwitcher({
  className = "",
  onNavigate,
  light = false,
}: LanguageSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("Common");
  const tLang = useTranslations("Languages");

  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      role="navigation"
      aria-label={t("languageSwitcher")}
    >
      {routing.locales.map((item, index) => {
        const active = item === locale;
        return (
          <span key={item} className="inline-flex items-center gap-1">
            {index > 0 ? (
              <span
                className={light ? "text-ivory/25" : "text-ink/20"}
                aria-hidden
              >
                /
              </span>
            ) : null}
            <Link
              href={pathname}
              locale={item}
              hrefLang={item}
              onClick={onNavigate}
              aria-current={active ? "true" : undefined}
              aria-label={`${tLang(item)}${active ? ` — ${t("currentLanguage")}` : ""}`}
              className={`px-1.5 py-1 text-[0.7rem] tracking-[0.16em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                light
                  ? active
                    ? "text-ivory focus-visible:ring-ivory/40"
                    : "text-ivory/45 hover:text-ivory/80 focus-visible:ring-ivory/40"
                  : active
                    ? "text-ink focus-visible:ring-ink/25"
                    : "text-ink/40 hover:text-ink/70 focus-visible:ring-ink/25"
              }`}
            >
              {tLang(item)}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
