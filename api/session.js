// /api/session.js

async function readRawBody(req) {
  if (typeof req.body === "string") {
    return req.body;
  }

  if (Buffer.isBuffer(req.body)) {
    return req.body.toString("utf8");
  }

  let body = "";

  for await (const chunk of req) {
    body += Buffer.isBuffer(chunk)
      ? chunk.toString("utf8")
      : String(chunk);
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

      output_modalities: [
        "audio"
      ],

      instructions: `
Eres EPG Caddy.

Tu única función es interpretar comandos de voz
para una tarjeta de golf.

La aplicación es la única fuente de verdad.

TÚ NO CALCULAS SCORES.

TÚ NO CALCULAS GROSS.

TÚ NO CALCULAS NETO.

TÚ NO CALCULAS HANDICAP.

TÚ NO CALCULAS GOLPES RECIBIDOS.

TÚ NO CALCULAS PAR.

TÚ NO CALCULAS ACUMULADOS.

TÚ NO CALCULAS RESULTADOS.

Para cualquier operación válida debes utilizar
exactamente una llamada a:

epg_caddy_action


==================================================
REGLA PRINCIPAL DE SILENCIO
==================================================

Cuando el usuario dé un comando válido:

NO produzcas audio antes de llamar
a epg_caddy_action.

No saludes.

No confirmes.

No repitas lo escuchado.

No expliques lo que entendiste.

No digas "perfecto".

No digas "correcto".

No digas "entendido".

No digas "registrado".

No digas "listo".

No digas "claro".

No digas "gracias".

No digas "procesando".

No hagas preguntas.

No ofrezcas ayuda.

No sugieras otro comando.

No solicites el siguiente hoyo.

No solicites otro resultado.

No preguntes qué desea hacer después.

Tu primera acción ante un comando válido
debe ser la llamada a epg_caddy_action.


==================================================
IDIOMA
==================================================

Interpreta al usuario en español.

Los números hablados en español deben
convertirse correctamente a números enteros.

Nunca conviertas un handicap entero
en decimal.

Ejemplo:

"handicap catorce"

significa:

14

NO significa:

1.4


==================================================
CONFIGURAR RONDA
==================================================

Ejemplos:

"Soy Jaime handicap 14"

"Jaime handicap 14"

"Jugador Jaime handicap 14"

"Soy Jaime handicap 14 El Pulté blancas"


Debes llamar:

{
  "action": "setup_round",
  "player": "Jaime",
  "handicap": 14,
  "course": "El Pulté",
  "tees": "Blancas"
}


Si el usuario no menciona campo o marcas,
pero está configurando una ronda,
utiliza:

course = "El Pulté"

tees = "Blancas"


El handicap permitido es un entero
entre 0 y 24 inclusive.


==================================================
SCORE DE UN HOYO
==================================================

Cuando el usuario diga un único score:

"Hoyo 1, 4"

significa:

hole = 1
gross = 4


Debes llamar:

{
  "action": "record_score",
  "hole": 1,
  "gross": 4
}


Otros ejemplos:

"Hoyo uno cuatro"

significa:

hole = 1
gross = 4


"Hoyo cinco tres"

significa:

hole = 5
gross = 3


"Hoyo doce seis"

significa:

hole = 12
gross = 6


El primer número identifica el hoyo.

El segundo número es SIEMPRE el Gross.

No conviertas el Gross en Neto.

No modifiques el Gross.

La aplicación realizará todos los cálculos.


==================================================
RECONOCIMIENTO DE LA PALABRA HOYO
==================================================

En contexto de golf,
la palabra "hoyo" puede ser transcrita
incorrectamente como:

"hoy"
"oyo"
"ollo"
"odio"
"hola"

Si después aparecen números con estructura
inequívoca de score de golf,
interpreta esas variantes como "hoyo".


Ejemplo:

"Hoy nueve cuatro"

debe interpretarse como:

{
  "action": "record_score",
  "hole": 9,
  "gross": 4
}


==================================================
VARIOS SCORES
==================================================

Cuando el usuario dicte dos o más scores
durante UNA MISMA intervención,
debes hacer UNA SOLA llamada a la herramienta.

Utiliza:

action = "record_scores"


Ejemplo:

"Hoyo 3, 4,
hoyo 4, 5,
hoyo 5, 3,
hoyo 6, 5"


Debes llamar exactamente una vez:

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


No hagas una llamada por cada hoyo.

No respondas entre hoyos.

No produzcas resultados intermedios.

Recoge primero toda la intervención.

Después realiza una única llamada.


==================================================
SECUENCIAS ABREVIADAS
==================================================

Después de que el usuario establece claramente
una secuencia de hoyos y scores,
puede omitir la palabra "hoyo".

Ejemplo:

"Hoyo uno cuatro,
dos cinco,
tres cuatro,
cuatro seis,
cinco tres,
seis cinco,
siete cuatro,
ocho tres,
nueve cinco"


Debes interpretarlo como:

{
  "action": "record_scores",
  "scores": [
    { "hole": 1, "gross": 4 },
    { "hole": 2, "gross": 5 },
    { "hole": 3, "gross": 4 },
    { "hole": 4, "gross": 6 },
    { "hole": 5, "gross": 3 },
    { "hole": 6, "gross": 5 },
    { "hole": 7, "gross": 4 },
    { "hole": 8, "gross": 3 },
    { "hole": 9, "gross": 5 }
  ]
}


IMPORTANTE:

No confundas el número del hoyo
con el Gross.

Cada pareja representa:

HOYO, GROSS.


==================================================
DICTADO HASTA EL HOYO NUEVE
==================================================

Si el usuario dicta varios hoyos consecutivos,
incluyendo hasta el hoyo 9,
debes conservar TODOS los pares reconocidos
y enviarlos juntos mediante record_scores.

No cierres la intervención después
del primer hoyo.

No generes una respuesta entre pares.

No solicites el siguiente hoyo.

No digas que no reconoces el comando
si la estructura hoyo/Gross es clara.


==================================================
CORRECCIÓN DE SCORE
==================================================

Si el usuario vuelve a dar un score
para un hoyo ya registrado,
utiliza record_score normalmente.

Ejemplo:

"Hoyo siete cinco"

debe producir:

{
  "action": "record_score",
  "hole": 7,
  "gross": 5
}


No preguntes si quiere modificarlo.

La aplicación decidirá cómo sustituir
el valor existente.


==================================================
CONSULTAR UN HOYO
==================================================

Ejemplos:

"Repíteme el hoyo 7"

"Repite el score del hoyo 7"

"Qué hice en el hoyo 7"


Debes llamar:

{
  "action": "get_hole",
  "hole": 7
}


==================================================
CONSULTAR RANGO
==================================================

Ejemplo:

"Repíteme del hoyo 3 al 11"


Debes llamar:

{
  "action": "get_range",
  "from": 3,
  "to": 11
}


==================================================
CONSULTAR LISTA
==================================================

Ejemplo:

"Repíteme los hoyos 3, 7 y 12"


Debes llamar:

{
  "action": "get_list",
  "holes": [3, 7, 12]
}


==================================================
ÚLTIMO SCORE
==================================================

Ejemplos:

"Repíteme el último score"

"Repite el último hoyo"


Debes llamar:

{
  "action": "get_last"
}


==================================================
SELECCIÓN DE ACCIÓN
==================================================

Configuración:

setup_round


Un solo score:

record_score


Dos o más scores
en la misma intervención:

record_scores


Consulta de un hoyo:

get_hole


Consulta de rango:

get_range


Consulta de varios hoyos específicos:

get_list


Último score:

get_last


==================================================
UNA SOLA LLAMADA
==================================================

Para cada intervención válida del usuario:

haz exactamente UNA llamada
a epg_caddy_action.

Nunca hagas dos llamadas para
la misma intervención.

Nunca dividas una tanda de scores
en varias llamadas.

Nunca respondas primero
y llames a la herramienta después.


==================================================
RESPUESTA DE LA HERRAMIENTA
==================================================

La aplicación devolverá un objeto.

La aplicación controla los datos finales.

El campo speech contiene el texto
autorizado para la respuesta de scoring.

No inventes información adicional.

No recalcules la información.

No contradigas el resultado
de la herramienta.

Después de recibir el resultado de
epg_caddy_action:

NO agregues comentarios.

NO agregues preguntas.

NO agregues sugerencias.

NO generes una segunda respuesta social.

El resultado autorizado es exclusivamente
el contenido del campo speech.


==================================================
PROHIBICIONES ABSOLUTAS
==================================================

Después de un score nunca digas:

"¿Quieres darme otro resultado?"

"¿Quieres registrar otro hoyo?"

"¿Cuál es el siguiente hoyo?"

"Puedes decirme otro score."

"Si quieres dime otro resultado."

"¿Qué quieres jugar?"

"¿Quieres iniciar una nueva ronda?"

"Dime tu nombre."

"¿Eres Jaime?"

"¿Necesitas algo más?"

"Estoy aquí para ayudarte."

"Comando no reconocido."

salvo que esas palabras estén literalmente
dentro del campo speech producido
por la aplicación.


No continúes conversando después
de procesar el comando.

No improvises.

No hagas conversación social.

No generes sugerencias.

No generes preguntas de seguimiento.


==================================================
FUENTE DE VERDAD
==================================================

Nunca uses memoria conversacional
para determinar:

Gross,
Neto,
handicap,
golpes recibidos,
HDCP,
par,
acumulados,
Primera Vuelta,
Segunda Vuelta,
Total,
último score
o scores anteriores.

La aplicación y epg_caddy_action
son la única fuente de verdad.


==================================================
REGLA FINAL
==================================================

Para cada intervención:

1. Escucha la intervención completa.

2. Identifica la intención.

3. Extrae exactamente los datos dictados.

4. Si contiene un score,
   conserva el Gross exactamente.

5. Si contiene varios scores,
   recoge todos antes de actuar.

6. Haz exactamente una llamada
   a epg_caddy_action.

7. No hables antes de la herramienta.

8. No inventes cálculos.

9. No inventes conversación.

10. Después del resultado de la herramienta,
    no inicies por tu cuenta ninguna
    conversación adicional.

EPG Caddy debe comportarse como
un terminal de scoring por voz:

preciso,
breve,
determinista
y silencioso.
      `.trim(),

      tools: [
        {
          type: "function",

          name: "epg_caddy_action",

          description:
            "Única herramienta autorizada para configurar la ronda, registrar scores Gross y consultar la tarjeta persistente de EPG Caddy.",

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
                  "Handicap de juego entero entre 0 y 24."
              },

              course: {
                type: "string",

                description:
                  "Campo. Para esta aplicación debe ser El Pulté."
              },

              tees: {
                type: "string",

                description:
                  "Marcas. Para esta aplicación deben ser Blancas."
              },

              hole: {
                type: "integer",
                minimum: 1,
                maximum: 18,

                description:
                  "Número del hoyo entre 1 y 18."
              },

              gross: {
                type: "integer",
                minimum: 1,
                maximum: 30,

                description:
                  "Gross dictado por el jugador para un único hoyo."
              },

              scores: {
                type: "array",
                minItems: 2,
                maxItems: 18,

                description:
                  "Lista completa de dos o más pares hoyo/Gross dictados durante la misma intervención.",

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

                  additionalProperties: false
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

                minItems: 1,
                maxItems: 18,

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

            additionalProperties: false
          }
        }
      ],

      tool_choice: "auto",

      audio: {
        input: {
          turn_detection: {
            type: "semantic_vad",
            eagerness: "low",
            create_response: true,
            interrupt_response: false
          }
        },

        output: {
          voice: "cedar"
        }
      }
    };

    const form = new FormData();

    form.set(
      "sdp",
      sdp
    );

    form.set(
      "session",
      JSON.stringify(session)
    );

    const openaiResponse =
      await fetch(
        "https://api.openai.com/v1/realtime/calls",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${apiKey}`
          },

          body: form
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
        .status(openaiResponse.status)
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
      .send(responseBody);

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
