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

## Alcance y reversión
Cambio incremental sobre R34. Los ajustes de velocidad/pausas previos permanecen en su rama independiente, sin afirmar que estén aplicados aquí. Voz femenina exacta pendiente de referencia identificable.
Descartar rama/Preview revierte íntegramente; main y enlace habitual no se modifican mediante este commit.
