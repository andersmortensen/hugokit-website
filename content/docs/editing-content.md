---
title: "Editing content"
description: "Browse the files in a site, adjust front matter and make the small edits that do not need a full editor."
group: "Working in the app"
weight: 12
tags: [content]
---

The Content page gives you a quick way into the site's files, front matter and small text edits. Longer writing stays in your usual editor.

## The Content page

Open **Content** for the selected site and HugoKit counts what's there – pages, sections, words and images, and how many are drafts, future-dated or expired – and lists the files. Open one and you get a preview, a front matter inspector, and a **Raw** tab.

## Finding a page

The search field sits at the right of the filter row, and `⌘F` puts the cursor in it. It matches the page's title, its section and its relative path, so a file you think of by name is found by name.

{{< shot name="content-search" alt="The Content list narrowed by a search query, with the header reading five of thirty-seven files." >}}

Matching is substring, and ignores case and diacritics: `aben` finds `Åben`. The whole query is one phrase, so `hello world` finds that phrase rather than every page containing either word. While a query is active the header reads `5 of 37 files`, and search combines with the status and type filters.

The field keeps its query when you switch site, the same way the other filters do, and the empty state names the query rather than the site.

## Finding and replacing in Raw

`⌘F` follows the active context. With no file editor active it focuses the Content list search. With the **Raw** editor active it opens the document's native find bar inside the sheet; `⌥⌘F` opens the same bar with replace controls.

The find bar can match case or whole words. **Replace All** is recorded as one undoable edit, so one `⌘Z` restores the buffer.

Find and replace only change the open buffer. Nothing is written to disk until you choose **Save** (`⌘S`).

## What changed since the last commit

**Changed** is a filter beside Drafts, Published and Scheduled. It lists the pages git reports as new, modified, renamed or deleted since the last commit, and each row carries the word for which.

{{< shot name="changed-content" alt="The Content list with the Changed filter active: rows tagged New and Modified beside their paths." >}}

- It is named Changed rather than Unpublished on purpose: git describes the working tree and says nothing about what is live.
- A site that is not a git repository does not show the filter at all.
- Deleted pages have no row to open, since the file is gone. They are named under the filter bar instead.
- HugoKit only reads. No git command it runs here writes to the repository or the index.

## The front matter inspector

The inspector shows **title, description, date, draft, tags and categories** as fields beside the content.

{{< shot name="front-matter-inspector" alt="The Content file sheet with the front matter inspector beside the page – title, description, date, tags and categories as fields." >}}

- **Tags and categories** autocomplete from the site's own taxonomies, so you reuse the terms you already have instead of inventing a near-duplicate.
- The inspector and the **Raw** tab are two views of the same text: type in the inspector and Raw updates; edit Raw and the fields re-parse live. **Save** (`⌘S`) writes once.
- HugoKit rewrites only changed fields and preserves quote style, list format, date format, comments and unrecognised fields. Saving without changes does not write the file.
- If the file has a **lastmod** field, saving updates it – and only then. Nothing new is added to a file that didn't already track it.

## What links here

Under the front matter, **Linked from** lists the pages that link to the one you have open, and the line each link sits on.

{{< shot name="backlinks" alt="The Linked from section in the inspector: two pages that link to the open one, each with its path and line number." >}}

It counts two link forms, and says so:

- `ref` and `relref` shortcodes, in both the `{{</* … */>}}` and `{{%/* … */%}}` spellings. This is what HugoKit's own `[[` link completion writes, so a site written in the app is covered.
- Relative markdown links that name a content file, such as `[text](../guides/setup.md)`.

Permalinks like `[text](/posts/hello/)` are left out. Where a permalink lands is decided by the site's `permalinks` configuration, and a guess would send you to edit the wrong page. Custom shortcodes are left out for the same reason: whether one is a link depends on its template.

The scan reads the site's other pages when the sheet opens and stops at 2000 pages. Past that it says the answer is partial.

## Moving around a long document

In the **Raw** tab, **Outline** in the foot bar lists the document's headings, indented by level. Click one and the cursor moves to that line.

{{< shot name="document-outline" alt="The outline panel beside the Raw editor, listing the document's headings indented by level." >}}

The panel is off until you ask for it, and it only ever selects – it does not edit. Headings inside fenced code blocks are skipped, front matter is skipped, and `#hashtag` without a space is not a heading. Setext headings, underlined with `===` or `---`, are not listed: an underline cannot be told from a horizontal rule without reading the paragraph above it.

## Page bundles

A **leaf bundle** – a folder with an `index.md` and its images alongside it – shows as **one entry**, not a folder of loose files. The row carries a photo icon and the image count, and the file sheet reads `bundle · N images`.

{{< shot name="page-bundle" alt="A page bundle in the Content list: one row with a photo icon and image count instead of a folder of loose files." >}}

Open it and **Resources** in the inspector lists the bundle's files, images first, with a thumbnail on each. Editing still writes to the bundle's `index.md`.

{{< shot name="page-resources" alt="The Resources section in the inspector: bundle files with thumbnails and buttons for Quick Look, Reveal in Finder and insert a reference." >}}

Each row carries three actions and no fourth:

- **Quick Look** opens the file in the system preview panel.
- **Reveal in Finder** selects it on disk.
- **Insert a reference** types the markdown at the cursor – `![](photo.jpg)` for an image, a link for anything else. Asking from the rendered preview switches to **Raw** first, since a rendered page has no cursor. `⌘Z` rolls the insertion back in one step.

The reference is the bare file name, which is how Hugo addresses a resource from its own page. Resizing, conversion and other image work stay outside HugoKit.

## Translations

On a site with configured languages, **Translations** in the filter row groups a page's translations onto the row of the file the site serves at the plain path, and names the other languages on it.

{{< shot name="translations" alt="The Content list with translations grouped: one row per page, with the other languages named beside the path." >}}

The grouping is read-only, and the site's filenames are left exactly as they are written. Two rules follow from that:

- A site without configured languages groups nothing. There, `hello.da.md` is a page called `hello.da`, and hiding it would hide something you wrote on purpose.
- A suffix counts as a language only when the site declares it, so `notes.old.md` stays its own page.

A leaf bundle's translations sit in one folder as `index.md` and `index.da.md`, so the grouping reads the file name rather than the path.

`translationKey` front matter and per-language `contentDir` are not covered. Both need more than a filename to resolve.

## Taxonomies across the site

**Taxonomy** in the site's **⋯** menu lists every tag and category with its usage count.

It groups spellings that differ only by case, shows the most common one and flags the rest with a **spellings** badge, so `Troubleshooting` and `troubleshooting` surface as one term that drifted rather than two you meant.

{{< shot name="taxonomy" alt="The Taxonomy sheet: every tag and category with its count, and a spellings badge on terms that differ only by case." >}}

**Rename** updates the term in each affected file's front matter. HugoKit shows the files first and records the operation as one [snapshot](/docs/snapshots-and-undo/) with a diff per file.

## What stays with your editor

Use **Open in editor** for longer writing. Files saved by HugoKit pass through the [snapshot layer](/docs/snapshots-and-undo/), and the development server reloads after either editor saves.
