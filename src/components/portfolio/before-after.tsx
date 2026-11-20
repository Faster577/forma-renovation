import { FadeIn } from "@/components/ui/fade-in";
import { SafeImage } from "@/components/ui/safe-image";
import type { LocalizedProject } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

type BeforeAfterProps = {
  pair: NonNullable<LocalizedProject["beforeAfter"]>;
};

export async function BeforeAfter({ pair }: BeforeAfterProps) {
  const t = await getTranslations("ProjectPage");

  return (
    <section aria-labelledby="before-after-heading">
      <FadeIn>
        <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/40">
          {t("beforeAfterEyebrow")}
        </p>
        <h2
          id="before-after-heading"
          className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl"
        >
          {t("beforeAfterTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60">
          {pair.caption}
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <FadeIn>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-stone/30">
              <SafeImage
                src={pair.before.src}
                alt={pair.before.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                fallbackClassName="absolute inset-0"
              />
            </div>
            <figcaption className="mt-3 text-[0.7rem] tracking-[0.18em] uppercase text-ink/45">
              {t("beforeLabel")}
            </figcaption>
          </figure>
        </FadeIn>
        <FadeIn delay={0.1}>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden bg-stone/30">
              <SafeImage
                src={pair.after.src}
                alt={pair.after.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                fallbackClassName="absolute inset-0"
              />
            </div>
            <figcaption className="mt-3 text-[0.7rem] tracking-[0.18em] uppercase text-ink/45">
              {t("afterLabel")}
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}
