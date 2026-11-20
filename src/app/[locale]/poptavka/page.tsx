import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { DemoNotice } from "@/components/portfolio/demo-notice";
import { FadeIn } from "@/components/ui/fade-in";
import { routing, type AppLocale } from "@/i18n/routing";
import { isEmailConfigured } from "@/lib/inquiry";
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
    title: t("inquiryTitle"),
    description: t("inquiryDescription"),
    alternates: buildAlternates("/poptavka", locale),
    openGraph: {
      title: t("inquiryTitle"),
      description: t("inquiryDescription"),
      locale: getOgLocale(locale),
      type: "website",
    },
  };
}

async function InquiryAside() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("InquiryPage");
  const { contact } = await getLocalizedSiteContent(locale);

  return (
    <FadeIn>
      <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
        {t("stepsTitle")}
      </h2>
      <ol className="mt-8 space-y-6">
        {(["01", "02", "03"] as const).map((step) => (
          <li key={step} className="flex gap-4">
            <span className="font-display text-xl text-accent/80">{step}</span>
            <div>
              <p className="font-display text-lg text-ink">
                {t(`steps.${step}.title`)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink/55">
                {t(`steps.${step}.text`)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 border-t border-ink/10 pt-8 text-sm leading-relaxed text-ink/55">
        <p>{t("preferContact")}</p>
        <p className="mt-2">
          <a
            href={contact.emailHref}
            className="text-ink transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25"
          >
            {contact.email}
          </a>
          <span className="mx-2 text-ink/25">·</span>
          <a
            href={contact.phoneHref}
            className="text-ink transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25"
          >
            {contact.phone}
          </a>
        </p>
      </div>
    </FadeIn>
  );
}

export default async function PoptavkaPage() {
  const t = await getTranslations("InquiryPage");
  const demoMode = !isEmailConfigured();

  return (
    <div className="bg-ivory">
      <section className="border-b border-ink/8 pt-28 pb-14 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/45">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 md:text-lg">
              {t("intro")}
            </p>
            <DemoNotice className="mt-8 max-w-xl" />
          </FadeIn>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-4">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <div className="h-8 w-2/3 bg-ink/10" />
                  <div className="h-24 w-full bg-ink/5" />
                </div>
              }
            >
              <InquiryAside />
            </Suspense>
          </div>

          <div className="lg:col-span-8">
            <InquiryForm demoMode={demoMode} />
          </div>
        </div>
      </section>
    </div>
  );
}
