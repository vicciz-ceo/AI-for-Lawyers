#!/usr/bin/env bash
# Single authoritative entry point for sprint 2026-07-08-ai-lawyers-site.
# Exit 0 = all gates green. Exit 1 = at least one check failed.
#
# Thin orchestrator: runs each gate's check suite (Node stdlib only, no npm
# installs) and prints an aggregated final summary. Each suite is independently
# runnable too, e.g. `node tests/check-site.mjs`.
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if ! command -v node >/dev/null 2>&1; then
  echo "FATAL: node is required to run these checks but was not found on PATH." >&2
  exit 1
fi

total=0
passed=0
overall_status=0

run_suite() {
  local script="$1"
  local out
  out="$(node "$script")"
  local code=$?
  echo "$out"
  local line
  line="$(printf '%s\n' "$out" | grep '^::SUMMARY::' || true)"
  if [[ -n "$line" ]]; then
    local t p
    t="$(printf '%s\n' "$line" | sed -E 's/.*total=([0-9]+).*/\1/')"
    p="$(printf '%s\n' "$line" | sed -E 's/.*passed=([0-9]+).*/\1/')"
    total=$((total + t))
    passed=$((passed + p))
  fi
  if [[ $code -ne 0 ]]; then
    overall_status=1
  fi
}

run_suite tests/check-syllabus.mjs
run_suite tests/check-site.mjs
run_suite tests/check-deploy.mjs
run_suite tests/check-qa-regression.mjs
run_suite tests/check-copy-change.mjs

echo ""
echo "=============================================="
echo "OVERALL: $passed/$total checks passed"
echo "=============================================="

exit $overall_status
