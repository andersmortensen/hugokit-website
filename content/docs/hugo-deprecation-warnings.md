---
title: "Deprecation warnings after upgrading Hugo"
description: ".Site.IsServer, .Data.Pages, blackfriday, canonifyURLs – Hugo warns before it removes, so a warning today is a broken build a few releases from now. Here's what each one wants instead."
group: "Fixing common Hugo problems"
weight: 100
tags: [build, troubleshooting]
---

You upgrade Hugo. The site still builds. But the log has grown a paragraph:

```
WARN  deprecated: .Site.IsServer was deprecated and will be removed
      in a future release. Use hugo.IsServer instead.
```

It builds *today*. That's the part worth understanding.

## Why you shouldn't leave it

Hugo removes things in three steps: first a warning, then an error, then the feature is gone. The steps are spread across releases, so a warning you ignore is a build that fails on some future Tuesday when you upgrade for an unrelated reason – and by then you'll have forgotten what the warning said.

Deprecations are the cheapest bug in Hugo. Fix them the day they appear, while the site still builds and you can check that nothing changed.

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

`.RegularPages` on a section page gives you that section's pages; `.Site.RegularPages` gives you every content page on the site. Pick the one you meant – `.Data.Pages` was ambiguous about it, which is why it's gone.

## Config keys that are past it

These don't warn on every build – they simply stop doing anything:

| Key | What replaced it |
| --- | --- |
| `blackfriday` | Goldmark, under `[markup.goldmark]`. The old renderer is gone; the whole block is dead config |
| `pygmentsStyle`, `pygmentsCodeFences` | Chroma, under `[markup.highlight]` |
| `canonifyURLs` | Nothing. Use `relURL` and `absURL` in templates instead – it rewrote URLs after the fact, which is as fragile as it sounds |
| `metaDataFormat` | Nothing. Hugo detects the front matter format from the delimiter |

A `[blackfriday]` block in a config file is the clearest sign a site has been carried forward for years without anyone reading it. Delete it – it hasn't done anything in a long time.

## Turn the warnings up before you upgrade

```bash
hugo --logLevel warn
```

And if a warning is one you've consciously decided to live with, silence *that one* rather than all of them:

```toml
ignoreLogs = ['warning-goldmark-raw-html']
```

Blanket-silencing the log means the next deprecation arrives as a broken build.

> HugoKit's preflight reads deprecation warnings out of the build log and rewrites the two template ones for you – `.Site.IsServer` and `.Data.Pages`, across both `layouts/` and `themes/`, as a diff you approve. The dead config keys are a separate check: [Site health](/docs/site-health/) flags `blackfriday`, `canonifyURLs`, `metaDataFormat` and the two `pygments` keys when it finds them in a config file. Warnings HugoKit doesn't recognise are still listed in the report rather than swallowed – you just have to fix those yourself. See [Preflight](/docs/preflight/).
