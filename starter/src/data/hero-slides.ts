/**
 * Home page hero rotation. Every slide points at a real section of this site —
 * no invented products, artists, drops or launch dates.
 */
export type HeroSlide = {
  id: string;
  eyebrow: string;
  /** Small flags rendered next to the eyebrow. */
  flags?: string[];
  title: string;
  body: string;
  /** Tailwind gradient classes painted behind the slide. */
  tone: string;
  /**
   * Optional full-bleed key art. When absent the slide falls back to the
   * poster treatment built from `tone` — no invented artwork.
   */
  image?: { src: string; alt: string };
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "intro",
    eyebrow: "HitBox Collectibles",
    flags: ["PRE-LAUNCH"],
    title: "A new way to collect.",
    body: "HitBox brings physical collectibles to life through connected digital experiences that continue long after the moment you collect them.",
    tone: "from-brand via-navy to-scrim",
    image: {
      src: "/hero/bix-collect-play-repeat.jpg",
      alt: "HitBox key art: the wordmark above the line Collect. Play. Repeat., surrounded by five-star trading cards and a HitBox Collector Pack.",
    },
    primary: { label: "Join Waitlist", href: "/join-waitlist" },
    secondary: { label: "See How It Works", href: "/how-it-works" },
  },
  {
    id: "how-it-works",
    eyebrow: "How it works",
    title: "Scan. Claim. Unlock.",
    body: "Claiming a HitBox collectible takes a few simple steps, and it stays in your account from then on.",
    tone: "from-brand-bright via-brand to-navy-deep",
    image: {
      src: "/hero/bix-stadium-kickoff.jpg",
      alt: "Bix in a black kit resting a foot on a football on the pitch of a floodlit stadium, with confetti falling and flags waving in the crowd.",
    },
    primary: { label: "See How It Works", href: "/how-it-works" },
    secondary: { label: "Read the FAQ", href: "/faq" },
  },
  {
    id: "collectors",
    eyebrow: "For collectors",
    title: "Build collections that keep growing",
    body: "Organize claimed collectibles into digital collections and revisit the experiences connected to every release.",
    tone: "from-navy via-brand to-scrim",
    image: {
      src: "/hero/bix-character-crowd.jpg",
      alt: "A crowd of Bix characters in different outfits bursting out of a blue speed-line background, surrounded by HitBox cards, coins, stickers and keychains.",
    },
    primary: { label: "Explore For Collectors", href: "/for-collectors" },
    secondary: { label: "Join Waitlist", href: "/join-waitlist" },
  },
  {
    id: "artists",
    eyebrow: "For artists & creators",
    title: "Connect your merch to an experience",
    body: "Build collectible campaigns around albums, tours, events and product launches — with creative control over every experience.",
    tone: "from-brand via-brand-bright to-navy",
    image: {
      src: "/hero/bix-neon-city.jpg",
      alt: "Bix standing in a cape on a rooftop above a neon city at night, under the HitBox Collectibles lockup and the line Limited by nature. Made to last.",
    },
    primary: { label: "Start Artist Inquiry", href: "/work-with-hitbox/artist-inquiry" },
    secondary: { label: "Work With HitBox", href: "/work-with-hitbox" },
  },
];
