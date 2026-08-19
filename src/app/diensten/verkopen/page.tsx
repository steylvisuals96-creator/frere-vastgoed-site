import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Verkopen — Frère Vastgoed",
  description:
    "Uw vastgoed verkopen in As, Genk, Maasmechelen, Oudsbergen en omstreken — deskundige begeleiding van waardebepaling tot sleuteloverdracht.",
};

export default function VerkopenPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[760px] px-6 pb-20 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Diensten — Verkopen
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Uw vastgoed verkopen?
          </h1>

          <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-ink/80">
            <p>
              Vastgoed verkopen is één van de belangrijkste transacties in een
              mensenleven. Het is geen alledaagse taak en vraagt de nodige
              expertise om het goed uit te voeren.
            </p>
            <p>
              Wat is mijn pand precies waard? Wanneer start ik best de verkoop?
              Welke documenten heb ik nodig? Sta ik juridisch voldoende sterk?
              Er is een koper — wat nu? Hoe zet ik mijn woning het best in de
              spotlight? Kan ik al iets nieuws kopen vóór mijn huidige woning
              verkocht is? Bij elke vraag staan wij naast u.
            </p>
            <p>
              Frère Vastgoed is uw betrouwbare partner tijdens deze transactie —
              met woord en daad, met deskundige en transparante service en
              eerlijk advies. Een team van BIV- en CIB-erkende
              vastgoedmakelaars zet zich in om uw doel te realiseren.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-10 sm:flex-row">
            <a
              href="mailto:info@frerevastgoed.be?subject=Verkopen%20-%20vrijblijvend%20gesprek"
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
