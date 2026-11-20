import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeImage } from "@/components/ui/safe-image";
import type { LocalizedAboutContent } from "@/sanity/lib/site-content";

type AboutProps = {
  content: LocalizedAboutContent;
};

export function About({ content }: AboutProps) {
  return (
    <section id="o-nas" className="scroll-mt-24 bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.intro}
          />
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-ink/65 leading-relaxed">
              <p>{content.p1}</p>
              <p>{content.p2}</p>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 sm:gap-6">
              {content.stats.map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-3xl text-ink md:text-4xl">
                    {item.value}
                  </dt>
                  <dd className="mt-1 text-[0.65rem] tracking-[0.12em] uppercase text-ink/45 sm:text-xs">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
            {content.statsNote ? (
              <p className="mt-4 text-xs leading-relaxed text-ink/40">
                {content.statsNote}
              </p>
            ) : null}
          </FadeIn>
        </div>

        <FadeIn className="relative lg:col-span-7" delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:min-h-[34rem]">
            <SafeImage
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              fallbackClassName="absolute inset-0"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/50">
            {content.caption}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
