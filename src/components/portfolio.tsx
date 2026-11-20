import { DemoNotice } from "@/components/portfolio/demo-notice";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects, localizeProject } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Portfolio() {
  const t = await getTranslations();
  const tHome = await getTranslations("HomePortfolio");
  const tCommon = await getTranslations("Common");
  const projects = getFeaturedProjects().map((project) =>
    localizeProject(project, t),
  );

  return (
    <section id="realizace" className="scroll-mt-24 bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow={tHome("eyebrow")}
          title={tHome("title")}
          description={tHome("description")}
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;
            return (
              <FadeIn key={project.slug} delay={0.05}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <Link
                    href={`/realizace/${project.slug}`}
                    className={`group relative overflow-hidden lg:col-span-7 ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] md:aspect-[16/10]">
                      <SafeImage
                        src={project.hero.src}
                        alt={project.hero.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        fallbackClassName="absolute inset-0"
                      />
                    </div>
                  </Link>

                  <div
                    className={`flex flex-col gap-5 lg:col-span-5 ${
                      reverse ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="text-[0.7rem] tracking-[0.24em] uppercase text-ink/40">
                      {project.district} · {project.type} · {project.area}
                    </p>
                    <h3 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                      <Link
                        href={`/realizace/${project.slug}`}
                        className="transition-opacity hover:opacity-70"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-ink/60">
                      {project.summary}
                    </p>
                    <Link
                      href={`/realizace/${project.slug}`}
                      className="mt-2 inline-flex w-fit items-center gap-2 text-sm text-ink transition-opacity hover:opacity-70"
                    >
                      {tHome("detailLink")}
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </Link>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-16 flex flex-col items-start gap-4 border-t border-ink/8 pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <DemoNotice className="max-w-xl" />
          <ButtonLink href="/realizace" variant="secondary">
            {tCommon("viewAllProjects")}
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}
