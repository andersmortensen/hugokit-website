---
title: "Snapshots and undo"
description: "See exactly what HugoKit changed and restore one file or the whole operation."
group: "Working in the app"
weight: 15
tags: [safety]
---

Before HugoKit changes a configuration, content file or template, it keeps a snapshot of the file as it is now.

## When a snapshot is taken

Snapshots cover the four places where HugoKit writes project files:

- **Preflight fixes** – every file an approved fix rewrites.
- **Config saves** – the config file, after you approve the diff.
- **Content saves** – a file saved from the Content page's Raw editor.
- **Theme changes** – the config write when you set a different theme.

If the snapshot fails, HugoKit does not write the file.

Note the boundary: snapshots cover what *HugoKit* writes. Edits you make in your own editor never pass through the app, so they're between you and your editor – and your git history.

## Where snapshots live

Snapshots are stored under HugoKit's Application Support directory, outside the project and repository.

## Every change is a diff

HugoKit records a per-file diff at the time of each write.

Open **Snapshots** from the site's **⋯** menu and each entry unfolds file by file: additions green, removals red. Long diffs are truncated in the view; **Copy Diff** always gives you the whole thing.

{{< shot name="snapshots" alt="The Snapshots sheet: a change unfolded file by file as a diff, additions in green and removals in red." >}}

## Undo works on two levels

- **Undo File** – restore a single file to how it was before that one write, and leave the rest of the operation alone.
- **Restore** – roll back everything a snapshot covers, behind a confirmation.

Before restoring, HugoKit snapshots the current file. A restore can therefore be reversed.

## Per-site settings

At the top of the Snapshots sheet, two controls, per site:

- **On or off.** Turn the layer off for a site and HugoKit writes straight through, no snapshots kept.
- **Versions per file.** Retention is counted per file. A snapshot is removed only when every file it contains has newer versions beyond the limit.

## What this is not

Snapshots cover only writes made by HugoKit. They do not replace Git history or a backup of the project.
