---
title: "Site health"
description: "Get a practical read on broken links, missing alt text, large images, old configuration and content gaps."
group: "Working in the app"
weight: 30
tags: [checks]
---

**Site Health** scans the built site and content for quality and maintenance issues. It reports findings but does not block publishing.

Open it with **⇧⌘H**, from the Dashboard's health card, from the Config page, the View menu or the command palette (⌘K).

{{< shot name="site-health" alt="HugoKit's Site Health sheet: a score out of 100, with warnings and info issues listed and tagged by category." >}}

## Build the site first

Health scans your site's `public/` folder, not your content. Links are checked against the pages Hugo actually produced, and the page count is the number of HTML files it wrote.

Build the site in the current session before using the score.

## What it checks

Nine checks run in parallel. Missing `title`, `date` and `draft` fields are reported separately, which produces the eleven rows below.

| Check | Severity | What it looks at |
|---|---|---|
| Broken internal links | Error | Every internal link in `public/` that points at a page Hugo didn't build |
| Images without alt text | Warning | Markdown images in `content/` with an empty alt |
| Large images | Warning | Anything over **500 KB** in `static/` or `assets/` |
| Deprecated config keys | Warning | Config keys Hugo has since renamed or dropped |
| No favicon | Warning | No favicon found in the built site |
| Build time regression | Warning | The latest build measured against the average of your recent builds |
| Missing `title` in front matter | Warning | Aggregated: one issue with a count and an example file |
| Missing `date` in front matter | Info | Aggregated the same way |
| Missing `draft` flag | Info | Aggregated the same way |
| High draft ratio | Info | A large share of your content is still `draft: true` |
| Stale search index | Info | A Pagefind index older than the pages it's supposed to cover |

Each missing front matter field produces one issue with a count and example file.

Every issue is tagged **CONTENT**, **PERF**, **A11Y** or **CONFIG**, so a long list still sorts into something you can act on.

## How the score works

The score starts at 100 and each issue takes points off:

| Severity | Cost |
|---|---|
| Error | 10 |
| Warning | 5 |
| Info | 2 |

It can't go below zero. The Dashboard's health card colours the last score green at 80 or above, then amber, then red.

The score is a summary of the current findings. Informational issues still reduce it even when you choose not to act on them.

## What it measures

Alongside the issues, health reports four numbers about the built site: **build time** (the last one), **page count**, **assets size** (everything in `public/`) and **search index size**, if the site has a Pagefind index.

## It doesn't fix anything

Site Health does not change files. The report is regenerated for each scan and is not stored between sessions.
