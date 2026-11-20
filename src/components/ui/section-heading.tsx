import { FadeIn } from "@/components/ui/fade-in";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "";

  return (
    <FadeIn className={`mb-12 md:mb-16 flex flex-col gap-4 max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p
          className={`text-[0.7rem] tracking-[0.28em] uppercase ${
            light ? "text-ivory/55" : "text-ink/45"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`text-base md:text-lg leading-relaxed ${
            light ? "text-ivory/70" : "text-ink/65"
          }`}
        >
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}
