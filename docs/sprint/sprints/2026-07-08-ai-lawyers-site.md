---
id: "2026-07-08-ai-lawyers-site"
status: review
current_role: planner
branch: sprint/2026-07-08-ai-lawyers-site
locked_by: null
locked_at: null
last_agent: "claude-code:qa"
last_updated: 2026-07-08T11:17:19Z
evaluator: custom
evaluator_command: "bash tests/run_checks.sh"
total_items: 5
completed_items: 5
dev_complete_items: 0
qa_cycles: 2
prd_sections:
  - sources/AI-for-Lawyers-Workshop-Curriculum.md
design_sections:
  - sources/AI-for-Lawyers-Landing.dc.html
---

## Round 2 (reopened 2026-07-08)

Director requested a small copy change after all 3 original items shipped
and passed QA. This is NOT a new feature — it's a content-only fix across
the two already-completed deliverables (`index.html`, `syllabus/**`).
Items 1-3 below (Completed) are untouched and still verified by Gates 1-3.
Items 4-5 are new; Gate 5 (`tests/check-copy-change.mjs`) pins them and is
currently RED (confirmed genuinely red — see Evaluation Notes).

## Next Steps

(none — all 5 items completed and QA-verified)

## Dev Complete

(none — Items 4-5 QA-verified and promoted to Completed below)

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

### Item 4 — Gate A: remove unfounded popularity / social-proof claims
The business has had no sales yet, so nothing may be called "popular" or
"the choice of most firms."
- **Files changed:** `index.html` (half-day pricing card — deleted the
  floating `הפופולרי` badge div entirely; reworded trailing sentence to
  `מאוזן בין עומק לזמן.`), `syllabus/half-day.md` (subtitle: dropped
  `הפורמט הפופולרי ביותר` -> `פורמט חצי יום`; target-audience opener:
  dropped the `הבחירה של רוב המשרדים:` lead-in, sentence now starts
  directly with `קבוצה שכבר מבינה...`), `syllabus/README.md` (`המסלול
  המעשי הפופולרי ביותר` -> `המסלול המעשי המלא`).
- **Commit:** `c784413`.
- **QA VERIFIED (2026-07-08, round 2, qa_cycles 2):** independent
  `grep -rn "פופולר\|הבחירה של רוב המשרדים" index.html syllabus/` →
  zero matches. Browser-verified via a throwaway `python3 -m http.server`
  + Claude Preview (Chromium): loaded `index.html`, confirmed
  `document.body.innerText` contains no `הפופולרי`; inspected the
  half-day pricing card's DOM node directly — 5 children, none with
  `position:absolute` (i.e. the badge `<div>` is fully removed, not just
  emptied of text — no leftover wrapper that could still overlap/clip);
  screenshotted the card at both desktop and 500×700 widths — clean
  card, no floating pill, no overlapping/clipped text, body reads "A · B
  · D · I עם סדנאות מעשיות. מאוזן בין עומק לזמן." Read the full diff
  hunks in `syllabus/half-day.md`, `syllabus/README.md`, and
  `index.html:674`'s paragraph — reworded sentences are grammatical,
  natural Hebrew and make no popularity/adoption claim.

### Item 5 — Gate B: "labs" (מעבדה/מעבדות) -> "workshops" (סדנה/סדנאות)
- **Files changed:** `index.html` (מעבדות מעשיות -> סדנאות מעשיות, same
  edit as Item 4's card body); `syllabus/README.md`; `syllabus/full-
  day.md` (4 occurrences); `syllabus/90-min-baby-steps.md` (1
  occurrence); `syllabus/half-day.md` (4 occurrences). Grammar agreement
  adjusted per occurrence (מעבדה -> סדנה, מעבדות -> סדנאות, מהמעבדה ->
  מהסדנה, במעבדות -> בסדנאות). The `תרגול מעשי` heading was left
  untouched in all syllabus content docs.
- **Commit:** `c784413`.
- **QA VERIFIED (2026-07-08, round 2, qa_cycles 2):** independent
  `grep -rn "מעבד" index.html syllabus/` → zero matches. Independent
  `grep -rln "תרגול מעשי" syllabus/` → present in all 8 files (7 content
  docs + README); Gate 1's per-file positive check for this heading
  (`tests/check-syllabus.mjs`, required-sections loop) still passes for
  all 7 content docs, confirming it is genuinely pinned, not just
  visually present. Browser-verified `document.body.innerText` contains
  no `מעבד` anywhere on the rendered page. Read every changed hunk in
  `syllabus/half-day.md` and `syllabus/full-day.md` in full (via `git
  show c784413`) — each מעבדה->סדנה / מעבדות->סדנאות substitution
  (including construct-state forms מהמעבדה->מהסדנה and prepositional
  forms במעבדות->בסדנאות, and gendered count agreement "שלוש מעבדות" ->
  "שלוש סדנאות") reads as natural, grammatical Hebrew in context — not a
  mechanical find/replace artifact. Also re-verified the earlier-QA'd
  Item 2 behavior didn't regress: all 54 module cards present; filter
  `data-filter="B"` shows exactly 8 B-track cards and reactivates
  correctly; `data-filter="all"` restores all 54; no console errors, no
  failed network requests; no horizontal overflow at 375×812 (`scrollW
  == innerW == 375`, 0 overflowing elements).
- **QA regression test added:** `tests/check-copy-change.mjs` gained one
  new structural check (Gate 5 #29) pinning that the half-day card has no
  leftover `position:absolute` element (i.e. no regrown badge under a
  *different* wording that would slip past the string-based checks).
  Mutation-tested: temporarily reinserted a differently-worded badge div
  outside the working tree's committed history (reverted before
  committing) and confirmed the new check fails red on it, then restored
  the file and reran to green. Commit `84e4330` (tests/-only).

## Evaluation Notes

All 3 items QA-verified and promoted to Completed. Full authoritative pass
(QA's independent run): `bash tests/run_checks.sh` → 115/115 checks passed
(Gate 1: 67/67, Gate 2: 32/32, Gate 3: 4/4, Gate 4 [new QA regression]:
12/12). No deviations from the brief; no escalations raised.

**Round 2 — Developer pass (2026-07-08, Items 4-5, commit `c784413`).**
Synced to `56e0535` per brief; confirmed via `git log --oneline -1` before
starting. Baseline `bash tests/run_checks.sh`: 132/143 (Gate 5 17/28,
11 genuinely red on the strings named in the contract). Re-grepped
`מעבד|פופולר|הבחירה של רוב המשרדים` across `index.html`/`syllabus/`
before editing and confirmed it matched the contract's occurrence list
exactly (index.html:674; syllabus/README.md:10; syllabus/half-day.md
lines 3/7/15/34/69; syllabus/full-day.md lines 15/58/63/79;
syllabus/90-min-baby-steps.md:52) — no surprises. Made all 5 files'
edits (Gate A wording + Gate B rename), then re-ran the same grep post-
edit: zero hits anywhere in `index.html`/`syllabus/**`. Final
`bash tests/run_checks.sh`: 143/143 (Gate 1: 67/67, Gate 2: 32/32,
Gate 3: 4/4, Gate 4: 12/12, Gate 5: 28/28 — including scoped positive
pin #28). Confirmed `תרגול מעשי` heading unchanged in all 8 syllabus
docs and `tests/check-syllabus.mjs:36` still passes. No `tests/**` files
touched. No deviations from the brief; no escalations raised.

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

**2026-07-08 — QA pass 2 / round 2 (qa_cycles: 2).** Synced to `36bdafd`
per brief; `git log --oneline -1` confirmed match, no reset needed. Ran
`bash tests/run_checks.sh` independently: 143/143 (Gate 1: 67/67, Gate 2:
32/32, Gate 3: 4/4, Gate 4: 12/12, Gate 5: 28/28) before adding a
regression check. Independent `grep -rn "פופולר\|מעבד\|הבחירה של רוב
המשרדים" index.html syllabus/` → zero matches (own pass, not reusing
Dev's reported numbers). Independent `grep -rln "תרגול מעשי" syllabus/`
→ present in all 8 files; cross-checked against Gate 1's per-file
positive check for this heading (already existed, still green for all 7
content docs) rather than assuming grep alone proves the pin holds.

Browser verification (no `.claude/launch.json` existed, so created a
temporary one pointing `python3 -m http.server` at a scratch port to use
the Claude Preview tool, then deleted it after — no trace left in git
status): loaded `index.html`, confirmed via DOM inspection that the
half-day pricing card (`יום מעשי` / HALF DAY / מ־₪9,500) has exactly 5
children and zero `position:absolute` descendants — the `הפופולרי` badge
`<div>` was removed in full, not just its text, so no leftover wrapper
can overlap/clip. Screenshotted the card at 1280×900 and again at 500×700
(sharper crop) — clean card, body reads "A · B · D · I עם סדנאות מעשיות.
מאוזן בין עומק לזמן." with correct RTL, no clipping. `document.body
.innerText` confirmed to contain neither `הפופולרי` nor `מעבד` anywhere
on the page. Regression-checked Item 2's earlier-verified behavior: 54
`[data-track]` cards; `data-filter="B"` button `.click()` narrows to
exactly 8 visible cards all `data-track="B"` and activates the B button;
`data-filter="all"` `.click()` restores all 54 and reactivates "הכול";
zero console logs, zero failed network requests; at 375×812,
`scrollWidth === innerWidth === 375` with 0 elements overflowing the
viewport. (Note: the `preview_click` tool's coordinate-based click
missed the filter buttons after a viewport resize — worked around by
dispatching a real `.click()` via `preview_eval` instead, which is an
equally valid triggering of the site's own click handler; not a site
defect.)

Hebrew coherence spot-check: read every changed hunk in `c784413` for
`syllabus/half-day.md`, `syllabus/full-day.md`, `syllabus/README.md`,
`syllabus/90-min-baby-steps.md`, and `index.html` via `git show`. Every
מעבדה->סדנה / מעבדות->סדנאות substitution (including construct-state
`מהמעבדה`->`מהסדנה`, prepositional `במעבדות`->`בסדנאות`, and gendered
count agreement `שלוש מעבדות`->`שלוש סדנאות`) is grammatical and reads
naturally — no mechanical find/replace breakage. The reworded half-day
opener, target-audience section, and README line make no popularity/
adoption claim and read as normal marketing copy.

Regression-test gap found: no existing check pinned the *structural*
absence of the removed badge element (only text-string absence was
pinned) — a future edit could re-add a floating badge under different
wording and slip past every existing check. Added Gate 5 check #29 to
`tests/check-copy-change.mjs`: scoped to the half-day card block
(gradient-background open tag to the next card's "FULL DAY" label),
asserts no `position:absolute` anywhere in that block. Mutation-tested:
temporarily reinserted a differently-worded badge `<div
style="position:absolute...">חדש</div>` into `index.html`, reran the
suite (confirmed check #29 failed red, 143/144), then restored the
original file byte-for-byte before committing anything (confirmed via
`git status --porcelain` showing no diff) and reran to green (144/144).
Committed test-only in `tests/check-copy-change.mjs`, commit `84e4330`.

Verdict: PASS on both items (Gate A and Gate B). Status set to `review`,
`current_role: planner`, `qa_cycles: 2`, `completed_items: 5`,
`dev_complete_items: 0`. No deviations from the brief. No escalations.

## Context Dump

**Round 2 scope — this replaces the prior context dump.** The original
Items 1-3 are done, QA-verified, and untouched by this round; their old
context (curriculum parsing, `.dc` source mapping, accent color, email
de-obfuscation, filter wiring) is no longer relevant to the current work
and has been dropped. What follows is everything the Developer needs for
Items 4-5 only.

**Exact strings to remove/replace — Gate A (popularity/social-proof):**
- `index.html` line ~674, the half-day pricing card (find it via the
  unique anchor text `A · B · D · I`): contains badge text `הפופולרי`
  and, in the card's description paragraph, `...עם מעבדות מעשיות. הבחירה
  של רוב המשרדים.` — remove `הפופולרי` badge content (replace with
  something else or drop the badge; see below), and reword the trailing
  `הבחירה של רוב המשרדים.` sentence to a truthful value statement (e.g.
  emphasize what participants walk away with — do NOT claim existing
  customers/adoption/market share, since there have been no sales yet).
- `syllabus/half-day.md` line 3: `*הכשרת AI לעורכי דין · הפורמט הפופולרי
  ביותר, עם מעבדות מעשיות*` — drop `הפופולרי ביותר` phrasing.
- `syllabus/half-day.md` line 7 (target-audience section opener):
  `הבחירה של רוב המשרדים: קבוצה שכבר מבינה...` — **this is a SECOND,
  separate occurrence of the same social-proof phrase** that the
  director's ask didn't explicitly call out by file (it only mentioned
  "index.html's half-day pricing card"), but it is the same unfounded
  claim and Gate 5's checks assert its absence in both files, so it must
  be reworded too (e.g. describe the target audience directly — "קבוצה
  שכבר מבינה שהיא רוצה להשתמש בכלי AI..." without the "most firms"
  framing).
- `syllabus/README.md` line 10: `...המסלול המעשי הפופולרי ביותר...` —
  drop `הפופולרי ביותר`.

**Grammar mapping — Gate B (labs → workshops):** מעבדה (singular) →
סדנה; מעבדות (plural) → סדנאות. Apply this substitution wherever `מעבד`
appears, adjusting adjective agreement as needed, e.g.:
- `מעבדות מעשיות` → `סדנאות מעשיות` (index.html:674, half-day.md:3)
- `עם מעבדה` → `עם סדנה` (half-day.md:34, "מסלול B: ... (עם מעבדה)")
- `מעבדה מלאה` → `סדנה מלאה` (90-min-baby-steps.md:52)
- `שלוש מעבדות רצופות` → `שלוש סדנאות רצופות` (full-day.md:79)
- `(מעבדה)` parenthetical labels after track names → `(סדנה)`
  (full-day.md, two occurrences: מסלול E and מסלול F blocks)
- `במעבדות` / `מעבדות אפקטיביות` / `מהמעבדה` → `בסדנאות` /
  `סדנאות אפקטיביות` / `מהסדנה`, etc. — the pattern is mechanical
  (מעבד- stem → סדנ- with matching gender/number suffix), just don't
  do a blind find-replace of the bare 4-letter stem without checking
  each match reads naturally in context.
- Full known occurrence list (from the Planner's sweep — re-grep to be
  sure nothing was missed): `index.html:674`; `syllabus/README.md:10`;
  `syllabus/full-day.md` lines 15, 58, 63, 79; `syllabus/90-min-baby-
  steps.md:52`; `syllabus/half-day.md` lines 3, 15, 34, 69.

**DO NOT touch:** the required heading `תרגול מעשי` ("hands-on
practice") in every syllabus content doc. It is a distinct concept (it
means hands-on practice generally, not specifically a lab session), it
contains no `מעבד` substring at all, and it is pinned by an existing
check at `tests/check-syllabus.mjs:36`. Leave that heading and that
check exactly as-is.

**How to run the checks:** `bash tests/run_checks.sh` from repo root
(needs `node` on PATH; confirmed present). Node stdlib only, no npm
installs. New Gate 5 (`tests/check-copy-change.mjs`) is checks belonging
to `GATE 5 SUMMARY` in the output; as of this contract update it is
17/28 passing (11 genuinely failing on the strings listed above). Gates
1-4 (the pre-existing 115 checks) must stay green — do not edit any
`tests/*.mjs` file; that's the Planner's/QA's job, not Developer's.
Gate 5 includes one scoped positive pin (check #28) requiring the
half-day card specifically to read `סדנאות` in place of `מעבדות` right
after the `A · B · D · I` anchor — a blind removal without adding the
replacement word there will leave that one check red.

**Stale-pin sweep (done by Planner):** confirmed no existing check in
`tests/*.mjs` pins `הפופולרי`, `הבחירה של רוב המשרדים`, or `מעבד` —
grepped the whole `tests/` directory, zero hits outside the new
`check-copy-change.mjs`. `check-syllabus.mjs:36` pins `תרגול מעשי`
only (label string "hands-on labs" is just an English description in
the test's own output, not a Hebrew string being matched — irrelevant
to this change). No renames to chase this round.

**No git stash used at any point in this sprint's Planner phase.**
