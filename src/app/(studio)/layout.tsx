import { fontVariables } from "@/lib/fonts";
import type { ReactNode } from "react";
import "../globals.css";

/**
 * Separate root layout for /studio so [locale] can be a true root layout
 * (required for next/root-params + Cache Components).
 */
export default function StudioRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="m-0 min-h-full bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}
