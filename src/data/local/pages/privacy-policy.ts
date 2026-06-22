import type { Page } from "../../types";

/**
 * Privacy Policy — content sourced from Figma frame 8243:4188.
 * The actual policy text should be reviewed by legal before going live;
 * the [Insert Date] placeholder must be replaced.
 */
export const privacyPolicy: Page = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: "How Bluestone Investment Partners collects, uses, and protects your information.",
  blocks: [
    {
      type: "legal-page",
      title: "Privacy Policy",
      effectiveDate: "June 1, 2026",
      intro: [
        "Bluestone Investment Partners (“Bluestone,” “we,” “us,” or “our”) respects your privacy and is committed to protecting the information you provide through our website.",
        "This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.",
      ],
      sections: [
        {
          heading: "Information We Collect",
          content: [
            { kind: "paragraph", html: "We may collect the following types of information:" },
            { kind: "paragraph", html: "<strong>Information you provide directly</strong>" },
            {
              kind: "list",
              items: [
                "Name, email address, and any other details submitted through contact forms",
                "Information provided when downloading materials (e.g., Fact Sheet)",
              ],
            },
            { kind: "paragraph", html: "<strong>Information collected automatically</strong>" },
            {
              kind: "list",
              items: [
                "IP address",
                "Browser type and device information",
                "Pages visited and time spent on the site",
              ],
            },
          ],
        },
        {
          heading: "How We Use Information",
          content: [
            { kind: "paragraph", html: "We use the information we collect to:" },
            {
              kind: "list",
              items: [
                "Respond to inquiries and communicate with you",
                "Provide requested materials (e.g., Fact Sheet downloads)",
                "Improve website performance and user experience",
                "Analyze site usage and trends",
              ],
            },
          ],
        },
        {
          heading: "Cookies and Analytics",
          content: [
            { kind: "paragraph", html: "We use cookies and similar technologies to enhance your experience." },
            {
              kind: "paragraph",
              html:
                "This website uses <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"underline hover:text-[var(--color-primary)]\">Google Analytics</a>, which collects information about how users interact with the site. This data is used to improve functionality and performance.",
            },
            { kind: "paragraph", html: "You can control or disable cookies through your browser settings." },
          ],
        },
        {
          heading: "Sharing of Information",
          content: [
            { kind: "paragraph", html: "We do not sell, rent, or trade your personal information." },
            {
              kind: "paragraph",
              html:
                "We may share information with trusted third-party service providers (such as analytics providers) solely to operate and improve the website.",
            },
          ],
        },
        {
          heading: "Data Security",
          content: [
            {
              kind: "paragraph",
              html:
                "We take reasonable administrative and technical measures to protect your information. However, no method of transmission over the internet is completely secure.",
            },
          ],
        },
        {
          heading: "Your Rights",
          content: [
            {
              kind: "paragraph",
              html: "Depending on your location, you may have rights regarding your personal data, including:",
            },
            {
              kind: "list",
              items: [
                "Accessing the information we hold about you",
                "Requesting corrections or deletion",
                "Objecting to certain uses of your data",
              ],
            },
            { kind: "paragraph", html: "To make a request, please contact us using the information below." },
          ],
        },
        {
          heading: "Third-Party Links",
          content: [
            {
              kind: "paragraph",
              html: "Our website may contain links to third-party websites. We are not responsible for their privacy practices.",
            },
          ],
        },
        {
          heading: "Changes to This Policy",
          content: [
            {
              kind: "paragraph",
              html:
                "We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.",
            },
          ],
        },
        {
          heading: "Contact Us",
          content: [
            { kind: "paragraph", html: "Bluestone Investment Partners — McLean, Virginia, USA" },
            {
              kind: "paragraph",
              html:
                "For questions about this Privacy Policy, please contact: <a href=\"mailto:info@bluestoneinv.com\" class=\"underline hover:text-[var(--color-primary)]\">info@bluestoneinv.com</a>",
            },
          ],
        },
      ],
    },
  ],
};
