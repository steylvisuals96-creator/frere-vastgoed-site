import type { Metadata } from "next";
import AanbodResults from "@/components/AanbodResults";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { IconChevronDown } from "@/components/icons";
import { CITIES, LISTING_TYPES, LISTINGS, ListingType } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Aanbod — Frère Vastgoed",
  description:
    "Ontdek het volledige aanbod van Frère Vastgoed in As, Genk, Maasmechelen, Oudsbergen en omstreken.",
};

function isListingType(value: string): value is ListingType {
  return (LISTING_TYPES as string[]).includes(value);
}

export default async function AanbodPage(props: PageProps<"/aanbod">) {
  const params = await props.searchParams;
  const typeParam = typeof params.type === "string" ? params.type : "";
  const stadParam = typeof params.stad === "string" ? params.stad : "";

  const type = isListingType(typeParam) ? typeParam : "";
  const stad = CITIES.includes(stadParam) ? stadParam : "";

  const gefilterd = LISTINGS.filter((l) => {
    if (type && l.type !== type) return false;
    if (stad && l.city !== stad) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[1200px] px-6 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Aanbod
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">
            {gefilterd.length} {gefilterd.length === 1 ? "pand" : "panden"}
            {stad ? <> in {stad}</> : null}
          </h1>

          <form
            action="/aanbod"
            method="GET"
            className="mt-8 flex flex-col gap-px bg-ink/10 sm:flex-row sm:flex-wrap"
          >
            <div className="relative flex-1 sm:min-w-[220px]">
              <select
                name="type"
                defaultValue={type}
                aria-label="Type pand"
                className="w-full appearance-none bg-surface px-5 py-4 pr-10 font-body text-sm font-medium text-ink outline-none"
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

            <div className="relative flex-1 sm:min-w-[220px]">
              <select
                name="stad"
                defaultValue={stad}
                aria-label="Gemeente"
                className="w-full appearance-none bg-surface px-5 py-4 pr-10 font-body text-sm font-medium text-ink outline-none"
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
              className="bg-ink px-8 py-4 font-body text-sm font-semibold text-bg transition-colors hover:bg-accent-deep"
            >
              Filter toepassen
            </button>

            {(type || stad) && (
              <a
                href="/aanbod"
                className="flex items-center justify-center bg-surface px-6 py-4 font-body text-sm font-semibold text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-accent-deep"
              >
                Filter wissen
              </a>
            )}
          </form>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10">
          <AanbodResults listings={gefilterd} />
        </div>
      </main>
      <Footer />
    </>
  );
}
