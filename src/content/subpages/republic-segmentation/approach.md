---
title: Approach
description: How the pages are divided into sittings, resolutions and paragraphs, and why each unit is hard to find.
order: 10
---

## The units

| Unit | How it shows on the page | Why it is hard |
|---|---|---|
| **Sitting** | Opens with a date line, often with the name of the presiding deputy | Text recognition splits, fuses or misreads date lines. Headings such as *Eodem die* ("the same day") and *Post prandium* ("after the meal") look like a new sitting but are not. Sittings where nothing was done (*Nihil actum*) must still count. |
| **Attendance list** | The deputies present, after the opening | Easy to confuse with margin notes. We built a lexicon of member names to recognise them. |
| **Resolution** | One decision item, often opening with a formula | Handwritten registers have few visual cues. A decision formula such as *Is goetgevonden* ("it was decided") starts a resolution in some contexts and continues one in others. French openings vary more. |
| **Paragraph** | A subdivision of a resolution | Follows from layout and from the line before. |
| **Margin note** | Short notes in the margin column | Each must stay with the resolution next to it, not be pooled per sitting. |
| **Page furniture** | Page numbers, date headers, running heads, catchwords, stamps | Must be separated from the text without losing the dates that open sittings. Page numbers are often fused onto text lines. |

## The method

1. **Audit and baseline.** Measure the existing REPUBLIC segmentation first, including the lines it leaves out.
2. **Gold sets and metrics.** Hand-check pages from every group of volumes, and define the measures (below).
3. **Separate the date headers** from the running text.
4. **Compare two strategies** in a pilot: correcting the existing segmentation afterwards, or rebuilding it from the
   pages using the old boundaries as one source of evidence among several. The rebuild, which also uses a calendar
   matcher for dates and a decoder for the phrases that open sittings, did better and became the method.
5. **Improve in rounds.** Each round adds or changes rules on development pages, is frozen, and is then scored once on
   pages kept apart for testing.
6. **Use more evidence where it pays off:** the names of deputies, the position of lines on the page, and a reading of
   the scan image. A line-start classifier was also tried; it did not improve the results and was dropped.
7. **Publish a new version** of the dataset after each round.

## Principles

- **Every line is accounted for.** No text is lost between the input and the dataset.
- **Every sitting is a unit**, including sittings where nothing was decided.
- **The old labels are only used for scoring**, never as input, so improvements are not just copies of earlier output.
- **The reading order recorded in the transcription files is not trusted.** It is rebuilt from the page layout.
- **Stable identifiers.** Line ids and line texts stay the same across versions, and units that did not change keep
  their ids, with tables that map old ids to new ones.
