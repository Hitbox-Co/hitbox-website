"use client";

import Link from "next/link";

import { FormFrame, FormSection } from "@/components/forms/FormFrame";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, FieldGroup, Select, TextInput } from "@/components/ui/Field";
import { countries, interestOptions } from "@/data/forms";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { cn, isValidEmail, slugify } from "@/lib/utils";

type WaitlistFormProps = {
  /** Trimmed version used on the home page and in the footer. */
  compact?: boolean;
  /** `onBrand` drops the card so the form can sit on the blue footer panel. */
  variant?: "default" | "onBrand";
};

export function WaitlistForm({ compact = false, variant = "default" }: WaitlistFormProps) {
  const { onSubmit, submitting, error } = useFormSubmit({
    endpoint: "waitlist",
    validate: (data) => {
      if (!String(data.firstName ?? "").trim()) return "Please enter your first name.";
      if (!isValidEmail(String(data.email ?? ""))) return "Please enter a valid email address.";
      if (!data.consent) return "Please confirm you would like to receive updates.";
      return null;
    },
  });

  const onBrand = variant === "onBrand";

  const consentLabel = (
    <>
      I would like to receive updates from HitBox about platform news, product launches and
      announcements. You can unsubscribe at any time. See our{" "}
      <Link
        href="/legal/privacy"
        className={cn(
          "underline underline-offset-4",
          onBrand ? "text-white decoration-white/40" : "text-fg decoration-fg/40",
        )}
      >
        privacy policy
      </Link>
      .
    </>
  );

  /* -------------------------------------------------- On the blue footer panel */
  if (onBrand) {
    return (
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="footer-first-name" className="sr-only">
              First name
            </label>
            <input
              id="footer-first-name"
              name="firstName"
              autoComplete="given-name"
              placeholder="First name"
              required
              className="h-12 w-full rounded-[4px] border border-white/25 bg-navy-deep/40 px-4 font-body text-sm text-white placeholder:text-white/55 focus:border-white focus:outline-none"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              required
              className="h-12 w-full rounded-[4px] border border-white/25 bg-navy-deep/40 px-4 font-body text-sm text-white placeholder:text-white/55 focus:border-white focus:outline-none"
            />
          </div>

          <Button type="submit" variant="light" size="lg" className="shrink-0" disabled={submitting}>
            {submitting ? "Sending…" : "Sign up"}
          </Button>
        </div>

        <Checkbox
          id="footer-consent"
          name="consent"
          value="yes"
          label={consentLabel}
          className="text-xs text-white/80"
        />

        {error ? (
          <p role="alert" className="font-body text-sm text-white">
            {error}
          </p>
        ) : null}
      </form>
    );
  }

  /* ------------------------------------------------------------------- Compact */
  if (compact) {
    return (
      <FormFrame
        onSubmit={onSubmit}
        submitting={submitting}
        error={error}
        submitLabel="Join Waitlist"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" htmlFor="waitlist-first-name" required>
            <TextInput
              id="waitlist-first-name"
              name="firstName"
              autoComplete="given-name"
              placeholder="First name"
              required
            />
          </Field>

          <Field label="Email address" htmlFor="waitlist-email" required>
            <TextInput
              id="waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </Field>
        </div>

        <Checkbox id="waitlist-consent" name="consent" value="yes" label={consentLabel} />
      </FormFrame>
    );
  }

  /* ---------------------------------------------------------------------- Full */
  return (
    <FormFrame
      onSubmit={onSubmit}
      submitting={submitting}
      error={error}
      submitLabel="Join Waitlist"
      footnote="We will only use these details to send you HitBox updates."
    >
      <FormSection title="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" htmlFor="first-name" required>
            <TextInput
              id="first-name"
              name="firstName"
              autoComplete="given-name"
              placeholder="First name"
              required
            />
          </Field>

          <Field label="Last name" htmlFor="last-name">
            <TextInput
              id="last-name"
              name="lastName"
              autoComplete="family-name"
              placeholder="Last name"
            />
          </Field>
        </div>

        <Field label="Email address" htmlFor="email" required>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>

        <Field label="Country" htmlFor="country" required>
          <Select id="country" name="country" defaultValue="" required>
            <option value="" disabled>
              Select your country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </Field>
      </FormSection>

      <FieldGroup legend="What are you interested in?">
        <div className="grid gap-3 sm:grid-cols-2">
          {interestOptions.map((interest) => (
            <Checkbox
              key={interest}
              id={`interest-${slugify(interest)}`}
              name="interests"
              value={interest}
              label={interest}
            />
          ))}
        </div>
      </FieldGroup>

      <Checkbox id="consent" name="consent" value="yes" label={consentLabel} />
    </FormFrame>
  );
}
