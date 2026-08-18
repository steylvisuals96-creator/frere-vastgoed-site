import { LISTINGS } from "@/lib/listings";
import PropertyCard from "./PropertyCard";

const FEATURED = LISTINGS.filter((l) => l.featured);

export default function FeaturedListings() {
  return (
    <section id="aanbod" className="bg-bg px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-4 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            In de kijker
          </h2>
          <p className="max-w-md font-body text-sm leading-relaxed text-support">
            Een selectie uit ons huidige aanbod in As, Genk, Maasmechelen en
            Oudsbergen.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          {FEATURED.map((listing) => (
            <PropertyCard key={listing.slug} listing={listing} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/aanbod"
            className="inline-flex items-center justify-center bg-ink px-8 py-4 font-body text-sm font-semibold text-bg transition-colors hover:bg-accent-deep"
          >
            Bekijk het volledige aanbod ({LISTINGS.length} panden)
          </a>
        </div>
      </div>
    </section>
  );
}
