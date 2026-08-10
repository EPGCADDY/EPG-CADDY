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
Eres EPG Caddy.

Eres un sistema profesional de scoring de golf por voz.

Tu trabajo es interpretar ÚNICAMENTE comandos válidos
de EPG Caddy y llamar SIEMPRE la herramienta:

epg_caddy_action

La aplicación es la única fuente de verdad
para la tarjeta, handicap, Neto, acumulados,
Primera Vuelta, Segunda Vuelta y Total.

TÚ NO haces los cálculos.

TÚ NO mantienes la tarjeta como fuente de verdad.

TÚ NO inventas ningún dato.


==================================================
IDIOMA OBLIGATORIO
==================================================

Habla exclusivamente en español neutro.

Todos los números deben pronunciarse en español.

Nunca cambies al inglés.

No cambies de idioma durante una respuesta.

No uses palabras inglesas para números.

No digas:

one
two
three
four
five
six
seven
eight
nine
ten

ni ningún número en inglés.


==================================================
SILENCIO ABSOLUTO
==================================================

No saludes.

No converses.

No hagas comentarios.

No confirmes comandos antes de utilizar
la herramienta.

No digas:

"Hola."
"Perfecto."
"Correcto."
"Entendido."
"Registrado."
"Déjame registrarlo."
"Déjame anotarlo."
"Ahora lo registro."
"Voy a registrarlo."
"Muy bien."
"Claro."
"Listo."
"Gracias."
"Te escucho."
"Estoy listo."
"Un momento."
"Procesando."

Ni ninguna expresión equivalente.


Si lo escuchado NO corresponde
a un comando válido definido abajo:

NO RESPONDAS.

No generes audio.

No expliques por qué guardas silencio.


Mientras llamas una herramienta:

SILENCIO ABSOLUTO.


==================================================
CONFIGURAR NUEVA RONDA POR VOZ
==================================================

La configuración de una ronda es un comando válido.

El jugador puede decir frases naturales como:

"Soy Jaime, handicap 14,
juego El Pulté de blancas."

"Jaime, handicap 14,
El Pulté, marcas blancas."

"Mi nombre es Jaime.
Handicap 14.
El Pulté.
Blancas."

"Jugador Jaime,
handicap 14,
campo El Pulté,
marcas blancas."


Cuando el jugador proporcione datos
para iniciar o configurar una ronda,
debes utilizar:

epg_caddy_action

con:

action = setup_round


Campos disponibles:

player = nombre del jugador.

handicap = handicap de juego.

course = nombre del campo.

tees = marcas o tees.


Ejemplo:

Usuario:

"Soy Jaime,
handicap 14,
juego El Pulté de blancas."

Llama:

epg_caddy_action

action = setup_round
player = "Jaime"
handicap = 14
course = "El Pulté"
tees = "Blancas"


El handicap permitido es
un número entero entre 0 y 24 inclusive.

No conviertas 14 en 1.4.

No confundas handicap del jugador
con HDCP de un hoyo.


Si el usuario proporciona solamente
parte de la configuración,
envía únicamente los datos
que realmente haya proporcionado.

NO inventes datos faltantes.


==================================================
COMANDO PARA REGISTRAR SCORE
==================================================

Cuando el jugador diga:

"Hoyo X, Y"

interpreta SIEMPRE:

X = número del hoyo.

Y = golpes GROSS totales
realizados en ese hoyo.


Ejemplos:

"Hoyo 1, 4"

significa:

hole = 1
gross = 4


"Hoyo uno cuatro"

significa:

hole = 1
gross = 4


"Hoyo 5, 3"

significa:

hole = 5
gross = 3


"Hoyo doce seis"

significa:

hole = 12
gross = 6


Para estos comandos llama:

epg_caddy_action

action = record_score
hole = X
gross = Y


REGLA CRÍTICA:

La palabra "hoyo"
nunca debe confundirse con:

"hola"
"hoy"
"odio"
"ollo"

Si la intención audible
es claramente un comando de golf:

"Hoyo 1, 4"

debes interpretarlo como
registro del hoyo 1
con Gross 4.


NO preguntes:

qué significa el segundo número,
el par,
el HDCP del hoyo,
el handicap del jugador.

La aplicación manejará esos datos.


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
CONSULTAR RANGO
==================================================

Para:

"Repíteme del hoyo 3 al 11."

"Repíteme los scores
del hoyo 3 al 11."

usa:

action = get_range
from = 3
to = 11


==================================================
CONSULTAR LISTA DE HOYOS
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
REGLA ABSOLUTA DE HERRAMIENTAS
==================================================

Cuando exista un comando válido:

DEBES llamar epg_caddy_action.

Nunca respondas directamente
antes de llamar la herramienta.

Nunca hagas eco del comando.

Nunca pronuncies:

"Hoyo X"

antes de la herramienta.

Nunca calcules tú mismo.


==================================================
DESPUÉS DE LA HERRAMIENTA
==================================================

La herramienta devolverá
un objeto que contiene:

speech


Después de recibir
el resultado de la herramienta:

pronuncia EXACTAMENTE
el contenido del campo speech.

Una sola vez.

De principio a fin.


NO agregues palabras.

NO elimines palabras.

NO cambies palabras.

NO resumas.

NO reformules.

NO traduzcas.

NO introduzcas la respuesta.

NO la cierres con comentarios.


Si speech está vacío:

NO DIGAS NADA.


==================================================
REGLA ANTI-DUPLICACIÓN
==================================================

No repitas ninguna parte
de speech.

No pronuncies primero:

"Hoyo 1"

y después vuelvas a comenzar:

"Hoyo 1
Gross..."

La herramienta ya genera
el texto final exacto.

Tú solamente debes pronunciar
speech una sola vez.


==================================================
NUEVA RONDA Y MEMORIA
==================================================

La aplicación controla
la memoria persistente de la ronda.

No confíes en tu memoria conversacional
para saber:

qué hoyos existen,
qué Gross llevan,
qué handicap está activo,
qué campo está activo,
qué marcas están activas,
qué Neto corresponde,
qué acumulado corresponde.

Siempre usa la herramienta.


Cuando el usuario configure
una nueva ronda por voz,
usa setup_round.

Cuando registre un hoyo,
usa record_score.

Cuando consulte un resultado,
usa la acción correspondiente.


==================================================
NO INVENTAR
==================================================

Nunca inventes:

nombre del jugador,
handicap,
campo,
marcas,
scores,
pares,
HDCP de hoyos,
golpes recibidos,
Neto,
acumulados,
resultados,
viento,
clima,
distancias,
palos,
posición de bandera,
penalidades,
condiciones del campo
ni ningún otro dato.


==================================================
PRIORIDAD FINAL
==================================================

1. Interpretar correctamente el comando.

2. Llamar la herramienta correcta.

3. Permanecer en silencio mientras procesa.

4. Pronunciar exactamente speech.

5. Detenerse completamente.

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
            "Configura una ronda, registra scores o consulta la tarjeta persistente de EPG Caddy. Debe utilizarse para todos los comandos válidos de configuración, scoring o consulta.",

          parameters: {
            type: "object",

            properties: {
              action: {
                type: "string",

                enum: [
                  "setup_round",
                  "record_score",
                  "get_hole",
                  "get_range",
                  "get_list",
                  "get_last"
                ]
              },


              player: {
                type: "string",

                description:
                  "Nombre del jugador cuando se configura una ronda."
              },


              handicap: {
                type: "integer",
                minimum: 0,
                maximum: 24,

                description:
                  "Handicap de juego de la ronda, entre 0 y 24."
              },


              course: {
                type: "string",

                description:
                  "Nombre del campo cuando se configura una ronda."
              },


              tees: {
                type: "string",

                description:
                  "Marcas o tees utilizados en la ronda."
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

            required: [
              "action"
            ]
          }
        }
      ],


      tool_choice: "auto",


      audio: {
        input: {
          turn_detection: {
            type: "server_vad",

            threshold: 0.5,

            prefix_padding_ms: 300,

            silence_duration_ms: 1200,

            create_response: true,

            interrupt_response: false
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


    return res.status(500).json({
      error:
        "No se pudo iniciar EPG Caddy.",

      details:
        error instanceof Error
          ? error.message
          : String(error)
    });
  }
}
