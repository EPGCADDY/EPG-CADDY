# CONFIRMACIÓN ESCRITA · V378 · REGISTRO, SCORES, VOZ E HISTORIAL INTOCABLES

**Fecha:** 4 de septiembre de 2026  
**Propietario y aprobador físico:** Jaime Kirste  
**Versión físicamente aprobada:** V378  
**Commit del Preview aprobado:** `8a84b4f1241d110fd53d106f8b253a882df8b1ba`  
**Deployment probado:** `dpl_7MvGAmBkSVJnsqDC7vnaPebrsEn8`

Yo, Codex, confirmo que la versión V378 queda aprobada e **INTOCABLE** en los siguientes puntos:

1. Registro de Jugadores por micrófono.
2. Registro de Scores por micrófono, tanto individual como múltiple.
3. Sensibilidad, umbrales y cierre del micrófono usados por esas dos funciones.
4. Voz aprobada en V378 y su velocidad exacta `0.90`; no se permite agregar un ID fijo, cambiar el timbre ni reinterpretar su configuración.
5. Historial de tarjetas oficiales: una ronda completa archivada no puede borrarse, ocultarse ni depender del hostname. La ronda Stableford del 4 de septiembre de 2026 —JAIME, FITO, CALIX y BRUNI— debe permanecer visible en el mismo enlace instalado.
6. Persistencia de ronda: una ronda activa con scores se conserva hasta pulsar `NUEVA RONDA`; una ronda configurada sin ningún score se descarta y los jugadores del directorio nunca se agregan automáticamente a una Score Card nueva.

Queda terminantemente prohibido modificar, reemplazar, reinterpretar o “mejorar” esos puntos sin una nueva orden expresa de Jaime Kirste. Las regiones funcionales y archivos aprobados quedan sellados por SHA-256 en `APROBACION_FISICA_REGISTRO_SCORES_V378.json`; cualquier cambio protegido de un solo byte provoca `FAIL INTOCABLES` y bloquea auditoría, Preview y Producción.

El tiempo de **22 segundos de Comunicación Universal está rechazado** y queda expresamente fuera de esta aprobación. Su corrección no autoriza tocar Registro de Jugadores ni Registro de Scores.

La métrica obligatoria de aceptación para Comunicación Universal es el **tiempo hasta el primer audio audible de ChatGPT**, comparado consecutivamente con la misma pregunta, en el mismo iPhone y la misma red. Si la aplicación empieza a responder más tarde que ChatGPT, la prueba falla.

## Ampliación ordenada por Jaime Kirste · 5 de septiembre de 2026

La voz correcta es la salida exacta de V378: Fish Audio `fish-audio/s2.1-pro-free`, español `es-419`, velocidad `0.90`, instrucciones originales de locutor masculino mexicano y **sin ID de voz fijo**. V390 restaura `api/voice-speech.js` byte por byte desde el commit V378 (`SHA-256 dd4597f6c60b0800adc990c7d99256ea5dfd13ac219b70292587718704ca5fee`) y el gate bloquea desde ahora cualquier diferencia del archivo completo. El ID de locutor agregado en V383 queda retirado porque cambió físicamente la voz sin autorización.

## Corrección obligatoria del blindaje · V384

La protección inicial de seis regiones fue insuficiente porque omitió `fireMicActivation()`, la función compartida que recibe el toque de Registro y Score. V381/V382 demostraron físicamente que esa omisión permitía alterar el comportamiento sin romper los hashes. V384 restaura esa función byte por byte desde el commit V378 y agrega una séptima región SHA-256. Desde V384, cambiar su orden `release → prime → connecting → toggleVoice` bloquea auditoría y despliegue.
