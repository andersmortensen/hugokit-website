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

## The front matter inspector

The inspector shows **title, description, date, draft, tags and categories** as fields beside the content.

{{< shot name="front-matter-inspector" alt="The Content file sheet with the front matter inspector beside the page – title, description, date, tags and categories as fields." >}}

- **Tags and categories** autocomplete from the site's own taxonomies, so you reuse the terms you already have instead of inventing a near-duplicate.
- The inspector and the **Raw** tab are two views of the same text: type in the inspector and Raw updates; edit Raw and the fields re-parse live. **Save** (`⌘S`) writes once.
- HugoKit rewrites only changed fields and preserves quote style, list format, date format, comments and unrecognised fields. Saving without changes does not write the file.
- If the file has a **lastmod** field, saving updates it – and only then. Nothing new is added to a file that didn't already track it.

## Page bundles

A **leaf bundle** – a folder with an `index.md` and its images alongside it – shows as **one entry**, not a folder of loose files. The row carries a photo icon and the image count, and the file sheet reads `bundle · N images`.

{{< shot name="page-bundle" alt="A page bundle in the Content list: one row with a photo icon and image count instead of a folder of loose files." >}}

Open it and the inspector lists the bundle's resources with thumbnails, including one level of subfolders for the common `images/` layout. Editing still writes to the bundle's `index.md`.

## Taxonomies across the site

**Taxonomy** in the site's **⋯** menu lists every tag and category with its usage count.

It groups spellings that differ only by case, shows the most common one and flags the rest with a **spellings** badge, so `Troubleshooting` and `troubleshooting` surface as one term that drifted rather than two you meant.

{{< shot name="taxonomy" alt="The Taxonomy sheet: every tag and category with its count, and a spellings badge on terms that differ only by case." >}}

**Rename** updates the term in each affected file's front matter. HugoKit shows the files first and records the operation as one [snapshot](/docs/snapshots-and-undo/) with a diff per file.

## What stays with your editor

Use **Open in editor** for longer writing. Files saved by HugoKit pass through the [snapshot layer](/docs/snapshots-and-undo/), and the development server reloads after either editor saves.
