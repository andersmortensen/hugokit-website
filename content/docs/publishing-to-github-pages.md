---
title: "Publishing to GitHub Pages"
description: "Connect a Hugo site to a GitHub repository and publish it to GitHub Pages from HugoKit – cloud builds, local builds, and the subpath trap that breaks most first deploys."
group: "Publishing"
weight: 10
tags: [publishing, github-pages]
---

HugoKit publishes to GitHub Pages the way you'd do it by hand: it commits your project, pushes it, and lets GitHub Actions build the site. The difference is that you never open a terminal, and the checks that usually bite you run first.

## Before you start

You need a GitHub account and **a repository for the site**. HugoKit can't create the repository for you – make an empty one on github.com first, public or private, both work.

## Connect GitHub

Go to **Settings → Accounts → GitHub → Sign In**. HugoKit opens your browser and shows a code:

1. Copy the code from HugoKit (click it).
2. Paste it into the GitHub page that opened.
3. Authorise HugoKit.

The token is stored in your macOS Keychain, never in a file. HugoKit asks for the `repo` and `workflow` scopes – `workflow` is needed because publishing writes the Actions workflow into your repository.

## Add the deploy target

**Deploy → Add Deploy Target → GitHub Pages.** Pick your repository from the list, give the target a name if you want one, and choose how the site gets built:

| Build Method | Deploy Content | What happens on publish |
|---|---|---|
| Cloud Build | Full Project | Your project is pushed; GitHub Actions runs Hugo and deploys. **The default.** |
| Local Build | Full Project | HugoKit runs Hugo on your Mac, then pushes the project. |
| (either) | Build Folder Only | HugoKit runs Hugo on your Mac and pushes only the built site to a `gh-pages` branch. Your source never leaves the Mac. |

When you press **Done**, HugoKit wires the folder up: it makes it a git repository if it isn't one, points `origin` at your repo, writes the correct `baseURL` into your Hugo config, adds a `.gitignore` if you don't have one, and turns GitHub Pages on for the repository.

**Nothing is pushed yet.** Your files stay on your Mac until you publish.

## Publish

`⌘P`, or the **Publish** button in the toolbar. With a cloud build, HugoKit:

1. Writes or updates `.github/workflows/hugo-deploy.yml` – pinned to the Hugo version you're running, so the cloud builds your site with the same Hugo you preview it with.
2. Commits everything (`Updated 13 Jul 2026, 14:32 via HugoKit`, unless you give it a message).
3. Pushes. If GitHub rejects the push because the remote moved on, HugoKit pulls with rebase and pushes again.
4. Watches the Actions run and shows the live step names – you see the build progress in the app instead of on a browser tab.
5. Waits a moment for the CDN, then reports the site as live.

The timeline shows **Save version → Push to GitHub → Build site → Deploy**. If the workflow doesn't finish within five minutes, HugoKit stops waiting and tells you to check Actions on github.com – the build usually failed there.

After a successful publish, HugoKit probes the live URL – the dot on the target row tells you whether the site actually responds, and **Check if Live** in the target's **⋯** menu runs the same probe on demand. And if the site has more than one active target, **Publish to All Targets** on the Deploy page sends it to every one of them.

The flags Hugo builds with – garbage collection, minify and a build environment – are set per site on the Deploy page. See [Build flags](/docs/build-flags/).

## Git checks before a publish

Publishing to GitHub Pages means committing and pushing, so what's in git decides what goes live. Before a publish, HugoKit reads the site's git state and shows it at the top of the Deploy page – the branch, whether anything is uncommitted, and how the remote compares.

Three things it will stop for:

- **Uncommitted changes** – work that isn't committed won't be in the push. Flagged as a warning.
- **A different branch** – the publish pushes the branch the target is configured for; if you're working on another one, your changes aren't in that push at all. A warning.
- **A remote that doesn't match** – the target points at one repository and `origin` points at another. Compared on the normalised `owner/repo`, so `https`, `ssh` and a `.git` suffix all count as the same repo. An error.

Warnings and errors hold the publish until you've dealt with them; anything only worth noting is written to the log and doesn't interrupt. (An FTP/SFTP publish builds from your working tree and never touches git, so there the same state is just a note.)

## The subpath trap

This one catches almost everyone, and it's the reason [preflight](/docs/preflight/) exists.

A repository named `my-blog` deploys to `https://you.github.io/my-blog/` – not to the root of the domain. Every absolute path in your templates (`/css/main.css`, `/js/app.js`) now points at `https://you.github.io/css/main.css`, which doesn't exist. The HTML loads; the styling doesn't.

HugoKit sets `baseURL` correctly when it connects the repository, and preflight checks your templates for hardcoded paths before each publish and offers to rewrite them through Hugo's `relURL`. The long version – what breaks, why, and how to fix it by hand – is on [Broken links and missing CSS after deploying to GitHub Pages](/docs/hugo-broken-links-missing-css-github-pages/).

A repository named exactly `<your-username>.github.io` deploys to the root and has no subpath at all.

## Custom domains

Put a `CNAME` file with your domain in `static/CNAME`, as GitHub expects. HugoKit reads it and builds with that domain as the `baseURL`, and preflight then stops nagging about the subpath – a custom domain doesn't have one. HugoKit doesn't create the file for you.

## When something goes wrong

| Message | What to do |
|---|---|
| `The GitHub token has expired` | Sign in again under Settings → Accounts. |
| `The site was changed elsewhere` | Someone (or something) pushed to the repo. Pull the latest changes, then publish again. |
| `GitHub Actions didn't respond within 5 minutes` | The workflow is stuck or failed. Open the repository on github.com → Actions. |
| `Push timed out` | Slow or interrupted connection to GitHub. Try again. |
