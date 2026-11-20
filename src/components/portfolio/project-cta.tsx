import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { getTranslations } from "next-intl/server";

type ProjectCtaProps = {
  projectTitle: string;
};

export async function ProjectCta({ projectTitle }: ProjectCtaProps) {
  const t = await getTranslations("ProjectPage");

  return (
    <FadeIn>
      <section className="border border-ink/10 bg-paper px-6 py-10 md:px-10 md:py-12">
        <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/40">
          {t("ctaEyebrow")}
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight text-ink md:text-4xl">
          {t("ctaTitle", { title: projectTitle })}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/60">
          {t("ctaDescription")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/poptavka">{t("ctaPrimary")}</ButtonLink>
          <ButtonLink href="/realizace" variant="secondary">
            {t("ctaSecondary")}
          </ButtonLink>
        </div>
      </section>
    </FadeIn>
  );
}
