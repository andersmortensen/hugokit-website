---
title: "Hugo ignores a setting in hugo.toml"
description: "Your theme, your baseURL or your title has no effect – and Hugo says nothing. In TOML, everything after a [section] header belongs to that section, including the line you just added at the bottom."
group: "Fixing common Hugo problems"
weight: 70
---

You add a setting to `hugo.toml`. You restart the server. Nothing changes. No error, no warning – Hugo builds happily and behaves as if the line isn't there.

Look at where the line sits:

```toml
baseURL = "https://example.com/"
title = "My site"

[params]
  author = "Anders"
  description = "A site"

theme = "papermod"
```

`theme` is at the bottom, at the left margin, unindented. It looks top-level. It isn't.

## Why

TOML has no braces. A `[section]` header opens a table, and **every key after it belongs to that table until the next header**. Indentation is decoration; TOML doesn't read it.

So Hugo doesn't see `theme`. It sees `params.theme` – a parameter called "theme" that nothing reads. Which is a perfectly valid thing to write, so nobody complains. The site just builds without your theme.

The same trap catches every top-level key: `baseURL`, `title`, `languageCode`, `ignoreLogs`, `enableGitInfo`, `disableKinds`. Anything you append to the end of a config file that has sections in it.

## The fix

Move the key above the first `[section]` header:

```toml
baseURL = "https://example.com/"
title = "My site"
theme = "papermod"

[params]
  author = "Anders"
  description = "A site"
```

Rule of thumb: **top-level keys go at the top of the file.** Once the first `[table]` header appears, the top level is over.

## How to tell it's happening

Ask Hugo what it thinks the config is:

```bash
hugo config
```

That prints the resolved configuration. If `theme` shows up as an empty string while the word "theme" is clearly in your file, you've found it – the key is somewhere Hugo isn't looking.

## YAML has the same problem, differently

In YAML, indentation *is* the structure, so the failure looks like this:

```yaml
baseURL: https://example.com/
params:
  author: Anders
  theme: papermod     # ← two spaces in, so it's params.theme
```

Same result: a parameter nobody reads. Move it back to the left margin.

## Empty sections are harmless – but they hide things

A `[section]` header with nothing under it does nothing at all. It's still worth deleting: an empty header is usually the ghost of a key that got moved, and the next key you add at the bottom of the file will land under it.

> HugoKit checks this before every publish, without waiting for the build to fail – there's nothing to fail. It knows roughly forty keys that belong at the top level, finds the ones stranded under a table header, and offers to move them back, marking each one with `# Moved from [params] by HugoKit` so you can see what happened. Empty sections get cleaned up in the same pass. Both are shown as a diff you approve. See [Editing your config](/docs/editing-your-config/) and [Preflight](/docs/preflight/).
