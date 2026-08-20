"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LISTINGS } from "@/lib/listings";
import { extractListingSlugs, extractOptions } from "@/lib/chat/parse";
import { IconChat, IconClose, IconSend } from "./icons";

type Role = "user" | "assistant";
type ChatMsg = { role: Role; content: string };
type DisplayMsg = ChatMsg & {
  id: string;
  error?: boolean;
  options?: string[];
  optionsMulti?: boolean;
  slugs?: string[];
};

const GREETING =
  "Hallo, ik ben de AI-assistent van Frère Vastgoed. Ik help u graag aan een pand of een gratis schatting van uw eigen woning. Waarmee kan ik u helpen?";
// Vanaf /gratis-schatting is de intentie al duidelijk: niet opnieuw vragen
// waarmee we kunnen helpen, meteen het schattingsgesprek starten.
const SCHATTING_GREETING =
  "Hallo, ik ben de AI-assistent van Frère Vastgoed. Ik zie dat u een gratis schatting wilt — laten we meteen starten. Om welk type woning gaat het, en wat is het adres of de gemeente?";
const ERROR_TEXT =
  "Er ging iets mis. Probeer het opnieuw, of bel ons rechtstreeks op 089 391 555.";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `m${idCounter}`;
}

function ListingCards({
  slugs,
  disabled,
  selected,
  onPick,
}: {
  slugs: string[];
  disabled: boolean;
  selected: string | null;
  onPick: (slug: string) => void;
}) {
  const items = slugs
    .map((slug) => LISTINGS.find((l) => l.slug === slug))
    .filter((l): l is (typeof LISTINGS)[number] => Boolean(l));

  if (!items.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((l) => (
        <button
          key={l.slug}
          type="button"
          disabled={disabled}
          onClick={() => onPick(l.street ? `${l.street}, ${l.city}` : `${l.type} in ${l.city}`)}
          className={`w-[132px] shrink-0 border bg-surface text-left transition-colors disabled:cursor-default ${
            selected === l.slug
              ? "border-accent-deep"
              : "border-ink/15 hover:border-accent-deep"
          }`}
        >
          <span className="relative block h-16 w-full overflow-hidden bg-bg">
            <Image src={l.image} alt="" fill sizes="132px" className="object-cover" />
          </span>
          <span className="block px-2 py-2">
            <span className="block font-body text-xs font-semibold text-ink">
              {l.city}
            </span>
            <span className="mt-0.5 block font-body text-xs text-support tabular">
              {l.priceLabel}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function OptionChips({
  options,
  multi,
  disabled,
  onSend,
}: {
  options: string[];
  multi: boolean;
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);

  if (!multi) {
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => onSend(opt)}
            className="border border-ink/20 bg-surface px-3 py-1.5 font-body text-xs font-medium text-ink transition-colors hover:border-accent-deep hover:text-accent-deep disabled:opacity-40"
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  const toggle = (opt: string) => {
    setPicked((p) => (p.includes(opt) ? p.filter((o) => o !== opt) : [...p, opt]));
  };

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <p className="w-full font-body text-[0.65rem] font-semibold uppercase tracking-wide text-support">
        Meerdere mogelijk
      </p>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          disabled={disabled}
          aria-pressed={picked.includes(opt)}
          onClick={() => toggle(opt)}
          className={`border px-3 py-1.5 font-body text-xs font-medium transition-colors disabled:opacity-40 ${
            picked.includes(opt)
              ? "border-accent-deep bg-accent text-ink"
              : "border-ink/20 bg-surface text-ink hover:border-accent-deep"
          }`}
        >
          {opt}
        </button>
      ))}
      <button
        type="button"
        disabled={disabled || !picked.length}
        onClick={() => onSend(picked.join(", "))}
        className="border border-ink bg-ink px-3 py-1.5 font-body text-xs font-semibold text-bg transition-colors hover:bg-accent-deep disabled:opacity-30"
      >
        Verder
      </button>
    </div>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [messages, setMessages] = useState<DisplayMsg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [pickedSlug, setPickedSlug] = useState<Record<string, string>>({});
  const historyRef = useRef<ChatMsg[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  // De knop staat fixed, dus wat erachter scrolt wisselt (hero, testimonial,
  // ...). Zelfde .op-donker-signaal als de focus-ring elders in het project:
  // op een donkere sectie wordt de knop licht, anders donker — altijd contrast.
  const [onDark, setOnDark] = useState(false);
  // Eén keer per sessie een zachte gloed-puls i.p.v. het paneel geforceerd te
  // openen — dat laatste voelt op een pitch al snel opdringerig aan.
  const [attention, setAttention] = useState(false);
  // Vanaf /gratis-schatting hoeft niemand nog zelf op de launcher te
  // klikken: dat is letterlijk het doel van die pagina. Ref i.p.v. state
  // zodat dit maar één keer per bezoek vuurt, ook als de gebruiker het
  // paneel daarna zelf weer dichtklikt.
  const autoOpenedRef = useRef(false);

  useEffect(() => {
    if (open && !opened) {
      setOpened(true);
      const greeting = pathname === "/gratis-schatting" ? SCHATTING_GREETING : GREETING;
      setMessages([{ id: nextId(), role: "assistant", content: greeting }]);
    }
  }, [open, opened, pathname]);

  useEffect(() => {
    if (pathname === "/gratis-schatting" && !autoOpenedRef.current) {
      autoOpenedRef.current = true;
      setOpen(true);
    }
  }, [pathname]);

  // Laat andere componenten (bv. de knop op /gratis-schatting) het paneel
  // heropenen zonder gedeelde state — handig als iemand het na de
  // auto-open zelf dichtklikte en later alsnog wil starten.
  useEffect(() => {
    const onOpenRequest = () => setOpen(true);
    window.addEventListener("frere:open-chat", onOpenRequest);
    return () => window.removeEventListener("frere:open-chat", onOpenRequest);
  }, []);

  useEffect(() => {
    if (pathname === "/gratis-schatting") return;
    let shown = false;
    try {
      shown = sessionStorage.getItem("frereChatAttentionShown") === "1";
    } catch {
      // privénavigatie zonder sessionStorage: gewoon nooit tonen
      shown = true;
    }
    if (shown) return;
    const timer = setTimeout(() => {
      setAttention(true);
      try {
        sessionStorage.setItem("frereChatAttentionShown", "1");
      } catch {
        // idem — geen opslag, dan gewoon niet onthouden
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function checkContrast() {
      const btn = launcherRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dark = false;
      document.querySelectorAll(".op-donker").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) {
          dark = true;
        }
      });
      setOnDark(dark);
    }
    checkContrast();
    window.addEventListener("scroll", checkContrast, { passive: true });
    window.addEventListener("resize", checkContrast);
    return () => {
      window.removeEventListener("scroll", checkContrast);
      window.removeEventListener("resize", checkContrast);
    };
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    setMessages((m) => [...m, { id: nextId(), role: "user", content: trimmed }]);
    historyRef.current = [...historyRef.current, { role: "user", content: trimmed }];
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyRef.current }),
      });
      const data = await res.json();
      const reply = data?.reply || "";
      if (!reply) {
        setMessages((m) => [...m, { id: nextId(), role: "assistant", content: ERROR_TEXT, error: true }]);
        return;
      }
      const withOptions = extractOptions(reply);
      const withSlugs = extractListingSlugs(withOptions.clean);
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: "assistant",
          content: withSlugs.clean,
          error: !res.ok,
          options: withOptions.options,
          optionsMulti: withOptions.multi,
          slugs: withSlugs.slugs,
        },
      ]);
      if (res.ok) {
        historyRef.current = [...historyRef.current, { role: "assistant", content: reply }];
      }
    } catch {
      setMessages((m) => [...m, { id: nextId(), role: "assistant", content: ERROR_TEXT, error: true }]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => {
          setAttention(false);
          setOpen(true);
        }}
        onAnimationEnd={() => setAttention(false)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 font-body text-sm font-semibold shadow-lg transition-[opacity,background-color,color] duration-300 sm:right-10 ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        } ${
          onDark
            ? "bg-bg text-ink hover:bg-accent"
            : "bg-ink text-bg hover:bg-accent-deep"
        } ${attention ? "chat-attention" : ""}`}
      >
        <IconChat className="h-4 w-4" />
        Chat met ons
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Chat met Frère Vastgoed"
        inert={!open}
        className={`fixed inset-x-4 bottom-4 z-50 flex flex-col border border-ink/15 bg-surface shadow-2xl transition-[opacity,transform] duration-300 sm:inset-x-auto sm:right-10 sm:bottom-6 sm:w-[380px] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        style={{ height: "min(600px, calc(100dvh - 2rem))" }}
      >
        <div className="flex items-start justify-between border-b border-ink/10 px-5 pb-4 pt-5">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Frère Vastgoed
            </p>
            <p className="mt-0.5 font-body text-xs text-support">AI-assistent</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Chat sluiten"
            className="text-ink/60 transition-colors hover:text-ink"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
              <div className="max-w-[88%]">
                <div
                  className={`px-3.5 py-2.5 font-body text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-ink text-bg"
                      : m.error
                        ? "border-l-2 border-support bg-bg text-support"
                        : "bg-bg text-ink"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "assistant" && m.options && m.options.length > 0 && (
                  <OptionChips
                    options={m.options}
                    multi={!!m.optionsMulti}
                    disabled={busy}
                    onSend={send}
                  />
                )}
                {m.role === "assistant" && m.slugs && m.slugs.length > 0 && (
                  <ListingCards
                    slugs={m.slugs}
                    disabled={busy}
                    selected={pickedSlug[m.id] || null}
                    onPick={(text) => {
                      setPickedSlug((p) => ({ ...p, [m.id]: text }));
                      send(text);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
          {busy && (
            <div className="font-body text-xs uppercase tracking-wide text-support">
              Aan het typen …
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-ink/10 px-5 py-3"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Typ uw vraag…"
              className="max-h-24 flex-1 resize-none border-b border-ink/20 bg-transparent py-2 font-body text-sm text-ink outline-none placeholder:text-support focus:border-accent-deep focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Versturen"
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-bg transition-colors hover:bg-accent-deep disabled:opacity-30"
            >
              <IconSend className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 font-body text-[0.65rem] text-support">
            Liever meteen bellen?{" "}
            <a href="tel:+3289391555" className="underline decoration-1 underline-offset-2">
              089 391 555
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
