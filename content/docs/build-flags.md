---
title: "Build flags"
description: "Configure garbage collection, minification and the Hugo build environment per site."
group: "Publishing"
weight: 30
tags: [publishing, build]
---

Every publish builds the site first. The **Build** section stores its Hugo flags per site and shows the resulting command.

## The flags

On the **Deploy** page, per site:

- **`--gc`** – run Hugo's garbage collection after the build, clearing stale entries from its cache.
- **`--minify`** – minify the built output.
- **Environment** – the build environment Hugo runs in (`--environment`), for config and templates that switch on it. Leave it blank for Hugo's default.

Both flags are enabled by default, matching builds made before the settings were added. The displayed command updates when a setting changes.

## The environment field

The environment field accepts letters, numbers, hyphens and underscores. Values beginning with `-` or containing spaces and additional command text are rejected, and the generated command remains unchanged.

## Where it applies

Build flags belong to the **site**, not the target, so they carry across however you publish – a local GitHub Pages build or an FTP/SFTP upload both build with your flags on your Mac. [Preflight](/docs/preflight/) uses the environment flag too, so the check builds against the same config the publish will.

The walkthroughs: [Publishing to GitHub Pages](/docs/publishing-to-github-pages/) · [Publishing over SFTP](/docs/publishing-over-sftp/).
