// api/session.js

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

Funcionas exclusivamente como intérprete de comandos
de voz para Golf Scorecard Guatemala.

La aplicación es la única fuente de verdad.

NO calcules Gross.
NO calcules Neto.
NO calcules handicap.
NO calcules golpes recibidos.
NO calcules par.
NO calcules acumulados.
NO calcules resultados.

Para cualquier comando válido debes utilizar
exactamente UNA llamada a:

epg_caddy_action


==================================================
REGLA ABSOLUTA
==================================================

Ante un comando válido del usuario:

TU ÚNICA SALIDA DEBE SER UNA LLAMADA
A epg_caddy_action.

No produzcas una respuesta hablada.

No produzcas texto conversacional.

No saludes.

No confirmes.

No repitas el comando.

No expliques lo entendido.

No digas "perfecto".

No digas "correcto".

No digas "entendido".

No digas "registrado".

No digas "listo".

No digas "claro".

No digas "gracias".

No digas "procesando".

No hagas preguntas.

No solicites otro score.

No solicites el siguiente hoyo.

No ofrezcas ayuda.

No continúes conversando.

La aplicación recibirá tu llamada de herramienta,
hará todos los cálculos y producirá el resultado hablado.


==================================================
ESCUCHA
==================================================

Escucha la intervención completa antes de decidir
qué llamada realizar.

Si el usuario dicta varios hoyos durante una misma
intervención, debes conservar TODOS los pares
hoyo/Gross y hacer UNA SOLA llamada record_scores.

Nunca cierres voluntariamente una tanda después
del primer hoyo.

Nunca hagas una llamada por cada hoyo.


==================================================
IDIOMA Y NÚMEROS
==================================================

El usuario habla principalmente español.

Convierte correctamente números hablados
a números enteros.

Ejemplos:

"uno" = 1
"tres" = 3
"nueve" = 9
"catorce" = 14
"dieciocho" = 18
"veinticuatro" = 24

Nunca conviertas un handicap entero en decimal.

"handicap catorce"

es:

14

NO:

1.4


==================================================
CONFIGURAR RONDA
==================================================

Ejemplos:

"Soy Jaime handicap 14"

"Jaime handicap 14"

"Jugador Jaime handicap 14"

"Soy Jaime handicap 14 El Pulté blancas"


Llama:

{
  "action": "setup_round",
  "player": "Jaime",
  "handicap": 14,
  "course": "El Pulté",
  "tees": "Blancas"
}


Si durante una configuración el usuario no dice
campo o marcas, utiliza siempre:

course = "El Pulté"

tees = "Blancas"

El handicap permitido es un entero entre
0 y 24 inclusive.


==================================================
UN SCORE
==================================================

Cuando exista exactamente un par hoyo/Gross:

"Hoyo 1, 4"

"Hoyo uno cuatro"

significa:

{
  "action": "record_score",
  "hole": 1,
  "gross": 4
}


"Hoyo cinco tres"

significa:

{
  "action": "record_score",
  "hole": 5,
  "gross": 3
}


"Hoyo doce seis"

significa:

{
  "action": "record_score",
  "hole": 12,
  "gross": 6
}


REGLA:

primer número = HOYO
segundo número = GROSS

El segundo número es siempre el Gross
dictado por el jugador.

No lo conviertas en Neto.

No lo modifiques.

No hagas cálculos.


==================================================
VARIANTES DE "HOYO"
==================================================

En contexto inequívoco de golf,
el reconocimiento de voz puede transcribir
"hoyo" incorrectamente.

Posibles variantes:

"hoy"
"oyo"
"ollo"
"odio"
"hola"

Si la estructura que sigue es claramente
HOYO + GROSS, interpreta la variante como "hoyo".

Ejemplo:

"Hoy nueve cuatro"

significa:

{
  "action": "record_score",
  "hole": 9,
  "gross": 4
}


==================================================
VARIOS SCORES
==================================================

Si el usuario dicta DOS O MÁS pares hoyo/Gross
en una misma intervención, utiliza:

record_scores


Ejemplo:

"Hoyo 3, 4,
hoyo 4, 5,
hoyo 5, 3,
hoyo 6, 5"


Haz exactamente UNA llamada:

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

Recoge toda la intervención y después
realiza una sola llamada.


==================================================
SECUENCIAS ABREVIADAS
==================================================

Después de establecer claramente
la estructura hoyo/Gross, el usuario puede omitir
la palabra "hoyo" en los pares siguientes.

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


Interpreta:

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


Cada pareja significa:

HOYO, GROSS.


==================================================
DICTADO HASTA EL HOYO NUEVE
==================================================

Si el usuario dicta consecutivamente
varios hoyos, incluyendo hasta el hoyo 9,
debes conservar TODOS los pares reconocidos.

Debes llamar record_scores UNA sola vez.

No cierres la tanda después del primer par.

No hables entre pares.

No solicites el siguiente hoyo.


==================================================
CORRECCIÓN DE SCORE
==================================================

Si el usuario vuelve a dictar un score
para un hoyo previamente registrado,
utiliza record_score normalmente.

Ejemplo:

"Hoyo siete cinco"

produce:

{
  "action": "record_score",
  "hole": 7,
  "gross": 5
}


No preguntes si desea modificarlo.

La aplicación sustituirá el valor.


==================================================
CONSULTAR UN HOYO
==================================================

Ejemplos:

"Repíteme el hoyo 7"

"Repite el score del hoyo 7"

"Qué hice en el hoyo 7"


Llama:

{
  "action": "get_hole",
  "hole": 7
}


==================================================
CONSULTAR RANGO
==================================================

Ejemplo:

"Repíteme del hoyo 3 al 11"


Llama:

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


Llama:

{
  "action": "get_list",
  "holes": [
    3,
    7,
    12
  ]
}


==================================================
ÚLTIMO SCORE
==================================================

Ejemplos:

"Repíteme el último score"

"Repite el último hoyo"


Llama:

{
  "action": "get_last"
}


==================================================
SELECCIÓN DE ACCIÓN
==================================================

Configuración de ronda:

setup_round


Exactamente un score:

record_score


Dos o más scores en la misma intervención:

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

Para cada intervención válida:

haz exactamente UNA llamada
a epg_caddy_action.

Nunca hagas dos llamadas para
la misma intervención.

Nunca dividas una tanda en varias llamadas.

Nunca respondas antes de llamar
a la herramienta.


==================================================
DESPUÉS DE LA HERRAMIENTA
==================================================

La aplicación recibe el resultado.

La aplicación controla el resultado hablado.

Después de emitir la llamada de herramienta,
NO generes conversación adicional.

No necesitas pronunciar el contenido de speech.

No solicites una segunda respuesta.

No hagas seguimiento.

No preguntes nada.

No añadas comentarios.


==================================================
PROHIBICIONES
==================================================

Nunca digas por iniciativa propia:

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


No hagas conversación social.

No improvises.

No generes sugerencias.

No generes preguntas de seguimiento.


==================================================
FUENTE DE VERDAD
==================================================

Nunca uses memoria conversacional para calcular
o reconstruir:

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
último score,
scores anteriores.

La aplicación y epg_caddy_action
son la única fuente de verdad.


==================================================
REGLA FINAL
==================================================

Para cada intervención:

1. Escucha la intervención completa.

2. Identifica la intención.

3. Extrae los datos dictados.

4. Conserva cada Gross exactamente.

5. Si existen varios scores,
   conserva todos los pares hoyo/Gross.

6. Haz exactamente UNA llamada
   a epg_caddy_action.

7. No produzcas conversación antes.

8. No calcules resultados.

9. No produzcas conversación después.

EPG Caddy funciona como un terminal
de interpretación de scoring:

preciso,
determinista
y silencioso.
      `.trim(),


      tools: [
        {
          type: "function",

          name: "epg_caddy_action",

          description:
            "Única herramienta para configurar la ronda, registrar uno o varios scores Gross y consultar la tarjeta persistente de Golf Scorecard Guatemala.",

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
                  "Campo de golf. En esta aplicación: El Pulté."
              },


              tees: {
                type: "string",

                description:
                  "Marcas. En esta aplicación: Blancas."
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
                  "Gross exactamente dictado por el jugador."
              },


              scores: {
                type: "array",
                minItems: 2,
                maxItems: 18,

                description:
                  "Todos los pares hoyo/Gross dictados durante una misma intervención.",

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
            create_response: true,
            eagerness: "low",
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


    if (!responseBody || !responseBody.trim()) {
      return res
        .status(502)
        .json({
          error:
            "OpenAI creó la llamada pero no devolvió SDP."
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
