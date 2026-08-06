---
title: "hugo server won't start: port already in use"
description: "Another process already has port 1313. Reuse it, stop it or choose another port."
group: "Fixing common Hugo problems"
weight: 20
tags: [server, troubleshooting]
---

You run `hugo server` and get:

```
Error: listen tcp 127.0.0.1:1313: bind: address already in use
```

Nothing is wrong with the site – another process is already listening on port 1313. It may be an earlier `hugo server` process.

## The quick way out: use another port

```bash
hugo server --port 1314
```

Two processes cannot listen on the same address and port.

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

- **The old process no longer responds.** If `lsof` still shows its Hugo PID, stop that process and restart the server.
- **You're behind a different address.** `hugo server` binds to `127.0.0.1` by default. Something bound to `0.0.0.0:1313` (a container, a VM) occupies the same port from your machine's point of view.

## Reuse the existing server

If the process already serves the same project, open `http://localhost:1313/` and use the existing server.

> **In HugoKit:** each site has its own tested port, and HugoKit can attach to an existing server for the same project.
