# Golf Score Card GT — Roadmap Maestro de Pendientes y Upgrades

**Corte vigente:** V280

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

**Estado:** PENDIENTE · `PEND-REG-001`

- Adaptar las Reglas de Golf a la aplicación y al manual sin crear un motor paralelo.
- Permitir consultas naturales por escrito y micrófono, con respuestas breves y una explicación ampliada localizable.
- Diferenciar reglas generales, modalidad activa y Reglas Locales del campo o torneo.
- Cubrir penalidades, alivios, bola perdida o provisional, fuera de límites, áreas de penalidad, bola injugable, búnker, green, bola movida/equivocada, orden de juego, concesiones y cierres de Match Play.
- Mostrar fuente, edición y fecha vigente; no inventar decisiones ni aplicar penalidades automáticamente.
- Exigir confirmación expresa antes de modificar un score, registrar una penalidad o cerrar una ronda.
- Conservar el detalle operativo en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`.

### 12. Clima sincronizado por campo

**Estado:** PENDIENTE · `PEND-CLI-002`

- Asociar cada campo con coordenadas y zona horaria oficiales verificadas.
- Mostrar el clima en Configuración inmediatamente después de elegir el campo y conservarlo dentro de la tarjeta activa.
- Consultar el clima de la ubicación exacta del campo seleccionado y guardarlo con la ronda.
- Mostrar condición, temperatura, sensación, humedad, lluvia, viento, ráfagas, hora y fuente en tarjeta activa y artefactos oficiales.
- Conservar snapshots climáticos de inicio y cierre sin reescribir una tarjeta histórica.
- Compartir la misma integración entre General, Stableford, Match Play, Four Ball y Práctica.
- Permitir consultas climáticas por micrófono sin modificar scores ni resultados.
- Mantener operativa la ronda cuando el clima no esté disponible y rotular claramente cualquier dato anterior.
- Comparar WeatherKit, Tomorrow.io y OpenWeather mediante mediciones en los clubes; WeatherKit es candidato inicial, no proveedor aprobado sin piloto.
- Conservar el detalle operativo en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`.

### 13. Caddie/Support conversacional humano

**Estado:** PENDIENTE · `PEND-VOZ-003`

- Convertir el micrófono y el buscador del Manual vivo en conversación natural por texto o voz, con especialidad prioritaria en golf.
- Separar rigurosamente score, consulta, navegación, conocimiento de golf, clima vivo, conversación general y orientación de salud.
- Abrir la página exacta cuando la pregunta pertenezca al Manual y mantener el buscador local como recuperación inmediata.
- Consultar clima actual por ubicación autorizada o campo activo mediante `PEND-CLI-002`; no inventar datos vivos.
- Responder salud con límites médicos seguros: orientación general, preguntas mínimas, señales de alarma y derivación profesional; nunca diagnóstico o prescripción automática.
- Responder con conocimiento aprobado y fuente; reconocer cuando no exista respaldo suficiente.
- Exigir confirmación independiente antes de toda acción que cambie la ronda.
- Conservar score y navegación básica sin conexión y reservar respuestas abiertas para la capa conectada.
- Validar texto, voz, preguntas de Golf, Manual, clima, conversación general y salud, además de ruido, acentos, latencia, exactitud y falsas acciones.
- Conservar el detalle operativo en `CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/COLA_DE_PENDIENTES.md`.

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

La **1. Estabilización física de la voz** permanece en validación de campo. El siguiente bloque funcional no resuelto es **3. Historial permanente central**. Ningún punto posterior debe duplicar motores ni separar General, Stableford, manual y voz.
