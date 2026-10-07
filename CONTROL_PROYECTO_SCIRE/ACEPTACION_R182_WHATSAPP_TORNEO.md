# R182 路 Invitaci贸n de torneo abre el registro precargado

Fecha: 6 de octubre de 2026, Guatemala.
Base: R181, commit 6cbfda4aa5fb72a5cb1d39efbf05a73a44ccc8a8.
Estado: candidato local; Preview, navegador m贸vil y publicaci贸n pendientes. Producci贸n permanece en R181.

## Alcance

Al compartir un torneo por WhatsApp, el enlace identifica el torneo exacto y su c贸digo. Al abrir un enlace v谩lido, la aplicaci贸n valida el c贸digo y el estado del torneo, y entra directamente al registro con nombre, campo y modalidad precargados. El jugador registra sus propios jugadores y confirma antes de entrar; el enlace no se une ni publica scores por s铆 solo.

Los enlaces de grupos conservan el acceso general actual. Los torneos compartidos desde LAB y Producci贸n mantienen el origen donde vive el evento.

## Aceptaci贸n medible

1. El mensaje de torneo incluye una URL clicable /torneo/<nombre>#evento=<id>&codigo=<c贸digo> del ambiente fuente, adem谩s del c贸digo final de respaldo.
2. El enlace abre el evento exacto y elimina el fragmento con el c贸digo de la barra de direcciones antes de validar el recurso.
3. C贸digo inv谩lido o torneo inactivo no prepara el registro ni expone configuraci贸n privada.
4. C贸digo v谩lido prepara autom谩ticamente el Registro con nombre del torneo, campo y modalidad del evento; no muestra una pantalla intermedia en blanco ni exige copiar el c贸digo.
5. El grupo privado conserva su enlace y flujo vigentes.
6. No hay autoinscripci贸n de roster, publicaci贸n 痘玘