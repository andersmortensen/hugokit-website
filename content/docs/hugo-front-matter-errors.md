---
title: "Hugo won't build: front matter errors"
description: "\"mapping values are not allowed\", \"cannot unmarshal into time.Time\", \"did not find expected key\" – three YAML errors from one Markdown file, and what each one is really telling you."
group: "Fixing common Hugo problems"
weight: 90
---

You add a post, Hugo refuses to build, and the error is about YAML rather than about anything you recognise as your problem. Here are the three you'll actually meet.

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

A colon inside a value always needs quotes. So does a value starting with `#`, `-`, `*`, `&`, `{`, `[` or `@`. When in doubt, quote it – there's no cost to quoting a string that didn't need it.

## "cannot unmarshal ... into Go value of type time.Time"

```
Error: cannot unmarshal !!str `5/3/24` into Go value of type time.Time
```

Hugo parses `date` as an actual date, not as text, and it wants ISO 8601:

```yaml
date: 2024-03-05
date: 2024-03-05T09:30:00+01:00   # with a time and a zone
```

`5/3/24` is ambiguous in a way no parser can resolve – 5 March or 3 May depends on which country wrote it. Hugo won't guess, and neither should you.

The same applies to `publishDate`, `expiryDate` and `lastmod`.

## "did not find expected key"

```
Error: yaml: line 4: did not find expected key
```

Usually an unclosed quote. The parser runs past the end of the value, swallows the next line as part of the string, and then trips on the line after that – which is why the reported line number is often one or two below the actual mistake:

```yaml
---
title: "The Hugo build       ← quote never closed
date: 2024-03-05             ← YAML thinks this is still the title
draft: false                 ← error reported here
---
```

The other cause is indentation. YAML uses spaces, never tabs, and a tab character you can't see will produce exactly this error.

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

An opening `---` with a closing `+++` is not front matter. It's a page whose content begins with a stray dash.

## Find the file, not just the error

Hugo names the file it choked on. If it doesn't, or if you want to know how many more are waiting:

```bash
hugo --logLevel debug
```

Build failures stop at the first bad file, so fixing one and rebuilding is a loop you may run a few times.

> HugoKit fixes all three: it quotes values with a stray colon, converts a date to ISO 8601, and closes an unclosed quote – but only when the value clearly *started* with a quote, so that `title: Don't Panic` is left alone. It also scans your whole `content/` folder for pages missing a `title`, a `date` or a `draft` flag and reports them in [Site health](/docs/site-health/), which is how you find the other twelve files before Hugo does.
