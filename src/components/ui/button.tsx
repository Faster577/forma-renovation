import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
};

const variants = {
  primary:
    "bg-ink text-ivory hover:bg-ink/90 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] disabled:bg-ink/40",
  secondary:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03] disabled:opacity-50",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.05] disabled:opacity-50",
  light:
    "bg-ivory text-ink hover:bg-ivory/90 shadow-[0_1px_0_rgba(0,0,0,0.04)_inset] disabled:opacity-50",
} as const;

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
