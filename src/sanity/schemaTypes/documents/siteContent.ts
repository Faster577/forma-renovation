import { defineArrayMember, defineField, defineType } from "sanity";

export const siteContent = defineType({
  name: "siteContent",
  title: "Website content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "FORMA website content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Homepage hero",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "localeString" }),
        defineField({ name: "subhead", title: "Supporting text", type: "localeText" }),
        defineField({ name: "ctaPrimary", title: "Primary CTA", type: "localeString" }),
        defineField({ name: "ctaSecondary", title: "Secondary CTA", type: "localeString" }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "localeString" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "intro", title: "Intro", type: "localeText" }),
        defineField({ name: "paragraph1", title: "Paragraph 1", type: "localeText" }),
        defineField({ name: "paragraph2", title: "Paragraph 2", type: "localeText" }),
        defineField({ name: "caption", title: "Image caption", type: "localeText" }),
        defineField({
          name: "image",
          title: "About image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "localeString" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
        defineField({
          name: "items",
          title: "Service items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "key",
                  title: "Key",
                  type: "string",
                  description: "Stable id, e.g. kompletni, koupelny",
                  validation: (rule) => rule.required(),
                }),
                defineField({ name: "title", title: "Title", type: "localeString" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "localeText",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: { title: "title.cs", subtitle: "key" },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Process steps",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "number",
                  title: "Step number",
                  type: "string",
                  description: 'e.g. "01"',
                  validation: (rule) => rule.required(),
                }),
                defineField({ name: "title", title: "Title", type: "localeString" }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "localeText",
                }),
              ],
              preview: {
                select: { title: "title.cs", subtitle: "number" },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact details",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "description", title: "Description", type: "localeText" }),
        defineField({ name: "studioLabel", title: "Studio label", type: "localeString" }),
        defineField({
          name: "studioAddress",
          title: "Studio address",
          type: "localeText",
        }),
        defineField({ name: "phoneLabel", title: "Phone label", type: "localeString" }),
        defineField({ name: "phone", title: "Phone number", type: "string" }),
        defineField({ name: "emailLabel", title: "Email label", type: "localeString" }),
        defineField({ name: "email", title: "Email address", type: "string" }),
        defineField({
          name: "hours",
          title: "Opening hours",
          type: "localeString",
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA text",
      type: "object",
      fields: [
        defineField({ name: "primary", title: "Primary CTA", type: "localeString" }),
        defineField({ name: "secondary", title: "Secondary CTA", type: "localeString" }),
        defineField({
          name: "contactPrimary",
          title: "Contact section primary CTA",
          type: "localeString",
        }),
        defineField({
          name: "contactSecondary",
          title: "Contact section secondary CTA",
          type: "localeString",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Website content",
        subtitle: "Singleton — keep a single document",
      };
    },
  },
});
