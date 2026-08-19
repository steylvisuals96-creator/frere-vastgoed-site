import Image from "next/image";
import Link from "next/link";

const DIENSTEN_LINKS = [
  { label: "Verkopen", href: "/diensten/verkopen" },
  { label: "Verhuren", href: "/diensten/verhuren" },
  { label: "Aankoopmakelaar", href: "/diensten/aankoopmakelaar" },
  { label: "Gratis schatting", href: "/gratis-schatting" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-accent px-6 py-16 sm:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <Image
            src="/images/logo.png"
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

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-ink/60">
              Diensten
            </p>
            <ul className="mt-3 space-y-2">
              {DIENSTEN_LINKS.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="font-body text-sm text-ink transition-colors hover:text-accent-deep"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-ink/60">
              Kantoor
            </p>
            <p className="mt-3 font-body text-base text-ink">
              Bevrijdingslaan 33
              <br />
              3665 As
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-block font-body text-sm text-ink underline decoration-1 underline-offset-4 hover:text-accent-deep"
            >
              Openingsuren &amp; route
            </Link>
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

      <div className="mx-auto mt-14 flex max-w-[1200px] flex-col gap-4 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs text-ink/60">
          © {new Date().getFullYear()} Frère Vastgoed. Alle rechten voorbehouden.
        </p>
        <div className="flex gap-5">
          <Link
            href="/privacybeleid"
            className="font-body text-xs text-ink/60 underline decoration-1 underline-offset-4 hover:text-ink"
          >
            Privacybeleid
          </Link>
          <Link
            href="/gebruiksvoorwaarden"
            className="font-body text-xs text-ink/60 underline decoration-1 underline-offset-4 hover:text-ink"
          >
            Gebruiksvoorwaarden
          </Link>
        </div>
      </div>
    </footer>
  );
}
