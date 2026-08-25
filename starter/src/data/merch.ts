import type { WorldTile } from "@/data/worlds";

/**
 * Merchandise photography for the artists & creators masthead.
 *
 * The worn shot sits in the middle of the fan — it is the only lifestyle image
 * of the three, so it carries the cluster while the flat packshots flank it.
 */
export const artistMerch: WorldTile[] = [
  {
    id: "hitbox-jersey-violet",
    image: {
      src: "/merch/hitbox-jersey-violet.png",
      alt: "HitBox Collectibles jersey in violet, black and white, laid flat.",
    },
  },
  {
    id: "hitbox-jersey-worn",
    image: {
      src: "/merch/hitbox-jersey-worn.jpg",
      alt: "A model in a red and black HitBox Collectibles jersey and matching cap.",
    },
  },
  {
    id: "hitbox-jersey-mono",
    image: {
      src: "/merch/hitbox-jersey-mono.jpg",
      alt: "HitBox Collectibles jersey in black and white, laid flat.",
    },
  },
];
