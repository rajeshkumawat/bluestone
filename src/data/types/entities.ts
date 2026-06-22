/**
 * Domain entities — these mirror the CMS collections we'll create
 * in Directus (or Sanity / WP) later. The frontend imports from
 * here regardless of the data source.
 */

export type Investment = {
  slug: string;
  name: string;
  /** Logo asset path (used on grid cards + detail right-side image as fallback) */
  logo: string;
  /** Optional darker variant for light-on-dark cards */
  logoDark?: string;
  /** Status: active portfolio company or realized exit */
  status: "active" | "realized";
  /** Short tagline shown on detail page */
  tagline?: string;
  /** Body paragraphs for the detail page description */
  description?: string[];
  /** Sector tag */
  sector?: string;
  /** External website */
  website?: string;
  /** Platform investment date — display string (e.g. "November 2021") */
  platformInvestmentDate?: string;
  /**
   * Platform acquisitions made under this investment.
   * Each entry is the slug of another investment (or a {name, logo} object).
   */
  acquisitions?: Array<{ name: string; logo: string }>;
  /** Related news article slugs (internal) */
  relatedNews?: string[];
  /** External news links shown on the detail page */
  externalNews?: Array<{ title: string; url: string }>;
  /** Featured image used on detail page (overrides logo if provided) */
  featuredImage?: string;
  /**
   * If set, this is a child/acquisition company. It appears on the investments
   * list page but clicking it routes to the parent's detail page instead.
   * No own /investments/[slug] page is generated for child companies.
   */
  parentSlug?: string;
  /** Set to true to hide this entry from all public lists/pages */
  hidden?: boolean;
};

/**
 * Structured article body — array of sections.
 * Each section has an optional heading + N paragraphs. This shape
 * maps cleanly onto a Directus / Sanity rich-text array later.
 */
export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  /** Shortened title for card previews — falls back to title if not set */
  shortTitle?: string;
  /**
   * Homepage card title with explicit desktop line breaks.
   * Array of strings — each string is one line on desktop (joined with <br>).
   * Falls back to shortTitle → title when not set.
   */
  homeCardLines?: string[];
  excerpt: string;
  /** ISO date */
  publishedAt: string;
  /** Structured body — array of sections */
  body?: ArticleSection[];
  /** Reading-time estimate in minutes; auto-calculated if missing */
  readMinutes?: number;
  /** Category pill label */
  category?: string;
  /** Hero image */
  coverImage?: string;
  /** Optional source / outlet */
  source?: string;
  /** Optional external URL — if set, the article detail page shows a "View Article" CTA that opens this in a new tab. */
  externalUrl?: string;
};

export type TeamMember = {
  slug: string;
  /** Card display name — e.g. "Joe Collins" */
  name: string;
  /** Full formal name for the modal heading, defaults to `name` */
  fullName?: string;
  /** Card title — e.g. "MANAGING PARTNER" */
  title: string;
  /** Modal title — usually fuller than the card title */
  modalTitle?: string;
  /** Bio paragraphs (rendered with paragraph spacing in the modal) */
  bio: string[];
  /** Headshot path. Empty/missing → placeholder is shown. */
  photo: string;
  /** LinkedIn profile URL */
  linkedin?: string;
  /** Email address — rendered as a mailto: link in the bio modal */
  email?: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  contact: {
    address: string;
    address2?: string;
    phone: string;
    email?: string;
  };
  social: Array<{ platform: string; href: string }>;
  nav: Array<{ label: string; href: string }>;
};
