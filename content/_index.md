---
title: "HugoKit"
description: "A Mac app for Hugo: run the server, preview your pages and publish your site from one window. Free, native, no terminal – built by one person for his own sites."

hero:
  heading: "Hugo, without the terminal."
  lead: "HugoKit is a Mac app that runs, previews and publishes the Hugo sites you already have. Same Hugo, same files — no terminal."

about:
  intro: "The same Hugo you already use — run, preview and publish, all from one window."

# Fakta-rækken — tre bånd-fakta. Fakta som fakta, ikke tal-formede ikke-tal.
facts:
  - value: "Free"
    label: "no license, no subscription"
    glyph: "free"
  - value: "One window"
    label: "every site in the same place"
    glyph: "window"
  - value: "No cloud"
    label: "no account; your files stay on your Mac"
    glyph: "lock"

# Loop-panelet — de tre moments som nummererede trin.
loop:
  heading: "The whole loop."
  sub: "Preview, publish, and the checks in between."

# Den fulde feature-liste — hvert punkt er forankret i docs' features.md.
features:
  title: "Also in HugoKit"
  items:
    - name: "Every site in one window"
      glyph: "sites"
      accent: "pink"
      text: "Add sites one by one, or point HugoKit at a folder and it finds them itself. Pin your favourites; give each site its own emoji."
    - name: "Create new sites"
      glyph: "create"
      text: "Start from the HugoKit Starter template — pick sections and features up front — or from a blank Hugo site. Git init included."
    - name: "Site health"
      glyph: "health"
      accent: "blue"
      text: "Every site gets a score: front matter checks, content stats and a build trend, with the issues listed out. ⇧⌘H from anywhere."
    - name: "Template preview"
      glyph: "templates"
      text: "Browse your theme's layout files and see each one rendered live — ⇧⌘T from anywhere."
    - name: "Content overview"
      glyph: "content"
      text: "Pages, sections, word counts and images per site — plus a front matter health check across your content."
    - name: "Config editor"
      glyph: "config"
      text: "Edit your Hugo config visually or as raw text, with a diff preview before anything is saved."
    - name: "Hugo Reference"
      glyph: "reference"
      text: "Searchable Hugo documentation built into the app — nine categories, no browser needed."
    - name: "Command palette"
      glyph: "palette"
      text: "⌘K opens a keyboard-driven command search. Publish with ⌘P, preflight with ⇧⌘P."
    - name: "Menu bar extra"
      glyph: "menubar"
      text: "A dynamic menu bar icon with controls for your sites — without opening the window."
    - name: "Hugo, managed"
      glyph: "hugo"
      accent: "green"
      text: "HugoKit finds your Hugo install automatically — and if there isn't one, it installs it for you."
    - name: "Native and private"
      glyph: "private"
      accent: "gold"
      text: "SwiftUI throughout, credentials in the macOS Keychain. No account — nothing ever leaves your Mac."

# "What is Hugo?"-modalen — kort, faktuel, ikke-angribende.
# USP-rækkefølgen er bundet til kvartet-farverne (pink/blå/grøn/guld) i CSS'en.
whatishugo:
  cta: "What is Hugo?"
  title: "What is Hugo?"
  body:
    - "Hugo is a free, open-source static site generator — one of the most popular ways to build a website. You write your content as simple text files, pick a theme, and Hugo turns it into a complete site."
  usps:
    label: "Why people use it"
    items:
      - name: "Fast"
        text: "Most sites build in under a second."
      - name: "Plain files"
        text: "Content is Markdown text files — easy to edit, back up and move."
      - name: "Host anywhere"
        text: "The output is plain HTML — no database, no server code."
      - name: "Free and open source"
        text: "No cost, no license, no lock-in."
  bridge: "HugoKit runs Hugo for you — same sites, same files, just with buttons."
  link: "Learn more at gohugo.io"

# De tre feature-øjeblikke — tabs i loop-panelet. points uddyber hvert trin;
# alle punkter er forankret i docs' features.md (server-indstillinger, log-parser,
# command preview, deploy targets, Keychain, preflight-pipeline og diff-first UX).
moments:
  - label: "Preview"
    glyph: "preview"
    heading: "The server, on a button."
    text: "Start and stop Hugo's server with one click — drafts included, logs translated into plain language."
    points:
      - "Toggles for drafts, future and expired content — no flags to remember."
      - "Colour-coded live logs, with errors translated into plain language."
      - "A monospace preview shows the exact command before it runs."
    screenshot: "/images/app/server.png"
    screenshotDark: ""
    alt: "The Server view: live URL, stop and restart actions, and toggles for drafts, future and expired content."
  - label: "Publish"
    glyph: "publish"
    heading: "Publish where you already publish."
    text: "GitHub Pages, or your own server over FTP/SFTP. Set it up once per site — after that it's ⌘P."
    points:
      - "GitHub Pages or your own server over FTP/SFTP — one target or several."
      - "One “Publish all” ships every site at once; each site's setup is saved."
      - "Deploy credentials go in the macOS Keychain, and ⌘P publishes from anywhere."
    screenshot: "/images/app/deploy-setup.png"
    screenshotDark: ""
    alt: "The Deploy Setup sheet: choosing GitHub Pages or FTP/SFTP as the destination."
  - label: "Preflight"
    glyph: "preflight"
    heading: "It checks before it publishes."
    text: "Every publish runs a check first: build, config, assets, broken links and subpath traps. Fixes are shown as a diff you approve."
    points:
      - "Runs automatically before every publish — build, config, assets and subpath traps."
      - "Each fix is shown as a red/green diff first; approve it, and preflight re-checks."
      - "Issues are ranked error, warning or info — and the fixes are applied for you."
    screenshot: ""
    screenshotDark: ""
    alt: "HugoKit's preflight check presenting a fix as a diff before publishing."

faq:
  title: "FAQ"
  items:
    - q: "Does it work with my existing Hugo site?"
      a: "Yes. HugoKit runs the Hugo you already use — point it at your site's folder (or a folder full of sites) and it shows up in the sidebar. Nothing is converted, nothing is locked in; your site stays a plain Hugo site."
    - q: "Do I need Hugo installed first?"
      a: "No. HugoKit finds your Hugo install automatically — and if there isn't one, it installs it for you."
    - q: "Where does my content live?"
      a: "On your Mac, as the plain files Hugo already uses. There's no account and no cloud — deploy credentials go in the macOS Keychain, and nothing ever leaves your machine."
    - q: "Where can it publish to?"
      a: "GitHub Pages, and your own server over FTP/SFTP — one target or several, with one “Publish all”. Cloud hosts like Netlify or Vercel aren't supported — if you deploy through them, their git integration already does this job."
    - q: "Is it really free?"
      a: "Yes — free to download, free to use, no account and no subscription. It's a personal project, not a business."
    - q: "Which Macs does it run on?"
      a: "Any Mac running macOS 26 (Tahoe) or later."
    - q: "Who's behind it?"
      a: "One person: me, Anders, in Denmark. HugoKit is something I built for my own sites and keep working on because I use it every day. There's no company and no roadmap — if something's broken or missing, email me."

note:
  label: "Why it exists"
  text: "I write my own sites in Hugo, and I got tired of a terminal window, a browser tab and a deploy script for every small change. So I built HugoKit for myself — and kept building because I use it every day. It's a personal project, not a company."

download:
  heading: "Download HugoKit"
  cta: "Download for macOS"
  meta: "free · macOS 26 or later · no account, no cloud"
  note: "No newsletter, no upsell. If something breaks, email me."

footer:
  made: "Made in Denmark by Anders Mortensen"
  note: "This site runs on Hugo — and ships with HugoKit."
---
