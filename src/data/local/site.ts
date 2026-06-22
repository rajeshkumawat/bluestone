import type { SiteSettings } from "../types";

export const siteSettings: SiteSettings = {
  siteName: "Bluestone Investment Partners",
  tagline: "Defense and Government Technology Investing",
  contact: {
    address: "1650 Tysons Blvd., Suite 810",
    address2: "McLean, VA 22102",
    phone: "(703) 462-5600",
  },
  social: [
    { platform: "linkedin", href: "https://www.linkedin.com/company/bluestone-investment-partners/" },
  ],
  nav: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Investments", href: "/investments" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
};
