import { handleAppPreflight } from "./_lib/cors.js";
import { guardAppRequest } from "./_lib/api-guard.js";

const MAX_SDP_BYTES = 512_000;

async function readRawBody(req) {
  if (typeof req.body === "string") {
    if (Buffer.byteLength(req.body) > MAX_SDP_BYTES) throw Object.assign(new Error("SDP_TOO_LARGE"), { code: "SDP_TOO_LARGE" });
    return req.body;
  }
  if (Buffer.isBuffer(req.body)) {
    if (req.body.length > MAX_SDP_BYTES) throw Object.assign(new Error("SDP_TOO_LARGE"), { code: "SDP_TOO_LARGE" });
    return req.body.toString("utf8");
  }
  let body = "";
  let bytes = 0;
  for await (const chunk of req) {
    bytes += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(String(chunk));
    if (bytes > MAX_SDP_BYTES) throw Object.assign(new Error("SDP_TOO_LARGE"), { code: "SDP_TOO_LARGE" });
    body += Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
  }
  return body;
}

function safeHeader(value, max = 300) {
  return String(value || "").replace(/[\r\n]/g, " ").slice(0, max);
}

const MAX_TRANSCRIPTION_PROMPT_LENGTH = 1024;

function roundTranscriptionPrompt(players) {
  return `Golf Guatemala con Caddie conversacional. Detecta y transcribe literalmente el idioma que hable el usuario; español es el predeterminado. Conserva preguntas y seguimiento de una conversación. Jugadores: ${players || "los registrados"}. Si es score: el cursor indica automáticamente el hoyo activo; transcribe Nombre + Score. Hoyo N opcional reposiciona. Tras Falta NOMBRE, Score u omisión solos son de ese jugador. Gross: número o golf. X: equis, cero, sin score, sin dato, no informó, no dijo, no cantó, ponle cero, no le anotes. Golf: albatros, águila, eagle, birdie, pájaro, par, bogey, doble bogey, triple bogey, doble par, uno bajo par, uno sobre par, dos sobre par, tres sobre par. Nombre único solo; si se repite, apellido. Jessie se escribe Jessie.`.slice(0, MAX_TRANSCRIPTION_PROMPT_LENGTH);
}

export default async function handler(req, res) {
  if(handleAppPreflight(req,res))return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Usa POST." });
  }
  if (!(await guardAppRequest(req, res, { scope: "realtime-session", maximum: 10 }))) return;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Falta OPENAI_API_KEY en Vercel." });
  }

  try {
    const sdp = await readRawBody(req);
    if (!sdp.trim()) return res.status(400).json({ error: "No se recibió SDP." });

    const context = safeHeader(req.headers["x-gscg-context"], 20) === "setup" ? "setup" : "round";
    const players = safeHeader(req.headers["x-gscg-players"], 300);
    const silence = 1000;
    // La pantalla de Inicio se usa con el teléfono a distintas distancias. La
    // antigua sensibilidad 0.5 podía abrir el micrófono sin reconocer una voz
    // normal. Usamos la misma detección tolerante que ya funciona en la ronda.
    const threshold = 0.2;
    const prefixPadding = 700;
    const noiseReduction = "far_field";

    const transcriptionPrompt = context === "setup"
      ? "Golf Guatemala con Caddie universal. Detecta y transcribe literalmente el idioma que hable el usuario; español es el predeterminado. Conserva preguntas y seguimiento de una conversación. Si el usuario registra jugadores, conserva exactamente nombres propios, handicap y color de marcas. Regla mandatoria: Jessie se escribe Jessie."
      : roundTranscriptionPrompt(players);
    const roundKeywords = ["hoyo", "gross", "par", "birdie", "bogey", "doble bogey", "triple bogey", "eagle", "albatros", "equis", "cero", "sin score", "sin dato", "no informó", "no dijo", "no cantó", "ponle cero", "no le anotes", ...players.split(",").map(value => value.trim()).filter(Boolean)].slice(0, 80);

    const session = {
      type: "realtime",
      model: "gpt-realtime",
      instructions: [
        "Aplicación grupal de score de golf con Caddie conversacional de propósito general disponible desde todos los micrófonos.",
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
              ? { model: "gpt-live-transcribe" }
              : { model: "gpt-live-transcribe", keywords: roundKeywords }),
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
      console.error("realtime-session",JSON.stringify({event:"upstream_failed",context,status:openai.status}));
      res.setHeader("Cache-Control", "no-store");
      return res.status(openai.status).json({ error: "OpenAI no pudo crear la sesión grupal." });
    }

    res.setHeader("Content-Type", "application/sdp");
    res.setHeader("Cache-Control", "no-store");
    console.info("realtime-session",JSON.stringify({event:"created",context,status:200}));
    return res.status(200).send(body);
  } catch (error) {
    if (error?.code === "SDP_TOO_LARGE") return res.status(413).json({ error: "SDP_TOO_LARGE" });
    console.error("realtime-session",JSON.stringify({event:"exception",status:500}));
    res.setHeader("Cache-Control", "no-store");
    return res.status(500).json({ error: "No se pudo iniciar la sesión grupal." });
  }
}
