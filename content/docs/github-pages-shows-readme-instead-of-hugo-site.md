---
title: "GitHub Pages shows your README instead of your Hugo site"
description: "You pushed your Hugo project and GitHub Pages serves the README as the homepage. The Pages source is set to a branch, so GitHub is running Jekyll on your source."
group: "Fixing common Hugo problems"
weight: 50
tags: [publishing, github-pages, troubleshooting]
---

You push your Hugo project to GitHub, enable Pages, and the site that comes up is your `README.md` – rendered as a web page, with the wrong theme and none of your content.

GitHub isn't building your Hugo site. It's running **Jekyll** on the folder you pushed, and Jekyll, finding no `index.html`, serves the README instead.

## Why it happens

Pages has two very different modes:

- **Deploy from a branch** – GitHub takes the files on a branch and runs them through Jekyll. Fine for a Jekyll site or for pre-built HTML. It has no idea what Hugo is: your `content/`, `layouts/` and `hugo.toml` mean nothing to it, and `public/` isn't in the repository at all, because your `.gitignore` excludes it.
- **GitHub Actions** – a workflow you supply builds the site and publishes the result. This is the mode a Hugo site wants.

If Pages is set to *Deploy from a branch* → `main` → `/ (root)` while your repo holds Hugo **source**, you get the README. Every time.

## Fix: build with Actions

**1. Add a workflow** at `.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site to Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.148.2
    steps:
      - name: Install Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb
          sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - id: pages
        uses: actions/configure-pages@v5
      - run: hugo --gc --minify --baseURL "${{ steps.pages.outputs.base_url }}/"
        env:
          HUGO_ENVIRONMENT: production
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Pin `HUGO_VERSION` to the version you build with locally, and use the **extended** build if your theme compiles SCSS – most do.

**2. Switch the Pages source.** Repository → **Settings → Pages → Build and deployment → Source → GitHub Actions**. This is the step people skip, and without it the workflow builds a site nobody serves.

**3. Push.** The workflow runs on every push to `main` from now on.

## The other way: push the built site

If you'd rather build on your own machine, push only the contents of `public/` to a `gh-pages` branch and point Pages at *that* branch. Add an empty `.nojekyll` file at its root – otherwise Jekyll will still process the output and quietly drop every file and folder that starts with an underscore.

Pick one of the two. Having an Actions workflow *and* a `gh-pages` branch means two things are publishing to the same place, and the last one to finish wins.

## Still the README?

- Check `Settings → Pages` again – the source really does reset when a repository is renamed or transferred.
- Check that the workflow run actually succeeded, under the **Actions** tab.
- Give it a minute. GitHub's CDN can serve the old page briefly after a successful deploy.

> HugoKit writes the workflow file for you, pins it to the Hugo version you're running, and sets the Pages source over the API when you connect the repository – so the mode and the build always agree. It also refuses to publish when it finds an Actions workflow and a `gh-pages` setup fighting each other. See [Publishing to GitHub Pages](/docs/publishing-to-github-pages/).
