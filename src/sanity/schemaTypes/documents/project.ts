import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Portfolio project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.cs",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
      description: "Full location label, e.g. Praha 2 — Vinohrady",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "district",
      title: "District",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "renovationType",
      title: "Renovation type",
      type: "string",
      options: {
        list: [
          { title: "Complete renovation", value: "complete" },
          { title: "Layout changes", value: "layout" },
          { title: "Kitchen / bathroom", value: "kitchen_bath" },
          { title: "Design and materials", value: "design" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "area",
      title: "Floor area",
      type: "string",
      description: 'Display value, e.g. "78 m²"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "localeString",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Image gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "localeString",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "beforeAfter",
      title: "Before / after",
      type: "object",
      fields: [
        defineField({
          name: "before",
          title: "Before image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "localeString",
            }),
          ],
        }),
        defineField({
          name: "after",
          title: "After image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "localeString",
            }),
          ],
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "localeString",
        }),
      ],
    }),
    defineField({
      name: "challenges",
      title: "Challenges",
      type: "localeStringList",
    }),
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "localeStringList",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
      validation: (rule) => rule.integer(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "year", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title.cs",
      subtitle: "location.cs",
      media: "coverImage",
      order: "order",
      featured: "featured",
    },
    prepare({ title, subtitle, media, order, featured }) {
      return {
        title: title || "Untitled project",
        subtitle: [featured ? "Featured" : null, order != null ? `#${order}` : null, subtitle]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
