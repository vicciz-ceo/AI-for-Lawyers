---
id: "2026-07-08-ai-lawyers-site"
status: review
current_role: planner
branch: sprint/2026-07-08-ai-lawyers-site
locked_by: null
locked_at: null
last_agent: "claude-code:qa"
last_updated: 2026-07-08T10:24:00Z
evaluator: custom
evaluator_command: "bash tests/run_checks.sh"
total_items: 3
completed_items: 3
dev_complete_items: 0
qa_cycles: 1
prd_sections:
  - sources/AI-for-Lawyers-Workshop-Curriculum.md
design_sections:
  - sources/AI-for-Lawyers-Landing.dc.html
---

## Next Steps

(none — all 3 items QA-passed, sprint in review)

## Dev Complete

(none — all 3 items promoted to Completed by QA)

## Completed

### Item 1 — Syllabus set (Hebrew)
Files: `syllabus/README.md`, `syllabus/90-min-baby-steps.md`,
`syllabus/half-day.md`, `syllabus/full-day.md`,
`syllabus/multi-week-cohort.md`, `syllabus/segment-transactional.md`,
`syllabus/segment-litigation.md`, `syllabus/segment-in-house.md`.
Commit: `984394d`. Result: `bash tests/run_checks.sh` Gate 1 (checks 1–67)
= 67/67 passed. **QA VERIFIED (2026-07-08):** all 8 files present on disk;
commit `984394d` confirmed in `git log`. Spot-checked `syllabus/half-day.md`
and `syllabus/segment-litigation.md` in full — coherent professional Hebrew
prose (not machine-gibberish), module codes cited match curriculum §3
mapping (half-day cites A1-A3/B1-B5/D1-D3/I1,I3,I4,I6 = tracks A/B/D/I as
required; segment-litigation cites B5/B8/I3 as required). Citation-
verification protocol in both is 3 numbered steps matching curriculum §I3
verbatim semantics: (1) every AI citation "לא מאומת" (unverified) by
default, (2) pull and read the real source in נבו/תקדין (Nevo/Takdin) — a
chat model does not see the actual source, (3) confirm the source says
what the draft claims, before it leaves the office. Verified this pattern
holds across all 7 content docs (not just the 2 spot-checked) via new
automated regression check (Gate 4, checks 6-12).

### Item 2 — Static landing page (index.html)
Files: `index.html`. Commit: `51b8eb5`. Result: `bash tests/run_checks.sh`
Gate 2 (checks 68–99) = 32/32 passed. **QA VERIFIED (2026-07-08):** file
present on disk; commit `51b8eb5` confirmed in `git log`. Browser-verified
via mcp Claude Preview (Chromium) serving repo root on :8901 — no console
errors, no failed network requests. Confirmed: all 54 module cards visible
on load; "הכול" (all) filter button styled active by default
(`.filter-btn.active`, accent bg `rgb(109,40,217)` = #6D28D9). Clicked
`data-filter="B"` — exactly 8 cards remained visible, all with
`data-track="B"`, B button became active/accent-styled, "all" button
deactivated. Clicked `data-filter="all"` — all 54 cards restored, "all"
button re-activated. RTL confirmed (`dir="rtl"` on root div, `lang="he"`),
hero Hebrew headline present ("עשו את עבודתו של צוות שלם — בחצי מהזמן.").
No `{{` template tokens, no `__cf_email__`/`cdn-cgi` artifacts; footer
shows plain-text `nerya@nerya.io`. Resized to 375×812 (mobile) — no
horizontal overflow (`scrollWidth` == `innerWidth` == 375px, 0 overflowing
elements detected via bounding-rect scan); screenshots taken confirming
single-column layout. `<title>` and `<meta name="description">` both
present and non-empty (new Gate 4 checks 1-2).

### Item 3 — Pages deployment config
Files: `CNAME`, `.nojekyll`. Commit: `0ad4112`. Result:
`bash tests/run_checks.sh` Gate 3 (checks 100–103) = 4/4 passed. **QA
VERIFIED (2026-07-08):** both files present at repo root; commit `0ad4112`
confirmed in `git log`. `CNAME` contains exactly `lawyers.nerya.io`;
`.nojekyll` is 0 bytes.

## Evaluation Notes

All 3 items QA-verified and promoted to Completed. Full authoritative pass
(QA's independent run): `bash tests/run_checks.sh` → 115/115 checks passed
(Gate 1: 67/67, Gate 2: 32/32, Gate 3: 4/4, Gate 4 [new QA regression]:
12/12). No deviations from the brief; no escalations raised.

## QA Notes

**2026-07-08 — QA pass 1 (qa_cycles: 1).** Synced to `28f028b` per brief.
Ran `bash tests/run_checks.sh` independently (own pass, not reusing Dev's
numbers): 103/103 on the original 3 gates before adding regression tests.
Verified all 3 commit hashes (`984394d`, `51b8eb5`, `0ad4112`) exist in
`git log --oneline`. Did browser verification of `index.html` per brief
§3 using the mcp Claude Preview tool (Chromium-based) against
`python3 -m http.server 8901` — see per-item notes above for the full
checklist (a-g), all satisfied. Did syllabus spot-check per brief §4 —
read `syllabus/half-day.md` and `syllabus/segment-litigation.md` in full;
content is professional, coherent, curriculum-aligned; no nonsense or
mapping errors found.

Added Gate 4 (`tests/check-qa-regression.mjs`, wired into
`tests/run_checks.sh`) — 12 new checks: `<title>`/meta-description
presence (2), filter-script <-> `data-filter`/`data-track`/`filter-btn`
structural wiring pin (2), a page-derived (not hardcoded) check that the
mobile `@media (max-width)` block collapses every multi-column grid
element actually present on the page (1), and a semantic (not just
heading+step-count) check that all 7 syllabus content docs' citation-
verification protocols match curriculum §I3 (7). Mutation-tested checks
#3 (filter-script wiring) and the semantic-protocol check against
deliberately-broken inputs (outside the working tree / reverted before
commit) to confirm they actually fail on regressions, not just pass
vacuously. Full suite after additions: 115/115 green.

Verdict: PASS on all 3 items. Status set to `review`, `current_role:
planner`, `qa_cycles: 1`. No deviations from the brief. No escalations.

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
