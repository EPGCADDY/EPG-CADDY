import { handleAppPreflight } from "./_lib/cors.js";

async function readRawBody(req) {
  if (typeof req.body === "string") return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");
  let body = "";
  for await (const chunk of req) body += Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
  return body;
}

function safeHeader(value, max = 300) {
  return String(value || "").replace(/[\r\n]/g, " ").slice(0, max);
}

const MAX_TRANSCRIPTION_PROMPT_LENGTH = 1024;

function roundTranscriptionPrompt(players) {
  return `Golf Guatemala con Caddie conversacional. Transcribe literalmente español natural de cualquier tema, preguntas y seguimiento de una conversación. Jugadores: ${players || "los registrados"}. Si es score: el cursor indica automáticamente el hoyo activo; transcribe Nombre + Score. Hoyo N opcional reposiciona. Tras Falta NOMBRE, Score u omisión solos son de ese jugador. Gross: número o golf. X: equis, cero, sin score, sin dato, no informó, no dijo, no cantó, ponle cero, no le anotes. Golf: albatros, águila, eagle, birdie, pájaro, par, bogey, doble bogey, triple bogey, doble par, uno bajo par, uno sobre par, dos sobre par, tres sobre par. Nombre único solo; si se repite, apellido. Jessie se escribe Jessie.`.slice(0, MAX_TRANSCRIPTION_PROMPT_LENGTH);
}

export default async function handler(req, res) {
  if(handleAppPreflight(req,res))return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Usa POST." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Falta OPENAI_API_KEY en Vercel." });
  }

  try {
    const sdp = await readRawBody(req);
    if (!sdp.trim()) return res.status(400).json({ error: "No se recibió SDP." });

    const context = safeHeader(req.headers["x-gscg-context"], 20) === "setup" ? "setup" : "round";
    const players = safeHeader(req.headers["x-gscg-players"], 300);
    const silence = context === "setup" ? 1500 : 1200;
    const threshold = context === "setup" ? 0.5 : 0.2;
    const prefixPadding = context === "setup" ? 300 : 700;
    const noiseReduction = context === "setup" ? "near_field" : "far_field";

    const transcriptionPrompt = context === "setup"
      ? "Golf Guatemala. Registro de jugadores. Transcribe literalmente nombres propios, handicap y color de marcas. Regla mandatoria: Jessie se escribe Jessie."
      : roundTranscriptionPrompt(players);
    const roundKeywords = ["hoyo", "gross", "par", "birdie", "bogey", "doble bogey", "triple bogey", "eagle", "albatros", "equis", "cero", "sin score", "sin dato", "no informó", "no dijo", "no cantó", "ponle cero", "no le anotes", ...players.split(",").map(value => value.trim()).filter(Boolean)].slice(0, 80);

    const session = {
      type: "realtime",
      model: "gpt-realtime",
      instructions: [
        "Aplicación grupal de score de golf con Caddie conversacional de propósito general.",
        "REGLA ABSOLUTA: nunca produzcas respuestas espontáneas.",
        "No respondas automáticamente al audio del usuario.",
        "Solo procesa audio para transcripción; cualquier respuesta de voz, de Golf Score Card o de conversación general, será creada explícitamente por el cliente.",
        "Las instrucciones incluidas por el cliente en cada response.create determinan si debes leer un texto literal o sostener una conversación natural.",
        "Nunca afirmes que cambiaste un score: las modificaciones de la tarjeta se procesan exclusivamente en el cliente."
      ].join(" "),
      audio: {
        input: {
          transcription: {
            ...(context === "setup"
              ? { model: "gpt-4o-transcribe", language: "es" }
              : { model: "gpt-live-transcribe", languages: ["es"], keywords: roundKeywords }),
            prompt: transcriptionPrompt
          },
          noise_reduction: { type: noiseReduction },
          turn_detection: {
            type: "server_vad",
            threshold,
            prefix_padding_ms: prefixPadding,
            silence_duration_ms: silence,
            create_response: false,
            interrupt_response: false
          }
        },
        output: {
          voice: "cedar",
          speed: 1.15
        }
      },
      tools: [],
      tool_choice: "none",
      output_modalities: ["audio"]
    };

    const form = new FormData();
    form.set("sdp", sdp);
    form.set("session", JSON.stringify(session));

    const openai = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Safety-Identifier": "golf-score-card-guatemala-grupal"
      },
      body: form
    });

    const body = await openai.text();

    if (!openai.ok) {
      console.error("OpenAI Realtime grupal error", openai.status);
      res.setHeader("Cache-Control", "no-store");
      return res.status(openai.status).json({ error: "OpenAI no pudo crear la sesión grupal." });
    }

    res.setHeader("Content-Type", "application/sdp");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(body);
  } catch (error) {
    console.error("session-grupal.js error");
    res.setHeader("Cache-Control", "no-store");
    return res.status(500).json({ error: "No se pudo iniciar la sesión grupal." });
  }
}
