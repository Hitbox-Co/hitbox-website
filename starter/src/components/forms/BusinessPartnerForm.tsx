"use client";

import { FormFrame, FormSection } from "@/components/forms/FormFrame";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { countries, partnershipTypes } from "@/data/forms";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { isValidEmail } from "@/lib/utils";

export function BusinessPartnerForm() {
  const { onSubmit, submitting, error } = useFormSubmit({
    endpoint: "business-inquiry",
    validate: (data) => {
      if (!String(data.name ?? "").trim()) return "Please enter your name.";
      if (!String(data.company ?? "").trim()) return "Please enter your company name.";
      if (!isValidEmail(String(data.email ?? ""))) return "Please enter a valid email address.";
      if (!String(data.partnershipType ?? "").trim()) return "Please select a partnership type.";
      if (!String(data.projectDetails ?? "").trim())
        return "Please add some detail about the partnership.";
      return null;
    },
  });

  return (
    <FormFrame
      onSubmit={onSubmit}
      submitting={submitting}
      error={error}
      submitLabel="Submit Inquiry"
      footnote="You will receive a confirmation email once your inquiry is submitted."
    >
      <FormSection title="Contact information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="partner-name" required>
            <TextInput id="partner-name" name="name" autoComplete="name" placeholder="Full name" required />
          </Field>

          <Field label="Company" htmlFor="partner-company" required>
            <TextInput
              id="partner-company"
              name="company"
              autoComplete="organization"
              placeholder="Company name"
              required
            />
          </Field>

          <Field label="Job title" htmlFor="partner-title">
            <TextInput
              id="partner-title"
              name="jobTitle"
              autoComplete="organization-title"
              placeholder="Your role"
            />
          </Field>

          <Field label="Email" htmlFor="partner-email" required>
            <TextInput
              id="partner-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </Field>

          <Field label="Phone number" htmlFor="partner-phone">
            <TextInput
              id="partner-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Include country code"
            />
          </Field>

          <Field label="Country" htmlFor="partner-country" required>
            <Select id="partner-country" name="country" defaultValue="" required>
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

      <FormSection title="Partnership information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Partnership type" htmlFor="partner-type" required>
            <Select id="partner-type" name="partnershipType" defaultValue="" required>
              <option value="" disabled>
                Select a type
              </option>
              {partnershipTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Company website" htmlFor="partner-website">
            <TextInput id="partner-website" name="website" type="url" placeholder="https://" />
          </Field>
        </div>

        <Field label="Company description" htmlFor="partner-description">
          <TextArea
            id="partner-description"
            name="companyDescription"
            placeholder="What does your company do?"
            className="min-h-24"
          />
        </Field>

        <Field label="Project details" htmlFor="partner-project" required>
          <TextArea
            id="partner-project"
            name="projectDetails"
            placeholder="Tell us how you would like to work with HitBox."
            required
          />
        </Field>

        <Field label="Additional information" htmlFor="partner-notes">
          <TextArea
            id="partner-notes"
            name="additional"
            placeholder="Anything else we should know."
            className="min-h-24"
          />
        </Field>
      </FormSection>
    </FormFrame>
  );
}
