# Golf Score Card GT — Roadmap Maestro de Pendientes y Upgrades

**Corte vigente:** V330-R3 aprobó selección única Wolf en iPhone; V331 publicó la matriz investigada; V332 agrega Q/$ excluyentes y arquitectura completa de acumulados, riesgo y liquidación

**Fuente normativa:** `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`

**Aplicación permanente:** `https://epg-caddy.vercel.app/`

Este documento contiene únicamente funciones reales del producto pendientes o previstas. No incluye auditorías, ramas, publicaciones, permisos, facturación ni administración.

## Mapa único del producto

Todas las configuraciones y combinaciones pertenecen a una sola arquitectura:

`ENTRADA → VALIDACIÓN → OPERACIÓN → CÁLCULO → GUARDADO → RENDER → RESULTADO`

General y Stableford, control manual y voz, ronda nueva y recuperada, uno o seis jugadores, cualquier campo y cualquier categoría deben utilizar esta misma línea operacional.

## Base cerrada — no es pendiente

- ✅ Aplicación oficial alojada permanentemente como **Golf Score Card GT**.
- ✅ General acepta de uno a seis jugadores.
- ✅ General contiene El Pulté, Country Club, San Isidro, Mayan Golf, Hacienda Nueva, Alta Vista y La Reunión.
- ✅ San Isidro y Alta Vista están cargados dentro de la misma arquitectura de campos.
- ✅ Stableford contiene Country Club, El Pulté, San Isidro y Mayan Golf para torneo.
- ✅ General y Stableford comparten Control Manual, voz, escritor de scores, persistencia y navegación.
- ✅ El hoyo activo avanza automáticamente cuando todos los jugadores tienen score o `X`.
- ✅ El Control Manual común contiene `ANTERIOR`, selección directa de hoyo y `SIGUIENTE`, sin perder scores guardados ni omitir el `ENTER` de una edición pendiente.
- ✅ Voz corrida acepta varios jugadores y varios hoyos sin exigir el número del hoyo.
- ✅ La `X` sólo se registra mediante vocabulario explícito y puede corregirse posteriormente.
- ✅ Los scores válidos ya capturados se conservan aunque después se escuche conversación ajena al vocabulario.
- ✅ El aviso `Falta NOMBRE` depende de inactividad real y el micrófono se cierra durante reportes.
- ✅ Todas las tarjetas muestran `OUT`, `IN` y `TOTAL`.
- ✅ Existen regreso a datos, ronda previa, regreso a ronda actual, nueva ronda y borrar scores.
- ✅ Existen Tarjeta Global y tarjetas personales con exportación PNG, PDF individual, PDF conjunto y hoja nativa para guardar o compartir.
- ✅ El historial privado local permite buscar tarjetas oficiales por ronda, fecha, campo, torneo, modalidad y jugador sin reemplazar la ronda actual.
- ✅ El historial incluye consultas estadísticas escritas de Gross, Neto, consistencia, tendencia, comparación y puntos Stableford sobre el historial local.
- ✅ Stableford calcula Gross y puntos por jugador para `OUT`, `IN` y `TOTAL`.
- ✅ Stableford conserva localmente el torneo de cuatro fechas y clasificación por mejores tres resultados.
- ✅ Una ronda cerrada puede corregirse mediante versión oficial nueva, conservando original, motivo, responsable, fecha, SHA-256 y recálculo General/Stableford.

## Orden real de ejecución

### 1. Estabilización física de la voz

**Estado:** EN VALIDACIÓN FÍSICA

- Mantener escucha continua durante tandas largas sin retardar, perder ni saltar nombres o scores.
- Aplicar visualmente cada score al recibirlo, mientras el micrófono continúa abierto.
- Evitar que `Falta NOMBRE` interrumpa una tanda que todavía está siendo dictada.
- Mantener el micrófono completamente cerrado durante anuncios de `OUT`, `IN` y `TOTAL`.
- Ignorar en silencio cualquier conversación fuera del vocabulario sin pausar ni interrumpir el reporte.
- Mantener exactamente el mismo comportamiento en General y Stableford.
- Afinar nombres, ruido de campo, pausas naturales, bloqueo de pantalla, cambio de aplicación y reconexión.
- V275 ancla cada bloque al hoyo inicial, protege frases concurrentes y confirma el silencio antes de anunciar un jugador faltante.

### 2. Movimiento manual entre hoyos

**Estado:** SOLVENTADO V276

- ✅ Botones visibles `ANTERIOR` y `SIGUIENTE` en el Control Manual.
- ✅ Selección directa del hoyo que se desea corregir o completar.
- ✅ Conservación intacta de scores existentes al moverse.
- ✅ Bloqueo de navegación cuando existe una edición pendiente de `ENTER`.
- ✅ Avance automático cuando se completa el hoyo.
- ✅ Controles idénticos en General y Stableford.

### 3. Historial permanente central

**Estado:** PENDIENTE

- Crear acceso de propietario, operador y jugador con permisos definidos.
- Activar la sincronización autenticada entre el dispositivo y la base central ya creada.
- Migrar las rondas existentes del almacenamiento local al historial permanente.
- Recuperar rondas desde cualquier dispositivo autorizado.
- Resolver conflictos sin duplicar, mezclar ni sobrescribir rondas.
- Eliminar datos locales únicamente después de recibir confirmación íntegra del servidor.
- Mantener en el teléfono sólo ronda activa, caché necesaria y operaciones todavía no sincronizadas.

### 4. Jugadores, contactos y privacidad

**Estado:** PENDIENTE

- Crear perfiles centrales de jugadores sin duplicados.
- Permitir asociar contacto únicamente con consentimiento explícito.
- Permitir editar o retirar el consentimiento.
- Recuperar jugadores autorizados al cambiar de dispositivo.
- Mantener separados los datos personales, deportivos y de entrega.

### 5. Stableford central multi-dispositivo

**Estado:** PENDIENTE

- Guardar torneo, fechas, campos, categorías y resultados Stableford en la base central.
- Compartir la misma clasificación oficial entre dispositivos autorizados.
- Incorporar resultados externos mediante una única ruta controlada.
- Mantener el cálculo de mejores tres fechas a partir de resultados oficiales, sin duplicados.
- Conservar General y Stableford dentro del mismo historial y distinguirlos sólo por modalidad y reglas de cálculo.

### 6. Archivos finales de tarjetas

**Estado:** SOLVENTADO V279

- ✅ Exportar Tarjeta Global y tarjetas personales como imagen PNG real.
- ✅ Exportar Tarjeta Global y tarjetas personales como PDF real.
- ✅ Entregar la imagen a la hoja nativa para seleccionar `Guardar imagen` cuando el dispositivo lo permita.
- ✅ Descargar un PDF conjunto multipágina con Global y todas las personales.
- ✅ Crear un historial privado local de tarjetas por ronda, fecha, campo, torneo, modalidad y jugador.

### 7. Correcciones oficiales

**Estado:** SOLVENTADO V277

- ✅ Pantalla única para corregir una ronda cerrada.
- ✅ Conservación permanente de la versión original.
- ✅ Registro de motivo, responsable, fecha, nueva versión y SHA-256.
- ✅ Recálculo General o Stableford y regeneración de archivos vigentes.
- ✅ La versión corregida queda disponible para abrir, descargar y compartir; la original queda en consulta.

### 8. Entrega directa

**Estado:** POSTERIOR

- Enviar tarjetas por correo desde un proveedor transaccional real.
- Enviar tarjetas por WhatsApp Business con consentimiento.
- Mostrar estados reales: pendiente, enviado, entregado o fallido.
- Reintentar sin duplicar envíos.
- Evitar afirmar entrega mientras el proveedor no la confirme.

### 9. Consulta histórica completa

**Estado:** EN PROGRESO · CONSULTA LOCAL SOLVENTADA V280

- ✅ Crear una pantalla escrita local para buscar rondas por jugador, fecha, campo, torneo y modalidad.
- Conectar las consultas de voz al mismo historial central cuando se habilite la sincronización autenticada.
- ✅ Comparar localmente periodos, vueltas, campos, torneos y jugadores.
- ✅ Mostrar promedios, mejores, peores, consistencia, tendencia, categorías de score y puntos Stableford.
- ✅ Abrir desde el historial cada ronda oficial y sus tarjetas correspondientes.

### 10. Preparación comercial

**Estado:** FINAL

- Definir términos de uso y política de privacidad visibles en la aplicación.
- Crear recuperación segura de cuenta y de rondas.
- Crear soporte funcional para propietarios, operadores y jugadores.
- Definir disponibilidad, continuidad y conservación de datos del servicio.

### 11. Reglas de Golf integradas

**Estado:** V328-R2 EN BANCO · centro USGA/The R&A y consulta básica offline implementados; voz física pendiente · `PEND-REG-001`

- Adaptar las Reglas de Golf a la aplicación y al manual sin crear un motor paralelo.
- Buscar y formalizar un enlace oficial/autorizado con USGA y sus Reglas de Golf, sujeto a licencia, atribución, vigencia y capacidades técnicas comprobadas.
- Permitir consultas naturales por escrito y micrófono, con respuestas breves y una explicación ampliada localizable.
- Diferenciar reglas generales, modalidad activa y Reglas Locales del campo o torneo.
- Cubrir penalidades, alivios, bola perdida o provisional, fuera de límites, áreas de penalidad, bola injugable, búnker, green, bola movida/equivocada, orden de juego, concesiones y cierres de Match Play.
- Mostrar fuente, edición y fecha vigente; no inventar decisiones ni aplicar penalidades automáticamente.
- Exigir confirmación expresa antes de modificar un score, registrar una penalidad o cerrar una ronda.
- Conservar el detalle operativo en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`.
- **Implementado V328:** acceso global `REGLAS`; consultas naturales escritas y habladas; búsqueda restringida a fuentes oficiales USGA/The R&A; contexto de campo/modalidad; fuentes visibles; edición 2023 y clarificaciones vigentes; cero escritura de score o penalidad.
- **Banco V328:** 15 situaciones reglamentarias, filtro de dominios, aislamiento de tarjeta, continuidad texto/voz, compilación JavaScript y manual de 74 páginas en 4K/300 dpi aprobados.
- **Preview V328-R1:** deployment `dpl_3Sa4NnueMXBqB2kCm69WdwhH83bv` READY, 86 paquetes aprobados y árbol remoto idéntico al probado; cada build ejecuta además modelo real, búsqueda web, autoridad oficial y `scoreChanged:false`.
- **Modo básico V328-R2:** guarda localmente sólo respuestas ya confirmadas con fuente USGA/The R&A, hasta 24 entradas por 90 días, sin conservar la pregunta completa; exige misma modalidad y coincidencia suficiente, muestra fecha y nunca sustituye una consulta oficial nueva cuando hay conexión.
- **Banco offline V328-R2:** prueba fuentes oficiales, vencimiento, límite, privacidad, modalidad, coincidencias negativas y cero escritura de score. Ya no queda pendiente el modo básico sin conexión; permanece la conversación física hablada.
- **Pendiente real:** prueba física por voz y revisión de condiciones de uso si se pretende una integración comercial o de marca más profunda. No se declara alianza oficial.

### 12. Clima sincronizado por campo

**Estado:** EN PROGRESO · GPS automático visible desde Inicio y dentro de la tarjeta V314; artefactos y validación física pendientes · `PEND-CLI-002`

- Asociar cada campo con coordenadas y zona horaria oficiales verificadas.
- Mostrar el clima en Configuración inmediatamente después de elegir el campo y conservarlo dentro de la tarjeta activa.
- Consultar primero el GPS autorizado del teléfono y guardar la lectura con la ronda; usar la ubicación del campo como respaldo.
- Mostrar condición, temperatura, sensación, humedad, lluvia, viento, ráfagas, hora y fuente en tarjeta activa y artefactos oficiales.
- Conservar snapshots climáticos de inicio y cierre sin reescribir una tarjeta histórica.
- Compartir la misma integración entre General, Stableford, Match Play, Four Ball y Práctica.
- Permitir consultas climáticas por micrófono sin modificar scores ni resultados.
- **Implementado V314:** la primera pantalla muestra condición, temperatura, sensación, lluvia, viento y hora usando primero el GPS. Al abrir una tarjeta activa también muestra y guarda el clima, lo renueva cada diez minutos y nunca actualiza una tarjeta cerrada; si no hay GPS usa el campo seleccionado como respaldo.
- Mantener operativa la ronda cuando el clima no esté disponible y rotular claramente cualquier dato anterior.
- Comparar WeatherKit, Tomorrow.io y OpenWeather mediante mediciones en los clubes; WeatherKit es candidato inicial, no proveedor aprobado sin piloto.
- Conservar el detalle operativo en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`.

### 13. Caddie/Support conversacional humano

**Estado:** V351-R9 RECHAZADA EN IPHONE A LAS 06:23 DEL 28 DE AGOSTO: la tanda multi-hoyo terminó en `missing_score`; el score individual sí se aplicó y la consulta de tráfico devolvió HTTP 502. V351-R10 conserva la captura larga hasta silencio o cierre manual, canonicaliza los dos alias locales comprobados y obliga una respuesta textual visible incluso ante timeout/proveedor caído. Requiere Preview, tráfico vivo y nueva prueba física · `PEND-VOZ-003`

- Convertir el micrófono y el buscador del Manual vivo en conversación natural por texto o voz, con especialidad prioritaria en golf.
- **Fallo real V325:** tráfico futuro y consumo eléctrico dejaron el micrófono rojo abierto sin reacción. La detección semántica paciente no entregó el final del turno y el watchdog existente todavía no había comenzado.
- **Implementado V326:** las órdenes de registro y score conservan cierre rápido de un segundo; AI UNIVERSAL ∞ usa cierre conversacional de 2.2 segundos, guardián de entrada de 15 segundos con límite duro de 90 segundos y guardián de respuesta de 30 segundos. La captura atascada se desmonta y el rojo se apaga; nunca queda escuchando indefinidamente. El micrófono sigue disponible durante respuestas sanas, permite interrupción confirmada, vuelve inmediatamente a escuchar y sólo se cierra por 30 minutos reales de inactividad.
- **Fallo real V326-R2:** después de unas seis consultas, búsquedas web y tráfico podían terminar correctamente en servidor, pero un `stopped` tardío de iPhone desautorizaba el follow-up antes de su audio; además `speech_stopped` retiraba demasiado pronto la vigilancia de transcripción.
- **Implementado V327:** conserva la vigilancia hasta la transcripción, distingue el cierre fuente del audio final, vigila 60 segundos la reproducción y muestra una recuperación si la herramienta pierde el canal. La telemetría técnica excluye preguntas, transcripciones, nombres, ubicación y claves.
- **Aprobado en Preview V327-R1:** 44 llamadas reales, 24 materias, ocho turnos de memoria, clima futuro, investigación web, tráfico actual/futuro y cinco fallos controlados; compilación de 85 paquetes, 310 fuentes, 550 transiciones de voz y cero errores 5xx. La prueba física del micrófono de iPhone sigue siendo obligatoria.
- **Aceptación pendiente obligatoria:** repetir en iPhone tráfico mañana desde El Pulté hacia colonia Oakland zona 10 a las 12:30 PM, tráfico actual El Pulté Golf → Pradera Concepción, consumo eléctrico aproximado de aire acondicionado, persona conocida en Colima y conversación multitema prolongada. No montar antes del PASS físico.
- **Calidad permanente pendiente:** programar una matriz interna obligatoria para que cada respuesta sustantiva sea estudiada, investigada cuando corresponda, profunda, formal, precisa y accionable sin que el usuario tenga que pedirlo nuevamente.
- **Corte físico pendiente:** reproducir y corregir el fallo observado en la quinta conversación, cuando dejó de completar el ciclo después de terminar la pregunta.
- **Aviso bilateral pendiente:** mostrar únicamente `ESCUCHANDO` y `RESPONDIENDO` en rojo visible y parpadeante; eliminar `CADDIE RESPONDIENDO` y cualquier texto adicional de esos dos estados.
- **Fallo físico V346-R1:** Safari activó el respaldo y envió la pregunta, pero la matriz quedó debajo de las seis filas manuales; OpenAI agotó saldo y no existió un intento de Gateway utilizable.
- **Control V347:** matriz viva inmediatamente debajo del micrófono, estados exactos sin texto adicional, error explícito de saldo que confirma que Internet sí funciona y telemetría privada del respaldo.
- **Fallo físico V347:** a las 07:20 el inicio local genérico quedó fuera del respaldo; a las 07:21 el respaldo sí produjo transcripción, pero mostró `PROCESANDO…` y la respuesta terminó bloqueada por `credit_balance_exhausted`.
- **Control V348:** cualquier fallo técnico recuperable de apertura intenta el respaldo; permiso y dispositivo siguen diferenciados; después de reconocer, la matriz pasa directamente de `ESCUCHANDO` a `RESPONDIENDO`; la telemetría privada separa solicitud, inicio y fallo.
- **Fallo físico V348:** el respaldo entregó transcripción a las 08:36, pero la lista repetida fue rechazada, se desvió a respuestas generales y un error de precedencia ocultó el diagnóstico real bajo `PROCESANDO…`.
- **Control V349:** acepta repeticiones idénticas, entiende “otro jugador”, muestra el mensaje real y reinicia cualquier lock al volver a tocar.
- **Fallo físico V349:** a las 08:59 mostró `RESPONDIENDO`, no llenó jugadores y desvió el dictado a respuestas generales, que informó saldo agotado.
- **Control V350:** el micrófono de Registro de jugadores nunca sale hacia AI UNIVERSAL; admite conectores naturales, registra telemetría aplicada/rechazada desde cliente y termina localmente con resultado o instrucción.
- **Fallo físico V350:** Safari convirtió “catorce” en `XIV`; el parser lo incorporó al nombre y aplicó `JAIME XIV BLANCAS JORGE · 6 · AZULES` en una sola fila.
- **Control V351:** interpreta romanos canónicos I–LIV sólo como hándicap de registro, reproduce `Jaime XIV blancas Jorge seis azules` y mantiene la `X` de score fuera de esta conversión.
- **Fallo recuperado hoyo 1:** en una ronda de un jugador, `hoyo uno, cuatro` no tenía jugador por defecto antes del primer recordatorio y podía salir de la ruta de score sin escribir la tarjeta.
- **Control V351-R1:** usa como jugador implícito únicamente al único jugador activo; una ronda grupal jamás adivina. El banco ejecuta escritor, persistencia y render visible del hoyo 1, y el respaldo de score no habla durante el registro.
- **Control V351-R2:** en Safari/iOS, si Web Speech está disponible, el reconocimiento se inicia dentro del toque antes de cualquier espera remota. Esto elimina la ruta observada 429 → gesto vencido → cierre inmediato; la prueba física iPhone sigue obligatoria.
- **Clima visible V351-R2:** la Score Card móvil eleva la condición meteorológica de 7.7 px a 10.5 px con 40 px de altura mínima; Registro usa 11 px/44 px. El proveedor y el refresco siguen siendo Open-Meteo y no dependen del micrófono.
- **Fallo físico V351-R2:** a las 17:12 el iPhone produjo dos transcripciones dentro del Score, pero ambas escaparon hacia AI UNIVERSAL y terminaron en 503 sin escribir Gross.
- **Control V351-R3:** una orden válida se clasifica antes que una consulta; una orden incompleta se rechaza localmente con formato visible. En ambos casos el contador obligatorio de llamadas a IA es cero.
- **Orden de ejecución:** registrar estas tres correcciones y retomarlas después de continuar con la configuración y prueba de SKINS, WOLF, VEGAS y DOTS.

- **Candado de privacidad V312:** no hay activación automática, huella de voz ni reconocimiento biométrico; el jugador debe abrir primero el micrófono con el botón.
- Separar rigurosamente score, consulta, navegación, conocimiento de golf, clima vivo, conversación general y orientación de salud.
- Abrir la página exacta cuando la pregunta pertenezca al Manual y mantener el buscador local como recuperación inmediata.
- Consultar clima actual por ubicación autorizada o campo activo mediante `PEND-CLI-002`; no inventar datos vivos.
- Responder salud con límites médicos seguros: orientación general, preguntas mínimas, señales de alarma y derivación profesional; nunca diagnóstico o prescripción automática.
- Responder con conocimiento aprobado y fuente; reconocer cuando no exista respaldo suficiente.
- Exigir confirmación independiente antes de toda acción que cambie la ronda.
- Conservar score y navegación básica sin conexión y reservar respuestas abiertas para la capa conectada.
- Validar texto, voz, preguntas de Golf, Manual, clima, conversación general y salud, además de ruido, acentos, latencia, exactitud y falsas acciones.
- Conservar el detalle operativo en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`.

### 14. Guía Rápida del Manual

**Estado:** PENDIENTE · `PEND-MAN-004`

- Crear una versión corta, visual y entendible para un niño de 10 años a partir del Manual vigente.
- Incluir los recorridos principales, enlaces exactos al Manual completo, versión web, PDF y acceso desde Support.

### 15. Tránsito y tiempo de llegada por voz

**Estado:** PROVEEDOR Y CREDENCIAL ACTIVOS EN PREVIEW · V327-R1 APROBADA AUTOMÁTICAMENTE; comparación Waze/iPhone pendiente · `PEND-TRA-005`

- AI UNIVERSAL ∞ ya enruta voz y texto a Google Maps Routes con `TRAFFIC_AWARE_OPTIMAL` y resume ETA, demora, distancia y hora sin mostrar mapa ni revelar coordenadas.
- Waze no entrega silenciosamente estos datos a una web común; sus Deep Links abren Waze y su Transport SDK requiere asociación, aplicación nativa aprobada y atribución.
- Timeout, proveedor caído, falta de GPS o permiso regresan una respuesta recuperable para que el micrófono pueda continuar.
- La ruta exacta El Pulté Golf → Pradera Concepción devolvió 15 km y aproximadamente 33 minutos en la medición del diagnóstico. `Concepción` por sí solo es ambiguo y debe generar una única pregunta breve.
- En el banco desplegado V327-R1, El Pulté Golf → Pradera Concepción devolvió 16.1 km y 31 minutos; la salida futura El Pulté Golf → colonia Oakland zona 10 a las 12:30 p. m. devolvió 21.6 km, 48 minutos y 13 minutos de demora prevista.
- No se cierra todavía: requiere pruebas físicas prolongadas en iPhone y comparación de varias rutas/horarios reales en Guatemala contra Waze.

### 16. Juegos y apuestas: Skins, Wolf, Vegas y Dots

**Estado:** V330-R3 APROBÓ SELECCIÓN ÚNICA EN IPHONE; V331 PREVIEW READY; V332 BANCO INTEGRAL PASS, PREVIEW PENDIENTE · `PEND-SKI-006`

- ✅ Skins Gross/Neto, Wolf, Vegas y Dots reutilizan el score oficial, de dos a seis jugadores según el juego, sin segundo capturador.
- ✅ La ventana de opciones conserva a la izquierda las modalidades anteriores y ubica a la derecha los juegos nuevos; la tarjeta principal no cambia de formato.
- ✅ Match Play y Four Ball aceptan hasta tres parejas: Verde 1–2, Oro 3–4 y Azul 5–6.
- ✅ V332 ofrece dos radios excluyentes por juego: `Q · QUETZALES` o `$ · DÓLARES`; la moneda elegida se conserva sin conversión en toda la arquitectura.
- ✅ V331 documenta Wolf como Con pareja/Lobo solitario/Lobo ciego; muestra riesgo, pendientes, carry, unidades netas, dinero movido y pago por diferencia.
- ✅ V331 muestra el cálculo Vegas por hoyo, birdies simultáneos configurables, score de 10 o más, volteos, águilas, topes y puntos movidos.
- ✅ Dots configura eventos y valores con definición en español, puntos positivos/negativos y registros automáticos/manuales; Ferret, `Amigo`, izquierda y derecha son reglas de grupo apagadas por defecto.
- ✅ Correcciones, X, cierre, snapshot SHA-256, Global, personales, Historial, voz, respaldo y restauración cubiertos por V329/V330.
- ✅ Preview `dpl_4k5V9rFwkVXVwuRwktBjtgG4arAv` READY: 89 paquetes, 322 fuentes, tres PDF, cero vulnerabilidades y puerta viva de Reglas aprobados.
- ❌ Prueba física R2: `WOLF` abrió su configuración, pero `RONDA NORMAL` permaneció verde simultáneamente.
- ✅ Prueba física R3: únicamente `WOLF` quedó verde, Ronda Normal se desmarcó y la configuración se abrió.
- ✅ V331 publicada en Preview desde `35898aaaee0c1b32510f47bebb88a2c823e605a6`; despliegue `dpl_7UZ7uKSJQz9hiDdGzrPE2JGDPLKk` en estado `READY`.
- ✅ Banco dirigido V332: moneda, símbolos, estados, acumulados, dinero movido, líder, riesgo, neto a liquidar, cierre, corrección, tarjetas y persistencia aprobados.
- ✅ Auditoría integral V332: 89 paquetes, 325 fuentes y tres inventarios PDF sellados.
- ⏳ Falta publicación del Preview V332.
- ⏳ Falta probar físicamente acuerdos, estados, métricas, acumulados, corrección y liquidación por juego.
- ⏳ Falta revisión visual táctil y una ronda física por juego en iPhone antes de montar.

### 17. Fichas didácticas por modalidad y esquema

**Estado:** PENDIENTE DE DISEÑO, REDACCIÓN, VALIDACIÓN Y PUBLICACIÓN · `PEND-DID-017`

- Crear una hoja web/PDF para Ronda Normal, Stableford, Match Play, Four Ball, Práctica, Skins, Wolf, Vegas, Dots y cada variante que cambie el cálculo.
- Escribir para comprensión de 10 años, con ejemplo completo, estrategia, glosario, errores comunes, estados, acumulados y liquidación.
- Garantizar impresión real en blanco y negro: no depender del color para entender jugadores, ganadores, riesgos ni estados.
- Mantener siempre visible el cálculo monetario general —casillas excluyentes Q/$, unidad, multiplicador, tope y liquidación—; cada grupo decide cuál moneda usa o si juega sólo con puntos/unidades sin liquidar dinero.
- Validar cada ejemplo contra el motor real y versionar las hojas junto con las reglas.
- Especificación: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_DID_017_FICHAS_MODALIDADES_PARA_APRENDER.md`.

### 18. Apple Watch y otros smartwatches

**Estado:** PENDIENTE · `PEND-WAT-007`

- Priorizar Apple Watch enlazado con iPhone y evaluar después Wear OS.
- Consultar hoyo y resultado esencial, y registrar scores con toque o voz mediante el mismo motor oficial.
- Resolver sincronización interrumpida, duplicados, funcionamiento sin conexión, batería, permisos y pruebas de ronda completa.

### 19. Hándicap oficial ASOGOLF/GHIN

**Estado:** PENDIENTE DE AUTORIZACIÓN/INTEGRACIÓN · `PEND-HCP-008`

- Resolver API autorizada, exportación oficial o ingreso manual marcado `NO VERIFICADO` para Guatemala.
- Mantener separados índice oficial e índice interno, con fuente, vigencia, fecha y trazabilidad.
- No presentar como oficial ningún dato sin permiso verificable de ASOGOLF/GHIN o la autoridad correspondiente.

### 20. Campos de golf mundiales

**Estado:** PENDIENTE · `PEND-CAM-009`

- Seleccionar proveedor licenciado con tarjetas, tees, par, handicap de hoyo, yardajes/metros, rating, slope, ubicación y zona horaria.
- Conservar fuentes y versiones, evitar duplicados y no inventar datos faltantes.
- Mantener intacta la matriz oficial de Guatemala y aplicar el mismo motor a cualquier país.

### 21. GPS de golf

**Estado:** PENDIENTE; GPS efímero de clima/tráfico ya existe · `PEND-GPS-010`

- Mostrar distancia a frente, centro y fondo de green usando posición autorizada y datos deportivos licenciados.
- Medir precisión, batería, privacidad, señal degradada y operación offline en rondas físicas.
- Enlazar posteriormente con Apple Watch sin duplicar campo, hoyo ni scores.

### 22. Nube, cuentas y seguridad

**Estado:** BASE PREPARADA; OPERACIÓN CENTRAL PENDIENTE · `PEND-NUB-011`

- Activar roles, autenticación, recuperación, sincronización idempotente, respaldo, auditoría y privacidad.
- Recuperar rondas y perfiles autorizados entre dispositivos sin duplicar, mezclar ni perder datos.
- Endurecer secretos, sesiones, cifrado, eliminación y respuesta a incidentes antes de comercializar.

### 23. Estadísticas avanzadas

**Estado:** CONSULTA LOCAL BÁSICA ENTREGADA; CAPA CENTRAL PENDIENTE · `PEND-EST-012`

- Agregar fairways, GIR, putts, penalidades, sand saves, scrambling y análisis por periodo/campo/hoyo.
- Mantener captura opcional breve por voz/manual y explicar todo dato inferido.
- Sincronizar y comparar únicamente datos autorizados cuando exista historial central.

### 24. Monetización y operación comercial

**Estado:** PENDIENTE · `PEND-COM-013`

- Definir niveles, precios, restauración/cancelación, términos, privacidad y soporte.
- Integrar proveedores reales de cobro y medir costos de IA, clima, tráfico, mapas y almacenamiento.
- Validar App Store, Google Play, impuestos y continuidad antes de ofrecer el servicio.

### 25. Banco final y certificación integral

**Estado:** OBLIGATORIO Y CONTINUO · `PEND-QA-014`

- Cada versión debe pasar regresión automática, visual y física en sus dispositivos y modalidades reales.
- Probar ruido, acentos, pausas, conexión intermitente, bloqueo, segundo plano, recuperación y ronda completa.
- Un solo `FAIL` impide montaje; Producción sólo cambia después de PASS completo conforme a la autorización permanente del propietario.

### 26. Detección automática del campo por GPS

**Estado:** PENDIENTE · `PEND-UBI-015`

- Comparar la ubicación autorizada del iPhone contra coordenadas y perímetros verificados de los campos disponibles.
- Proponer el campo probable, exigir confirmación o permitir selección manual y no cambiar una ronda activa.
- Mantener separado este objetivo de clima/tráfico y de las distancias deportivas frente/centro/fondo.
- Especificación: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_UBI_015_DETECCION_CAMPO_POR_GPS.md`.

### 27. Sincronización verificable de Reglas de Golf

**Estado:** PENDIENTE DE DISEÑO/CONDICIONES DE USO · `PEND-RSG-016`

- Detectar ediciones y clarificaciones oficiales USGA/The R&A mediante un mecanismo permitido y verificable.
- Guardar manifiesto de versión, fecha efectiva, fuente, SHA-256, caché local y reversión.
- Separar Reglas generales, modalidad, Comité y Reglas Locales; nunca modificar scores automáticamente.
- Especificación: `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/PEND_RSG_016_SINCRONIZACION_REGLAS_GOLF.md`.

## Mejoras continuas

- Cobertura de vocabulario, nombres, acentos, ruido y pausas de dictado.
- Funcionamiento estable en iPhone, Android, pantalla bloqueada, segundo plano y reconexión.
- Incorporación de nuevos campos únicamente con información oficial completa.
- Coherencia visual y operacional entre Registro, General, Stableford, Control Manual, tarjeta y resultados.
- Rendimiento con seis jugadores, dieciocho hoyos, historial amplio y conexión intermitente.

## No reabrir ni duplicar

- No crear arquitecturas separadas para General y Stableford.
- No crear escritores separados para control manual y voz.
- No volver a exigir el número del hoyo durante el dictado normal.
- No colocar `X` automáticamente por tiempo ni por silencio.
- No crear una tarjeta personal independiente de la Tarjeta Global oficial.
- No cambiar la línea gráfica aprobada salvo orden expresa.
- No crear una segunda ruta para una operación que ya existe en el motor común.

## Próximo punto obligatorio

La **1. Estabilización física de la voz** permanece en validación de campo. Al obtener PASS físico, la autorización permanente permite montar sin otra consulta y continuar automáticamente con el siguiente pendiente ejecutable. Los bloqueos externos —USGA/ASOGOLF/GHIN, licencias de campos, mapas, tiendas o proveedores— se documentan sin simulación. Ningún punto posterior debe duplicar motores ni separar General, Stableford, manual y voz.

## Corte V345-ICONS · estado verificable

- Golf Score y Manual SCG tienen iconos independientes, RGB y versionados en 180, 192 y 512 px.
- El banco V345 rechaza un Manual casi blanco y obliga a mantener manifiestos, HTML, Service Worker y caché alineados.
- RC-018 está desplegado en el Preview READY `1026a3e`; no se cierra hasta instalar ambos accesos desde ese entorno en un iPhone real.
- Voz física prolongada, artefactos/contraste de clima y repetición real del tráfico V344 continúan abiertos. Producción permanece intacta.

## V351-R4-MATCH-ROMAN-SCORE · Match Play y números Safari · 28 de agosto de 2026

| Archivo exacto | Control V351-R4 | PASS obligatorio |
|---|---|---|
| `index-grupal.html` | `MATCH-ROMAN-GROSS` | `Jaime IV Gustavo V` produce Gross 4/5 en el hoyo activo de Match Play. |
| `index-grupal.html` | `X-OMISSION-BOUNDARY` | `X` nunca se convierte en Gross 10; conserva exclusivamente la omisión oficial. |
| `index-grupal.html` | `NATURAL-SCORE-UNITS` | Acepta `golpe`, `golpes`, `tiro` y `tiros` sin crear otro escritor. |
| `test-v351-r1-hole1-voice-score-render.mjs` | `MATCH-FULL-WRITER` | Ejecuta dos jugadores reales del fallo, parser, escritor grupal, persistencia, render y cero IA. |
| `test-v305-registration-guides-parser-truth.mjs` | `ROMAN-SCOPE` | Mantiene XIV para hándicap, IV/V para Gross y `X` como omisión. |
| `REGISTRO_REINCIDENCIAS_CALIDAD.md` | `RC-028` | Conserva capturas, logs, causa, escape y puerta física. |

V351-R3 queda rechazada por la prueba física de Match Play de las 18:21. Producción permanece intacta; V351-R4 requiere auditoría integral, Preview nuevo y PASS físico iPhone.

## V351-R5-ALL-MODES-VOICE-SCORE · matriz real de voz y jugadores · 28 de agosto de 2026

| Modalidad | Cantidades ejecutadas | Recorrido obligatorio |
|---|---:|---|
| Ronda Normal | 1, 2, 3, 4, 5 y 6 | transcripción → parser → escritor oficial → persistencia → render |
| Stableford | 1, 2, 3, 4, 5 y 6 | misma ruta; el cálculo de puntos permanece en el motor Stableford |
| Match Play | 2, 4 y 6 | una, dos o tres parejas; Gross individual y resultado por hoyos |
| Four Ball | 2, 4 y 6 | una, dos o tres parejas; Gross individual y mejor Neto por pareja |

El banco nuevo ejecuta 18 configuraciones, 72 recorridos de voz y 264 escrituras de Gross. Cada configuración acepta palabras, dígitos, romanos Safari y el hoyo al principio o al final; una pregunta continúa sin escribir. Los rechazos publican únicamente un código cerrado como `missing_score` o `ambiguous_hole`, nunca transcripción, nombres, Gross ni ubicación.

V351-R4 queda rechazada por las capturas `IMG_2116.png`–`IMG_2119.png` y los eventos `browser_fallback_transcript_ready` + `browser_fallback_score_rejected` de las 00:46:21 UTC. Producción permanece intacta; V351-R5 requiere auditoría integral, Preview y PASS físico iPhone.

## V351-R6-CONSECUTIVE-HOLES-VOICE-SCORE · tanda continua 3→4→5 · 28 de agosto de 2026

| Forma de dictado | PASS obligatorio |
|---|---|
| `hoyo 3 … hoyo 4 … hoyo 5 …` | Un Gross inequívoco por jugador y hoyo; una sola transacción. |
| `hoyo 3 … 4 … 5 …` | Los números abreviados abren el siguiente bloque sólo después de un score nombrado. |
| `hoyos 3 4 y 5 …` | Cada jugador aporta exactamente tres Gross en el mismo orden. |
| `JUGADOR hoyo 3 … hoyo 4 … hoyo 5 …` | Conserva el parser estricto anterior y el mismo escritor oficial. |

`test-v351-r6-consecutive-holes-voice-score.mjs` ejecuta las cuatro formas en Ronda Normal/Stableford con 1–6 jugadores y Match Play/Four Ball con 2/4/6: 18 configuraciones, 72 tandas, 792 Gross, persistencia y render. El recorrido físico reproducido pasa además por `processBrowserVoiceTranscript`, termina en `browser_fallback_score_applied` y realiza cero llamadas a AI UNIVERSAL. Preguntas, jugadores ausentes, scores faltantes, duplicados y hoyos inválidos continúan rechazados sin adivinar datos.

V351-R5 queda rechazada por `IMG_2124.png`/`IMG_2125.png` y los eventos privados 01:29:17 `missing_score`, 01:29:39 `ambiguous_score` y 01:29:54 `score_applied` individual, UTC. Producción permanece intacta; V351-R6 requiere auditoría integral, Preview y PASS físico iPhone.

## V351-R7-HYBRID-CONSECUTIVE-HOLES-VOICE-SCORE · prefijo y bloques combinados · 28 de agosto de 2026

R6 recibía primero el formato de lista. Si la misma frase continuaba con bloques completos por hoyo o por jugador, el fallo de esa primera lectura detenía el parser aunque una segunda lectura determinista fuera válida. R7 cambia la regla: una interpretación fallida nunca tapa otra interpretación válida; la recuperación híbrida sólo se activa cuando existe el prefijo plural y después al menos dos marcadores explícitos `hoyo`.

`test-v351-r6-consecutive-holes-voice-score.mjs` ejecuta seis formas en las mismas 18 configuraciones: las cuatro formas R6, prefijo+bloques y prefijo+filas por jugador. Resultado obligatorio: 108 tandas 3→4→5, 1,188 Gross, una transacción de persistencia/render, fallback real y cero IA. Los casos negativos de score faltante, adicional, duplicado y hoyo inválido permanecen rechazados.

El deployment R6 `dpl_29fy1Znkw6BsQuT1z4yQLDa5vhft` registró a las 02:30:34 UTC `ambiguous_score` y a las 02:30:51 UTC el hoyo individual aplicado, sin 4xx/5xx. Producción permanece intacta; R7 requiere auditoría integral, Preview y PASS físico iPhone.

## V351-R8-IOS-FINAL-INTERIM-VISIBLE-ANSWERS · cola completa y respuesta visible · 28 de agosto de 2026

R7 procesaba `(final || interim)` al terminar el reconocimiento de Safari. En frases largas, cualquier fragmento final hacía que se descartara la cola interina todavía válida; el parser recibía una tanda truncada. R8 usa `mergeBrowserVoiceSegments`, deduplica el solapamiento y entrega al escritor la frase completa. El banco reproduce una parte final que termina a mitad del hoyo 4 más una cola interina que continúa hasta el hoyo 5, y exige los seis Gross en una sola transacción.

Las consultas de las 05:16:05 y 05:16:15 UTC sí obtuvieron HTTP 200 de `/api/universal-ai`; no fueron un fallo de clima ni de servidor. El defecto era de presentación: AI UNIVERSAL permanecía oculto y la respuesta dependía de audio. R8 abre el panel visible sin levantar el teclado, conserva el texto aunque iOS no reproduzca audio y registra únicamente `browser_fallback_query_answered` o `browser_fallback_query_failed`, sin pregunta ni respuesta.

Producción permanece intacta; V351-R8 requiere auditoría integral, Preview y PASS físico iPhone de la tanda 3→4→5 y de una pregunta de clima.

## V351-R9-MULTI-ALTERNATIVE-GATEWAY-FIRST · hipótesis segura y proveedor vivo · 28 de agosto de 2026

R8 volvió a registrar `ambiguous_score` en la tanda larga y sólo aplicó el intento individual. El reconocimiento pedía `maxAlternatives=1`; una única hipótesis imperfecta llegaba al parser aunque Safari dispusiera de alternativas. R9 solicita hasta cinco, construye como máximo 16 combinaciones y sólo selecciona una cuando las alternativas válidas producen exactamente los mismos jugadores, hoyos y Gross. Dos resultados válidos distintos bloquean toda escritura.

La consulta posterior llegó a `/api/universal-ai`, pero el proveedor directo devolvió saldo agotado. R9 intenta primero AI Gateway con tres modelos, conserva el proveedor directo como recuperación, clasifica `credit_balance_exhausted` como no reintentable y agrega `test-v351-r9-live-universal-ai.mjs`: el build sólo puede aprobar la ruta general cuando obtiene HTTP 200 real. Las consultas explícitas de clima continúan directas a Open-Meteo y no consumen IA.

El primer Preview R9 aprobó la puerta del build, pero la comprobación visual real todavía devolvió saldo agotado: la Function no recuperaba el OIDC desde su contexto de ejecución. R9 incorpora `@vercel/oidc`, usa `getVercelOidcToken()` en runtime y conserva el mismo token en los follow-ups de clima y tráfico. El candidato sólo puede aprobarse después de repetir la pregunta general contra el deployment ya `READY`.

Producción permanece intacta; R9 no se aprueba hasta puerta viva, Preview READY y PASS físico iPhone del dictado corrido más una pregunta general.

## V351-R10-LONG-CAPTURE-TRAFFIC-ALIAS · captura sostenida y tráfico visible · 28 de agosto de 2026

Los logs del Preview R9 separan las dos incidencias. A las 12:21:35 UTC la tanda del Score llegó al procesador pero terminó en `missing_score`; dieciocho segundos después un score individual sí fue aplicado. A las 12:23:51 UTC la consulta de tráfico llegó a `/api/universal-ai` y devolvió HTTP 502. No fue un fallo de permiso ni de apertura del micrófono.

R10 cambia el transporte alternativo de Safari de una sola emisión a captura continua. Cada resultado reinicia una ventana de tres segundos; al vencerla o al tocar el micrófono para cerrarlo, la cola completa pasa una sola vez por las alternativas, el parser y el escritor oficial. No se permiten escrituras parciales ni se adivina un Gross faltante.

La consulta hablada abreviada se canonicaliza a los lugares completos antes de Google Maps Routes. El cliente conserva el mensaje seguro del proveedor, agrega un límite de 60 segundos y siempre pinta una respuesta final o un error visible; `RESPONDIENDO` no puede quedar indefinido.

`test-v351-r6-consecutive-holes-voice-score.mjs` mantiene 18 configuraciones, 108 tandas, 1,188 Gross y cero IA para Score, y ahora bloquea `continuous=true`, el cierre con cola pendiente y la finalización única. `test-v324-real-traffic.mjs` reproduce la frase corta reportada sin guardar ubicación del propietario. Producción permanece intacta hasta Preview READY, tráfico vivo y PASS físico iPhone.
