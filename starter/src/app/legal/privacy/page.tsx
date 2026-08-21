import type { Metadata } from "next";

import { LegalPage, type LegalBlock } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HitBox collects, uses and protects personal information.",
};

const blocks: LegalBlock[] = [
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect the information you provide directly through forms on this website, such as the waitlist form, artist inquiry form, business partner inquiry form and contact form.",
    ],
    bullets: [
      "Contact details, such as your name, email address, phone number and country.",
      "Company, artist or organisation details you choose to share in an inquiry.",
      "The content of any message or project description you submit.",
      "Your marketing preferences and the interests you select.",
    ],
  },
  {
    heading: "How we use information",
    bullets: [
      "To respond to inquiries and messages you send us.",
      "To send platform updates, product announcements and news where you have asked to receive them.",
      "To review and progress partnership inquiries.",
      "To operate, maintain and improve this website.",
    ],
  },
  {
    heading: "Marketing communications",
    paragraphs: [
      "We only send marketing emails to people who have opted in. Every marketing email includes an unsubscribe link, and you can opt out at any time without affecting any other correspondence with us.",
    ],
  },
  {
    heading: "Sharing information",
    paragraphs: [
      "We do not sell personal information. We share it only with service providers who help us operate this website and communicate with you, and where we are required to do so by law.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "We keep personal information for as long as it is needed for the purpose it was collected, and for as long as required to meet legal or record-keeping obligations.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, and to withdraw consent for marketing.",
    ],
    bullets: [
      "Request a copy of the information we hold about you.",
      "Ask us to correct information that is inaccurate.",
      "Ask us to delete information we no longer need.",
      "Withdraw your consent to marketing communications.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "This website uses only the cookies necessary to operate. If analytics or marketing cookies are introduced later, this page and a cookie notice will be updated first.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "We use reasonable technical and organisational measures to protect the information submitted through this website. No method of transmission over the internet is completely secure.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy as the platform develops. The date at the top of this page shows when it was last revised.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How HitBox collects, uses and protects the information you share with us."
      updated="Pending review"
      blocks={blocks}
    />
  );
}
