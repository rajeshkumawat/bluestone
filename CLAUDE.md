# Bluestone — context for Claude Code sessions

> Auto-loaded context. Read before touching anything. This file reflects the
> **current** state (headless WordPress, live since 2026-06-09). The older
> `HANDOFF.md` predates the CMS and still says "Directus is planned" — ignore that
> part; the CMS is WordPress, and it's already live.

---

## What this is now

Bluestone is a **headless** site = two separate systems:

1. **This repo (`/srv/projects/bluestone`)** — the **Astro front-end**. Astro 5 ·
   TypeScript · Tailwind v4 · GSAP · Lenis. This is what renders the public site.
   Served by a dev server on `:4324` → **`bluestone2.designinx.com`**.
2. **WordPress CMS (`/srv/projects/bluestone-wp`)** — a Dockerized WordPress +
   ACF Pro that holds all the content. Admin at **`bluestone-wp.designinx.com/wp-admin`**.
   The Astro site reads content from it via WPGraphQL.

**Data flow:** editors change content in WordPress → this Astro site fetches it via
GraphQL at build/request time → visitors see it. The site runs with the env var
`CONTENT_SOURCE=wp`.

---

## ⚠️ Access reality (read this before trying things)

Worker accounts (`raj`, `silvia`) running a session here can do **some** things but
not others. Don't burn time on actions that will fail:

| You CAN (have write/access) | You CANNOT |
|---|---|
| Edit Astro front-end code in `src/` (components, layouts, styles) | Edit the WordPress side (`/srv/projects/bluestone-wp` is read-only to you) |
| Edit the WP data layer here: `src/data/index.ts`, `src/data/wp/*` | Run Docker or `wp-cli` (no docker-group / no sudo) |
| Run `npx tsx scripts/*.ts` (export, parity checks) | Restart the `:4324` dev server (it runs as `claude`) |
| Run `npx astro build` to verify | Import content / change WP blocks, post types, or fields |

**Content edits (text, images, investments, news, team) are NOT done in code** —
they're done in the WordPress admin UI. If the request is "change the wording on
the About page" or "add a news article," that's a WordPress task, not a code task.
Full editor guide: `/srv/projects/bluestone-wp/WORDPRESS-HANDOFF.md` (also at
`browse.designinx.com/projects/bluestone-wp/WORDPRESS-HANDOFF.md`).

If you genuinely need a WordPress/infra change (new block type, schema change,
re-import), that requires an admin (claude/span/ziad) — flag it, don't attempt it.

---

## How content reaches the components

The content-access layer is the single seam. **Components never change based on
the source** — they call these getters:

- `src/data/index.ts` — `getPage`, `getInvestments`, `getParentInvestments`,
  `getInvestmentBySlug`, `getArticles`, `getArticleBySlug`, `getTeamMembers`,
  `getTeamMemberBySlug`, `getSiteSettings`.
- It switches on `import.meta.env.CONTENT_SOURCE`:
  - `wp` → fetch from WordPress (the live setting).
  - `local` (default) → the original typed TS files in `src/data/local/` (kept as a
    fallback / for offline parity diffing).
- WP integration lives in **`src/data/wp/`**:
  - `client.ts` — GraphQL fetch (endpoint `bluestone-wp.designinx.com/graphql`).
  - `queries.ts` — the GraphQL documents.
  - `map.ts` — maps WPGraphQL responses back into the exact domain shapes in
    `src/data/types/` (so components are untouched).
- In `astro dev` the data is fetched fresh each load (WP edits show on reload); in
  `astro build` each collection is fetched once and cached.

Block model: a Page is `blocks: Block[]` (discriminated union in
`src/data/types/blocks.ts`), rendered by `src/components/blocks/BlockRenderer.astro`.
Detail pages for investments/news build their block array inline and resolve
entities via the getters.

---

## Mapper gotchas (if you edit `src/data/wp/`)

- ACF **select** fields come back as `[String]` arrays → take `[0]` (`sel()` helper).
- **Image/file** fields are connection edges → query `{ node { mediaItemUrl } }`
  (use `mediaItemUrl` — works for video too; `sourceUrl` is null for non-images).
- ACF **relationship** connections default to 10 items → always pass `(first: 100)`.
- Flexible-content layout GraphQL types are named `PageBuilderBlocks<Name>Layout`.
- `intro` is aliased to `legalIntro` in the legal-page fragment (name collision).
- **Investments are parent/child:** children have a `parentSlug`; the grid order is
  driven by `menu_order` (query orders `MENU_ORDER ASC`). Don't break either —
  children must resolve to a real parent or their list-card click does nothing.

After changing the data layer, verify with:
```bash
npx tsx scripts/wp-parity.ts     # WP vs local structural parity (should be ✅)
npx astro build                  # full build from WP (should produce ~64 pages)
```
(Note: the running dev server is claude's; your file edits are picked up by its
Vite HMR automatically — you don't need to restart it.)

---

## Key files

```
src/data/index.ts          ← content getters + CONTENT_SOURCE switch
src/data/wp/               ← WPGraphQL client, queries, mapper
src/data/types/            ← domain types (blocks.ts, entities.ts) — the contract
src/data/local/            ← original TS content (fallback source)
src/components/blocks/     ← the 18 block components + BlockRenderer
scripts/wp-parity.ts       ← parity check (WP vs local)
scripts/wp-export.ts       ← dumps local TS content to JSON (for re-imports, admin-run)
```

WordPress side (read-only reference; admin-managed):
`/srv/projects/bluestone-wp/` — `docker-compose.yml`, `plugins/bluestone-schema/`
(CPTs + ACF blocks defined in PHP), `import/` (import scripts).
