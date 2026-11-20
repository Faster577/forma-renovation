import { defineField, defineType } from "sanity";

export const localeStringList = defineType({
  name: "localeStringList",
  title: "Localized string list",
  type: "object",
  fields: [
    defineField({
      name: "cs",
      title: "Czech",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "ru",
      title: "Russian",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
