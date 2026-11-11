# Administrative Devices — project website

The website of **Administrative Devices**, an Open eScience project (Netherlands eScience Center, 2026) on recovering the
organisational structure of digitised archives. The site is the hub that links the project's sub-projects.

Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages. Plan and decisions: [PLAN.md](PLAN.md).

## Working on the site

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run check      # type-check content and components
npm run sync       # pull site/summary.md from sub-project repos (optional, needs gh auth or GITHUB_TOKEN)
```

## Where things are

| Path | What |
|------|------|
| `src/pages/` | Home, About, Sub-projects (index + one page per entry), Team, 404 |
| `src/content/subprojects/*.md` | One file per sub-project: frontmatter (layers, stage, repo, docs URL) and summary text |
| `src/data/team.yaml`, `src/data/partners.yaml` | People and institutions |
| `src/data/layers.ts` | The three layers: names, colours, icons, objectives |
| `src/data/site.ts` | Site name, tagline, navigation, contact and period (TODOs) |
| `src/styles/global.css` | Design tokens (ink, paper, layer colours, Fraunces/Archivo) |
| `src/assets/icons/` | Marks and layer icons, copied from `archival-structures/design/identity-exploration/` |
| `src/assets/images/` | Communication images (flat vs structured, schematic) |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages |

## Adding a sub-project

Add `src/content/subprojects/<id>.md`:

```markdown
---
title: my-subproject
tagline: One sentence on what it does.
group: core            # core | republic
layers: [information]  # information | administrative | archival
stages: [1]
status: active         # active | planned | paused | done
repo: Data-Scopes/my-subproject
visibility: public     # private repos show "Not yet public"
docs: https://...      # optional: the sub-project's own documentation site
order: 20
---

Summary text in Markdown.
```

A sub-project can keep this file in its own repo as `site/summary.md`; `npm run sync` then copies it here.

## Deploying

1. Create the repo `Data-Scopes/administrative-devices` and push `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Without a custom domain, the site is served at `https://data-scopes.github.io/administrative-devices/`.
4. With a custom domain: add `public/CNAME` containing the domain, set the repository variables `SITE_URL=https://<domain>`
   and `BASE_PATH=/`, and set up DNS as described in GitHub's Pages documentation.
5. Optional: add the secret `SUBPROJECT_READ_TOKEN` (fine-grained PAT, read-only contents) to sync summaries from
   private sub-project repos at build time.

## Image credits

The scans in the communication images are from the Nationaal Archief, 1.01.02, inv. 3809.
TODO: check reuse terms before launch.
