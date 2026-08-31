/**
 * The HitBox web API — the four public lead-capture endpoints.
 *
 * Contract: `docs/architecture/web-api-integration.md`.
 *
 * The browser calls these directly rather than proxying through a Next route
 * handler. The backend rate limits **per client IP** (20 requests / 60s shared
 * across all four endpoints), so proxying would put every visitor behind one
 * address and trip the limit for everybody at once.
 */

const DEFAULT_BASE_URL = "http://localhost:8000";
const ROUTE_PREFIX = "/app/web/v1";

/** The four endpoints, named as they appear in the path. */
export type WebApiEndpoint = "waitlist" | "contact" | "artist-inquiry" | "business-inquiry";

/** `{ error: { code, message, details? } }` — the API's only error shape. */
type ApiBody = {
  data?: Record<string, unknown>;
  error?: {
    code?: string;
    message?: string;
    details?: Array<{ path?: string; message?: string }>;
  };
};

export type SubmitResult =
  | { ok: true; data: Record<string, unknown> }
  | {
      ok: false;
      code: string;
      /** Ready to show to the visitor. */
      message: string;
      /** From a 422, keyed by request field name — which is the form input's own name. */
      fieldErrors: Record<string, string>;
    };

export function endpointUrl(endpoint: WebApiEndpoint): string {
  const base = (process.env.NEXT_PUBLIC_WEB_API_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
  return `${base}${ROUTE_PREFIX}/${endpoint}`;
}

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export async function submitToWebApi(
  endpoint: WebApiEndpoint,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  let response: Response;

  try {
    response = await fetch(endpointUrl(endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Backend down, DNS, or a CORS rejection — all indistinguishable here.
    return {
      ok: false,
      code: "NETWORK_ERROR",
      message: "We could not reach the server. Please check your connection and try again.",
      fieldErrors: {},
    };
  }

  const body = (await response.json().catch(() => null)) as ApiBody | null;

  if (response.ok) {
    return { ok: true, data: body?.data ?? {} };
  }

  const code = body?.error?.code ?? "UNKNOWN_ERROR";

  const fieldErrors: Record<string, string> = {};
  for (const detail of body?.error?.details ?? []) {
    if (detail?.path && detail.message && !fieldErrors[detail.path]) {
      fieldErrors[detail.path] = detail.message;
    }
  }

  // A 422's own message is "Request validation failed" — the field-level
  // detail underneath it is the part worth showing.
  const [firstFieldError] = Object.values(fieldErrors);

  // Server messages are only shown for client errors. A 5xx can carry raw
  // internals — a malformed body currently comes back as a 500 quoting the
  // JSON parser's SyntaxError — and none of that belongs in front of a visitor.
  const serverMessage = response.status < 500 ? body?.error?.message : undefined;

  const message =
    code === "RATE_LIMITED"
      ? "Too many attempts. Please wait a minute and try again."
      : (firstFieldError ?? serverMessage ?? FALLBACK_MESSAGE);

  return { ok: false, code, message, fieldErrors };
}
