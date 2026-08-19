import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Verhuren — Frère Vastgoed",
  description:
    "Uw vastgoed verhuren in As, Genk, Maasmechelen, Oudsbergen en omstreken — kandidaten selecteren, contracten, waarborg en administratie.",
};

export default function VerhurenPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[760px] px-6 pb-20 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Diensten — Verhuren
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Uw vastgoed verhuren?
          </h1>

          <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-ink/80">
            <p>
              Frère Vastgoed neemt uw verhuurdossier zorgvuldig in handen en
              ontzorgt u van de complexe administratie die daarbij komt
              kijken.
            </p>
            <p>
              Wij selecteren de juiste kandidaat-huurders en begeleiden elk
              bezoek — als eigenaar blijft u betrokken bij de uiteindelijke
              keuze. Een waterdicht huurcontract voorkomt problemen achteraf
              en beschermt uw belangen als verhuurder.
            </p>
            <p>
              Alle afspraken worden nauwkeurig op papier gezet. Frère Vastgoed
              regelt de huurwaarborg, de verzekering, de plaatsbeschrijving,
              de meterstanden en al het overige dat bij een verhuring komt
              kijken.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-10 sm:flex-row">
            <a
              href="mailto:info@frerevastgoed.be?subject=Verhuren%20-%20vrijblijvend%20gesprek"
              className="inline-flex items-center justify-center bg-ink px-7 py-4 font-body text-sm font-semibold text-bg transition-colors hover:bg-accent-deep"
            >
              Vraag een vrijblijvend gesprek aan
            </a>
            <a
              href="tel:+3289391555"
              className="inline-flex items-center justify-center border border-ink/25 px-7 py-4 font-body text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Bel 089 391 555
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
