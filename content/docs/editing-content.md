---
title: "Editing content"
description: "Edit a page's front matter in a panel beside the file, see page bundles as one entry, and rename a tag everywhere it appears – from HugoKit's Content page."
group: "Working in the app"
weight: 12
tags: [content]
---

The Content page lists your pages and lets you make the small edits that don't need a full editor – a title, a date, a tag, a typo. It's built for exactly those changes, and it leaves the writing to your own editor.

## The Content page

Open **Content** for the selected site and HugoKit counts what's there – pages, sections, words and images, and how many are drafts, future-dated or expired – and lists the files. Open one and you get a preview, a front matter inspector, and a **Raw** tab.

## The front matter inspector

Front matter is metadata about the file, so HugoKit puts it where metadata belongs: in a panel beside the content, not buried in the text. The inspector holds the fields you actually reach for – **title, description, date, draft, tags and categories** – as proper fields.

{{< shot name="front-matter-inspector" alt="The Content file sheet with the front matter inspector beside the page – title, description, date, tags and categories as fields." >}}

- **Tags and categories** autocomplete from the site's own taxonomies, so you reuse the terms you already have instead of inventing a near-duplicate.
- The inspector and the **Raw** tab are two views of the same text: type in the inspector and Raw updates; edit Raw and the fields re-parse live. **Save** (`⌘S`) writes once.
- HugoKit rewrites only the fields you changed, in the file's own style – your quote marks, your list format, your date format, your comments and anything it doesn't recognise are left exactly as they were. A save that changes nothing changes nothing on disk.
- If the file has a **lastmod** field, saving updates it – and only then. Nothing new is added to a file that didn't already track it.

## Page bundles

A **leaf bundle** – a folder with an `index.md` and its images alongside it – shows as **one entry**, not a folder of loose files. The row carries a photo icon and the image count, and the file sheet reads `bundle · N images`.

{{< shot name="page-bundle" alt="A page bundle in the Content list: one row with a photo icon and image count instead of a folder of loose files." >}}

Open it and the inspector lists the bundle's resources with thumbnails, including one level of subfolders for the common `images/` layout. Editing still writes to the bundle's `index.md`.

## Taxonomies across the site

**Taxonomy** in the site's **⋯** menu gathers every tag and category across the site, each with its count – the whole vocabulary in one place.

It groups spellings that differ only by case, shows the most common one and flags the rest with a **spellings** badge, so `Troubleshooting` and `troubleshooting` surface as one term that drifted rather than two you meant.

{{< shot name="taxonomy" alt="The Taxonomy sheet: every tag and category with its count, and a spellings badge on terms that differ only by case." >}}

**Rename** changes a term everywhere it appears in one pass. It's a metadata edit – it rewrites the affected files' front matter and nothing else – and it collapses case variants and duplicates onto the spelling you pick. HugoKit shows the files it will touch first, and the whole rename is taken as a single [snapshot](/docs/snapshots-and-undo/): one entry, with a per-file diff, that you can undo in one go.

## What stays with your editor

The Content page is for a field, a flag, a fix – not for writing. Real writing stays in whatever editor you use: **Open in editor** is one click away, the dev server reloads on save either way, and everything HugoKit writes here goes through the [snapshot layer](/docs/snapshots-and-undo/), so any change can be read as a diff and undone.
