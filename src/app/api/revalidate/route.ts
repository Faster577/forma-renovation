import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const ALLOWED_TAGS = new Set(["siteContent", "project"]);

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function extractSecret(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    return header.slice("Bearer ".length).trim();
  }

  const url = new URL(request.url);
  return url.searchParams.get("secret");
}

function isAuthorized(request: Request): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET?.trim();
  const provided = extractSecret(request);

  // Local/dev convenience: if no secret is configured, allow revalidation.
  // Production must set SANITY_REVALIDATE_SECRET.
  if (!expected) {
    return process.env.NODE_ENV !== "production";
  }

  return Boolean(provided && provided === expected);
}

function tagsFromBody(body: unknown): string[] {
  if (!body || typeof body !== "object") {
    return ["siteContent", "project"];
  }

  const record = body as Record<string, unknown>;

  if (Array.isArray(record.tags)) {
    return record.tags.filter((tag): tag is string => typeof tag === "string");
  }

  // Sanity webhook `_type` hint — invalidate the matching cache family.
  const type =
    typeof record._type === "string"
      ? record._type
      : typeof record.type === "string"
        ? record.type
        : null;

  if (type === "siteContent") {
    return ["siteContent"];
  }
  if (type === "project") {
    return ["project"];
  }

  return ["siteContent", "project"];
}

function revalidate(tags: string[]) {
  for (const tag of tags) {
    // expire: 0 → next request must wait for fresh data (CMS publish UX).
    revalidateTag(tag, { expire: 0 });
  }

  // Also bust locale homepage shells that embed the cached site content.
  if (tags.includes("siteContent")) {
    for (const locale of ["cs", "ru", "en"]) {
      revalidatePath(`/${locale}`, "page");
    }
  }

  if (tags.includes("project")) {
    for (const locale of ["cs", "ru", "en"]) {
      revalidatePath(`/${locale}/realizace`, "page");
    }
  }
}

/**
 * On-demand cache invalidation for Sanity publishes.
 *
 * Auth: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *   or  ?secret=<SANITY_REVALIDATE_SECRET>
 * In non-production, requests are allowed when the secret is unset.
 *
 * Optional JSON body:
 *   { "tags": ["siteContent"] }
 *   { "_type": "project" }
 *
 * Without a body, both siteContent and project tags are revalidated.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    const expected = process.env.SANITY_REVALIDATE_SECRET?.trim();
    if (!expected && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "SANITY_REVALIDATE_SECRET is not configured" },
        { status: 503 },
      );
    }
    return unauthorized();
  }

  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const requested = tagsFromBody(body);
  const tags = [...new Set(requested)].filter((tag) => ALLOWED_TAGS.has(tag));

  if (tags.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No valid tags" },
      { status: 400 },
    );
  }

  revalidate(tags);

  return NextResponse.json({ ok: true, revalidated: tags });
}

/** Convenience for local verification: GET /api/revalidate?tag=siteContent */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    const expected = process.env.SANITY_REVALIDATE_SECRET?.trim();
    if (!expected && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "SANITY_REVALIDATE_SECRET is not configured" },
        { status: 503 },
      );
    }
    return unauthorized();
  }

  const url = new URL(request.url);
  const tag = url.searchParams.get("tag");
  const tags =
    tag && ALLOWED_TAGS.has(tag) ? [tag] : ["siteContent", "project"];

  revalidate(tags);

  return NextResponse.json({ ok: true, revalidated: tags });
}
