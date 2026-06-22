#!/usr/bin/env bash
# Watchdog for bluestone-dev: the Astro+Vite dev server hits an HMR cache
# corruption bug ("No Astro CSS at index NaN") that 500s every request
# until restart. The dev process itself doesn't exit, so systemd's
# Restart=on-failure can't catch it. This script tails the journal and
# triggers a clean restart when the error fires repeatedly.
#
# It debounces — a single transient error is ignored, but >=2 in any
# 60s window triggers a restart. After restarting it sleeps 30s so the
# fresh process can start serving before we begin watching again.
set -euo pipefail

SERVICE="bluestone-dev.service"
PATTERN='No Astro CSS at index NaN'
THRESHOLD=2          # number of errors to tolerate before restarting
WINDOW=60            # seconds to count errors over
COOLDOWN=30          # seconds to sleep after a restart

declare -a times=()

journalctl -u "$SERVICE" -f -n 0 --no-pager -o cat |
  while IFS= read -r line; do
    if [[ "$line" == *"$PATTERN"* ]]; then
      now=$(date +%s)
      times+=("$now")
      # Drop entries older than $WINDOW seconds
      cutoff=$((now - WINDOW))
      pruned=()
      for t in "${times[@]}"; do
        if (( t >= cutoff )); then pruned+=("$t"); fi
      done
      times=("${pruned[@]}")
      if (( ${#times[@]} >= THRESHOLD )); then
        echo "[watchdog] detected ${#times[@]} errors in ${WINDOW}s — restarting $SERVICE"
        sudo -n systemctl restart "$SERVICE" || systemctl --user restart "$SERVICE" || true
        times=()
        sleep "$COOLDOWN"
      fi
    fi
  done
