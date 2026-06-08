---
title: "Content"
summary: "Browse, count, and create Markdown content per site — with front-matter health surfaced inline."
group: "Core"
order: 30
symbol: "folder.fill"
---

The Content card gives you a structured overview of a site's Markdown
content: counts by status, a sectioned browser, and inline warnings for
front-matter issues.

## Counters

The card shows four counters when collapsed (subject to
**Settings → Appearance → Show card labels**):

- `{N} published` — posts with `draft: false` and a date in the past.
- `{N} drafts` — posts with `draft: true`.
- `{N} scheduled` — posts with a future date.
- `{N} expired` — posts with an `expiryDate` in the past.

Tapping any counter opens a filtered browse sheet.

## Quick new

The **+** button opens the New Content sheet. You pick a section
(`posts`, `notes`, etc.), enter a slug, and HugoKit runs `hugo new`
under the hood. The new file is opened in your default Markdown editor
once it's created on disk.

## Front-matter health

HugoKit parses every post's front matter at index time and flags:

- Missing required fields (`title`, `date`)
- Malformed YAML / TOML
- Unknown taxonomy values

Click the warning to see the specific file and line.

## Related

{{< doc-card "/docs/content-workflow/" >}}
