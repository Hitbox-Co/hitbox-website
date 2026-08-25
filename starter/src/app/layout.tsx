import type { Metadata } from "next";
import { Inter_Tight, Poppins } from "next/font/google";

import { BootScreen } from "@/components/layout/BootScreen";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/lib/site";

import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-inter-tight",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  icons: {
    icon: "/brand/hitbox-mark.png",
    apple: "/brand/hitbox-mark.png",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // The pre-paint script below sets data-theme, which the server does not
      // know about; without this React strips it again on hydration.
      suppressHydrationWarning
      className={`${interTight.variable} ${poppins.variable}`}
    >
      <body>
        {/* Applied before paint so the first frame is already the right theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('hitbox:theme');var t=s===\"light\"||s===\"dark\"?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){}})()",
          }}
        />

        <SmoothScroll />

        <BootScreen />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-[4px] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:font-display focus:font-extrabold focus:uppercase"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
