---
title: "Preflight – what it checks and why"
description: "Catch broken paths, configuration and assets before they reach the published site."
group: "Publishing"
weight: 30
tags: [publishing, checks]
---

A local Hugo build can look fine and still break after deployment. Preflight checks the paths, configuration and assets before every publish.

{{< shot name="preflight" alt="HugoKit's preflight report: the pre-publish checks, with a fix offered as a red and green diff to approve." >}}

## When it runs

Preflight runs automatically before publishing. A clean report continues to the publish; findings open the report first.

You can also run it on its own with `⇧⌘P`.

## What it checks

| # | Step | Looks for |
|---|---|---|
| 1 | Hugo build | Does the site build at all? Errors and warnings are translated into plain language. |
| 2 | Config | Structural problems in `hugo.toml` – keys at the wrong level, empty sections. |
| 3 | baseURL | Missing, pointing at localhost, not matching where the site actually deploys, missing its trailing slash. |
| 4 | Assets | Every CSS, JS, font and image the built HTML asks for – is the file actually in `public/`? |
| 5 | Templates | Hardcoded absolute paths in your layouts and theme. |
| 6 | Deploy config | An Actions workflow that contradicts the publishing mode you chose. |
| 7 | Static JavaScript | Hardcoded paths inside JS files in `static/` – the files Hugo never processes. |

If the build fails, Preflight stops because the remaining checks require completed build output.

**Steps 5 and 7 run only for subpath deployments**, such as `you.github.io/my-blog/`, where root-relative paths can point outside the site.

## Errors block, warnings don't

Every issue is an **error**, a **warning** or **info**.

Errors must be resolved before publishing. Warnings are reported but do not block the publish.

## Fixes are a diff you approve

When a finding has an automatic fix, **Fix Preview** shows the affected files and line changes. **Apply** writes the approved change, then Preflight runs again.

Applied fixes also go through the app's snapshot layer: every file a fix touches is copied first, and the change can be undone – file by file or all at once. See [Snapshots and undo](/docs/snapshots-and-undo/).

What it can fix, and what the fix does:

| Finding | The fix |
|---|---|
| Hardcoded asset paths in templates | A leading slash – `/js/app.js` – becomes `{{ "js/app.js" \| relURL }}`, and Hugo adds the subpath for you. |
| Dynamic paths missing `relURL` | Paths built inside templates (`printf "/img/%s.svg"`, `dict "url" "/thoughts/"`) get the same treatment. |
| Hardcoded paths in static JS | Injects `window.__basePath` into your head template, then rewrites `fetch('/index.json')` to go through it. Hugo doesn't process `static/`, so this is the only way. |
| `baseURL` missing, localhost, or wrong | Sets it to the URL the site actually deploys to. |
| Missing asset files | Removes the tags pointing at files that don't exist. |
| Raw HTML omitted from Markdown | Adds `ignoreLogs` for Goldmark's raw-HTML warning. |
| Actions workflow vs. `gh-pages` conflict | Removes the workflow and switches Pages to the branch you're actually pushing to. |

Findings without an automatic fix include the file location and a suggested manual change.

## Why `relURL` and not just a path

Hugo's `relURL` ignores anything that starts with `/`. That's the whole trap:

| In your template | Output on `/my-blog/` |
|---|---|
| `{{ "/img/logo.svg" \| relURL }}` | `/img/logo.svg` – unchanged, and broken |
| `{{ "img/logo.svg" \| relURL }}` | `/my-blog/img/logo.svg` – correct |

So every fix strips the leading slash *before* piping through `relURL`. If you're fixing this by hand, that's the rule to remember.

## Preflight is not a link checker

It checks the paths your site *emits* – assets, templates, scripts. For broken links between your pages, word counts, front matter quality and a build trend, that's **Site Health** (`⇧⌘H`), which is a different tool with a different job.
