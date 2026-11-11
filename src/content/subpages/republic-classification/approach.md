---
title: Approach
description: From formulas to labels, using rules that can be read, checked against samples, and extended with a learned model.
order: 20
---

The method starts from the clerks' own formulas. Formulaic language is regular enough to be found with rules, and the
rules can be read and checked, which matters when the results are used as historical evidence.

1. **Start from the segmented resolutions.** The input is the resolution layer of
   [republic-segmentation](../../republic-segmentation/), with line identifiers that stay stable between versions.
2. **Mine the formulas.** A fuzzy phrase search tolerates spelling variation and recognition errors. It finds the
   recurring formulas and arranges them into trees: the hinge between proposition and decision, and the branches that
   follow it.
3. **Split each resolution** at the hinge formula into proposition, formula and decision.
4. **Label the decisions with cue phrases.** A cue is kept only if at least 18 of 20 sampled matches read right.
5. **Extend with a learned model.** A language model for early modern Dutch is trained on the rule labels to catch
   wordings the rules miss. The published labels combine the two.
6. **Classify the parts of the proposition** with the same formula trees.

Throughout, a tenth of the resolutions is kept apart for testing, and individual errors are read, not just counted.

## Planned

- Templates for recurring kinds of business, and a test of how far decisions followed fixed routines.
- Classification of the topics of resolutions.
