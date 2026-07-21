---
title: "Publishing over SFTP"
description: "Upload a Hugo site to your own web host from HugoKit over SFTP or plain FTP – what to fill in, how the smart sync works, and why passwords need sshpass."
group: "Publishing"
weight: 20
tags: [publishing, sftp]
---

If you have a web host rather than a GitHub Pages site, HugoKit builds the site on your Mac and uploads it. It only sends the files that actually changed.

## Before you start

You need the SFTP details your host gave you: host, username, password (or an SSH key), and the folder your site is served from – often `/public_html`.

Set your real `baseURL` in `hugo.toml` first. Unlike the GitHub Pages path, HugoKit does not override it for an FTP build: the site is built exactly as your config says. [Preflight](/docs/preflight/) will stop you if it still points at localhost.

## Add the deploy target

**Deploy → Add Deploy Target → FTP / SFTP.**

| Field | Notes |
|---|---|
| Protocol | **SFTP** (port 22) by default – encrypted, uses SSH keys or a password. **FTP (legacy)** (port 21) is unencrypted; only use it if your host can't do SFTP. |
| Host | Just the server: `ssh.example.com` or an IP. HugoKit strips anything else you paste – a `sftp://` scheme, a `user@` prefix, a `:port`, a trailing path – and refuses to continue if what's left isn't a host name. |
| Port | Follows the protocol unless you change it. |
| Username | Your host's SFTP user. |
| Password | Optional for SFTP: leave it empty to use an SSH key from `~/.ssh`. Stored in your macOS Keychain, never in a file. |
| Remote path | Where the site is served from, e.g. `/public_html`. |
| Public URL | Optional. Gives the target an **Open Live Site** action. |

The **Verify** step is a real login: HugoKit connects to the server and logs out again. You can't finish the wizard until it succeeds – better to find out here than halfway through a deploy.

## Password authentication needs sshpass

`sftp` won't take a password from another program, so HugoKit uses **sshpass** for password authentication:

```
brew install sshpass
```

Without it, you'll get: *Password auth requires sshpass – install with: brew install sshpass. Or leave password blank to use SSH key auth.*

The alternative is an SSH key. Leave the password field empty, and HugoKit uses the key in `~/.ssh` – no extra tool, and no password anywhere.

## Publish

`⌘P`. HugoKit:

1. Builds the site with `hugo --gc --minify`.
2. Works out what actually changed. `.hugokit/ftp-manifest.json` in your project holds a SHA-256 hash of every file it uploaded last time. Files with a new hash are uploaded, files you deleted locally are deleted on the server, and everything else is left alone:
   ```
   Smart sync: 3 to upload, 1 to delete, 214 unchanged
   ```
3. Uploads, then updates the manifest.

Dotfiles come along: `.htaccess`, `.well-known`, `.nojekyll` all upload. Only Finder junk (`.DS_Store`, `._*`) is filtered out.

Nothing changed since last time? `No files to sync – site is up to date`.

If the target has a **Public URL**, HugoKit probes it after the upload – the dot on the target row tells you whether the live site actually responds, and **Check if Live** in the target's **⋯** menu runs the same probe on demand.

Change the host or the remote path and the manifest no longer applies – HugoKit does a full upload. Note that files on the *old* server are left where they are.

## Plain FTP

Legacy FTP goes through `curl` with opportunistic TLS: the login is encrypted whenever the server offers it, falling back to plain FTP when it doesn't. HugoKit caps the connection at TLS 1.2 on purpose – several common FTP servers (ProFTPD, Pure-FTPd, which is what a lot of shared hosting runs) abort the data connection on the last bytes of a file when TLS 1.3 session reuse is in play, so uploads silently truncate. TLS 1.2 doesn't have the bug.

## When something goes wrong

| Message | What to do |
|---|---|
| `SFTP login failed for user@host` | Wrong username or password – or your SSH key isn't authorised on the server. |
| `Couldn't reach host – check host/port and firewall` | The host name, the port, or the server itself. Check that you can reach it at all. |
| `FTP host is missing` / `FTP username is missing` | The target is half-configured. Open **Edit…** on it. |

Removing a target only stops HugoKit from publishing to it. Files you've already uploaded stay on the server.
