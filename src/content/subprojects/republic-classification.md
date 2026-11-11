---
title: republic-classification
tagline: What did the States General decide? Classifying the parts and outcomes of 600,000 resolutions.
group: republic
layers: [information]
stages: [1, 2]
status: active
repo: Data-Scopes/republic-classification
visibility: private
order: 11
---

A resolution of the States General follows a fixed pattern. First comes the matter put before the assembly, often a
letter, petition or report that came in (the *proposition*). Then comes a formula such as *Waerop gedelibereert zijnde*
("which having been deliberated"), and then the decision. That pattern is an administrative device in its own right:
the clerks used it to record decision-making in the same way, sitting after sitting, for two centuries.

republic-classification makes the pattern explicit and uses it. For every resolution from 1638 on, it:

- **splits the text** into proposition, formula and decision;
- **classifies the decision**: what the assembly did with the matter, such as referring it for advice, granting or
  refusing a request, or writing to someone;
- **classifies the parts of the proposition**: sender, type of document, date and place, summary, request, references
  to other documents and enclosures;
- **links resolutions to each other** where one refers to an earlier decision.

This makes it possible to count and compare how the assembly handled its business: which kinds of matters were decided
at once, which were sent to committees, and how that changed over time.

## The material

The resolutions of the States General (Nationaal Archief, archive 1.01.02), 1576–1796, as divided into resolutions by
[republic-segmentation](../republic-segmentation/). The classification covers the **616,128 resolutions from 1638
onward** (85% of the whole). Before 1638 the registers are too irregular for the current method.
