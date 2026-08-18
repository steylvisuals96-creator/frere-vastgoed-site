export default function Testimonial() {
  return (
    <section id="reviews" className="bg-ink px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-[900px]">
        <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent">
          Wat klanten vertellen
        </p>
        <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug text-bg sm:text-3xl">
          “Zeer goede uitleg en begeleiding bij de snelle verkoop huis van mijn
          vader (10 dagen). Met juiste prijs, papierwerk en communicatie is
          alles met een gerust hart verlopen. Héél blij dat ik gekozen heb
          voor Frère Vastgoed.”
        </blockquote>

        <div className="mt-8 flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-ink"
          >
            LA
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-bg">Lut Aerden</p>
            <p className="font-body text-sm text-bg/60">26 februari 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
