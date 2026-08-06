---
title: "Your post doesn't show up"
description: "The file exists, but Hugo has left it out of the build. One of three publication states usually explains it."
group: "Fixing common Hugo problems"
weight: 120
tags: [content, troubleshooting]
---

The content file exists and the build succeeds, but Hugo does not generate the page.

In most cases, one of three page states explains it: draft, future-dated or expired.

## 1. It's a draft

```yaml
---
title: "My post"
draft: true    ← here
---
```

`hugo new` writes `draft: true` into every file it creates, and it's easy to forget it's there. Drafts are excluded from every build, including the dev server.

Two ways forward. Publish it:

```yaml
draft: false
```

Or keep it a draft and tell the server to render drafts anyway:

```bash
hugo server --buildDrafts
```

`--buildDrafts` includes the page in that server run without changing `draft: true` in the file.

## 2. It's dated in the future

```yaml
date: 2027-01-01
```

Hugo skips pages whose `date` is later than the build time. Check the year and time zone when the date was not meant as a schedule.

```bash
hugo server --buildFuture
```

A scheduled page appears only after the site is built again following its publication date. Use a scheduled build or rebuild manually.

## 3. It's expired

```yaml
expiryDate: 2024-01-01
```

After `expiryDate`, Hugo excludes the page from the build.

```bash
hugo server --buildExpired
```

## Check what Hugo actually sees

```bash
hugo list drafts
hugo list future
hugo list expired
```

If the file appears in one of these lists, its publication state explains the missing page. Otherwise check its location, page kind and template; see [Hugo builds fine, but the page is blank](/docs/hugo-found-no-layout-file/).

## The flag that publishes your drafts by accident

There's a difference between passing `--buildDrafts` on the command line and putting this in your config:

```toml
buildDrafts = true
```

The command-line flag affects one build. `buildDrafts = true` in the configuration affects local and production builds until the setting is changed.

> **In HugoKit:** server settings expose draft, future and expired content as preview-only toggles.
