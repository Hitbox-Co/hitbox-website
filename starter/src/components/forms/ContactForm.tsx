"use client";

import { FormFrame } from "@/components/forms/FormFrame";
import { Field, TextArea, TextInput } from "@/components/ui/Field";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { isValidEmail } from "@/lib/utils";

export function ContactForm() {
  const { onSubmit, submitting, error } = useFormSubmit({
    endpoint: "/api/contact",
    validate: (data) => {
      if (!String(data.name ?? "").trim()) return "Please enter your name.";
      if (!isValidEmail(String(data.email ?? ""))) return "Please enter a valid email address.";
      if (!String(data.subject ?? "").trim()) return "Please add a subject.";
      if (!String(data.message ?? "").trim()) return "Please write a message.";
      return null;
    },
  });

  return (
    <FormFrame
      onSubmit={onSubmit}
      submitting={submitting}
      error={error}
      submitLabel="Send Message"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required>
          <TextInput id="contact-name" name="name" autoComplete="name" placeholder="Full name" required />
        </Field>

        <Field label="Email" htmlFor="contact-email" required>
          <TextInput
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="contact-subject" required>
        <TextInput id="contact-subject" name="subject" placeholder="What is this about?" required />
      </Field>

      <Field label="Message" htmlFor="contact-message" required>
        <TextArea id="contact-message" name="message" placeholder="How can we help?" required />
      </Field>
    </FormFrame>
  );
}
