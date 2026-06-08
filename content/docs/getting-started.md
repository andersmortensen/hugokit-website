---
title: "Getting started with HugoKit"
date: 2026-04-15
summary: "Add your first Hugo site, start the local server, and see live reload in action — without touching the terminal."
category: "Getting started"
difficulty: "Beginner"
readMinutes: 4
weight: 1
---

This guide walks you through adding your first Hugo site to HugoKit, starting
the local preview server, and publishing a change. No terminal required.

## Add a site

Click **Add site** in the site switcher (the sidebar icon top-left). Point
HugoKit at the folder containing your `hugo.toml`, and the site appears in the
list immediately.

## Start the server

Open the **Server** card and hit the play button. HugoKit starts Hugo in watch
mode, streams build output to the log panel, and opens `localhost:1313` in your
default browser. The green status dot means everything's running.

## Edit something

Save a change to any Markdown file — the preview reloads automatically. If
Hugo reports an error, the Server card turns pink and the first line of the
error surfaces under the title, so you know what broke without scrubbing the
log.

## Next steps

From here, [connect a deploy target](/docs/github-pages-setup/) to publish
your site, or [explore the content tools](/docs/content-workflow/) for faster
drafting.
