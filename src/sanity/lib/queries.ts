import { defineQuery } from "next-sanity";

const localeStringProjection = `{ cs, ru, en }`;
const localeTextProjection = `{ cs, ru, en }`;
const localeStringListProjection = `{ cs, ru, en }`;

// Explicit fields only — avoid `...` which can pull transient `_upload`
// blobs into the Next.js Data Cache and omit the final `asset` ref.
const imageProjection = `{
  asset->{_id, url},
  hotspot,
  crop,
  alt ${localeStringProjection}
}`;

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    "slug": slug.current,
    title ${localeStringProjection},
    summary ${localeTextProjection},
    description ${localeTextProjection},
    location ${localeStringProjection},
    district ${localeStringProjection},
    renovationType,
    area,
    year,
    coverImage ${imageProjection},
    gallery[] ${imageProjection},
    beforeAfter {
      before ${imageProjection},
      after ${imageProjection},
      caption ${localeStringProjection}
    },
    challenges ${localeStringListProjection},
    solutions ${localeStringListProjection},
    featured,
    order
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title ${localeStringProjection},
    summary ${localeTextProjection},
    description ${localeTextProjection},
    location ${localeStringProjection},
    district ${localeStringProjection},
    renovationType,
    area,
    year,
    coverImage ${imageProjection},
    gallery[] ${imageProjection},
    beforeAfter {
      before ${imageProjection},
      after ${imageProjection},
      caption ${localeStringProjection}
    },
    challenges ${localeStringListProjection},
    solutions ${localeStringListProjection},
    featured,
    order
  }
`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(order asc, year desc) {
    _id,
    "slug": slug.current,
    title ${localeStringProjection},
    summary ${localeTextProjection},
    description ${localeTextProjection},
    location ${localeStringProjection},
    district ${localeStringProjection},
    renovationType,
    area,
    year,
    coverImage ${imageProjection},
    gallery[] ${imageProjection},
    beforeAfter {
      before ${imageProjection},
      after ${imageProjection},
      caption ${localeStringProjection}
    },
    challenges ${localeStringListProjection},
    solutions ${localeStringListProjection},
    featured,
    order
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`);

export const siteContentQuery = defineQuery(`
  *[_type == "siteContent" && _id == "siteContent"][0] {
    _id,
    title,
    hero {
      headline ${localeStringProjection},
      subhead ${localeTextProjection},
      ctaPrimary ${localeStringProjection},
      ctaSecondary ${localeStringProjection},
      image ${imageProjection}
    },
    about {
      eyebrow ${localeStringProjection},
      title ${localeStringProjection},
      intro ${localeTextProjection},
      paragraph1 ${localeTextProjection},
      paragraph2 ${localeTextProjection},
      caption ${localeTextProjection},
      image ${imageProjection}
    },
    services {
      eyebrow ${localeStringProjection},
      title ${localeStringProjection},
      description ${localeTextProjection},
      items[] {
        key,
        title ${localeStringProjection},
        description ${localeTextProjection},
        image ${imageProjection}
      }
    },
    process {
      eyebrow ${localeStringProjection},
      title ${localeStringProjection},
      description ${localeTextProjection},
      steps[] {
        number,
        title ${localeStringProjection},
        description ${localeTextProjection}
      }
    },
    contact {
      eyebrow ${localeStringProjection},
      title ${localeStringProjection},
      description ${localeTextProjection},
      studioLabel ${localeStringProjection},
      studioAddress ${localeTextProjection},
      phoneLabel ${localeStringProjection},
      phone,
      emailLabel ${localeStringProjection},
      email,
      hours ${localeStringProjection}
    },
    cta {
      primary ${localeStringProjection},
      secondary ${localeStringProjection},
      contactPrimary ${localeStringProjection},
      contactSecondary ${localeStringProjection}
    }
  }
`);
