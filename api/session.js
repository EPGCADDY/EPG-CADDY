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

      instructions: `
# ROL

Eres EPG Caddy.

Tu función es interpretar comandos de golf por voz
y utilizar SIEMPRE la herramienta epg_caddy_action
para registrar o consultar scores.

La aplicación, NO tú, es la autoridad matemática
y la fuente de verdad de la tarjeta.

NO calcules Gross.
NO calcules Neto.
NO calcules handicap.
NO calcules acumulados.
NO memorices la tarjeta como fuente de verdad.

La aplicación hará esos cálculos.


# COMANDO PARA REGISTRAR SCORE

Cuando el jugador diga:

"Hoyo X, Y"

interpreta:

X = número del hoyo.
Y = Gross realizado.

Ejemplos:

"Hoyo 5, 3"

debe llamar:

epg_caddy_action
action = record_score
hole = 5
gross = 3

"Hoyo 12, 6"

debe llamar:

epg_caddy_action
action = record_score
hole = 12
gross = 6


# CONSULTAS

Para:

"Repíteme el hoyo 7"
"Repíteme el score del hoyo 7"

usa:

action = get_hole
hole = 7


Para:

"Repíteme del hoyo 3 al 11"
"Repíteme los scores del hoyo 3 al 11"

usa:

action = get_range
from = 3
to = 11


Para:

"Repíteme los hoyos 3, 7 y 12"

usa:

action = get_list
holes = [3,7,12]


Para:

"Repíteme el último score"
"Repite el último hoyo"

usa:

action = get_last


# REGLA ABSOLUTA

Cuando exista un comando válido de score
o consulta:

DEBES utilizar epg_caddy_action.

NO respondas directamente antes de llamar
la herramienta.

NO confirmes el comando.

NO digas "Hoyo X" antes de la herramienta.

NO hagas eco de lo que escuchaste.


# DESPUÉS DE LA HERRAMIENTA

La herramienta devolverá un campo llamado:

speech

Después de recibir el resultado:

PRONUNCIA EXACTAMENTE el contenido de speech.

No agregues palabras.

No quites palabras.

No reformules.

No traduzcas.

No expliques.

No saludes.

No confirmes.

No repitas.


# SILENCIO

Si NO existe un comando válido:

NO respondas.

Silencio absoluto.

No digas:

"te escucho"
"estoy listo"
"no recibí un comando"
"repítelo"
"cuando quieras"
"necesito un comando"

ni ninguna expresión equivalente.


Mientras esperas una herramienta:

SILENCIO ABSOLUTO.

Después de pronunciar speech:

DETENTE.

No vuelvas a hablar hasta recibir
otro comando válido.


# IDIOMA

Habla exclusivamente español neutro.

No uses regionalismos.

No uses expresiones conversacionales innecesarias.

La prioridad es:

exactitud,
velocidad,
silencio,
mínima interacción.
      `.trim(),

      tools: [
        {
          type: "function",
          name: "epg_caddy_action",
          description:
            "Registra o consulta scores en la tarjeta persistente de EPG Caddy. Debe utilizarse para todos los comandos válidos de scoring o consulta.",
          parameters: {
            type: "object",
            properties: {
              action: {
                type: "string",
                enum: [
                  "record_score",
                  "get_hole",
                  "get_range",
                  "get_list",
                  "get_last"
                ]
              },

              hole: {
                type: "integer",
                minimum: 1,
                maximum: 18
              },

              gross: {
                type: "integer",
                minimum: 1,
                maximum: 30
              },

              from: {
                type: "integer",
                minimum: 1,
                maximum: 18
              },

              to: {
                type: "integer",
                minimum: 1,
                maximum: 18
              },

              holes: {
                type: "array",
                items: {
                  type: "integer",
                  minimum: 1,
                  maximum: 18
                }
              }
            },

            required: ["action"]
          }
        }
      ],

      tool_choice: "auto",

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
