import type { Page } from "../../types";

/**
 * Home page = ordered list of blocks.
 * Reorder this array to reorder sections on the live site.
 * Swap a block's `type` to swap a section.
 */
export const home: Page = {
  slug: "home",
  title: "Bluestone Investment Partners",
  description:
    "Bluestone Investment Partners is a lower middle market private equity firm specializing in defense and government solutions & technology sector.",
  blocks: [
    {
      type: "hero",
      titleSegments: [
        "Defense and Government",
        { br: true },
        "Technology Investing",
      ],
      // bgImage stays as the poster: it paints instantly while the
      // video downloads, and is the reduced-motion fallback.
      bgImage: "/images/hero-earth.jpg",
      // SEO-friendly filename. Source: AdobeStock 1281317321 (compressed, 3.8 MB).
      bgVideoMp4: "/videos/bluestone-investment-partners-hero.mp4",
      // bgVideoWebm: "/videos/bluestone-investment-partners-hero.webm",
    },
    {
      type: "intro-stats",
      intro:
        "Bluestone Investment Partners is a lower middle market private equity firm focused on investing in defense and government technology companies.",
      cta: { label: "Learn More", href: "/about", variant: "primary" },
      stats: [
        { prefix: "", suffix: "", value: 27, label: "total investments" },
        { prefix: "", suffix: "", value: 12, label: "platform investments" },
        { prefix: "", suffix: "", value: 8, label: "exits" },
      ],
    },
    {
      type: "partners-for-growth",
      title: "Partners for Growth",
      body:
        "Bluestone partners with leadership teams to accelerate growth and create value through a combination of organic growth initiatives and add-on acquisitions. The extensive industry-focus and experience of our team offers unique insights and value to our companies.",
      cta: { label: "Learn More", href: "/about", variant: "secondary" },
      bgImage: "/images/partners-aircraft-carrier.jpg",
    },
    {
      type: "portfolio-marquee",
      title: "Investments",
      // Only the 9 investments with real data / detail-page content show
      // on the home marquee. The other 17 (placeholder-only) are still
      // pulled in by /investments but kept off the home page until the
      // firm provides real bios / sectors / dates.
      investmentSlugs: [
        "axim-geospatial",
        "cbeyondata",
        "cti",
        "precise-systems",
        "qualis",
        "intrack-radar-technologies",
        "tektonux",
        "valiant-solutions",
        "abile-group",
      ],
      cta: { label: "See All Investments", href: "/investments", variant: "primary" },
    },
    {
      type: "news",
      title: "News",
      cta: { label: "See All News", href: "/news", variant: "primary" },
    },
  ],
};
