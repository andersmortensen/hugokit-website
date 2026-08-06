---
title: "X.Y.Z"
date: 2026-07-11
description: "Skabelon for release notes."
note: >
  A couple of personal lines: what this release is really about, and why it exists.
  Website only – this never shows in the in-app (Sparkle) view. Delete if a release
  doesn't need one.
draft: true
outputs: ['html', 'md', 'inapp']
weight: 10
---

<!-- SKABELON – kopiér til X.Y.Z.md ved release, fjern draft: true.
     Release bullets: describe one user-visible change per sentence. Keep implementation
     details and test evidence in the hidden release-evidence block. Available headings:
     `## New`, `## Improved`, `## Fixed`, `## Removed` and `## Notes`.
     URL'en bliver /changelog/X.Y.Z/ – linkes fra appcast'en (releaseNotesLink). -->

One factual sentence describing the main user-visible change.

## New

- **Feature name:** describe what changed and where the user finds it.

## Improved

- **Area:** describe the previous and new behaviour when the difference matters.

## Fixed

- Describe the user-visible symptom that no longer occurs.

## Removed

- Name the removed behaviour and its replacement, if any.

## Notes

- Requirements, known issues or required upgrade steps.
