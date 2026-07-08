---
id: "2026-07-08-ai-lawyers-site"
status: planned
current_role: developer
branch: sprint/2026-07-08-ai-lawyers-site
locked_by: null
locked_at: null
last_agent: "claude-code:planner"
last_updated: 2026-07-08T09:46:35Z
evaluator: custom
evaluator_command: "bash tests/run_checks.sh"
total_items: 3
completed_items: 0
dev_complete_items: 0
qa_cycles: 0
prd_sections:
  - sources/AI-for-Lawyers-Workshop-Curriculum.md
design_sections:
  - sources/AI-for-Lawyers-Landing.dc.html
---

## Next Steps

### Item 3 — Pages deployment config
Add `CNAME` (root) with content exactly `lawyers.nerya.io`, and an empty
`.nojekyll` (root). **Acceptance:** both files exist; `CNAME` content is
exactly `lawyers.nerya.io` (no extra text, trailing newline OK);
`.nojekyll` is 0 bytes. **Files:** `CNAME`, `.nojekyll`. Verify:
`bash tests/run_checks.sh` §3 (checks 100–103). Note: actually enabling
GitHub Pages and verifying the live URL is the manager's ops step +
QA's check, not part of this item.

Single Developer does all 3 items sequentially in this branch (small
sprint, no parallel/worktree mode). Items 2 and 3 touch files disjoint
from item 1, but there's no benefit to parallelizing a sprint this size.

## Dev Complete

### Item 1 — Syllabus set (Hebrew)
Files: `syllabus/README.md`, `syllabus/90-min-baby-steps.md`,
`syllabus/half-day.md`, `syllabus/full-day.md`,
`syllabus/multi-week-cohort.md`, `syllabus/segment-transactional.md`,
`syllabus/segment-litigation.md`, `syllabus/segment-in-house.md`.
Commit: `984394d`. Result: `bash tests/run_checks.sh` Gate 1 (checks 1–67)
= 67/67 passed.

### Item 2 — Static landing page (index.html)
Files: `index.html`. Commit: `51b8eb5`. Result: `bash tests/run_checks.sh`
Gate 2 (checks 68–99) = 32/32 passed.

## Completed

(none yet)

## Evaluation Notes

(none yet)

## QA Notes

(none yet)

## Context Dump

**Curriculum source of truth:** `sources/AI-for-Lawyers-Workshop-Curriculum.md`.
54 modules across tracks A–J (A1–A3, B1–B8, C1–C4, D1–D6, E1–E5, F1–F5,
G1–G7, H1–H4, I1–I8, J1–J4) — verified by parsing `**{code}.` headers; see
`tests/checks.mjs` check #1 for the live derivation (never hand-maintain
this list — the script re-parses the source every run). Section 3 defines
the format→track mapping and the by-segment weighting used above and in
the tests.

**Where the landing-page module data lives:** `sources/AI-for-Lawyers-Landing.dc.html`
has all 54 modules (Hebrew title + blurb per code) already written out as a
plain JS array inside the `<script type="text/x-dc" data-dc-script ...>`
block (search for `class Component extends DCLogic` → `curriculum = [ ... ]`,
lines ~236–311). Each track entry has `{ letter, he, en, short, modules: [{code, title, blurb}, ...] }`.
This is the actual content to lift into static cards — do not rewrite the
Hebrew copy, just de-templatize the rendering. The rest of the page
(hero, "who it's for", safety section, pricing section, CTA, footer) is
already static-ish HTML with inline styles; only the curriculum-cards
section (`<section id="curriculum">`) and the filter buttons use
`<sc-for>`/`<sc-if>`. Prices come from `renderVals()`'s `prices` object —
already resolved to the literal strings this sprint requires
(`showPrices` defaults true, so use the non-`q` branch values).

**Accent color decision:** use `#6D28D9` (this is the `.dc` file's own
declared `default` for `accentColor` in the `data-props` JSON on the
`<script type="text/x-dc">` tag — not the inline CSS fallback `#3A31E0`
scattered through `var(--accent,#3A31E0)`). Simplest correct fix: set
`--accent:#6D28D9` on the root `<div dir="rtl" ...>` (replacing the
`{{ accent }}` token) and leave every `var(--accent, #3A31E0)` usage as-is
— the CSS custom property will resolve to `#6D28D9` and the inline
fallback becomes dead code, which is fine.

**Contact email:** replace the Cloudflare-obfuscated footer span
(`<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="...">[email protected]</a>`)
with plain text `nerya@nerya.io`. Also remove the
`<script data-cfasync="false" src="/cdn-cgi/scripts/.../email-decode.min.js">`
tag entirely — it's dead weight once the address is plain text, and its
`/cdn-cgi/` path is itself a forbidden artifact per the checks.

**data-track / data-filter contract the tests expect:** every rendered
module card must carry `data-track="{trackLetter}"` (e.g. `data-track="B"`
for all 8 B-modules, not per-code). Every filter button must carry
`data-filter="{trackLetter}"` for A–J, plus one button with
`data-filter="all"`. The tests do not dictate *how* filtering is wired
(inline `onclick`, `addEventListener`, event delegation, etc.) — only that
these data attributes exist so JS can query against them. The `.dc` source's
own `renderVals()` gives the exact filter semantics to replicate (show a
module's card only if `activeTrack == null || activeTrack === card.letter`).

**Head/`<script src="./support.js">` and other template plumbing to drop:**
the `<head>` script tag, the `<x-dc>` / `</x-dc>` wrapper (unwrap its
contents into `<body>`), every `<sc-for>`/`<sc-if>` block (replace with
literal repeated markup for the 54 cards and 11 filter buttons), and the
entire `<script type="text/x-dc" ...>...</script>` block at the bottom
(its data has already been lifted into static markup, so it must not
remain in the shipped file — its mere presence is a forbidden artifact).

**How to run the checks:** `bash tests/run_checks.sh` from repo root
(needs `node` on PATH; confirmed present, v24.13.0). It's a thin wrapper
around `tests/checks.mjs` (Node stdlib only, no npm installs). Output is
numbered `[PASS]`/`[FAIL]` lines grouped by gate (§0 meta, §1 syllabus,
§2 landing page, §3 deploy config) plus a final `SUMMARY: X/Y passed`
line; exit code 0 iff all pass. Current state (before Item 1–3 land):
102/103 failing, only check #1 (the meta curriculum-parse sanity check)
passes since it only reads the pre-existing curriculum source. This was
verified genuinely RED (ENOENT-driven failures, not script bugs) and,
separately, verified achievable-GREEN against hand-built fixtures with
correct structure (103/103 passed) — so the checks are not impossible to
satisfy.

**Interactive behavior — QA's job, not covered by these checks:** the
checks only verify markup/attribute structure (card counts, data-*
attributes present, forbidden strings absent). They do NOT click filter
buttons or assert that clicking `data-filter="B"` actually hides non-B
cards in a real browser — QA must verify that manually/via browser
automation.

**Stale-pin sweep:** N/A — brand-new repo (this is the first commit-bearing
branch besides the scaffold commit), no renames or moved files to chase.

**No git stash used at any point in this sprint's Planner phase.**
