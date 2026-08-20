# Tarjeta Oficial — Matriz Maestra de Pendientes

**Corte auditado:** V194 en validación y publicación; Vercel Pro activo, verificado el 20 de agosto de 2026
**Fuente normativa:** `GOLF_SCORE_CARD_GT_GRUPAL_MANUAL_MAESTRO.md`

## Regla

Esta matriz no autoriza cambios visuales por sí sola. Todo pendiente debe seguir la secuencia aprobada, superar pruebas y actualizar el Manual Maestro.

### Aviso obligatorio al propietario

Cuando cualquier bloqueo, autenticación, permiso, publicación, acceso a GitHub/Vercel, uso de la PC o intervención manual dependa del propietario, se le debe informar **inmediatamente en la misma interacción en que se detecte**. Está prohibido guardar silencio, continuar aparentando que el proceso está completo o esperar a que el propietario descubra el bloqueo. El aviso debe explicar:

1. qué quedó detenido;
2. por qué se necesita su intervención;
3. qué dispositivo o servicio debe abrir;
4. el paso exacto que debe realizar;
5. cuándo puede retirarse y dejar que continúe el procesamiento.

La tarea permanece marcada como `BLOQUEADA — ESPERANDO AL PROPIETARIO` hasta resolver la dependencia. Esta regla aplica aunque el código local haya superado todas las pruebas.

### Regla de traspaso inmediato de la pelota

Cuando la solución dependa del propietario, el asistente debe pasarle inmediatamente la acción con motivo, servicio, dispositivo y pasos numerados. Cuando la solución dependa del asistente, debe ejecutarla sin detener el proceso ni pedir confirmaciones innecesarias. Ningún bloqueo puede permanecer oculto o esperando silenciosamente.

### Comando mandatorio 👍🏻

Cuando el asistente solicite `👍🏻` para seguir y el propietario lo envíe, debe reanudar inmediatamente el trabajo real pendiente. Está prohibido responder sólo con `👍🏻`, confirmar sin ejecutar o quedarse esperando sin causa. Debe continuar hasta concluir o informar inmediatamente un bloqueo que requiera al propietario.

| Prioridad | Módulo | Estado real | Próxima condición de PASS |
|---|---|---|---|
| P0 | Tarjeta en sucio sin registro | Publicada V193; verificación técnica remota completada | La flecha activa automáticamente seis nombres opcionales editables y seis bloques sólo Gross; sin HDCP, círculos, Neto ni `+/-`; acepta hoyos salteados y dictado por posición/nombre; cero efectos en historial, récords, tarjetas o envíos. |
| P0 | Regla de trazabilidad funcional | Obligatoria permanente | Toda función aprobada debe constar simultáneamente en código, Matriz, manual y pruebas de aceptación; con una evidencia faltante continúa pendiente. |
| P0 | Sistema tipográfico, campos y cronómetro | Publicado V193; verificación técnica remota completada | Fecha/estado/hora/Campo/Par/Slope, nombres de los campos e Información del campo con familia, mayúsculas, peso y alineación homologados; línea compacta `INICIO … · RONDA …` en verde neón y sin cortes. |
| P0 | Alineación fina del encabezado y la tarjeta | Implementada V194; pendiente verificación remota | FECHA/HORA usan exactamente la familia y peso de CAMPO/PAR/SLOPE; HOYO, PAR y YDS quedan centrados dentro de la columna conceptual. |
| P0 | Espaciado del reloj y encabezados del registro | Implementado V194; pendiente verificación remota | La franja usa el ancho lateral disponible y separa claramente `INICIO · RONDA` de TIMER; `HDCP - MARCAS - TEES` tiene columnas independientes sin textos encimados. |
| P0 | Actualización obligatoria | Implementada V192; pendiente verificación remota | Una versión vencida bloquea toda la interfaz y sólo `ACTUALIZAR` conserva la ronda y carga la publicación vigente sin caché. |
| P0 | Aviso de intervención del propietario | Obligatorio permanente | Informar inmediatamente cualquier necesidad de PC, autenticación, permiso o acción manual, con instrucciones exactas. |
| P0 | Comando 👍🏻 de continuación | Obligatorio permanente | Al recibirlo después de solicitarlo, ejecutar todo lo pendiente; nunca responder con un simple acuse. |
| P0 | Publicación funcional V185 | PASS remoto | Index completo, histórico y cola offline verificados públicamente; únicamente la última actualización documental quedó bloqueada. |
| P0 | Publicación documental más reciente | Lista para publicación consolidada | El bloqueo `build-rate-limit` pertenecía al plan Hobby; relanzar un único commit y verificar Producción. |
| HECHO | Vercel Pro | Activo y verificado | Billing del equipo muestra `Pro Plan · Active`, ciclo 19-08-2026 a 19-09-2026, factura próxima de USD 20 y crédito incluido de USD 20. |
| P0 | Control de compilaciones Vercel | Obligatorio permanente | Una publicación atómica por bloque; evitar commits archivo por archivo y previews innecesarios de la rama de respaldo. |
| P0 | Traspaso inmediato de bloqueos | Obligatorio permanente | Si la pelota está del lado del propietario, avisar y numerar pasos inmediatamente; si está del lado técnico, continuar sin pausa. |
| P0 | Fuente documental | Sincronizada V185 | Manual V185 normativo; matriz registra capacidades, no cada frase equivalente. |
| P0 | Base central alojada | Arquitectura y SQL aprobados | Provisionar Neon, configurar `DATABASE_URL`, aplicar migración y probar restore. |
| P0 | Identidad/autenticación | Pendiente | Definir propietario, operadores, jugadores y permisos antes de exponer APIs. |
| P0 | Privacidad/consentimiento | Base local | Crear UI y API de otorgamiento/retiro con evidencia y política aprobada. |
| P0 | Cierre oficial | Operativo local V184 | Publicar y validar físicamente cierre, reapertura e inmutabilidad antes de PASS comercial. |
| P0 | Seguridad | Pendiente | Threat model, rate limits, validación, logs sin PII y gestión de secretos. |
| P1 | Sincronización offline | Motor de cola operativo local | Falta transporte autenticado, API central, resolución de conflictos y prueba física sin señal. |
| P1 | Historial remoto | Pendiente | Sincronizar rondas y consultar por jugador, fecha, campo y torneo. |
| P1 | Tarjeta Global archivo | Operativa local HTML | Derivada exclusivamente del snapshot oficial; falta exportación PDF/imagen y validación física. |
| P1 | Tarjeta personal ampliada | Operativa local HTML | Estadísticas, gráfica y resumen desde el snapshot; falta exportación PDF/imagen y validación física. |
| P1 | Guardar/compartir/descargar | Pendiente | Archivos reales en hoja nativa, Fotos y paquete conjunto. |
| P1 | Correcciones versionadas | Motor operativo local | Falta interfaz autorizada, persistencia central, regeneración/reenvío y validación física. |
| P1 | Motor de entregas | Diseñado | Persistencia idempotente y estados verificables. |
| P1 | Correo transaccional | Dependencia externa | Elegir proveedor, dominio, SPF/DKIM/DMARC y plantillas. |
| P1 | WhatsApp automático | Dependencia externa | WhatsApp Business Platform, número, plantillas y consentimiento. |
| P2 | Consultas históricas por voz | Motor local V185 | Falta conectar la fuente central, permisos y pruebas físicas extensas de frases combinadas. |
| P2 | Consultas escritas | Motor compartido local V185 | Falta interfaz escrita de historial y consulta central autenticada. |
| P2 | Biblioteca visual | Pendiente | Navegación por rondas, torneos, fechas, campos y jugadores. |
| P2 | Gráficas personales | Operativa local | Comportamiento Neto contra Par por hoyo; falta regresión visual física. |
| P1 | Inteligencia histórica combinable | Operativa local V185 | Consulta por hoy/ayer/franja/última jugada/último mes + hoyo/vuelta/ronda + promedio/reporte/categoría/ranking; ampliar filtros de jugador, torneo y campo al conectar base central. |
| P1 | Zona horaria y calendario | Operativa local V185 | Cálculo explícito en `America/Guatemala`; validar cambios de fecha en dispositivo físico. |
| P1 | Filtros históricos cruzados | Operativos localmente | Combina periodo, últimas N rondas, jugador reconocido, campo registrado, hoyo o vuelta; falta consulta central multi-dispositivo. |
| P1 | Estadística histórica avanzada | Operativa localmente | Promedio Gross/Neto, mejor, peor, porcentaje por categoría, consistencia y tendencia; falta comparación formal entre dos ventanas nombradas. |
| P0 | Respaldo retroactivo ilimitado | Pendiente externo obligatorio | PostgreSQL central será la única fuente permanente; migrar las rondas locales existentes, verificar restauración y luego purgar historial del dispositivo. |
| P0 | Historial dentro de la aplicación | Pendiente backend/UI | La pantalla consulta el alojamiento central y reconstruye rondas, tarjetas, estadísticas y récords sin descargar el histórico completo al teléfono. |
| P0 | Purga segura del dispositivo | Pendiente backend | Conservar sólo ronda activa/caché/cola; purgar únicamente después de acuse remoto e integridad comprobada. |
| P0 | Cola idempotente del dispositivo | Motor local operativo | ID único, hash de payload, reintentos, detección de conflicto y purga sólo con acuse íntegro; falta conectar transporte/API central. |
| P1 | Motor de Tarjeta corregida | Operativo local | Preserva original, exige motivo/autorizador, incrementa versión y enlaza hashes; falta interfaz autorizada, persistencia central y reenvío idempotente. |
| P2 | Resumen automático | Operativo local en tarjeta personal | Falta validación editorial, PDF/imagen, histórico central y prueba de regresión. |
| P2 | Validación de campo | Continua | Micrófono, ruido, iPhone/Android, background y reconexión. |
| P2 | Cobertura lingüística | Continua | Matriz de frases, plurales, nombres y ambigüedades. |
| P0 | X automáticas | Publicada y cubierta por prueba | Abrir rondas antiguas en validación de campo y confirmar reparación segura. |
| P3 | Multi-campo | Pendiente | Expandir base oficial de campos sin romper El Pulté. |
| P3 | Tarjetas oficiales de tres campos adicionales | Esperando archivos del propietario | Recibir imágenes completas, transcribir y validar casilla por casilla antes de habilitar cada campo. |
| P3 | Comercialización | Pendiente | Términos, privacidad, soporte, costos, monitoreo y recuperación. |

## Hallazgos documentales

- `EPG_CADDY_PLAN_CAMBIOS.md` es un artefacto histórico con código V94 y reglas superadas; no puede operar como fuente normativa.
- `README.md` todavía describe módulos centrales como futuros aunque varios ya existen; requiere alineación.
- `APP_ARCHITECTURE.md` y el Blueprint describen una base genérica pero no consentimiento, versionado, idempotencia ni offline; requieren actualización.
- El título “Estado funcional al corte V140” estaba obsoleto y fue actualizado a V155 durante esta auditoría.
- Producción y la rama segura reciben publicaciones explícitas; cada versión debe verificarse contra la URL pública para evitar que una vista previa se confunda con Producción.
- El silencio ante una dependencia del propietario constituye un fallo de proceso, aunque el cambio local esté correcto; debe registrarse y corregirse inmediatamente.
