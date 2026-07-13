---
title: "Running the server"
description: "Start Hugo's development server from HugoKit: ports, drafts, the live log, and what to do when the port is already taken."
group: "Running Hugo"
weight: 10
---

HugoKit runs the same `hugo server` you'd run in a terminal. It just remembers the flags, picks a free port, and turns Hugo's output into something you can read.

## Start and stop

Select the site and use **Start Server** in the toolbar; it becomes **Stop Server** while the server runs. The **Server** page has the same actions, plus **Restart**.

The exact command is written to the log before it runs, so you can always see what HugoKit asked Hugo to do:

```
– Starting hugo server…
  hugo server --port 1313 --baseURL http://localhost:1313/ --buildDrafts
```

HugoKit always overrides `--baseURL` with `http://localhost:<port>/` for the local preview. Your site's real `baseURL` in `hugo.toml` is left alone – it's what gets used when you publish.

## Ports

The first site gets port **1313**. Every site you add after that gets the next port that is actually free – HugoKit tries to bind the port before offering it, so two sites can run side by side without you thinking about it.

If the port you've chosen is taken, the Server page says so before you start:

| Warning | What it means |
|---|---|
| `Port 1313 is also used by "my-site"` | Another site in HugoKit has the same port. Change one of them. |
| `Port 1313 is already in use by another process` | Something outside HugoKit holds the port – often a `hugo server` you started in a terminal. |

The warning doesn't stop you from starting. If Hugo then fails with *address already in use*, HugoKit looks for the server that's already running on that port and attaches to it instead of fighting it:

```
– Port 1313 is already in use – looking for existing server…
✓ Attached to Hugo server – port 1313, PID 4711
```

It only adopts a server whose project folder matches a site you've added. An unrelated Hugo server is left alone and noted in the log.

## Drafts, future and expired content

Four toggles on the Server page cover the flags you'd otherwise have to remember:

| Setting | Flag it adds |
|---|---|
| Include drafts | `--buildDrafts` |
| Include future content | `--buildFuture` |
| Include expired content | `--buildExpired` |
| Open browser on start | – |

Change any of them – or the port – while the server is running, and HugoKit restarts it for you.

Draft counts elsewhere in the app come from `hugo list drafts`, so they match what Hugo itself thinks is a draft.

## The log

Hugo's output is parsed rather than dumped. Each line becomes an event with a time, a severity colour and a summary you can scan: `Server running`, `File changed – rebuilding`, `Build complete (430 ms) · 78 pages · 12 static files`. Errors and warnings keep their file references (`layouts/index.html:14:3`).

The log page has **Copy**, **Export** (saves it as a file) and **Clear**.

## LiveReload

LiveReload is Hugo's own, and HugoKit leaves it on – it never passes `--disableLiveReload`. If the browser isn't reloading when you save, the log tells you which half is broken: see [LiveReload isn't reloading](/docs/hugo-livereload-not-reloading/).

## Clearing things

Two actions on the Server page, and they do different things:

- **Clear Cache** runs `hugo mod clean --all` – Hugo's own module cache. Nothing in your project is deleted.
- **Clean public/** deletes the `public/` folder. HugoKit refuses to do it while the server is running, and says why: Hugo serves pages from disk, so the site would 404 until the next rebuild. Stop the server first.

## Getting to your files

- **Open in Browser** – opens the running site. Available while the server runs.
- **Reveal in Finder** – shows the project folder in Finder.
- **Open Public Folder** (File menu) – opens `public/`, the built site.
