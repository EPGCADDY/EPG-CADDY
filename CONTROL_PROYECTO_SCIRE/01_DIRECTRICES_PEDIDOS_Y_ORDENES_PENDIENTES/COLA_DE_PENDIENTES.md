# Cola oficial de pendientes · Golf Score Card GT

Este archivo concentra los trabajos que el propietario ha pedido conservar para ejecución futura. Cuando el propietario diga **“busca los pendientes por hacer”**, este documento debe revisarse primero, junto con `GOLF_SCORE_CARD_GT_PENDING_MATRIX.md`.

## PEND-REG-001 · Adaptar las Reglas de Golf a la aplicación

**Fecha de registro:** 25 de agosto de 2026  
**Estado:** EN PROGRESO · CONSULTA CONVERSACIONAL DISPONIBLE; FUENTES REGLAMENTARIAS Y VALIDACIÓN PENDIENTES
**Prioridad:** Principal, pendiente de orden de ejecución del propietario  
**Solicitud original:** “Tratar de adaptar las reglas de Golf a la aplicación”.

### Objetivo

Integrar las Reglas de Golf a Golf Score Card GT de forma práctica, comprensible y verificable, para que el usuario pueda consultar una situación real desde la pantalla o el micrófono y recibir orientación sin abandonar innecesariamente la ronda.

La solución debe buscar un enlace oficial y autorizado con **USGA** y sus **Reglas de Golf**, respetando licencia, atribución, vigencia, condiciones de uso y capacidades técnicas reales. No se simulará una integración ni se copiarán contenidos restringidos sin autorización.

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
**Estado:** EN PROGRESO · CADDIE UNIVERSAL V314 EN TODOS LOS MICRÓFONOS; BUSCADOR-TEXTO Y VALIDACIÓN FÍSICA PENDIENTES
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

### Condiciones de cierre futuro

Este pendiente sólo podrá cerrarse después de un banco amplio de preguntas de golf, Manual, clima, conversación general y salud; pruebas por texto y voz con acentos y ruido de campo; validación contra fuentes; control de alucinaciones; prueba de que ninguna pregunta modifica scores; límites médicos verificados y evaluación práctica con golfistas.

### Frases para localizar este pendiente

`caddie conversacional`, `Support conversacional`, `buscador humano`, `experto de golf`, `micrófono humano`, `preguntas de golf`, `clima por voz`, `dolor de tobillo`, `conversación general`, `asistente de voz`, `reglas por voz`, `pendientes por hacer`.

## PEND-MAN-004 · Crear Guía Rápida desde el Manual de Funciones

**Fecha de registro:** 25 de agosto de 2026
**Estado:** PENDIENTE
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
**Estado:** IMPLEMENTADO EN CÓDIGO V324 · ACTIVACIÓN Y VALIDACIÓN REAL PENDIENTES
**Prioridad:** Alta · pendiente credencial/facturación, destino exacto y comparación Guatemala/iPhone
**Solicitud original:** preguntar al Caddie cuánto tráfico hay para ir a casa en Pradera y escuchar únicamente tiempo estimado y comentarios, sin abrir una gráfica de navegación.

### Objetivo

Permitir una pregunta natural como `¿Cómo está el tráfico para ir a mi casa en Pradera?` y responder por voz con duración estimada, demora por tráfico y resumen de la ruta, sin modificar la tarjeta ni mostrar un mapa.

### Arquitectura implementada en V324

`GPS DEL TELÉFONO → DESTINO EXACTO GUARDADO CON CONSENTIMIENTO → GOOGLE MAPS ROUTES CON TRÁFICO → RESUMEN DE TIEMPO → RESPUESTA DEL CADDIE`

- La consulta natural de AI UNIVERSAL ∞ usa una función real de tráfico y Google Maps Routes con `TRAFFIC_AWARE_OPTIMAL`; devuelve ETA, demora, distancia, hora de cálculo y nivel derivado, tanto a texto como a voz.
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

## PEND-SKI-006 · Modalidad de juego Skins

**Fecha de registro:** 26 de agosto de 2026
**Estado:** PENDIENTE
**Prioridad:** Función nueva solicitada por el propietario

### Objetivo

Agregar **Skins** dentro de la arquitectura única de Golf Score Card GT, reutilizando registro, campos, handicap, captura manual y por voz, persistencia, historial y tarjeta final.

### Alcance mínimo para diseñar y aprobar

- Definir Skins Gross y Neto, número de jugadores, valor por hoyo y moneda/unidad opcional.
- Definir antes de programar si los empates acumulan el Skin al hoyo siguiente, se dividen o se anulan.
- Calcular ganador por hoyo, acumulados pendientes, Skins ganados por jugador y resultado final.
- Mantener scores individuales intactos y separar claramente score deportivo de cualquier valor económico.
- Permitir anotación manual y por voz mediante el mismo escritor oficial; una consulta nunca debe modificar resultados.
- Cubrir correcciones retroactivas, X explícita, hoyo 18 con acumulado pendiente, ronda recuperada, exportación e historial.
- Añadir pruebas automáticas, visuales y físicas antes de declararlo operativo.

### Frases para localizar este pendiente

`Skins`, `juego Skins`, `Skin por hoyo`, `empate acumulado`, `pozo por hoyo`, `modalidad nueva`, `pendientes por hacer`.

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
