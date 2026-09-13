# R34 · Audio y texto visibles

Base canónica y rollback: Main R33 ab2e227c6dc1f2ccccb39d2dcc10dc2a4611a340. Publicación Main/LAB autorizada por el propietario en esta conversación. Se conserva tarjeta, actualizador, modelos, parámetros de captura y sellos de registro/scores.

## Evidencia del incidente
El propietario reporta escucha -> respondiendo sin audio ni texto en R33. Main producción dpl_3gJaZU2FrFHZKoQskoiyMMFrNCZD: 2026-09-13 13:44:07 UTC transcript_ready, 13:44:13 POST voice-speech 200, 13:44:15 speech_started y query_answered. Inicio programático no demuestra sonido físico. Causa exacta de inaudibilidad del iPhone no confirmada. El código sí oculta el texto voiceOnly y no vigila avance del audio ni limita esperas del cliente.

## Corrección y aceptación
Texto seguro en la misma pantalla antes de generar audio, elemento audio adjunto al DOM con controles, playsinline, volumen 1 y muted=false. Reproducción manual disponible con el archivo recibido. Esperas limitadas: API 35 s, cuerpo 10 s, TTS 30 s, play 6 s; audio sin avance durante 10 s se pausa y muestra error. Eventos anónimos de avance/finalización, sin transcripciones.

Pruebas: test-r34-audio-response.mjs cubre texto seguro, controles, reproducción rechazada, audio detenido, timeout/abort y diez turnos simulados; test-r32-open-conversation.mjs y test-voice-result-integrity.mjs mantienen separación de audio/texto. Intocables PASS, sin modificar sellos. No son pruebas de micrófono/altavoz físico.

scripts/build-r34-voice-review.mjs sólo genera en Preview de fix-r34-audible-response una frase sintética, MP3 y página de prueba con las mismas funciones del candidato; no incluye datos ni sesión de la app. Comprueba decodificación, señal no nula y avance/finalización en navegador. No se genera en producción. Verificación pendiente de ejecución remota.

Reversión: volver al commit base R33 conservando los datos locales; no borrar almacenamiento ni reinstalar. La aprobación física R34 permanece pendiente.

## Evidencia real Preview
Commit 0595868e64733075c00aa4d0ebe1eecaef438674. Main dpl_DYyTVRbu575gK1tscSqGEysCVyoP y LAB dpl_EVi3a6Vnvk9cxPXTL2t9sQGxjZJT READY; auditoría 133 paquetes PASS. LAB generó 81.919 bytes MP3 HTTP200. En navegador real, pulsación Probar respuesta y audio: texto visible, control Escuchar respuesta, eventos speech_started / speech_progress / speech_ended, estado final LISTO. Audio decodificado: duración 5,12 s, pico 0,94195, RMS 0,16452, nonSilent=true. Esto prueba señal y reproducción de la frase sintética en navegador; no afirma audibilidad en el iPhone del propietario ni prueba de su micrófono.

Tarjeta de prueba LAB antes de actualización: cuatro jugadores PRUEBA 1–4, gross 5 por hoyo, IN45 OUT45 TOTAL90. Datos del iPhone del propietario no inspeccionados. audit-project.mjs incorpora las pruebas R32/R33/R34 e integridad de voz como controles de futuras publicaciones.
