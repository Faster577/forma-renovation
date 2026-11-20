import { ButtonLink } from "@/components/ui/button-link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Meta");
  const tCommon = await getTranslations("Common");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-5 py-28 sm:px-8">
      <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ink/45">404</p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
        {t("notFoundTitle")}
      </h1>
      <div className="mt-8">
        <ButtonLink href="/">{tCommon("brandHome")}</ButtonLink>
      </div>
    </div>
  );
}
