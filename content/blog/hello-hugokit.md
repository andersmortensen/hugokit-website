---
title: "The thinking behind HugoKit"
date: 2026-04-14
summary: "Why a Hugo site deserves a native macOS home — and what I tried to leave out."
---

Hi,

If you're reading this, you've probably either just downloaded HugoKit or you're
trying to decide whether it's worth the disk space. Either way, I thought I'd
write down why the app exists, so you can tell pretty quickly whether it was
built for someone like you.

I love Hugo. It's fast, it's opinionated in all the right places, and the
community has built an enormous catalogue of themes that cover almost any use
case. For a solo writer who just wants a website that loads instantly and
doesn't rot over time, it's hard to beat. I've been using it for years, and I
don't plan on stopping.

What I don't love is the friction around it.

Every time I wanted to write, the same small ritual played out. Open the
terminal. `cd` into the right folder — was it `site-a` or `site-a-new`?
Remember which port I left the last server on. Squint at a stack trace when a
theme partial broke. Push to GitHub and then open a new tab to check if the
Action actually ran. None of it is hard. All of it is a tax.

For me, the tax was small. For people I tried to get onto Hugo — friends,
family, a couple of clients — the tax was the whole thing. They'd look at the
terminal, politely nod, and go back to whatever they were using before. That
bothered me more than it should have. Hugo is genuinely good software. The
reason more people weren't using it wasn't Hugo — it was the twelve steps
between them and Hugo.

So HugoKit started with a question: what would Hugo feel like if you never had
to open a terminal to use it? Not "Hugo in a GUI" — I didn't want to wrap
every CLI flag in a checkbox. I wanted the *workflow* to move into a native
window. Pick a site. Hit start. See it live. Edit. Publish. That's the whole
loop, and it's the loop I already ran ten times a day from muscle memory. The
app should just make that loop one click deep.

A few principles fell out of that pretty quickly, and I want to be honest
about them up front, because they shape what the app is — and isn't.

The app is most useful when it's minimized. Start a server, check a stat,
close the window, keep writing. If you're looking at HugoKit for longer than a
few seconds at a time, something has gone wrong on my end. Everything it does
is also something you could do yourself from the terminal — no lock-in, no
proprietary format, no "HugoKit sites." Just regular Hugo sites you could hand
off to another tool tomorrow. It's a remote control, not a walled garden. And
it's built in SwiftUI, with real macOS controls and real keyboard shortcuts,
because I didn't want another Electron window full of rounded rectangles that
look almost-but-not-quite right on the Mac.

The harder part was deciding what to leave out. The temptation with a project
like this is to keep going. A drafts manager. A theme marketplace. An AI
writing assistant. I said no to almost all of it, for the same reason: the
moment HugoKit starts owning your content, it stops being a remote control and
starts being a cage. So there's no HugoKit cloud. No account. No telemetry.
No "pro" tier. Your sites live in your folders, committed to your Git repos,
hosted wherever you like. If I vanish tomorrow, nothing in your setup breaks.
That matters to me, and if you've been burned by a beloved app going dark, I
hope it matters to you too.

v0.1 is a beta, and it's deliberately narrow: multi-site management, a
one-click server, visual config editing, GitHub Pages publishing, and enough
analytics to tell you which drafts have been rotting in your content folder
for six months. That's the spine. Everything else — more deploy targets,
richer previews, better theme tooling — gets added only when it earns its
place. I'd rather ship a small app I can stand behind than a bloated one I
can't.

I'll keep writing here as the app grows — why a feature made it in, why
another one didn't, what broke in production that I wish I'd caught earlier.
If you're using HugoKit and something about it annoys you, that's exactly the
kind of feedback that moves the app forward. The
[GitHub issues](https://github.com/andersmortensen/HugoKit/issues) page is
open, and I read every one.

Thanks for being here this early. Now go close this tab and write something.

— Anders
