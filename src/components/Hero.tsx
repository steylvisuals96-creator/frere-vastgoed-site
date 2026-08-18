import Image from "next/image";

export default function Hero() {
  return (
    // De sticky header staat nu in de flow, dus die hoogte eraf: samen vult dit één scherm.
    <section className="op-donker relative flex min-h-[calc(100svh-4.75rem)] flex-col justify-end overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/20 md:bg-gradient-to-r md:from-ink/85 md:via-ink/45 md:to-transparent"
      />

      <div className="hero-in relative mx-auto w-full max-w-[1600px] px-6 pb-16 pt-24 sm:px-10 md:pb-24">
        <h1 className="font-display text-4xl font-bold leading-[1.1] text-bg sm:text-5xl lg:text-6xl">
          Welkom bij
          <br />
          Frère Vastgoed
        </h1>
        <p className="mt-6 max-w-md font-body text-base font-medium leading-relaxed text-bg/90 sm:text-lg">
          Frère Vastgoed is uw vastgoedmakelaar voor de verkoop, verhuur of
          aankoop van elk type vastgoed in de omgeving As, Genk, Maasmechelen,
          Oudsbergen en omstreken.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#aanbod"
            className="inline-flex items-center justify-center bg-bg px-7 py-4 font-body text-sm font-semibold text-ink transition-colors hover:bg-accent"
          >
            Ontdek ons aanbod
          </a>
          <a
            href="tel:+3289391555"
            className="inline-flex items-center justify-center bg-accent px-7 py-4 font-body text-sm font-semibold text-ink transition-colors hover:bg-bg"
          >
            Gratis schatting?
          </a>
        </div>
      </div>
    </section>
  );
}
