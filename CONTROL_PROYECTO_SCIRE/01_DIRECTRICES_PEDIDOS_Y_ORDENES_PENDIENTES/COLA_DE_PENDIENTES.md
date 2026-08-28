# Cola oficial de pendientes · Golf Score Card GT

Este archivo concentra los trabajos que el propietario ha pedido conservar para ejecución futura. Cuando el propietario diga **“busca los pendientes por hacer”**, este documento debe revisarse primero, junto con `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`.

## Resumen ejecutivo vigente · 28 de agosto de 2026

| Orden | Pendiente | Estado real |
|---:|---|---|
| 1 | `PEND-VOZ-003` AI UNIVERSAL ∞ y micrófono bilateral | V358 fue rechazado físicamente; V361 consolida V360 con escritura y guardado inmediato por score, parser natural de dos jugadores, voz masculina tardía y circuito Cedar; Preview y prueba física obligatorios |
| 2 | `PEND-TRA-005` tráfico actual y futuro | V356 corrige horizontes 30 min/1 h/3 h/mañana/próxima semana; faltan Preview, comparación simultánea independiente con Waze y validación física en Guatemala |
| 3 | `PEND-REG-001` USGA y Reglas de Golf | V328-R2: Preview oficial y modo básico offline entregados en banco; falta voz física en iPhone |
| 4 | `PEND-HCP-008` hándicap oficial | Falta autorización o mecanismo con ASOGOLF/GHIN; el índice interno seguirá separado |
| 5 | `PEND-CAM-009` campos mundiales | Falta proveedor/catálogo licenciado y tarjetas oficiales verificables |
| 6 | `PEND-GPS-010` GPS de golf | Clima y tráfico ya usan GPS efímero; faltan distancias deportivas por hoyo y validación de precisión |
| 7 | `PEND-SKI-006` Skins, Wolf, Vegas y apuestas | V332 aprobó 89 paquetes y 325 fuentes; falta nuevo Preview y ronda física |
| 8 | `PEND-DID-017` fichas para aprender cada modalidad | Falta una hoja web/PDF por modalidad y esquema, comprensible a los 10 años, imprimible en blanco y negro y validada contra el motor |
| 9 | `PEND-WAT-007` Apple Watch y smartwatches | Falta aplicación/sincronización física; Apple Watch primero y Wear OS después |
| 10 | `PEND-NUB-011` nube, cuentas y seguridad | Base preparada; faltan sincronización central, roles, recuperación, privacidad y endurecimiento |
| 11 | `PEND-EST-012` estadísticas avanzadas | Estadística local básica entregada; faltan histórico central, tendencias y comparaciones multi-dispositivo |
| 12 | `PEND-COM-013` monetización y operación comercial | Falta modelo comercial, términos, privacidad, soporte y proveedores de pago/entrega |
| 13 | `PEND-QA-014` certificación integral | Falta banco final automático, visual y físico por dispositivo, modalidad, ruido, conexión y ronda completa |
| 14 | `PEND-CLI-002` clima completo en artefactos | V356 distingue observación y pronóstico horario/diario hasta 16 días; faltan Preview, comparación externa temporal, snapshots, historial, PDF/imagen y prueba de campo |
| 15 | `PEND-MAN-004` Guía Rápida | Falta versión web/PDF visual enlazada al Manual vigente |
| 16 | `PEND-UBI-015` detectar el campo por GPS | Falta catálogo geográfico verificado, propuesta segura, confirmación manual y prueba física por campo |
| 17 | `PEND-RSG-016` sincronización de Reglas de Golf | Falta mecanismo permitido, manifiesto versionado, actualización/reversión y prueba física |
| 18 | `PEND-LIVE-018` GOLF SCORE CARD GT. LIVE | V353 CENTRO LIVE: local/Preview/E2E 80 jugadores/observabilidad PASS; inspección visual y prueba física iPhone pendientes |

La prioridad activa por la observación física más reciente es `PEND-VOZ-003` V361; `PEND-LIVE-018` V353 conserva su E2E aprobado y sus puertas físicas abiertas. **Producción permanece intacta y no existe montaje hasta obtener los PASS técnicos y físicos correspondientes.**

**Autorización de ejecución permanente:** el propietario ordenó el 26 de agosto de 2026 agregar y adaptar todos los pendientes, continuar sin solicitar autorizaciones intermedias y montar cada versión cuando esté realmente probada. Esta autorización no convierte un `FAIL` en `PASS` ni permite simular licencias, credenciales o integraciones externas inexistentes.

## PEND-REG-001 · Adaptar las Reglas de Golf a la aplicación

**Fecha de registro:** 25 de agosto de 2026  
**Estado:** V328-R2 EN BANCO · CENTRO USGA/THE R&A Y MODO BÁSICO SIN CONEXIÓN IMPLEMENTADOS; VOZ FÍSICA PENDIENTE
**Prioridad:** Principal, en ejecución por orden permanente del propietario
**Solicitud original:** “Tratar de adaptar las reglas de Golf a la aplicación”.

### Objetivo

Integrar las Reglas de Golf a Golf Score Card GT de forma práctica, comprensible y verificable, para que el usuario pueda consultar una situación real desde la pantalla o el micrófono y recibir orientación sin abandonar innecesariamente la ronda.

La solución debe buscar un enlace oficial y autorizado con **USGA** y sus **Reglas de Golf**, respetando licencia, atribución, vigencia, condiciones de uso y capacidades técnicas reales. No se simulará una integración ni se copiarán contenidos restringidos sin autorización.

### Avance real V328

- La aplicación incorpora el botón global `REGLAS` dentro del mismo asistente AI UNIVERSAL ∞; no existe un segundo motor de scores.
- Texto y voz pueden llamar `get_official_golf_rule`, que usa `/api/golf-rules` y limita técnicamente la búsqueda a `usga.org` y `randa.org`, incluidos sus subdominios oficiales.
- Cada respuesta exige al menos una fuente oficial visible, conserva el contexto de campo y modalidad, distingue Regla general, Regla Local y Comité, y señala la edición `Rules of Golf 2023` y clarificaciones actuales.
- El corte verificado es la clarificación oficial del **1 de julio de 2026**. Una actualización posterior publicada por USGA o The R&A prevalece automáticamente al consultarse.
- La consulta reglamentaria no puede ejecutar órdenes locales, modificar un score, aplicar una penalidad, conceder un hoyo ni cerrar una ronda. Cualquier cambio exige otra orden separada y explícita.
- El banco V328 cubre 15 situaciones distintas y rechaza fuentes ajenas a USGA/The R&A. El manual de 74 páginas ya explica el uso y aprobó 4K/300 dpi.
- El primer Preview V328 quedó READY con 86 paquetes y árbol remoto idéntico. La puerta `test-v328-live-official-rules.mjs` obliga dentro de Vercel una consulta real del modelo, búsqueda web, fuente USGA/The R&A y `scoreChanged:false` antes de entregar el build.
- V328-R2 agrega consulta básica sin conexión: conserva en el dispositivo hasta 24 respuestas previamente confirmadas con fuente USGA/The R&A, durante 90 días, almacena tokens normalizados en vez de la pregunta completa, exige coincidencia segura y misma modalidad, muestra la fecha y nunca inventa una respuesta que no esté guardada.
- El banco `test-v328-offline-official-rules.mjs` rechaza fuentes no oficiales, resultados que pretendan tocar scores, entradas vencidas, cruces de modalidad y coincidencias débiles; el módulo no realiza llamadas externas ni escribe la tarjeta.
- Esto es acceso a fuentes públicas oficiales, no una alianza, licencia de marca ni API privada de USGA/The R&A. La prueba física hablada permanece abierta antes del cierre total del pendiente.

**Fuentes oficiales verificadas:** [USGA Rules Hub](https://www.usga.org/content/usga/home-page/rules-hub.html), [USGA Clarifications](https://rulesworkshops.usga.org/content/usga/home-page/rules-hub/clarifications-of-the-rules-of-golf.html) y [The R&A Rules Hub](https://www.randa.org/en/rules/rules-hub).

### Alcance proyectado

- Crear un centro de consulta reglamentaria dentro de la aplicación y del manual.
- Permitir preguntas naturales por micrófono, por ejemplo: `¿Qué hago si mi bola cayó en agua?`, `¿Puedo conceder este putt?` o `¿Cuántos golpes de penalidad corresponden?`.
- Relacionar cada respuesta con la modalidad activa: General, Stableford, Match Play o Four Ball.
- Contemplar, como mínimo: bola perdida o fuera de límites, bola provisional, áreas de penalidad, bola injugable, alivio sin penalidad, búnker, green, bola movida, bola equivocada, orden de juego, concesiones y cierre anticipado en Match Play, penalidades y desempates.
- Diferenciar Reglas de Golf generales, reglas propias de cada modalidad y Reglas Locales particulares de cada campo o torneo.
- Mostrar la fuente, edición y fecha vigente de cada regla; nunca inventar una decisión reglamentaria.
- Diseñar respuestas breves para el campo y explicaciones ampliadas para el manual, entendibles por un niño de 10 años.
- Permitir búsqueda por palabras comunes, sin exigir que el usuario conozca el número oficial de la regla.
- Mantener disponible la consulta básica sin conexión cuando la versión reglamentaria ya esté instalada.
- Registrar pruebas para cada situación y comprobar que una consulta reglamentaria nunca modifique scores, aplique penalidades ni cierre una ronda sin confirmación explícita del usuario.

### Arquitectura obligatoria al ejecutarlo

`PREGUNTA → IDENTIFICACIÓN DE SITUACIÓN → MODALIDAD Y REGLA LOCAL → RESPUESTA BREVE → FUENTE → ACCIÓN CONFIRMADA`

La capa reglamentaria debe reutilizar el micrófono, buscador, historial, manual y sistema de modalidades existentes. No debe crear una aplicación paralela ni un segundo motor de scores.

### Condiciones de cierre futuro

Este pendiente sólo podrá declararse terminado cuando exista fuente reglamentaria vigente comprobada, cobertura de situaciones, pruebas automáticas, prueba física por voz, navegación desde todas las modalidades, documentación para usuario y revisión integral sin errores.

### Frases para localizar este pendiente

`reglas de golf`, `reglamento`, `penalidades`, `bola perdida`, `fuera de límites`, `agua`, `área de penalidad`, `concesión`, `match play`, `reglas locales`, `pendientes por hacer`.

## PEND-CLI-002 · Clima sincronizado por campo y guardado en la tarjeta

**Fecha de registro:** 25 de agosto de 2026  
**Estado:** EN PROGRESO · GPS AUTOMÁTICO Y CLIMA VISIBLE EN TARJETA V312 IMPLEMENTADOS; ARTEFACTOS Y VALIDACIÓN FÍSICA PENDIENTES
**Prioridad:** Principal, pendiente de orden de ejecución del propietario  
**Solicitud original:** “Guardar el clima, también sincronizarlo en la tarjeta dependiendo del campo que se seleccione y su locación”.

### Objetivo

Al abrir una tarjeta activa, Golf Score Card GT debe solicitar la ubicación autorizada del GPS del teléfono, consultar automáticamente el clima de donde realmente está el jugador, mostrarlo y conservar la lectura dentro de la ronda. Si el GPS no está disponible, la ubicación registrada del campo seleccionado funciona como respaldo sin impedir el juego.

### Alcance proyectado

- Agregar a la matriz maestra de cada campo coordenadas, zona horaria y ubicación oficial verificadas.
- Mostrar el bloque climático inmediatamente después de elegir el campo en Configuración, antes de iniciar la ronda, y mantenerlo dentro de la tarjeta que se está jugando.
- Reutilizar las mismas coordenadas oficiales en todas las alternativas y modalidades que apunten al mismo club; nunca duplicar ubicaciones contradictorias.
- Consultar primero mediante el GPS autorizado del teléfono; usar las coordenadas verificadas del campo seleccionado únicamente como respaldo.
- Guardar como mínimo: condición, temperatura, sensación térmica, humedad, probabilidad o presencia de lluvia, velocidad/dirección del viento, ráfagas, hora local, fuente y momento de actualización.
- Mostrar un resumen compacto y elegante en la tarjeta activa, Tarjeta Digital, Tarjeta Global, tarjetas personales, PDF e imagen final.
- Capturar un registro al iniciar la ronda y otro al finalizar; posteriormente se decidirá si conviene seguimiento intermedio sin saturar la tarjeta.
- Conservar el clima histórico capturado con la ronda. Una actualización posterior del proveedor nunca debe reescribir el clima de una tarjeta ya cerrada.
- Aplicar la misma arquitectura a General, Stableford, Match Play, Four Ball y Práctica.
- Permitir consultas habladas como `¿Cuál es el clima del campo?`, `¿Cuánto viento hay?` o `¿Va a llover?`, sin modificar scores.
- Si no existe conexión o el proveedor falla, conservar la ronda y mostrar `CLIMA NO DISPONIBLE` o el último dato con su hora; nunca inventar información.
- Registrar proveedor, versión y controles de precisión para auditoría.

### Selección verificable del proveedor

- **Candidato inicial recomendado para piloto:** Apple WeatherKit, porque recibe latitud/longitud exactas, entrega condiciones actuales y pronóstico, tiene integración nativa en iPhone y API REST para web y Android. Apple incluye hasta 500,000 consultas mensuales por membresía y exige atribución: <https://developer.apple.com/weatherkit/> y <https://developer.apple.com/documentation/weatherkitrestapi>.
- **Comparadores obligatorios del piloto:** Tomorrow.io Realtime Weather y OpenWeather One Call 3.0; ambos aceptan coordenadas decimales: <https://docs.tomorrow.io/reference/realtime-weather> y <https://openweathermap.org/api/one-call-3>.
- Ningún proveedor queda aprobado sólo por su marca. La decisión final exige comparar, en los clubes de Guatemala y especialmente en Mayan Golf, temperatura, lluvia, viento, ráfagas, hora de actualización, disponibilidad y estabilidad contra observaciones en sitio durante días secos, lluviosos y ventosos.
- Si WeatherKit obtiene el mejor resultado medido, será la fuente primaria y el segundo proveedor aprobado podrá funcionar como contraste o respaldo. Si no lo obtiene, se elegirá el ganador documentado del piloto.

### Arquitectura obligatoria al ejecutarlo

`TARJETA ACTIVA → PERMISO GPS → UBICACIÓN DEL TELÉFONO → PROVEEDOR CLIMÁTICO → TARJETA Y RONDA`; si no hay GPS: `CAMPO SELECCIONADO → COORDENADAS DE RESPALDO`.

El clima será un dato contextual de la ronda. No podrá alterar automáticamente Gross, Neto, handicap, puntos, resultados ni cierre.

### Fase automática y conversacional V312 ya implementada

- El Caddie puede consultar condición, temperatura, sensación térmica, lluvia, viento, hora local y probabilidad máxima de lluvia restante mediante Open-Meteo.
- Al abrir o reabrir una tarjeta activa, el cliente obtiene primero el GPS del teléfono con permiso del sistema, consulta automáticamente `api/weather.js` y renueva la lectura cada diez minutos.
- La tarjeta muestra condición, temperatura, sensación, máxima probabilidad de lluvia, viento y hora; guarda esos datos en `round.weather` sin conservar latitud ni longitud exactas.
- Si el GPS no responde, usa las coordenadas propias del campo seleccionado y lo rotula como respaldo. La tarjeta continúa funcionando aunque también falle el proveedor.
- La misma ruta se ejecuta en General, Match Play, Four Ball, Stableford y Práctica; una tarjeta cerrada oficialmente no vuelve a actualizarse.
- El Caddie usa el GPS como primera opción para preguntas de clima y nunca escribe scores.
- Continúan pendientes la vista previa en Configuración, snapshots formales de inicio/cierre, historial y artefactos PDF/imagen, comparación física de proveedores y validación final en campo.

### Condiciones de cierre futuro

Sólo podrá declararse terminado cuando todos los campos operativos tengan localización validada, el clima aparezca en Configuración y en la tarjeta activa, exista un proveedor ganador medido en los clubes, funcionen los estados sin conexión/error, el clima sobreviva recuperación y sincronización, aparezca en todos los artefactos oficiales y supere pruebas automáticas y físicas.

### Frases para localizar este pendiente

`clima`, `tiempo`, `temperatura`, `viento`, `lluvia`, `humedad`, `ubicación del campo`, `localización`, `clima en la tarjeta`, `pendientes por hacer`.

## PEND-VOZ-003 · Caddie/Support conversacional humano

**Fecha de registro:** 25 de agosto de 2026  
**Estado:** V358 RECHAZADA EN IPHONE; V360 INTEGRA PROGRESO VISUAL + PARSER NATURAL; AUDITORÍA, PREVIEW Y VALIDACIÓN FÍSICA PENDIENTES
**Prioridad:** Principal, conectado con `PEND-REG-001`  
**Solicitud original ampliada:** lograr que el micrófono y el buscador sean lo más cercanos posible a conversar con un humano especialista en golf, pero que también permitan preguntas abiertas de clima, vida diaria, salud y conocimiento general.

### Objetivo

Convertir el micrófono y el buscador del Manual vivo en una sola conversación natural por texto o voz. El asistente conservará especialidad prioritaria en golf y contexto exacto de la ronda, pero también podrá responder preguntas generales, consultar clima vivo y ofrecer orientación de salud responsable. No se presentará como árbitro infalible, médico ni sustituto del Comité o de un profesional sanitario.

### Arquitectura obligatoria

`TEXTO O AUDIO → CLASIFICADOR SEGURO → CONTEXTO NECESARIO → HERRAMIENTA O CONOCIMIENTO APROBADO → RESPUESTA NATURAL CON FUENTE CUANDO APLIQUE → TEXTO Y/O VOZ`

- Separar siete rutas: escribir/corregir score, consultar resultados, navegar/explicar la aplicación, conocimiento de golf, clima vivo, conversación general y orientación de salud.
- Entregar al asistente campo, hoyo, modalidad, equipos, handicap, scores, clima y reglas locales vigentes, sólo cuando sean necesarios para la pregunta.
- Cuando la pregunta sea sobre Score Card, responder y abrir la página exacta del Manual vivo; el buscador local actual seguirá disponible como recuperación inmediata.
- Para preguntas como «¿crees que va a llover hoy?», obtener ubicación autorizada o campo activo y consultar datos climáticos actuales mediante `PEND-CLI-002`; nunca inventar clima ni responder con datos viejos sin rotularlos.
- Fundamentar respuestas de golf en el manual, fuentes reglamentarias vigentes, reglas locales verificadas y matriz oficial de campos; si no existe respaldo suficiente, decirlo claramente.
- En salud, hacer preguntas mínimas de seguridad, distinguir orientación general de urgencia y recomendar evaluación profesional cuando corresponda. No diagnosticar, prescribir ni indicar combinaciones o dosis de medicamentos sin datos clínicos suficientes; ante señales de alarma, priorizar atención inmediata.
- En conversación general, hablar con vocabulario humano y permitir repreguntas, pero verificar con fuentes actuales todo dato vivo, incierto o de alto impacto.
- Mantener conversación con preguntas de seguimiento y memoria limitada a la ronda activa. V313 entrega cada respuesta completa antes de volver a escuchar; el botón del micrófono conserva el corte manual.
- Contestar en español sencillo, entender términos comunes en español e inglés y explicar como para un niño de 10 años cuando el usuario lo necesite.
- No modificar scores, penalidades, jugadores, modalidad, campo ni cierre mediante una respuesta informativa. Toda acción de escritura exige confirmación separada y verificable.
- Conservar una ruta local limitada para score y navegación cuando no haya conexión; las respuestas abiertas pueden indicar que requieren conexión.
- Medir latencia, exactitud, respuestas con fuente, falsas acciones y cobertura de preguntas antes de habilitarlo públicamente.

### Base técnica evaluada

Los modelos Realtime permiten audio de entrada y salida en tiempo real; los archivos de reglas y manual pueden indexarse en un almacén consultable. La integración debe realizarse con API protegida en servidor, nunca exponiendo una clave en el teléfono: <https://platform.openai.com/docs/models> y <https://platform.openai.com/docs/api-reference/vector-stores-files>.

### Fase de micrófono V314 ya implementada

- Un solo toque abre el mismo Caddie universal desde Inicio/Registro, Stableford o la Tarjeta. No existe comando, palabra clave ni cambio manual de tema.
- El micrófono jamás se abre solo y no existe huella, identificación ni registro biométrico de voz. Toda escucha comienza exclusivamente con el botón visible y termina cuando el usuario lo cierra.
- Score, consultas de ronda, navegación y conversación general se separan antes de ejecutar cualquier escritura.
- Toda frase que no sea una operación reconocida pasa a una respuesta Realtime natural con memoria de la conversación activa.
- Mientras el Caddie responde se pausa la entrada para evitar cortes por eco o ruido; al terminar vuelve a escuchar si el botón permanece abierto. El usuario siempre puede cerrar el micrófono manualmente.
- Las preguntas de clima usan el campo activo y `api/weather.js`; las preguntas de salud reciben límites expresos de orientación general, sin diagnóstico ni prescripción automática.
- Continúan pendientes la conversación por texto dentro del buscador del Manual, el banco amplio de preguntas, pruebas físicas con ruido/acento y la validación práctica con golfistas.

### Corrección V327 en banco

- La consulta sobre una persona conocida en Colima alcanzó la búsqueda web con HTTP 200; el silencio ocurrió al devolver el resultado a Realtime, no por vocabulario limitado.
- `speech_stopped` conserva ahora su guardián hasta la transcripción final. Un cierre tardío de audio sin identificador no puede apagar el follow-up antes de que empiece a sonar y la reproducción dispone de un límite recuperable de 60 segundos.
- La observabilidad excluye expresamente el contenido hablado, nombres, ubicaciones y claves. Sólo registra estado técnico, turno, duración, herramienta y banderas de transición.
- V327 permanece sin aprobación hasta que la regresión completa, el Preview y una conversación larga física en iPhone pasen sin un solo silencio.

### Banco desplegado V327-R1 aprobado

- El Preview de V327-R1 quedó `READY` y su compilación aprobó 85 paquetes, 310 fuentes y tres PDF sellados.
- Se ejecutaron 44 llamadas reales: 24 materias diferentes, ocho turnos consecutivos con memoria exacta, clima futuro, investigación web con cinco fuentes, tráfico actual/futuro y cinco fallos deliberados recuperables.
- El banco local conserva 550 secuencias `herramienta → follow-up → audio`, 100 eventos de privacidad, 30 turnos bilaterales y 30 temas/63 mensajes.
- Los registros del deployment no mostraron errores ni advertencias y la telemetría descartó pregunta, transcripción, nombres, ubicación y credenciales.
- Esta evidencia automática no sustituye el micrófono físico, altavoz, interrupciones, ruido ni gestión de audio de un iPhone real. La única puerta inmediata abierta es una conversación larga física sin silencio ni micrófono rojo atascado.

### Observaciones físicas nuevas registradas para una fase posterior

- El 28 de agosto, a las 07:05–07:06, Safari reconoció Registro y un hoyo individual, pero no aplicó varios hoyos seguidos. La consulta General alcanzó `/api/universal-ai` con HTTP 200, pero la respuesta quedó dentro del panel oculto o sin reproducción audible.
- V354 usa al único jugador activo como jugador implícito, acepta `hoyo` y `hoyos`, aplica primero el lote local y abre automáticamente el panel AI antes de enviar una consulta General. Si Safari no inicia la síntesis, la respuesta permanece visible con recuperación manual.
- `test-v354-voice-fallback.mjs` ejecuta las funciones reales con tres hoyos, plural, orden visible de General y telemetría sin transcripción ni nombres. El banco no sustituye la prueba física final.
- Preview V354: commit `d7deb09be3826430afc8e1f3d379f0a1137d215b`, deployment `dpl_CgqzYpVABY9djJehtFmH5cyFXHdn` READY. Vercel aprobó 96 paquetes; el navegador confirmó build/voz V354, AI ∞ y LIVE visibles, y cero errores propios de la aplicación. Producción no cambió.
- La prueba física posterior rechazó el audio de V354: la respuesta General quedó escrita. V355 habilita la síntesis dentro del toque original antes de esperar Internet y no considera la recuperación manual como aprobación automática.
- V355 distribuye `ANCAS GUSTAVO, 15 BLANCAS` dictado dentro de NOMBRE en Nombre/HDCP/Marcas sin cerrar el teclado; una frase incompleta o HDCP fuera de 0–54 permanece manual.
- Preview V355: commit `b965ec4d87c1f0400bf655e5f8bdba6f003f5cc9`, deployment `dpl_7AaXsHMV7msb6f2dizQECu3ES55F` READY. Vercel aprobó 97 paquetes; navegador confirmó build/voz V355, AI ∞ y distribución Prueba V355/15/Blanco con OK habilitado.
- La prueba física posterior confirmó que V355 habló, pero mostró la consulta y respuesta como texto y Safari eligió una voz femenina ajena a la matriz. V356 marca los turnos hablados como contexto no visible y conserva texto únicamente para consultas escritas.
- V356 recupera la matriz aprobada: voz `Cedar`, velocidad `1.15`, locutor masculino adulto, serio, profesional y español internacional neutro. `/api/voice-speech` intenta OpenAI TTS y usa AI Gateway como respaldo; la selección local sólo admite voces masculinas conocidas y jamás toma la primera voz española disponible.
- V356 conserva Google Maps Routes `TRAFFIC_AWARE_OPTIMAL` como fuente exclusiva de ETA/demora/distancia, Open-Meteo estructurado para clima y GPT-5.6 con búsqueda web y profundidad adaptable para vocabulario universal. La voz meteorológica resume el resultado sin leer las 24 horas completas.

- Las respuestas generales pueden resultar vagas, básicas o demasiado breves hasta que el usuario pide expresamente una respuesta más estudiada, investigada, profunda y formal. Debe incorporarse una matriz permanente de calidad que revise pertinencia, fundamento, profundidad, precisión, aplicación práctica y claridad antes de cada respuesta, sin obligar al usuario a repetir esa orden.
- En la quinta conversación física el estado quedó escuchando y, después de terminar la pregunta, el turno se cortó sin completar el ciclo. Debe reproducirse y corregirse la recuperación del micrófono en conversaciones consecutivas.
- El aviso bilateral debe mostrar exactamente `ESCUCHANDO` mientras recibe voz y `RESPONDIENDO` mientras habla, ambos en rojo claramente visible y parpadeante. No debe mostrar `CADDIE RESPONDIENDO` ni textos adicionales en esos dos estados.
- Por orden del propietario, estas correcciones quedan registradas pero pospuestas hasta continuar la configuración y prueba de las modalidades nuevas. No se consideran implementadas ni aprobadas.

### Condiciones de cierre futuro

Este pendiente sólo podrá cerrarse después de un banco amplio de preguntas de golf, Manual, clima, conversación general y salud; pruebas por texto y voz con acentos y ruido de campo; validación contra fuentes; control de alucinaciones; prueba de que ninguna pregunta modifica scores; límites médicos verificados y evaluación práctica con golfistas.

### Frases para localizar este pendiente

`caddie conversacional`, `Support conversacional`, `buscador humano`, `experto de golf`, `micrófono humano`, `preguntas de golf`, `clima por voz`, `dolor de tobillo`, `conversación general`, `asistente de voz`, `reglas por voz`, `pendientes por hacer`.

## PEND-MAN-004 · Crear Guía Rápida desde el Manual de Funciones

**Fecha de registro:** 25 de agosto de 2026
**Estado:** PENDIENTE · GUÍA RÁPIDA TODAVÍA NO IMPLEMENTADA
**Prioridad:** Pendiente de orden de ejecución del propietario
**Solicitud original:** “Hacer una guía rápida a partir del Manual de Funciones”.

### Objetivo

Crear una versión corta, visual y muy fácil de consultar que resuma las funciones indispensables del Manual completo de Golf Score Card GT.

### Alcance proyectado

- Explicar con pocas palabras: iniciar una ronda, registrar jugadores, usar el micrófono/Caddie universal, anotar y corregir scores, cambiar de modalidad, consultar clima, abrir Tarjeta Digital, finalizar, guardar y compartir.
- Usar lenguaje entendible para un niño de 10 años, ejemplos directos y capturas o ilustraciones sólo cuando aclaren un paso.
- Conservar enlaces a las páginas exactas del Manual completo para ampliar cada explicación.
- Preparar una versión web y PDF, con portada primero, navegación correcta y acceso visible desde `Support`.
- Probar cada enlace, página, botón y búsqueda antes de publicarla.

### Condiciones de cierre futuro

La Guía Rápida se considerará terminada cuando cubra el recorrido básico completo, abra siempre por la portada, enlace correctamente al Manual vivo, tenga revisión visual en teléfono y supere pruebas de navegación y PDF.

### Frases para localizar este pendiente

`guía rápida`, `manual corto`, `resumen del manual`, `funciones principales`, `manual para niño de 10 años`, `pendientes por hacer`.

## PEND-TRA-005 · Tiempo de llegada y tránsito sin mostrar mapa

**Fecha de registro:** 25 de agosto de 2026
**Estado:** CREDENCIAL Y GOOGLE ROUTES ACTIVOS EN PREVIEW · V327-R1 APROBADA AUTOMÁTICAMENTE; PRUEBA FÍSICA Y COMPARACIÓN WAZE PENDIENTES
**Prioridad:** Alta · pendiente conversación física prolongada y comparación Guatemala/iPhone
**Solicitud original:** preguntar al Caddie cuánto tráfico hay para ir a casa en Pradera y escuchar únicamente tiempo estimado y comentarios, sin abrir una gráfica de navegación.

### Objetivo

Permitir una pregunta natural como `¿Cómo está el tráfico para ir a mi casa en Pradera?` y responder por voz con duración estimada, demora por tráfico y resumen de la ruta, sin modificar la tarjeta ni mostrar un mapa.

### Arquitectura implementada en V324

`GPS DEL TELÉFONO → DESTINO EXACTO GUARDADO CON CONSENTIMIENTO → GOOGLE MAPS ROUTES CON TRÁFICO → RESUMEN DE TIEMPO → RESPUESTA DEL CADDIE`

- La consulta natural de AI UNIVERSAL ∞ usa una función real de tráfico y Google Maps Routes con `TRAFFIC_AWARE_OPTIMAL`; devuelve ETA, demora, distancia, hora de cálculo y nivel derivado, tanto a texto como a voz.
- La medición real El Pulté Golf → Pradera Concepción devolvió 15 km y cerca de 33 minutos en el instante del diagnóstico; confirma proveedor y credencial. El problema observado fue el retorno a voz.
- El banco desplegado V327-R1 repitió la ruta y obtuvo 16.1 km y 31 minutos en ese instante. También calculó la salida futura El Pulté Golf → colonia Oakland zona 10 para las 12:30 p. m.: 21.6 km, 48 minutos y 13 minutos de demora prevista.
- Un destino que sólo diga `Concepción` es ambiguo: debe pedir una sola aclaración de nombre completo, zona o municipio antes de calcular.
- El origen `aquí` solicita GPS sólo durante esa consulta y las coordenadas exactas no se incorporan a la respuesta ni al historial conversacional.
- El destino escrito llega al proveedor; `mi casa` o `Pradera` sin identificación suficiente debe producir una sola pregunta breve, nunca una ubicación inventada.
- No afirmar que Waze está sincronizado: los Deep Links sólo abren Waze y el Transport SDK exige asociación comercial, aplicación nativa aprobada y atribución visible.
- Solicitar y guardar el destino exacto sólo con consentimiento; `Pradera` por sí solo no identifica una vivienda.
- Mantener la clave en servidor y activar facturación/cuotas antes de publicar.
- Informar origen, destino entendido, minutos estimados, demora y hora de cálculo; nunca inventar tráfico actual.
- Permitir abrir Waze o Maps únicamente como acción separada y voluntaria si el usuario luego desea navegación.
- Tiempo agotado, proveedor caído, cuota, falta de GPS o falta de permiso producen una explicación recuperable y permiten continuar la conversación bilateral.

### Condiciones de cierre futuro

Este pendiente sólo podrá cerrarse con destino exacto validado, proveedor y facturación activos, varias pruebas de ETA real en Guatemala comparadas a la misma hora contra Waze, límites de privacidad, manejo de error/sin GPS, conversación bilateral prolongada en iPhone y explicación añadida al Manual. La batería simulada V324 no sustituye esa validación física.

### Frases para localizar este pendiente

`tráfico`, `tránsito`, `Waze`, `Pradera`, `tiempo para llegar`, `ETA`, `ir a mi casa`, `pendientes por hacer`.

## PEND-SKI-006 · Juegos y apuestas: Skins, Wolf, Vegas y Dots

**Fecha de registro:** 26 de agosto de 2026
**Estado:** V330-R3 APROBÓ SELECCIÓN ÚNICA EN IPHONE · V331 PREVIEW READY · V332 MONEDA DUAL Y MATRIZ COMPLETA APROBÓ BANCO INTEGRAL
**Prioridad:** Función nueva solicitada por el propietario

### Objetivo

Agregar **Skins, Wolf, Vegas y el módulo maestro de apuestas** dentro de la arquitectura única de Golf Score Card GT, reutilizando registro, campos, handicap, captura manual y por voz, persistencia, historial y tarjeta final.

### Avance real V329/V330/V331/V332

- La ventana de Configuración quedó dividida en dos columnas: modalidades existentes a la izquierda y juegos nuevos a la derecha. La pantalla principal de la tarjeta no cambió de formato.
- Skins admite de dos a seis jugadores, Gross o Neto, unidad monetaria configurable y tres políticas explícitas de empate: acumular, dividir o anular. Resuelve X, hoyo 18, saldos cero-suma y carry final.
- Wolf admite de tres a seis jugadores como adaptación de grupo. V331 elimina la duplicidad `Solo base`/`Lone`: sólo ofrece Con pareja, Lobo solitario y Lobo ciego; configura Wolf primero/último, multiplicadores, unidad y tope por rival/hoyo. Muestra riesgo, decisión y score pendientes, carry, unidades netas, dinero movido y liquidación; bloquea el cierre si falta una decisión.
- Vegas admite cuatro o seis jugadores; con seis utiliza tres parejas y compara cada pareja contra las otras dos. V331 explica y muestra cada número por hoyo, maneja 10+4 como 104, permite acordar si dos birdies cancelan o aplican ambos volteos, registra águila, tope, puntos movidos, saldo y liquidación cero-suma. La variante de seis queda identificada como adaptación propia.
- Dots admite de dos a seis jugadores. V331 añade una definición en español a cada evento, separa puntos positivos/negativos y registros automáticos/manuales. Ferret queda apagado por defecto porque puede duplicar Chippie; `Amigo`, izquierda y derecha continúan como reglas propias del grupo apagadas.
- Match Play y Four Ball aceptan ahora hasta seis jugadores. Cuando se arman parejas, las posiciones 1–2, 3–4 y 5–6 forman las parejas Verde, Oro y Azul; cada Match se resuelve de forma independiente y Four Ball compara el mejor Neto de cada pareja.
- Cada resultado explica ganador, empate, multiplicador, valor de unidad, cobro/pago y saldo. El dinero se mantiene separado del score deportivo.
- El cierre oficial guarda la configuración y liquidación en el snapshot SHA-256. Una corrección recalcula el juego, preserva el original y actualiza Global, personales, Historial, consultas, respaldo central y restauración.
- Los bancos `test-v329-skins.mjs` y `test-v330-side-games.mjs` aprobaron reglas, empates, X, límites, tres parejas, cierre, corrección, artefactos, búsqueda, nube, recuperación, voz y ausencia de cambios estructurales en la pantalla principal.
- La revisión V331 usa 18Birdies y Wolf Golf Scorecard para Wolf; Mashie, 18Birdies y Golf Digest para Vegas; 18Birdies, MyScorecard y SCGA para Dots/Junk; USGA queda como autoridad del hándicap y score deportivo. Las reglas que varían entre grupos se muestran como configurables, nunca como universales.
- V332 añade a cada juego dos casillas excluyentes `Q · QUETZALES` y `$ · DÓLARES`; la selección queda guardada y se usa en pantalla, voz, snapshot, corrección, tarjeta, Historial, sincronización, restauración y liquidación sin conversión.
- V332 homologa la matriz común: estado, resueltos/pendientes, acumulados, dinero movido, saldo por jugador/pareja, líder o empate, riesgo útil del juego, neto a liquidar y quién paga a quién.

### Alcance mínimo para diseñar y aprobar

- Definir Skins Gross y Neto, número de jugadores, valor por hoyo y moneda/unidad opcional.
- Definir antes de programar si los empates acumulan el Skin al hoyo siguiente, se dividen o se anulan.
- Calcular ganador por hoyo, acumulados pendientes, Skins ganados por jugador y resultado final.
- Incorporar Wolf con elección de pareja, Lobo solitario, orden rotativo, Gross/Neto, multiplicadores y límites previamente configurados.
- Incorporar Vegas con parejas, formación del número, volteos/multiplicadores y topes de riesgo definidos antes de iniciar.
- Crear una sola casilla de **valor de la unidad** y dos radios excluyentes de moneda —Q o $— que alimenten los cálculos económicos sin alterar el score deportivo.
- Registrar por voz o manual las apuestas de grupo: `Amigo`, caída a izquierda/derecha del fairway, elección de pareja y eventos equivalentes acordados por el grupo.
- Incluir Dots configurables: Sandy, Greenie, Birdie, Eagle, Barkie, Arnie, Chippie, Poley, Ferret y Snake; permitir activar o desactivar cada uno antes de la ronda.
- Mostrar saldos por jugador, quién cobra o paga, límites, multiplicadores, acumulados y liquidación final automática y auditable.
- Mantener scores individuales intactos y separar claramente score deportivo de cualquier valor económico.
- Permitir anotación manual y por voz mediante el mismo escritor oficial; una consulta nunca debe modificar resultados.
- Cubrir correcciones retroactivas, X explícita, hoyo 18 con acumulado pendiente, ronda recuperada, exportación e historial.
- Añadir pruebas automáticas, visuales y físicas antes de declararlo operativo.

### Condiciones restantes para cierre

- ✅ El Preview `dpl_4k5V9rFwkVXVwuRwktBjtgG4arAv` quedó `READY`: 89 paquetes, 322 fuentes, tres inventarios PDF, cero vulnerabilidades y puerta viva de Reglas con seis fuentes oficiales.
- ❌ La prueba física V330-R2 rechazó la selección visual: al tocar `WOLF`, abrió su configuración pero `RONDA NORMAL` también permaneció verde.
- ✅ V330-R3 demostró en iPhone que al elegir `WOLF` sólo Wolf queda verde, Ronda Normal se desmarca y la configuración se abre.
- ✅ V331 fue publicada en Preview `READY`; la matriz investigada ya está disponible para prueba.
- ✅ V332 aprueba 89 paquetes, 325 fuentes, tres inventarios PDF, radios Q/$, símbolos, acumulados, riesgos, neto a liquidar, persistencia y tarjetas; falta publicación Preview.
- ⏳ Confirmar físicamente que acuerdos, estados, métricas, acumulados y liquidaciones sean legibles y operables.
- Revisar físicamente en iPhone la ventana dividida, seis jugadores, tres parejas, selectores monetarios y controles Dots/Wolf sin tropiezos.
- Jugar o simular una ronda completa por cada juego en el dispositivo, corregir al menos un hoyo y confirmar tarjetas, Historial y restauración.
- Sólo después de esos PASS el propietario podrá autorizar el montaje en Producción.

### Frases para localizar este pendiente

`Skins`, `Wolf`, `Vegas`, `Dots`, `Sandy`, `Greenie`, `Birdie`, `Eagle`, `Barkie`, `Arnie`, `Chippie`, `Poley`, `Ferret`, `Snake`, `Amigo`, `izquierda`, `derecha`, `unidad`, `quetzales`, `liquidación`, `juego Skins`, `Skin por hoyo`, `empate acumulado`, `pozo por hoyo`, `modalidad nueva`, `pendientes por hacer`.

## PEND-DID-017 · Una ficha para aprender cada modalidad y esquema

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE DE DISEÑO, REDACCIÓN, VALIDACIÓN Y PUBLICACIÓN
**Prioridad:** Después de la validación física de V332

### Objetivo

Crear una hoja web/PDF por Ronda Normal, Stableford, Match Play, Four Ball, Práctica, Skins, Wolf, Vegas, Dots y por cada esquema que cambie el cálculo. El lenguaje debe poder entenderlo un niño de 10 años; la versión impresa debe funcionar en blanco y negro y cada ejemplo debe enseñar acuerdos, jugada, estrategia, estado, acumulado y liquidación sin ambigüedades.

La edad de 10 años define sólo la claridad didáctica, no la edad de los jugadores. El dinero quedará siempre incluido en el alcance general de cada hoja —unidad, moneda, multiplicador, tope, cobro, pago y liquidación— con dos opciones excluyentes: **quetzales (`Q`/`GTQ`) o dólares (`$`/`USD`)**. Cada grupo decidirá cuál usa o si juega únicamente con puntos/unidades sin liquidar dinero. Cada operación deberá coincidir exactamente con el motor real de la aplicación y enseñar la matriz completa de estado, acumulado, riesgo, balance y liquidación.

**Especificación completa:** `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`.

### Frases para localizar este pendiente

`fichas de modalidades`, `cómo se juega`, `niño de 10 años`, `blanco y negro`, `aprender apuestas`, `estrategia`, `ejemplo completo`, `guía por modalidad`, `pendientes por hacer`.

## PEND-WAT-007 · Apple Watch y smartwatches

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE
**Prioridad:** Función nueva solicitada por el propietario

### Objetivo

Enlazar Golf Score Card GT con **Apple Watch** y, en una fase compatible posterior, con relojes **Wear OS**, para consultar y registrar información esencial durante la ronda sin sacar el teléfono.

### Alcance mínimo para diseñar y aprobar

- Priorizar Apple Watch por el dispositivo objetivo actual; evaluar después Wear OS sin crear motores de score separados.
- Mostrar hoyo activo, par, jugador o turno, Gross pendiente, Neto y resultado esencial con controles grandes.
- Permitir dictado o toque rápido de score y enviar la operación al mismo validador, cálculo y guardado de la aplicación principal.
- Sincronizar de forma recuperable con el iPhone; impedir duplicados, saltos de hoyo o pérdida de datos cuando se interrumpa Bluetooth, Internet o la aplicación.
- Determinar qué funciones pueden operar sin conexión y cómo reconciliar cambios al recuperar el enlace.
- Mantener privacidad, permisos explícitos, consumo razonable de batería y pruebas físicas durante una ronda completa.
- No declarar soporte universal de relojes hasta comprobar modelos, sistemas operativos y limitaciones reales.

### Frases para localizar este pendiente

`Apple Watch`, `Smart Watch`, `smartwatch`, `Wear OS`, `reloj`, `score desde el reloj`, `pendientes por hacer`.

## PEND-HCP-008 · Hándicap oficial ASOGOLF/GHIN

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE DE AUTORIZACIÓN E INTEGRACIÓN OFICIAL
**Prioridad:** Alta · identidad deportiva y competencia verificable

### Objetivo y condiciones

- Resolver para Guatemala una integración autorizada con **ASOGOLF/GHIN** o el mecanismo oficial que corresponda; no extraer ni presentar un índice como oficial sin permiso y trazabilidad.
- Evaluar API autorizada, exportación periódica oficial o ingreso manual marcado expresamente como `NO VERIFICADO`.
- Mantener siempre separado el índice oficial del índice o handicap interno calculado por la aplicación.
- Guardar fuente, fecha de consulta, vigencia y evidencia; una actualización jamás debe reescribir rondas históricas cerradas.
- Probar identidad, duplicados, ausencia de conexión, cambio de índice, cálculo de handicap de cancha y privacidad antes de habilitarlo.

### Frases para localizar este pendiente

`ASOGOLF`, `GHIN`, `USGA handicap`, `índice oficial`, `handicap oficial`, `hándicap de cancha`, `pendientes por hacer`.

## PEND-CAM-009 · Campos de golf mundiales

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE
**Prioridad:** Expansión internacional después de estabilizar voz y datos oficiales

### Objetivo y condiciones

- Incorporar búsqueda y selección de campos mundiales mediante proveedor autorizado, con nombre, país, ubicación, tees, pares, handicaps de hoyo, yardajes/metros, rating, slope y zona horaria verificables.
- Conservar los campos guatemaltecos oficiales existentes y evitar duplicados, datos incompletos o tarjetas inventadas.
- Permitir correcciones versionadas cuando un club cambie tarjeta o tees; conservar la fuente y edición usadas por cada ronda histórica.
- No afirmar cobertura mundial hasta medir países, idiomas, unidades, licencias, actualización y disponibilidad real.

### Frases para localizar este pendiente

`campos mundiales`, `campos internacionales`, `course database`, `tarjetas oficiales`, `rating`, `slope`, `tees`, `pendientes por hacer`.

## PEND-GPS-010 · GPS de golf y distancias por hoyo

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE · GPS EFÍMERO YA USADO ÚNICAMENTE PARA CLIMA Y TRÁFICO
**Prioridad:** Función deportiva posterior a fuentes y precisión verificadas

### Objetivo y condiciones

- Mostrar distancia confiable desde la posición autorizada del jugador hacia frente, centro y fondo de green, y posteriormente objetivos aprobados del hoyo.
- Reutilizar el mismo campo/hoyo activo y no crear otro motor de ronda.
- Obtener mapas/coordenadas deportivas con licencia, medir precisión, batería y comportamiento sin conexión en campos reales.
- No almacenar recorrido o ubicación exacta sin consentimiento; separar GPS de golf, GPS climático y origen efímero de tráfico.
- Probar iPhone, Apple Watch, permisos, señal degradada, bloqueo de pantalla y una ronda completa antes de declararlo operativo.

### Frases para localizar este pendiente

`GPS de golf`, `distancia al green`, `frente centro fondo`, `yardas`, `ubicación del jugador`, `mapa del hoyo`, `pendientes por hacer`.

## PEND-UBI-015 · Detección automática del campo por GPS

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE
**Prioridad:** Después de verificar coordenadas/perímetros de los campos activos

### Objetivo y condiciones

- Detectar el campo probable con GPS autorizado y un catálogo geográfico verificado, sin confundirlo con las distancias deportivas por hoyo.
- Proponer el campo y exigir confirmación o permitir cambio manual; nunca sustituir silenciosamente una ronda activa.
- Resolver señal débil, campos cercanos, permiso denegado, funcionamiento offline, privacidad y pruebas físicas en Guatemala.
- Especificación completa: `PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md`.

## PEND-RSG-016 · Sincronización verificable de Reglas de Golf

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE DE DISEÑO/CONDICIONES DE USO
**Prioridad:** Extensión de `PEND-REG-001`

### Objetivo y condiciones

- Detectar cambios oficiales USGA/The R&A y mantener edición, fecha, fuente, SHA-256, caché versionada y reversión comprobable.
- Separar Reglas generales, clarificaciones, Comité y Reglas Locales, sin declarar licencia o API privada inexistente.
- Mantener el modo offline rotulado y conservar la prohibición absoluta de modificar scores o penalidades sin confirmación.
- Especificación completa: `PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md`.

## PEND-NUB-011 · Nube, cuentas, sincronización y seguridad

**Fecha de registro:** 26 de agosto de 2026
**Estado:** BASE PREPARADA; OPERACIÓN CENTRAL PENDIENTE
**Prioridad:** Infraestructura obligatoria antes de operación comercial

### Objetivo y condiciones

- Activar cuentas y roles de propietario, operador y jugador, con recuperación segura y permisos mínimos.
- Sincronizar rondas, perfiles, torneos, historial y cola local sin duplicar, mezclar ni perder datos cuando falle Internet.
- Endurecer autenticación, sesiones, cifrado, secretos, auditoría, respaldo, eliminación y respuesta a incidentes.
- Mantener datos personales, deportivos, ubicación, contactos y apuestas separados por finalidad y consentimiento.
- Eliminar información local sólo después del acuse íntegro del servidor y conservar una ruta offline recuperable.

### Frases para localizar este pendiente

`nube`, `cuenta`, `sincronización`, `Neon`, `seguridad`, `privacidad`, `respaldo`, `recuperación`, `roles`, `pendientes por hacer`.

## PEND-LIVE-018 · GOLF SCORE CARD GT. LIVE

**Fecha de registro:** 27 de agosto de 2026
**Estado:** V352 CENTRAL Y PREVIEW E2E PASS; V353 CENTRO LIVE LOCAL/PREVIEW/E2E/OBSERVABILIDAD PASS; INSPECCIÓN VISUAL Y PRUEBA FÍSICA IPHONE PENDIENTES
**Prioridad:** Activa por orden expresa del propietario

### Objetivo y condiciones

- Un visitante sin aplicación ni cuenta puede ver en vivo, y sólo leer, la Score Card que el jugador o responsable haya autorizado.
- El permiso se define como un jugador o el grupo completo; el servidor vuelve a filtrar los jugadores en cada publicación.
- El enlace es privado, caduca y puede revocarse. Los secretos se separan entre publicar y mirar, y la base guarda sólo huellas SHA-256.
- El seguimiento bilateral abre una ventana distinta y no puede tocar la ronda ni el escritor oficial en curso.
- Un torneo reúne cualquier cantidad necesaria de grupos mediante páginas y cursores, sin máximo fijo de producto; cada Score Card conserva su arquitectura actual de uno a seis jugadores.
- V353 ofrece dos opciones universales en una ventana separada: `1 · MONITOR GENERAL` para todo el torneo y `2 · MONITOR INDIVIDUAL` para cualquier jugador o grupo; el Individual reutiliza la General sin lecturas adicionales.
- Preview `dpl_2g6KPHDjaWbXuRfR8Ky88ai2U24F` READY y E2E remoto PASS con 20 grupos, 80 jugadores, tres páginas, vínculo individual, revisión LIVE 1, `409` de capitán duplicado y `410` posterior a revocación; cero `error`/`fatal` y cero datos de prueba activos en Neon.
- Cada grupo tiene un único Capitán de Tarjeta. El servidor rechaza un segundo publicador activo con el mismo grupo dentro del torneo.
- `COMPARTIR ♾️` permite enviar el mismo enlace por cualquier aplicación y a cualquier país, sin máximo fijo de invitados; el vínculo sigue siendo sólo lectura, revocable y con vencimiento.
- La cola offline guarda sólo la actualización pendiente más reciente y reintenta al volver la señal.
- Se excluyen contactos, ubicación, audio, IA, clima detallado, códigos privados, juegos y apuestas.
- Especificación completa: `PEND_LIVE_018_GOLF_SCORE_CARD_GT_LIVE.md`.

### Frases para localizar este pendiente

`Live`, `seguir jugador`, `seguir grupo`, `torneo en vivo`, `enlace privado`, `visitante sin aplicación`, `rondas bilaterales`, `sin límite de grupos`, `pendientes por hacer`.

## PEND-EST-012 · Estadísticas avanzadas y análisis

**Fecha de registro:** 26 de agosto de 2026
**Estado:** ESTADÍSTICA LOCAL BÁSICA ENTREGADA; CAPA CENTRAL Y AVANZADA PENDIENTE
**Prioridad:** Posterior a historial central confiable

### Objetivo y condiciones

- Ampliar Gross, Neto, consistencia y tendencia con fairways, greens en regulación, putts, penalidades, sand saves, scrambling y rendimiento por hoyo/campo/periodo.
- Permitir captura opcional breve por voz o manual, sin convertir cada hoyo en un formulario obligatorio.
- Comparar jugador contra sí mismo y grupos autorizados sin exponer información privada.
- Explicar los cálculos y distinguir dato registrado, inferencia y recomendación del Caddie.

### Frases para localizar este pendiente

`estadísticas`, `fairways`, `GIR`, `putts`, `scrambling`, `sand save`, `tendencia`, `análisis`, `pendientes por hacer`.

## PEND-COM-013 · Monetización y operación comercial

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE
**Prioridad:** Final, después de estabilidad, seguridad y cumplimiento

### Objetivo y condiciones

- Definir plan gratuito/pagado, funciones por nivel, pruebas, renovación, cancelación y restauración de compras sin bloquear datos del jugador.
- Preparar términos de uso, política de privacidad, consentimiento, soporte, conservación y eliminación de datos.
- Integrar cobro mediante proveedores reales y estados confirmados; no simular pagos ni entregas.
- Medir costos de IA, clima, tráfico, mapas, almacenamiento y soporte para evitar una operación insostenible.
- Validar App Store/Google Play, impuestos y reglas comerciales aplicables antes de ofrecer el servicio.

### Frases para localizar este pendiente

`monetización`, `suscripción`, `precio`, `pago`, `App Store`, `Google Play`, `términos`, `privacidad`, `soporte`, `pendientes por hacer`.

## PEND-QA-014 · Banco final y certificación integral

**Fecha de registro:** 26 de agosto de 2026
**Estado:** CONTINUO · CADA MÓDULO DEBE SUPERAR SU PROPIA PUERTA
**Prioridad:** Obligatoria antes de cada montaje

### Objetivo y condiciones

- Ejecutar regresión automática completa de una a seis personas, 18 hoyos, todas las modalidades, manual/voz, recuperación, historial, exportaciones y errores de proveedor.
- Añadir pruebas visuales en tamaños reales de iPhone/Android/Apple Watch y pruebas físicas con ruido, acentos, pausas, llamadas, bloqueo, segundo plano y conexión intermitente.
- Probar una ronda completa por cada función nueva, incluyendo correcciones retroactivas, duplicados, cierre, reapertura y batería.
- Registrar evidencia, versión, dispositivo, fecha y resultado; ningún banco simulado sustituye la puerta física correspondiente.
- Mantener Producción intacta hasta PASS completo y autorización expresa `MÓNTALO` del propietario.

### Frases para localizar este pendiente

`banco de pruebas`, `certificación`, `prueba física`, `cero errores`, `100%`, `montarlo`, `pendientes por hacer`.

## V361-SYNCHRONIZED-VOICE · control activo de `PEND-VOZ-003`

- Base única: V360; no se utiliza ni se presenta una rama anterior.
- Cada score válido se ve y se guarda inmediatamente mientras siguen llegando los hoyos siguientes.
- El parser conserva frases naturales para uno o varios jugadores sin adivinar resultados ambiguos.
- AI UNIVERSAL por micrófono no muestra pregunta ni respuesta escrita.
- La recuperación espera la voz masculina de iOS; un 429/503 de Cedar activa respaldo local durante diez minutos.
- Banco automático, Preview y prueba física iPhone continúan siendo tres puertas separadas; Producción queda intacta.
