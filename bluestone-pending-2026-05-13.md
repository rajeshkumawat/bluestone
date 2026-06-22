# Bluestone — Internal Pending List (as of 2026-05-13)

Companion to `bluestone-status-report-2026-05-13.html` (client-facing report).
This file tracks the **full original 24-item feedback list** plus extra items completed beyond it. Astro/Vite dev-infra item (originally #3) is intentionally omitted.

---

## Done — from the original 24-item list

| # | Item | Notes |
|---|------|-------|
| 1 | Home hero: "Investing" should not be italic | shipped |
| 2 | About hero: split into two lines, no italic | shipped |
| 4 | About → "Empowering Leadership Teams" body paragraph: bump to larger body size | shipped |
| 5 | Mobile hamburger button vertically centered with BLUESTONE logo | re-fixed 5/13 with JS-driven dynamic centering across all 3 header states (transparent / sticky-white / drawer-open) |
| 6 | News article detail page: remove category + read time; add "View Article" external CTA | shipped (also added `externalUrl?` field on Article type) |
| 7 | Replace CTI logo site-wide | shipped 5/13 — trim + resize, keeps white bg (no chroma-key) |
| 8 | Reorder investments to client's preferred 27-entry sequence | shipped — PAI at #1, TES renamed to TES-i, InTrack capitalized |
| 9 | Add PAI logo | shipped 5/13 — gradient stops `#009DFD` and `#5DC3FF` darkened to `#0270B0` and `#3A8FC2` so the mark stays visible in CSS grayscale state. Darkest stop `#0A628F` untouched |
| 13 | Investments list logos −15% | shipped |
| 14 | Email icon in bio modal + email field on Team type | shipped — modal also patched 5/13 so BOTH icons always render with company fallbacks (`linkedin.com/company/bluestone-investment-partners/` and `info@bluestoneinv.com`) |
| 16 | Team page subtitle removed | shipped |
| 17 | Investment Criteria bullets removed | shipped |
| 18 | Investment Criteria row vertical alignment (md:items-center) | shipped |
| 19 | Verify home marquee 9-logo order | reordered 5/13 to: Axim → CBEYONData → CTI → Precise → Qualis → InTrack → Tektonux → Valiant → Abile |
| 20 | Footer phone `tel:` + email `mailto:` links | shipped |
| 23 | Site-wide animation rework — paragraph fade instead of word-by-word | shipped 5/13 — HeroBlock, IntroStatsBlock, PartnersForGrowthBlock all converted |

**16 of 24 numbered items closed.**

## Done — additional items beyond the numbered list

| Item | Notes |
|------|-------|
| Footer LinkedIn icon → real Bluestone company page URL | shipped |
| Per-page hero overlay strength prop (About lighter than Home) | shipped — `overlayStrength?: "default" \| "light"` on HeroBlock |
| Marquee logos preloaded + `Promise.all(img.decode())` gate before tween starts | shipped 5/13 — no more pop-in as cards slide in |
| Marquee drag / swipe (mouse + touch) | shipped 5/13 — pointer events, wraps via `% half()`, suppresses click on drag >6px |
| Marquee "Learn More" hover — underline draw + dual-arrow swap | shipped 5/13 — matches Investments page treatment via `<style is:global>` scoped to `[data-block="portfolio-marquee"]` |
| `externalUrl` field added to Article type | shipped — powers the news "View Article" CTA |
| Dev-infra: cache-clear ExecStartPre + journal watchdog systemd unit | not surfaced in client report |

---

## Still pending — awaiting client content

| # | Item | What's needed |
|---|------|---------------|
| 14 (partial) | Team email addresses | one per member; will replace company fallback in bio modal |
| 15 | Team page populated with real bios + headshots | 4 headshots, up to 16 bios |
| 21 | News section populated with real articles | titles, dates, summaries, external URLs |
| 22 | Investment detail pages populated with real content | per-company: description, sector, platform investment date, related news, parent/add-on relationship |
| 24 | Updated Bluestone logo (font from client) | client to provide the font |

## Still pending — scheduled architecture work

| # | Item | Notes |
|---|------|-------|
| 10 | Parent/child investment architecture | 12 platform parents (PAI, Valiant, Qualis, Precise, CBEYONData, CTI, Axim, Intrepid, Quadel, Omniplex, GAP, CIS) + ~15 add-on children |
| 11 | Type/data change for #10 | bundled with #10 |
| 12 | Render add-on acquisitions on parent detail pages | bundled with #10 |

---

## Logo asset notes

- `public/images/portfolio/*.webp` — all 26 existing logos at 400px tall (varying widths). PAI added 5/13 at 1151×400 with custom stop-color darkening.
- All marquee logos are eager-loaded with `fetchpriority="high"` and `<link rel="preload">` hints.

## Dev infrastructure notes (do NOT surface to client)

- `bluestone-dev.service`: `ExecStartPre=scripts/clear-vite-cache.sh`, `Restart=always`
- `bluestone-dev-watchdog.service`: tails journal for "No Astro CSS at index NaN", restarts `bluestone-dev` on threshold (≥2 errors in 60s)

---

*Companion HTML report (client-facing): `bluestone-status-report-2026-05-13.html`*
