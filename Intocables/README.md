# INTOCABLES · Golf Score Card GT

Controles obligatorios que bloquean cualquier candidato que vuelva a romper conductas aprobadas.

1. La ronda activa con jugadores y scores persiste al cerrar o recargar; una copia configurada pero vacía se descarta y la tarjeta operativa se recupera antes de mostrar la pantalla. Sin ronda operativa, la entrada muestra obligatoriamente `Inicio` y nunca una tarjeta vacía. Sólo se sustituye después de confirmar `INICIAR RONDA`.
2. Match Play anuncia su resultado con nombres y posición. Ronda Normal conserva su reporte Gross, Neto y par.
3. AI UNIVERSAL conserva exclusivamente la voz R7 aprobada: `fish-audio/s2.1-pro-free`, `es-419` y velocidad `0.90`; no puede sustituirla por Onyx, Echo ni una voz local.
4. Registro de Jugadores por micrófono queda congelado exactamente como funcionó y fue aprobado físicamente en V378.
5. Registro de Scores por micrófono —individual y múltiple— queda congelado exactamente como funcionó y fue aprobado físicamente en V378.
6. Sensibilidad, umbrales y cierre de captura de Registro/Scores quedan congelados. Los 22 segundos observados en Comunicación Universal quedan expresamente rechazados y fuera de la aprobación.
7. Una sola falla impide aprobar, publicar o montar la versión.

La evidencia técnica del sello físico está en `APROBACION_FISICA_REGISTRO_SCORES_V378.json`. Sus SHA-256 se calculan sobre regiones funcionales exactas de `index-grupal.html`; cambiar un solo byte en ellas produce `FAIL INTOCABLES`.

Ejecutar: `npm run intocables:gate`.
