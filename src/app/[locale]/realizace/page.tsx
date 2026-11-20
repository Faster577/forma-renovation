import { DemoNotice } from "@/components/portfolio/demo-notice";
import { ProjectCard } from "@/components/portfolio/project-card";
import { FadeIn } from "@/components/ui/fade-in";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates, getOgLocale } from "@/lib/seo";
import { getLocalizedProjects } from "@/sanity/lib/projects";
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
    title: t("portfolioTitle"),
    description: t("portfolioDescription"),
    alternates: buildAlternates("/realizace", locale),
    openGraph: {
      title: t("portfolioTitle"),
      description: t("portfolioDescription"),
      locale: getOgLocale(locale),
      type: "website",
    },
  };
}

function PortfolioGridFallback() {
  return (
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-14 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col">
          <div className="aspect-[4/3] bg-stone/30" />
          <div className="mt-5 h-3 w-2/3 bg-ink/10" />
          <div className="mt-3 h-6 w-3/4 bg-ink/15" />
          <div className="mt-3 h-12 w-full bg-ink/5" />
        </div>
      ))}
    </div>
  );
}

async function PortfolioGrid() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations();
  const localized = await getLocalizedProjects(locale, t);

  return (
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-14 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">
      {localized.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

export default async function RealizacePage() {
  const tPage = await getTranslations("PortfolioPage");

  return (
    <div className="bg-ivory">
      <section className="border-b border-ink/8 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/45">
              {tPage("eyebrow")}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {tPage("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 md:text-lg">
              {tPage("intro")}
            </p>
            <DemoNotice className="mt-8 max-w-xl" />
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <Suspense fallback={<PortfolioGridFallback />}>
          <PortfolioGrid />
        </Suspense>
      </section>
    </div>
  );
}
