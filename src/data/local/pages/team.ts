import type { Page } from "../../types";

/**
 * Team page = ordered list of blocks.
 * Reorder this array to reorder sections on the live site.
 */
export const team: Page = {
  slug: "team",
  title: "Team",
  description:
    "The value of the capital we provide is enhanced by the extensive industry-focus and experience of our team and executive partners.",
  blocks: [
    {
      type: "page-header",
      title: "Team",
    },
    {
      type: "team-grid",
      memberSlugs: [
        "john-allen",
        "joe-collins",
        "kevin-doherty",
        "ben-dower",
        "michael-ivey",
        "bill-mutryn",
        "tom-mutryn",
        "kevin-phillips",
        "richard-smithies",
        "bill-strang",
        "kyle-strang",
        "christie-wetzel",
        "eric-wolking",
      ],
    },
  ],
};
