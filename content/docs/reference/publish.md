---
title: "Publish"
summary: "Deploy the active site to GitHub Pages or any FTP / SFTP host, with smart sync and preflight checks."
group: "Core"
order: 20
symbol: "paperplane.fill"
---

The Publish card handles everything from the moment you hit Publish: it runs
preflight validation, builds the site, and pushes the result to one or more
configured deploy targets.

## Targets

A site can have one or more deploy targets:

- **GitHub Pages** — uses your stored GitHub token. A workflow is committed
  to `.github/workflows/hugokit-deploy.yml` on first push.
- **FTP / SFTP** — direct upload. HugoKit tracks a per-site SHA256 manifest
  so subsequent publishes only upload changed files.

Each target has its own status, history, and log.

## Preflight

Before every publish HugoKit runs a set of checks:

- Subpath correctness in templates and JS
- Missing or malformed front matter
- Broken shortcodes
- Git working-tree state

Issues get a fix preview — you see exactly what will change before accepting.

## States

| State           | Indicator colour | Meaning                                              |
|-----------------|------------------|------------------------------------------------------|
| Not configured  | Grey             | No deploy target set up yet.                         |
| Ready           | Pink             | At least one target configured, nothing in flight.   |
| Publishing      | Amber            | Build / upload in progress.                          |
| Failed          | Red              | Last publish failed — inspect the log for details.   |

## Related

{{< doc-card "/docs/github-pages-setup/" >}}
