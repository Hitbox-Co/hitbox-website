import type { Metadata } from "next";

import { LegalPage, type LegalBlock } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "HitBox's commitment to an accessible website.",
};

const blocks: LegalBlock[] = [
  {
    heading: "Our commitment",
    paragraphs: [
      "HitBox is committed to making this website usable by as many people as possible, regardless of technology or ability. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.",
    ],
  },
  {
    heading: "What we have built in",
    bullets: [
      "A skip link so keyboard users can jump straight to the main content.",
      "Visible focus outlines on every interactive element.",
      "Semantic headings, landmarks and lists so screen readers can navigate the page structure.",
      "Labelled form fields, with errors announced to assistive technology.",
      "Text and interface colours checked for contrast against their backgrounds.",
      "Layouts that reflow down to small screens and support browser zoom without horizontal scrolling.",
      "Menus and expandable sections that can be operated by keyboard and closed with the Escape key.",
    ],
  },
  {
    heading: "Ongoing work",
    paragraphs: [
      "Accessibility is treated as part of building each page rather than a one-off audit. As new sections and features are added, they are checked against the same standard.",
    ],
  },
  {
    heading: "Known limitations",
    paragraphs: [
      "Some sections of this site use placeholder artwork while final assets are being produced. When that artwork is replaced, alternative text will be written for each image.",
    ],
  },
  {
    heading: "Feedback",
    paragraphs: [
      "If you encounter a barrier on this website, please tell us. Include the page address and a description of the problem, and we will look into it and respond.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      intro="How we approach accessibility on this website, and how to tell us when we fall short."
      updated="Pending review"
      blocks={blocks}
      reviewNotice={false}
    />
  );
}
