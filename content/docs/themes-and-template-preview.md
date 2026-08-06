---
title: "Themes and template preview"
description: "See the themes already in a site, create a blank one and preview layouts while you work."
group: "Working in the app"
weight: 20
tags: [templates]
---

**Themes** lists installed themes. **Template Preview** renders a selected layout beside its source using a matching content page.

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

{{< shot name="template-preview" alt="Template Preview: the layout file tree on the left and the live rendered page on the right." >}}

**It needs the dev server running.** The preview is your own site, served by Hugo – if the server is stopped, the panel says so and offers to start it.

### What's in the file tree

HugoKit scans two places and shows them as one tree:

- your site's own `layouts/`
- the `layouts/` folder of each theme in `themes/`

When the project and theme define the same layout, the project's file takes precedence. Theme files are labelled with their theme name.

Templates are grouped by folder – `_default`, `partials`, `shortcodes`, `_markup` and the rest.

### Preview with

**Preview with** shows the content page selected for the layout. Partials, shortcodes and `baseof.html` use the home page because they render only within another template.

The preview is live: save the file in your editor, and it reloads like any other page on the dev server.

Template Preview opens from the Dashboard, the Themes page, the View menu, the command palette (⌘K) or **⇧⌘T** from anywhere.
