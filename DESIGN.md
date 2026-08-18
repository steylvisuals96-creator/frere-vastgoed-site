# Design

<!-- Frère Vastgoed — per-klant design-systeem. Behouden merkactiva uit de bestaande site; verder volledig herontworpen uitvoering. -->

## Behouden (merkactiva)

- Naam/schrijfwijze: **Frère Vastgoed**.
- Logo: `public/images/logo.svg` (bestaand wordmark, overgenomen).
- Kleurkader: taupe accent, donkergrijze inkt, lichte neutrale ondergrond — overgenomen uit de bestaande site, maar hier voller ingezet (kleurvlakken, niet enkel knopjes).

## Vervangen

- Layout, typografie, componentstijl, ritme en motion: volledig nieuw.
- Poppins (template-standaard van de vorige site) vervangen door een eigen koppeling.
- Generieke centered-hero-met-CTA-knop-structuur vervangen door een asymmetrische "vitrine"-opbouw die het pand toont als het hoofdobject, met adresgegevens als informatieve specificatie (zoals een dossierkaart), niet als decoratie.

## Palet (rollen)

| Rol | Waarde | Gebruik |
|---|---|---|
| bg | `#F4F2ED` | Basisachtergrond, warm gebroken wit |
| ink | `#1C1B18` | Primaire tekst, bijna-zwart met warme ondertoon |
| accent | `#C9BFA0` | Taupe — grote kleurvlakken (secties, kaartachtergronden), niet enkel knoprand |
| accent-deep |  `#6B6146` | Donkerdere taupe voor tekst-op-accent en hover-states |
| support | `#4B4B46` | Secundaire tekst, labels, dunne lijnen |
| surface | `#FFFFFF` | Kaarten/panelen op de bg |

Strategie: **Committed** — de taupe draagt volledige sectievlakken (niet alleen knoppen), zodat het palet zichtbaar is zonder een pagina te worden.

## Typografie

- **Display/koppen**: Bricolage Grotesque — architecturaal, met net genoeg karakter voor vastgoed zonder in de gebruikelijke serif-vastgoedcliché te vallen.
- **Body/UI**: Inter — leesbaar, neutraal, voor labels, specificaties, navigatie.
- Geen fontWeight 300 nergens. Koppen: 600–700. Body: 400–500. Labels/specs: 500–600, kleine letters, geen kleine caps-decoratie.

## Signatuurzet

**"Dossierkaart"** — elk pand wordt getoond als een vitrine-object met een specificatie-strip eronder (m², slaapkamers, badkamers als harde cijfers, geen iconen-rij met stippen).

De hero volgt bewust de opzet van hun eigen site: sfeerbeeld vol-bleed, "Welkom bij Frère Vastgoed" links onderaan, met een zoekbalk (type + gemeente) en één tekstlink voor de schatting-CTA. Geen pandcijfers en geen gelabelde listing in de hero.

Bel-acties zijn een icoon + nummer (`IconPhone`), nooit los tekstnummer zonder icoon — anders leest het als een verweesd stuk tekst tussen de nav-links in plaats van een duidelijke actie.

## AI-chatwidget

Zelfde systeem als de rest van de site — géén dark-glassy 3D-kaartjes zoals het investinspain-widget waar de architectuur van hergebruikt is. Bot-bubbels `bg-bg`, gebruiker-bubbels `bg-ink` (contrast zonder rand of dot nodig). Snelkeuzeknoppen en pandkaartjes hoekig, zelfde regels als de rest van de site.

De launcher-knop staat fixed en verandert zelf van `bg-ink`/`bg-bg` naargelang wat erachter scrolt (zelfde `.op-donker`-signaal als de focus-ring): anders verdwijnt hij bijna op de donkere hero/testimonial-secties.

## Componentregels (hard, niet optioneel)

- **Geen pill-knoppen** — alle knoppen hoekig (0 border-radius of maximaal 2px).
- **Geen stip-labels** (geen `•` als scheidingsteken of statuslabel).
- **Geen →-pijltjes** als motief in links/knoppen.
- **Geen fontWeight 300** nergens in de typografieschaal.
- **Geen generieke identieke fade-in-on-scroll overal.** Drie motion-talen, elk met een eigen taak, geen van alle op scroll:
  - **Hero — onthulling** (`.hero-reveal`): het pand wordt niet zomaar getoond, het wordt opengeklapt (`clip-path`-wipe, 1,1s), gevolgd door de gestaffelde tekst (`.hero-in`). De focale zet van de site.
  - **Aanbodlijst — gecapte stagger** (`.grid-in`, `--i` per kaart): panden komen als lijst tegelijk op bij het laden, niet één voor één oneindig door — na kaart 8 geen extra vertraging meer.
  - **Mobiel menu — hoogte-transitie** (`.menu-collapse`, grid-template-rows 0fr→1fr): schuift in/uit i.p.v. abrupt te verschijnen. Padding/border staan op een binnenste div, nooit op het element dat zelf naar 0 moet krimpen — anders blijft dat als een kaal randje staan.
  
  Voeg geen vierde, herhaalde scroll-fade toe aan een nieuwe sectie — dat is precies het patroon dat dit verbiedt. Niet elk element heeft motion nodig (testimonial en footer blijven bewust statisch).
- **`prefers-reduced-motion` wordt gerespecteerd** — animaties en smooth scroll gaan uit.
- **Focus-ring per ondergrond**: `accent-deep` op licht, `accent` binnen `.op-donker`. Zet die klasse op elke sectie met donkere achtergrond, anders zakt de ring naar 2,8:1.

## Dichtheid & ritme

Ruim, met één opvallend dicht blok (de specificatie-strip) als contrast. Meer ruimte boven een kop dan eronder. Secties wisselen tussen vol-kleur (taupe) en licht (bg) om ritme te geven — nooit twee opeenvolgende secties met dezelfde achtergrond.
