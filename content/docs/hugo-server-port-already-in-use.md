---
title: "hugo server won't start: port already in use"
description: "Hugo exits with \"address already in use\" on port 1313. Find what's holding the port, free it, or just run on another one."
group: "Fixing common Hugo problems"
weight: 20
tags: [server, troubleshooting]
---

You run `hugo server` and get:

```
Error: listen tcp 127.0.0.1:1313: bind: address already in use
```

Something is already listening on port 1313. Nine times out of ten it's a `hugo server` you started earlier – in a terminal tab you closed without stopping it, or in another window.

## The quick way out: use another port

```bash
hugo server --port 1314
```

That's it. Nothing is broken; two servers just can't share one port.

## Find what's holding the port

```bash
lsof -i :1313
```

```
COMMAND   PID  USER   FD   TYPE  DEVICE  SIZE/OFF  NODE NAME
hugo    47118 anders   9u  IPv4  0x...      0t0     TCP localhost:bmc-perf-agent (LISTEN)
```

If it's a Hugo process you forgot about, stop it:

```bash
kill 47118
```

Stop every Hugo server at once:

```bash
pkill -f "hugo server"
```

If it isn't Hugo, look at the `COMMAND` column before you kill anything – 1313 is Hugo's default, but other tools use nearby ports.

## It says the port is in use, but nothing is listening

Two cases worth knowing about:

- **The old process is a zombie.** `lsof` shows a Hugo PID, but the browser gets nothing. `kill` it and start again.
- **You're behind a different address.** `hugo server` binds to `127.0.0.1` by default. Something bound to `0.0.0.0:1313` (a container, a VM) occupies the same port from your machine's point of view.

## Don't fight the port – reuse the server

If the server that owns the port is already serving the site you're working on, you don't need a new one. Open `http://localhost:1313/` and keep working; Hugo is already watching your files.

> HugoKit gives every site its own port – it tests the port by actually binding it before offering it, so two sites can run side by side. It warns you before you start if the port is taken, and if Hugo does fail with *address already in use*, HugoKit looks for the server that's already running on that port and attaches to it instead of starting a second one. See [Running the server](/docs/running-the-server/).
