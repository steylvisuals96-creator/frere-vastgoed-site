import Image from "next/image";

const DIENSTEN = ["Verkoop", "Verhuur", "Aankoopmakelaar", "Gratis schatting"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100vh] flex-col justify-end overflow-hidden">
      <Image
        src="/images/pand-dilsen-stokkem.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-14 pt-32 sm:px-10 md:pb-20">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] text-bg sm:text-5xl lg:text-6xl">
          Vastgoed in Limburg, begeleid door mensen die de streek kennen.
        </h1>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-bg/85 sm:text-lg">
          Frère Vastgoed staat u bij in As, Genk, Maasmechelen, Oudsbergen en
          omstreken — van eerste gesprek tot handtekening, met een prijs die
          klopt en papierwerk dat op orde is.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#aanbod"
            className="inline-flex items-center justify-center bg-accent px-7 py-4 font-body text-sm font-semibold text-ink transition-colors hover:bg-bg"
          >
            Aanbod bekijken
          </a>
          <a
            href="tel:+3289391555"
            className="inline-flex items-center justify-center border border-bg/50 px-7 py-4 font-body text-sm font-semibold text-bg transition-colors hover:border-bg hover:bg-bg hover:text-ink"
          >
            Gratis schatting
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-bg/20 pt-6 sm:grid-cols-4">
          {DIENSTEN.map((dienst) => (
            <li
              key={dienst}
              className="font-body text-sm font-semibold uppercase tracking-wide text-bg/75"
            >
              {dienst}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
