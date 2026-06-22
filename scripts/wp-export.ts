/**
 * One-off: dump all local TS content to JSON for the WordPress import.
 * Run: npx tsx scripts/wp-export.ts  (writes scripts/wp-export.json)
 */
import { writeFileSync } from "node:fs";

import { home } from "../src/data/local/pages/home";
import { about } from "../src/data/local/pages/about";
import { team as teamPage } from "../src/data/local/pages/team";
import { news as newsPage } from "../src/data/local/pages/news";
import { contact as contactPage } from "../src/data/local/pages/contact";
import { privacyPolicy } from "../src/data/local/pages/privacy-policy";
import { termsOfUse } from "../src/data/local/pages/terms-of-use";
import { cookiePolicy } from "../src/data/local/pages/cookie-policy";
import { investments as investmentsPage } from "../src/data/local/pages/investments";

import { investments } from "../src/data/local/investments";
import { articles } from "../src/data/local/articles";
import { teamMembers } from "../src/data/local/team";
import { siteSettings } from "../src/data/local/site";

const pages = [
  home, about, teamPage, newsPage, contactPage,
  privacyPolicy, termsOfUse, cookiePolicy, investmentsPage,
];

const out = {
  pages,        // [{ slug, title, description, blocks[] }]
  investments,  // unfiltered (incl. hidden + child companies)
  articles,
  teamMembers,
  siteSettings,
};

writeFileSync(
  new URL("./wp-export.json", import.meta.url),
  JSON.stringify(out, null, 2),
);

console.log(
  `exported: ${pages.length} pages, ${investments.length} investments, ` +
  `${articles.length} articles, ${teamMembers.length} team members`,
);
