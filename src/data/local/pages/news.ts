import type { Page } from "../../types";

/**
 * News list page = page header + grid of all articles.
 */
export const news: Page = {
  slug: "news",
  title: "News",
  description: "Latest news and insights from Bluestone Investment Partners.",
  blocks: [
    {
      type: "page-header",
      title: "News",
    },
    {
      type: "news-list",
      perPage: 9,
    },
  ],
};
