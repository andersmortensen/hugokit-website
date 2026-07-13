---
title: "Broken links and missing CSS after deploying to GitHub Pages"
description: "Your Hugo site works locally but loses its CSS on GitHub Pages. The cause is the repository subpath in baseURL – and relURL doesn't fix it the way you'd expect."
group: "Fixing common Hugo problems"
weight: 10
---

The site is fine on `localhost:1313`. You deploy it, open `https://you.github.io/my-blog/`, and get unstyled HTML: the text is there, the CSS is gone, the images 404, and half the links go nowhere.

Nothing is wrong with your build. The problem is that your site no longer lives at the root of a domain.

## What's actually happening

A GitHub Pages project site is served from a **subpath**: `https://you.github.io/my-blog/`, not `https://you.github.io/`.

Locally, your site *is* at the root, so a template that writes `/css/main.css` works. In production that same path resolves to `https://you.github.io/css/main.css` – one level above your site, where nothing exists. Every absolute path you wrote by hand is now pointing outside your own site.

## Fix step 1: baseURL

In `hugo.toml`, the `baseURL` must include the subpath and a trailing slash:

```toml
baseURL = 'https://you.github.io/my-blog/'
```

A repository named exactly `you.github.io` is the exception – it's served from the root, and its `baseURL` is `https://you.github.io/`.

## Fix step 2: stop writing absolute paths

Setting `baseURL` alone doesn't save you, and this is where most people lose an afternoon. Hugo's `relURL` **ignores anything starting with a slash**. Real output from a site with `baseURL = 'https://example.org/my-blog/'`:

```
{{ "/css/main.css" | relURL }}   →  /css/main.css            ← unchanged. Still broken.
{{ "css/main.css"  | relURL }}   →  /my-blog/css/main.css    ← correct
{{ ""              | relURL }}   →  /my-blog/                ← the site root
```

`absURL` behaves the same way – a leading slash throws the subpath away entirely:

```
{{ "/css/main.css" | absURL }}   →  https://example.org/css/main.css
```

So the rule is: **drop the leading slash, then pipe through `relURL`.**

```go-html-template
<!-- Broken on a subpath -->
<link rel="stylesheet" href="/css/main.css">
<img src="/img/logo.svg">
<a href="/about/">About</a>

<!-- Correct everywhere -->
<link rel="stylesheet" href="{{ "css/main.css" | relURL }}">
<img src="{{ "img/logo.svg" | relURL }}">
<a href="{{ "about/" | relURL }}">About</a>
```

For links between pages, `.RelPermalink` is better still – it already knows about the subpath:

```go-html-template
{{ range .Pages }}<a href="{{ .RelPermalink }}">{{ .Title }}</a>{{ end }}
```

And for CSS, JS and images you process through Hugo Pipes, `.RelPermalink` on the resource does the same job.

## Fix step 3: the JavaScript in static/

Hugo processes your templates. It does **not** process files in `static/` – they're copied byte for byte. So a path hardcoded in a script survives untouched:

```javascript
fetch('/index.json')     // 404 on a subpath
```

The usual fix is to hand the base path from a template to your JS. Put this in your head template:

```go-html-template
<script>window.__basePath = "{{ "" | relURL }}";</script>
```

and use it in the script:

```javascript
var base = (window.__basePath || '/').replace(/\/$/, '');
fetch(base + '/index.json');
```

## Fix step 4: check the built site, not the source

Search the *output* for paths that never got the subpath:

```bash
hugo --gc --minify
grep -o 'href="/[^"]*"' public/index.html
grep -o 'src="/[^"]*"' public/index.html
```

Anything that comes back as `/css/…` rather than `/my-blog/css/…` is still broken.

## Or avoid the subpath entirely

A custom domain has no subpath. Add a `CNAME` file in `static/` with your domain, point the DNS at GitHub, and set `baseURL` to `https://yourdomain.com/`. The whole class of problem disappears.

> HugoKit runs these checks automatically before every publish: it compares `baseURL` against where the site actually deploys, scans the built HTML for paths missing the subpath, and finds hardcoded paths in templates and in `static/` JavaScript. Each fix is shown as a diff before it touches a file. See [Preflight](/docs/preflight/).
