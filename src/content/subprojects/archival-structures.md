---
title: archival-structures
tagline: Shared library and ground-truth store for the structure of digitised inventories.
group: core
layers: [information, administrative]
stages: [1, 2]
status: active
repo: Data-Scopes/archival-structures
visibility: public
order: 1
---

An archival inventory number is an ordered sequence of scans, not a bag of separate images. It has recurring page
layouts, document conventions and transitions. `archival-structures` makes that structure explicit, starting from
scan images and their PageXML transcriptions:

- detect and split two-page openings, so books can be analysed page by page;
- cluster pages by layout to build a vocabulary of recurring page types for each inventory;
- detect structural whitespace and blank pages that mark likely boundaries;
- cluster text lines into body text, headings, marginalia, catchwords and other line types;
- mine the sequence of page types to find where document elements begin and end, including across page breaks;
- work from images alone, using visual embeddings, when transcriptions are missing or not yet trusted.

The repository also holds the project's shared ground truth.
