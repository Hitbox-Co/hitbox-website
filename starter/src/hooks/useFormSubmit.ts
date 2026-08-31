"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { getAttribution } from "@/lib/attribution";
import { submitToWebApi, type WebApiEndpoint } from "@/lib/web-api";

type Options = {
  /** Which of the four web API endpoints receives the payload. */
  endpoint: WebApiEndpoint;
  /** Where to send the visitor after a successful submission. */
  redirectTo?: string;
  /** Client-side validation. Return a message to block submission. */
  validate?: (data: Record<string, unknown>) => string | null;
};

type State = "idle" | "submitting" | "error";

/**
 * Shared submit handling for every form on the site: serialises the form,
 * validates, merges in attribution, posts JSON to the web API, then redirects
 * to the thank-you page.
 *
 * `fieldErrors` comes back keyed by request field name, which the API
 * guarantees matches the form input's own `name` — so it maps straight onto
 * the markup if a form wants to render errors inline.
 */
export function useFormSubmit({ endpoint, redirectTo = "/thank-you", validate }: Options) {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Collect repeated fields (checkbox groups) into arrays. The API takes
    // `interests` as an array, a bare string or an absent key, so this shape
    // is passed through untouched rather than normalised.
    const data: Record<string, unknown> = {};
    for (const key of new Set(formData.keys())) {
      const values = formData.getAll(key).map(String);
      data[key] = values.length > 1 ? values : values[0];
    }

    const validationError = validate?.(data) ?? null;
    if (validationError) {
      setError(validationError);
      setState("error");
      return;
    }

    setState("submitting");

    const result = await submitToWebApi(endpoint, { ...data, ...getAttribution() });

    if (!result.ok) {
      setError(result.message);
      setFieldErrors(result.fieldErrors);
      setState("error");
      return;
    }

    form.reset();
    router.push(redirectTo);
  }

  return { onSubmit, submitting: state === "submitting", error, fieldErrors };
}
