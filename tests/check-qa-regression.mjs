#!/usr/bin/env node
// Gate 4 — QA regression checks (sprint/2026-07-08-ai-lawyers-site).
// Added by QA after PASS verdicts on all 3 dev-complete items, to pin down
// behavior that the original Gate 1-3 structure-only checks did not cover:
// the filter script's wiring to its data-* markup, the mobile @media
// collapse actually reaching every multi-column grid on the page, basic
// SEO plumbing (<title>/meta description), and the semantic content of the
// citation-verification protocol (not just heading + step-count presence).
// See docs/sprint/sprints/2026-07-08-ai-lawyers-site.md for the sprint contract.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readText, section, makeChecker } from './lib.mjs';

const { check, summarize } = makeChecker();

section('4. Gate 4 — QA regression checks');

// ---------------------------------------------------------------------
// index.html: basic SEO plumbing
// ---------------------------------------------------------------------
const indexPath = path.join(ROOT, 'index.html');
function readIndex() {
  return fs.readFileSync(indexPath, 'utf8');
}

check('index.html has a non-empty <title>', () => {
  const t = readIndex();
  const m = t.match(/<title>([^<]*)<\/title>/i);
  return {
    pass: !!m && m[1].trim().length > 0,
    detail: m ? `title: "${m[1].trim()}"` : 'no <title> tag found',
  };
});

check('index.html has a non-empty meta description', () => {
  const t = readIndex();
  const m = t.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  return {
    pass: !!m && m[1].trim().length > 0,
    detail: m ? `description length ${m[1].trim().length} chars` : 'no meta description found',
  };
});

// ---------------------------------------------------------------------
// index.html: filter script <-> data-filter/data-track markup contract
// ---------------------------------------------------------------------
check('index.html inline <script> wires a generic click handler via .filter-btn/data-filter/data-track', () => {
  const t = readIndex();
  const scriptMatch = t.match(/<script>([\s\S]*?)<\/script>/);
  if (!scriptMatch) return { pass: false, detail: 'no inline <script> block found' };
  const body = scriptMatch[1];
  const hasQuery = /querySelectorAll\((["'])\.filter-btn\1\)/.test(body);
  const hasClickHandler = /addEventListener\((["'])click\1/.test(body);
  const hasDataFilterRead = /getAttribute\((["'])data-filter\1\)/.test(body);
  const hasDataTrackRead = /getAttribute\((["'])data-track\1\)/.test(body);
  const missing = [
    !hasQuery && '.filter-btn query',
    !hasClickHandler && 'click handler',
    !hasDataFilterRead && 'data-filter read',
    !hasDataTrackRead && 'data-track read',
  ].filter(Boolean);
  return {
    pass: missing.length === 0,
    detail: missing.length ? `missing: ${missing.join(', ')}` : 'script queries .filter-btn, binds click, reads data-filter/data-track',
  };
});

check('every data-filter button carries the filter-btn class the script binds to', () => {
  const t = readIndex();
  const tagRe = /<[a-zA-Z]+\s+[^>]*data-filter="([^"]+)"[^>]*>/g;
  const missing = [];
  let m;
  while ((m = tagRe.exec(t))) {
    if (!m[0].includes('filter-btn')) missing.push(m[1]);
  }
  return {
    pass: missing.length === 0,
    detail: missing.length ? `data-filter values missing filter-btn class: ${missing.join(', ')}` : 'all 11 data-filter buttons carry filter-btn class',
  };
});

// ---------------------------------------------------------------------
// index.html: mobile @media collapse must reach every multi-column grid
// used on the page (derived from the page itself, not hardcoded class
// names, so a future rename/reshuffle of grid classes can't slip past).
// ---------------------------------------------------------------------
function extractMediaBlock(text) {
  const idx = text.search(/@media\s*\(\s*max-width\s*:/i);
  if (idx === -1) return null;
  const openIdx = text.indexOf('{', idx);
  if (openIdx === -1) return null;
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) return text.slice(openIdx + 1, i);
    }
  }
  return null;
}

check('mobile @media (max-width) block collapses every multi-column grid element on the page to a single column', () => {
  const t = readIndex();
  const classGridRe = /<[a-zA-Z]+\s+[^>]*class="([^"]*)"[^>]*style="([^"]*grid-template-columns\s*:\s*([^;"]+))[^"]*"/g;
  const multiColElements = [];
  let m;
  while ((m = classGridRe.exec(t))) {
    const classAttr = m[1];
    const colValue = m[3].trim();
    const isMulti = /repeat\(\s*[2-9]/.test(colValue) || colValue.split(/\s+/).filter(Boolean).length >= 2;
    if (isMulti) multiColElements.push(classAttr.split(/\s+/).filter(Boolean));
  }
  if (multiColElements.length === 0) return { pass: false, detail: 'no multi-column grid elements found on page (unexpected)' };

  const mediaBody = extractMediaBlock(t);
  if (!mediaBody) return { pass: false, detail: 'no @media (max-width: ...) block found' };

  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  const collapsedClasses = new Set();
  let rm;
  while ((rm = ruleRe.exec(mediaBody))) {
    const selector = rm[1];
    const decl = rm[2];
    if (/grid-template-columns\s*:\s*1fr\b/.test(decl)) {
      selector.split(',').forEach((sel) => {
        const clsm = sel.match(/\.([A-Za-z0-9_-]+)/);
        if (clsm) collapsedClasses.add(clsm[1]);
      });
    }
  }
  // An element is covered if ANY of its classes is targeted by the collapse
  // rule (co-occurring semantic classes like "curriculum-grid" riding along
  // with "grid3" on the same element should not count as a miss).
  const uncollapsed = multiColElements.filter((classes) => !classes.some((c) => collapsedClasses.has(c)));
  return {
    pass: uncollapsed.length === 0,
    detail: uncollapsed.length
      ? `${uncollapsed.length} multi-column element(s) not collapsed: ${uncollapsed.map((c) => c.join('.')).join('; ')}`
      : `all ${multiColElements.length} multi-column grid element(s) collapsed via: ${[...collapsedClasses].sort().join(', ')}`,
  };
});

// ---------------------------------------------------------------------
// Syllabus: citation-verification protocol must be semantically correct,
// not just present with >=3 numbered steps (curriculum §I3: unverified-
// by-default -> pull & read the real source in Nevo/Takdin -> confirm it
// says what the draft claims, before anything leaves the office).
// ---------------------------------------------------------------------
const SYLLABUS_DIR = path.join(ROOT, 'syllabus');
const contentFiles = [
  '90-min-baby-steps.md',
  'half-day.md',
  'full-day.md',
  'multi-week-cohort.md',
  'segment-transactional.md',
  'segment-litigation.md',
  'segment-in-house.md',
];
const PROTOCOL_HEADING = 'פרוטוקול אימות אסמכתאות';

for (const f of contentFiles) {
  check(`syllabus/${f} citation-verification protocol semantically matches curriculum §I3 (unverified-by-default -> real source in Nevo/Takdin -> confirm before it leaves)`, () => {
    const t = readText(path.join(SYLLABUS_DIR, f));
    const idx = t.indexOf(PROTOCOL_HEADING);
    if (idx === -1) return { pass: false, detail: 'heading not found' };
    const after = t.slice(idx, idx + 2500);
    const stepRe = /(?:^|\n)\s*(\d+)[.)]\s*([\s\S]*?)(?=\n\s*\d+[.)]|\n##|$)/g;
    const steps = {};
    let sm;
    while ((sm = stepRe.exec(after))) steps[sm[1]] = sm[2];
    const step1 = steps['1'] || '';
    const step2 = steps['2'] || '';
    const step3 = steps['3'] || '';
    if (!step1 || !step2 || !step3) return { pass: false, detail: 'could not isolate 3 numbered steps' };
    const step1Ok = /לא מאומת/.test(step1);
    const step2Ok = /נבו|תקדין/.test(step2);
    const step3Ok = /לפני/.test(step3);
    const missing = [];
    if (!step1Ok) missing.push('step 1 missing "unverified by default" language (לא מאומת)');
    if (!step2Ok) missing.push('step 2 missing real-source-lookup reference (נבו/תקדין)');
    if (!step3Ok) missing.push('step 3 missing "before it leaves" confirmation language (לפני)');
    return { pass: missing.length === 0, detail: missing.length ? missing.join('; ') : 'steps 1-3 match curriculum §I3 semantics' };
  });
}

process.exit(summarize('GATE 4 SUMMARY'));
