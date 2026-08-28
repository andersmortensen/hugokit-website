---
title: "Your first Hugo site"
description: "Start with nothing installed: get the app, let it install Hugo, create a site and see it running in your browser."
group: "Start"
weight: 5
tags: [basics]
---

This guide assumes a Mac running **macOS 26 (Tahoe) or later** and nothing else. Hugo gets installed along the way, and every step happens in the app. At the end you have a site running on your own machine with a post you wrote in it. Putting it on the web is a separate guide.

## What Hugo is

Hugo reads a folder of Markdown files and templates and writes a finished website – HTML, CSS and images – into a folder called `public/`. That folder is what a web host serves, which is why a Hugo site runs without a database or server-side page rendering.

Hugo itself is a command-line program. HugoKit runs it and puts the everyday jobs in a window: the server, the configuration, the checks and publishing. What ends up on disk is an ordinary Hugo project, so Hugo's own documentation applies to it unchanged. [Hugo without the terminal](/docs/hugo-without-the-terminal/) maps each control in the app to the command behind it.

## 1. Install HugoKit

1. Download the DMG from [hugokit.com](/).
2. Open it and drag **HugoKit** into your Applications folder.
3. Launch it. The app is signed and notarised, so macOS opens it without the "unidentified developer" dialog.

The setup wizard opens on first launch and has four steps: **Welcome**, **Hugo**, **Add Your First Site** and **You're All Set**. `Esc` leaves it at any point, and **Help → Show Welcome Screen** brings it back.

## 2. Let the app install Hugo

The **Hugo** step looks for a Hugo binary in the [locations Hugo is normally installed to](/docs/getting-started/#hugo) and falls back to `which hugo`. If it finds one, the step shows the version and moves on.

If there's nothing to find, you get two buttons:

- **Install Hugo** – with Homebrew on the machine, HugoKit runs `brew install hugo`. Without it, HugoKit downloads the latest **Hugo Extended** release from GitHub, verifies its release checksum and `hugo version`, and installs it to `~/.local/bin/hugo`.
- **I'll install it myself** – shows the `brew install hugo` command, a link to Hugo's own installation page, and a **Retry Detection** button.

Hugo comes in two builds, and only the extended one compiles SCSS. Themes commonly need it, including the one in the next step, so extended is the build HugoKit installs.

## 3. Create the site

**Create New Site** (`⇧⌘N`) is the same sheet as **Create New** in the setup wizard. It asks for four things.

**Site name.** Used for the folder and for the site's title. `my-blog` becomes `my-blog/`.

**Location.** The folder your site folder goes into. The path you'll end up with is shown as you type.

**Template.** HugoKit Starter or Blank, covered below.

**Three finishing toggles.** Initialise a git repository, open the site when it's done, and start the local server right away.

### HugoKit Starter or Blank

**HugoKit Starter** is a complete site with its own theme: a front page, a posts section, projects, an about page, an archive, a 404 page, `robots.txt`, a sitemap, an RSS feed, SEO tags, light and dark appearance, a browser toolbar colour, and sample content in each section. Five toggles drop the parts you don't want – blog, projects, about page, theme toggle and tags. It needs Hugo 0.146 or newer, which the sheet notes under the picker.

**Blank** is what `hugo new site` produces: the folder structure, a small welcome page and no theme. Nothing renders as a designed page until you write the templates or add a theme. This is also where you choose the configuration format – TOML, YAML or JSON.

Take the Starter for a first site. Something appears in the browser straight away, and every part of it can be deleted once you know what it does.

### What's in the folder

The Starter, with git enabled:

```
my-blog/
├── hugo.toml              site-wide configuration
├── content/               your pages and posts, written in Markdown
├── static/                files copied to the site untouched (robots.txt, favicon)
├── themes/
│   └── hugokit-starter/   the layouts and styles that turn content into pages
├── archetypes/            what a new content file starts out as
├── .gitignore
└── README.md
```

One more folder turns up the first time Hugo builds: `public/`, holding the generated site. Hugo rewrites it from the others on every build, so it isn't somewhere to edit anything, and `.gitignore` keeps it out of the repository.

The division worth remembering: you write in `content/`, the look comes from `themes/`, and `hugo.toml` holds what's true of the whole site.

## 4. Start the server

Select the site and click **Start Server**. The command is written to the log before it runs:

```
– Starting hugo server…
  hugo server --port 1313 --baseURL http://localhost:1313/
```

Then use **Open in Browser**, or go to `http://localhost:1313` yourself. The first site gets port 1313; each later one gets the next port HugoKit can bind, so several sites can run at once.

The server keeps watching the project. Save a file – in HugoKit or in any other editor – and the page in the browser reloads by itself. That's Hugo's LiveReload, and HugoKit leaves it on.

The Starter ships with `baseURL = "https://example.org/"` in `hugo.toml`, and HugoKit overrides it with `http://localhost:1313/` while you preview, so local links work either way. Change it to your real address before you publish: a wrong `baseURL` is the [most common reason a deployed site loses its CSS](/docs/hugo-broken-links-missing-css-github-pages/).

## 5. Change something

Two edits are enough to see the whole loop.

**The site's name.** Open **Config**. The **Structured** tab opens on **Basics**, which holds **Title**, **Base URL**, **Language** and **Theme**. Change the title and save; HugoKit shows the diff and waits for your approval before writing to the file. The browser reloads with the new name in the header. More in [Editing your config](/docs/editing-your-config/).

**A page.** Open **Content** and select `about.md`. You get a preview, a front matter inspector and a **Raw** tab with the file as text. Edit it, press `⌘S`, and the browser follows. HugoKit keeps the previous version of anything it saves, so the change can be taken back from the site's **Snapshots** sheet – see [Snapshots and undo](/docs/snapshots-and-undo/).

For longer writing, **Open in editor** hands the file to whichever editor you normally use. The server reloads on either one's save.

## 6. Write a post

**New Content** sits on the **Content** page and in the toolbar's **⋯** menu. Pick a section (`posts`), type a filename (`my-first-post`), and the resulting path is shown before you create anything. HugoKit runs `hugo new content posts/my-first-post.md`, so the file starts from the site's archetype.

### Choosing an archetype

An archetype is a template Hugo copies when it creates a page. Every site has a default one; a site can add more under `archetypes/`.

{{< shot name="archetypes" alt="New Content with the archetype picker open, listing default, a bundle archetype and a named one." >}}

When a site has more than the default, New Content shows an **Archetype** picker and passes your choice to Hugo as `--kind`. Sites with nothing but the default do not show it, and the flow is the one above.

A directory archetype – a folder under `archetypes/` rather than a single file – produces a **leaf bundle**. HugoKit asks Hugo for a folder rather than a file, so the archetype's other files come along; the field renames itself to **Folder name** so the difference is visible before you create anything. Hugo evaluates the archetype itself, so whatever your template does is what you get.

The Starter's own posts are folders rather than single files – `content/posts/welcome/index.md`, with that post's images beside it. Hugo calls that a page bundle, and it's a habit worth copying for anything with pictures in it.

### Front matter

Every content file opens with a block between `---` markers. That block is the front matter: the page's metadata.

```yaml
---
title: "My first post"
date: 2026-08-07
draft: true
---
```

The Starter's archetype gives you those three. `title` is the heading and the page title, `date` orders the posts, and `draft` decides whether Hugo builds the page at all. The front matter inspector on the Content page edits `title`, `description`, `date`, `draft`, `tags` and `categories` as fields, so you don't have to write the YAML by hand.

### The new post isn't there

`draft: true` is the usual explanation. Set it to `false`, or turn on **Include drafts** on the Server page, which adds `--buildDrafts` and restarts the server for you. A date in the future and an `expiryDate` in the past have the same effect: [Your post doesn't show up](/docs/hugo-drafts-not-showing/).

## The errors you're most likely to meet first

| What you see | Where it's covered |
|---|---|
| The server won't start, and the log says the port is in use | [Port already in use](/docs/hugo-server-port-already-in-use/) |
| A build error about SCSS or `TOCSS` | [You need the extended version](/docs/hugo-scss-extended-version/) |
| The build stops on a front matter error | [Front matter errors](/docs/hugo-front-matter-errors/) |
| The build succeeds, but the page is blank | [Hugo found no layout file](/docs/hugo-found-no-layout-file/) |
| HTML you pasted into Markdown disappears | [Raw HTML omitted](/docs/hugo-raw-html-omitted-markdown/) |
| The browser doesn't reload when you save | [LiveReload isn't reloading](/docs/hugo-livereload-not-reloading/) |

## Where to go next

- [Getting started](/docs/getting-started/) – the reference for the whole app, including the other three ways to add a site: an existing folder, a git URL, or a watched parent folder.
- [Running the server](/docs/running-the-server/) – ports, content flags and the log.
- [Site health](/docs/site-health/) – broken links, missing alt text, oversized images and deprecated configuration.
- [Publishing to GitHub Pages](/docs/publishing-to-github-pages/) or [Publishing over SFTP](/docs/publishing-over-sftp/) – when the site is ready to leave your Mac.
