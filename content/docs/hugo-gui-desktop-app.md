---
title: "A desktop app for Hugo"
description: "A closer look at running Hugo from a native Mac app, and where that differs from using a browser-based CMS."
group: "Start"
weight: 30
tags: [basics]
---

Hugo is a command-line tool and has no official desktop interface. If you like its file-based setup but would rather not keep a terminal open, desktop apps and browser-based CMS tools offer two different ways forward.

## HugoKit is a native Mac app for Hugo

HugoKit runs the installed Hugo binary from a native SwiftUI app. It controls the server, site checks and publishing, and requires no account.

HugoKit does not introduce a new project format. It reads the existing content, configuration and templates and does not add app-specific files to the site folder.

## What's in the window

- **Sites:** add individual projects or scan a parent folder.
- **Server:** start or stop Hugo, change content flags and read the build log.
- **Preflight:** build the site and check configuration, assets, templates and deployment paths.
- **Site Health:** scan for broken links, missing alt text, deprecated configuration and other issues.
- **Template Preview:** render a layout against a matching content page.
- **Configuration:** edit structured fields or raw text and review the diff before saving.
- **Publish:** send the site to GitHub Pages, FTP or SFTP.
- **Hugo installation:** use an existing binary or install Hugo Extended during setup.

## A GUI or a CMS? They're not the same thing

A desktop Hugo app and a Hugo CMS have different roles:

- A **desktop app** runs Hugo on the local machine and manages development and publishing tasks around the existing project files.
- A **CMS**, such as Decap, Pages CMS, Hokus or Quiqr, provides an editing interface for content authors.

HugoKit is a desktop app rather than a CMS. Content editing remains in the project's files and external editor. Choose a CMS when editors need browser-based forms or remote access.

## Platform support

HugoKit requires macOS 26 (Tahoe) or later. There is no Windows or Linux version. **Hokus** and **Quiqr** are cross-platform desktop alternatives.

## Download

HugoKit is free to use and requires no account. [Download it](/#download) and add an existing Hugo site.

> See [Getting started](/docs/getting-started/) for setup and [Hugo without the terminal](/docs/hugo-without-the-terminal/) for a command-to-control reference.
