# Database schema — HitBox Web (Phase 1)

Source of truth for the DB structure. Kept in step with `schema.prisma` alongside it; change
both together.

**Reference only.** Both files document the intended Phase 1 database. Nothing in the site is
wired to Prisma — no dependency, no client, no migrations — and the forms still log rather than
persist.

Phase 1 is lead capture only: four public forms and the data they collect. No users,
collectibles, collections, orders, scans or claims — those live in the platform backend, not
here.

**Field naming below follows the Prisma schema.** Prisma models use camelCase; Postgres columns
are snake_case via `@map`. The website's form inputs use their own names, which do **not** all
match — the mapping is given per model, and the API route is where the translation happens.

---

## 1. Where the data comes from

Four endpoints, all currently routed through `handleSubmission` in `src/lib/submissions.ts`,
which validates and then `console.info`s the payload. **Nothing is persisted yet**.

| Endpoint | Form component | Model |
| --- | --- | --- |
| `POST /api/waitlist` | `WaitlistForm` (3 variants) | `WaitlistSubscriber` |
| `POST /api/contact` | `ContactForm` | `ContactSubmission` |
| `POST /api/artist-inquiry` | `ArtistInquiryForm` | `ArtistLead` |
| `POST /api/business-inquiry` | `BusinessPartnerForm` | `PartnerLead` |

---

## 2. Read this before writing the persistence layer

The schema is designed for the forms Phase 1 *will* have. The forms that exist today are
narrower. Five things will fail or silently lose data if the insert is written from the schema
alone.

### 2.1 Non-null columns with no source in any current form

Every one of these blocks an insert today.

| Model | Field | Situation |
| --- | --- | --- |
| all four | `consentVersion` | `String`, non-null. No form sends a version; the waitlist sends only `consent: "yes"` |
| all four | `consentTimestamp` | `DateTime`, non-null. Derivable server-side as `now()` |
| `ArtistLead` | `primaryCategory` | Not on the form at all |
| `ArtistLead` | `contactRole` | Not on the form at all |
| `ArtistLead` | `authorizedConfirmation` | `Boolean`, non-null. The artist form has **no checkbox of any kind** |
| `PartnerLead` | `jobTitle` | On the form, but **optional** — schema says non-null |
| `PartnerLead` | `companyWebsite` | On the form as `website`, but **optional** — schema says non-null |

`consentVersion` is the one to settle first: it applies to all four models and needs a real
value, e.g. the privacy-policy revision in force (`"2026-08-01"` or `"v1.2"`), stored as a
constant the API route stamps onto every insert and bumps when the policy text changes.

**The contact form has no consent checkbox at all**, yet `ContactSubmission.consentVersion` is
non-null. Either add a checkbox, or accept that "consent" here records the policy version in
force at submission rather than an affirmative tick — and say which, because they mean different
things to an auditor.

### 2.2 Fields the forms collect that the schema has nowhere to put

These are filled in today and would be dropped on insert.

| Form field | Form | Nearest home | Status |
| --- | --- | --- | --- |
| `additional` | Artist inquiry | — | **No column.** Free text, currently lost |
| `additional` | Partner inquiry | — | **No column.** Free text, currently lost |
| `companyDescription` | Partner inquiry | `relevantCapabilities`? | Not the same question; mapping it is a judgement call |

There is also no `rawPayload Json` column on any model. Without one, anything unmapped is gone
for good. Adding one is cheap and is the standard hedge while forms are still changing.

### 2.3 Type mismatches

| Field | Schema | Form sends |
| --- | --- | --- |
| `ArtistLead.collectibleFormats` | `String[]` | `collectibleType` — a **single** `<select>` value |
| `ArtistLead.primarySocialUrl` | one URL | `socials` — a free-text **textarea**, multi-line, unparsed |
| `ArtistLead.additionalSocialUrls` | `String[]` | nothing |
| `WaitlistSubscriber.interests` | `String[]` | array, string, or absent — see below |

**The `interests` trap.** `useFormSubmit` builds the payload with `formData.getAll(key)` and then
collapses it: two ticks give `["Music","Gaming"]`, exactly one gives the bare string `"Music"`,
none omits the key entirely. Normalise to an array in the route or a single-interest signup
throws on a `String[]` column.

### 2.4 `country` on the waitlist must stay nullable

`WaitlistForm` renders in three variants. The footer and compact versions send only `firstName`,
`email` and `consent`. Only the full page adds `lastName`, `country` and `interests` — and marks
`country` required *in that form's HTML*. The schema has it nullable, which is correct; do not
"fix" it to non-null on the strength of the form markup, or every footer signup will fail.

This is also why `sourcePage` matters more than it looks: it is the only way to tell a footer
signup from a full-page one.

### 2.5 Nothing captures attribution or request context

No UTM parameters, referrer, source page, IP or user agent are read anywhere in the codebase —
verified by search. Every one of these columns will be null unless the work is done:

- `utmSource` / `utmMedium` / `utmCampaign` / `utmContent` / `utmTerm` — read from the query
  string on landing, persist for the session, submit as hidden fields.
- `sourcePage` — the path the form was submitted from; a hidden input is more reliable than the
  `Referer` header.
- `ipHash` — hash it, do not store the raw address.
- `userAgentSummary` — a summary (browser/OS family), not the full string.

`ipHash` and `userAgentSummary` are still personal data even hashed/reduced. The privacy policy
must mention them **before** they start being collected.

---

## 3. Models

Legend: **N** = non-null in the schema. "Form field" is the `name` attribute the site submits
today; **—** means nothing sends it yet.

### `WaitlistSubscriber` → `waitlist_subscribers`

| Field | Column | N | Form field | Notes |
| --- | --- | --- | --- | --- |
| `id` | `id` | ✓ | — | uuid |
| `email` | `email` | ✓ | `email` | As typed |
| `emailNormalized` | `email_normalized` | ✓ | derived | `@unique` — lower/trim of `email`. This is the dedupe key; a repeat signup throws, so decide what the form says then |
| `firstName` | `first_name` | | `firstName` | Required by the form, nullable in the schema |
| `lastName` | `last_name` | | `lastName` | Full form only |
| `country` | `country` | | `country` | Full form only — see §2.4 |
| `stateRegion` | `state_region` | | — | |
| `city` | `city` | | — | |
| `ageRange` | `age_range` | | — | |
| `interests` | `interests` | ✓ | `interests` | `String[]`, default `[]`. See §2.3 |
| `musicGenres` | `music_genres` | ✓ | — | `String[]`, will be empty |
| `referralSource` | `referral_source` | | — | |
| `utmSource` … `utmTerm` | `utm_*` | | — | §2.5 |
| `status` | `status` | ✓ | — | `WaitlistStatus`, default `pending` |
| `confirmationTokenHash` | `confirmation_token_hash` | | — | Double opt-in; no flow exists yet |
| `confirmationExpiresAt` | `confirmation_expires_at` | | — | |
| `confirmedAt` | `confirmed_at` | | — | |
| `unsubscribedAt` | `unsubscribed_at` | | — | The consent copy promises "you can unsubscribe at any time"; no mechanism exists |
| `consentVersion` | `consent_version` | ✓ | — | §2.1 |
| `consentTimestamp` | `consent_timestamp` | ✓ | server | `now()` at insert |
| `sourcePage` | `source_page` | | — | §2.4 |
| `ipHash` | `ip_hash` | | server | |
| `userAgentSummary` | `user_agent_summary` | | server | |
| `createdAt` / `updatedAt` | `created_at` / `updated_at` | ✓ | auto | |

The waitlist has no assignment or priority fields — it is a subscriber list, not a lead
pipeline.

### `ContactSubmission` → `contact_submissions`

| Field | Column | N | Form field | Notes |
| --- | --- | --- | --- | --- |
| `id` | `id` | ✓ | — | |
| `name` | `name` | ✓ | `name` | |
| `email` | `email` | ✓ | `email` | |
| `company` | `company` | | — | |
| `phone` | `phone` | | — | |
| `topic` | `topic` | ✓ | **`subject`** | Name mismatch — map it |
| `message` | `message` | ✓ | `message` | |
| `status` | `status` | ✓ | — | `LeadStatus`, default `new`. Note: column is `status`, not `lead_status` as on the two lead models |
| `assignedUserId` | `assigned_user_id` | | — | |
| `internalPriority` | `internal_priority` | ✓ | — | `LeadPriority`, default `unreviewed` |
| `followUpAt` | `follow_up_at` | | — | |
| `sourcePage` | `source_page` | | — | |
| `ipHash` | `ip_hash` | | server | |
| `consentVersion` | `consent_version` | ✓ | — | **No consent checkbox on this form** — §2.1 |
| `consentTimestamp` | `consent_timestamp` | ✓ | server | |
| `createdAt` / `updatedAt` | | ✓ | auto | |

### `ArtistLead` → `artist_leads`

| Field | Column | N | Form field | Notes |
| --- | --- | --- | --- | --- |
| `artistName` | `artist_name` | ✓ | `artistName` | |
| `primaryCategory` | `primary_category` | ✓ | — | **Missing from the form** |
| `country` | `country` | ✓ | `country` | |
| `website` | `website` | | `website` | |
| `primarySocialUrl` | `primary_social_url` | | ~`socials` | Form field is free text, not a URL — §2.3 |
| `additionalSocialUrls` | `additional_social_urls` | ✓ | — | `String[]` |
| `contactName` | `contact_name` | ✓ | **`name`** | Name mismatch |
| `contactRole` | `contact_role` | ✓ | — | **Missing from the form** |
| `contactEmail` | `contact_email` | ✓ | **`email`** | Name mismatch |
| `contactPhone` | `contact_phone` | | **`phone`** | Name mismatch |
| `managementCompany` | `management_company` | | **`management`** | Name mismatch |
| `recordLabel` | `record_label` | | **`label`** | Name mismatch |
| `audienceRange` | `audience_range` | | — | |
| `monthlyListenerRange` | `monthly_listener_range` | | — | |
| `socialFollowingRange` | `social_following_range` | | — | |
| `upcomingRelease` | `upcoming_release` | | — | |
| `upcomingTourOrEvent` | `upcoming_tour_or_event` | | — | |
| `existingMerchandise` | `existing_merchandise` | | — | |
| `collaborationDescription` | `collaboration_description` | ✓ | **`projectIdea`** | Name mismatch |
| `collectibleFormats` | `collectible_formats` | ✓ | ~`collectibleType` | Array vs single select — §2.3 |
| `contentTypes` | `content_types` | ✓ | — | `String[]` |
| `timeline` | `timeline` | | `timeline` | |
| `authorizedConfirmation` | `authorized_confirmation` | ✓ | — | **Missing from the form** |
| `leadStatus` | `lead_status` | ✓ | — | default `new` |
| `priority` | `priority` | ✓ | — | default `unreviewed` |
| `assignedUserId` | `assigned_user_id` | | — | |
| `followUpAt` | `follow_up_at` | | — | |
| `sourcePage`, `utmSource`, `utmMedium`, `utmCampaign`, `ipHash` | | | — / server | §2.5 |
| `consentVersion` / `consentTimestamp` | | ✓ | — / server | §2.1 |
| `createdAt` / `updatedAt` | | ✓ | auto | |

Form field with no column: **`additional`** — §2.2.

### `PartnerLead` → `partner_leads`

| Field | Column | N | Form field | Notes |
| --- | --- | --- | --- | --- |
| `companyName` | `company_name` | ✓ | **`company`** | Name mismatch |
| `contactName` | `contact_name` | ✓ | **`name`** | Name mismatch |
| `jobTitle` | `job_title` | ✓ | `jobTitle` | **Optional on the form, non-null here** |
| `workEmail` | `work_email` | ✓ | **`email`** | Name mismatch |
| `phone` | `phone` | | `phone` | |
| `country` | `country` | ✓ | `country` | |
| `partnershipType` | `partnership_type` | ✓ | `partnershipType` | |
| `companyWebsite` | `company_website` | ✓ | **`website`** | Name mismatch **and optional on the form** |
| `companySize` | `company_size` | | — | |
| `linkedinUrl` | `linkedin_url` | | — | |
| `relevantCapabilities` | `relevant_capabilities` | | ~`companyDescription`? | Different question — §2.2 |
| `desiredTimeline` | `desired_timeline` | | — | Partner form has no timeline field |
| `message` | `message` | ✓ | **`projectDetails`** | Name mismatch |
| `leadStatus` | `lead_status` | ✓ | — | |
| `priority` | `priority` | ✓ | — | |
| `assignedUserId` | `assigned_user_id` | | — | |
| `followUpAt` | `follow_up_at` | | — | |
| `sourcePage`, `utm*`, `ipHash` | | | — / server | |
| `consentVersion` / `consentTimestamp` | | ✓ | — / server | |
| `createdAt` / `updatedAt` | | ✓ | auto | |

Form field with no column: **`additional`** — §2.2.

---

## 4. Indexes

Present in the schema: `@unique` on `WaitlistSubscriber.emailNormalized`.

Worth adding once the tables carry real volume — listings sort newest-first and filter by
status:

- `createdAt desc` on all four submission tables
- `leadStatus` (and `status` on `ContactSubmission`) on the three lead tables
- `status` on `WaitlistSubscriber` for subscriber-list filtering

---

## 5. Open decisions

1. **`consentVersion` format and where it lives** — a constant in the API route, or a row in a
   policy table? It must change when the policy text changes.
2. **Duplicate waitlist emails** — `emailNormalized` is unique, so a second signup throws. Upsert
   and refresh the interests, or reject with a friendly message?
3. **Unsubscribe** — the consent copy already promises it. Needs a token, a route, and
   `unsubscribedAt` set.
4. **Double opt-in** — three columns exist for it (`confirmationTokenHash`, `confirmationExpiresAt`,
   `confirmedAt`) and `status` defaults to `pending`. Either build the flow or subscribers sit at
   `pending` forever.
5. **Spam** — no CAPTCHA, honeypot or rate limit on any of the four endpoints, all of which accept
   unauthenticated JSON. `LeadStatus.spam` implies triage after the fact; a control at the door
   would be cheaper.
6. **Add `rawPayload Json`** to the four submission models — §2.2.
7. **Widen the forms, or relax the schema** — the seven non-null-without-a-source fields in §2.1
   are a fork in the road: either the forms grow the questions, or those columns become nullable.

---

## 6. Related

- `schema.prisma` (alongside this file) — the schema this documents
- `src/lib/submissions.ts` — the `--- Replace this block in Phase 2 ---` marker is where the
  insert goes; it already has the validated `data` and a `kind` discriminator
- `src/data/forms.ts` — the option lists behind every `<select>`
