import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Contact — Frère Vastgoed",
  description:
    "Contacteer Frère Vastgoed in As — adres, openingsuren, telefoon en e-mail.",
};

const OPENINGSUREN = [
  { dag: "Maandag", uren: "09u–12u & 13u–17u" },
  { dag: "Dinsdag", uren: "09u–12u & 13u–17u" },
  { dag: "Woensdag", uren: "09u–12u & 13u–17u" },
  { dag: "Donderdag", uren: "09u–12u & 13u–17u" },
  { dag: "Vrijdag", uren: "09u–12u & 13u–17u" },
  { dag: "Zaterdag", uren: "Op afspraak" },
  { dag: "Zondag", uren: "Gesloten" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1">
        <div className="bg-accent px-6 pb-16 pt-32 sm:px-10 md:pt-40">
          <div className="mx-auto max-w-[1100px]">
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-ink/70">
              Contact
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              Contacteer ons
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-[1100px] bg-bg px-6 pb-20 pt-14 sm:px-10">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                Kantoor
              </h2>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Bevrijdingslaan+33%2C+3665+As"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-body text-base text-ink underline decoration-1 underline-offset-4 hover:text-accent-deep"
              >
                Bevrijdingslaan 33, 3665 As
              </a>

              <a
                href="tel:+3289391555"
                className="mt-6 block font-body text-base font-semibold text-ink tabular"
              >
                089 391 555
              </a>
              <a
                href="mailto:info@frerevastgoed.be"
                className="mt-1 block font-body text-base text-ink"
              >
                info@frerevastgoed.be
              </a>

              <h2 className="mt-10 font-display text-xl font-bold text-ink">
                Openingsuren
              </h2>
              <dl className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
                {OPENINGSUREN.map((o) => (
                  <div
                    key={o.dag}
                    className="flex items-center justify-between py-2.5 font-body text-sm"
                  >
                    <dt className="text-ink/70">{o.dag}</dt>
                    <dd className="font-semibold text-ink tabular">{o.uren}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                Ons team
              </h2>
              <div className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
                {TEAM.map((m) => (
                  <div key={m.slug} className="py-4">
                    <p className="font-body text-base font-semibold text-ink">
                      {m.name}
                    </p>
                    <p className="font-body text-sm text-support">{m.role}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-body text-sm">
                      {m.phone && (
                        <a
                          href={`tel:${m.phone.replace(/\s+/g, "")}`}
                          className="text-accent-deep underline decoration-1 underline-offset-4 hover:text-ink"
                        >
                          Bel {m.name.split(" ")[0]}
                        </a>
                      )}
                      <a
                        href={`mailto:${m.email}`}
                        className="text-accent-deep underline decoration-1 underline-offset-4 hover:text-ink"
                      >
                        Mail {m.name.split(" ")[0]}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-ink/10 pt-8">
            <h2 className="font-display text-base font-bold text-ink">
              Erkenning &amp; toezicht
            </h2>
            <div className="mt-3 space-y-1.5 font-body text-xs leading-relaxed text-support">
              <p>
                Toezichthoudende autoriteit: Beroepsinstituut van
                Vastgoedmakelaars (BIV), Luxemburgstraat 16B, 1000 Brussel —
                onderworpen aan de deontologische code van het BIV (KB van 27
                september 2006).
              </p>
              <p>
                Vastgoedmakelaar-bemiddelaar BIV 509.917 — Bernard Frère.
                Vastgoedmakelaar-bemiddelaar BIV 513.452 — Illya Buttgereit.
                Stagiair vastgoedmakelaar-bemiddelaar BIV 519.660 — Vincenzo
                Giacomazza.
              </p>
              <p>
                Beroepsaansprakelijkheid en borgstelling via NV AXA Belgium
                (polisnr. 730.390.160).
              </p>
              <p>Erkend CIB-lid — corporatieve beroepsregels op www.cib.be.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
