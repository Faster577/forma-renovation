import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import type { LocalizedContactContent } from "@/sanity/lib/site-content";
import { Mail, MapPin, Phone } from "lucide-react";

type ContactCtaProps = {
  content: LocalizedContactContent;
};

export function ContactCta({ content }: ContactCtaProps) {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <FadeIn className="lg:col-span-7">
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/45">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-[1.1] tracking-tight text-ivory sm:text-4xl md:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/65 md:text-lg">
            {content.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/poptavka" variant="light">
              {content.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href={content.emailHref}
              variant="ghost"
              className="!text-ivory/85 hover:!bg-ivory/10 hover:!text-ivory"
            >
              {content.ctaSecondary}
            </ButtonLink>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="lg:col-span-5">
          <div className="flex h-full flex-col justify-end gap-8 border-t border-ivory/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="flex items-start gap-4 text-ivory/75">
              <MapPin size={18} strokeWidth={1.4} className="mt-1 shrink-0" />
              <div>
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40">
                  {content.studioLabel}
                </p>
                <p className="mt-1 leading-relaxed">
                  {content.addressLines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-ivory/75">
              <Phone size={18} strokeWidth={1.4} className="mt-1 shrink-0" />
              <div>
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40">
                  {content.phoneLabel}
                </p>
                <a
                  href={content.phoneHref}
                  className="mt-1 block transition-colors hover:text-ivory"
                >
                  {content.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 text-ivory/75">
              <Mail size={18} strokeWidth={1.4} className="mt-1 shrink-0" />
              <div>
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-ivory/40">
                  {content.emailLabel}
                </p>
                <a
                  href={content.emailHref}
                  className="mt-1 block transition-colors hover:text-ivory"
                >
                  {content.email}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
