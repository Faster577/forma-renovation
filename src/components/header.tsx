"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ButtonLink } from "@/components/ui/button-link";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/content";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHome);
  const reduceMotion = useReducedMotion();
  const tNav = useTranslations("Nav");
  const tCommon = useTranslations("Common");

  const onHero = isHome && !scrolled && !open;
  const inkTone = onHero ? "text-ivory" : "text-ink";
  const mutedTone = onHero ? "text-ivory/70 hover:text-ivory" : "text-ink/60 hover:text-ink";
  const focusRing = onHero
    ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(!isHome || window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,color] duration-500 ${
        scrolled || open
          ? "border-b border-ink/8 bg-ivory/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className={`font-display text-2xl tracking-[0.04em] transition-colors ${inkTone} ${focusRing}`}
          aria-label={tCommon("brandHome")}
        >
          FORMA
          <span className={onHero ? "text-ivory/70" : "text-accent"}>.</span>
        </Link>

        <nav
          className="hidden items-center gap-8 xl:gap-9 lg:flex"
          aria-label={tCommon("mainNav")}
        >
          {navItems.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`text-[0.8rem] tracking-[0.16em] uppercase transition-colors ${mutedTone} ${focusRing}`}
            >
              {tNav(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher light={onHero} />
          <ButtonLink
            href="/poptavka"
            variant={onHero ? "light" : "primary"}
            className={`!py-2.5 !px-5 text-[0.75rem] tracking-[0.14em] uppercase ${focusRing}`}
          >
            {tCommon("consultation")}
          </ButtonLink>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden ${inkTone} ${focusRing}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? tCommon("closeMenu") : tCommon("openMenu")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-ink/8 bg-ivory lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6 sm:px-8"
              aria-label={tCommon("mobileNav")}
            >
              {navItems.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="rounded-sm py-3 text-lg text-ink/80 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25"
                  onClick={() => setOpen(false)}
                >
                  {tNav(link.key)}
                </Link>
              ))}
              <div className="mt-4 border-t border-ink/8 pt-4">
                <LanguageSwitcher onNavigate={() => setOpen(false)} />
              </div>
              <ButtonLink
                href="/poptavka"
                className="mt-4 w-full uppercase tracking-[0.14em]"
                onClick={() => setOpen(false)}
              >
                {tCommon("consultationLong")}
              </ButtonLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
