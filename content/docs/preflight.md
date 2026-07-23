---
title: "Preflight – what it checks and why"
description: "Before every publish, HugoKit builds your Hugo site and checks the config, baseURL, assets, templates and static JavaScript – then offers to fix what it finds, as a diff you approve."
group: "Publishing"
weight: 30
tags: [publishing, checks]
---

A Hugo site that builds perfectly on your Mac can still land broken on the web. The build isn't the thing that breaks – the *paths* are. Preflight runs before every publish and looks for exactly the failures that only show up once the site is live.

{{< shot name="preflight" alt="HugoKit's preflight report: the pre-publish checks, with a fix offered as a red and green diff to approve." >}}

## When it runs

Automatically, before every publish. If it finds nothing, the publish just continues. If it finds something, you get the report and decide what to do.

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

If the build fails, preflight stops there. Everything after step 1 reads the built site, and there's no point checking a `public/` folder that Hugo didn't finish writing.

**Steps 5 and 7 only run when your site deploys to a subpath** – `you.github.io/my-blog/` rather than the root of a domain. That's where absolute paths turn into 404s, and where the checks earn their keep.

## Errors block, warnings don't

Every issue is an **error**, a **warning** or **info**.

Errors stop the publish: *Errors must be resolved before publishing.* Warnings don't: *Warnings found – you can still publish.* Your call.

## Fixes are a diff you approve

Most of what preflight finds, it can fix. Press the fix button and you get a **Fix Preview**: the files that would change, line by line, red and green. Nothing is written until you press **Apply** – and after it's applied, preflight runs again from the top to confirm the issue is really gone.

Applied fixes also go through the app's snapshot layer: every file a fix touches is copied first, and the change can be undone – file by file or all at once. See [Snapshots and undo](/docs/snapshots-and-undo/).

What it can fix, and what the fix does:

| Finding | The fix |
|---|---|
| Hardcoded asset paths in templates | `src="/js/app.js"` becomes `src="{{ "js/app.js" \| relURL }}"` – Hugo then adds the subpath for you. |
| Dynamic paths missing `relURL` | Paths built inside templates (`printf "/img/%s.svg"`, `dict "url" "/thoughts/"`) get the same treatment. |
| Hardcoded paths in static JS | Injects `window.__basePath` into your head template, then rewrites `fetch('/index.json')` to go through it. Hugo doesn't process `static/`, so this is the only way. |
| `baseURL` missing, localhost, or wrong | Sets it to the URL the site actually deploys to. |
| Missing asset files | Removes the tags pointing at files that don't exist. |
| Raw HTML omitted from Markdown | Adds `ignoreLogs` for Goldmark's raw-HTML warning. |
| Actions workflow vs. `gh-pages` conflict | Removes the workflow and switches Pages to the branch you're actually pushing to. |

Some findings have no automatic fix. Those come with a hint instead of a button – preflight tells you what to change and where, rather than guessing.

## Why `relURL` and not just a path

Hugo's `relURL` ignores anything that starts with `/`. That's the whole trap:

| In your template | Output on `/my-blog/` |
|---|---|
| `{{ "/img/logo.svg" \| relURL }}` | `/img/logo.svg` – unchanged, and broken |
| `{{ "img/logo.svg" \| relURL }}` | `/my-blog/img/logo.svg` – correct |

So every fix strips the leading slash *before* piping through `relURL`. If you're fixing this by hand, that's the rule to remember.

## Preflight is not a link checker

It checks the paths your site *emits* – assets, templates, scripts. For broken links between your pages, word counts, front matter quality and a build trend, that's **Site Health** (`⇧⌘H`), which is a different tool with a different job.
