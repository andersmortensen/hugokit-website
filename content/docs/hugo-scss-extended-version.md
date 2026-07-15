---
title: "Hugo can't build SCSS: you need the extended version"
description: "Hugo stops with \"TOCSS: failed to transform … this feature is not available in your current Hugo version\". It means your Hugo isn't the extended build. How to install extended and make sure it stuck."
group: "Fixing common Hugo problems"
weight: 130
---

You add a theme, run `hugo server`, and the build stops with something like:

```
error: error building site: TOCSS: failed to transform "scss/main.scss" (text/x-scss): this feature is not available in your current Hugo version
```

Nothing is wrong with your site or your theme. Your Hugo just can't compile SCSS.

## Why this happens

Hugo ships in two builds:

- **Standard** – the plain `hugo` binary.
- **Extended** – the same, plus a Sass/SCSS compiler (and WebP encoding).

Most themes style themselves in SCSS, and only the extended build can turn that into CSS. Run one of those themes on standard Hugo and the transform fails – that's the `TOCSS` error (`TOCSS` is Hugo's "to CSS" step).

## Check which build you have

```bash
hugo version
```

The extended build says so, right in the string:

```
hugo v0.150.2+extended darwin/arm64
```

The version number will differ – the word `extended` is what matters. If it isn't there, you're on the standard build, and that's the whole problem.

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

Whichever route you take, run `hugo version` again afterwards and look for `+extended`.

## Still failing after you installed extended?

- **Two Hugos on your PATH.** You installed extended, but an older standard binary still comes first. `which -a hugo` lists them; `hugo version` tells you which one actually runs. Remove the standard one, or fix the order.
- **CI or GitHub Actions.** It builds locally and fails in the cloud because the runner installed standard Hugo. In `peaceiris/actions-hugo` (or your setup step), set `extended: true`.

> HugoKit sidesteps this one. When it installs Hugo for you, it installs the **extended** build on purpose – because most themes need it. If Hugo is already on your Mac, HugoKit uses what's there, so a quick `hugo version` is still worth it. See [Getting started](/docs/getting-started/).
