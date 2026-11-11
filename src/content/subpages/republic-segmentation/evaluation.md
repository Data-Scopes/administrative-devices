---
title: Evaluation
description: How the segmentation is measured, on which hand-checked pages, and how well it does.
order: 20
---

Every change is measured on pages that were checked by hand. Some of those pages are used to build rules; others are
kept sealed and scored only once a round of changes is frozen. That keeps the reported figures honest: rules are not
tuned on the pages they are judged on.

## Gold sets

- **Checked pages:** 405 pages, 205 handwritten (137 volumes) and 200 printed (86 volumes).
- **Sitting starts marked by hand:** 69,216 in the handwritten registers.
- **Annotated samples of resolution starts:** several rounds, each drawn across the groups of volumes. The most recent
  (143 pages, 331 resolution starts) was sealed before the current rules were written.

## Measures

The main measure is the **F1 score for resolution starts at the exact line**. Precision is the share of predicted starts
that are right, recall the share of true starts that are found, and F1 combines the two. Further measures cover sitting
boundaries, contamination of the text by page headers, and whether every line is accounted for.

## Results (version 6, November 2026)

| What | Score |
|---|---|
| Resolution starts, handwritten, random sealed pages | F1 **0.924** (precision 0.963, recall 0.889) |
| … registers up to 1637 / 1638–1702 / secret registers | F1 0.829 / 0.970 / 1.000 |
| Resolution starts, printed volumes (test pages) | F1 **0.983** |
| Sitting starts, handwritten, held-out volumes (recall) | **0.974** |
| Sitting dates, printed, held-out volumes | F1 **0.986** |
| Lines accounted for | all |

**Where it is still weak:** resolution starts in the earliest handwritten registers, and above all in the French ones,
where it is not yet settled where a resolution should be taken to begin. These are the focus of the next rounds.
