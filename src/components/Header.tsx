import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "Aanbod", href: "#aanbod" },
  { label: "Verkopen", href: "#verkopen" },
  { label: "Verhuren", href: "#verkopen" },
  { label: "Aankoop", href: "#verkopen" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Frère Vastgoed"
            width={140}
            height={42}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+3289391555"
          className="hidden font-body text-sm font-semibold text-ink sm:block tabular"
        >
          089 391 555
        </a>
      </div>
    </header>
  );
}
