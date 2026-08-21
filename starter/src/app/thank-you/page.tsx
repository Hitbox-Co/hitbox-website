import type { Metadata } from "next";

import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your submission has been received.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="iso-grid relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-ink"
      />

      <Container width="narrow" className="relative text-center">
        <LogoMark aria-hidden className="mx-auto h-16 w-auto" />

        <h1 className="mt-10 text-4xl sm:text-5xl">Thank you</h1>

        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Your submission has been received. A confirmation email is on its way, and the HitBox team
          will be in touch if a reply is needed.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/how-it-works" variant="secondary" size="lg">
            See How It Works
          </Button>
        </div>
      </Container>
    </section>
  );
}
