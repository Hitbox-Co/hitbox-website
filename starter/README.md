# HitBox Collectibles — website (Phase 1)

Next.js 15 (App Router) build of the HitBox Collectibles website, implementing the
34-page build sheet: every page, section, form field and admin table it specifies.

**This is not an ecommerce site.** Per the build sheet, it contains no fake artists,
products, drops, pricing, reviews, partnerships, testimonials or launch dates. Where
final assets don't exist yet, the site uses clearly-labelled placeholders instead of
inventing content.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

> Don't run `npm run build` while `npm run dev` is running — they share `.next` and
> the build will clobber the dev server. Stop dev first.

## Brand

The mark is your supplied artwork, not a redraw.

| File | Role |
| --- | --- |
| `public/brand/hitbox-logo.png` | Source artwork, byte-identical to `HitBoxAssets/HitBoxLogo.png` |
| `public/brand/hitbox-mark.png` | Generated transparent version — what the site actually renders |
| `scripts/build-logo.mjs` | Generates the above (`npm run logo`) |
| `src/components/brand/LogoMark.tsx` | Renders the mark |
| `src/components/brand/Logo.tsx` | Lockup — mark + live-text wordmark |

**Why the generated file exists.** The source PNG is 8-bit grayscale with no alpha —
a white mark on a solid black square. Dropped in as-is it shows a black box on every
surface. `mix-blend-mode: screen` looks like a fix but fails in practice: the fixed,
z-indexed header forms its own stacking context, so the blend has nothing to screen
against and the black returns. `npm run logo` instead bakes the artwork luminance into
a real alpha channel and forces the colour to white, then trims the transparent margin.
Antialiased edges survive, and the mark composites correctly on any background.

Re-run `npm run logo` if the source artwork is ever replaced.

Size the mark with height utilities (`h-9 w-auto`) and fade it with `opacity-*` — it is
an image, so `text-*` colour classes do not apply. It appears as the favicon, in the
header and footer, as a watermark behind every page hero and hero slide, inside the CTA
band, on the mission/vision and leadership cards, in the admin banner, and as the motif
in every placeholder media slot.

## Design system

Modelled on the SEGA publisher site's visual language — deep navy surfaces, an electric
blue accent, tight uppercase display type over soft geometric body type. Tokens live in
`src/app/globals.css` under Tailwind v4's `@theme`.

| Token | Value | Used for |
| --- | --- | --- |
| `--color-ink` | `#0d1126` | Page background |
| `--color-ink-soft` / `--color-ink-raised` | `#151b3a` / `#1b2246` | Card surfaces |
| `--color-navy` / `--color-navy-deep` | `#002366` / `#001845` | Footer, gradients |
| `--color-brand` | `#0057ff` | Primary buttons, step markers, active states |
| `--color-brand-bright` | `#007aff` | Eyebrows, hover rings, focus |
| `--color-muted` | `#c3c5d5` | Body copy on dark |

Typography: **Inter Tight** 800 uppercase for headings and buttons, **Poppins** for body
copy, both via `next/font/google`.

Carried-over layout patterns: two-tier sticky header (brand bar + nav strip), full-bleed
cross-fading hero carousel with progress-bar pagination, hover-lift cards with brand
rings, alternating section bands, and the gradient brand panel in the footer — reused
here to hold the waitlist capture.

## Site map

```
/                                              Home
/how-it-works                                  Full claim lifecycle
/for-collectors                                Collector benefits + account preview
/for-artists                                   Partnership benefits + process
/technology                                    High-level platform overview
/about                                         Mission, vision, values, leadership
/faq                                           5 categories, accordions
/join-waitlist                                 Full waitlist form
/work-with-hitbox                              Inquiry router
  /artist-inquiry                              Artist & creator form
  /business-partner-inquiry                    Business partner form
/contact                                       General contact form
/thank-you                                     Post-submission (noindex)
/legal/privacy · /legal/terms · /legal/accessibility
/admin                                         Internal dashboard (noindex)
  /waitlist · /artist-leads · /partner-leads · /messages
```

## Folder structure

```
src/
├── app/                        Routes only — pages compose sections
│   ├── layout.tsx              Fonts, metadata, header/footer shell, skip link
│   ├── page.tsx                Home
│   ├── globals.css             Tailwind import + design tokens
│   ├── api/                    waitlist · artist-inquiry · business-inquiry · contact
│   ├── admin/                  Dashboard (own layout + nav)
│   └── …                       One folder per page above
│
├── components/
│   ├── brand/                  LogoMark, Logo, PlaceholderMedia
│   ├── ui/                     Button, Card, Container, Section, SectionHeading,
│   │                           Accordion, Field (inputs), ScrollRail, Icons
│   ├── layout/                 SiteHeader, MainNav, MobileNav, PageHero,
│   │                           SiteFooter, LegalPage
│   ├── sections/               HeroCarousel, FeatureGrid, StepFlow, CtaSection,
│   │                           FaqPreview, CollectionPreview
│   ├── forms/                  FormFrame + the four forms
│   └── admin/                  AdminNav, DataTable
│
├── data/                       Content layer — one file per page
├── hooks/                      useCarousel, useScrollRail, useScrolled,
│                               useLockBodyScroll, useFormSubmit
├── lib/                        utils, site config, submissions handler
└── types/                      Shared domain types
```

### Conventions

- **`app/` holds routes, never markup.** Pages import sections; sections import UI
  primitives. Nothing reaches back up.
- **Server components by default.** Only the header, navs, carousel, accordion, forms,
  scroll rail and admin table are `"use client"`.
- **Content is data, not JSX.** Every string lives in `src/data/*.ts` behind the types in
  `src/types`. Point those exports at a CMS and no component changes.

## Forms

All four forms validate on the client, post JSON to their own API route, validate again
on the server, then redirect to `/thank-you`.

**Before launch**, replace the marked block in `src/lib/submissions.ts` with:

1. persistence (a database insert, so the admin dashboard has real rows),
2. an internal notification to the HitBox team,
3. a confirmation email to the submitter.

The validated payload is the only input those three steps need.

## Admin dashboard

`/admin` is `noindex` and **has no authentication** — add it before deploying. The
tables render from the arrays in `src/data/admin.ts`, which are empty on purpose: no
invented leads. Search, status filtering, column sorting, CSV export and the empty
states all work against whatever rows they're given, so connecting real data means
changing only those arrays.

## Before launch

- [ ] Legal review of `/legal/privacy` and `/legal/terms` (both flagged as templates in-page)
- [ ] Real contact email and social URLs in `src/lib/site.ts`
- [ ] Persist form submissions + wire confirmation emails (`src/lib/submissions.ts`)
- [ ] Add authentication to `/admin`
- [ ] Replace `PlaceholderMedia` slots with final artwork, and write alt text for each
- [ ] Publish leadership profiles in `src/data/about.ts`

## Accessibility

Skip link, focus-visible rings, labelled carousel with `tablist` pagination,
`aria-current` on active nav items, Escape-to-close and scroll-lock on the mobile menu,
`aria-expanded`/`aria-controls` on accordions, `aria-sort` on sortable table headers,
labelled form fields with errors announced via `role="alert"`, and autoplay that stops
for `prefers-reduced-motion`.
