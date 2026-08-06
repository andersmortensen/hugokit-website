---
title: "Editing your config"
description: "Edit TOML, YAML or JSON as fields or raw text, with a diff before HugoKit saves anything."
group: "Working in the app"
weight: 10
tags: [config]
---

Open the Hugo configuration as structured fields or raw text. Whichever view you use, HugoKit shows a diff and waits for approval before saving.

## Two tabs, one file

The **Config** page opens your site's config file – TOML, YAML or JSON; the format is detected from the file, not assumed.

- **Structured** – a form, grouped into sections: **Basics**, **Build**, **Author**, **Params**, **Markup**, **Taxonomies**, **Main Menu** and **Additional Fields**. A pinned chip bar across the top jumps to a section.
- **Raw** – the file as text, for anything the form doesn't cover.

The two tabs are the same document. Switch between them and your edits follow – type a key in Raw, and it turns up in the form; change a field in the form, and it's in the raw text.

**Additional Fields** is where the keys HugoKit has no field for end up. They aren't hidden, and they aren't dropped on save.

## Review before saving

Editing shows an amber **Edited** badge. The file on disk remains unchanged until the diff is approved.

**Save** prepares the new file and opens a diff of the changed keys. Approving the diff writes the file. **Revert** discards the edits and reloads the current file from disk.

{{< shot name="config-diff" alt="The Config editor's Review Changes diff: a changed key shown old value against new before anything is written to disk." h="776" >}}

HugoKit snapshots the configuration before writing it. The change can be restored from **Snapshots**; see [Snapshots and undo](/docs/snapshots-and-undo/).

## When Hugo disagrees

If a build fails with a config error, the error is surfaced on the Config page rather than left in the log – so the message and the field it's complaining about are on the same screen.

## What HugoKit doesn't do

It doesn't reformat your file. Keys you never touched keep their place, their spelling and their comments – the diff only ever contains what you changed.
