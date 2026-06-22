import type { APIRoute } from "astro";
import { getInvestments, getArticles } from "@content";

const SITE = "https://bluestone2.designinx.com";

const STATIC_PAGES = [
  "/",
  "/about/",
  "/team/",
  "/investments/",
  "/news/",
  "/contact/",
  "/privacy-policy/",
  "/terms-of-use/",
  "/cookie-policy/",
];

export const GET: APIRoute = async () => {
  const [investments, articles] = await Promise.all([
    getInvestments(),
    getArticles(),
  ]);

  // Only parent investments (no child/acquisition pages)
  const investmentUrls = investments
    .filter((i) => !i.parentSlug)
    .map((i) => `${SITE}/investments/${i.slug}/`);

  const newsUrls = articles.map((a) => `${SITE}/news/${a.slug}/`);

  const allUrls = [
    ...STATIC_PAGES.map((p) => `${SITE}${p}`),
    ...investmentUrls,
    ...newsUrls,
  ];

  const urls = allUrls
    .map((loc) => `  <url><loc>${loc}</loc></url>`)
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
