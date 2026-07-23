{{- /* The Markdown version of a single page (outputFormats.md in hugo.toml).

      Lives as /docs/<slug>/index.md next to the HTML and is linked from head
      with rel="alternate". The audience is crawlers and models that would rather
      have the source than a DOM: same text, no navigation, no chrome.

      .RawContent is the file's Markdown as it stands on disk – not the rendered
      HTML. Shortcodes are therefore not executed; the pages we have use none. */ -}}
# {{ .Title | plainify }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{- with .Params.group }}
Section: {{ . }}
{{- end }}
Source: {{ .Permalink }}
{{- with .Lastmod }}{{ if not .IsZero }}
Updated: {{ .Format "2006-01-02" }}
{{- end }}{{ end }}

---

{{ .RawContent }}

---

From [{{ site.Title }}]({{ site.Home.Permalink }}) – {{ site.Params.description }}
