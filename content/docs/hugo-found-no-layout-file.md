---
title: "Hugo builds fine, but the page is blank"
description: "Hugo built the page but had no layout to render it with. Add the template that matches the page kind."
group: "Fixing common Hugo problems"
weight: 60
tags: [templates, troubleshooting]
---

The build succeeds, but the generated page is empty and the log contains:

```
WARN  found no layout file for "html" for kind "home"
```

The content is still there; Hugo just had nowhere to put it. The wording varies by version, but the warning identifies a page *kind* with no layout file.

## Why

Hugo passes each content page to a layout template. When no layout matches the page kind and output format, Hugo can generate an empty page and continue the build.

*Kind* is the word Hugo uses for what sort of page it is. There are five you'll meet:

| Kind | What it is |
| --- | --- |
| `home` | the front page |
| `page` | a normal content page |
| `section` | the listing page for a folder, like `/posts/` |
| `taxonomy` | the list of all tags |
| `term` | one tag's page |

Layout lookup runs separately for each kind. A site can therefore render regular pages while the home page remains empty.

## The fix

Give the kind a template. In `layouts/`:

```
layouts/
├── baseof.html    ← the shell every page is poured into
├── home.html      ← kind: home
├── page.html      ← kind: page
└── section.html   ← kind: section
```

`baseof.html` defines the shared document structure and a block for page-specific content:

```go-html-template
<!doctype html>
<html>
  <head><title>{{ .Title }}</title></head>
  <body>
    {{ block "main" . }}{{ end }}
  </body>
</html>
```

And each kind fills the hole. `layouts/page.html`:

```go-html-template
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}
{{ end }}
```

`layouts/home.html` and `layouts/section.html` usually list pages instead:

```go-html-template
{{ define "main" }}
  {{ range .Pages }}
    <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
  {{ end }}
{{ end }}
```

Each page kind needs a matching layout, which can extend the shared base template.

## If you're using a theme

When a theme should provide the layouts, verify that Hugo can load it:

- Is `theme = "your-theme"` in the config, spelled exactly like the folder in `themes/`?
- Is `themes/your-theme/` actually there, with files in it? A theme added as a Git submodule is an empty folder until the submodule is fetched.
- Is `theme` really at the top level of the config – or did it slide under a `[params]` header? See [Hugo ignores a setting in hugo.toml](/docs/hugo-config-setting-ignored/).

## The trap: a taxonomy you never asked for

Define your own taxonomies and Hugo drops the built-in ones. This config quietly removes tags and categories from your site:

```toml
[taxonomies]
  author = "authors"
```

Because you named the taxonomies, and `tag` and `category` weren't on the list. If you wanted to *add* one, name all three:

```toml
[taxonomies]
  author = "authors"
  tag = "tags"
  category = "categories"
```

> **In HugoKit:** Preflight reports missing layouts and can propose templates in an approved diff.
