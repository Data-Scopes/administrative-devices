---
title: republic-segmentation
tagline: Dividing 220 years of States General resolutions into sittings, resolutions and paragraphs.
group: republic
layers: [administrative, information]
stages: [2]
status: active
repo: Data-Scopes/republic-segmentation
visibility: private
order: 10
---

The resolution books of the States General of the Dutch Republic record the assembly's decisions sitting by sitting.
Each sitting opens with a date and an attendance list, and is followed by the resolutions taken that day, with notes in
the margin. The text runs on across columns, pages and scans. Text recognition gives us the lines but not this
structure.

republic-segmentation recovers it. Starting from the transcribed and line-classified pages of the
[REPUBLIC](https://republic.huygens.knaw.nl/) corpus, it divides every page into **sittings → resolutions →
paragraphs**. It keeps margin notes, attendance lists and page furniture (date headers, page numbers, catchwords)
apart, so that they don't break up the running text. It improves on the original REPUBLIC segmentation, and every change
is measured against hand-checked pages before it is kept.

## The material

- **445 volumes** of resolutions, handwritten and printed, from the Nationaal Archief (archives 1.01.02 and 1.10.94),
  plus two early volumes held by the KB, National Library of the Netherlands (1576–1578).
- About **25.4 million text lines**, in Dutch and, in some early registers, French.
- The results are measured separately for six groups of volumes, because the material changes over time: handwritten
  registers up to 1637, handwritten 1638–1702, the handwritten secret registers, and three groups of printed volumes
  (1704, 1705–1750 and 1751–1796).

## What comes out

A versioned dataset of every line, sitting, resolution, paragraph and margin note. The current version (November 2026)
has **120,720 sittings** and **794,257 resolutions**. Other parts of Administrative Devices build on it: the
classification of resolutions, the analysis of archival language, and the shared structure toolkit.
