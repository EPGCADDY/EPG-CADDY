# R156 · invitación y Organizador

Estado: implementación local; regresión automática PASS. Navegador público, dominio solicitado y publicación PENDIENTES.

Fuente: main a7502ebcf7930d4b612b13d97b0b9f171a3fa96e; capturas IMG_7E674602 y IMG_8968AFF0 (WhatsApp), IMG_5687 (Organizador), IMG_5688/5689 (administración); órdenes de 2 octubre 2026 20:58–21:15 Guatemala.

Alcance: CREAR TORNEO únicamente en Organizador. TORNEO en Modalidad pide código directamente y conserva API oficial join-code. Compartir usa una URL en el texto para impedir duplicación por Web Share. Ruta /torneo/NOMBRE con evento/código en fragmento; identidad estable independiente del nombre para conservar enlaces anteriores. La API valida acceso antes de preparar Registro y el nombre mostrado viene del servidor. La invitación no concede edición hasta join-code. ID DE TORNEO dentro de Organizador; comprobación de rol y evento antes de compartir. Controles administrativos agrupados en details cerrados; login propietario oculto sólo con owner:true. Sin alteración de permisos de las APIs ni motor de scores.

Aceptación: código inválido no conecta; código válido conserva snapshot; no directorio en ingreso torneo; privados conservan selección y código; nombre actualizado en nuevos enlaces y destino actual en viejos; jugador sin controles de compartir; cancelación conserva recuperación; Administración principal muestra eventos y Eliminar, permisos secundarios cerrados.

Riesgos: permisos expuestos, enlace dirigido a otro evento, nombre antiguo, doble URL, pérdida de tarjeta, scripts relativos bajo ruta personalizada. Controles: identidad/evento validado por API; nombre remoto; fragmento no enviado al servidor y borrado de dirección al consumir; redirect a ruta principal; regresión de tarjeta/reloj y grupos privados.

Plan: test-r156-tournament-invitation.mjs, test-lab-private-round-share-flow.mjs, test-organizer-tournament-entry.mjs, banco scripts/build-manual-lab.mjs, puertas de proyecto/ROADMAP/inventarios; navegación móvil real sobre Preview antes de publicar. No se declara prueba física de iPhone.

Rollback: a7502eb; no migraciones ni eliminación de datos. No cambiar orígenes existentes para conservar almacenamiento.

Dominio solicitado: golf-score-card.vercel.app responde HTTP200, título Create Next App; no forma parte de los dominios de EPG CADDY en la cuenta epgcaddys-projects. Asignación no comprobada y no realizada. URLs de este árbol usan el origen existente; no enviar enlaces con dominio solicitado hasta confirmación efectiva.

Evidencia local: banco completo y ambas puertas project-quality PASS. Chromium local ausente; intento de instalación devuelve archivo no ZIP y termina fallo. No se simula navegador ni iPhone. Preview remoto pendiente.

## Bloqueo de entrega · 2 octubre 2026
Commit local d518eff. git push -u origin fix/r156-tournament-invitation fue rechazado por revisión automática: destino no verificado como repositorio de confianza de la organización; autorización interpretada como implementación, no divulgación externa. No se repite ni se usa conector alternativo para eludir el rechazo. Preview y publicación pendientes; siguiente acción del propietario: autorizar explícitamente subir la rama al repositorio canónico EPGCADDY/EPG-CADDY para generar Preview. Se desactiva también la superficie histórica de código en tarjeta para torneos; el código de grupo privado conserva su control anterior.


### R156 · autorización de subida · 2 octubre 2026 21:23 Guatemala
El propietario autorizó explícitamente la subida. El conector GitHub confirmó propietario EPGCADDY, mismo ID de la cuenta conectada, permisos admin/push en EPGCADDY/EPG-CADDY. Se levanta el bloqueo de autorización; Preview y navegador siguen pendientes, sin promoción de Producción.
