"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Aanbod", href: "#aanbod" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20 bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="shrink-0">
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
          <a
            href="tel:+3289391555"
            className="font-body text-sm font-semibold text-ink tabular"
          >
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
            strokeWidth={1.75}
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

      {open && (
        <nav
          id="hoofdmenu"
          className="border-t border-ink/10 bg-bg px-6 pb-6 pt-2 md:hidden"
        >
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
        </nav>
      )}
    </header>
  );
}
