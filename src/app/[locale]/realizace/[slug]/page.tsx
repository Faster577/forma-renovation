import { BeforeAfter } from "@/components/portfolio/before-after";
import { DemoNotice } from "@/components/portfolio/demo-notice";
import { ProjectCta } from "@/components/portfolio/project-cta";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { FadeIn } from "@/components/ui/fade-in";
import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildAlternates, getOgLocale } from "@/lib/seo";
import {
  getLocalizedProjectBySlug,
  getLocalizedProjects,
  getProjectSlugs,
} from "@/sanity/lib/projects";
import { ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations();
  const tMeta = await getTranslations("Meta");
  const project = await getLocalizedProjectBySlug(slug, locale, t);

  if (!project) {
    return { title: tMeta("notFoundTitle") };
  }

  return {
    title: tMeta("projectTitle", { title: project.title }),
    description: project.summary,
    alternates: buildAlternates(`/realizace/${slug}`, locale),
    openGraph: {
      title: tMeta("projectTitle", { title: project.title }),
      description: project.summary,
      locale: getOgLocale(locale),
      type: "article",
      images: project.hero.src
        ? [{ url: project.hero.src, alt: project.hero.alt }]
        : undefined,
    },
  };
}

function ProjectFallback() {
  return (
    <div className="min-h-[70svh] bg-ink pt-32 md:min-h-[78svh]">
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 md:pb-20 lg:px-10">
        <div className="h-4 w-32 rounded-sm bg-ivory/15" />
        <div className="mt-8 h-12 w-2/3 max-w-xl rounded-sm bg-ivory/20" />
        <div className="mt-6 h-4 w-48 rounded-sm bg-ivory/10" />
      </div>
    </div>
  );
}

async function ProjectPageContent({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations();
  const tPage = await getTranslations("ProjectPage");

  const project = await getLocalizedProjectBySlug(slug, locale, t);
  if (!project) {
    notFound();
  }

  const related = (await getLocalizedProjects(locale, t))
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <article className="bg-ivory">
      <section className="relative min-h-[70svh] overflow-hidden bg-ink md:min-h-[78svh]">
        <div className="absolute inset-0">
          <SafeImage
            src={project.hero.src}
            alt={project.hero.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            fallbackClassName="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/25" />
        </div>

        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-32 sm:px-8 md:min-h-[78svh] md:pb-20 lg:px-10">
          <FadeIn>
            <Link
              href="/realizace"
              className="mb-8 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-ivory/65 transition-colors hover:text-ivory"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              {tPage("back")}
            </Link>
            <p className="text-[0.7rem] tracking-[0.24em] uppercase text-ivory/55">
              {project.location}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/70">
              <div>
                <dt className="sr-only">{tPage("metaType")}</dt>
                <dd>{project.type}</dd>
              </div>
              <div>
                <dt className="sr-only">{tPage("metaArea")}</dt>
                <dd>{project.area}</dd>
              </div>
              <div>
                <dt className="sr-only">{tPage("metaYear")}</dt>
                <dd>{tPage("yearDemo", { year: project.year })}</dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-ink/8 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <FadeIn className="lg:col-span-7">
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/40">
              {tPage("about")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
              {project.summary}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/65 md:text-lg">
              {project.description}
            </p>
            <DemoNotice className="mt-8" />
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5">
            <dl className="grid gap-6 border border-ink/10 bg-paper p-7 sm:grid-cols-2 lg:grid-cols-1 lg:p-8">
              {[
                { label: tPage("metaLocation"), value: project.location },
                { label: tPage("metaType"), value: project.type },
                { label: tPage("metaArea"), value: project.area },
                {
                  label: tPage("metaYear"),
                  value: tPage("yearDemo", { year: project.year }),
                },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-ink/40">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      {project.gallery.length > 0 ? (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <FadeIn className="mb-10">
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/40">
                {tPage("gallery")}
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
                {tPage("galleryTitle")}
              </h2>
            </FadeIn>
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        </section>
      ) : null}

      {project.beforeAfter ? (
        <section className="border-y border-ink/8 bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <BeforeAfter pair={project.beforeAfter} />
          </div>
        </section>
      ) : null}

      {(project.challenges.length > 0 || project.solutions.length > 0) && (
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
            {project.challenges.length > 0 ? (
              <FadeIn>
                <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/40">
                  {tPage("challengesEyebrow")}
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-tight text-ink">
                  {tPage("challengesTitle")}
                </h2>
                <ul className="mt-8 space-y-4">
                  {project.challenges.map((item) => (
                    <li
                      key={item}
                      className="border-l border-ink/15 pl-5 text-ink/65 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ) : null}
            {project.solutions.length > 0 ? (
              <FadeIn delay={0.1}>
                <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/40">
                  {tPage("solutionsEyebrow")}
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-tight text-ink">
                  {tPage("solutionsTitle")}
                </h2>
                <ul className="mt-8 space-y-4">
                  {project.solutions.map((item) => (
                    <li
                      key={item}
                      className="border-l border-accent/40 pl-5 text-ink/65 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ) : null}
          </div>
        </section>
      )}

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <ProjectCta projectTitle={project.title} />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-ink/8 bg-paper py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <FadeIn>
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/40">
                {tPage("relatedEyebrow")}
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-ink">
                {tPage("relatedTitle")}
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/realizace/${item.slug}`}
                  className="group grid gap-5 sm:grid-cols-5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden sm:col-span-2">
                    <SafeImage
                      src={item.hero.src}
                      alt={item.hero.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      fallbackClassName="absolute inset-0"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-[0.65rem] tracking-[0.18em] uppercase text-ink/40">
                      {item.district} · {item.area}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/55 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}
