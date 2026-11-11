#!/usr/bin/env node
// Copy each sub-project's public site/ folder into the hub (docs/subproject-sites.md has the conventions).
//
//   site/summary.md   -> src/content/subprojects/<id>.md     (overview page + card; same frontmatter as the hub file)
//   site/pages/**     -> src/content/subpages/<id>/**         (further pages, plus the images they use)
//
// A sub-project without site/ keeps the hub's hand-written summary and has no further pages.
// When site/pages/ exists it is mirrored: hub pages that are no longer in the repo are removed.
//
// Sources:
//   npm run sync                 GitHub, default branch. Token from $GITHUB_TOKEN or `gh auth token`;
//                                private repos need read access to contents.
//   npm run sync:local           local checkouts next to this repo (../<localDir>/site/), including uncommitted work.
// Options: --dry-run, --only <id>[,<id>...], --root <dir> (with --local; default ..)

import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const HUB = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SUMMARY_DIR = path.join(HUB, 'src/content/subprojects');
const PAGES_DIR = path.join(HUB, 'src/content/subpages');
const MAX_BYTES = 5 * 1024 * 1024;

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = flag('--dry-run');
const local = flag('--local');
const root = path.resolve(HUB, option('--root') ?? '..');
const only = option('--only')?.split(',');

const config = JSON.parse(await readFile(path.join(HUB, 'scripts/subprojects.json'), 'utf8'));
delete config._comment;

// ---------- sources: each returns a list of { rel, read() } for files under site/ ----------

async function walk(dir, base = dir) {
  const out = [];
  for (const d of await readdir(dir, { withFileTypes: true })) {
    if (d.name.startsWith('.')) continue;
    const full = path.join(dir, d.name);
    if (d.isDirectory()) out.push(...(await walk(full, base)));
    else out.push({ rel: path.relative(base, full).split(path.sep).join('/'), read: () => readFile(full) });
  }
  return out;
}

async function localFiles(id, { localDir }) {
  if (!localDir) return null;
  const dir = path.join(root, localDir, 'site');
  try {
    if (!(await stat(dir)).isDirectory()) return null;
  } catch {
    return null;
  }
  return walk(dir);
}

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return undefined;
  }
}

async function gh(apiPath, accept = 'application/vnd.github+json') {
  return fetch(`https://api.github.com${apiPath}`, {
    headers: { Authorization: `Bearer ${auth}`, Accept: accept, 'X-GitHub-Api-Version': '2022-11-28' },
  });
}

async function remoteFiles(id, { repo }) {
  if (!repo) return null;
  const res = await gh(`/repos/${repo}/git/trees/HEAD?recursive=1`);
  if (res.status === 404 || res.status === 409) return null; // no access, or empty repo
  if (!res.ok) throw new Error(`${repo}: HTTP ${res.status} listing files`);
  const tree = await res.json();
  if (tree.truncated) console.warn(`sync: ${id}: file list truncated by GitHub; some site/ files may be missing`);
  return tree.tree
    .filter((t) => t.type === 'blob' && t.path.startsWith('site/'))
    .map((t) => ({
      rel: t.path.slice('site/'.length),
      size: t.size,
      read: async () => {
        const r = await gh(`/repos/${repo}/contents/${t.path.split('/').map(encodeURIComponent).join('/')}`, 'application/vnd.github.raw+json');
        if (!r.ok) throw new Error(`${repo}/${t.path}: HTTP ${r.status}`);
        return Buffer.from(await r.arrayBuffer());
      },
    }));
}

// ---------- main ----------

const auth = local ? undefined : token();
if (!local && !auth) {
  console.log('sync: no GitHub token; keeping the committed content. (Use `npm run sync:local` for local checkouts.)');
  process.exit(0);
}

let changed = 0;
const write = async (file, data) => {
  let same = false;
  try {
    same = (await readFile(file)).equals(Buffer.from(data));
  } catch {}
  if (same) return;
  changed++;
  console.log(`sync:   ${dryRun ? 'would write' : 'write'} ${path.relative(HUB, file)}`);
  if (!dryRun) {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, data);
  }
};

for (const [id, src] of Object.entries(config)) {
  if (only && !only.includes(id)) continue;
  const files = await (local ? localFiles(id, src) : remoteFiles(id, src));
  if (!files || files.length === 0) {
    console.log(`sync: ${id}: no site/ folder${local ? ` in ${root}/${src.localDir}` : src.repo ? ` in ${src.repo} (or no access)` : ' (no repo configured)'}, kept hub copy`);
    continue;
  }
  console.log(`sync: ${id}: ${files.length} file(s) in site/`);

  const summary = files.find((f) => f.rel === 'summary.md');
  if (summary) {
    const text = (await summary.read()).toString('utf8');
    if (!text.startsWith('---\n')) console.warn(`sync: ${id}: site/summary.md has no frontmatter, skipped`);
    else await write(path.join(SUMMARY_DIR, `${id}.md`), text);
  }

  const pages = files.filter((f) => f.rel.startsWith('pages/'));
  if (pages.length > 0) {
    const target = path.join(PAGES_DIR, id);
    const keep = new Set();
    for (const f of pages) {
      if (f.size > MAX_BYTES) {
        console.warn(`sync: ${id}: site/${f.rel} is over 5 MB, skipped`);
        continue;
      }
      const rel = f.rel.slice('pages/'.length);
      if (rel.split('/').some((part) => part === '..' || part === '')) continue;
      keep.add(rel);
      const data = await f.read();
      if (data.length > MAX_BYTES) {
        console.warn(`sync: ${id}: site/${f.rel} is over 5 MB, skipped`);
        keep.delete(rel);
        continue;
      }
      await write(path.join(target, rel), data);
    }
    // Mirror: drop hub files the sub-project no longer has.
    let existing = [];
    try {
      existing = await walk(target);
    } catch {}
    for (const e of existing) {
      if (keep.has(e.rel)) continue;
      changed++;
      console.log(`sync:   ${dryRun ? 'would remove' : 'remove'} ${path.relative(HUB, path.join(target, e.rel))}`);
      if (!dryRun) await rm(path.join(target, e.rel));
    }
  }
}
console.log(`sync: ${changed} change(s)${dryRun ? ' (dry run)' : ''}.`);
