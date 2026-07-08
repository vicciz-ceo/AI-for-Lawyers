#!/usr/bin/env node
// Gate 1 — Hebrew syllabus set under syllabus/.
// See docs/sprint/sprints/2026-07-08-ai-lawyers-site.md for the sprint contract.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readText, section, makeChecker, loadMasterCurriculum } from './lib.mjs';

const { check, summarize } = makeChecker();
const { masterCodes } = loadMasterCurriculum();

section('0. Meta — master curriculum module codes (derived, not hardcoded)');

check('master curriculum parses to exactly 54 module codes across tracks A-J', () => {
  const total = masterCodes.size;
  return { pass: total === 54, detail: `parsed ${total} codes: ${[...masterCodes].sort().join(',')}` };
});

section('1. Gate 1 — Syllabus set (syllabus/)');

const SYLLABUS_DIR = path.join(ROOT, 'syllabus');
const formatFiles = ['90-min-baby-steps.md', 'half-day.md', 'full-day.md', 'multi-week-cohort.md'];
const segmentFiles = ['segment-transactional.md', 'segment-litigation.md', 'segment-in-house.md'];
const contentFiles = [...formatFiles, ...segmentFiles];
const README_FILE = 'README.md';

check(`syllabus/${README_FILE} exists`, () => fs.existsSync(path.join(SYLLABUS_DIR, README_FILE)));

for (const f of contentFiles) {
  check(`syllabus/${f} exists`, () => fs.existsSync(path.join(SYLLABUS_DIR, f)));
}

const requiredHeadings = [
  ['קהל יעד', 'target audience'],
  ['משך', 'duration'],
  ['מטרות', 'goals'],
  ['תרגול מעשי', 'hands-on labs'],
  ['פרוטוקול אימות אסמכתאות', 'citation-verification protocol'],
];

for (const f of contentFiles) {
  const filePath = path.join(SYLLABUS_DIR, f);

  for (const [needle, label] of requiredHeadings) {
    check(`syllabus/${f} contains required section "${needle}" (${label})`, () => {
      const t = readText(filePath);
      return t.includes(needle);
    });
  }

  check(`syllabus/${f} citation-verification protocol lists >= 3 steps`, () => {
    const t = readText(filePath);
    const idx = t.indexOf('פרוטוקול אימות אסמכתאות');
    if (idx === -1) return { pass: false, detail: 'heading not found' };
    const after = t.slice(idx, idx + 2500);
    const stepMatches = after.match(/(^|\n)\s*(?:\(?\d+[.)]|שלב\s*\d+)/g) || [];
    return { pass: stepMatches.length >= 3, detail: `found ${stepMatches.length} step marker(s)` };
  });

  check(`syllabus/${f} module codes are valid (subset of master curriculum) and non-empty`, () => {
    const t = readText(filePath);
    const codeMatches = [...t.matchAll(/\b([A-J]\d{1,2})\b/g)].map((x) => x[1]);
    const unique = [...new Set(codeMatches)];
    if (unique.length === 0) return { pass: false, detail: 'no module codes found in document' };
    const invalid = unique.filter((c) => !masterCodes.has(c));
    return {
      pass: invalid.length === 0,
      detail: invalid.length
        ? `invalid/unknown codes: ${invalid.join(', ')}`
        : `${unique.length} valid code(s) referenced (${unique.sort().join(',')})`,
    };
  });
}

// Format -> track mapping per curriculum Section 3
const formatTrackRequirements = {
  '90-min-baby-steps.md': ['A', 'I', 'B'], // A + I (safety-first), plus a couple of B modules as a taste
  'half-day.md': ['A', 'B', 'D', 'I'],
  'full-day.md': ['A', 'B', 'D', 'I', 'C', 'E', 'F', 'H'], // half-day set + C, E, F, H
  'multi-week-cohort.md': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], // everything, including G
};

for (const [f, tracks] of Object.entries(formatTrackRequirements)) {
  check(`syllabus/${f} module list covers required tracks per curriculum §3 (${tracks.join('/')})`, () => {
    const filePath = path.join(SYLLABUS_DIR, f);
    const t = readText(filePath);
    const present = new Set([...t.matchAll(/\b([A-J])\d{1,2}\b/g)].map((x) => x[1]));
    const missing = tracks.filter((tr) => !present.has(tr));
    return { pass: missing.length === 0, detail: missing.length ? `missing track(s): ${missing.join(', ')}` : 'all required tracks referenced' };
  });
}

// Segment one-pagers: specific module-code weighting per curriculum Section 3 "By segment"
const segmentCodeRequirements = {
  'segment-transactional.md': ['B2', 'B3'],
  'segment-litigation.md': ['B5', 'B8', 'I3'],
  'segment-in-house.md': [],
};
const segmentTrackRequirements = {
  'segment-transactional.md': ['C', 'F'],
  'segment-litigation.md': [],
  'segment-in-house.md': ['D', 'H', 'I'],
};

for (const [f, codes] of Object.entries(segmentCodeRequirements)) {
  if (codes.length === 0) continue;
  check(`syllabus/${f} references specific codes ${codes.join('/')} per curriculum §3 "By segment"`, () => {
    const t = readText(path.join(SYLLABUS_DIR, f));
    const missing = codes.filter((c) => !new RegExp(`\\b${c}\\b`).test(t));
    return { pass: missing.length === 0, detail: missing.length ? `missing: ${missing.join(', ')}` : 'all present' };
  });
}
for (const [f, tracks] of Object.entries(segmentTrackRequirements)) {
  if (tracks.length === 0) continue;
  check(`syllabus/${f} covers required track(s) ${tracks.join('/')} per curriculum §3 "By segment"`, () => {
    const t = readText(path.join(SYLLABUS_DIR, f));
    const present = new Set([...t.matchAll(/\b([A-J])\d{1,2}\b/g)].map((x) => x[1]));
    const missing = tracks.filter((tr) => !present.has(tr));
    return { pass: missing.length === 0, detail: missing.length ? `missing: ${missing.join(', ')}` : 'all present' };
  });
}

check(`syllabus/${README_FILE} links to all ${contentFiles.length} syllabus documents`, () => {
  const t = readText(path.join(SYLLABUS_DIR, README_FILE));
  const missing = contentFiles.filter((f) => !t.includes(f));
  return { pass: missing.length === 0, detail: missing.length ? `missing links: ${missing.join(', ')}` : 'all linked' };
});

process.exit(summarize('GATE 1 SUMMARY'));
