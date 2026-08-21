/**
 * Key art for the poster rail on the home page.
 *
 * The posters carry their own typography, so the rail renders them clean —
 * no overlaid titles or labels. `alt` describes each piece for screen readers
 * and is the only copy attached to a tile.
 */
export type WorldTile = {
  id: string;
  image: { src: string; alt: string };
};

export const worldPosters: WorldTile[] = [
  {
    id: "bix-stadium",
    image: {
      src: "/worlds/bix-stadium.jpg",
      alt: "HitBox key art: Bix in a football kit resting a boot on the ball in a floodlit stadium.",
    },
  },
  {
    id: "bix-all-stars",
    image: {
      src: "/worlds/bix-all-stars.jpg",
      alt: "HitBox key art: Bix All Stars first anniversary poster with the full cast of Bix characters.",
    },
  },
  {
    id: "bix-bubble-rumble",
    image: {
      src: "/worlds/bix-bubble-rumble.jpg",
      alt: "HitBox key art: Bix Bubble Rumble poster with Bix characters inside bubbles above floating islands.",
    },
  },
  {
    id: "bix-dual-sides",
    image: {
      src: "/worlds/bix-dual-sides.jpg",
      alt: "HitBox key art: Bix Dual Sides poster with two suited Bix figures against a split red and black backdrop.",
    },
  },
];
