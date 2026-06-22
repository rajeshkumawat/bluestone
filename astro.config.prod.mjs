// Production build config for the LIVE client domain (bluestoneinv.com).
// Reuses the dev config but overrides the canonical site URL so sitemap/OG/
// canonical tags point at the client's real domain instead of the staging
// subdomain. The dev `server`/`hmr` settings in the base are ignored by
// `astro build`, so they're harmless here.
import base from './astro.config.mjs';
import { defineConfig } from 'astro/config';

export default defineConfig({
  ...base,
  site: 'https://bluestoneinv.com',
});
