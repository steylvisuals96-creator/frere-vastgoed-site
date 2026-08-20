---
target: full site (homepage, aanbod, over-ons, diensten, contact, gratis-schatting)
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 1
timestamp: 2026-08-19T21-35-45Z
slug: frere-vastgoed-site-full-site
---
Method: dual-agent (A: adb89a0e5c99fb727 · B: a3da844c9332895e2)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Chat shows "Aan het typen…"; filter form is a full GET reload with no in-between state |
| 2 | Match System / Real World | 4 | Correct BE terminology (BIV/CIB, aankoopmakelaar, plaatsbeschrijving), m²/perceel labels |
| 3 | User Control and Freedom | 3 | "Filter wissen" link, chat Esc-to-close — but hero CTA silently becomes a phone call with no confirm |
| 4 | Consistency and Standards | 2 | Same label "gratis schatting" resolves to a `tel:` link in the hero but to the real page everywhere else |
| 5 | Error Prevention | 4 | `/aanbod` filter query params are server-validated against the real type/city lists, never crash |
| 6 | Recognition Rather Than Recall | 3 | `/gratis-schatting` is absent from both desktop and mobile nav — only reachable via the footer |
| 7 | Flexibility and Efficiency | n/a | Persuade/marketing surface, no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 4 | No pill buttons/dot labels/arrow motifs — DESIGN.md's hard bans are honored throughout |
| 9 | Error Recovery | 3 | Plain-language chat error with phone fallback; `/aanbod` empty state has a constructive next step |
| 10 | Help and Documentation | n/a | Persuade surface; would double-count heuristic 6 |
| **Total** | | **26/32** | **Good (81%)** |

## Design Specificity Verdict

**LLM assessment**: Genuinely authored for Frère at the homepage/hero level, then thins out fast. The `PropertyCard.tsx` "dossierkaart" spec strip (`Wonen`/`Perceel`/`Slaapk.`/`Badk.`, bold tabular numerals, no icon-dot decoration) is a real signature move responding directly to the brief. The hero's `clip-path` reveal and the honest "LA" monogram (no fake headshot, because no photo of Lut Aerden exists) are product-specific decisions that couldn't be lifted into another site. But `/diensten`, `/over-ons`, and `/contact` all repeat the same generic scaffold — eyebrow label → h1 → prose paragraph — that DESIGN.md explicitly set out to avoid. `/diensten`'s three service cards are plain bordered boxes with no dossierkaart-equivalent and no taupe section rhythm; nothing distinguishes them from a dentist's or lawyer's services page beyond the copy.

**Deterministic scan**: `detect.mjs --json src` scanned 21 `.tsx` files and returned a clean result (`[]`, exit 0) — no mechanical antipattern violations (no pill buttons, dot labels, banned fade patterns, or layout-animating transitions detected in code).

**Browser evidence**: Console clean on all 6 pages (only benign HMR/DevTools logs), zero broken network requests (no 404s across fonts, JS chunks, `/_next/image` assets), all internal `href`s resolve to real routes, all `<Image>` elements have `alt=`. Layout and contrast held up at both 375px and 1440px on every page checked. One JS-level false alarm (6 "incomplete" images on `/aanbod`) turned out to be normal lazy-loading, confirmed via the network log — not a defect. Live-overlay script injection wasn't available (no `live-server.mjs`/overlay script found in the skill's scripts directory), so Assessment B substituted direct DOM/console/network inspection, which is a strictly stronger signal for this target than the overlay would have added.

Where the two assessments agree: neither found anything mechanically wrong with the code (clean detector, clean console/network) — the gaps are entirely in judgment-level design consistency and information architecture, not in implementation defects.

## Overall Impression

The homepage is the strongest first impression this project has produced: a confident hero reveal, an honest testimonial, and a property card pattern with a real point of view. But the site has one self-inflicted wound that undercuts its own stated secondary goal — the hero's "gratis schatting" link is wired as a phone call, not a link to the actual `/gratis-schatting` page, and that page is invisible in navigation. Everything else is solid, clean, and free of mechanical defects; the single biggest opportunity is carrying the homepage's craft one level deeper into the interior pages, which is exactly where a skeptical Frère decision-maker will click next to judge whether "more vakmanschap" holds up.

## What's Working

1. **`PropertyCard.tsx`'s dossierkaart spec strip** — a `<dl>` grid of hard numeric specs with bold tabular numerals and zero icon-and-dot decoration. Distinctive, on-brief, and worth pitching on its own as "why we're different."
2. **`ChatWidget.tsx`'s contrast-aware launcher** — computes which `.op-donker` section overlaps the fixed button on scroll and swaps contrast accordingly. Solves a real visibility bug most agencies wouldn't bother fixing.
3. **`/aanbod`'s server-validated filter form** — plain `<form method="GET">`, guarded against malformed query params, shareable and back-button-safe. Quietly excellent, and something most Zabun-template competitor sites get wrong.

## Priority Issues

**[P0] The hero's "gratis schatting" CTA is a phone call, and the real page is unreachable from navigation**
- **What**: In [Hero.tsx:91-96](src/components/Hero.tsx#L91-L96), "Of vraag meteen een gratis schatting aan — 089 391 555" is wrapped in `<a href="tel:+3289391555">`, never linking to `/gratis-schatting`. That page exists and is content-complete, but is linked from exactly one place site-wide: the footer's "Diensten" list. It's absent from `Header.tsx`'s `NAV` array in both desktop and mobile menus. Verified directly in source.
- **Why it matters**: PRODUCT.md calls the schatting CTA secondary but real, and the page itself is built to funnel to the chat widget. A user clicking the hero link expecting a valuation flow instead triggers an OS-level call-intent prompt — jarring on desktop, disruptive on mobile. Same label, two different behaviors elsewhere on the site — a textbook consistency violation, and it undermines the one CTA the product spec explicitly requires.
- **Fix**: Point the hero link's `href` at `/gratis-schatting`, keeping the phone number visible but secondary (or split into two adjacent affordances: a text link to the page, and a separate `tel:` icon-link matching `Header.tsx`'s existing `IconPhone` pattern). Add "Gratis schatting" to primary nav or at least surface it near "Aanbod."
- **Suggested command**: `/impeccable clarify`

**[P1] Interior pages revert to the generic scaffold the brief explicitly forbids**
- **What**: `/diensten`, `/over-ons`, `/contact` all open with the same eyebrow → h1 → max-w-2xl paragraph structure. `/diensten`'s three service cards are plain bordered boxes with a title, one paragraph, and an underlined link — no dossierkaart-equivalent, no motion language, no taupe section-fill rhythm (these pages run `bg-bg` end to end, contradicting DESIGN.md's own alternating-section rule).
- **Why it matters**: This is the "centered-hero-met-CTA-knop-structuur" genericism DESIGN.md set out to replace, relocated one level deeper. A decision-maker will judge this pitch page-by-page against their current site, not just by the homepage hero.
- **Fix**: Bring at least one signature move onto `/diensten` and `/over-ons` — taupe section fill, a structured spec-like block, or the hero's stagger/reveal language on page headers. The `/diensten` service cards are a natural fit for a dossierkaart-style "what's included" treatment instead of free prose.
- **Suggested command**: `/impeccable adapt`

**[P2] Testimonial section implies plurality it can't deliver**
- **What**: `Testimonial.tsx` renders one hardcoded review under copy framed as plural ("Wat klanten vertellen"), with no count, no carousel, no "more reviews" affordance.
- **Why it matters**: PRODUCT.md is explicit that no other reviews exist and nothing should be invented — the content is right, but the framing implies a larger body of reviews that isn't there, a mismatch a skeptical reader may notice.
- **Fix**: Soften the eyebrow to not imply plurality ("Een recente review"), or add a real, verified external trust signal alongside it if one exists — never fabricated.
- **Suggested command**: `/impeccable clarify`

**[P2] Chat widget and `/gratis-schatting` page don't share context**
- **What**: `/gratis-schatting` instructs the user to open the chat widget, but the widget starts the same generic greeting regardless of entry point, with no awareness the user came from the schatting page wanting a valuation.
- **Why it matters**: Forces the user to carry intent across a page boundary and re-state it manually ("ik wil een schatting van mijn woning") — an unnecessary conversational step, and a working-memory cognitive-load failure (the only one found in the 8-item checklist).
- **Fix**: Seed the chat with an estimate-flow greeting when opened from `/gratis-schatting` (query param or data attribute `ChatWidget` reads on mount).
- **Suggested command**: `/impeccable clarify`

**[P3] Hero image is largely obscured by foreground foliage**
- **What**: `public/images/hero.jpg` shows mostly tree branches and a partial wall at both mobile and desktop widths, confirmed via live screenshot — undercutting DESIGN.md's "pand as vitrine object" framing.
- **Why it matters**: The signature move is that the property itself is the hero image's subject, but this specific crop doesn't clearly deliver a building to look at.
- **Fix**: Source or crop a hero image where the building reads clearly in the first frame, or adjust the crop/gradient to de-emphasize the foliage.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

**Jordan (First-Timer, comparing against frerevastgoed.be)**: Clicks the hero's "gratis schatting" link expecting a page, gets an unexpected phone-dial prompt with no warning it's a call (P0). Never discovers `/gratis-schatting` exists unless they scroll the full homepage to the footer — absent from both desktop nav and the mobile hamburger menu.

**Riley (Stress Tester, probes edges)**: `/aanbod?type=xyz&stad=??!!` is handled cleanly — invalid values silently fall back to "all," a genuine strength. But `capture_lead` (per PRODUCT.md, destination still TODO) means a user who completes a full lead-capture conversation gets no indication their info went nowhere — a "feature that appears to work but silently fails," Riley's core red-flag pattern. Refreshing mid-conversation also loses all chat history with no persistence.

**Casey (Distracted Mobile User, thumb-only)**: On the 375px hero, the floating "Chat met ons" launcher sits close to the "gratis schatting" text link at the bottom of the hero — both thumb-reachable but visually competing, and one of them silently places a phone call rather than a reversible UI action, which matters more for an interrupted, one-handed user. The mobile menu's collapse animation is correctly implemented per DESIGN.md's own padding-collapse warning — a genuine strength here, not a flag.

## Minor Observations

- `Header.tsx` uses plain `<a href>` for in-page nav links while `Footer.tsx` uses Next's `<Link>` for the same kind of navigation — inconsistent choice of primitive (full reload vs. client transition), minor practical impact on this mostly-static site.
- `PropertyCard.tsx` falls back to `listing.type` as the title when `listing.street` is absent — worth confirming none of the 20 static listings produce visually duplicate-looking cards.
- The footer's "Diensten" link group mixes three actual services with `/gratis-schatting` (a valuation tool, not a service) — a small semantic mislabel, though pragmatically it's the only reason the page is discoverable at all right now.
- Screenshot capture was unreliable mid-session for one Assessment A tab (stale/blank frames); recovered by opening a fresh tab. `/over-ons`, `/diensten`, `/contact`, `/gratis-schatting` were verified via full source read rather than live screenshot in Assessment A — consistent with this session's known browser-tooling flakiness.

## Questions to Consider

1. If the hero's CTA is meant to be the secondary conversion path, which of the three current candidates — the phone number, the `/gratis-schatting` page, or the chat widget — is actually meant to be the *real* secondary CTA? Right now the label, the link target, and the page's own instructions all point in different directions.
2. Given the hero and property card both got genuine, product-specific design attention, what would 20% of that same effort look like applied to `/diensten` and `/over-ons` — the pages a skeptical decision-maker is most likely to click next?
3. The testimonial's plural framing over a single real review is a calculated risk, not an oversight — is that worth flagging to Frère explicitly, or softened before this gets shown?
