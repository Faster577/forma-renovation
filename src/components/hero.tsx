"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { SafeImage } from "@/components/ui/safe-image";
import type { LocalizedHeroContent } from "@/sanity/lib/site-content";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";

type HeroProps = {
  content: LocalizedHeroContent;
};

export function Hero({ content }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <SafeImage
          src={content.imageSrc}
          alt={content.imageAlt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
          fallbackClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/35 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 font-display text-4xl tracking-[0.06em] text-ivory sm:text-5xl"
        >
          FORMA<span className="text-accent">.</span>
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl break-words font-display text-[2.35rem] leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        >
          {content.headline}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg"
        >
          {content.subhead}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <ButtonLink href="/poptavka" variant="light">
            {content.ctaPrimary}
          </ButtonLink>
          <ButtonLink
            href="/realizace"
            variant="ghost"
            className="!text-ivory/85 hover:!bg-ivory/10 hover:!text-ivory"
          >
            {content.ctaSecondary}
          </ButtonLink>
        </motion.div>

        <motion.a
          href="#o-nas"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-14 inline-flex w-fit items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-ivory/55 transition-colors hover:text-ivory"
        >
          {content.scrollDown}
          <ArrowDown size={14} strokeWidth={1.5} className="animate-soft-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
