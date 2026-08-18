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

export default async function handler(req, res) {
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
    const silence = context === "setup" ? 1500 : 700;
    const threshold = context === "setup" ? 0.5 : 0.25;
    const prefixPadding = context === "setup" ? 300 : 500;
    const noiseReduction = context === "setup" ? "near_field" : "far_field";

    const transcriptionPrompt = context === "setup"
      ? "Golf Guatemala. Registro de jugadores. Transcribe literalmente nombres propios, handicap y color de marcas. Regla mandatoria: Jessie se escribe Jessie."
      : `Golf Guatemala. Dictado de scores. Jugadores actuales: ${players || "los registrados en la tarjeta"}. Transcribe literalmente nombres, hoyo y score o Gross. Acepta número Gross directo o vocabulario golfístico: albatros, águila, eagle, birdie, par, even par, bogey, doble bogey, triple bogey, doble par, uno bajo par, uno sobre par, dos sobre par y tres sobre par. Si un primer nombre es único en el grupo puede dictarse solo ese nombre; si hay dos jugadores con el mismo primer nombre, puede dictarse únicamente el apellido. Regla mandatoria: Jessie se escribe Jessie.`;

    const session = {
      type: "realtime",
      model: "gpt-realtime",
      instructions: [
        "Aplicación grupal de score de golf.",
        "REGLA ABSOLUTA: nunca produzcas respuestas espontáneas.",
        "No respondas automáticamente al audio del usuario.",
        "No hagas preguntas, no ofrezcas ayuda, no pidas aclaraciones y no hables ante errores o instrucciones desconocidas.",
        "No digas frases como por favor, indique, dime, información, problema, ayudar, ayuda, necesitas, entendido, cómo puedo ayudarte ni equivalentes.",
        "No uses herramientas.",
        "Solo procesa audio para transcripción; cualquier respuesta de voz será creada explícitamente por el cliente."
      ].join(" "),
      audio: {
        input: {
          transcription: {
            model: "gpt-4o-transcribe",
            language: "es",
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
      console.error("OpenAI Realtime grupal error", openai.status, body);
      res.setHeader("Cache-Control", "no-store");
      return res.status(openai.status).json({
        error: "OpenAI no pudo crear la sesión grupal.",
        details: body
      });
    }

    res.setHeader("Content-Type", "application/sdp");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(body);
  } catch (error) {
    console.error("session-grupal.js error", error);
    res.setHeader("Cache-Control", "no-store");
    return res.status(500).json({
      error: "No se pudo iniciar la sesión grupal.",
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
