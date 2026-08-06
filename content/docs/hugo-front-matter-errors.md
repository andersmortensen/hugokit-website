---
title: "Hugo won't build: front matter errors"
description: "A front matter error looks cryptic, but the usual causes are colons, dates, quotes, indentation or delimiters."
group: "Fixing common Hugo problems"
weight: 90
tags: [content, troubleshooting]
---

YAML errors are terse, but the underlying fixes are usually small. These are the messages you are most likely to meet.

## "mapping values are not allowed in this context"

```
Error: failed to unmarshal YAML: yaml: line 2: mapping values are
       not allowed in this context
```

There's an unquoted colon in a value:

```yaml
---
title: Hugo: a static site generator
---
```

YAML reads the first colon as *this is a key*, and then finds a second one and gives up. Quote the value:

```yaml
---
title: "Hugo: a static site generator"
---
```

Quote strings containing a colon or beginning with YAML indicator characters such as `#`, `-`, `*`, `&`, `{`, `[` or `@`.

## "cannot unmarshal ... into Go value of type time.Time"

```
Error: cannot unmarshal !!str `5/3/24` into Go value of type time.Time
```

Hugo parses `date` as an actual date, not as text, and it wants ISO 8601:

```yaml
date: 2024-03-05
date: 2024-03-05T09:30:00+01:00   # with a time and a zone
```

`5/3/24` is ambiguous between date conventions. Use an ISO 8601 date.

The same applies to `publishDate`, `expiryDate` and `lastmod`.

## "did not find expected key"

```
Error: yaml: line 4: did not find expected key
```

An unclosed quote can make YAML parse later lines as part of the same value, so the reported line may appear below the actual error:

```yaml
---
title: "The Hugo build       ← quote never closed
date: 2024-03-05             ← YAML thinks this is still the title
draft: false                 ← error reported here
---
```

Invalid indentation can produce the same error. Use spaces rather than tab characters in YAML.

## The delimiters matter too

Three formats, three delimiters – and they aren't interchangeable:

```yaml
---
title: "YAML"
---
```

```toml
+++
title = "TOML"
+++
```

```json
{
  "title": "JSON"
}
```

Opening and closing delimiters must use the same front matter format.

## Find the file, not just the error

Hugo names the file it choked on. If it doesn't, or if you want to know how many more are waiting:

```bash
hugo --logLevel debug
```

Hugo may stop at the first invalid file. Rebuild after each fix to find any remaining errors.

> **In HugoKit:** Preflight reports recognised front matter parse errors, and Site Health reports missing `title`, `date` and `draft` fields.
