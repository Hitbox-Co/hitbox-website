import type { FooterGroup, NavLink } from "@/types";
import { site } from "@/lib/site";

/** Header navigation, in the order given by the build sheet. */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Collectors", href: "/for-collectors" },
  { label: "Artists & Creators", href: "/for-artists" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** The two conversion actions, pinned to the right of the header. */
export const headerActions = {
  secondary: { label: "Work With HitBox", href: "/work-with-hitbox" },
  primary: { label: "Join Waitlist", href: "/join-waitlist" },
} as const;

export const footerGroups: FooterGroup[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "For Collectors", href: "/for-collectors" },
      { label: "For Artists & Creators", href: "/for-artists" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
  },
  {
    heading: "Community",
    links: [
      ...site.social.map((item) => ({ label: item.label, href: item.href })),
      { label: "Join Waitlist", href: "/join-waitlist" },
    ],
  },
];
