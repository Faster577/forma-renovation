import type { AppLocale } from "@/i18n/routing";
import { serviceItems, type ServiceIcon } from "@/lib/content";
import { urlForImageSrc } from "@/sanity/lib/image";
import { pickLocalized } from "@/sanity/lib/locale";
import { getCachedSanitySiteContent } from "@/sanity/lib/cached-site-content";
import type { LocaleString, LocaleText, SanityImageWithAlt } from "@/sanity/types";
import { getTranslations } from "next-intl/server";

export type LocalizedHeroContent = {
  headline: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollDown: string;
  imageSrc: string;
  imageAlt: string;
};

export type LocalizedAboutContent = {
  eyebrow: string;
  title: string;
  intro: string;
  p1: string;
  p2: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  stats: Array<{ value: string; label: string }>;
  statsNote: string;
};

export type LocalizedServiceItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  icon: ServiceIcon;
};

export type LocalizedServicesContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: LocalizedServiceItem[];
};

export type LocalizedProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type LocalizedProcessContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: LocalizedProcessStep[];
};

export type LocalizedContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  studioLabel: string;
  addressLines: string[];
  phoneLabel: string;
  phone: string;
  phoneHref: string;
  emailLabel: string;
  email: string;
  emailHref: string;
  hours: string;
};

export type LocalizedSiteContent = {
  hero: LocalizedHeroContent;
  about: LocalizedAboutContent;
  services: LocalizedServicesContent;
  process: LocalizedProcessContent;
  contact: LocalizedContactContent;
};

/** Ignore temporary Studio QA strings without mutating Sanity documents. */
function isCmsTestPlaceholder(value: string): boolean {
  return /FORMA\s*TEST/i.test(value);
}

function nonEmpty(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  if (!trimmed || isCmsTestPlaceholder(trimmed)) {
    return fallback;
  }
  return trimmed;
}

function localizedField(
  value: Partial<LocaleString | LocaleText> | null | undefined,
  locale: AppLocale,
  fallback: string,
): string {
  return nonEmpty(pickLocalized(value, locale), fallback);
}

function imageSrc(
  image: SanityImageWithAlt | null | undefined,
  fallback: string,
): string {
  const asset = image?.asset;
  const hasAsset = Boolean(
    asset && (asset._ref || asset._id || asset.url),
  );
  if (!hasAsset) {
    return fallback;
  }

  try {
    return urlForImageSrc(image, 1600) || fallback;
  } catch {
    return fallback;
  }
}

function imageAlt(
  image: SanityImageWithAlt | null | undefined,
  locale: AppLocale,
  fallback: string,
): string {
  return localizedField(image?.alt, locale, fallback);
}

function splitAddress(
  value: string | null | undefined,
  fallbackLines: string[],
): string[] {
  if (!value?.trim()) {
    return fallbackLines;
  }

  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 ? lines : fallbackLines;
}

function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : `tel:${phone}`;
}

/**
 * Returns homepage copy from Sanity when published fields exist,
 * otherwise preserves the existing next-intl message catalog.
 */
export async function getLocalizedSiteContent(
  locale: AppLocale,
): Promise<LocalizedSiteContent> {
  const remote = await getCachedSanitySiteContent();
  const tHero = await getTranslations("Hero");
  const tAbout = await getTranslations("About");
  const tServices = await getTranslations("Services");
  const tProcess = await getTranslations("Process");
  const tContact = await getTranslations("Contact");
  const tFooter = await getTranslations("Footer");

  const heroFallbackImage = "/images/hero.jpg";
  const aboutFallbackImage = "/images/about.jpg";

  const heroCtaPrimary = localizedField(
    remote?.hero?.ctaPrimary ?? remote?.cta?.primary,
    locale,
    tHero("ctaPrimary"),
  );
  const heroCtaSecondary = localizedField(
    remote?.hero?.ctaSecondary ?? remote?.cta?.secondary,
    locale,
    tHero("ctaSecondary"),
  );

  const contactCtaPrimary = localizedField(
    remote?.cta?.contactPrimary,
    locale,
    tContact("ctaPrimary"),
  );
  const contactCtaSecondary = localizedField(
    remote?.cta?.contactSecondary,
    locale,
    tContact("ctaSecondary"),
  );

  const phone = nonEmpty(remote?.contact?.phone, "+420 777 123 456");
  const email = nonEmpty(remote?.contact?.email, "ahoj@forma.studio");

  const addressLines = splitAddress(
    pickLocalized(remote?.contact?.studioAddress, locale),
    [tContact("studioAddress1"), tContact("studioAddress2")],
  );

  const cmsServices = remote?.services?.items ?? [];
  const serviceByKey = new Map(
    cmsServices
      .filter((item) => item?.key)
      .map((item) => [item.key, item] as const),
  );

  const servicesItems: LocalizedServiceItem[] = serviceItems.map((service) => {
    const cms = serviceByKey.get(service.id);
    return {
      id: service.id,
      icon: service.icon,
      title: localizedField(
        cms?.title,
        locale,
        tServices(`items.${service.id}.title`),
      ),
      description: localizedField(
        cms?.description,
        locale,
        tServices(`items.${service.id}.description`),
      ),
      imageSrc: imageSrc(cms?.image, service.image),
    };
  });

  const cmsSteps = remote?.process?.steps ?? [];
  const stepByNumber = new Map(
    cmsSteps
      .filter((step) => step?.number)
      .map((step) => [step.number, step] as const),
  );

  const defaultStepNumbers = ["01", "02", "03", "04"] as const;
  const resolvedSteps: LocalizedProcessStep[] = defaultStepNumbers.map(
    (number) => {
      const cms = stepByNumber.get(number);
      const fallbackTitle = tProcess(`steps.${number}.title`);
      const fallbackDescription = tProcess(`steps.${number}.description`);
      return {
        number,
        title: localizedField(cms?.title, locale, fallbackTitle),
        description: localizedField(
          cms?.description,
          locale,
          fallbackDescription,
        ),
      };
    },
  );

  return {
    hero: {
      headline: localizedField(remote?.hero?.headline, locale, tHero("headline")),
      subhead: localizedField(remote?.hero?.subhead, locale, tHero("subhead")),
      ctaPrimary: heroCtaPrimary,
      ctaSecondary: heroCtaSecondary,
      scrollDown: tHero("scrollDown"),
      imageSrc: imageSrc(remote?.hero?.image, heroFallbackImage),
      imageAlt: imageAlt(remote?.hero?.image, locale, tHero("imageAlt")),
    },
    about: {
      eyebrow: localizedField(remote?.about?.eyebrow, locale, tAbout("eyebrow")),
      title: localizedField(remote?.about?.title, locale, tAbout("title")),
      intro: localizedField(remote?.about?.intro, locale, tAbout("intro")),
      p1: localizedField(remote?.about?.paragraph1, locale, tAbout("p1")),
      p2: localizedField(remote?.about?.paragraph2, locale, tAbout("p2")),
      caption: localizedField(remote?.about?.caption, locale, tAbout("caption")),
      imageSrc: imageSrc(remote?.about?.image, aboutFallbackImage),
      imageAlt: imageAlt(remote?.about?.image, locale, tAbout("imageAlt")),
      stats: [
        {
          value: tAbout("stats.projects.value"),
          label: tAbout("stats.projects.label"),
        },
        {
          value: tAbout("stats.years.value"),
          label: tAbout("stats.years.label"),
        },
        {
          value: tAbout("stats.contact.value"),
          label: tAbout("stats.contact.label"),
        },
      ],
      statsNote: tAbout("statsNote"),
    },
    services: {
      eyebrow: localizedField(
        remote?.services?.eyebrow,
        locale,
        tServices("eyebrow"),
      ),
      title: localizedField(remote?.services?.title, locale, tServices("title")),
      description: localizedField(
        remote?.services?.description,
        locale,
        tServices("description"),
      ),
      items: servicesItems,
    },
    process: {
      eyebrow: localizedField(
        remote?.process?.eyebrow,
        locale,
        tProcess("eyebrow"),
      ),
      title: localizedField(remote?.process?.title, locale, tProcess("title")),
      description: localizedField(
        remote?.process?.description,
        locale,
        tProcess("description"),
      ),
      steps: resolvedSteps,
    },
    contact: {
      eyebrow: localizedField(
        remote?.contact?.eyebrow,
        locale,
        tContact("eyebrow"),
      ),
      title: localizedField(remote?.contact?.title, locale, tContact("title")),
      description: localizedField(
        remote?.contact?.description,
        locale,
        tContact("description"),
      ),
      ctaPrimary: contactCtaPrimary,
      ctaSecondary: contactCtaSecondary,
      studioLabel: localizedField(
        remote?.contact?.studioLabel,
        locale,
        tContact("studioLabel"),
      ),
      addressLines,
      phoneLabel: localizedField(
        remote?.contact?.phoneLabel,
        locale,
        tContact("phoneLabel"),
      ),
      phone,
      phoneHref: phoneHref(phone),
      emailLabel: localizedField(
        remote?.contact?.emailLabel,
        locale,
        tContact("emailLabel"),
      ),
      email,
      emailHref: `mailto:${email}`,
      hours: localizedField(remote?.contact?.hours, locale, tFooter("hours")),
    },
  };
}

/** Back-compat raw fetch used by tooling / older imports. */
export async function getSiteContent() {
  return getCachedSanitySiteContent();
}
