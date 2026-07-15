---
title: "A desktop app for Hugo"
description: "Hugo is a command-line tool with no GUI of its own. HugoKit is a native Mac app that puts a window around it – run, preview, check and publish, no terminal. How a desktop app differs from a Hugo CMS, and who each one suits."
group: "Start"
weight: 30
---

Hugo is a command-line tool. There's no official app, no window, no buttons – you drive it from a terminal. So it's a reasonable thing to go looking for: a GUI, a desktop app, a Mac app, something with an interface. This page is the honest answer to that search.

## HugoKit is a native Mac app for Hugo

HugoKit runs the same Hugo binary you already have and puts a window around it. Start the server, preview your pages, check the site and publish it – from one place, with the flags on buttons instead of in your memory. It's free, it's native SwiftUI (no Electron), and it needs no account.

What it isn't is a new way to build sites. Your project stays a plain Hugo site – the same content files, the same config, the same output. It reads a Hugo site and runs Hugo against it, and adds nothing of its own to the folder. Delete the app and your site is exactly what it was.

## What's in the window

- **All your sites** in one sidebar – add them one at a time, or point HugoKit at a folder and it finds them itself.
- **The server on a button** – drafts, future and expired content as toggles, with a live log next to it.
- **Preflight before every publish** – it builds the site, then reads the result, and catches the mistakes that build cleanly and break in production.
- **Site health** – a score out of 100 with the issues behind it: broken links, images with no alt text, config keys Hugo deprecated years ago.
- **Template preview** – render one layout file on its own against real content.
- **Config editor** – a form for the fields you change, a raw tab for the rest, and a diff before anything is written to disk.
- **Publish** to GitHub Pages or your own server over FTP/SFTP, with `⌘P`.
- **Hugo, managed** – it finds your Hugo install, and installs it for you if there isn't one.

## A GUI or a CMS? They're not the same thing

People searching for a "Hugo GUI" and a "Hugo CMS" often want two different things:

- A **desktop app** like HugoKit runs on your Mac, drives Hugo directly, and keeps your files local. It's for the person who runs the site – build, check and publish from your own machine.
- A **CMS** – Decap or Pages CMS in the browser, or desktop ones like Hokus and Quiqr – is mostly about editing content, often through a form, often for someone who isn't the developer.

HugoKit is the first kind. It runs, checks and publishes, and leaves the writing to whatever editor you already use – human or AI agent – working in the same folder. If what you need is a content form for a non-technical editor, a CMS is the honest answer, not HugoKit.

## Mac only – the honest part

HugoKit is a native Mac app and runs on macOS 26 (Tahoe) or later. There's no Windows or Linux version. If you're not on a Mac, **Hokus** and **Quiqr** are cross-platform desktop options worth a look.

## Try it

HugoKit is free – no license, no subscription, no account. [Download it](/#download), point it at a Hugo site you already have, and you've got a window around the Hugo you already use.

> New to Hugo itself? [Getting started](/docs/getting-started/) is the ten-minute version, and [Hugo without the terminal](/docs/hugo-without-the-terminal/) maps every Hugo command to its button in the app.
