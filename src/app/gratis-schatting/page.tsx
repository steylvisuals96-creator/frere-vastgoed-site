import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartAiSchattingButton from "@/components/StartAiSchattingButton";

export const metadata: Metadata = {
  title: "Gratis schatting — Frère Vastgoed",
  description:
    "Laat de waarde van uw woning, grond of ander vastgoed gratis inschatten door Frère Vastgoed.",
};

export default function GratisSchattingPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[760px] px-6 pb-20 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Gratis schatting
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Wat is uw vastgoed waard?
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/80">
            De waardebepaling van uw woning, grond of ander vastgoed is
            volledig gratis bij Frère Vastgoed — voor verkoop én verhuur.
          </p>

          <div className="mt-10 border border-ink/10 bg-surface p-8">
            <h2 className="font-display text-xl font-bold text-ink">
              Snelste weg: onze AI-assistent
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-support">
              Onze AI-assistent stelt een paar gerichte vragen over uw pand
              (ligging, oppervlakte, staat, energielabel, ...) en geeft
              meteen een indicatieve bandbreedte — een AI-inschatting, geen
              officiële waardebepaling. Nadien kan u vragen om door een
              makelaar van Frère Vastgoed te laten opvolgen voor de exacte
              schatting.
            </p>
            <StartAiSchattingButton className="mt-6" />
          </div>

          <div className="mt-10 space-y-5 font-body text-base leading-relaxed text-ink/80">
            <h2 className="font-display text-xl font-bold text-ink">
              Wat kan u verwachten van de echte schatting?
            </h2>
            <p>
              Contacteert u Frère Vastgoed voor een schatting, dan starten we
              met een kennismakingsgesprek: zo leren we u en uw eigendom
              beter kennen — geen enkel pand is immers hetzelfde.
            </p>
            <p>
              Een gedetailleerd schattingsverslag houdt rekening met
              objectieve parameters zoals de ligging van uw vastgoed, de
              staat waarin het gebouw verkeert, de graad van afwerking en de
              stijl van uw pand.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-10 sm:flex-row">
            <a
              href="mailto:info@frerevastgoed.be?subject=Gratis%20schatting"
              className="inline-flex items-center justify-center bg-ink px-7 py-4 font-body text-sm font-semibold text-bg transition-colors hover:bg-accent-deep"
            >
              Vraag een schatting per mail aan
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
