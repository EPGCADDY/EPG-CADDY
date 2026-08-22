# GOLF Score Card Guatemala — Arquitectura de Base Central

## Decisión aprobada

La aplicación tendrá una base PostgreSQL central, alojada y administrada. La opción recomendada para el despliegue actual en Vercel es Neon Postgres mediante Vercel Marketplace.

La base central será la única fuente permanente de verdad para jugadores, rondas, scores, consentimientos, archivos generados, correcciones, estadísticas y entregas. El historial se consulta dentro de la misma aplicación, pero no reside permanentemente en el teléfono. El dispositivo conserva solamente la ronda activa, una caché mínima y la cola de sincronización; después de confirmación remota, los datos temporales se purgan automáticamente.

## Principios

1. Jugar no requiere correo, WhatsApp ni consentimiento de entrega.
2. Contacto escrito no equivale a consentimiento.
3. Consentimientos son eventos auditables y revocables; no se sobrescriben.
4. Una ronda cerrada es inmutable.
5. Una corrección crea una nueva versión y preserva la original.
6. Scores y estadísticas no se duplican en motores paralelos.
7. Los envíos son idempotentes y verificables.
8. El cliente nunca recibe credenciales directas de PostgreSQL.
9. Toda escritura remota pasa por APIs autenticadas y validadas.
10. La aplicación debe seguir registrando una ronda si temporalmente no hay señal.

## Almacenamiento

- PostgreSQL alojado: identidades, contactos, consentimientos, rondas, participantes, scores, versiones y entregas.
- Vercel Blob privado o almacenamiento equivalente: imágenes/PDF/paquetes finales.
- Teléfono: ronda activa, caché temporal mínima, snapshots pendientes y cola offline; nunca el historial permanente.
- Aplicación: pantalla única de historial que consulta la base central y permite reconstruir rondas, tarjetas, estadísticas y récords en cualquier dispositivo autorizado.
- Backups del proveedor: recuperación puntual; deben probarse restauraciones periódicas.

## Sincronización offline

Cada mutación lleva:

- `client_mutation_id` único;
- identificador del dispositivo o instalación;
- versión de esquema;
- fecha del dispositivo;
- fecha recibida por servidor;
- versión esperada del registro.

El servidor acepta una mutación una sola vez. Si recibe nuevamente el mismo `client_mutation_id`, devuelve el resultado anterior. Los conflictos nunca se resuelven por “último dispositivo gana” en rondas cerradas, consentimientos o entregas.

## Seguridad

- TLS obligatorio.
- Secretos únicamente en variables de entorno del servidor.
- Cifrado del proveedor en reposo.
- Contactos excluidos de logs y mensajes de error.
- Acceso por roles y mínimo privilegio.
- Auditoría de lectura sensible, cambios de consentimiento, cierres, correcciones y entregas.
- Retención y eliminación definidas antes de lanzamiento.
- Exportación de datos del jugador y atención de solicitudes de privacidad.

## Estado comprobado al 20 de agosto de 2026

- Neon Postgres está provisionado y conectado al proyecto Vercel.
- `GET /api/database-health` responde `ok:true`, base `neondb` y nueve tablas.
- `DATABASE_URL` está disponible en Producción.
- La migración inicial está aplicada.
- La API `/api/sync` existe, pero el transporte permanece cerrado porque falta configurar `SYNC_TOKEN`; responde correctamente `SYNC_AUTH_NOT_CONFIGURED`.
- La modalidad Stableford V199 conserva temporalmente en el navegador la serie de cuatro fechas y las tres mejores tarjetas por jugador. Esta persistencia local permite la operación inmediata, pero no sustituye la fuente central ni se considera historial multi-dispositivo.

## Dependencias restantes para activación integral

1. Configurar y custodiar `SYNC_TOKEN` en los entornos autorizados.
2. Conectar el cliente y la cola local con la API autenticada.
3. Definir identidad y permisos de propietario, operadores y jugadores.
4. Aprobar política de privacidad y términos.
5. Ejecutar pruebas de backup, restore, concurrencia, offline y migración retroactiva.
6. Crear el modelo central de series Stableford, fechas, categorías y resultados oficiales, y migrar el acumulado local con claves idempotentes.

## Preparación V255 — perfil reutilizable

- `database/002_player_profiles_and_history.sql` prepara un código privado único por jugador, el último handicap, las últimas marcas y la tabla append-only `player_profile_events` para conservar cada cambio de nombre, handicap, marcas o WhatsApp.
- La interfaz V255 guarda y recupera estos perfiles en el directorio privado del dispositivo mientras la sincronización central permanece cerrada.
- La migración todavía no se considera aplicada en Producción y la aplicación no debe afirmar permanencia central ni consulta multi-dispositivo hasta habilitar autenticación, ejecutar la migración y probar el recorrido completo.
- `COMPARTIR` aparece únicamente como proyecto de selección de información. El intercambio entre usuarios será permitido en una fase posterior, pero en V255 no existe autorización ni transporte y la acción final permanece deshabilitada.

La base central ya está alojada y responde. Hasta completar los puntos restantes, no se considera habilitada la sincronización comercial de datos personales y rondas.
