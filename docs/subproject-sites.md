# Sub-project sites

Each sub-project gets its own section of the hub site, at `https://administrative-devices.org/subprojects/<id>/`. The
pages are written in the sub-project's own repository, in a `site/` folder, and the hub copies them in when it builds.
The sub-project team owns its text; the hub owns the design, the navigation and the deploy.

Why this way (PLAN.md, D12): several sub-project repos are private, and on the org's free GitHub plan a private repo
cannot publish a Pages site of its own. The hub can still read them with a token. This also gives one domain, one
design and one deploy. A public package that needs generated API docs (e.g. Sphinx for archival-structures) can still
publish those separately, e.g. at `docs.administrative-devices.org`, and link to them with `docs:` in its summary.

## The `site/` folder

```
site/
  README.md          for the sub-project team; not published
  summary.md         overview page and the card on /subprojects/ (required)
  pages/
    approach.md      → /subprojects/<id>/approach/
    data.md          → /subprojects/<id>/data/
    img/figure.png   images used by the pages, referenced relatively: ![...](img/figure.png)
```

- **Everything in `site/` is public** once the hub deploys, even if the repo is private. Do not put internal decisions,
  agent instructions, local paths, unpublished numbers you don't want quoted, or personal data there.
- Pages are flat: one level of `.md` files in `pages/`. Images may sit in subfolders.
- Files over 5 MB are skipped. Prefer PNG/JPEG/WebP under 1 MB; the hub resizes and converts them.
- Write for historians, archivists and computer scientists outside the project. Short sentences, plain terms, explain
  abbreviations once.

### `summary.md`

The same fields as the hub's `src/content/subprojects/<id>.md` (the schema is in `src/content.config.ts`):

```markdown
---
title: republic-segmentation
tagline: One sentence on what it does.
group: republic            # core | republic
layers: [administrative]   # information | administrative | archival
stages: [2]                # 1 | 2 | 3 (proposal section 7b)
status: active             # active | planned | paused | done
repo: Data-Scopes/republic-segmentation
visibility: private        # private: the page says "Not yet public" instead of linking the code
docs: https://...          # optional, external documentation
order: 10
---

Two or three paragraphs: what it does, on which material, and what comes out.
```

### Pages

```markdown
---
title: Approach
description: One sentence, shown under the title and used for search engines.
nav: Approach   # optional short label for the sub-project menu
order: 10       # menu order
draft: false    # true: shown by `npm run dev` only, not on the public site
---
```

## Previewing

From the hub checkout, with the sub-project checked out next to it (`../<localDir>`, see `scripts/subprojects.json`):

```bash
npm run sync:local -- --only republic-segmentation
npm run dev
```

`sync:local` includes uncommitted work. The public site only uses what is pushed to the sub-project's default branch.

## Rebuilding the hub when `site/` changes

The hub rebuilds nightly and on every push to the hub. For an immediate rebuild, add this workflow to the sub-project
repo as `.github/workflows/notify-hub.yml`, with a secret `HUB_DISPATCH_TOKEN`: a fine-grained PAT for
`Data-Scopes/administrative-devices` with **Contents: read and write** (needed for `repository_dispatch`).

```yaml
name: Notify hub site
on:
  push:
    branches: [main]
    paths: ['site/**']
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -fsS -X POST \
            -H "Authorization: Bearer ${{ secrets.HUB_DISPATCH_TOKEN }}" \
            -H "Accept: application/vnd.github+json" \
            https://api.github.com/repos/Data-Scopes/administrative-devices/dispatches \
            -d '{"event_type":"subproject-site-updated","client_payload":{"repo":"${{ github.repository }}"}}'
```

## Adding a sub-project

1. Add its entry to `scripts/subprojects.json` (repo and local directory).
2. Add `src/content/subprojects/<id>.md` in the hub as a fallback, or let the first sync create it.
3. Give the sync token (`SUBPROJECT_READ_TOKEN`) read access to the repo if it is private.
