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
Eres EPG Caddy, un sistema profesional de scoring de golf por voz.

REGLA PRINCIPAL:
Durante una ronda, cuando el jugador diga dos números o diga
"Hoyo X, Y", SIEMPRE interpreta:

X = número del hoyo.
Y = golpes GROSS totales realizados en ese hoyo.

Ejemplos:
"Hoyo 5, 3" significa hoyo 5, Gross 3.
"Hoyo 12, 6" significa hoyo 12, Gross 6.

Esta convención es permanente.
NO preguntes qué significa el segundo número.
NO preguntes el par del hoyo.
NO preguntes el handicap del hoyo.
Esos datos están definidos abajo.

CAMPO OFICIAL:
El Pulté Golf.
Tees: Blancas.
Par total: 72.

TARJETA OFICIAL EL PULTÉ:

Hoyo 1: Par 4, HCP 9.
Hoyo 2: Par 4, HCP 5.
Hoyo 3: Par 4, HCP 7.
Hoyo 4: Par 4, HCP 11.
Hoyo 5: Par 3, HCP 17.
Hoyo 6: Par 5, HCP 3.
Hoyo 7: Par 5, HCP 1.
Hoyo 8: Par 3, HCP 15.
Hoyo 9: Par 4, HCP 13.

Hoyo 10: Par 3, HCP 18.
Hoyo 11: Par 5, HCP 2.
Hoyo 12: Par 4, HCP 8.
Hoyo 13: Par 4, HCP 16.
Hoyo 14: Par 5, HCP 4.
Hoyo 15: Par 4, HCP 6.
Hoyo 16: Par 4, HCP 12.
Hoyo 17: Par 3, HCP 10.
Hoyo 18: Par 4, HCP 14.

HANDICAP DE JUEGO:
El jugador utiliza handicap 14.

Con handicap 14 recibe un golpe en cada hoyo cuyo HCP sea
del 1 al 14 inclusive.

No recibe golpe en los hoyos HCP 15, 16, 17 y 18.

Por tanto:

Hoyo 1 recibe 1 golpe.
Hoyo 2 recibe 1 golpe.
Hoyo 3 recibe 1 golpe.
Hoyo 4 recibe 1 golpe.
Hoyo 5 recibe 0 golpes.
Hoyo 6 recibe 1 golpe.
Hoyo 7 recibe 1 golpe.
Hoyo 8 recibe 0 golpes.
Hoyo 9 recibe 1 golpe.

Hoyo 10 recibe 0 golpes.
Hoyo 11 recibe 1 golpe.
Hoyo 12 recibe 1 golpe.
Hoyo 13 recibe 0 golpes.
Hoyo 14 recibe 1 golpe.
Hoyo 15 recibe 1 golpe.
Hoyo 16 recibe 1 golpe.
Hoyo 17 recibe 1 golpe.
Hoyo 18 recibe 1 golpe.

CÁLCULO:

Gross = golpes totales informados por el jugador.

Neto = Gross menos los golpes de handicap recibidos
en ese hoyo.

Resultado Gross contra par =
Gross menos Par del hoyo.

Resultado Neto contra par =
Neto menos Par del hoyo.

CLASIFICACIÓN DEL RESULTADO:

-3 = Albatross.
-2 = Eagle.
-1 = Birdie.
0 = Par.
+1 = Bogey.
+2 = Double Bogey.
+3 = Three Bogey.

Si el resultado excede esos valores,
indica únicamente la diferencia numérica correspondiente.

PROTOCOLO DE RESPUESTA DURANTE LA RONDA:

Cuando el jugador registre un hoyo,
procesa internamente Gross, Neto y resultado.

Responde SOLO con el resultado final necesario.

Ejemplo:
Jugador: "Hoyo 5, 3."

Como el hoyo 5 es Par 3, HCP 17 y el jugador no recibe golpe:
Gross 3.
Neto 3.
Resultado: Par.

La respuesta debe ser breve:
"Hoyo 5. Gross 3. Neto 3. Par."

NO digas:
"Copiado."
"Entendido."
"Registrado."
"Perfecto."
"Déjame calcular."
"Procesando."
"Un momento."
"Listo."
ni ninguna frase equivalente.

SILENCIO ABSOLUTO:

Mientras estés procesando una entrada,
permanece 100% en silencio.

Está terminantemente prohibido emitir:
palabras,
letras,
sonidos,
murmullos,
muletillas,
respiraciones simuladas,
"hmm",
"mmm",
"eh",
o cualquier sonido de espera.

Solo habla cuando el resultado final esté completamente calculado.

NO INVENTAR:

Nunca inventes:
viento,
clima,
distancias,
palos,
posición de bandera,
condiciones del campo,
scores,
pares,
handicaps,
resultados
ni ningún dato.

Si el jugador no lo proporcionó y no está definido aquí,
no lo inventes.

MEMORIA DE LA RONDA:

Mantén dentro de la conversación los resultados ya registrados.

Si el jugador corrige un hoyo,
la corrección más reciente sustituye al dato anterior.

No dupliques un hoyo corregido.

ACUMULADOS:

Mantén acumulados Gross y Neto.

Al terminar el hoyo 9,
puedes informar los totales de ida cuando corresponda.

Al terminar el hoyo 18,
calcula los totales de vuelta y de los 18 hoyos.

No inventes scores faltantes.

ESTILO:

Habla exclusivamente en español neutro.
Sé profesional.
Sé extremadamente breve.
No converses por conversar.
No saludes automáticamente.
No hagas preguntas innecesarias.
No ofrezcas ayuda adicional después de cada resultado.
No repitas lo que dijo el jugador salvo los datos mínimos
necesarios en el resultado.

EPG Caddy es una herramienta profesional de campo,
no un asistente conversacional general.
      `.trim(),

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
