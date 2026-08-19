import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden — Frère Vastgoed",
  description: "Voorwaarden voor het gebruik van de website van Frère Vastgoed.",
};

export default function GebruiksvoorwaardenPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[720px] px-6 pb-20 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Juridisch
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Gebruiksvoorwaarden
          </h1>

          <div className="mt-10 space-y-8 font-body text-sm leading-relaxed text-ink/80">
            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Toepassing
              </h2>
              <p className="mt-2">
                Deze voorwaarden zijn van toepassing op elk bezoek aan en
                gebruik van deze website van Frère Vastgoed. Door de site te
                gebruiken, gaat u akkoord met deze voorwaarden.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Informatie op deze site
              </h2>
              <p className="mt-2">
                De informatie over panden (prijs, oppervlakte, kenmerken) is
                met zorg samengesteld, maar kan wijzigen — bijvoorbeeld
                wanneer een pand al verkocht of verhuurd is. Aan de inhoud
                van deze website kunnen geen rechten worden ontleend; neem
                voor de actuele stand van zaken contact op met ons kantoor.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                AI-chatassistent
              </h2>
              <p className="mt-2">
                Deze website bevat een AI-chatassistent die vragen over ons
                aanbod beantwoordt en een indicatieve schatting van
                vastgoedwaarde kan geven. Die schatting is een AI-inschatting
                op basis van de informatie die u zelf meedeelt, geen
                officiële waardebepaling en geen bindend advies. Voor een
                exacte schatting of concreet advies komt een makelaar van
                Frère Vastgoed gratis bij u langs.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Intellectuele eigendom
              </h2>
              <p className="mt-2">
                De inhoud van deze website — teksten, beelden en vormgeving —
                is eigendom van Frère Vastgoed of wordt met toestemming
                gebruikt, en mag niet zonder voorafgaande toestemming worden
                overgenomen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Contact
              </h2>
              <p className="mt-2">
                Vragen over deze voorwaarden kan u richten aan
                info@frerevastgoed.be of 089 391 555.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
