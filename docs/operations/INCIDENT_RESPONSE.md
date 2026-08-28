# Respuesta a incidentes — V354

## Clasificación

- SEV-1: pérdida/exposición de datos, cobro incorrecto masivo, indisponibilidad total o integridad general de scores.
- SEV-2: función crítica degradada sin alternativa segura.
- SEV-3: defecto limitado con alternativa y sin pérdida de datos.

## Flujo mandatorio

1. Registrar hora UTC, versión/deployment, alcance y responsable; no copiar secretos ni datos personales al ticket.
2. Contener: desactivar función/credencial afectada, revocar enlaces o revertir al último deployment verificado.
3. Preservar logs y evidencia con acceso mínimo; determinar obligaciones de notificación con asesoría legal.
4. Recuperar y verificar navegador → API → base → respuesta; comunicar sólo hechos confirmados.
5. Emitir postmortem con causa, impacto, línea temporal, acción preventiva, dueño y fecha.

Responsables nominales, contacto 24/7, canal de estado y tiempos contractuales siguen pendientes; por eso la publicación comercial permanece bloqueada.
