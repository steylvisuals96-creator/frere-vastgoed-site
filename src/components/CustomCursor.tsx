"use client";

import { useEffect, useRef } from "react";

/**
 * Ring + puntje volgt de muis, met een lichte gloed in het taupe-accent.
 * Alleen op apparaten met een echte muis (pointer: fine) — op touch blijft
 * de normale aanraakervaring gewoon staan, geen cursor-namaak nodig.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    document.documentElement.classList.add("custom-cursor-on");

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf = 0;

    // Zelfde .op-donker-signaal als de chatknop en de focus-ring, maar hier
    // continu tegen de cursorpositie gecheckt i.p.v. één vaste knop-positie.
    // Rects van de donkere secties cachen en enkel bij scroll/resize
    // herberekenen — bij elke mousemove opnieuw de DOM doorzoeken zou nodeloos
    // zwaar zijn voor iets dat 60x per seconde kan vuren.
    let darkRects: DOMRect[] = [];
    function measureDarkSections() {
      darkRects = [...document.querySelectorAll(".op-donker")].map((el) =>
        el.getBoundingClientRect(),
      );
    }
    function isOverDark(x: number, y: number) {
      return darkRects.some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      dot!.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      const dark = isOverDark(targetX, targetY);
      ring!.classList.toggle("on-dark", dark);
      dot!.classList.toggle("on-dark", dark);
    }

    function tick() {
      // Het puntje volgt exact; de ring loopt er met een lichte vertraging
      // achteraan — dat verschil in snelheid is wat het als "gloed die volgt"
      // laat aanvoelen in plaats van een tweede, overbodige aanwijzer.
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring!.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    }

    function onOver(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest("a, button, input, textarea, select");
      ring!.classList.toggle("is-interactive", !!el);
    }

    function onLeaveWindow() {
      ring!.style.opacity = "0";
      dot!.style.opacity = "0";
    }
    function onEnterWindow() {
      ring!.style.opacity = "1";
      dot!.style.opacity = "1";
    }

    measureDarkSections();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("scroll", measureDarkSections, { passive: true });
    window.addEventListener("resize", measureDarkSections);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-on");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", measureDarkSections);
      window.removeEventListener("resize", measureDarkSections);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <div className="cursor-ring__visual" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
