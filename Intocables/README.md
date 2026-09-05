# INTOCABLES · Golf Score Card GT

Controles obligatorios que bloquean cualquier candidato que vuelva a romper conductas aprobadas.

1. La ronda activa con jugadores y scores persiste al cerrar o recargar; una copia configurada pero vacía se descarta y la tarjeta operativa se recupera antes de mostrar la pantalla. Sin ronda operativa, la entrada muestra obligatoriamente `Inicio` y nunca una tarjeta vacía. Sólo se sustituye después de confirmar `INICIAR RONDA`.
2. Match Play anuncia su resultado con nombres y posición. Ronda Normal conserva su reporte Gross, Neto y par.
3. AI UNIVERSAL conserva exactamente la voz y velocidad aprobadas físicamente en V378. El archivo completo `api/voice-speech.js` queda sellado por SHA-256; no se permite agregar un ID de locutor ni sustituir el modelo, idioma, velocidad o instrucciones.
4. Registro de Jugadores por micrófono queda congelado exactamente como funcionó y fue aprobado físicamente en V378.
5. Registro de Scores por micrófono —individual y múltiple— queda congelado exactamente como funcionó y fue aprobado físicamente en V378.
6. Sensibilidad, umbrales y cierre de captura de Registro/Scores quedan congelados. Los 22 segundos observados en Comunicación Universal quedan expresamente rechazados y fuera de la aprobación.
7. Una sola falla impide aprobar, publicar o montar la versión.
8. Desde V391, el Historial oficial queda sellado: sólo archiva rondas completas de 18 hoyos, conserva la ronda activa con scores, descarta la ronda vacía y recupera idempotentemente la Stableford oficial del 4 de septiembre de 2026 sin depender del hostname.
9. Desde V391, Tarjeta Digital y WhatsApp quedan sellados como una sola transacción: cierra y archiva, genera tarjetas personales, exige entrega exitosa a todos los destinos y sólo entonces muestra los tres destellos y limpia la ronda activa. Un fallo o número ausente conserva la ronda y nunca anuncia éxito falso.
10. Toda versión posterior debe descender de la base integrada V391 o reproducir todos sus hashes y gates. No se permite publicar una unión parcial procedente de otra conversación o rama.

La evidencia técnica está en `APROBACION_FISICA_REGISTRO_SCORES_V378.json` y `BASE_TECNICA_INTEGRADA_V391.json`. Sus SHA-256 cubren regiones funcionales exactas y archivos completos; cambiar un solo byte produce `FAIL INTOCABLES`.

Ejecutar: `npm run intocables:gate`.
