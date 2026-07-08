#!/usr/bin/env node
// Gate 5 — Copy change, Round 2 (sprint/2026-07-08-ai-lawyers-site reopened):
// director-requested removal of unfounded popularity/social-proof claims
// (Gate A) and a "labs" (מעבדה/מעבדות, reads as a science laboratory) ->
// "workshops" (סדנה/סדנאות) rename (Gate B), across index.html and every
// syllabus/*.md file. See docs/sprint/sprints/2026-07-08-ai-lawyers-site.md
// for the sprint contract and the full context dump for the Developer.
//
// Scope note: the brief's Gate A calls out the social-proof phrase
// "הבחירה של רוב המשרדים" as living "in index.html's half-day pricing
// card", but the same literal phrase also appears in syllabus/half-day.md
// (its "קהל יעד" / target-audience section opener: "הבחירה של רוב
// המשרדים: קבוצה שכבר מבינה..."). Gate A's overall goal ("nothing can be
// called popular or the choice of most firms", stated "across index.html
// AND syllabus/**") is broader than that one parenthetical, so this check
// asserts absence of the phrase across ALL files, not just index.html, to
// match the gate's intent rather than its narrower example.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readText, section, makeChecker } from './lib.mjs';

const { check, summarize } = makeChecker();

section('5. Gate 5 — Copy change Round 2: remove social-proof claims + labs->workshops');

const indexPath = path.join(ROOT, 'index.html');
const SYLLABUS_DIR = path.join(ROOT, 'syllabus');
const syllabusFiles = fs
  .readdirSync(SYLLABUS_DIR)
  .filter((f) => f.endsWith('.md'))
  .sort();

// (relPath, absPath) pairs for every deliverable file in scope: index.html
// plus every syllabus/*.md file (not hardcoded — re-listed from disk every
// run so a future new syllabus file is automatically covered).
const targets = [
  ['index.html', indexPath],
  ...syllabusFiles.map((f) => [`syllabus/${f}`, path.join(SYLLABUS_DIR, f)]),
];

// ---------------------------------------------------------------------
// Gate A — no unfounded popularity / social-proof claims left anywhere.
// ---------------------------------------------------------------------
for (const [rel, abs] of targets) {
  check(`${rel} contains no "פופולר" substring (no "popular" claims)`, () => {
    const t = readText(abs);
    const found = t.includes('פופולר');
    return { pass: !found, detail: found ? 'found "פופולר" substring' : 'absent' };
  });
}

for (const [rel, abs] of targets) {
  check(`${rel} contains no unfounded social-proof phrase "הבחירה של רוב המשרדים"`, () => {
    const t = readText(abs);
    const found = t.includes('הבחירה של רוב המשרדים');
    return { pass: !found, detail: found ? 'found the phrase' : 'absent' };
  });
}

// ---------------------------------------------------------------------
// Gate B — "labs" (מעבדה/מעבדות) -> "workshops" (סדנה/סדנאות) everywhere.
// Note: this intentionally does NOT touch/exclude the required syllabus
// heading "תרגול מעשי" (hands-on practice, pinned by
// tests/check-syllabus.mjs:36) — that heading contains no "מעבד"
// substring at all, so it is unaffected by this check.
// ---------------------------------------------------------------------
for (const [rel, abs] of targets) {
  check(`${rel} contains no "מעבד" substring (מעבדה/מעבדות renamed to סדנה/סדנאות)`, () => {
    const t = readText(abs);
    const found = t.includes('מעבד');
    return { pass: !found, detail: found ? 'found "מעבד" substring' : 'absent' };
  });
}

// ---------------------------------------------------------------------
// Scoped positive pin: the half-day pricing card in index.html (uniquely
// anchored by the literal "A · B · D · I" track-list marker, which occurs
// exactly once on the page) must now say "סדנאות" where it used to say
// "מעבדות". This is deliberately NOT a bare "index.html contains סדנאות"
// check — index.html already contains סדנה/סדנאות elsewhere (the intro
// copy and tailoring section), so a page-wide positive check would be
// vacuously green today. Scoping to the small window right after the
// unique anchor keeps this check genuinely red until the half-day card
// itself is edited.
// ---------------------------------------------------------------------
check('index.html half-day pricing card (anchored at "A · B · D · I") now reads סדנאות instead of מעבדות', () => {
  const t = readText(indexPath);
  const anchor = 'A · B · D · I';
  const idx = t.indexOf(anchor);
  if (idx === -1) return { pass: false, detail: 'anchor "A · B · D · I" not found on page' };
  const occurrences = [...t.matchAll(new RegExp(anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))].length;
  if (occurrences > 1) return { pass: false, detail: `anchor is not unique (${occurrences} occurrences) — cannot scope safely` };
  const window = t.slice(idx, idx + 120);
  const hasWorkshop = /סדנ/.test(window);
  const hasLab = /מעבד/.test(window);
  return {
    pass: hasWorkshop && !hasLab,
    detail: `window: ${JSON.stringify(window)}`,
  };
});

process.exit(summarize('GATE 5 SUMMARY'));
