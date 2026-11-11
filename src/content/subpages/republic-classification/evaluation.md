---
title: Evaluation
description: How well the segmentation of resolutions and the action labels work, and where they fall short.
order: 30
---

Each step is scored on a fresh sample that was drawn across all periods and labelled blind, without seeing the
system's output. The samples were labelled by independent language-model annotators, and part of each sample was
checked by a researcher. Figures are given with 95% intervals where available.

## Splitting resolutions into proposition, formula and decision

| Period | F1 |
|---|---|
| From 1638 | **0.977** (0.957–0.993); precision 0.985, recall 0.970 |
| Before 1638 | 0.632 (0.543–0.720) |

From 1638 the split is reliable in every period. Before 1638 the method misses about half of the boundaries, so the
classification starts at 1638.

## Action labels

On a sample of 180 items, the published labels reach precision **0.89**, recall **0.69** and F1 **0.78**, weighted to
the whole corpus (unweighted: 0.80 / 0.69 / 0.74). That is below the target we set (F1 0.85 in every period). The
labels are mostly right when given; the shortfall is in recall, decisions worded in ways the cues and model don't yet
recognise.

## Parts of the proposition

On 180 propositions (1,044 clauses), the common functions are found well: for example, summary (precision 0.89,
recall 0.92) and opening (0.96, 0.84). References to other documents and enclosures are found much less often
(recall 0.45 and 0.37) and are the next focus.

## Links between resolutions

A first version of the linker between resolutions is right in 95 of 100 checked links, and finds about 70% of them.

*Figures as of early November 2026, measured on the previous resolution layer. They will be updated after the move to
the current segmentation.*
