# Tarjeta Oficial — Matriz Maestra de Pendientes

**Corte auditado:** V170 reconciliada
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

### Comando mandatorio 👍🏻

Cuando el asistente solicite `👍🏻` para seguir y el propietario lo envíe, debe reanudar inmediatamente el trabajo real pendiente. Está prohibido responder sólo con `👍🏻`, confirmar sin ejecutar o quedarse esperando sin causa. Debe continuar hasta concluir o informar inmediatamente un bloqueo que requiera al propietario.

| Prioridad | Módulo | Estado real | Próxima condición de PASS |
|---|---|---|---|
| P0 | Aviso de intervención del propietario | Obligatorio permanente | Informar inmediatamente cualquier necesidad de PC, autenticación, permiso o acción manual, con instrucciones exactas. |
| P0 | Comando 👍🏻 de continuación | Obligatorio permanente | Al recibirlo después de solicitarlo, ejecutar todo lo pendiente; nunca responder con un simple acuse. |
| P0 | Publicación V170 | Pendiente de verificación remota | Publicar el commit reconciliado y comprobar el despliegue antes de declararlo operativo en producción. |
| P0 | Fuente documental | Reconciliada localmente | Manual V170 normativo; plan V94 histórico; ECOS, arquitectura, SQL y pruebas restaurados. |
| P0 | Base central alojada | Arquitectura y SQL aprobados | Provisionar Neon, configurar `DATABASE_URL`, aplicar migración y probar restore. |
| P0 | Identidad/autenticación | Pendiente | Definir propietario, operadores, jugadores y permisos antes de exponer APIs. |
| P0 | Privacidad/consentimiento | Base local | Crear UI y API de otorgamiento/retiro con evidencia y política aprobada. |
| P0 | Cierre oficial | Pendiente | Motor inmutable con todos los scores, cero X y hash de snapshot. |
| P0 | Seguridad | Pendiente | Threat model, rate limits, validación, logs sin PII y gestión de secretos. |
| P1 | Sincronización offline | Diseñada | Cola idempotente, reintentos, conflictos y pruebas sin señal. |
| P1 | Historial remoto | Pendiente | Sincronizar rondas y consultar por jugador, fecha, campo y torneo. |
| P1 | Tarjeta Global archivo | Pendiente | Generar imagen/PDF verificable desde snapshot cerrado. |
| P1 | Tarjeta personal ampliada | Pendiente | Estadísticas y resumen desde el mismo motor, sin fórmulas paralelas. |
| P1 | Guardar/compartir/descargar | Pendiente | Archivos reales en hoja nativa, Fotos y paquete conjunto. |
| P1 | Correcciones versionadas | Pendiente | Preservar original, generar `TARJETA CORREGIDA` y auditar autorización. |
| P1 | Motor de entregas | Diseñado | Persistencia idempotente y estados verificables. |
| P1 | Correo transaccional | Dependencia externa | Elegir proveedor, dominio, SPF/DKIM/DMARC y plantillas. |
| P1 | WhatsApp automático | Dependencia externa | WhatsApp Business Platform, número, plantillas y consentimiento. |
| P2 | Consultas históricas por voz | Pendiente | Consultas de sólo lectura contra base central con permisos. |
| P2 | Consultas escritas | Pendiente | Misma intención, fuente, permisos y respuesta que la voz. |
| P2 | Biblioteca visual | Pendiente | Navegación por rondas, torneos, fechas, campos y jugadores. |
| P2 | Gráficas personales | Pendiente | Definir métrica, escala, accesibilidad y regresión visual. |
| P2 | Resumen automático | Pendiente | Texto trazable exclusivamente a estadísticas calculadas. |
| P2 | Validación de campo | Continua | Micrófono, ruido, iPhone/Android, background y reconexión. |
| P2 | Cobertura lingüística | Continua | Matriz de frases, plurales, nombres y ambigüedades. |
| P0 | X automáticas | Corregida localmente V155 | Publicar, abrir rondas antiguas y confirmar cero creación nueva y reparación segura. |
| P3 | Multi-campo | Pendiente | Expandir base oficial de campos sin romper El Pulté. |
| P3 | Comercialización | Pendiente | Términos, privacidad, soporte, costos, monitoreo y recuperación. |

## Hallazgos documentales

- `EPG_CADDY_PLAN_CAMBIOS.md` es un artefacto histórico con código V94 y reglas superadas; no puede operar como fuente normativa.
- `README.md` todavía describe módulos centrales como futuros aunque varios ya existen; requiere alineación.
- `APP_ARCHITECTURE.md` y el Blueprint describen una base genérica pero no consentimiento, versionado, idempotencia ni offline; requieren actualización.
- El título “Estado funcional al corte V140” estaba obsoleto y fue actualizado a V155 durante esta auditoría.
- El despliegue público continúa por detrás de los commits locales debido a autenticación GitHub ausente.
- El silencio ante una dependencia del propietario constituye un fallo de proceso, aunque el cambio local esté correcto; debe registrarse y corregirse inmediatamente.
