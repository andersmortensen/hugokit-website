---
title: "error calling partial: the two things it usually means"
description: "Hugo stops with \"error calling partial\" or a nil pointer dereference deep inside a template. Almost always it's a missing dot, or a name that doesn't match the file."
group: "Fixing common Hugo problems"
weight: 80
---

The build stops in the middle of a template:

```
Error: error calling partial: partial "header.html" not found
```

or, more alarmingly:

```
Error: error calling partial: runtime error: invalid memory address
       or nil pointer dereference
```

Two different messages, two different causes, and both are one-line fixes.

## "partial ... not found"

Hugo looked for the file and it wasn't where it looks. Three things to check, in order:

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

The message is scary and the cause is boring. It's almost always the dot.

You don't have to pass the whole page. If a partial needs three specific values, hand it exactly those:

```go-html-template
{{ partial "card.html" (dict "title" .Title "url" .RelPermalink "date" .Date) }}
```

Inside the partial, `.title` and `.url` are then the keys of that dict – and the partial can't accidentally depend on anything else, which is why it's the better habit for anything reusable.

## Reading the error

Hugo tells you which template blew up, and it's worth reading past the first line:

```
Error: error calling partial: execute of template failed at
       <.Title>: nil pointer evaluating page.Page.Title
       in layouts/_partials/header.html:4:12
```

`header.html:4:12` – line 4, column 12. The panic happens *inside* the partial, but the bug is at the call site, in whatever template called it without the dot.

> HugoKit's preflight reads both of these out of the build log and offers a fix: it inserts the missing ` . ` into partial calls, and adds a missing `.html` where the name doesn't match a file. Both land in `layouts/` and are shown as a diff before anything is written. See [Preflight](/docs/preflight/).
