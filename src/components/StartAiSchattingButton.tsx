"use client";

import { IconChat } from "./icons";

// Zelfde "frere:open-chat"-event als de auto-open op deze pagina: één
// heropen-pad, of de gebruiker het paneel nu net zag opengaan of het
// eerder al dichtklikte.
export default function StartAiSchattingButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("frere:open-chat"))}
      className={`inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-body text-sm font-semibold text-bg transition-colors hover:bg-accent-deep ${className}`}
    >
      <IconChat className="h-4 w-4" />
      Start AI-schatting
    </button>
  );
}
