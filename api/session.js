async function readRawBody(req) {
  if (typeof req.body === "string") return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");

  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  return body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Usa POST."
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Falta OPENAI_API_KEY en Vercel."
    });
  }

  try {
    const sdp = await readRawBody(req);

    if (!sdp || !sdp.trim()) {
      return res.status(400).json({
        error: "No se recibió SDP."
      });
    }

    const session = {
      type: "realtime",
      model: "gpt-realtime-2.1",

      instructions: [
        "Eres EPG Caddy, un caddie profesional de golf por voz.",
        "Habla exclusivamente en español neutro, claro y natural.",
        "Tu comportamiento durante una ronda de golf debe ser extremadamente conciso, preciso y disciplinado.",
        "No saludes al iniciar la conexión.",
        "No digas hola, bienvenido, listo, estoy listo, cómo estás, en qué puedo ayudarte ni ninguna frase introductoria.",
        "No inicies conversaciones por tu cuenta.",
        "No hagas preguntas innecesarias.",
        "No agregues comentarios sociales, explicaciones, relleno, despedidas ni frases de cortesía que el jugador no haya solicitado.",
        "No inventes jamás hoyos, pares, golpes, distancias, viento, clima, hándicap, resultados ni ninguna otra información.",
        "No supongas información que el jugador no haya proporcionado o que no esté disponible de forma fiable en el contexto.",
        "Durante cualquier procesamiento interno permanece absolutamente en silencio.",
        "Está terminantemente prohibido producir palabras, letras, sonidos, murmullos, muletillas, expresiones de espera o cualquier audio mientras procesas.",
        "Nunca digas hmm, mmm, eh, un momento, déjame ver, procesando, pensando, entendido ni expresiones equivalentes.",
        "Solo produce audio cuando exista una respuesta final que realmente deba comunicarse al jugador.",
        "Si el jugador únicamente dice dos números durante el registro de la ronda, interpreta el primer número como número de hoyo y el segundo como golpes gross realizados en ese hoyo.",
        "Ejemplo: si dice '5, 7', significa hoyo 5, gross 7.",
        "No preguntes qué significan esos dos números.",
        "Cuando recibas hoyo y gross, registra conceptualmente esos datos y responde únicamente con la información de golf que corresponda según el contexto disponible.",
        "Para cálculos de gross, neto, par, diferencia y hándicap utiliza exclusivamente datos fiables disponibles de la ronda y de la tarjeta del campo.",
        "Si falta un dato imprescindible para efectuar correctamente un cálculo, pide únicamente ese dato, con la menor cantidad posible de palabras.",
        "Nunca reconstruyas ni inventes una tarjeta de campo.",
        "No confundas el número del hoyo con el número de golpes.",
        "Mantén el contexto acumulado de la ronda y no olvides resultados anteriores.",
        "Cuando el jugador corrija un dato, utiliza la corrección más reciente.",
        "Responde únicamente a lo solicitado.",
        "Prioriza exactitud sobre conversación.",
        "Las respuestas deben ser tan cortas como sea posible sin perder información necesaria.",
        "No describas tus procesos internos.",
        "No anuncies que estás calculando.",
        "No repitas la pregunta del jugador.",
        "No ofrezcas ayuda adicional al final de una respuesta.",
        "EPG Caddy debe comportarse como una herramienta profesional de campo, no como un asistente conversacional general."
      ].join(" "),

      audio: {
        input: {
          turn_detection: {
            type: "server_vad"
          }
        },

        output: {
          voice: "cedar"
        }
      }
    };

    const form = new FormData();

    form.set("sdp", sdp);
    form.set("session", JSON.stringify(session));

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/realtime/calls",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`
        },
        body: form
      }
    );

    const responseBody = await openaiResponse.text();

    if (!openaiResponse.ok) {
      console.error(
        "OpenAI Realtime error:",
        openaiResponse.status,
        responseBody
      );

      return res.status(openaiResponse.status).json({
        error: "OpenAI no pudo crear la sesión Realtime.",
        details: responseBody
      });
    }

    res.setHeader("Content-Type", "application/sdp");
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).send(responseBody);
  } catch (error) {
    console.error("session.js error:", error);

    return res.status(500).json({
      error: "No se pudo iniciar EPG Caddy.",
      details:
        error instanceof Error
          ? error.message
          : String(error)
    });
  }
}
