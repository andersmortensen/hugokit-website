---
title: "Hugo builds fine, but the page is blank"
description: "Hugo says \"found no layout file\" and writes an empty page. Nothing is broken – Hugo just has no template for that kind of page, and the fix is one file with the right name."
group: "Fixing common Hugo problems"
weight: 60
---

The build succeeds. The server starts. And the page in the browser is empty – no error, no content, nothing to click. Somewhere in the log:

```
WARN  found no layout file for "html" for kind "home"
```

The exact wording moves around between Hugo versions, but the shape is always the same: *kind* and *no layout file*.

## Why

Hugo doesn't render Markdown to HTML on its own. It hands each page to a template, and the template decides what the HTML looks like. If it can't find a template for a page, it doesn't guess and it doesn't fail – it writes the page with nothing in it and moves on.

*Kind* is the word Hugo uses for what sort of page it is. There are five you'll meet:

| Kind | What it is |
| --- | --- |
| `home` | the front page |
| `page` | a normal content page |
| `section` | the listing page for a folder, like `/posts/` |
| `taxonomy` | the list of all tags |
| `term` | one tag's page |

Each kind is looked up separately. That's why a site can render its blog posts perfectly and still hand you a blank front page: `page` had a template, `home` didn't.

## The fix

Give the kind a template. In `layouts/`:

```
layouts/
├── baseof.html    ← the shell every page is poured into
├── home.html      ← kind: home
├── page.html      ← kind: page
└── section.html   ← kind: section
```

`baseof.html` holds the `<html>`, the `<head>` and whatever wraps every page, with a hole in the middle:

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

That's the whole mechanism. A template per kind, one shell around them.

## If you're using a theme

Then the theme has these templates already, and a blank page usually means Hugo isn't finding the theme at all:

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

> HugoKit's preflight reads this warning out of the build log and offers to write the missing templates for you – it checks which kinds have no template, and generates them as `{{ define "main" }}` blocks if your `baseof.html` exists, or as standalone pages if it doesn't. The taxonomy trap is a separate check: HugoKit notices when `[taxonomies]` is defined without `tag` and `category` and offers to add them back. Both fixes are shown as a diff before anything is written. See [Preflight](/docs/preflight/).
