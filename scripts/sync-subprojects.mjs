#!/usr/bin/env node
// Pull site/summary.md from each sub-project repo into src/content/subprojects/<id>.md.
//
// A sub-project that keeps its own summary adds `site/summary.md` to its repo, with the same frontmatter
// and body as the hub file. Repos without that file keep the hub's hand-written summary.
//
// Auth: uses $GITHUB_TOKEN, or falls back to `gh auth token` locally. Private repos need a token with
// read access to their contents. Usage: npm run sync [-- --dry-run]

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const DIR = path.resolve('src/content/subprojects');
const REMOTE_PATH = 'site/summary.md';
const dryRun = process.argv.includes('--dry-run');

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim();
  } catch {
    return undefined;
  }
}

function repoOf(markdown) {
  const fm = markdown.match(/^---\n([\s\S]*?)\n---/);
  return fm?.[1].match(/^repo:\s*["']?([\w.-]+\/[\w.-]+)["']?\s*$/m)?.[1];
}

const auth = token();
if (!auth) {
  console.log('sync: no GitHub token; keeping the committed summaries.');
  process.exit(0);
}

let updated = 0;
for (const name of (await readdir(DIR)).filter((f) => f.endsWith('.md'))) {
  const file = path.join(DIR, name);
  const local = await readFile(file, 'utf8');
  const repo = repoOf(local);
  if (!repo) {
    console.log(`sync: ${name}: no repo set, skipped`);
    continue;
  }
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${REMOTE_PATH}`, {
    headers: {
      Authorization: `Bearer ${auth}`,
      Accept: 'application/vnd.github.raw+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (res.status === 404) {
    console.log(`sync: ${name}: ${repo} has no ${REMOTE_PATH} (or no access), kept local`);
    continue;
  }
  if (!res.ok) {
    console.warn(`sync: ${name}: ${repo} returned HTTP ${res.status}, kept local`);
    continue;
  }
  const remote = await res.text();
  if (!remote.startsWith('---\n')) {
    console.warn(`sync: ${name}: ${repo}/${REMOTE_PATH} has no frontmatter, kept local`);
    continue;
  }
  if (remote === local) {
    console.log(`sync: ${name}: up to date`);
    continue;
  }
  if (!dryRun) await writeFile(file, remote);
  updated++;
  console.log(`sync: ${name}: ${dryRun ? 'would update' : 'updated'} from ${repo}`);
}
console.log(`sync: ${updated} file(s) ${dryRun ? 'would change' : 'changed'}.`);
