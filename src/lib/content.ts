export const navItems = [
  { href: "/#o-nas" as const, key: "about" as const },
  { href: "/#sluzby" as const, key: "services" as const },
  { href: "/realizace" as const, key: "portfolio" as const },
  { href: "/#proces" as const, key: "process" as const },
  { href: "/#kontakt" as const, key: "contact" as const },
];

export type ServiceIcon = "home" | "bath" | "layout" | "palette";

export const serviceItems = [
  {
    id: "kompletni" as const,
    image: "/images/service-complete.jpg",
    icon: "home" as const satisfies ServiceIcon,
  },
  {
    id: "koupelny" as const,
    image: "/images/service-bath.jpg",
    icon: "bath" as const satisfies ServiceIcon,
  },
  {
    id: "dispozice" as const,
    image: "/images/service-kitchen.jpg",
    icon: "layout" as const satisfies ServiceIcon,
  },
  {
    id: "design" as const,
    image: "/images/service-design.jpg",
    icon: "palette" as const satisfies ServiceIcon,
  },
];

export const processStepIds = ["01", "02", "03", "04"] as const;
