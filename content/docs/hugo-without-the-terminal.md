---
title: "Hugo without the terminal"
description: "A command-by-command map from the Hugo CLI to HugoKit – what each button actually runs, what it does that no command does, and the parts where the terminal is still the honest answer."
group: "Start"
weight: 20
tags: [basics]
---

Hugo is a command-line tool, and using it means knowing a handful of commands, a handful of flags, and which of them you need right now. That's a small amount of knowledge, and it's fine – until it isn't. Until you write once a month and have to relearn it every time. Until the flag you need is one you've never used. Until something goes wrong and the error is about Go template internals.

HugoKit runs the same Hugo binary you already have. Same commands, same files, same output – with the flags on buttons instead of in your memory. This page is the map.

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

Some of what HugoKit does has no command behind it, because Hugo doesn't do it:

**Preflight.** Before it publishes anything, HugoKit builds the site and then reads the result – the config, the `baseURL`, the assets that ended up in `public/`, your templates, the JavaScript in `static/`. It's the class of mistake that builds cleanly and breaks in production: a `baseURL` still pointing at localhost, a stylesheet referenced with an absolute path that 404s under a repository subpath, a key in `hugo.toml` that slid under `[params]` and stopped being read. Most of what it finds, it offers to fix, and every fix arrives as a diff you approve. See [Preflight](/docs/preflight/).

**Site health.** A score out of 100, and the list behind it: broken internal links, images with no alt text, images heavy enough to matter, config keys that have been dead for years, pages missing a title. See [Site health](/docs/site-health/).

**Template preview.** Render one layout file, on its own, against real content (`⇧⌘T`) – without hunting for a page that happens to use it. See [Themes and template preview](/docs/themes-and-template-preview/).

## Where the terminal is still the right answer

HugoKit is not a shell, and pretending otherwise would waste your time:

- **Git beyond publishing.** Branches, merges, history, anything that isn't *commit this build and push it*.
- **Anything scripted.** CI, cron, a build server – that's the CLI's job and it's good at it.
- **Hugo commands with no button.** `hugo list drafts`, `hugo config`, `hugo env`. Diagnostic one-liners; open a terminal, run one, close it.

## It doesn't own your files

Worth saying plainly, because most tools in this space don't work this way: HugoKit adds nothing to your project. No lock file, no manifest, no config of its own, no proprietary content model. It reads a Hugo site and runs Hugo against it.

Which means it sits beside whatever else you use. Write in Obsidian or iA Writer, edit templates in your editor of choice, let an AI agent rewrite half the layouts – HugoKit is watching the same folder, and the preview reloads on save. Delete the app and your site is exactly what it was: a folder of Markdown, a config file, and Hugo.

> New here? [Getting started](/docs/getting-started/) is the ten-minute version: install, add a site, start the server.
