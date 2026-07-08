#!/usr/bin/env node
// Gate 2 — self-contained static landing page (index.html at repo root).
// See docs/sprint/sprints/2026-07-08-ai-lawyers-site.md for the sprint contract.
// Structure checks only — interactive filter-click behavior is QA's job in a browser.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, section, makeChecker, loadMasterCurriculum } from './lib.mjs';

const { check, summarize } = makeChecker();
const { masterCodes, trackCounts } = loadMasterCurriculum();

section('2. Gate 2 — Static landing page (index.html)');

const indexPath = path.join(ROOT, 'index.html');
check('index.html exists at repo root', () => fs.existsSync(indexPath));

function readIndex() {
  return fs.readFileSync(indexPath, 'utf8');
}

check('index.html has no {{ template tokens', () => !readIndex().includes('{{'));
check('index.html has no <sc-for> pseudo-tags', () => !/sc-for/i.test(readIndex()));
check('index.html has no <sc-if> pseudo-tags', () => !/sc-if/i.test(readIndex()));
check('index.html has no <x-dc> wrapper tag', () => !/<x-dc/i.test(readIndex()));
check('index.html has no support.js reference', () => !/support\.js/i.test(readIndex()));
check('index.html has no /cdn-cgi/ reference', () => !readIndex().includes('/cdn-cgi/'));
check('index.html has no text/x-dc script block', () => !/text\/x-dc/i.test(readIndex()));
check('index.html has no Cloudflare email-obfuscation artifacts', () => !/__cf_email__|data-cfemail/i.test(readIndex()));
check('index.html preserves dir="rtl"', () => /dir=["']rtl["']/i.test(readIndex()));
check('index.html preserves lang="he"', () => /lang=["']he["']/i.test(readIndex()));
check('index.html sets --accent:#6D28D9 on a root element', () => /--accent:\s*#6D28D9/i.test(readIndex()));
check('index.html has a mobile media-query block (@media (max-width: ...))', () => /@media\s*\(\s*max-width\s*:/i.test(readIndex()));
check('index.html shows plain-text contact email nerya@nerya.io', () => readIndex().includes('nerya@nerya.io'));
check('index.html shows price ₪4,500', () => readIndex().includes('₪4,500'));
check('index.html shows price מ־₪9,500', () => readIndex().includes('מ־₪9,500'));
check('index.html shows price מ־₪16,000', () => readIndex().includes('מ־₪16,000'));
check('index.html shows price מ־₪48,000', () => readIndex().includes('מ־₪48,000'));
check('index.html has "all" filter button (data-filter="all")', () => /data-filter=["']all["']/i.test(readIndex()));

for (const letter of 'ABCDEFGHIJ') {
  check(`index.html has track filter button data-filter="${letter}"`, () => new RegExp(`data-filter=["']${letter}["']`).test(readIndex()));
}

check('index.html renders exactly 54 module cards carrying data-track', () => {
  const matches = [...readIndex().matchAll(/data-track=["']([A-J])["']/g)];
  return { pass: matches.length === 54, detail: `found ${matches.length} data-track occurrence(s)` };
});

check('index.html per-track data-track card counts match master curriculum counts', () => {
  const matches = [...readIndex().matchAll(/data-track=["']([A-J])["']/g)].map((m2) => m2[1]);
  const counts = {};
  for (const l of matches) counts[l] = (counts[l] || 0) + 1;
  const mismatches = [];
  for (const letter of Object.keys(trackCounts).sort()) {
    const expected = trackCounts[letter];
    const found = counts[letter] || 0;
    if (found !== expected) mismatches.push(`${letter}: expected ${expected}, found ${found}`);
  }
  return { pass: mismatches.length === 0, detail: mismatches.length ? mismatches.join('; ') : 'all 10 tracks match' };
});

check('index.html contains all 54 module codes (A1…J4) as literal text', () => {
  const t = readIndex();
  const missing = [...masterCodes].filter((c) => !new RegExp(`\\b${c}\\b`).test(t));
  return { pass: missing.length === 0, detail: missing.length ? `missing: ${missing.sort().join(', ')}` : 'all 54 present' };
});

process.exit(summarize('GATE 2 SUMMARY'));
