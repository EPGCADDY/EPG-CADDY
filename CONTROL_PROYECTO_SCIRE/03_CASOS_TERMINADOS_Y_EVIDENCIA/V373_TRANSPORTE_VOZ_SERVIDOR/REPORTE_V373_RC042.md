# V373 · RC-042 · Transporte de voz por servidor

Estado: candidato LAB. Producción intacta.

## Causa raíz demostrada

En iPhone, la cadena basada en `SpeechRecognition` queda subordinada al servicio del navegador y puede cerrar o abortar la captura después de reproducir audio. La alternativa Gateway Realtime no es utilizable en este equipo: `openai/gpt-realtime-2.1` y `openai/gpt-realtime-mini` devolvieron `403 GatewayForbiddenError` al solicitar el token, aun existiendo crédito visible.

## Intervención mínima

- `server-voice-capture.js`: captura local por `MediaRecorder`, detección única de silencio a 1 segundo y liberación completa de pista, contexto y grabador en cada turno.
- `api/voice-transcribe.js`: transcribe el audio con AI SDK 7 + AI Gateway, modelo `openai/gpt-4o-mini-transcribe`, idioma `es` y vocabulario contextual; no responde ni modifica datos.
- `index-grupal.html`: en iPhone selecciona el transporte nuevo y entrega el texto a `processBrowserVoiceTranscript()`, frontera existente que conserva Registro, Score y AI UNIVERSAL.
- `service-worker.js`: incorpora únicamente el archivo de transporte a la shell.
- `test-v373-server-voice-transcription.mjs`: valida contrato, cierre físico, idioma, endpoint y reutilización de la frontera existente.
- `api/_lib/traffic.js`: obtiene el país desde el GPS y envía ese `regionCode` a Google Routes para desambiguar destinos locales como Oakland Mall zona 10.
- `test-v324-real-traffic.mjs`: demuestra que un origen GPS en Guatemala obliga `regionCode="GT"`.
- `package.json`: fija `ai@7.0.92` y `@ai-sdk/gateway@4.0.74`; la credencial Gateway permanece sólo en Vercel.

## Módulos preservados

No se modifican parsers de jugadores, parsers de Scores, cálculo Gross/Neto, aplicación de scores, persistencia, tarjetas, modalidades ni navegación. `Intocables/intocables-gate.mjs` continúa bloqueando cualquier divergencia.

## Validación

La prueba automática valida estructura y contrato con upstream simulado. La publicación sólo puede declararse entregada después de Preview READY, transcripción real de audio español, tres auditorías completas consecutivas sobre el mismo commit y la prueba física final del iPhone.
