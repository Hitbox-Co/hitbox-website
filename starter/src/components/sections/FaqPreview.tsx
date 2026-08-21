import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/types";

type FaqPreviewProps = {
  title?: string;
  items: FaqItem[];
};

/** A short FAQ block with a link through to the full FAQ page. */
export function FaqPreview({ title = "Common questions", items }: FaqPreviewProps) {
  return (
    <Section bordered width="narrow">
      <SectionHeading eyebrow="FAQ" title={title} align="center" className="mb-10" />

      <Accordion items={items} />

      <div className="mt-10 flex justify-center">
        <Button href="/faq" variant="secondary">
          Read the full FAQ
        </Button>
      </div>
    </Section>
  );
}
