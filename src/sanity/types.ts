import type { ProjectTypeKey } from "@/lib/projects";
import type { AppLocale } from "@/i18n/routing";

export type LocaleString = Record<AppLocale, string>;
export type LocaleText = Record<AppLocale, string>;
export type LocaleStringList = Record<AppLocale, string[]>;

export type SanityImageWithAlt = {
  asset?: {
    _ref?: string;
    _type?: string;
    _id?: string;
    url?: string;
  } | null;
  hotspot?: unknown;
  crop?: unknown;
  alt?: Partial<LocaleString> | null;
};

export type SanityProject = {
  _id: string;
  slug: string;
  title: LocaleString;
  summary: LocaleText;
  description: LocaleText;
  location: LocaleString;
  district: LocaleString;
  renovationType: ProjectTypeKey;
  area: string;
  year: string;
  coverImage: SanityImageWithAlt;
  gallery?: SanityImageWithAlt[] | null;
  beforeAfter?: {
    before?: SanityImageWithAlt | null;
    after?: SanityImageWithAlt | null;
    caption?: Partial<LocaleString> | null;
  } | null;
  challenges?: Partial<LocaleStringList> | null;
  solutions?: Partial<LocaleStringList> | null;
  featured?: boolean | null;
  order?: number | null;
};

export type SanitySiteContent = {
  _id: string;
  title?: string;
  hero?: {
    headline?: Partial<LocaleString>;
    subhead?: Partial<LocaleText>;
    ctaPrimary?: Partial<LocaleString>;
    ctaSecondary?: Partial<LocaleString>;
    image?: SanityImageWithAlt | null;
  } | null;
  about?: {
    eyebrow?: Partial<LocaleString>;
    title?: Partial<LocaleString>;
    intro?: Partial<LocaleText>;
    paragraph1?: Partial<LocaleText>;
    paragraph2?: Partial<LocaleText>;
    caption?: Partial<LocaleText>;
    image?: SanityImageWithAlt | null;
  } | null;
  services?: {
    eyebrow?: Partial<LocaleString>;
    title?: Partial<LocaleString>;
    description?: Partial<LocaleText>;
    items?: Array<{
      key: string;
      title?: Partial<LocaleString>;
      description?: Partial<LocaleText>;
      image?: SanityImageWithAlt | null;
    }> | null;
  } | null;
  process?: {
    eyebrow?: Partial<LocaleString>;
    title?: Partial<LocaleString>;
    description?: Partial<LocaleText>;
    steps?: Array<{
      number: string;
      title?: Partial<LocaleString>;
      description?: Partial<LocaleText>;
    }> | null;
  } | null;
  contact?: {
    eyebrow?: Partial<LocaleString>;
    title?: Partial<LocaleString>;
    description?: Partial<LocaleText>;
    studioLabel?: Partial<LocaleString>;
    studioAddress?: Partial<LocaleText>;
    phoneLabel?: Partial<LocaleString>;
    phone?: string | null;
    emailLabel?: Partial<LocaleString>;
    email?: string | null;
    hours?: Partial<LocaleString>;
  } | null;
  cta?: {
    primary?: Partial<LocaleString>;
    secondary?: Partial<LocaleString>;
    contactPrimary?: Partial<LocaleString>;
    contactSecondary?: Partial<LocaleString>;
  } | null;
};
