import type { AppLocale } from "@/i18n/routing";
import {
  getAllProjectSlugs as getStaticProjectSlugs,
  getFeaturedProjects as getStaticFeaturedProjects,
  getProjectBySlug as getStaticProjectBySlug,
  localizeProject,
  projects as staticProjects,
  type LocalizedProject,
  type ProjectBase,
  type ProjectTypeKey,
} from "@/lib/projects";
import {
  getCachedFeaturedSanityProjects,
  getCachedSanityProjectBySlug,
  getCachedSanityProjectSlugs,
  getCachedSanityProjects,
} from "@/sanity/lib/cached-projects";
import { urlForImageSrc } from "@/sanity/lib/image";
import { pickLocalized } from "@/sanity/lib/locale";
import type { SanityImageWithAlt, SanityProject } from "@/sanity/types";

type TranslateFn = {
  (key: string): string;
  raw: (key: string) => unknown;
};

const PROJECT_TYPE_KEYS: ProjectTypeKey[] = [
  "complete",
  "layout",
  "kitchen_bath",
  "design",
];

function isProjectTypeKey(value: string | null | undefined): value is ProjectTypeKey {
  return PROJECT_TYPE_KEYS.includes(value as ProjectTypeKey);
}

function imageSrc(image: SanityImageWithAlt | null | undefined, width?: number) {
  const asset = image?.asset;
  const hasAsset = Boolean(
    asset &&
      (typeof asset === "string" ||
        asset._ref ||
        asset._id ||
        asset.url),
  );

  if (!hasAsset) {
    return "";
  }

  try {
    return urlForImageSrc(image, width) ?? "";
  } catch {
    return "";
  }
}

function imageAlt(
  image: SanityImageWithAlt | null | undefined,
  locale: AppLocale,
  fallback: string,
) {
  return pickLocalized(image?.alt, locale, fallback)?.trim() || fallback;
}

function mapSanityProject(
  project: SanityProject,
  locale: AppLocale,
  t: TranslateFn,
): LocalizedProject | null {
  if (!project.slug) {
    return null;
  }

  const title =
    pickLocalized(project.title, locale, project.slug)?.trim() || project.slug;
  const typeKey = isProjectTypeKey(project.renovationType)
    ? project.renovationType
    : "complete";

  const gallery = (project.gallery ?? [])
    .map((item, index) => {
      const src = imageSrc(item);
      if (!src) {
        return null;
      }

      return {
        src,
        alt: imageAlt(item, locale, `${title} ${index + 1}`),
      };
    })
    .filter((item): item is { src: string; alt: string } => item !== null);

  const challenges = (pickLocalized(project.challenges, locale, []) ?? [])
    .map((item) => item.trim())
    .filter(Boolean);

  const solutions = (pickLocalized(project.solutions, locale, []) ?? [])
    .map((item) => item.trim())
    .filter(Boolean);

  const localized: LocalizedProject = {
    slug: project.slug,
    typeKey,
    type: t(`ProjectTypes.${typeKey}`),
    area: project.area?.trim() || "—",
    year: project.year?.trim() || "—",
    title,
    district: pickLocalized(project.district, locale, "")?.trim() || "",
    location: pickLocalized(project.location, locale, "")?.trim() || "",
    summary: pickLocalized(project.summary, locale, "")?.trim() || "",
    description: pickLocalized(project.description, locale, "")?.trim() || "",
    hero: {
      src: imageSrc(project.coverImage),
      alt: imageAlt(project.coverImage, locale, title),
    },
    gallery,
    challenges,
    solutions,
    featuredOnHomepage: Boolean(project.featured),
  };

  const beforeSrc = imageSrc(project.beforeAfter?.before);
  const afterSrc = imageSrc(project.beforeAfter?.after);

  if (
    beforeSrc &&
    afterSrc &&
    project.beforeAfter?.before &&
    project.beforeAfter?.after
  ) {
    localized.beforeAfter = {
      before: {
        src: beforeSrc,
        alt: imageAlt(project.beforeAfter.before, locale, title),
      },
      after: {
        src: afterSrc,
        alt: imageAlt(project.beforeAfter.after, locale, title),
      },
      caption:
        pickLocalized(project.beforeAfter.caption, locale, "")?.trim() || "",
    };
  }

  return localized;
}

function localizeStaticProjects(t: TranslateFn, list: ProjectBase[]) {
  return list.map((project) => localizeProject(project, t));
}

function mapSanityList(
  remote: SanityProject[],
  locale: AppLocale,
  t: TranslateFn,
) {
  return remote
    .map((project) => mapSanityProject(project, locale, t))
    .filter((project): project is LocalizedProject => project !== null);
}

/**
 * Returns portfolio projects from Sanity when configured and populated,
 * otherwise falls back to the existing static demo data + message catalogs.
 */
export async function getLocalizedProjects(
  locale: AppLocale,
  t: TranslateFn,
): Promise<LocalizedProject[]> {
  const remote = await getCachedSanityProjects();

  if (remote && remote.length > 0) {
    return mapSanityList(remote, locale, t);
  }

  return localizeStaticProjects(t, staticProjects);
}

export async function getLocalizedFeaturedProjects(
  locale: AppLocale,
  t: TranslateFn,
): Promise<LocalizedProject[]> {
  const remote = await getCachedFeaturedSanityProjects();

  if (remote && remote.length > 0) {
    return mapSanityList(remote, locale, t);
  }

  const catalog = await getCachedSanityProjects();
  if (catalog && catalog.length > 0) {
    return [];
  }

  return localizeStaticProjects(t, getStaticFeaturedProjects());
}

export async function getLocalizedProjectBySlug(
  slug: string,
  locale: AppLocale,
  t: TranslateFn,
): Promise<LocalizedProject | null> {
  const remote = await getCachedSanityProjectBySlug(slug);

  if (remote?.slug) {
    return mapSanityProject(remote, locale, t);
  }

  const remoteSlugs = await getCachedSanityProjectSlugs();
  if (remoteSlugs && remoteSlugs.length > 0) {
    return null;
  }

  const fallback = getStaticProjectBySlug(slug);
  return fallback ? localizeProject(fallback, t) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const remote = await getCachedSanityProjectSlugs();

  if (remote && remote.length > 0) {
    return remote.filter(Boolean);
  }

  return getStaticProjectSlugs();
}
