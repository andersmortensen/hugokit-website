---
title: "HugoKit"
description: "A Mac app for Hugo: run the server, preview your pages and publish your site from one window. Free, native, no terminal – built by one person for his own sites."

hero:
  # To-tone headline: headingDim dæmpes (muted), heading bærer pointen i ink.
  headingDim: "Hugo,"
  heading: "without the terminal."
  lead: "HugoKit is a Mac app that runs, previews and publishes the Hugo sites you already have. Same Hugo, same files – no terminal."
  more: "Learn more"
  # Hero-mediet: loopende app-optagelse. Screenshottene bliver stående som
  # fallback (noscript) og som kilde til vinduesramme + skygge i videofilerne.
  screenshot: "/images/app/dashboard-light.webp"
  screenshotDark: "/images/app/dashboard-dark.webp"
  alt: "The HugoKit main window: starting the server, checking the site, editing content, watching the build log and publishing – all from one window."
  video:
    lightMp4: "/video/hero-light.mp4"
    darkMp4: "/video/hero-dark.mp4"
    posterLight: "/video/hero-poster-light.webp"
    posterDark: "/video/hero-poster-dark.webp"

about:
  intro: "The same Hugo you already use – run, preview and publish, all from one window."

# Fakta-rækken – tre bånd-fakta. Fakta som fakta, ikke tal-formede ikke-tal.
facts:
  - value: "Free"
    label: "no license, no subscription"
    glyph: "free"
  - value: "Any editor"
    label: "works beside your editor and AI agents"
    glyph: "editor"
  - value: "No cloud"
    label: "no account; your files stay on your Mac"
    glyph: "lock"

# Loop-sektionen – de tre moments som nummererede trin (01/02/03).
loop:
  label: "The loop"
  heading: "The whole loop."
  sub: "Preview, preflight, publish – in that order."

# Den fulde feature-liste – hvert punkt er forankret i docs' features.md.
features:
  title: "Also in HugoKit"
  items:
    - name: "All your sites"
      glyph: "sites"
      accent: "pink"
      # spot: meta-linjen på kvartet-kortet i Why. Hentes ikke fra prosaen – den står her,
      # så kortet aldrig kan drifte fra det features.detail/points faktisk siger.
      spot:
        key: "⌘O"
        text: "Add a site"
      text: "Add sites one by one, or point HugoKit at a folder and it finds them itself. Pin your favourites; give each site its own emoji."
      docs:
        - "/docs/getting-started/#watch-a-folder"
      detail: "Every Hugo site you have, in one sidebar. Add them one at a time with `⌘O`, or point HugoKit at the folder you keep your projects in and let it find them itself."
      points:
        - "Watch a folder: HugoKit scans up to three levels deep, adds every folder that holds a Hugo config, and skips the ones that never contain a site of their own – public, resources, themes, archetypes, .git, node_modules, .build and vendor."
        - "A folder counts as a site when it has a Hugo config file. If the config is there but the folders around it look incomplete, the site is added with a warning rather than turned away."
        - "Pin the ones you use most, and give each site an emoji so the sidebar is scannable at a glance."
        - "Each site keeps its own settings – its port, its content toggles, its deploy destinations."
    - name: "Create new sites"
      glyph: "create"
      text: "Start from the HugoKit Starter template – pick sections and features up front – or from a blank Hugo site. Git init included."
      # docs: kun sider der faktisk beskriver funktionen. Titlen hentes fra siden selv.
      docs:
        - "/docs/getting-started/#create-a-new-site"
      detail: "`⇧⌘N` gives you two templates. The HugoKit Starter is a complete, working site – kept as a real, running Hugo project inside the app rather than a pile of snippets. Blank is the plain output of hugo new site with a small welcome page."
      points:
        - "The Starter always brings the essentials – a 404 page, robots.txt, a sitemap, an RSS feed, an SEO partial and light/dark mode – plus an archive, a colophon, a `⌘K` search palette, a sharing image drawn per page and the whole site as llms.txt."
        - "You pick the rest up front: a blog with sample posts, a projects section, an about page, a theme toggle and tags."
        - "The Starter is TOML-only and needs Hugo 0.146 or newer; Blank lets you choose the config format."
        - "Either one can initialise a git repository, open the site and start the server the moment it is done."
    - name: "Site health"
      glyph: "health"
      accent: "blue"
      spot:
        key: "⇧⌘H"
        text: "From anywhere"
      text: "Every site gets a score: front matter checks, content stats and a build trend, with the issues listed out. ⇧⌘H from anywhere."
      docs:
        - "/docs/site-health/"
      detail: "Preflight blocks what breaks a deployed site. Site health – `⇧⌘H` from anywhere – tells you what the site is like to read: broken links, images without alt text, a config key Hugo deprecated two versions ago. It points; you decide."
      points:
        - "Nine checks run in parallel: broken internal links, images without alt text, images over 500 KB, deprecated config keys, a missing favicon, build-time regressions, front matter gaps, draft ratio and a stale search index."
        - "A score out of 100 – an error costs 10 points, a warning 5, an info 2 – and every issue is tagged CONTENT, PERF, A11Y or CONFIG."
        - "Front matter issues are aggregated per field, so 200 posts without a date cost you one issue, not two hundred."
        - "It reads the built site in public/, so build before you read too much into the score."
    - name: "Template preview"
      glyph: "templates"
      text: "Browse your theme's layout files and see each one rendered live – ⇧⌘T from anywhere."
      docs:
        - "/docs/themes-and-template-preview/#template-preview"
      detail: "A layout file is invisible until a page renders it. Template Preview (`⇧⌘T`) puts your layouts on the left and the rendered page on the right, served by your own dev server – so you can see what single.html actually does without hunting for a URL that exercises it."
      points:
        - "Your layouts/ and every theme's layouts/ in one tree – and where both define the same file, the project's version wins, exactly as Hugo resolves it."
        - "Preview with picks a real page from your content that the selected template actually renders; partials, shortcodes and baseof fall back to the home page."
        - "The preview is live: save the file in your editor and it reloads like any other page."
        - "It needs the dev server running – if it is stopped, the panel says so and offers to start it."
    - name: "Theme scaffolding"
      glyph: "themes"
      text: "See each site's installed themes, scaffold a blank one to build on, and preview its templates as you go."
      docs:
        - "/docs/themes-and-template-preview/#new-blank-theme"
      detail: "The Themes page lists what is installed in themes/. New Blank Theme scaffolds a placeholder to build on – minimal layouts and styles, not a finished design – by running Hugo's own hugo new theme underneath."
      points:
        - "Letters, numbers and hyphens; the name becomes the folder under themes/."
        - "A checkbox decides whether the sample pages hugo new theme generates come along. layouts/, assets/ and archetypes/ are left alone either way."
        - "Set it as the active theme on creation, and the next build uses it."
        - "Removing a theme deletes themes/<name> and touches nothing else in the site."
    - name: "Content overview"
      glyph: "content"
      text: "Pages, sections, word counts and images per site – plus quick edits built in. Real writing stays in your own editor."
      docs:
        - "/docs/getting-started/#your-content"
      detail: "The Content page counts what is in the site and lists the files. It is built for a typo, a front matter field, a date – not for writing. Real writing stays in your own editor, and the preview reloads on save either way."
      points:
        - "Pages, sections, word counts and images per site – plus how many are drafts, future-dated or expired."
        - "Open a file for a preview, or its Raw tab: a plain monospaced editor with an explicit Save (`⌘S`), a line count and an edited marker."
        - "Close a file with unsaved changes and HugoKit asks first."
        - "Open in editor is one click away, in whatever editor you already use."
    - name: "Config editor"
      glyph: "config"
      text: "Edit your Hugo config visually or as raw text, with a diff preview before anything is saved."
      docs:
        - "/docs/editing-your-config/"
      detail: "Your config is the file most likely to break a site, and the one you edit least often – so you never quite remember what the keys are called. HugoKit gives it a form, a raw text tab, and one rule: nothing is written to disk until you have seen the diff."
      points:
        - "The form is grouped: Basics, Build, Author, Params, Markup, Taxonomies, Main Menu and Additional Fields."
        - "The two tabs are the same document – type a key in Raw and it turns up in the form, and the other way round."
        - "Save does not save. It shows every changed key, old value against new; you approve, and then it is written."
        - "TOML, YAML or JSON – the format is read from the file, and keys you never touched keep their place, their spelling and their comments."
    - name: "Snapshots and undo"
      glyph: "snapshots"
      text: "Before HugoKit writes to any file in your site, it keeps a copy. Every change is a diff you can read – and undo, file by file."
      docs:
        - "/docs/snapshots-and-undo/"
      detail: "Nothing changes without a diff, and everything can be undone. Whenever HugoKit writes to your site – a preflight fix, a config save, a content edit, a theme switch – it snapshots the affected files first."
      points:
        - "Snapshots live in the app's own storage, never in your repository – so they can't be committed or published by accident."
        - "Every write is recorded as a per-file diff. Read it in place, copy it out, or undo just that file."
        - "Restore brings back a whole operation – and takes its own snapshot first, so even an undo can be undone."
        - "Per site, you decide: turn the layer off, or set how many versions of each file to keep."
    - name: "Hugo Reference"
      glyph: "reference"
      text: "Searchable Hugo documentation built into the app – 195 entries across twelve categories, no browser needed."
      docs:
        - "/docs/getting-started/#hugo-reference"
      detail: "Hugo's reference material, indexed and searchable inside the app, in a window of its own (`⌘2`). It is there so a forgotten function name does not cost you a browser tab and twenty minutes."
      points:
        - "195 entries across twelve categories: functions, methods, page and site variables, templates, partials, shortcodes, front matter, config, content, build and performance."
        - "Opens in its own window and stays out of the way of the site you are working on."
    - name: "Keyboard shortcuts"
      glyph: "palette"
      text: "Publish with ⌘P, preflight with ⇧⌘P, site health with ⇧⌘H, template preview with ⇧⌘T – and ⌘K opens the command palette."
      docs:
        - "/docs/getting-started/#shortcuts-worth-knowing"
      detail: "The things you do every day have a key. Everything else is one `⌘K` away in the command palette."
      points:
        - "`⌘P` publish · `⇧⌘P` preflight · `⌘D` deploy"
        - "`⇧⌘H` site health · `⇧⌘T` template preview · `⌘2` Hugo Reference"
        - "`⌘O` open a site · `⇧⌘N` create one · `⌘,` settings"
    - name: "Menu bar extra"
      glyph: "menubar"
      text: "A dynamic menu bar icon with controls for your sites – without opening the window."
      docs:
        - "/docs/getting-started/#outside-the-window"
      detail: "HugoKit does not need its window open to be useful. Close it and the app keeps running in the menu bar, with every site and its status one click away."
      points:
        - "Start or stop any site from the menu, and open its localhost URL in the browser."
        - "The status dot follows the server: green running, amber busy, red failed, grey idle."
        - "Don't want it? Turn the icon off in Settings → General."
    - name: "Notifications"
      glyph: "bell"
      text: "Native notifications when the server stops, a build fails or a publish finishes – every event has its own toggle."
      docs:
        - "/docs/getting-started/#outside-the-window"
      detail: "Native macOS notifications for the things that finish while you are looking at something else. Every event has its own toggle, so you can keep the publish result and silence the rest."
      points:
        - "Six events: server started, server stopped unexpectedly, build succeeded, build failed, publish succeeded, publish failed."
        - "The toggles live in Settings → Notifications."
        - "If you have denied notification permission, HugoKit says so and links straight to System Settings."
    - name: "Hugo, managed"
      glyph: "hugo"
      accent: "green"
      spot:
        text: "Homebrew or direct download"
      text: "HugoKit finds your Hugo install automatically – and if there isn't one, it installs it for you."
      docs:
        - "/docs/getting-started/#first-launch"
      detail: "You shouldn't have to install a Go binary to write a blog post. HugoKit looks for Hugo where Hugo usually lives, and installs it for you if it isn't there."
      points:
        - "It checks Homebrew's paths, /usr/local/bin, ~/.local/bin and /usr/bin, then falls back to which hugo."
        - "Nothing found? With Homebrew installed it runs brew install hugo; without it, it downloads the latest Hugo extended release from GitHub and installs it to ~/.local/bin."
        - "Extended is the build that compiles SCSS, and most themes need it – so that is the variant it installs."
        - "Rather do it yourself? HugoKit shows the command, links to Hugo's own instructions, and gives you a Retry Detection button."
    - name: "Native and private"
      glyph: "private"
      accent: "gold"
      spot:
        text: "Keychain · no sign-in"
      text: "SwiftUI throughout, credentials in the macOS Keychain. No account – nothing ever leaves your Mac."
      detail: "SwiftUI throughout – no Electron, no account, no backend. HugoKit talks to Hugo, Git and your host, and to nothing else."
      points:
        - "Your files stay where they are: nothing is converted, moved or copied into an app format."
        - "Deploy credentials go into the macOS Keychain, never into a config file in your repository."
        - "No sign-in and no cloud service in the loop – nothing leaves your Mac until you publish it yourself."

# "What is Hugo?"-modalen – kort, faktuel, ikke-angribende.
# USP-rækkefølgen er bundet til kvartet-farverne (pink/blå/grøn/guld) i CSS'en.
whatishugo:
  cta: "What is Hugo?"
  title: "What is Hugo?"
  body:
    - "Hugo is a free, open-source static site generator – one of the most popular ways to build a website. You write your content as simple text files, pick a theme, and Hugo turns it into a complete site."
  usps:
    label: "Why people use it"
    items:
      - name: "Fast"
        text: "Most sites build in under a second, and the live preview reloads as you save."
      - name: "Plain files"
        text: "Content is Markdown text files – easy to edit, back up and move."
      - name: "Host anywhere"
        text: "The output is plain HTML – no database, no server code."
      - name: "Free and open source"
        text: "No cost, no license, no lock-in."
  bridge: "HugoKit runs Hugo for you – same sites, same files, just with buttons. Pair it with any editor, human or AI."
  link: "Learn more at gohugo.io"

# De tre feature-øjeblikke – tabs i loop-panelet. points uddyber hvert trin;
# alle punkter er forankret i docs' features.md (server-indstillinger, log-parser,
# command preview, deploy targets, Keychain, preflight-pipeline og diff-first UX).
moments:
  - label: "Preview"
    glyph: "preview"
    heading: "The server, on a button."
    text: "Start and stop Hugo's server with one click – drafts included, logs translated into plain language."
    points:
      - "Toggles for drafts, future and expired content – no flags to remember."
      - "Colour-coded live logs, with errors translated into plain language."
      - "A monospace preview shows the exact command before it runs."
      - "Hugo's deprecation notices are collected into one list on the dashboard – each one once, however often it repeats."
    screenshot: "/images/app/server-light.webp"
    screenshotDark: "/images/app/server-dark.webp"
    alt: "The Server view: live URL, stop and restart actions, and toggles for drafts, future and expired content."
    docs:
      - "/docs/running-the-server/"
    detail: "HugoKit runs the same hugo server you would run in a terminal. It just remembers the flags, picks a port that is actually free, and turns Hugo's output into something you can read. The exact command is written to the log before it runs, so you always know what the app asked Hugo to do."
  - label: "Preflight"
    glyph: "preflight"
    heading: "It checks before it publishes."
    text: "Every publish runs a check first: build, config, assets, broken links and subpath traps. Fixes are shown as a diff you approve."
    points:
      - "Runs automatically before every publish – build, config, assets and subpath traps."
      - "Each fix is shown as a red/green diff first; approve it, and preflight re-checks."
      - "Issues are ranked error, warning or info – and the fixes are applied for you."
    screenshot: ""
    screenshotDark: ""
    alt: "HugoKit's preflight check presenting a fix as a diff before publishing."
    docs:
      - "/docs/preflight/"
    detail: "A Hugo site that builds perfectly on your Mac can still land broken on the web. The build is not what breaks – the paths are. Preflight runs before every publish, and `⇧⌘P` runs it on its own when you just want to know where the site stands."
  - label: "Publish"
    glyph: "publish"
    heading: "Publish where you already publish."
    text: "GitHub Pages, or your own server over FTP/SFTP. Set it up once per site – after that it's ⌘P."
    points:
      - "GitHub Pages or your own server over FTP/SFTP – one target or several, published one at a time or all at once."
      - "Each target shows its own status, and after every publish HugoKit checks that the live site actually responds."
      - "Deploy credentials go in the macOS Keychain, and `⌘P` publishes from anywhere."
    screenshot: "/images/app/deploy-light.webp"
    screenshotDark: "/images/app/deploy-dark.webp"
    alt: "The Deploy view: a configured deploy target with Add Deploy Target and a history of successful deploys."
    docs:
      - "/docs/publishing-to-github-pages/"
      - "/docs/publishing-over-sftp/"
    detail: "Set a destination up once, and publishing is a single keystroke: `⌘P`. GitHub Pages builds in the cloud through Actions or locally on your Mac; FTP and SFTP build on your Mac and upload only the files that actually changed. A site can hold several destinations at once – publish them all in one go, pause the one you are not using – and each target keeps its own status and history."

# Docs-teaser på forsiden – tre kuraterede sider, forankret i keyword-planen
# (SEO-sporet: intern linking fra forsiden til landingssiderne). Titel og
# beskrivelse hentes fra siderne selv, så kortene aldrig drifter fra docs.
fromdocs:
  label: "From the docs"
  pages:
    - "/docs/hugo-without-the-terminal/"
    - "/docs/hugo-gui-desktop-app/"
    - "/docs/hugo-vs-wordpress/"

faq:
  title: "FAQ"
  items:
    - q: "Does it work with my existing Hugo site?"
      glyph: "sites"
      a: "Yes. HugoKit runs the Hugo you already use – point it at your site's folder (or a folder full of sites) and it shows up in the sidebar. Nothing is converted, nothing is locked in; your site stays a plain Hugo site."
    - q: "Does it replace my editor?"
      glyph: "create"
      a: "No – it sits beside it. HugoKit runs the server, the checks and the publish; the writing happens wherever you like. Your content is plain Markdown on disk, so your editor – or an AI coding agent working in the same folder – changes the files, and the preview reloads on save."
      chips: ["Any editor", "AI agents", "Plain Markdown"]
    - q: "Do I need Hugo installed first?"
      glyph: "hugo"
      a: "No. HugoKit finds your Hugo install automatically – and if there isn't one, it installs it for you."
      chips: ["Auto-install"]
    - q: "Where does my content live?"
      glyph: "private"
      a: "On your Mac, as the plain files Hugo already uses. There's no account and no cloud – deploy credentials go in the macOS Keychain, and nothing ever leaves your machine."
    - q: "What if HugoKit breaks something?"
      glyph: "snapshots"
      a: "Before HugoKit writes to any file in your site – a preflight fix, a config save, a content edit – it keeps a copy of the file as it was. Every change is recorded as a diff you can read, and undo works per file or per operation. Preflight fixes are shown as a diff you approve before they're applied at all."
      chips: ["Snapshots", "Diffs", "Undo"]
    - q: "Where can it publish to?"
      glyph: "publish"
      a: "GitHub Pages, and your own server over FTP/SFTP – one target or several per site. Cloud hosts like Netlify or Vercel aren't supported – if you deploy through them, their git integration already does this job."
      chips: ["GitHub Pages", "FTP / SFTP", "Multiple targets"]
    - q: "Is it really free?"
      glyph: "free"
      a: "Yes – free to download, free to use, no account and no subscription. It's a personal project, not a business."
    - q: "Which Macs does it run on?"
      glyph: "mac"
      a: "Any Mac running macOS 26 (Tahoe) or later."
      chips: ["macOS 26+"]
    - q: "Who's behind it?"
      glyph: "person"
      a: "One person: me, Anders, in Denmark. HugoKit is something I built for my own sites and keep working on because I use it every day. There's no company and no roadmap – if something's broken or missing, email me."

note:
  label: "Why it exists"
  text: "I write my own sites in Hugo, and I got tired of a terminal window, a browser tab and a deploy script for every small change. So I built HugoKit for myself – and kept building because I use it every day. It's a personal project, not a company."
  extra: "It's non-commercial and stays that way – nothing to buy, nothing to subscribe to. If you'd like to help cover the running costs, you can:"
  donate:
    label: "Buy me a coffee"
    url: "https://buymeacoffee.com/andersmortensen"

download:
  heading: "Download HugoKit"
  cta: "Download for macOS"
  meta: "free · macOS 26 or later · no account, no cloud"
  note: "No newsletter, no upsell. If something breaks, email me."

footer:
  made: "Made in Denmark by"
  author: "Anders Mortensen"
  authorURL: "https://andersmortensen.com"
  note: "This site runs on Hugo."
---
