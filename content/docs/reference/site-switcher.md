---
title: "Site switcher"
summary: "Top-of-sidebar control that flips between every Hugo site you've added to HugoKit."
group: "App surface"
order: 50
symbol: "macwindow"
---

The Site switcher lives at the top-left of the compact panel. It shows the
active site's emoji and name, and tapping it reveals the full list of added
sites.

## Adding sites

Use **Add site** at the bottom of the switcher, or drag a Hugo project
folder onto the HugoKit window. HugoKit validates that the folder contains
a `hugo.toml`, `config.toml`, or `config.yaml` before adding.

## Auto-scan

When **Settings → Auto-Scan** is configured, HugoKit watches a parent
folder at startup and adds any new Hugo sites it finds to the switcher
automatically.

## Site emoji

Tap the emoji on the active site card to open the native emoji picker and
assign a different glyph per site. The choice persists across launches.

## Related

{{< doc-card "/docs/getting-started/" >}}
