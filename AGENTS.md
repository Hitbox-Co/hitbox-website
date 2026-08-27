# AGENTS.md

Agent brief for the **HitBox Collectibles** website. Self-contained: everything needed to make a
correct change lives here.

Related files: `CLAUDE.md` is the Claude Code copy of the working rules; `WEBSITE.md` is the
human-facing overview. If you change how the project works, update all three.

---

## 1. Orientation

Pre-launch marketing site for a platform that connects physical collectibles to digital
experiences. Next.js 15 App Router, React 19, Tailwind v4, TypeScript strict. Runtime deps are
only `next`, `react`, `react-dom`, `lenis`.

**The app is in `starter/`, not the repo root.** Run every npm command from there. On Vercel the
project's Root Directory must be `starter`.

```
hitbox-website/
├── AGENTS.md · CLAUDE.md · WEBSITE.md
└── starter/
    ├── public/<section>/       # working images, kebab-case
    ├── scripts/build-logo.mjs  # npm run logo
    └── src/
        ├── app/                # routes — compose sections, hold no markup
        ├── components/
        │   ├── brand/          # Logo, LogoMark, PlaceholderMedia
        │   ├── layout/         # header, footer, nav, theme, smooth scroll
        │   ├── sections/       # page-level blocks
        │   └── ui/             # primitives
        ├── data/               # every user-facing string
        ├── hooks/              # useCarousel, useFormSubmit, useLockBodyScroll,
        │                       #   useScrolled, useScrollRail
        ├── lib/                # site, utils, submissions, smooth-scroll
        └── types/              # shared domain types
```

Source artwork lives in `../HitBoxAssets/`, outside the repo. Imports use `@/*` → `./src/*`.

## 2. Verification loop

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server, :3000 (falls back to :3001) |
| `npm run typecheck` | `tsc --noEmit` — **the only static check that exists** |
| `npm run build` | Production build |
| `npm run logo` | Regenerate the transparent brand mark |

There is no test framework and no ESLint config. Do not offer to write tests unless asked to set
a framework up. Verification is `npm run typecheck` plus loading the page.

**Never run `npm run build` while a dev server is running.** They share `.next`, and a build
silently corrupts a running dev server. The symptom is a browser `ChunkLoadError` for a chunk the
server still returns 200 for, with a stack trace blaming an innocent component. Same for a second
dev server. To recover: stop everything, delete `.next`, start one server.

Check for an existing server before starting one: `curl -s -o /dev/null -w "%{http_code}"
http://localhost:3000`. Use the one that is already running.

**Line endings are mixed.** Most files are CRLF; some (`src/data/home.ts`) are LF. Git normalises
on commit, so it rarely shows in a diff — but a scripted edit matching `\n` against a CRLF file
silently finds nothing. Prefer the Edit tool. If scripting, match `\r?\n`, and check the file's
own endings before rewriting them.

## 3. The three rules that explain the codebase

**Routes hold no markup.** `app/*/page.tsx` composes `components/sections/*`, which compose
`components/ui/*`. Nothing imports upward. A page file that grows JSX is a smell — extract a
section.

**Content is data.** Every user-facing string lives in `src/data/*.ts` behind a type in
`src/types`. Changing copy means editing data, not JSX. Adding a field to a card or list means
adding it to the type and the data file *first*.

**Tone is a composite.** Painting a section blue is never a one-line change — the section and
every child rendered on it must switch together:

```tsx
<Section tone="brand">                          {/* bg-brand-flat */}
  <SectionHeading tone="onBrand" … />            {/* white type */}
  <FeatureGrid features={…} tone="onBrand" />    {/* white/12 cards */}
  <Card tone="onBrand">…</Card>
  <StepFlow steps={…} tone="onBrand" />
  <Button variant="onArt">…</Button>             {/* white outline */}
</Section>
```

Miss one and it fails specifically: `FeatureGrid`'s default cards are `bg-ink-soft` (invisible on
blue) and `Button`'s default `bg-brand` disappears against `bg-brand-flat`. Drop `bordered` when
a section becomes `tone="brand"` — the colour change already separates it. Components carrying
their own surface (`CollectionPreview`, the contact form, `PlaceholderMedia`) are deliberately
left alone so they read as panels sitting *on* the band.

## 4. Design system

**Colour** is CSS custom properties in `app/globals.css`, redefined under a light-mode block.
Brand blue `#0057ff`, deepening to `#0047db` in light so it clears AA.

Theme-stable tokens — **not** redefined in light mode, use these when something must not flip:
`--color-scrim` (#0d1126), `--color-navy-deep`, `--color-brand-flat`, and the art surfaces. This
is why white type on a brand band is correct in both themes. `ink`, `ink-soft`, `paper`, `fg`,
`muted`, `line` and `brand*` all *do* flip.

**Theme** is `data-theme` on `<html>` with a pre-paint script in `app/layout.tsx`; Tailwind's
`light:` custom variant targets light mode.

**Type** is Inter Tight (display, **600–900**) and Poppins (body, **400–600**). Those weights are
loaded, not synthesized — `font-display` at `font-medium` (500) has no real face and the browser
substitutes. Keep display type at `font-semibold` or heavier. `h1`–`h4` are uppercase globally.

**Buttons** default to `shape="slant"` — the skewed parallelogram is the house style, not an
opt-in. Variants map to the surface underneath:

| Variant | Use on |
| --- | --- |
| `primary` | Filled brand, any theme surface |
| `brandOutline` | Blue outline, theme surfaces (matches the header CTA) |
| `onArt` | White outline, brand bands and key art |
| `light` | White fill, brand bands |

**Two-tone headings.** `PageHero` and `SectionHeading` take `highlight`, rendered in brand blue
after `title`; `PageHero` also takes `highlightFirst` when the blue word leads. Split on whole
words *including trailing punctuation* — `highlight="HitBox?"`, not `"HitBox"` plus an orphaned
`?`.

## 5. Traps found the hard way

**`cn` is a plain joiner, not tailwind-merge** (`src/lib/utils.ts`). Passing `items-start` and
`items-center` together does not resolve — CSS source order decides, unpredictably. Use a
responsive variant (`lg:items-start`) so the two never apply at the same breakpoint.

**`hidden` does not work on `<Button>`.** Its base class sets `inline-flex`; both are display
utilities of equal specificity and `inline-flex` wins. Put the breakpoint on a wrapper:
`<span className="hidden sm:inline-flex"><Button …/></span>`.

**Overlays must be portalled out of `<header>`.** The header applies `backdrop-blur` once
scrolled, and a backdrop filter makes an element the containing block for `position: fixed`
descendants — collapsing a `fixed inset-0` overlay into the 64px header bar. `MobileNav` renders
its drawer through `createPortal(drawer, document.body)` for exactly this reason.

**Anything that locks the page must also stop Lenis.** Smooth scrolling is driven by Lenis
(`components/layout/SmoothScroll.tsx`), which scrolls from wheel/touch events — `body { overflow:
hidden }` alone does not freeze the page. Use `useLockBodyScroll`, which calls
`pauseSmoothScroll()`/`resumeSmoothScroll()`. Lenis also disables native `scroll-behavior` via
`html.lenis`, and is skipped entirely under `prefers-reduced-motion`.

**Tailwind v4 emits `rotate`/`scale` as standalone CSS properties**, not inside `transform`. When
verifying in the browser read `getComputedStyle(el).rotate`, not `.transform`.

**Wrapping words in `inline-block` destroys the spaces.** Splitting a heading for per-word
animation makes `textContent` read `"Anewwaytocollect."` to a screen reader. Separate the wrappers
with real space text nodes rather than a margin. See `HeroCarousel`.

**A drop-shadow's reach is offset + blur.** The device mockup's `drop-shadow(0 50px 70px)` extends
~120px past its own box — enough to fall across the next element in a stacked layout. Budget for
it in the row gap, or shrink the shadow at that breakpoint.

**Grid centring needs symmetric side columns.** `1fr auto 1fr` centres the middle track;
`1fr auto 20rem` does not. If you switch to symmetric columns, re-check that long unbreakable
words in the narrowed side column still fit — `overflow-hidden` on a section will clip them
silently rather than produce a scrollbar.

## 6. Assets

`../HitBoxAssets/<Section>/` holds the source exports. Working copies go to
`starter/public/<section>/` with kebab-case names describing what is in the frame, then get
catalogued in a `src/data/*.ts` file with real alt text.

**Open every image before naming it.** The source filenames are camera, WhatsApp and AI exports
(`WhatsApp Image 2026-08-27 at 12.13.16 AM.jpeg`) and say nothing about content. Alt text must
describe what is actually visible — do not carry over a description from the file it replaces.

| Folder | Holds |
| --- | --- |
| `public/hero/` | Four hero slide plates |
| `public/worlds/` | World rail posters (also reused as decoration in `AppDownload`) |
| `public/collection/` | Collection preview art |
| `public/merch/` | Jersey and merch shots |
| `public/brand/` | Logo and mark |
| `public/app/` | Device mockup and QR for the download band |

When a user drops in a new file, check whether an existing one disappeared from the source folder
— that usually means replacement, not addition. Watch for duplicate exports where one has a baked
background and the other is transparent; prefer the transparent one and trim empty padding to the
alpha bounds before converting. `sharp` is available via `starter/node_modules` (set `NODE_PATH`
when running a script from outside the app).

## 7. Content rules

The site ships **no invented content** — no fake artists, products, drops, pricing, reviews or
launch dates. Where assets or data do not exist, use a labelled placeholder (`PlaceholderMedia`,
the empty admin tables, the empty `newsPosts` array) rather than filling the gap.

Two sanctioned exceptions, both explicitly requested by the site owner:

1. `previewCollectibles` in `src/data/collectors.ts` — mock rows inside a card labelled
   "Interface preview — not a live account". **Keep that label.**
2. The store badges and QR code in `AppDownload` — static, non-linking mocks, because the app has
   no listings yet. Give them real hrefs once the listings exist.

Do not add copy that claims the app is available, and do not fabricate store URLs.

## 8. Site map

Home (`app/page.tsx`), in order: `HeroCarousel` → `WorldRail` → What is HitBox (brand band) →
How it works preview → Why collect (brand band) → Why create → `AppDownload`.

Other routes: `/how-it-works`, `/for-collectors`, `/for-artists`, `/about`, `/news` (empty by
design), `/faq`, `/contact`, `/join-waitlist`, `/work-with-hitbox` (+ `/artist-inquiry`,
`/business-partner-inquiry`), `/thank-you`, `/legal/{privacy,terms,accessibility}`, and `/admin`
with four lead tables.

Header nav: Home · Collectors · Artists & Creators · News · About · Contact, with **Work With
HitBox** and **Join Waitlist** pinned right. `/how-it-works` is parked out of the header but still
linked from the footer — see the comment in `src/data/navigation.ts`; do not "tidy" it away.

**Forms.** `/api/{waitlist,contact,artist-inquiry,business-inquiry}` all delegate to
`handleSubmission` in `src/lib/submissions.ts`, which validates required fields and email shape,
then **logs to the console**. Nothing is persisted or emailed, which is why the admin tables are
empty. Phase 2 replaces the marked block with persistence, an internal notification and a
confirmation email; the validated `data` object is all three need.

## 9. Working expectations

- Verify with `npm run typecheck` and by measuring in the browser, not by assuming. Geometry
  claims (centred, flush, no overlap) should come from `getBoundingClientRect`, and clipping from
  `scrollWidth` vs client width.
- Check both themes when touching colour, and at least 375px and a desktop width when touching
  layout.
- Say plainly what was verified and what was not.
