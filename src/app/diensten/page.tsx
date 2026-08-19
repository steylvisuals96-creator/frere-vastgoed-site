import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Diensten — Frère Vastgoed",
  description:
    "Verkopen, verhuren of aankopen in As, Genk, Maasmechelen, Oudsbergen en omstreken — ontdek hoe Frère Vastgoed u begeleidt.",
};

const DIENSTEN = [
  {
    href: "/diensten/verkopen",
    titel: "Verkopen",
    omschrijving:
      "Van waardebepaling tot de sleuteloverdracht — wij begeleiden elke stap van de verkoop van uw vastgoed.",
  },
  {
    href: "/diensten/verhuren",
    titel: "Verhuren",
    omschrijving:
      "Kandidaat-huurders selecteren, een waterdicht contract, plaatsbeschrijving en administratie — wij nemen het van u over.",
  },
  {
    href: "/diensten/aankoopmakelaar",
    titel: "Aankoopmakelaar",
    omschrijving:
      "Wij zoeken mee, onderhandelen mee en behartigen uw belangen bij de aankoop van uw volgende woning.",
  },
];

export default function DienstenPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[900px] px-6 pb-16 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Diensten
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Verkopen, verhuren of aankopen — wij maken het verschil.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/80">
            Vastgoed verkopen, verhuren of aankopen is geen alledaagse taak. Een
            team van BIV- en CIB-erkende vastgoedmakelaars staat voor u klaar
            met deskundig, transparant advies bij elke stap.
          </p>
        </div>

        <div className="mx-auto max-w-[1100px] px-6 pb-24 sm:px-10">
          <div className="grid gap-10 sm:grid-cols-3">
            {DIENSTEN.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group flex flex-col justify-between border border-ink/10 bg-surface p-8 transition-colors hover:border-accent-deep"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {d.titel}
                  </h2>
                  <p className="mt-4 font-body text-sm leading-relaxed text-support">
                    {d.omschrijving}
                  </p>
                </div>
                <span className="mt-8 inline-block font-body text-sm font-semibold text-accent-deep underline decoration-1 underline-offset-4 transition-colors group-hover:text-ink">
                  Meer over {d.titel.toLowerCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
