import type { Page } from "../../types";

/**
 * Investments list page = page header + filterable grid of all portfolio companies.
 */
export const investments: Page = {
  slug: "investments",
  title: "Investments",
  description: "Bluestone Investment Partners' portfolio of defense and government technology companies.",
  blocks: [
    {
      type: "page-header",
      title: "Investments",
    },
    {
      type: "investments-list",
    },
  ],
};
