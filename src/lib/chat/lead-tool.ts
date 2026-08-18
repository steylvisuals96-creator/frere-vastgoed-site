export const LEAD_TOOL = {
  type: "function",
  function: {
    name: "capture_lead",
    description:
      "Registreert een geïnteresseerde bezoeker (aanbodvraag of schattingsaanvraag) " +
      "zodat het kantoor kan opvolgen. Roep dit pas aan als je voornaam, e-mailadres " +
      "én telefoonnummer hebt gekregen — via het gesprek, nooit als los formulier.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Naam van de bezoeker" },
        email: { type: "string", description: "E-mailadres" },
        phone: { type: "string", description: "Telefoonnummer" },
        intent: {
          type: "string",
          enum: ["schatting_aanvraag", "aanbod_interesse", "algemene_vraag"],
          description: "Waar deze lead voor is.",
        },
        details: {
          type: "string",
          description:
            "Korte samenvatting in eigen woorden: bij een schatting alle verzamelde " +
            "kenmerken (adres, m², staat, ...), bij aanbod welk pand/type interesse.",
        },
      },
      required: ["name", "email", "phone", "intent", "details"],
    },
  },
} as const;

export type LeadArgs = {
  name?: string;
  email?: string;
  phone?: string;
  intent?: string;
  details?: string;
};

/**
 * TODO: nog geen echte bestemming gekozen (Zapier, mailto, CRM, ...) — Sam wil
 * dat later beslissen. Voor nu loggen we de lead server-side zodat niets
 * stilzwijgend verloren gaat, en geven we altijd success terug zodat het
 * gesprek niet vastloopt op een ontbrekende integratie.
 */
export async function captureLead(args: LeadArgs): Promise<boolean> {
  console.log("[chat] lead gevangen (nog geen bestemming ingesteld):", args);
  return true;
}
