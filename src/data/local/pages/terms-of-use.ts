import type { Page } from "../../types";

/**
 * Terms of Use — content sourced from Figma frame 8243:4188.
 * Review with legal before publishing; replace [Insert Date].
 */
export const termsOfUse: Page = {
  slug: "terms-of-use",
  title: "Terms of Use",
  description: "Terms governing the use of the Bluestone Investment Partners website.",
  blocks: [
    {
      type: "legal-page",
      title: "Terms of Use",
      effectiveDate: "June 1, 2026",
      intro: ["By accessing this website, you agree to the following Terms of Use."],
      sections: [
        {
          heading: "Informational Purposes Only",
          content: [
            {
              kind: "paragraph",
              html: "The content on this website is provided for informational purposes only and does not constitute:",
            },
            {
              kind: "list",
              items: [
                "Investment advice",
                "An offer to sell or solicitation to buy any securities",
                "A recommendation of any investment strategy",
              ],
            },
          ],
        },
        {
          heading: "No Reliance",
          content: [
            {
              kind: "paragraph",
              html:
                "While Bluestone strives to provide accurate information, we make no guarantees regarding completeness or accuracy. You should not rely solely on this website when making business or investment decisions.",
            },
          ],
        },
        {
          heading: "Intellectual Property",
          content: [
            {
              kind: "paragraph",
              html:
                "All content on this website, including text, graphics, logos, and design, is the property of Bluestone Investment Partners unless otherwise stated.",
            },
            {
              kind: "paragraph",
              html: "You may not reproduce, distribute, or use content without prior written permission.",
            },
          ],
        },
        {
          heading: "Third-Party Links",
          content: [
            {
              kind: "paragraph",
              html: "This website may contain links to third-party websites. Bluestone is not responsible for the content or practices of those sites.",
            },
          ],
        },
        {
          heading: "Limitation of Liability",
          content: [
            {
              kind: "paragraph",
              html:
                "To the fullest extent permitted by law, Bluestone shall not be liable for any damages arising from your use of this website, including:",
            },
            {
              kind: "list",
              items: ["Direct or indirect damages", "Loss of data or business opportunities"],
            },
          ],
        },
        {
          heading: "Governing Law",
          content: [
            {
              kind: "paragraph",
              html: "These Terms are governed by the laws of the Commonwealth of Virginia, without regard to conflict of law principles.",
            },
          ],
        },
        {
          heading: "Changes to Terms",
          content: [
            {
              kind: "paragraph",
              html: "Bluestone may update these Terms at any time. Continued use of the website constitutes acceptance of any changes.",
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
                "For questions about these Terms, please contact: <a href=\"mailto:info@bluestoneinv.com\" class=\"underline hover:text-[var(--color-primary)]\">info@bluestoneinv.com</a>",
            },
          ],
        },
      ],
    },
  ],
};
