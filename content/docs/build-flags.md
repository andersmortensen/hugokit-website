---
title: "Build flags"
description: "Set Hugo's build flags per site in HugoKit – garbage collection, minify and a build environment – with the exact command line shown before it runs."
group: "Publishing"
weight: 30
tags: [publishing, build]
---

Every publish builds the site first. The **Build** section on the Deploy page decides how – the same Hugo flags you'd type by hand, set per site and shown as the exact command line before anything runs.

## The flags

On the **Deploy** page, per site:

- **`--gc`** – run Hugo's garbage collection after the build, clearing stale entries from its cache.
- **`--minify`** – minify the built output.
- **Environment** – the build environment Hugo runs in (`--environment`), for config and templates that switch on it. Leave it blank for Hugo's default.

Both flags are **on by default** – exactly what every HugoKit build did before this was a setting, so upgrading doesn't change what your site builds to. The command line under the toggles updates as you change them, so you always see what will run: `hugo --gc --minify`, or `hugo`, or `hugo --gc --minify --environment staging`.

## The environment field

The two flags are switches; the environment is the one field you type into, so it's the one HugoKit guards. It takes letters, numbers, hyphens and underscores – a normal environment name – and **rejects** anything else rather than quietly cleaning it up. A value that starts with a `-`, or a pasted line with a space and a second command in it, is refused out loud instead of being handed to Hugo as another flag. The field says why, and the command line stays as it was.

## Where it applies

Build flags belong to the **site**, not the target, so they carry across however you publish – a local GitHub Pages build or an FTP/SFTP upload both build with your flags on your Mac. [Preflight](/docs/preflight/) uses the environment flag too, so the check builds against the same config the publish will.

The walkthroughs: [Publishing to GitHub Pages](/docs/publishing-to-github-pages/) · [Publishing over SFTP](/docs/publishing-over-sftp/).
