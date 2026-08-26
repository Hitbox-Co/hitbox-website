/**
 * Site-wide constants. The social handles are still placeholders — fill them
 * in before launch rather than inventing them. The contact address is live and
 * is the single source for every mailto on the site.
 */
export const site = {
  name: "HitBox Collectibles",
  shortName: "HitBox",
  tagline: "A new way to collect.",
  description:
    "HitBox brings physical collectibles to life through connected digital experiences that continue long after the moment you collect them.",
  url: "https://hitboxcollectibles.com",
  email: "Hitboxcollectibles.admin@gmail.com",
  social: [
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;
