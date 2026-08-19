import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Aankoopmakelaar — Frère Vastgoed",
  description:
    "Hulp bij de aankoop van uw vastgoed in As, Genk, Maasmechelen, Oudsbergen en omstreken — wij zoeken en onderhandelen mee.",
};

export default function AankoopmakelaarPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[760px] px-6 pb-20 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Diensten — Aankoopmakelaar
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Hulp nodig bij de aankoop van uw vastgoed?
          </h1>

          <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-ink/80">
            <p>
              U wilt vastgoed kopen, maar weet niet goed waar te beginnen?
              Elke dag werken wij proactief om het juiste pand met de juiste
              persoon te matchen — met oog voor de specifieke situatie waarin
              u zich bevindt.
            </p>
            <p>
              Zelf online op zoek gaan naar uw droomwoning werkt vaak goed,
              maar de aankoop zelfstandig afronden loopt geregeld uit op een
              teleurstelling.
            </p>
            <p>
              Bij Frère Vastgoed denken wij actief met u mee en behartigen wij
              uw belangen tijdens de onderhandelingen — met als doel een
              eerlijke prijs voor uw nieuwe aankoop.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-10 sm:flex-row">
            <a
              href="mailto:info@frerevastgoed.be?subject=Aankoopmakelaar%20-%20vrijblijvend%20gesprek"
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
