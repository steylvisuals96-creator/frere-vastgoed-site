import { LISTINGS, LISTING_TYPES } from "@/lib/listings";

type Msg = { role: "user" | "assistant"; content: string };

const SCHATTING_HINT = /schat|waarde|wat is mijn (huis|pand|woning|appartement)/i;

/**
 * Zonder AI_GATEWAY_API_KEY antwoordt de widget hiermee: geen model, wel de
 * echte pandendata en dezelfde gespreksopbouw als de live versie. Genoeg om
 * de flow te testen en te beoordelen zonder dat er een cent aan credits gaat.
 */
export function mockReply(messages: Msg[]): string {
  const userTurns = messages.filter((m) => m.role === "user");
  const turns = userTurns.length;
  const allText = userTurns.map((m) => m.content).join(" ").toLowerCase();

  if (SCHATTING_HINT.test(allText)) {
    if (!/m²|m2|\d/.test(allText) || turns < 2) {
      return (
        "[mock] Een gratis schatting, duidelijk. In welke gemeente staat het pand, " +
        "en wat is ongeveer de bewoonbare oppervlakte?"
      );
    }
    return (
      "[mock] Op basis van wat u vertelt kom ik uit op een indicatieve bandbreedte van " +
      "ongeveer € 280.000 – 320.000. Dit is een AI-inschatting, geen officiële " +
      "waardebepaling — een makelaar van Frère Vastgoed komt hiervoor gratis langs voor " +
      "een exacte schatting. Zal ik uw gegevens noteren zodat iemand contact opneemt?"
    );
  }

  const knownType = LISTING_TYPES.find((t) => allText.includes(t.toLowerCase()));

  if (turns === 1) {
    return knownType
      ? `[mock] Een ${knownType.toLowerCase()}, genoteerd. In welke gemeente zoekt u — As, Genk, Maasmechelen, Oudsbergen of ergens anders?`
      : "[mock] Duidelijk. Zoekt u een huis, appartement, grond of commercieel pand?\nOPTIES: Huis | Appartement | Grond | Commercieel";
  }

  if (turns === 2) {
    const matches = knownType
      ? LISTINGS.filter((l) => l.type === knownType).slice(0, 2)
      : LISTINGS.slice(0, 2);
    const slugs = matches.map((l) => l.slug).join(" | ");
    return `[mock] Deze passen daar het best bij.\nPANDEN: ${slugs}`;
  }

  return "[mock] Wilt u meer weten over een van deze panden, of nog iets anders zoeken?";
}
