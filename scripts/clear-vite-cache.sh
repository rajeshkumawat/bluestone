#!/usr/bin/env bash
# Clear Astro + Vite caches so the dev server starts with a clean slate.
# This is run as ExecStartPre for bluestone-dev.service to mitigate the
# "No Astro CSS at index NaN" HMR cache-corruption bug.
set -e
cd "$(dirname "$0")/.."
rm -rf node_modules/.vite .astro/data-store.json 2>/dev/null || true
exit 0
