---
title: "error calling partial: the two things it usually means"
description: "The build stopped in a partial. Check the file name first, then the context passed into it."
group: "Fixing common Hugo problems"
weight: 80
tags: [templates, troubleshooting]
---

The build stops in the middle of a template:

```
Error: error calling partial: partial "header.html" not found
```

or:

```
Error: error calling partial: runtime error: invalid memory address
       or nil pointer dereference
```

The messages look different, but the two common causes are straightforward.

## "partial ... not found"

Check the partial name and lookup path in this order:

**1. The name has to match the file, extension included.**

```go-html-template
{{ partial "header.html" . }}   ← looks for header.html
{{ partial "nav/main.html" . }} ← looks for nav/main.html in a subfolder
```

The path is relative to the partials directory, not to the template calling it.

**2. The file has to be in the partials directory.**

Recent Hugo keeps partials in `layouts/_partials/`. Older projects use `layouts/partials/`. Both still work today, but don't mix them in one project – pick the one your Hugo version generates and keep every partial there.

**3. A theme's partials are only found under the theme.**

If you're overriding a theme partial, mirror its path exactly in your own `layouts/`. `themes/x/layouts/_partials/nav.html` is overridden by `layouts/_partials/nav.html` – same relative path, or Hugo keeps using the theme's.

## The nil pointer: you forgot the dot

```go-html-template
{{ partial "header.html" }}     ← no context
{{ partial "header.html" . }}   ← context passed
```

That trailing `.` is the page. Leave it out and the partial gets nothing – so the moment it reaches for `.Title` or `.Params`, it's reaching into nothing, and Go panics.

You don't have to pass the whole page. If a partial needs three specific values, hand it exactly those:

```go-html-template
{{ partial "card.html" (dict "title" .Title "url" .RelPermalink "date" .Date) }}
```

Inside the partial, `.title` and `.url` refer to the dictionary keys. Passing explicit values also limits the partial's dependencies.

## Reading the error

Read the complete error to find the template path and line number:

```
Error: error calling partial: execute of template failed at
       <.Title>: nil pointer evaluating page.Page.Title
       in layouts/_partials/header.html:4:12
```

`header.html:4:12` identifies line 4, column 12 inside the partial. Check the corresponding call site for missing context.

> **In HugoKit:** Preflight reports missing partial context and partial names that do not match a file.
