# Golf Score Card GT — Roadmap Maestro de Pendientes y Upgrades

**Corte vigente:** V328 · Reglas oficiales en banco; Preview y validaciones físicas abiertas

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

**Estado:** V328 EN BANCO · centro USGA/The R&A implementado; Preview, voz física y consulta básica offline pendientes · `PEND-REG-001`

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
- **Pendiente real:** consulta básica sin conexión, Preview desplegado, prueba física por voz y revisión de condiciones de uso si se pretende una integración comercial o de marca más profunda. No se declara alianza oficial.

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

**Estado:** V326-R2 RECHAZADA EN IPHONE · V327-R1 APROBADA EN BANCO AUTOMATIZADO Y PREVIEW; validación física prolongada pendiente · `PEND-VOZ-003`

- Convertir el micrófono y el buscador del Manual vivo en conversación natural por texto o voz, con especialidad prioritaria en golf.
- **Fallo real V325:** tráfico futuro y consumo eléctrico dejaron el micrófono rojo abierto sin reacción. La detección semántica paciente no entregó el final del turno y el watchdog existente todavía no había comenzado.
- **Implementado V326:** las órdenes de registro y score conservan cierre rápido de un segundo; AI UNIVERSAL ∞ usa cierre conversacional de 2.2 segundos, guardián de entrada de 15 segundos con límite duro de 90 segundos y guardián de respuesta de 30 segundos. La captura atascada se desmonta y el rojo se apaga; nunca queda escuchando indefinidamente. El micrófono sigue disponible durante respuestas sanas, permite interrupción confirmada, vuelve inmediatamente a escuchar y sólo se cierra por 30 minutos reales de inactividad.
- **Fallo real V326-R2:** después de unas seis consultas, búsquedas web y tráfico podían terminar correctamente en servidor, pero un `stopped` tardío de iPhone desautorizaba el follow-up antes de su audio; además `speech_stopped` retiraba demasiado pronto la vigilancia de transcripción.
- **Implementado V327:** conserva la vigilancia hasta la transcripción, distingue el cierre fuente del audio final, vigila 60 segundos la reproducción y muestra una recuperación si la herramienta pierde el canal. La telemetría técnica excluye preguntas, transcripciones, nombres, ubicación y claves.
- **Aprobado en Preview V327-R1:** 44 llamadas reales, 24 materias, ocho turnos de memoria, clima futuro, investigación web, tráfico actual/futuro y cinco fallos controlados; compilación de 85 paquetes, 310 fuentes, 550 transiciones de voz y cero errores 5xx. La prueba física del micrófono de iPhone sigue siendo obligatoria.
- **Aceptación pendiente obligatoria:** repetir en iPhone tráfico mañana desde El Pulté hacia colonia Oakland zona 10 a las 12:30 PM, tráfico actual El Pulté Golf → Pradera Concepción, consumo eléctrico aproximado de aire acondicionado, persona conocida en Colima y conversación multitema prolongada. No montar antes del PASS físico.

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

**Estado:** PENDIENTE · `PEND-SKI-006`

- Integrar Skins Gross/Neto, Wolf y Vegas dentro del mismo motor de score, sin duplicar captura, cálculo ni persistencia.
- Crear una unidad configurable inicialmente en quetzales, reglas de empate/acumulación, multiplicadores y límites antes de iniciar.
- Incorporar `Amigo`, caída izquierda/derecha, elección de pareja y Dots configurables: Sandy, Greenie, Birdie, Eagle, Barkie, Arnie, Chippie, Poley, Ferret y Snake.
- Cubrir ganadores, acumulados, correcciones, X, cierre, balances, liquidación, historial, voz y tarjeta final, separando score deportivo de dinero.

### 17. Apple Watch y otros smartwatches

**Estado:** PENDIENTE · `PEND-WAT-007`

- Priorizar Apple Watch enlazado con iPhone y evaluar después Wear OS.
- Consultar hoyo y resultado esencial, y registrar scores con toque o voz mediante el mismo motor oficial.
- Resolver sincronización interrumpida, duplicados, funcionamiento sin conexión, batería, permisos y pruebas de ronda completa.

### 18. Hándicap oficial ASOGOLF/GHIN

**Estado:** PENDIENTE DE AUTORIZACIÓN/INTEGRACIÓN · `PEND-HCP-008`

- Resolver API autorizada, exportación oficial o ingreso manual marcado `NO VERIFICADO` para Guatemala.
- Mantener separados índice oficial e índice interno, con fuente, vigencia, fecha y trazabilidad.
- No presentar como oficial ningún dato sin permiso verificable de ASOGOLF/GHIN o la autoridad correspondiente.

### 19. Campos de golf mundiales

**Estado:** PENDIENTE · `PEND-CAM-009`

- Seleccionar proveedor licenciado con tarjetas, tees, par, handicap de hoyo, yardajes/metros, rating, slope, ubicación y zona horaria.
- Conservar fuentes y versiones, evitar duplicados y no inventar datos faltantes.
- Mantener intacta la matriz oficial de Guatemala y aplicar el mismo motor a cualquier país.

### 20. GPS de golf

**Estado:** PENDIENTE; GPS efímero de clima/tráfico ya existe · `PEND-GPS-010`

- Mostrar distancia a frente, centro y fondo de green usando posición autorizada y datos deportivos licenciados.
- Medir precisión, batería, privacidad, señal degradada y operación offline en rondas físicas.
- Enlazar posteriormente con Apple Watch sin duplicar campo, hoyo ni scores.

### 21. Nube, cuentas y seguridad

**Estado:** BASE PREPARADA; OPERACIÓN CENTRAL PENDIENTE · `PEND-NUB-011`

- Activar roles, autenticación, recuperación, sincronización idempotente, respaldo, auditoría y privacidad.
- Recuperar rondas y perfiles autorizados entre dispositivos sin duplicar, mezclar ni perder datos.
- Endurecer secretos, sesiones, cifrado, eliminación y respuesta a incidentes antes de comercializar.

### 22. Estadísticas avanzadas

**Estado:** CONSULTA LOCAL BÁSICA ENTREGADA; CAPA CENTRAL PENDIENTE · `PEND-EST-012`

- Agregar fairways, GIR, putts, penalidades, sand saves, scrambling y análisis por periodo/campo/hoyo.
- Mantener captura opcional breve por voz/manual y explicar todo dato inferido.
- Sincronizar y comparar únicamente datos autorizados cuando exista historial central.

### 23. Monetización y operación comercial

**Estado:** PENDIENTE · `PEND-COM-013`

- Definir niveles, precios, restauración/cancelación, términos, privacidad y soporte.
- Integrar proveedores reales de cobro y medir costos de IA, clima, tráfico, mapas y almacenamiento.
- Validar App Store, Google Play, impuestos y continuidad antes de ofrecer el servicio.

### 24. Banco final y certificación integral

**Estado:** OBLIGATORIO Y CONTINUO · `PEND-QA-014`

- Cada versión debe pasar regresión automática, visual y física en sus dispositivos y modalidades reales.
- Probar ruido, acentos, pausas, conexión intermitente, bloqueo, segundo plano, recuperación y ronda completa.
- Un solo `FAIL` impide montaje; Producción sólo cambia después de PASS completo conforme a la autorización permanente del propietario.

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
