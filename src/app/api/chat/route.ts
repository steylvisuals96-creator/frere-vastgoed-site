import { NextRequest } from "next/server";
import { systemPrompt } from "@/lib/chat/system-prompt";
import { mockReply } from "@/lib/chat/mock";
import { LEAD_TOOL, captureLead } from "@/lib/chat/lead-tool";

// Zonder AI_GATEWAY_API_KEY (nog niet ingesteld in dit Vercel-project) draait
// alles in mock-modus: geen kosten, wel de echte pandendata en dezelfde flow.
const GATEWAY_URL = "https://ai-gateway.vercel.sh/v1/chat/completions";
// Instelbaar via env zodat een goedkoop/gratis model gekozen kan worden zonder
// codewijziging — check de actuele opties in de Vercel AI Gateway-dashboard,
// prijzen/beschikbaarheid daar veranderen.
const MODEL = process.env.AI_MODEL || "anthropic/claude-haiku-4-5";

const MAX_MESSAGES = 24;
const MAX_CHARS = 1500;
const MAX_TOKENS = 500;
const RATE_MAX = 12;
const RATE_WINDOW_MS = 60_000;

// In-memory: geen extra dienst nodig. Instances zijn kortlevend — dit is een
// drempel tegen toevallig misbruik, niet de echte bescherming. Die is de
// spend limit op de Gateway-key zelf.
const hits = new Map<string, { start: number; count: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const record = hits.get(ip);
  if (!record || now - record.start > RATE_WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  record.count += 1;
  return record.count > RATE_MAX;
}

type Msg = { role: "user" | "assistant"; content: string };

async function callModel(body: unknown) {
  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gateway ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let payload: { messages?: unknown } | null = null;
  try {
    payload = await req.json();
  } catch {
    payload = null;
  }
  if (!payload || !Array.isArray(payload.messages)) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const messages: Msg[] = (payload.messages as Array<{ role?: string; content?: string }>)
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: String(m.content || "").slice(0, MAX_CHARS),
    }));

  if (!messages.length) {
    return Response.json({ error: "no_messages" }, { status: 400 });
  }

  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ reply: mockReply(messages), mock: true, lead_captured: false });
  }

  try {
    const request: {
      model: string;
      max_tokens: number;
      messages: Array<{ role: string; content: string; tool_call_id?: string }>;
      tools: unknown[];
    } = {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "system", content: systemPrompt() }, ...messages],
      tools: [LEAD_TOOL],
    };

    type ToolCall = { id: string; function: { name: string; arguments: string } };
    type Choice = {
      message: { content?: string; tool_calls?: ToolCall[] };
    };

    let data = (await callModel(request)) as { choices?: Choice[] };
    let choice = data.choices?.[0];
    let leadCaptured = false;

    const calls = choice?.message?.tool_calls;
    if (calls && calls.length) {
      request.messages.push({
        role: "assistant",
        content: choice!.message.content || "",
      });
      for (const call of calls) {
        let args = {};
        try {
          args = JSON.parse(call.function.arguments || "{}");
        } catch {
          // leeg object volstaat als fallback
        }
        let toolResult: unknown;
        if (call.function.name === "capture_lead") {
          const ok = await captureLead(args);
          if (ok) leadCaptured = true;
          toolResult = { success: ok };
        } else {
          toolResult = { error: "unknown_tool" };
        }
        request.messages.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(toolResult),
        });
      }
      data = (await callModel(request)) as { choices?: Choice[] };
      choice = data.choices?.[0];
    }

    const reply = choice?.message?.content || "";
    return Response.json({ reply: reply.trim(), lead_captured: leadCaptured });
  } catch (err) {
    console.error("[chat]", err instanceof Error ? err.message : err);
    return Response.json(
      {
        error: "upstream",
        reply: "Sorry, er ging iets mis. U kunt ons rechtstreeks bereiken op 089 391 555.",
      },
      { status: 502 },
    );
  }
}
