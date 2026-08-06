---
title: "Broken links and missing CSS after deploying to GitHub Pages"
description: "The site works locally, but GitHub Pages has lost its CSS, images or links below the repository subpath."
group: "Fixing common Hugo problems"
weight: 10
tags: [publishing, github-pages, troubleshooting]
---

The site works on `localhost:1313`, but the GitHub Pages deployment has missing CSS, image 404s or links that point outside the repository subpath.

The deployed site is served below `/my-blog/` rather than at the domain root.

## What's actually happening

A GitHub Pages project site is served from a **subpath**: `https://you.github.io/my-blog/`, not `https://you.github.io/`.

Locally, `/css/main.css` resolves from the domain root. On a project site it still resolves to `https://you.github.io/css/main.css`, outside `/my-blog/`.

## Fix step 1: baseURL

In `hugo.toml`, the `baseURL` must include the subpath and a trailing slash:

```toml
baseURL = 'https://you.github.io/my-blog/'
```

A repository named exactly `you.github.io` is the exception – it's served from the root, and its `baseURL` is `https://you.github.io/`.

## Fix step 2: stop writing absolute paths

`baseURL` alone does not change root-relative paths. Hugo's `relURL` **leaves values beginning with a slash at the domain root**. For `baseURL = 'https://example.org/my-blog/'`:

```
{{ "/css/main.css" | relURL }}   →  /css/main.css            ← unchanged. Still broken.
{{ "css/main.css"  | relURL }}   →  /my-blog/css/main.css    ← correct
{{ ""              | relURL }}   →  /my-blog/                ← the site root
```

`absURL` behaves the same way – a leading slash throws the subpath away entirely:

```
{{ "/css/main.css" | absURL }}   →  https://example.org/css/main.css
```

Remove the leading slash before passing the path to `relURL`.

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

For a project site, output such as `/css/…` still points outside `/my-blog/`.

## Or avoid the subpath entirely

With a custom domain, add the domain to `static/CNAME`, configure DNS and set `baseURL` to that domain. Repository-subpath handling is then unnecessary.

> **In HugoKit:** Preflight checks `baseURL` and subpath-sensitive asset paths before publishing.
