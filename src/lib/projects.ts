export type ProjectTypeKey = "complete" | "layout" | "kitchen_bath" | "design";

export type ProjectBase = {
  slug: string;
  typeKey: ProjectTypeKey;
  area: string;
  year: string;
  featuredOnHomepage?: boolean;
  hero: string;
  gallery: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
};

export const projects: ProjectBase[] = [
  {
    slug: "byt-vinohrady",
    typeKey: "complete",
    area: "78 m²",
    year: "2025",
    featuredOnHomepage: true,
    hero: "/images/projects/vinohrady-hero.jpg",
    gallery: [
      "/images/projects/vinohrady-01.jpg",
      "/images/projects/vinohrady-02.jpg",
      "/images/projects/vinohrady-03.jpg",
      "/images/projects/vinohrady-04.jpg",
      "/images/projects/vinohrady-05.jpg",
    ],
    beforeAfter: {
      before: "/images/projects/vinohrady-before.jpg",
      after: "/images/projects/vinohrady-after.jpg",
    },
  },
  {
    slug: "loft-karlin",
    typeKey: "layout",
    area: "112 m²",
    year: "2024",
    featuredOnHomepage: true,
    hero: "/images/projects/karlin-hero.jpg",
    gallery: [
      "/images/projects/karlin-01.jpg",
      "/images/projects/karlin-02.jpg",
      "/images/projects/karlin-03.jpg",
      "/images/projects/karlin-04.jpg",
      "/images/projects/karlin-05.jpg",
      "/images/projects/karlin-06.jpg",
    ],
  },
  {
    slug: "apartman-mala-strana",
    typeKey: "design",
    area: "54 m²",
    year: "2024",
    featuredOnHomepage: true,
    hero: "/images/projects/mala-strana-hero.jpg",
    gallery: [
      "/images/projects/mala-strana-01.jpg",
      "/images/projects/mala-strana-02.jpg",
      "/images/projects/mala-strana-03.jpg",
      "/images/projects/mala-strana-04.jpg",
    ],
  },
  {
    slug: "byt-zizkov",
    typeKey: "complete",
    area: "67 m²",
    year: "2025",
    hero: "/images/projects/zizkov-hero.jpg",
    gallery: [
      "/images/projects/zizkov-01.jpg",
      "/images/projects/zizkov-02.jpg",
      "/images/projects/zizkov-03.jpg",
      "/images/projects/zizkov-04.jpg",
      "/images/projects/zizkov-05.jpg",
    ],
    beforeAfter: {
      before: "/images/projects/zizkov-before.jpg",
      after: "/images/projects/zizkov-after.jpg",
    },
  },
  {
    slug: "byt-smichov",
    typeKey: "kitchen_bath",
    area: "89 m²",
    year: "2023",
    hero: "/images/projects/smichov-hero.jpg",
    gallery: [
      "/images/projects/smichov-01.jpg",
      "/images/projects/smichov-02.jpg",
      "/images/projects/smichov-03.jpg",
      "/images/projects/smichov-04.jpg",
      "/images/projects/smichov-05.jpg",
    ],
    beforeAfter: {
      before: "/images/projects/smichov-before.jpg",
      after: "/images/projects/smichov-after.jpg",
    },
  },
  {
    slug: "byt-holesovice",
    typeKey: "complete",
    area: "96 m²",
    year: "2025",
    hero: "/images/projects/holesovice-hero.jpg",
    gallery: [
      "/images/projects/holesovice-01.jpg",
      "/images/projects/holesovice-02.jpg",
      "/images/projects/holesovice-03.jpg",
      "/images/projects/holesovice-04.jpg",
      "/images/projects/holesovice-05.jpg",
    ],
  },
];

export type LocalizedProject = {
  slug: string;
  typeKey: ProjectTypeKey;
  type: string;
  area: string;
  year: string;
  title: string;
  district: string;
  location: string;
  summary: string;
  description: string;
  hero: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string }>;
  beforeAfter?: {
    before: { src: string; alt: string };
    after: { src: string; alt: string };
    caption: string;
  };
  challenges: string[];
  solutions: string[];
  featuredOnHomepage?: boolean;
};

type TranslateFn = {
  (key: string): string;
  raw: (key: string) => unknown;
};

export function localizeProject(
  project: ProjectBase,
  t: TranslateFn,
): LocalizedProject {
  const base = `Projects.${project.slug}`;
  const galleryAlts = t.raw(`${base}.gallery`) as string[];

  const localized: LocalizedProject = {
    slug: project.slug,
    typeKey: project.typeKey,
    type: t(`ProjectTypes.${project.typeKey}`),
    area: project.area,
    year: project.year,
    title: t(`${base}.title`),
    district: t(`${base}.district`),
    location: t(`${base}.location`),
    summary: t(`${base}.summary`),
    description: t(`${base}.description`),
    hero: {
      src: project.hero,
      alt: t(`${base}.heroAlt`),
    },
    gallery: project.gallery.map((src, index) => ({
      src,
      alt: galleryAlts[index] ?? `${t(`${base}.title`)} ${index + 1}`,
    })),
    challenges: t.raw(`${base}.challenges`) as string[],
    solutions: t.raw(`${base}.solutions`) as string[],
    featuredOnHomepage: project.featuredOnHomepage,
  };

  if (project.beforeAfter) {
    localized.beforeAfter = {
      before: {
        src: project.beforeAfter.before,
        alt: t(`${base}.beforeAlt`),
      },
      after: {
        src: project.beforeAfter.after,
        alt: t(`${base}.afterAlt`),
      },
      caption: t(`${base}.beforeAfterCaption`),
    };
  }

  return localized;
}

export function getProjectBySlug(slug: string): ProjectBase | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): ProjectBase[] {
  return projects.filter((project) => project.featuredOnHomepage);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
