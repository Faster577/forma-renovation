import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SafeImage } from "@/components/ui/safe-image";
import type { LocalizedServicesContent } from "@/sanity/lib/site-content";
import { Bath, Home, LayoutTemplate, Palette } from "lucide-react";

const icons = {
  home: Home,
  bath: Bath,
  layout: LayoutTemplate,
  palette: Palette,
} as const;

type ServicesProps = {
  content: LocalizedServicesContent;
};

export function Services({ content }: ServicesProps) {
  return (
    <section id="sluzby" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {content.items.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <FadeIn key={service.id} delay={index * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden border border-ink/8 bg-ivory transition-colors duration-500 hover:border-ink/20">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SafeImage
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      fallbackClassName="absolute inset-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-7 md:p-8">
                    <div className="flex items-center gap-3 text-ink/55">
                      <Icon size={18} strokeWidth={1.4} />
                      <span className="text-[0.65rem] tracking-[0.22em] uppercase">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl tracking-tight text-ink md:text-[1.7rem]">
                      {service.title}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-ink/60">
                      {service.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
