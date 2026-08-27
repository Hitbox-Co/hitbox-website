# HitBox Collectibles — website

The pre-launch marketing site for **HitBox Collectibles**, a platform that connects physical
collectibles to digital experiences that continue after the moment you collect them.

Live domain: `https://hitboxcollectibles.com` · Contact: `Hitboxcollectibles.admin@gmail.com`

| | |
| --- | --- |
| Framework | Next.js 15.5 (App Router) · React 19 |
| Styling | Tailwind CSS v4, `data-theme` dark/light |
| Language | TypeScript (strict) |
| Motion | Lenis smooth scroll |
| Runtime deps | `next`, `react`, `react-dom`, `lenis` — nothing else |

---

## Running it

The app lives in **`starter/`**, not the repo root. Run every command from there.

```bash
cd starter && npm install && npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on :3000 (falls back to :3001) |
| `npm run typecheck` | `tsc --noEmit` — the only static check in the project |
| `npm run build` | Production build |
| `npm run logo` | Regenerate the transparent brand mark from source artwork |

There is no test framework and no ESLint config. Typecheck plus loading pages in the dev server
is the whole verification loop.

**Two things that will bite you.** `next dev` and `next build` share the same `.next` directory,
so running a build while a dev server is up corrupts it — the symptom is a browser
`ChunkLoadError` blaming an innocent component. Stop the dev server first. And when deploying to
Vercel, the project's **Root Directory must be set to `starter`**; Vercel finds no framework at
the repo root.

---

## What's on the site

| Route | Purpose |
| --- | --- |
| `/` | Home — hero carousel, worlds, what/how, collector and creator pitches, app download |
| `/how-it-works` | The scan → claim → unlock lifecycle |
| `/for-collectors` | Collector pitch, account interface preview |
| `/for-artists` | Creator pitch, poster fan, FAQ preview |
| `/about` | Company |
| `/news` | Newsroom — intentionally empty until there is news |
| `/faq` | Full FAQ, grouped by category |
| `/contact` | Contact form |
| `/join-waitlist` | Waitlist capture |
| `/work-with-hitbox` | Partnership hub |
| `/work-with-hitbox/artist-inquiry` | Artist and creator inquiry form |
| `/work-with-hitbox/business-partner-inquiry` | Business partner inquiry form |
| `/thank-you` | Post-submission confirmation |
| `/legal/privacy`, `/legal/terms`, `/legal/accessibility` | Legal |
| `/admin` and its four lead tables | Internal — empty until the forms persist |

Header nav is Home · Collectors · Artists & Creators · News · About · Contact, with **Work With
HitBox** and **Join Waitlist** pinned right. `/how-it-works` is parked out of the header (still
linked from the footer) — see the comment in `src/data/navigation.ts`.

---

## How a page is built

Three ideas explain most of the codebase.

**Routes hold no markup.** `app/` pages compose `components/sections/*`, which compose
`components/ui/*`. Nothing imports upward.

- `components/ui/` — `Section`, `Container`, `SectionHeading`, `Button`, `Card`, `Field`,
  `Accordion`, `ScrollRail`, `Icons`
- `components/sections/` — `HeroCarousel`, `WorldRail`, `FeatureGrid`, `StepFlow`, `StepPanels`,
  `StepCarousel`, `PosterFan`, `CollectionPreview`, `FaqPreview`, `CtaSection`, `AppDownload`
- `components/layout/` — header, footer, nav, theme toggle, smooth scroll, boot screen
- `components/brand/` — `Logo`, `LogoMark`, `PlaceholderMedia`

**Content is data.** Every user-facing string lives in `src/data/*.ts` behind types in
`src/types`. Changing copy means editing data, not JSX. Adding a field to a card or list means
adding it to the type and the data file first.

`about` · `admin` · `app-download` · `artists` · `collectors` · `faq` · `forms` · `hero-slides` ·
`home` · `how-it-works` · `merch` · `navigation` · `news` · `worlds`

**Tone is a composite pattern.** Painting a section blue is never a one-line change — the section
and every child that renders on it must switch together:

```tsx
<Section tone="brand">                          {/* bg-brand-flat */}
  <SectionHeading tone="onBrand" … />            {/* white type */}
  <FeatureGrid features={…} tone="onBrand" />    {/* white/12 cards */}
  <Button variant="onArt">…</Button>             {/* white outline */}
</Section>
```

Miss one and it fails specifically: `FeatureGrid`'s default cards are `bg-ink-soft` (invisible on
blue) and `Button`'s default `bg-brand` disappears against `bg-brand-flat`.

---

## Design system

**Colour tokens** are CSS custom properties in `app/globals.css`, redefined for light mode. Brand
blue is `#0057ff`, deepening to `#0047db` in light mode so it clears AA. `--color-brand-flat` and
the art surfaces deliberately **do not** change between themes — brand bands stay blue in both,
which is why white type on them is correct either way. `scrim` and `navy-deep` are the
theme-stable darks; reach for those when something must not flip.

**Theme** is `data-theme` on `<html>` with a pre-paint script in `app/layout.tsx`; Tailwind's
`light:` custom variant targets light mode.

**Type** is Inter Tight (display, 600–900) and Poppins (body, 400–600). Those weights are loaded,
not synthesized — keep display type at `font-semibold` or heavier or the browser substitutes.

**Buttons** default to `shape="slant"`, the skewed parallelogram house style. Variants map to the
surface underneath: `primary` (filled brand), `brandOutline` (theme surfaces), `onArt` (white
outline, for brand bands and key art), `light` (white fill, for brand bands).

**Two-tone headings.** `PageHero` and `SectionHeading` take `highlight`, rendered in brand blue
after the title; `PageHero` also takes `highlightFirst` when the blue word leads. Split on whole
words including trailing punctuation.

---

## Assets

Source artwork lives in **`../HitBoxAssets/`**, outside the app, in folders named per section.
Working images are copied into `starter/public/<section>/` with kebab-case names describing what
is actually in the frame, then catalogued in a `src/data/*.ts` file with real alt text. Open an
image before naming it — the source filenames are camera and AI exports and say nothing about
content.

| Folder | Holds |
| --- | --- |
| `public/hero/` | The four hero slide plates |
| `public/worlds/` | World rail posters |
| `public/collection/` | Collection preview art |
| `public/merch/` | Jersey and merch shots |
| `public/brand/` | Logo and mark |
| `public/app/` | Phone mockup and QR for the download band |

The phone mockup in `public/app/` is composited, not a screenshot: the app capture is fitted into
a transparent iPhone frame over a black rounded bed, with the leftover height split into a status
band (which the dynamic island sits in) and a home-indicator gap. Rebuild it rather than
hand-editing.

---

## Forms

Four endpoints — `/api/waitlist`, `/api/contact`, `/api/artist-inquiry`, `/api/business-inquiry` —
all delegate to `handleSubmission` in `src/lib/submissions.ts`, which validates required fields
and email shape, then returns `{ ok: true }`.

**Right now it validates and logs to the console. Nothing is persisted or emailed.** The admin
tables are wired up but empty for that reason. Phase 2 replaces the marked block in
`submissions.ts` with three steps: persistence, an internal notification, and a confirmation
email to the submitter. The validated `data` object is all three need.

---

## Content rules

The site ships **no invented content** — no fake artists, products, drops, pricing, reviews or
launch dates. Where assets or data do not exist, use a labelled placeholder (`PlaceholderMedia`,
the empty admin tables, the empty `newsPosts` array) rather than filling the gap.

Two sanctioned exceptions, both explicitly requested:

1. `previewCollectibles` in `src/data/collectors.ts` — mock rows inside a card labelled
   "Interface preview — not a live account". Keep that label.
2. The store badges and QR code in the home page download band — static, non-linking mocks,
   because the app has no listings yet.

---

## Before launch

- [ ] Forms: persistence, internal notification, confirmation email (`src/lib/submissions.ts`)
- [ ] Social handles in `src/lib/site.ts` — currently `#` placeholders
- [ ] App store links and a real QR code in `src/data/app-download.ts`; the badges become links
- [ ] News posts — `newsPosts` is deliberately empty
- [ ] Hero art is 1600×900; larger exports would hold up better full-bleed on wide displays

## Known drift

`starter/README.md` still documents a `/technology` route and a footer waitlist capture. Both were
removed — the route is gone and the footer block is commented out. The rest of that README is
accurate, and more detailed than this file on brand assets, tokens and the forms pipeline.
