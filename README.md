# HugoKit website

Hugo source for hugokit.com. Product copy is English and lives in `content/`.

## Template ownership

- `hugo.toml` selects `['hugokit-v3', 'hugokit']`, in that order.
- `themes/hugokit-v3/` owns the homepage and shared browser chrome.
- `themes/hugokit/` supplies fallback docs, changelog, privacy and 404 templates.
- Keep the fallback theme: it also supplies SEO, output formats and consent.
- `RELEASING.md` describes the separate release and Sparkle contracts.

## Active style layers

`themes/hugokit-v3/assets/scss/main.scss` is the stylesheet entry point.
Legacy fallback modules load first, including docs, changelog and consent.
The active website layers then load in this order:

1. `v3-tokens` – existing HugoKit colours and shared values.
2. `site-system` – browser tokens, typography, navigation, buttons and footer.
3. `site-home` – homepage sections, screenshots, features and FAQ.
4. `v3-dialog` – the “What is Hugo?” dialog.
5. `site-dialog` – current-release dialog presentation.
6. `v3-site-chrome` – docs, changelog, privacy and 404 reading layouts.

Older v3 modules remain in the repository but are not imported by this bundle.
Shared sizing lives in `site-system`: text 44rem, media 70rem, site 76rem.
Body text and ordinary headings use Carrypoint's system stack:
`-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, "Segoe UI", sans-serif`.
Primary navigation links are 17px on desktop and 18px in the mobile menu; Download and the version control are 15px.
Body text is 17px/1.6 with normal tracking; ordinary headings use weight 500,
tracking -0.015em and line-height 1.25. The hero keeps its existing size with
weight 500, tracking -0.025em and line-height 1.1.
The HugoKit wordmark keeps Manrope 600; Figtree is not installed.
Docs use a 250px sidebar and collapse its native disclosure at 1020px.
Browser layout overrides exclude the standalone `html.in-app` presentation.
Docs and release reading text use `--ink`; leads, descriptions and metadata use
`--muted`. An active docs link has both weight and underline, so location does
not depend on colour alone.

## Homepage presentation

The selected A layout keeps the full-width dashboard image and brings it closer
to the headline: hero top padding is 64px, or 40px at 600px and below; lead and actions
start after 20px and 24px, and the image after 8px, or 12px on mobile.

- The workflow and its product stories form one chapter. Shared spacing roles
  are `--section-space`, `--story-space` and `--detail-space`.
- Product stories focus the original Preflight findings and deploy-target
  screenshots with CSS crops. Each crop is a native button: click, Enter or
  Space opens the original full image. Escape or Close returns focus to the
  trigger; Tab stays on the lightbox close control while it is open.
  These captures do not depict a file diff or deployment plan.
- Six features with `highlight: true` appear first. Native “More features”
  disclosure contains the remaining eight; each feature keeps its full detail,
  points and docs links through `v3-feature-row.html`.
- The note and download sections use a top rule and `--detail-space` to give the
  page a clear ending without another card treatment.

## Shared behaviour

- `v3-navigation.html` and the v3 `footer.html` provide common browser links.
- `baseof.html` loads navigation, release dialog, consent, analytics and scripts.
- `v3-scripts.html` loads `v3-home.js` on every browser route.
- That script handles mobile navigation, theme labels and the Hugo dialog.
- The inherited `head.html` owns the stored `hk-theme` choice and code copying.
- Reduced motion skips animation without skipping theme or copy-button setup.
- The homepage hero is a static light/dark screenshot through `shot.html`.
- Manual theme changes update screenshot sources as well as the colour scheme.
- Links and controls use underline, fill or opacity for hover, focus and press.
  Most shared feedback lasts 140ms; the primary button uses 150ms. These states
  do not change a control's position or scale. Keyboard focus remains visible.
- The inherited logo assembly, docs search entrance, copy receipt and View
  Transitions remain progressive effects. The new homepage has no entrance
  word mask, staggered section reveal or animated terminal cursor.
- `prefers-reduced-motion` disables animations and transitions without hiding
  content or skipping the theme, search and copy setup.

Docs live under `/docs/`; their groups come from `content/docs/_index.md`.
The docs `shot` shortcode omits unavailable captures and uses the available
variant when only one exists. Missing assets never render as broken images.
Hub and sidebar search share the inline `hk-docs-index` and `docs-search.html`.
Preserve their search hooks, clear button, Escape reset and Enter navigation.
Also preserve Markdown outputs, `/llms.txt`, RSS and sitemap generation.

## Release boundary

Visual work must not change release fields in `hugo.toml`, `static/appcast.xml`,
download metadata, release notes or their URLs. Follow `RELEASING.md` separately.
Keep the standalone changelog `in-app.html` output and its `.release-*` hooks.

## Signed release-note stylesheet

The signed 0.5.0 HTML release-note asset references the older stylesheet
`/css/main.min.f2bac2c690580b4c19fe5d635a8e0601edf491237861a2ce30e595f8ed1967eb.css`.
An exact copy is retained under `themes/hugokit-v3/static/css/` so a clean site
upload preserves that URL. Its SHA-256 matches the fingerprint in the filename.
Keep this compatibility asset unchanged while the signed release note uses it;
new browser pages continue to use the current Hugo-generated stylesheet.

## Build and smoke check

```sh
hugo --destination /private/tmp/hugokit-build
```

Check `/`, `/docs/`, `/docs/preflight/`, `/docs/editing-content/`,
`/docs/hugo-server-port-already-in-use/`, `/changelog/`, `/changelog/0.4.0/`,
`/changelog/0.4.0/in-app.html`, `/changelog/0.5.0/`,
`/changelog/0.5.0/in-app.html`, `/privacy/` and `/404.html`.
Cover desktop/mobile, light/dark, keyboard navigation and reduced motion.
Exercise docs search, code copying, both dialogs and Cookies reopening.
Check internal fragments, output feeds and unchanged release contracts.
Remove temporary build and browser QA artifacts after verification.

## Publishing and rollback

Commit and push the website before publishing through HugoKit's existing
production target for this project. Its production build uses `hugo --gc --minify`.
Review the publish plan, then verify the public homepage, docs, release page,
appcast and retained signed-note stylesheet after upload.

To roll back this redesign, revert the website commit while retaining the
compatibility stylesheet documented above. The previous source is `22b0d0d`,
which already contains the 0.5.0 release metadata. Rebuild and publish that
rollback; do not downgrade the appcast or signed release assets with the layout.
