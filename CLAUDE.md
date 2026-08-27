# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

The Next.js app lives in **`starter/`**, not at the repo root. Run every npm command from
`starter/`. When deploying to Vercel, the project's **Root Directory must be set to `starter`** —
Vercel finds no framework at the repo root and the import fails otherwise.

`starter/README.md` is detailed and current on brand assets, the design tokens, the forms
pipeline and the pre-launch checklist. Read it before changing those areas; this file covers
what it does not.

## Commands

All from `starter/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (defaults to 3000; falls back to 3001 if taken) |
| `npm run typecheck` | `tsc --noEmit` — the only static check in the project |
| `npm run build` | Production build |
| `npm run logo` | Regenerate the transparent brand mark from source artwork |

**There is no test framework and no ESLint config.** `npm run typecheck` plus loading pages in
the dev server is the whole verification loop. Do not suggest running or writing tests unless
asked to set a framework up.

### `.next` is shared — this will bite you

`next dev` and `next build` use the same `.next` directory, and **a build silently corrupts a
running dev server**. Two dev servers pointed at the repo do the same thing to each other. The
symptom is a `ChunkLoadError` in the browser for a chunk the server still returns 200 for, and
the stack trace blames innocent components.

- Do not run `npm run build` while the user has a dev server running. Ask them to stop it first.
- Do not start a second dev server to check something — use theirs.
- Recovering: stop everything, `rm -rf .next`, restart one server.

### Line endings

Source files use **CRLF**. Scripted edits that match on `\n` will silently fail to find
anything. Prefer the Edit tool; if scripting, match `\r?\n` and write `\r\n`.

## Architecture

Three ideas explain most of the codebase:

**Routes hold no markup.** `app/` pages compose `components/sections/*`, which compose
`components/ui/*`. Nothing imports upward.

**Content is data.** Every user-facing string lives in `src/data/*.ts` behind types in
`src/types`. Changing copy means editing data, not JSX. When adding a field to a card or list,
add it to the type and the data file first.

**Tone is a composite pattern.** Painting a section blue is never a one-line change — the
section and every child that renders on it must be switched together:

```tsx
<Section tone="brand">                                  {/* bg-brand-flat */}
  <SectionHeading tone="onBrand" … />                   {/* white type */}
  <FeatureGrid features={…} tone="onBrand" />           {/* white/12 cards */}
  <Card tone="onBrand">…</Card>
  <StepFlow steps={…} tone="onBrand" />
  <Button variant="onArt">…</Button>                    {/* white outline */}
</Section>
```

Miss one and it fails in a specific way: `FeatureGrid`'s default cards are `bg-ink-soft`
(invisible on blue), and `Button`'s default `bg-brand` disappears against `bg-brand-flat`.
Components that carry their own surface — `CollectionPreview`, the contact form, `PlaceholderMedia` —
are deliberately left alone so they read as panels sitting *on* the band.

Drop `bordered` when switching a section to `tone="brand"`; the colour change already separates it.

### Buttons

`Button` defaults to `shape="slant"` — the skewed parallelogram is the house style, not an
opt-in. Variants map to the surface underneath:

| Variant | Use on |
| --- | --- |
| `primary` | Filled brand, any theme surface |
| `brandOutline` | Blue outline, theme surfaces (matches the header CTA) |
| `onArt` | White outline, brand bands and key art |
| `light` | White fill, brand bands |

### Two-tone headings

`PageHero` and `SectionHeading` both take `highlight` (rendered in brand blue after `title`).
`PageHero` also takes `highlightFirst` for headings where the blue word leads, e.g. "**HitBox**
news". Split on whole words including trailing punctuation — `highlight="HitBox?"`, not
`"HitBox"` plus an orphaned `?`.

### Theme

Dark and light via `data-theme` on `<html>`, with a pre-paint script in `app/layout.tsx`.
Tailwind's `light:` custom variant targets light mode. `--color-brand-flat` and the art
surfaces deliberately **do not** change in light mode — brand bands stay blue in both themes,
which is why white type on them is correct either way.

## Traps found the hard way

**`hidden` does not work on `<Button>`.** Its base class sets `inline-flex`; both are display
utilities of equal specificity and `inline-flex` wins. Put the breakpoint on a wrapper:

```tsx
<span className="hidden sm:inline-flex"><Button …/></span>
```

**Overlays must be portalled out of `<header>`.** The header applies `backdrop-blur` once
scrolled, and a backdrop filter makes an element the containing block for `position: fixed`
descendants — which collapses a `fixed inset-0` overlay into the 64px header bar. `MobileNav`
renders its drawer through `createPortal(drawer, document.body)` for exactly this reason.

**Anything that locks the page must also stop Lenis.** Smooth scrolling is driven by Lenis
(`components/layout/SmoothScroll.tsx`), which scrolls from wheel/touch events — so
`body { overflow: hidden }` alone does not freeze the page. `useLockBodyScroll` calls
`pauseSmoothScroll()`/`resumeSmoothScroll()`; reuse it rather than setting overflow directly.
Lenis also disables native `scroll-behavior` via `html.lenis`, and is skipped entirely under
`prefers-reduced-motion`.

**Font weights are loaded, not synthesized.** Inter Tight ships **600–900** and Poppins
**400–600** (`app/layout.tsx`). `font-display` with `font-medium` (500) has no real face and the
browser substitutes. Keep display type at `font-semibold` or heavier.

**Tailwind v4 emits `rotate`/`scale` as standalone CSS properties**, not inside `transform`.
When verifying in the browser, read `getComputedStyle(el).rotate`, not `.transform`.

## Content rules

The site ships **no invented content** — no fake artists, products, drops, pricing, reviews or
launch dates. Where assets or data do not exist, use a labelled placeholder (`PlaceholderMedia`,
the empty admin tables, the empty `newsPosts` array) rather than filling the gap.

The one sanctioned exception is `previewCollectibles` in `src/data/collectors.ts` — mock rows the
user explicitly asked for, inside a card labelled "Interface preview — not a live account". Keep
that label if you touch it.

## Assets

Source artwork lives in **`../HitBoxAssets/`**, outside the app, in folders named per section.
Working images are copied into `starter/public/<section>/` with kebab-case names and catalogued
in a `src/data/*.ts` file with real alt text. Open an image before naming it — the source
filenames are camera/AI exports and say nothing about content.

## Known drift

`starter/README.md` still documents a `/technology` route and a footer waitlist capture. Both
were removed; the route is gone and the footer block is commented out. Treat the rest of the
README as accurate.
