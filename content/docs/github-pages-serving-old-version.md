---
title: "GitHub Pages keeps serving the old version of your site"
description: "You pushed. The build was green. The live site is unchanged. Usually two deploy mechanisms are fighting over the same repository – and only one of them is winning."
group: "Fixing common Hugo problems"
weight: 110
tags: [publishing, github-pages, troubleshooting]
---

You publish. Git accepts the push. GitHub reports no failure. And hugokit.com – or whatever your site is called – shows exactly what it showed yesterday.

Before you look at anything else: **open the site in a private window.** A stale service worker or a cached HTML file explains this often enough to be worth thirty seconds.

If it's still old, the cause is almost always this one.

## Two deploy mechanisms, one repository

GitHub Pages can get its files from one of two places, and it uses exactly one:

- **Deploy from a branch** – Pages serves whatever is on the branch you name, typically `gh-pages`. You build the site yourself and push the `public/` folder there.
- **GitHub Actions** – Pages serves whatever a workflow uploads. GitHub builds the site in the cloud.

The setting lives in **Settings → Pages → Build and deployment → Source**. It's one or the other.

Now the failure: your repository has a workflow in `.github/workflows/` that uses `actions/deploy-pages`, and the Pages source is set to **GitHub Actions**. Meanwhile you – or your tool – are building locally and pushing to `gh-pages`.

Both of those things happen. Both succeed. And Pages ignores the branch entirely, because it's listening to the workflow. Your `gh-pages` branch fills up with builds nobody serves.

The reverse happens too: the source is set to a branch, and the Actions workflow runs on every push, builds beautifully, uploads its artifact, and GitHub throws it away.

## Pick one

**If you want GitHub to build:** leave the workflow, set the source to GitHub Actions, and stop pushing to `gh-pages`. The branch is dead weight – delete it so it can't confuse the next person.

**If you want to build locally:** delete the workflow file, set the source to *Deploy from a branch* → `gh-pages` → `/ (root)`, and push your `public/` folder there.

Building locally has one real advantage: what you tested is byte-for-byte what ships. Cloud builds run a different Hugo version than the one on your machine unless you pin it, and a version skew you can't reproduce locally is a bad afternoon.

## The other suspects

If the source is right and the site is still stale:

- **The workflow ran on the wrong branch.** Check its `on: push: branches:` – a workflow that only triggers on `main` does nothing when you push to `master`.
- **`.nojekyll` is missing.** GitHub runs Jekyll over branch deploys unless a file called `.nojekyll` sits in the root of what you publish. Jekyll ignores folders starting with an underscore, so a site that uses them loses those files silently.
- **Pages is just slow.** A minute or two is normal. Ten is not.

## And if the site isn't stale but wrong

If the deploy landed and the page is up but the CSS is gone, that's a different problem – it's [baseURL and the repository subpath](/docs/hugo-broken-links-missing-css-github-pages/).

> HugoKit checks for exactly this conflict before it publishes. If it's set to build locally and push to `gh-pages`, and it finds a workflow in `.github/workflows/` that deploys to Pages, it stops and tells you – because pushing would look like it worked. The auto-fix is the destructive one in the app, so read the diff: it deletes the workflow file, commits, pushes, and switches your Pages source over to `gh-pages` through the GitHub API. See [Publishing to GitHub Pages](/docs/publishing-to-github-pages/) and [Preflight](/docs/preflight/).
