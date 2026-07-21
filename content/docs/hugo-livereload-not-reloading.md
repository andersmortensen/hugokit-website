---
title: "LiveReload isn't reloading"
description: "You save a file and the Hugo dev server does nothing – or reloads with the old content. Work out whether Hugo saw the change or the browser ignored it."
group: "Fixing common Hugo problems"
weight: 30
tags: [server, troubleshooting]
---

You save a file. The browser sits there. Or it refreshes and shows exactly what it showed before.

Before you change anything, work out **which half is broken**: did Hugo see the file change, or did the browser fail to act on it? The server log answers that. Save the file and watch the terminal:

```
Change detected, rebuilding site (#1).
Total in 42 ms
```

- **You see that line** → Hugo saw it. The problem is in the browser.
- **You see nothing** → Hugo never noticed the file. The problem is the watcher.

Those are two completely different bugs, and guessing wrong costs you an hour.

## Hugo rebuilt, but the browser didn't

**Is the LiveReload script actually in the page?** View source and look in the `<head>`:

```html
<script src="/livereload.js?mindelay=10&v=2&port=1313&path=livereload" defer></script>
```

Hugo injects it into every HTML page it serves. If it isn't there:

- **`disableLiveReload` is on.** Check your config for `disableLiveReload = true`, and check that the server isn't running with `--disableLiveReload`.
- **You're not looking at the dev server.** Opening a file from `public/` (a `file://` URL), or serving `public/` through some other web server, gives you a page with no LiveReload connection. The address has to be `localhost:1313`.

**The script is there but nothing happens?** LiveReload runs over a WebSocket to the same port. A content blocker, a corporate proxy or an aggressive browser extension can kill it – try a private window with extensions disabled. And if your own site registers a service worker, it can serve you a cached page forever; unregister it under DevTools → Application → Service Workers.

## The page reloads but the content is stale

That's Fast Render Mode. Hugo only re-renders what it thinks it needs to, and some changes – config, data files, some template changes – fall outside its guess.

```bash
hugo server --disableFastRender
```

Slower, always right. Use it while you're debugging, not permanently.

Note that changing the config file restarts the whole server rather than triggering a rebuild – that's expected, and it takes a moment longer.

## Hugo never saw the change

If nothing appears in the log when you save, the file watcher never fired:

- **Your editor writes an atomic replace.** Some editors save to a temp file and rename it over the original. Hugo usually copes, but on a network share it may not see anything.
- **The project is on a network volume, a synced folder or a mounted share.** File-change events don't always cross that boundary. Move the project to a local folder and try again.
- **You edited a file Hugo doesn't watch.** Hugo watches your project's directories – files outside them, or reached through a symlink, may not produce events.
- **You hit the OS limit on watched files.** On a big project you'll see a warning about too many open files. Restarting the server usually clears it.

## Hard refresh, once

If you've fixed the cause and the page still looks old, the browser is holding a cached copy: `⇧⌘R` on macOS, `Ctrl+F5` on Windows. Do this *after* you've found the cause, not instead of finding it.

> HugoKit never turns LiveReload off, and its log tells you which half you're in: a `File changed – rebuilding` line means Hugo saw the change and the browser is the problem. No line means the watcher never fired. See [Running the server](/docs/running-the-server/).
