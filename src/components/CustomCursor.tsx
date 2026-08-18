"use client";

import { useEffect, useRef } from "react";

/**
 * Ring + puntje volgt de muis, met een lichte gloed in het taupe-accent.
 * Alleen op apparaten met een echte muis (pointer: fine) — op touch blijft
 * de normale aanraakervaring gewoon staan, geen cursor-namaak nodig.
 */

function relativeLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function parseRgb(str: string): { r: number; g: number; b: number; a: number } | null {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
}

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

    // Niet "zit dit punt binnen een donkere SECTIE" (te grof: een lichte
    // zoekbalk binnen de donkere hero gaf dan alsnog de lichte cursor-variant,
    // pal boven een licht vlak — bijna onzichtbaar). In plaats daarvan: het
    // echte achtergrondkleurtje op die exacte plek meten en de cursor
    // omgekeerd daarvan kleuren, zodat er altijd contrast staat.
    function bgLuminanceAt(x: number, y: number): number {
      const el = document.elementFromPoint(x, y);
      let node: HTMLElement | null = el as HTMLElement | null;
      while (node && node !== document.documentElement) {
        const c = parseRgb(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0.5) return relativeLuminance(c.r, c.g, c.b);
        node = node.parentElement;
      }
      return relativeLuminance(244, 242, 237); // val terug op de site-achtergrond (licht)
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      dot!.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      const dark = bgLuminanceAt(targetX, targetY) < 0.5;
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

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-on");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
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
