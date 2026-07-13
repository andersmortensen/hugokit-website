---
title: "Raw HTML omitted: your HTML disappears from Markdown"
description: "Hugo replaces the HTML in your Markdown with an <!-- raw HTML omitted --> comment. Here's why Goldmark does that, and the two right ways to get your markup back."
group: "Fixing common Hugo problems"
weight: 40
---

You put a `<div>`, an `<iframe>` or a `<details>` block in a Markdown file. The page builds fine – and the HTML is gone. In the output there's a comment where your markup should be:

```html
<!-- raw HTML omitted -->
```

And in the build log:

```
WARN  Raw HTML omitted while rendering "/content/about.md";
      see https://gohugo.io/getting-started/configuration-markup/#rendererunsafe
```

## Why

Hugo renders Markdown with Goldmark, and Goldmark refuses to pass raw HTML through by default. It's a safety default: if your Markdown comes from somewhere you don't control, letting it emit arbitrary HTML – `<script>` included – is a hole. Hugo would rather drop it than trust it.

Your own content isn't untrusted input, so for most sites this default is just in the way.

## Fix 1: allow it

```toml
[markup.goldmark.renderer]
  unsafe = true
```

Your HTML now renders exactly as written. "Unsafe" is Goldmark's word, not a warning about your site: it means *HTML is passed through unchecked*. If you write all the content yourself, that's precisely what you want. If you render Markdown submitted by other people, it's exactly what you don't.

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

Templates are always allowed to emit HTML – only *Markdown* is restricted. This keeps the safety net and gives you markup you can reuse.

## What silencing the warning does not do

Hugo helpfully suggests this in the log:

```toml
ignoreLogs = ['warning-goldmark-raw-html']
```

That hides the warning. It does **not** render your HTML – the `<!-- raw HTML omitted -->` comment stays exactly where it was. It's the right setting when you've decided the omission is fine and you're tired of the noise; it's the wrong setting when you actually wanted the markup.

> HugoKit's preflight surfaces this warning before you publish, and its auto-fix adds the `ignoreLogs` line – the *quiet* option. If the HTML is meant to render, set `unsafe = true` in the config editor instead. See [Preflight](/docs/preflight/).
