---
title: "Server"
summary: "Run Hugo's local preview server directly from HugoKit, with live reload and structured log output."
group: "Core"
order: 10
symbol: "globe"
---

The Server card is HugoKit's front-end to `hugo server`. It starts, stops,
and monitors the local development server for the active site, and surfaces
build output in a structured log panel.

## Controls

- **Play / Stop** — starts or stops Hugo on the configured port.
- **Port** — defaults to `1313`. Change it if another process is using the
  port; HugoKit will keep the value for the next launch.
- **Drafts** — toggles `--buildDrafts`. No deploy side-effects.
- **Open in browser** — opens the preview URL in your default browser.

## States

| State    | Indicator colour | Meaning                                               |
|----------|------------------|-------------------------------------------------------|
| Stopped  | Grey             | No process running.                                   |
| Starting | Amber            | Hugo is initialising — usually under a second.        |
| Running  | Teal (pulsing)   | `hugo server` is up, watching files.                  |
| Failed   | Red              | Hugo exited with an error. First line shown inline.   |

## Meta chips

When collapsed, the Server card can show up to four chips:

- `localhost:{port}` — current port, monospaced.
- `live reload` — present when `--disableLiveReload` is not set.
- build duration — e.g. `42ms`, only after the first successful build.
- `drafts` — present when the Drafts toggle is on.

Chips can be disabled globally under **Settings → Appearance → Show card
labels**.

## Related

{{< doc-card "/docs/content-workflow/" >}}

{{< doc-card "/docs/getting-started/" >}}
