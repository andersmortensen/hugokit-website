---
title: "Themes and template preview"
description: "See a site's installed themes, scaffold a blank one to build on, and render any layout file live with Template Preview (⇧⌘T)."
group: "Working in the app"
weight: 20
tags: [templates]
---

Hugo's layouts are the part you can't see until the page renders. HugoKit's **Themes** page lists what's installed, and **Template Preview** renders any single layout file next to its source – without you guessing which URL exercises it.

## Installed themes

The **Themes** page lists every theme in your site's `themes/` folder. Removing one deletes `themes/<name>` from disk; nothing else in the site is touched.

## New Blank Theme

**New Blank Theme** scaffolds a placeholder theme in `themes/<name>` – minimal layouts and styles to build on, not a finished design. It runs Hugo's own `hugo new theme` underneath.

| Field | What it does |
|---|---|
| **Theme name** | Letters, numbers and hyphens. Becomes the folder name under `themes/`. |
| **Include placeholder content** | Off strips the sample pages `hugo new theme` generates. `layouts/`, `assets/` and `archetypes/` are left as they are either way. |
| **Set as active theme after creation** | Writes the new theme into your config, so the next build uses it. |

## Template Preview

**Template Preview** (**⇧⌘T**) is a split panel: your layout files on the left, the rendered page on the right.

**It needs the dev server running.** The preview is your own site, served by Hugo – if the server is stopped, the panel says so and offers to start it.

### What's in the file tree

HugoKit scans two places and shows them as one tree:

- your site's own `layouts/`
- the `layouts/` folder of each theme in `themes/`

Where both define the same file, **the project's version wins** – the same override rule Hugo itself uses. Theme files that aren't overridden are listed with their theme in brackets, so you always know which file you're looking at.

Templates are grouped by folder – `_default`, `partials`, `shortcodes`, `_markup` and the rest.

### Preview with

A layout file isn't a page: `single.html` renders *some* post, `list.html` renders *some* section. So the panel picks a page for you – a real page from your content that the selected template actually renders – and shows which one under **Preview with**. Partials, shortcodes and `baseof.html` fall back to the home page, since they only exist inside another template.

The preview is live: save the file in your editor, and it reloads like any other page on the dev server.

Template Preview opens from the Dashboard, the Themes page, the View menu, the command palette (⌘K) or **⇧⌘T** from anywhere.
