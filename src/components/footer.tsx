import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { navItems } from "@/lib/content";
import { getLocalizedSiteContent } from "@/sanity/lib/site-content";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

async function FooterContent() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const { contact } = await getLocalizedSiteContent(locale);
  const address = contact.addressLines.join(", ");

  return (
    <footer className="border-t border-ink/8 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-display text-3xl tracking-[0.04em] text-ink"
            >
              FORMA<span className="text-accent">.</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/55">
              {t("tagline")}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[0.65rem] tracking-[0.22em] uppercase text-ink/40">
              {t("navLabel")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink/65 transition-colors hover:text-ink"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[0.65rem] tracking-[0.22em] uppercase text-ink/40">
              {contact.studioLabel || t("studioLabel")}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/65">
              <li>{address}</li>
              <li>
                <a href={contact.phoneHref} className="hover:text-ink">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="hover:text-ink">
                  {contact.email}
                </a>
              </li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/8 pt-8 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights")}</p>
          <p>{t("fictional")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterFallback() {
  return (
    <footer className="border-t border-ink/8 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="h-8 w-32 bg-ink/10" />
        <div className="mt-8 h-16 w-full max-w-sm bg-ink/5" />
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <Suspense fallback={<FooterFallback />}>
      <FooterContent />
    </Suspense>
  );
}
