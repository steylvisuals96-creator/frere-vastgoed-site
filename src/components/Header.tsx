"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconPhone } from "./icons";

const NAV = [
  { label: "Aanbod", href: "/aanbod" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const naarBoven = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Op de homepage zelf is "/" -> "/" geen navigatie, dus geen scroll-reset.
    // Forceer dan een scroll naar boven i.p.v. niets te doen.
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!open) return;
    const bijToets = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", bijToets);
    return () => window.removeEventListener("keydown", bijToets);
  }, [open]);

  return (
    <header className="sticky top-0 z-20 bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" onClick={naarBoven} className="shrink-0">
          <Image
            src="/images/logo.png"
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
          {/* Geen los nummer in de lucht: een utility-icoon maakt duidelijk dat
              dit een actie is, niet nog een navigatie-item. Zo doen premium
              vastgoedsites (Engel & Völkers, Moyabell) het ook — bellen als
              icoon-actie, niet als kale tekst tussen de nav-links. */}
          <a
            href="tel:+3289391555"
            className="flex items-center gap-2 border-l border-ink/15 pl-6 font-body text-sm font-semibold text-ink tabular transition-colors hover:text-accent-deep"
          >
            <IconPhone className="h-4 w-4" />
            089 391 555
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="hoofdmenu"
          className="flex items-center gap-2 border border-ink/25 px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-bg md:hidden"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
            )}
          </svg>
          {open ? "Sluiten" : "Menu"}
        </button>
      </div>

      {/* Blijft in de DOM (i.p.v. open && ...) zodat de in-/uitschuif kan
          animeren; grid-template-rows 0fr -> 1fr in plaats van height: auto,
          want dat laatste kan CSS niet transitioneren. */}
      <div className={`menu-collapse md:hidden ${open ? "open" : ""}`}>
        {/* Padding/border staan op dit binnenste div, niet op <nav> zelf: een
            grid-rij kan naar 0 krimpen, maar de padding van het item dat erin
            zit niet — die blijft anders als een kaal randje staan. */}
        <nav id="hoofdmenu" inert={!open}>
          <div className="border-t border-ink/10 bg-bg px-6 pb-6 pt-2">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-ink/10 py-4 font-display text-xl font-bold text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:+3289391555"
              className="mt-5 flex items-center justify-center bg-ink px-6 py-4 font-body text-sm font-semibold text-bg tabular"
            >
              Bel 089 391 555
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
