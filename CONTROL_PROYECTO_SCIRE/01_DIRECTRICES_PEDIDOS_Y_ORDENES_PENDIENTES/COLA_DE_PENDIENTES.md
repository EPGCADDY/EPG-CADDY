# Cola oficial de pendientes · Golf Score Card GT

Este archivo concentra los trabajos que el propietario ha pedido conservar para ejecución futura. Cuando el propietario diga **“busca los pendientes por hacer”**, este documento debe revisarse primero, junto con `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`.

## PEND-REG-001 · Adaptar las Reglas de Golf a la aplicación

**Fecha de registro:** 25 de agosto de 2026  
**Estado:** PENDIENTE · NO INICIADO  
**Prioridad:** Principal, pendiente de orden de ejecución del propietario  
**Solicitud original:** “Tratar de adaptar las reglas de Golf a la aplicación”.

### Objetivo

Integrar las Reglas de Golf a Golf Score Card GT de forma práctica, comprensible y verificable, para que el usuario pueda consultar una situación real desde la pantalla o el micrófono y recibir orientación sin abandonar innecesariamente la ronda.

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
**Estado:** PENDIENTE · NO INICIADO  
**Prioridad:** Principal, pendiente de orden de ejecución del propietario  
**Solicitud original:** “Guardar el clima, también sincronizarlo en la tarjeta dependiendo del campo que se seleccione y su locación”.

### Objetivo

Cuando el usuario seleccione un campo en la pantalla de configuración de la tarjeta, Golf Score Card GT debe identificar la ubicación exacta registrada para ese club, consultar el clima correspondiente, mostrarlo desde esa misma configuración y conservar una fotografía climática dentro de la tarjeta oficial. Si cualquiera de las alternativas de juego selecciona Mayan Golf, el dato debe corresponder precisa y exclusivamente a Mayan Golf; el mismo contrato aplica a cada club y cada tarjeta.

### Alcance proyectado

- Agregar a la matriz maestra de cada campo coordenadas, zona horaria y ubicación oficial verificadas.
- Mostrar el bloque climático inmediatamente después de elegir el campo en Configuración, antes de iniciar la ronda, y mantenerlo dentro de la tarjeta que se está jugando.
- Reutilizar las mismas coordenadas oficiales en todas las alternativas y modalidades que apunten al mismo club; nunca duplicar ubicaciones contradictorias.
- Consultar el clima mediante la ubicación del campo seleccionado; no utilizar como sustituto la ubicación aproximada del teléfono ni una ciudad vecina.
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

`CAMPO SELECCIONADO → COORDENADAS OFICIALES → PROVEEDOR CLIMÁTICO → VALIDACIÓN → SNAPSHOT DE INICIO/CIERRE → TARJETA E HISTORIAL`

El clima será un dato contextual de la ronda. No podrá alterar automáticamente Gross, Neto, handicap, puntos, resultados ni cierre.

### Condiciones de cierre futuro

Sólo podrá declararse terminado cuando todos los campos operativos tengan localización validada, el clima aparezca en Configuración y en la tarjeta activa, exista un proveedor ganador medido en los clubes, funcionen los estados sin conexión/error, el clima sobreviva recuperación y sincronización, aparezca en todos los artefactos oficiales y supere pruebas automáticas y físicas.

### Frases para localizar este pendiente

`clima`, `tiempo`, `temperatura`, `viento`, `lluvia`, `humedad`, `ubicación del campo`, `localización`, `clima en la tarjeta`, `pendientes por hacer`.

## PEND-VOZ-003 · Caddie/Support conversacional humano

**Fecha de registro:** 25 de agosto de 2026  
**Estado:** PENDIENTE · NO INICIADO  
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
- Mantener conversación con preguntas de seguimiento, interrupción por `STOP` y memoria limitada a la ronda activa.
- Contestar en español sencillo, entender términos comunes en español e inglés y explicar como para un niño de 10 años cuando el usuario lo necesite.
- No modificar scores, penalidades, jugadores, modalidad, campo ni cierre mediante una respuesta informativa. Toda acción de escritura exige confirmación separada y verificable.
- Conservar una ruta local limitada para score y navegación cuando no haya conexión; las respuestas abiertas pueden indicar que requieren conexión.
- Medir latencia, exactitud, respuestas con fuente, falsas acciones y cobertura de preguntas antes de habilitarlo públicamente.

### Base técnica evaluada

Los modelos Realtime permiten audio de entrada y salida en tiempo real; los archivos de reglas y manual pueden indexarse en un almacén consultable. La integración debe realizarse con API protegida en servidor, nunca exponiendo una clave en el teléfono: <https://platform.openai.com/docs/models> y <https://platform.openai.com/docs/api-reference/vector-stores-files>.

### Condiciones de cierre futuro

Este pendiente sólo podrá cerrarse después de un banco amplio de preguntas de golf, Manual, clima, conversación general y salud; pruebas por texto y voz con acentos y ruido de campo; validación contra fuentes; control de alucinaciones; prueba de que ninguna pregunta modifica scores; límites médicos verificados y evaluación práctica con golfistas.

### Frases para localizar este pendiente

`caddie conversacional`, `Support conversacional`, `buscador humano`, `experto de golf`, `micrófono humano`, `preguntas de golf`, `clima por voz`, `dolor de tobillo`, `conversación general`, `asistente de voz`, `reglas por voz`, `pendientes por hacer`.
