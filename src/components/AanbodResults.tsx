"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Listing } from "@/lib/listings";
import PropertyCard from "./PropertyCard";

// Leaflet heeft `window` nodig — nooit server-side renderen.
const AanbodMap = dynamic(() => import("./AanbodMap"), { ssr: false });

export default function AanbodResults({ listings }: { listings: Listing[] }) {
  const [weergave, setWeergave] = useState<"lijst" | "kaart">("lijst");

  if (!listings.length) {
    return (
      <div className="border border-ink/10 bg-surface px-8 py-16 text-center">
        <p className="font-display text-xl font-bold text-ink">
          Geen panden gevonden voor deze combinatie.
        </p>
        <p className="mt-3 font-body text-sm text-support">
          Probeer een ander type of een andere gemeente, of laat ons weten wat
          u zoekt.
        </p>
        <a
          href="mailto:info@frerevastgoed.be?subject=Zoekwens"
          className="mt-6 inline-flex items-center justify-center bg-ink px-6 py-3 font-body text-sm font-semibold text-bg transition-colors hover:bg-accent-deep"
        >
          Laat ons uw zoekwens weten
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 inline-flex border border-ink/15">
        <button
          type="button"
          onClick={() => setWeergave("lijst")}
          aria-pressed={weergave === "lijst"}
          className={`px-5 py-2.5 font-body text-sm font-semibold transition-colors ${
            weergave === "lijst" ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-bg"
          }`}
        >
          Lijst
        </button>
        <button
          type="button"
          onClick={() => setWeergave("kaart")}
          aria-pressed={weergave === "kaart"}
          className={`border-l border-ink/15 px-5 py-2.5 font-body text-sm font-semibold transition-colors ${
            weergave === "kaart" ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-bg"
          }`}
        >
          Kaart
        </button>
      </div>

      {weergave === "lijst" ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, i) => (
            <div
              key={listing.slug}
              className="grid-in"
              style={{ "--i": Math.min(i, 7) } as React.CSSProperties}
            >
              <PropertyCard listing={listing} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <AanbodMap listings={listings} />
          <p className="mt-4 font-body text-xs text-support">
            Panden met een exact adres tonen een precieze pin; de rest toont
            het gemeentecentrum als indicatieve ligging.
          </p>
        </>
      )}
    </div>
  );
}
