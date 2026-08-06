---
title: "LiveReload isn't reloading"
description: "You saved the file, but nothing moved. Check whether Hugo's watcher or the browser connection missed the change."
group: "Fixing common Hugo problems"
weight: 30
tags: [server, troubleshooting]
---

After a file is saved, the browser either does not reload or reloads with stale content.

The quickest way through is to find out whether Hugo saw the change. Save the file and inspect the server log:

```
Change detected, rebuilding site (#1).
Total in 42 ms
```

- **You see that line** → Hugo saw it. The problem is in the browser.
- **You see nothing** → Hugo never noticed the file. The problem is the watcher.

These results separate a file-watcher problem from a browser LiveReload problem.

## Hugo rebuilt, but the browser didn't

**Is the LiveReload script actually in the page?** View source and look in the `<head>`:

```html
<script src="/livereload.js?mindelay=10&v=2&port=1313&path=livereload" defer></script>
```

Hugo injects it into every HTML page it serves. If it isn't there:

- **`disableLiveReload` is on.** Check your config for `disableLiveReload = true`, and check that the server isn't running with `--disableLiveReload`.
- **You're not looking at the dev server.** Opening a file from `public/` (a `file://` URL), or serving `public/` through some other web server, gives you a page with no LiveReload connection. The address has to be `localhost:1313`.

**If the script is present but no reload occurs**, test the WebSocket in a private window without extensions. Also unregister any site service worker under **DevTools → Application → Service Workers**.

## The page reloads but the content is stale

Fast Render Mode may not rebuild all pages affected by configuration, data or template changes.

```bash
hugo server --disableFastRender
```

Use `--disableFastRender` while diagnosing stale output; it performs broader rebuilds and can be slower.

Note that changing the config file restarts the whole server rather than triggering a rebuild – that's expected, and it takes a moment longer.

## Hugo never saw the change

If nothing appears in the log when you save, the file watcher never fired:

- **Your editor writes an atomic replace.** Some editors save to a temp file and rename it over the original. Hugo usually copes, but on a network share it may not see anything.
- **The project is on a network volume, a synced folder or a mounted share.** File-change events don't always cross that boundary. Move the project to a local folder and try again.
- **You edited a file Hugo doesn't watch.** Hugo watches your project's directories – files outside them, or reached through a symlink, may not produce events.
- **You hit the OS limit on watched files.** On a big project you'll see a warning about too many open files. Restarting the server usually clears it.

## Hard refresh, once

After resolving the cause, use `⇧⌘R` on macOS or `Ctrl+F5` on Windows to bypass a cached page.

> **In HugoKit:** the server log shows whether Hugo detected the file change and started a rebuild.
