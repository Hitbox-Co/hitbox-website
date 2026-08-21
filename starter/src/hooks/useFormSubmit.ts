"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Options = {
  /** API route that receives the payload. */
  endpoint: string;
  /** Where to send the visitor after a successful submission. */
  redirectTo?: string;
  /** Client-side validation. Return a message to block submission. */
  validate?: (data: Record<string, unknown>) => string | null;
};

type State = "idle" | "submitting" | "error";

/**
 * Shared submit handling for every form on the site: serialises the form,
 * validates, posts JSON, then redirects to the thank-you page.
 */
export function useFormSubmit({ endpoint, redirectTo = "/thank-you", validate }: Options) {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Collect repeated fields (checkbox groups) into arrays.
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

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      form.reset();
      router.push(redirectTo);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
      setState("error");
    }
  }

  return { onSubmit, submitting: state === "submitting", error };
}
