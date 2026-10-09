# R166 · Reconciliación de dueño y membresía de eventos

Fecha: 4 de octubre de 2026.
Base: `main` `72dd08bb5b2d2ed1272f477ce0991bce43efe5a2` (R165).
Alcance: listado de ID de torneo y lectura de Scores mi grupo para el propietario original cuando una fila antigua en `gsc_personal_members` falta.

## Criterios de aceptación

1. `owner_account_id` coincidente recupera el evento y se presenta como organizador; no crea ni modifica filas de membresía. **PASS** — regresión PostgreSQL R162.
2. El propietario puede obtener el ID activo single-use del torneo. **PASS** — `test-r162-single-use-tournament-code.mjs`; segunda cuenta denegada.
3. El propietario lee scores de grupo ya publicados aunque falte su fila legacy. **PASS** — `test-personal-event-permissions.mjs`.
4. Una cuenta que no es dueña y no tiene membresía sigue bloqueada. **PASS** — `test-personal-event-permissions.mjs`.
5. Los otros flujos de Scores y administración no regresan. **PASS** — R158 y event administration.
6. Gate 0 y formato de cambios. **PASS** — `project-quality-gate.mjs`, `roadmap-gate.mjs`, `inventory-gate.mjs`, `git diff --check`.
7. Navegador en Preview con código y Scores de grupo. **PARCIAL** — en `golf-sc-gt-lab` se creó `QA R166 TEST`, se copió su código, su grupo apareció en Administración y el score 4 persistió tras recargar. **FALLÓ** el regreso de Administración: volvió sin `personalEvent` y la tarjeta perdió asociación/score visible; corrección en `event-administration-ui.js`, prueba en `test-event-administration.mjs`, aún pendiente de Preview READY.
8. Verificar en cada aplicación los grupos/scores y el directorio completo de torneos; validar segundo usuario, compartir, cierre/regreso y persistencia. **PENDIENTE** — falta repetir en las tres aplicaciones; crear torneo requiere sesión/permisos del propietario y no hay sesión disponible en el Preview QA.

Estado: R166 sigue en Preview; builds actuales rechazados por ROADMAP e INVENTORY desactualizados al reparar el retorno. Regenerar controles, reconstruir y completar criterios 7–8 antes de Producción. Producción intacta.
