# R34 · Audio y texto visibles

Base canónica y rollback: Main R33 ab2e227c6dc1f2ccccb39d2dcc10dc2a4611a340. Publicación Main/LAB autorizada por el propietario en esta conversación. Se conserva tarjeta, actualizador, modelos, parámetros de captura y sellos de registro/scores.

## Evidencia del incidente
El propietario reporta escucha -> respondiendo sin audio ni texto en R33. Main producción dpl_3gJaZU2FrFHZKoQskoiyMMFrNCZD: 2026-09-13 13:44:07 UTC transcript_ready, 13:44:13 POST voice-speech 200, 13:44:15 speech_started y query_answered. Inicio programático no demuestra sonido físico. Causa exacta de inaudibilidad del iPhone no confirmada. El código sí oculta el texto voiceOnly y no vigila avance del audio ni limita esperas del cliente.

## Corrección y aceptación
Texto seguro en la misma pantalla antes de generar audio, elemento audio adjunto al DOM con controles, playsinline, volumen 1 y muted=false. Reproducción manual disponible con el archivo recibido. Esperas limitadas: API 35 s, cuerpo 10 s, TTS 30 s, play 6 s; audio sin avance durante 10 s se pausa y muestra error. Eventos anónimos de avance/finalización, sin transcripciones.

Pruebas: test-r34-audio-response.mjs cubre texto seguro, controles, reproducción rechazada, audio detenido, timeout/abort y diez turnos simulados; test-r32-open-conversation.mjs y test-voice-result-integrity.mjs mantienen separación de audio/texto. Intocables PASS, sin modificar sellos. No son pruebas de micrófono/altavoz físico.

scripts/build-r34-voice-review.mjs sólo genera en Preview de fix-r34-audible-response una frase sintética, MP3 y página de prueba con las mismas funciones del candidato; no incluye datos ni sesión de la app. Comprueba decodificación, señal no nula y avance/finalización en navegador. No se genera en producción. Verificación pendiente de ejecución remota.

Reversión: volver al commit base R33 conservando los datos locales; no borrar almacenamiento ni reinstalar. La aprobación física R34 permanece pendiente.
