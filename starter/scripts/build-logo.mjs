/**
 * Derives a transparent logo from the supplied artwork.
 *
 * The source (`HitBoxLogo.png`) is 8-bit grayscale with no alpha — a white mark
 * on a solid black square. Dropped straight into the page that black ground is
 * visible on every surface, and `mix-blend-mode: screen` can't fix it reliably
 * because a fixed/z-indexed ancestor forms its own stacking context and the
 * blend has nothing to screen against.
 *
 * So we bake the ground out properly: take each pixel's luminance as the alpha
 * channel and force the colour to white. Antialiased edges survive intact, and
 * the result composites correctly on any background with no blend tricks.
 * The transparent margin is then trimmed so the mark fills its own box.
 *
 * Run with: npm run logo
 */
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "public/brand/hitbox-logo.png");
const outFile = resolve(root, "public/brand/hitbox-mark.png");

mkdirSync(dirname(outFile), { recursive: true });

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Luminance -> alpha, colour -> white.
for (let i = 0; i < data.length; i += 4) {
  const luminance = data[i];
  data[i] = 255;
  data[i + 1] = 255;
  data[i + 2] = 255;
  data[i + 3] = luminance;
}

const info2 = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  // Trim the now-transparent border so the mark fills the frame.
  .trim({ threshold: 1 })
  .toFile(outFile);

console.log(
  `Wrote ${outFile.replace(root, ".")} — ${info2.width}x${info2.height} ` +
    `(from ${info.width}x${info.height}), alpha baked from luminance.`,
);
