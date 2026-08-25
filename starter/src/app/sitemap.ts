import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * Public, indexable routes. `/admin`, `/api` and `/thank-you` are deliberately
 * absent — add new marketing pages here when they ship.
 */
const routes = [
  { path: "", priority: 1 },
  { path: "/how-it-works", priority: 0.9 },
  { path: "/for-collectors", priority: 0.9 },
  { path: "/for-artists", priority: 0.9 },
  { path: "/join-waitlist", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/work-with-hitbox", priority: 0.8 },
  { path: "/work-with-hitbox/artist-inquiry", priority: 0.7 },
  { path: "/work-with-hitbox/business-partner-inquiry", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/legal/privacy", priority: 0.3 },
  { path: "/legal/terms", priority: 0.3 },
  { path: "/legal/accessibility", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
