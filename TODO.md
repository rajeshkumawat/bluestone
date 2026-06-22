# Bluestone v3 — Outstanding Tasks

A running list of work that needs to happen on this site. Each item
includes context, specs, and where to drop the deliverable so it's
self-contained for whoever picks it up.

---

## 🎨 Assets needed

### 1. Provide all 9 portfolio logos as SVG (PNG fallback OK)

**Status:** Currently mixed — 5 logos are PNGs pulled from the Figma v3
file, and 4 are temporary text-only SVG placeholders I generated.
For consistency and crispness at any zoom level, please re-source ALL
9 logos as proper SVG vector files (or transparent PNG if SVG isn't
available from the brand).

**What to provide — all 9 portfolio company logos:**

| # | Company | Current state |
| --- | --- | --- |
| 1 | Axim | PNG (replace with SVG) |
| 2 | CBeyondData | PNG (replace with SVG) |
| 3 | CTI | PNG (replace with SVG) |
| 4 | Precise Systems | PNG (replace with SVG) |
| 5 | Abile Group | PNG (replace with SVG) |
| 6 | Qualis Corporation | placeholder text SVG (replace with real logo) |
| 7 | Intrack Radar Technologies | placeholder text SVG (replace with real logo) |
| 8 | Tektonux | placeholder text SVG (replace with real logo) |
| 9 | Valiant Solutions | placeholder text SVG (replace with real logo) |

**File spec:**

- **Format:** SVG (preferred) — scales infinitely, smallest file, no
  pixelation at any zoom. PNG with transparent background is an
  acceptable fallback if no SVG is available from the brand owner.
- **Size:** if PNG, ~600–1000px wide, full color, minimal padding around
  the mark
- **Background:** **must be transparent** — the carousel sits on a light
  bg and adds a white card on hover, so any baked-in white bg will look
  wrong on the hover state
- **Color:** original brand colors (the site auto-applies a desaturated
  filter at rest and restores full color on hover)

**Where to drop the files:**

```
~/claude_projects/bluestone-v3/public/images/portfolio/
```

**Filenames (must match exactly — preserve the slug, swap the extension as needed):**

- `axim.svg` (or `.png`)
- `cbeyondata.svg` (or `.png`)
- `cti.svg` (or `.png`)
- `precise-systems.svg` (or `.png`)
- `abile.svg` (or `.png`)
- `qualis.svg` (or `.png`)
- `intrack.svg` (or `.png`)
- `tektonux.svg` (or `.png`)
- `valiant.svg` (or `.png`)

If a logo's extension changes (e.g. `axim.png` → `axim.svg`), the
single-line `logo` path also needs updating in
`src/data/local/investments.ts`. Easy one-line change per logo.

---

### 2. About page — dedicated hero video (optional)

**Status:** The About page hero currently reuses the Home page's video
(`/videos/bluestone-investment-partners-hero.mp4`). This works but a
dedicated About hero clip — e.g. a Washington DC / Capitol skyline
loop matching the Figma design — would feel more intentional.

**File spec:**

- **Format:** MP4 (H.264) — universal browser support
  - Optional companion: WebM (VP9) at the same path with `.webm`
    extension for ~30 % smaller payload on Chrome / Firefox
- **Resolution:** 1920×1080
- **Duration:** 8–12 seconds, must loop cleanly (no visible cut)
- **Audio:** none — strip the audio track entirely (autoplay requires
  muted; removing the track shaves file size)
- **Size target:** 2–6 MB

**Where to drop the file:**

```
~/claude_projects/bluestone-v3/public/videos/
```

**Filename:**

- `bluestone-about-hero.mp4` (and optionally `.webm`)

**One-line change after dropping the file** in
`src/data/local/pages/about.ts` (the hero block):

```ts
bgVideoMp4: "/videos/bluestone-about-hero.mp4",
// bgVideoWebm: "/videos/bluestone-about-hero.webm",
```

If you'd rather keep using the Home video on About, no action — leave
it as-is and delete this task.

---

### 3. About page — replace stock photos with real images

**Status:** Several images on the About page are placeholders pulled
from the Figma file (likely Adobe Stock). Need to be swapped for
licensed or owned imagery before launch.

**Images to replace:**

| Section | Image | Current | Notes |
| --- | --- | --- | --- |
| Empowering Management Teams (card 1) | `approach-strategic.jpg` | submarine stock photo | "Strategic Add on Acquisitions" — pick imagery that conveys strategic / acquisition theme |
| Empowering Management Teams (card 2) | `approach-growth.jpg` | fighter jet stock photo | "Accelerated Growth" — pick imagery conveying speed / forward motion |
| Empowering Management Teams (card 3) | `approach-value.jpg` | satellite stock photo | "Value Creation" — pick imagery conveying technology / value-add |
| Quote / Testimonial carousel (×4) | `ben-dower.jpg` | one real headshot used 4× as placeholder | Need a unique real headshot for **each** of the 4 testimonial authors |

**File spec:**

- **Format:** JPG (preferred for photos) or WebP
- **Card images:** 1200–1600px wide, landscape orientation, looks good
  with a navy gradient overlay applied at the bottom
- **Headshots:** 600–800px square, neutral or light background, head + shoulders framing
- **Licensing:** must be licensed (Adobe Stock, Shutterstock, etc.) or
  owned imagery — current files are unlicensed previews

**Where to drop the files:**

```
~/claude_projects/bluestone-v3/public/images/about/
```

**Filenames (preserve to avoid code changes):**

- `approach-strategic.jpg`
- `approach-growth.jpg`
- `approach-value.jpg`
- For testimonial headshots, name them by slug — e.g.
  `headshot-ben-dower.jpg`, `headshot-sarah-mitchell.jpg`, etc.
  Then update the `authorPhoto` paths (one line per author) in
  `src/data/local/pages/about.ts`.

---

### 4. Contact form — wire a real backend

**Status:** The Contact form (`/contact`) submits via a `mailto:` link
fallback today — clicking Submit opens the user's mail client with the
form contents pre-filled. This works but isn't ideal because:

- It depends on the visitor having a mail client configured
- Submissions don't land in any system the team can track
- No spam protection / rate limiting

**Pick one of these to wire up real submissions:**

| Option | Cost | Setup time | Notes |
| --- | --- | --- | --- |
| **Resend + Astro API route** | Free tier (3k/mo) | 30 min | Cleanest if we move to Vercel/Netlify hosting. Sends email via Resend on submit. |
| **Formspree** | Free tier (50/mo) | 10 min | No backend needed, just point form `action` at a Formspree endpoint. |
| **Netlify Forms** | Free (100/mo) | 5 min | Only works if hosted on Netlify. Built-in spam filter. |
| **Custom backend** | — | varies | Wire to existing CRM or marketing automation. |

**Where the swap happens** in the code: the `submit` event handler in
`src/components/blocks/ContactBlock.astro` (search for "Backend not yet
wired"). Replace the `mailto:` block with a `fetch()` POST to whichever
endpoint you choose.

**Recipient address:** currently `info@bluestoneinv.com` — set in
`src/data/local/pages/contact.ts`.

**Add spam protection** when wiring real submissions — Cloudflare Turnstile
or a honeypot field. Defense/PE industry websites attract a lot of bot
traffic.

---

### 5. Team page — bios + 4 missing headshots

**Status:** Only Joe Collins has a real bio (the example Rob shared
from Figma). The other 16 partners have a 1-line placeholder bio. Also,
4 partners (Gray Beck, Jay Moorman, George Wilson, Tom Weston) have no
headshot — they show a graceful placeholder icon on the grid card.

**What to provide for each partner:**

- **Bio paragraphs** (typically 2–4 paragraphs, professional tone)
- **Modal title** (the longer-form title shown in the bio popup, e.g.
  "Managing Partner & Chief Executive Officer" vs. card title
  "Managing Partner")
- **LinkedIn URL** (optional — shown as a small icon in the modal)

**Missing headshots needed:**

- Gray Beck — Operating Partner
- Jay Moorman — Operating Partner
- George Wilson — Operating Partner
- Tom Weston — Operating Partner

**Headshot spec:**

- ~600–800 px wide, square or 4:5 portrait crop
- Light or neutral background
- Head + shoulders framing
- JPG or WebP

**Where to drop the files:**

```
~/claude_projects/bluestone-v3/public/images/team/
```

**Filenames (must match exactly):**

- `gray-beck.jpg`
- `jay-moorman.jpg`
- `george-wilson.jpg`
- `tom-weston.jpg`

**Where bios + LinkedIn URLs are edited:**
`src/data/local/team.ts` — each member's `bio:` is a string array (one
element per paragraph). Optional fields: `fullName`, `modalTitle`,
`linkedin`.

---

## 📝 How to use this file

- Add a new task by appending a section under the relevant heading
- When a task is complete, move it under a `## ✅ Completed` heading
  at the bottom (or just delete it)
- Keep specs concrete — file paths, exact filenames, formats — so the
  task can be done without coming back to ask questions
