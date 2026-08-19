import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacybeleid — Frère Vastgoed",
  description: "Hoe Frère Vastgoed omgaat met uw persoonsgegevens.",
};

export default function PrivacybeleidPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1 bg-bg pt-24">
        <div className="mx-auto max-w-[720px] px-6 pb-20 pt-10 sm:px-10">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
            Juridisch
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Privacybeleid
          </h1>

          <div className="mt-10 space-y-8 font-body text-sm leading-relaxed text-ink/80">
            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Wie is verantwoordelijk
              </h2>
              <p className="mt-2">
                Frère Vastgoed, met kantoor aan de Bevrijdingslaan 33, 3665
                As, is verantwoordelijk voor de verwerking van uw
                persoonsgegevens zoals hieronder beschreven. Vragen over deze
                verklaring kan u richten aan info@frerevastgoed.be.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Welke gegevens en waarom
              </h2>
              <p className="mt-2">
                Wij verwerken de gegevens die u zelf aan ons bezorgt — via
                telefoon, e-mail, een contactformulier of de AI-chatwidget op
                deze site — zoals naam, e-mailadres, telefoonnummer en de
                inhoud van uw vraag. Dit gebruiken we om uw vraag te
                beantwoorden, u te woord te staan over vastgoed dat u
                interesseert, en om een schatting of een verkoop-, verhuur-
                of aankooptraject op te volgen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Rechtsgrond
              </h2>
              <p className="mt-2">
                Wij verwerken uw gegevens op basis van uw toestemming (het
                contacteren van ons kantoor) en, waar van toepassing, om
                uitvoering te geven aan een overeenkomst of stappen te zetten
                voorafgaand aan een overeenkomst, in overeenstemming met de
                Algemene Verordening Gegevensbescherming (AVG/GDPR).
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Bewaartermijn
              </h2>
              <p className="mt-2">
                Wij bewaren uw gegevens niet langer dan nodig is voor het doel
                waarvoor ze verzameld werden, en verwijderen ze op uw verzoek
                wanneer er geen wettelijke bewaarplicht meer geldt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Uw rechten
              </h2>
              <p className="mt-2">
                U heeft recht op inzage, verbetering, verwijdering en
                overdraagbaarheid van uw gegevens, en kan bezwaar maken tegen
                de verwerking ervan. Neem hiervoor contact op via
                info@frerevastgoed.be. U kan ook een klacht indienen bij de
                Gegevensbeschermingsautoriteit (www.gegevensbeschermingsautoriteit.be).
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink">
                Wijzigingen
              </h2>
              <p className="mt-2">
                Dit beleid kan van tijd tot tijd worden bijgewerkt. De meest
                recente versie staat steeds op deze pagina.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
