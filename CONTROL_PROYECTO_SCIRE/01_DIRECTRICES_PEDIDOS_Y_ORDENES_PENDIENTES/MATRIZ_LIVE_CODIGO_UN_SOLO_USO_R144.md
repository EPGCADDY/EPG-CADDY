# R144 · última orden del propietario · 29 septiembre 2026

Esta regla sustituye para COMPARTIR LIVE el requisito previo de verificación telefónica y aprobación del organizador de Matriz_Acceso_Ronda_y_Torneo.md v4. Fuente: mensajes del propietario 22:35: «Que al pinchar compartir live te de un código compartir y lo envías y que se queme en el primer uso», «Como la ronda particular».

- Jugador inscrito toca COMPARTIR LIVE; servidor valida su credencial de la tarjeta vinculada al evento. Invitados de lectura no generan códigos.
- Código aleatorio individual de 12 caracteres, hash almacenado, vencimiento máximo 24 horas limitado por la vigencia del evento.
- Mensaje para WhatsApp con código y enlace de ese mismo evento. Alternativas compartir/copia. No se afirma entrega de WhatsApp.
- Primer consumo válido crea atómicamente una única sesión de lectura y quema el código. No hay teléfono, SMS ni aprobación del organizador.
- Un tercero que reciba el enlace antes del primer uso puede consumirlo primero: el método prueba posesión del código, no identidad ni control del número. Esta consecuencia se comunicó al aplicar la orden.
- Segundo receptor sin la sesión: denegado. El receptor original puede volver con su propia cookie HttpOnly/Secure mientras siga vigente; no se crea una segunda sesión con el código.
- Enlace directo a SCORES; se elimina el código del fragmento tras validación. Torneo conserva GENERAL/CATEGORÍA/MIS FAVORITOS propios; Ronda Particular conserva tabla Nombre/HDCP/Hoyo/Gross/Neto/Resultado y detalle G/N.
- Token de consulta compartido anterior no se incluye en el mensaje nuevo. Cookie de sesión nunca se devuelve en JSON. Invitado no recibe claves de anotación/organizador.
- Sesión denegada si se revoca el código o evento, o caduca. Límite de intentos: 20/minuto para consumo/generación, 240/minuto para lectura, por dirección y evento.
- Alta de jugadores y publicación desde la tarjeta oficial conservan los flujos existentes. Este código nuevo concede lectura; no inscribe al receptor como jugador ni anotador.
- Activación remota sólo después de verificar base LAB aislada: GSC_LIVE_SHARE_LAB_READY=1. Si falta, API deniega antes de DDL; no proxy a Producción.

Estado: implementación y pruebas locales integradas PASS; datos de prueba explícitos, sin servicio telefónico. Pendiente identificar/configurar la base LAB y certificar/desplegar allí; no hay entrega integral ni cambios en Producción.
