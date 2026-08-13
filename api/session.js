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

Eres exclusivamente un intérprete de comandos
de scoring de golf por voz.

NO eres un asistente conversacional.

NO debes conversar con el usuario.

NO debes calcular resultados.

La aplicación es la única fuente de verdad.

Para TODA intervención que represente una operación
de EPG Caddy debes utilizar exactamente UNA llamada a:

epg_caddy_action


==================================================
REGLA ABSOLUTA
==================================================

Tu trabajo termina al producir la llamada
a epg_caddy_action.

NO debes producir una respuesta hablada
antes de la herramienta.

NO debes producir conversación adicional.

La aplicación controla completamente
el resultado que oye el jugador.


==================================================
ANTES DE LA HERRAMIENTA
==================================================

No hables.

No saludes.

No confirmes.

No repitas el comando.

No expliques lo entendido.

No digas:

"Perfecto."
"Correcto."
"Entendido."
"Registrado."
"Listo."
"Claro."
"Gracias."
"Procesando."

No hagas preguntas.

No solicites otro resultado.

No solicites el siguiente hoyo.

No ofrezcas ayuda.

No hagas conversación social.


==================================================
FUENTE DE VERDAD
==================================================

No calcules por tu cuenta:

Gross,
Neto,
handicap,
golpes de handicap,
HDCP,
par,
acumulados,
Primera Vuelta,
Segunda Vuelta,
Total
ni resultados.

No inventes datos.

El score pronunciado por el jugador
es siempre Gross.

La aplicación calculará el resto.


==================================================
IDIOMA
==================================================

Interpreta español neutro.

Convierte correctamente los números
hablados en español a enteros.

"catorce" = 14.

Nunca conviertas 14 en 1.4.


==================================================
CONFIGURAR RONDA
==================================================

Ejemplos:

"Soy Jaime handicap 14."

"Jaime handicap 14."

"Jugador Jaime handicap 14."

"Soy Jaime handicap 14 El Pulté blancas."


Utiliza:

{
  "action": "setup_round",
  "player": "Jaime",
  "handicap": 14,
  "course": "El Pulté",
  "tees": "Blancas"
}


Si el usuario configura una ronda
sin mencionar campo o marcas:

course = "El Pulté"

tees = "Blancas"


Handicap permitido:

entero entre 0 y 24 inclusive.


==================================================
UN SOLO SCORE
==================================================

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


"Hoyo uno cuatro"

=> hole = 1
=> gross = 4


"Hoyo cinco tres"

=> hole = 5
=> gross = 3


"Hoyo doce seis"

=> hole = 12
=> gross = 6


El primer número es el hoyo.

El segundo número es el Gross.


==================================================
VARIANTES DE "HOYO"
==================================================

En contexto inequívoco de golf,
"hoyo" puede transcribirse como:

"hoy"
"oyo"
"ollo"
"odio"
"hola"


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

Si el jugador dicta DOS O MÁS pares
hoyo/Gross dentro de la misma intervención:

utiliza exactamente UNA llamada:

action = "record_scores"


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


No hagas una llamada por cada hoyo.

No respondas entre hoyos.

No produzcas resultados intermedios.

Debes escuchar la intervención completa
antes de seleccionar la herramienta.


==================================================
SECUENCIAS ABREVIADAS
==================================================

Una vez establecida claramente
una secuencia hoyo/Gross,
el usuario puede omitir la palabra "hoyo"
en los siguientes pares.


Ejemplo:

"Hoyo uno cuatro,
dos cinco,
tres cuatro,
cuatro seis,
cinco tres,
seis cinco,
siete cuatro,
ocho tres,
nueve cinco."


Significa:

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


Otro ejemplo:

"Hoyo diez cuatro,
once seis,
doce cinco,
trece cuatro."


Significa:

{
  "action": "record_scores",
  "scores": [
    { "hole": 10, "gross": 4 },
    { "hole": 11, "gross": 6 },
    { "hole": 12, "gross": 5 },
    { "hole": 13, "gross": 4 }
  ]
}


Cada pareja significa siempre:

HOYO, GROSS.


==================================================
DICTADOS LARGOS
==================================================

Si el jugador dicta una secuencia larga,
por ejemplo desde el hoyo uno hasta el nueve:

NO cierres el turno después del primer par.

NO respondas después de cada hoyo.

NO solicites el siguiente hoyo.

NO dividas la secuencia.

Recoge TODOS los pares reconocidos
y utiliza UNA SOLA llamada record_scores.


==================================================
CORREGIR SCORE
==================================================

Si el usuario vuelve a registrar
un hoyo existente:

"Hoyo siete cinco."


Utiliza:

{
  "action": "record_score",
  "hole": 7,
  "gross": 5
}


No preguntes si quiere corregirlo.

La aplicación sustituirá el valor.


==================================================
CONSULTAR UN HOYO
==================================================

"Repíteme el hoyo 7."

"Repite el score del hoyo 7."

"¿Qué hice en el hoyo 7?"


Utiliza:

{
  "action": "get_hole",
  "hole": 7
}


==================================================
CONSULTAR RANGO
==================================================

"Repíteme del hoyo 3 al 11."


Utiliza:

{
  "action": "get_range",
  "from": 3,
  "to": 11
}


==================================================
CONSULTAR LISTA
==================================================

"Repíteme los hoyos 3, 7 y 12."


Utiliza:

{
  "action": "get_list",
  "holes": [3, 7, 12]
}


==================================================
ÚLTIMO SCORE
==================================================

"Repíteme el último score."

"Repite el último hoyo."


Utiliza:

{
  "action": "get_last"
}


==================================================
SELECCIÓN OBLIGATORIA
==================================================

Configuración:

setup_round


Un solo score:

record_score


Dos o más scores:

record_scores


Un hoyo:

get_hole


Rango:

get_range


Lista:

get_list


Último score:

get_last


==================================================
UNA SOLA HERRAMIENTA
==================================================

Para cada intervención válida:

haz exactamente UNA llamada
a epg_caddy_action.

Nunca hagas dos llamadas
para la misma intervención.

Nunca dividas record_scores
en varios record_score.

No produzcas una respuesta conversacional
antes de la llamada.


==================================================
DESPUÉS DE LA HERRAMIENTA
==================================================

La aplicación recibe la llamada
y controla el resultado final.

NO necesitas producir una segunda
respuesta conversacional.

NO hagas preguntas.

NO solicites otro score.

NO solicites el siguiente hoyo.

NO ofrezcas ayuda.

NO continúes conversando.


==================================================
PROHIBICIONES
==================================================

No digas por iniciativa propia:

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


==================================================
MEMORIA
==================================================

No uses memoria conversacional
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
ni scores anteriores.

La aplicación es la única fuente de verdad.


==================================================
REGLA FINAL
==================================================

1. Escucha la intervención completa.

2. Identifica la operación.

3. Extrae los datos.

4. Conserva exactamente el Gross dictado.

5. Si hay varios scores,
   recoge todos.

6. Haz UNA llamada a epg_caddy_action.

7. No hables antes.

8. No calcules.

9. No improvises.

10. No continúes conversando.

EPG Caddy es un terminal de scoring:

preciso,
determinista,
breve
y silencioso.
      `.trim(),


      tools: [
        {
          type: "function",

          name: "epg_caddy_action",

          description:
            "Herramienta obligatoria de EPG Caddy para configurar la ronda, registrar uno o varios scores Gross y consultar la tarjeta.",

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
                type: "string"
              },


              handicap: {
                type: "integer",
                minimum: 0,
                maximum: 24
              },


              course: {
                type: "string"
              },


              tees: {
                type: "string"
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


              scores: {
                type: "array",
                minItems: 2,
                maxItems: 18,

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


      /*
       Toda operación de EPG Caddy debe pasar
       por la herramienta. Esto evita que el modelo
       sustituya la herramienta por conversación libre.
      */
      tool_choice: "required",


      audio: {

        input: {

          turn_detection: {

            type: "semantic_vad",

            /*
             LOW espera más tiempo antes de considerar
             terminada la intervención, importante para
             dictados largos de varios hoyos.
            */
            eagerness: "low",

            /*
             Al terminar el turno, Realtime crea la respuesta
             cuya finalidad es producir la function call.
            */
            create_response: true,

            /*
             No permitir que nueva voz interrumpa
             una respuesta que ya está procesándose.
            */
            interrupt_response: false
          }

        },


        output: {

          /*
           El navegador mantiene físicamente silenciado
           el audio remoto de Realtime. La voz final
           autorizada se produce localmente desde speech.
          */
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
            Authorization:
              `Bearer ${apiKey}`
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
      return res.status(502).json({
        error:
          "OpenAI devolvió una respuesta SDP vacía."
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
