# Release-flow: fra `release.sh` til hugokit.com

Appens `scripts/release.sh` (i HugoKit-repoet) bygger, notariserer og samler
upload-sættet i `dist/sparkle/`. Dette site hoster derefter tre ting:

| Hvad | Hvorfra | Hvortil (dette repo) | URL |
|---|---|---|---|
| Appcast | `dist/sparkle/appcast.xml` | `static/appcast.xml` | `https://hugokit.com/appcast.xml` (= appens `SUFeedURL`) |
| DMG | `dist/sparkle/HugoKit-X.Y.Z.dmg` | `static/downloads/HugoKit-X.Y.Z.dmg` **og** en kopi som `static/downloads/HugoKit.dmg` | `/downloads/HugoKit.dmg` (= sitets `downloadURL`-param) |
| Release notes | HTML-noter pr. version | `static/changelog/X.Y.Z.html` | linkes fra appcast'en |

## Trin

1. Kør `scripts/release.sh` i HugoKit-repoet (7 trin, ender i `dist/sparkle/`).
2. Kopiér filerne ind jf. tabellen ovenfor. `HugoKit.dmg` er altid en kopi af
   den nyeste versionerede DMG — det faste navn holder sitets download-knap
   stabil uden redirects.
3. Byg og deploy sitet som normalt (`hugo` → upload af `public/`).
4. Verificér: `https://hugokit.com/appcast.xml` svarer 200, og en ældre
   app-installation tilbyder opdateringen (Sparkle: "Check for Updates…").

## Noter

- **Rækkefølgen i `release.sh` er hellig:** `generate_appcast` kører EFTER
  notarize/staple, fordi stapling ændrer DMG'en — EdDSA-signaturen skal matche
  den fil der faktisk distribueres. Omsigneres der manuelt, gælder samme regel.
- Appcast'en committes gerne i dette repo (lille XML), men DMG'er er store —
  overvej om `static/downloads/*.dmg` skal i `.gitignore` og kun leve på
  hosting-serveren. `.gitkeep`-filerne holder mappestrukturen i git uanset.
- Første release: indtil DMG'en ligger klar giver `/downloads/HugoKit.dmg` 404 —
  sitet kan deployes alligevel, eller `downloadURL` i `hugo.toml` kan midlertidigt
  pege på GitHub-releases igen.
