import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-ink text-ivory hover:bg-ink/90 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]",
  secondary:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.05]",
  light:
    "bg-ivory text-ink hover:bg-ivory/90 shadow-[0_1px_0_rgba(0,0,0,0.04)_inset]",
} as const;

function isExternal(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonLinkProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${variants[variant]} ${className}`;

  if (isExternal(href)) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
