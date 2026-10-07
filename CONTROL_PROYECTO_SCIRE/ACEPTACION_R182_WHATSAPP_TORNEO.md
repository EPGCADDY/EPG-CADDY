# R182 · Invitación de torneo abre el registro precargado

Fecha: 6 de octubre de 2026, Guatemala.
Base: R181, commit 6cbfda4aa5fb72a5cb1d39efbf05a73a44ccc8a8.
Estado: candidato local; Preview, navegador móvil y publicación pendientes. Producción permanece en R181.

## Alcance

Al compartir un torneo por WhatsApp, el enlace identifica el torneo exacto y su código. Al abrir un enlace válido, la aplicación valida el código y el estado del torneo, y entra directamente al registro con nombre, campo y modalidad precargados. El jugador registra sus propios jugadores y confirma antes de entrar; el enlace no se une ni publica scores por sí solo.

Los enlaces de grupos conservan el acceso general actual. Los torneos compartidos desde LAB y Producción mantienen el origen donde vive el evento.

## Aceptación medible

1. El mensaje de torneo incluye una URL clicable /torneo/<nombre>#evento=<id>&codigo=<código> del ambiente fuente, además del código final de respaldo.
2. El enlace abre el evento exacto y elimina el fragmento con el código de la barra de direcciones antes de validar el recurso.
3. Código inválido o torneo inactivo no prepara el registro ni expone configuración privada.
4. Código válido prepara automáticamente el Registro con nombre del torneo, campo y modalidad del evento; no muestra una pantalla intermedia en blanco ni exige copiar el código.
5. El grupo privado conserva su enlace y flujo vigentes.
6. No hay autoinscripción de roster, publicación ni escritura de scores. El usuario completa el Registro y confirma con el flujo oficial.

## Riesgos y rollback

- ID, código o nombre incorrectos: pruebas unitarias verifican la URL y el enlace con código inválido queda denegado por la API.
- Origen incorrecto entre ambientes: prueba cruzada LAB/Producción.
- Ronda o scores ajenos: se conserva GSCPrepareEventInvitation y el escritor oficial; no se modifica motor, roster ni API.
- Rollback: revertir R182 a R181 (6cbfda4). No cambia registros de torneos existentes.

## Evidencia

test-r159-whatsapp-two-messages.mjs, test-r156-tournament-invitation.mjs y test-r24-event-creation-feedback.mjs pasan localmente en el candidato. node --check whatsapp-invitations.js y node --check personal-events.js pasan. WhatsApp recibido, iPhone físico y Preview real aún no verificados.

- `test-lab-private-round-share-flow.mjs` cubre la invitación emitida al crear torneo y garantiza el enlace precargado, mientras el grupo sigue usando el registro general.
