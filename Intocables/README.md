# INTOCABLES · Golf Score Card GT

Controles obligatorios que bloquean cualquier candidato que vuelva a romper conductas aprobadas.

1. La ronda activa con jugadores y scores persiste al cerrar o recargar; una copia configurada pero vacía se descarta y la tarjeta operativa se recupera antes de mostrar la pantalla. Sin ronda operativa, la entrada muestra obligatoriamente `Inicio` y nunca una tarjeta vacía. Sólo se sustituye después de confirmar `INICIAR RONDA`.
2. Match Play anuncia su resultado con nombres y posición. Ronda Normal conserva su reporte Gross, Neto y par.
3. AI UNIVERSAL conserva Cedar directo, Onyx masculino por `openai/tts-1-hd`, acceso de un toque, watchdog y cierres progresivos hablados; toda consulta por voz responde audible sobre Inicio, Registro o tarjeta sin abrir otra pantalla.
4. El micrófono aprobado de Registro y Score —incluidos uno o varios hoyos seguidos— queda sellado por hashes y por once bancos ejecutables. No se refactoriza ni se traslada mientras funciona.
5. Una sola falla impide aprobar, publicar o montar la versión.

Ejecutar: `npm run intocables:gate`.
