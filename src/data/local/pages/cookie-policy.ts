import type { Page } from "../../types";

/**
 * Cookie Policy — uses the same legal-page template as Privacy and
 * Terms. The Figma frame combined Privacy + Terms; the Cookie Policy
 * here is a focused subset covering only cookie-related disclosures.
 * Review with legal before publishing; replace [Insert Date].
 */
export const cookiePolicy: Page = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  description: "How Bluestone Investment Partners uses cookies and similar technologies.",
  blocks: [
    {
      type: "legal-page",
      title: "Cookie Policy",
      effectiveDate: "June 1, 2026",
      intro: [
        "This Cookie Policy explains how Bluestone Investment Partners uses cookies and similar technologies on our website.",
      ],
      sections: [
        {
          heading: "What Are Cookies",
          content: [
            {
              kind: "paragraph",
              html:
                "Cookies are small text files placed on your device when you visit a website. They help websites function properly and provide information to site owners.",
            },
          ],
        },
        {
          heading: "How We Use Cookies",
          content: [
            { kind: "paragraph", html: "We use cookies for the following purposes:" },
            {
              kind: "list",
              items: [
                "<strong>Essential</strong> — required for the site to function",
                "<strong>Analytics</strong> — to understand how visitors interact with the site (Google Analytics)",
                "<strong>Preferences</strong> — to remember your settings (e.g. reduced-motion preference)",
              ],
            },
          ],
        },
        {
          heading: "Third-Party Cookies",
          content: [
            {
              kind: "paragraph",
              html:
                "We use <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"underline hover:text-[var(--color-primary)]\">Google Analytics</a> to collect anonymous usage data. This service may set its own cookies.",
            },
          ],
        },
        {
          heading: "Managing Cookies",
          content: [
            {
              kind: "paragraph",
              html:
                "You can control or disable cookies through your browser settings. Note that disabling certain cookies may impact site functionality.",
            },
            {
              kind: "list",
              items: [
                '<a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" class="underline hover:text-[var(--color-primary)]">Manage cookies in Chrome</a>',
                '<a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" class="underline hover:text-[var(--color-primary)]">Manage cookies in Safari</a>',
                '<a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" class="underline hover:text-[var(--color-primary)]">Manage cookies in Firefox</a>',
              ],
            },
          ],
        },
        {
          heading: "Changes to This Policy",
          content: [
            {
              kind: "paragraph",
              html:
                "We may update this Cookie Policy from time to time. Updates will be posted on this page with a revised effective date.",
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
                "For questions about this Cookie Policy, please contact: <a href=\"mailto:info@bluestoneinv.com\" class=\"underline hover:text-[var(--color-primary)]\">info@bluestoneinv.com</a>",
            },
          ],
        },
      ],
    },
  ],
};
