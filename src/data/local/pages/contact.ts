import type { Page } from "../../types";

/**
 * Contact page = title + info on the left, form on the right.
 */
export const contact: Page = {
  slug: "contact",
  title: "Contact",
  description: "Get in touch with Bluestone Investment Partners.",
  blocks: [
    {
      type: "contact",
      title: "Contact",
      recipient: "info@bluestoneinv.com",
      info: [
        {
          label: "Phone Number",
          value: "(703) 462-5600",
          href: "tel:+17034625600",
        },
        {
          label: "Email Address",
          value: "info@bluestoneinv.com",
          href: "mailto:info@bluestoneinv.com",
        },
        {
          label: "Our Location",
          value: "1650 Tysons Blvd., Suite 810\nMcLean, VA 22102",
          href: "https://maps.google.com/?q=1650+Tysons+Blvd+Suite+810+McLean+VA+22102",
        },
      ],
    },
  ],
};
