import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "@/sanity/env";

function getBuilder() {
  if (!isSanityConfigured()) {
    return null;
  }

  return createImageUrlBuilder({ projectId, dataset });
}

function hasImageAsset(source: SanityImageSource): boolean {
  if (typeof source === "string") {
    return source.length > 0;
  }

  if (!source || typeof source !== "object") {
    return false;
  }

  const record = source as Record<string, unknown>;
  const asset = record.asset;

  if (typeof asset === "string" && asset.length > 0) {
    return true;
  }

  if (asset && typeof asset === "object") {
    const assetRecord = asset as Record<string, unknown>;
    if (typeof assetRecord._ref === "string" && assetRecord._ref.length > 0) {
      return true;
    }
    if (typeof assetRecord._id === "string" && assetRecord._id.length > 0) {
      return true;
    }
    if (typeof assetRecord.url === "string" && assetRecord.url.length > 0) {
      return true;
    }
  }

  return typeof record._ref === "string" && record._ref.length > 0;
}

export function urlForImage(source: SanityImageSource | null | undefined) {
  const builder = getBuilder();
  if (!builder || !source || !hasImageAsset(source)) {
    return null;
  }

  return builder.image(source);
}

export function urlForImageSrc(
  source: SanityImageSource | null | undefined,
  width = 1600,
): string | null {
  const image = urlForImage(source);
  if (!image) {
    return null;
  }

  return image.width(width).auto("format").url();
}
