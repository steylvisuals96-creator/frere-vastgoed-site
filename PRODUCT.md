# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, vers gescaffold voor dit project. Deployt standalone op Vercel (los van elk ander SteylVisuals-project). Repo: `steylvisuals96-creator/frere-vastgoed-site` (publiek).

## Users

Twee publieken, in deze volgorde:

1. **Beslisser bij Frère Vastgoed** — het kantoor is nog geen klant. Zij openen de link die Sam stuurt, vergelijken met hun huidige site, en beslissen of ze overstappen. Dit publiek bepaalt of het project doorgaat.
2. **Eindbezoekers** — mensen in As, Genk, Maasmechelen, Oudsbergen en omstreken die vastgoed willen kopen, huren of verkopen. Primaire intentie op de homepage: beschikbaar aanbod doorbladeren ("Aanbod bekijken"); schatting aanvragen is secundair.

## Product Purpose

**Spec-pitch, geen bevestigde opdracht.** Frère Vastgoed heeft dit niet besteld. De site is een onaangevraagd voorstel dat moet aantonen dat SteylVisuals hun bestaande (Zabun-template) site duidelijk kan verslaan, met als doel de opdracht binnen te halen.

Dat betekent: het werk moet in de eerste seconden zichtbaar beter zijn dan wat ze nu hebben, en tegelijk herkenbaar hún site blijven — een pitch die het merk niet respecteert, verliest.

## Positioning

Lokale, persoonlijke vastgoedmakelaar in Limburg (As/Genk/Maasmechelen/Oudsbergen) met resultaatgerichte begeleiding bij verkoop, verhuur en aankoop. Onderscheidt zich niet met technologie maar met persoonlijke, deskundige begeleiding — bevestigd door klantreviews (bv. snelle verkoop op 10 dagen).

## Operating Context

- **Pitch-scene:** de beslisser bij Frère opent de link, waarschijnlijk op gsm, waarschijnlijk kort. Naast elkaar leggen met frerevastgoed.be is de impliciete vergelijking. Mobiel moet dus minstens even sterk zijn als desktop.
- **Bezoeker-scene:** komt via Google of mond-tot-mond, bekijkt aanbod, leest reviews, belt of mailt, of komt op afspraak langs op het kantoor in As.

## Capabilities and Constraints

- Diensten: verkoop, verhuur, aankoop (aankoopmakelaar), gratis schatting.
- Contactgegevens zijn vast en moeten correct blijven: Bevrijdingslaan 33, 3665 As — tel 089 391 555 — info@frerevastgoed.be.
- **Aanbod-bron (beslist, nog niet gebouwd):** live koppeling met hun Zabun-feed. Hun huidige panden draaien al op Zabun (`files.zabun.be`), en er bestaat al een Zabun-integratie uit het SOM Vastgoed-project om op te bouwen. Tot die koppeling er is, staan de panden statisch in `src/lib/listings.ts` (20 panden, overgenomen uit hun `/te-koop`-lijst).
- Oplevering: homepage, `/aanbod` (filterbaar op type/gemeente), `/over-ons` (het echte team), `/diensten` + 3 subpagina's (verkopen/verhuren/aankoopmakelaar, content herschreven uit hun echte site, niet letterlijk gekopieerd), `/contact` (openingsuren, team, BIV/CIB-vermeldingen — echte gegevens van hun contactpagina), `/gratis-schatting` (verwijst door naar de AI-chat als primaire actie), `/privacybeleid` + `/gebruiksvoorwaarden` (generieke eigen bewoording, geen kopie van hun juridische tekst), plus een AI-chatwidget op elke pagina.
- **AI-chatwidget** (`/api/chat`, `src/components/ChatWidget.tsx`): helpt bezoekers aan een pand uit de 20 panden hierboven, én voert een schattingsgesprek dat eindigt in een **indicatieve bandbreedte, nooit een exact bedrag** — altijd expliciet gelabeld als AI-inschatting, nooit als officiële waardebepaling. Draait zonder `AI_GATEWAY_API_KEY` in mock-modus (geen kosten); zodra die key in dít Vercel-project staat (niet dat van investinspain) schakelt hij naar een live model via Vercel AI Gateway. Model instelbaar via `AI_MODEL` env var — check zelf de actuele goedkope/gratis opties in de Gateway-dashboard, prijzen veranderen. Architectuur hergebruikt van het bewezen investinspain.be-widget (`~/Projectpagina - Maralto`, branch `ai-chat-widget`): dependency-vrije serverless functie, tool-calling, in-memory rate limiting. System prompt, aanbodkoppeling en UI volledig herschreven voor Frère.
- **Lead-bestemming nog niet gekozen** (`src/lib/chat/lead-tool.ts`): `capture_lead` verzamelt naam/e-mail/telefoon en logt server-side, maar stuurt nog nergens naartoe (TODO in de code). Niet stilzwijgend een integratie toevoegen — Sam beslist dit later.
- **Niet-gemachtigd merkgebruik:** logo, pandfoto's, hero-beeld en teamfoto's komen van frerevastgoed.be en worden gebruikt binnen een pitch. De repo is publiek. De site mag niet gepubliceerd of gepresenteerd worden alsof ze de officiële site van Frère is, en niets mag naar Frère verstuurd worden zonder Sams expliciete akkoord per keer.

## Brand Commitments

- Naam en schrijfwijze: "Frère Vastgoed" (met accent grave).
- Bestaand logo behouden: `public/images/logo.svg`.
- Bestaand kleurkader behouden als basis: taupe accent, donkergrijs, lichte achtergrond, zwarte tekst. Hun Poppins is vervangen; het kleurkader niet.
- Hun eigen hero-beeld en hero-opzet overgenomen: `public/images/hero.jpg`, kop "Welkom bij Frère Vastgoed", knoppen "Ontdek ons aanbod" en "Gratis schatting?" — expliciet zo gevraagd.
- Echte pandfoto's: `public/images/pand-bree.jpg`, `public/images/pand-dilsen-stokkem.jpg`.

## Evidence on Hand

- Pand 1: Bree, Witte Torenwal 5 — 67,06 m², 1 slaapkamer, 1 badkamer. Foto: `public/images/pand-bree.jpg`.
- Pand 2: Dilsen-Stokkem, Schoolstraat 74 — 209,92 m² (perceel 895 m²), 3 slaapkamers, 2 badkamers. Foto: `public/images/pand-dilsen-stokkem.jpg`.
- Review: Lut Aerden, 26/02/2025 — snelle verkoop (10 dagen), goede uitleg/begeleiding, juiste prijs/papierwerk/communicatie.
- **Geen foto van Lut Aerden.** Hun site toont daar enkel hun logo als generieke "geen foto"-placeholder; de nieuwe site gebruikt een "LA"-monogram in plaats van een misleidende foto.
- Geen andere reviews, prijzen, verkoopcijfers, teamleden of aanbodstatistieken bevestigd. Niet verzinnen — een pitch die met verzonnen cijfers binnenkomt, verliest het vertrouwen dat hij moet winnen.

## Product Principles

1. Merk (naam, logo, kleurkader) blijft herkenbaar; de uitvoering (typografie, layout, ritme, motion) wordt opnieuw en met meer vakmanschap ontworpen.
2. Echte content en echte cijfers — nooit lorem ipsum, verzonnen panden of verzonnen claims. De chatbot mag wél een AI-schatting geven (de bezoeker vroeg daar expliciet om), maar alleen als bandbreedte met het AI-inschatting-label erbij — nooit als vals-precies exact bedrag dat als officieel feit overkomt.
3. Aanbod bekijken is de primaire actie; schatting-CTA is secundair.
4. Mobiel is de pitch-viewport, niet de bijzaak.
5. Geen generieke AI-signatuurpatronen: geen stip-labels, geen pill-knoppen, geen →-pijltjes als motief, geen fontWeight 300, geen identieke fade-animaties overal.

## Accessibility & Inclusion

Geen expliciete eis gesteld; standaard WCAG AA-praktijk toepassen (contrast, focus states, alt-teksten) omdat dit een publieke marketingsite is.
