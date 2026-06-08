---
title: "Faster drafting with the Content card"
date: 2026-04-13
summary: "Draft toggles, front-matter health checks, and quick-new content — how to keep writing without breaking the build."
category: "Workflow"
difficulty: "Intermediate"
readMinutes: 5
weight: 3
---

The Content card turns a pile of Markdown files into something you can
actually navigate — sorted by section, counted by status, and watched for
front-matter issues.

## Quick new post

Click the **+** in the Content card, pick a section (`posts`, `notes`, etc.),
and type a slug. HugoKit runs `hugo new` under the hood and opens the file in
your default Markdown editor.

## Draft toggle

The Server card has a **Drafts** switch. Flipping it rebuilds with
`--buildDrafts` so you can preview unpublished posts without editing any
config. Nothing gets deployed — draft status is respected at publish time.

## Front-matter health

When a post is missing a required field (title, date) or has malformed YAML,
the Content card flags it. Click the warning to see what's broken.
