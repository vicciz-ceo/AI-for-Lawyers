#!/usr/bin/env node
// Gate 3 — GitHub Pages deployment config (CNAME, .nojekyll at repo root).
// See docs/sprint/sprints/2026-07-08-ai-lawyers-site.md for the sprint contract.
// Note: enabling GitHub Pages itself and live-URL verification is the
// manager's ops step + QA's check — not covered here.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readText, section, makeChecker } from './lib.mjs';

const { check, summarize } = makeChecker();

section('3. Gate 3 — Pages deployment config');

const cnamePath = path.join(ROOT, 'CNAME');
check('CNAME exists at repo root', () => fs.existsSync(cnamePath));
check('CNAME content is exactly "lawyers.nerya.io"', () => {
  const raw = readText(cnamePath);
  const normalized = raw.replace(/\r/g, '').replace(/\n+$/, '');
  return { pass: normalized === 'lawyers.nerya.io', detail: `content: ${JSON.stringify(raw)}` };
});

const nojekyllPath = path.join(ROOT, '.nojekyll');
check('.nojekyll exists at repo root', () => fs.existsSync(nojekyllPath));
check('.nojekyll is empty (0 bytes)', () => {
  const stat = fs.statSync(nojekyllPath);
  return { pass: stat.size === 0, detail: `size: ${stat.size} bytes` };
});

process.exit(summarize('GATE 3 SUMMARY'));
