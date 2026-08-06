---
title: "Hugo without the terminal"
description: "See which everyday Hugo commands have a control in HugoKit, and which jobs still belong in the terminal."
group: "Start"
weight: 20
tags: [basics]
---

Hugo's everyday jobs are controlled through commands and flags. HugoKit puts the common ones in a Mac app, while leaving the less common work in the terminal.

HugoKit runs the installed Hugo binary against the existing project files. The table below maps each control to its command.

## The map

| In the terminal | In HugoKit |
| --- | --- |
| `hugo new site my-site` | **Create New Site** (`⇧⌘N`) – blank, or from the HugoKit Starter |
| `cd ~/sites/my-site` | Pick the site in the sidebar. **Watch a Folder** finds them all at once |
| `hugo server` | **Start** – with the live log next to it |
| `hugo server --port 1314` | Each site keeps its own port, tested by binding it before it's offered |
| `hugo server --buildDrafts` | A toggle. The server restarts itself |
| `hugo server --buildFuture --buildExpired` | Two more toggles, same place |
| `hugo new content posts/my-post.md` | **New Content** – runs exactly that, archetype and all |
| open `hugo.toml` in an editor | **Config editor** – a form for the fields you change, a raw tab for everything else, and a diff before it writes |
| `hugo` | **Build** – or wait for preflight to do it |
| `hugo --gc --minify` before deploying | Part of publishing |
| `git add . && git commit && git push` | Part of publishing to GitHub Pages |
| `rsync -avz public/ user@host:/var/www/` | Part of publishing over SFTP |
| `hugo mod get -u` | Offered as a fix when the build says a module is missing |

## What isn't in the table

Some HugoKit features combine Hugo output with checks performed by the app:

**Preflight** builds the site and checks its configuration, `baseURL`, generated assets, templates and static JavaScript. Suggested fixes are shown as diffs and require approval. See [Preflight](/docs/preflight/).

**Site Health** reports a score and findings for internal links, alt text, image size, deprecated configuration and missing front matter. See [Site health](/docs/site-health/).

**Template Preview** renders a selected layout against a matching content page (`⇧⌘T`). See [Themes and template preview](/docs/themes-and-template-preview/).

## Tasks that still use the terminal

- **Git workflows:** branches, merges, history and repository maintenance.
- **Automation:** CI, scheduled builds and server-side scripts.
- **Other Hugo commands:** commands such as `hugo list drafts`, `hugo config` and `hugo env`.

## It doesn't own your files

HugoKit does not add a lock file, app configuration or proprietary content model to the project. It reads the existing Hugo site and runs Hugo against it.

Edit content and templates in any tool that works with the project folder. HugoKit watches those files and the preview reloads after a save. Removing the app does not change the project format.

> See [Getting started](/docs/getting-started/) for installation, adding a site and starting the server.
