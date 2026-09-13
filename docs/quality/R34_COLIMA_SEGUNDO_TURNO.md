# R34 · ciudad solicitada y segundo turno · 2026-09-13

Base publicada verificada: e871621c2af478deed6957a625feb0e280402d68, LAB dpl_B7YWJTXJWtb51EtupWZkCJgiTk9W. Rama fix-r34-weather-second-turn. No promocionar esta rama como prueba física superada.

## Fallos reportados y causas
El propietario preguntó por Colima México; captura IMG_3623.jpeg muestra El Pulté Guatemala. La ruta directa imponía weatherOrigin y la ruta de herramienta combinaba otro nombre con coordenadas del campo. Ahora una ubicación explícita tiene prioridad; geocodificación filtra el país cuando se menciona. La resolución fallida no vuelve al campo.
Documentación del proveedor: https://open-meteo.com/en/docs/geocoding-api (countryCode y name).
El propietario reporta que la segunda pregunta no reconoció voz. finalizeBrowserVoiceFallback cerraba la captura y onended solo cambiaba el texto a LISTO. Ahora una respuesta iniciada por reconocimiento rearma la captura al finalizar; Detener cancela ese retorno. No se cambia el diseño ni los parsers/escritores de registro y scores.

## Evidencia
- test-r34-weather-location.mjs PASS: Colima México con contexto El Pulté usa lat19.24997/lon-103.72714; geocoding countryCode MX; ubicación inexistente devuelve LOCATION_REQUIRED sin forecast del campo.
- Consulta real computeWeatherForecast({location:'Colima México'}) PASS: Open-Meteo, Colima Estado de Colima México, observado 2026-09-13T08:15 America/Mexico_City, 25.1°C. Dato de prueba temporal, no pronóstico vigente permanente.
- test-r34-audio-response.mjs PASS: dos transcripciones, cierre durante reproducción, reapertura después y Detener impide reinicio. Reconocimiento simulado, no aprobación física iPhone.
- V337, V356, R32, Intocables y project-quality-gate PASS.
- Prueba de navegador de audio pendiente de compilación Preview; el navegador remoto no dispone de micrófono físico. No afirmar cierre de Safari/iPhone.

## Corrección arquitectónica posterior
Colima fue únicamente el síntoma visible. La causa de amplitud global era que la conversación WebRTC entregaba preguntas generales directamente a `gpt-realtime` y reproducía la voz `cedar`, omitiendo `api/universal-ai.js`, su contexto, herramientas y modelo general, además de omitir la ruta de voz sellada `api/voice-speech.js`.

La ruta corregida usa WebRTC exclusivamente para captura y transcripción. Toda pregunta general reconocida se entrega a `submitAiUniversalText(...,{voiceOnly:true})`, que ejecuta el motor universal, muestra la respuesta escrita y genera la respuesta hablada por la ruta sellada. El mismo track se suspende durante la reproducción y se rearma al finalizar. No existe una excepción de Colima ni una tabla de respuestas prefabricadas.

Los ajustes autorizados sí forman parte de este corte: velocidad Fish Audio `0.963` (+7% sobre 0.90), velocidad de sesión `1.2305`, VAD servidor `275 ms` y cierre conversacional del navegador `300 ms`. La identidad audible exacta continúa pendiente de la comprobación física final; el repositorio sella la ruta Fish Audio V378, sin atribuirle una aprobación auditiva inexistente.

## Validación general obligatoria
`docs/quality/UNIVERSAL_100_REFERENCE_BANK.json` contiene 100 preguntas y referencias ChatGPT, 78 categorías y siete cadenas contextuales. `scripts/run-universal-100-real.mjs` recorre audio inyectado -> transcripción -> motor universal -> texto -> voz, conserva respuestas y tiempos, y pide a un juez independiente calificaciones de comprensión, exactitud, relevancia, profundidad, claridad, continuidad y reconocimiento de incertidumbre. El umbral de entrega es transporte 100/100 y calidad mínima 90/100; mientras no exista ese resultado completo, el estado es NO APROBADO y Producción permanece intacta.

## Alcance y reversión
Cambio arquitectónico acotado a la ruta conversacional R34, sus contratos, voz/tiempos autorizados y banco de validación. Descartar rama/Preview revierte íntegramente; main y enlace habitual no se modifican mediante este corte.
