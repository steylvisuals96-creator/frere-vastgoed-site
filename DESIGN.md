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
| accent-deep | `#8B7F5E` | Donkerdere taupe voor tekst-op-accent en hover-states |
| support | `#4B4B46` | Secundaire tekst, labels, dunne lijnen |
| surface | `#FFFFFF` | Kaarten/panelen op de bg |

Strategie: **Committed** — de taupe draagt volledige sectievlakken (niet alleen knoppen), zodat het palet zichtbaar is zonder een pagina te worden.

## Typografie

- **Display/koppen**: Bricolage Grotesque — architecturaal, met net genoeg karakter voor vastgoed zonder in de gebruikelijke serif-vastgoedcliché te vallen.
- **Body/UI**: Inter — leesbaar, neutraal, voor labels, specificaties, navigatie.
- Geen fontWeight 300 nergens. Koppen: 600–700. Body: 400–500. Labels/specs: 500–600, kleine letters, geen kleine caps-decoratie.

## Signatuurzet

**"Dossierkaart"** — elk pand wordt getoond als een vitrine-object met een specificatie-strip eronder (m², slaapkamers, badkamers als harde cijfers, geen iconen-rij met stippen).

De hero doet dit bewust **niet**: die introduceert het kantoor en de streek, niet één specifiek pand. Het beeld is sfeer (geen gelabelde listing), en de strip onderaan toont de diensten in plaats van pandcijfers. Een bezoeker mag niet landen op een spec-sheet van één woning.

## Componentregels (hard, niet optioneel)

- **Geen pill-knoppen** — alle knoppen hoekig (0 border-radius of maximaal 2px).
- **Geen stip-labels** (geen `•` als scheidingsteken of statuslabel).
- **Geen →-pijltjes** als motief in links/knoppen.
- **Geen fontWeight 300** nergens in de typografieschaal.
- **Geen generieke identieke fade-in-on-scroll overal** — motion is functioneel en gevarieerd (bv. de dossierkaart-strip schuift in vanuit de zijkant bij scroll, niet dezelfde fade als de testimonial).

## Dichtheid & ritme

Ruim, met één opvallend dicht blok (de specificatie-strip) als contrast. Meer ruimte boven een kop dan eronder. Secties wisselen tussen vol-kleur (taupe) en licht (bg) om ritme te geven — nooit twee opeenvolgende secties met dezelfde achtergrond.
