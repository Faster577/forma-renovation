import { FadeIn } from "@/components/ui/fade-in";
import { SafeImage } from "@/components/ui/safe-image";
import { Link } from "@/i18n/navigation";
import type { LocalizedProject } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  project: LocalizedProject;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <FadeIn delay={Math.min(index * 0.06, 0.24)}>
      <Link
        href={`/realizace/${project.slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
      >
        <article className="flex h-full flex-col">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone/40">
            <SafeImage
              src={project.hero.src}
              alt={project.hero.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              fallbackClassName="absolute inset-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
          </div>
          <div className="flex flex-1 flex-col gap-3 pt-5">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-ink/40 break-words">
              {project.district} · {project.type} · {project.area}
            </p>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-ink/80">
                {project.title}
              </h3>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-ink/35 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </div>
            <p className="text-sm leading-relaxed text-ink/55 line-clamp-2">
              {project.summary}
            </p>
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}
