# Administrative Devices — project website plan

Drafted 2026-11-11. This file records the plan and its decisions; update the Decisions table when one changes.

## Purpose

The website is the public backbone of the Administrative Devices project (Open eScience Call 2026). It must:

1. explain the research idea to historians, archivists and computer scientists: the three layers of archival
   structure, the stages, the use cases;
2. act as the hub that links every sub-project, with a summary page on the hub and the full documentation on
   that sub-project's own site;
3. present the team and partners;
4. later carry news, publications, datasets, workshops and teaching (from proposal section 7c).

## Decisions

| #  | Decision | Choice | Notes |
|----|----------|--------|-------|
| D1 | Generator | **Astro** (static output) | Content collections for sub-projects; full design control. |
| D2 | Hosting | **GitHub Pages**, repo `Data-Scopes/administrative-devices`, deployed by GitHub Actions | Public repo. |
| D3 | Domain | **administrative-devices.org**; `administrative-devices.net` 301-forwards to it at the registrar | Decided 2026-11-11. Set in `public/CNAME`, `astro.config.mjs` and the workflow. Option A/B/C for sub-sites is still open (below); the scaffold follows A. |
| D10 | Repo visibility | **Private until launch** | Decided 2026-11-11. The org is on the free plan, so Pages only works once the repo is public; until then the deploy job fails on each push (the build passes). |
| D11 | Scan reuse | **Nationaal Archief scans are CC0** when they carry a download button and a CC0/Public Domain mark | [NA terms](https://nationaalarchief.nl/research/gebruik-van-scans-van-fotos-kaarten-en-documenten). Credit not required; we give one anyway: "Nationaal Archief, [archive], [archive no.], inv. [no.]". Other archives' scans need their own check. |
| D4 | Language | **English only** | No i18n routing. Adding it later in Astro is a contained change. |
| D5 | Sub-projects shown | **Core toolkit** (archival-structures, archival-language/LotA, formulation) and **REPUBLIC case** (republic-segmentation, -classification, -letter-segmentation, republic_ner_matching) | NAMA and VOC start pages are left out for now. They can be added later as one Markdown file each. |
| D6 | Hub ↔ sub-project docs | **Mix**: the hub renders a summary page per sub-project; full docs live on the sub-project's own site | The summary is hand-written in the hub, or synced from the repo (below). |
| D7 | Primary mark | **Index Tab** (provisional) | The favicon and header logo are a single SVG and can be swapped in one place. |
| D8 | Identity | Ink `#21262B`, paper `#F7F4EC`, Fraunces (display), Archivo (body); layer colours teal / steel blue / terracotta | From `archival-structures/design/identity-exploration/notes.md`. Fonts are self-hosted (no Google Fonts requests). |
| D9 | First sections | Home, About (research idea, 3 layers, stages, use cases), Sub-projects, Team & partners | News and outputs come in phase 3. |

## Site map (v1)

```
/                      Home: hero (flat vs structured image), one-paragraph pitch, the 3 layers, sub-project cards
/about/                Research idea, problem, research question, 3 layers ↔ objectives, stages 1–3, use cases
/subprojects/          All sub-projects, grouped (Core toolkit / REPUBLIC case), filterable by layer and stage
/subprojects/<id>/     Summary page per sub-project: what it does, layer(s), stage, status, links (repo, docs, data)
/team/                 People and partner institutions
/404
```

Phase 3 additions: `/news/` (Markdown posts), `/outputs/` (publications, datasets, software releases, with DOIs),
`/events/` (workshops, teaching).

## Content model

- `src/content/subprojects/<id>.md`: one file per sub-project. Frontmatter fields: `title`, `tagline`, `group`
  (`core` | `republic`), `layers` (subset of `information` | `administrative` | `archival`), `stages` (1–3), `status`
  (`active` | `planned` | `paused` | `done`), `repo`, `visibility` (`public` | `private`), `docs` (URL of full
  docs, optional), `order`. The body is the summary text.
- `src/data/team.yaml` and `src/data/partners.yaml`.
- `src/data/layers.ts`: the three layers (name, colour, icon, objective). Pages and badges use these so the
  layer colours stay consistent.

### Summaries synced from sub-project repos (the "mix")

A sub-project repo may hold `site/summary.md`, with the same frontmatter and body as the hub file.
`npm run sync` (`scripts/sync-subprojects.mjs`) fetches that file from each repo through the GitHub API and
overwrites the hub copy. Repos without the file keep the hub's hand-written summary. A sub-project team can then
keep its own summary current without editing the hub.

- Private repos (archival-language, republic-segmentation, republic-classification) need a token. In CI that
  is a fine-grained PAT with read access to repository contents, stored as the secret `SUBPROJECT_READ_TOKEN`.
  If the secret is missing, sync is skipped and the committed summaries are used.
- Syncing is opt-in: the deploy workflow runs it only when the secret exists. Run it locally with `gh auth`.

## Domain and sub-sites

A GitHub Pages limitation to decide on: sub-project Pages sites appear under the custom domain
(`<domain>/<repo>/`) **only if the custom domain is set on the organisation's root site** (a repo named
`Data-Scopes.github.io`). If the custom domain is set on this project repo instead, the hub is at `<domain>/`
and sub-project sites stay at `data-scopes.github.io/<repo>/`.

The Data-Scopes org is broader than this project: it already has a "main project website" at
`data-scopes.github.io/Data-Scopes/`, and repos dating back to 2018. Options:

- **A (default in the scaffold):** set the domain on this repo. Sub-project docs live at `data-scopes.github.io/<repo>/`
  and the hub links to them. This is simple and leaves the org's other sites alone.
- **B:** make this site the org root (`Data-Scopes.github.io`) with the custom domain, so every Data-Scopes
  Pages site moves under it. This only makes sense if the domain is meant for all of Data Scopes.
- **C:** use a subdomain per sub-project (`docs.<domain>` etc.) via each repo's own CNAME. Clean URLs, but more
  DNS records to maintain.

Private repos can only publish Pages sites on a paid GitHub plan. For archival-language, republic-segmentation and
republic-classification, the hub summary is the only public page until they go public.

## Phases

1. **Scaffold** (this session): Astro project, design tokens, layout, the four sections with draft content from the
   proposal, sub-project collection, deploy workflow, sync script.
2. **Launch**: check the draft texts and team affiliations, make the repo public, enable Pages
   (Settings → Pages → Source: GitHub Actions), configure DNS for `.org` and the `.net` forward (README, "Deploying"),
   verify the domain for the org, enforce HTTPS. Done already: domain chosen, repo created (private), scan reuse
   terms checked (D11).
3. **Grow**: news, outputs (Zenodo DOIs), events; `site/summary.md` in each sub-project repo; Sphinx/MkDocs Pages sites
   for public sub-projects (archival-structures first, since it already has Sphinx docs), linked via `docs:`.
4. **Later**: possibly a Dutch version, pages per use-case archive (NIOD, Amsterdam City Archives, National
   Archives), interactive demos (e.g. a scan viewer showing recovered structure).

## Open questions

- Option A, B or C above (the domain itself is settled, D3).
- Team: roles and affiliations for everyone (marked `TODO` in `src/data/team.yaml`); the two eScience RSEs.
- Project start date and duration (the announcement draft is missing these too).
- Contact address for the site footer.
- Final primary mark (D7).
- Hero image: the drafts are upscaled from 959 px exports. A sharp re-export (≥1,920 px) would help.
