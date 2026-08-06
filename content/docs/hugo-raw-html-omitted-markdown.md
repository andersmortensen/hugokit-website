---
title: "Raw HTML omitted: your HTML disappears from Markdown"
description: "Your HTML is still in the Markdown file; Goldmark has chosen not to render it."
group: "Fixing common Hugo problems"
weight: 40
tags: [content, troubleshooting]
---

A Markdown file contains a `<div>`, `<iframe>` or `<details>` block, but the generated page replaces it with:

```html
<!-- raw HTML omitted -->
```

And in the build log:

```
WARN  Raw HTML omitted while rendering "/content/about.md";
      see https://gohugo.io/getting-started/configuration-markup/#rendererunsafe
```

## Why

Your markup is still in the source. Hugo uses Goldmark for Markdown, and by default Goldmark does not pass raw HTML through because the source could contain arbitrary markup or scripts.

For content maintained inside the project, choose whether raw HTML should be allowed or replaced by a shortcode.

## Fix 1: allow it

```toml
[markup.goldmark.renderer]
  unsafe = true
```

`unsafe = true` passes raw HTML through without filtering. Use it only when the Markdown source is trusted.

## Fix 2: use a shortcode instead

If you'd rather keep the default, wrap the markup in a shortcode. `layouts/_shortcodes/video.html`:

```go-html-template
<div class="video">
  <iframe src="https://player.vimeo.com/video/{{ .Get 0 }}" allowfullscreen></iframe>
</div>
```

and in the content file:

```markdown
{{</* video 123456 */>}}
```

Hugo templates can emit HTML even when raw HTML is disabled in Markdown. A shortcode also makes the markup reusable.

## What silencing the warning does not do

Hugo helpfully suggests this in the log:

```toml
ignoreLogs = ['warning-goldmark-raw-html']
```

`ignoreLogs` hides the warning but does **not** render the omitted HTML. Use it only when the omission is intentional.

> **In HugoKit:** Preflight reports the warning. Use the configuration editor to enable raw HTML when the markup should render.
