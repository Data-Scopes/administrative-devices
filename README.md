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
3. The site is served at **https://administrative-devices.org** (`public/CNAME`; defaults in `astro.config.mjs` and the
   workflow). DNS for the apex domain: `A` records to GitHub Pages' IPs (185.199.108.153, .109.153, .110.153, .111.153),
   optionally `AAAA` too, and a `CNAME` for `www` to `data-scopes.github.io`. Then Settings → Pages → Custom domain, and
   tick "Enforce HTTPS" once the certificate is issued. Verify the domain for the org (Org settings → Pages) to guard
   against takeover.
4. `administrative-devices.net` is forwarded to the `.org` at the registrar with an HTTP 301 redirect. GitHub Pages serves
   only one custom domain per site, so do not point the `.net` DNS at GitHub.
5. To serve without the domain instead, set the repository variables `SITE_URL=https://data-scopes.github.io` and
   `BASE_PATH=/administrative-devices`, and remove `public/CNAME`.
6. Optional: add the secret `SUBPROJECT_READ_TOKEN` (fine-grained PAT, read-only contents) to sync summaries from
   private sub-project repos at build time.

## Image credits

The scans in the communication images are from the Nationaal Archief, Staten-Generaal 1576–1796, archive 1.01.02,
inv. 3809. The Nationaal Archief waives copyright on scans that carry a download button and a Public Domain or CC0 mark
([terms](https://nationaalarchief.nl/research/gebruik-van-scans-van-fotos-kaarten-en-documenten)). Credit is not
required but is appreciated, in the form "Nationaal Archief, [archive], nummer archiefinventaris [n], inventarisnummer [n]".
Use the same form for any new NA scans, and check that each one carries the CC0/Public Domain mark.
