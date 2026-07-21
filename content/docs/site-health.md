---
title: "Site health"
description: "A score out of 100 for a Hugo site: broken links, missing alt text, oversized images, deprecated config, front matter gaps and build regressions – with the issues listed out."
group: "Working in the app"
weight: 30
tags: [checks]
---

Preflight runs before a publish and blocks the things that break a deployed site. **Site health** is the other half: it doesn't block anything, and it tells you what the site is like to *read* – broken links, images without alt text, a config key Hugo deprecated two versions ago.

Open it with **⇧⌘H**, from the Dashboard's health card, from the Config page, the View menu or the command palette (⌘K).

## Build the site first

Health scans your site's `public/` folder, not your content. Links are checked against the pages Hugo actually produced, and the page count is the number of HTML files it wrote.

If you haven't built the site in this session, build it before you read too much into the score.

## What it checks

Nine checks run in parallel. The front matter one can raise up to three separate issues, so the list below is eleven rows long:

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

The front matter checks are deliberately aggregated per field: a library with 200 posts and no `date` costs you one issue, not two hundred.

Every issue is tagged **CONTENT**, **PERF**, **A11Y** or **CONFIG**, so a long list still sorts into something you can act on.

## How the score works

The score starts at 100 and each issue takes points off:

| Severity | Cost |
|---|---|
| Error | 10 |
| Warning | 5 |
| Info | 2 |

It can't go below zero. The Dashboard's health card colours the last score green at 80 or above, then amber, then red.

The score is a prompt, not a grade. An info issue you've decided you don't care about – a high draft ratio, say, because you write in the open – costs two points forever, and that's fine.

## What it measures

Alongside the issues, health reports four numbers about the built site: **build time** (the last one), **page count**, **assets size** (everything in `public/`) and **search index size**, if the site has a Pagefind index.

## It doesn't fix anything

Preflight offers fixes as a diff you approve. Health doesn't: it points, you decide. The report is regenerated each time you scan and isn't kept between sessions.
