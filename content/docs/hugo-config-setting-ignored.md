---
title: "Hugo ignores a setting in hugo.toml"
description: "Hugo accepts the config but ignores one setting. It is usually nested under the wrong TOML table or YAML level."
group: "Fixing common Hugo problems"
weight: 70
tags: [config, troubleshooting]
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

Hugo reads the key as `params.theme`, not the top-level `theme` setting. Because `params.theme` is valid custom data, the build does not report an error.

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

The resolved configuration shows whether Hugo read the top-level `theme` value. An empty value indicates that the key is nested elsewhere.

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

An empty table has no effect, but later keys added below it still belong to that table. Remove empty tables that are no longer used.

> **In HugoKit:** Preflight finds known top-level keys nested under a table and offers to move them in an approved diff.
