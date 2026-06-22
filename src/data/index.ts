/**
 * Content access layer.
 *
 * Source is selected by the CONTENT_SOURCE env var:
 *   - "local" (default): typed local TS files — original behaviour, kept as
 *                        an instant fallback and for parity diffing.
 *   - "wp":              headless WordPress via WPGraphQL (bluestone-wp).
 *
 * Components import these getters and never care which source answered.
 *
 *   import { getPage, getInvestments, getArticles } from "@content";
 */
import type { Page, Investment, Article, SiteSettings, TeamMember } from "./types";

import { home } from "./local/pages/home";
import { about } from "./local/pages/about";
import { team as teamPage } from "./local/pages/team";
import { news as newsPage } from "./local/pages/news";
import { contact as contactPage } from "./local/pages/contact";
import { privacyPolicy } from "./local/pages/privacy-policy";
import { termsOfUse } from "./local/pages/terms-of-use";
import { cookiePolicy } from "./local/pages/cookie-policy";
import { investments as investmentsPage } from "./local/pages/investments";
import { investments as localInvestments } from "./local/investments";
import { articles as localArticles } from "./local/articles";
import { teamMembers as localTeam } from "./local/team";
import { siteSettings as localSiteSettings } from "./local/site";

import { wpQuery } from "./wp/client";
import { PAGE_QUERY, INVESTMENTS_QUERY, ARTICLES_QUERY, TEAM_QUERY, SETTINGS_QUERY } from "./wp/queries";
import { mapPage, mapInvestment, mapArticle, mapTeamMember, mapSettings } from "./wp/map";

const env: any = (import.meta as any).env ?? {};
const USE_WP = (env.CONTENT_SOURCE ?? "local") === "wp";

const localPages: Record<string, Page> = {
  home, about, team: teamPage, news: newsPage, contact: contactPage,
  "privacy-policy": privacyPolicy, "terms-of-use": termsOfUse,
  "cookie-policy": cookiePolicy, investments: investmentsPage,
};

/* ── WP fetch + caching ───────────────────────────────────────────────
 * In `astro dev` (DEV) we bypass the cache so WordPress edits appear on the
 * next page reload — no rebuild or restart needed. In `astro build` we
 * memoize so each collection is fetched once per build.
 */
const LIVE = Boolean(env.DEV);
const _cache = new Map<string, Promise<any>>();
function memo<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (LIVE) return fn();
  if (!_cache.has(key)) _cache.set(key, fn());
  return _cache.get(key) as Promise<T>;
}

const wpInvestments = () =>
  memo("inv", () => wpQuery(INVESTMENTS_QUERY).then((d) => d.investments.nodes.map(mapInvestment)));
const wpArticles = () =>
  memo("art", () => wpQuery(ARTICLES_QUERY).then((d) =>
    d.articles.nodes.map(mapArticle).sort((a: Article, b: Article) => +new Date(b.publishedAt) - +new Date(a.publishedAt)),
  ));
const wpTeam = () =>
  memo("team", () => wpQuery(TEAM_QUERY).then((d) =>
    d.teamMembers.nodes.slice().sort((a: any, b: any) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0)).map(mapTeamMember),
  ));
const wpSettings = () => memo("settings", () => wpQuery(SETTINGS_QUERY).then(mapSettings));
const wpPage = (slug: string) =>
  memo("page:" + slug, () => wpQuery(PAGE_QUERY, { slug }).then((d) => mapPage(slug, d.pages.nodes[0] ?? null)));

/* ── public API (source-agnostic) ────────────────────────────────────── */
export async function getPage(slug: string): Promise<Page | null> {
  return USE_WP ? wpPage(slug) : localPages[slug] ?? null;
}

export async function getInvestments(): Promise<Investment[]> {
  const all = USE_WP ? await wpInvestments() : localInvestments;
  return all.filter((i) => !i.hidden);
}

/** Only parent-level investments (no parentSlug) — used for static page generation. */
export async function getParentInvestments(): Promise<Investment[]> {
  const all = USE_WP ? await wpInvestments() : localInvestments;
  return all.filter((i) => !i.hidden && !i.parentSlug);
}

export async function getInvestmentBySlug(slug: string): Promise<Investment | null> {
  const all = USE_WP ? await wpInvestments() : localInvestments;
  return all.find((i) => i.slug === slug) ?? null;
}

export async function getArticles(limit?: number): Promise<Article[]> {
  const sorted = USE_WP
    ? await wpArticles()
    : [...localArticles].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = USE_WP ? await wpArticles() : localArticles;
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return USE_WP ? wpSettings() : localSiteSettings;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return USE_WP ? wpTeam() : localTeam;
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const all = USE_WP ? await wpTeam() : localTeam;
  return all.find((m) => m.slug === slug) ?? null;
}

export type { Page, Block, Investment, Article, TeamMember, SiteSettings, Cta } from "./types";
