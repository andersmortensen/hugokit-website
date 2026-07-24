---
title: "Privacy"
description: "What the app sends, what the website measures, and how to turn the measuring off."
date: 2026-07-14
# Kvitteringen øverst på siden: svaret før prosaen. Hver linje er et faktum der
# også står i teksten – ikke et løfte der kun står her.
glance:
  - glyph: "person"
    text: "No account, ever"
  - glyph: "content"
    text: "No analytics in the app"
  - glyph: "config"
    text: "Cookies off until you accept"
---

HugoKit is a Mac app that runs on your machine. This page says exactly what leaves it, and what this website records when you visit.

## The app

There is no account, no sign-in and no HugoKit server. The app has no analytics and no crash reporting: nothing about how you use it is collected, and nothing is sent to me.

It does talk to the network, but only for these things:

{{< def term="Checking for updates" >}}
The app asks `hugokit.com/appcast.xml` whether a newer version exists. It sends no system profile with that request – Sparkle's system profiling is switched off.
{{< /def >}}

{{< def term="Installing Hugo" >}}
If you don't have Hugo, the app asks GitHub for the latest Hugo release and downloads it from there.
{{< /def >}}

{{< def term="Publishing your site" >}}
Over SFTP that means your own host, and nothing else. Over GitHub Pages it means GitHub: you sign in with GitHub's own device flow, and the app pushes with Git.
{{< /def >}}

Your files stay where they are. Nothing is converted, copied into an app format, or uploaded anywhere you did not point the app at yourself.

Deploy credentials go into the macOS Keychain, never into a config file in your repository.

## This website

The site uses Google Analytics 4 to count visits and downloads. It is off until you accept it: analytics storage is denied by default, and no analytics cookies are set unless you press Accept in the banner.

If you accept, page views are recorded along with a small set of events: the download button being clicked, the download actually starting, the download section coming into view, an FAQ item being opened, the light/dark toggle being used, a step in the loop panel being changed, the GitHub and feedback links being clicked, and pages that were not found.

Your choice is stored in your browser under the key `hk-consent`. It is not a cookie and it is not sent anywhere. Choosing Decline clears any analytics cookies that were already set.

You can change your mind at any time: the **Cookies** link in the footer reopens the banner.

No ads, no tracking pixels, no data sold or handed to anyone beyond Google Analytics itself.

## Questions

Write to [hello@hugokit.com](mailto:hello@hugokit.com).