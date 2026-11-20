"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { SafeImage } from "@/components/ui/safe-image";
import { useTranslations } from "next-intl";
import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

type ProjectGalleryProps = {
  images: GalleryImage[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const t = useTranslations("ProjectPage");

  if (!current) return null;

  return (
    <section aria-label={`${t("gallery")} — ${title}`} className="space-y-5">
      <FadeIn>
        <div className="relative aspect-[16/10] overflow-hidden bg-stone/30 md:aspect-[21/11]">
          <SafeImage
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
            fallbackClassName="absolute inset-0"
          />
        </div>
        <p className="mt-3 text-sm text-ink/50">{current.alt}</p>
      </FadeIn>

      <FadeIn delay={0.08}>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 md:gap-3">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={`${image.src}-${index}`}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={t("showPhoto", {
                    index: index + 1,
                    alt: image.alt,
                  })}
                  aria-current={selected ? "true" : undefined}
                  className={`relative aspect-[4/3] w-full overflow-hidden transition-[opacity,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 ${
                    selected
                      ? "ring-1 ring-ink/40 opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <SafeImage
                    src={image.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                    fallbackClassName="absolute inset-0"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </FadeIn>
    </section>
  );
}
