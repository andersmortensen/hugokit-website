---
title: "Getting started"
description: "Install HugoKit, add a Hugo site and start the server. Setup takes a few minutes, and you don't need the terminal for any of it."
group: "Start"
weight: 10
---

HugoKit is a Mac app that runs the Hugo you already use. It doesn't convert your site, doesn't move your files and doesn't need an account – it starts `hugo server`, checks the site before it ships, and publishes it.

## What you need

- A Mac running **macOS 26 (Tahoe) or later**.
- A Hugo site. If you don't have one, HugoKit can create it for you.
- Hugo itself is optional. If it isn't installed, HugoKit installs it during setup.

## Install the app

1. Download the DMG from [hugokit.com](/).
2. Open it and drag **HugoKit** into your Applications folder.
3. Launch it. The app is signed and notarised, so macOS opens it without the "unidentified developer" dialog.

## First launch

The setup wizard has four steps: **Welcome**, Hugo, **Add Your First Site**, and **You're All Set**. You can leave it at any point with `Esc`, and the middle steps have a **Skip Setup** link. To see it again later, choose **Help → Show Welcome Screen**.

### Hugo

HugoKit looks for a Hugo binary in these locations, in order:

```
/opt/homebrew/bin/hugo
/usr/local/bin/hugo
~/.local/bin/hugo
/usr/bin/hugo
/home/linuxbrew/.linuxbrew/bin/hugo
```

If none of them is there, it falls back to `which hugo`. When Hugo is found, the step shows the version and moves on.

When it isn't, you get two options:

- **Install Hugo** – if Homebrew is installed, HugoKit runs `brew install hugo`. If it isn't, HugoKit downloads the latest **Hugo extended** release from GitHub and installs it to `~/.local/bin/hugo`.
- **I'll install it myself** – the step shows the `brew install hugo` command and a link to Hugo's own installation page, plus a **Retry Detection** button.

Hugo extended is the build that can compile SCSS. Many themes need it, which is why HugoKit installs that variant.

### Add your first site

The third step offers three ways in, and they're the same three you'll use later from the **File** menu or the sidebar:

- **Open Existing** – pick a folder that already holds a Hugo site (`⌘O`).
- **Create New** – scaffold a fresh one (`⇧⌘N`).
- **Watch Folder** – point HugoKit at a folder of projects and let it find the sites itself.

You can add and remove sites at any time; nothing is locked in.

## What counts as a Hugo site

When you open a folder, HugoKit checks it for a configuration file – any one of these, or a `config/` directory:

```
hugo.toml    hugo.yaml    hugo.yml    hugo.json
config.toml  config.yaml  config.yml  config.json
```

Without one, the folder is rejected. With one, HugoKit also looks for at least one of `content/`, `layouts/`, `themes/`, `archetypes/` and `static/`. If the config is there but none of those folders are, the site is added with a "Config found, but looks incomplete" warning rather than being turned away.

## Watch a folder

If you keep your projects in one place – say `~/Developer` – **Watch a Folder** is quicker than adding sites one by one. HugoKit scans up to three levels deep, adds every folder that holds a Hugo config, and skips the ones that never contain a site of their own: `public`, `resources`, `themes`, `archetypes`, `.git`, `node_modules`, `.build` and `vendor`.

The folder is rescanned when the app starts, so a site you create later shows up on its own. You can also rescan on demand from **Settings**.

## Create a new site

**Create New Site** (`⇧⌘N`) asks for a name and a location, and gives you two templates:

- **HugoKit Starter** – a complete, working site: a home page, a 404 page, `robots.txt`, a sitemap, an RSS feed, an SEO partial, light and dark mode. You choose what else comes along: a blog with sample posts, a projects section, an about page, a theme toggle and tags. It's TOML-only, and it needs **Hugo 0.146 or newer** – on an older Hugo the option is disabled and the app says so.
- **Blank** – the plain output of `hugo new site`, with a small welcome page. Here you can also pick the config format.

Both templates can initialise a git repository, open the site when it's done and start the local server right away.

## Start the server

Select the site and hit **Start Server** in the toolbar. The first site gets port **1313**; every site you add after that gets the next port that's actually free, so two sites can run side by side.

The server settings hold the flags you'd otherwise have to remember:

| Setting | Hugo flag |
|---|---|
| Include drafts | `--buildDrafts` |
| Include future content | `--buildFuture` |
| Include expired content | `--buildExpired` |
| Open browser on start | – |

Change any of them – or the port – while the server is running, and HugoKit restarts it for you. The exact command is written to the log before it runs. More in [Running the server](/docs/running-the-server/).

## Publish

Open **Deploy** and add a deploy target. There are two kinds:

- **GitHub Pages** – connect your GitHub account and pick one of your repositories. HugoKit points the folder at it and turns Pages on; you choose whether Hugo builds in the cloud (GitHub Actions) or locally on your Mac.
- **FTP / SFTP** – host, port, user, remote path. SFTP is the default; plain FTP is there for hosts that still need it. The wizard finishes with a real login test, and the password goes into the macOS Keychain.

A site can have several targets at once – production and staging, or GitHub Pages plus a copy to your own host. Each one publishes on its own, and a target you're not using can be paused rather than removed.

Every publish runs [preflight](/docs/preflight/) first: it builds the site, then checks the config, the `baseURL`, the assets in `public/`, your templates and any JavaScript in `static/`. Most of what it finds, it can fix – and each fix is shown as a diff you approve before anything is written. Errors block the publish; warnings don't. Once a target is set up, publishing is `⌘P`.

The full walkthroughs: [Publishing to GitHub Pages](/docs/publishing-to-github-pages/) · [Publishing over SFTP](/docs/publishing-over-sftp/).

## Your content

The **Content** page counts what's in the site – pages, sections, words and images – and lists the files. Open one and you get a preview, plus a **Raw** tab: a plain monospaced editor with an explicit **Save** (`⌘S`), a line count and an *edited* marker while you have unsaved changes. Close it with changes pending and HugoKit asks first.

It's for a typo, a front matter field, a date. Real writing stays in your own editor – there's an **Open in editor** button one click away, and the dev server reloads on save either way.

## Outside the window

HugoKit doesn't need its window open to be useful.

- **Menu bar icon** – every site, its status, and start/stop without opening the window. The status dot follows the server: green running, amber busy, red failed, grey idle. Turn it off in **Settings → General**.
- **Notifications** – native macOS notifications for six events, each with its own toggle in **Settings → Notifications**: server started, server stopped unexpectedly, build succeeded, build failed, publish succeeded, publish failed. If you've denied notification permission, HugoKit says so and links straight to System Settings.

## Hugo Reference

`⌘2` opens a searchable copy of Hugo's reference material inside the app: **195 entries** across twelve categories – functions, methods, page and site variables, templates, partials, shortcodes, front matter, config, content, build and performance. It's there so a forgotten function name doesn't cost you a browser tab.

## Shortcuts worth knowing

| Shortcut | Action |
|---|---|
| `⌘O` | Open an existing site |
| `⇧⌘N` | Create a new site |
| `⌘P` | Publish |
| `⇧⌘P` | Run preflight and show the report |
| `⌘D` | Go to Deploy |
| `⇧⌘H` | Site Health |
| `⇧⌘T` | Template Preview |
| `⌘2` | Hugo Reference |
| `⌘,` | Settings |
