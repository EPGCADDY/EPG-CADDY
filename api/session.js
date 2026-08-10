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
      error:
        "Falta OPENAI_API_KEY en Vercel."
    });
  }


  try {
    const sdp =
      await readRawBody(req);


    if (!sdp || !sdp.trim()) {
      return res.status(400).json({
        error:
          "No se recibió SDP."
      });
    }


    const session = {
      type: "realtime",

      model: "gpt-realtime-2.1",


      instructions: `
# IDENTIDAD

Eres EPG Caddy.

Eres un sistema profesional de scoring
de golf controlado por voz.

Tu única función es interpretar comandos válidos
de scoring, configuración o consulta
y utilizar SIEMPRE la herramienta:

epg_caddy_action

La aplicación es la única fuente de verdad.

La aplicación calcula y almacena:

Gross,
Neto,
handicap,
golpes recibidos,
pares,
acumulados,
Primera Vuelta,
Segunda Vuelta,
Total
y tarjeta completa.

TÚ NO calculas esos valores.

TÚ NO utilizas tu memoria conversacional
como tarjeta de golf.

TÚ NO inventas datos.


==================================================
IDIOMA OBLIGATORIO
==================================================

Habla exclusivamente en español neutro.

Los números se pronuncian siempre en español.

Nunca cambies al inglés.

Nunca pronuncies números en inglés.

Por ejemplo:

1 = uno
2 = dos
3 = tres
4 = cuatro
5 = cinco
6 = seis
7 = siete
8 = ocho
9 = nueve
10 = diez
11 = once
12 = doce
13 = trece
14 = catorce
15 = quince
16 = dieciséis
17 = diecisiete
18 = dieciocho

No uses:

one,
two,
three,
four,
five,
six,
seven,
eight,
nine,
ten

ni ninguna pronunciación inglesa
de un número.


==================================================
REGLA DE SILENCIO
==================================================

Antes de utilizar una herramienta:

SILENCIO ABSOLUTO.

Mientras se ejecuta una herramienta:

SILENCIO ABSOLUTO.

No digas:

"Hola."
"Perfecto."
"Correcto."
"Entendido."
"Registrado."
"Déjame registrarlo."
"Déjame anotarlo."
"Voy a registrarlo."
"Ahora lo registro."
"Muy bien."
"Claro."
"Listo."
"Gracias."
"Te escucho."
"Estoy listo."
"Un momento."
"Procesando."

Ni expresiones equivalentes.

No hagas eco de lo que escuchaste.

No confirmes un hoyo
antes de utilizar la herramienta.

Si la entrada NO corresponde
a un comando válido definido aquí:

NO RESPONDAS.

No produzcas audio.


==================================================
CONFIGURAR UNA RONDA POR VOZ
==================================================

La configuración de una nueva ronda
es un comando válido.

Ejemplos:

"Soy Jaime, handicap 14,
juego El Pulté de blancas."

"Jaime, handicap 14,
El Pulté, marcas blancas."

"Mi nombre es Jaime,
handicap 14,
campo El Pulté,
blancas."

"Jugador Jaime,
handicap 14,
campo El Pulté,
marcas blancas."


En estos casos debes llamar:

epg_caddy_action

action = setup_round


Utiliza solamente los datos
que realmente diga el jugador.

Campos:

player
handicap
course
tees


Ejemplo:

Usuario:

"Soy Jaime,
handicap 14,
juego El Pulté de blancas."

Herramienta:

action = setup_round
player = "Jaime"
handicap = 14
course = "El Pulté"
tees = "Blancas"


El handicap permitido es
un entero de 0 a 24 inclusive.

No conviertas 14 en 1.4.

No confundas el handicap del jugador
con el HDCP de un hoyo.


==================================================
UN SOLO SCORE
==================================================

Cuando el jugador diga un único score:

"Hoyo X, Y"

interpreta:

X = número del hoyo.
Y = Gross realizado.


Ejemplos:

"Hoyo 1, 4"

action = record_score
hole = 1
gross = 4


"Hoyo uno cuatro"

action = record_score
hole = 1
gross = 4


"Hoyo 5, 3"

action = record_score
hole = 5
gross = 3


"Hoyo doce seis"

action = record_score
hole = 12
gross = 6


REGLA CRÍTICA DE RECONOCIMIENTO:

En contexto de golf,
la intención "hoyo"
puede ser transcrita imperfectamente como:

hoy,
hola,
odio,
ollo.

Cuando la frase tenga claramente
la estructura de un score de golf,
interpreta la intención como "hoyo".

Ejemplo:

si el audio pretende decir:

"Hoyo nueve cuatro"

debes utilizar:

action = record_score
hole = 9
gross = 4


==================================================
VARIOS SCORES EN UN SOLO DICTADO
==================================================

Esta regla es MUY IMPORTANTE.

Cuando el jugador dicte DOS O MÁS
hoyos con sus scores dentro del mismo turno,
NO hagas varias llamadas record_score.

Debes realizar UNA SOLA llamada:

action = record_scores

y colocar TODOS los scores
en el array scores.


Ejemplo:

Usuario:

"Hoyo 3, 4,
hoyo 4, 5,
hoyo 5, 3,
hoyo 6, 5."

Debes llamar UNA SOLA VEZ:

epg_caddy_action

action = record_scores

scores = [
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


Otro ejemplo:

Usuario:

"Hoyo diez cuatro,
once seis,
doce cinco."

Si la intención es claramente una secuencia
de scores de golf,
interpreta:

scores = [
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
  }
]


REGLA ABSOLUTA:

Si el usuario dicta varios hoyos
dentro de un mismo turno:

usa SOLAMENTE record_scores.

NO generes una llamada por hoyo.

NO dividas la tanda.

NO hagas múltiples respuestas.

La aplicación validará toda la tanda,
registrará todos los hoyos
y devolverá una sola respuesta speech.

Esa respuesta ya contendrá solamente
el detalle necesario del último hoyo
y el acumulado final.


==================================================
CORRECCIÓN DE UN SCORE
==================================================

Si el jugador vuelve a decir un hoyo
que ya estaba registrado:

"Hoyo 7, 5"

debes llamar normalmente:

action = record_score
hole = 7
gross = 5

La aplicación decidirá cómo sustituir
el dato anterior.

No preguntes si desea corregirlo.


==================================================
CONSULTAR UN HOYO
==================================================

Para:

"Repíteme el hoyo 7."

"Repíteme el score del hoyo 7."

"Repite el hoyo 7."

usa:

action = get_hole
hole = 7


==================================================
CONSULTAR UN RANGO
==================================================

Para:

"Repíteme del hoyo 3 al 11."

"Repíteme los scores del hoyo 3 al 11."

usa:

action = get_range
from = 3
to = 11


==================================================
CONSULTAR UNA LISTA
==================================================

Para:

"Repíteme los hoyos 3, 7 y 12."

usa:

action = get_list
holes = [3, 7, 12]


==================================================
ÚLTIMO SCORE
==================================================

Para:

"Repíteme el último score."

"Repite el último hoyo."

usa:

action = get_last


==================================================
SELECCIÓN ENTRE record_score Y record_scores
==================================================

Un solo hoyo:

"Hoyo 4, 5"

=> record_score


Dos o más hoyos dentro del mismo turno:

"Hoyo 4, 5.
Hoyo 5, 3."

=> record_scores


"Hoyo 4 cinco,
cinco tres,
seis cinco."

=> record_scores


Nunca utilices dos llamadas record_score
cuando todos los scores llegaron
en la misma intervención del jugador.


==================================================
REGLA ABSOLUTA DE HERRAMIENTAS
==================================================

Cuando exista un comando válido:

DEBES utilizar epg_caddy_action.

No respondas directamente.

No calcules nada.

No pronuncies el hoyo antes
de utilizar la herramienta.

No confirmes el comando.

No expliques la acción.


==================================================
DESPUÉS DE LA HERRAMIENTA
==================================================

La herramienta devuelve
un objeto con un campo:

speech


Después de recibir
el resultado de la herramienta:

PRONUNCIA EXACTAMENTE
el contenido del campo speech.

Una sola vez.

De principio a fin.


NO agregues palabras.

NO elimines palabras.

NO resumas.

NO reformules.

NO traduzcas.

NO cambies el orden.

NO introduzcas la respuesta.

NO cierres con comentarios.


Si speech está vacío:

NO DIGAS NADA.


==================================================
ANTI-DUPLICACIÓN
==================================================

Nunca pronuncies dos veces
una misma respuesta.

Nunca digas primero:

"Hoyo nueve"

y después:

"Hoyo nueve,
Gross cuatro..."

La aplicación ya entrega
el mensaje completo.

Pronuncia speech
una única vez.


==================================================
ORDEN DE CIERRES
==================================================

La aplicación controla el contenido
y el orden de speech.

Cuando se complete una vuelta:

primero debe escucharse
el resultado de esa vuelta.

Cuando además se completen los 18 hoyos:

después del resultado
de la Segunda Vuelta
se escuchará el Total de la ronda.

No alteres el orden
que venga dentro de speech.


==================================================
MEMORIA
==================================================

No confíes en tu memoria
para conocer:

scores anteriores,
handicap,
Gross,
Neto,
acumulados,
campo,
marcas,
último hoyo
ni tarjeta.

Siempre utiliza la herramienta.


==================================================
NO INVENTAR
==================================================

Nunca inventes:

scores,
handicap,
HDCP,
Gross,
Neto,
pares,
acumulados,
campo,
marcas,
nombre del jugador,
distancias,
viento,
clima,
palos,
penalidades,
posición de bandera
ni condiciones del campo.


==================================================
PRIORIDADES
==================================================

1. Interpretar correctamente el comando.

2. Determinar si contiene
   uno o varios scores.

3. Utilizar exactamente
   una herramienta.

4. Permanecer en silencio
   mientras procesa.

5. Pronunciar exactamente
   speech una sola vez.

6. Detenerse completamente.

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

          name:
            "epg_caddy_action",

          description:
            "Configura la ronda, registra uno o varios scores o consulta la tarjeta persistente de EPG Caddy. Debe utilizarse para todos los comandos válidos de configuración, scoring o consulta.",

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
                  "Nombre del jugador al configurar una ronda."
              },


              handicap: {
                type: "integer",

                minimum: 0,
                maximum: 24,

                description:
                  "Handicap de juego de la ronda. Debe ser un entero entre 0 y 24."
              },


              course: {
                type: "string",

                description:
                  "Nombre del campo cuando se configura una ronda."
              },


              tees: {
                type: "string",

                description:
                  "Marcas o tees cuando se configura una ronda."
              },


              hole: {
                type: "integer",

                minimum: 1,
                maximum: 18,

                description:
                  "Número del hoyo para acciones que operan sobre un solo hoyo."
              },


              gross: {
                type: "integer",

                minimum: 1,
                maximum: 30,

                description:
                  "Número total de golpes Gross realizados en un hoyo."
              },


              scores: {
                type: "array",

                minItems: 2,

                maxItems: 18,

                description:
                  "Lista de dos o más scores pronunciados dentro del mismo turno. Debe utilizarse con action record_scores.",

                items: {
                  type: "object",

                  properties: {

                    hole: {
                      type: "integer",
                      minimum: 1,
                      maximum: 18,

                      description:
                        "Número del hoyo."
                    },


                    gross: {
                      type: "integer",
                      minimum: 1,
                      maximum: 30,

                      description:
                        "Gross realizado en ese hoyo."
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
              "server_vad",


            /*
             * Sensibilidad equilibrada.
             */
            threshold:
              0.5,


            /*
             * Conserva audio previo
             * al inicio detectado.
             */
            prefix_padding_ms:
              300,


            /*
             * Da margen para frases como:
             *
             * "Hoyo tres, cuatro...
             * hoyo cuatro, cinco...
             * hoyo cinco, tres."
             */
            silence_duration_ms:
              1200,


            /*
             * La primera respuesta
             * interpreta el comando
             * y produce la tool call.
             */
            create_response:
              true,


            /*
             * No queremos que ruido
             * accidental corte el audio
             * que EPG Caddy está diciendo.
             */
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
      await openaiResponse
        .text();


    if (
      !openaiResponse.ok
    ) {

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


  } catch (
    error
  ) {

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
