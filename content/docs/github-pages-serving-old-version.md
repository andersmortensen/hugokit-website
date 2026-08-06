---
title: "GitHub Pages keeps serving the old version of your site"
description: "The push worked, but the site still looks unchanged. Check the Pages source, workflow and cache."
group: "Fixing common Hugo problems"
weight: 110
tags: [publishing, github-pages, troubleshooting]
---

The push succeeds and GitHub reports no failure, but the published site still shows the previous version.

Before you look at anything else: **open the site in a private window.** A stale service worker or a cached HTML file explains this often enough to be worth thirty seconds.

If the private window shows the old version too, check the Pages deployment source.

## Two deploy mechanisms, one repository

GitHub Pages can get its files from one of two places, and it uses exactly one:

- **Deploy from a branch** – Pages serves whatever is on the branch you name, typically `gh-pages`. You build the site yourself and push the `public/` folder there.
- **GitHub Actions** – Pages serves whatever a workflow uploads. GitHub builds the site in the cloud.

The setting lives in **Settings → Pages → Build and deployment → Source**. It's one or the other.

Now the failure: your repository has a workflow in `.github/workflows/` that uses `actions/deploy-pages`, and the Pages source is set to **GitHub Actions**. Meanwhile you – or your tool – are building locally and pushing to `gh-pages`.

When the source is **GitHub Actions**, Pages ignores builds pushed to `gh-pages`.

When the source is a branch, Pages ignores artifacts uploaded by the Actions workflow.

## Pick one

**To build with GitHub Actions:** keep the workflow, set the Pages source to **GitHub Actions** and stop publishing to `gh-pages`.

**To build locally:** remove the Pages workflow, set the source to **Deploy from a branch → `gh-pages` → `/ (root)`**, and publish the built files to that branch.

A local build publishes the files built on your machine. For cloud builds, pin the Hugo version so local and GitHub builds use the same release.

## The other suspects

If the source is right and the site is still stale:

- **The workflow ran on the wrong branch.** Check its `on: push: branches:` – a workflow that only triggers on `main` does nothing when you push to `master`.
- **`.nojekyll` is missing.** GitHub runs Jekyll over branch deploys unless a file called `.nojekyll` sits in the root of what you publish. Jekyll ignores folders starting with an underscore, so a site that uses them loses those files silently.
- **Pages is just slow.** A minute or two is normal. Ten is not.

## And if the site isn't stale but wrong

If the deploy landed and the page is up but the CSS is gone, that's a different problem – it's [baseURL and the repository subpath](/docs/hugo-broken-links-missing-css-github-pages/).

> **In HugoKit:** Preflight reports a conflict between a Pages workflow and a `gh-pages` target before publishing.
