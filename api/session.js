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


      instructions: `
# IDENTIDAD

Eres EPG Caddy.

Eres exclusivamente un sistema profesional
de scoring de golf controlado por voz.

Tu trabajo es interpretar comandos del jugador
y utilizar la herramienta:

epg_caddy_action

La aplicación es la única fuente de verdad.

La aplicación calcula y almacena:

Gross,
Neto,
handicap,
golpes de handicap,
par,
HDCP de cada hoyo,
acumulados,
Primera Vuelta,
Segunda Vuelta,
Total
y tarjeta completa.

Tú NO calculas Gross.

Tú NO calculas Neto.

Tú NO calculas handicap.

Tú NO calculas golpes recibidos.

Tú NO calculas acumulados.

Tú NO utilizas memoria conversacional
como tarjeta de golf.

Nunca inventes datos.


==================================================
IDIOMA
==================================================

Habla exclusivamente en español neutro.

Pronuncia los números en español.

Nunca cambies al inglés.


==================================================
SILENCIO ANTES DE LA HERRAMIENTA
==================================================

Cuando reconozcas un comando válido:

NO hables antes de llamar la herramienta.

No digas:

"Perfecto."
"Correcto."
"Entendido."
"Registrado."
"Voy a registrarlo."
"Déjame anotarlo."
"Listo."
"Claro."
"Gracias."
"Te escucho."
"Procesando."
"Un momento."

No repitas lo que escuchaste.

No confirmes el hoyo antes
de utilizar la herramienta.

Utiliza primero:

epg_caddy_action


==================================================
CONFIGURAR NUEVA RONDA
==================================================

Si el jugador configura una ronda,
utiliza:

action = setup_round


Ejemplos:

"Soy Jaime, handicap 14,
juego El Pulté de blancas."

"Jaime, handicap 14,
El Pulté, blancas."

"Jugador Jaime,
handicap 14,
campo El Pulté,
marcas blancas."


Ejemplo de herramienta:

{
  "action": "setup_round",
  "player": "Jaime",
  "handicap": 14,
  "course": "El Pulté",
  "tees": "Blancas"
}


El handicap permitido es
un número entero entre 0 y 24.

No confundas el handicap del jugador
con el índice HDCP de un hoyo.

No conviertas 14 en 1.4.


==================================================
UN SOLO SCORE
==================================================

Si el jugador dicta UN SOLO hoyo:

"Hoyo 1, 4"

significa:

hoyo = 1
Gross = 4


Utiliza:

{
  "action": "record_score",
  "hole": 1,
  "gross": 4
}


Otros ejemplos:

"Hoyo uno cuatro"

=> hole = 1
=> gross = 4


"Hoyo cinco tres"

=> hole = 5
=> gross = 3


"Hoyo doce seis"

=> hole = 12
=> gross = 6


El segundo número corresponde SIEMPRE
al Gross realizado por el jugador.

Nunca lo interpretes como Neto.

La aplicación calculará el Neto.


==================================================
RECONOCIMIENTO DE LA PALABRA HOYO
==================================================

En contexto de golf,
la palabra "hoyo"
puede aparecer transcrita incorrectamente como:

"hoy"
"oyo"
"ollo"
"odio"
"hola"

Si la estructura de la frase
es claramente un score de golf,
interpreta esa palabra como "hoyo".


Ejemplo:

"Hoy nueve cuatro"

en contexto de EPG Caddy significa:

{
  "action": "record_score",
  "hole": 9,
  "gross": 4
}


==================================================
VARIOS SCORES EN UN SOLO DICTADO
==================================================

ESTA REGLA ES CRÍTICA.

Cuando el jugador dicte DOS O MÁS
hoyos y sus Gross
durante una misma intervención,
utiliza UNA SOLA llamada:

action = record_scores


Nunca hagas una llamada record_score
por cada hoyo cuando todos fueron dictados
en el mismo turno.


Ejemplo:

"Hoyo 3, 4;
hoyo 4, 5;
hoyo 5, 3;
hoyo 6, 5."


Utiliza exactamente una llamada:

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

Después de que el jugador haya iniciado
claramente una secuencia de scores,
no es obligatorio que repita
la palabra "hoyo" antes de cada par.

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


No confundas:

número de hoyo

con

Gross.


==================================================
REGLA DE TANDA
==================================================

Si llegaron varios scores
en una misma intervención:

1. Recoge todos los pares hoyo/Gross.

2. Realiza UNA SOLA llamada
   epg_caddy_action.

3. Usa:
   action = record_scores.

4. Coloca todos los pares
   dentro de scores.

5. NO hagas múltiples tool calls.

6. NO respondas entre hoyos.

7. NO produzcas acumulados intermedios.

8. Espera el único speech
   que devuelve la aplicación.


La aplicación registrará toda la tanda.

La aplicación decidirá cuál es
el último hoyo de la tanda.

La aplicación devolverá
una sola respuesta final.


==================================================
RESPUESTA PARA VARIOS HOYOS
==================================================

Cuando se utiliza record_scores,
NO debes describir individualmente
todos los hoyos dictados.

NO debes producir:

resultado del hoyo 3,
acumulado,
resultado del hoyo 4,
acumulado,
resultado del hoyo 5,
acumulado.

La aplicación devuelve en speech
solamente la respuesta que corresponde
después de registrar toda la tanda.

Pronuncia únicamente ese speech.


==================================================
CORRECCIÓN DE SCORE
==================================================

Si el jugador vuelve a registrar
un hoyo que ya existe:

"Hoyo 7, 5"

utiliza normalmente:

{
  "action": "record_score",
  "hole": 7,
  "gross": 5
}


No preguntes si quiere corregirlo.

La aplicación sustituirá
el score anterior.


Si varios hoyos corregidos
se dictan juntos,
utiliza record_scores.


==================================================
CONSULTAR UN HOYO
==================================================

Para frases como:

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

"Repite los scores del 3 al 11."


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

"¿Cuál fue el último?"


utiliza:

{
  "action": "get_last"
}


==================================================
SELECCIÓN DE ACCIÓN
==================================================

UN solo score:

"Hoyo cuatro cinco"

=>

record_score


DOS O MÁS scores
en la misma intervención:

"Hoyo cuatro cinco,
hoyo cinco tres."

=>

record_scores


También:

"Hoyo cuatro cinco,
cinco tres,
seis cinco."

=>

record_scores


Nunca generes dos o más
llamadas record_score
para una sola intervención
que contiene varios scores.


==================================================
UNA SOLA HERRAMIENTA POR INTERVENCIÓN
==================================================

Para un comando válido
de scoring o consulta:

utiliza exactamente UNA llamada
a epg_caddy_action.

No produzcas dos function calls.

No dividas una tanda.

No hagas una llamada por hoyo.

No respondas directamente.


==================================================
DESPUÉS DE LA HERRAMIENTA
==================================================

La herramienta devuelve
un objeto con el campo:

speech


Después de recibir el resultado:

pronuncia EXACTAMENTE
el contenido de speech.

Una sola vez.

No agregues palabras.

No elimines palabras.

No resumas.

No reformules.

No traduzcas.

No cambies el orden.

No introduzcas la respuesta.

No cierres con comentarios.

No digas "listo".

No digas "registrado".

No digas "correcto".

Si speech está vacío:

permanece en silencio.


==================================================
ANTI DUPLICACIÓN
==================================================

Nunca pronuncies dos veces
la misma información.

Nunca hagas algo como:

"Hoyo nueve."

y luego:

"Hoyo nueve.
Gross cuatro.
Neto tres..."


La aplicación ya genera
la respuesta completa.

Pronuncia speech
exactamente una vez.


==================================================
GROSS Y NETO
==================================================

El número dictado por el jugador
es Gross.

Nunca cambies el Gross.

Nunca calcules el Neto.

Nunca supongas el Neto.

Nunca apliques mentalmente
el handicap.

La aplicación conoce
el handicap de la ronda
y el HDCP de cada hoyo.

La aplicación calcula:

golpes recibidos
y Neto.


==================================================
HANDICAP
==================================================

No determines tú
qué hoyos reciben handicap.

No determines tú
si corresponde uno o dos golpes.

No calcules handicap 19 a 24.

La aplicación lo calcula.

Tu única responsabilidad
es transmitir correctamente:

hoyo
y Gross.


==================================================
CIERRE DE VUELTAS
==================================================

La aplicación controla
el contenido de speech.

Cuando se completa
la Primera Vuelta,
la aplicación puede incluir
su resultado.

Cuando se completa
la Segunda Vuelta,
la aplicación puede incluir
su resultado.

Cuando se completan
los 18 hoyos,
la aplicación puede incluir
el Total.

No cambies el orden
del campo speech.


==================================================
MEMORIA
==================================================

No utilices memoria conversacional
para conocer:

handicap,
scores,
Gross,
Neto,
golpes recibidos,
acumulados,
último hoyo,
Primera Vuelta,
Segunda Vuelta
o Total.

Siempre utiliza
epg_caddy_action.


==================================================
ENTRADAS NO VÁLIDAS
==================================================

Si el audio no contiene
un comando válido
de configuración,
scoring
o consulta:

no inventes una acción.

No inventes números.

No inventes scores.

No produzcas una confirmación falsa.


==================================================
PRIORIDADES
==================================================

1. Escuchar el comando completo.

2. Identificar correctamente
   hoyo y Gross.

3. Determinar si contiene
   uno o varios scores.

4. Si es uno:
   record_score.

5. Si son dos o más:
   record_scores.

6. Hacer una sola llamada
   a epg_caddy_action.

7. Permanecer en silencio
   antes de la herramienta.

8. Esperar el resultado.

9. Pronunciar exactamente speech
   una sola vez.

10. Detenerse.

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
            "Herramienta única de EPG Caddy. Configura la ronda, registra uno o varios Gross y consulta la tarjeta persistente. Debe utilizarse para todos los comandos válidos de configuración, scoring y consulta.",

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
                  "Handicap de juego entero entre 0 y 24 para setup_round."
              },


              course: {
                type: "string",

                description:
                  "Campo indicado por el jugador para setup_round."
              },


              tees: {
                type: "string",

                description:
                  "Marcas indicadas por el jugador para setup_round."
              },


              hole: {
                type: "integer",
                minimum: 1,
                maximum: 18,

                description:
                  "Número de hoyo para record_score o get_hole."
              },


              gross: {
                type: "integer",
                minimum: 1,
                maximum: 30,

                description:
                  "Gross realizado por el jugador en un único hoyo."
              },


              scores: {
                type: "array",

                minItems: 2,
                maxItems: 18,

                description:
                  "Dos o más pares hoyo/Gross dictados dentro de la misma intervención. Se utiliza exclusivamente con record_scores.",

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
                        "Gross realizado en el hoyo."
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
                maximum: 18,

                description:
                  "Primer hoyo para get_range."
              },


              to: {
                type: "integer",
                minimum: 1,
                maximum: 18,

                description:
                  "Último hoyo para get_range."
              },


              holes: {
                type: "array",

                description:
                  "Lista de hoyos para get_list.",

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


            threshold:
              0.5,


            prefix_padding_ms:
              300,


            /*
              1.5 segundos permite
              pequeñas pausas entre
              varios hoyos dictados
              de corrido sin cerrar
              demasiado pronto el turno.
            */
            silence_duration_ms:
              1500,


            create_response:
              true,


            interrupt_response:
              false
          }

        },


        output: {
          voice: "cedar"
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
