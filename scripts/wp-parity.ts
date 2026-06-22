/**
 * Parity check: WordPress (via WPGraphQL) vs local TS content.
 * Compares structure — block sequences, entity counts, slug sets, ordering,
 * and text content. Image fields are compared as present/absent (URLs differ
 * by design: local "/images/x.jpg" vs WP "https://…/x-scaled.jpg").
 * Run: npx tsx scripts/wp-parity.ts
 */
import { wpQuery } from "../src/data/wp/client";
import { PAGE_QUERY, INVESTMENTS_QUERY, ARTICLES_QUERY, TEAM_QUERY, SETTINGS_QUERY } from "../src/data/wp/queries";
import { mapPage, mapInvestment, mapArticle, mapTeamMember, mapSettings } from "../src/data/wp/map";

import { home } from "../src/data/local/pages/home";
import { about } from "../src/data/local/pages/about";
import { team as teamPage } from "../src/data/local/pages/team";
import { news as newsPage } from "../src/data/local/pages/news";
import { contact as contactPage } from "../src/data/local/pages/contact";
import { privacyPolicy } from "../src/data/local/pages/privacy-policy";
import { termsOfUse } from "../src/data/local/pages/terms-of-use";
import { cookiePolicy } from "../src/data/local/pages/cookie-policy";
import { investments as investmentsPage } from "../src/data/local/pages/investments";
import { investments as localInvestments } from "../src/data/local/investments";
import { articles as localArticles } from "../src/data/local/articles";
import { teamMembers as localTeam } from "../src/data/local/team";
import { siteSettings as localSettings } from "../src/data/local/site";

const localPages: Record<string, any> = {
  home, about, team: teamPage, news: newsPage, contact: contactPage,
  "privacy-policy": privacyPolicy, "terms-of-use": termsOfUse,
  "cookie-policy": cookiePolicy, investments: investmentsPage,
};

let fails = 0;
const ok = (c: boolean, msg: string) => { if (!c) { fails++; console.log("  ✗ " + msg); } };
const setEq = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));

// Normalize for structural comparison:
//  - image-ish fields → "‹media›" (URLs differ by design)
//  - drop ACF default values the components also apply (render-equivalent)
const isDefault = (k: string, val: any) =>
  (k === "arrow" && val === true) ||
  (k === "variant" && val === "fullscreen") ||
  (k === "overlayStrength" && val === "default") ||
  (k === "tone" && val === "bg");
const norm = (v: any): any => {
  if (Array.isArray(v)) return v.map(norm);
  if (v && typeof v === "object") {
    const o: any = {};
    for (const k of Object.keys(v)) {
      if (v[k] === undefined || isDefault(k, v[k])) continue;
      if (/image|photo|logo|Video|featured/i.test(k)) o[k] = v[k] ? "‹media›" : v[k];
      else o[k] = norm(v[k]);
    }
    return o;
  }
  return v;
};

async function run() {
  console.log("=== PAGES ===");
  for (const slug of Object.keys(localPages)) {
    const wp = mapPage(slug, (await wpQuery(PAGE_QUERY, { slug })).pages.nodes[0]);
    const loc = localPages[slug];
    const wTypes = (wp?.blocks ?? []).map((b: any) => b.type);
    const lTypes = loc.blocks.map((b: any) => b.type);
    const seqOk = JSON.stringify(wTypes) === JSON.stringify(lTypes);
    ok(seqOk, `${slug}: block sequence  local[${lTypes.join(",")}] vs wp[${wTypes.join(",")}]`);
    if (seqOk) {
      loc.blocks.forEach((lb: any, i: number) => {
        const ln = norm(lb), wn = norm(wp!.blocks[i]);
        const keys = new Set([...Object.keys(ln), ...Object.keys(wn)]);
        const diffs = [...keys].filter((k) => JSON.stringify(ln[k]) !== JSON.stringify(wn[k]));
        if (diffs.length) {
          fails++;
          console.log(`    [${i}] ${lb.type}: ` + diffs.map((k) =>
            `${k}{L:${JSON.stringify(ln[k]) ?? "∅"} W:${JSON.stringify(wn[k]) ?? "∅"}}`).join("  ").slice(0, 280));
        }
      });
    }
    console.log(`  ${slug}: ${lTypes.length} blocks ${seqOk ? "✓" : "✗"}`);
  }

  console.log("=== INVESTMENTS ===");
  const wInv = (await wpQuery(INVESTMENTS_QUERY)).investments.nodes.map(mapInvestment);
  ok(wInv.length === localInvestments.length, `count ${wInv.length} vs ${localInvestments.length}`);
  ok(setEq(wInv.map((i: any) => i.slug), localInvestments.map((i) => i.slug)), "slug set mismatch");
  const lParents = localInvestments.filter((i) => i.parentSlug).map((i) => i.slug).sort();
  const wParents = wInv.filter((i: any) => i.parentSlug).map((i: any) => i.slug).sort();
  ok(JSON.stringify(lParents) === JSON.stringify(wParents), `child set: local ${lParents.length} vs wp ${wParents.length}`);
  console.log(`  ${wInv.length} investments, ${wParents.length} children ✓`);

  console.log("=== ARTICLES ===");
  const wArt = (await wpQuery(ARTICLES_QUERY)).articles.nodes.map(mapArticle);
  ok(wArt.length === localArticles.length, `count ${wArt.length} vs ${localArticles.length}`);
  ok(setEq(wArt.map((a: any) => a.slug), localArticles.map((a) => a.slug)), "slug set mismatch");
  console.log(`  ${wArt.length} articles ✓`);

  console.log("=== TEAM ===");
  const wTeam = (await wpQuery(TEAM_QUERY)).teamMembers.nodes
    .slice().sort((a: any, b: any) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0)).map(mapTeamMember);
  ok(wTeam.length === localTeam.length, `count ${wTeam.length} vs ${localTeam.length}`);
  ok(JSON.stringify(wTeam.map((m: any) => m.slug)) === JSON.stringify(localTeam.map((m) => m.slug)), "order/slug mismatch");
  console.log(`  ${wTeam.length} members, order ✓`);

  console.log("=== SETTINGS ===");
  const wSet = mapSettings(await wpQuery(SETTINGS_QUERY));
  ok(JSON.stringify(norm(wSet)) === JSON.stringify(norm(localSettings)), "settings differ");
  console.log(`  nav ${wSet.nav.length}, social ${wSet.social.length} ✓`);

  console.log(fails === 0 ? "\nPARITY: ✅ all checks passed" : `\nPARITY: ⚠ ${fails} check(s) flagged`);
}
run().catch((e) => { console.error(e); process.exit(1); });
