/**
 * Block schema — discriminated union.
 *
 * A page is just `{ blocks: Block[] }`. To reorder a page, reorder
 * the array. To swap a section, change a block's `type`.
 *
 * When we move to Directus / Sanity / WP, this same shape is what
 * a "page builder" / "many-to-any" field returns. Components stay
 * the same.
 */

export type Cta = {
  label: string;
  href: string;
  /**
   * "primary"   = navy filled, white text
   * "secondary" = white filled, navy text
   * "outline"   = transparent, navy border + navy text
   */
  variant?: "primary" | "secondary" | "outline";
  /** Whether to render the trailing arrow icon. Default true. */
  arrow?: boolean;
};

/* ── 1. Hero ─────────────────────────────────────────── */
export type HeroBlock = {
  type: "hero";
  /**
   * "fullscreen" = used on Home, takes full viewport height.
   * "compact"    = used on inner pages, shorter (~60vh).
   */
  variant?: "fullscreen" | "compact";
  /**
   * Title segments — strings, italic-emphasis `{em: "..."}` chunks, and
   * forced line breaks via `{ br: true }`. Lets you compose:
   *   ["Defense and Government", { br: true }, "Technology ", { em: "Investing" }]
   * → renders as two lines with "Investing" italic.
   */
  titleSegments: Array<string | { em: string } | { br: true }>;
  /**
   * Poster image. Used as the first paint (shown instantly while
   * the video downloads) AND as the fallback for users with
   * prefers-reduced-motion or no video provided.
   */
  bgImage: string;
  /** MP4 source — primary, universal browser support. */
  bgVideoMp4?: string;
  /** Optional WebM source — smaller file, served first when supported. */
  bgVideoWebm?: string;
  /** Optional foreground overlay (e.g. starfield) */
  overlayImage?: string;
  /**
   * Navy gradient overlay strength.
   * - "default": heavy navy wash (62% top → 90% bottom) — used on Home where the video is busy.
   * - "light":   lighter wash (45% top → 70% bottom) — used on About where the video is already dark.
   */
  overlayStrength?: "default" | "light";
};

/* ── 2. Intro + stats rail ───────────────────────────── */
export type IntroStatsBlock = {
  type: "intro-stats";
  intro: string;
  cta: Cta;
  stats: Array<{ prefix?: string; value: number; suffix?: string; label: string }>;
};

/* ── 3. Partners for Growth (image left, copy right) ── */
export type PartnersForGrowthBlock = {
  type: "partners-for-growth";
  title: string;
  body: string;
  cta: Cta;
  bgImage: string;
};

/* ── 4. Portfolio marquee ────────────────────────────── */
export type PortfolioMarqueeBlock = {
  type: "portfolio-marquee";
  title: string;
  /** investment slugs to pull from the investments collection */
  investmentSlugs: string[];
  cta: Cta;
};

/* ── 5. News (latest 3) ──────────────────────────────── */
export type NewsBlock = {
  type: "news";
  title: string;
  /** article slugs; if omitted, take the 3 latest */
  articleSlugs?: string[];
  cta: Cta;
};

/* ── 6. Centered intro (heading + paragraphs, on navy) ─ */
export type CenteredIntroBlock = {
  type: "centered-intro";
  title: string;
  paragraphs: string[];
  /** Background tone — "primary" (navy), "bg" (light off-white), or "tertiary" (light blue-grey).
   *  Ignored when `layout: "split"` (split always uses the light bg). */
  tone?: "primary" | "bg" | "tertiary";
  /**
   * Layout variant.
   * - "centered" (default): existing centered text on the tone-able bg.
   * - "split": left-aligned text with a navy diagonal-parallelogram
   *   accent on the right (used for the About → "Our Firm" section).
   */
  layout?: "centered" | "split";
};

/* ── 7. Sector Focus (white card on tertiary bg) ──────── */
export type SectorFocusBlock = {
  type: "sector-focus";
  title: string;
  subtitle: string;
  paragraphs: string[];
};

/* ── 8. Approach Cards (heading + body + N image cards) ─ */
export type ApproachCardsBlock = {
  type: "approach-cards";
  title: string;
  body: string;
  cards: Array<{
    title: string;
    image: string;
  }>;
};

/* ── 9. Quote / Testimonial carousel ─────────────────── */
export type Testimonial = {
  quote: string;
  author: string;
  authorTitle: string;
  authorPhoto: string;
};
export type QuoteBlock = {
  type: "quote";
  /** One or more testimonials. When >1, auto-rotates with a progress bar. */
  quotes: Testimonial[];
  /** Seconds per quote before auto-advancing. Default: 8s. */
  intervalSeconds?: number;
};

/* ── 11. Page Header (title + divider + subtitle, on bg) ── */
export type PageHeaderBlock = {
  type: "page-header";
  title: string;
  /** Short tagline below the divider */
  subtitle?: string;
  /** Background tone — defaults to "bg" (light) */
  tone?: "bg" | "tertiary" | "primary";
};

/* ── 12. Team Grid (cards + modal bios) ──────────────── */
export type TeamGridBlock = {
  type: "team-grid";
  /** Member slugs in display order — resolved from the team collection */
  memberSlugs: string[];
};

/* ── 13. News List (3-col grid + pagination) ─────────── */
export type NewsListBlock = {
  type: "news-list";
  /** Articles per page. Default 9 (3×3 grid) */
  perPage?: number;
};

/* ── 14. Article body (sidebar + main content) ───────── */
export type ArticleBlock = {
  type: "article";
  /** Article slug — resolved from the articles collection */
  slug: string;
};

/* ── 17. Investments List (filter pills + grid) ───────── */
export type InvestmentsListBlock = {
  type: "investments-list";
};

/* ── 18. Investment Detail (single portfolio company) ── */
export type InvestmentDetailBlock = {
  type: "investment-detail";
  /** Slug of the investment to render */
  slug: string;
};

/* ── 16. Legal Page (Privacy / Terms / Cookies) ───────── */
/**
 * Section content can be a paragraph (with optional inline HTML for
 * emphasis / links) or a bulleted list. Discriminated by `kind`.
 */
export type LegalSectionContent =
  | { kind: "paragraph"; html: string }
  | { kind: "list"; items: string[] }
  | { kind: "spacer" };

export type LegalSection = {
  /** Section heading rendered as H2 + auto-anchored for the TOC */
  heading: string;
  content: LegalSectionContent[];
};

export type LegalPageBlock = {
  type: "legal-page";
  title: string;
  /** ISO date or display string. Pass empty to hide. */
  effectiveDate: string;
  /** Intro paragraphs (rendered above the sidebar, below the divider) */
  intro: string[];
  sections: LegalSection[];
};

/* ── 15. Contact (left: title+info, right: form) ──────── */
export type ContactInfoItem = {
  /** Soft label, e.g. "Phone Number" */
  label: string;
  /** Display value, e.g. "(703) 462-5600" */
  value: string;
  /** Optional href for value (e.g. tel:..., mailto:...) */
  href?: string;
};

export type ContactBlock = {
  type: "contact";
  title: string;
  info: ContactInfoItem[];
  /** Email address the form posts to (used for mailto fallback) */
  recipient?: string;
};

/* ── 10. Investment Criteria (icon + label + content) ── */
export type CriteriaIcon = "target" | "bar-chart" | "globe";

export type InvestmentCriteriaBlock = {
  type: "investment-criteria";
  title: string;
  rows: Array<{
    icon: CriteriaIcon;
    label: string;
    /**
     * Three content shapes supported:
     *  - string: a single sentence
     *  - { key, value }[]: list of "Key: Value" lines
     *  - string[]: bullet list
     */
    content: string | Array<{ key: string; value: string }> | string[];
  }>;
};

/* ── Future blocks slot in here ─────────────────────── */
// export type TestimonialsBlock = { type: "testimonials"; ... }

export type Block =
  | HeroBlock
  | IntroStatsBlock
  | PartnersForGrowthBlock
  | PortfolioMarqueeBlock
  | NewsBlock
  | CenteredIntroBlock
  | SectorFocusBlock
  | ApproachCardsBlock
  | QuoteBlock
  | InvestmentCriteriaBlock
  | PageHeaderBlock
  | TeamGridBlock
  | NewsListBlock
  | ArticleBlock
  | ContactBlock
  | LegalPageBlock
  | InvestmentsListBlock
  | InvestmentDetailBlock;

export type Page = {
  slug: string;
  title: string;
  description: string;
  blocks: Block[];
};
