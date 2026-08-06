---
title: "Publishing over SFTP"
description: "Connect a regular web host over SFTP or FTP, verify the login and publish only what changed."
group: "Publishing"
weight: 20
tags: [publishing, sftp]
---

If your site lives on a regular web host, HugoKit can build it locally and upload the generated files directly over SFTP or FTP.

## Before you start

You need the SFTP details your host gave you: host, username, password (or an SSH key), and the folder your site is served from – often `/public_html`.

Set your real `baseURL` in `hugo.toml` first. Unlike the GitHub Pages path, HugoKit does not override it for an FTP build: the site is built exactly as your config says. [Preflight](/docs/preflight/) will stop you if it still points at localhost.

## Add the deploy target

**Deploy → Add Deploy Target → FTP / SFTP.**

| Field | Notes |
|---|---|
| Protocol | **SFTP** uses port 22 and supports SSH keys or passwords. **FTP (legacy)** uses port 21 and is unencrypted; use it only when the host does not support SFTP. |
| Host | Just the server: `ssh.example.com` or an IP. HugoKit strips anything else you paste – a `sftp://` scheme, a `user@` prefix, a `:port`, a trailing path – and refuses to continue if what's left isn't a host name. |
| Port | Follows the protocol unless you change it. |
| Username | Your host's SFTP user. |
| Password | Optional for SFTP: leave it empty to use an SSH key from `~/.ssh`. Stored in your macOS Keychain, never in a file. |
| Remote path | Where the site is served from, e.g. `/public_html`. |
| Public URL | Optional. Gives the target an **Open Live Site** action. |

**Verify** connects to the server and logs out. The wizard cannot be completed until the login succeeds.

## Password authentication needs sshpass

`sftp` won't take a password from another program, so HugoKit uses **sshpass** for password authentication:

```
brew install sshpass
```

Without it, you'll get: *Password auth requires sshpass – install with: brew install sshpass. Or leave password blank to use SSH key auth.*

Leave the password empty to use an SSH key from `~/.ssh`; this does not require `sshpass`.

## Publish

`⌘P`. HugoKit:

1. Builds the site with the flags set for it – `hugo --gc --minify` by default. See [Build flags](/docs/build-flags/).
2. Compares the build with a target-specific manifest under `.hugokit/`. The manifest stores each file's SHA-256 hash and the target's protocol, host, port, username and remote root. Changed files are uploaded, removed files are deleted and unchanged files are skipped:
   ```
   Smart sync: 3 to upload, 1 to delete, 214 unchanged
   ```
3. Uploads, then updates the manifest. If the server refuses one delete, that path stays pending and appears in the next diff. If the file is already gone, HugoKit treats the delete as successful.

Dotfiles such as `.htaccess`, `.well-known` and `.nojekyll` are uploaded. Finder metadata (`.DS_Store`, `._*`) is excluded.

When no files changed, the log reports `No files to sync – site is up to date`.

If the target has a **Public URL**, HugoKit probes it after the upload – the dot on the target row tells you whether the live site actually responds, and **Check if Live** in the target's **⋯** menu runs the same probe on demand.

Change the protocol, host, port, username or remote path and the manifest no longer applies – HugoKit does a full upload. Note that files on the *old* server are left where they are.

## Plain FTP

Legacy FTP goes through `curl` with opportunistic TLS: the login is encrypted whenever the server offers it, falling back to plain FTP when it doesn't. HugoKit caps the connection at TLS 1.2 on purpose – several common FTP servers (ProFTPD, Pure-FTPd, which is what a lot of shared hosting runs) abort the data connection on the last bytes of a file when TLS 1.3 session reuse is in play, so uploads silently truncate. TLS 1.2 doesn't have the bug.

## When something goes wrong

| Message | What to do |
|---|---|
| `SFTP login failed for user@host` | Wrong username or password – or your SSH key isn't authorised on the server. |
| `Couldn't reach host – check host/port and firewall` | The host name, the port, or the server itself. Check that you can reach it at all. |
| `FTP host is missing` / `FTP username is missing` | The target is half-configured. Open **Edit…** on it. |

Removing a target only stops HugoKit from publishing to it. Files you've already uploaded stay on the server.
