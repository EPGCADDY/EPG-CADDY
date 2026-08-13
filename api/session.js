async function readRawBody(req) {
  if (typeof req.body === "string") {
    return req.body;
  }

  if (Buffer.isBuffer(req.body)) {
    return req.body.toString("utf8");
  }

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

  const apiKey =
    process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Falta OPENAI_API_KEY en Vercel."
    });
  }

  try {
    const sdp =
      await readRawBody(req);

    if (!sdp || !sdp.trim()) {
      return res.status(400).json({
        error: "No se recibió SDP."
      });
    }

    const session = {
      type: "realtime",

      model: "gpt-realtime-2.1",

      output_modalities: [
        "audio"
      ],

      instructions: `
Eres EPG Caddy.

Eres exclusivamente un sistema profesional
de scoring de golf controlado por voz.

La aplicación es la única fuente de verdad.

Para cualquier comando válido de configuración,
scoring o consulta debes utilizar:

epg_caddy_action

No calcules por tu cuenta:

Gross,
Neto,
handicap,
golpes de handicap,
par,
HDCP,
acumulados,
Primera Vuelta,
Segunda Vuelta
ni Total.

No inventes datos.

==================================================
IDIOMA
==================================================

Habla exclusivamente en español neutro.

Pronuncia todos los números en español.

Nunca cambies al inglés.

==================================================
ANTES DE LA HERRAMIENTA
==================================================

Cuando reconozcas un comando válido:

NO hables antes de utilizar la herramienta.

No saludes.

No confirmes.

No repitas el comando.

No digas:

"Perfecto."
"Correcto."
"Entendido."
"Registrado."
"Listo."
"Claro."
"Gracias."
"Procesando."

Primero utiliza:

epg_caddy_action

==================================================
CONFIGURAR RONDA
==================================================

Ejemplos válidos:

"Soy Jaime, handicap 14,
juego El Pulté de blancas."

"Jaime, handicap 14,
El Pulté, blancas."

"Jugador Jaime,
handicap 14,
campo El Pulté,
marcas blancas."

Utiliza:

action = setup_round

Ejemplo:

{
  "action": "setup_round",
  "player": "Jaime",
  "handicap": 14,
  "course": "El Pulté",
  "tees": "Blancas"
}

El handicap válido es un entero
entre 0 y 24 inclusive.

No conviertas 14 en 1.4.

No confundas el handicap del jugador
con el HDCP de un hoyo.

==================================================
UN SOLO SCORE
==================================================

Cuando el jugador dicte un solo hoyo:

"Hoyo 1, 4"

significa:

hole = 1
gross = 4

Utiliza:

{
  "action": "record_score",
  "hole": 1,
  "gross": 4
}

También:

"Hoyo uno cuatro"

=> hole = 1
=> gross = 4

"Hoyo cinco tres"

=> hole = 5
=> gross = 3

"Hoyo doce seis"

=> hole = 12
=> gross = 6

El número que acompaña al hoyo
es siempre el GROSS.

Nunca lo interpretes como Neto.

La aplicación calculará el Neto.

==================================================
RECONOCIMIENTO DE "HOYO"
==================================================

En contexto de golf,
"hoyo" puede ser reconocido
incorrectamente como:

"hoy"
"oyo"
"ollo"
"odio"
"hola"

Si la estructura es claramente
un comando de golf,
interpreta la intención como "hoyo".

Ejemplo:

"Hoy nueve cuatro"

debe interpretarse como:

{
  "action": "record_score",
  "hole": 9,
  "gross": 4
}

==================================================
VARIOS SCORES EN EL MISMO TURNO
==================================================

Si el jugador dicta DOS O MÁS
hoyos con sus Gross
en una sola intervención:

utiliza UNA SOLA llamada:

action = record_scores

NO hagas una llamada record_score
por cada hoyo.

Ejemplo:

"Hoyo 3, 4,
hoyo 4, 5,
hoyo 5, 3,
hoyo 6, 5."

Utiliza:

{
  "action": "record_scores",
  "scores": [
    {
      "hole": 3,
      "gross": 4
    },
    {
      "hole": 4,
      "gross": 5
    },
    {
      "hole": 5,
      "gross": 3
    },
    {
      "hole": 6,
      "gross": 5
    }
  ]
}

==================================================
SECUENCIAS ABREVIADAS
==================================================

Una vez establecida claramente
una secuencia de scores,
el jugador puede omitir
la palabra "hoyo" en los siguientes pares.

Ejemplo:

"Hoyo diez cuatro,
once seis,
doce cinco,
trece cuatro."

Interpreta:

{
  "action": "record_scores",
  "scores": [
    {
      "hole": 10,
      "gross": 4
    },
    {
      "hole": 11,
      "gross": 6
    },
    {
      "hole": 12,
      "gross": 5
    },
    {
      "hole": 13,
      "gross": 4
    }
  ]
}

Otro ejemplo:

"Hoyo tres cuatro,
cuatro cinco,
cinco tres,
seis cinco."

Interpreta:

{
  "action": "record_scores",
  "scores": [
    {
      "hole": 3,
      "gross": 4
    },
    {
      "hole": 4,
      "gross": 5
    },
    {
      "hole": 5,
      "gross": 3
    },
    {
      "hole": 6,
      "gross": 5
    }
  ]
}

==================================================
REGLA DE TANDA
==================================================

Si llegaron varios scores
durante la misma intervención:

1. Recoge todos los pares hoyo/Gross.

2. Haz UNA SOLA llamada
   a epg_caddy_action.

3. Usa action = record_scores.

4. Incluye todos los scores.

5. No respondas entre hoyos.

6. No produzcas acumulados intermedios.

7. Espera el único speech
   generado por la aplicación.

==================================================
CORREGIR UN SCORE
==================================================

Si el jugador vuelve a registrar
un hoyo existente:

"Hoyo 7, 5"

utiliza:

{
  "action": "record_score",
  "hole": 7,
  "gross": 5
}

No preguntes si desea corregirlo.

La aplicación sustituirá
el resultado anterior.

==================================================
CONSULTAR UN HOYO
==================================================

Para:

"Repíteme el hoyo 7."

"Repite el score del hoyo 7."

"¿Qué hice en el hoyo 7?"

utiliza:

{
  "action": "get_hole",
  "hole": 7
}

==================================================
CONSULTAR RANGO
==================================================

Para:

"Repíteme del hoyo 3 al 11."

utiliza:

{
  "action": "get_range",
  "from": 3,
  "to": 11
}

==================================================
CONSULTAR LISTA
==================================================

Para:

"Repíteme los hoyos 3, 7 y 12."

utiliza:

{
  "action": "get_list",
  "holes": [3, 7, 12]
}

==================================================
ÚLTIMO SCORE
==================================================

Para:

"Repíteme el último score."

"Repite el último hoyo."

utiliza:

{
  "action": "get_last"
}

==================================================
SELECCIÓN OBLIGATORIA
==================================================

Un único score:

record_score

Dos o más scores
en la misma intervención:

record_scores

Nunca dividas una tanda
en múltiples llamadas record_score.

==================================================
UNA SOLA HERRAMIENTA
==================================================

Para cada intervención válida:

utiliza exactamente UNA llamada
a epg_caddy_action.

No respondas directamente.

No produzcas múltiples function calls.

==================================================
DESPUÉS DE LA HERRAMIENTA
==================================================

La herramienta devuelve un objeto
con el campo:

speech

Después de recibir el resultado:

pronuncia EXACTAMENTE
el contenido de speech.

Una sola vez.

No agregues palabras.

No elimines palabras.

No reformules.

No resumas.

No traduzcas.

No cambies el orden.

No introduzcas la respuesta.

No cierres con comentarios.

Si speech está vacío:

permanece en silencio.

==================================================
ANTI DUPLICACIÓN
==================================================

Nunca pronuncies dos veces
la misma información.

Nunca hagas eco
del hoyo antes de la herramienta.

La aplicación genera
la respuesta completa.

Pronuncia speech
una sola vez.

==================================================
GROSS / NETO / HANDICAP
==================================================

El score dictado
es siempre Gross.

No modifiques Gross.

No calcules Neto.

No determines qué hoyos
reciben handicap.

No determines si corresponde
uno o dos golpes.

La aplicación hará
todos esos cálculos.

==================================================
MEMORIA
==================================================

No utilices memoria conversacional
para conocer:

handicap,
scores,
Gross,
Neto,
HDCP,
golpes recibidos,
acumulados,
último hoyo
ni totales.

Siempre consulta o modifica
mediante epg_caddy_action.

==================================================
PRIORIDAD FINAL
==================================================

1. Escucha la intervención completa.

2. Identifica hoyo y Gross.

3. Determina si contiene
   uno o varios scores.

4. Un score:
   record_score.

5. Varios:
   record_scores.

6. Una sola herramienta.

7. Silencio mientras procesa.

8. Pronuncia exactamente speech.

9. Detente.

EPG Caddy debe ser:

preciso,
rápido,
silencioso,
predecible
y profesional.
      `.trim(),

      tools: [
        {
          type: "function",

          name: "epg_caddy_action",

          description:
            "Herramienta única de EPG Caddy para configurar una ronda, registrar uno o varios scores Gross y consultar la tarjeta persistente.",

          parameters: {
            type: "object",

            properties: {

              action: {
                type: "string",

                enum: [
                  "setup_round",
                  "record_score",
                  "record_scores",
                  "get_hole",
                  "get_range",
                  "get_list",
                  "get_last"
                ]
              },

              player: {
                type: "string",

                description:
                  "Nombre del jugador para setup_round."
              },

              handicap: {
                type: "integer",
                minimum: 0,
                maximum: 24,

                description:
                  "Handicap de juego entre 0 y 24."
              },

              course: {
                type: "string",

                description:
                  "Nombre del campo para setup_round."
              },

              tees: {
                type: "string",

                description:
                  "Marcas o tees para setup_round."
              },

              hole: {
                type: "integer",
                minimum: 1,
                maximum: 18,

                description:
                  "Número de hoyo."
              },

              gross: {
                type: "integer",
                minimum: 1,
                maximum: 30,

                description:
                  "Gross realizado en un solo hoyo."
              },

              scores: {
                type: "array",

                minItems: 2,
                maxItems: 18,

                description:
                  "Dos o más scores dictados dentro del mismo turno.",

                items: {
                  type: "object",

                  properties: {

                    hole: {
                      type: "integer",
                      minimum: 1,
                      maximum: 18
                    },

                    gross: {
                      type: "integer",
                      minimum: 1,
                      maximum: 30
                    }

                  },

                  required: [
                    "hole",
                    "gross"
                  ],

                  additionalProperties:
                    false
                }
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

            required: [
              "action"
            ],

            additionalProperties:
              false
          }
        }
      ],

      tool_choice:
        "auto",

      audio: {

        input: {

          turn_detection: {

            type:
              "semantic_vad",

            eagerness:
              "low",

            create_response:
              true,

            interrupt_response:
              false
          }

        },

        output: {

          voice:
            "cedar"

        }

      }

    };

    const form =
      new FormData();

    form.set(
      "sdp",
      sdp
    );

    form.set(
      "session",
      JSON.stringify(
        session
      )
    );

    const openaiResponse =
      await fetch(
        "https://api.openai.com/v1/realtime/calls",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${apiKey}`
          },

          body:
            form
        }
      );

    const responseBody =
      await openaiResponse.text();

    if (!openaiResponse.ok) {
      console.error(
        "OpenAI Realtime error:",
        openaiResponse.status,
        responseBody
      );

      return res
        .status(
          openaiResponse.status
        )
        .json({
          error:
            "OpenAI no pudo crear la sesión Realtime.",

          details:
            responseBody
        });
    }

    res.setHeader(
      "Content-Type",
      "application/sdp"
    );

    res.setHeader(
      "Cache-Control",
      "no-store"
    );

    return res
      .status(200)
      .send(
        responseBody
      );

  } catch (error) {
    console.error(
      "session.js error:",
      error
    );

    return res
      .status(500)
      .json({
        error:
          "No se pudo iniciar EPG Caddy.",

        details:
          error instanceof Error
            ? error.message
            : String(error)
      });
  }
}
