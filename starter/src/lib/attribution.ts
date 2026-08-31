/**
 * Marketing attribution attached to every form submission.
 *
 * UTM parameters only exist on the landing URL, so they are captured on first
 * load and kept in `sessionStorage` — by the time someone reaches
 * `/join-waitlist` the query string that brought them in is long gone.
 * First touch wins: a later campaign link in the same tab does not overwrite
 * what originally brought the visitor here.
 *
 * `sourcePage` is read at submit time instead, because it means the page the
 * form was submitted from — which is not necessarily where the visit started.
 * The API falls back to the `Referer` header when it is absent, but sending it
 * explicitly is more reliable.
 */

const STORAGE_KEY = "hitbox:attribution";

const UTM_FIELDS = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
} as const;

type UtmField = (typeof UTM_FIELDS)[keyof typeof UTM_FIELDS];

export type Attribution = Partial<Record<UtmField | "sourcePage", string>>;

/** Stores any UTM parameters on the current URL. Safe to call on every load. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const captured: Attribution = {};

    for (const [param, field] of Object.entries(UTM_FIELDS)) {
      const value = params.get(param)?.trim();
      if (value) captured[field] = value;
    }

    if (Object.keys(captured).length === 0) return;

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // Private mode, storage disabled, quota. Attribution is a nice-to-have —
    // never let it block a submission.
  }
}

/** The attribution fields to merge into a form payload. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  let stored: Attribution = {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw) as Attribution;
  } catch {
    stored = {};
  }

  return { ...stored, sourcePage: window.location.pathname };
}
