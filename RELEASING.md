# Release-flow: fra `release.sh` til hugokit.com

Appens `scripts/release.sh` (i HugoKit-repoet) bygger, notariserer og samler
upload-sættet i `dist/`. **DMG'erne hostes på GitHub** (det offentlige repo
`andersmortensen/hugokit`), mens **appcast'en bliver på hugokit.com** – den URL
er `SUFeedURL` i appens `Info.plist` og må aldrig flytte.

| Hvad | Hvorfra | Hvortil | URL |
|---|---|---|---|
| Appcast | `dist/sparkle/appcast.xml` | `static/appcast.xml` (dette repo) | `https://hugokit.com/appcast.xml` (= appens `SUFeedURL`) |
| DMG (versioneret) | `dist/sparkle/HugoKit-X.Y.Z.dmg` | asset på GitHub-release `vX.Y.Z` | `…/releases/download/vX.Y.Z/HugoKit-X.Y.Z.dmg` — det er den appcast'en signerer og peger på |
| DMG (fast navn) | `dist/HugoKit.dmg` (samme fil) | **andet** asset på samme release | `…/releases/latest/download/HugoKit.dmg` (= sitets `downloadURL`-param) |
| Release notes | markdown pr. version | `content/changelog/X.Y.Z.md` (dette repo) | `/changelog/X.Y.Z/` — linkes fra appcast'en (`releaseNotesLink`) |

Sitet hoster altså ingen binærer længere; `static/downloads/` er ikke i brug.

> **Release notes er Hugo-indhold** (siden 2026-07-10): skriv markdown i
> `content/changelog/X.Y.Z.md` (front matter: `title: "X.Y.Z"`, `date`, og
> **fjern `draft: true`**) — templaten i `layouts/changelog/` giver siden sitets
> design og fungerer både i browseren og i Sparkles kompakte update-vindue.
> `content/changelog/0.1.0.md` ligger klar som første entry (publiceret som eksempel);
> `content/changelog/_skabelon.md` (draft) ejer formatet: kategorierne
> `## New / Improved / Fixed / Removed / Notes` rendrer som badges via heading-id.
> Den gamle kontrakt (`static/changelog/X.Y.Z.html`) er udgået — mappen var tom,
> ingen appcast var udgivet endnu.

## Trin

1. Kør `scripts/release.sh` i HugoKit-repoet (7 trin, ender i `dist/`).
   Scriptet printer til sidst den `gh release create`-kommando der skal køres.
2. Udgiv GitHub-releasen med **begge** DMG-assets (versioneret + `HugoKit.dmg`).
   Det faste navn holder sitets download-knap stabil uden redirects.
3. Kopiér `dist/sparkle/appcast.xml` → `static/appcast.xml` i dette repo.
4. Skriv/redigér `content/changelog/X.Y.Z.md`. Siden **skal** eksistere: scriptet
   sætter selv appcast'ens `releaseNotesLink` til `https://hugokit.com/changelog/X.Y.Z/`
   (`generate_appcast` kan kun bygge linket som `<prefix><dmg-navn>.html`, så
   release.sh patcher XML'en bagefter — der genereres ingen HTML-notes længere).
5. Byg og deploy sitet som normalt (`hugo` → upload af `public/`).
6. Verificér: `https://hugokit.com/appcast.xml` svarer 200, download-knappen
   henter DMG'en fra GitHub, `/changelog/X.Y.Z/` renderer, og en ældre
   app-installation tilbyder opdateringen (Sparkle: "Check for Updates…").

## Noter

- **Rækkefølgen i `release.sh` er hellig:** `generate_appcast` kører EFTER
  notarize/staple, fordi stapling ændrer DMG'en — EdDSA-signaturen skal matche
  den fil der faktisk distribueres. Omsigneres der manuelt, gælder samme regel.
- Appcast'en committes i dette repo (lille XML). DMG'er gør ikke — de bor på
  GitHub-releases, som også bærer bandwidth'en. `static/downloads/` er død vægt
  og kan ryddes.
- Første release: indtil den findes giver `/releases/latest/download/HugoKit.dmg`
  404. Sitet kan deployes alligevel — download-knappen virker i samme øjeblik
  releasen er udgivet.
