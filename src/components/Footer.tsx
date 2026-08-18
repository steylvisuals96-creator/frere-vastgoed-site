import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="bg-accent px-6 py-16 sm:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <Image
            src="/images/logo.svg"
            alt="Frère Vastgoed"
            width={140}
            height={42}
            className="h-9 w-auto"
          />
          <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-ink/75">
            Erkende vastgoedmakelaars voor verkoop, verhuur en aankoop in As,
            Genk, Maasmechelen, Oudsbergen en omstreken.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-ink/60">
              Kantoor
            </p>
            <p className="mt-3 font-body text-base text-ink">
              Bevrijdingslaan 33
              <br />
              3665 As
            </p>
          </div>

          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-ink/60">
              Contact
            </p>
            <a
              href="tel:+3289391555"
              className="mt-3 block font-body text-base font-semibold text-ink tabular"
            >
              089 391 555
            </a>
            <a
              href="mailto:info@frerevastgoed.be"
              className="mt-1 block font-body text-base text-ink"
            >
              info@frerevastgoed.be
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1200px] border-t border-ink/15 pt-6">
        <p className="font-body text-xs text-ink/60">
          © {new Date().getFullYear()} Frère Vastgoed. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
