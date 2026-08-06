---
title: "Getting started"
description: "Bring an existing Hugo site into HugoKit, or create a new one, and get the local server running."
group: "Start"
weight: 10
tags: [basics]
---

HugoKit works with the Hugo projects already on your Mac. Add one, start the development server and keep using the editor you already know.

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

HugoKit uses the same executable resolver for onboarding, builds, preflight,
publishing and automatic fixes. It looks in these locations, in order:

```
/opt/homebrew/bin/hugo
/usr/local/bin/hugo
/usr/bin/hugo
/home/linuxbrew/.linuxbrew/bin/hugo
~/.local/bin/hugo
```

If none of them is there, it falls back to `which hugo`. When Hugo is found,
the step shows the version and moves on. That same resolved path is then used
by builds, preflight, publishing and Hugo error fixes.

When it isn't, you get two options:

- **Install Hugo** – if Homebrew is installed, HugoKit runs `brew install hugo`. If it isn't, HugoKit downloads the latest **Hugo extended** release from GitHub, verifies its release checksum and `hugo version`, then installs it to `~/.local/bin/hugo` through a staged atomic replacement. A failed or interrupted download leaves an existing Hugo binary in place.
- **I'll install it myself** – the step shows the `brew install hugo` command and a link to Hugo's own installation page, plus a **Retry Detection** button.

Hugo extended is the build that can compile SCSS. Many themes need it, which is why HugoKit installs that variant.

### Add your first site

The setup step, **File** menu and sidebar offer the same four ways to add a site:

- **Open Existing** – pick a folder that already holds a Hugo site (`⌘O`).
- **Create New** – scaffold a fresh one (`⇧⌘N`).
- **From a Git URL** – paste a repository and HugoKit clones it and adds it in one step.
- **Watch Folder** – point HugoKit at a folder of projects and let it find the sites itself.

Sites can be added or removed at any time. Removing a site from HugoKit does not delete its folder.

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

- **HugoKit Starter** – creates a home page, 404 page, `robots.txt`, sitemap, RSS feed, SEO partial and light/dark styles. Optional sections include a sample blog, projects, about page, theme toggle and tags. The template uses TOML and requires Hugo 0.146 or newer.
- **Blank** – the plain output of `hugo new site`, with a small welcome page. Here you can also pick the config format.

Both templates can initialise a git repository, open the site when it's done and start the local server right away.

## Add a site from a Git URL

**From a Git URL** accepts a repository URL, clones it into the selected folder and adds the resulting site.

- The name comes from the repository, and it's cloned into a folder of that name under the location you pick.
- A public repository clones with no sign-in. For a private GitHub repository, [connect GitHub](/docs/publishing-to-github-pages/#connect-github) first and HugoKit uses that token – and it's only ever sent to `github.com` URLs, never to any other host.
- The result is a regular repository folder on your Mac. If no complete Hugo structure is found, HugoKit adds it with the same warning used by **Open Existing**.

## Start the server

Select the site and choose **Start Server**. The first site uses port **1313**; later sites use the next port HugoKit can bind.

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

A site can have several targets at once – production and staging, or GitHub Pages plus a copy to your own host. Each target publishes on its own and shows its own status; with two or more active targets, **Publish to All Targets** sends the site to every one of them. A target you're not using can be paused rather than removed.

Every publish runs [Preflight](/docs/preflight/) first. It builds the site and checks its configuration, `baseURL`, generated assets, templates and static JavaScript. Errors block publishing; warnings do not. Suggested fixes require approval.

The full walkthroughs: [Publishing to GitHub Pages](/docs/publishing-to-github-pages/) · [Publishing over SFTP](/docs/publishing-over-sftp/).

## Your content

The **Content** page lists pages, sections, words and images. Opening a file shows its preview, front matter and a **Raw** text editor with **Save** (`⌘S`), line count and unsaved-change state.

Use **Open in editor** for longer writing or template work. The development server reloads when either editor saves the file.

Saves from HugoKit go through the app's snapshot layer: the file as it was is kept, and the change can be undone from the site's **Snapshots** sheet. See [Snapshots and undo](/docs/snapshots-and-undo/).

## Outside the window

Closing the main window leaves HugoKit running in the menu bar.

- **Menu bar icon** – every site, its status, and start/stop without opening the window. The status dot follows the server: green running, amber busy, red failed, grey idle. Turn it off in **Settings → General**.
- **Notifications** – native macOS notifications for six events, each with its own toggle in **Settings → Notifications**: server started, server stopped unexpectedly, build succeeded, build failed, publish succeeded, publish failed. If you've denied notification permission, HugoKit says so and links straight to System Settings.

## Hugo Reference

`⌘2` opens 195 searchable Hugo reference entries across twelve categories, including functions, methods, variables, templates, front matter, configuration, content and builds.

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
