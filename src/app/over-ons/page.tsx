import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Over ons — Frère Vastgoed",
  description:
    "Maak kennis met het team van Frère Vastgoed: erkende vastgoedmakelaars in As, Genk, Maasmechelen en Oudsbergen.",
};

export default function OverOnsPage() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1">
        <div className="bg-accent px-6 pb-16 pt-32 sm:px-10 md:pt-40">
          <div className="mx-auto max-w-[900px]">
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-ink/70">
              Over ons
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              Een jong team, uitsluitend erkende makelaars.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink/80">
              Frère Vastgoed bestaat uit een jong en sterk gemotiveerd team,
              uitsluitend BIV- en CIB-erkende vastgoedmakelaars. Wij leggen de
              nadruk op een persoonlijke service en een op maat gemaakt plan —
              want iedere transactie is anders. Als betrouwbare vastgoedpartner
              willen wij voor u het verschil maken met eerlijk, transparant en
              objectief advies.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1100px] bg-bg px-6 pb-24 pt-14 sm:px-10">
          {TEAM.map((member, i) => (
            <div
              key={member.slug}
              className={`flex flex-col gap-8 border-t border-ink/10 py-14 md:flex-row md:gap-16 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-surface md:w-[280px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 768px) 280px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  {member.name}
                </h2>
                <p className="mt-1 font-body text-sm font-semibold uppercase tracking-wide text-accent-deep">
                  {member.role}
                  {member.biv ? ` — BIV ${member.biv}` : ""}
                </p>

                <div className="mt-5 space-y-4">
                  {member.bio.map((p, j) => (
                    <p
                      key={j}
                      className="max-w-xl font-body text-base leading-relaxed text-ink/80"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center justify-center border border-ink px-5 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-bg"
                    >
                      Bel {member.name.split(" ")[0]}
                    </a>
                  )}
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center justify-center bg-accent px-5 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-accent-deep hover:text-bg"
                  >
                    Mail {member.name.split(" ")[0]}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
