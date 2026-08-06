---
title: "HugoKit"
description: "HugoKit is a Mac app for running Hugo sites locally and publishing them to GitHub Pages, FTP or SFTP."

hero:
  # To-tone headline: headingDim dæmpes (muted), heading bærer pointen i ink.
  headingDim: "Hugo,"
  heading: "without the terminal."
  lead: "Run Hugo locally, review the site and publish when you're ready – from one Mac app."
  more: "See how it works"
  # Hero-mediet: loopende app-optagelse. Screenshottene bliver stående som
  # fallback (noscript) og som kilde til vinduesramme + skygge i videofilerne.
  screenshot: "/images/app/dashboard-light.webp"
  screenshotDark: "/images/app/dashboard-dark.webp"
  alt: "HugoKit showing server controls, site health, content, build logs and publishing."
  video:
    lightMp4: "/video/hero-light.mp4"
    darkMp4: "/video/hero-dark.mp4"
    posterLight: "/video/hero-poster-light.webp"
    posterDark: "/video/hero-poster-dark.webp"

about:
  intro: "HugoKit works with the Hugo executable and project files already on your Mac – nothing to move or convert."

# Fakta-rækken – tre bånd-fakta. Fakta som fakta, ikke tal-formede ikke-tal.
facts:
  - value: "Free"
    label: "no license or subscription"
    glyph: "free"
  - value: "Any editor"
    label: "works with the project files on disk"
    glyph: "editor"
  - value: "Local projects"
    label: "no account required"
    glyph: "lock"

# Loop-sektionen – de tre moments som nummererede trin (01/02/03).
loop:
  label: "How it works"
  heading: "Preview, preflight and publish."

# Den fulde feature-liste – hvert punkt er forankret i docs' features.md.
features:
  title: "What you can do"
  items:
    - name: "All your sites"
      glyph: "sites"
      accent: "pink"
      # spot: meta-linjen på kvartet-kortet i Why. Hentes ikke fra prosaen – den står her,
      # så kortet aldrig kan drifte fra det features.detail/points faktisk siger.
      spot:
        key: "⌘O"
        text: "Add a site"
      text: "Keep your Hugo sites together: add one, clone from Git or scan a folder of projects."
      docs:
        - "/docs/getting-started/#watch-a-folder"
      detail: "Every Hugo site you have, in one sidebar. Add them one at a time with `⌘O`, clone one straight from a Git URL, or point HugoKit at the folder you keep your projects in and let it find them itself."
      points:
        - "Watch a folder: HugoKit scans up to three levels deep, adds every folder that holds a Hugo config, and skips the ones that never contain a site of their own – public, resources, themes, archetypes, .git, node_modules, .build and vendor."
        - "A folder counts as a site when it has a Hugo config file. If the config is there but the folders around it look incomplete, the site is added with a warning rather than turned away."
        - "Add a site straight from a Git URL – paste the repository, choose where to clone it, and HugoKit clones and adds it in one step. A token is only ever sent to github.com."
        - "Pin the ones you use most, and give each site an emoji so the sidebar is scannable at a glance."
        - "Each site keeps its own settings – its port, its content toggles, its deploy destinations."
    - name: "Create new sites"
      glyph: "create"
      text: "Start with the HugoKit Starter or Hugo's blank template, with Git setup if you want it."
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
      featured: true
      spot:
        key: "⇧⌘H"
        text: "From anywhere"
      text: "Find broken links, missing alt text, large images, deprecated config and content issues."
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
      text: "Choose a layout and see it rendered with a matching page while the server is running."
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
      text: "See installed themes, create a blank one and preview its layouts as you work."
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
      text: "Browse pages, sections, word counts and images, with quick edits for front matter and text."
      docs:
        - "/docs/getting-started/#your-content"
        - "/docs/editing-content/"
      detail: "The Content page counts what is in the site and lists the files. It is built for a typo, a front matter field, a date – not for writing. A front matter inspector sits beside each file for exactly those fields; real writing stays in your own editor, and the preview reloads on save either way."
      points:
        - "Pages, sections, word counts and images per site – plus how many are drafts, future-dated or expired. A page bundle shows as one entry with its images, not a folder of loose files."
        - "Edit the front matter in a panel beside the file – title, description, date, tags and categories, with suggestions drawn from the site's own taxonomies – or use the Raw tab, a plain monospaced editor with an explicit Save (`⌘S`). Both edit the same text."
        - "See every tag and category across the site, catch a duplicate spelling, and rename one everywhere in a single pass you can undo."
        - "Close a file with unsaved changes and HugoKit asks first."
        - "Open in editor is one click away, in whatever editor you already use."
    - name: "Config editor"
      glyph: "config"
      text: "Edit the Hugo config as fields or raw text, then check the diff before anything is saved."
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
      accent: "pink"
      featured: true
      text: "Before HugoKit changes a file, it keeps a snapshot and records a diff you can restore."
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
      text: "Look up 195 Hugo reference entries without leaving the app."
      docs:
        - "/docs/getting-started/#hugo-reference"
      detail: "Hugo's reference material, indexed and searchable inside the app, in a window of its own (`⌘2`). It is there so a forgotten function name does not cost you a browser tab and twenty minutes."
      points:
        - "195 entries across twelve categories: functions, methods, page and site variables, templates, partials, shortcodes, front matter, config, content, build and performance."
        - "Opens in its own window and stays out of the way of the site you are working on."
    - name: "Keyboard shortcuts"
      glyph: "palette"
      text: "Use shortcuts for Publish, Preflight, Site Health, Template Preview and the command palette."
      docs:
        - "/docs/getting-started/#shortcuts-worth-knowing"
      detail: "The things you do every day have a key. Everything else is one `⌘K` away in the command palette."
      points:
        - "`⌘P` publish · `⇧⌘P` preflight · `⌘D` deploy"
        - "`⇧⌘H` site health · `⇧⌘T` template preview · `⌘2` Hugo Reference"
        - "`⌘O` open a site · `⇧⌘N` create one · `⌘,` settings"
    - name: "Menu bar extra"
      glyph: "menubar"
      text: "Start and stop sites, open previews and check server status without opening the main window."
      docs:
        - "/docs/getting-started/#outside-the-window"
      detail: "HugoKit does not need its window open to be useful. Close it and the app keeps running in the menu bar, with every site and its status one click away."
      points:
        - "Start or stop any site from the menu, and open its localhost URL in the browser."
        - "The status dot follows the server: green running, amber busy, red failed, grey idle."
        - "Don't want it? Turn the icon off in Settings → General."
    - name: "Notifications"
      glyph: "bell"
      text: "Choose which server, build and publish events are worth a macOS notification."
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
      text: "Already have Hugo? HugoKit finds it. If not, it can install Hugo Extended for you."
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
      featured: true
      spot:
        text: "Keychain · no sign-in"
      text: "Built in SwiftUI, with deploy credentials in Keychain and no account system or backend."
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
    - "Hugo is an open-source static site generator: you write content and templates, and Hugo turns them into a complete site of static files."
  usps:
    label: "Why people use it"
    items:
      - name: "Fast"
        text: "Hugo builds most sites in less than a second, including sites with thousands of pages."
      - name: "Live preview"
        text: "`hugo server` rebuilds the site and reloads the browser after a file is saved."
      - name: "Plain files"
        text: "Content is stored in Markdown files that can be edited, copied and versioned."
      - name: "Host anywhere"
        text: "The build output is HTML, CSS, JavaScript and other static files."
      - name: "Built-in tools"
        text: "Hugo includes menus, taxonomies, image processing, RSS and sitemap generation."
      - name: "Free and open source"
        text: "Hugo is free and open source."
  bridge: "HugoKit runs that same setup from a Mac interface, alongside whichever editor you prefer."
  link: "Learn more at gohugo.io"

# De tre feature-øjeblikke – tabs i loop-panelet. points uddyber hvert trin;
# alle punkter er forankret i docs' features.md (server-indstillinger, log-parser,
# command preview, deploy targets, Keychain, preflight-pipeline og diff-first UX).
moments:
  - label: "Preview"
    glyph: "preview"
    heading: "Run your site locally."
    text: "Start or stop Hugo's server, adjust content flags and keep the build log in view."
    points:
      - "Toggle drafts, future and expired content without remembering flags."
      - "Read colour-coded logs and see the exact command HugoKit runs."
      - "Open the local preview from the same window."
    screenshot: "/images/app/server-light.webp"
    screenshotDark: "/images/app/server-dark.webp"
    alt: "The Server view: live URL, stop and restart actions, and toggles for drafts, future and expired content."
    docs:
      - "/docs/running-the-server/"
    detail: "HugoKit runs `hugo server` with the settings saved for the site and shows the exact command and output."
  - label: "Preflight"
    glyph: "preflight"
    heading: "Check the site before you publish."
    text: "Preflight builds the site and looks for problems in its config, assets, links, templates and static JavaScript."
    points:
      - "Checks the build, config, assets and common subpath traps."
      - "Shows every suggested fix as a diff before writing anything."
      - "Ranks findings as errors, warnings or information."
    screenshot: "/images/app/preflight-light.webp"
    screenshotDark: "/images/app/preflight-dark.webp"
    alt: "HugoKit's preflight check presenting a fix as a diff before publishing."
    docs:
      - "/docs/preflight/"
    detail: "Preflight runs before every publish. Suggested fixes are shown as diffs and applied only after approval."
  - label: "Publish"
    glyph: "publish"
    heading: "Publish where your site lives."
    text: "Use GitHub Pages, FTP or SFTP, with the settings kept for each site."
    points:
      - "Publish to GitHub Pages, FTP or SFTP – one target or several."
      - "See status and history per target, followed by a live-site check."
      - "Keep deploy credentials in the macOS Keychain."
    screenshot: "/images/app/deploy-light.webp"
    screenshotDark: "/images/app/deploy-dark.webp"
    alt: "The Deploy view: a configured deploy target with Add Deploy Target and a history of successful deploys."
    docs:
      - "/docs/publishing-to-github-pages/"
      - "/docs/publishing-over-sftp/"
    detail: "Each target stores its own build settings, status and history. HugoKit checks the public URL after publishing when one is configured."

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
      a: "Yes – add the site's folder or watch a parent folder. HugoKit uses the project as it is, without converting its files."
    - q: "Does it replace my editor?"
      glyph: "create"
      a: "No – keep writing in the editor you already use. HugoKit handles the server, checks and publishing, and reloads the preview when files change."
      chips: ["Any editor", "Plain Markdown"]
    - q: "Do I need Hugo installed first?"
      glyph: "hugo"
      a: "Not necessarily. If Hugo is already installed, HugoKit uses it; otherwise it offers to install Hugo Extended during setup."
      chips: ["Auto-install"]
    - q: "Where does my content live?"
      glyph: "private"
      a: "Right where it already is: in the project folder on your Mac. HugoKit does not copy content into its own format."
    - q: "What if HugoKit breaks something?"
      glyph: "snapshots"
      a: "That's what snapshots are for. Before HugoKit writes to a file, it keeps a copy and records a diff. You can restore one file or the full operation, and Preflight fixes still require approval."
      chips: ["Snapshots", "Diffs", "Undo"]
    - q: "Where can it publish to?"
      glyph: "publish"
      a: "GitHub Pages, FTP and SFTP. You can keep one target or several for each site. Netlify and Vercel are not supported as direct targets."
      chips: ["GitHub Pages", "FTP / SFTP", "Multiple targets"]
    - q: "Is it really free?"
      glyph: "free"
      a: "Yes. It's free to download and use, with no account or subscription."
    - q: "Which Macs does it run on?"
      glyph: "mac"
      a: "Any Mac running macOS 26 (Tahoe) or later."
      chips: ["macOS 26+"]
    - q: "How do updates work?"
      glyph: "bell"
      a: "HugoKit uses Sparkle to check for signed updates from hugokit.com. It shows the release notes and asks before installing. Sparkle system profiling is disabled."
      chips: ["Built-in updates", "Release notes in-app", "Signed"]
    - q: "Who's behind it?"
      glyph: "person"
      a: "I'm Anders Mortensen, based in Denmark. I built HugoKit for the Hugo sites I maintain and continue to develop it as a personal project. Bug reports and feature requests are welcome by email."

note:
  label: "Why it exists"
  text: "I build and maintain several Hugo sites, and I wanted one place to start the server, check a build and publish. HugoKit started as a tool for my own work, and it's still the app I use on those sites."
  extra: "HugoKit is a personal, non-commercial project. Donations help cover its running costs:"
  author: "Anders Mortensen"
  authorURL: "https://andersmortensen.com"
  portrait: "/images/anders-portrait.jpg"
  donate:
    label: "Donate"
    url: "https://www.paypal.com/donate/?hosted_button_id=4XD6HC8ZESF7L"

download:
  heading: "Download HugoKit"
  cta: "Download for macOS"
  meta: "free · macOS 26 or later"
  note: "Questions and bug reports are welcome at hello@hugokit.com."

footer:
  made: "Made in Aalborg by"
  author: "Anders Mortensen"
  authorURL: "https://andersmortensen.com"
  note: "This site runs on Hugo."
---
