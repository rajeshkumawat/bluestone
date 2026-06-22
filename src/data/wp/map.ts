/**
 * Map WPGraphQL responses back into the exact domain shapes the .astro
 * components consume (src/data/types). The component layer never changes;
 * only the source of these objects does.
 */
import type {
  Block,
  Page,
  Investment,
  Article,
  TeamMember,
  SiteSettings,
  Cta,
} from "../types";

/* ── primitives ──────────────────────────────────────────────────────── */
// ACF select fields serialize as [String]; unwrap to the single value.
const sel = (v: any): any => (Array.isArray(v) ? v[0] : v);
// media connection edge → URL string (mediaItemUrl works for images + video).
const media = (e: any): string | undefined => e?.node?.mediaItemUrl ?? undefined;
// relationship/connection → slug[]
const slugs = (c: any): string[] => (c?.nodes ?? []).map((n: any) => n.slug);
const texts = (a: any): string[] => (a ?? []).map((x: any) => x.text);

const cta = (c: any): Cta => ({
  label: c?.label ?? "",
  href: c?.href ?? "",
  variant: sel(c?.variant) ?? undefined,
  arrow: c?.arrow ?? undefined,
});

/* ── blocks ──────────────────────────────────────────────────────────── */
export function mapBlock(b: any): Block | null {
  switch (b.__typename) {
    case "PageBuilderBlocksHeroLayout":
      return {
        type: "hero",
        variant: sel(b.variant) ?? undefined,
        titleSegments: (b.titleSegments ?? []).map((s: any) => {
          const k = sel(s.kind);
          if (k === "em") return { em: s.text };
          if (k === "break") return { br: true };
          return s.text;
        }),
        bgImage: media(b.bgImage)!,
        bgVideoMp4: media(b.bgVideoMp4),
        bgVideoWebm: media(b.bgVideoWebm),
        overlayImage: media(b.overlayImage),
        overlayStrength: sel(b.overlayStrength) ?? undefined,
      };
    case "PageBuilderBlocksIntroStatsLayout":
      return {
        type: "intro-stats",
        intro: b.intro,
        cta: cta(b.cta),
        stats: (b.stats ?? []).map((s: any) => ({ prefix: s.prefix ?? "", suffix: s.suffix ?? "", value: s.value, label: s.label })),
      };
    case "PageBuilderBlocksPartnersForGrowthLayout":
      return { type: "partners-for-growth", title: b.title, body: b.body, cta: cta(b.cta), bgImage: media(b.bgImage)! };
    case "PageBuilderBlocksPortfolioMarqueeLayout":
      return { type: "portfolio-marquee", title: b.title, investmentSlugs: slugs(b.investmentSlugs), cta: cta(b.cta) };
    case "PageBuilderBlocksNewsLayout": {
      const a = slugs(b.articleSlugs);
      return { type: "news", title: b.title, ...(a.length ? { articleSlugs: a } : {}), cta: cta(b.cta) };
    }
    case "PageBuilderBlocksCenteredIntroLayout":
      return { type: "centered-intro", title: b.title, paragraphs: texts(b.paragraphs), tone: sel(b.tone) ?? undefined, layout: sel(b.layout) ?? undefined };
    case "PageBuilderBlocksSectorFocusLayout":
      return { type: "sector-focus", title: b.title, subtitle: b.subtitle, paragraphs: texts(b.paragraphs) };
    case "PageBuilderBlocksApproachCardsLayout":
      return { type: "approach-cards", title: b.title, body: b.body, cards: (b.cards ?? []).map((c: any) => ({ title: c.title, image: media(c.image)! })) };
    case "PageBuilderBlocksQuoteLayout":
      return {
        type: "quote",
        quotes: (b.quotes ?? []).map((q: any) => ({ quote: q.quote, author: q.author, authorTitle: q.authorTitle, authorPhoto: media(q.authorPhoto)! })),
        intervalSeconds: b.intervalSeconds ?? undefined,
      };
    case "PageBuilderBlocksInvestmentCriteriaLayout":
      return {
        type: "investment-criteria",
        title: b.title,
        rows: (b.rows ?? []).map((r: any) => {
          const ct = sel(r.contentType);
          let content: any;
          if (ct === "keyvalue") content = (r.pairs ?? []).map((p: any) => ({ key: p.key, value: p.value }));
          else if (ct === "list") content = texts(r.items);
          else content = r.text;
          return { icon: sel(r.icon), label: r.label, content };
        }),
      };
    case "PageBuilderBlocksPageHeaderLayout":
      return { type: "page-header", title: b.title, subtitle: b.subtitle || undefined, tone: sel(b.tone) ?? undefined };
    case "PageBuilderBlocksTeamGridLayout":
      return { type: "team-grid", memberSlugs: slugs(b.memberSlugs) };
    case "PageBuilderBlocksNewsListLayout":
      return { type: "news-list", ...(b.perPage ? { perPage: b.perPage } : {}) };
    case "PageBuilderBlocksContactLayout":
      return {
        type: "contact",
        title: b.title,
        info: (b.info ?? []).map((i: any) => ({ label: i.label, value: i.value, ...(i.href ? { href: i.href } : {}) })),
        ...(b.recipient ? { recipient: b.recipient } : {}),
      };
    case "PageBuilderBlocksLegalPageLayout":
      return {
        type: "legal-page",
        title: b.title,
        effectiveDate: b.effectiveDate ?? "",
        intro: texts(b.legalIntro),
        sections: (b.sections ?? []).map((s: any) => ({
          heading: s.heading,
          content: (s.content ?? []).map((c: any) => {
            const k = sel(c.kind);
            if (k === "list") return { kind: "list", items: texts(c.items) };
            if (k === "spacer") return { kind: "spacer" };
            return { kind: "paragraph", html: c.html };
          }),
        })),
      };
    case "PageBuilderBlocksInvestmentsListLayout":
      return { type: "investments-list" };
    default:
      return null; // article / investment-detail / global-reference never appear on stored pages
  }
}

/* ── pages + entities ────────────────────────────────────────────────── */
export function mapPage(slug: string, n: any): Page | null {
  if (!n) return null;
  return {
    slug,
    title: n.title ?? "",
    description: n.excerpt ?? "",
    blocks: (n.pageBuilder?.blocks ?? []).map(mapBlock).filter(Boolean) as Block[],
  };
}

export function mapInvestment(n: any): Investment {
  const f = n.investmentFields ?? {};
  return {
    slug: n.slug,
    name: n.title,
    logo: media(f.logo) ?? "",
    logoDark: media(f.logoDark),
    status: sel(f.status) ?? "active",
    tagline: f.tagline || undefined,
    description: texts(f.description),
    sector: n.sectors?.nodes?.[0]?.name || undefined,
    website: f.website || undefined,
    platformInvestmentDate: f.platformInvestmentDate || undefined,
    acquisitions: (f.acquisitions ?? []).map((a: any) => ({ name: a.name, logo: media(a.logo) ?? "" })),
    relatedNews: slugs(f.relatedNews),
    externalNews: (f.externalNews ?? []).map((e: any) => ({ title: e.title, url: e.url })),
    featuredImage: media(f.featuredImage),
    parentSlug: n.parent?.node?.slug || undefined,
    hidden: f.hidden || undefined,
  };
}

export function mapArticle(n: any): Article {
  const f = n.articleFields ?? {};
  const lines = texts(f.homeCardLines);
  return {
    slug: n.slug,
    title: n.title,
    shortTitle: f.shortTitle || undefined,
    ...(lines.length ? { homeCardLines: lines } : {}),
    excerpt: f.excerpt ?? "",
    publishedAt: (n.date ?? "").split("T")[0],
    body: (f.body ?? []).map((s: any) => ({ ...(s.heading ? { heading: s.heading } : {}), paragraphs: texts(s.paragraphs) })),
    readMinutes: f.readMinutes || undefined,
    category: f.category || undefined,
    coverImage: media(f.coverImage),
    source: f.source || undefined,
    externalUrl: f.externalUrl || undefined,
  };
}

export function mapTeamMember(n: any): TeamMember {
  const f = n.teamFields ?? {};
  return {
    slug: n.slug,
    name: n.title,
    fullName: f.fullName || undefined,
    title: f.title ?? "",
    modalTitle: f.modalTitle || undefined,
    bio: texts(f.bio),
    photo: media(f.photo) ?? "",
    linkedin: f.linkedin || undefined,
    email: f.email || undefined,
  };
}

export function mapSettings(d: any): SiteSettings {
  const f = d.siteSettings?.siteSettingsFields ?? {};
  return {
    siteName: f.siteName ?? "",
    tagline: f.tagline ?? "",
    contact: {
      address: f.contact?.address ?? "",
      address2: f.contact?.address2 || undefined,
      phone: f.contact?.phone ?? "",
      email: f.contact?.email || undefined,
    },
    social: (f.social ?? []).map((s: any) => ({ platform: s.platform, href: s.href })),
    nav: (f.nav ?? []).map((x: any) => ({ label: x.label, href: x.href })),
  };
}
