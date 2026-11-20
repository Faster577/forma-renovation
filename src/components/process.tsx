import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LocalizedProcessContent } from "@/sanity/lib/site-content";

type ProcessProps = {
  content: LocalizedProcessContent;
};

export function Process({ content }: ProcessProps) {
  return (
    <section id="proces" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <ol className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li key={step.number} className="h-full bg-ivory">
              <FadeIn delay={index * 0.08} className="h-full">
                <div className="flex h-full flex-col gap-6 p-7 md:p-8">
                  <span className="font-display text-4xl text-accent/80 md:text-5xl">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60 md:text-[0.95rem]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
