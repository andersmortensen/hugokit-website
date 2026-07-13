{{- /* Markdown-udgaven af en enkeltside (outputFormats.md i hugo.toml).

      Ligger som /docs/<slug>/index.md ved siden af HTML'en og linkes fra head
      med rel="alternate". Målgruppen er crawlere og modeller der hellere vil
      have kilden end en DOM: samme tekst, ingen navigation, ingen chrome.

      .RawContent er filens Markdown som den står på disken – ikke det rendrede
      HTML. Shortcodes udføres altså ikke; de sider vi har, bruger ingen. */ -}}
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
