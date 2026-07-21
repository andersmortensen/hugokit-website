---
title: "Editing your config"
description: "Edit hugo.toml from HugoKit – a visual form for the fields you actually change, a raw text tab for everything else, and a diff you approve before anything is written."
group: "Working in the app"
weight: 10
tags: [config]
---

Your Hugo config is the file most likely to break a site, and the one you edit least often – so you never quite remember what the keys are called. HugoKit gives it a form, a raw editor, and one rule: nothing is written to disk until you've seen the diff.

## Two tabs, one file

The **Config** page opens your site's config file – TOML, YAML or JSON; the format is detected from the file, not assumed.

- **Structured** – a form, grouped into sections: **Basics**, **Build**, **Author**, **Params**, **Markup**, **Taxonomies**, **Main Menu** and **Additional Fields**. A pinned chip bar across the top jumps to a section.
- **Raw** – the file as text, for anything the form doesn't cover.

The two tabs are the same document. Switch between them and your edits follow – type a key in Raw, and it turns up in the form; change a field in the form, and it's in the raw text.

**Additional Fields** is where the keys HugoKit has no field for end up. They aren't hidden, and they aren't dropped on save.

## Nothing is written until you approve it

Edit anything and an amber **Edited** badge appears next to the title. That's the only thing that has happened so far – the file on disk is untouched.

**Save** doesn't save. It builds the new file contents and shows you a diff: every changed key, old value against new. Approve it, and *then* it's written. **Revert** throws the edits away and reloads the file as it is on disk.

That means a mistyped key costs you a glance, not a broken build.

And even an approved save has a way back: HugoKit snapshots the config as it was before writing, so the change can be undone from the site's **Snapshots** sheet. More on that in [Snapshots and undo](/docs/snapshots-and-undo/).

## When Hugo disagrees

If a build fails with a config error, the error is surfaced on the Config page rather than left in the log – so the message and the field it's complaining about are on the same screen.

## What HugoKit doesn't do

It doesn't reformat your file. Keys you never touched keep their place, their spelling and their comments – the diff only ever contains what you changed.
