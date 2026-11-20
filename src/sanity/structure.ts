import type { StructureResolver } from "sanity/structure";

const SITE_CONTENT_ID = "siteContent";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Website content")
        .id(SITE_CONTENT_ID)
        .child(
          S.document()
            .schemaType("siteContent")
            .documentId(SITE_CONTENT_ID)
            .title("Website content"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Portfolio projects"),
    ]);
