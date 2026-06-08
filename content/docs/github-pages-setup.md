---
title: "Deploying to GitHub Pages"
date: 2026-04-14
summary: "Connect your GitHub account once, then push every site to Pages with a single click."
category: "Publishing"
difficulty: "Beginner"
readMinutes: 6
weight: 2
---

HugoKit publishes to GitHub Pages via a generated Actions workflow. You sign
in once, and every site gets its own repo + build pipeline.

## Connect GitHub

Open **Settings → Publish** and choose **Sign in with GitHub**. HugoKit uses
the device-code flow — copy the short code, paste it on the page that opens
in your browser, and approve access. The token lives in the macOS Keychain.

## Add a deploy target

In the main window's **Publish** card, choose **Set up GitHub Pages**. Pick
an existing repo or let HugoKit create one for you. The workflow file is
committed to `.github/workflows/hugokit-deploy.yml` on first push.

## Publish

Hit **Publish** in the Publish card. HugoKit runs the preflight checks
(subpath issues, missing front matter, broken shortcodes), builds the site,
commits the `public/` output, and pushes. GitHub Pages picks it up within a
minute or two.

## Multi-target

You can add more than one target per site — e.g. production on GitHub Pages
and a staging copy on SFTP. Each target tracks its own deploy history.
