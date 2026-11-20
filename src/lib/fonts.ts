import { Outfit, Space_Grotesk } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const fontVariables = `${outfit.variable} ${spaceGrotesk.variable}`;
