---
title: "Deprecation warnings after upgrading Hugo"
description: "The site still builds, but Hugo is warning that a template API or configuration key is on its way out."
group: "Fixing common Hugo problems"
weight: 100
tags: [build, troubleshooting]
---

After a Hugo upgrade, the site still builds, so a deprecation warning is easy to postpone:

```
WARN  deprecated: .Site.IsServer was deprecated and will be removed
      in a future release. Use hugo.IsServer instead.
```

## Why you shouldn't leave it

A later Hugo release may remove the API or configuration key. Fix the warning before changing Hugo versions again, while the current site still gives you something reliable to compare against.

Update deprecated usage while the current build still succeeds, then compare the rendered site.

## The ones you'll actually see

**`.Site.IsServer` → `hugo.IsServer`**

```go-html-template
{{ if .Site.IsServer }}   ← old
{{ if hugo.IsServer }}    ← new
```

Usually guarding analytics so it doesn't fire on the dev server. `hugo.IsServer` is a global – it doesn't need the page context, which is why it moved.

**`.Data.Pages` → `.Site.RegularPages`**

```go-html-template
{{ range .Data.Pages }}          ← old
{{ range .Site.RegularPages }}   ← new
```

`.RegularPages` on a section page returns that section's pages; `.Site.RegularPages` returns every regular page on the site. Choose the scope required by the template.

## Config keys that are past it

These don't warn on every build – they simply stop doing anything:

| Key | What replaced it |
| --- | --- |
| `blackfriday` | Goldmark, under `[markup.goldmark]`. The old renderer is gone; the whole block is dead config |
| `pygmentsStyle`, `pygmentsCodeFences` | Chroma, under `[markup.highlight]` |
| `canonifyURLs` | No direct replacement. Use `relURL` and `absURL` when generating URLs in templates. |
| `metaDataFormat` | Nothing. Hugo detects the front matter format from the delimiter |

Remove a `[blackfriday]` block after confirming the site uses Goldmark. The old renderer configuration is no longer read.

## Turn the warnings up before you upgrade

```bash
hugo --logLevel warn
```

And if a warning is one you've consciously decided to live with, silence *that one* rather than all of them:

```toml
ignoreLogs = ['warning-goldmark-raw-html']
```

Prefer a specific `ignoreLogs` entry over suppressing all warnings.

> **In HugoKit:** Preflight reports template deprecations, and Site Health reports known deprecated configuration keys.
