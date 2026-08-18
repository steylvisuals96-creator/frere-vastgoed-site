import Image from "next/image";
import { IconArea, IconBath, IconBed, IconPlot } from "./icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100vh] flex-col md:flex-row">
      <div className="relative h-[52vh] w-full md:h-auto md:flex-1">
        <Image
          src="/images/pand-dilsen-stokkem.jpg"
          alt="Huis in Dilsen-Stokkem, aangeboden door Frère Vastgoed"
          fill
          priority
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex w-full flex-col justify-between bg-accent px-6 py-10 md:w-[420px] md:px-10 md:py-24 lg:w-[480px]">
        <div className="pt-16 md:pt-0">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-ink/70">
            Dilsen-Stokkem — Schoolstraat 74
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Uw volgende adres begint met een gesprek dat klopt.
          </h1>
          <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-ink/80">
            Frère Vastgoed begeleidt verkoop, verhuur en aankoop van vastgoed in
            As, Genk, Maasmechelen, Oudsbergen en omstreken — persoonlijk, van
            eerste bezoek tot handtekening.
          </p>
        </div>

        <div className="mt-10">
          <dl className="grid grid-cols-2 gap-y-5 border-t border-ink/15 pt-6 sm:grid-cols-4">
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/60">
                <IconArea className="h-3.5 w-3.5" /> Woonopp.
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-ink tabular">
                209,92 m²
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/60">
                <IconPlot className="h-3.5 w-3.5" /> Perceel
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-ink tabular">
                895 m²
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/60">
                <IconBed className="h-3.5 w-3.5" /> Slaapk.
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-ink tabular">3</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/60">
                <IconBath className="h-3.5 w-3.5" /> Badk.
              </dt>
              <dd className="mt-1 font-display text-xl font-bold text-ink tabular">2</dd>
            </div>
          </dl>

          <a
            href="#aanbod"
            className="mt-8 inline-flex w-full items-center justify-center bg-ink px-6 py-4 font-body text-sm font-semibold text-bg transition-colors hover:bg-accent-deep sm:w-auto"
          >
            Aanbod bekijken
          </a>
        </div>
      </div>
    </section>
  );
}
