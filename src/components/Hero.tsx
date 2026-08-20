import Image from "next/image";
import Link from "next/link";
import { CITIES, LISTING_TYPES } from "@/lib/listings";
import { IconChevronDown, IconSearch } from "./icons";

export default function Hero() {
  return (
    // De sticky header staat nu in de flow, dus die hoogte eraf: samen vult dit één scherm.
    <section className="op-donker relative flex min-h-[calc(100svh-4.75rem)] flex-col justify-end overflow-hidden bg-ink">
      {/* Onthulling: het pand komt niet zomaar in beeld, het wordt opengeklapt.
          Beeld + gradient klippen samen zodat je vóór de onthulling gewoon de
          ink-achtergrond van de sectie ziet, niet een witte flits. */}
      <div className="hero-reveal absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/20 md:bg-gradient-to-r md:from-ink/85 md:via-ink/45 md:to-transparent"
        />
      </div>

      <div className="hero-in relative mx-auto w-full max-w-[1600px] px-6 pb-16 pt-24 sm:px-10 md:pb-24">
        <h1 className="font-display text-4xl font-bold leading-[1.1] text-bg sm:text-5xl lg:text-6xl">
          Welkom bij
          <br />
          Frère Vastgoed
        </h1>
        <p className="mt-6 max-w-md font-body text-base font-medium leading-relaxed text-bg/90 sm:text-lg">
          Frère Vastgoed is uw vastgoedmakelaar voor de verkoop, verhuur of
          aankoop van elk type vastgoed in de omgeving As, Genk, Maasmechelen,
          Oudsbergen en omstreken.
        </p>

        <form
          action="/aanbod"
          method="GET"
          className="mt-10 flex max-w-2xl flex-col gap-px bg-bg/25 sm:flex-row"
        >
          <div className="relative flex-1">
            <select
              name="type"
              defaultValue=""
              aria-label="Type pand"
              className="peer w-full appearance-none bg-bg px-5 py-4 pr-10 font-body text-sm font-medium text-ink outline-none"
            >
              <option value="">Alle types</option>
              {LISTING_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
          </div>

          <div className="relative flex-1">
            <select
              name="stad"
              defaultValue=""
              aria-label="Gemeente"
              className="peer w-full appearance-none bg-bg px-5 py-4 pr-10 font-body text-sm font-medium text-ink outline-none"
            >
              <option value="">Alle gemeenten</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-accent px-6 py-4 font-body text-sm font-semibold text-ink transition-colors hover:bg-bg"
          >
            <IconSearch className="h-4 w-4" />
            Zoeken
          </button>
        </form>

        {/* Geen tweede "ontdek aanbod"-knop hier: de zoekbalk hierboven doet dat al
            (leeg zoeken = alle 20 panden). Eén overblijvende CTA, als tekstlink om
            de knoppenstapel niet nog een blok zwaarder te maken. Linkt naar de
            schattingspagina zelf, niet naar tel: — het label belooft een schatting,
            geen telefoongesprek. */}
        <Link
          href="/gratis-schatting"
          className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-bg underline decoration-bg/40 decoration-1 underline-offset-4 transition-colors hover:decoration-bg"
        >
          Of vraag meteen een gratis schatting aan
        </Link>
      </div>
    </section>
  );
}
