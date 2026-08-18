// Zelfde regex-aanpak als bewezen in het investinspain-widget: vergevingsgezind,
// want het model zet deze regel niet altijd nette onderaan.
const OPTIONS_LINE = /(^|\n)[ \t]*OPTIES(-MEER)?:[ \t]*([^\n]+)/i;
const PANDEN_LINE =
  /(^|\n)[ \t]*PANDEN:[ \t]*((?:\[?[a-z0-9][a-z0-9-]*\]?[ \t]*\|[ \t]*)*\[?[a-z0-9][a-z0-9-]*\]?)/i;

export function extractOptions(text: string): {
  clean: string;
  options: string[];
  multi: boolean;
} {
  const match = text.match(OPTIONS_LINE);
  if (!match) return { clean: text, options: [], multi: false };
  const options = match[3]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);
  const clean = (
    text.slice(0, match.index) + " " + text.slice((match.index || 0) + match[0].length)
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { clean, options, multi: !!match[2] };
}

export function extractListingSlugs(text: string): { clean: string; slugs: string[] } {
  const match = text.match(PANDEN_LINE);
  if (!match) return { clean: text, slugs: [] };
  const slugs = match[2]
    .split("|")
    .map((s) => s.trim().replace(/[[\]]/g, "").trim())
    .filter(Boolean)
    .slice(0, 4);
  const tail = text
    .slice((match.index || 0) + match[0].length)
    .replace(/^[ \t]*[.,;:!?]+/, "");
  const clean = (text.slice(0, match.index) + " " + tail)
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { clean, slugs };
}
