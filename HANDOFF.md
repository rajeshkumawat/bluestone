# Bluestone v3 — Project Handoff

This document is a self-contained briefing for an AI agent (or human dev) picking up this project from where the previous Claude Code session left off. Read this top-to-bottom before touching code.

---

## 1. What this project is

A multi-page marketing website for **Bluestone Investment Partners** — a defense / government-services private equity firm. Built from Figma designs as a static Astro site, with a block-based architecture so content can later be served by a CMS (Directus is the planned target) without changing components.

- **Live (local):** `http://localhost:4321/`
- **Build target:** static (Astro `output: 'static'`) — deployable to any static host (Netlify / Vercel / Cloudflare Pages / S3+CloudFront)
- **Stack:** Astro 5 · TypeScript (strict) · Tailwind v4 · GSAP 3 + ScrollTrigger · Lenis (smooth scroll)
- **Future CMS:** Directus (SDK already in `package.json`); content-access layer (`src/data/index.ts`) is designed so swapping local TS files for Directus calls touches one file.

---

## 2. Source design (Figma)

All page designs live in this Figma file:

```
https://www.figma.com/design/maSSJCDTrG2miNStbiOAO1/
```

Frame node IDs that map to pages we built:

| Page | Figma node-id |
| --- | --- |
| Home | `8243:3107` |
| About | (in same v3 tab) |
| Team | (in same v3 tab; modal popup design included) |
| News list | (in same v3 tab) |
| Article detail | (in same v3 tab) |
| Contact | `8243:4339` |
| Investments list | `8243:3534` |
| Investment detail | `8243:4420` |
| 404 | `8243:4068` |
| Cookies / legal | `8243:4188` |

To pull design context, use the Figma MCP server's `get_design_context` with the relevant node-id and fileKey `maSSJCDTrG2miNStbiOAO1`.

---

## 3. What's done

All 7 v3 page templates plus 3 legal pages are live and rendering 200 OK locally:

| Route | Status |
| --- | --- |
| `/` (Home) | ✅ |
| `/about` | ✅ |
| `/team` | ✅ |
| `/news` (list) | ✅ |
| `/news/[slug]` (article detail) | ✅ |
| `/contact` | ✅ |
| `/investments` (list) | ✅ |
| `/investments/[slug]` (portfolio detail) | ✅ |
| `/privacy-policy` | ✅ |
| `/terms-of-use` | ✅ |
| `/cookie-policy` | ✅ |
| `/404` | ✅ |

Shared components built:

- **Header** (`src/components/global/Header.astro`) — transparent over hero, flips to white-sticky on scroll. Mobile drawer with morphing hamburger ↔ X. The hamburger toggle is rendered as a SIBLING of `<header>` (not a child) with `position: fixed; z-index: 60` so it floats above the drawer panel (z-50). Drawer fades in (no slide), nav items cascade top-to-bottom on open.
- **Footer** (`src/components/global/Footer.astro`) — logo + address + nav + social + copyright.
- **BlockRenderer** (`src/components/blocks/BlockRenderer.astro`) — switches over a `Block` discriminated union and renders the matching block component. Adding a new block type = add a case here + a new component file.

Block components built (`src/components/blocks/*.astro`):

```
ApproachCardsBlock      ArticleBlock           CenteredIntroBlock
ContactBlock            HeroBlock              IntroStatsBlock
InvestmentCriteriaBlock InvestmentDetailBlock  InvestmentsListBlock
LegalPageBlock          NewsBlock              NewsListBlock
PageHeaderBlock         PartnersForGrowthBlock PortfolioMarqueeBlock
QuoteBlock              SectorFocusBlock       TeamGridBlock
```

Animation helpers (`src/lib/animations.ts`):

- `initSmoothScroll()` — Lenis + ScrollTrigger handoff
- `setupReveal()` / `setupRevealStagger()` — single-element reveal-on-scroll
- `setupBatchReveal()` — used site-wide for grid items (team cards, news cards, approach cards, criteria rows) so they fade in as the user scrolls into them
- `setupParallax()` / `setupCountUp()` — for hero parallax and stat counters

---

## 4. Architecture — read this before changing anything

### Block-based content model

A page is just `{ blocks: Block[] }`. To reorder a page, reorder the array. To swap a section, change a block's `type`.

```
src/data/types/blocks.ts          ← discriminated union of every block shape
src/data/types/entities.ts        ← Investment, Article, TeamMember, SiteSettings
src/data/local/pages/*.ts         ← one file per page, exports a Page
src/data/local/{investments,articles,team,site}.ts ← entity collections
src/data/index.ts                 ← content access layer (getPage, getInvestments, …)
```

This shape maps 1:1 onto a Directus "Page Builder" / many-to-any field. When we move to Directus, only `src/data/index.ts` changes — every component keeps importing the same types from `@content`.

### Path aliases

Defined in **both** `tsconfig.json` (for the type checker) and `astro.config.mjs` (for the Vite bundler — TS paths don't reach Vite, hence the duplication):

- `@components` → `src/components`
- `@blocks` → `src/components/blocks`
- `@layouts` → `src/layouts`
- `@content` → `src/data/index.ts`
- `@lib` → `src/lib`
- `@styles` → `src/styles`

### Why `src/data/`, not `src/content/`

Astro 5 reserves `src/content/` for content collections and auto-detects them, which fought our shape. We renamed to `src/data/`. **Don't move it back.**

### Styles

- `src/styles/tokens.css` — Figma design tokens as CSS vars (`--color-primary: #203864`, `--color-bg: #f8f9fd`, `--color-tertiary`, etc.)
- `src/styles/global.css` — imports tokens, Tailwind, Google Fonts (Manrope, IBM Plex Sans), typography utilities. **The Google Fonts `@import url(…)` MUST be the first line of the file** — CSS spec requires `@import` rules before any other rules.

---

## 5. How to run

```bash
cd ~/claude_projects/bluestone-v3
npm install        # one-time
npm run dev        # http://localhost:4321
npm run build      # static build → ./dist
npm run preview    # serve ./dist
```

---

## 6. What's still outstanding

See `TODO.md` in the project root for the full punch list with file specs and exact paths. Summary:

1. **Portfolio logos** — 9 logos needed as SVG (4 are placeholder text, 5 are PNG that should also be SVG). Drop in `public/images/portfolio/` with exact filenames listed in TODO.
2. **About hero video** (optional) — DC / Capitol skyline loop. Currently reuses Home video.
3. **About stock photos** — 3 approach card images + 4 unique testimonial headshots (currently 1 headshot reused 4×).
4. **Contact form backend** — currently `mailto:` fallback. Pick Resend / Formspree / Netlify Forms. Swap point: the `submit` handler in `src/components/blocks/ContactBlock.astro`.
5. **Team bios + 4 missing headshots** — only Joe Collins has a real bio; 16 others have placeholders. Missing headshots: Gray Beck, Jay Moorman, George Wilson, Tom Weston.

Beyond TODO.md:

- **Wire Directus** when CMS is ready. Replace the function bodies in `src/data/index.ts` with Directus SDK calls. Component imports don't change.
- **Deploy preview** — pick a host and deploy. No host has been chosen yet.
- **Git** — repo has not been initialized. First commit + GitHub repo creation are pending.

---

## 7. Important conventions / gotchas the next agent needs to know

These are the non-obvious things that bit us during the build. **Respect these or you'll regress something.**

1. **Hamburger button is OUTSIDE the `<header>` element.** It's a sibling with `position: fixed; z-50/60`. The header's scroll handler queries it via `document.querySelector("[data-mobile-toggle]")`. Don't move it back inside the header — the drawer panel will bury it.

2. **Drawer chrome uses inline styles, not Tailwind arbitrary values.** Tailwind `bg-[var(--color-primary)]` and `translate-x-full` were unreliable for the drawer panel due to scoping. The panel uses inline-style-driven open/close + JS direct style manipulation. Don't "clean it up" to Tailwind classes.

3. **Marquee section uses `overflow-x-clip`, not `overflow-hidden`.** Hover-lift on portfolio cards adds 4px of vertical translate; `overflow-hidden` clipped that. The masked marquee div also has `py-3` to keep cards inside the mask-image clipping region.

4. **`InvestmentCriteriaBlock` pre-classifies row content in the script section.** The TypeScript generic `Array<{ key: string; value: string }>` confused the JSX parser when used inline. Pre-classifying as `"string" | "bullets" | "keyvalues"` avoids the generic in JSX.

5. **`ContactBlock.astro` line 21 uses `bg-white`.** This was a deliberate user override of `bg-[var(--color-tertiary)]`. Don't revert.

6. **Vite alias and tsconfig path must be kept in sync.** TS paths don't reach Vite. If you add a new alias in `tsconfig.json`, also add it to `astro.config.mjs`'s `vite.resolve.alias`.

7. **Site-wide scroll reveal uses `setupBatchReveal` per-item.** Not container-triggered. It's wired into TeamGridBlock, NewsBlock, ApproachCardsBlock, and InvestmentCriteriaBlock. Use the same helper for any new grid block.

8. **Project root must stay at `~/claude_projects/bluestone-v3/`.** Per Rob's global preference (`~/.claude/CLAUDE.md`), all Claude-related project folders live in `~/claude_projects/`.

---

## 8. File map (quick reference)

```
bluestone-v3/
├── HANDOFF.md                    ← THIS FILE
├── TODO.md                       ← outstanding tasks (specs + filenames)
├── astro.config.mjs              ← static output + Vite aliases
├── tsconfig.json                 ← strict TS + path aliases
├── package.json                  ← Astro 5 / Tailwind v4 / GSAP / Lenis / Directus SDK
├── public/
│   ├── images/                   ← hero bg, portfolio logos, about cards, team headshots
│   └── videos/                   ← bluestone-investment-partners-hero.mp4
└── src/
    ├── pages/                    ← Astro file-based routes
    │   ├── index.astro           ← Home
    │   ├── about.astro
    │   ├── team.astro
    │   ├── contact.astro
    │   ├── 404.astro
    │   ├── privacy-policy.astro / terms-of-use.astro / cookie-policy.astro
    │   ├── news/
    │   │   ├── index.astro       ← list
    │   │   └── [slug].astro      ← article detail
    │   └── investments/
    │       ├── index.astro       ← list
    │       └── [slug].astro      ← portfolio detail
    ├── layouts/
    │   └── BaseLayout.astro      ← Header + slot + Footer
    ├── components/
    │   ├── global/
    │   │   ├── Header.astro
    │   │   └── Footer.astro
    │   └── blocks/
    │       ├── BlockRenderer.astro
    │       └── (one .astro per block type — see §3)
    ├── data/
    │   ├── index.ts              ← content access layer (getPage, getInvestments, …)
    │   ├── types/
    │   │   ├── blocks.ts         ← Block discriminated union
    │   │   └── entities.ts       ← Investment, Article, TeamMember, SiteSettings
    │   └── local/
    │       ├── pages/*.ts        ← one file per page
    │       ├── investments.ts
    │       ├── articles.ts
    │       ├── team.ts
    │       └── site.ts
    ├── lib/
    │   └── animations.ts         ← Lenis + GSAP helpers
    └── styles/
        ├── tokens.css            ← Figma design tokens as CSS vars
        └── global.css            ← Tailwind import + fonts + utilities
```

---

## 9. Suggested next moves for the picking-up agent

In rough priority order:

1. **Run `npm install` then `npm run dev`** and click through every route in §3 to confirm the handoff is intact.
2. **Knock out TODO.md item 4 (Contact form backend)** — it's the smallest-LOC, highest-impact unblock for going live.
3. **Get logos as proper SVGs** (TODO item 1) — biggest visual quality win on the homepage.
4. **First git commit + push to GitHub** — there is currently no git history.
5. **Pick a host and deploy a preview URL** — Netlify is the fastest given the static output.
6. **Wire Directus** once 1–5 are done and the team wants to start editing content without code deploys.

Don't start the Directus migration before the static site is deployed and the team has signed off on the design — it adds infrastructure and the type contracts are already there, so the migration is genuinely deferrable.
