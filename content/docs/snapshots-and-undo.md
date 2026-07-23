---
title: "Snapshots and undo"
description: "Before HugoKit writes to any file in your site, it keeps a copy – every change is recorded as a diff, and undo works per file or per operation."
group: "Working in the app"
weight: 15
tags: [safety]
---

HugoKit edits files that are yours – a config, a post, a template a preflight fix rewrites. The one mistake an app like this can't afford is changing your text and leaving you no way back. So it doesn't get the chance: before HugoKit writes to any file in your site, it snapshots the file as it was.

## When a snapshot is taken

Every write HugoKit makes goes through the same door. That covers all four places the app touches your files:

- **Preflight fixes** – every file an approved fix rewrites.
- **Config saves** – the config file, after you approve the diff.
- **Content saves** – a file saved from the Content page's Raw editor.
- **Theme changes** – the config write when you set a different theme.

If the snapshot can't be taken, the write doesn't happen. No copy, no change.

Note the boundary: snapshots cover what *HugoKit* writes. Edits you make in your own editor never pass through the app, so they're between you and your editor – and your git history.

## Where snapshots live

In HugoKit's own storage, under Application Support – never inside your project. Nothing new appears in your repository, so a snapshot can't be committed, pushed or published by accident.

## Every change is a diff

Alongside the copy, HugoKit records what actually changed – a per-file diff, captured at the moment of the write, so later edits don't muddy the history.

Open **Snapshots** from the site's **⋯** menu and each entry unfolds file by file: additions green, removals red. Long diffs are truncated in the view; **Copy Diff** always gives you the whole thing.

{{< shot name="snapshots" alt="The Snapshots sheet: a change unfolded file by file as a diff, additions in green and removals in red." >}}

## Undo works on two levels

- **Undo File** – restore a single file to how it was before that one write, and leave the rest of the operation alone.
- **Restore** – roll back everything a snapshot covers, behind a confirmation.

Either way, HugoKit takes a fresh snapshot of what it's about to overwrite *before* restoring – so an undo can itself be undone. There is no step off the ledge.

## Per-site settings

At the top of the Snapshots sheet, two controls, per site:

- **On or off.** Turn the layer off for a site and HugoKit writes straight through, no snapshots kept.
- **Versions per file.** Retention is counted per file, not per snapshot: a snapshot is only dropped once every file in it has newer versions than the limit. One file you save constantly can't flush out the only history of a file you touched once.

## What this is not

Not a replacement for git, and not a backup of your site – it's a safety net under the writes HugoKit itself makes. Your repository history is still the record of your project; snapshots are the guarantee that the app never made a change you can't read, and can't take back.
