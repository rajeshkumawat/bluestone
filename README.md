---
workspace: bluestone
type: client
archetype: client-delivery
status: live
owner: claude:proj-bluestone
access: llysik, raj, silvia, ziad, span, mike
credential_model: none
connections: []
web: bluestone2.designinx.com
updated: 2026-06-15
---

# bluestone: Bluestone headless site (Astro front-end)

## What this is
The Astro front-end of a headless site. Astro 5 + TypeScript + Tailwind v4 + GSAP + Lenis. It renders the public site and reads content from the WordPress CMS in `bluestone-wp` via WPGraphQL.

## Why it exists
A headless build splits rendering (this repo) from content (bluestone-wp). This repo is the part visitors see.

## How to use it
```bash
npm install
npm run dev    # dev server on :4324 -> bluestone2.designinx.com
npm run build  # static output in dist/
```
Set the WordPress GraphQL endpoint via the documented env var.

## What's inside
- `src/`, `public/`, `dist/`, `scripts/` (Astro project)

## Connections
No external API tooling. Content comes from `bluestone-wp` over WPGraphQL.

## Conventions & guardrails
- Content is edited in WordPress, not here. This repo is presentation only.

## Access & ownership
Group `proj-bluestone`: llysik, raj, silvia, ziad, span, mike. Access is granted by Rob.

## Status & next step
Live (headless since 2026-06-09). Front-end and CMS are both up; QA ongoing.

---
*Human + agent orientation for this workspace. `CLAUDE.md` is the operational contract Claude auto-loads. Maintained per the documentation contract.*
