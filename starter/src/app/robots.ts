import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal dashboard and form endpoints — nothing for a crawler here.
      disallow: ["/admin", "/api", "/thank-you"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
