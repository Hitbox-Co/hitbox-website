"use client";

import { FormFrame, FormSection } from "@/components/forms/FormFrame";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { collectibleTypes, countries, timelineOptions } from "@/data/forms";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { isValidEmail } from "@/lib/utils";

export function ArtistInquiryForm() {
  const { onSubmit, submitting, error } = useFormSubmit({
    endpoint: "/api/artist-inquiry",
    validate: (data) => {
      if (!String(data.name ?? "").trim()) return "Please enter your name.";
      if (!isValidEmail(String(data.email ?? ""))) return "Please enter a valid email address.";
      if (!String(data.artistName ?? "").trim())
        return "Please enter the artist or creator name.";
      if (!String(data.projectIdea ?? "").trim())
        return "Please tell us what you would like to create.";
      return null;
    },
  });

  return (
    <FormFrame
      onSubmit={onSubmit}
      submitting={submitting}
      error={error}
      submitLabel="Submit Inquiry"
      footnote="We read every inquiry. You will receive a confirmation email once your inquiry is submitted."
    >
      <FormSection title="Contact information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="artist-name" required>
            <TextInput id="artist-name" name="name" autoComplete="name" placeholder="Full name" required />
          </Field>

          <Field label="Email" htmlFor="artist-email" required>
            <TextInput
              id="artist-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </Field>

          <Field label="Phone number" htmlFor="artist-phone">
            <TextInput
              id="artist-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Include country code"
            />
          </Field>

          <Field label="Country" htmlFor="artist-country" required>
            <Select id="artist-country" name="country" defaultValue="" required>
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
        </div>
      </FormSection>

      <FormSection title="Artist information">
        <Field label="Artist / creator name" htmlFor="artist-act" required>
          <TextInput id="artist-act" name="artistName" placeholder="Artist, band or creator name" required />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Website" htmlFor="artist-website">
            <TextInput id="artist-website" name="website" type="url" placeholder="https://" />
          </Field>

          <Field label="Management company" htmlFor="artist-management">
            <TextInput id="artist-management" name="management" placeholder="Company name" />
          </Field>
        </div>

        <Field label="Social media links" htmlFor="artist-socials">
          <TextArea
            id="artist-socials"
            name="socials"
            placeholder="One link per line"
            className="min-h-24"
          />
        </Field>

        <Field label="Record label" htmlFor="artist-label">
          <TextInput id="artist-label" name="label" placeholder="Label name" />
        </Field>
      </FormSection>

      <FormSection title="Project information">
        <Field label="What would you like to create with HitBox?" htmlFor="artist-project" required>
          <TextArea
            id="artist-project"
            name="projectIdea"
            placeholder="Tell us about the release, campaign or idea you have in mind."
            required
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Type of collectible" htmlFor="artist-type">
            <Select id="artist-type" name="collectibleType" defaultValue="">
              <option value="" disabled>
                Select a type
              </option>
              {collectibleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Expected timeline" htmlFor="artist-timeline">
            <Select id="artist-timeline" name="timeline" defaultValue="">
              <option value="" disabled>
                Select a timeline
              </option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Additional information" htmlFor="artist-notes">
          <TextArea
            id="artist-notes"
            name="additional"
            placeholder="Anything else we should know."
            className="min-h-24"
          />
        </Field>
      </FormSection>
    </FormFrame>
  );
}
