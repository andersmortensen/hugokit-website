---
title: "Hugo can't build SCSS: you need the extended version"
description: "The theme may be fine – this error usually means the standard Hugo binary is trying to compile SCSS."
group: "Fixing common Hugo problems"
weight: 130
tags: [build, troubleshooting]
---

You add a theme, run `hugo server`, and the build stops with something like:

```
error: error building site: TOCSS: failed to transform "scss/main.scss" (text/x-scss): this feature is not available in your current Hugo version
```

The theme is probably fine. The installed Hugo binary simply does not include SCSS support.

## Why this happens

Hugo ships in two builds:

- **Standard** – the plain `hugo` binary.
- **Extended** – the same, plus a Sass/SCSS compiler (and WebP encoding).

Hugo Extended includes SCSS compilation. A theme using Hugo's Sass pipeline fails on the standard binary with a `TOCSS` error.

## Check which build you have

```bash
hugo version
```

The extended build says so, right in the string:

```
hugo v0.150.2+extended darwin/arm64
```

The version number can differ. If the output does not include `extended`, the standard build is active.

## Install the extended version

**Homebrew** installs extended by default:

```bash
brew install hugo
```

**Direct download:** on Hugo's [releases page](https://github.com/gohugoio/hugo/releases), pick the asset with `extended` in the name (`hugo_extended_…_darwin-universal.tar.gz`), unpack it, and put `hugo` on your `PATH`.

**With Go:**

```bash
CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
```

After installation, run `hugo version` and confirm that the output contains `+extended`.

## Still failing after you installed extended?

- **Two Hugos on your PATH.** You installed extended, but an older standard binary still comes first. `which -a hugo` lists them; `hugo version` tells you which one actually runs. Remove the standard one, or fix the order.
- **CI or GitHub Actions.** It builds locally and fails in the cloud because the runner installed standard Hugo. In `peaceiris/actions-hugo` (or your setup step), set `extended: true`.

> **In HugoKit:** automatic installation uses Hugo Extended. Existing Hugo installations are used as found.
