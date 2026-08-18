import Image from "next/image";
import { IconArea, IconBath, IconBed, IconPlot } from "./icons";

type Listing = {
  city: string;
  street: string;
  image: string;
  area: string;
  plot?: string;
  beds: number;
  baths: number;
};

const LISTINGS: Listing[] = [
  {
    city: "Bree",
    street: "Witte Torenwal 5",
    image: "/images/pand-bree.jpg",
    area: "67,06 m²",
    beds: 1,
    baths: 1,
  },
  {
    city: "Dilsen-Stokkem",
    street: "Schoolstraat 74",
    image: "/images/pand-dilsen-stokkem.jpg",
    area: "209,92 m²",
    plot: "895 m²",
    beds: 3,
    baths: 2,
  },
];

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
          {LISTINGS.map((listing) => (
            <article key={listing.street} className="group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                <Image
                  src={listing.image}
                  alt={`${listing.street}, ${listing.city}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="bg-surface px-6 py-6">
                <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
                  {listing.city}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  {listing.street}
                </h3>

                <dl className="mt-5 grid grid-cols-2 gap-y-4 border-t border-ink/10 pt-5 sm:grid-cols-4">
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                      <IconArea className="h-3.5 w-3.5" /> Wonen
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-ink tabular">
                      {listing.area}
                    </dd>
                  </div>
                  {listing.plot && (
                    <div>
                      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                        <IconPlot className="h-3.5 w-3.5" /> Perceel
                      </dt>
                      <dd className="mt-1 font-display text-lg font-bold text-ink tabular">
                        {listing.plot}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                      <IconBed className="h-3.5 w-3.5" /> Slaapk.
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-ink tabular">
                      {listing.beds}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-support">
                      <IconBath className="h-3.5 w-3.5" /> Badk.
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-ink tabular">
                      {listing.baths}
                    </dd>
                  </div>
                </dl>

                <a
                  href={`mailto:info@frerevastgoed.be?subject=${encodeURIComponent(
                    `Info over ${listing.street}, ${listing.city}`,
                  )}`}
                  className="mt-6 inline-flex items-center justify-center border border-ink px-5 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-bg"
                >
                  Vraag info over dit pand
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
