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
| Release notes (kilde) | markdown pr. version | `content/changelog/X.Y.Z.md` (dette repo) | `/changelog/X.Y.Z/` — den fulde side i browseren |
| Release notes (Sparkle) | `dist/HugoKit-X.Y.Z-release-notes.html`, bygget af `release.sh` fra sidens `in-app.html` | asset på GitHub-release `vX.Y.Z` | `…/releases/download/vX.Y.Z/HugoKit-X.Y.Z-release-notes.html` — det er den appcast'ens `releaseNotesLink` peger på, signeret |

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
>
> **Sparkle læser ikke siden fra hugokit.com** (siden 2026-08-08, M-09). En
> signatur dækker præcise bytes, og `in-app.html` genbygges ved hver
> website-deploy med et fingerprintet stylesheet-link — en website-hostet note
> ville gå mørk ved næste urelaterede CSS-ændring. `release.sh` bygger derfor
> sitet til `dist/website-build/`, kopierer `changelog/X.Y.Z/in-app.html` ud som
> `HugoKit-X.Y.Z-release-notes.html`, signerer den med `sign_update` og lægger
> den op som asset ved siden af DMG'en. Siden på hugokit.com er stadig kilden og
> den fulde læseoplevelse i browseren — den er bare ikke det Sparkle henter.

## Trin

1. Skriv/redigér `content/changelog/X.Y.Z.md` **først**. Siden skal eksistere og
   være publiceret, før `release.sh` køres: scriptet bygger sitet og henter
   `changelog/X.Y.Z/in-app.html` ud af build'et som den note Sparkle signerer og
   viser. Mangler siden, stopper releasen.
2. Kør `scripts/release.sh` i HugoKit-repoet (9 trin). Scriptet kører hele vejen
   selv: det bygger, notariserer, signerer noten, patcher appcast'ens
   `releaseNotesLink` til release-assettet, opretter GitHub-releasen som **draft**
   med tre assets (versioneret DMG, `HugoKit.dmg`, release-noten), kører
   `release-postflight.sh` mod det publicerede asset og udgiver først releasen når
   postflight er grøn.
3. Gennemgå den udgivne GitHub-release: den skal bære **tre** assets — den
   versionerede DMG, `HugoKit.dmg` (det faste navn sitets download-knap bruger,
   uden redirects) og `HugoKit-X.Y.Z-release-notes.html`.
4. Scriptet kopierer selv `dist/sparkle/appcast.xml` → `static/appcast.xml` i dette
   repo til sidst. Gennemgå diffen og commit den — den er ikke live før sitet
   deployes. `generate_appcast` kan kun bygge release-notes-linket som
   `<prefix><dmg-navn>.html`, så XML'en patches bagefter; enhver senere redigering
   af `appcast.xml` ugyldiggør feed-signaturen.
5. Bump download-fakta i `hugo.toml` (`[params]`) — de står under download-knappen
   på forsiden og skal matche den DMG appcast'en peger på:

   | Param | Kilde |
   |---|---|
   | `version` | `sparkle:shortVersionString` i appcast'en |
   | `dmgSize` | `enclosure length` i appcast'en (bytes → MB) |
   | `releaseDate` | `pubDate` i appcast'en (ISO-dato) |
   | `architecture` | `file dist/export/HugoKit.app/Contents/MacOS/HugoKit` |
   | `requires` | `sparkle:minimumSystemVersion` i appcast'en |

6. Byg og deploy sitet som normalt (`hugo` → upload af `public/`).
7. Verificér: `https://hugokit.com/appcast.xml` svarer 200, download-knappen
   henter DMG'en fra GitHub, `/changelog/X.Y.Z/` renderer, download-fakta under
   knappen matcher den nye DMG, og en ældre app-installation tilbyder
   opdateringen (Sparkle: "Check for Updates…").

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
