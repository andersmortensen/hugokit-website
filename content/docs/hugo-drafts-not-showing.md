---
title: "Your post doesn't show up"
description: "The file is there, the build is clean, and the page doesn't exist. Hugo hides drafts, future-dated posts and expired ones by default – three flags, three fixes."
group: "Fixing common Hugo problems"
weight: 120
---

You wrote the post. The file is in `content/posts/`. Hugo builds without a word. And the post isn't on the site – not on the front page, not at its own URL, not anywhere.

Hugo isn't losing it. Hugo is hiding it, deliberately, for one of three reasons.

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

That's the one you want while you're writing – you see the post locally, and it still won't ship until you clear the flag.

## 2. It's dated in the future

```yaml
date: 2027-01-01
```

Hugo skips pages whose `date` is later than the moment of the build. This is the useful one and the confusing one: it's how you schedule a post, and it's also what happens when you fat-finger the year.

```bash
hugo server --buildFuture
```

Worth knowing: a scheduled post only appears when something builds the site *after* its date passes. A static site has no clock. If nothing rebuilds, nothing publishes – you need a scheduled build, or you rebuild it yourself.

## 3. It's expired

```yaml
expiryDate: 2024-01-01
```

Past that date, the page drops out of the build. Rare, and worth remembering when an old page disappears without anyone touching it.

```bash
hugo server --buildExpired
```

## Check what Hugo actually sees

```bash
hugo list drafts
hugo list future
hugo list expired
```

Three commands, three answers. If your file is in one of those lists, you've found it. If it's in none of them, the problem is elsewhere – a filename Hugo skips (`_index.md` is a section page, not a post), a file outside `content/`, or a section with no template. See [Hugo builds fine, but the page is blank](/docs/hugo-found-no-layout-file/).

## The flag that publishes your drafts by accident

There's a difference between passing `--buildDrafts` on the command line and putting this in your config:

```toml
buildDrafts = true
```

The flag affects the one command you're running. The config key affects **every** build, including the one that publishes your site – so every draft you have goes live. It's a reasonable setting for a personal notebook and a bad one for anything else. Know which of the two you're changing.

> HugoKit has all three as toggles in the server settings – drafts, future, expired – and restarts the server when you flip one, so the post appears without you thinking about flags. Those toggles only affect the preview. The config keys are separate, in the config editor, and they're the ones that change what gets published. [Site health](/docs/site-health/) also tells you when more than half your content is drafts, which is usually the moment you find the post you forgot. See [Running the server](/docs/running-the-server/).
