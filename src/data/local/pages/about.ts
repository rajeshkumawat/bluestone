import type { Page } from "../../types";

/**
 * About page = ordered list of blocks.
 * Reorder this array to reorder sections on the live site.
 */
export const about: Page = {
  slug: "about",
  title: "About",
  description:
    "Bluestone Investment Partners is a private equity firm focused on the lower middle market Government Services and Technology sector.",
  blocks: [
    // 1. Hero — fullscreen, dedicated About video, lighter overlay
    {
      type: "hero",
      variant: "fullscreen",
      titleSegments: ["Creating Value", { br: true }, "Through Partnership"],
      bgImage: "/images/hero-earth.jpg",
      bgVideoMp4: "/videos/bluestone-investment-about.mp4",
      overlayStrength: "light",
    },

    // 2. Our Firm — split layout (left-aligned text + navy diagonal accent on right)
    {
      type: "centered-intro",
      layout: "split",
      title: "Our Firm",
      paragraphs: [
        "Bluestone Investment Partners seeks to invest in technology and product companies serving the defense and government sector. We partner with mission-driven, growth-oriented leadership teams, pairing their insights and experience with our resources, relationships, and M&A expertise. Together, we create long-term value by driving growth through both organic initiatives and targeted acquisitions.",
      ],
    },

    // 3. Sector Focus — white card on tertiary
    {
      type: "sector-focus",
      title: "Defense & Government",
      subtitle: "Sector Focus",
      paragraphs: [
        "Our team has spent decades working in the defense and government sector, gaining hands-on experience as business operators and financial professionals. Over the years, we have led and advised companies across a wide range of transactions, navigating complex regulations, market trends, and strategic growth initiatives.",
        "This long-standing, sector-focused experience gives Bluestone a deep understanding of the industry's unique dynamics and enables our team to support portfolio companies in creating lasting value.",
      ],
    },

    // 4. Empowering Leadership Teams — heading + body + 3 cards
    {
      type: "approach-cards",
      title: "Empowering Leadership Teams",
      body:
        "Bluestone's investment philosophy centers on partnering with leadership teams who bring knowledge, proven leadership, and a passion for growth. We believe the most successful partnerships are built on collaboration, combining the insights, experience, and operational expertise of leadership with Bluestone's extensive resources, strategic guidance, and network of relationships. By working closely together, Bluestone and leadership aim to drive meaningful transformation within businesses, creating long-term value through a combination of disciplined organic growth initiatives and strategic add-on acquisitions.",
      cards: [
        { title: "Strategic Add-on Acquisitions", image: "/images/about/approach-strategic.jpg" },
        { title: "Accelerated Growth", image: "/images/about/approach-growth.jpg" },
        { title: "Value Creation", image: "/images/about/approach-value.jpg" },
      ],
    },

    // 5. Quote / Testimonial — auto-rotating carousel
    {
      type: "quote",
      intervalSeconds: 8,
      quotes: [
        {
          quote:
            "Within the first 12 months of our partnership, Bluestone helped us complete two strategic add-on acquisitions that fundamentally changed our trajectory. Those transactions not only added scale, but also unlocked new organic growth opportunities that accelerated the business well beyond our original plan. Bluestone's extensive and strategic guidance were instrumental in helping us capitalize on that momentum.",
          author: "Dave Hart",
          authorTitle: "Co-Founder, Axim Geospatial",
          authorPhoto: "/images/about/dave-hart.jpg",
        },
        {
          quote:
            "From the start, Bluestone understood that CTI was a deeply mission-focused company. They partnered with us to make the targeted technology investments that strengthened our capabilities and enhanced our positioning with Special Operations Forces and Indo-Pacific Command. That kind of focused investment was what enabled us to keep serving our nation's warfighters at the highest level.",
          author: "Jay Moorman",
          authorTitle: "CEO, CTI",
          authorPhoto: "/images/about/jay-moorman.jpg",
        },
        {
          quote:
            "Bluestone's strategic acquisition model worked exactly as advertised. Over our 3-year partnership, we grew cBEYONData nearly tenfold through a disciplined mix of add-on acquisitions and new business wins. They were a true partner in execution, not just a source of capital.",
          author: "Dave Schmidtknecht",
          authorTitle: "Founder, cBEYONData",
          authorPhoto: "/images/about/dave-schmidtknecht.webp",
        },
        {
          quote:
            "At Precise Systems, we put our people first, and Bluestone has been a partner that operates the same way. In the first three years of our partnership, we've more than doubled the size of the company while preserving the culture we worked hard to build. We're now positioned to pursue contracts of scale that wouldn't have been within reach before.",
          author: "Scott Pfister",
          authorTitle: "CEO, Precise Systems",
          authorPhoto: "/images/about/scott-pfister.webp",
        },
      ],
    },

    // 6. Investment Criteria
    {
      type: "investment-criteria",
      title: "Investment Criteria",
      rows: [
        {
          icon: "target",
          label: "Areas of Interest:",
          content: "Defense and Government Sector",
        },
        {
          icon: "bar-chart",
          label: "Company Size:",
          content: [
            { key: "Revenue", value: "$15M–$150M" },
            { key: "EBITDA", value: "$2M – $10M+" },
          ],
        },
        {
          icon: "globe",
          label: "Investment Types:",
          content: [
            "Majority Investments (Preferred)",
            "Management Buyouts",
            "Co-Investments",
            "Minority Investments",
            "Recapitalizations",
            "Growth Capital",
            "Corporate Carve-Outs",
          ],
        },
      ],
    },
  ],
};
