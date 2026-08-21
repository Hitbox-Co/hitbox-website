import type { Metadata } from "next";

import { LegalPage, type LegalBlock } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply to your use of the HitBox website.",
};

const blocks: LegalBlock[] = [
  {
    heading: "Acceptance of these terms",
    paragraphs: [
      "By accessing or using this website you agree to these terms. If you do not agree with them, please do not use the site.",
    ],
  },
  {
    heading: "About this website",
    paragraphs: [
      "This website provides information about HitBox and allows visitors to join a waitlist and submit inquiries. It is not a store, and no products are offered for sale through it.",
    ],
  },
  {
    heading: "Acceptable use",
    bullets: [
      "Do not use the site for any unlawful purpose.",
      "Do not attempt to gain unauthorised access to any part of the site or its systems.",
      "Do not submit false information or impersonate another person or organisation.",
      "Do not interfere with the normal operation of the site.",
    ],
  },
  {
    heading: "Submissions",
    paragraphs: [
      "Information you submit through a form is used to respond to you and to assess partnership inquiries. Submitting an inquiry does not create any agreement, partnership or obligation between you and HitBox.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The HitBox name, logo, site content and design are owned by HitBox or its licensors. You may not copy, reproduce or reuse them without permission.",
      "Material you submit remains yours. You confirm you have the right to share it with us for the purpose of your inquiry.",
    ],
  },
  {
    heading: "Forward-looking information",
    paragraphs: [
      "This website describes a platform that is in development. Features, timing and availability described here may change, and nothing on this site should be treated as a commitment to deliver a specific feature on a specific date.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "This site may link to third-party websites. We are not responsible for their content, terms or privacy practices.",
    ],
  },
  {
    heading: "Disclaimer and liability",
    paragraphs: [
      "This website is provided on an 'as is' basis. To the extent permitted by law, HitBox is not liable for any loss arising from your use of, or inability to use, this site.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last revised.",
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The terms that apply when you use the HitBox website."
      updated="Pending review"
      blocks={blocks}
    />
  );
}
