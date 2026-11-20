import { About } from "@/components/about";
import { ContactCta } from "@/components/contact-cta";
import { Hero } from "@/components/hero";
import { DemoNotice } from "@/components/portfolio/demo-notice";
import { Portfolio } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates, getOgLocale } from "@/lib/seo";
import { getLocalizedSiteContent } from "@/sanity/lib/site-content";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Meta");

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: buildAlternates("", locale),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeOgDescription"),
      locale: getOgLocale(locale),
      type: "website",
    },
  };
}

function HomeSectionsFallback() {
  return (
    <>
      <div className="min-h-[100svh] bg-ink" />
      <div className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="h-4 w-32 bg-ink/10" />
          <div className="mt-6 h-12 w-2/3 max-w-xl bg-ink/15" />
          <div className="mt-6 h-24 w-full max-w-lg bg-ink/5" />
        </div>
      </div>
    </>
  );
}

async function HomeSections() {
  const locale = (await getLocale()) as AppLocale;
  const content = await getLocalizedSiteContent(locale);

  return (
    <>
      <Hero content={content.hero} />
      <div className="border-b border-ink/8 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <DemoNotice />
        </div>
      </div>
      <About content={content.about} />
      <Services content={content.services} />
      <Portfolio />
      <Process content={content.process} />
      <ContactCta content={content.contact} />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSectionsFallback />}>
      <HomeSections />
    </Suspense>
  );
}
