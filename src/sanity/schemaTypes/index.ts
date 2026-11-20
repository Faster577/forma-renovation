import type { SchemaTypeDefinition } from "sanity";
import { project } from "./documents/project";
import { siteContent } from "./documents/siteContent";
import { localeString } from "./objects/localeString";
import { localeStringList } from "./objects/localeStringList";
import { localeText } from "./objects/localeText";

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localeStringList,
  project,
  siteContent,
];
