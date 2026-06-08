---
title: "Configuration"
summary: "Visual editor for hugo.toml, hugo.yaml, and hugo.json — with validation and format conversion."
group: "Core"
order: 40
symbol: "gear"
---

The Configuration card parses your site's Hugo config file and exposes it as
a structured form. Edits round-trip back to disk in the original format.

## Supported formats

- `hugo.toml` / `config.toml`
- `hugo.yaml` / `config.yaml`
- `hugo.json` / `config.json`

HugoKit detects which file is in use and preserves its format on save. You
can also convert between formats via the format picker at the top of the
editor.

## Editing

Top-level fields (`baseURL`, `title`, `languageCode`, etc.) are shown as
individual inputs. Nested tables and params are grouped visually and can be
expanded or collapsed.

Invalid values are flagged inline — you can't save a malformed config.

## Meta chip

The card shows the active theme name monospaced under the title when
collapsed, plus an install count if any additional themes are present in the
themes folder.

## Related

{{< doc-card "/docs/getting-started/" >}}
