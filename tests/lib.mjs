// Shared helpers for the sprint 2026-07-08-ai-lawyers-site check suites.
// Node stdlib only — no npm installs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');

export function readText(p) {
  return fs.readFileSync(p, 'utf8');
}

export function section(title) {
  console.log('');
  console.log(`--- ${title} ---`);
}

// Creates a numbered PASS/FAIL check runner. Each check-*.mjs file gets its
// own instance (own 1-based numbering) so each gate's output is independently
// readable; run_checks.sh aggregates the machine-readable ::SUMMARY:: line
// from each into one overall total.
export function makeChecker() {
  let n = 0;
  let failCount = 0;

  function check(name, testFn) {
    n++;
    let pass;
    let detail = '';
    try {
      const result = testFn();
      if (typeof result === 'boolean') {
        pass = result;
      } else {
        pass = !!result.pass;
        detail = result.detail || '';
      }
    } catch (e) {
      pass = false;
      detail = `error: ${e.message}`;
    }
    if (!pass) failCount++;
    const status = pass ? 'PASS' : 'FAIL';
    console.log(`[${status}] ${n}. ${name}${detail ? ' — ' + detail : ''}`);
    return pass;
  }

  function summarize(label) {
    console.log('');
    console.log(`${label}: ${n - failCount}/${n} checks passed, ${failCount} failed`);
    console.log(`::SUMMARY:: total=${n} passed=${n - failCount} failed=${failCount}`);
    return failCount === 0 ? 0 : 1;
  }

  return { check, summarize };
}

// Derives the master module-code list + per-track counts from the curriculum
// source itself (never hand-maintain this list — it is re-parsed every run).
export function loadMasterCurriculum() {
  const curriculumPath = path.join(ROOT, 'sources', 'AI-for-Lawyers-Workshop-Curriculum.md');
  const curriculumText = readText(curriculumPath);
  const codeRe = /\*\*([A-J]\d{1,2})\./g;
  const masterCodes = new Set();
  const trackCounts = {};
  let m;
  while ((m = codeRe.exec(curriculumText))) {
    const code = m[1];
    masterCodes.add(code);
    const letter = code[0];
    trackCounts[letter] = (trackCounts[letter] || 0) + 1;
  }
  return { masterCodes, trackCounts };
}
