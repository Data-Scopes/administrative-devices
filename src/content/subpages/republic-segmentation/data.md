---
title: Data
description: The segmentation dataset, its tables, its versions and its status.
order: 30
---

The segmentation is published as a **versioned dataset** in Parquet, partitioned by volume. Each version comes with a
description, a quality report, a manifest and checksums.

## Tables

| Table | Contents |
|---|---|
| `lines` | Every text line, with its text, position and type |
| `sessions` | Sittings, with date, weekday check and the group of volumes |
| `resolutions` | Resolutions within each sitting |
| `paragraphs` | Paragraphs within each resolution |
| `marginalia` | Margin notes, linked to the resolution next to them |
| id maps | From the original REPUBLIC ids and from the previous version to this one |

## Version 6 (9 November 2026)

- 25,439,324 lines
- 120,720 sittings
- 794,257 resolutions
- 1,494,857 paragraphs

Line ids and line texts are the same in every version; only the units and line types change.

## Availability

The dataset is shared within the project for now. Public release, with a DOI and a data description, is planned once
the segmentation of the handwritten registers has settled.
