---
title: "Working on a Hugo site with an AI agent"
description: "A Hugo project is files on disk, which makes it cheap for a coding agent to work in. What that saves, what it doesn't, and how to set the repo up for it."
group: "Start"
weight: 50
tags: [basics]
---

A Hugo site is a folder of Markdown files, templates and a configuration file. Reading or changing any of it needs no running server, no API and no account, which makes it inexpensive to hand to a coding agent. The saving is real, but it doesn't come from where it's usually placed.

## What actually costs money in an agent session

An agent is billed for the tokens it reads and writes, and every step it takes re-sends the conversation so far. The bill is roughly the number of steps multiplied by how much context each step carries.

The HTTP request itself is free. A call to a remote API and a call to a local tool cost the same: one step, plus whatever comes back in it. The axis that matters is not local against remote, but how many operations fit into a single step.

That's where a file-based project separates from a database-backed CMS, and it's why the difference grows with the size of the job rather than staying constant.

## Where a file-based project is cheaper

**Many files, one step.** Renaming a tag across two hundred posts is one command run in the project folder. Through a CMS API it's a request per post, each one its own step, each step carrying the whole conversation again.

**Search is grep.** "Which posts mention the old pricing?" is one search across `content/`, and it comes back as file names and matching lines. A search endpoint returns paginated JSON, often with the body wrapped in stored HTML.

**The file is the content.** A Markdown file holds the text and the front matter, and nothing else. Content written in a block editor or a page builder arrives as serialised structure that has to be decoded before a sentence can be changed, and re-encoded without breaking the layout.

**Undo is git.** Every change is a diff you can read and revert. That lowers a different cost: how much you need to verify before letting the agent act at all.

**No translation step.** Markdown is already the format the agent writes in, so nothing is converted on the way in or out.

## What it doesn't save

**The build still has to run.** An agent that edits a template doesn't know whether the edit worked until Hugo builds. A failed build means reading the error, changing something and building again, and that loop is made of steps – the expensive unit. A CMS has no build step to fail.

**Templates are code.** Go templates are terse, and the error rarely points at the line that's wrong. A CMS theme isn't something you'd hand an agent in the first place, so Hugo offers more surface to work on. More surface, more tokens.

**A large repository is a lot of reading.** A question about one page can send an agent through the theme, the partials and the config before it answers. This is the cost that grows quietly, and the one you can do most about.

**Neither approach gives the agent eyes.** Whether the page looks right is still something you look at.

How large the overall difference is depends on the repository and the job. A one-line fix costs about the same either way. A rename across a hundred files does not.

## Setting a Hugo repo up for it

- **A short file at the repository root.** `AGENTS.md` or `CLAUDE.md`, naming the conventions: where content lives, which configuration format the site uses, what shouldn't be edited, how to build. Read once per session, it saves the exploring.
- **`llms.txt`.** A plain-text index of the site, generated on every build rather than maintained by hand. The [HugoKit Starter](/docs/your-first-hugo-site/#hugokit-starter-or-blank) ships with the output format configured.
- **A Markdown copy of every page.** Add `md` to the `page` output kind in `hugo.toml` and Hugo writes an `index.md` beside each `index.html`. This site does it: append `index.md` to any docs URL and you get the source.
- **Page bundles.** Keeping a post's images in the post's own folder means everything an edit touches sits in one directory.
- **A build the agent can run itself.** `hugo --gc --minify` returns a real exit code. An agent that can build can check its own work instead of handing you something unverified.

## Where HugoKit fits

HugoKit doesn't drive the agent. It's the other half of the arrangement: the place you check what came back.

- [**Preflight**](/docs/preflight/) builds the site and checks configuration, `baseURL`, generated assets, templates and static JavaScript before anything is published. Suggested fixes are shown as diffs and require approval.
- [**Site Health**](/docs/site-health/) reports internal links, missing alt text, image size, deprecated configuration and missing front matter – the failure modes of a bulk edit.
- [**The config editor**](/docs/editing-your-config/) shows a diff and waits for approval before writing to the file.
- [**Snapshots**](/docs/snapshots-and-undo/) keep the previous version of every file HugoKit saves, so a change can be taken back without reaching for git.

The division of labour: the agent works in the files, and you look at the result before it goes out.

> See [Hugo vs WordPress](/docs/hugo-vs-wordpress/) for the wider comparison of the two workflows.
