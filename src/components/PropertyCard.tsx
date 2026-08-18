import Image from "next/image";
import { Listing } from "@/lib/listings";
import { IconArea, IconBath, IconBed, IconPlot } from "./icons";

export default function PropertyCard({ listing }: { listing: Listing }) {
  const title = listing.street ? listing.street : listing.type;

  return (
    <article className="group flex flex-col bg-surface">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.street ? `${listing.street}, ${listing.city}` : `${listing.type} in ${listing.city}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-bg">
          {listing.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 py-6">
        <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
          {listing.city}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-ink">{title}</h3>
        <p className="mt-1 font-display text-lg font-bold text-ink tabular">
          {listing.priceLabel}
        </p>

        {/* Altijd 2 kolommen: deze kaart staat ook in een 2- of 3-koloms grid, waar
            sm:/lg:-breakpoints op de viewport reageren, niet op de (veel smallere)
            kaartbreedte — 4 kolommen daar geeft geen ruimte voor de labels. */}
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-ink/10 pt-5">
          {listing.area && (
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                <IconArea className="h-3.5 w-3.5" /> Wonen
              </dt>
              <dd className="mt-1 font-display text-base font-bold text-ink tabular">
                {listing.area}
              </dd>
            </div>
          )}
          {listing.plot && (
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                <IconPlot className="h-3.5 w-3.5" /> Perceel
              </dt>
              <dd className="mt-1 font-display text-base font-bold text-ink tabular">
                {listing.plot}
              </dd>
            </div>
          )}
          {listing.beds !== undefined && (
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                <IconBed className="h-3.5 w-3.5" /> Slaapk.
              </dt>
              <dd className="mt-1 font-display text-base font-bold text-ink tabular">
                {listing.beds}
              </dd>
            </div>
          )}
          {listing.baths !== undefined && (
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                <IconBath className="h-3.5 w-3.5" /> Badk.
              </dt>
              <dd className="mt-1 font-display text-base font-bold text-ink tabular">
                {listing.baths}
              </dd>
            </div>
          )}
        </dl>

        <a
          href={`mailto:info@frerevastgoed.be?subject=${encodeURIComponent(
            `Info over ${title}, ${listing.city}`,
          )}`}
          className="mt-6 inline-flex items-center justify-center border border-ink px-5 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-bg"
        >
          Vraag info over dit pand
        </a>
      </div>
    </article>
  );
}
